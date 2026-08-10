---
title: User Context
description: "Learn how to enable and use Marketo RTP User Context API to set custom variables, read user data across visits, and track viewed and clicked campaigns."
---

# User Context

The User Context JavaScript API exposes user-level and visitor-level data across multiple sessions. Use historical behavior and data to create advanced personalization.

The API also provides custom variables for sending data and events to the RTP backend for segmentation and personalization. See the related [Triggers](../javascript-api/triggers.md) and [Pattern Match](../javascript-api/pattern-match.md) capabilities.

- You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site.
- You must ask Marketo Support to enable the User Context API. After enablement, a userContext object is exposed under the RTP global object.

## User Context Attributes

| Name | Type | Description |
| --- | --- | --- |
| `customVar[1-5]` | String | Custom data saved on user context. |
| `viewedCampaigns` | Campaign IDs as comma-separated string | Viewed campaigns in current or previous visits. |
| `clickedCampaigns` | Campaign IDs as comma-separated string | Clicked through campaigns in current or previous visits. |

## Set Custom Variables

Set custom variables to add data to User Context.

### Usage

`rtp('set', 'customVar'[1-5], my_custom_value);`

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| `'set'` | Required | String | Method action. |
| `customVar` | Required | String | Custom variable name. |
| `my_custom_value` | Required | String | Custom value to save on custom variable in index 1-5. |

Custom variables are sent to RTP only in a view call. Set custom variables before the view call. Otherwise, the variables are sent in the next view call.

Custom variables have the following restrictions:

- A custom variable cannot exceed 100 characters.
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
