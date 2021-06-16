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
  readonly authorizer?: apigateway.IAuthorizer;
}

export class RestApi extends cdk.Construct {

  public readonly restApiId: string;

  public readonly url: string;

  constructor(scope: cdk.Construct, id: string, props: RestApiProps) {
    super(scope, id);
    let restApiProps: {
      [key: string]: any;
    } = {};
    if (props.enableCors) {
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
    // Use custom or create new
    const restApi = props.restApi ?? new apigateway.RestApi(this, this.node.id, restApiProps);
    // Pass restApi properties by self
    this.restApiId = restApi.restApiId;
    this.url = restApi.url;
    // Define resources
    const resources: { [key: string]: apigateway.Resource } = {};
    for (const resource of props.resources) {
      const path: string[] = `/${resource.path.replace(/^\/{1}/, '')}`.split('/');
      const lastPath = path.reduce((previous, current, index) => {
        const part = `${previous}/${current}`;
        if (!resources[part]) {
          if (index === 1) {
            resources[part] = restApi.root.addResource(current);
          } else {
            resources[part] = resources[previous].addResource(current);
          }
        }
        return part;
      });
      let authorizationType: apigateway.AuthorizationType;
      if (resource.authorizationType) {
        authorizationType = resource.authorizationType;
      } else if (props.authorizationType) {
        authorizationType = props.authorizationType;
      } else {
        authorizationType = apigateway.AuthorizationType.NONE;
      }
      switch (authorizationType) {
        case apigateway.AuthorizationType.COGNITO:
        case apigateway.AuthorizationType.CUSTOM:
          let authorizer: apigateway.IAuthorizer;
          if (resource.authorizer) {
            authorizer = resource.authorizer;
          } else if (props.authorizer) {
            authorizer = props.authorizer;
          } else {
            throw new Error('You specify authorization type is COGNITO, but not specify authorizer.');
          }
          resources[lastPath].addMethod(
            resource.httpMethod.toString(),
            new apigateway.LambdaIntegration(resource.lambdaFunction),
            {
              authorizationType: apigateway.AuthorizationType.COGNITO,
              authorizer: authorizer,
            },
          );
          break;
        case apigateway.AuthorizationType.IAM:
          resources[lastPath].addMethod(
            resource.httpMethod.toString(),
            new apigateway.LambdaIntegration(resource.lambdaFunction),
            {
              authorizationType: apigateway.AuthorizationType.IAM,
            },
          );
          break;
        case apigateway.AuthorizationType.NONE:
        default:
          resources[lastPath].addMethod(
            resource.httpMethod.toString(),
            new apigateway.LambdaIntegration(resource.lambdaFunction),
          );
      }
    }
  }
}