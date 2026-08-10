---
title: Programs
description: "Marketo Programs guide for the Asset REST API covering types, channels, tags, member statuses, and endpoints to get by id or name, browse, and filter by status."
---

# Programs

[Programs Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs)

Programs organize Marketo Marketing Activities and track lead membership and success for individual marketing initiatives. A program can contain most asset types except landing pages, email templates, and files.

## Program Types

There are five core types of programs within Marketo:

- Default
- Event
- Event with Webinar
- Engagement
- Email

Engagement programs can contain every other program type. Default, Event, and Event with Webinar programs can contain only Email programs.

Every program has a channel. The channel defines the available Program Member Statuses and can be retrieved with the Get Channels API.

A program can also have tags. Tags are customizable fields that can be optional or required for a program type. Each tag uses a value from a list configured in Marketo Admin.

## Query

Query programs by ID, name, browsing, or tag type and value. Use [Get Tag Types](https://developer.adobe.com/marketo-apis/api/asset#operation/getTagTypesUsingGET) to retrieve available tags and values.

### By Id

The [Get Program by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByIdUsingGET) endpoint requires an `id` path parameter.

You can obtain the program ID from its UI URL, such as `https://app-\*\*\*.marketo.com/#PG1001A1`. In this example, the ID is `1001`, between the first and second sets of letters.

```http
GET /rest/asset/v1/program/{id}.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "948f#14db037ec71",
    "result": [
        {
            "id": 1107,
            "name": "AAA2QueryProgramName",
            "description": "AssetAPI: getProgram tests",
            "createdAt": "2015-05-21T22:45:13Z+0000",
            "updatedAt": "2015-05-21T22:45:13Z+0000",
            "url": "https://app-devlocal1.marketo.com/#PG1107A1",
            "type": "Default",
            "channel": "Online Advertising",
            "folder": {
                "type": "Folder",
                "value": 1910,
                "folderName": "ProgramQueryTestFolder"
            },
            "status": "",
            "workspace": "Default",
            "tags": [
                {
                    "tagType": "AAA1 Required Tag Type",
                    "tagValue": "AAA1 RT1"
                }
            ],
            "costs": null,
            "headStart": false
        }
    ]
}
```

### By Name

The [Get Program by Name](https://developer.adobe.com/marketo-apis/api/asset) endpoint requires a `name` query parameter. Set the optional Boolean parameters `includeTags` and `includeCosts` to return tags and costs, respectively.

```http
GET /rest/asset/v1/program/byName.json?name=TestProgramName&includeTags=true
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "16026#14db03e070c",
    "result": [
        {
            "id": 1107,
            "name": "AAA2QueryProgramName",
            "description": "AssetAPI: getProgram tests",
            "createdAt": "2015-05-21T22:45:13Z+0000",
            "updatedAt": "2015-05-21T22:45:13Z+0000",
            "url": "https://app-devlocal1.marketo.com/#PG1107A1",
            "type": "Default",
            "channel": "Online Advertising",
            "folder": {
                "type": "Folder",
                "value": 1910,
                "folderName": "ProgramQueryTestFolder"
            },
            "status": "",
            "workspace": "Default",
            "tags": [
                {
                    "tagType": "AAA1 Required Tag Type",
                    "tagValue": "AAA1 RT1"
                }
            ],
            "costs": null,
            "headStart": false
        }
    ]
}
```

### Browse

Use the [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#operation/browseProgramsUsingGET) endpoint to browse programs.

The optional `status` parameter filters Engagement and Email programs by status. Valid values are `on` and `off` for Engagement programs and `unlocked` for Email programs.

The optional `maxReturn` parameter controls the number of programs returned. The default is 20, and the maximum is 200. Use the optional `offset` parameter for pagination; its default is 0.

This endpoint does not return program tags. Retrieve tags with [Get Programs by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByIdUsingGET) or [Get Programs by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByNameUsingGET).

```http
GET /rest/asset/v1/programs.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "7a39#1511bf8a41c",
    "result": [
        {
            "id": 1035,
            "name": "clone it",
            "description": "",
            "createdAt": "2015-11-18T15:25:35Z+0000",
            "updatedAt": "2015-11-18T15:25:46Z+0000",
            "url": "https://app-devlocal1.marketo.com/#NP1035A1",
            "type": "Engagement",
            "channel": "Nurture",
            "folder": {
                "type": "Folder",
                "value": 28,
                "folderName": "Nurturing"
            },
            "status": "on",
            "workspace": "Default",
            "headStart": false
        },
        {
            "id": 1032,
            "name": "email prog",
            "description": "",
            "createdAt": "2015-11-18T14:56:28Z+0000",
            "updatedAt": "2015-11-18T14:56:28Z+0000",
            "url": "https://app-devlocal1.marketo.com/#EBP1032A1",
            "type": "Email",
            "channel": "Email Send",
            "folder": {
                "type": "Folder",
                "value": 26,
                "folderName": "Data Management"
            },
            "status": "unlocked",
            "workspace": "Default",
            "headStart": false
        }
    ]
}
```

### By Date Range

Use the `earliestUpdatedAt` and `latestUpdatedAt` parameters with [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#operation/browseProgramsUsingGET) to set low and high date-time boundaries. The endpoint returns programs created or updated within the range.

```http
GET /rest/asset/v1/programs.json?earliestUpdatedAt=2017-01-01T00:00:00-05:00&latestUpdatedAt=2017-01-30T00:00:00-05:00
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "1225a#15f82a83875",
    "warnings": [],
    "result": [
        {
            "id": 1070,
            "name": "Bulk Import - Test",
            "description": "",
            "createdAt": "2017-01-13T19:34:17Z+0000",
            "updatedAt": "2017-01-13T19:34:18Z+0000",
            "url": "https://app-abm.marketo.com/#PG1070A1",
            "type": "Default",
            "channel": "Content",
            "folder": {
                "type": "Folder",
                "value": 637,
                "folderName": "Avention"
            },
            "status": "",
            "workspace": "Default",
            "headStart": false
        },
        {
            "id": 1069,
            "name": "Program With Email",
            "description": "",
            "createdAt": "2017-01-03T22:53:14Z+0000",
            "updatedAt": "2017-01-03T22:53:15Z+0000",
            "url": "https://app-abm.marketo.com/#EBP1069A1",
            "type": "Email",
            "channel": "Email Send",
            "folder": {
                "type": "Folder",
                "value": 621,
                "folderName": "Smartling"
            },
            "status": "unlocked",
            "workspace": "Default",
            "headStart": false
        },
        {
            "id": 1071,
            "name": "Program with Guided Landing Page Template",
            "description": "",
            "createdAt": "2017-01-24T22:59:21Z+0000",
            "updatedAt": "2017-01-24T22:59:22Z+0000",
            "url": "https://app-abm.marketo.com/#PG1071A1",
            "type": "Default",
            "channel": "Content",
            "folder": {
                "type": "Folder",
                "value": 621,
                "folderName": "Smartling"
            },
            "status": "",
            "workspace": "Default",
            "headStart": false
        },
        {
            "id": 1047,
            "name": "ReachForce List Update",
            "description": "",
            "createdAt": "2016-05-24T19:38:35Z+0000",
            "updatedAt": "2017-01-13T19:28:09Z+0000",
            "url": "https://app-abm.marketo.com/#PG1047A1",
            "type": "Default",
            "channel": "Content",
            "folder": {
                "type": "Folder",
                "value": 407,
                "folderName": "Everly Tests"
            },
            "status": "",
            "workspace": "Default",
            "headStart": false
        }
    ]
}
```

### By Tag Type

The [Get Programs by Tag](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramListByTagUsingGET) endpoint returns programs that match the specified tag type and value.

The `tagType` and `tagValue` parameters are required. The optional integer `maxReturn` controls the number of programs returned; the default is 20, and the maximum is 200. Use the optional integer `offset` for pagination; its default is 0. Results are returned in random order.

```http
GET /rest/asset/v1/program/byTag.json?tagType=Presenter&tagValue=Dennis
```

```json
{
    "success" : true,
    "warnings" : [],
    "errors" : [],
    "requestId" : "13b6d#152b38d5be4",
    "result" : [{
            "id" : 1004,
            "name" : "It's a Program",
            "description" : "",
            "createdAt" : "2013-02-26T00:37:37Z+0000",
            "updatedAt" : "2013-03-11T15:32:02Z+0000",
            "url" : "https://app-sjst.marketo.com/#PG1004A1",
            "type" : "Default",
            "channel" : "Email Blast",
            "folder" : {
                "type" : "Folder",
                "value" : 38,
                "folderName" : "Test"
            },
            "status" : "",
            "workspace" : "Default",
            "tags" : [{
                    "tagType" : "Presenter",
                    "tagValue" : "Dennis"
                }
            ],
                        "headStart": false
    ]
}
```

## Create and Update

[Creating](https://developer.adobe.com/marketo-apis/api/asset#operation/createProgramUsingPOST) a program requires `folder`, `name`, `type`, and `channel`. The optional parameters are `description`, `costs`, and `tags`. Some subscriptions require tags for specific program types. Use Get Tags to check instance requirements.

When [updating](https://developer.adobe.com/marketo-apis/api/asset#operation/updateProgramUsingPOST), you can change only the description, name, `tags`, and `costs`. You can set the channel and type only during creation. Setting `costsDestructiveUpdate` to `true` clears all existing costs and replaces them with costs included in the request.

When creating or updating an Email Program, a `startDate` and `endDate` may also be passed as a UTC date/time:

`"startDate": "2022-10-19T15:00:00.000Z"`
`"endDate": "2022-10-19T15:00:00.000Z"`

### Create

```http
POST /rest/asset/v1/programs.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=API Test Program&folder={"id":1035,"type":"Folder"}&description=Sample API Program&type=Default&channel=Email Blast&costs=[{"startDate":"2015-01-01","cost":2000}]
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "d505#14d9bd96352",
    "result": [
        {
            "id": 1207,
            "name": "newProgram",
            "description": "This is a test",
            "createdAt": "2015-05-28T18:47:15Z+0000",
            "updatedAt": "2015-05-28T18:47:15Z+0000",
            "url": "https://app-devlocal1.marketo.com/#ME1207A1",
            "type": "Event",
            "channel": "channelOne",
            "folder": {
                "type": "Folder",
                "value": 59,
                "folderName": "blah blah"
            },
            "status": "",
            "workspace": "Default",
            "headStart": false
            "tags": null,
            "costs": [
                {
                    "startDate":"2015-01-01",
                    "cost":2000
                }
            ]
        }
    ]
}
```

### Update

To append program costs, add them to the `costs` array. To replace existing costs, pass the new costs and set `costsDestructiveUpdate` to `true`. To clear all costs, omit `costs` and set `costsDestructiveUpdate` to `true`.

```http
POST /rest/asset/v1/program/{id}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
description=This is an updated description&name=Updated Program Name&costs=[{"startDate":"2016-01-01","cost":200,"note":"Google Adwords"}]
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "5c37#14db05608aa",
    "result": [
        {
            "id": 1110,
            "name": "Updated Program Name",
            "description": "This is a updated description",
            "createdAt": "2015-05-21T22:45:14Z+0000",
            "updatedAt": "2015-06-01T18:13:58Z+0000",
            "url": "https://app-devlocal1.marketo.com/#NP1110A1",
            "type": "Engagement",
            "channel": "Nurture",
            "folder": {
                "type": "Folder",
                "value": 1910,
                "folderName": "ProgramQueryTestFolder"
            },
            "status": "on",
            "workspace": "Default",
            "headStart": false,
            "tags": [
                {
                    "tagType": "AAA1 Required Tag Type",
                    "tagValue": "AAA1 RT1"
                },
                {
                    "tagType": "tagTypeOne",
                    "tagValue": "tagTypeValue1"
                }
            ],
            "costs": [
                {
                    "startDate": "2016-01-01",
                    "cost": 200,
                    "note": "Google Adwords"
                }
            ]
        }
    ]
}

```

## Approval

You can approve or unapprove Email Programs remotely. An approved program runs at its `startDate` and ends at its `endDate`.

Before approval, set both dates and configure a valid, approved email and smart list in the UI.

### Approve

```http
POST /rest/asset/v1/program/{id}/approve.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "16026#150b5bf7692",
    "result": [
        {
            "id": 11062
        }
    ]
}
```

### Unapprove

```http
POST /rest/asset/v1/program/{id}/unapprove.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "16026#150b5bf7692",
    "result": [
        {
            "id": 11062
        }
    ]
}
```

## Clone

[Cloning programs](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) requires a new name and parent folder. The description is optional. The `name` must be globally unique and cannot exceed 255 characters.

Set the `folder` parameter's type attribute to `Folder`. The target folder must be in the same workspace as the source program.

You cannot use this API to clone In-App programs or programs containing push notifications, in-app messages, reports, or social assets.

```http
POST /rest/asset/v1/program/{id}/clone.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=Cloned Program - PHP&folder={"id":5562,"type":"Folder"}&description=Description
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "3a7f#14db06990cc",
    "result": [
        {
            "id": 1221,
            "name": "cloneProgram",
            "description": "This is a description for the cloned program",
            "createdAt": "2015-06-01T18:36:57Z+0000",
            "updatedAt": "2015-06-01T18:36:57Z+0000",
            "url": "https://app-devlocal1.marketo.com/#PG1221A1",
            "type": "Default",
            "channel": "Blog",
            "folder": {
                "type": "Folder",
                "value": 59,
                "folderName": "blah blah"
            },
            "status": "",
            "workspace": "Default",
            "headStart": false
            "tags": null,
            "costs": null
        }
    ]
}
```

## Delete Program

Deleting programs follows the standard asset deletion pattern.

```http
POST /rest/asset/v1/program/{id}/delete.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "16501#14db042c6b7",
    "result": [
        {
            "id": 1109
        }
    ]
}
```
