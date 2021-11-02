import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import { RestApiResourceProps } from './resource';

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
   * Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE
   */
  readonly authorizationType?: apigateway.AuthorizationType;
  /**
   * Specify globally Authorizer by aws-apigateway.Authorizer, default is null
   */
  readonly authorizer?: apigateway.IAuthorizer | undefined;
}

export class RestApi extends cdk.Construct {

  private _globalAuthorizationType?: apigateway.AuthorizationType | undefined;

  private _globalAuthorizer?: apigateway.IAuthorizer | undefined;

  private _restApi: apigateway.RestApi;

  private _resources: {
    [key: string]: apigateway.Resource;
  } = {}

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
    this._restApi = props.restApi ?? new apigateway.RestApi(this, this.node.id, restApiProps);
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
    const authorizationType: apigateway.AuthorizationType = resource.authorizationType
      ?? this._globalAuthorizationType
      ?? apigateway.AuthorizationType.NONE;
    switch (authorizationType) {
      case apigateway.AuthorizationType.COGNITO:
      case apigateway.AuthorizationType.CUSTOM:
        let authorizer: apigateway.IAuthorizer;
        if (resource.authorizer) {
          authorizer = resource.authorizer;
        } else if (this._globalAuthorizer) {
          authorizer = this._globalAuthorizer;
        } else {
          throw new Error('You specify authorization type is COGNITO, but not specify authorizer.');
        }
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: apigateway.AuthorizationType.COGNITO,
            authorizer: authorizer,
          },
        );
        break;
      case apigateway.AuthorizationType.IAM:
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
          {
            authorizationType: apigateway.AuthorizationType.IAM,
          },
        );
        break;
      case apigateway.AuthorizationType.NONE:
      default:
        this._resources[lastPath].addMethod(
          resource.httpMethod.toString(),
          new apigateway.LambdaIntegration(resource.lambdaFunction),
        );
    }
    return this;
  }
}