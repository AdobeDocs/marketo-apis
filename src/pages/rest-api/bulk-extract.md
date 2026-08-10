---
title: Bulk Extract
description: "Learn how to use Marketo Bulk Extract REST API to export leads, activities, program members, and custom objects, with OAuth, job queues, and 500MB daily limits."
---

# Bulk Extract

Marketo Bulk Extract provides interfaces for retrieving large sets of person and person-related data. Interfaces are currently available for four object types:

- Leads (Persons)
- Activities
- Program Members
- Custom Objects

To perform a bulk extract:

1. Create a job and define the data to retrieve.
1. Enqueue the job.
1. Wait for the job to finish writing the file.
1. Retrieve the file over HTTP.

Bulk extract jobs run asynchronously. Poll the job to retrieve the export status.

`Note:` Bulk API endpoints are not prefixed with '/rest' like other endpoints.

## Authentication

The bulk extract APIs use the same OAuth 2.0 authentication method as other Marketo REST APIs. Send a valid access token in the `Authorization: Bearer {_AccessToken_}` HTTP header.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the **access_token** query parameter is being removed on August 31, 2026. If your project uses a query parameter to pass the access token, it should be updated to use the **Authorization** header as soon as possible. New development should use the **Authorization** header exclusively.

## Limits

- Maximum concurrent export jobs: 2
- Maximum queued export jobs, including jobs that are currently exporting: 10
- File retention period: seven days
- Default daily export allocation: 500MB. The allocation resets daily at 12:00AM CST. Increases are available for purchase.
- Maximum time span for the date range filter (`createdAt` or `updatedAt`): 31 days

Bulk Lead Extract filters for UpdatedAt and Smart List are unavailable for some subscription types. If these filters are unavailable, the Create Export Lead Job endpoint returns the error "1035, Unsupported filter type for target subscription". Contact Marketo Support to enable this functionality for your subscription.

### Queue

The bulk extract APIs use one job queue that is shared between leads, activities, program members, and custom objects. First, call a Create Export Lead/Activity/Program Member Job endpoint to create an extract job. Then, call the corresponding Enqueue Export Lead/Activity/Program Member Job endpoint to enqueue the job. The job starts when computing resources become available.

The queue can contain a maximum of 10 jobs. If you try to enqueue a job when the queue is full, the Enqueue Export Job endpoint returns the error "1029, Too many jobs in queue". A maximum of two jobs can have a status of "Processing" and run concurrently.

### File Size

The bulk extract APIs are metered based on the on-disk size of the data that a bulk extract job retrieves. To determine the file size in bytes, read the `fileSize` attribute in the completed status response for an export job.

