import {
  AuthorizationType,
  IAuthorizer,
  Integration,
  IntegrationOptions,
  MethodOptions,
  VpcLink,
} from 'aws-cdk-lib/aws-apigateway';
import {
  INetworkLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import {
  IFunction,
} from 'aws-cdk-lib/aws-lambda';
import {
  HttpMethod,
} from './http-method';

export interface RestApiResourceProps {
  /**
   * Define Resource path
   */
  readonly path: string;
  /**
   * Specify HTTP Method
   */
  readonly httpMethod: HttpMethod;
  /**
   * Specify AuthorizationType by aws-apigateway.AuthorizationType
   * @default AuthorizationType.NONE
   */
  readonly authorizationType?: AuthorizationType;
  /**
   * Specify Authorizer by aws-Authorizer
   * @default undefined
   */
  readonly authorizer?: IAuthorizer;
  /**
   * Specify Lambda function to integration
   * @default undefined
   */
  readonly lambdaFunction?: IFunction;
  /**
   * Specify VPC Link to integration
   */
  readonly vpcLink?: VpcLink;
  /**
   * Specify VPC Link Proxy to integration
   */
  readonly vpcLinkProxy?: VpcLink;
  /**
   * Speficy VPC Link integration options
   */
  readonly vpcLinkIntegrationOptions?: IntegrationOptions;
  /**
   * Specify NLB with VPC Link to integration
   * Only supported Network Load Balancer
   * https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html#http-api-vs-rest.differences.management
   */
  readonly networkLoadBalancer?: INetworkLoadBalancer;
  /**
   * Specify integration
   * @default undefined
   */
  readonly integration?: Integration;
  /**
   * Specify method options
   * @default undefined
   */
  readonly methodOptions?: MethodOptions;
}