---
title: Named Accounts
description: "Marketo REST guide to CRUD on named accounts for ABM, with describe, query, create update examples, searchable fields, dedupe rules, and no lead linking."
---

# Named Accounts

[Named Accounts Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Accounts)

Marketo provides APIs for performing CRUD operations on named accounts for use with Marketo ABM. These APIs follow the standard Lead Database interface pattern and provide Describe, Create/Update, Delete, and Query options.

Currently, Marketo APIs support only CRUD operations for named accounts. You cannot link Leads to named accounts through the APIs.

## Describe

Describe Named Accounts returns metadata for using named accounts through Marketo APIs. The response includes valid searchable fields and all fields available to the API.

The `idField` of a named account is always `marketoGUID`. The object's `name` field is the only available `dedupeField` and creation key.

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

Query named accounts by using a filterType and up to 300 comma-separated filterValues. The filterType can be any single field returned in the `searchableFields` member of the Describe response. Each filterValues entry must be a valid value for the field's data type.

To return specific fields, pass a fields parameter with a comma-separated list of fields. A query page contains a maximum of 300 records. To retrieve additional records, use the nextPageToken returned by the call.

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

Create and update named accounts by using the standard Lead Database pattern. Pass records in the input member of a POST request's JSON body. You can include up to 300 records.

The request members are:

- `input`: The only required member.
- `action`: An optional member that accepts createOnly, updateOnly, or createOrUpdate. The default is createOrUpdate.
- `dedupeBy`: An optional member available only when action is updateOnly. It accepts dedupeFields or idField, which correspond to the name and marketoGUID fields, respectively.

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

The named account object contains fields defined by attributes such as display name, API name, and dataType. Together, these attributes are called metadata.

The following endpoints query fields on the company object. The API user must have a role with the Read-Write Schema Standard Field permission, the Read-Write Schema Custom Field permission, or both.

### Query Fields

Query one named account field by API name or retrieve all company fields.

#### By Name

The [Get Named Account Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#operation/getNamedAccountFieldByNameUsingGET) endpoint retrieves metadata for one field on the named account object. The required fieldApiName path parameter specifies the field's API name.

The response resembles the Describe Named Account response but includes additional metadata. For example, the isCustom attribute indicates whether the field is custom.

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

The [Get Named Account Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/getNamedAccountFieldByNameUsingGET) endpoint retrieves metadata for all fields on the named account object. By default, it returns a maximum of 300 records. Use the batchSize query parameter to reduce this number.

If the moreResult attribute is true, more results are available. Continue calling the endpoint with the returned nextPageToken until moreResult is false.

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

Delete named accounts by sending a POST request with a JSON body. The request includes a required input member and an optional deleteBy member.

The deleteBy member accepts "dedupeFields" or "idField", which correspond to name and marketoGUID, respectively. If unset, it defaults to dedupeFields. The input member accepts up to 300 records. Each record contains either name or marketoGUID, depending on the deleteBy setting.

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

- Named Account endpoints have a timeout of 30s unless otherwise noted.
- Sync Named Accounts has a timeout of 120s.
- Delete Named Accounts has a timeout of 60s.
