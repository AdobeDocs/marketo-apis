---
title: Custom Objects
description: "Learn how to create and manage Marketo Custom Objects via REST API, including list and describe endpoints, metadata, relationships, fields, and queries."
---

# Custom Objects

[**Custom Object Endpoint Reference**](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects) Marketo allows users to define Marketo Custom Objects which are related to Marketo Standard Objects (Leads, Companies) or other Marketo Custom Objects.  Marketo Custom Objects can be created using the Marketo UI as described [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/create-marketo-custom-objects), or by using the Custom Object Metadata API as described below.

An appropriate Marketo subscription type is required to access the Custom Object Metadata API.  Please consult your CSM for details.

## List

In addition to the standard describe, query, update, and delete calls available for lead database objects, Custom Objects have a [list call](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectsUsingGET) available.  Calling this endpoint will return a response with a list of custom objects available in the destination instance, along with additional metadata about the objects.

```http
GET /rest/v1/customobjects.json
```

```json
{
   "requestId":"185d6#14b51985ff0",
   "success":true,
   "result":[
      {
         "name":"Car",
         "displayName":"Car",
         "description":"Car owner",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:24Z",
         "idField":"marketoGUID",
         "dedupeFields":["vin"],
         "searchableFields":[
            ["vin"],
            ["marketoGUID"],
            ["siebelId"]
         ],
         "relationships":[
            {
               "field":"siebelId",
               "type":"parent",
               "relatedTo":{
                  "name":"Lead",
                  "field":"siebelId"
               }
            }
         ]
      }
   ]
}
```

The response will give a list of the relationships present on each object.  A relationship will have a `field` member which indicates the field on the object which holds the link value, a `type` member which indicates if the relationship is to a parent or a child type object, and a `relatedTo` object indicating the name of the related object, and the link field on that object.

## Describe

The [describe call](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/describeUsingGET_1) for custom objects follows the same pattern as that of Opportunities and Companies, with the addition of the `relationships` array in the response and an `apiName` path parameter in the URI which takes the API name of the custom object type to be described.  Like the list call, this will list any relationships that are available for this custom object type.

```http
GET /rest/v1/customobjects/{apiName}/describe.json
```

```json
{
   "requestId":"185d6#14b51985ff0",
   "success":true,
   "result":[
      {
         "name":"Car",
         "displayName":"Car",
         "description":"Car owner",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:24Z",
         "idField":"marketoGUID",
         "dedupeFields":["vin"],
         "searchableFields":[
            ["vin"],
            ["marketoGUID"],
            ["siebelId"]
         ],
         "relationships":[
            {
               "field":"siebelId",
               "type":"parent",
               "object":{
                  "name":"Lead",
                  "field":"siebelId"
               }
            }
         ],
         "fields":[
            {
               "name":"marketoGUID",
               "displayName":"Marketo GUID",
               "dataType":"string",
               "length":36,
               "updateable":false
            },
            {
               "name":"createdAt",
               "displayName":"Created At",
               "dataType":"datetime",
               "updateable":false
            },
            {
               "name":"updatedAt",
               "displayName":"Updated At",
               "dataType":"datetime",
               "updateable":false
            },
            {
               "name":"vin",
               "displayName":"VIN",
               "description":"Vehicle Identification Number",
               "dataType":"string",
               "length":36,
               "updateable":false
            },
            {
               "name":"siebelId",
               "displayName":"External Id",
               "description":"External Id",
               "dataType":"string",
               "length":36,
               "updateable":true
            },
            {
               "name":"make",
               "displayName":"Make",
               "dataType":"string",
               "length":36,
               "updateable":true
            },
            {
               "name":"model",
               "displayName":"Model",
               "description":"Vehicle Model",
               "dataType":"string",
               "length":255,
               "updateable":true
            },
            {
               "name":"year",
               "displayName":"Year",
               "dataType":"integer",
               "updateable":true
            },
            {
               "name":"color",
               "displayName":"Color",
               "description":"Vehicle color",
               "dataType":"String",
               "length": 255,
               "updateable":true
            }
         ]
      }
   ]
}
```

## Query

[Querying custom objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectsUsingGET) is slightly different from other Lead Database APIs, and takes `apiName` path parameter like describe.  For a normal filterType parameters, the query is a simple GET like queries for other types of records, and requires a `filterType` and `filterValues`.  It will optionally accept `**fields**`, `batchSize`, and `nextPageToken` parameters.  When requesting a list of fields, if a particular field is requested, but not returned, the value is implied to be null.

