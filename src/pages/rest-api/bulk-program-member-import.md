---
title: Bulk Program Member Import
description: "Learn how to import program members in bulk via Marketo REST API using CSV TSV or SSV files under 10MB, queue limits, required params, and polling job status."
---

# Bulk Program Member Import

[Bulk Program Member Import Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members)

For large amounts of program member records, program members can be imported asynchronously with the [bulk API](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members). This allows you to import a list of records into Marketo using a flat file with the delimiters (comma, tab, or semi-colon). The file can contain any number of records, so long as the file totals less than 10MB in size. The record operation is "insert or update" only.

## Processing Limits

You are allowed to submit more than one bulk import request, with limitations. Each request is added as a job to a FIFO queue to be processed. A maximum of two jobs are processed at the same time. A maximum of ten jobs are allowed in the queue at any given time (including the 2 currently being processed). If you exceed the ten job maximum, then a "1016, Too many imports" error is returned.

## Import File

The first row of the file must be a header which lists the corresponding REST API names as fields to map the values of each row into. REST API names can be retrieved using [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/describeUsingGET_2) and/or [Describe Program Member](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/describeProgramMemberUsingGET) endpoints. Records can contain lead fields, custom lead fields, and custom program member fields.

A typical file would follow this basic pattern:

```text
email,firstName,lastName
test@example.com,John,Doe
```

The call itself is made using the `multipart/form-data` content-type.

This request type can be difficult to implement, so it is highly recommended that you use an existing library implementation.

## Creating a Job

The [Import Program Members](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members/operation/importProgramMemberUsingPOST) endpoint reads a file containing program member records and adds them to a program with a given status. The records can contain both lead fields and program member custom fields. All records must include the email field, which is used for deduplication purposes.

The `programId` path parameter specifies the program to which the members are added.

There are three required query parameters. The `format` parameter specifies the import file format (CSV, TSV, or SSV), the `programMemberStatus` parameter specifies the program status for the members that are being added to the program, and the `file` parameter contains the name of the import file that contains program member records.

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

Notice in the response to our call that there is a `batchId` and a `status` field for the record in the result array. Since this endpoint is asynchronous, it can return a status of Queued, Importing, or Failed. You must retain the `batchId` to get the status of the import job, and to retrieve failures and/or warnings upon completion. The `batchId` remains valid for seven days.

Using the example above, a simple way to call the endpoint is to use cURL from the command line:

```bash
curl -i -F format='csv' -F programMemberStatus='On List' -F file='@Lead-House-Lannister.csv' -F access_token='<Access Token>' <REST API Endpoint Base URL>/bulk/v1/program/{programId}/members/import.json
```

Where the import file "Lead-House-Lannister.csv" contains the following:

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

Once the import job has been created, you must query its status. It is best practice to poll the import job every 5-30 seconds. Do this by passing the `batchId` path parameter to the [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members/operation/getImportProgramMemberStatusUsingGET) endpoint.

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

This response shows a completed import. The status can be one of: Complete, Queued, Importing, Failed.

If the job has completed, you have a listing of the number of rows processed, failed, or with warnings. The message parameter may also give the failure message if status is Failed.

## Failures

Failures are indicated by the `numOfRowsFailed` attribute in [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members/operation/getImportProgramMemberStatusUsingGET) response. If numOfRowsFailed is greater than zero, then that value indicates the number of failures that occurred.

Use the Get Import Program Member Failures endpoint to retrieve records and causes of failed rows by passing the `batchId` path parameter.

```http
GET /bulk/v1/program/members/import/{batchId}/failures.json
```

The endpoint responds with a file indicating which rows failed, along with a message indicating why the record failed. The format of the file is the same as specified in `format` parameter during job creation. An additional field is appended to each record with a description of the failure.

For example, suppose that you import the following file with an invalid lead score:

```text
firstName,lastName,email,title,company,leadScore
Aerys,Targaryen,Aerys@Targaryen.com,Targaryen,House Targaryen,TEXT_VALUE_IN_INTEGER_FIELD
```

When you check the job status, you see `numOfRowsFailed` is 1 which indicates that a failure occurred:

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

Then retrieve the failures file for additional details about the failure:

```http
GET /bulk/v1/program/members/import/{batchId}/failures.json
```

```text
firstName,lastName,email,title,company,leadScore,Import Failure Reason
Aerys,Targaryen,Aerys@Targaryen.com,Targaryen,House Targaryen,TEXT_VALUE_IN_INTEGER_FIELD,Invalid data type in field Lead Score
```

## Warnings

Warnings are indicated by the `numOfRowsWithWarning` attribute in [Get Import Program Member Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members/operation/getImportProgramMemberStatusUsingGET) response. If `numOfRowsWithWarning` is greater than zero, then that value indicates the number of warnings that occurred.

Use the [Get Import Program Member Warnings](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Program-Members/operation/getImportProgramMemberWarningsUsingGET) endpoint to retrieve records and causes of warning rows by passing the `batchId` path parameter.

```http
GET /bulk/v1/program/members/import/{batchId}/warnings.json
```

The endpoint responds with a file indicating which rows produced warnings, along with a message indicating why the record produced a warning. The format of the file is the same as specified in `format` parameter during job creation. An additional field is appended to each record with a description of the warning.

For example, suppose that you import the following file with an invalid email address:

```text
firstName,lastName,email,title,company,leadScore
Aerys,Targaryen,INVALID_EMAIL,Targaryen,House Targaryen,0
```

When you check the job status, you see `numOfRowsWithWarning` is 1 which indicates that a warning occurred:

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

You then retrieve the warnings file for additional details about the warning:

```http
GET /bulk/v1/program/members/import/{batchId}/warnings.json
```

```text
firstName,lastName,email,title,company,leadScore,Import Warning Reason
Aerys,Targaryen,INVALID_EMAIL,Targaryen,House Targaryen,0,Invalid email address
```
