---
title: Bulk Custom Object Import
description: "Learn how to bulk import Marketo custom objects via REST using CSV, TSV, or SSV files."
---

# Bulk Custom Object Import

[Bulk Custom Object Import Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Custom-Objects)

When you have many custom object records to  import, it is best practice to import them asynchronously using the bulk API. This is done by importing a flat file that contains delimited records (comma, tab, or semicolon). The file can contain any number of records, provided its size is less than 10MB (otherwise an HTTP  413 status code is returned). The contents of the file depend on your custom object definition. The first row always contains a header that lists the fields to map values of each row into. All field names in header must match an API name (as discussed below). Remaining rows contain the data to import, one record per row. The record operation is "insert or update" only.

## Processing Limits

You are allowed to submit more than one bulk import request, within limits. Each request is added as a job to a FIFO queue to be processed. A maximum of two jobs are processed at the same time. A maximum of ten jobs are allowed in the queue at any given time (including the 2 currently being processed). If you exceed the ten job maximum, then a "1016, Too many imports" error is returned.

## Custom Object Example

Before using the bulk API, you must first use the Marketo Admin UI to [create your custom object](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/create-marketo-custom-objects). As an example, suppose that we created a "Car" custom object with "Color", "Make", "Model", and "VIN" fields. Below are Admin UI screens showing the custom object. You can see that we used VIN field for deduplication. The API names are highlighted because they must be used when calling bulk API-related endpoints.

![Insert Custom Object](assets/bulk-insert-co-car-1.png)

Here are the custom object fields as presented in the Admin UI.

![Insert Custom Object fields](assets/bulk-insert-co-car-fields.png)

### API Names

