---
title: Opportunities
description: "Marketo REST API to describe, query, create, and update opportunities, dedupe and searchable fields, limits, and read-only behavior with SFDC or Dynamics sync."
---

# Opportunities

[Opportunity Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities)

Marketo exposes APIs for reading, writing, creating and updating opportunity records. In Marketo, opportunity records are linked to lead and contact records through the intermediate Opportunity Role object, so an opportunity may be linked to many individual leads.  Both of these object types are exposed through the API, and like most of the Lead Database object types, they both have a corresponding Describe call, which returns metadata about the object types.

Opportunity APIs are read-only access for subscriptions which have [SFDC Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync.html?lang=en) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync.html?lang=en) are enabled.

## Describe

Describing Opportunity records follows the standard pattern for lead database objects.

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

The most important fields for this response type are `idField`, `dedupeFields`, and `searchableFields`.  idField indicates the primary key for opportunities, marketoGUID.  This is a system generated unique key, which can be used for read and update operations, but not for inserts, since it is system managed.  The dedupeFields array indicates which fields are valid keys for insert operations; in the case of opportunities, this is only externalOpportunityId.  The searchableFields array gives you the set of fields which are valid for querying, externalOpportunityId and marketoGUID.

## Query

The pattern for [querying opportunities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities/operation/getOpportunitiesUsingGET) closely follows that of the leads API with the added restriction that the `filterType` parameter accepts the fields listed in the `searchableFields` array or of the corresponding describe call, or dedupeFields.  Note that if you are using custom opportunity fields, only custom opportunity fields of type String or Integer will be listed in searchableFields array.

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

You can also include the optional query parameters `fields`, for returning additional opportunity fields, `nextPageToken`, for paging through sets larger than the batch size, `batchSize`, which defaults to and has a maximum of 300.  When requesting a list of `fields`, if a particular field is requested, but not returned, the value is implied to be null.

## Create and Update

Opportunities follow the leads API pattern closely, with some restrictions.  The values available for `action` are: createOnly, createOrUpdate, and updateOnly.  When using createOnly or createOrUpdate mode, the externalOpportunityId field must be included in each record.  For the updateOnly mode, either marketoGUID or externalOpportunityId may be used.  The mode defaults to createOrUpdate if unspecified.

The `lookupField` parameter from the leads API is unavailable, and is superceded by the dedupeBy parameter, which is only valid if action is updateOnly.  The values available for dedupeBy are either "dedupeFields" or "idField" which are specified by the describe call as externalOpportunityId and marketoGUID respectively.  If dedupeBy is unspecified, it defaults to dedupeFields mode.  The 'name' field must not be null.

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

The API will respond with the `marketoGUID` for each record, as well as a `status` field, indicating the individual success or failure of each record, and an `seq` field which is used to correlate the submitted records, to the order of the response.  The number in the field is the index of the record submitted in the request.

### Fields

The company object contains a set of fields.  Each field definition is comprised of a set of attributes that describe the field.  Examples of attributes are display name, API name, and dataType.  These attributes are known collectively as metadata.

The following endpoints allow you to query fields on the company object. These APIs require that the owning API user have a role with one or both of the `Read-Write Schema Standard Field` or `Read-Write Schema Custom Field` permissions.

### Query Fields

Querying opportunity fields is straightforward.  You may query a single company field by API name or query the set of all company fields.

#### By Name

The [Get Opportunity Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities/operation/getOpportunityFieldByNameUsingGET) endpoint retrieves metadata for a single field on the company object.  The required `fieldApiName` path parameter specifies the API name of the field.  The response is like the Describe Opportunity endpoint but contains additional metadata such as the `isCustom` attribute which denotes whether the field is a custom field.

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

The [Get Opportunity Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities/operation/getOpportunityFieldsUsingGET) endpoint retrieves metadata for all fields on the company object.  By default, a maximum of 300 records are returned.  You can use the `batchSize` query parameter to reduce this number.  If the `moreResult` attribute is true, this means more results are available.  Continue to call this endpoint until the moreResult attribute returns false, which means there are no results available.  The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

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

You may delete opportunities by dedupe fields or id field. Specify using the `deleteBy` parameter with a value of either dedupeFields or idField. If not specified, the default is dedupeFields. The request body contains an `input` array of opportunities to delete. A maximum of 300 opportunities per call are permitted.

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

- Opportunity endpoints have a timeout of 30s unless noted below
  - Sync Opportunities: 60s
  - Delete Opportunities: 60s