```http
GET /rest/v1/customobjects/{apiName}.json?filterType=idField&filterValues=dff23271-f996-47d7-984f-f2676861b5fa,dff23271-f996-47d7-984f-f2676861b5fb
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fa",
         "vin":"19UYA31581L000000",
         "createdAt":"2015-02-23T18:21:53Z",
         "updatedAt":"2015-02-23T18:23:41Z"
      },
      {
         "seq":1,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb",
         "vin":"29UYA31581L000000",
         "createdAt":"2015-02-23T18:21:53Z",
         "updatedAt":"2015-02-23T18:23:41Z"
      },
   ]
}
```

Alternatively, when querying with compound keys, the API behaves like the Opportunity Roles API, accepting a POST with a JSON body.  The JSON body may have the same members as a GET query, except for `filterValues`.  Instead of filter values, there is an `input` array which takes objects which contain a member named for each of the object type's `dedupeFields`.

```http
POST /rest/v1/customobjects/{apiName}.json?_method=GET
```

```json
{
   "filterType":"dedupeFields",
   "fields":[
      "marketoGuid",
      "Bedrooms",
      "yearBuilt"
   ],
   "input":[
      {
         "mlsNum":"1962352",
         "houseOwnerId":"42645756"
      },
      {
         "mlsNum":"2962352",
         "houseOwnerId":"52645756"
      },
      {
         "mlsNum":"3962352",
         "houseOwnerId":"62645756"
      }
   ]
}
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fa",
         "Bedrooms":3,
         "yearBuilt":1948,
         "createdAt":"2015-02-23T18:21:53Z",
         "updatedAt":"2015-02-23T18:23:41Z"
      },
      {
         "seq":1,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb",
         "Bedrooms":4,
         "yearBuilt":1956,
         "createdAt":"2015-02-23T18:21:53Z",
         "updatedAt":"2015-02-23T18:23:41Z"
      },
      {
         "seq":2,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fc",
         "Bedrooms":3,
         "yearBuilt":2001,
         "createdAt":"2015-02-23T18:21:53Z",
         "updatedAt":"2015-02-23T18:23:41Z"
      }
   ]
}
```

## Create and Update

Use the [Sync Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/syncCustomObjectsUsingPOST) endpoint to create or update custom objects, you can specify the operation using the `action` parameter.  Up to 300 records can be created or updated in one call.  The values used in the `input` array are largely based on the information returned by the [Describe Custom Objects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/endpoint-reference#!/Custom_Objects/describeUsingGET_1) endpoint. In an example car object, there is just one dedupe field, `vin`.  In order to update or create records when using dedupeFields mode, each record in our input array needs to include at least a `vin` field.

```http
POST /rest/v1/customobjects/{apiName}.json
```

```json
{
   "action":"updateOnly",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "vin":"19UYA31581L000000",
         "siebelId":"f2676861b5fb",
         "make":"BMW",
         "model":"3-Series 330i",
         "year":2003
      },
      {
         "vin":"29UYA31581L000000",
         "siebelId":"f2676861b5fc",
         "make":"BMW",
         "model":"3-Series 330i",
         "year":2003
      },
      {
         "vin":"39UYA31581L000000",
         "siebelId":"f2676861b5fd",
         "make":"BMW",
         "model":"3-Series 330i",
         "year":2003
      }
   ]
}
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "status": "updated",
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb"
      },
      {
         "seq":1,
         "status": "created",
         "marketoGUID":"cff23271-f996-47d7-984f-f2676861b5fb"
      },
      {
         "seq":2,
         "status": "skipped"
         "reasons":[
            {
               "code":"1004",
               "message":"Lead not found"
            }
         ]
      }
   ]
}
```

When performing updates via `idField` mode, the `idField` will always be `marketoGUID`, so each record will always require a `marketoGUID` field.  Remember that `idField` is only valid for the updateOnly action type, as this field is always system managed.  Your response will include the **status** of each individual record in the result array, and either a `marketoGUID` or a `reasons` array depending on whether or not the operation was successful for an individual record.

## Delete

[Deleting records](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/deleteCustomObjectsUsingPOST) is very straightforward.  Just select your `deleteBy` mode, either `idField` or `dedupeFields`, and include the corresponding fields in each of the records in your `input` array. A maximum of 300 records per call is allowed.

```http
POST /rest/v1/customobjects/{apiName}/delete.json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "vin":"19UYA31581L000000"
      },
      {
         "vin":"29UYA31581L000000"
      },
      {
         "vin":"39UYA31581L000000"
      }
   ]
}

{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb",
         "status": "deleted"
      },
      {
         "seq":1,
         "marketoGUID":"da42707c-4dc4-4fc1-9fef-f30a3017240a",
         "status": "deleted"
      },
      {
         "seq":2,
         "status": "skipped"
         "reasons":[
            {
               "code":"1013",
               "message":"Object not found"
            }
         ]
      }
   ]
}
```

Like updating, your result will contain a status for each individual record, and either a `marketoGUID` or a `reasons` array depending on whether the delete was successful.

## Custom Object Types

The Custom Object Metadata API allows you to remotely manage custom object schemas.  The API allows you to create a new Custom Object Type or modify an existing one.  Once the Custom Object Type has been created or modified, it must be approved for use.  For more information about custom objects, please see product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/home).

