---
title: Folders
description: "Marketo REST API guide for folders covering create, update, delete, query by id and name, bulk browse with root, workspace, maxDepth, and pagination."
---

# Folders

[Folders Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders)

Folders are the core organizational assets in Marketo. Every other asset type has at least one parent that is either a Folder or a Program. A Folder is purely organizational, while a Program has a functional relationship to other asset types and can also contain assets.

Use the Folders API to create, query, update, and delete folders or retrieve their contents. Folder queries can return Programs, but you must use the Programs API to create, update, or delete a Program.

## Query

Folders support the standard asset query patterns: [by id](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderByNameUsingGET), and by [browsing](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderUsingGET).

### By Id

```http
GET /rest/asset/v1/folder/{id}.json?type=Folder
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "1241b#14e21ca814a",
    "result": [
        {
            "name": "Social Media",
            "description": null,
            "createdAt": "2011-03-04T17:01:32Z+0000",
            "updatedAt": "2011-03-04T17:01:32Z+0000",
            "url": null,
            "folderId": {
                "id": 341,
                "type": "Folder"
            },
            "folderType": "Email",
            "parent": {
                "id": 11,
                "type": "Folder"
            },
            "path": "/Design Studio/Default/Emails/Social Media",
            "isArchive": false,
            "isSystem": false,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 341
        }
    ]
}

```

The `type` parameter is required and must be `Folder` or `Program`. It determines whether the endpoint looks up a Folder ID or a Program ID. The endpoint returns one record in the result array.

The response `folderType` identifies what the folder can contain. Marketing Activities folders have a type of Marketing Folder or Program and can contain multiple asset types. Design Studio folders have a type that corresponds to the assets they can contain. For example, an Email folder can contain emails and subfolders with a folder type of Email or Email Template.

Folder types include:

- Email
- Email Template
- Landing Page
- Landing Page Template
- Snippet
- File

### By Name

The [query by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderByNameUsingGET) endpoint requires `name`, which performs an exact match against folder names and returns every matching folder.

The endpoint also accepts these optional parameters:

- `type`: The folder type, either `Folder` or `Program`.
- `root`: The ID of the folder to search. If you set `root`, you must also set `type`.
- `workspace`: The name of the workspace to search.

```http
GET /rest/asset/v1/folder/byName.json?name=Test%2010%20-%20deverly
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "19#14e1f2f3688",
    "result": [
        {
            "name": "Test 10 - deverly",
            "description": "This is a test",
            "createdAt": "2015-06-23T06:27:04Z+0000",
            "updatedAt": "2015-06-23T06:27:04Z+0000",
            "url": "https://app-abm.marketo.com/#MF1070A1",
            "folderId": {
                "id": 454,
                "type": "FOLDER"
            },
            "folderType": "Marketing Folder",
            "parent": {
                "id": 416,
                "type": "FOLDER"
            },
            "path": "/Marketing Activities/Default/Marketing Programs - deverly/Test 10 - deverly",
            "isArchive": false,
            "isSystem": false,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 454
        }
    ]
}

```

Marketing Activities and Design Studio are root folders. Retrieve either root by name, and then use it to traverse the folder hierarchy in the destination instance.

### Browse

You can also [retrieve folders in bulk](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderUsingGET). Use the `root` parameter to specify the parent folder under which to query. Pass `root` as an embedded JSON object with two members:

1. `id`: The ID of the folder or program.
1. `type`: Either `Folder` or `Program`, depending on the root folder type.

If you do not know the root folder or want to retrieve all folders in an area, use the Marketing Activities, Design Studio, or Lead Database root. Retrieve the root ID by passing the area name to the [Get Folder By Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderByNameUsingGET) API.

As with other bulk asset retrieval endpoints, use the optional `offset` and `maxReturn` parameters for pagination. Other optional parameters are:

- `workSpace`: The name of the workspace to filter by.
- `maxDepth`: The maximum number of levels to traverse in the folder hierarchy. A value of 0 returns only the folder specified by `root`. The default is 2.

