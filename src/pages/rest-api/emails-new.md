---
title: Emails
description: "Use the Marketo Asset REST API to query, create, update, clone, delete, approve, and inspect dependencies for email assets."
---

# Emails

[Email Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Emails_New)

Emails are asset records that define message metadata, content configuration, settings, and approval state.

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

You can retrieve email metadata by asset `id` or with the filter endpoint.

### By ID

#### Request

```http
GET /rest/asset/v2/email/{id}
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "7b3c#1900ab12cd3",
  "result": [
    {
      "id": "1017",
      "name": "Spring Launch Email",
      "description": "Main announcement email",
      "status": "draft"
    }
  ]
}
```

### Filter

The filter endpoint supports searching within a workspace and narrowing results with additional query parameters. 

`workspaceId` is required.

Supported query parameters:

| Parameter | Description |
| - | - |
| `workspaceId` | Required workspace identifier used to scope the filter request. |
| `folderId` | Filters results to a single folder. |
| `folderIds` | Repeated parameter that filters results to multiple folders. |
| `status` | Repeated parameter that filters by one or more email statuses. |
| `pageIndex` | Zero-based page index for paginated results. |
| `pageSize` | Maximum number of results to return per page. |
| `createdBy` | Filters results by the creating user. |
| `createdAtStart` | Returns assets created on or after this timestamp. |
| `createdAtEnd` | Returns assets created on or before this timestamp. |
| `modifiedBy` | Filters results by the last modifying user. |
| `modifiedAtStart` | Returns assets modified on or after this timestamp. |
| `modifiedAtEnd` | Returns assets modified on or before this timestamp. |
| `name` | Filters results by email name. |
| `sortKey` | Selects the field used to sort results. |
| `sortOrder` | Sets the sort direction. |
| `isCreatedByMe` | Limits results to assets created by the current user. |
| `isModifiedByMe` | Limits results to assets last modified by the current user. |
| `templateId` | Filters results by template identifier. |
| `scriptEngine` | Filters results by the script engine configuration. |
| `isValueNonNullable` | Filters based on whether the value is non-nullable. |
| `includeArchived` | Includes archived assets in the results. |

#### Request

```http
GET /rest/asset/v2/email/filter?workspaceId=1001&name=Spring%20Launch&status=draft&status=approved&pageIndex=0&pageSize=20
```

#### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "5dd1#1900ab13011",
  "result": [
    {
      "id": "1017",
      "name": "Spring Launch Email",
      "status": "draft"
    }
  ]
}
```

Use the `name` parameter when you need to find an email by name.

## Create

Create an email by sending a JSON payload. `name`, `appData`, and `headers` are required. `headers.subject` is required, and `appData` must include at least one of `folderId`, `workspaceId`, or `programId`.

### Request

```http
POST /rest/asset/v2/email
Content-Type: application/json
```

```json
{
  "name": "Spring Launch Email",
  "description": "Main announcement email",
  "appData": {
    "workspaceId": "1001",
    "folderId": "2002",
    "editorType": "email"
  },
  "headers": {
    "subject": "Introducing the Spring Launch",
    "fromName": "Marketing Team",
    "fromEmail": "marketing@example.com",
    "replyEmail": "reply@example.com",
    "preheader": "See what changed this quarter",
    "ccEmails": [
      "owner@example.com"
    ]
  },
  "settings": {
    "isOperational": false,
    "isTextOnly": false,
    "isWebPageView": true,
    "enableUrlTracking": true
  },
  "templateId": "3003"
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "238c#1900ab1313f",
  "result": [
    {
      "id": "1017",
      "name": "Spring Launch Email",
      "status": "draft"
    }
  ]
}
```

The request body may also include `data`, `editorContext`, `themeId`, `appType`, and `status`.

### Create Fields

* `appData` identifies where the email is created and how it is edited.
* `headers` contains the message header values, including subject, sender, reply address, preheader, and optional CC recipients.
* `settings` controls operational and rendering behavior such as text-only mode, web page view, and URL tracking.
* `templateId` identifies the email template used when the email is created.

## Update

Update an email by asset id. The request body uses the `UpdateEmailRequest` schema, and all properties are optional, so you can send only the fields you want to change.

### Request

```http
POST /rest/asset/v2/email/{id}/update
Content-Type: application/json
```

```json
{
  "description": "Updated announcement email",
  "headers": {
    "subject": "Spring Launch Is Live",
    "preheader": "Read the latest release notes"
  },
  "settings": {
    "enableUrlTracking": true,
    "isWebPageView": true
  }
}
```

### Response

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "9fd3#1900ab13210",
  "result": [
    {
      "id": "1017"
    }
  ]
}
```

## Manage State

Emails use a draft and approved lifecycle. Use the state transition endpoint to approve an email, unapprove it, discard a draft, or create a new draft.

Valid `action` values are:

* `approve`
* `unapprove`
* `discard`
* `create_draft`

### Request

```http
POST /rest/asset/v2/email/state/transition
Content-Type: application/json
```

### Response

```json
{
  "contentId": "1017",
  "action": "approve"
}
```

## Clone

Use the clone endpoint to create a copy of an existing email.

### Request

```http
POST /rest/asset/v2/email/clone
Content-Type: application/json
```

### Response

```json
{
  "assetId": "1017",
  "newAsset": {
    "name": "Spring Launch Email Copy",
    "description": "Cloned from Spring Launch Email"
  }
}
```

## Delete

Delete an email by asset id.

### Request

```http
POST /rest/asset/v2/email/{id}/delete
Content-Type: application/json
```

This endpoint takes the asset `id` in the path and does not define a request body.

## Used By

Use the `usedby` endpoint to retrieve assets that reference a given email.

### Request

```http
POST /rest/asset/v2/email/usedby
Content-Type: application/json
```

### Response

```json
{
  "assetId": "1017",
  "pageIndex": 0,
  "pageSize": 20,
  "type": "all"
}
```

## Notes

Query endpoints return metadata for the asset. Use the endpoint reference for the full schema of available fields and any environment-specific properties.
