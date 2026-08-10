---
title: Munchkin API Reference
description: "Use the Munchkin Javascript API to track page visits, link clicks, and custom events with init, createTrackingCookie, and munchkinFunction methods."
---

# Munchkin API Reference

Munchkin provides JavaScript functions for customized tracking of browser events. For example, you can track video plays or clicks on elements that are not links.

## Functions

The Munchkin API includes the following functions:

- `init`
- `createTrackingCookie`
- `munchkinFunction`



### Munchkin.init()

`Munchkin.init()` must be called before any other functions. It sets up Munchkin on the current page to send activities to a specific instance and generates a "Visits Web Page" activity for the current page.

| Parameter Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| Munchkin ID | Required | String | Munchkin Account ID found under Admin > Integration > Munchkin menu. Sets the target instance to send activities to. |
| [Configuration Settings](configuration.md) | Optional | Object | Enables alternate behavior settings for Munchkin. |

```javascript
Munchkin.init('299-BYM-827');
```

### Munchkin.createTrackingCookie()

`Munchkin.createTrackingCookie()` checks whether a `_mkto_trk` cookie exists in the browser. If the cookie does not exist, the function creates one.

When `cookieAnon` is set to false, use this function to track users during specific actions, such as registering or downloading an asset.

| Parameter Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| forceCreate | Required | Boolean | Create cookie even if `cookieAnon` is set to false. |

```javascript
Munchkin.createTrackingCookie(true);
```

### Munchkin.munchkinFunction()

Use `Munchkin.munchkinFunction()` to create custom tracking behaviors. For example, track video player activity or page visits from nonstandard navigation such as hash changes.

| Parameter Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| Function Type | Required | String | Determines the activity to record. Permissible values: `visitWebPage`, `clickLink`, `associateLead` |
| Data | Required | Object | Contains data for the activity to be recorded. |

#### visitWebPage

Calling `munchkinFunction()` with `visitWebPage` sends a 'visit' activity for the current user to Marketo. Use the data object in the second argument to customize the URL and `querystring`.

| Data Property Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| url | Required | String | The URL file path used to record a page visit.  This value is appended to current domain name to create full page name. For example, if url is `/index.html` and domain name is `www.example.com`, then the visited page is recorded as `www.example.com/index.html`. |
| params | Optional | String | A query string of the desired parameters to be recorded. |

For example, `foo=bar&biz=baz`.

```javascript
Munchkin.munchkinFunction('visitWebPage', {
        'url': '/Football/Team/Seahawks',
        'params': 'defense=legion_of_boom&qb=wilson'
    }
);
```

#### clickLink

Calling `munchkinFunction()` with `clickLink` sends a click activity for the current user to Marketo. Use the `href` property in the data object to customize the click URL.

| Data Property Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| href | Required | String | The URL file path used to record a link click. This value is appended to current domain name to create full link. |

For example, if href is `/index.html` and domain name is `www.example.com`, then the link click is recorded as `www.example.com/index.html`.

```javascript
Munchkin.munchkinFunction('clickLink', {
        'href': '/Football/Team/Seahawks'
    }
);
```

#### associateLead

This method has been deprecated and is no longer available for use.
