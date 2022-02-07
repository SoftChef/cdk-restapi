import {
  AuthorizationType,
  Cors,
  IAuthorizer,
  LambdaIntegration,
  Resource,
  RestApi as AwsRestApi,
  StageOptions,
} from 'aws-cdk-lib/aws-apigateway';
import {
  Construct,
} from 'constructs';
import {
  RestApiResourceProps,
} from './resource';

export interface RestApiProps {
  /**
   * Custom RestApi
   */
  readonly restApi?: AwsRestApi;
  /**
   * Define Rest API resources
   */
  readonly resources: RestApiResourceProps[];
  /**
   * Enable cors, default is true
   */
  readonly enableCors?: boolean;
  /**
   * Specify globally AuthorizationType by aws-AuthorizationType, default is NONE
   * Specify StageOptions
   */
  readonly deployOptions?: StageOptions;
  /**
   * Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE
   */
  readonly authorizationType?: AuthorizationType;
  /**
   * Specify globally Authorizer by aws-Authorizer, default is null
   */
  readonly authorizer?: IAuthorizer | undefined;
}

export class RestApi extends Construct {

  private globalAuthorizationType?: AuthorizationType | undefined;

  private globalAuthorizer?: IAuthorizer | undefined;

  private awsRestApi: AwsRestApi;

  private resources: {
    [key: string]: Resource;
  } = {};

  constructor(scope: Construct, id: string, props: RestApiProps) {
    super(scope, id);

    let restApiProps: {
      [key: string]: any;
    } = {};

    if (props.enableCors !== false) {
      restApiProps.defaultCorsPreflightOptions = {
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: [
          'Origin',
          'Content-Type',
          'Fetch-Mode',
          'Accept',
          'X-Amz-Date',
          'Accept-Encoding',
          'Authorization',
          'cache-control',
          'SyncCenter',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
        ],
      };
    }

    if (props.deployOptions) {
      restApiProps.deployOptions = props.deployOptions;
    }

    if (props.authorizationType) {
      this.globalAuthorizationType = props.authorizationType;
    }

    if (props.authorizer) {
      this.globalAuthorizer = props.authorizer;
    }
    // Use custom or create new
    this.awsRestApi = props.restApi ?? new AwsRestApi(this, this.node.id, restApiProps);
    // Define resources
    this.addResources(props.resources);
  }

  get restApiId(): string {
    return this.awsRestApi.restApiId;
  }

  get url(): string {
    return this.awsRestApi.url;
  }

  public addResources(resources: RestApiResourceProps[]): this {
    for (const resource of resources) {
      this.addResource(resource);
    }
    return this;
  }

  public addResource(resource: RestApiResourceProps): this {
    const path: string[] = `/${resource.path.replace(/^\/{1}/, '')}`.split('/');
    const lastPath = path.reduce((previous, current, index) => {
      const part = `${previous}/${current}`;
      if (!this.resources[part]) {
        if (index === 1) {
          this.resources[part] = this.awsRestApi.root.addResource(current);
        } else {
          this.resources[part] = this.resources[previous].addResource(current);
        }
      }
      return part;
    });
    const authorizationType: AuthorizationType = resource.authorizationType
      ?? this.globalAuthorizationType
      ?? AuthorizationType.NONE;
    switch (authorizationType) {
      case AuthorizationType.COGNITO:
      case AuthorizationType.CUSTOM:
        let authorizer: IAuthorizer;
        if (resource.authorizer) {
          authorizer = resource.authorizer;
        } else if (this.globalAuthorizer) {
          authorizer = this.globalAuthorizer;
        } else {
          throw new Error('You specify authorization type is COGNITO, but not specify authorizer.');
        }
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: authorizer,
          },
        );
        break;
      case AuthorizationType.IAM:
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: AuthorizationType.IAM,
          },
        );
        break;
      case AuthorizationType.NONE:
      default:
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
        );
    }
    return this;
  }
}