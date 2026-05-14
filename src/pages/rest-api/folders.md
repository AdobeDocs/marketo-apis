---
title: Folders
description: "Marketo REST API guide for folders covering create, update, delete, query by id and name, bulk browse with root, workspace, maxDepth, and pagination."
---

# Folders

[Folders Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders)

Folders are the core organizational asset in Marketo, and every other type of asset has at least one folder as a parent. This parent folder may be either a Folder which is purely organizational, or a Program, which has a functional relationship to other asset types and can also be the parent of other assets. Folders can be created, queried, updated, and deleted through the API, and also allow a list of their contents to be retrieved. Though Programs can be returned through querying the Folders API, creating, updating, and deleting programs must be performed through the Programs API.

## Query

Querying folders follows the standard query types for assets of [by id](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderByNameUsingGET), and [browsing](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderUsingGET).

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

The type parameter is required and must be one of "Folder" or "Program."  The type dictates whether the lookup to the folder is done against a Folder ID or a Program ID. For this endpoint, only a single record is returned in the result Array. Note the `folderType` parameter in the response. This can indicate many different types of folders. Marketo Activities folders have either a type of Marketing Folder or Program, which can contain many different types of assets, while Design Studio folders have a type corresponding to the asset type which they can hold. For example, a folder with `folderType` of "Email" may contain only Emails, or other subfolders, which might have a `folderType` of Email or Email Template. Types may include:

- Email
- Email Template
- Landing Page
- Landing Page Template
- Snippet
- File

### By Name

[Querying by name](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderByNameUsingGET) is also allowed. The query by name endpoint has name as the only required parameter. Name performs an exact string match against the name field of folders in the instance, and returns results for each folder matching that name. It also has the optional query parameters of "type" which can be Folder or Program, "root" the id of the folder to search through, or "workspace" the name of the workspace to search in. If the root parameter is set, the type parameter must also be set.

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

When searching by name, it is important to note that both Marketing Activities and Design Studio are their own root folders, so they can be retrieved by name, and used to traverse the rest of the folder hierarchy in a destination instance.

### Browse

Folders can also be [retrieved in bulk](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderUsingGET). The "root" parameter can be used to specify the parent folder under which the query will be performed and is formatted as a JSON object embedded as the value for the query parameter. Root has two members:

1. id - The id of the folder or program.
1. type - Either Folder or Program, depending on the type of the root folder to browser.

If the root folder is not known, or the intent is to retrieve all folders in a given area, the root can be specified as the "Marketing Activities", "Design Studio", or "Lead Database" areas. The ids for each of these can be retrieved through the [Get Folder By Name](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/getFolderByNameUsingGET) API, and specifying the name of the desired area.

Like other bulk asset retrieval endpoints, offset and maxReturn are optional parameters for paging.   Other optional parameters are:

- workSpace - The name of the workspace to filter to.
- maxDepth - The maximum number of levels to traverse in the folder hierarchy. If set to 0, only the folder specified in root is returned. If not specified, the default value is 2.

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

Much of the folder response structure is self-explanatory, but a few fields are worth noting individually. The `folderId` and parent fields are JSON objects which include the explicit id and type of the folder itself. This type is the one which is used in queries, root, and parent parameters by the API to ensure proper delineation between Folder and Program types of folders. `folderType` reflects the usage of the folder, which may be one of "Marketing Folder," "Program," "Email," "Email Template," Landing Page," Landing Page Template," "Snippet,", "Image", "Zone", or "File."  The types Marketing Folder and Program indicate that they exist in Marketing Activities and can contain multiple types of assets. The other types indicate that they may contain only that type of asset, subfolders, and the template version of that type, if applicable. The type Zone represents root-level folders found in Marketing Activities.

The path of a folder shows its hierarchy in the folder tree, similar to a Unix-style path. The first entry in the path will always be Marketing Activities or Design Studio. If the target instance has workspaces, then the second entry in the path will be the name of the owning workspace. The `url` field shows the explicit URL of the asset in the designated instance. This is not a universal link, and must be authenticated as a user to work properly. `isSystem` indicates whether the folder is a system folder. If this is set to true, then the folder itself is read-only, though folders can be created as children of it.

## Create and Update

[Creating folders](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders/operation/createFolderUsingPOST) is simple and is executed with an application/x-www-form-urlencoded POST that has two required parameters, "name," a string, and "parent," the parent to create the folder in, which is an embedded JSON object with two members, id, and type, either Folder or Program, depending on the type of the target folder. Optionally "description," a string, can also be included and may be up to 2000 characters.

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

Updates to folders are made through a separate endpoint, and description, name, and `isArchive` are optional parameters for update. If `isArchive` is changed by an update, this results in the folder being archived, if changed to true, or unarchived, if changed to false, in the Marketo UI. Programs cannot be updated with this API.

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

Deletions can be made against single folders if they are empty, meaning that they contain no assets or subfolders. If a folder is of type Program, or has the isSystem field set to true, it cannot be deleted with this API.

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
