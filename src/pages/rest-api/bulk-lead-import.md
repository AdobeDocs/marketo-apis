---
title: Bulk Lead Import
description: Create and monitor asynchronous bulk lead imports in Marketo with CSV TSV or SSV.
---

# Bulk Lead Import

[Bulk Lead Import Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads)

Use the [bulk API](https://developer.adobe.com/marketo-apis/api/mapi#operation/importLeadUsingPOST) to import large numbers of lead records asynchronously. Provide the records in a comma-, tab-, or semicolon-delimited flat file that is less than 10 MB.

Bulk lead import supports only the "insert or update" record operation.

## Processing Limits

Each bulk import request is added as a job to a first-in, first-out (FIFO) queue. The following limits apply:

- A maximum of two jobs can be processed concurrently.
- A maximum of 10 jobs can be in the queue, including the two jobs being processed.

If you exceed the 10-job maximum, the API returns a `1016, Too many imports` error.

## Import File

The first row of the file must be a header that lists the REST API fields to which the values in each row map. A typical file follows this pattern:

```csv
email,firstName,lastName
test@example.com,John,Doe
```

Use `externalCompanyId` to link a lead record to a company record. Use `externalSalesPersonId` to link a lead record to a sales person record.

Send the request using the `multipart/form-data` content type. Use an existing library implementation to construct the multipart request.

## Creating a Job

To create a bulk import job, set the content type to `multipart/form-data` and include these parameters:

- `file`: The import file content.
- `format`: The file format. Valid values are `csv`, `tsv`, and `ssv`.

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

This endpoint uses [multipart/form-data as the content-type](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). Use an HTTP support library for your preferred language to construct the request correctly. The following example uses cURL from the command line:

```bash
curl -i -F format=csv -F file=@lead_data.csv -F access_token=<Access Token> <REST API Endpoint Base URL>/bulk/v1/leads.json
```

In this example, the `lead_data.csv` import file contains the following data:

```text
firstName,lastName,email,company
Able,Baker,ablebaker@marketo.com,Marketo
Charlie,Dog,charliedog@marketo.com,Marketo
Easy,Fox,easyfox@marketo.com,Marketo
```

You can also include these optional parameters:

- `lookupField`: Selects the field used for deduplication and defaults to `email`. Specify `id` to perform an "update only" operation.
- `listId`: Selects a static list. Imported leads become members of this list in addition to any records created or updated by the import.
- `partitionName`: Selects the partition to import to. See the Workspaces and Partitions section for more information.

Because the API is asynchronous, the response contains `batchId` and `status` fields instead of individual successes and failures. The status can be `Queued`, `Importing`, or `Failed`.

Retain the `batchId` to check the job status and retrieve failures or warnings after completion. The `batchId` remains valid for seven days.

## Polling Job Status

Use the Get Import Lead Status API to poll the job every 5–30 seconds, depending on latency requirements and API call limitations.

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

This response shows a completed import. The status can be one of the following values:

- Complete
- Queued
- Importing
- Failed

When the job is complete, the response lists the numbers of rows processed, failed, and processed with warnings. The `message` parameter can also provide a failure message when the status is `Failed`.

## Failures

The `numOfRowsFailed` attribute in the Get Import Lead Status response indicates the number of failed rows. A value greater than zero means that failures occurred.

To retrieve the failed records and their causes, request the failure file:

```http
GET /bulk/v1/leads/batch/{id}/failures.json
```

The API returns a file that identifies each failed row and explains why the record failed. The file uses the format specified by the `format` parameter during job creation. An additional field on each record describes the failure.

## Warnings

The `numOfRowsWithWarning` attribute in the Get Import Lead Status response indicates the number of rows with warnings. A value greater than zero means that warnings occurred.

To retrieve the affected records and their causes, request the warning file:

```http
GET /bulk/v1/leads/batch/{id}/warnings.json
```

The API returns a file that identifies each row with a warning and explains why the warning occurred. The file uses the format specified by the `format` parameter during job creation. An additional field on each record describes the warning.
