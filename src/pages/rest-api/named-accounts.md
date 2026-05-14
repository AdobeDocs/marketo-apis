---
title: Named Accounts
description: "Marketo REST guide to CRUD on named accounts for ABM, with describe, query, create update examples, searchable fields, dedupe rules, and no lead linking."
---

# Named Accounts

[Named Accounts Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Accounts)

Marketo offers a set of APIs for performing CRUD operations on named accounts for use with Marketo ABM. These APIs follow the standard interface pattern for lead database APIs, providing Describe, Create/Update, Delete, and Query options.

Currently, the only ABM-related functions available via Marketo's APIs are the CRUD operations for named accounts; Leads cannot be linked to named accounts via any APIs.

## Describe

Describing Named Accounts returns metadata related to the usage of named accounts via Marketo's APIs, including a list of valid searchable fields when querying, and a list of all fields available for API usage. The `idField` of a named account is always `marketoGUID`, and the only available `dedupeField`, and key for creation is the `name` field of the object.

```http
GET /rest/v1/namedaccounts/describe.json
```

```json
{
   "requestId":"d65e#156c27ac57d",
   "result":[
      {
         "name":"Named Account",
         "description":"Marketo standard account attribute map",
         "createdAt":"2016-08-18T20:16:41Z",
         "updatedAt":"2016-08-18T20:16:41Z",
         "idField":"marketoGUID",
         "dedupeFields":[
            "name"
         ],
         "searchableFields":[
            [
               "marketoGUID",
            ],
            [
               "annualRevenue"
            ],
            [
               "city"
            ],
            [
               "country"
            ],
            [
               "domainName"
            ],
            [
               "industry"
            ],
            [
               "logoUrl"
            ],
            [
               "membershipCount"
            ],
            [
               "name"
            ],
            [
               "numberOfEmployees"
            ],
            [
               "opptyAmount"
            ],
            [
               "opptyCount"
            ],
            [
               "score1"
            ],
            [
               "score2"
            ],
            [
               "score3"
            ],
            [
               "score4"
            ],
            [
               "score5"
            ],
            [
               "sicCode"
            ],
            [
               "state"
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
               "name":"annualRevenue",
               "displayName":"annualRevenue",
               "dataType":"currency",
               "updateable":true
            },
            {
               "name":"city",
               "displayName":"city",
               "dataType":"string",
               "length":255,
               "updateable":true
            },
            {
               "name":"country",
               "displayName":"country",
               "dataType":"string",
               "length":255,
               "updateable":true
            }
         ]
      }
   ],
   "success":true
}
```

### Query

Querying for named accounts is based on the usage of a filterType and a set of up to 300 comma-separated filterValues. `filterType` may be any single field returned in the `searchableFields` member of the describe result for named accounts, while filterValues may be any valid input for the datatype of the field. To return a specific set of fields from, a fields parameter must be passed, where the value is a comma-separated list of fields to be returned in the response. Like other query options, the maximum number of records for a single query page is 300, and additional records in the set must be requested with the usage of the nextPageToken returned by the call.

```http
GET /rest/v1/namedaccounts.json?filterType=name&filterValues=Google,Yahoo
```

```json
{
    "requestId": "6dac#157d4ddc9d7",
    "result": [
        {
            "seq": 0,
            "marketoGUID": "16efafdd-0148-4ea7-8782-f451d7c6345d",
            "createdAt": "2016-10-17T22:49:04Z",
            "name": "Google",
            "updatedAt": "2016-10-17T22:49:04Z"
        },
        {
            "seq": 1,
            "marketoGUID": "44d62353-7f9d-4d43-b9cc-7ef0f7a09137",
            "createdAt": "2016-10-17T22:49:04Z",
            "name": "Yahoo",
            "updatedAt": "2016-10-17T22:49:04Z"
        }
    ],
    "success": true
}
```

### Create and Update