The daily quota is 500MB and is shared between leads, activities, program members, and custom objects. When you exceed the quota, you cannot create or enqueue another job until the quota resets at midnight [Central Time](https://en.wikipedia.org/wiki/Central_Time_Zone). Until the reset, the API returns the error "1029, Export daily quota exceeded". Aside from the daily quota, there is no maximum file size.

After a job is queued or processing, it runs to completion unless an error occurs or you cancel the job. If a job fails, you must recreate it.

The API writes the complete file only when the job reaches the completed state. It does not write partial files. To verify the file, compute its SHA-256 hash and compare it with the checksum that the job status endpoint returns.

To determine the total disk space used for the current day, call a Get Export Lead/Activity/Program Member Jobs endpoint. These endpoints return all jobs from the past seven days.

Filter the list to jobs that completed during the current day by using the `status` and `finishedAt` attributes. Then, add the file sizes for those jobs. You cannot delete a file to reclaim disk space.

## Permissions

Bulk Extract uses the same permissions model as the Marketo REST API. It does not require additional special permissions, but each set of endpoints requires specific permissions.

Only the API user who created a Bulk Extract job can access it, poll its status, or retrieve its file contents.

Bulk Extract endpoints are not aware of Marketo workspaces. Extraction requests include data from all workspaces, regardless of how you define the API Only User for your Custom Service.

## Creating a Job

Marketo bulk extract APIs use jobs to initiate and run data extractions. The following request creates a lead export job:

```http
POST /bulk/v1/leads/export/create.json
```

```json
{
   "fields": [
      "firstName",
      "lastName"
   ],
   "format": "CSV",
   "columnHeaderNames": {
      "firstName": "First Name",
      "lastName": "Last Name"
   },
   "filter": {
      "createdAt": {
         "startAt": "2023-01-01T00:00:00Z",
         "endAt": "2023-01-31T00:00:00Z"
      }
   }
}
```

This request creates a job that exports each lead created between January 1st 2023 and January 31st 2023. The CSV file contains values from the "firstName" and "lastName" fields and uses the column headers "First Name" and "Last Name".

```json
{
   "requestId": "e42b#14272d07d78",
   "success": true,
   "result": [
      {
         "exportId": "ce45a7a1-f19d-4ce2-882c-a3c795940a7d",
         "status": "Created",
         "createdAt": "2023-01-21T11:47:30-08:00",
         "queuedAt": "2023-01-21T11:48:30-08:00",
         "format": "CSV",
      }
   ]
}
```

The response returns the job ID in the `exportId` attribute. Use this job ID to enqueue or cancel the job, check its status, or retrieve the completed file.

### Common Parameters

Each job creation endpoint has common parameters for configuring the file format, field names, and filter. Each extract job subtype can also have additional parameters:

| Parameter | Data Type | Notes |
| --- | --- | --- |
| format | String | Determines the file format of the extracted data with options for comma-separated values, tab-separated values, and semi-colon-separated values. Accepts one of: CSV, SSV, TSV. The format defaults to CSV. |
| columnHeaderNames | Object | Allows setting the names of column headers in the returned file. Each member key is the name of the column header to rename, and the value is the new name of the column header. For example,  "columnHeaderNames": \{ "firstName": "First Name", "lastName": "Last Name" }, |
| filter | Object | Filter applied to the extract job. Types and options vary between job types. |

## Retrieving Jobs

Use the Get Export Jobs endpoint for the corresponding object type to retrieve recent jobs. Each Get Export Jobs endpoint supports these parameters:

- `status` filters jobs by export status. Valid values are Created, Queued, Processing, Canceled, Completed, and Failed.
- `batchSize` limits the number of jobs returned. The default and maximum value is 300.
- `nextPageToken` pages through large result sets.

The following request retrieves Lead Export Jobs with a status of Completed or Failed:

```http
GET /bulk/v1/leads/export.json?status=Completed,Failed
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
         "numberOfRecords": 122323,
         "fileSize": 123424,
         "fileChecksum": "sha256:c16514c7e80fcac5ea055dacae9617fc3c29aff5365e3743071313ce0ed2a815"
      }
      ...
   ]
}

```

The result array contains the status response for each job created for that object type during the past seven days. The response includes only jobs that the API user making the call owns.

## Starting a Job

After creating a job, use its job ID to enqueue and start it:

```http
POST /bulk/v1/leads/export/{exportId}/enqueue.json
```

The request starts the job and returns a status response. Because exports run asynchronously, poll the job status to determine when the export is complete.

## Polling Job Status

Poll the status endpoint to determine the progress of a job. Only the API user who created a job can poll its status.

A job status does not update more frequently than once every 60 seconds. Do not poll more frequently than that. For most use cases, polling once every 5 minutes is sufficient. Data from each successful export is held for 10 days.

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
         "status": "Completed",
         "createdAt": "2017-01-21T11:47:30-08:00",
         "queuedAt": "2017-01-21T11:48:30-08:00",
         "startedAt": "2017-01-21T11:51:30-08:00",
         "finishedAt": "2017-01-21T12:59:30-08:00",
         "format": "CSV",
         "numberOfRecords": 122323,
         "fileSize": 123424,
         "fileChecksum": "sha256:d9c73f0b6960c71623c8bafe29603b3e8e20fd0e4eeaefd119c0227506ea9be4"
      }
   ]
}
```

The inner `status` member indicates the job's progress. Its value can be Created, Queued, Processing, Canceled, Completed, or Failed.

In this example, the job is complete, so you can stop polling and retrieve the file. For a completed job, the `fileSize` member indicates the total file length in bytes, and the `fileChecksum` member contains the file's SHA-256 hash. Job status is available for 30 days after the job reaches a Completed or Failed status.

## Retrieving Your Data

After the job is complete, retrieve the exported file:

```http
GET /bulk/v1/leads/export/{exportId}/file.json
```

The response contains the file in the format configured for the job. If the job is incomplete or the request contains an invalid job ID, the file endpoint returns a 404 Not Found status and a plaintext error message. This response differs from most other Marketo REST endpoint responses.

To support partial and resumable retrieval, the file endpoint supports the optional HTTP `Range` header with the `bytes` type, as defined in [RFC 7233](https://datatracker.ietf.org/doc/html/rfc7233). If you do not set the header, the endpoint returns the entire file.

To retrieve the first 10,000 bytes of a file, pass the following header in the GET request. The range starts at byte 0:

```text
Range: bytes=0-9999
```

For a partial file, the endpoint returns status code 206 and the Accept-ranges, Content-Length, and Content-Range headers:

```text
Accept-Ranges: bytes
Content-Length: 10000
Content-Range: bytes 0-9999/123424
```

### Partial Retrieval and Resumption

Use the `Range` header to retrieve part of a file or resume a retrieval. The file range begins at byte 0 and ends at the value of `fileSize` minus 1. The Get Export File endpoint also reports the file length as the denominator in the `Content-Range` response header.

If a retrieval partially fails, you can resume it. For example, if you try to retrieve a 1000-byte file but receive only the first 725 bytes, call the endpoint again and pass a new range:

```text
Range: bytes=725-999
```

This request returns the remaining 275 bytes of the file.

#### File Integrity Verification

When `status` is "Completed", the job status endpoints return a checksum in the `fileChecksum` attribute. The checksum is the SHA-256 hash of the exported file. Compare it with the SHA-256 hash of the retrieved file to verify that the file is complete.

The following response contains a checksum:

```json
{
    "exportId": "45547609-6732-418a-bb7b-17b0160b2317",
    "format": "CSV",
    "status": "Completed",
    "createdAt": "2019-06-04T23:13:12Z",
    "queuedAt": "2019-06-04T23:14:02Z",
    "startedAt": "2019-06-04T23:15:19Z",
    "finishedAt": "2019-06-04T23:36:40Z",
    "numberOfRecords": 1776,
    "fileSize": 400785,
    "fileChecksum": "sha256:83aca1351c9398d2770330e21a9e278880fd2f1eeaf8c8238bf7676d5c21d1c6"
}
```

The following example uses the sha256sum command-line utility to create the SHA-256 hash of a retrieved file named "bulk_lead_export.csv":

```bash
$ sha256sum bulk_lead_export.csv
83aca1351c9398d2770330e21a9e278880fd2f1eeaf8c8238bf7676d5c21d1c6 *bulk_lead_export.csv
```

## Canceling a Job

If a job is configured incorrectly or is no longer necessary, cancel it:

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
         "format": "CSV",
      }
   ]
}
```

The response status indicates that the job has been canceled.
