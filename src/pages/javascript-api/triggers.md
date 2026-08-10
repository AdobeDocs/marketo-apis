---
title: Triggers
description: "Use RTP triggers in Web Personalization to run functions on rtp state, including userContextReady, with syntax, parameters, and a location example."
---

# Triggers

Triggers run functions when the global `rtp` object reaches a specified state.

You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.

## Usage

`rtp('triggerName', function_to_trigger);`

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'triggerName' | Required | String | Method name. |
| function_to_trigger | Required | Function | Function to trigger. |

### User Context Ready Trigger

The `userContextReady` trigger calls a function when the global `rtpUserContext` object is ready. The following example sets a custom variable based on the user's location.

```javascript
rtp('userContextReady', function() {
    if (rtpUserContext.location.state == 'CA') {
        rtp('set', 'custom1', 'productA');
    }
});
```