* Custom object types created by the API may not be modified using the Marketo UI
* The maximum number of custom objects types allowed is 10
* The maximum number of custom object fields allowed is 50 per type
* Custom object type API Names and Display Names may contain alphanumeric characters and underscore "_"

### Query Type

There are two ways to retrieve custom object type metadata: Describe Custom Object Type, which returns  the record for a single custom object type, and is filterable by approval state, and List Custom Object Types, which returns a list of all custom object types in the subscription, and is filterable by name and by approval state.

### Describe Type

The [Describe Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/describeUsingGET_1) endpoint returns metadata for a single custom object type. The required `apiName` path parameter is the API name of the custom object type that is described.  If an approved version exists, it is returned.  Otherwise the draft version is returned.  The optional `state` parameter is used to specify the version to return: `draft`, `approved`, or `approvedWithDraft`.

```http
GET /rest/v1/customobjects/schema/{apiName}/describe.json?state=approved
```

```json
{
    "requestId": "d9bf#16876fa84b9",
    "result": [
        {
            "state": "approved",
            "version": "approved",
            "displayName": "Car",
            "description": "Automobile owned",
            "apiName": "car",
            "idField": "marketoGUID",
            "createdAt": "2019-01-22T19:12:18Z",
            "updatedAt": "2019-01-22T19:12:18Z",
            "dedupeFields": [
                "vin"
            ],
            "searchableFields": [
                [
                    "vin"
                ],
                [
                    "marketoGUID"
                ],
                [
                    "leadID"
                ]
            ],
            "relationships": [
                {
                    "field": "leadID",
                    "type": "child",
                    "relatedTo": {
                        "name": "Lead",
                        "field": "id"
                    }
                }
            ],
            "fields": [
                {
                    "name": "createdAt",
                    "displayName": "Created At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "Updated At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "leadID",
                    "displayName": "Lead ID",
                    "dataType": "integer",
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "make",
                    "displayName": "Make",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "model",
                    "displayName": "Model",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "vin",
                    "displayName": "VIN",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "year",
                    "displayName": "Year",
                    "dataType": "integer",
                    "updateable": true,
                    "crmManaged": false
                }
            ]
        }
    ],
    "success": true
}
```

Here we can to see the following attributes:

* Metadata: state, displayName, description, apiName, idField, createdAt, updatedAt, dedupeFields, searchableFields, relationships
* Standard fields: marketoGUID, createdAt, updatedAt
* Custom fields leadId, vin, make,  model, year

### List Types

