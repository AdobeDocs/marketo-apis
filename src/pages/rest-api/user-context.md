---
title: User Context
description: "Learn how to enable and use Marketo RTP User Context API to set custom variables, read user data across visits, and track viewed and clicked campaigns."
---

# User Context

User Context JavaScript API exposes user and visitor level data across multiple sessions to enable advanced personalization capability using historical user behavior and data. The API goes beyond data read and exposes custom variables that allow you to push meaningful data and events to the RTP backend for advanced segmentation and personalization purposes. Additional capabilities: [Triggers](../javascript-api/triggers.md), [Pattern Match](../javascript-api/pattern-match.md).

- You must become a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.
- The User Context API is a feature that must be enabled by Marketo Support upon request. When the API is enabled, a userContext object under the RTP global object will be exposed.

## User Context Attributes

| Name | Type | Description |
| --- | --- | --- |
| `customVar[1-5]` | String | Custom data saved on user context. |
| `viewedCampaigns` | Campaign IDs as comma-separated string | Viewed campaigns in current or previous visits. |
| `clickedCampaigns` | Campaign IDs as comma-separated string | Clicked through campaigns in current or previous visits. |

## Set Custom Variables

Adding custom data to User Context.

### Usage

`rtp('set', 'customVar'[1-5], my_custom_value);`

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| `'set'` | Required | String | Method action. |
| `customVar` | Required | String | Custom variable name. |
| `my_custom_value` | Required | String | Custom value to save on custom variable in index 1-5. |

Note: Custom variables are sent to RTP only in view call, so it is recommended to set custom variables before view is called. Otherwise, it will be sent only in next view call.

Custom Var Restrictions

- Custom variable length cannot be longer than 100 characters.
- Campaign data is limited to the last ten visits with ten campaigns per visit.

### Usage

`rtp('set', 'customVar', 'A');`

```javascript
// Set and get customVars
rtp('set', 'customVar1', 'foo');

// Read location
if (rtp.userContext.location.state == 'CA')  {
    // Do something
}

// Check if user viewed campaign id 45:
// The campaign id is exposed in the RTP UI when hovering over a campaign name.
if (rtp.userContext.viewedCampaign('45')) {
    // Do something
}
```
