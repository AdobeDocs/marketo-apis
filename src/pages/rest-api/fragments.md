---
title: Fragments
description: "Use the Marketo Asset REST API to query, create, update, clone, delete, approve, and inspect dependencies for fragments."
---

# Fragments

Fragments are reusable content assets that can be referenced by other assets, such as emails.

## Access

The endpoints described in this article require an access token:

```text
?access_token=<access_token>
```

Requests also require the `x-app-type` header:

```text
x-app-type: <app-type>
```

## Query

You can retrieve fragment metadata by asset id or with the filter endpoint.

### By ID

#### Request

```http
GET /rest/asset/v2/fragment/{id}
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "fa0f#1900ab15001",
  "result": [
    {
      "id": "83",
      "name": "Hero Banner Fragment",
      "description": "Reusable hero block",
      "status": "approved"
    }
  ]
}
```

### Filter

The filter endpoint supports searching within a workspace and narrowing results with additional query parameters. `workspaceId` is required.

todo: make this a table
Supported filters include `folderId`, repeated `folderIds`, repeated `status`, `pageIndex`, `pageSize`, `createdBy`, `createdAtStart`, `createdAtEnd`, `modifiedBy`, `modifiedAtStart`, `modifiedAtEnd`, `name`, `fragmentType`, `sortKey`, `sortOrder`, `isCreatedByMe`, `isModifiedByMe`, `scriptEngine`, `isValueNonNullable`, and `includeArchived`.

#### Request

```http
GET /rest/asset/v2/fragment/filter?workspaceId=1001&fragmentType=email&pageIndex=0&pageSize=20
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "f9cc#1900ab1504a",
  "result": [
    {
      "id": "83",
      "name": "Hero Banner Fragment",
      "status": "approved"
    }
  ]
}
```

Use the `name` parameter when you need to find a fragment by name.

## Create

Create a fragment by sending a JSON payload. `name`, `appData`, and `settings` are required. `settings` must include `fragmentType` and `supportedChannels`.

### Request

```http
POST /rest/asset/v2/fragment
Content-Type: application/json
```

```json
{
  "name": "Hero Banner Fragment",
  "description": "Reusable hero block",
  "appData": {
    "workspaceId": "1001",
    "folderId": "395",
    "editorType": "fragment"
  },
  "settings": {
    "fragmentType": "email",
    "fragmentSubType": "html",
    "supportedChannels": [
      "email"
    ]
  }
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "bd57#1900ab1509d",
  "result": [
    {
      "id": "13",
      "name": "Hero Banner Fragment",
      "status": "draft"
    }
  ]
}
```

The request body may also include `data`, `editorContext`, `themeId`, `appType`, and `status`.

### Create Fields

* `appData` identifies where the fragment is stored and how it is edited.
* `settings.fragmentType` identifies the fragment category, such as an email fragment.
* `settings.fragmentSubType` can be used to further define the fragment format.
* `settings.supportedChannels` lists the channels where the fragment can be used.

## Update

Update a fragment by asset id.

### Request

```http
POST /rest/asset/v2/fragment/{id}/update
Content-Type: application/json
```

```json
{
  "name": "Hero Banner Fragment v2",
  "description": "Updated reusable hero block",
  "settings": {
    "fragmentSubType": "html",
    "supportedChannels": [
      "email"
    ]
  }
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "73d9#1900ab150f0",
  "result": [
    {
      "id": "13"
    }
  ]
}
```

## Manage State

Fragments use a draft and approved lifecycle. Use the state transition endpoint to approve a fragment, unapprove it, discard a draft, or create a new draft.

Valid `action` values are:

* `approve`
* `unapprove`
* `discard`
* `create_draft`

### Request

```http
POST /rest/asset/v2/fragment/state/transition
Content-Type: application/json
```

### Response

```json
{
  "contentId": "13",
  "action": "approve"
}
```

## Clone

Use the clone endpoint to create a copy of an existing fragment.

### Request

```http
POST /rest/asset/v2/fragment/clone
Content-Type: application/json
```

### Response

```json
{
  "assetId": "13",
  "newAsset": {
    "name": "Hero Banner Fragment Copy",
    "description": "Cloned fragment"
  }
}
```

## Delete

Delete a fragment by asset id.

### Request

```http
POST /rest/asset/v2/fragment/{id}/delete
Content-Type: application/json
```

This endpoint takes the fragment id in the path and does not define a request body.

## Used By

Use the `usedby` endpoint to retrieve assets that reference a given fragment.

### Request

```http
POST /rest/asset/v2/fragment/usedby
Content-Type: application/json
```

### Response

```json
{
  "assetId": "13",
  "pageIndex": 0,
  "pageSize": 20,
  "type": "all"
}
```
