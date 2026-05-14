---
title: Data Streams
description: "Overview of Marketo Engage Data Streams enabling near real-time lead activity and user audit events, easing API limits for Performance Tier customers"
---

# Data Streams

<InlineAlert slots="text" variant="info" />

Current information on data streams is now found at [Using Data Streams](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-data-streams#).

Our customer's marketing organizations rely on timely and focused Marketing Campaigns to stay on top of their business and be competitive. In order to support fast paced decisions and enable strategic change at speed, it is important to have data to support and drive those key decisions that deliver focused and targeted Campaigns. There are also some customers that perform Marketing efforts at levels of their customer segments both inside and outside of Marketo Engage. To support these different efforts, Marketo has created the ability to acquire large volumes of data in near real-time thru Data Streams.

Aside from the benefit of near real-time data, there are product-related benefits:

- Relieves the bottleneck of API limits because streaming is used instead.
- Reduces the scenario of API limits, generating fewer alert messaging.
- No must perform bulk exports to extract data due to the Data Streaming capability.

Data Streams are available to those that have purchased a [Marketo Engage Performance Tier Package](https://nation.marketo.com/t5/product-documents/marketo-engage-performance-tiers/ta-p/328835).

## Lead Activity Data Stream Overview

Lead Activity Data Stream provides near real-time streaming of audit tracking Lead Activities where large volumes of Lead Activities can be sent to a customer's external system. Streams enable customers to effectively audit Lead related events, usage patterns, provide views into Lead changes and trigger processes and workflows based upon the different types of Lead Events. There are over 144 Activity Types that can be subscribed to and sent thru the stream.

Types of Lead Data Streamed:

1. Lead Changes – all changes on all fields and new Leads
1. Lead Activities – all Lead activity types described in the document
1. Deleted Leads
1. All Custom Objects on the Lead (if requested). It is all or nothing at this time.

By providing views into Lead changes, this allows customers to make faster decisions on their overall marketing strategies and create more focused targeted campaigns. Some popular use cases would be:

- Custom Alerting: When certain Leads are found with inconsistent conditions, they can be added to the list. Activity streams can pick these up and push the "Add to List" activity for customers to any follow on action.
- Powering ML Models: Some customers plan to build scoring models that use Activity insights and feed them back to Marketo or use in their own internal Scoring models as desired. By scoring a Lead, customers can then inform Marketo to add customers to Nurture campaigns increase their scoring.

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

Note that if custom objects should be streamed, it must be all of the Lead-related custom objects. There is no way at the present time to select which ones are desired.

## User Audit Data Stream Overview

User Audit Data Stream provides near real-time audit tracking of asset changes by users​. This enables a customer to effectively audit asset events, provide a view into user changes, and trigger processes or workflows based upon different types of audit events. Near real-time asset changes are sent via Adobe I/O events to a configurable endpoint. Audit events are broken down by Asset type and can subscribe to audit events that are important to them.

A good use case for subscribing to this stream would be:

- Tracking changes when using multiple Marketing Systems: There are some customers who also perform some level of marketing activities in another system such as a CRM like Salesforce and then pass the Lead to Marketo. The Lead at times gets updated and synched back and forth so it is important to track which system has made recent changes.

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

Currently, the notification center in Marketo can be configured to send notifications to an email address. Notification Data Stream enables the notifications to be sent directly to a configurable endpoint via Adobe I/O events. Notifications are provided thru the UI today and can be referenced by the orange bell in the top right of the screen and this stream takes those notifications and sends them thru a stream.

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

This section provides guidelines on what is needed, how to connect and receive streaming data for each of the streams. There is some level of coding and setup involved for each.

### Lead Activity Data Stream

The Lead Activity Stream provides near real-time streaming of Marketo Lead Activity events and sends subscribed activity type changes with configurable attributes:

- Frequency of data pushes every 2 seconds by default.
- Batches from 100 to 500 per subscription.
- Timeout for customer REST service is 20 seconds with 3 retries every 3 minutes, and auto enabled upon success. Otherwise after this, they are paused. Once its paused, the service retries every 3 minutes in an attempt to re-enable unless de-provisioned manually.
- Data retention in a queue for up to 7 days.

To implement the Lead Activity Data Stream, here are the steps for customers to follow:

1. Expose an HTTP endpoint that can receive POST requests with a JSON body from the public internet. The Activity Push Data Stream sends requests to:
1. Provide Adobe with the following:
    1. Marketo Munchkin ID for their subscription
    1. The URL of the endpoint in step 1
    1. The Activity types they wish to receive (complete list above)
    1. A means of authentication, so that the customer can verify that the requests are legitimate. Either:
        1. An identity provider URL, Client ID, and Client Secret for OAuth [Client Credentials Authentication](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
        1. An API token, which can be included in requests sent by the Lead Activity Datastream in an Authorization http header

Adobe then enables the data stream, at which point customers begin to receive data.

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

A code sample for an application that consumes the Marketo Lead Activity Data Stream can be found [here](https://github.com/ihgrant/activity-stream-consumer-example).

### User Audit Data Stream and Notification Data Stream

User Audit events are sent to Adobe IO and can be consumed by logging in with an Adobe ID. Here are the steps to follow:

1. Customers provide Adobe with the following:
    1. Adobe ID
    1. Marketo Munchkin ID for their subscription
1. Customer exposes a REST endpoint to consume events normally in the form of a webhook.
1. Once that is provided, Adobe enables the stream for the customer's subscription.
1. Customer then sets up the stream in Adobe IO (instructions to be provided)
    1. This step requires an Adobe Org
    1. Requires Adobe Org User to have Developer or System Admin Role

To setup Adobe IO, see [Setting up Marketo User Audit Data Streams with Adobe IO](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-user-audit-data-stream-setup#) in the Public Documentation section.

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
