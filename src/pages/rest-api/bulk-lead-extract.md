---
title: Bulk Lead Extract
description: "Learn how to use Marketo Bulk Lead Extract REST APIs to bulk export leads with date, list, and smart list filters, custom fields, and CSV/TSV formats."
---

# Bulk Lead Extract

[Bulk Lead Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads)

The Bulk Lead Extract REST APIs retrieve large sets of lead/person records from Marketo. You can also retrieve leads incrementally based on the record creation date, most recent update, static list membership, or smart list membership.

Use Bulk Lead Extract for continuous data exchange between Marketo and external systems, including ETL, data warehousing, and archival workflows.

## Permissions

The API user that owns the job must have a role with the Read-Only Lead permission, the Read-Write Lead permission, or both permissions.

## Filters

Lead export jobs support several filter types. Each export job can use only one filter type.

The `updatedAt`, `smartListName`, and `smartListId` filters require infrastructure that is not available in all subscriptions.

| Filter Type | Data Type | Notes |
| --- | --- | --- |
| createdAt | Date Range | A JSON object with `startAt` and `endAt` members. `startAt` is the low-watermark datetime, and `endAt` is the high-watermark datetime. Use ISO-8601 date and time values without milliseconds. The range must be 31 days or fewer. The job returns all accessible records created within the date range. |
| updatedAt* | Date Range | A JSON object with `startAt` and `endAt` members. `startAt` is the low-watermark datetime, and `endAt` is the high-watermark datetime. Use ISO-8601 date and time values without milliseconds. The range must be 31 days or fewer. This filter does not use the visible `updatedAt` field, which reflects updates to standard fields only. Instead, it uses the time of the most recent field update to a lead record. The job returns all accessible records most recently updated within the date range. |
| staticListName | String | The name of a static list. The job returns all accessible records that are members of the static list when the job begins processing. Retrieve static list names by using the Get Lists endpoint. |
| staticListId | Integer | The ID of a static list. The job returns all accessible records that are members of the static list when the job begins processing. Retrieve static list IDs by using the Get Lists endpoint. |
| smartListName* | String | The name of a smart list. The job returns all accessible records that are members of the smart list when the job begins processing. Retrieve smart list names by using the Get Smart Lists endpoint. |
| smartListId* | Integer | The ID of a smart list. The job returns all accessible records that are members of the smart list when the job begins processing. Retrieve smart list IDs by using the Get Smart Lists endpoint. |

The filter types marked with an asterisk are unavailable for some subscriptions. If a filter type is unavailable for your subscription, the Create Export Lead Job endpoint returns the error "1035, Unsupported filter type for target subscription". Contact Marketo Support to enable this functionality for your subscription.

## Options

The Create Export Lead Job endpoint provides options to select exported fields, rename column headers, and set the file format.

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| fields | Array[String] | Yes | A JSON array of strings. Each string must be the REST API name of a Marketo lead field. The export includes each listed field and uses its REST API name as the column header unless `columnHeaderNames` overrides it. When the Adobe Experience Cloud Audience Sharing feature is enabled, a cookie sync process associates the Adobe Experience Cloud ID (ECID) with Marketo leads. Specify the `ecids` field to include ECIDs in the export file. |
| columnHeaderNames | Object | No | A JSON object of field and column-header key-value pairs. Each key must be the API name of a field included in the export job. Retrieve the API name by calling Describe Lead. Each value is the exported column header for that field. |
| format | String | No | The export file format: CSV for comma-separated values, TSV for tab-separated values, or SSV for space-separated values. The default is CSV. |

## Creating a Job

Use the [Create Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportLeadsUsingPOST) endpoint to define an export job. Specify the `fields` to export, one `filter` type and its parameters, the file `format`, and any custom column header names.

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
         "endAt": "2017-01-31T00:00:00Z"
      }
   }
}
```

This request creates an export job for leads created between January 1, 2017, and January 31, 2017. The export includes values from the `firstName`, `lastName`, `id`, and `email` fields.

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

The response confirms that the job is created but not started. To start the job, call the [Enqueue Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/enqueueExportLeadsUsingPOST) endpoint with the `exportId` from the creation response.

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

The enqueue response has a `status` of "Queued". When an export slot becomes available, the status changes to "Processing".

## Polling Job Status

You can retrieve status only for jobs created by the same API user.

Lead export jobs run asynchronously. Poll the [Get Export Lead Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsStatusUsingGET) endpoint to track the job's progress.

The status updates only once every 60 seconds. Do not poll more frequently; in nearly all cases, that interval is still excessive.

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

This response shows that the job is still processing, so the file is not available. When the job status changes to "Completed", the file is ready to download.

The `status` field can return any of the following values:

- Created
- Queued
- Processing
- Canceled
- Completed
- Failed

## Retrieving Your Data

To retrieve a completed lead export, call the [Get Export Lead File](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsFileUsingGET) endpoint with the `exportId`.

```http
GET /bulk/v1/leads/export/{exportId}/file.json
```

The response body contains the file in the format configured for the job.

If a requested lead field contains no data, the corresponding field in the export file contains `null`. In the following example, the returned lead has an empty email field.

```csv
firstName,lastName,email,cookies
Russell,Wilson,null,_mch-localhost-1536605780000-12105
```

For partial or resumable retrieval, the file endpoint supports the optional HTTP `Range` header with the `bytes` type. If you do not set the header, the endpoint returns all content. Learn more about using the `Range` header with Marketo [Bulk Extract](bulk-extract.md).

## Canceling a Job

To cancel an incorrectly configured or unnecessary job, call the [Cancel Export Lead Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/cancelExportLeadsUsingPOST) endpoint.

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

The response confirms that the job is canceled.
