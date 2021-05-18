# AWS CDK with RestApi

This construct is base on @aws/aws-apigateway.RestApi.

The RestApi has addResource & addMethod function to create REST API routes. But the source code are low readability about what kind of resources and method in the API. So this construct are redefine the resources to improve readability.

## Installation

```
  npm install sccdk-restapi
  // or
  yarn add sccdk-restapi
```

## Example
```
const demoRestApi = new RestApi(stack, 'RestApiDemo', {
  resources: [
    {
      path: '/articles',
      httpMethod: HttpMethod.GET,
      lambdaFunction: getArticlesFunction,
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
      lambdaFunction: getArticlesFunction,
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.GET,
      lambdaFunction: getArticlesFunction,
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.POST,
      lambdaFunction: getArticlesFunction,
    },
    {
      path: '/authors',
      httpMethod: HttpMethod.GET,
      lambdaFunction: getArticlesFunction,
    },
  ],
  cors: true,
});
```

### Demo

1. Clone this repository
2. Run commands
```
npx projen
cdk deploy --app lib/demo/demo.js
```
3. Checkout the CloudFormation stacks and API Gateway