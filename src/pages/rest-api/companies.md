---
title: Companies
description: "Use the Marketo Companies REST API to describe, query, and sync company records, manage fields and dedupe by externalCompanyId, and note CRM sync read-only."
---

# Companies

[Companies Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies)

Companies represent the organizations to which lead records belong. To add a lead to a Company, populate its `externalCompanyId` field by using the [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) or [Bulk Lead Import](bulk-lead-import.md) endpoints.

You cannot remove a lead from a company unless you add the lead to a different company. Leads linked to a company record inherit values from that record as though the values existed on the lead record.

Company APIs provide read-only access for subscriptions that have [SFDC Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync.html?lang=en) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync.html?lang=en) enabled.

## Describe

Describe the company object to retrieve the information required to interact with company records.

```http
GET /rest/v1/companies/describe.json
```

```json
{
   "success":true,
   "requestId":"5847#14d44113ad7",
   "result":[
      {
         "name":"Company",
         "description":"Company object",
         "createdAt":"2015-05-11T17:11:32Z",
         "updatedAt":"2015-05-11T17:11:32Z",
         "idField":"id",
         "dedupeFields":[
            "externalCompanyId"
         ],
         "searchableFields":[
            [
               "externalCompanyId"
            ],
            [
               "id"
            ],
            [
               "company"
            ]
         ],
         "fields":[
            {
               "name":"createdAt",
               "displayName":"Created At",
               "dataType":"datetime",
               "updateable":false
            },
            {
               "name":"externalCompanyId",
               "displayName":"External Company Id",
               "dataType":"string",
               "length":100,
               "updateable":false
            },
            {
               "name":"id",
               "displayName":"Id",
               "dataType":"integer",
               "updateable":false
            },
            {
               "name":"updatedAt",
               "displayName":"Updated At",
               "dataType":"datetime",
               "updateable":false
            },
            {
               "name":"annualRevenue",
               "displayName":"Annual Revenue",
               "dataType":"currency",
               "updateable":true
            }
            {
               "name":"company",
               "displayName":"Company Name",
               "dataType":"string",
               "length":255,
               "updateable":true
            }
         ]
      }
   ]
}
```

## Query

The pattern for [querying companies](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCompaniesUsingGET) closely follows the Leads API. However, the `filterType` parameter accepts only fields listed in the searchableFields array of the Describe Companies response or dedupeFields.

The query parameters are:

- `filterType` and `filterValues`: Required parameters.
- `fields`, `nextPageToken`, and `batchSize`: Optional parameters that function like the corresponding parameters in the Leads and Opportunities APIs.

When you request a list of `fields`, a requested field that is not returned has an implied value of null.

If you omit the fields parameter, the response returns these fields by default:

- id
- dedupeFields
- updatedAt
- createdAt

```http
GET /rest/v1/companies.json?filterType=id&filterValues=3433,5345
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "id":3433,
         "externalCompanyId":"19UYA31581L000000",
         "company":"Google"
      },
      {
         "seq":1,
         "id":5345,
         "externalCompanyId":"29UYA31581L000000",
         "company":"Yahoo"
      }
   ]
}
```

## Create and Update

The [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCompaniesUsingPOST) endpoint accepts a required `input` parameter that contains an array of company objects.

As with opportunities, the endpoint supports three create and update modes: createOnly, updateOnly, and createOrUpdate. Specify the mode in the request's `action` parameter.

The `dedupeBy` and `action` parameters are optional. They default to dedupeFields and createOrUpdate, respectively.

```http
POST /rest/v1/companies.json
```

```text
Content-Type: application/json
```

```json
{
   "action":"createOrUpdate",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "externalCompanyId":"19UYA31581L000000",
         "company":"Google"
      },
      {
         "externalCompanyId":"29UYA31581L000000",
         "company":"Yahoo"
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
         "id":1232
      },
      {
         "seq":1,
         "status":"created",
         "id":1323
      }
   ]
}
```

### Fields

The company object contains fields defined by attributes such as display name, API name, and dataType. Together, these attributes are called metadata.

The following endpoints query fields on the company object. The API user must have a role with the `Read-Write Schema Standard Field` permission, the `Read-Write Schema Custom Field` permission, or both.

### Query Fields

Query one company field by API name or retrieve all company fields.

#### By Name

The [Get Company Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCompanyFieldByNameUsingGET) endpoint retrieves metadata for one field on the company object. The required `fieldApiName` path parameter specifies the field's API name.

The response resembles the Describe Company response but includes additional metadata. For example, the `isCustom` attribute indicates whether the field is custom.

```http
GET /rest/v1/companies/schema/fields/industry.json
```

```json
{
    "requestId": "88f6#17e976d6ab4",
    "result": [
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
        }
    ],
    "success": true
}
```

#### Browse

The [Get Company Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCompanyFieldsUsingGET) endpoint retrieves metadata for all fields on the company object. By default, it returns a maximum of 300 records. Use the `batchSize` query parameter to reduce this number.

If the `moreResult` attribute is true, more results are available. Continue calling the endpoint with the returned `nextPageToken` until `moreResult` is false.

```http
GET /rest/v1/companies/schema/fields.json?batchSize=5
```

```json
{
    "requestId": "b50e#17e995c2d35",
    "result": [
        {
            "displayName": "Company Name",
            "name": "company",
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
            "displayName": "Site",
            "name": "site",
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
            "displayName": "Website",
            "name": "website",
            "description": null,
            "dataType": "url",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Main Phone",
            "name": "mainPhone",
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
            "displayName": "Annual Revenue",
            "name": "annualRevenue",
            "description": null,
            "dataType": "currency",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        }
    ],
    "success": true,
    "nextPageToken": "L7XD3EFJ3OLFZKXKJBWYULOTRA======",
    "moreResult": true
}
```

### Delete

Specify deletion criteria as a list of search values in the `input` array. Specify the deletion method in the `deleteBy` parameter.

The permitted values are dedupeFields and idField. The default is dedupeFields.

```text
Content-Type: application/json
```

```http
POST /rest/v1/companies/delete.json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "externalCompanyId":"19UYA31581L000000"
      },
      {
         "externalCompanyId":"29UYA31581L000000"
      },
      {
         "externalCompanyId":"39UYA31581L000000"
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
         "id":1234,
         "status":"deleted"
      },
      {
         "seq":1,
         "id":56456,
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

- Companies endpoints have a timeout of 30s unless otherwise noted.
- Sync Companies has a timeout of 60s.
- Delete Companies has a timeout of 60s.
