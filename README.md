# AWS CDK with RestApi

[![npm version](https://badge.fury.io/js/%40softchef%2Fcdk-restapi.svg)](https://badge.fury.io/js/%40softchef%2Fcdk-restapi)
![Release](https://github.com/SoftChef/cdk-restapi/workflows/Release/badge.svg)
![npm](https://img.shields.io/npm/dt/@softchef/cdk-restapi?label=NPM%20Downloads&color=orange)

This construct is base on @aws/aws-apigateway.RestApi.

The RestApi has addResource & addMethod function to create REST API routes. But the source code are low readability about what kind of resources and method in the API. So this construct are redefine the resources to improve readability.

## Installation

```
  npm install @softchef/cdk-restapi
  // or
  yarn add @softchef/cdk-restapi
```

## Example
```
const demoRestApi = new RestApi(stack, 'RestApiDemo', {
  resources: [
    {
      path: '/articles',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticles', {
        entry: `./lambda-assets/articles/get-articles/app.ts`,
      }),
    },
    {
      path: '/articles',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateArticle', {
        entry: `./lambda-assets/articles/create-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticle', {
        entry: `./lambda-assets/articles/get-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.PUT,
      lambdaFunction: new lambda.NodejsFunction(stack, 'UpdateArticle', {
        entry: `./lambda-assets/articles/update-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetComments', {
        entry: `./lambda-assets/articles/get-comments/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateComment', {
        entry: `./lambda-assets/articles/create-comment/app.ts`,
      }),
    },
  ],
  enableCors: true,
});

// Add multi-resources
demoRestApi.addResources([
  {
    path: '/authors',
    httpMethod: HttpMethod.GET,
    lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthors', {
      entry: `./lambda-assets/authors/get-authors/app.ts`,
    }),
  },
  {
    path: '/authors/{authorId}',
    httpMethod: HttpMethod.GET,
    lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthor', {
      entry: `./lambda-assets/authors/get-author/app.ts`,
    }),
  }
]);

// Add single resource
demoRestApi.addResource({
  path: '/authors',
  httpMethod: HttpMethod.POST,
  lambdaFunction: new lambda.NodejsFunction(stack, 'CreateAuthors', {
    entry: `./lambda-assets/authors/create-authors/app.ts`,
  }),
})

```



### Demo

1. Clone this repository
2. Run commands
```
npx projen
cdk deploy --app lib/demo/demo.js
```
3. Checkout the CloudFormation stacks and API Gateway
