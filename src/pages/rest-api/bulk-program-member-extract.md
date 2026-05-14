---
title: Bulk Program Member Extract
description: "Use Marketo Bulk Program Member Extract REST APIs to export large member records for ETL, data warehousing, and archiving, with permissions and field metadata."
---

# Bulk Program Member Extract

[Bulk Program Member Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members)

The Bulk Program Member Extract set of REST APIs provides a programmatic interface for retrieving large sets of program member records out of Marketo. This is the recommended interface for use cases which require continuous interchange of data between Marketo and one or more external systems, for ETL, data warehousing, and archival purposes.

## Permissions

The Bulk Program Member Extract APIs require that the owning API user have a role with one or both of the Read-Only Lead, or Read-Write Lead permissions.

## Describe

[Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Program-Members/operation/describeProgramMemberUsingGET2) is the primary source of truth for whether fields are available for use, and metadata about those fields. The `name` attribute contains the REST API name.

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

Program Members support various filter options. Multiple filter types can be specified for a job, in which case they are ANDed together. You must specify either the `programId` or the `programIds` filter. All other filters are optional. The `updatedAt` filter requires additional infrastructure components which have not yet been rolled out to all subscriptions.

<table>
  <tbody>
    <tr>
      <td>Filter Type</td>
      <td>Data Type</td>
      <td>Notes</td>
    </tr>
    <tr>
      <td>programId</td>
      <td>Integer</td>
      <td>Accepts the id of a program. Jobs return all accessible records which are members of the program at the time that the job begins processing.Retrieve program ids using the <a href="https://developer.adobe.com/marketo-apis/api/asset#tag/Programs">Get Programs</a> endpoint.Cannot be used with programIds filter.</td>
    </tr>
    <tr>
      <td>programIds</td>
      <td>Array[Integer]</td>
      <td>Accepts an array of up to 10 program ids. Jobs return all accessible records which are members of the programs at the time that the job begins processing.An additional field "programId" is added to the export file as the first field. This field identifies the program that a program membership record was extracted from.Retrieve program ids using the <a href="https://developer.adobe.com/marketo-apis/api/asset#tag/Programs">Get Programs</a> endpoint.Cannot be used with programId filter.</td>
    </tr>
    <tr>
      <td>isExhausted</td>
      <td>Boolean</td>
      <td>Accepts a boolean used to filter program membership records for <a href="https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/drip-nurturing/using-engagement-programs/people-who-have-exhausted-content">people who have exhausted content</a>.</td>
    </tr>
    <tr>
      <td>nurtureCadence</td>
      <td>String</td>
      <td>Accepts a string used to filter program membership records for a given nurture cadence.Permissible values are:
        <ul>
          <li>pause - cadence is paused</li>
          <li>norm - cadence is normal</li>
        </ul></td>
    </tr>
    <tr>
      <td>statusNames</td>
      <td>Array[String]</td>
      <td>Accepts an array of program member status names. Multiple status names are ORed together.Jobs with this filter type return all accessible records whose program member status matches any of the specified status names. Both default and user-defined status names may be used.If the statusNames filter is used with `programIds` filter, then each program is checked for membership records whose status matches any of the status names. If a status name is not found in any of the programs, "1003, Invalid Data" error is returned.
        <table>
          <tbody>
            <tr>
              <td>Attended</td>
              <td>Attended On-demand</td>
              <td>Bounced</td>
            </tr>
            <tr>
              <td>Clicked</td>
              <td>Contacted</td>
              <td>Converted</td>
            </tr>
            <tr>
              <td>Engaged</td>
              <td>Filled-out Form</td>
              <td>Influenced</td>
            </tr>
            <tr>
              <td>Invited</td>
              <td>Member</td>
              <td>No Show</td>
            </tr>
            <tr>
              <td>Not in Program</td>
              <td>On List</td>
              <td>Opened</td>
            </tr>
            <tr>
              <td>Registered</td>
              <td>Registering</td>
              <td>Registration Error</td>
            </tr>
            <tr>
              <td>Sent</td>
              <td>Subscribed</td>
              <td>Unsubscribed</td>
            </tr>
            <tr>
              <td>Viewed</td>
              <td>Visited</td>
              <td>Visited Booth</td>
            </tr>
            <tr>
              <td>Waitlisted</td>
              <td>Web Content</td>
              <td></td>
            </tr>
          </tbody>
        </table></td>
    </tr>
    <tr>
      <td>updatedAt*</td>
      <td>Date Range</td>
      <td>Accepts a JSON object with the members startAt and endAt. startAt accepts a datetime representing the low-watermark, and endAt accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Datetimes should be in an ISO-8601 format, without milliseconds.Jobs with this filter type return all accessible records which were most recently updated within the date range.</td>
    </tr>
  </tbody>
