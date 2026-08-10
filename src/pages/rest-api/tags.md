---
title: Tags
description: "Query tag types, get allowable values by name, update or delete program tags in Marketo via REST Asset API, with request examples."
---

# Tags

[Tags Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Tags)

Tags are user-defined fields for programs. A tag can apply to one or more program types and can be required or optional. A tag can also define a list of allowable values that users must select from.

## Query

Query tags with the standard asset pattern. Tags do not have a By Id endpoint. To retrieve the allowable values for a tag, query the tag by name.

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

Use the [Update Program Tag](https://developer.adobe.com/marketo-apis/api/asset#operation/updateProgramUsingPOST) endpoint to update the value for a tag type. All parameters are required:

- The `id` path parameter specifies the program id.
- The `tagType` path parameter specifies the tag type to update.
- The `tagValue` query parameter specifies the new value.

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

To update multiple tags, use the [Update Program Metadata](https://developer.adobe.com/marketo-apis/api/asset#operation/updateProgramUsingPOST) endpoint. See the example in the [Programs update section](programs.md#update).

## Delete

Use the [Delete Program Tag](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteProgramUsingPOST) endpoint to delete a non-required tag type. The `id` path parameter specifies the program id, and the `tagType` path parameter specifies the tag type to delete.

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