The [List Custom Object Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/listCustomObjectTypesUsingGET) endpoint returns metadata for all custom object types available in the destination instance.  Note that this endpoint is similar to [List Custom Objects](https://experienceleague.adobe.com/docs/marketo-developer/marketo/soap/custom-objects/custom-objects.html?lang=en), but is more comprehensive and includes additional metadata such as state, relationships, and fields. If an approved version exists, it is returned.  Otherwise the draft version is returned.  The optional **state** parameter is used to specify the version of the custom object type to return: **draft**, **approved**, or **approvedWithDraft**.  The optional **names** parameter is used to specify specific names of custom object types to return; it is structured as a comma separated list of API names.

```http
GET /rest/v1/customobjects/schema.json?names=purchaseHistory
```

```json
{
    "requestId": "a181#167ebe94703",
    "result": [
        {
            "state": "approved",
            "displayName": "Purchases",
            "description": "Purchase data",
            "apiName": "purchaseHistory",
            "idField": "marketoGUID",
            "createdAt": "2014-09-12T16:13:37Z",
            "updatedAt": "2014-09-12T16:13:42Z",
            "dedupeFields": [
                "lead_id",
                "product_name"
            ],
            "searchableFields": [
                [
                    "lead_id",
                    "product_name"
                ],
                [
                    "marketoGUID"
                ],
                [
                    "lead_id"
                ]
            ],
            "relationships": [
                {
                    "field": "lead_id",
                    "type": "child",
                    "relatedTo": {
                        "name": "Lead",
                        "field": "lead_id"
                    }
                }
            ],
            "fields": [
                {
                    "name": "marketoGUID",
                    "displayName": "marketoGUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "amount",
                    "displayName": "Amount",
                    "dataType": "float",
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "lead_id",
                    "displayName": "lead_id",
                    "dataType": "integer",
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "product_name",
                    "displayName": "Product Name",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "purchase_date",
                    "displayName": "Transaction Date",
                    "dataType": "datetime",
                    "updateable": true,
                    "crmManaged": false
                }
            ]
        },
        {
            "state": "approved",
            "version": "approved",
            "displayName": "Car",
            "description": "No really, it is a car!",
            "apiName": "car_c",
            "idField": "marketoGUID",
            "createdAt": "2017-02-22T19:55:51Z",
            "updatedAt": "2018-12-11T23:52:56Z",
            "dedupeFields": [
                "vin"
            ],
            "searchableFields": [
                [
                    "vin"
                ],
                [
                    "marketoGUID"
                ]
            ],
            "relationships": [],
            "fields": [
                {
                    "name": "createdAt",
                    "displayName": "Created At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "Updated At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "color",
                    "displayName": "Color",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "make",
                    "displayName": "Make",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "model",
                    "displayName": "Model",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "vin",
                    "displayName": "VIN",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "year",
                    "displayName": "Year",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                }
            ]
        }
    ],
    "success": true
}
```

### Create and Update Type

#### Create Type

The [Sync Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/syncCustomObjectsUsingPOST) endpoint is used to create or update a custom object type.  The record operation to perform is controlled by the optional **action** attribute which can be **createOnly**, **createOrUpdate**, or **updateOnly**.  Default setting is createOrUpdate. The **displayName** and **apiName** attributes are required, except when using updateOnly as your action.   Both must be unique to avoid collisions with customer-provisioned types.  If you are a LaunchPoint partner, you should prepend a representative namespace to these names.  For apiName, the convention is to use lowercase or camelCase to help distinguish between other text strings. The optional **pluralName** attribute specifies the plural form of displayName.  The optional **description** attribute is used to describe the custom object type.  The optional **showInLeadDetail** boolean attribute is used to enable viewing custom object data within the Lead Database page of the Marketo UI.  Default setting is false.

Be careful when naming custom objects. When creating a new custom object, it is recommended that you prefix the name with a string that indicates your company name (alphanumeric or underscore permitted). This makes the custom object easily searchable in the MLM UI, and also helps unsure that the name is unique.

Here is an example of creating a new custom object type with API  Name "transaction".

```http
POST /rest/v1/customobjects/schema.json
```

```json
{
  "action":"createOnly",
  "displayName": "Transaction",
  "apiName": "transaction",
  "description": "Commerce happens"
}
```

```json
{
    "requestId": "fb9d#167f2879557",
    "result": [],
    "success": true
}
```

Here is a subsequent call to describe the newly created type.

```http
GET /rest/v1/customobjects/schema/transaction/describe.json
```

```json
{
    "requestId": "cf9b#167f28db0a9",
    "result": [
        {
            "state": "draft",
            "displayName": "Transaction",
            "description": "Commerce happens",
            "apiName": "transaction",
            "idField": null,
            "createdAt": null,
            "updatedAt": null,
            "dedupeFields": [],
            "searchableFields": [
                []
            ],
            "relationships": [],
            "fields": [
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "createdAt",
                    "displayName": "Created At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "Updated At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                }
            ]
        }
    ],
    "success": true
}
```

Here we can see the following custom object-related data:

* Metadata: state, displayName, description, apiName, idField, createdAt, updatedAt, dedupeFields, searchableFields, relationships
* Standard fields: marketoGUID, createdAt, updatedAt

#### Update Type

Here is an example of updating the Description for an existing type whose API Name is "transaction".  The **apiName** attribute is required.  Here we will assume that the type already exists and use updateOnly for the optional **action** attribute.  Aside from **apiName**, the attributes available for creation may be updated.

```http
POST /rest/v1/customobjects/schema.json
```

```json
{
  "action":"updateOnly",
  "apiName": "transaction",
  "description":"No really, commerce happens!"
}
```

```json
{
    "requestId": "103c3#167f2223fd7",
    "result": [],
    "success": true
}
```

## Approval of Type

Custom object types must be approved before they can be used. When a new custom object type is created using [Sync Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/syncCustomObjectTypeUsingPOST) endpoint, it is created as a draft version. When you are done adding custom fields, you must approve the draft version. This creates an approved version and deletes the draft version. When an existing custom object type is modified by using Sync Custom Object Type endpoint, or by using one of Add/Update/Delete Custom Object Type Field endpoints, a draft version is created. All modifications to the type or to its fields impact the draft version only. When you are done modifying, you must approve the draft version. This replaces the approved version with the draft version, and deletes the draft version. For more information about custom object approval, please see product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/approve-a-custom-object).

