---
title: Smart Campaigns
description: "Learn how to use Marketo REST APIs for Smart Campaigns, including query by id or name, browse filters, create clone delete, and schedule or request triggers"
---

# Smart Campaigns

[Smart Campaigns Endpoint Reference (Asset)](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns)

[Campaigns Endpoint Reference (Leads)](https://developer.adobe.com/marketo-apis/api/mapi#tag/Campaigns)

Marketo offers a set of REST APIs for performing operations on smart campaigns. These APIs follow the standard interface pattern for asset APIs providing query, create, clone, and delete options. Also, you can manage smart campaign execution by scheduling batch campaigns or requesting trigger campaigns.

## Query

Querying smart campaigns follows the standard query types for assets of [by id](#by_id), [by name](#by_name), and [browsing](#browse).

### By Id

The [Get Smart Campaign by ID](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/getSmartCampaignByIdUsingGET) endpoint takes a single smart campaign `id` as a path parameter and returns a single smart campaign record.

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

With this endpoint, there will always be a single record in the first position of the `result` array.

### By Name

The [Get Smart Campaign by Name](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/getSmartCampaignByNameUsingGET) endpoint takes a single smart campaign `name` as a parameter and returns a single smart campaign record.

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

With this endpoint, there will always be a single record in the first position of the `result` array.

### Browse

The [Get Smart Campaigns](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/getAllSmartCampaignsGET) endpoint works like other Asset API browse endpoints and allows several optional query parameters to specify filtering criteria.

The `earliestUpdatedAt` and `latestUpdatedAt` parameters accept `datetimes` in the ISO-8601 format (without milliseconds). If both are set, then earliestUpdatedAt must precede latestUpdatedAt.

The `folder` parameter specifies the parent folder to browse under. The format is JSON block containing `id` and `type` attributes.

The `maxReturn` parameter is an integer that specifies the maximum number of entries to return. Default is 20. Maximum is 200.

The `offset` parameter is an integer that specifies where to begin retrieving entries. Can be used on conjunction with `maxReturn`. Default is 0.

The `isActive` parameter is a boolean that specifies to return only active Trigger campaigns.

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

With this endpoint, there will be one or more records in the `result` array.

## Create

The [Create Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/createSmartCampaignUsingPOST) endpoint is executed with an application/x-www-form-urlencoded POST with two required parameters. The `name` parameter specifies the name of the smart campaign to create. The `folder` parameter specifies the parent folder where the smart campaign is created. The format is JSON block containing `id` and `type` attributes.

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

The [Update Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset) endpoint is executed with an application/x-www-form-urlencoded POST. It takes a single smart campaign `id` as a path parameter. You can use the `name` parameter to update the name of the smart campaign, or the `description` parameter to update the description of the smart campaign.

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

The [Clone Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#tag/Sales-Persons/operation/describeUsingGET_5) endpoint is executed with an application/x-www-form-urlencoded POST with three required parameters. It takes an `id` parameter that specifies the smart campaign to clone, a `name` parameter that specifies the name of new smart campaign, and a `folder` parameter to specify the parent folder where the new smart campaign is created. The format is JSON block containing `id` and `type` attributes.

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

The [Delete Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/deleteSmartCampaignUsingPOST) endpoint takes a single smart campaign `id` as a path parameter.

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

Batch smart campaigns launch at a specific time and affect a specific set of leads all at once.

## Schedule

Use the [Schedule Campaign](https://developer.adobe.com/marketo-apis/api/mapi#tag/Campaigns/operation/scheduleCampaignUsingPOST) endpoint to schedule a batch campaign to run either immediately or at a future date. The campaign `id` is a required path parameter. Optional parameters are `tokens`, `runAt`, and `cloneToProgram` which are passed in the request body as application/json.

The tokens array parameter is an array of My Tokens which override existing program tokens. After the campaign runs, the tokens are discarded.  Each token array item contains name/value pairs. The name of the token must be formatted as "`{{my.name}}`".

The runAt datetime parameter specifies when to run the campaign. If not specified, the campaign will be run 5 minutes after the endpoint has been called. The datetime value cannot be more than two years into the future.

Campaigns scheduled via this API always wait a minimum of five minutes before running.

The `cloneToProgram` string parameter contains the name of a resulting program.  When set, this causes the campaign, parent program, and all of its assets to be created with the resulting new name. The parent program is cloned and the newly created campaign will be scheduled. The resulting program is created underneath the parent. Programs with snippets, push notifications, in-app messages, static lists, reports, and social assets may not be cloned in this way. When used, this endpoint is limited to 20 calls per day. The [clone program](https://developer.adobe.com/marketo-apis/api/asset#tag/Sales-Persons/operation/describeUsingGET_5) endpoint is the recommended alternative.

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

Trigger smart campaigns affect one person at a time based on a triggered event.

### Request

Use the [Request Campaign](https://developer.adobe.com/marketo-apis/api/mapi#tag/Campaigns/operation/triggerCampaignUsingPOST) endpoint to pass a set of leads to a trigger campaign to run through the campaign's flow. The campaign must have a "Campaign is Requested" trigger with "Web Service API" as the source.

This endpoint requires a campaign `id` as a path parameter, and a `leads` integer array parameter containing lead ids . A maximum of 100 leads is allowed per call.

Optionally, the `tokens` array parameter can be used to override My Tokens local to the campaign's parent program. `tokens` accepts a maximum of 100 tokens. Each `tokens` array item contains a name/value pair. The name of the token must be formatted as "`{{my.name}}`". If you use [Add a System Token as a Link in an Email](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/using-tokens/add-a-system-token-as-a-link-in-an-email) approach to add the "viewAsWebpageLink" system token, you cannot override it using `tokens`. Instead use [Add a View as Web Page Link to an Email](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/add-a-view-as-web-page-link-to-an-email) approach which allows you to override "viewAsWebPageLink" using `tokens`.

The `leads` and `tokens` parameters are passed in the request body as application/json.

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

The [Activate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/activateSmartCampaignUsingPOST) endpoint is straightforward. An `id` path parameter is required. For activation to succeed, the following must be true for the campaign:

- Must be deactivated
- Must have at least one trigger, and one flow step
- Must have error free triggers, filters, and flow steps

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

The [Deactivate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns/operation/deactivateSmartCampaignUsingPOST) is straightforward. An `id` path parameter is required. For deactivation to succeed, the campaign must be activated.

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
