---
title: Pattern Match
description: "Use the RTP rtp.checkPattern utility to test string patterns with percent wildcards, see sync limitations, usage and URL examples, and required RTP tag setup."
---

# Pattern Match

RTP provides a utility function that checks whether a pattern matches a string. The utility returns a match result synchronously and cannot be used asynchronously.

You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.

## Usage

> rtp.checkPattern(check_against, pattern);

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| check_against | Required | String | String to match the pattern against, such as the current page URL or a product name. |
| pattern | Required | String | Pattern to match. Add `%` as a wildcard to match the start, end, or contents of a string. Omit `%` for a full match. |

## Examples

This example sets a custom variable at index 1 when the current page URL ends with "productA".

```javascript
if (rtp.checkPattern(window.location.href, '%productA')) {
    rtp('set', 'custom1', 'productA');
}
```

In the following example, the current URL path is '/products/productB'. The example checks whether the path contains "products" and then sets a custom variable.

```javascript
var currentURLPath = '/products/productB';
if (rtp.checkPattern(currentURLPath, '%products%')) {
    rtp('set', 'custom1', 'products');
}
```
