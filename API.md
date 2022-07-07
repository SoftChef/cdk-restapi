# API Reference

**Classes**

Name|Description
----|-----------
[HttpMethod](#softchef-cdk-restapi-httpmethod)|*No description*
[RestApi](#softchef-cdk-restapi-restapi)|*No description*


**Structs**

Name|Description
----|-----------
[RestApiProps](#softchef-cdk-restapi-restapiprops)|*No description*
[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)|*No description*



## class HttpMethod  <a id="softchef-cdk-restapi-httpmethod"></a>




### Initializer




```ts
new HttpMethod(method: string)
```

* **method** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**method** | <code>string</code> | HTTP Method.
*static* **ANY** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP ANY Method.
*static* **DELETE** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP DELETE Method.
*static* **GET** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP GET Method.
*static* **HEAD** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP HEAD Method.
*static* **OPTIONS** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP OPTIONS Method.
*static* **PATCH** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP PATH Method.
*static* **POST** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP POST Method.
*static* **PUT** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | HTTP PUT Method.

### Methods


#### toString() <a id="softchef-cdk-restapi-httpmethod-tostring"></a>



```ts
toString(): string
```


__Returns__:
* <code>string</code>



## class RestApi  <a id="softchef-cdk-restapi-restapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new RestApi(scope: Construct, id: string, props: RestApiProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RestApiProps](#softchef-cdk-restapi-restapiprops)</code>)  *No description*
  * **defaultCorsPreflightOptions** (<code>[aws_apigateway.CorsOptions](#aws-cdk-lib-aws-apigateway-corsoptions)</code>)  Adds a CORS preflight OPTIONS method to this resource and all child resources. __*Default*__: CORS is disabled
  * **defaultIntegration** (<code>[aws_apigateway.Integration](#aws-cdk-lib-aws-apigateway-integration)</code>)  An integration to use as a default for all methods created within this API unless an integration is specified. __*Default*__: Inherited from parent.
  * **defaultMethodOptions** (<code>[aws_apigateway.MethodOptions](#aws-cdk-lib-aws-apigateway-methodoptions)</code>)  Method options to use as a default for all methods created within this API unless custom options are specified. __*Default*__: Inherited from parent.
  * **cloudWatchRole** (<code>boolean</code>)  Automatically configure an AWS CloudWatch role for API Gateway. __*Default*__: true
  * **deploy** (<code>boolean</code>)  Indicates if a Deployment should be automatically created for this API, and recreated when the API model (resources, methods) changes. __*Default*__: true
  * **deployOptions** (<code>[aws_apigateway.StageOptions](#aws-cdk-lib-aws-apigateway-stageoptions)</code>)  Options for the API Gateway stage that will always point to the latest deployment when `deploy` is enabled. __*Default*__: Based on defaults of `StageOptions`.
  * **disableExecuteApiEndpoint** (<code>boolean</code>)  Specifies whether clients can invoke the API using the default execute-api endpoint. __*Default*__: false
  * **domainName** (<code>[aws_apigateway.DomainNameOptions](#aws-cdk-lib-aws-apigateway-domainnameoptions)</code>)  Configure a custom domain name and map it to this API. __*Default*__: no domain name is defined, use `addDomainName` or directly define a `DomainName`.
  * **endpointExportName** (<code>string</code>)  Export name for the CfnOutput containing the API endpoint. __*Default*__: when no export name is given, output will be created without export
  * **endpointTypes** (<code>Array<[aws_apigateway.EndpointType](#aws-cdk-lib-aws-apigateway-endpointtype)></code>)  A list of the endpoint types of the API. __*Default*__: EndpointType.EDGE
  * **failOnWarnings** (<code>boolean</code>)  Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource. __*Default*__: false
  * **parameters** (<code>Map<string, string></code>)  Custom header parameters for the request. __*Default*__: No parameters.
  * **policy** (<code>[aws_iam.PolicyDocument](#aws-cdk-lib-aws-iam-policydocument)</code>)  A policy document that contains the permissions for this RestApi. __*Default*__: No policy.
  * **restApiName** (<code>string</code>)  A name for the API Gateway RestApi resource. __*Default*__: ID of the RestApi construct.
  * **retainDeployments** (<code>boolean</code>)  Retains old deployment resources when the API changes. __*Default*__: false
  * **apiKeySourceType** (<code>[aws_apigateway.ApiKeySourceType](#aws-cdk-lib-aws-apigateway-apikeysourcetype)</code>)  The source of the API key for metering requests according to a usage plan. __*Default*__: Metering is disabled.
  * **binaryMediaTypes** (<code>Array<string></code>)  The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream". __*Default*__: RestApi supports only UTF-8-encoded text payloads.
  * **cloneFrom** (<code>[aws_apigateway.IRestApi](#aws-cdk-lib-aws-apigateway-irestapi)</code>)  The ID of the API Gateway RestApi resource that you want to clone. __*Default*__: None.
  * **description** (<code>string</code>)  A description of the purpose of this API Gateway RestApi resource. __*Default*__: No description.
  * **endpointConfiguration** (<code>[aws_apigateway.EndpointConfiguration](#aws-cdk-lib-aws-apigateway-endpointconfiguration)</code>)  The EndpointConfiguration property type specifies the endpoint types of a REST API. __*Default*__: EndpointType.EDGE
  * **minimumCompressionSize** (<code>number</code>)  A nullable integer that is used to enable compression (with non-negative between 0 and 10485760 (10M) bytes, inclusive) or disable compression (when undefined) on an API. __*Default*__: Compression is disabled.
  * **resources** (<code>Array<[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)></code>)  Define Rest API resources. 
  * **authorizationType** (<code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code>)  Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE. __*Optional*__
  * **authorizer** (<code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code>)  Specify globally Authorizer by aws-Authorizer, default is null. __*Optional*__
  * **enableCors** (<code>boolean</code>)  Enable cors, default is true. __*Optional*__
  * **restApi** (<code>[aws_apigateway.RestApi](#aws-cdk-lib-aws-apigateway-restapi)</code>)  Custom RestApi. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**restApiId** | <code>string</code> | <span></span>
**url** | <code>string</code> | <span></span>

### Methods


#### addResource(resource) <a id="softchef-cdk-restapi-restapi-addresource"></a>



```ts
addResource(resource: RestApiResourceProps): RestApi
```

* **resource** (<code>[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)</code>)  *No description*
  * **httpMethod** (<code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code>)  Specify HTTP Method. 
  * **path** (<code>string</code>)  Define Resource path. 
  * **authorizationType** (<code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code>)  Specify AuthorizationType by aws-apigateway.AuthorizationType. __*Default*__: AuthorizationType.NONE
  * **authorizer** (<code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code>)  Specify Authorizer by aws-Authorizer. __*Default*__: undefined
  * **integration** (<code>[aws_apigateway.Integration](#aws-cdk-lib-aws-apigateway-integration)</code>)  Specify integration. __*Default*__: undefined
  * **lambdaFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  Specify Lambda function to integration. __*Default*__: undefined
  * **methodOptions** (<code>[aws_apigateway.MethodOptions](#aws-cdk-lib-aws-apigateway-methodoptions)</code>)  Specify method options. __*Default*__: undefined
  * **networkLoadBalancer** (<code>[aws_elasticloadbalancingv2.INetworkLoadBalancer](#aws-cdk-lib-aws-elasticloadbalancingv2-inetworkloadbalancer)</code>)  Specify NLB with VPC Link to integration Only supported Network Load Balancer https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html#http-api-vs-rest.differences.management The VPCLink / VPCLinkProxy & NetworkLoadBalancer are Integration Helper You can define the path like example will automatically identify pathParameters & queryStringParameters to add "RequestParameters" mapping to your origin service example: /groups/{groupId}/users/{userId}?type={type}&enabled={enabled?} the "enabled" has "?", it's be optional. ``` {   Integration: {     Options: {       RequestParameters: {         'integration.request.path.groupId': 'method.request.path.groupId',         'integration.request.path.userId': 'method.request.path.userId',         'integration.request.querystring.type': 'method.request.querystring.type',         'integration.request.querystring.enabled': 'method.request.querystring.enabled',       }     }   },   RequestParameter: {     'method.request.path.groupId': true,     'method.request.path.userId': true,     'method.request.querystring.type': true,     'method.request.querystring.enabled': false,   } }```. __*Optional*__
  * **vpcLink** (<code>[aws_apigateway.VpcLink](#aws-cdk-lib-aws-apigateway-vpclink)</code>)  Specify VPC Link to integration. __*Optional*__
  * **vpcLinkIntegrationOptions** (<code>[aws_apigateway.IntegrationOptions](#aws-cdk-lib-aws-apigateway-integrationoptions)</code>)  Speficy VPC Link integration options. __*Optional*__
  * **vpcLinkProxy** (<code>[aws_apigateway.VpcLink](#aws-cdk-lib-aws-apigateway-vpclink)</code>)  Specify VPC Link Proxy to integration. __*Optional*__

__Returns__:
* <code>[RestApi](#softchef-cdk-restapi-restapi)</code>

#### addResources(resources) <a id="softchef-cdk-restapi-restapi-addresources"></a>



```ts
addResources(resources: Array<RestApiResourceProps>): RestApi
```

* **resources** (<code>Array<[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)></code>)  *No description*

__Returns__:
* <code>[RestApi](#softchef-cdk-restapi-restapi)</code>



## struct RestApiProps  <a id="softchef-cdk-restapi-restapiprops"></a>






Name | Type | Description 
-----|------|-------------
**resources** | <code>Array<[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)></code> | Define Rest API resources.
**apiKeySourceType**? | <code>[aws_apigateway.ApiKeySourceType](#aws-cdk-lib-aws-apigateway-apikeysourcetype)</code> | The source of the API key for metering requests according to a usage plan.<br/>__*Default*__: Metering is disabled.
**authorizationType**? | <code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code> | Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE.<br/>__*Optional*__
**authorizer**? | <code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code> | Specify globally Authorizer by aws-Authorizer, default is null.<br/>__*Optional*__
**binaryMediaTypes**? | <code>Array<string></code> | The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream".<br/>__*Default*__: RestApi supports only UTF-8-encoded text payloads.
**cloneFrom**? | <code>[aws_apigateway.IRestApi](#aws-cdk-lib-aws-apigateway-irestapi)</code> | The ID of the API Gateway RestApi resource that you want to clone.<br/>__*Default*__: None.
**cloudWatchRole**? | <code>boolean</code> | Automatically configure an AWS CloudWatch role for API Gateway.<br/>__*Default*__: true
**defaultCorsPreflightOptions**? | <code>[aws_apigateway.CorsOptions](#aws-cdk-lib-aws-apigateway-corsoptions)</code> | Adds a CORS preflight OPTIONS method to this resource and all child resources.<br/>__*Default*__: CORS is disabled
**defaultIntegration**? | <code>[aws_apigateway.Integration](#aws-cdk-lib-aws-apigateway-integration)</code> | An integration to use as a default for all methods created within this API unless an integration is specified.<br/>__*Default*__: Inherited from parent.
**defaultMethodOptions**? | <code>[aws_apigateway.MethodOptions](#aws-cdk-lib-aws-apigateway-methodoptions)</code> | Method options to use as a default for all methods created within this API unless custom options are specified.<br/>__*Default*__: Inherited from parent.
**deploy**? | <code>boolean</code> | Indicates if a Deployment should be automatically created for this API, and recreated when the API model (resources, methods) changes.<br/>__*Default*__: true
**deployOptions**? | <code>[aws_apigateway.StageOptions](#aws-cdk-lib-aws-apigateway-stageoptions)</code> | Options for the API Gateway stage that will always point to the latest deployment when `deploy` is enabled.<br/>__*Default*__: Based on defaults of `StageOptions`.
**description**? | <code>string</code> | A description of the purpose of this API Gateway RestApi resource.<br/>__*Default*__: No description.
**disableExecuteApiEndpoint**? | <code>boolean</code> | Specifies whether clients can invoke the API using the default execute-api endpoint.<br/>__*Default*__: false
**domainName**? | <code>[aws_apigateway.DomainNameOptions](#aws-cdk-lib-aws-apigateway-domainnameoptions)</code> | Configure a custom domain name and map it to this API.<br/>__*Default*__: no domain name is defined, use `addDomainName` or directly define a `DomainName`.
**enableCors**? | <code>boolean</code> | Enable cors, default is true.<br/>__*Optional*__
**endpointConfiguration**? | <code>[aws_apigateway.EndpointConfiguration](#aws-cdk-lib-aws-apigateway-endpointconfiguration)</code> | The EndpointConfiguration property type specifies the endpoint types of a REST API.<br/>__*Default*__: EndpointType.EDGE
**endpointExportName**? | <code>string</code> | Export name for the CfnOutput containing the API endpoint.<br/>__*Default*__: when no export name is given, output will be created without export
**endpointTypes**? | <code>Array<[aws_apigateway.EndpointType](#aws-cdk-lib-aws-apigateway-endpointtype)></code> | A list of the endpoint types of the API.<br/>__*Default*__: EndpointType.EDGE
**failOnWarnings**? | <code>boolean</code> | Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource.<br/>__*Default*__: false
**minimumCompressionSize**? | <code>number</code> | A nullable integer that is used to enable compression (with non-negative between 0 and 10485760 (10M) bytes, inclusive) or disable compression (when undefined) on an API.<br/>__*Default*__: Compression is disabled.
**parameters**? | <code>Map<string, string></code> | Custom header parameters for the request.<br/>__*Default*__: No parameters.
**policy**? | <code>[aws_iam.PolicyDocument](#aws-cdk-lib-aws-iam-policydocument)</code> | A policy document that contains the permissions for this RestApi.<br/>__*Default*__: No policy.
**restApi**? | <code>[aws_apigateway.RestApi](#aws-cdk-lib-aws-apigateway-restapi)</code> | Custom RestApi.<br/>__*Optional*__
**restApiName**? | <code>string</code> | A name for the API Gateway RestApi resource.<br/>__*Default*__: ID of the RestApi construct.
**retainDeployments**? | <code>boolean</code> | Retains old deployment resources when the API changes.<br/>__*Default*__: false



## struct RestApiResourceProps  <a id="softchef-cdk-restapi-restapiresourceprops"></a>






Name | Type | Description 
-----|------|-------------
**httpMethod** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | Specify HTTP Method.
**path** | <code>string</code> | Define Resource path.
**authorizationType**? | <code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code> | Specify AuthorizationType by aws-apigateway.AuthorizationType.<br/>__*Default*__: AuthorizationType.NONE
**authorizer**? | <code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code> | Specify Authorizer by aws-Authorizer.<br/>__*Default*__: undefined
**integration**? | <code>[aws_apigateway.Integration](#aws-cdk-lib-aws-apigateway-integration)</code> | Specify integration.<br/>__*Default*__: undefined
**lambdaFunction**? | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | Specify Lambda function to integration.<br/>__*Default*__: undefined
**methodOptions**? | <code>[aws_apigateway.MethodOptions](#aws-cdk-lib-aws-apigateway-methodoptions)</code> | Specify method options.<br/>__*Default*__: undefined
**networkLoadBalancer**? | <code>[aws_elasticloadbalancingv2.INetworkLoadBalancer](#aws-cdk-lib-aws-elasticloadbalancingv2-inetworkloadbalancer)</code> | Specify NLB with VPC Link to integration Only supported Network Load Balancer https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html#http-api-vs-rest.differences.management The VPCLink / VPCLinkProxy & NetworkLoadBalancer are Integration Helper You can define the path like example will automatically identify pathParameters & queryStringParameters to add "RequestParameters" mapping to your origin service example: /groups/{groupId}/users/{userId}?type={type}&enabled={enabled?} the "enabled" has "?", it's be optional. ``` {   Integration: {     Options: {       RequestParameters: {         'integration.request.path.groupId': 'method.request.path.groupId',         'integration.request.path.userId': 'method.request.path.userId',         'integration.request.querystring.type': 'method.request.querystring.type',         'integration.request.querystring.enabled': 'method.request.querystring.enabled',       }     }   },   RequestParameter: {     'method.request.path.groupId': true,     'method.request.path.userId': true,     'method.request.querystring.type': true,     'method.request.querystring.enabled': false,   } }```.<br/>__*Optional*__
**vpcLink**? | <code>[aws_apigateway.VpcLink](#aws-cdk-lib-aws-apigateway-vpclink)</code> | Specify VPC Link to integration.<br/>__*Optional*__
**vpcLinkIntegrationOptions**? | <code>[aws_apigateway.IntegrationOptions](#aws-cdk-lib-aws-apigateway-integrationoptions)</code> | Speficy VPC Link integration options.<br/>__*Optional*__
**vpcLinkProxy**? | <code>[aws_apigateway.VpcLink](#aws-cdk-lib-aws-apigateway-vpclink)</code> | Specify VPC Link Proxy to integration.<br/>__*Optional*__