</table>

Filter type is unavailable for some subscriptions. If unavailable for your subscription, you receive an error when calling the Create Export Program Member Job endpoint ("1035, Unsupported filter type for target subscription"). Customers may contact Marketo Support to have this functionality enabled in their subscription.

## Options

The Create Export Program Member Job endpoint provides several formatting options. These options give the user the ability to:

- Specify the fields to include within the exported file
- Rename column headers of these fields
- Specify the format of the exported file

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| fields | Array[String] | Yes | The fields parameter accepts a JSON array of strings. The listed fields are included in the exported file. The following field types can be exported:`LeadCustom` `LeadProgram` MemberCustom `ProgramMember`. Specify a field using it is REST API name which can be retrieved using Describe Lead2 and/or Describe Program Member endpoints. |
| columnHeaderNames | Object | No | A JSON object containing key-value pairs of field and column header names. The key must be the name of a field included in the export job. The value is the name of the exported column header for that field. |
| format | String | No | Accepts one of: CSV, TSV, SSV. The exported file is rendered as a comma-separated values, tab-separated values, or space-separated values file, respectively if set. Defaults to CSV if unset. |

## Creating a Job

The parameters for the job are defined before kicking off the export using the [Create Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members/operation/createExportProgramMembersUsingPOST) endpoint. We must define the `filter` containing the program id, and the `fields` that are needed for export. Optionally we can define the `format` of the file, and the `columnHeaderNames`.

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

This returns a status response indicating that the job has been created. The job has been defined and created, but it hasn't yet been kicked off. To do so, the [Enqueue Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members/operation/enqueueExportProgramMembersUsingPOST) endpoint must be called using the `exportId` from the creation status response:

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

This will respond with an initial `status` of "Queued" after which it will be set to "Processing" when there is an available export slot.

## Polling Job Status

Note: Status can only be retrieved for jobs which were created by the same API user.

Since this is an asynchronous endpoint, after creating the job we must poll its status to determine its progress. Poll using the [Get Export Program Member Job Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/getExportLeadsStatusUsingGET) endpoint. The status is only updated once every 60 seconds, so a polling frequency lower than this is not advised, and in nearly all cases is still excessive. The status field may respond with any one of: Created, Queued, Processing, Canceled, Completed, Failed.

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

The status endpoint responds indicating that the job is still processing, so the file is not yet available for retrieval. Once the job `status` changes to "Completed" it is available for download.

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

To retrieve the file of a completed program member export, simply call the [Get Export Program Member File](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members/operation/getExportProgramMembersFileUsingGET) endpoint with your `exportId`.

The response contains a file formatted in the way that the job was configured. The endpoint responds with the contents of the file. If a requested program member field is empty (contains no data), then `null` is placed in the corresponding field in the export file.

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

To support partial and resumption-friendly retrieval of extracted data, the file endpoint optionally supports the HTTP header Range of the type bytes. If the header is not set, the whole of the contents will be returned. You can read more about using the Range header with Marketo [Bulk Extract](bulk-extract.md).

## Canceling a Job

If a job was configured incorrectly, or becomes unnecessary, it can be easily canceled using the [Cancel Export Program Member Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Program-Members/operation/cancelExportProgramMembersUsingPOST) endpoint:

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

This responds with a `status` indicating that the job has been canceled.
