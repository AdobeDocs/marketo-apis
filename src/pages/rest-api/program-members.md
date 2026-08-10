---
title: Program Members
description: "Use the Marketo REST API to read, create, update, and delete program members, manage standard and custom fields, and query using searchable fields."
---

# Program Members

[Program Members Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members)

Marketo provides APIs for reading, creating, updating, and deleting program member records. The lead id field relates program member records to lead records.

Each record contains standard fields and can contain up to 20 custom fields. These fields store program-specific member data for use in forms, filters, triggers, and flow actions. You can view this data in the program's [Members Tab](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/working-with-programs/manage-and-view-members) in the Marketo Engage UI.

## Describe

The [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET2) endpoint follows the standard pattern for Lead Database objects.

- The `searchableFields` array identifies fields that are valid for queries.
- The `fields` array contains metadata such as the REST API name, display name, and whether the field is updateable.

```http
GET /rest/v1/programs/members/describe.json
```

```json
{
    "requestId": "f813#1791563c7cc",
    "result": [
        {
            "name": "API Program Membership",
            "description": "Map for API program membership fields",
            "createdAt": "2021-03-20T01:30:05Z",
            "updatedAt": "2021-03-20T01:30:05Z",
            "dedupeFields": [
                "leadId",
                "programId"
            ],
            "searchableFields": [
                [
                    "leadId"
                ],
                [
                    "myCustomField"
                ],
                [
                    "reachedSuccess"
                ],
                [
                    "statusName"
                ]
            ],
            "fields": [
                {
                    "name": "acquiredBy",
                    "displayName": "acquiredBy",
                    "dataType": "boolean",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "attendanceLikelihood",
                    "displayName": "attendanceLikelihood",
                    "dataType": "integer",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "createdAt",
                    "displayName": "createdAt",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "isExhausted",
                    "displayName": "isExhausted",
                    "dataType": "boolean",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "leadId",
                    "displayName": "leadId",
                    "dataType": "integer",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "membershipDate",
                    "displayName": "membershipDate",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "nurtureCadence",
                    "displayName": "nurtureCadence",
                    "dataType": "string",
                    "length": 4,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "program",
                    "displayName": "program",
                    "dataType": "string",
                    "length": 255,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "programId",
                    "displayName": "programId",
                    "dataType": "integer",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "reachedSuccess",
                    "displayName": "reachedSuccess",
                    "dataType": "boolean",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "reachedSuccessDate",
                    "displayName": "reachedSuccessDate",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "registrationLikelihood",
                    "displayName": "registrationLikelihood",
                    "dataType": "integer",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "statusName",
                    "displayName": "statusName",
                    "dataType": "string",
                    "length": 255,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "statusReason",
                    "displayName": "statusReason",
                    "dataType": "string",
                    "length": 255,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "trackName",
                    "displayName": "trackName",
                    "dataType": "string",
                    "length": 255,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "updatedAt",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "waitlistPriority",
                    "displayName": "waitlistPriority",
                    "dataType": "integer",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "myCustomField",
                    "displayName": "myCustomField",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "registrationCode",
                    "displayName": "registrationCode",
                    "dataType": "string",
                    "length": 100,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "webinarUrl",
                    "displayName": "webinarUrl",
                    "dataType": "string",
                    "length": 2000,
                    "updateable": true,
                    "crmManaged": false
                }
            ]
        }
    ],
    "success": true
}
```

## Query

