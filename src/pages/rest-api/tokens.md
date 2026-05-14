---
title: Tokens
description: "Manage Marketo My Tokens with Asset REST API. See supported data types, get by folder or program, create or update via form-encoded POST, and delete by name."
---

# Tokens

[Token Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens)

Tokens in Marketo are special strings similar to shortcodes which are replaced by a separate piece of data at run time. There are several types of tokens available in Marketo, but only My Tokens can be edited via the API. My Tokens are child tokens which are local to a particular folder or program. Tokens can be read, created, and deleted via the API.

## Data Type

Tokens can be created with the following data types:

| Type | Description |
| --- | --- |
| date | Date value of the form "yyyy-MM-dd" |
| number | An integer or floating point number |
| rich text | An HTML string |
| score | A signed 32-bit integer |
| sfdc campaign | Used in Salesforce campaign management integration |
| text | A text string |

These are the only data types that can used when creating a token via API.

## Query

[Get Tokens by Folder Id](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens/operation/getTokensByFolderIdUsingGET) takes an `id` as a path parameter of either a Program or Folder type. This type is specified by the `folderType` parameter.

```http
GET /rest/asset/v1/folder/{id}/tokens.json?folderType=Folder
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "4fbe#14e27fc9bbf",
    "result": [
        {
            "folder": {
                "type": "Folder",
                "value": 416
            },
            "tokens": [
                {
                    "name": "AprilFool - deverly",
                    "type": "date",
                    "value": "2015-04-01",
                    "computedUrl": "https://app-abm.marketo.com/#MF1047C3"
                }
            ]
        }
    ]
}

```

## Create and Update

The [Create Token](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens/operation/addTokenTOFolderUsingPOST) endpoint creates tokens, or if they exist update them with submitted values. Tokens are created in the context of a folder or a program. The required `id` path parameter is the id of the folder to which the token will be associated with. The `name`, `type`, `value`, and `folderType` are all required parameters of the token. Data is passed as POST x-www-form-urlencoded, not as JSON. The `name` field of the token may not exceed 50 characters.

```http
POST /rest/asset/v1/folder/{id}/tokens.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=April Fools&type=date&value=2015-04-01&folderType=Folder
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "e3c2#14e280db5dc",
    "result": [
        {
            "folder": {
                "type": "Folder",
                "value": 416
            },
            "tokens": [
                {
                    "name": "April Fools",
                    "type": "date",
                    "value": "2015-04-01",
                    "computedUrl": "https://app-abm.marketo.com/#MF1047C3"
                }
            ]
        }
    ]
}

```

## Delete

[Delete Token by Name](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens/operation/deleteTokenByNameUsingPOST) takes an id as a path parameter of either a Program or Folder type. This type is specified by the `folderType` parameter. Tokens are deleted based on their parent folder, the `name`, and the `type` of the token, each of which are required. Data is passed as POST x-www-form-urlencoded, not as JSON.

```http
POST /rest/asset/v1/folder/{id}/tokens/delete.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=AprilFool - deverly&type=date&folderType=Program
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "12ed2#14e2800f89c",
    "result": [
        {
            "id": 416
        }
    ]
}

```
