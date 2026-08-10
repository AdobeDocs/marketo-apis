---
title: Bulk Import
description: "Marketo Bulk Import for loading leads, custom objects, and program members via multipart uploads, creating async jobs, polling status, and handling failures."
---

# Bulk Import

Bulk Import provides interfaces for inserting large sets of person and person-related data. You can import three object types:

- Leads (Persons)
- Custom Objects
- Program Members

To perform a bulk import, create a job that reads an uploaded file. The job runs asynchronously, so poll it to retrieve the import status.

Upload files using HTTP `multipart/form-data` per RFC 2399.

Unlike other endpoints, Bulk API endpoints are not prefixed with `/rest`.

## Authentication

The bulk import APIs use the same OAuth 2.0 authentication method as other Marketo REST APIs. Send a valid access token in the `Authorization: Bearer {_AccessToken_}` HTTP header.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the **access_token** query parameter is being removed on June 30, 2025. If your project uses a query parameter to pass the access token, it should be updated to use the **Authorization** header as soon as possible. New development should use the **Authorization** header exclusively.

## Limits

- Maximum concurrent import jobs: 2
- Maximum queued import jobs, including jobs currently importing: 10
- Maximum import file size: 10 MB

## Permissions

Bulk Import uses the same permissions model as the Marketo REST API. It does not require additional permissions, but each set of endpoints requires specific permissions.

## Record Operations

Bulk import is an "insert or update" record operation. If the database contains a matching record, the operation updates it. Otherwise, the operation creates a record.

The bulk import response does not indicate whether an individual record was updated or inserted.

## Creating a Job

Create a lead import job by calling the [Import Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/importLeadUsingPOST) endpoint. This endpoint uses [multipart/form-data as the content-type](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html).

Use an HTTP support library for your preferred language to construct the multipart request. You can also use [curl](https://curl.se/) to get started.

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

This request creates a job that imports values from the CSV file named `leads.csv`.

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

The response returns a `batchId`. Use this value to check the job status.

### Common Parameters

Each job creation endpoint shares parameters for configuring the import file. An import subtype can also support additional parameters.

| Parameter | Data Type | Notes |
| --- | --- | --- |
| format | String | Determines the file format of the imported data with options for comma-separated values, tab-separated values, and semi-colon-separated values. Accepts one of: CSV, SSV, TSV. The format defaults to CSV. |
| file | String | Data is specified through multipart form-data in the file. |

## Polling Job Status

Pass the `batchId` to the [Get Import Lead Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportLeadStatusUsingGET) endpoint to retrieve the job status.

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

The `status` member indicates the job's progress. Its value can be `Queued`, `Importing`, `Complete`, or `Failed`.

In this example, the job is complete, so polling can stop.

## Failures

The `numOfRowsFailed` attribute in the Get Import Lead Status response indicates the number of failed rows. A value greater than zero means that failures occurred.

To retrieve the failed records and their causes, use the [Get Import Lead Failures](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportLeadFailuresUsingGET) endpoint.

```http
GET /bulk/v1/leads/batch/{batchId}/failures.json
```

The failure file identifies each failed row and explains why the record failed.