Once a custom object type is approved, you cannot:

* Update the `displayName` or `apiName`
* Add or remove a link field
* Add or remove a dedupe field

For these reasons, it is important to carefully think through the schema and naming convention that you plan to use.

### Approve Type

Use the [Approve Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/approveCustomObjectTypeUsingPOST) endpoint to publish a draft version as the new approved version.  **apiName** is the only required parameter as a path parameter.  A type cannot be approved unless it is in draft state, and satisfies a set of validation rules described [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/approve-a-custom-object).

```http
POST /rest/v1/customobjects/schema/{apiName}/approve.json

```

```json
{
    "requestId": "11d86#1685304a983",
    "result": [],
    "success": true
}
```

### Discard Type

Use the [Discard Custom Object Type Draft](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/discardCustomObjectTypeUsingPOST) endpoint to delete a draft version. `apiName` is the only required parameter as a path parameter. A type must be in draft state to be discarded, that is an approved type cannot be discarded.

```http
POST /rest/v1/customobjects/schema/{apiName}/discardDraft.json
```

```json
{
    "requestId": "5228#1684edde793",
    "result": [],
    "success": true
}
```

### Delete Type

Use the [Delete Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/deleteCustomObjectsUsingPOST) endpoint to delete an approved version.  `apiName` is the only required parameter as a path parameter.  Note that this is a destructive operation; it cannot be undone.  A type cannot be deleted unless it has been removed from use by any assets, such as triggers or filters.  The Get Custom Object Dependent Assets endpoint can be used to retrieve a list of dependent assets for a given type.

POST /rest/v1/customobjects/schema/{apiName}/delete.json

```json
{
    "requestId": "14e36#1684efc4227",
    "result": [],
    "success": true
}
```

## Custom Object Fields

By default, all custom object types contain the following standard fields:

* Marketo GUID - Unique identifier for custom object type
* Created At - Datetime when custom object type was created
* Updated At - Datetime when custom object type was last updated

You are free to add/change/delete custom fields using the endpoints described below.

* The maximum number of fields allowed is 50
* After a custom object has been approved, you may add a maximum of 20 additional fields to the custom object
* At least 1 dedupe field is required, a maximum of 3 are allowed
* Field API Names and Display Names may contain alphanumeric characters and underscore "_"

For more information about custom object fields, please see product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields).

### Add Fields

The [Add Custom Object Type Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/addCustomObjectTypeFieldsUsingPOST) endpoint allows you to add one or more fields to your custom object.  The request body contains an `input` array with one or more elements.  Each element is a JSON object with attributes that describe a field. The required `name` attribute is the API name of the field and must be unique to the custom object.   The convention is to use lowercase or camelCase to help distinguish between other text strings. The required `displayName` attribute is the human readable name of the field and must be unique to the custom object. The required `dataType` attribute is the data type of the field.  A  list of permissible data types can be obtained by calling the [Get Custom Object Type Field Data Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectTypeFieldDataTypesUsingGET) endpoint.  Custom objects can contain fields with data type "link".  Link fields are used used to establish relationships between custom objects and other object types in the system, for example Lead, Company.  More information on link fields can be found [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields). The optional `description` attribute is the description of the field. The optional `isDedupeField` boolean attribute specifies whether the field is used for deduplication during custom object update operations.  Default setting is false.  For one-to-many relationships, a dedupe field is required. The optional `relatedTo` object attribute specifies a link field.  For one-to-many relationships, this object contains a `name` attribute which is the "link object" or parent object to link to, and a `field` attribute which is the "link field,"  or the field within the parent object to use as key attribute.  Call the [Get Custom Object Linkable Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectTypeLinkableObjectsUsingGET) endpoint to retrieve a list of permissible link objects.  For more information on link fields, see product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields). A custom object cannot link to another custom object that has an existing link field.

### One-To-Many Relationship

For a one-to-many custom object structure, use a link field in a custom object to connect it to a standard object: Lead or Company. Using the car owner example from Marketo product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-link-fields#AddMarketoCustomObjectLinkFields-CreateaLinkFieldforaOne-to-ManyStructure), we create a custom object that contains car-related information to connect with Leads.

