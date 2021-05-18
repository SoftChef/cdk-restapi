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
}

export class RestApi extends cdk.Construct {
  private readonly _restApi: apigateway.RestApi;
  public readonly origin: apigateway.RestApi;
  public readonly restApiId: string;
  public readonly url: string;
  constructor(scope: cdk.Construct, id: string, props: RestApiProps) {
    super(scope, id);
    const _restApiProps: { [key: string]: any } = {};
    if (props.enableCors) {
      _restApiProps.defaultCorsPreflightOptions = {
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
    this._restApi = this.origin = props.restApi ?? new apigateway.RestApi(this, this.node.id, _restApiProps);
    this.restApiId = this._restApi.restApiId;
    this.url = this._restApi.url;
    const _resources: { [key: string]: apigateway.Resource } = {};
    for (const resource of props.resources) {
      const path: string[] = `/${resource.path.replace(/^\/{1}/, '')}`.split('/');
      const lastPath = path.reduce((previous, current, index) => {
        const part = `${previous}/${current}`;
        if (!_resources[part]) {
          if (index === 1) {
            _resources[part] = this._restApi.root.addResource(current);
          } else {
            _resources[part] = _resources[previous].addResource(current);
          }
        }
        return part;
      });
      _resources[lastPath].addMethod(
        resource.httpMethod.toString(),
        new apigateway.LambdaIntegration(resource.lambdaFunction),
        {
          authorizationType: resource.authorizationType ?? apigateway.AuthorizationType.NONE,
          authorizer: resource.authorizer ?? undefined,
        },
      );
    }
  }
}