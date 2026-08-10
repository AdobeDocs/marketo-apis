---
title: Bulk Program Member Extract
description: "Use Marketo Bulk Program Member Extract REST APIs to export large member records for ETL, data warehousing, and archiving, with permissions and field metadata."
---

# Bulk Program Member Extract

[Bulk Program Member Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members)

The Bulk Program Member Extract REST APIs retrieve large sets of program member records from Marketo. Use these APIs for continuous data exchange between Marketo and external systems, ETL, data warehousing, and archiving.

## Permissions

The API user must have a role with the Read-Only Lead permission, the Read-Write Lead permission, or both.

## Describe

Use [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET2) to determine which fields are available and retrieve their metadata. The `name` attribute contains the REST API field name.

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

## Filters

Program member exports support multiple filter options. When a job specifies multiple filter types, the API combines them with an AND operation.

Every job must specify either `programId` or `programIds`. All other filters are optional. The `updatedAt` filter requires infrastructure that is not available in all subscriptions.

table
  tbody
    tr
      tdFilter Type/td
      tdData Type/td
      tdNotes/td
    /tr
    tr
      tdprogramId/td
      tdInteger/td
      tdAccepts the id of a program. Jobs return all accessible records which are members of the program at the time that the job begins processing.Retrieve program ids using the [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs) endpoint.Cannot be used with programIds filter./td
    /tr
    tr
      tdprogramIds/td
      tdArray[Integer]/td
      tdAccepts an array of up to 10 program ids. Jobs return all accessible records which are members of the programs at the time that the job begins processing.An additional field "programId" is added to the export file as the first field. This field identifies the program that a program membership record was extracted from.Retrieve program ids using the [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs) endpoint.Cannot be used with programId filter./td
    /tr
    tr
      tdisExhausted/td
      tdBoolean/td
      tdAccepts a boolean used to filter program membership records for [people who have exhausted content](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/drip-nurturing/using-engagement-programs/people-who-have-exhausted-content)./td
    /tr
    tr
      tdnurtureCadence/td
      tdString/td
      tdAccepts a string used to filter program membership records for a given nurture cadence.Permissible values are:
        ul
          lipause - cadence is paused/li
          linorm - cadence is normal/li
        /ul/td
    /tr
    tr
      tdstatusNames/td
      tdArray[String]/td
      tdAccepts an array of program member status names. Multiple status names are ORed together.Jobs with this filter type return all accessible records whose program member status matches any of the specified status names. Both default and user-defined status names may be used.If the statusNames filter is used with `programIds` filter, then each program is checked for membership records whose status matches any of the status names. If a status name is not found in any of the programs, "1003, Invalid Data" error is returned.
        table
          tbody
            tr
              tdAttended/td
              tdAttended On-demand/td
              tdBounced/td
            /tr
            tr
              tdClicked/td
              tdContacted/td
              tdConverted/td
            /tr
            tr
              tdEngaged/td
              tdFilled-out Form/td
              tdInfluenced/td
            /tr
            tr
              tdInvited/td
              tdMember/td
              tdNo Show/td
            /tr
            tr
              tdNot in Program/td
              tdOn List/td
              tdOpened/td
            /tr
            tr
              tdRegistered/td
              tdRegistering/td
              tdRegistration Error/td
            /tr
            tr
              tdSent/td
              tdSubscribed/td
              tdUnsubscribed/td
            /tr
            tr
              tdViewed/td
              tdVisited/td
              tdVisited Booth/td
            /tr
            tr
              tdWaitlisted/td
              tdWeb Content/td
              td/td
            /tr
          /tbody
        /table/td
    /tr
    tr
      tdupdatedAt*/td
      tdDate Range/td
      tdAccepts a JSON object with the members startAt and endAt. startAt accepts a datetime representing the low-watermark, and endAt accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Datetimes should be in an ISO-8601 format, without milliseconds.Jobs with this filter type return all accessible records which were most recently updated within the date range./td
    /tr
  /tbody
/table

Some subscriptions do not support this filter type. If it is unavailable, the Create Export Program Member Job endpoint returns `1035, Unsupported filter type for target subscription`. Contact Marketo Support to request this functionality for your subscription.

## Options

The Create Export Program Member Job endpoint provides options to:

- Specify the fields to include in the export file.
- Rename the exported column headers.
- Specify the export file format.

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| fields | Array[String] | Yes | The fields parameter accepts a JSON array of strings. The listed fields are included in the exported file. The following field types can be exported:`LeadCustom` `LeadProgram` MemberCustom `ProgramMember`. Specify a field using it is REST API name which can be retrieved using Describe Lead2 and/or Describe Program Member endpoints. |
| columnHeaderNames | Object | No | A JSON object containing key-value pairs of field and column header names. The key must be the name of a field included in the export job. The value is the name of the exported column header for that field. |
| format | String | No | Accepts one of: CSV, TSV, SSV. The exported file is rendered as a comma-separated values, tab-separated values, or space-separated values file, respectively if set. Defaults to CSV if unset. |

## Creating a Job

Use the [Create Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportProgramMembersUsingPOST) endpoint to define the export job. Specify a `filter` that contains the program ID and the `fields` to export. You can also specify `format` and `columnHeaderNames`.

```http
POST /bulk/v1/program/members/export/create.json
```

