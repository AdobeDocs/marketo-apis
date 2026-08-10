---
title: Custom Objects
description: "Learn how to create and manage Marketo Custom Objects via REST API, including list and describe endpoints, metadata, relationships, fields, and queries."
---

# Custom Objects

[**Custom Object Endpoint Reference**](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects)

Marketo Custom Objects can relate to Marketo Standard Objects, such as Leads and Companies, or to other Marketo Custom Objects. Create Marketo Custom Objects in the [Marketo UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/create-marketo-custom-objects) or by using the Custom Object Metadata API described in this document.

Access to the Custom Object Metadata API requires an appropriate Marketo subscription type. Contact your CSM for details.

## List

In addition to the standard Describe, Query, Update, and Delete calls for Lead Database objects, Custom Objects provide a [list call](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectsUsingGET). The endpoint returns the custom objects available in the destination instance and metadata about each object.

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

The response lists the relationships for each object. Each relationship contains:

- `field`: The field on the object that holds the link value.
- `type`: Whether the related object is a parent or child object.
- `relatedTo`: The name of the related object and its link field.

## Describe

The [Describe call](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_1) for custom objects follows the same pattern as Opportunities and Companies, with two additions:

- The `apiName` path parameter specifies the API name of the custom object type to describe.
- The response includes a `relationships` array that lists the relationships available for the custom object type.

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

[Querying custom objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectsUsingGET) differs slightly from querying other Lead Database objects. As with Describe, the request takes an `apiName` path parameter.

For a normal filterType, send a GET request with the required `filterType` and `filterValues` parameters. You can also include the optional `**fields**`, `batchSize`, and `nextPageToken` parameters.

When you request a list of fields, a requested field that is not returned has an implied value of null.

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

When querying with compound keys, the API behaves like the Opportunity Roles API and accepts a POST request with a JSON body. The body can contain the same members as a GET query except `filterValues`.

Instead of filter values, provide an `input` array of objects. Each object contains a member for every field in the object type's `dedupeFields`.

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

Use the [Sync Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCustomObjectsUsingPOST) endpoint to create or update custom objects. Specify the operation with the `action` parameter. Each call can create or update up to 300 records.

Base the values in the `input` array on the information returned by the [Describe Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_1) endpoint. In the example car object, the only dedupe field is `vin`. When you use dedupeFields mode to create or update records, include at least a `vin` field in each object in the input array.

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

When you update records in `idField` mode, the `idField` is always `marketoGUID`. Include a `marketoGUID` field in every record.

Because this field is system managed, `idField` is valid only for the updateOnly action type. The result array includes the **status** of each record. It also includes either a `marketoGUID` for a successful operation or a `reasons` array for a failed operation.

## Delete

To [delete records](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteCustomObjectsUsingPOST), select a `deleteBy` mode of either `idField` or `dedupeFields`. Include the corresponding fields in each record in the `input` array. Each call allows a maximum of 300 records.

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

As with updates, the result contains a status for each record. It also includes either a `marketoGUID` for a successful deletion or a `reasons` array for a failed deletion.

## Custom Object Types

The Custom Object Metadata API lets you remotely manage custom object schemas. Use it to create a Custom Object Type or modify an existing one. After you create or modify a type, approve it before use.

For more information, see the [custom object product documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home).

- You cannot modify custom object types created by the API in the Marketo UI.
- The maximum number of custom object types is 10.
- The maximum number of custom object fields is 50 per type.
- Custom object type API Names and Display Names can contain alphanumeric characters and the underscore character "_".

### Query Type

Retrieve custom object type metadata in either of these ways:

- Describe Custom Object Type returns one custom object type record and supports filtering by approval state.
- List Custom Object Types returns all custom object types in the subscription and supports filtering by name and approval state.

### Describe Type

The [Describe Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_1) endpoint returns metadata for one custom object type. The required `apiName` path parameter specifies the API name of the type to describe.

If an approved version exists, the endpoint returns it. Otherwise, it returns the draft version. Use the optional `state` parameter to request `draft`, `approved`, or `approvedWithDraft`.

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

The response contains:

- Metadata: state, displayName, description, apiName, idField, createdAt, updatedAt, dedupeFields, searchableFields, relationships.
- Standard fields: marketoGUID, createdAt, updatedAt.
- Custom fields: leadId, vin, make, model, year.

### List Types

The [List Custom Object Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/listCustomObjectTypesUsingGET) endpoint returns metadata for all custom object types available in the destination instance.

If an approved version exists, the endpoint returns it. Otherwise, it returns the draft version.

The optional parameters are:

- **state**: Specifies the version to return. Valid values are **draft**, **approved**, and **approvedWithDraft**.
- **names**: Specifies the custom object types to return as a comma-separated list of API names.

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

Use the [Sync Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCustomObjectsUsingPOST) endpoint to create or update a custom object type.

