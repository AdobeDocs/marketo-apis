---
title: Bulk Activity Extract
description: "Marketo Bulk Activity Extract REST API to export high-volume activity data using a 31-day date range, activity and primary attribute filters for ETL and CRM."
---

# Bulk Activity Extract

[Bulk Activity Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi)

The Bulk Activity Extract REST APIs retrieve large volumes of activity data from Marketo. Use these APIs for processes that do not require low latency, such as CRM integration, ETL, data warehousing, and data archiving.

## Permissions

The API user must have the "Read-Only Activity" or "Read-Write Activity" permission.

## Filters

| Filter Type | Data Type | Required | Notes |
| --- | --- | --- | --- |
| `createdAt` | Date Range | Yes | A JSON object that contains `startAt` and `endAt`. `startAt` is the low-watermark datetime, and `endAt` is the high-watermark datetime. The range must be 31 days or fewer. The job returns all accessible records created within the date range. Use ISO-8601 datetime values without milliseconds. |
| `activityTypeIds` | Array\[Integer\] | No | An array of integers for the requested activity types. The "Delete Lead" activity is not supported. Instead, use the [Get Deleted Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/getDeletedLeadsUsingGET) endpoint. Retrieve activity type ids with the [Get Activity Types endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/getAllActivityTypesUsingGET). |
| [`primaryAttributeValueIds`](#primaryattributevalueids-options) | Array\[Integer\] | No | An array that accepts a maximum of 50 ids for primary attributes. Each id uniquely identifies a lead field or asset. Retrieve ids by calling the appropriate REST API endpoint. For example, to filter on a specific Form for the "Fill Out Form" activity, pass the Form name to the [Get Form by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByNameUsingGET) endpoint to retrieve the Form Id. See [primaryAttributeValueIds options](#primaryattributevalueids-options) for supported activity types. |
| [`primaryAttributeValues`](#primaryattributevalues-options) | Array\[String\] | No | An array that accepts a maximum of 50 names for primary attributes. Each name uniquely identifies a lead field or asset. Retrieve names by calling the appropriate REST API endpoint. For example, to filter on a specific Form for the "Fill Out Form" activity, pass the Form Id to [Get Form by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByIdUsingGET) endpoint to retrieve the Form name. See [primaryAttributeValues options](#primaryattributevalues-options) for supported activity types. |

### primaryAttributeValueIds options \{#primaryattributevalueids-options}

| Activity Type | Primary Attribute Value Id | Retrieval Endpoint | Asset Group |
| --- | --- | --- | --- |
| Change Data Value | Lead field id | [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) | Attribute Name |
| Change Score | Lead field id | [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) | Attribute Name |
| Change Status in Progression | Program id | [Get Program by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByNameUsingGET) | Marketing Program |
| Add to List | Static list id | [Get Static List by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByNameUsingGET) | Static List |
| Remove from List | Static list id | [Get Static List by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByNameUsingGET) | Static List |
| Fill Out Form | Form id | [Get Form by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByNameUsingGET) | Web Form |

When you use `primaryAttributeValueIds`, you must also include the `activityTypeIds` filter. This filter can contain only activity ids that match the corresponding asset group. For example, when filtering Web Form assets, `activityTypeIds` can contain only the "Fill Out Form" activity type id.

The following request includes the `primaryAttributeValueIds` filter:

```json
{
  "filter": {
    "createdAt": {
      "startAt": "2021-07-01T23:59:59-00:00",
      "endAt": "2021-07-02T23:59:59-00:00"
    },
    "activityTypeIds": [
      2
    ],
    "primaryAttributeValueIds": [
      16,102,95,8
    ]
  }
}
```

`primaryAttributeValueIds` and `primaryAttributeValues` cannot be used together.

### primaryAttributeValues options \{#primaryattributevalues-options}

| Activity Type | Primary Attribute Value | Retrieval Endpoint | Asset Group |
| --- | --- | --- | --- |
| Change Data Value | Lead field displayName | [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) | Attribute Name |
| Change Score | Lead field displayName | [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) | Attribute Name |
| Change Status in Progression | Program name | [Get Program by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByIdUsingGET) | Marketing Program |
| Add to List | Static list name | [Get Static List by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByIdUsingGET) | Static List |
| Remove from List | Static list name | [Get Static List by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByIdUsingGET) | Static List |
| Fill Out Form | Form name | [Get Form by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByIdUsingGET) | Web Form |

Use `&lt;program&gt;.&lt;asset&gt;` notation to specify names for the Marketing Program, Static List, and Web Form asset groups. For example, specify the "MPS Outbound" form in the "GL_OP_ALL_2021" program as "GL_OP_ALL_2021.MPS Outbound".

The following request includes the `primaryAttributeValues` filter:

```json
{
  "filter": {
    "createdAt": {
      "startAt": "2021-07-01T23:59:59-00:00",
      "endAt": "2021-07-02T23:59:59-00:00"
    },
    "activityTypeIds": [
      2
    ],
    "primaryAttributeValues": [
      "GL_OP_ALL_2021.MPS Outbound"
    ]
  }
}
```

When you use `primaryAttributeValues`, you must also include the `activityTypeIds` filter. This filter can contain only activity ids that match the corresponding asset group. For example, when filtering Web Form assets, `activityTypeIds` can contain only the "Fill Out Form" activity type id.

`primaryAttributeValues` and `primaryAttributeValueIds` cannot be used together.

## Options

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| `filter` | Object | Yes | An object containing filters that apply to the accessible activity set. Include exactly one `createdAt` filter. You can also include an `activityTypeIds` filter. The export job returns the resulting set of activities. |
| `format` | String | No | The export file format: CSV, TSV, or SSV. These values produce comma-separated, tab-separated, or space-separated values, respectively. The default is CSV. |
| `columnHeaderNames` | Object | No | A JSON object of field and column-header key-value pairs. Each key must name a field included in the export job. Its value sets the exported column header for that field. |
| `fields` | Array\[String\] | No | An array of fields to include in the export file. By default, the response includes `marketoGUID`, `leadId`, `activityDate`, `activityTypeId`, `campaignId`, `primaryAttributeValueId`, `primaryAttributeValue`, and `attributes`. To return a subset, specify fields from this list, such as `"fields": ["leadId", "activityDate", "activityTypeId"]`. You can also specify `actionResult` to include the activity action: `("succeeded", "skipped", or "failed")`. |

## Creating a Job

Create an export job to define the records to retrieve. Use the [Create Export Activity Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportActivitiesUsingPOST) endpoint.

Every job requires a `createdAt` filter. Its `startAt` and `endAt` datetime parameters define the earliest and latest permitted activity creation dates. To exclude activity types that are not relevant, also include the optional `activityTypeIds` filter.

The following request creates a CSV export job for selected activity types within a date range:

```http
POST /bulk/v1/activities/export/create.json
```

```json
{
   "format": "CSV",
   "filter": {
      "createdAt": {
         "startAt": "2017-07-01T23:59:59-00:00",
         "endAt": "2017-07-31T23:59:59-00:00"
      },
      "activityTypeIds": [
         1,
         12,
         13
      ]
   }
}
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Created",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "queuedAt": "2017-01-21T11:48:30-08:00",
         "format": "CSV"
      }
   ]
}
```

The response returns an `exportId` and a status of "Created." A created job is not yet in the processing queue.

To add the job to the queue, call the [Enqueue Export Activity Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/enqueueExportActivitiesUsingPOST) endpoint with the `exportId` from the creation response.

```http
POST /bulk/v1/activities/export/{exportId}/enqueue.json
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Queued",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "queuedAt": "2017-01-21T11:48:30-08:00",
         "format": "CSV"
      }
   ]
}
```

The response status is now "Queued." When a worker becomes available, the status changes to "Processing," and the job begins aggregating records from Marketo.

## Polling Job Status

Job status can only be retrieved for jobs created by the same API user.

Bulk Activity Extract processes jobs asynchronously. Poll the [Get Export Activity Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportActivitiesStatusUsingGET) endpoint to determine when a job is complete:

```http
GET /bulk/v1/activities/export/{exportId}/status.json
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Completed",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "queuedAt": "2017-01-21T11:48:30-08:00",
         "startedAt": "2017-01-21T11:51:30-08:00",
         "finishedAt": "2017-01-21T12:59:30-08:00",
         "format": "CSV",
         "numberOfRecords": 15423,
         "fileSize": 12342,
         "fileChecksum": "sha256:c16514c7e80fcac5ea055dacae9617fc3c29aff5365e3743071313ce0ed2a815"
      }
   ]
}
```

The `status` field returns one of the following values:

- `Created`
- `Queued`
- `Processing`
- `Canceled`
- `Completed`
- `Failed`

## Retrieving Your Data

When the job status is "Completed," retrieve the exported data with the [Get Export Activity File](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportActivitiesFileUsingGET) endpoint:

```http
GET /bulk/v1/activities/export/{exportId}/file.json
```

The response body contains the file in the format configured for the job.

If a requested activity field contains no data, `null` appears in the corresponding export-file field. The following example shows exported activity data:

```json
marketoGUID,leadId,activityDate,activityTypeId,campaignId,primaryAttributeValueId,primaryAttributeValue,attributes
783957693,5414087,2022-02-13T14:06:20Z,104,8497,1670,MembershipTest1,"{""Reason"":""Changed by Smart Campaign MembershipTestCampaignStepChoice.MembershipTestCampaignStepChoiceSetUp action Change Data Value"",""Program Member ID"":3240303,""Acquired By"":true,""Old Status"":""Not in Program"",""New Status ID"":21,""Success"":false,""New Status"":""On List"",""Old Status ID"":20}"
783958220,5414094,2022-02-13T14:08:50Z,104,17240,3569,SuccessWebCPS,"{""Program Member ID"":3240305,""Acquired By"":false,""Old Status"":""Not in Program"",""New Status ID"":6,""Success"":true,""New Status"":""Attended"",""Old Status ID"":1}"
783958306,5414094,2022-02-13T14:09:16Z,104,17240,3569,SuccessWebCPS,"{""Program Member ID"":3240305,""Acquired By"":false,""Old Status"":""Attended"",""New Status ID"":6,""Success"":false,""New Status"":""Attended"",""Old Status ID"":6}"
783961924,5316669,2022-02-13T14:27:21Z,104,11614,2333,Nurture Automation,"{""Program Member ID"":3240306,""Acquired By"":false,""Old Status"":""Not in Program"",""New Status ID"":27,""Success"":false,""New Status"":""Member"",""Old Status ID"":26}"
```

For partial or resumable retrieval, the file endpoint supports the optional HTTP `Range` header with a `bytes` range. If you omit this header, the endpoint returns the entire file. For more information about using the `Range` header, see [Bulk Extract](bulk-extract.md).

## Canceling a Job

To stop an incorrectly configured or unnecessary job, call the [Cancel Export Activity Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/cancelExportActivitiesUsingPOST) endpoint:

```http
POST /bulk/v1/activities/export/{exportId}/cancel.json
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Cancelled",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "format": "CSV"
      }
   ]
}
```

The response status indicates that the job is canceled.
