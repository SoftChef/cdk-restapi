import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cognito from '@aws-cdk/aws-cognito';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '../index';

test('minimal usage', () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  const cognitoAuthorizer = new apigateway.CognitoUserPoolsAuthorizer(stack, 'Authorizer', {
    cognitoUserPools: [
      new cognito.UserPool(stack, 'UserPool'),
    ],
  });
  const restApi = new RestApi(stack, 'test-api', {
    authorizationType: apigateway.AuthorizationType.IAM,
    resources: [
      {
        path: '/articles',
        httpMethod: HttpMethod.GET,
        authorizationType: apigateway.AuthorizationType.NONE,
        lambdaFunction: new lambda.Function(stack, 'GetArticles', {
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new lambda.InlineCode(`
            export async function handler() {
              return {
                statusCode: 200,
                body: JSON.stringify({
                  articles: [],
                }),
              };
            }
          `),
        }),
      },
      {
        path: '/articles',
        httpMethod: HttpMethod.POST,
        lambdaFunction: new lambda.Function(stack, 'CreateArticle', {
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new lambda.InlineCode(`
            export async function handler() {
              return {
                statusCode: 200,
                body: JSON.stringify({
                  created: true,
                }),
              };
            }
          `),
        }),
      },
      {
        path: '/articles/{articleId}',
        httpMethod: HttpMethod.GET,
        authorizationType: apigateway.AuthorizationType.NONE,
        lambdaFunction: new lambda.Function(stack, 'GetArticle', {
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new lambda.InlineCode(`
            export async function handler() {
              return {
                statusCode: 200,
                body: JSON.stringify({
                  article: {},
                }),
              };
            }
          `),
        }),
      },
      {
        path: '/authors',
        httpMethod: HttpMethod.GET,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        authorizer: cognitoAuthorizer,
        lambdaFunction: new lambda.Function(stack, 'GetAuthors', {
          runtime: lambda.Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new lambda.InlineCode(`
            export async function handler() {
              return {
                statusCode: 200,
                body: JSON.stringify({
                  authors: [],
                }),
              };
            }
          `),
        }),
      },
    ],
    enableCors: true,
  });
  restApi.addResource({
    path: '/authors/{authorId}',
    httpMethod: HttpMethod.POST,
    authorizationType: apigateway.AuthorizationType.COGNITO,
    authorizer: cognitoAuthorizer,
    lambdaFunction: new lambda.Function(stack, 'CreateAuthor', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new lambda.InlineCode(`
        export async function handler() {
          return {
            statusCode: 200,
            body: JSON.stringify({
              created: true,
            }),
          };
        }
      `),
    }),
  });
  const expectRestApiId = {
    Ref: 'testapi85A023B7',
  };
  const expectArticlesResourceId = {
    Ref: 'testapiarticlesFD498DE1',
  };
  const expectArticleIdResourceId = {
    Ref: 'testapiarticlesarticleId55CCCAA7',
  };
  const expectAuthorsResourceId = {
    Ref: 'testapiauthors6FAC66C5',
  };
  const expectCognitoAuthorizer = {
    Ref: 'AuthorizerBD825682',
  };
  expect(SynthUtils.synthesize(stack).template).toMatchSnapshot();
  expect(stack).toHaveResourceLike('AWS::ApiGateway::RestApi', {
    Name: 'test-api',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
  });
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    PathPart: '{articleId}',
  });
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 4);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
    RestApiId: expectRestApiId,
  }); // testapiarticlesFD498DE1
  expect(stack).toCountResources('AWS::ApiGateway::Method', 10);
  // GET:/articles
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    AuthorizationType: apigateway.AuthorizationType.NONE,
  });
  // POST:/articles
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'POST',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    AuthorizationType: apigateway.AuthorizationType.IAM,
  });
  // OPTIONS:/articles
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
  });
  // GET:/articles/{articleId}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticleIdResourceId,
    AuthorizationType: apigateway.AuthorizationType.NONE,
  });
  // OPTIONS:/articles/{articleId}
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectArticleIdResourceId,
  });
  // GET:/authors
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
    AuthorizationType: apigateway.AuthorizationType.COGNITO,
    AuthorizerId: expectCognitoAuthorizer,
  });
  // OPTIONS:/authors
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
  });
});
