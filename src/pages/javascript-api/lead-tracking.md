---
title: Lead Tracking
description: "Learn how to embed Marketo Munchkin JavaScript, track visits and clicks, manage known vs anonymous leads, cross-domain cookies, and opt out for Smart Campaigns."
---

# Lead Tracking API

Marketo's Munchkin JavaScript tracks page visits and link clicks on Marketo landing pages and external webpages. Marketo records these interactions as "Visit Web Page" and "Clicked Link on Web Page" activities.

Use the activities in triggers and filters for Smart Campaigns and Smart Lists.

## Embedding the Code

Your Marketo instance provides pre-configured code snippets for tracking activity from external pages. Use of the embed code is governed by this [license agreement](../munchkin-license.pdf).

There are three tracking code types available:

1. Simple—Loads synchronously.
1. Asynchronous—Loads asynchronously.
1. Asynchronous jQuery—Loads asynchronously and requires jQuery to load first.

Use the Asynchronous tracking code to embed Munchkin on external pages. For the highest possible execution success rate, place the code in the `head` element of each page.

Some content management systems may have specific methods or restrictions when embedding arbitrary scripts.

Your final page should include code similar to the following example in the `head` element of the HTML document:

```html
<head>
    <script type="text/javascript">
    (function() {
        var didInit = false;
        function initMunchkin() {
            if(didInit === false) {
                didInit = true;
                Munchkin.init('CHANGE-ME');
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
    ...
</head>
```

## Munchkin Behavior

By default, Marketo Munchkin performs the following actions when a page loads:

1. Checks whether the current browser has a Munchkin cookie and creates one if necessary.
1. Sends a "Visit Web Page" event to the designated Marketo instance by using information from the current page and browser. This event records an activity on the corresponding Marketo record.
1. Sends a "Clicked Link on Web Page" event when the user selects a link.

Use Munchkin [Configuration settings](configuration.md) to change this behavior. For example, use `cookieAnon` to control whether Munchkin creates a cookie for all leads that visit the page, or use `clickTime` to change the click delay.

To disable the Visit activity, set `apiOnly` to true. As of version 162 (August 2022), Munchkin tracks clicks on `tel` and `mailto` links in addition to `http/s` links.

## Known and Anonymous Leads

When a lead first visits a page on your domain, Marketo creates an anonymous lead record. The primary key for this record is the Munchkin cookie (`_mkto_trk`) created in the user's browser.

Marketo records subsequent web activity from that browser on the anonymous record. To associate the activity with a known Marketo record, one of the following events must occur:

- The lead must visit a Munchkin-tracked page with an `mkt_tok` parameter in the query string from a tracked Marketo email link.
- The lead must fill out a Marketo Form.
- A REST [Associate Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/associateLeadUsingPOST) call must be sent.

When one of these events occurs, Marketo associates the cookie and all related web activity with the known lead.

Marketo creates an anonymous web activity record for each browser. If a lead visits your domain from a new computer or browser, the association must occur again.

## Domains

Munchkin creates and tracks cookies on a per-domain basis. To track a known lead across domains, a lead association event must occur on each domain.

For example, suppose you control `marketo.com` and `example.com`. A lead submits a form on `marketo.com` and later goes to `example.com`. Activity on `marketo.com` is associated with the known lead, but activity on `example.com` is anonymous.

Known leads persist across subdomains. A known lead on `www.example.com` is also a known lead on `info.example.com`.

If your top-level domain has two parts, such as `.co.uk`, add a `domainLevel` parameter to your Munchkin snippet. For more information, see [Configuration](configuration.md#domainlevel).

## Cookie

The Munchkin cookie uses the key `_mkto_trk` and a value that follows one of these patterns:

`id:561-HYG-937&token:_mch-marketo.com-1374552656411-90718`

Or

`id:561-HYG-937&token:_mch-marketo.com-97bf4361ef4433921a6da262e8df45a`

Munchkin cookies are specific to each second-level domain, such as `example.com`. The default cookie lifespan is 2 years (730 days).

## Beta

To opt in to the Munchkin beta channel for your landing pages, go to [Admin -> Treasure Chest](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/settings/enable-or-disable-treasure-chest-features) and enable the "Munchkin Beta on Landing Pages" setting.

This setting adds code snippets to the **Admin** -> **Munchkin** menu. Use these snippets to run the beta version on external sites.

## Opt-Out

Visitors can opt out of Munchkin tracking by adding the `querystring` parameter "marketo_opt_out=true" to the URL in their browser. When Munchkin JavaScript detects this setting, it attempts to set a new "mkto_opt_out" cookie with a value of `true`.

Munchkin then deletes all other Marketo tracking cookies, does not set new cookies, and does not make HTTP requests.
