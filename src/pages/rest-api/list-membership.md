---
title: List Membership (Static Lists)
description: "Use Marketo Lead Database REST APIs to add leads to static lists, remove leads, retrieve list members, and check list membership."
---

# List Membership (Static Lists)

[List Membership Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists)

The List Membership APIs provide Lead Database endpoints for working with static list members. These endpoints can be used to add leads to a list, remove leads from a list, retrieve members of a list, and determine whether one or more leads are members of a list.

## Endpoints

| Endpoint | Method | Path |
| --- | --- | --- |
| Add to List | POST | `/rest/v1/lists/{listId}/leads.json` |
| Remove from List | DELETE | `/rest/v1/lists/{listId}/leads.json` |
| Get Leads by List ID | GET | `/rest/v1/lists/{listId}/leads.json` |
| Member of List | GET | `/rest/v1/lists/{listId}/leads/ismember.json` |

## Add to List

The [Add to List](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists/operation/addLeadsToListUsingPOST) endpoint is used to add one or more members to a list. The endpoint takes a required `listId` path parameter, and one or more `id` query parameters which contain lead ids (maximum allowed is 300).

The response contains a `result` array comprised of JSON objects with the status for each lead id that was specified in the request.

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

The [Remove from List](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists/operation/removeLeadsFromListUsingDELETE) endpoint is used to remove one or more members from a list. The endpoint takes a required `listId` path parameter, and one or more `id` query parameters which contain lead ids (maximum allowed is 300).

The response contains a `result` array comprised of JSON objects with the status for each lead id that was specified in the request.

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

The [Get Leads by List Id](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists/operation/getLeadsByListIdUsingGET) endpoint is used to retrieve members of a list. The endpoint takes a required `listId` path parameter, and allows several optional query parameters to specify filtering criteria.

The `batchSize` parameter is used to specify the number of lead records to be returned in a single call. The default and maximum is 300.

The `nextPageToken` parameter is used to paginate through large result sets. This parameter is not passed in the first call, but only in subsequent calls for pagination.

The `fields` parameter contains a comma-separated list of field names to be returned in the response. If the `fields` parameter is not included in this request, the following default fields are returned: `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, and `id`.

The response contains a `result` array comprised of JSON objects containing the lead fields that were specified in the request.

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

The [Member of List](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists/operation/areLeadsMemberOfListUsingGET) endpoint is used to see if one or more leads are members of a list. The endpoint takes a required `listId` path parameter, and one or more `id` query parameters which contain lead ids (maximum allowed is 300).

The response contains a `result` array comprised of JSON objects with the status for each lead id that was specified in the request.

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