Creating and updating named accounts follows the standard lead database pattern. Records must be passed in the input member of a JSON body in a POST request. `input` is the only required member, with `action` and `dedupeBy` as optional members. Up to 300 records may be included in the input. Action may be one of createOnly, updateOnly, or createOrUpdate. If unspecified, action defaults to createOrUpdate. dedupeBy may only be specified when action is updateOnly, and only accepts one of dedupeFields or idField, which correspond to the name and marketoGUID fields, respectively.

```http
POST /rest/v1/namedaccounts.json
```

```text
Content-Type: application/json
```

```json
{
   "action":"updateOnly",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "name":"Google",
         "domainName":"www.google.com"
      },
      {
         "name":"Yahoo",
         "domainName":"www.yahoo.com"
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
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fc"
      }
   ]
}
```

### Fields

The named account object contains a set of fields. Each field definition is composed of a set of attributes that describe the field. Examples of attributes are display name, API name, and dataType. These attributes are known collectively as metadata.

The following endpoints allow you to query fields on the company object. These APIs require that the owning API user have a role with one or both of the Read-Write Schema Standard Field or Read-Write Schema Custom Field permissions.

### Query Fields

Querying named account fields is straightforward. You may query a single named account field by API name or query the set of all company fields.

#### By Name

The [Get Named Account Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Accounts/operation/getNamedAccountFieldByNameUsingGET) endpoint retrieves metadata for a single field on the named account object. The required fieldApiName path parameter specifies the API name of the field. The response is like the Describe Named Account endpoint but contains additional metadata such as the isCustom attribute which denotes whether the field is a custom field.

```http
GET /rest/v1/namedaccounts/schema/fields/annualRevenue.json
```

```json
{
    "requestId": "371c#17e979c5d1f",
    "result": [
        {
            "displayName": "Annual Revenue",
            "name": "annualRevenue",
            "description": null,
            "dataType": "currency",
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

The [Get Named Account Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Accounts/operation/getNamedAccountFieldByNameUsingGET) endpoint retrieves metadata for all fields on the named account object. By default, a maximum of 300 records are returned. You can use the batchSize query parameter to reduce this number. If the moreResult attribute is true, this means more results are available. Continue to call this endpoint until the moreResult attribute returns false, which means there are no results available. The nextPageToken returned from this API should always be reused for the next iteration of this call.

```http
GET /rest/v1/namedaccounts/schema/fields.json?batchSize=5
```

```json
{
    "requestId": "f287#17e995bd0c5",
    "result": [
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
            "displayName": "Domain Name",
            "name": "domainName",
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
            "displayName": "Industry",
            "name": "industry",
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
            "displayName": "SIC Code",
            "name": "sicCode",
            "description": null,
            "dataType": "string",
            "length": 40,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "City",
            "name": "city",
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
    "nextPageToken": "N42LHXWEULHZ3N2I77DKOJUVOY======",
    "moreResult": true
}
```

### Delete

Deletions are done via a JSON POST request and have a required input member, and an optional deleteBy member. deleteBy may be one of "dedupeFields" or "idField", corresponding to name or marketoGUID, respectively, and will default to dedupeFields if unset. The input member accepts an array of up to 300 records, containing one member each, either name or marketoGUID depending on the setting of deleteBy.

```http
POST /rest/v1/namedaccounts/delete.json
```

```text
Content-Type: application/json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "name":"Google"
      },
      {
         "name":"Yahoo"
      },
      {
         "name":"Marketo"
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
         "id":"dff23271-f996-47d7-984f-f2676861b5fc",
         "status":"deleted"
      },
      {
         "seq":2,
         "status":"skipped",
         "reasons":[
            {
               "code":"1013",
               "message":"Record not found"
            }
         ]
      }
   ]
}
```

## Timeouts

- Named Account endpoints have a timeout of 30s unless noted below
  - Sync Named Accounts: 120s
  - Delete Named Accounts: 60s
