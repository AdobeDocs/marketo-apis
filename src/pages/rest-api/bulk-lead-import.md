---
title: Bulk Lead Import
description: Create and monitor asynchronous bulk lead imports in Marketo with CSV TSV or SSV.
---

# Bulk Lead Import

[Bulk Lead Import Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads)

For large amounts of lead records, leads can be imported asynchronously with the [bulk API](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads/operation/importLeadUsingPOST). This allows you to import a list of records into Marketo using a flat file with the delimiters (comma, tab, or semi-colon). The file can contain any number of records, so long as the file totals less than 10MB in size. The record operation is "insert or update" only.

## Processing Limits

You are allowed to submit more than one bulk import request, with limitations. Each request is added as a job to a FIFO queue to be processed. A maximum of two jobs are processed at the same time. A maximum of 10 jobs are allowed in the queue at any given time (including the two currently being processed). If you exceed the ten job maximum, then a `1016, Too many imports` error is returned.

## Import File

The first row of the file must be a header which lists the corresponding REST API fields to map the values of each row into. A typical file would follow this basic pattern:

```csv
email,firstName,lastName
test@example.com,John,Doe
```

The `externalCompanyId` field may be used to link the lead record to a company record. The `externalSalesPersonId` field may be used to link the lead record to a sales person record.

The call itself is made using the `multipart/form-data` content-type.

This request type can be difficult to implement, so it is highly recommended that you use an existing library implementation.

## Creating a Job

To make a bulk import request, you must set your content-type header to `multipart/form-data` and include at least a `file` parameter with your file content, and a `format` parameter with the value `csv`, `tsv`, or `ssv`, denoting your file format.

```http
POST /bulk/v1/leads.json?format=csv
```

```text
Content-Type: multipart/form-data; boundary=------WebKitFormBoundaryBQACkJZyaiIAXogC
Content-Length: 311
Host: <munchkinId>.mktorest.com
```

```text
------WebKitFormBoundaryBQACkJZyaiIAXogC
Content-Disposition: form-data; name="file"; filename="leads.csv"
Content-Type: text/csv

firstName,lastName,email,company
Able,Baker,ablebaker@marketo.com,Marketo
Charlie,Dog,charliedog@marketo.com,Marketo
Easy,Fox,easyfox@marketo.com,Marketo
------WebKitFormBoundaryBQACkJZyaiIAXogC--
```

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

This endpoint uses [multipart/form-data as the content-type](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). It is a  best practice is to use an HTTP support library for your language of choice to ensure the correct usage. The following example is a simple way to do this with cURL from the command line:

```bash
curl -i -F format=csv -F file=@lead_data.csv -F access_token=<Access Token> <REST API Endpoint Base URL>/bulk/v1/leads.json
```

Where the import file `lead_data.csv` contains the following:

```text
firstName,lastName,email,company
Able,Baker,ablebaker@marketo.com,Marketo
Charlie,Dog,charliedog@marketo.com,Marketo
Easy,Fox,easyfox@marketo.com,Marketo
```

You can also optionally include the `lookupField`, `listId`, and `partitionName` parameters in your request. `lookupField` allows you to select a specific field to deduplicate on, just like Sync Leads, and defaults to email. You can specify `id` as `lookupField` to indicate an "update only" operation. `listId` allows you to select a static list to import the list of leads to; this will cause the leads in the list to become members of this static list, in addition to any creations or updates caused by the import. `partitionName` selects a specific partition to import to. See the Workspaces and Partitions section for more information.

Notice in the response to our call, that there is not a listing of successes or failures like with Sync Leads, but a batchId and a status field for the record in the result array. This is because this API is asynchronous, and can return a status of Queued, Importing, or Failed. You must retain the batchId to get the status of the import job, and to retrieve failures and/or warnings upon completion. The batchId remains valid for seven days.

## Polling Job Status

It is best practice to poll the job every 5-30 seconds, depending on required latency and API call limitations, to see the status of the import job. You can do so with the Get Import Lead Status API.

```http
GET /bulk/v1/leads/batch/{id}.json
```

```json
{
   "requestId":"8136#146daebc2ed",
   "success":true,
   "result":[
      {
         "batchId":1022,
         "status":"Complete",
         "numOfLeadsProcessed":2,
         "numOfRowsFailed":1,
         "numOfRowsWithWarning":0,
         "message":"Import completed with errors, 2 records imported (2 members), 1 failed"
      }
   ]
}

```

This response shows a completed import, but the status can be one of:

- Complete
- Queued
- Importing
- Failed

If the job has completed, you have a listing of the number of rows processed, failed, on ones with warnings. The message parameter may also give the failure message if status is Failed.

## Failures

Failures are indicated by the `numOfRowsFailed` attribute in Get Import Lead Status response. If `numOfRowsFailed` is greater than zero, then that value indicates the number of failures that occurred.

To retrieve the records and causes of failed rows, you  must retrieve the failure file:

```http
GET /bulk/v1/leads/batch/{id}/failures.json
```

The API responds with a file indicating which rows failed, along with a message indicating why the record failed. The format of the file is the same as specified in `format` parameter during job creation. An additional field is appended to each record with a description of the failure.

## Warnings

Warnings are indicated by the `numOfRowsWithWarning` attribute in a Get Import Lead Status response. If `numOfRowsWithWarning` is greater than zero, that value indicates the number of warnings that occurred.

To retrieve the records and causes of warning rows, retrieve the warning file:

```http
GET /bulk/v1/leads/batch/{id}/warnings.json
```

The API responds with a file indicating which rows produced warnings, along with a message indicating why the record failed. The format of the file is the same as specified in `format` parameter during job creation. An additional field is appended to each record with a description of the warning.
