import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
} from 'aws-cdk-lib/aws-apigateway';
import {
  UserPool,
} from 'aws-cdk-lib/aws-cognito';
import {
  Function,
  InlineCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {
  App,
  Stack,
} from 'aws-cdk-lib/core';
import {
  RestApi,
  HttpMethod,
} from '../src/index';

test('minimal usage', () => {
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'demo-stack');
  const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(stack, 'Authorizer', {
    cognitoUserPools: [
      new UserPool(stack, 'UserPool'),
    ],
  });
  const restApi = new RestApi(stack, 'test-api', {
    authorizationType: AuthorizationType.IAM,
    resources: [
      {
        path: '/articles',
        httpMethod: HttpMethod.GET,
        authorizationType: AuthorizationType.NONE,
        lambdaFunction: new Function(stack, 'GetArticles', {
          runtime: Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new InlineCode(`
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
        lambdaFunction: new Function(stack, 'CreateArticle', {
          runtime: Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new InlineCode(`
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
        authorizationType: AuthorizationType.NONE,
        lambdaFunction: new Function(stack, 'GetArticle', {
          runtime: Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new InlineCode(`
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
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuthorizer,
        lambdaFunction: new Function(stack, 'GetAuthors', {
          runtime: Runtime.NODEJS_12_X,
          handler: 'index.handler',
          code: new InlineCode(`
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
    authorizationType: AuthorizationType.COGNITO,
    authorizer: cognitoAuthorizer,
    lambdaFunction: new Function(stack, 'CreateAuthor', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new InlineCode(`
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
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'test-api',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
  });
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: '{articleId}',
  });
  template.resourceCountIs('AWS::ApiGateway::Resource', 4);
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
    RestApiId: expectRestApiId,
  });
  template.resourceCountIs('AWS::ApiGateway::Method', 10);
  // GET:/articles
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    AuthorizationType: AuthorizationType.NONE,
  });
  // POST:/articles
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'POST',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    AuthorizationType: AuthorizationType.IAM,
  });
  // OPTIONS:/articles
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
  });
  // GET:/articles/{articleId}
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticleIdResourceId,
    AuthorizationType: AuthorizationType.NONE,
  });
  // OPTIONS:/articles/{articleId}
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectArticleIdResourceId,
  });
  // GET:/authors
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
    AuthorizationType: AuthorizationType.COGNITO,
    AuthorizerId: expectCognitoAuthorizer,
  });
  // OPTIONS:/authors
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'OPTIONS',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
  });
});
