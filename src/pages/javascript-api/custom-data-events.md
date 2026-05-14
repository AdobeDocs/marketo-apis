---
title: Custom Data Events
description: "Send custom events with the RTP JavaScript API for Web Personalization, with parameters, string or array data up to four items, and click-based triggers."
---

# Custom Data Events

This method sends custom events for tracking and real-time personalization. It can be used to send third-party data, or to trigger your own custom event based on the visitor behavior. Custom data events are counted once in a visitor's session.

You must become a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.

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

The custom data array can contain a maximum of four elements.  If you must send more than four elements, then call Send Event API repeatedly (with a maximum of four items) until all items are sent.

```javascript
var customData = {value: ['MyEvent', 'download - example whitepaper']};
rtp('send', 'event', customData);
```

### Send Event Based on Button Click

Marketo personalizes content on their website to web visitors who download a specific white paper. They do this by capturing the visitor's click the white paper download button, which sends a custom data event. RTP segments in real-time all visitors who clicked the download white paper button, showing each visitor a personalized campaign offering 2 clicks later. This is achieved by displaying another piece of content related to the white paper downloaded.

```html
<button id="download-whitepaper" onclick="rtp('send', 'event', {value :'download - example whitepaper'})">Download</button>
```
