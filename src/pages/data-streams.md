---
title: Data Streams
description: "Overview of Marketo Engage Data Streams enabling near real-time lead activity and user audit events, easing API limits for Performance Tier customers"
---

# Data Streams

<InlineAlert slots="text" variant="info" />

Current information on data streams is now found at [Using Data Streams](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-data-streams#).

Data Streams deliver large volumes of Marketo Engage data to external systems in near real time. Use streamed data to support timely decisions, targeted campaigns, external marketing processes, and auditing.

Data Streams provide these benefits:

- Reduce reliance on rate-limited API requests.
- Reduce API-limit alerts.
- Deliver data without running bulk exports.

Data Streams are available to those that have purchased a [Marketo Engage Performance Tier Package](https://nation.marketo.com/t5/product-documents/marketo-engage-performance-tiers/ta-p/328835).

## Lead Activity Data Stream Overview

Lead Activity Data Stream sends large volumes of lead activity data to an external system in near real time. Use the stream to audit lead events and usage patterns, view lead changes, and trigger workflows from lead events.

You can subscribe to more than 144 activity types.

The stream can include:

1. Changes to all lead fields and newly created leads.
1. All documented lead activity types.
1. Deleted leads.
1. All lead custom objects, when requested. You cannot select individual custom objects.

Common use cases include:

- Custom alerting: Add leads with inconsistent conditions to a list. The stream sends the Add to List activity to a follow-up process.
- Machine-learning models: Use activity insights in external scoring models, then send scores to Marketo to influence nurture campaigns or other processes.

List of Streamed Activities:

| AchieveGoalInReferral | ClickPredictiveContent | ReceivedForwardToFriendEmail |
| --- | --- | --- |
| AddToList | ClickRTPCallToAction | ReceiveSalesEmail |
| AddToNurture | ClickSalesEmail | ReferToSocialApp |
| AddToOpportunity | ClickSharedLink | RemoveFromList |
| AddToSalesCampaign | ConvertLead | RemoveFromOpportunity |
| CallWebhook | DeleteLead | RequestCampaign |
| ChangeDataValue | DisqualifySweepstakes | SalesEmailBounced |
| ChangeLeadPartition | EarnEntryInSocialApp | SendAlert |
| ChangeNurtureCadence | EmailBounced | SendEmail |
| ChangeNurtureTrack | EmailBouncedSoft | SendSalesEmail |
| ChangeOwner | EmailDelivered | SentForwardToFriendEmail |
| ChangeProgramData | EnrichWithDataDotCom | SFDCActivity |
| ChangeProgramMemberData | EnterSweepstakes | ShareContent |
| ChangeRevenueStage | FillOutFacebookLeadAdsForm | SignUpForReferralOffer |
| ChangeRevenueStageManually | FillOutForm | SyncLeadToMicrosoft |
| ChangeScore | InterestingMoment | SyncLeadToSFDC |
| ChangeSegment | MergeLeads | UnsubscribeEmail |
| ChangeStatusInProgression | NewLead | UpdateOpportunity |
| ChangeStatusInSalesCampaign | OpenEmail | VisitWebPage |
| ClickEmail | OpenSalesEmail | VoteInPoll |
| ClickLink | PushLeadToMarketo | WinSweepstakes |

When streaming custom objects, include all lead-related custom objects. You cannot select individual custom objects.

## User Audit Data Stream Overview

User Audit Data Stream tracks user changes to assets in near real time. Use it to audit asset events, view user changes, and trigger processes from audit events.

Adobe I/O Events sends the changes to a configurable endpoint. Subscribe to the event types required for each asset type.

One use case is:

- Tracking changes across marketing systems: When a CRM or another system exchanges leads with Marketo, use audit events to identify which system made the latest change.

List of Streamed User Audit Events:

| COMPONENT | EVENT TYPE LIST |
| --- | --- |
| Default Program | clone, create, delete, edit channel, export, modify program setup, modify program token, rename |
| Email | approve, clone, create, delete, edit, move, rename, unapprove |
| Email Batch Program | approve, childUpdate, clone, create, delete, edit, edit channel, modify program schedule, modify progra setup, modify program token, rename, unapprove |
| Email Template | approve, clone, create, delete, draftCreate, draftDiscard, edit, rename, unapprove |
| Engagement Program | clone, create, delete, edit channel, modify program setup, modify program stream, modify program token, rename |
| Event Program | clone, create, delete, edit channel, modify program schedule, modify program setup, modif program token, rename |
| Folder | create, delete, edit, rename |
| Form | approve, clone, create, delete, draftCreate, edit, move, rename |
| Form -> Landing Page Form | create, clone, edit, delete, approve, rename |
| Landing Page | approve, clone, create, delete, draftDiscard, edit, rename, unapprove |
| Landing Page Template | approve, clone, create, delete, draftCreate, draftDiscard, edit, rename, unapprove |
| Smart List | clone, create, delete, edit, export, modify smart list setup, rename |
| Marketing Folder | create, edit, delete |
| Nurture Program | clone, create, delete, edit channel, modify proram setup, modify program stream, modify program token, rename |
| Segment | create, delete, edit, rename |
| Segmentation | approve, create, delete, draftCreated, draftDiscarded, rename, unapprove |
| Smart Campaign | abort, activate, clone, create, deactivate, delete, edit, modify campaign schedule, modify flow step action, modify smart list setup, move, rename |
| Snippet | approve, approve with no-draft, clone, create, delete, edit, rename, unapprove |
| Admin UI -> Launchpoint -> Integration | create, delete, edit |
| Admin UI -> User | create, edit, delete (Same for API only user) |
| Admin Login -> User | login success, login failure |
| Program -> Email Batch Program | edit (for changing selected email address) Asset API |
| Program -> Marketing Program | create, clone |

Example of User Audit Event:

```json
{
    "event_id": "a1b2c3d4-zyxw-9876-9z8y-a1b2c3d4e5f6",
    "event": {
        "specversion": "1.0",
        "id": "b77c743a-8e28-40f2-8aab-9541bbc85e68",
        "type": "com.adobe.platform.marketo.audit.user.email",
        "source": "https://www.marketo.com",
        "time": "2020-05-28T19:20:47.28Z",
        "datacontenttype": "application/json",
        "dataschema": "V1.0",
        "data": {
            "componentId": 232459,
            "componentType": "Email",
            "eventAction": "approve",
            "munchkinId": "123-ABC-456",
            "imsOrgId": "ADOBEORGID@AdobeOrg",
            "user": 253,
            "userId": "example@marketo.com"
        }
    }
}
```

## Notification Data Stream Overview

Notification Data Stream is available as part of the Performance level offerings of Marketo Engage.

The Marketo notification center can send notifications to an email address. Notification Data Stream also sends those notifications to a configurable endpoint through Adobe I/O Events. These are the same notifications available from the bell icon in the Marketo UI.

List of Notification Events:

| COMPONENT | EVENT TYPE LIST |
| --- | --- |
| Notification | campaign abort, campaign failure, nurture (program exhausted), salesforce sync failure, test group (A/B test result), web services (daily quota) |

Example of Notification Event:

```json
{
    "event_id": "a1b2c3d4-zyxw-9876-9z8y-a1b2c3d4e5f6",
    "event": {
        "specversion": "1.0",
        "type": "com.adobe.platform.marketo.notification.campaign_abort",
        "source": "https://www.marketo.com",
        "time": "2021-05-27T10:22:37.489-5:00",
        "datacontenttype": "application/json",
        "dataschema": "V1.0",
        "data": {
            "componentType": "campaign_abort",
            "subType": "user_campaign_abort",
            "eventAction": {
                "campaignId":1234,
                "userId":"example@marketo.com",
            }
            "imsOrgId":"ADOBEORGID@AdobeOrg",
            "munchkinId":"123-ABC-456"
        }
    }
}
```

## Technical Details

The following sections describe the configuration required to receive data from each stream. Each stream requires endpoint setup and integration code.

### Lead Activity Data Stream

Lead Activity Stream sends subscribed lead activity events with these service characteristics:

- Data is pushed every two seconds by default.
- Each subscription uses batches of 100–500 records.
- The customer REST service has a 20-second timeout and three retries at three-minute intervals. A successful retry automatically enables the service. After three failures, the service pauses and retries every three minutes unless manually deprovisioned.
- Queued data is retained for up to seven days.

To implement Lead Activity Data Stream:

1. Expose an HTTP endpoint that can receive POST requests with a JSON body from the public internet. The Activity Push Data Stream sends requests to:
1. Provide Adobe with the following:
    1. Marketo Munchkin ID for their subscription
    1. The URL of the endpoint in step 1
    1. The Activity types they wish to receive (complete list above)
    1. A means of authentication, so that the customer can verify that the requests are legitimate. Either:
        1. An identity provider URL, Client ID, and Client Secret for OAuth [Client Credentials Authentication](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
        1. An API token, which can be included in requests sent by the Lead Activity Datastream in an Authorization http header

Adobe enables the data stream after receiving the required information. The endpoint then begins receiving data.

UML diagram of a typical Lead Activity Data Stream call:

![Lead Activity Data Stream diagram](assets/lead-activity-data-stream.png)

Example of URL Endpoint Creation:

```javascript
/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
constexpress=require('express')
constwinston=require('winston');
constport=3000

constapp=express().use(express.json())

constlogger=winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'activity-stream-consumer-example'},
  transports: [
    // - Write all logs with level `error` and below to `error.log`
    newwinston.transports.File({filename: 'error.log',level: 'error'}),
    // - Write all logs with level `info` and below to `combined.log`
    newwinston.transports.File({filename: 'combined.log'}),
    newwinston.transports.Console({format: winston.format.simple()})
  ],
});

app.get('/',(req,res)=>{
  logger.info(JSON.stringify(req.query))
  res.sendStatus(200)
})

app.post('/',(req,res)=>{
  logger.info(JSON.stringify(req.body))
  res.sendStatus(200)
})

app.listen(port,()=>{
  logger.info(`app listening on port ${port}`)
})
```

See the [Lead Activity Data Stream consumer example](https://github.com/ihgrant/activity-stream-consumer-example) for sample application code.

### User Audit Data Stream and Notification Data Stream

User Audit events are sent through Adobe I/O. To consume them with an Adobe ID:

1. Provide Adobe with the following information:
    1. Adobe ID
    1. Marketo Munchkin ID for their subscription
1. Expose a REST endpoint, typically a webhook, to consume events.
1. After receiving the endpoint information, Adobe enables the stream for the subscription.
1. Configure the stream in Adobe I/O.
    1. This step requires an Adobe Org
    1. Requires Adobe Org User to have Developer or System Admin Role

To configure Adobe I/O, see [Setting up Marketo User Audit Data Streams with Adobe I/O](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-user-audit-data-stream-setup#).

### Setting Up The User Audit Data Stream in Marketo

The User Audit Data Stream is currently available as part of the Performance packages along with the other 3 Data Streams. For more information on the Packages, refer to the [Product Description Page](https://helpx.adobe.com/legal/product-descriptions/adobe-marketo-engage---product-description.html) for Product limits and features.

### Setting up Adobe I/O

[See Getting Started with Adobe I/O Events](https://developer.adobe.com/runtime/docs/guides/getting-started/)

For basic instructions for this use case, starting from [console.adobe.io](https://developer.adobe.com/console):

When prompted, select either **Create New Project** or **Add Event**.

### Get started with your new project

To start using Adobe services, add an API, events or runtime, view our [documentation](https://developer.adobe.com/runtime/docs/).

## Public Documentation

- [Marketo Data Streams](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-data-streams/)
- [Intro to Adobe IO Events & Webhooks](https://developer.adobe.com/events/docs/guides/)
- [Data Streams Blog](https://blog.developer.adobe.com/introducing-the-adobe-marketo-engage-data-streams-61198b567fbb)
