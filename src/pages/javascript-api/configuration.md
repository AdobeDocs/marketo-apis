---
title: Configuration
description: "Configure Marketo Munchkin with the JavaScript API. Learn Munchkin.init settings like altIds, anonymizeIP, asyncOnly, cookie life, domainLevel, Beacon API."
---

# Configuration

Munchkin can accept various configuration settings to customize behavior. Configuration settings are properties of a JavaScript object that is passed as the second parameter when calling [Munchkin.init()](api-reference.md#munchkin_init)

```json
Munchkin.init("AAA-BBB-CCC", {
        "configName":"configValue",
        "configName2":"configValue2"
    }
);
```

The configuration settings object can contain any number of properties from the table below.

## Properties

| Name | Data Type | Description |
| --- | --- | --- |
| altIds | Array | Accepts an array of Munchkin ID strings. When enabled, this duplicates all Web Activity to the targeted subscriptions, based on their Munchkin ID. |
| anonymizeIP | Boolean | Anonymizes the IP address recorded in Marketo for new visitors. |
| apiOnly | Boolean | If set to true, then `Munchkin.Init()` function will not call `visitsWebPage`. This is useful for single-page web applications that need full control over every `visitsWebPage` event. |
| asyncOnly | Boolean | If set to true, sends the XMLHttpRequest's asynchronously. Default is false. |
| clickTime | Integer | Sets amount of time to block after a click to allow for click tracking request (in milliseconds). Reducing this reduces accuracy of click-tracking. Default is 350 ms. |
| cookieAnon | Boolean | If set to false, prevents tracking and cookie creation of new anonymous leads. Leads have cookies and are tracked after filling out a Marketo form, or by clicking through from a Marketo Email. Default is true. |
| cookieLifeDays | Integer | Sets the expiry date of any newly created Munchkin tracking cookies to this many days in the future. Default is 730 days (2 years). |
| customName | String | Custom page name. System use only. |
| \<a name="domainlevel">\</a>domainLevel | Integer | Sets the number of parts from the page's domain to use when setting the domain attribute of the cookie.For example, suppose the current page domain is "www.example.com".domainLevel: 2 will set the cookie domain attribute to ".example.com"domainLevel: 3 will set the cookie domain attribute to ".www.example.com"Background:Munchkin will automatically manage certain two-letter top-level domains. This defaults to two parts in normal cases where the top-level domain is three letters. For example "www.example.com", the two rightmost parts are used to set the cookie, ".example.com".For two letter country codes such as ".jp", ".us", ".cn", and ".uk", the code defaults to three parts. For example "www.example.co.jp" will use three rightmost domain parts, ".example.co.jp".If the domain pattern requires a different behavior, then this must be specified using the `domainLevel` parameter. |
| domainSelectorV2 | Boolean | If set to true, utilizes an improved method to determine how to set the cookie domain attribute. |
| httpsOnly | Boolean | Defaults to false. When set to true, sets cookie to use Secure setting when the tracked page was served via https. |
| useBeaconAPI | Boolean | Defaults to false. When set to true, uses the [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) to send non-blocking requests instead of [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). If the browser does not support this API, the Munchkin falls back to using XMLHttpRequest. |
| wsInfo | String | Takes a string to target a workspace. This workspace ID is obtained by selecting the Workspace in the Admin &gt; Integration &gt; Munchkin menu. This setting only applies to the initial creation of an anonymous lead record. Once the Munchkin cookie value has been established for that lead record, the wsInfo parameter cannot be used to change its partition. Since this setting only affects anonymous leads, it is only relevant to partition-specific [Anonymous Visitors in Web Reports](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/reporting/basic-reporting/report-activity/display-people-or-anonymous-visitors-in-web-reports). |

## Examples

### Send Activity to Multiple Subscriptions

This example sends all web activity to the instances with Munchkin IDs "AAA-BBB-CCC" and "XXX-YYY-ZZZ".

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      // Add configuration settings to the init method
      Munchkin.init('AAA-BBB-CCCC', { 'altIds': ['XXX-YYY-ZZZ'] });
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();
</script>
```

### Set Tracking to Asynchronous

This example forces all XMLHttpRequest's to be sent asynchronously from the main thread.

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      // Add configuration settings to the init method
      Munchkin.init('AAA-BBB-CCC', { 'asyncOnly': true });
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin-beta.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();
</script>
```