Use the [Get Program Members](https://developer.adobe.com/marketo-apis/api/mapi#operation/getProgramMembersUsingGET) endpoint to retrieve members of a program. The request requires a `programId` path parameter and `filterType` and `filterValues` query parameters.

`programId` specifies the program to search.

`filterType` specifies the field to use as the search filter. It accepts any field in the "searchableFields" list returned by the [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET2) endpoint. For a custom field, the dataType must be either "string" or "integer".

When filterType is not "leadId", the request can process a maximum of 100,000 program member records. Depending on your Marketo instance configuration, you receive one of these errors:

- If the total number of program members exceeds 100,000, an error is returned: "1003, Total membership size: 100,001 exceeds the limit allowed 100,000 for the filter".
- If the total number of program members _that match the filter_ exceeds 100,000, an error is returned: "1003, Matching membership size: 100,001 exceeds the limit allowed (100,000) for this api".

To query a program whose membership count exceeds the limit, use the [Bulk Program Member Extract API](bulk-program-member-extract.md) instead.

`filterValues` specifies the values to search for and accepts up to 300 comma-separated values. The call searches for records where the program member field matches one of the included filterValues.

Alternatively, filter by date range by specifying `updatedAt` as filterType and providing the `startAt` and `endAt` datetime parameters. The range must be seven days or fewer. Use ISO-8601 format without milliseconds for datetime values.

The optional `fields` query parameter accepts a comma-separated list of field API names returned by the [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET2) endpoint. When included, each response record contains the specified fields. When omitted, the response returns `acquiredBy`, `leadId`, `membershipDate`, `programId`, and `reachedSuccess` by default.

By default, the endpoint returns a maximum of 300 records. Use the `batchSize` query parameter to reduce this number.

If the **moreResult** attribute is true, more results are available. Continue calling the endpoint with the returned `nextPageToken` until moreResult is false.

If the total length of the GET request exceeds 8KB, the endpoint returns the HTTP error "414, URI too long". To work around this limit, change the request from GET to POST, add the `_method=GET` parameter, and place the query string in the request body.

```http
GET /rest/v1/programs/{programId}/members.json?filterType=statusName&filterValues=Influenced
```

```json
{
    "requestId": "109da#17915eec072",
    "result": [
        {
            "seq": 0,
            "leadId": 1789,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 1,
            "leadId": 1790,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 2,
            "leadId": 1791,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 3,
            "leadId": 1792,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 4,
            "leadId": 1793,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 5,
            "leadId": 1794,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 6,
            "leadId": 1795,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 7,
            "leadId": 1796,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 8,
            "leadId": 1797,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 9,
            "leadId": 1798,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 10,
            "leadId": 1799,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        },
        {
            "seq": 11,
            "leadId": 1800,
            "reachedSuccess": true,
            "programId": 1044,
            "acquiredBy": true,
            "membershipDate": "2020-01-08T18:10:26Z"
        }
    ],
    "success": true,
    "moreResult": false
}
```

## Create and Update

Two endpoints support create and update operations on program members:

- One endpoint updates only program member status.
- One endpoint updates program member fields marked as "updateable".

Each endpoint can modify up to 300 program member records per call.

### Program Member Status

Use the [Sync Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncProgramMemberStatusUsingPOST) endpoint to create or update the program status for one or more members.

The required parameters are:

- `programId`: A path parameter that specifies the program containing members to create or update.
- `statusName`: Specifies the program status to apply to a list of leads. The statusName must match an available status for the program's channel. Retrieve valid statuses with the [Get Channels](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllChannelsUsingGET) endpoint. If a lead's status has a greater step value than the designated statusName, the request skips that lead.
- `input`: An array of `leadId` values that correspond to program members. You can submit up to 300 leadIds per call.

The endpoint performs an upsert on each record. If the leadId is associated with a program member, the endpoint updates its membership status. Otherwise, it creates a program member record, associates the record with the leadId, and assigns the membership status.

The response includes a `status` of "updated", "created", or "skipped". A skipped result also includes a `reasons` array. The `seq` field is an index that correlates each submitted record with the response order.

If the call is successful, a "Change Program Status" activity is written to the lead's activity log.

```http
POST /rest/v1/programs/{programId}/members/status.json
```

```text
Content-Type: application/json
```

```json
{
    "statusName":"Influenced",
    "input":[
        {
            "leadId": 1800
        },
        {
            "leadId": 1801
        },
        {
            "leadId": 1235
        }
    ]
}
```

```json
{
    "requestId": "14b2d#17916378ec5",
    "result": [
        {
            "seq": 0,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1037",
                    "message": "Lead skipped because it is already in or past this status"
                }
            ]
        },
        {
            "seq": 1,
            "status": "updated",
            "leadId": 1801
        },
        {
            "seq": 2,
            "status": "created",
            "leadId": 1235
        }
    ],
    "success": true
}
```

### Program Member Data

Use the [Sync Program Member Data](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncProgramMemberDataUsingPOST) endpoint to update program member field data for one or more members. You can modify any custom field or any standard field marked as "updateable" by the [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET2) endpoint.

The required parameters are:

- `programId`: A path parameter that specifies the program containing members to update.
- `input`: An array whose elements contain a `leadId` and one or more fields to update by API name. You can submit up to 300 leadIds per call.

The endpoint updates each record. The leadId must be associated with a program member, and each field must be updateable.

The response includes a `status` of "updated" or "skipped". A skipped result also includes a `reasons` array. The `seq` field is an index that correlates each submitted record with the response order.

If the call is successful, a "Change Program Member Data" activity is written to the lead's activity log.

```http
POST /rest/v1/programs/{programId}/members.json
```

```text
Content-Type: application/json
```

```json
{
    "input":[
        {
            "leadId": 1789,
            "registrationCode": "dcff5f12-a7c7-11eb-bcbc-0242ac130002"
        },
        {
            "leadId": 1790,
            "registrationCode": "c0404b78-d3fd-47bf-82c4-d16f3852ab3a"
        },
        {
            "leadId": 1003,
            "registrationCode": "aa880c57-75b8-426b-a33a-fbf6302d7cb4"
        }
    ]
}
```

```json
{
    "requestId": "edc3#1791659b8d2",
    "result": [
        {
            "seq": 0,
            "status": "updated",
            "leadId": 1789
        },
        {
            "seq": 1,
            "status": "updated",
            "leadId": 1790
        },
        {
            "seq": 2,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1013",
                    "message": "Membership not found"
                }
            ]
        }
    ],
    "success": true
}
```

## Fields

The program member object contains standard fields and optional custom fields. Standard fields are present in every Marketo Engage subscription, while users create custom fields as needed.

Each field is defined by attributes such as display name, API name, and dataType. Together, these attributes are called metadata.

The following endpoints query, create, and update fields on the program member object. The API user must have a role with the **Read-Write Schema Standard Field** permission, the **Read-Write Schema Custom Field** permission, or both.

### Query Fields

Query one program member field by API name or retrieve all program member fields. The role permissions determine whether the response can include standard fields, custom fields, or both. The response also includes hidden fields.

#### By Name

The [Get Program Member Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#operation/getProgramMemberFieldByNameUsingGET) endpoint retrieves metadata for one field on the program member object. The required `fieldApiName` path parameter specifies the field's API name.

The response resembles the Describe Program Member response but includes additional metadata. For example, the `isCustom` attribute indicates whether the field is custom.

```http
GET /rest/v1/programs/members/schema/fields/{fieldApiName}.json
```

```json
{
    "requestId": "15416#17e955554de",
    "result": [
        {
            "displayName": "Status",
            "name": "statusName",
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

The [Get Program Member Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/getProgramMemberFieldsUsingGET) endpoint retrieves metadata for all fields on the program member object. By default, it returns a maximum of 300 records. Use the `batchSize` query parameter to reduce this number.

If the `moreResult` attribute is true, more results are available. Continue calling the endpoint with the returned `nextPageToken` until moreResult is false.

```http
GET /rest/v1/programs/members/schema/fields.json?batchSize=5
```

```json
{
    "requestId": "102f6#17e9557f123",
    "result": [
        {
            "displayName": "Acquired By",
            "name": "acquiredBy",
            "description": null,
            "dataType": "boolean",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Nurture Cadence",
            "name": "nurtureCadence",
            "description": null,
            "dataType": "string",
            "length": 4,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Nurture Exhausted",
            "name": "isExhausted",
            "description": null,
            "dataType": "boolean",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Member Date",
            "name": "membershipDate",
            "description": null,
            "dataType": "datetime",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": false,
            "isCustom": false,
            "isApiCreated": false
        },
        {
            "displayName": "Program",
            "name": "program",
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
    "nextPageToken": "BC7J6EPVLT6T4B5FKUU3APCYN4======",
    "moreResult": true
}
```

### Create Fields

The [Create Program Member Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/createProgramMemberFieldUsingPOST) endpoint creates custom fields on the program member object. It provides functionality comparable to the [Marketo Engage UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/working-with-programs/program-member-custom-fields). You can create up to 20 custom fields with this endpoint.

Carefully consider each field before creating it in a production Marketo Engage instance. After you create a field, you cannot delete it; [you can only hide it](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/field-management/delete-a-custom-field-in-marketo). Unused fields add clutter to the instance.

The required `input` parameter is an array of program member field objects. Each object contains one or more attributes.

- Required attributes are `displayName`, `name`, and `dataType`. They correspond to the UI display name, API name, and field type, respectively.
- Optional attributes are `description`, `isHidden`, `isHtmlEncodingInEmail`, and `isSensitive`.

The `name` and `displayName` attributes have these naming rules:

- The `name` attribute must be unique, start with a letter, and contain only letters, numbers, or underscores.
- The *`isplayName` must be unique and cannot contain special characters.

A common convention is to apply [camel case](https://en.wikipedia.org/wiki/Camel_case#) to `displayName` to produce `name`. For example, a `displayName` of "My Custom Field" produces a `name` of "myCustomField".

```http
POST /rest/v1/programs/members/schema/fields.json
```

```json
{
  "input": [
    {
        "displayName": "PMCF Custom Field 03",
        "name": "pMCFCustomField03",
        "description": "My third custom field",
        "dataType": "string"
    }
  ]
}
```

```json
{
    "requestId": "13a7#17e955fcb44",
    "result": [
        {
            "name": "pMCFCustomField03",
            "status": "created"
        }
    ],
    "success": true
}
```

### Update Field

The [Update Program Member Field](https://developer.adobe.com/marketo-apis/api/mapi#operation/updateProgramMemberFieldUsingPOST) endpoint updates one custom field on the program member object. Most field updates available in the Marketo Engage UI are also available through the API. The following table summarizes the differences.

| Attribute | Updatable by API? | Updatable by UI? | Updatable by API? | Updatable by UI? |
| --- | --- | --- | --- | --- |
| dataType | no | no | no | yes |
| description | yes | yes | yes | yes |
| displayName | no | no | yes | yes |
| isCustom | no | no | no | no |
| isHidden | no | yes | yes (if created by API) | yes |
| isHtmlEncodingInEmail | yes | yes | yes | yes |
| isSensitive | yes | yes | yes | yes |
| length | no | no | no | no |
| name | no | no | no | no |

The request requires these parameters:

- `fieldApiName`: A path parameter that specifies the API name of the field to update.
- `input`: An array that contains one lead field object with one or more attributes.

```http
POST /rest/v1/programs/members/schema/fields/pMCFCustomField03.json
```

```json
{
  "input": [
      {
        "displayName": "Lunch Preference",
        "description": "Attendee food preference",
        "isHtmlEncodingInEmail": true
      }
  ]
}
```

```json
{
    "requestId": "215f#17e95663955",
    "result": [
        {
            "name": "pMCFCustomField03",
            "status": "updated"
        }
    ],
    "success": true
}
```

## Delete

Use the [Delete Program Members](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteProgramMemberUsingPOST) endpoint to delete program member records. The required `programId` path parameter specifies the program containing the members to delete.

The request body contains an `input` array of lead IDs. Each call permits a maximum of 300 lead IDs.

The response includes a `status` of "deleted" or "skipped". A skipped result also includes a `reasons` array. The `seq` field is an index that correlates each submitted record with the response order.

```http
POST /rest/v1/programs/{programId}/members/delete.json
```

```text
Content-Type: application/json
```

```json
{
    "input":[
        {
            "leadId": 1235
        },
        {
            "leadId": 77
        }
    ]
}
```

```json
{
    "requestId": "302a#17916619417",
    "result": [
        {
            "seq": 0,
            "status": "deleted",
            "leadId": 1235
        },
        {
            "seq": 1,
            "status": "skipped",
            "reasons": [
                {
                    "code": "1037",
                    "message": "Lead not in program"
                }
            ]
        }
    ],
    "success": true
}
```
