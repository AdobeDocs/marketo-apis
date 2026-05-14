---
title: Companies
description: "Use the Marketo Companies REST API to describe, query, and sync company records, manage fields and dedupe by externalCompanyId, and note CRM sync read-only."
---

# Companies

[Companies Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies)

Companies represent the organization to which lead records belong. Leads are added to a Company by populating their corresponding `externalCompanyId` field using [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/syncLeadUsingPOST) or [Bulk Lead Import](bulk-lead-import.md) endpoints. Once a lead has been added to a company, you cannot delete the lead from that company (unless you add the lead to a different company). Leads linked to a company record will directly inherit the values from a company record as though the values existed on the lead's own record.

Company APIs are read-only access for subscriptions which have [SFDC Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync.html?lang=en) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync.html?lang=en) are enabled.

## Describe

Describing the company object gives you all the information you must interact with them.

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

The pattern for [querying companies](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/getCompaniesUsingGET) closely follows that of the leads API with the added restriction that the `filterType` parameter accepts the fields listed in the searchableFields array of the Describe Companies call, or dedupeFields.

`filterType` and `filterValues` are required query parameters.  `fields`, `nextPageToken`, and `batchSize` are optional parameters.  The parameters function just like the corresponding parameters in the Leads and Opportunities APIs. When requesting a list of `fields`, if a particular field is requested, but not returned, the value is implied to be null.

If the fields parameter is omitted, the default set of fields returned is:

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

The [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/syncCompaniesUsingPOST) endpoint accepts the required `input` parameter that contains an array of company objects. Just like opportunities, there are three modes for creating and updating companies: createOnly, updateOnly, and createOrUpdate.  Modes are specified in the `action` parameter of the request. Both the `dedupeBy` and `action` parameters are optional, and default to the dedupeFields and the createOrUpdate modes respectively.

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

The company object contains a set of fields. Each field definition is composed of a set of attributes that describe the field. Examples of attributes are display name, API name, and dataType. These attributes are known collectively as metadata.

The following endpoints allow you to query fields on the company object. These APIs require that the owning API user have a role with one or both of the `Read-Write Schema Standard Field` or `Read-Write Schema Custom Field` permissions.

### Query Fields

Querying company fields is straightforward. You may query a single company field by API name or query the set of all company fields.

#### By Name

The [Get Company Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/getCompanyFieldByNameUsingGET) endpoint retrieves metadata for a single field on the company object. The required `fieldApiName` path parameter specifies the API name of the field. The response is like the Describe Company endpoint but contains additional metadata such as the `isCustom` attribute which denotes whether the field is a custom field.

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

The [Get Company Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/getCompanyFieldsUsingGET) endpoint retrieves metadata for all fields on the company object. By default, a maximum of 300 records are returned. You can use the `batchSize` query parameter to reduce this number. If the `moreResult` attribute is true, this means more results are available. Continue to call this endpoint until the moreResult attribute returns false, which means there are no results available. The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

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

The deletion criteria is specified in the `input` array, which contains a list of search values.  The deletion method is specified in the `deleteBy` parameter.  Permissible values are: dedupeFields, idField.  Default is dedupeFields.

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

- Companies endpoints have a timeout of 30s unless noted below
  - Sync Companies: 60s
  - Delete Companies: 60s
