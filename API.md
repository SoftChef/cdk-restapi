# API Reference

**Classes**

Name|Description
----|-----------
[HttpMethod](#sccdk-restapi-httpmethod)|*No description*
[RestApi](#sccdk-restapi-restapi)|*No description*


**Structs**

Name|Description
----|-----------
[RestApiProps](#sccdk-restapi-restapiprops)|*No description*
[RestApiResourceProps](#sccdk-restapi-restapiresourceprops)|*No description*



## class HttpMethod  <a id="sccdk-restapi-httpmethod"></a>




### Initializer




```ts
new HttpMethod(method: string)
```

* **method** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**method** | <code>string</code> | HTTP Method.
*static* **DELETE** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP DELETE Method.
*static* **GET** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP GET Method.
*static* **HEAD** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP HEAD Method.
*static* **OPTIONS** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP OPTIONS Method.
*static* **PATCH** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP PATH Method.
*static* **POST** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP POST Method.
*static* **PUT** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | HTTP PUT Method.

### Methods


#### toString() <a id="sccdk-restapi-httpmethod-tostring"></a>



```ts
toString(): string
```


__Returns__:
* <code>string</code>



## class RestApi  <a id="sccdk-restapi-restapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new RestApi(scope: Construct, id: string, props: RestApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RestApiProps](#sccdk-restapi-restapiprops)</code>)  *No description*
  * **resources** (<code>Array<[RestApiResourceProps](#sccdk-restapi-restapiresourceprops)></code>)  Define Rest API resources. 
  * **addCorsPreflight** (<code>boolean</code>)  Enable cors, default is true. __*Optional*__
  * **restApi** (<code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code>)  Custom RestApi. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**origin** | <code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code> | <span></span>
**restApiId** | <code>string</code> | <span></span>
**url** | <code>string</code> | <span></span>



## struct RestApiProps  <a id="sccdk-restapi-restapiprops"></a>






Name | Type | Description 
-----|------|-------------
**resources** | <code>Array<[RestApiResourceProps](#sccdk-restapi-restapiresourceprops)></code> | Define Rest API resources.
**addCorsPreflight**? | <code>boolean</code> | Enable cors, default is true.<br/>__*Optional*__
**restApi**? | <code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code> | Custom RestApi.<br/>__*Optional*__



## struct RestApiResourceProps  <a id="sccdk-restapi-restapiresourceprops"></a>






Name | Type | Description 
-----|------|-------------
**httpMethod** | <code>[HttpMethod](#sccdk-restapi-httpmethod)</code> | Specify HTTP Method.
**lambdaFunction** | <code>[Function](#aws-cdk-aws-lambda-function)</code> | Specify Lambda function.
**path** | <code>string</code> | Define Resource path.
**authorizationType**? | <code>[AuthorizationType](#aws-cdk-aws-apigateway-authorizationtype)</code> | Specify AuthorizationType by aws-apigateway.AuthorizationType, default is NONE.<br/>__*Optional*__
**authorizer**? | <code>[IAuthorizer](#aws-cdk-aws-apigateway-iauthorizer)</code> | Specify Authorizer by aws-apigateway.Authorizer, default is null.<br/>__*Optional*__