You can retrieve API names programmatically by passing the custom object API name to the [Describe Custom Object](#describe) endpoint.

```text
/rest/v1/customobjects/{apiName}/describe.json
```

```json
{
    "requestId": "46ff#15a686e66de",
    "result": [
        {
            "name": "car_c",
            "displayName": "Car",
            "description": "It is a car.",
            "createdAt": "2017-02-22T19:55:51Z",
            "updatedAt": "2017-02-22T19:55:51Z",
            "idField": "marketoGUID",
            "dedupeFields": [
                "vin"
            ],
            "searchableFields": [
                [
                    "vin"
                ],
                [
                    "marketoGUID"
                ]
            ],
            "fields": [
                {
                    "name": "createdAt",
                    "displayName": "Created At",
                    "dataType": "datetime",
                    "updateable": false
                },
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "Updated At",
                    "dataType": "datetime",
                    "updateable": false
                },
                {
                    "name": "color",
                    "displayName": "Color",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true
                },
                {
                    "name": "make",
                    "displayName": "Make",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true
                },
                {
                    "name": "model",
                    "displayName": "Model",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true
                },
                {
                    "name": "vin",
                    "displayName": "VIN",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true
                }
            ]
        }
    ],
    "success": true
}
```

### Import File

Now suppose that you want to import three "Car" custom object records. Using comma-delimited format (CSV), the file could look like this:

```text
color,make,model,vin
red,bmw,2002,WBA4R7C55HK895912
yellow,bmw,320i,WBA4R7C30HK896061
blue,bmw,325i,WBS3U9C52HP970604
```

Line 1 is the header, and lines 2-4 are the custom object data records.

## Creating a Job

To make the bulk import request, you must include the API name of the custom object in the path to the [Import Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Identity/operation/identityUsingPOST) endpoint. You must also include a "file" parameter that references the name of your import file, and a"format" parameter that specifies how your import file is delimited ("csv", "tsv", or "ssv").

```http
POST /bulk/v1/customobjects/{apiName}/import.json?format=csv
```

```text
Transfer-Encoding: chunked
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXjWP6BP8Ciq6bPeo
Content-Length: 290
Host: <munchkinId>.mktorest.com
```

```text
------WebKitFormBoundaryXjWP6BP8Ciq6bPeo
Content-Disposition: form-data; name="file"; filename="custom_object_import.csv"
Content-Type: text/csv

color,make,model,vin
red,bmw,2002,WBA4R7C55HK895912
yellow,bmw,320i,WBA4R7C30HK896061
blue,bmw,325i,WBS3U9C52HP970604
------WebKitFormBoundaryXjWP6BP8Ciq6bPeo--
```

```json
{
    "requestId": "c015#15a68a23418",
    "result": [
        {
            "batchId": 1013,
            "status": "Queued",
            "objectApiName": "car_c"
        }
    ],
    "success": true
}
```

In this example, we specified "csv" format and named our import file "custom_object_import.csv".

Notice in the response to our call, here is no listing of successes or failures like you would get back from Sync Custom Objects endpoint. Instead, you receive a `batchId`. This is because the call is asynchronous, and can return a `status` of "Queued", "Importing", or "Failed". You should retain the batchId so that you can get status of the import job, or retrieve failures and/or warnings upon completion. The batchId remains valid for seven days.

A simple way to replicate the bulk import request is to use curl from the command line:

```bash
curl -X POST -i -F format='csv' -F file='@custom_object_import.csv' -F access_token='<Access Token>' <REST API Endpoint URL>/bulk/v1/customobjects/car_c/import.json

```

Where the import file "custom_object_import.csv" contains the following:

```text
color,make,model,vin
red,bmw,2002,WBA4R7C55HK895912
yellow,bmw,320i,WBA4R7C30HK896061
blue,bmw,325i,WBS3U9C52HP970604
```

## Polling Job Status

Once the import job has been created, you must query its status. It is best practice to poll the import job every 5-30 seconds. Do this by passing the API name of the custom object and the `batchId` in the path to the [Get Import Custom Object Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Custom-Objects/operation/getImportCustomObjectStatusUsingGET) endpoint.

```http
GET /bulk/v1/customobjects/{apiName}/import/{batchId}/status.json
```

```json
{
    "requestId": "2a5#15a68dd9be1",
    "result": [
        {
            "batchId": 1013,
            "operation": "import",
            "status": "Complete",
            "objectApiName": "car_c",
            "numOfObjectsProcessed": 3,
            "numOfRowsFailed": 0,
            "numOfRowsWithWarning": 0,
            "importTime": "2 second(s)",
            "message": "Import succeeded, 3 records imported (3 members)"
        }
    ],
    "success": true
}
```

This response shows a completed import, but the `status` can be one of: Complete, Queued, Importing, Failed. If the job has completed, you have a listing of the number of rows processed, with failures, and with warnings. The message attribute is also a good place to look for additional job information.

## Failures

Failures are indicated by the `numOfRowsFailed` attribute in [Get Import Custom Object Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Custom-Objects/operation/getImportCustomObjectStatusUsingGET) response. If numOfRowsFailed is greater than zero, then that value indicates the number of failures that occurred. Call [Get Import Custom Object Failures](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Custom-Objects/operation/getImportCustomObjectFailuresUsingGET) endpoint to obtain a file with failure detail. Again, you must pass the custom object API name and `batchId` in the path. If no failure file exists, an HTTP 404 status code is returned.

Continuing with the example, we can force a failure by modifying the header and changing "vin" to " vin" (by adding a space between the comma and "vin").

```text
color,make,model, vin
```

When we re-import and check the status, we see this response with `numRowsFailed`: 3. This indicates three failures.

```http
GET /bulk/v1/customobjects/car_c/import/{batchId}/status.json
```

```json
{
    "requestId": "12260#15a68f491ed",
    "result": [
        {
            "batchId": 1016,
            "operation": "import",
            "status": "Complete",
            "objectApiName": "car_c",
            "numOfObjectsProcessed": 0,
            "numOfRowsFailed": 3,
            "numOfRowsWithWarning": 0,
            "importTime": "1 second(s)",
            "message": "Import completed with errors, 0 records imported (0 members), 3 failed"
        }
    ],
    "success": true
}
```

Now we make Get Import Custom Object Failures endpoint call to get additional failure detail:

```http
GET /bulk/v1/customobjects/car_c/import/{batchId}/failures.json
```

```text
color,make,model, vin,Import Failure Reason
red,bmw,2002,WBA4R7C55HK895912,missing.dedupe.fields
yellow,bmw,320i,WBA4R7C30HK896061,missing.dedupe.fields
blue,bmw,325i,WBS3U9C52HP970604,missing.dedupe.fields

```

And we can see that we are missing our deduplication field `vin`.

## Warnings

Warnings are indicated by the `numOfRowsWithWarning` attribute in Get Import Custom Object Status response. If numOfRowsWithWarning is greater than zero, then that value indicates the number of warnings that occurred. Call [Get Import Custom Object Warnings](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Custom-Objects/operation/getImportCustomObjectWarningsUsingGET) endpoint to obtain a file with warning detail. Again, you must pass the custom object API name and `batchId` in the path. If no warning file exists, an HTTP 404 status code is returned.

```http
GET /bulk/v1/customobjects/car_c/import/{batchId}/warnings.json
```
