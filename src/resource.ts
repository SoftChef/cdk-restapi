import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
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
   * Specify AuthorizationType by aws-apigateway.AuthorizationType, default is NONE
   */
  readonly authorizationType?: apigateway.AuthorizationType;
  /**
   * Specify Authorizer by aws-apigateway.Authorizer, default is null
   */
  readonly authorizer?: apigateway.IAuthorizer | undefined;
  /**
   * Specify Lambda function
   */
  readonly lambdaFunction: lambda.IFunction;
}