---
title: Smart Campaigns
description: "Learn how to use Marketo REST APIs for Smart Campaigns, including query by id or name, browse filters, create clone delete, and schedule or request triggers"
---

# Smart Campaigns

[Smart Campaigns Endpoint Reference (Asset)](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns)

[Campaigns Endpoint Reference (Leads)](https://developer.adobe.com/marketo-apis/api/mapi#tag/Campaigns)

Use the Smart Campaign REST APIs to query, create, clone, and delete smart campaigns. You can also schedule batch campaigns, request trigger campaigns, and manage campaign activation.

## Query

Query smart campaigns [by ID](#by_id), [by name](#by_name), or by [browsing](#browse).

### By Id

The [Get Smart Campaign by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartCampaignByIdUsingGET) endpoint takes a single smart campaign `id` as a path parameter and returns a single smart campaign record.

```http
GET /rest/asset/v1/smartCampaign/{id}.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "7883#169838a32f0",
    "warnings": [],
    "result": [
        {
            "id": 1001,
            "name": "Process Bounced Emails",
            "description": "System smart campaign for processing bounced email events",
            "createdAt": "2016-09-10T23:16:19Z+0000",
            "updatedAt": "2016-09-10T23:16:19Z+0000",
            "status": "Never Run",
            "type": "batch",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": false,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 1001,
            "flowId": 1001,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1001A1"
        }
    ]
}
```

The endpoint returns one record in the first position of the `result` array.

### By Name

The [Get Smart Campaign by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartCampaignByNameUsingGET) endpoint takes a single smart campaign `name` as a parameter and returns a single smart campaign record.

```http
GET /rest/asset/v1/smartCampaign/byName.json?name=Test Trigger Campaign
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "14494#16c886ffa44",
    "warnings": [],
    "result": [
        {
            "id": 1069,
            "name": "Test Trigger Campaign",
            "description": "",
            "createdAt": "2018-02-16T01:34:39Z+0000",
            "updatedAt": "2019-08-13T00:45:21Z+0000",
            "folder": {
                "id": 327,
                "type": "Folder"
            },
            "status": "Inactive",
            "type": "trigger",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": false,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 2747,
            "flowId": 1088,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1069A1"
        }
    ]
}
```

The endpoint returns one record in the first position of the `result` array.

### Browse

The [Get Smart Campaigns](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllSmartCampaignsGET) endpoint supports optional query parameters for filtering and pagination.

The `earliestUpdatedAt` and `latestUpdatedAt` parameters accept `datetimes` in the ISO-8601 format (without milliseconds). If both are set, then earliestUpdatedAt must precede latestUpdatedAt.

The `folder` parameter specifies the parent folder to browse. Pass it as a JSON object containing `id` and `type`.

The `maxReturn` integer specifies the maximum number of entries. The default is 20, and the maximum is 200.

The `offset` integer specifies where to begin retrieving entries. Use it with `maxReturn`. The default is 0.

Set the `isActive` Boolean parameter to return only active trigger campaigns.

```http
GET /rest/asset/v1/smartCampaigns.json?earliestUpdatedAt=2016-09-10T23:15:00-00:00&latestUpdatedAt=2016-09-10T23:17:00-00:00
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "626#16983a92965",
    "warnings": [],
    "result": [
        {
            "id": 1001,
            "name": "Process Bounced Emails",
            "description": "System smart campaign for processing bounced email events",
            "createdAt": "2016-09-10T23:16:19Z+0000",
            "updatedAt": "2016-09-10T23:16:19Z+0000",
            "status": "Never Run",
            "type": "batch",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": false,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 1001,
            "flowId": 1001,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1001A1"
        },
        {
            "id": 1002,
            "name": "Process Unsubscribes",
            "description": "System smart campaign for processing unsubscribe events",
            "createdAt": "2016-09-10T23:16:19Z+0000",
            "updatedAt": "2016-09-10T23:16:19Z+0000",
            "status": "Never Run",
            "type": "batch",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": false,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 1002,
            "flowId": 1002,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1002A1"
        }
    ]
}
```

The endpoint returns one or more records in the `result` array.

## Create

Send an `application/x-www-form-urlencoded` POST request to the [Create Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/createSmartCampaignUsingPOST) endpoint. The `name` and `folder` parameters are required. Pass `folder` as a JSON object containing `id` and `type`.

Optionally, you may describe the smart campaign using the `description` parameter (maximum 2,000 characters).

```http
POST /rest/asset/v1/smartCampaigns.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=Smart Campaign 02&folder={"type": "folder","id": 640}&description=This is a smart campaign creation test.
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "25bc#16c9138f148",
    "warnings": [],
    "result": [
        {
            "id": 1076,
            "name": "Smart Campaign 02",
            "description": "This is a smart campaign creation test.",
            "createdAt": "2019-08-14T17:42:04Z+0000",
            "updatedAt": "2019-08-14T17:42:04Z+0000",
            "folder": {
                "id": 640,
                "type": "Folder"
            },
            "status": "Never Run",
            "type": "batch",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": true,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 5132,
            "flowId": 1095,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1076A1"
        }
    ]
}
```

## Update

Send an `application/x-www-form-urlencoded` POST request to the [Update Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset) endpoint. The smart-campaign `id` path parameter is required. Use `name` to change the name or `description` to change the description.

```http
POST /rest/asset/v1/smartCampaign/{id}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```sql
name=Smart Campaign 02 Update&description=This is a smart campaign update test.
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "14b6a#16c924b992f",
    "warnings": [],
    "result": [
        {
            "id": 1076,
            "name": "Smart Campaign 02 Update",
            "description": "This is a smart campaign update test.",
            "createdAt": "2019-08-14T17:42:04Z+0000",
            "updatedAt": "2019-08-14T22:42:04Z+0000",
            "folder": {
                "id": 640,
                "type": "Folder"
            },
            "status": "Never Run",
            "type": "batch",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": true,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 5132,
            "flowId": 1095,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1076A1"
        }
    ]
}
```

## Clone

Send an `application/x-www-form-urlencoded` POST request to the [Clone Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneSmartCampaignUsingPOST) endpoint. The `id`, `name`, and `folder` parameters are required. They specify the source campaign, new campaign name, and parent folder. Pass `folder` as a JSON object containing `id` and `type`.

Optionally, you may describe the smart campaign using the `description` parameter (maximum 2,000 characters).

```http
POST /rest/asset/v1/smartCampaign/{id}/clone.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=Test Trigger Campaign Clone&folder={"type": "folder","id": 640}&description=This is a smart campaign clone test.
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "681d#16c9339499b",
    "warnings": [],
    "result": [
        {
            "id": 1077,
            "name": "Test Trigger Campaign Clone",
            "description": "This is a smart campaign clone test.",
            "createdAt": "2019-08-15T03:01:41Z+0000",
            "updatedAt": "2019-08-15T03:01:41Z+0000",
            "folder": {
                "id": 640,
                "type": "Folder"
            },
            "status": "Inactive",
            "type": "trigger",
            "isSystem": false,
            "isActive": false,
            "isRequestable": false,
            "isCommunicationLimitEnabled": false,
            "recurrence": {
                "weekdayOnly": false
            },
            "qualificationRuleType": "once",
            "workspace": "Default",
            "smartListId": 5135,
            "flowId": 1096,
            "computedUrl": "https://app-sjqe.marketo.com/#SC1077A1"
        }
    ]
}
```

## Delete

The [Delete Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteSmartCampaignUsingPOST) endpoint takes a single smart campaign `id` as a path parameter.

```http
POST /rest/asset/v1/smartCampaign/{id}/delete.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "d757#16c934216ac",
    "warnings": [],
    "result": [
        {
            "id": 1077
        }
    ]
}
```

## Batch

Batch smart campaigns run at a specified time and process a defined set of leads together.

## Schedule

Use [Schedule Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/scheduleCampaignUsingPOST) to schedule a batch campaign. The campaign `id` path parameter is required. Pass the optional `tokens`, `runAt`, and `cloneToProgram` parameters in the JSON request body.

The `tokens` array overrides existing program My Tokens for this run. Marketo discards the overrides after the campaign runs. Each item contains a name/value pair, and the token name must use the `{{my.name}}` format.

The `runAt` date-time parameter specifies when to run the campaign. If omitted, the campaign runs five minutes after the request. The value cannot be more than two years in the future.

Campaigns scheduled via this API always wait a minimum of five minutes before running.

The `cloneToProgram` string parameter contains the name of a resulting program.  When set, this causes the campaign, parent program, and all of its assets to be created with the resulting new name. The parent program is cloned and the newly created campaign will be scheduled. The resulting program is created underneath the parent. Programs with snippets, push notifications, in-app messages, static lists, reports, and social assets may not be cloned in this way. When used, this endpoint is limited to 20 calls per day. The [clone program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) endpoint is the recommended alternative.

```http
POST /rest/v1/campaigns/{id}/schedule.json
```

```json
{
   "input":
      {
         "runAt": "2018-03-28T18:05:00+0000",
         "tokens": [
            {
               "name": "{{my.message}}",
               "value": "Updated message"
            },
            {
               "name": "{{my.other token}}",
               "value": "Value for other token"
            }
          ]
      }
}
```

```json
{
    "requestId": "52b#161d90e1743",
    "result": [
        {
            "id": 3713
        }
    ],
    "success": true
}
```

## Trigger

Trigger smart campaigns process one person at a time in response to an event.

### Request

Use [Request Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/triggerCampaignUsingPOST) to pass leads through a trigger campaign's flow. The campaign must use a Campaign is Requested trigger with Web Service API as its source.

The campaign `id` path parameter and a `leads` integer array of lead IDs are required. Each call accepts a maximum of 100 leads.

Optionally, the `tokens` array parameter can be used to override My Tokens local to the campaign's parent program. `tokens` accepts a maximum of 100 tokens. Each `tokens` array item contains a name/value pair. The name of the token must be formatted as "`{{my.name}}`". If you use [Add a System Token as a Link in an Email](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/using-tokens/add-a-system-token-as-a-link-in-an-email) approach to add the "viewAsWebpageLink" system token, you cannot override it using `tokens`. Instead use [Add a View as Web Page Link to an Email](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/add-a-view-as-web-page-link-to-an-email) approach which allows you to override "viewAsWebPageLink" using `tokens`.

Pass the `leads` and `tokens` parameters in the JSON request body.

```http
POST /rest/v1/campaigns/{id}/trigger.json
```

```json
{
   "input":
      {
         "leads" : [
            {
               "id" : 318592
            },
            {
               "id" : 318593
            }
         ],
         "tokens" : [
            {
               "name": "{{my.message}}",
               "value": "Updated message"
            },
            {
               "name": "{{my.other token}}",
               "value": "Value for other token"
            }
         ]
      }
}
```

```json
{
    "requestId": "9e01#161d922f1aa",
    "result": [
        {
            "id": 3712
        }
    ],
    "success": true
}
```

### Activate

The [Activate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/activateSmartCampaignUsingPOST) endpoint is straightforward. An `id` path parameter is required. For activation to succeed, the following must be true for the campaign:

- The campaign is deactivated.
- The campaign has at least one trigger and one flow step.
- The campaign has error-free triggers, filters, and flow steps.

```http
POST /rest/asset/v1/smartCampaign/{id}/activate.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "a33a#161d9c0dcf3",
    "result": [
        {
            "id": 1069
        }
    ]
}
```

### Deactivate

The [Deactivate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/deactivateSmartCampaignUsingPOST) is straightforward. An `id` path parameter is required. For deactivation to succeed, the campaign must be activated.

```http
POST /rest/asset/v1/smartCampaign/{id}/deactivate.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "6228#161d9c29fbf",
    "result": [
        {
            "id": 1069
        }
    ]
}
```
