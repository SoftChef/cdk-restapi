import {
  AuthorizationType,
  Cors,
  IAuthorizer,
  LambdaIntegration,
  Resource,
  RestApi as AwsRestApi,
} from 'aws-cdk-lib/aws-apigateway';
import {
  Construct,
} from 'constructs';
import { RestApiResourceProps } from './resource';

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
   */
  readonly authorizationType?: AuthorizationType;
  /**
   * Specify globally Authorizer by aws-Authorizer, default is null
   */
  readonly authorizer?: IAuthorizer | undefined;
}

export class RestApi extends Construct {

  private _globalAuthorizationType?: AuthorizationType | undefined;

  private _globalAuthorizer?: IAuthorizer | undefined;

  private _restApi: AwsRestApi;

  private _resources: {
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

    if (props.authorizationType) {
      this._globalAuthorizationType = props.authorizationType;
    }

    if (props.authorizer) {
      this._globalAuthorizer = props.authorizer;
    }
    // Use custom or create new
    this._restApi = props.restApi ?? new AwsRestApi(this, this.node.id, restApiProps);
    // Define resources
    this.addResources(props.resources);
  }

  get restApiId(): string {
    return this._restApi.restApiId;
  }

  get url(): string {
    return this._restApi.url;
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
      if (!this._resources[part]) {
        if (index === 1) {
          this._resources[part] = this._restApi.root.addResource(current);
        } else {
          this._resources[part] = this._resources[previous].addResource(current);
        }
      }
      return part;
    });
    const authorizationType: AuthorizationType = resource.authorizationType
      ?? this._globalAuthorizationType
      ?? AuthorizationType.NONE;
    switch (authorizationType) {
      case AuthorizationType.COGNITO:
      case AuthorizationType.CUSTOM:
        let authorizer: IAuthorizer;
        if (resource.authorizer) {
          authorizer = resource.authorizer;
        } else if (this._globalAuthorizer) {
          authorizer = this._globalAuthorizer;
        } else {
          throw new Error('You specify authorization type is COGNITO, but not specify authorizer.');
        }
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: authorizer,
          },
        );
        break;
      case AuthorizationType.IAM:
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: AuthorizationType.IAM,
          },
        );
        break;
      case AuthorizationType.NONE:
      default:
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new LambdaIntegration(resource.lambdaFunction),
        );
    }
    return this;
  }
}