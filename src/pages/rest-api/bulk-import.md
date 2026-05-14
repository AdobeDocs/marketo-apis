---
title: Bulk Import
description: "Marketo Bulk Import for loading leads, custom objects, and program members via multipart uploads, creating async jobs, polling status, and handling failures."
---

# Bulk Import

Marketo provides interfaces for insertion of large sets of person and person related data, called Bulk Import. Currently, interfaces are offered for three object types:

- Leads (Persons)
- Custom Objects
- Program Members

Bulk import is performed by creating a job, and then waiting for the job to complete reading a file. These jobs are executed asynchronously, and can be polled to retrieve the status of the import. Files are uploaded using HTTP multipart/form-data per RFC 2399.

Bulk API endpoints are not prefixed with '/rest' like other endpoints.

## Authentication

The bulk import APIs use the same OAuth 2.0 authentication method as other Marketo REST APIs.  This requires a valid access token sent as an HTTP header `Authorization: Bearer {_AccessToken_}`.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the **access_token** query parameter is being removed on June 30, 2025. If your project uses a query parameter to pass the access token, it should be updated to use the **Authorization** header as soon as possible. New development should use the **Authorization** header exclusively.

## Limits

- Max Concurrent Import Jobs: 2
- Max Queued Import Jobs (inclusive of currently importing jobs): 10
- Max Size of Import File: 10 MB

## Permissions

Bulk Import uses the same permissions model as the Marketo REST API, and does not require any additional special permissions in order to use, though specific permissions are required for each set of endpoints.

## Record Operations

Bulk import is an "insert or update" record operation. If a matching record is found in the database, it is updated. Otherwise, a new record is created. The bulk import response does not indicate whether a given record was updated or inserted.

## Creating a Job

Marketo's bulk import APIs use the concept of a job for executing data import. Let's look at creating a simple lead import job using the [Import Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads/operation/importLeadUsingPOST) endpoint.  Note that this endpoint uses [multipart/form-data as the content-type](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). This can be tricky to get right, so best practice is to use an HTTP support library for your language of choice.  If you are just getting your feet wet, we suggest that you use [curl](https://curl.se/).

```http
POST /bulk/v1/leads.json?format=csv
```

```text
Content-Type: multipart/form-data; boundary=--------------------------WebKitFormBoundaryBQACkJZyaiIAXogC
Content-Length: 311
Host: <munchkinId>.mktorest.com
```

```text
------WebKitFormBoundaryBQACkJZyaiIAXogC
Content-Disposition: form-data; name="file"; filename="leads.csv"
Content-Type: text/csv

firstName,lastName,email
Able,Baker,ablebaker@marketo.com
Charlie,Dog,charliedog@marketo.com
Easy,Fox,easyfox@marketo.com
------WebKitFormBoundaryBQACkJZyaiIAXogC--
```

This request will construct a job that will import values contained in the CSV file named "leads.csv" with the column headers "FirstName", "LastName", "Email", "Company".

```json
{
    "requestId": "d01f#15d672f8560",
    "result": [
        {
            "batchId": 3404,
            "importId": "3404",
            "status": "Queued"
        }
    ],
    "success": true
}
```

When we submit the job it will return a batchId, which we can then use to check its status.

### Common Parameters

Each job creation endpoint shares some common parameters for configuring the file format, field names, and filter of a bulk extract job.  Each subtype of extract job may have additional parameters:

| Parameter | Data Type | Notes |
| --- | --- | --- |
| format | String | Determines the file format of the imported data with options for comma-separated values, tab-separated values, and semi-colon-separated values. Accepts one of: CSV, SSV, TSV. The format defaults to CSV. |
| file | String | Data is specified through multipart form-data in the file. |

## Polling Job Status

Determining the status of the job is simple using the [Get Import Lead Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads/operation/getImportLeadStatusUsingGET) endpoint.

```http
GET /bulk/v1/leads/batch/{batchId}.json
```

```json
{
    "requestId": "1f63#15d6738fd15",
    "result": [
        {
            "batchId": 3404,
            "importId": "3404",
            "status": "Complete",
            "numOfLeadsProcessed": 3,
            "numOfRowsFailed": 0,
            "numOfRowsWithWarning": 0,
            "message": "Import succeeded, 3 records imported (3 members)"
        }
    ],
    "success": true
}
```

The inner `status` member will indicate the progress of the job, and may be one of the following values: Queued, Importing, Complete, Failed. In this case our job has completed, so we can stop polling.

## Failures

Failures are indicated by the `numOfRowsFailed` attribute in Get Import Lead Status response. If `numOfRowsFailed` is greater than zero, then that value indicates the number of failures that occurred.

To retrieve the records and causes of failed rows, you will must retrieve the failure file using the [Get Import Lead Failures](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads/operation/getImportLeadFailuresUsingGET) endpoint.

```http
GET /bulk/v1/leads/batch/{batchId}/failures.json
```

The file indicates which rows failed, along with a message indicating why the record failed.
