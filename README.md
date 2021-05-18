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
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticles', {
        entry: `./src/lambda-assets/articles/get-articles/app.ts`,
      }),
    },
    {
      path: '/articles',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateArticle', {
        entry: `./src/lambda-assets/articles/create-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticle', {
        entry: `./src/lambda-assets/articles/get-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}',
      httpMethod: HttpMethod.PUT,
      lambdaFunction: new lambda.NodejsFunction(stack, 'UpdateArticle', {
        entry: `./src/lambda-assets/articles/update-article/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetComments', {
        entry: `./src/lambda-assets/articles/get-comments/app.ts`,
      }),
    },
    {
      path: '/articles/{articleId}/comments',
      httpMethod: HttpMethod.POST,
      lambdaFunction: new lambda.NodejsFunction(stack, 'CreateComment', {
        entry: `./src/lambda-assets/articles/create-comment/app.ts`,
      }),
    },
    {
      path: '/authors',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthors', {
        entry: `./src/lambda-assets/authors/get-authors/app.ts`,
      }),
    },
    {
      path: '/authors/{authorId}',
      httpMethod: HttpMethod.GET,
      lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthor', {
        entry: `./src/lambda-assets/authors/get-author/app.ts`,
      }),
    },
  ],
  enableCors: true,
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