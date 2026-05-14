---
title: Email Templates
description: "Use the Marketo Asset REST API to query, create, update, clone, delete, approve, and inspect dependencies for email templates."
---

# Email Templates

[Email Template Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Email-Templates)

Email templates define the structure and reusable layout used when creating emails.

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

You can retrieve email template metadata by asset id or with the filter endpoint.

### By ID

#### Request

```http
GET /rest/asset/v2/emailtemplate/{id}
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "14f9e#1900ab14001",
  "result": [
    {
      "id": "19",
      "name": "Base Newsletter Template",
      "description": "Core responsive template",
      "status": "draft"
    }
  ]
}
```

### Filter

The filter endpoint supports searching within a workspace and narrowing results with additional query parameters. `workspaceId` is required.

Supported filters include `folderId`, repeated `folderIds`, repeated `status`, `pageIndex`, `pageSize`, `createdBy`, `createdAtStart`, `createdAtEnd`, `modifiedBy`, `modifiedAtStart`, `modifiedAtEnd`, `name`, `sortKey`, `sortOrder`, `isCreatedByMe`, `isModifiedByMe`, `scriptEngine`, `isValueNonNullable`, and `includeArchived`.

#### Request

```http
GET /rest/asset/v2/emailtemplate/filter?workspaceId=1001&name=Newsletter&pageIndex=0&pageSize=20
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "33c4#1900ab1402f",
  "result": [
    {
      "id": "19",
      "name": "Base Newsletter Template",
      "status": "draft"
    }
  ]
}
```

Use the `name` parameter when you need to find a template by name.

## Create

Create an email template by sending a JSON payload. `name` and `appData` are required. `appData` must include at least `folderId` or `workspaceId`.

### Request

```http
POST /rest/asset/v2/emailtemplate
Content-Type: application/json
```

```json
{
  "name": "Base Newsletter Template",
  "description": "Core responsive template",
  "appData": {
    "workspaceId": "1001",
    "folderId": "15",
    "editorType": "emailTemplate"
  },
  "themeId": "42"
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "a99f#1900ab1407e",
  "result": [
    {
      "id": "1022",
      "name": "Base Newsletter Template",
      "status": "draft"
    }
  ]
}
```

The request body may also include `data`, `editorContext`, `appType`, and `status`.

### Create Fields

`appData` identifies where the template is stored and how it is edited.

`themeId` can be used to associate a theme with the template when applicable.

## Update

Update a template by asset id.

### Request

```http
POST /rest/asset/v2/emailtemplate/{id}/update
Content-Type: application/json
```

```json
{
  "name": "Base Newsletter Template v2",
  "description": "Updated responsive template",
  "appData": {
    "folderId": "15"
  }
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "cf10#1900ab140b3",
  "result": [
    {
      "id": "1022"
    }
  ]
}
```

## Manage State

Email templates use a draft and approved lifecycle. Use the state transition endpoint to approve a template, unapprove it, discard a draft, or create a new draft.

Valid `action` values are:

- `approve`
- `unapprove`
- `discard`
- `create_draft`

### Request

```http
POST /rest/asset/v2/emailtemplate/state/transition
Content-Type: application/json
```

### Response

```json
{
  "contentId": "1022",
  "action": "approve"
}
```

## Clone

Use the clone endpoint to create a copy of an existing template.

### Request

```http
POST /rest/asset/v2/emailtemplate/clone
Content-Type: application/json
```

### Response

```json
{
  "assetId": "1022",
  "newAsset": {
    "name": "Base Newsletter Template Copy",
    "description": "Cloned template"
  }
}
```

## Delete

Delete a template by asset id.

### Request

```http
POST /rest/asset/v2/emailtemplate/{id}/delete
Content-Type: application/json
```

This endpoint takes the template id in the path and does not define a request body.

## Used By

Use the `usedby` endpoint to retrieve assets that reference a given template.

### Request

```http
POST /rest/asset/v2/emailtemplate/usedby
Content-Type: application/json
```

### Response

```json
{
  "assetId": "1022",
  "pageIndex": 0,
  "pageSize": 20,
  "type": "all"
}
```

## Notes

Query endpoints return metadata for the asset. Use the endpoint reference for the full response schema and any environment-specific properties.
