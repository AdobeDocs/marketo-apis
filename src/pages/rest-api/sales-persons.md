---
title: Sales Persons
description: "Marketo REST API guide to Sales Person records with SFDC or Dynamics sync, using externalSalesPersonId to relate to leads and perform query, upsert, delete."
---

# Sales Persons

[Sales Person Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Sales-Persons)

Sales Person APIs are read-only access for subscriptions which have [SFDC Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync) are enabled. Sales Persons are a type of person record that are the sales owners of lead records. They are related to Lead records by the externalSalesPersonId field on each Lead record. When a Lead is related to a Sales Person by a populated externalSalesPersonId field, the corresponding Lead Owner lookup fields are populated for that lead record in Marketo, allowing usage of the corresponding filters and tokens.

Sales Persons are related to Lead records by using the [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/syncLeadUsingPOST) endpoint and passing the externalSalesPersonId attribute.

Sales Persons are related to Opportunity records by using the [Sync Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities/operation/syncOpportunitiesUsingPOST) endpoint and passing the externalSalesPersonId attribute.

Sales Persons are related to Company records by using the [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/syncCompaniesUsingPOST) endpoint and passing the externalSalesPersonId attribute.

Sales Person records are only editable via the API.

## Describe

Describing Sales Person records follows the standard pattern for lead database objects.

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

By default, the `idField` of Sales Persons is "id" and the `dedupeFields` is just "externalSalesPersonId."

## Query

Sales Persons using the standard query pattern for simple keys. This example shows the user's email being used as the externalSalesPersonId. By default the query returns all fields that are populated for the returned records.

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

The pattern for updates is standard.

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

The pattern for deletes is standard.

Deletion of Sales Persons is not allowed when "in use". In this case the Sales Person is skipped. Examples:

- When Sales Person is associated with active Leads
- When Sales Person is associated with a Company that has been deleted

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

- Sales Person Endpoints have a timeout of 30s unless noted below
  - Sync Sales Persons: 60s
  - Delete Sales Persons: 60s