The attributes are:

- **action**: An optional attribute that controls the record operation. Valid values are **createOnly**, **createOrUpdate**, and **updateOnly**. The default is createOrUpdate.
- **displayName** and **apiName**: Required unless the action is updateOnly. Both must be unique to avoid collisions with customer-provisioned types. LaunchPoint partners should prepend a representative namespace. For apiName, use lowercase or camelCase to distinguish it from other text strings.
- **pluralName**: An optional attribute that specifies the plural form of displayName.
- **description**: An optional attribute that describes the custom object type.
- **showInLeadDetail**: An optional Boolean attribute that enables custom object data in the Lead Database page of the Marketo UI. The default is false.

Choose custom object names carefully. Prefix each new custom object name with a string that identifies your company. The prefix can contain alphanumeric characters or underscores. This convention makes the object easier to find in the MLM UI and helps ensure that its name is unique.

The following example creates a custom object type with the API Name "transaction."

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

The following request describes the newly created type.

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

The response contains:

- Metadata: state, displayName, description, apiName, idField, createdAt, updatedAt, dedupeFields, searchableFields, relationships.
- Standard fields: marketoGUID, createdAt, updatedAt.

#### Update Type

The following example updates the Description of an existing type whose API Name is "transaction." The **apiName** attribute is required. Because the type already exists, the request uses updateOnly for the optional **action** attribute.

Aside from **apiName**, you can update the attributes available during creation.

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

Approve custom object types before using them. When you create a type with the [Sync Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCustomObjectTypeUsingPOST) endpoint, Marketo creates a draft version. After adding custom fields, approve the draft. Approval creates an approved version and deletes the draft.

When you modify an existing type with Sync Custom Object Type or an Add/Update/Delete Custom Object Type Field endpoint, Marketo creates a draft. Changes to the type or its fields affect only the draft version. After making changes, approve the draft. Approval replaces the approved version with the draft and deletes the draft.

For more information, see the [custom object approval documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/approve-a-custom-object).

Once a custom object type is approved, you cannot:

- Update the `displayName` or `apiName`.
- Add or remove a link field.
- Add or remove a dedupe field.

Plan the schema and naming convention carefully before approving the type.

### Approve Type

Use the [Approve Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/approveCustomObjectTypeUsingPOST) endpoint to publish a draft as the new approved version. The only required parameter is the **apiName** path parameter.

You can approve a type only when it is in draft state and satisfies the documented [validation rules](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/approve-a-custom-object).

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

