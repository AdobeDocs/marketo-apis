---
title: Bulk Extract
description: "Learn how to use Marketo Bulk Extract REST API to export leads, activities, program members, and custom objects, with OAuth, job queues, and 500MB daily limits."
---

# Bulk Extract

Marketo provides interfaces for retrieval of large sets of person and person-related data, called Bulk Extract. Currently, interfaces are offered for three object types:

- Leads (Persons)
- Activities
- Program Members
- Custom Objects

Bulk extract is performed by creating a job, defining the set of data to retrieve, enqueuing the job, waiting for the job to complete writing a file, and then retrieving the file over HTTP. These jobs are executed asynchronously, and can be polled to retrieve the status of the export.

`Note:` Bulk API endpoints are not prefixed with '/rest' like other endpoints.

## Authentication

The bulk extract APIs use the same OAuth 2.0 authentication method as other Marketo REST APIs. This requires a valid access token to be sent as an HTTP header `Authorization: Bearer {_AccessToken_}`.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the **access_token** query parameter is being removed on June 30, 2025. If your project uses a query parameter to pass the access token, it should be updated to use the **Authorization** header as soon as possible. New development should use the **Authorization** header exclusively.

## Limits

- Max Concurrent Export Jobs: 2
- Max Queued Export Jobs (inclusive of currently exporting jobs): 10
- File Retention Period: seven days
- Default Daily Export Allocation: 500MB (which resets daily at 12:00AM CST). Increases available for purchase.
- Max Time Span for Date Range Filter (createdAt or updatedAt): 31 days

Bulk Lead Extract filters for UpdatedAt and Smart List are unavailable for some subscription types. If unavailable, a call to the Create Export Lead Job endpoint returns an error "1035, Unsupported filter type for target subscription". Customers may contact Marketo Support to have this functionality enabled in their subscription.

### Queue

The bulk extract APIs use a job queue (shared between leads, activities, program members, and custom objects). Extract jobs must first be created, and then enqueued by calling Create Export Lead/Activity/Program Member Job and Enqueue Export Lead/Activity/Program Member Job endpoints. Once enqueued, the jobs are pulled from the queue and started when computing resources become available.

The maximum number of jobs in the queue is 10. If you try to enqueue a job when the queue is full, the Enqueue Export Job endpoint returns an error "1029, Too many jobs in queue". A maximum of two jobs can run concurrently (status is "Processing").

### File Size

The bulk extract APIs are metered based on the size-on-disk of the data retrieved by a bulk extract job. The explicit size in bytes for a job can be determined by reading the `fileSize` attribute from the completed status response of an export job.

