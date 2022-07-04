import {
  Template,
} from 'aws-cdk-lib/assertions';
import {
  ConnectionType,
  Integration,
  IntegrationType,
  VpcLink,
} from 'aws-cdk-lib/aws-apigateway';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { NetworkLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
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
  const networkLoadBalancer = new NetworkLoadBalancer(stack, 'NetworkLoadBalancer', {
    vpc: new Vpc(stack, 'vpc'),
  });
  const vpcLink = new VpcLink(stack, 'VpcLink', {
    targets: [
      networkLoadBalancer,
    ],
  });
  new RestApi(stack, 'test-api', {
    resources: [
      {
        path: '/',
        httpMethod: HttpMethod.GET,
        vpcLinkProxy: vpcLink,
        networkLoadBalancer: networkLoadBalancer,
      },
      {
        path: '/articles',
        httpMethod: HttpMethod.GET,
        vpcLinkProxy: vpcLink,
        networkLoadBalancer: networkLoadBalancer,
      },
      {
        path: '/articles',
        httpMethod: HttpMethod.POST,
        integration: new Integration({
          type: IntegrationType.HTTP_PROXY,
          integrationHttpMethod: 'POST',
          uri: 'http://localhost:8080/api/articles',
          options: {
            connectionType: ConnectionType.VPC_LINK,
            vpcLink: vpcLink,
            integrationResponses: [{
              statusCode: '200',
            }],
            requestParameters: {},
          },
        }),
        methodOptions: {
          methodResponses: [{
            statusCode: '200',
          }],
        },
      },
      {
        path: '/articles/{articleId}',
        httpMethod: HttpMethod.GET,
        vpcLinkProxy: vpcLink,
        networkLoadBalancer: networkLoadBalancer,
      },
      {
        path: '/authors',
        httpMethod: HttpMethod.GET,
        vpcLink: vpcLink,
        networkLoadBalancer: networkLoadBalancer,
      },
      {
        path: '/authors/{authorType}?query={query}&limit={limit?}',
        httpMethod: HttpMethod.GET,
        vpcLink: vpcLink,
        networkLoadBalancer: networkLoadBalancer,
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
  const expectAuthorTypeResourceId = {
    Ref: 'testapiauthorsauthorType70B82750',
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
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: '{articleId}',
  });
  template.resourceCountIs('AWS::ApiGateway::Resource', 4);
  template.hasResourceProperties('AWS::ApiGateway::Resource', {
    PathPart: 'articles',
    RestApiId: expectRestApiId,
  });
  template.resourceCountIs('AWS::ApiGateway::Method', 11);
  // GET:/
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: {
      'Fn::GetAtt': [
        expectRestApiId.Ref,
        'RootResourceId',
      ],
    },
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'GET',
      Type: 'HTTP_PROXY',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
    },
  });
  // GET:/articles
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'GET',
      Type: 'HTTP_PROXY',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
    },
  });
  // GET:/articles/{articleId}
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectArticleIdResourceId,
    RequestParameters: {
      'method.request.path.articleId': true,
    },
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'GET',
      Type: 'HTTP_PROXY',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
      RequestParameters: {
        'integration.request.path.articleId': 'method.request.path.articleId',
      },
    },
  });
  // POST:/articles
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'POST',
    RestApiId: expectRestApiId,
    ResourceId: expectArticlesResourceId,
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'POST',
      Type: 'HTTP_PROXY',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
    },
  });
  // GET:/authors
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorsResourceId,
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'GET',
      Type: 'HTTP',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
    },
  });
  // GET:/authors/{authorType}?query={query}&limit={limit?}
  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    RestApiId: expectRestApiId,
    ResourceId: expectAuthorTypeResourceId,
    RequestParameters: {
      'method.request.path.authorType': true,
      'method.request.querystring.query': false,
    },
    Integration: {
      ConnectionType: 'VPC_LINK',
      IntegrationHttpMethod: 'GET',
      Type: 'HTTP',
      IntegrationResponses: [
        {
          StatusCode: '200',
        },
      ],
      RequestParameters: {
        'integration.request.path.authorType': 'method.request.path.authorType',
        'integration.request.querystring.query': 'method.request.querystring.query',
      },
    },
  });
});
