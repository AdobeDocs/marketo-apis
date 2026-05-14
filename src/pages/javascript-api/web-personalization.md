---
title: Web Personalization
description: "Guide to the Web Personalization JavaScript API and RTP tag, covering page view events, account setup, bot exclusions, and core and on-demand scripts"
---

# Web Personalization

The Web Personalization JavaScript API extends the platform's automated personalization capability. It allows for event tracking and dynamic customization of a webpage. Additional capabilities: [Custom Data Events](custom-data-events.md), [Dynamic Content](web-personalization.md), [Get Visitor Data](get-visitor-data.md), [Exclude Tag for Specific Bots](#exclude_tag_for_specific_bots).

- You must become a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.
- RTP does not support Account Based Marketing named account lists. ABM lists and code only pertain to the uploaded account lists (CSV files) managed within RTP.

## Tag Setup

The RTP tag should be inserted at the header of the personalized page.

```javascript
<!-- RTP tag -->
<script type='text/javascript'>
(function(c,h,a,f,e,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
c[a].p=e;c[a].a=i;var g=h.createElement("script");g.async=true;g.type="text/javascript";
g.src=f;var b=h.getElementsByTagName("script")[0];b.parentNode.insertBefore(g,b)})
(window,document,"rtp","[rtp-js-cdn-url]","[pod-url]","[accountId]");
</script>
<!-- End of RTP tag -->
```

## Account Setup

This method is called automatically on the tag level to set the relevant account id. You can set the account id when you wish to split between different domains.

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'setAccount' | Required | String | Method name. |
| accountId | Required | String | Account Id. |

```javascript
var accountId = '561-HYG-937';
rtp('setAccount', accountId);
```

## Event Sending Functions

This method sends a view event, which is used for page tracking. In the example below, the current page url is tracked as a visitor page view.

By passing the optional "page" parameter in this method, the current page can be overridden.

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'send' | Required | String | Method action. |
| 'view' | Required | String | Method name. |
| page | Optional | String | Relative path or full page URL. |

```javascript
// Example for Default Page
rtp('send', 'view');

// Example for Overriding Default Page
var page = 'my-page?param=1';
rtp('send', 'view', page);
```

## Exclude Tag for Specific Bots (User Agents)

To exclude specific browsers from sending data to the Web Personalization platform (in the case of identified bots), add the following IF statement to the tag script.

In the code example below, "Googlebot|msnbot" is used as bot examples to exclude from Web Personalization activities.

```javascript
<!-- RTP tag -->
<script type='text/javascript'>
if(navigator.userAgent.match(/.(Googlebot|msnbot)./gi) == null){
    (function(c,h,a,f,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    c[a].a=i;var g=h.createElement("script");g.async=true;g.type="text/javascript";
    g.src=f+'?rh='+c.location.hostname+'&aid='+i;var b=h.getElementsByTagName("script")[0];b.parentNode.insertBefore(g,b);
})(window,document,"rtp","//[cdn-pod-X-url]/rtp-api/v1/rtp.js","[accountId]");

    rtp('send','view');
    rtp('get', 'campaign', true);
}
</script>
<!-- End of RTP tag -->
```

## JavaScript Calls Explained

Description of JavaScript that is added to a website when using Web Personalization and Predictive Content.

### Core/Dependent JavaScript

| Name | Description | Control |
| --- | --- | --- |
| rtp.js | - | Controlled by Marketo |
| jquery.min.js | v1.8.3 | Can be disabled by contacting Marketo Customer Support |
| jquery-custom-ui-min.js | v1.9.2 | Can be disabled by contacting Marketo Customer Support |
| query-ui-1.8.17-dialog.js | v1.9.2* | Can be disabled by contacting Marketo Customer Support |

*Used only if jQuery UI is missing dialog

### On Demand JavaScript

| Name | Description | Control |
| --- | --- | --- |
| ga-integration-2.0.1.js | Used if Google Analytics/Facebook/SiteCatalyst integration is enabled | Controlled by Marketo |
| insightera-bar-2.1.js | Used if predictive content recommendation bar is enabled | Controlled by Marketo |
| froogaloop2.min.js | Used if content tracking is enabled and Vimeo player exists on page | - |
| iframe-api-v1.js | Used if content tracking is enabled and YouTube player exists on page | - |
