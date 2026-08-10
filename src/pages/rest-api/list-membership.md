---
title: List Membership (Static Lists)
description: "Use Marketo Lead Database REST APIs to add leads to static lists, remove leads, retrieve list members, and check list membership."
---

# List Membership (Static Lists)

[List Membership Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists)

The List Membership APIs provide Lead Database endpoints for managing static list members. Use these endpoints to:

- Add leads to a list.
- Remove leads from a list.
- Retrieve members of a list.
- Determine whether leads are members of a list.

## Endpoints

| Endpoint | Method | Path |
| --- | --- | --- |
| Add to List | POST | `/rest/v1/lists/{listId}/leads.json` |
| Remove from List | DELETE | `/rest/v1/lists/{listId}/leads.json` |
| Get Leads by List ID | GET | `/rest/v1/lists/{listId}/leads.json` |
| Member of List | GET | `/rest/v1/lists/{listId}/leads/ismember.json` |

## Add to List

Use the [Add to List](https://developer.adobe.com/marketo-apis/api/mapi#operation/addLeadsToListUsingPOST) endpoint to add one or more members to a list. Pass the required `listId` path parameter and one or more `id` query parameters that contain lead IDs. The maximum number of lead IDs is 300.

The response contains a `result` array with the status of each lead ID in the request.

```http
POST /rest/v1/lists/{listId}/leads.json?id=318594&id=318595
```

```json
{
    "requestId": "6860#1706170ba29",
    "result": [
        {
            "id": 318594,
            "status": "added"
        },
        {
            "id": 318595,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1004",
                    "message": "Lead not found"
                }
            ]
        }
    ],
    "success": true
}
```

## Remove from List

Use the [Remove from List](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE) endpoint to remove one or more members from a list. Pass the required `listId` path parameter and one or more `id` query parameters that contain lead IDs. The maximum number of lead IDs is 300.

The response contains a `result` array with the status of each lead ID in the request.

```http
DELETE /rest/v1/lists/{listId}/leads.json?id=318603&id=318595&id=999999
```

```json
{
    "requestId": "9e79#17061689ac3",
    "result": [
        {
            "id": 318603,
            "status": "removed"
        },
        {
            "id": 318595,
            "status": "removed"
        },
        {
            "id": 999999,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1004",
                    "message": "Lead not found"
                }
            ]
        }
    ],
    "success": true
}
```

## Get Leads by List ID

Use the [Get Leads by List Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByListIdUsingGET) endpoint to retrieve members of a list. Pass the required `listId` path parameter. You can also pass optional query parameters to specify filtering criteria.

The optional query parameters are:

- `batchSize`: Specifies the number of lead records to return in one call. The default and maximum value is 300.
- `nextPageToken`: Paginates through large result sets. Omit this parameter from the first call and include it in subsequent calls.
- `fields`: Specifies a comma-separated list of field names to return. If you omit this parameter, the response includes `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, and `id`.

The response contains a `result` array with the lead fields specified in the request.

```http
GET /rest/v1/lists/{listId}/leads.json?batchSize=3
```

```json
{
    "requestId": "ddae#170615ba0cc",
    "result": [
        {
            "id": 318594,
            "firstName": "Hanna",
            "lastName": "Crawford",
            "email": "208161Robert.L.Deacon@pookmail.com",
            "updatedAt": "2015-04-06T17:13:50Z",
            "createdAt": "2015-04-06T17:13:50Z"
        },
        {
            "id": 318595,
            "firstName": "Bertha",
            "lastName": "Fulton",
            "email": "208160Tyrone.V.Dyer@trashymail.com",
            "updatedAt": "2015-04-06T17:13:50Z",
            "createdAt": "2015-04-06T17:13:50Z"
        },
        {
            "id": 318596,
            "firstName": "Faith",
            "lastName": "England",
            "email": "208159Rex.M.Bailey@dodgit.com",
            "updatedAt": "2015-04-06T17:13:50Z",
            "createdAt": "2015-04-06T17:13:50Z"
        }
    ],
    "success": true,
    "nextPageToken": "PS5VL5WD4UOWGOUCJR6VY7JQO24LC2U5DRBU4WO4RQMPHDHTK2T3BEZOR75VLQXYB3245WW2GMDSK==="
}
```

## Member of List

Use the [Member of List](https://developer.adobe.com/marketo-apis/api/mapi#operation/areLeadsMemberOfListUsingGET) endpoint to determine whether one or more leads are members of a list. Pass the required `listId` path parameter and one or more `id` query parameters that contain lead IDs. The maximum number of lead IDs is 300.

The response contains a `result` array with the status of each lead ID in the request.

```http
GET /rest/v1/lists/{listId}/leads/ismember.json?id=309901&id=318603&id=999999
```

```json
{
    "requestId": "693a#17061475cf9",
    "result": [
        {
            "id": 309901,
            "status": "memberof"
        },
        {
            "id": 318603,
            "status": "notmemberof"
        },
        {
            "id": 999999,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1004",
                    "message": "Lead not found"
                }
            ]
        }
    ],
    "success": true
}
```