1. Create a **Car** object
1. Add fields to **Car** object: dedupe on **VIN**, link to **Lead****/Lead ID**
1. Approve **Car** object

First, create the custom object type to contain car-specific information.

```http
POST /rest/v1/customobjects/schema.json
```

```json
{
    "action":"createOnly",
    "displayName": "Car",
    "pluralName": "Cars"
    "apiName": "car",
    "description": "Automobile owned",
    "showInLeadDetail": true
}
```

```json
{
    "requestId": "cbaa#16876dd3da6",
    "result": [],
    "success": true
}
```

Now, add fields to the Car custom object type. We use a link field to specify the both the object and the field to connect to. In this case the link object is Lead, and the link field is ID. Use a string field for deduplication (VIN).  We will add three more fields to store additional Car attributes (Make, Model, Year).

```http
POST /rest/v1/customobjects/schema/car/addField.json
```

```json
{
  "input": [
    {
      "displayName": "Lead ID",
      "description": "Link field to Lead object",
      "name": "leadID",
      "dataType": "link",
      "relatedTo": {
        "field": "id",
        "name": "lead"
      }
    },
    {
      "displayName": "VIN",
      "description": "Vehicle ID number",
      "name": "vin",
      "dataType": "string",
      "isDedupeField": true
    },
    {
      "displayName": "Make",
      "description": "Vehicle make",
      "name": "make",
      "dataType": "string"
    },
    {
      "displayName": "Model",
      "description": "Vehicle model",
      "name": "model",
      "dataType": "string"
    },
    {
      "displayName": "Year",
      "description": "Vehicle year",
      "name": "year",
      "dataType": "integer"
    }
  ]
}

{
    "requestId": "b359#16876f17996",
    "result": [],
    "success": true
}
```

Finally, approve the custom object type.

```http
POST /rest/v1/customobjects/schema/course/approve.json
```

```json
{
    "requestId": "460b#16896055fa3",
    "result": [],
    "success": true
}
```

### Many-To-Many Relationship

