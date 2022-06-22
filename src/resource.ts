import {
  AuthorizationType,
  IAuthorizer,
  Integration,
} from 'aws-cdk-lib/aws-apigateway';
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
   * Specify Lambda function
   * @default undefined
   */
  readonly lambdaFunction?: IFunction;
  /**
   * Specify integration
   * @default undefined
   */
  readonly integration?: Integration;
}