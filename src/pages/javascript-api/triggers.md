---
title: Triggers
description: "Use RTP triggers in Web Personalization to run functions on rtp state, including userContextReady, with syntax, parameters, and a location example."
---

# Triggers

Adds the capability to trigger functions on certain state of the global rtp object.

You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.

## Usage

`rtp('triggerName', function_to_trigger);`

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'triggerName' | Required | String | Method name. |
| function_to_trigger | Required | Function | Function to trigger. |

### User Context Ready Trigger

Sets a custom variable based on user location. This function is called when the "rtpUserContext" global object is ready.

```javascript
rtp('userContextReady', function() {
    if (rtpUserContext.location.state == 'CA') {
        rtp('set', 'custom1', 'productA');
    }
});
```
