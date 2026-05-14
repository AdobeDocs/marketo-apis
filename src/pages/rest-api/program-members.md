---
title: Program Members
description: "Use the Marketo REST API to read, create, update, and delete program members, manage standard and custom fields, and query using searchable fields."
---

# Program Members

[Program Members Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members)

Marketo exposes APIs for reading, creating, updating, and deleting program member records. Program member records are related to lead records via the lead id field. The records are composed of a set of standard fields, and optionally up to 20 additional custom fields. The fields contain program-specific data for each member, and can be used in forms, filters, triggers, and flow actions. This data is viewable in the program's [Members Tab](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/working-with-programs/manage-and-view-members) in the Marketo Engage UI.

## Describe

The [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/describeProgramMemberUsingGET2) endpoint follows the standard pattern for lead database objects. The `searchableFields` array gives you the set of fields which are valid for querying. The `fields` array contains field metadata including REST API name, display name, and field update-ability.

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

The [Get Program Members](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/getProgramMembersUsingGET) endpoint allows you to retrieve members of a program. It requires a `programId` path parameter, and `filterType` and `filterValues` query parameters.

`programId` is used to specify which program to search.

`filterType` is used to specify which field to use as search filter. It accepts any field in the "searchableFields" list returned by the [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/describeProgramMemberUsingGET2) endpoint. If you specify a filterType that is a custom field, the custom field's dataType must be either "string" or "integer". If you specify a filterType other than "leadId", a maximum of 100,000 program member records can be processed by the request. Depending on how your Marketo instance is configured, you receive one of the following errors:

- If the total number of program members exceeds 100,000, an error is returned: "1003, Total membership size: 100,001 exceeds the limit allowed 100,000 for the filter".
- If the total number of program members _that match the filter_ exceeds 100,000, an error is returned: "1003, Matching membership size: 100,001 exceeds the limit allowed (100,000) for this api".

To query a program whose membership count is exceeds the limit, use the [Bulk Program Member Extract API](bulk-program-member-extract.md) instead.

`filterValues` is used to specify which values to search for, and accepts up to 300 values in a comma-separated format. The call searches for records where the program member's field matches one of the included filterValues.

Alternatively, you can filter by date range by specifying `updatedAt` as filterType with `startAt` and `endAt` datetime parameters. The range must be seven days or fewer. Datetimes should be in an ISO-8601 format, without milliseconds.

The optional `fields` query parameter accepts a comma-separated list of field API names that returned by the [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/describeProgramMemberUsingGET2) endpoint. When included, each record in the response includes the specified fields. When omitted, the default set of fields returned are `acquiredBy`, `leadId`, `membershipDate`, `programId`, and `reachedSuccess`.

By default, a maximum of 300 records are returned. You can use the `batchSize` query parameter to reduce this number. If the **moreResult** attribute is true, this means more results are available. Continue to call this endpoint until the moreResult attribute returns false, which means there are no results available. The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

If the total length of your GET request exceeds 8KB, an HTTP error is returned: "414, URI too long". As a workaround, you may change your GET to POST, add `_method=GET` parameter, and place query string in the request body.

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

There are two endpoints that support create/update operation on program members. One allows you to update program member status only. The other allows you to update the set of program member fields that are marked as "updateable". Both endpoints allow you to modify up to 300 program member records per call.

### Program Member Status

The [Sync Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/syncProgramMemberStatusUsingPOST) endpoint is used to create or update the program status for one or more members.

The required `programId` path parameter specifies the program containing members to create or update.

The required `statusName` parameter specifies the program status to apply to a list of leads. The statusName must match an available status for the program's channel. Valid statuses can be retrieved using the [Get Channels](https://developer.adobe.com/marketo-apis/api/asset#tag/Channels/operation/getAllChannelsUsingGET) endpoint. If a lead's status has a greater step value than the designated statusName, then that lead will be skipped.

The required `input` parameter is an array of `leadId` that correspond to program members. You can submit up to 300 leadIds per call. An upsert operation is performed on each record. If the leadId is associated with a program member, then its membership status is updated. If not, a new program member record is created, the record is associated with the leadId, and the membership status is assigned.

The endpoint responds with a `status` of "updated", "created", or "skipped". If skipped, a `reasons` array will also be included. The endpoint will also respond with a `seq` field which is an index that can be used to correlate the submitted records to the order of the response.

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

