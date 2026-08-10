---
title: Static Lists
description: "Use Marketo REST APIs to query, create, update, and delete static lists, with endpoints for ID, name, and browse, folder scoping, paging, and date filters."
---

# Static Lists

[Static Lists Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Static-Lists)

Use the Static Lists REST APIs to query, create, update, and delete static lists.

For Lead Database operations on list members, see [List Membership](list-membership.md).

## Query

Query static lists [by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByNameUsingGET), or by [browsing](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListsUsingGET).

### By Id

[Query by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByIdUsingGET) takes one static-list `id` path parameter and returns the matching record.

```http
GET /rest/asset/v1/staticList/{id}.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "843c#1641f969e96",
    "result": [
        {
            "id": 1021,
            "name": "Foundation Seed List",
            "createdAt": "2017-07-27T01:38:33Z+0000",
            "updatedAt": "2017-07-27T01:39:26Z+0000",
            "folder": {
                "id": 13,
                "type": "Folder"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1021A1"
        }
    ]
}
```

#### By Name

[Query by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByNameUsingGET) takes a static-list `name` parameter. The endpoint performs an exact match against static-list names and returns the matching record.

```http
GET /rest/asset/v1/staticList/byName.json?name=Foundation Seed List
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "28ab#1641fa246b9",
    "result": [
        {
            "id": 1021,
            "name": "Foundation Seed List",
            "createdAt": "2017-07-27T01:38:33Z+0000",
            "updatedAt": "2017-07-27T01:39:26Z+0000",
            "folder": {
                "id": 13,
                "type": "Folder"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1021A1"
        }
    ]
}
```

#### Browse

Use the browse endpoint to [retrieve static lists in batches](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListsUsingGET). The optional `folder` parameter scopes the query to a parent folder. Pass the folder as a JSON object containing `id` and `type`.

Use `offset` and `maxReturn` for pagination. Use `earliestUpdatedAt` and `latestUpdatedAt` as low and high date-time boundaries. These parameters return lists created or updated within the range. Use ISO-8601 values without milliseconds.

```http
GET /rest/asset/v1/staticLists.json?folder={"id":13,"type":"Folder"}
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "2dc0#1641f846633",
    "result": [
        {
            "id": 1021,
            "name": "Foundation Seed List",
            "createdAt": "2017-07-27T01:38:33Z+0000",
            "updatedAt": "2017-07-27T01:39:26Z+0000",
            "folder": {
                "id": 13,
                "type": "Folder"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1021A1"
        },
        {
            "id": 1022,
            "name": "Blacklist Seed List",
            "createdAt": "2017-07-27T23:19:33Z+0000",
            "updatedAt": "2017-07-27T23:21:29Z+0000",
            "folder": {
                "id": 13,
                "type": "Folder"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1022A1"
        },
        {
            "id": 1023,
            "name": "Possible Duplicates Seed List",
            "createdAt": "2017-07-28T00:10:02Z+0000",
            "updatedAt": "2017-07-28T00:11:22Z+0000",
            "folder": {
                "id": 13,
                "type": "Folder"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1023A1"
        }
    ]
}
```

## Create and Update

Send an `application/x-www-form-urlencoded` POST request to [create a static list](https://developer.adobe.com/marketo-apis/api/asset#operation/createStaticListUsingPOST). The `folder` and `name` parameters are required.

Pass `folder` as a JSON object containing `id` and `type`. The `name` must be unique. The optional `description` parameter describes the list.

```http
POST /rest/asset/v1/staticLists.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
folder={"id":1034,"type":"Program"}&name=My Static List
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "1269d#164209d6e1e",
    "result": [
        {
            "id": 1027,
            "name": "My Static List",
            "createdAt": "2018-06-21T04:32:25Z+0000",
            "updatedAt": "2018-06-21T04:32:25Z+0000",
            "folder": {
                "id": 1034,
                "type": "Program"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1027A1"
        }
    ]
}
```

Use the update endpoint to [change a static list](https://developer.adobe.com/marketo-apis/api/asset#operation/updateStaticListUsingPOST). The optional `description` parameter changes the description. The optional `name` parameter changes the name and must be unique.

```http
POST /rest/asset/v1/staticList/{id}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
description=This is a static list used for testing
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "f84f#16420b4c746",
    "result": [
        {
            "id": 1027,
            "name": "My Static List",
            "description": "This is a static list used for testing",
            "createdAt": "2018-06-21T04:32:26Z+0000",
            "updatedAt": "2018-06-21T04:57:55Z+0000",
            "folder": {
                "id": 1034,
                "type": "Program"
            },
            "computedUrl": "https://app-sjqe.marketo.com/#ST1027A1"
        }
    ]
}
```

## Delete

To [delete a static list](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteStaticListByIdUsingPOST), pass its `id` as a path parameter. You cannot delete a list used by an import, export, or another asset.

```http
POST /rest/asset/v1/staticList/{id}/delete.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "2c79#16420ded0e9",
    "result": [
        {
            "id": 1027
        }
    ]
}
```
