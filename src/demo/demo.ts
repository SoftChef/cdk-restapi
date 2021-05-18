import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '../index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'sccdk-rest-api-demo');

const LAMBDA_ASSETS_PATH = path.join(__dirname, '../../lambda-assets');

const demoRestApi = new RestApi(stack, 'RestApiDemo', {
  resources: [
    {
      path: '/articles',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticles', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/get-articles/app.ts`,
      }),
    },
    {
      path: '/articles',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateArticle', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/create-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticle', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/get-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.PUT,
      lambdaFunction: new lambda.NodejsFunction(stack, 'UpdateArticle', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/update-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetComments', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/get-comments/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateComment', {
        entry: `${LAMBDA_ASSETS_PATH}/articles/create-comment/app.ts`,
      }),
    },
    {
      path: '/authors',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthors', {
        entry: `${LAMBDA_ASSETS_PATH}/authors/get-authors/app.ts`,
      }),
    },
    {
      path: '/authors/{authorId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthor', {
        entry: `${LAMBDA_ASSETS_PATH}/authors/get-author/app.ts`,
      }),
    },
  ],
  enableCors: true,
});

new cdk.CfnOutput(stack, 'ApiId', {
  value: demoRestApi.restApiId,
});
new cdk.CfnOutput(stack, 'ApiUrl', {
  value: demoRestApi.url,
});
