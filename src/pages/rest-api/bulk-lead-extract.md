---
title: Bulk Lead Extract
description: "Learn how to use Marketo Bulk Lead Extract REST APIs to bulk export leads with date, list, and smart list filters, custom fields, and CSV/TSV formats."
---

# Bulk Lead Extract

[Bulk Lead Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads)

The Bulk Lead Extract set of REST APIs provides a programmatic interface for retrieving large sets of lead/person records out of Marketo. Also, it can be used to retrieve leads incrementally based on the created date of the record, the most recent update, static list membership, or smart list membership. The recommended interface for use cases which require continuous interchange of data between Marketo and one or more external systems, for ETL, data warehousing, and archival purposes.

## Permissions

The Bulk Lead Extract APIs require that the owning API user have a role with one or both of the Read-Only Lead, or Read-Write Lead permissions.

## Filters

Leads support various filter options. Certain filters, including the `updatedAt`, `smartListName`, and `smartListId` require additional infrastructure components which have not yet been rolled out to all subscriptions. Only one filter type may be specified per export job.

| Filter Type | Data Type | Notes |
| --- | --- | --- |
| createdAt | Date Range | Accepts a JSON object with the members `startAt` and `endAt`. `startAt` accepts a datetime representing the low-watermark, and `endAt` accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Datetimes should be in an ISO-8601 format, without milliseconds. Jobs with this filter type return all accessible records which were created within the date range. |
| updatedAt* | Date Range | Accepts a JSON object with the members `startAt` and `endAt`. `startAt` accepts a datetime representing the low-watermark, and `endAt` accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Datetimes should be in an ISO-8601 format, without milliseconds. Note: This filter does not filter on the visible "updatedAt" field which only reflects updates to standard fields. It filters based on when the most recent field update was made to a lead recordJobs with this filter type returns all accessible records which were most recently updated within the date range. |
| staticListName | String | Accepts the name of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list names using the Get Lists endpoint. |
| staticListId | Integer | Accepts the id of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list ids using theGet Lists endpoint. |
| smartListName* | String | Accepts the name of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list names using theGet Smart Lists endpoint. |
| smartListId* | Integer | Accepts the id of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list ids using theGet Smart Lists endpoint. |

Filter type is unavailable for some subscriptions. If unavailable for your subscription, you receive an error when calling the Create Export Lead Job endpoint ("1035, Unsupported filter type for target subscription"). Customers may contact Marketo Support to have this functionality enabled in their subscription.

## Options

The Create Export Lead Job endpoint provides several formatting options, giving the user the ability to include particular fields within the exported file, the ability to rename column headers of these fields, and the format of the exported file.

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| fields | Array[String] | Yes | The fields parameter accepts a JSON array of strings. Each string must be the REST API name of a Marketo lead field. The listed fields are included in the exported file. The column header for each field will be the REST API name of each field, unless overridden with columnHeader. Note: When the Adobe Experience Cloud Audience Sharing feature is enabled, a cookie sync process occurs that associates Adobe Experience Cloud ID (ECID) with Marketo leads. You can specify the "ecids" field to include ECIDs in the export file. |
| columnHeaderNames | Object | No | A JSON object containing key-value pairs of field and column header names. The key must be the name of a field included in the export job. This is the API name of the field which can be retrieved by calling Describe Lead. The value is the name of the exported column header for that field. |
| format | String | No | Accepts one of: CSV, TSV, SSV. The exported file is rendered as a comma-separated values, tab-separated values, or space-separated values file, respectively if set. Defaults to CSV if unset. |

## Creating a Job

The parameters for the job are defined before kicking off the export using the [Create Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/createExportLeadsUsingPOST) endpoint. We must define the `fields` that are needed for export, the type of parameters of the `filter`, the `format` of the file, and the column header names, if any.

```http
POST /bulk/v1/leads/export/create.json
```

```json
{
   "fields": [
      "firstName",
      "lastName",
      "id",
      "email"
   ],
   "format": "CSV",
   "columnHeaderNames": {
      "firstName": "First Name",
      "lastName": "Last Name",
      "id": "Marketo Id",
      "email": "Email Address"
   },
   "filter": {
      "createdAt": {
         "startAt": "2017-01-01T00:00:00Z",
         "`endAt`": "2017-01-31T00:00:00Z"
      }
   }
}
```

This request will begin export a set of leads created between January 1, 2017, and January 31, 2017, including the values from the corresponding `firstName`, `lastName`, `id`, and `email` fields.

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

This returns a status response indicating that the job has been created. The job has been defined and created, but it hasn't yet been kicked off. To do so, the [Enqueue Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/enqueueExportLeadsUsingPOST) endpoint must be called using the exportId from the creation status response:

```http
POST /bulk/v1/leads/export/{exportId}/enqueue.json
```

```json
{
    "requestId": "147e4#16b24d9b913",
    "result": [
        {
            "exportId": "fad2cd1b-e822-4025-be1e-9caa9cf1d4b8",
            "format": "CSV",
            "status": "Queued",
            "createdAt": "2019-06-04T23:35:43Z",
            "queuedAt": "2019-06-04T23:36:17Z"
        }
    ],
    "success": true
}
```

This responds with a `status` of "Queued" after which it will be set to "Processing" when there is an available export slot.

## Polling Job Status

`Note:` Status can only be retrieved for jobs which were created by the same API user.

Since this is an asynchronous endpoint, after creating the job, we must poll its status to determine its progress. Poll using the [Get Export Lead Job Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/getExportLeadsStatusUsingGET) endpoint. The status is only updated once every 60 seconds, so a polling frequency lower than this is not advised, and in nearly all cases is still excessive. Let's take a quick look at polling.

```http
GET /bulk/v1/leads/export/{exportId}/status.json
```

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Processing",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "queuedAt": "2017-01-21T11:48:30-08:00",
         "format": "CSV"
      }
   ]
}
```

The status endpoint responds indicating that the job is still processing, so the file is not yet available for retrieval. Once the job status changes to "Completed" it  prepared for download.

The status field may respond with any one of:

- Created
- Queued
- Processing
- Canceled
- Completed
- Failed

## Retrieving Your Data

To retrieve the file of a completed lead export, simply call the [Get Export Lead File](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/getExportLeadsFileUsingGET) endpoint with your `exportId`.

```http
GET /bulk/v1/leads/export/{exportId}/file.json
```

The response contains a file formatted in the way that the job was configured. The endpoint responds with the contents of the file.

If a requested lead field is empty (contains no data), then `null` is placed in the corresponding field in the export file. In the example below, the email field for the returned lead is empty.

```csv
firstName,lastName,email,cookies
Russell,Wilson,null,_mch-localhost-1536605780000-12105
```

To support partial and resumption-friendly retrieval of extracted data, the file endpoint optionally supports the HTTP header Range of the type bytes. If the header is not set, the whole of the content is returned. Read more about using the Range header with Marketo [Bulk Extract](bulk-extract.md).

## Canceling a Job

If a job was configured incorrectly, or becomes unnecessary, it can be easily canceled using the [Cancel Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads/operation/cancelExportLeadsUsingPOST) endpoint:

```http
POST /bulk/v1/leads/export/{exportId}/cancel.json
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

This responds with a status indicating that the job has been canceled.
