---
title: Bulk Custom Object Extract
description: "Guide to Marketo Bulk Custom Object Extract REST APIs for exporting lead-linked custom objects with updatedAt and list filters, selected fields, and…"
---

# Bulk Custom Object Extract

[Bulk Custom Object Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects)

The Bulk Custom Object Extract REST APIs retrieve large sets of custom object records from Marketo. Use these APIs for continuous data exchange between Marketo and external systems, ETL, data warehousing, and archiving.

The API exports first-level Marketo custom object records linked directly to leads. Specify the custom object name and a list of linked leads. For each lead, the API writes matching linked custom object records as rows in the export file.

You can view custom object data in the [Custom Object tab of the lead's detail page in the Marketo UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/understanding-marketo-custom-objects).

## Permissions

The API user must have a role with the Read-Only Custom Object permission, the Read-Write Custom Object permission, or both.

## Filters

Custom object extract filters specify a list of leads linked to the custom object. If a listed lead is linked to records that match the specified custom object name, the API writes those records to the export file.

Specify only one filter type per export job.

| Filter Type | Data Type | Notes |
| --- | --- | --- |
| `updatedAt` | Date Range | Accepts a JSON object with the members `startAt` and `endAt` &nbsp.;`startAt` accepts a datetime representing the low-watermark, and `endAt` accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Jobs with this filter type return all accessible records which were updated within the date range. Datetimes should be in an ISO-8601 format, without milliseconds. |
| `staticListName` | String | Accepts the name of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list names using the Get Lists endpoint. |
| `staticListId` | Integer | Accepts the id of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list ids using the Get Lists endpoint. |
| `smartListName`* | String | Accepts the name of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list names using the Get Smart Lists endpoint. |
| `smartListId`* | Integer | Accepts the id of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list ids using the Get Smart Lists endpoint. |

Some subscriptions do not support this filter type. If it is unavailable, the Create Export Lead Job endpoint returns `1035, Unsupported filter type for target subscription`. Contact Marketo Support to request this functionality for your subscription.

## Options

The [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportCustomObjectsUsingPOST) endpoint provides options to:

- Specify the fields to include in the export file.
- Rename the exported column headers.
- Specify the export file format.

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| `fields` | Array[String] | Yes | Array of strings containing value of custom object attribute name as returned by the Describe Custom Object endpoint. The listed fields are included in the exported file. |
| `columnHeaderNames` | Object | No | A JSON object containing key-value pairs of field and column header names. The key must be the name of a field included in the export job. The value is the name of the exported column header for that field. |
| `format` | String | No | Accepts one of: CSV, TSV, SSV. The exported file is rendered as a comma-separated values, tab-separated values, or space-separated values file, respectively if set. Defaults to CSV if unset. |

## Creating a Job

Use the [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportCustomObjectsUsingPOST) endpoint to define the export job.

The request uses these parameters:

- `apiName`: Required path parameter. Specifies the Marketo custom object to export, using the name returned by the [Describe Custom Object](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_1) endpoint. CRM custom objects are not allowed.
- `filter`: Required. Specifies the linked leads by referencing a static list or smart list.
- `fields`: Required. Specifies the API names of the custom object attributes to include in the export file.
- `format`: Optional. Specifies the export file format.
- `columnHeaderNames`: Optional. Specifies replacement column header names.

This example uses a `Car` custom object with `Color`, `Make`, `Model`, and `VIN` fields. The link field is lead ID, and the deduplication field is VIN.

Custom Object Definition

![Custom Object](assets/custom-object-car.png)

Custom Object Fields

![Custom Object Fields](assets/custom-object-car-fields.png)

Call [Describe Custom Object](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_1) to inspect custom object attributes programmatically. The response returns the attributes in `fields`.

```http
GET /rest/v1/customobjects/car_c/describe.json
```

```json
{
    "requestId": "148ef#1793e00f64f",
    "result": [
        {
            "name": "car_c",
            "displayName": "Car",
            "description": "It's a car.",
            "createdAt": "2021-05-05T16:14:41Z",
            "updatedAt": "2021-05-05T16:14:42Z",
            "idField": "marketoGUID",
            "dedupeFields": [
                "vIN"
            ],
            "searchableFields": [
                [
                    "vIN"
                ],
                [
                    "marketoGUID"
                ],
                [
                    "leadID"
                ]
            ],
            "relationships": [
                {
                    "field": "leadID",
                    "type": "child",
                    "relatedTo": {
                        "name": "Lead",
                        "field": "Id"
                    }
                }
            ],
            "fields": [
                {
                    "name": "createdAt",
                    "displayName": "Created At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "marketoGUID",
                    "displayName": "Marketo GUID",
                    "dataType": "string",
                    "length": 36,
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "updatedAt",
                    "displayName": "Updated At",
                    "dataType": "datetime",
                    "updateable": false,
                    "crmManaged": false
                },
                {
                    "name": "color",
                    "displayName": "Color",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "leadID",
                    "displayName": "Lead ID",
                    "dataType": "integer",
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "make",
                    "displayName": "Make",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "model",
                    "displayName": "Model",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                },
                {
                    "name": "vIN",
                    "displayName": "VIN",
                    "dataType": "string",
                    "length": 255,
                    "updateable": true,
                    "crmManaged": false
                }
            ]
        }
    ],
    "success": true
}
```

Use the [Sync Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCustomObjectsUsingPOST) endpoint to create custom object records and link each one to a lead. A lead can be linked to multiple custom object records, creating a one-to-many relationship.

```http
POST /rest/v1/customobjects/car_c.json
```

```json
{
   "action":"createOrUpdate",
   "input":[
       {
           "leadId": 11,
           "color": "Pearl White",
           "make": "Tesla",
           "model": "Model S",
           "vIN": "5YJSA1E41FF156789"
       },
       {
           "leadId": 12,
           "color": "Midnight Silver Metallic",
           "make": "Tesla",
           "model": "Model X",
           "vIN": "LRWXB2B41FF198765"
       },
       {
           "leadId": 13,
           "color": "Fusion Red",
           "make": "Tesla",
           "model": "Roadster",
           "vIN": "SFGRC3C41FF154321"
       }
    ]
}
```

```json
{
    "requestId": "50d9#1793e066088",
    "result": [
        {
            "seq": 0,
            "marketoGUID": "d911eaa1-fd0b-4a99-9b71-c6a7233c782c",
            "status": "created"
        },
        {
            "seq": 1,
            "marketoGUID": "20d04ffb-51f0-4336-924c-c783b9bb4215",
            "status": "created"
        },
        {
            "seq": 2,
            "marketoGUID": "e7da4331-8e7a-473b-85c8-047638eb6c7f",
            "status": "created"
        }
    ],
    "success": true
}
```

The three leads in this example belong to the `Car Buyers` static list, which has an `id` of 1081. Call the [Get Leads by List Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByListIdUsingGET_1) endpoint to retrieve the list members.

```http
GET /rest/v1/lists/1081/leads.json
```

```json
{
    "requestId": "d023#1793e1e982b",
    "result": [
        {
            "id": 11,
            "firstName": "Hanna",
            "lastName": "Crawford",
            "email": "208161Hanna.Crawford@pookmail.com",
            "updatedAt": "2020-01-16T02:38:22Z",
            "createdAt": "2017-07-27T01:38:42Z"
        },
        {
            "id": 12,
            "firstName": "Bertha",
            "lastName": "Fulton",
            "email": "208160Bertha.Fulton@trashymail.com",
            "updatedAt": "2020-01-16T02:38:22Z",
            "createdAt": "2017-07-27T01:38:42Z"
        },
        {
            "id": 13,
            "firstName": "Faith",
            "lastName": "England",
            "email": "208159Faith.England@dodgit.com",
            "updatedAt": "2020-01-16T02:38:22Z",
            "createdAt": "2017-07-27T01:38:42Z"
        }
    ],
    "success": true
}
```

To retrieve these records, call the [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportCustomObjectsUsingPOST) endpoint. Specify the custom object attributes in `fields` and the static list ID in `filter`.

```http
POST /bulk/v1/customobjects/car_c/export/create.json

```

```json
{
    "fields": [
        "leadId",
        "color",
        "make",
        "model",
        "vIN"
    ],
    "filter": {
        "staticListId": 1081
    }
}
```

```json
{
    "requestId": "8d2f#1793e289e87",
    "result": [
        {
            "exportId": "f2c03f1d-226f-47c1-a557-357af8c2b32a",
            "format": "CSV",
            "status": "Created",
            "createdAt": "2021-05-05T20:12:01Z"
        }
    ],
    "success": true
}
```

The response confirms that the job is created, but the export does not start automatically. Pass `apiName` and the returned `exportId` to the [Enqueue Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/enqueueExportCustomObjectsUsingPOST) endpoint to start the job.

```http
POST /bulk/v1/customobjects/car_c/export/f2c03f1d-226f-47c1-a557-357af8c2b32a/enqueue.json
```

```json
{
    "requestId": "cfaf#1793e2a0762",
    "result": [
        {
            "exportId": "f2c03f1d-226f-47c1-a557-357af8c2b32a",
            "format": "CSV",
            "status": "Queued",
            "createdAt": "2021-05-05T20:12:01Z",
            "queuedAt": "2021-05-05T20:13:32Z"
        }
    ],
    "success": true
}
```

The enqueue response initially returns a `Queued` status. When an export slot becomes available, the status changes to `Processing`.

## Polling Job Status

You can retrieve the status only for jobs created by the same API user.

Because the export runs asynchronously, use the [Get Export Custom Object Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportCustomObjectsStatusUsingGET) endpoint to poll its progress. The status updates only once every 60 seconds, so do not poll more frequently.

The status can be `Created`, `Queued`, `Processing`, `Canceled`, `Completed`, or `Failed`.

```http
GET /bulk/v1/customobjects/{apiName}/export/{exportId}/status.json
```

```json
{
    "requestId": "14daa#1793e2cf9de",
    "result": [
        {
            "exportId": "f2c03f1d-226f-47c1-a557-357af8c2b32a",
            "format": "CSV",
            "status": "Processing",
            "createdAt": "2021-05-05T20:12:01Z",
            "queuedAt": "2021-05-05T20:13:32Z",
            "startedAt": "2021-05-05T20:14:15Z"
        }
    ],
    "success": true
}
```

This response shows that the job is still processing, so the file is not available. When the job status changes to `Completed`, the file is ready to download.

```json
{
    "requestId": "14daa#1793e2cf9de",
    "result": [
        {
            "exportId": "f2c03f1d-226f-47c1-a557-357af8c2b32a",
            "format": "CSV",
            "status": "Completed",
            "createdAt": "2021-05-05T20:12:01Z",
            "queuedAt": "2021-05-05T20:13:32Z",
            "startedAt": "2021-05-05T20:14:15Z",
            "finishedAt": "2021-05-05T20:14:28Z",
            "numberOfRecords": 3,
            "fileSize": 182,
            "fileChecksum": "sha256:fac0cabc2352229c12e18b2fde03d1f24178bc71e9e926f520ae8d61bbe98c01"
        }
    ],
    "success": true
}
```

## Retrieving Your Data

To retrieve a completed custom object export, pass `apiName` and `exportId` to the [Get Export Custom Object File](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportCustomObjectsFileUsingGET) endpoint.

The endpoint returns the file in the format configured for the job. If a requested custom object attribute contains no data, the corresponding export field contains `null`.

```http
GET /bulk/v1/customobjects/car_c/export/f2c03f1d-226f-47c1-a557-357af8c2b32a/file.json
```

```csv
leadId,color,make,model,vIN
11,Pearl White,Tesla,Model S,5YJSA1E41FF156789
12,Midnight Silver Metallic,Tesla,Model X,LRWXB2B41FF198765
13,Fusion Red,Tesla,Roadster,SFGRC3C41FF154321
```

For partial or resumable retrieval, the file endpoint supports the optional HTTP `Range` header with a range type of `bytes`. If you do not set the header, the endpoint returns the entire file. For more information, see [Bulk Extract](bulk-extract.md).

## Canceling a Job

To cancel a job that is configured incorrectly or is no longer needed, call the [Cancel Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#operation/cancelExportCustomObjectsUsingPOST) endpoint. The response status indicates that the job is canceled.

```http
POST /bulk/v1/customobjects/car_c/export/f2c03f1d-226f-47c1-a557-357af8c2b32a/cancel.json
```

```json
{
    "requestId": "e5f9#179391286a7",
    "result": [
        {
            "exportId": "4a8cdd80-0d16-4dd6-9923-6ec97e30e91b",
            "format": "CSV",
            "status": "Cancelled",
            "createdAt": "2021-05-04T20:24:33Z"
        }
    ],
    "success": true
}
```
