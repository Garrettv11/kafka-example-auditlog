# Test API Documentation
## Version: 0.0.1

### /version

#### GET
##### Summary:

Retrieves the current version of the service.

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /v2/hapistarterkit/MyModels/{id}

#### GET
##### Summary:

Get the MyModel that has the supplied id.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | id of MyModel instance to get | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | example instance of MyModel with the unique ID present | [MyModelResponse](#mymodelresponse) |
| 403 | Forbidden | string |

### /v2/hapistarterkit/MyModels

#### POST
##### Summary:

Create a MyModel

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [MyModel](#mymodel) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | id of newly created MyModel | integer |
| 400 | Bad Request | string |

### Models


#### MyModelResponse

example instance of MyModel with the unique ID present

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer | ID of the example model | Yes |
| description | string | Description of the example model | No |

#### MyModel

example model payload that would be used to create a new MyModel instance

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| description | string | Description of the example model | No |