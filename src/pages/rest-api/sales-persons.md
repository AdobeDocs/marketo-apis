---
title: Sales Persons
description: "Marketo REST API guide to Sales Person records with SFDC or Dynamics sync, using externalSalesPersonId to relate to leads and perform query, upsert, delete."
---

# Sales Persons

[Sales Person Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Sales-Persons)

Sales Person APIs provide read-only access for subscriptions that have [SFDC Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync) enabled.

Sales Persons are person records that represent the sales owners of lead records. The externalSalesPersonId field on each Lead record relates a Lead to a Sales Person. When this field is populated, Marketo populates the corresponding Lead Owner lookup fields on the lead record. You can then use the associated filters and tokens.

Relate Sales Persons to other records by passing the externalSalesPersonId attribute to the corresponding endpoint:

- Lead records: [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST).
- Opportunity records: [Sync Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncOpportunitiesUsingPOST).
- Company records: [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCompaniesUsingPOST).

Sales Person records are only editable via the API.

## Describe

Describe Sales Person records by using the standard pattern for Lead Database objects.

```http
GET /rest/v1/salespersons/describe.json
```

```json
{
   "requestId":"185d6#14b51985ff0",
   "success":true,
   "result":[
      {
         "name":"SalesPerson",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:24Z",
         "idField":"id",
         "dedupeFields":[
            "externalSalesPersonId"
         ],
         "searchableFields":[
            [
               "email"
            ],
            [
               "id"
            ],
            [
               "externalSalesPersonId"
            ]
         ],
         "fields":[
            {
               "name":"id",
               "displayName":"Marketo Id",
               "dataType":"integer",
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
               "name":"email",
               "displayName":"Email",
               "dataType":"string",
               "length":255,
               "updateable":false
            },
            {
               "name":"externalSalesPersonId",
               "displayName":"External Sales Person Id",
               "dataType":"string",
               "length":255,
               "updateable":false
            }
         ]
      }
   ]
}
```

By default, the Sales Person `idField` is "id" and `dedupeFields` is "externalSalesPersonId."

## Query

Query Sales Persons by using the standard query pattern for simple keys. The following example uses the user's email as the externalSalesPersonId.

By default, the query returns all populated fields for the matching records.

```http
GET /rest/v1/salespersons.json?filterType=dedupeFields&filterValues=david@test.com,sam@test.com
```

```json
 {
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "id":53453,
         "externalSalesPersonId":"sam@test.com",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:23Z"
      },
      {
         "seq":1,
         "id":53454,
         "externalSalesPersonId":"david@test.com",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:23Z"
      }
   ]
}
```

## Create and Update

Create or update Sales Persons by using the standard update pattern.

```http
POST /rest/v1/salespersons.json
```

```json
{
   "action":"createOrUpdate",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "externalSalesPersonId":"sam@test.com",
         "email":"sam@test.com",
         "firstName":"Sam",
         "lastName":"Sanosin"
      },
      {
         "externalSalesPersonId":"david@test.com",
         "email":"david@test.com",
         "firstName":"David",
         "lastName":"Aulassak"
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
         "id":45232
      },
      {
         "seq":1,
         "status": "created",
         "id":45236
      }
   ]
}
```

## Delete

Delete Sales Persons by using the standard delete pattern.

You cannot delete a Sales Person that is "in use." The request skips the Sales Person in the following cases:

- The Sales Person is associated with active Leads.
- The Sales Person is associated with a Company that has been deleted.

```http
POST /rest/v1/salespersons/delete.json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "externalSalesPersonId":"sam@test.com"
      },
      {
         "externalSalesPersonId":"david@test.com"
      },
      {
         "externalSalesPersonId":"raj@test.com"
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
         "id":56343,
         "status": "deleted"
      },
      {
         "seq":1,
         "id":53453,
         "status": "deleted"
      },
      {
         "seq":2,
         "status": "skipped"
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

- Sales Person endpoints have a timeout of 30s unless otherwise noted.
- Sync Sales Persons has a timeout of 60s.
- Delete Sales Persons has a timeout of 60s.
