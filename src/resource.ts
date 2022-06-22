import {
  AuthorizationType,
  IAuthorizer,
  Integration,
  MethodOptions,
  VpcLink,
} from 'aws-cdk-lib/aws-apigateway';
import {
  ILoadBalancerV2,
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
  readonly vpcLink?: [VpcLink, ILoadBalancerV2];
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