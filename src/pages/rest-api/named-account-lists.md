---
title: Named Account Lists
description: "Learn how to manage Marketo Named Account Lists with the REST API, including permissions, fields, filtering, and endpoints to query, create, update, and delete."
---

# Named Account Lists

[Named Account Lists Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Named-Account-Lists)

[Named Account Lists](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/target-account-management/target/account-lists) are collections of named accounts in Marketo. Use them for categorization, data enrichment, and smart campaign filtering.

The Named Account List APIs let you remotely manage list assets and their membership.
`Content`

## Permissions

The required permission depends on the operation:

- Query Named Account Lists: Read-Only Named Account List or Read-Write Named Account List.
- Create, update, or delete lists: Read-Write Named Account List.
- Query list membership: Read-Only Named Account or Read-Write Named Account.
- Manage list membership: Read-Write Named Account.

## Model

Named Account Lists have a limited set of standard fields and do not support custom fields.
`Named Account List Field`

| Name | Data Type | Updateable | Notes |
| --- | --- | --- | --- |
| marketoGUID | String | False | Unique string identifier of the named account list. This field is system managed, and is not permitted as a field when creating a record. Field used by "dedupeBy":"idField" when performing a create or update. |
| name | String | True | Name of the list. Field used by "dedupeBy":"dedupeFields" when performing a create or update. |
| createdAt | Datetime | False | Datetime of the creation of the list. This field is system managed, and is not permitted as a field when creating or updating a record. |
| updatedAt | Datetime | False | Datetime of the most recent update to the list. This field is system managed, and is not permitted as a field when creating or updating a record. |
| type | String | False | Type of the list. May have a value of either "default" or "external". External lists are those created by CRM Account View. |

## Query

Named account list queries support two filterTypes: "dedupeFields" and "idField". Set the field in the `filterType` query parameter and provide the values in `filterValues as` a comma-separated list.

The `nextPageToken` and `batchSize` filters are optional.

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

Create and update named account list records by using the standard Lead Database pattern. Named account lists have only one updateable field: `name`.

The endpoint supports two standard action types: "createOnly" and "updateOnly." The `action defaults` to "createOnly."

You can specify the optional `dedupeBy parameter` when action is `updateOnly`. The permitted values are "dedupeFields", which corresponds to "name", and "idField", which corresponds to "marketoGUID".

In `createOnly` modes, only "name" is permitted as the `dedupeBy` field. You can submit up to 300 records at a time.

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

Delete Named Account Lists by using either the `name` or `marketoGUID` of the list. To select the key, pass "dedupeFields" for name or "idField" for marketoGUID in the`deleteB` member of the request.

If unset, the value defaults to dedupeFields. You can delete up to 300 records at a time.

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

If a record cannot be found for a key, the corresponding result item has a`status` of "skipped." It also includes a reason with a code and message that describe the failure.

## Managing Membership

### Query Membership

Query named account list membership by providing the`i` of the account list. The optional parameters are:

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

Add named accounts to a Named Account List by using their marketoGUID. You can add up to 300 records at a time.

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

Removing records from an account list uses a different path but the same interface. Provide a`marketoGUI` for each record to remove. You can remove up to 300 records at a time.

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

- Named Account List endpoints have a timeout of 30s unless otherwise noted.
- Sync Named Account Lists has a timeout of 60s.
- Delete Named Account Lists has a timeout of 60s.
- Get Named Account Lists has a timeout of 60s.
- Add Named Account List Members has a timeout of 60s.
- Remove Named Account List Members has a timeout of 60s.
- Get Named Account List Members has a timeout of 60s.
