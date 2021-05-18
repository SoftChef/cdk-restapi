import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { HttpMethod } from './http-method';

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
  readonly authorizationType?: apiGateway.AuthorizationType;
  /**
   * Specify Authorizer by aws-apigateway.Authorizer, default is null
   */
  readonly authorizer?: apiGateway.IAuthorizer;
  /**
   * Specify Lambda function
   */
  readonly lambdaFunction: lambda.Function;
}