```http
GET /rest/asset/v1/folders.json?root={"id":14,"type":"Folder"}
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "9bd8#14e1f49047c",
    "result": [
        {
            "name": "Marketing Activities",
            "description": "Root node for the Marketing Activities app area",
            "createdAt": "2010-03-27T18:27:45Z+0000",
            "updatedAt": "2010-03-27T18:27:45Z+0000",
            "url": null,
            "folderId": {
                "id": 14,
                "type": "Folder"
            },
            "folderType": "Zone",
            "parent": null,
            "path": "/Marketing Activities",
            "isArchive": false,
            "isSystem": true,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 14
        },
        {
            "name": "Default",
            "description": "Root node of the Marketing activities Default",
            "createdAt": "2010-03-27T18:27:45Z+0000",
            "updatedAt": "2010-03-27T18:27:45Z+0000",
            "url": null,
            "folderId": {
                "id": 15,
                "type": "Folder"
            },
            "folderType": "Zone",
            "parent": {
                "id": 14,
                "type": "Folder"
            },
            "path": "/Marketing Activities/Default",
            "isArchive": false,
            "isSystem": true,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 15
        },
        {
            "name": "Archive",
            "description": "",
            "createdAt": "2010-03-27T18:28:17Z+0000",
            "updatedAt": "2010-03-27T18:28:17Z+0000",
            "url": "https://app-abm.marketo.com/#MF157A1",
            "folderId": {
                "id": 310,
                "type": "Folder"
            },
            "folderType": "Marketing Folder",
            "parent": {
                "id": 15,
                "type": "Folder"
            },
            "path": "/Marketing Activities/Default/Archive",
            "isArchive": false,
            "isSystem": false,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 310
        }
    ]
}

```

## Response Structure

The `folderId` and `parent` fields are JSON objects that contain the folder ID and type. The API uses this type in query, `root`, and `parent` parameters to distinguish Folder and Program folder types.

The `folderType` field describes how the folder is used. Its value can be Marketing Folder, Program, Email, Email Template, Landing Page, Landing Page Template, Snippet, Image, Zone, or File. Marketing Folder and Program exist in Marketing Activities and can contain multiple asset types. The other folder types contain only the corresponding asset type, subfolders, and the template version of that asset type when applicable. Zone represents a root-level folder in Marketing Activities.

The folder `path` shows its hierarchy as a Unix-style path. The first entry is always Marketing Activities or Design Studio. If the instance has workspaces, the second entry is the owning workspace name.

The `url` field contains the asset URL for the designated instance. It is not a universal link and requires user authentication. The `isSystem` field indicates whether the folder is a read-only system folder. You can create child folders under a system folder.

## Create and Update

To [create a folder](https://developer.adobe.com/marketo-apis/api/asset#operation/createFolderUsingPOST), send an `application/x-www-form-urlencoded` POST request with these parameters:

- `name`: Required string containing the folder name.
- `parent`: Required embedded JSON object containing `id` and `type`. The type is `Folder` or `Program`, depending on the parent.
- `description`: Optional string of up to 2000 characters.

```http
POST /rest/asset/v1/folders.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
parent={"id":416,"type":"Folder"}&name=Test 10 - deverly&description=This is a test
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "111be#14e1f193e31",
    "result": [
        {
            "name": "Test 10 - deverly",
            "description": "This is a test",
            "createdAt": "2015-06-23T06:27:04Z+0000",
            "updatedAt": "2015-06-23T06:27:04Z+0000",
            "url": "https://app-abm.marketo.com/#MF1070A1",
            "folderId": {
                "id": 454,
                "type": "FOLDER"
            },
            "folderType": "Marketing Folder",
            "parent": {
                "id": 416,
                "type": "FOLDER"
            },
            "path": "/Marketing Activities/Default/Test 10 - deverly",
            "isArchive": false,
            "isSystem": false,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 454
        }
    ]
}

```

Use the update endpoint to change the optional `description`, `name`, or `isArchive` parameters. Setting `isArchive` to `true` archives the folder in the Marketo UI. Setting it to `false` removes the folder from the archive.

You cannot update Programs with this API.

```http
POST /rest/asset/v1/folder/{id}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```sql
type=Folder&description=This is a test (update 01)
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "c5b2#14e1f3954bf",
    "result": [
        {
            "name": "Learning - deverly",
            "description": "This is a test (update 01)",
            "createdAt": "2015-03-17T00:17:02Z+0000",
            "updatedAt": "2015-06-23T07:02:07Z+0000",
            "url": "https://app-abm.marketo.com/#MF1044A1",
            "folderId": {
                "id": 407,
                "type": "FOLDER"
            },
            "folderType": "Marketing Folder",
            "parent": {
                "id": 15,
                "type": "FOLDER"
            },
            "path": "/Marketing Activities/Default/Learning - deverly",
            "isArchive": false,
            "isSystem": false,
            "accessZoneId": 1,
            "workspace": "Default",
            "id": 407
        }
    ]
}
```

### Delete

You can delete a single folder only when it contains no assets or subfolders. You cannot use this API to delete a Program or a folder whose `isSystem` field is `true`.

```http
POST /rest/asset/v1/folder/{id}/delete.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "4180#14e1f3fc017",
    "result": [
        {
            "id": 453
        }
    ]
}
```
