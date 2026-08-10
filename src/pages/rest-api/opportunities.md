---
title: Opportunities
description: "Marketo REST API to describe, query, create, and update opportunities, dedupe and searchable fields, limits, and read-only behavior with SFDC or Dynamics sync."
---

# Opportunities

[Opportunity Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities)

Marketo provides APIs for reading, writing, creating, and updating opportunity records. In Marketo, the intermediate Opportunity Role object links opportunity records to lead and contact records. An opportunity can therefore be linked to many individual leads.

The API exposes both object types. As with most Lead Database object types, each has a corresponding Describe call that returns object metadata.

Opportunity APIs provide read-only access for subscriptions that have [SFDC Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync.html?lang=en) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync.html?lang=en) enabled.

## Describe

Describe Opportunity records by using the standard pattern for Lead Database objects.

```http
GET /rest/v1/opportunities/describe.json
```

```json
{
   "requestId":"185d6#14b51985ff0",
   "success":true,
   "result":[
      {
         "name":"opportunity",
         "displayName":"Opportunity",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:24Z",
         "idField":"marketoGUID",
         "dedupeFields":[
            "externalOpportunityId"
         ],
         "searchableFields":[
            [
               "externalOpportunityId"
            ],
            [
               "marketoGUID"
            ]
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
               "name":"externalOpportunityId",
               "displayName":"External Opportunity Id",
               "dataType":"string",
               "length":50,
               "updateable":false
            }
         ]
      }
   ]
}
```

The key response fields are:

- `idField`: Identifies the opportunity primary key, marketoGUID. This system-generated key supports read and update operations but not inserts.
- `dedupeFields`: Identifies valid keys for insert operations. For opportunities, the only key is externalOpportunityId.
- `searchableFields`: Identifies fields that are valid for queries. These fields are externalOpportunityId and marketoGUID.

## Query

The pattern for [querying opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getOpportunitiesUsingGET) closely follows the Leads API. However, the `filterType` parameter accepts only fields listed in the `searchableFields` array of the corresponding Describe response or dedupeFields.

For custom opportunity fields, only fields of type String or Integer appear in the searchableFields array.

```http
GET /rest/v1/opportunities.json?filterType=marketoGUID&filterValues=dff23271-f996-47d7-984f-f2676861b5fa&dff23271-f996-47d7-984f-f2676861b5fc,dff23271-f996-47d7-984f-f2676861b5fb
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fa ",
         "externalOpportunityId":"19UYA31581L000000",
         "name":"Chairs",
         "description":"Chairs",
         "amount":"1604.47",
         "source":"Inbound Sales Call/Email"
      },
      {
         "seq":1,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fc ",
         "externalOpportunityId":"29UYA31581L000000",
         "name":"Big Dog Day Care-Phase12",
         "description":"Big Dog Day Care-Phase12",
         "amount":"1604.47",
         "source":"Email"
      }
   ]
}
```

You can include these optional query parameters:

- `fields`: Returns additional opportunity fields.
- `nextPageToken`: Pages through result sets larger than the batch size.
- `batchSize`: Specifies the batch size. The default and maximum value is 300.

When you request a list of `fields`, a requested field that is not returned has an implied value of null.

## Create and Update

Opportunities follow the Leads API pattern with some restrictions. The `action` values are createOnly, createOrUpdate, and updateOnly.

- For createOnly or createOrUpdate mode, include the externalOpportunityId field in each record.
- For updateOnly mode, use either marketoGUID or externalOpportunityId.
- If unspecified, the mode defaults to createOrUpdate.

The `lookupField` parameter from the Leads API is unavailable. The dedupeBy parameter replaces it and is valid only when action is updateOnly.

The dedupeBy values are "dedupeFields" and "idField", which the Describe response identifies as externalOpportunityId and marketoGUID, respectively. If dedupeBy is unspecified, it defaults to dedupeFields mode. The 'name' field must not be null.

