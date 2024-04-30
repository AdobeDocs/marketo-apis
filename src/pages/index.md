---
title: Overview - Marketo API Documentation
description: A guide to using Marketo APIs
---

<Hero slots="heading, text"/>

# Marketo API

The Adobe Marketo APIs allow you to directly call Adobe's servers to perform actions on your Marketo data.

<Resources slots="heading, links"/>

## Resources

* [Marketo Engage Documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home)
* [Marketo Measure](https://business.adobe.com/products/marketo/bizible.html)
* [Marketo SDK for Android](https://github.com/Marketo/android-sdk)
* [Marketo SDK for iOS](https://github.com/Marketo/ios-sdk)

## Overview

This documentation provides instructions for Marketo APIs.

Marketo API include REST, SOAP, and Javascript APIs, plus code for working with mobile devices and email templating.

## Discover

<DiscoverBlock width="100%" slots="heading, link, text"/>

### Get Started

[Quickstart Guide](guides/)

Get started with the Cat Analytics APIs.

<DiscoverBlock slots="heading, link, text"/>

### Guides

[Calculated Metrics API](guides/dummy_metrics_api/)

Returns information on the user's company that is necessary for making other Cat Analytics API calls.

<DiscoverBlock slots="link, text"/>

[Segments API](guides/dummy_oauth_client/)

Provides configuration guidance and best practices for the /segments endpoint.

### API References

Marketo provides three REST APIs for interacting with your data.

[Marketo Asset](api/asset.md)
[Marketo Identity](api/identity.md)
[Marketo MAPI](api/mapi.md)

## Contributing

We encourage you to participate in our open documentation initiative. If you have suggestions, corrections, additions
or deletions for this documentation, check out the source from the [Marketo API repo](https://github.com/AdobeDocs/marketo-apis), and submit a pull request.

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Cat Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`.
