---
title: Tags
description: "Query tag types, get allowable values by name, update or delete program tags in Marketo via REST Asset API, with request examples."
---

# Tags

[Tags Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Tags)

Tags are user-defined fields for programs. Each tag may apply to one or more program types and can be either required or optional, depending on how the tag was defined. Tags may also provide a list of allowable values which must be selected from for use.

## Query

Tags are queried with the standard asset pattern, but do not have an endpoint for By Id. The list of allowable values for a tag is only returned when the tag is queried by name.

### Get Tags

```http
GET /rest/asset/v1/tagTypes.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "1488a#1504ecfccf8",
    "result": [
        {
            "tagType": "AAA1 Required Tag Type",
            "applicableProgramTypes": "[program,email_batch,nurture,event,webinar]",
            "required": true
        },
        {
            "tagType": "AAA2 Required Event Tag Type",
            "applicableProgramTypes": "[event]",
            "required": true
        },
        {
            "tagType": "AAA3 Not Required Tag Type",
            "applicableProgramTypes": "[program,email_batch,nurture,event,webinar]",
            "required": false
        }
    ]
}
```

### By Name

```http
GET /rest/asset/v1/tagType/byName.json?name=AAA1 Required Tag Type
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "8a44#1504ed0da2f",
    "result": [
        {
            "tagType": "AAA1 Required Tag Type",
            "applicableProgramTypes": "[program,email_batch,nurture,event,webinar]",
            "required": true,
            "allowableValues": "[AAA1 RT1, AAA1 RT2, AAA1 RT3, AAA1 RT4]"
        }
    ]
}
```

## Update

The [Update Program Tag](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs/operation/updateProgramUsingPOST) endpoint allows you to update the value for a given tag type. The endpoint takes an `id` and `tagType` path parameters which specify the program id, and the tag type to update. A `tagValue` query parameter is used to specify the new value for the tag type. All parameters are required.

```http
POST /rest/asset/v1/program/{id}/tag/{tagType}.json?tagValue=David
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "fd84#17f84a885a6",
    "warnings": [],
    "result": [
        {
            "id": 1067
        }
    ]
}
```

Tags can be updated en masse using the [Update Program Metadata](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs/operation/updateProgramUsingPOST) endpoint. An example is available in the [Programs update section](programs.md#update).

## Delete

The [Delete Program Tag](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs/operation/deleteProgramUsingPOST) endpoint allows you to delete a non-required tag type. The endpoint takes `id` and `tagType` path parameters which specify the program id, and the tag type to delete.

```http
POST /rest/asset/v1/program/{id}/tag/{tagType}/delete.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "d998#17f84ad36a7",
    "warnings": [],
    "result": [
        {
            "id": 1067
        }
    ]
}
```
