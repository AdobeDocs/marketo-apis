---
title: Configuration
description: "Configure Marketo Munchkin with the JavaScript API. Learn Munchkin.init settings like altIds, anonymizeIP, asyncOnly, cookie life, domainLevel, Beacon API."
---

# Configuration

Munchkin accepts configuration settings that customize its behavior. Pass the settings as properties of a JavaScript object in the second parameter of [Munchkin.init()](api-reference.md#munchkin_init).

```json
Munchkin.init("AAA-BBB-CCC", {
        "configName":"configValue",
        "configName2":"configValue2"
    }
);
```

The configuration settings object can contain any number of the properties in the following table.

## Properties

| Name | Data Type | Description |
| --- | --- | --- |
| altIds | Array | Accepts an array of Munchkin ID strings. When enabled, this duplicates all web activity to the subscriptions identified by their Munchkin IDs. |
| anonymizeIP | Boolean | Anonymizes the IP address recorded in Marketo for new visitors. |
| apiOnly | Boolean | If set to true, then `Munchkin.Init()` function will not call `visitsWebPage`. This is useful for single-page web applications that need full control over every `visitsWebPage` event. |
| asyncOnly | Boolean | If set to true, sends XMLHttpRequests asynchronously. Default is false. |
| clickTime | Integer | Sets the time, in milliseconds, to block after a click so that the click-tracking request can complete. Reducing this value reduces click-tracking accuracy. Default is 350 ms. |
| cookieAnon | Boolean | If set to false, prevents tracking and cookie creation for new anonymous leads. Leads receive cookies and are tracked after submitting a Marketo form or clicking through from a Marketo email. Default is true. |
| cookieLifeDays | Integer | Sets the expiry date of any newly created Munchkin tracking cookies to this many days in the future. Default is 730 days (2 years). |
| customName | String | Custom page name. System use only. |
| domainLevel | Integer | Sets how many parts of the page domain to use for the cookie's domain attribute.  For "www.example.com", `domainLevel: 2` sets the cookie domain to ".example.com", and `domainLevel: 3` sets it to ".www.example.com".  By default, Munchkin uses two parts when the top-level domain has three letters. For example, "www.example.com" uses ".example.com".  For two-letter country codes such as ".jp", ".us", ".cn", and ".uk", Munchkin uses three parts. For example, "www.example.co.jp" uses ".example.co.jp".  Use the `domainLevel` parameter when the domain pattern requires different behavior. |
| domainSelectorV2 | Boolean | If set to true, utilizes an improved method to determine how to set the cookie domain attribute. |
| httpsOnly | Boolean | Defaults to false. When set to true, sets cookie to use Secure setting when the tracked page was served via https. |
| useBeaconAPI | Boolean | Defaults to false. When set to true, uses the [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) to send non-blocking requests instead of [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). If the browser does not support the Beacon API, Munchkin uses XMLHttpRequest. |
| wsInfo | String | Targets a workspace. Obtain the workspace ID by selecting the workspace in the Admin &gt; Integration &gt; Munchkin menu.  This setting applies only when an anonymous lead record is initially created. After the Munchkin cookie value is established for that lead record, the wsInfo parameter cannot change its partition.  Because this setting affects only anonymous leads, it is relevant only to partition-specific [Anonymous Visitors in Web Reports](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/reporting/basic-reporting/report-activity/display-people-or-anonymous-visitors-in-web-reports). |

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

This example forces all XMLHttpRequests to be sent asynchronously from the main thread.

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
