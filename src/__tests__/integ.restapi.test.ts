// import * as fs from 'fs';
import * as path from 'path';
import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { RestApi, HttpMethod } from '../index';

const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../../src/lambda-assets');

test('minimal usage', () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'demo-stack');
  // console.log(`${LAMBDA_ASSETS_PATH}`, fs.readdirSync(`${LAMBDA_ASSETS_PATH}`));
  // console.log(`${LAMBDA_ASSETS_PATH}/articles`, fs.readdirSync(`${LAMBDA_ASSETS_PATH}/articles`));
  // console.log(`${LAMBDA_ASSETS_PATH}/articles/get-articles`, fs.readdirSync(`${LAMBDA_ASSETS_PATH}/articles/get-articles`));
  // console.log('File exists:', `${LAMBDA_ASSETS_PATH}/articles/get-articles/app.ts`, fs.existsSync(`${LAMBDA_ASSETS_PATH}/articles/get-articles/app.ts`));
  new RestApi(stack, 'test-api', {
    resources: [
      {
        path: '/articles',
        httpMethod: HttpMethod.GET,
        lambdaFunction: new lambda.NodejsFunction(stack, 'GetArticles', {
          // entry: `${LAMBDA_ASSETS_PATH}/articles/get-articles/app.ts`,
          entry: './src/lambda-assets/articles/get-articles/app.ts',
          bundling: {
            forceDockerBundling: true,
            commandHooks: {
              beforeInstall() {
                return [];
              },
              beforeBundling(inputDir: string, outputDir: string) {
                console.log('beforeBundling', inputDir, outputDir);
                // console.log(fs.readdirSync(`.${inputDir}`));
                return ['ls -al /asset-input', `ls -al /${inputDir}/src/lambda-assets/articles/get-articles`];
              },
              afterBundling() {
                return [];
              },
            },
          },
        }),
      },
      {
        path: '/articles',
        httpMethod: HttpMethod.POST,
        authorizationType: apigateway.AuthorizationType.IAM,
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
        path: '/authors',
        httpMethod: HttpMethod.GET,
        lambdaFunction: new lambda.NodejsFunction(stack, 'GetAuthors', {
          entry: `${LAMBDA_ASSETS_PATH}/authors/get-authors/app.ts`,
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
