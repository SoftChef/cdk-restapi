import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '../index';

test('minimal usage', () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  new RestApi(stack, 'test-api', {
    resources: [
      {
        path: '/articles',
        httpMethod: HttpMethod.GET,
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
        authorizationType: apigateway.AuthorizationType.IAM,
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
  expect(stack).toCountResources('AWS::ApiGateway::Resource', 3);
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
    RestApiId: expectRestApiId,
  }); // testapiarticlesFD498DE1
  expect(stack).toCountResources('AWS::ApiGateway::Method', 8);
  // GET:/articles
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
  });
  // POST:/articles
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'POST',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    AuthorizationType: 'AWS_IAM',
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
  });
  // OPTIONS:/authors
  expect(stack).toHaveResourceLike('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
  });
});
