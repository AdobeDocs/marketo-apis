---
title: Bulk Program Member Import
description: "Learn how to import program members in bulk via Marketo REST API using CSV TSV or SSV files under 10MB, queue limits, required params, and polling job status."
---

# Bulk Program Member Import

[Bulk Program Member Import Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members)

Use the [bulk API](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members) to import large numbers of program member records asynchronously. Provide the records in a comma-, tab-, or semicolon-delimited flat file that is less than 10 MB.

Bulk program member import supports only the "insert or update" record operation.

## Processing Limits

Each bulk import request is added as a job to a first-in, first-out (FIFO) queue. The following limits apply:

- A maximum of two jobs can be processed concurrently.
- A maximum of 10 jobs can be in the queue, including the two jobs being processed.

If you exceed the 10-job maximum, the API returns a `1016, Too many imports` error.

## Import File

The first row of the file must be a header that lists the REST API field names to which the values in each row map. Retrieve these names using the [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) and [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET) endpoints.

Records can contain lead fields, custom lead fields, and custom program member fields.

A typical file follows this pattern:

```text
email,firstName,lastName
test@example.com,John,Doe
```

Send the request using the `multipart/form-data` content type. Use an existing library implementation to construct the multipart request.

## Creating a Job

The [Import Program Members](https://developer.adobe.com/marketo-apis/api/mapi#operation/importProgramMemberUsingPOST) endpoint reads program member records from a file and adds them to a program with a specified status. Records can contain lead fields and custom program member fields.

Every record must include the email field, which is used for deduplication.

The `programId` path parameter specifies the program to which the members are added.

The request requires three query parameters:

- `format`: The import file format (`CSV`, `TSV`, or `SSV`).
- `programMemberStatus`: The program status assigned to the imported members.
- `file`: The name of the file that contains the program member records.

```http
POST /bulk/v1/program/{programId}/members/import.json?format=csv&programMemberStatus=On List
```

```text
Content-Type: multipart/form-data; boundary=--------------------------118046853683028616211319
Content-Length: 772
Host: <munchkinId>.mktorest.com
```

```text
----------------------------118046853683028616211319
Content-Disposition: form-data; name="file"; filename="Lead-House-Lannister.csv"
Content-Type: text/csv

firstName,lastName,email,title,company,leadScore
Joanna,Lannister,Joanna@Lannister.com,Lannister,House Lannister,0
Tywin,Lannister,Tywin@Lannister.com,Lannister,House Lannister,0
Cersei,Lannister,Cersei@Lannister.com,Lannister,House Lannister,0
Jamie,Lannister,Jamie@Lannister.com,Lannister,House Lannister,0
Tyrion,Lannister,Tyrion@Lannister.com,Lannister,House Lannister,0
Kevan,Lannister,Kevan@Lannister.com,Lannister,House Lannister,0
Dorna,Lannister,Dorna@Lannister.com,Lannister,House Lannister,0
Lancel,Lannister,Lancel@Lannister.com,Lannister,House Lannister,0

----------------------------118046853683028616211319--
```

```json
{
    "requestId": "17f4a#16f87f87325",
    "result": [
        {
            "batchId": 1040,
            "importId": "1040",
            "status": "Queued"
        }
    ],
    "success": true
}
```

Because the endpoint is asynchronous, the response contains `batchId` and `status` fields. The status can be `Queued`, `Importing`, or `Failed`.

Retain the `batchId` to check the import status and retrieve failures or warnings after completion. The `batchId` remains valid for seven days.

The following command-line cURL request submits the example job:

```bash
curl -i -F format='csv' -F programMemberStatus='On List' -F file='@Lead-House-Lannister.csv' -F access_token='<Access Token>' <REST API Endpoint Base URL>/bulk/v1/program/{programId}/members/import.json
```

In this example, the `Lead-House-Lannister.csv` import file contains the following data:

```text
firstName,lastName,email,title,company,leadScore
Joanna,Lannister,Joanna@Lannister.com,Lannister,House Lannister,0
Tywin,Lannister,Tywin@Lannister.com,Lannister,House Lannister,0
Cersei,Lannister,Cersei@Lannister.com,Lannister,House Lannister,0
Jamie,Lannister,Jamie@Lannister.com,Lannister,House Lannister,0
Tyrion,Lannister,Tyrion@Lannister.com,Lannister,House Lannister,0
Kevan,Lannister,Kevan@Lannister.com,Lannister,House Lannister,0
Dorna,Lannister,Dorna@Lannister.com,Lannister,House Lannister,0
Lancel,Lannister,Lancel@Lannister.com,Lannister,House Lannister,0
```

## Polling Job Status

After creating the import job, poll it every 5–30 seconds. Pass the `batchId` path parameter to the [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportProgramMemberStatusUsingGET) endpoint.

```http
GET /bulk/v1/program/members/import/{batchId}/status.json
```

```json
{
    "requestId": "e0cb#16f87f8b177",
    "result": [
        {
            "batchId": 1040,
            "importId": "1040",
            "status": "Complete",
            "numOfLeadsProcessed": 8,
            "numOfRowsFailed": 0,
            "numOfRowsWithWarning": 0,
            "message": "Import succeeded, 8 records imported (8 members)"
        }
    ],
    "success": true
}
```

This response shows a completed import. The status can be `Complete`, `Queued`, `Importing`, or `Failed`.

When the job is complete, the response lists the numbers of rows processed, failed, and processed with warnings. The `message` parameter can also provide a failure message when the status is `Failed`.

## Failures

The `numOfRowsFailed` attribute in the [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportProgramMemberStatusUsingGET) response indicates the number of failed rows. A value greater than zero means that failures occurred.

Pass the `batchId` path parameter to the Get Import Program Member Failures endpoint to retrieve the failed records and their causes.

```http
GET /bulk/v1/program/members/import/{batchId}/failures.json
```

The endpoint returns a file that identifies each failed row and explains why the record failed. The file uses the format specified by the `format` parameter during job creation. An additional field on each record describes the failure.

For example, suppose that you import the following file with an invalid lead score:

```text
firstName,lastName,email,title,company,leadScore
Aerys,Targaryen,Aerys@Targaryen.com,Targaryen,House Targaryen,TEXT_VALUE_IN_INTEGER_FIELD
```

The job status returns `numOfRowsFailed` as 1, indicating that a failure occurred:

```http
GET /bulk/v1/program/members/import/{batchId}/status.json
```

```json
{
    "requestId": "4c2d#16f8b32c8ef",
    "result": [
        {
            "batchId": 1046,
            "importId": "1046",
            "status": "Complete",
            "numOfLeadsProcessed": 0,
            "numOfRowsFailed": 1,
            "numOfRowsWithWarning": 0,
            "message": "Import completed with errors, 0 records imported (0 members), 1 failed"
        }
    ],
    "success": true
}
```

Retrieve the failure file for more information:

```http
GET /bulk/v1/program/members/import/{batchId}/failures.json
```

```text
firstName,lastName,email,title,company,leadScore,Import Failure Reason
Aerys,Targaryen,Aerys@Targaryen.com,Targaryen,House Targaryen,TEXT_VALUE_IN_INTEGER_FIELD,Invalid data type in field Lead Score
```

## Warnings

The `numOfRowsWithWarning` attribute in the [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportProgramMemberStatusUsingGET) response indicates the number of rows with warnings. A value greater than zero means that warnings occurred.

Pass the `batchId` path parameter to the [Get Import Program Member Warnings](https://developer.adobe.com/marketo-apis/api/mapi#operation/getImportProgramMemberWarningsUsingGET) endpoint to retrieve the affected records and their causes.

```http
GET /bulk/v1/program/members/import/{batchId}/warnings.json
```

The endpoint returns a file that identifies each row with a warning and explains why the warning occurred. The file uses the format specified by the `format` parameter during job creation. An additional field on each record describes the warning.

For example, suppose that you import the following file with an invalid email address:

```text
firstName,lastName,email,title,company,leadScore
Aerys,Targaryen,INVALID_EMAIL,Targaryen,House Targaryen,0
```

The job status returns `numOfRowsWithWarning` as 1, indicating that a warning occurred:

```http
GET /bulk/v1/program/members/import/{batchId}/status.json
```

```json
{
   "requestId":"4ca1#16f883c2003",
   "result":[
      {
         "batchId":1041,
         "importId":"1041",
         "status":"Complete",
         "numOfLeadsProcessed":1,
         "numOfRowsFailed":0,
         "numOfRowsWithWarning":1,
         "message":"Import succeeded, 1 records imported (1 members), 1 warning."
      }
   ],
   "success":true
}
```

Retrieve the warning file for more information:

```http
GET /bulk/v1/program/members/import/{batchId}/warnings.json
```

```text
firstName,lastName,email,title,company,leadScore,Import Warning Reason
Aerys,Targaryen,INVALID_EMAIL,Targaryen,House Targaryen,0,Invalid email address
```
