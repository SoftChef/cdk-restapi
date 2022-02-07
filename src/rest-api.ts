import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import {
  RestApiResourceProps,
} from './resource';

export interface RestApiProps {
  /**
   * Custom RestApi
   */
  readonly restApi?: apigateway.RestApi;
  /**
   * Define Rest API resources
   */
  readonly resources: RestApiResourceProps[];
  /**
   * Enable cors, default is true
   */
  readonly enableCors?: boolean;
  /**
   * Specify StageOptions
   */
  readonly deployOptions?: apigateway.StageOptions;
  /**
   * Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE
   */
  readonly authorizationType?: apigateway.AuthorizationType;
  /**
   * Specify globally Authorizer by aws-apigateway.Authorizer, default is null
   */
  readonly authorizer?: apigateway.IAuthorizer | undefined;
}

export class RestApi extends cdk.Construct {

  private globalAuthorizationType?: apigateway.AuthorizationType | undefined;

  private globalAuthorizer?: apigateway.IAuthorizer | undefined;

  private restApi: apigateway.RestApi;

  private resources: {
    [key: string]: apigateway.Resource;
  } = {};

  constructor(scope: cdk.Construct, id: string, props: RestApiProps) {
    super(scope, id);

    let restApiProps: {
      [key: string]: any;
    } = {};

    if (props.enableCors !== false) {
      restApiProps.defaultCorsPreflightOptions = {
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
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
    this.restApi = props.restApi ?? new apigateway.RestApi(this, this.node.id, restApiProps);
    // Define resources
    this.addResources(props.resources);
  }

  get restApiId(): string {
    return this.restApi.restApiId;
  }

  get url(): string {
    return this.restApi.url;
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
          this.resources[part] = this.restApi.root.addResource(current);
        } else {
          this.resources[part] = this.resources[previous].addResource(current);
        }
      }
      return part;
    });
    const authorizationType: apigateway.AuthorizationType = resource.authorizationType
      ?? this.globalAuthorizationType
      ?? apigateway.AuthorizationType.NONE;
    switch (authorizationType) {
      case apigateway.AuthorizationType.COGNITO:
      case apigateway.AuthorizationType.CUSTOM:
        let authorizer: apigateway.IAuthorizer;
        if (resource.authorizer) {
          authorizer = resource.authorizer;
        } else if (this.globalAuthorizer) {
          authorizer = this.globalAuthorizer;
        } else {
          throw new Error('You specify authorization type is COGNITO, but not specify authorizer.');
        }
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: apigateway.AuthorizationType.COGNITO,
            authorizer: authorizer,
          },
        );
        break;
      case apigateway.AuthorizationType.IAM:
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: apigateway.AuthorizationType.IAM,
          },
        );
        break;
      case apigateway.AuthorizationType.NONE:
      default:
        this.resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
        );
    }
    return this;
  }
}