```json
{
   "format": "CSV",
   "fields": [
        "firstName",
        "lastName",
        "email",
        "membershipDate",
        "program",
        "statusName",
        "leadId",
        "reachedSuccess",
        "leadCustomField01",
        "leadCustomField02",
        "pMCustomField01",
        "pMCustomField02"
   ],
   "filter": {
      "programId":1044
   }
}
```

```json
{
    "requestId": "4d44#16f92734f6e",
    "result": [
        {
            "exportId": "b5ca52a9-5ecb-4966-b5a9-11659a8b4c2b",
            "format": "CSV",
            "status": "Created",
            "createdAt": "2020-01-11T02:33:48Z"
        }
    ],
    "success": true
}
```

The response confirms that the job is created, but the export does not start automatically. Pass the returned `exportId` to the [Enqueue Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/enqueueExportProgramMembersUsingPOST) endpoint to start the job:

```http
POST /bulk/v1/program/members/export/{exportId}/enqueue.json
```

```json
{
    "requestId": "d70b#16f9273ae32",
    "result": [
        {
            "exportId": "b5ca52a9-5ecb-4966-b5a9-11659a8b4c2b",
            "format": "CSV",
            "status": "Queued",
            "createdAt": "2020-01-11T02:33:48Z",
            "queuedAt": "2020-01-11T02:34:13Z"
        }
    ],
    "success": true
}
```

The enqueue response initially returns a `Queued` status. When an export slot becomes available, the status changes to `Processing`.

## Polling Job Status

You can retrieve the status only for jobs created by the same API user.

Because the export runs asynchronously, use the [Get Export Program Member Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsStatusUsingGET) endpoint to poll its progress. The status updates only once every 60 seconds, so do not poll more frequently.

The status can be `Created`, `Queued`, `Processing`, `Canceled`, `Completed`, or `Failed`.

```http
GET /bulk/v1/program/members/export/{exportId}/status.json
```

```json
{
    "requestId": "9a40#16f9274d250",
    "result": [
        {
            "exportId": "b5ca52a9-5ecb-4966-b5a9-11659a8b4c2b",
            "format": "CSV",
            "status": "Processing",
            "createdAt": "2020-01-11T02:33:48Z",
            "queuedAt": "2020-01-11T02:34:13Z",
            "startedAt": "2020-01-11T02:35:19Z"
        }
    ],
    "success": true
}
```

This response shows that the job is still processing, so the file is not available. When the job status changes to `Completed`, the file is ready to download.

```json
{
    "requestId": "11ad1#16f9ff6da23",
    "result": [
        {
            "exportId": "1118dc83-273b-4d44-becb-4d212fece550",
            "format": "CSV",
            "status": "Completed",
            "createdAt": "2020-01-11T02:33:48Z",
            "queuedAt": "2020-01-11T02:34:13Z",
            "startedAt": "2020-01-11T02:35:19Z"
            "finishedAt": "2020-01-11T02:36:12Z",
            "numberOfRecords": 13,
            "fileSize": 1752,
            "fileChecksum": "sha256:b3c8e70e6e501cf1025e345a66b409d4fd07364c7da773cfa68a2b68ce1a7212"
        }
    ],
    "success": true
}
```

## Retrieving Your Data

To retrieve a completed program member export, pass the `exportId` to the [Get Export Program Member File](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportProgramMembersFileUsingGET) endpoint.

The endpoint returns the file in the format configured for the job. If a requested program member field contains no data, the corresponding export field contains `null`.

```http
GET /bulk/v1/program/members/export/{exportId}/file.json
```

```text
firstName,lastName,email,Member Date,Program,Status,Lead Id,Success,leadCustomField01,leadCustomField02,pMCustomField01,pMCustomField02
Meera,Reed,mree@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1789,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Jon,Umber,jumb@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1790,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Lyanna,Mormont,lmor@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1791,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Rickon,Stark,rsta@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1792,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Hodor,null,hodor@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1793,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Osha,null,osha@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1794,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Jojen,Reed,Jree@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1795,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Rickard,Karstark,rkar@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1796,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Maester,Luwin,mluw@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1797,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Rodrik,Cassel,rcas@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1798,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Jory,Cassel,jcas@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1799,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
Septa,Mordane,smor@housestark.com,2020-01-08T18:10:26Z,PMCF Program,On List,1800,false,Lead01_Value,Lead02_Value,PM01_Value,PM02_Value
```

For partial or resumable retrieval, the file endpoint supports the optional HTTP `Range` header with a range type of `bytes`. If you do not set the header, the endpoint returns the entire file. For more information, see [Bulk Extract](bulk-extract.md).

## Canceling a Job

To cancel a job that is configured incorrectly or is no longer needed, call the [Cancel Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/cancelExportProgramMembersUsingPOST) endpoint:

```http
POST /bulk/v1/program/members/export/{exportId}/cancel.json
```

```json
{
    "requestId": "bb4f#16f86727f89",
    "result": [
        {
            "exportId": "f0d3520c-3a60-4568-9e71-2e619d3805a4",
            "format": "CSV",
            "status": "Cancelled",
            "createdAt": "2020-01-07T21:47:35Z"
        }
    ],
    "success": true
}
```

The response status indicates that the job is canceled.