Many-to-many relationships are represented using a "bridge," or intermediary, custom object in between a standard custom object, like Lead or Company, and an "edge" custom object. The edge object is the primary entity containing descriptive attributes (fields). The bridge object contains the data to resolve the object relationships by using 2 link fields.  One link field points back to the parent standard object just like in a  one-to-many relationship configuration.  The other link field points to the edge object, which is a custom object with no links.  The bridge object may also contain descriptive attributes (fields). Using the college course enrollment example from Marketo product documentation [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-link-fields#AddMarketoCustomObjectLinkFields-CreateaLinkFieldforaOne-to-ManyStructure), we create an edge custom object to contain course-related information, and an enrollment bridge object used to connect Courses with Leads. Here are the steps:

1. Create a **Course** edge object
1. Add fields to **Course:** dedupe on **Course ID**
1. Approve **Course**
1. Create an **Enrollment** bridge object
1. Add fields to **Enrollment:** dedupe on **Enrollment ID**, link to **Course****/Course ID** field and link to **Lead****/Lead ID**
1. Approve **Enrollment**

First, create the edge object type to contain course-specific information:

```http
POST /rest/v1/customobjects/schema.json
```

```json
{
    "action":"createOnly",
    "displayName": "Course",
    "pluralName": "Courses",
    "apiName": "course",
    "description": "Modeling a college course, an edge object in Marketo",
    "showInLeadDetail": true
}
```

```json
{
    "requestId": "4aec#168879ede00",
    "result": [],
    "success": true
}
```

Next, let's add custom fields to the edge object type.  In this example we will add the following four custom fields to model a college course: Course ID, Course Instructor, Course Location, Course Name.  Note that we are designating Course ID as our dedupe field, since at least one dedupe field is required.

```http
POST /rest/v1/customobjects/schema/course/addField.json
```

```json
{
    "input": [
        {
            "displayName": "Course ID",
            "name": "courseID",
            "dataType": "string",
            "isDedupeField": true
        },
        {
            "displayName": "Course Instructor",
            "name": "courseInstructor",
            "dataType": "string"
        },
        {
            "displayName": "Course Location",
            "name": "courseLocation",
            "dataType": "string"
        },
        {
            "displayName": "Course Name",
            "name": "courseName",
            "dataType": "string"
        }
    ]
}
```

```json
{
    "requestId": "cc36#16895b82a41",
    "result": [],
    "success": true
}
```

Now we need to approve the edge object type so that we can reference it later when linking to the bridge object type.  Note that custom object types must be approved to be selectable as a link object.

```http
POST /rest/v1/customobjects/schema/course/approve.json
```

```json
{
    "requestId": "460b#16896055fa3",
    "result": [],
    "success": true
}
```

The edge object is finished.  Now let's move on to create the bridge object type to contain enrollment-specific information.

```http
POST /rest/v1/customobjects/schema.json
```

```json
{
    "action": "createOnly",
    "displayName": "Enrollment",
    "pluralName": "Enrollments",
    "apiName": "enrollment",
    "description": "Bridge object for Course custom object",
    "showInLeadDetail": true
}
```

```json
{
    "requestId": "8fbb#168960f671b",
    "result": [],
    "success": true
}
```

To add custom fields to the bridge object type, add two link fields: one linking to the Lead object, and another linking to the Course object that we just created. To link to the Lead object, use the Lead Id field. To link to the Course object, use the Course Id field.  Next, add an Enrollment ID unique identifier as our dedupe field since at least one dedupe field is required. Finally, add a Grade field to track how the student did.

```http
POST /rest/v1/customobjects/schema/enrollment/addField.json
```

```json
{
    "input": [
        {
            "displayName": "Lead ID",
            "description": "Link field to Lead object",
            "name": "leadID",
            "dataType": "link",
            "relatedTo": {
                "field": "id",
                "name": "lead"
            }
        },
        {
            "displayName": "Course ID",
            "description": "Link field to Course object",
            "name": "courseID",
            "dataType": "link",
            "relatedTo": {
                "field": "courseID",
                "name": "course"
            }
        },
        {
            "displayName": "Enrollment ID",
            "description": "Unique ID for deduplication",
            "name": "enrollmentID",
            "dataType": "string",
            "isDedupeField": true
        },
        {
            "displayName": "Grade",
            "description": "Grade for the course",
            "name": "grade",
            "dataType": "string"
        }
    ]
}
```

```json
{
    "requestId": "7be5#168973f5052",
    "result": [],
    "success": true
}
```

Finally, approve the bridge object.

```http
POST /rest/v1/customobjects/schema/enrollment/approve.json
```

```json
{
    "requestId": "9a76#16897b0e84b",
    "result": [],
    "success": true
}
```

You can populate custom object records programmatically by using [Sync Custom Object](#create_and_update), or [Bulk Custom Object Import](https://experienceleague.adobe.com/docs/marketo-developer/marketo/rest/bulk-import/bulk-custom-object-import.html?lang=en). Alternatively, you can use Marketo UI functionality [Import Custom Object Data](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/import-custom-object-data).

## Update Field

The [Update Custom Object Type Field](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/updateCustomObjectTypeFieldUsingPOST) endpoint allows you to update a field in your draft custom object.  The required path parameter `apiName` is the API name of the custom object type.  The required path parameter `fieldAPIName` is the API name of the custom object type field.  The request body contains a JSON object containing key/value pairs that specify the field attributes to update.

```http
POST /rest/v1/customobjects/schema/{apiName}/{fieldApiName}/updateField.json
```

```json
{
  "displayName": "Very Long Title",
  "dataType": "text"
}
```

```json
{
    "requestId": "d523#1684f355db9",
    "result": [],
    "success": true
}
```

## Delete Fields

The [Delete Custom Object Type Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/deleteCustomObjectTypeFieldsUsingPOST) endpoint allows you to delete one or more fields from your custom object.  The required path parameter `apiName` is the API name of the custom object type.  The request body contains JSON object with an `input` array with one or more elements.  Each element is a JSON object with a `name` attribute that specifies the API name of the field to delete.

```http
POST /rest/v1/customobjects/schema/{apiName}/deleteField.json
```

```json
{
    "input":
    [
        {
            "name": "title"
        },
        {
            "name": "author"
        }
    ]
}
```

```json
{
"requestId": "b359#19934f17996",
"result": [],
"success": true
}
```

## List Field Data Types

The [Get Custom Object Type Field Data Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectTypeFieldDataTypesUsingGET) endpoint returns the list of all permissible field data types. This is useful when modeling your custom object type to identify the custom field data types that are supported.

```http
GET /rest/v1/customobjects/schema/fieldDataTypes.json
```

```json
{
    "requestId": "c405#167ed49e866",
    "result": [
        "string",
        "boolean",
        "integer",
        "float",
        "link",
        "email",
        "currency",
        "date",
        "datetime",
        "phone",
        "text"
    ],
    "success": true
}
```

## List Linkable Custom Objects

The [Get Custom Object Linkable Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectTypeLinkableObjectsUsingGET) endpoint returns a list of all permissible link objects, and their link fields.  The list will contain Standard Objects (Lead, Company), and any Custom Objects that have been created in the instance.

```http
GET /rest/v1/customobjects/schema/linkableObjects.json
```

```json
{
    "requestId": "11e62#167f1160e4e",
    "result": [
        {
            "name": "lead",
            "displayName": "Lead",
            "fields": [
                {
                    "name": "Account Balance",
                    "displayName": "Account Balance",
                    "dataType": "integer"
                },
                {
                    "name": "Email Address",
                    "displayName": "Email Address",
                    "dataType": "email"
                },
                {
                    "name": "Id",
                    "displayName": "Id",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Facebook Display Name",
                    "displayName": "Marketo Social Facebook Display Name",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Facebook Id",
                    "displayName": "Marketo Social Facebook Id",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Facebook Photo URL",
                    "displayName": "Marketo Social Facebook Photo URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Facebook Profile URL",
                    "displayName": "Marketo Social Facebook Profile URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Facebook Reach",
                    "displayName": "Marketo Social Facebook Reach",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Facebook Referred Enrollments",
                    "displayName": "Marketo Social Facebook Referred Enrollments",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Facebook Referred Visits",
                    "displayName": "Marketo Social Facebook Referred Visits",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Gender",
                    "displayName": "Marketo Social Gender",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social LinkedIn Display Name",
                    "displayName": "Marketo Social LinkedIn Display Name",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social LinkedIn Id",
                    "displayName": "Marketo Social LinkedIn Id",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social LinkedIn Photo URL",
                    "displayName": "Marketo Social LinkedIn Photo URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social LinkedIn Profile URL",
                    "displayName": "Marketo Social LinkedIn Profile URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social LinkedIn Reach",
                    "displayName": "Marketo Social LinkedIn Reach",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social LinkedIn Referred Enrollments",
                    "displayName": "Marketo Social LinkedIn Referred Enrollments",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social LinkedIn Referred Visits",
                    "displayName": "Marketo Social LinkedIn Referred Visits",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Syndication Id",
                    "displayName": "Marketo Social Syndication Id",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Total Referred Enrollments",
                    "displayName": "Marketo Social Total Referred Enrollments",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Total Referred Visits",
                    "displayName": "Marketo Social Total Referred Visits",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Twitter Display Name",
                    "displayName": "Marketo Social Twitter Display Name",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Twitter Id",
                    "displayName": "Marketo Social Twitter Id",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Twitter Photo URL",
                    "displayName": "Marketo Social Twitter Photo URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Twitter Profile URL",
                    "displayName": "Marketo Social Twitter Profile URL",
                    "dataType": "string"
                },
                {
                    "name": "Marketo Social Twitter Reach",
                    "displayName": "Marketo Social Twitter Reach",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Twitter Referred Enrollments",
                    "displayName": "Marketo Social Twitter Referred Enrollments",
                    "dataType": "integer"
                },
                {
                    "name": "Marketo Social Twitter Referred Visits",
                    "displayName": "Marketo Social Twitter Referred Visits",
                    "dataType": "integer"
                }
            ]
        },
        {
            "name": "company",
            "displayName": "Company",
            "fields": [
                {
                    "name": "Id",
                    "displayName": "Id",
                    "dataType": "integer"
                }
            ]
        },
        {
            "name": "car_c",
            "displayName": "Car",
            "fields": [
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string"
                },
                {
                    "name": "vin",
                    "displayName": "VIN",
                    "dataType": "string"
                }
            ]
        }
    ],
    "success": true
}
```

## Get Custom Object Dependent Assets

The [Get Custom Object Dependent Assets](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectTypeDependentAssetsUsingGET) endpoint returns a list of dependent assets of a custom object type, including their in-instance location.  This is useful when removing an integration and you need to identify everywhere that a custom object type is in use.

```http
GET /rest/v1/customobjects/schema/{apiName}/dependentAssets.json
```

```json
{
    "requestId": "71cf#16a21f30ed6",
    "result": [
        {
            "assetType": "Smart Campaign",
            "assetId": 3773,
            "assetName": "CarTest.HasCar (Smart List)"
        },
        {
            "assetType": "Smart Campaign",
            "assetId": 3773,
            "assetName": "CarTest.HasCar (Smart List)",
            "usedFields": [
                "leadID",
                "make",
                "model",
                "vin",
                "year"
            ]
        }
    ],
    "success": true
}
```

## Timeouts

* Custom Objects endpoints have a timeout of 30s unless noted below
  * Sync Custom Objects: 120s
  * Delete Custom Objects: 60s
