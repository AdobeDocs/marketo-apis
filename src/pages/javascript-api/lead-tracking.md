---
title: Lead Tracking
description: "Learn how to embed Marketo Munchkin JavaScript, track visits and clicks, manage known vs anonymous leads, cross-domain cookies, and opt out for Smart Campaigns."
---

# Lead Tracking API

Marketo's Munchkin JavaScript allows for tracking of end-user page visits and clicks to your Marketo landing pages and external web pages. These are recorded in Marketo as "Visit Web Page" and "Clicked Link on Web Page" activities, which can then be used in triggers and filters for Smart Campaigns and Smart Lists.

## Embedding the Code

Your Marketo instance automatically provides pre-configured tracking code snippets to embed code on your external pages which track activity back to your Marketo instance. Use of the embed code is governed by this [license agreement](../munchkin-license.pdf).

There are three tracking code types available:

1. Simple - Loads synchronously
1. Asynchronous - Loads asynchronously
1. Asynchronous jQuery - Loads asynchronously and requires that jQuery be loaded beforehand

It is highly recommended that the Asynchronous tracking code be used for embedding Munchkin on external pages. To ensure the highest possible success rate for execution, embed the Asynchronous tracking code in `<head>` of each page.

Some content management systems may have specific methods or restrictions when embedding arbitrary scripts.

For reference, your final page should include code similar to this in `<head>` of your HTML document:

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

The default behavior of Marketo Munchkin is to do the following on page load:

1. Check to see if the current browser has a Munchkin cookie and create one if it is not there.
1. Send a "Visit Web Page" event to the designated Marketo instance using the information from the current page and browser. This records an activity to the corresponding record in Marketo.
1. Send "Clicked Link on Web Page" event for any user clicks that occur on links.

The behavior of Munchkin can be modified through the usage of Munchkin [Configuration settings](configuration.md), such as whether a cookie is created for all leads upon visiting the page with the `cookieAnon` setting, or modifying the click delay with `clickTime` setting. The sending of the Visit activity may be disabled by setting the apiOnly setting to true. As of version 162 (August 2022), clicks `tel` and `mailto` links are tracked in addition to `http/s` links.

## Known and Anonymous Leads

On a lead's first visit to a page on your domain, a new anonymous lead record is created in Marketo. The primary key for this record is the Munchkin cookie (`_mkto_trk`) which is created in the user's browser. All subsequent web activity on that browser is recorded against this anonymous record. To be associated with a known record in Marketo, one of the following things must occur:

- The lead must visit a Munchkin-tracked page with an `mkt_tok` parameter in the query string from a tracked Marketo email link.
- The lead must fill out a Marketo Form.
- A REST [Associate Lead](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/associateLeadUsingPOST) call must be sent.

When one of these conditions is fulfilled, the cookie and all associated web activity is associated with the known lead.

A new anonymous web activity record is created for each individual browser, so if a lead visits your domain for the first time using a new computer and/or browser, then this association must take place again.

## Domains

Munchkin creates and tracks individual cookies on a per-domain basis, so for known-lead tracking to occur across domains, a lead association event must occur for each domain. For example, if I control two domains, `marketo.com`, and `example.com`, and a lead fills out a form on `marketo.com`, then navigates to `example.com` later, then their activity on `marketo.com` is tracked on a known lead record, but their activity on `example.com` is anonymous. Known leads persist across subdomains however, so a known lead on `www.example.com` is also a known lead on `info.example.com`.

In the case that your top-level domain is two parts, such as `.co.uk`, then add a domainLevel parameter to your Munchkin snippet for the code to track correctly. See [here](configuration.md#domainlevel) for more details.

## Cookie

The Munchkin cookie uses the key `_mkto_trk`, and has a value following this pattern:

`id:561-HYG-937&token:_mch-marketo.com-1374552656411-90718`

Or

`id:561-HYG-937&token:_mch-marketo.com-97bf4361ef4433921a6da262e8df45a`

Munchkin cookies are specific to each second-level domain, that is, `example.com`. The default lifespan of the cookie is 2 years (730 days).

## Beta

To opt in to the Munchkin beta channel for your landing pages, go to your [Admin -> Treasure Chest](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/settings/enable-or-disable-treasure-chest-features) menu and enable the "Munchkin Beta on Landing Pages" setting. This provides new code snippets in the **Admin** ->  **Munchkin** menu to allow you to use the beta version on external sites.

## Opt-Out

Visitors may opt out of Munchkin tracking entirely by adding the `querystring` parameter "marketo_opt_out=true" to the URL in their browser. When the Munchkin JavaScript detects this setting, it attempts to set a new cookie "mkto_opt_out" with a value of `true`. All other Marketo tracking cookies are deleted, no new cookies are set, and no HTTP requests are made by Munchkin when this setting is detected.
