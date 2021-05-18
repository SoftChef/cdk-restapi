import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '../index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'sccdk-rest-api-demo');

const demoRestApi = new RestApi(stack, 'RestApiDemo', {
  resources: [
    {
      path: '/articles',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticles', {
        entry: './src/demo/articles/get-articles/app.js',
      }),
    },
    {
      path: '/articles',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateArticle', {
        entry: './src/demo/articles/create-article/app.js',
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticle', {
        entry: './src/demo/articles/get-article/app.js',
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.PUT,
      lambdaFunction: new lambda.NodejsFunction(stack, 'UpdateArticle', {
        entry: './src/demo/articles/update-article/app.js',
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetComments', {
        entry: './src/demo/articles/get-comments/app.js',
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateComment', {
        entry: './src/demo/articles/create-comment/app.js',
      }),
    },
    {
      path: '/authors',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthors', {
        entry: './src/demo/authors/get-authors/app.js',
      }),
    },
    {
      path: '/authors/{authorId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthor', {
        entry: './src/demo/authors/get-author/app.js',
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
