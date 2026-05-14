---
title: Named Account Lists
description: "Learn how to manage Marketo Named Account Lists with the REST API, including permissions, fields, filtering, and endpoints to query, create, update, and delete."
---

# Named Account Lists

[Named Account Lists Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Account-Lists)

[Named Account Lists](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/target-account-management/target/account-lists) in Marketo represent collections of named accounts. They can be used for a wide variety of cases, including categorization, data enrichment, and smart campaign filtering. The Named Account List APIs allow for remote management of these list assets and their membership.
`Content`

## Permissions

To query Named Account Lists, the Read-Only Named Account List or the Read-Write Named Account List permission is required. To Create, Update, or Delete Lists, the Read-Write Named Account List permission is required. Querying list membership requires the Read-Only Named Account or Read-Write Named Account permissions, while managing membership requires the Read-Write Named Account Permissions.

## Model

Named Account Lists have a limited number of standard fields, and are not extensible with custom fields.
`Named Account List Field`

| Name | Data Type | Updateable | Notes |
| --- | --- | --- | --- |
| marketoGUID | String | False | Unique string identifier of the named account list. This field is system managed, and is not permitted as a field when creating a record. Field used by "dedupeBy":"idField" when performing a create or update. |
| name | String | True | Name of the list. Field used by "dedupeBy":"dedupeFields" when performing a create or update. |
| createdAt | Datetime | False | Datetime of the creation of the list. This field is system managed, and is not permitted as a field when creating or updating a record. |
| updatedAt | Datetime | False | Datetime of the most recent update to the list. This field is system managed, and is not permitted as a field when creating or updating a record. |
| type | String | False | Type of the list. May have a value of either "default" or "external". External lists are those created by CRM Account View. |

## Query

Querying account lists is simple and easy. Currently, there are only two valid filterTypes for querying named account lists: "dedupeFields" and "idField". The field to filter on is set in the `filterType` parameter of the query, and the values are set in `filterValues as` a comma-separated list. The `nextPageToken` and `batchSize` filters are also optional parameters.

```http
GET /rest/v1/namedAccountLists.json?filterType=idField&filterValues=dff23271-f996-47d7-984f-f2676861b5fb,dff23271-f996-47d7-984f-f2676861b5fc
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "seq": 0,
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
         "name": "Saas List",
         "createdAt": "xxxxxxxx",
         "updatedAt": "xxxxxxxx",
         "type": "default",
         "updateable": true
      },
      {
         "seq": 1,
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fc",
         "name": "My Account List",
         "createdAt": "xxxxxxxx",
         "updatedAt": "xxxxxxxx",
         "type": "default",
         "updateable": true
      }
   ]
}
```

## Create and Update

Creating and updating named account list records follows the established patterns for other Lead Database create and update operations. Keep in mind that named account lists only have one updateable field, `name`.

The endpoint permits the two standard action types: "createOnly," and "updateOnly."  The `action defaults` to "createOnly."

The optional `dedupeBy parameter` can be specified if action is `updateOnly`.  Permitted values are "dedupeFields" (corresponding to "name"), or "idField" (corresponding to "marketoGUID").  In `createOnly` modes, only "name" is permitted as the `dedupeBy` field. You can submit up to 300 records at a time.

```http
POST /rest/v1/namedAccountLists.json
```

```json
{
   "action": "createOnly",
   "dedupeBy": "dedupeFields",
   "input": [
      {
         "name": "SAAS List"
      },
      {
         "name": "Manufacturing (Domestic)"
      }
   ]
}
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "seq": 0,
         "status": "created",
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb"
      },
      {
         "seq": 1,
         "status": "created",
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fc"
      }
   ]
}
```

## Delete

Deletion of Named Account Lists is simple, and can be done based on either the `name`, or the `marketoGUID` of the list. To select the key you wish to use, pass either "dedupeFields" for name, or "idField" for marketoGUID in the`deleteB` member of your request. If unset, this will default to dedupeFields. You can delete up to 300 records at a time.

```http
POST /rest/v1/namedAccountLists/delete.json
```

```json
{
   "deleteBy": "dedupeFields",
   "input": [
      {
         "name": "Saas List"
      },
      {
         "name": "B2C List"
      },
      {
         "name": "Launchpoint Partner List"
      }
   ]
}
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "seq": 0,
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
         "status": "deleted"
      },
      {
         "seq": 1,
         "id": "dff23271-f996-47d7-984f-f2676861b5fc",
         "status": "deleted"
      },
      {
         "seq": 2,
         "status": "skipped",
         "reasons": [
            {
               "code": "1013",
               "message": "Record not found"
            }
         ]
      }
   ]
}
```

In the case that a record cannot be found for a given key, the corresponding result item will have a`status` of "skipped" and a reason with a code and message describing the failure, as shown in the above example.

## Managing Membership

### Query Membership

Querying the membership of a named account list is simple, requiring only the`i` of the account list. Optional parameters are:

-`field` - a comma-separated list of fields to include in the response records
-`nextPageToke` - for paging through the result set
-`batchSiz` - for specifying the number of records to return

If`field` is unset, then`marketoGUI`,`nam`, `createdA`, and`updatedA` will be returned. `batchSiz` has a maximum and default value of 300.

```http
GET /rest/v1/namedAccountList/{id}/namedAccounts.json
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "seq": 0,
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
         "name": "Saas List",
         "createdAt": "2017-02-01T00:00:00Z",
         "updatedAt": "2017-03-05T17:21:15Z"
      },
      {
         "seq": 1,
         "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fc",
         "name": "My Account List",
         "createdAt": "2017-02-01T00:00:00Z",
         "updatedAt": "2017-03-05T17:21:15Z"
      }
   ]
}
```

### Add Members

Named accounts can easily be added to a Named Account List. Accounts may only be added using their marketoGUID. You can add up to 300 records at a time.

```http
POST /rest/v1/namedAccountList/{id}/namedAccounts.json
```

```json
{
    "input": [
        {
             "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb"
        },
        {
             "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb"
        }
    ]
}
```

```json
{
    "requestId": "string",
    "result": [
        {
            "seq": 0,
            "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
            "status": "added"
        },
        {
            "seq": 1,
            "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
            "status": "added"
        }
    ],
    "success": true,
}
```

### Remove Members

Removing records from an account list has a different path, but the same interface, requiring a`marketoGUI` for each record that you want to delete. You can remove up to 300 records at a time.

```http
POST /rest/v1/namedAccountList/{id}/namedAccounts/remove.json
```

```json
{
    "input": [
        {
             "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb"
        },
        {
             "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb"
        }
    ]
}
```

```json
{
    "requestId": "string",
    "result": [
        {
            "seq": 0,
            "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
            "status": "added"
        },
        {
            "seq": 1,
            "marketoGUID": "dff23271-f996-47d7-984f-f2676861b5fb",
            "status": "added"
        }
    ],
    "success": true
}
```

## Timeouts

- Named Account List endpoints have a timeout of 30s unless noted below
  - Sync Named Account Lists: 60s
  - Delete Named Account Lists: 60s
  - Get Named Account Lists: 60s
  - Add Named Account List Members: 60s
  - Remove Named Account List Members: 60s
  - Get Named Account List Members: 60s
