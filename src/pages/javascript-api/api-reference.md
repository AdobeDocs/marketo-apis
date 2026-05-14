---
title: Munchkin API Reference
description: "Use the Munchkin Javascript API to track page visits, link clicks, and custom events with init, createTrackingCookie, and munchkinFunction methods."
---

# Munchkin API Reference

Munchkin provides several functions which can be called manually through Javascript. These can allow for customized tracking of browser events, such as video plays, or clicks on non-links.

## Functions

The Munchkin API is comprised of the following functions: `init`, `createTrackingCookie`, `munchkinFunction`.

<a name="munchkin_init"></a>

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

When called, this checks to see a `_mkto_trk` cookie exists in the browser, and if not, creates one. This is useful for tracking users during specific actions, such as registration or downloading an asset, if `cookieAnon` is set to false.

| Parameter Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| forceCreate | Required | Boolean | Create cookie even if `cookieAnon` is set to false. |

```javascript
Munchkin.createTrackingCookie(true);
```

### Munchkin.munchkinFunction()

Used for generating custom tracking behaviors, such as video player plays and pauses, or page visits for non-standard navigation, such as hash codes.

| Parameter Name | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| Function Type | Required | String | Determines the activity to record. Permissible values: `visitWebPage`, `clickLink`, `associateLead` |
| Data | Required | Object | Contains data for the activity to be recorded. |

#### visitWebPage

Calling `munchkinFunction()` with `visitWebPage` sends a 'visit' activity for the current user to Marketo. You can customize the URL and `querystring` which are sent with the data object in the second argument.

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

Calling `munchkinFunction()` with `clickLink` sends a click activity for the current user to Marketo. You can customize the click URL with the `href` property in the data object.

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
