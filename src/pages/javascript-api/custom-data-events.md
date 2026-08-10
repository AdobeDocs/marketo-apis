---
title: Custom Data Events
description: "Send custom events with the RTP JavaScript API for Web Personalization, with parameters, string or array data up to four items, and click-based triggers."
---

# Custom Data Events

Use this method to send custom events for tracking and real-time personalization. You can send third-party data or trigger a custom event based on visitor behavior.

Each custom data event is counted once during a visitor's session.

You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| `send` | Required | String | Method action. |
| `event` | Required | String | Method name. |
| `customData` | Required | String or Array | Custom data. |

## Examples

### Send Event using String for Custom Data

```javascript
var customData = {value: 'MyEvent'};
rtp('send', 'event', customData);
```

### Send Event using Array of Strings for Custom Data

The custom data array can contain up to four elements. To send more than four elements, call the Send Event API repeatedly with no more than four items in each call.

```javascript
var customData = {value: ['MyEvent', 'download - example whitepaper']};
rtp('send', 'event', customData);
```

### Send Event Based on Button Click

This example sends a custom data event when a visitor selects the button to download a specific white paper. RTP can use the event to segment those visitors in real time.

The website can then display a personalized campaign after two more clicks. For example, the campaign can present another piece of content related to the downloaded white paper.

```html
<button id="download-whitepaper" onclick="rtp('send', 'event', {value :'download - example whitepaper'})">Download</button>
```