You can submit up to 300 records at a time.

```http
POST /rest/v1/opportunities.json
```

```json
{
   "action":"createOrUpdate",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "externalOpportunityId":"19UYA31581L000000",
         "name":"Chairs",
         "description":"Chairs",
         "amount":"1604.47",
         "source":"Inbound Sales Call/Email"
      },
      {
         "externalOpportunityId":"29UYA31581L000000",
         "name":"Big Dog Day Care-Phase12",
         "description":"Big Dog Day Care-Phase12",
         "amount":"1604.47",
         "source":"Email"
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
         "status":"updated",
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb"
      },
      {
         "seq":1,
         "status":"created",
         "marketoGUID":"cff23271-f996-47d7-984f-f2676861b5fb"
      }
   ]
}
```

The response includes the following values for each record:

- `marketoGUID`: The record identifier.
- `status`: The success or failure of the individual record.
- `seq`: The submitted record's index, which correlates the request record with the response order.

### Fields

The company object contains fields defined by attributes such as display name, API name, and dataType. Together, these attributes are called metadata.

The following endpoints query fields on the company object. The API user must have a role with the `Read-Write Schema Standard Field` permission, the `Read-Write Schema Custom Field` permission, or both.

### Query Fields

Query one company field by API name or retrieve all company fields.

#### By Name

The [Get Opportunity Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#operation/getOpportunityFieldByNameUsingGET) endpoint retrieves metadata for one field on the company object. The required `fieldApiName` path parameter specifies the field's API name.

The response resembles the Describe Opportunity response but includes additional metadata. For example, the `isCustom` attribute indicates whether the field is custom.

```http
GET /rest/v1/opportunities/schema/fields/externalOpportunityId.json
```

```json
{
    "requestId": "12331#17e9779cb4b",
    "result": [
        {
            "displayName": "SFDC Oppty Id",
            "name": "externalOpportunityId",
            "description": null,
            "dataType": "string",
            "length": 50,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        }
    ],
    "success": true
}
```

#### Browse

The [Get Opportunity Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/getOpportunityFieldsUsingGET) endpoint retrieves metadata for all fields on the company object. By default, it returns a maximum of 300 records. Use the `batchSize` query parameter to reduce this number.

If the `moreResult` attribute is true, more results are available. Continue calling the endpoint with the returned `nextPageToken` until moreResult is false.

```http
GET /rest/v1/opportunities/schema/fields.json?batchSize=5
```

```json
{
    "requestId": "b4a#17e995b31da",
    "result": [
        {
            "displayName": "SFDC Oppty Id",
            "name": "externalOpportunityId",
            "description": null,
            "dataType": "string",
            "length": 50,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Name",
            "name": "name",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Description",
            "name": "description",
            "description": null,
            "dataType": "string",
            "length": 2000,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Type",
            "name": "type",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Stage",
            "name": "stage",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        }
    ],
    "success": true,
    "nextPageToken": "E5ZONGE4SAHALYYW6FS25KB5BM======",
    "moreResult": true
}
```

#### Delete

Delete opportunities by dedupe fields or id field. Set the `deleteBy` parameter to either dedupeFields or idField. The default is dedupeFields.

The request body contains an `input` array of opportunities to delete. Each call permits a maximum of 300 opportunities.

```http
POST /rest/v1/opportunities/delete.json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "externalOpportunityId":"19UYA31581L000000"
      },
      {
         "externalOpportunityId":"29UYA31581L000000"
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
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb",
         "status":"deleted"
      },
      {
         "seq":1,
         "marketoGUID":"cff23271-f996-47d7-984f-f2676861b5fb",
         "status":"deleted"
      }
   ]
}
```

## Timeouts

- Opportunity endpoints have a timeout of 30s unless otherwise noted.
- Sync Opportunities has a timeout of 60s.
- Delete Opportunities has a timeout of 60s.