Use the [Discard Custom Object Type Draft](https://developer.adobe.com/marketo-apis/api/mapi#operation/discardCustomObjectTypeUsingPOST) endpoint to delete a draft version. The only required parameter is the `apiName` path parameter.

You can discard only a type in draft state. You cannot discard an approved type.

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

Use the [Delete Custom Object Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteCustomObjectsUsingPOST) endpoint to delete an approved version. The only required parameter is the `apiName` path parameter.

This operation is destructive and cannot be undone. Before deleting a type, remove its use from assets such as triggers and filters. Use the Get Custom Object Dependent Assets endpoint to retrieve the dependent assets for a type.

POST /rest/v1/customobjects/schema/\{apiName}/delete.json

```json
{
    "requestId": "14e36#1684efc4227",
    "result": [],
    "success": true
}
```

## Custom Object Fields

By default, all custom object types contain the following standard fields:

- Marketo GUID: Unique identifier for the custom object type.
- Created At: Datetime when the custom object type was created.
- Updated At: Datetime when the custom object type was last updated.

Use the following endpoints to add, change, or delete custom fields.

- The maximum number of fields is 50.
- After a custom object is approved, you can add a maximum of 20 additional fields to it.
- At least one dedupe field is required. A maximum of three dedupe fields is allowed.
- Field API Names and Display Names can contain alphanumeric characters and the underscore character "_".

For more information, see the [custom object fields documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields).

### Add Fields

Use the [Add Custom Object Type Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/addCustomObjectTypeFieldsUsingPOST) endpoint to add one or more fields to a custom object. The request body contains an `input` array with one or more elements. Each element is a JSON object with attributes that describe a field.

The field attributes are:

- `name`: Required. The field's API name, which must be unique to the custom object. Use lowercase or camelCase to distinguish the name from other text strings.
- `displayName`: Required. The human-readable field name, which must be unique to the custom object.
- `dataType`: Required. The field's data type. Use the [Get Custom Object Type Field Data Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectTypeFieldDataTypesUsingGET) endpoint to retrieve the permitted data types.
- `description`: Optional. The field description.
- `isDedupeField`: Optional Boolean that specifies whether the field is used for deduplication during custom object update operations. The default is false. A dedupe field is required for one-to-many relationships.
- `relatedTo`: Optional object that specifies a link field. For a one-to-many relationship, `name` identifies the "link object" or parent object, and `field` identifies the "link field" or key field in the parent object.

Custom objects can contain fields with the data type "link." Link fields establish relationships between custom objects and other object types, such as Lead and Company. See the [custom object field documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields) for details about link fields. Use the [Get Custom Object Linkable Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectTypeLinkableObjectsUsingGET) endpoint to retrieve the permitted link objects.

A custom object cannot link to another custom object that has an existing link field. For more information, see the [link fields documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-fields).

### One-To-Many Relationship

For a one-to-many custom object structure, use a link field to connect a custom object to a standard Lead or Company object. The following workflow uses the [car owner example](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-link-fields#AddMarketoCustomObjectLinkFields-CreateaLinkFieldforaOne-to-ManyStructure) to create a custom object that stores car information and connects to Leads.

1. Create a **Car** object.
1. Add fields to the **Car** object: dedupe on **VIN** and link to **Lead****/Lead ID**.
1. Approve the **Car** object.

First, create the custom object type that contains car-specific information.

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

Next, add fields to the Car custom object type. Use a link field to specify both the object and the field to connect. In this example, the link object is Lead and the link field is ID.

Use a string field for deduplication (VIN). Add three more fields to store the Make, Model, and Year attributes.

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

A many-to-many relationship uses a "bridge" custom object between a standard object, such as Lead or Company, and an "edge" custom object. The edge object is the primary entity and contains descriptive fields.

The bridge object resolves the relationship with two link fields. One field points to the parent standard object, as in a one-to-many relationship. The other points to the edge object, which is a custom object with no links. The bridge object can also contain descriptive fields.

The following workflow uses the [college course enrollment example](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/add-marketo-custom-object-link-fields#AddMarketoCustomObjectLinkFields-CreateaLinkFieldforaOne-to-ManyStructure). It creates a Course edge object and an Enrollment bridge object that connects Courses with Leads.

1. Create a **Course** edge object.
1. Add fields to **Course:** dedupe on **Course ID**.
1. Approve **Course**.
1. Create an **Enrollment** bridge object.
1. Add fields to **Enrollment:** dedupe on **Enrollment ID**, link to the **Course****/Course ID** field, and link to **Lead****/Lead ID**.
1. Approve **Enrollment**.

First, create the edge object type that contains course-specific information:

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

Next, add four custom fields to model a college course: Course ID, Course Instructor, Course Location, and Course Name. Designate Course ID as the dedupe field because at least one dedupe field is required.

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

Approve the edge object type so that you can reference it when linking to the bridge object type. A custom object type must be approved before it can be selected as a link object.

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

After completing the edge object, create the bridge object type that contains enrollment-specific information.

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

Add two link fields to the bridge object type: one that links to the Lead object and one that links to the Course object. Use the Lead Id field to link to Lead and the Course Id field to link to Course.

Add Enrollment ID as the dedupe field because at least one dedupe field is required. Then add a Grade field to track the student's performance.

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

Populate custom object records programmatically by using [Sync Custom Object](#create_and_update) or [Bulk Custom Object Import](https://experienceleague.adobe.com/docs/marketo-developer/marketo/rest/bulk-import/bulk-custom-object-import.html?lang=en). Alternatively, use [Import Custom Object Data](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/import-custom-object-data) in the Marketo UI.

## Update Field

Use the [Update Custom Object Type Field](https://developer.adobe.com/marketo-apis/api/mapi#operation/updateCustomObjectTypeFieldUsingPOST) endpoint to update a field in a draft custom object.

The required path parameters are:

- `apiName`: The API name of the custom object type.
- `fieldAPIName`: The API name of the custom object type field.

The request body contains a JSON object with key/value pairs that specify the field attributes to update.

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

Use the [Delete Custom Object Type Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteCustomObjectTypeFieldsUsingPOST) endpoint to delete one or more fields from a custom object. The required `apiName` path parameter specifies the API name of the custom object type.

The request body contains a JSON object with an `input` array of one or more elements. Each element is a JSON object whose `name` attribute specifies the API name of a field to delete.

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

The [Get Custom Object Type Field Data Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectTypeFieldDataTypesUsingGET) endpoint returns all permitted field data types. Use this endpoint to identify the custom field data types available when modeling a custom object type.

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

The [Get Custom Object Linkable Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectTypeLinkableObjectsUsingGET) endpoint returns all permitted link objects and their link fields. The response includes Standard Objects, such as Lead and Company, and any Custom Objects created in the instance.

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

The [Get Custom Object Dependent Assets](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectTypeDependentAssetsUsingGET) endpoint returns the dependent assets of a custom object type and their locations in the instance. Use it when removing an integration to identify everywhere that a custom object type is in use.

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

- Custom Objects endpoints have a timeout of 30s unless otherwise noted.
- Sync Custom Objects has a timeout of 120s.
- Delete Custom Objects has a timeout of 60s.