The daily quota is a maximum of 500MB per day, which is shared between leads, activities, program members, and custom objects. When the quota is exceeded, you cannot Create or Enqueue another job until the daily quota resets at midnight [Central Time](https://en.wikipedia.org/wiki/Central_Time_Zone). Until that time, an error "1029, Export daily quota exceeded" is returned. Aside from the daily quota, there is no maximum file size.

Once a job is queued or processing, it runs to completion (barring an error or job cancellation). If a job fails for some reason, you must recreate it. Files are fully written only when a job reaches the completed state (partial files are never written). You can verify that a file was fully written by computing it is SHA-256 hash and comparing that with the checksum that is returned by job status endpoints.

You can determine the total amount of disk used for the current day by calling Get Export Lead/Activity/Program Member Jobs. These endpoints return a list of all jobs in the past seven days. You can filter that list down to just the jobs that completed in the current day (using `status` and `finishedAt` attributes). Then then sum the file sizes for those jobs to produce the total amount used. There is no way to delete a file to reclaim disk space.

## Permissions

Bulk Extract uses the same permissions model as the Marketo REST API, and does not require any additional special permissions to use, though specific permissions are required for each set of endpoints.

Bulk Extract jobs are only accessible to the API user which created them, including polling for status and retrieving file contents.

Bulk Extract endpoints are not aware of Marketo workspaces. Extraction requests always include data across all workspaces, regardless of how you define the API Only User for your Custom Service.

## Creating a Job

Marketo's bulk extract APIs use the concept of a job for initiating and executing data extraction. Let's look at creating a simple lead export job.

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

This simple request will construct a job that will return the values contained in the "firstName" and "lastName" fields, with the column headers "First Name" and "Last Name" as a CSV file, containing each lead created between January 1st 2023 and January 31st 2023.

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

When we create the job, it returns a job id in the `exportId` attribute. We can then use this job id to enqueue the job, cancel it, check its status, or retrieve the completed file.

### Common Parameters

Each job creation endpoint shares some common parameters for configuring the file format, field names, and filter of a bulk extract job. Each subtype of extract job may have additional parameters:

| Parameter | Data Type | Notes |
| --- | --- | --- |
| format | String | Determines the file format of the extracted data with options for comma-separated values, tab-separated values, and semi-colon-separated values. Accepts one of: CSV, SSV, TSV. The format defaults to CSV. |
| columnHeaderNames | Object | Allows setting the names of column headers in the returned file. Each member key is the name of the column header to rename, and the value is the new name of the column header. For example, `"columnHeaderNames": { "firstName": "First Name", "lastName": "Last Name" }` |
| filter | Object | Filter applied to the extract job. Types and options vary between job types. |

## Retrieving Jobs

Sometimes, you may must retrieve your recent jobs. This is easily done with the Get Export Jobs for the corresponding object type. Each Get Export Jobs endpoint supports a `status` filter field, a  `batchSize` to limit number of jobs returned, and `nextPageToken` for paging through large result sets. The status filter supports each valid status for an export job: Created, Queued, Processing, Canceled, Completed, and Failed. The batchSize has a maximum and default of 300. Let's get the list of Lead Export Jobs:

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

The endpoint responds with `status` response of each job created in the past seven days for that object type in the result array. The response will only include results for jobs owned by the API user making the call.

## Starting a Job

With our job id in hand, let's start the job:

```http
POST /bulk/v1/leads/export/{exportId}/enqueue.json
```

This kicks off the execution of the job and returns a status response back. Since the export is always done asynchronously, we must poll the status of the job to determine if it has been completed. The status for a given job will not be updated more frequently than once every 60 seconds, so the status should never be polled more frequently than that. Keep in mind, however, that most use cases should not ever require polling more frequently than once every 5 minutes. Data from each successful export is held for 10 days.

## Polling Job Status

Determining the status of the job is simple.

Status can only be polled for jobs created by the same API user that created them.

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

The inner `status` member indicates the progress of the job, and may be one of the following values: Created, Queued, Processing, Canceled, Completed, Failed. In this case our job has completed, so we can stop polling and continue on to retrieve the file. When completed, the `fileSize` member indicates the total length of the file in bytes, and the `fileChecksum` member contains the SHA-256 hash of the file. Job status is available for 30 days after Completed or Failed status was reached.

## Retrieving Your Data

When your job has completed, you can easily retrieve the file.

```http
GET /bulk/v1/leads/export/{exportId}/file.json
```

The response contains a file formatted in the way that the job was configured. The endpoint responds with the contents of the file. If a job has not completed, or a bad job id is passed, file endpoints respond with a status of 404 Not Found, and a plaintext error message as the payload, unlike most other Marketo REST endpoints.

To support partial and resumption-friendly retrieval of extracted data, the file endpoint optionally supports the HTTP header `Range` of the type `bytes` (per [RFC 7233](https://datatracker.ietf.org/doc/html/rfc7233)). If the header is not set, the whole of the contents will be returned. To retrieve the first 10,000 bytes of a file, you would pass the following header as part of your GET request to the endpoint, starting from byte 0:

```text
Range: bytes=0-9999
```

When retrieving the partial file, the endpoint responds with status code 206, and returning the Accept-ranges, Content-Length, and Content-Range headers:

```text
Accept-Ranges: bytes
Content-Length: 1000
Content-Range: bytes 0-9999/123424
```

### Partial Retrieval and Resumption

Files can be retrieved in part, or resume later using the `Range` header. The range for a file begins at byte 0, and ends at the value of `fileSize` minus 1. The length of the file is also reported as the denominator in the value of the `Content-Range` response header when calling a Get Export File endpoint. If a retrieval fails partially, it can be resumed later. For example, if you try to retrieve a file 1000 bytes long, but only the first 725 bytes were received, the retrieval can be retried from the point of failure by calling the endpoint again and passing a new range:

```text
Range: bytes 724-999
```

This returns the remaining 275 bytes of the file.

#### File Integrity Verification

The job status endpoints return a checksum in the `fileChecksum` attribute when `status` is "Completed". The checksum is a SHA-256 hash of the exported file. You can compare the checksum with the SHA-256 hash of the retrieved file to verify that it is complete.

Here is an example response containing the checksum:

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

Here is an example of creating the SHA-256 hash of a retrieved file named "bulk_lead_export.csv" using the sha256sum command-line utility:

```bash
$ sha256sum bulk_lead_export.csv
83aca1351c9398d2770330e21a9e278880fd2f1eeaf8c8238bf7676d5c21d1c6 *bulk_lead_export.csv
```

## Canceling a Job

If a job was configured incorrectly, or becomes unnecessary, it can be easily canceled:

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

This responds with a status indicating that the job has been canceled.