The [Sync Program Member Data](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/syncProgramMemberDataUsingPOST) endpoint is used to update program member field data for one or more members. You can modify any custom field, or standard fields that are "updateable" (see [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/describeProgramMemberUsingGET2) endpoint).

The required `programId` path parameter specifies the program containing members to update.

The required `input` parameter is an array. Each array element contains a `leadId` and one or more fields to update (using API name). An update operation is performed on each record. The leadId must be associated with a program member. The fields must be updateable. You can submit up to 300 leadIds per call.

The endpoint responds with a `status` of "updated" or "skipped". If skipped, a `reasons` array will also be included. The endpoint will also respond with a `seq` field which is an index that can be used to correlate the submitted records to the order of the response.

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

The program member object contains standard fields and optional custom fields. Standard fields are present in every Marketo Engage subscription whereas custom fields are created by the user as needed. Each field definition is composed of a set of attributes that describe the field. Examples of attributes are display name, API name, and dataType. These attributes are known collectively as metadata.

The following endpoints allow you to query, create, and update fields on the program member object. These APIs require that the owning API user have a role with one or both of the **Read-Write Schema Standard Field** or **Read-Write Schema Custom Field** permissions.

### Query Fields

Querying program member fields is straightforward. You may query a single program member field by API name or query the set of all program member fields. Both standard fields and custom fields can be retrieved, depending on the role permissions being used. Hidden fields are also retrieved.

#### By Name

The [Get Program Member Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/getProgramMemberFieldByNameUsingGET) endpoint retrieves metadata for a single field on the program member object. The required `fieldApiName` path parameter specifies the API name of the field. The response is like the Describe Program Member endpoint but contains additional metadata such as the `isCustom` attribute which denotes whether the field is a custom field.

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

The [Get Program Member Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/getProgramMemberFieldsUsingGET) endpoint retrieves metadata for all fields on the program member object. By default, a maximum of 300 records are returned. You can use the `batchSize` query parameter to reduce this number. If the `moreResult` attribute is true, this means more results are available. Continue to call this endpoint until the moreResult attribute returns false, which means there are no results available. The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

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

The [Create Program Member Fields](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/createProgramMemberFieldUsingPOST) endpoint creates one or more custom fields on the program member object. This endpoint provides functionality that is comparable to what is [available in the Marketo Engage UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/working-with-programs/program-member-custom-fields). You can create a maximum of up to 20 custom fields using this endpoint.

Carefully consider each field that you create in your production instance of Marketo Engage using the API. Once a field has been created, you cannot delete it ([you can only hide it](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/field-management/delete-a-custom-field-in-marketo)). Proliferation of unused fields is a bad practice that will add clutter to your instance.

The required `input` parameter is an array of program member field objects. Each object contains one or more attributes. Required attributes are the `displayName`, `name`, and `dataType` which correspond to the UI display name of the field, the API name of the field, and the field type respectively. Optionally you may specify `description`, `isHidden`, `isHtmlEncodingInEmail`,and `isSensitive`.

There are a few rules associated with `name` and `displayName` naming. The `name` attribute must be unique, start with a letter, and only contain letters, numbers, or underscore. The *`isplayName` must be unique, and cannot contain special characters. A common naming convention is to apply [camel case](https://en.wikipedia.org/wiki/Camel_case#) to `displayName` to produce `name`. For example, a `displayName` of "My Custom Field" would produce a `name` of "myCustomField".

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

The [Update Program Member Field](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/updateProgramMemberFieldUsingPOST) endpoint updates a single custom field on the program member object. Generally, field update operations performed using the Marketo Engage UI are achievable using the API. There are a few differences summarized in the table below.

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

The required `fieldApiName` path parameter specifies the API name of the field to update. The required `input` parameter is an array that contains a single lead field object. The field object contains one or more attributes.

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

The [Delete Program Members](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/deleteProgramMemberUsingPOST) endpoint is used to delete program member records. The required `programId` path parameter specifies the program containing members to delete. The request body contains an `input` array of lead ids. A maximum of 300 lead ids  per call are permitted.

The endpoint responds with a `status` of "deleted" or "skipped". If skipped, a `reasons` array will also be included. The endpoint will also respond with a `seq` field which is an index that can be used to correlate the submitted records to the order of the response.

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
