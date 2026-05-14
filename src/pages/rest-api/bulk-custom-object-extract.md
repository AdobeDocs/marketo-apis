---
title: Bulk Custom Object Extract
description: "Guide to Marketo Bulk Custom Object Extract REST APIs for exporting lead-linked custom objects with updatedAt and list filters, selected fields, and…"
---

# Bulk Custom Object Extract

[Bulk Custom Object Extract Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects)

The Bulk Custom Object Extract set of REST APIs provides a programmatic interface for retrieving large sets of custom object records out of Marketo. This is the recommended interface for use cases which require continuous interchange of data between Marketo and one or more external systems, for ETL, data warehousing, and archival purposes.

This API supports exporting first-level Marketo custom object records that are linked directly to a lead. Pass in the name of the custom object, and a list of leads to which the object is linked. For each lead in the list, the linked custom object records that match the specified custom object name are written as rows to the export file. Custom object data is viewable in the [Custom Object tab of the lead's detail page in the Marketo UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/understanding-marketo-custom-objects).

## Permissions

The Bulk Custom Object Extract APIs require that the API user have a role with one or both of the "Read-Only Custom Object", or "Read-Write Custom Object" permissions.

## Filters

Custom object extract supports several filter options used to specify a list of leads that are linked to the custom object. If a lead in the list is linked to custom object records that match a given custom object name, then the records are written to the export file. Only one filter type may be specified per export job.

| Filter Type | Data Type | Notes |
| --- | --- | --- |
| `updatedAt` | Date Range | Accepts a JSON object with the members `startAt` and `endAt` &nbsp.;`startAt` accepts a datetime representing the low-watermark, and `endAt` accepts a datetime representing the high-watermark. The range must be 31 days or fewer. Jobs with this filter type return all accessible records which were updated within the date range. Datetimes should be in an ISO-8601 format, without milliseconds. |
| `staticListName` | String | Accepts the name of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list names using the Get Lists endpoint. |
| `staticListId` | Integer | Accepts the id of a static list. Jobs with this filter type return all accessible records which are members of the static list at the time that the job begins processing. Retrieve static list ids using the Get Lists endpoint. |
| `smartListName`* | String | Accepts the name of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list names using the Get Smart Lists endpoint. |
| `smartListId`* | Integer | Accepts the id of a smart list. Jobs with this filter type return all accessible records which are members of the smart lists at the time that the job begins processing. Retrieve smart list ids using the Get Smart Lists endpoint. |

Filter type is unavailable for some subscriptions. If unavailable for your subscription, you receive an error when calling the Create Export Lead Job endpoint ("1035, Unsupported filter type for target subscription"). Customers may contact Marketo Support to have this functionality enabled in their subscription.

## Options

The [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/createExportCustomObjectsUsingPOST) endpoint provides several formatting options. These options give the user the ability to:

- Specify the fields to include within the exported file
- Rename column headers of these fields
- Specify the format of the exported file

| Parameter | Data Type | Required | Notes |
| --- | --- | --- | --- |
| `fields` | Array[String] | Yes | Array of strings containing value of custom object attribute name as returned by the Describe Custom Object endpoint. The listed fields are included in the exported file. |
| `columnHeaderNames` | Object | No | A JSON object containing key-value pairs of field and column header names. The key must be the name of a field included in the export job. The value is the name of the exported column header for that field. |
| `format` | String | No | Accepts one of: CSV, TSV, SSV. The exported file is rendered as a comma-separated values, tab-separated values, or space-separated values file, respectively if set. Defaults to CSV if unset. |

## Creating a Job

The parameters for the job are defined before kicking off the export using the [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/createExportCustomObjectsUsingPOST) endpoint.

The required `apiName` path parameter is the custom object name as returned by the [Describe Custom Object](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/describeUsingGET_1) endpoint. This specifies which Marketo custom object to export. CRM custom objects are not allowed. The required `filter` parameter contains the list of leads that are linked to the custom object. This can reference a static list, or a smart list. The required `fields` parameter contains the API names of the custom object attributes to include in the export file. Optionally we can define the `format` of the file, and the `columnHeaderNames`.

As an example, let's assume that we have created a custom object named "Car" with the following fields : Color, Make, Model, VIN. The link field is lead ID, and the deduplication field is VIN.

Custom Object Definition

![Custom Object](assets/custom-object-car.png)

Custom Object Fields

![Custom Object Fields](assets/custom-object-car-fields.png)

We can call [Describe Custom Object](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/describeUsingGET_1) to programmatically inspect the custom object attributes which are appear in the `fields` attribute in the response.

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

Create several custom object records and link each to a different lead using the [Sync Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/syncCustomObjectsUsingPOST) endpoint. One lead can be linked to many custom object records. This is known as a "one to many" relationship.

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

Each of the three leads referenced above belong to a static list named "Car Buyers" whose `id` is 1081 as can be seen below by calling the [Get Leads by List Id](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists/operation/getLeadsByListIdUsingGET_1) endpoint.

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

Now let's create an export job to retrieve these records. Using the [Create Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/createExportCustomObjectsUsingPOST) endpoint, we specify custom object attributes in the `fields` parameter and a static list id in the `filter` parameter.

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

This returns a status in the response indicating that the job has been created. The job has been defined and created, but it hasn't yet been kicked off. To do so, the [Enqueue Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/enqueueExportCustomObjectsUsingPOST) endpoint must be called using the `apiName`, and the `exportId` from the creation status response.

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

This responds with an initial `status` of "Queued" after which is set to "Processing" when there is an available export slot.

## Polling Job Status

Status can only be retrieved for jobs which were created by the same API user.

Since this is an asynchronous endpoint, after creating the job we must poll its status to determine its progress. Poll using the [Get Export Custom Object Job Status](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/getExportCustomObjectsStatusUsingGET) endpoint. The status is only updated once every 60 seconds, so a polling frequency lower than this is not advised, and in nearly all cases is still excessive. The status field may respond with any one of: Created, Queued, Processing, Canceled, Completed, or Failed.

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

The status endpoint responds indicating that the job is still processing, so the file is not yet available for retrieval. Once the job `status` changes to "Completed" it is available for download.

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

To retrieve the file of a completed custom object export, simply call the [Get Export Custom Object File](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/getExportCustomObjectsFileUsingGET) endpoint with your `apiName` and `exportId`.

The response contains a file formatted in the way that the job was configured. The endpoint responds with the contents of the file. If a requested custom object attribute is empty (contains no data), then `null` is placed in the corresponding field in the export file.

```http
GET /bulk/v1/customobjects/car_c/export/f2c03f1d-226f-47c1-a557-357af8c2b32a/file.json
```

```csv
leadId,color,make,model,vIN
11,Pearl White,Tesla,Model S,5YJSA1E41FF156789
12,Midnight Silver Metallic,Tesla,Model X,LRWXB2B41FF198765
13,Fusion Red,Tesla,Roadster,SFGRC3C41FF154321
```

To support partial and resumption-friendly retrieval of extracted data, the file endpoint optionally supports the HTTP header `Range` of the type `bytes`. If the header is not set, the whole of the contents will be returned. You can read more about using the Range header in Marketo [Bulk Extract](bulk-extract.md).

## Canceling a Job

If a job was configured incorrectly, or becomes unnecessary, it can be easily canceled using the [Cancel Export Custom Object Job](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Custom-Objects/operation/getExportCustomObjectsFileUsingPOST) endpoint. This responds with a `status` indicating that the job has been canceled.

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
