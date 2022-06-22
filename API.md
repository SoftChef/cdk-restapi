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
  * **resources** (<code>Array<[RestApiResourceProps](#softchef-cdk-restapi-restapiresourceprops)></code>)  Define Rest API resources. 
  * **authorizationType** (<code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code>)  Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE. __*Optional*__
  * **authorizer** (<code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code>)  Specify globally Authorizer by aws-Authorizer, default is null. __*Optional*__
  * **deployOptions** (<code>[aws_apigateway.StageOptions](#aws-cdk-lib-aws-apigateway-stageoptions)</code>)  Specify globally AuthorizationType by aws-AuthorizationType, default is NONE Specify StageOptions. __*Optional*__
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
  * **lambdaFunction** (<code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code>)  Specify Lambda function. __*Default*__: undefined

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
**authorizationType**? | <code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code> | Specify globally AuthorizationType by aws-apigateway.AuthorizationType, default is NONE.<br/>__*Optional*__
**authorizer**? | <code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code> | Specify globally Authorizer by aws-Authorizer, default is null.<br/>__*Optional*__
**deployOptions**? | <code>[aws_apigateway.StageOptions](#aws-cdk-lib-aws-apigateway-stageoptions)</code> | Specify globally AuthorizationType by aws-AuthorizationType, default is NONE Specify StageOptions.<br/>__*Optional*__
**enableCors**? | <code>boolean</code> | Enable cors, default is true.<br/>__*Optional*__
**restApi**? | <code>[aws_apigateway.RestApi](#aws-cdk-lib-aws-apigateway-restapi)</code> | Custom RestApi.<br/>__*Optional*__



## struct RestApiResourceProps  <a id="softchef-cdk-restapi-restapiresourceprops"></a>






Name | Type | Description 
-----|------|-------------
**httpMethod** | <code>[HttpMethod](#softchef-cdk-restapi-httpmethod)</code> | Specify HTTP Method.
**path** | <code>string</code> | Define Resource path.
**authorizationType**? | <code>[aws_apigateway.AuthorizationType](#aws-cdk-lib-aws-apigateway-authorizationtype)</code> | Specify AuthorizationType by aws-apigateway.AuthorizationType.<br/>__*Default*__: AuthorizationType.NONE
**authorizer**? | <code>[aws_apigateway.IAuthorizer](#aws-cdk-lib-aws-apigateway-iauthorizer)</code> | Specify Authorizer by aws-Authorizer.<br/>__*Default*__: undefined
**integration**? | <code>[aws_apigateway.Integration](#aws-cdk-lib-aws-apigateway-integration)</code> | Specify integration.<br/>__*Default*__: undefined
**lambdaFunction**? | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | Specify Lambda function.<br/>__*Default*__: undefined



