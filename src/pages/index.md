---
title: Marketo Engage API Documentation
description: A guide to using Marketo Engage APIs
---

<SuperHero slots="heading, text"/>

# Marketo Engage API

The Adobe Marketo Engage APIs allow you to directly call Adobe's servers to perform actions on your Marketo data.

## Overview

This documentation provides instructions for Marketo APIs.

Marketo APIs include REST, SOAP, Javascript, and User Management APIs, plus code for working with mobile devices and email templates.

The REST API allows for remote execution of many of the system's capabilities. From creating programs to bulk lead import, there are a large number of options which allow fine-grained control of a Marketo instance.

The following User Management APIs are only available to users that are on [Marketo Identity](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview): Invite Users, Delete User, Delete Invited User and Update User Attributes. These APIs are not available on Adobe Identity.

## Discover

<DiscoverBlock width="100%" slots="heading, text"/>

### Get Started

[Getting Started](getting-started.md)

Learn how to authenticate, understand the data model, and make your first API call.

<DiscoverBlock slots="heading, link, text"/>

### Guides

[Marketo Engage Documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home)

Learn how to configure and use Marketo Engage.

## Developer Guides

<DiscoverBlock slots="heading, text" width="33%"/>

### REST API

Use the [REST API](rest-api/rest-api.md) to manage leads, assets, programs, campaigns, and more with fine-grained control over your Marketo instance.

<DiscoverBlock slots="heading, text" width="33%"/>

### JavaScript API

The [JavaScript API](javascript-api/javascript-api.md) provides Munchkin lead tracking, Forms integration, Web Personalization, and Predictive Content on your web pages.

<DiscoverBlock slots="heading, text" width="33%"/>

### Mobile SDK

The [Mobile SDK](mobile/mobile.md) lets you integrate Marketo lead tracking, push notifications, and in-app messaging into your iOS and Android apps.

<DiscoverBlock slots="heading, text" width="33%"/>

### Webhooks

[Webhooks](webhooks/webhooks.md) let you trigger real-time HTTP callbacks to external services from Marketo Smart Campaign flow steps.

<DiscoverBlock slots="heading, text" width="33%"/>

### SOAP API

The [SOAP API](soap-api/soap-api.md) is deprecated and will reach end of life on July 31, 2026. New integrations should use the REST API.

## API Reference

<DiscoverBlock slots="heading, text" width="33%"/>

### Asset API

Use the [Marketo Asset](api/asset.md) to manage emails and templates, snippets, programs, form and more.

<DiscoverBlock slots="heading, text" width="33%"/>

### Identity API

[Marketo Identity](api/identity.md) retrieves access tokens for Marketo users.

<DiscoverBlock slots="heading, text" width="33%"/>

### Lead Database API

Use the [Marketo Lead Database](api/mapi.md) API to manage leads, accounts, opportunities, and more.

<DiscoverBlock slots="heading, text" width="33%"/>

### User Management API

The [User Management](api/user.md) endpoints allow you to perform CRUD operations on user records in Marketo.

<DiscoverBlock slots="heading, text" width="33%"/>

### Data Ingestion API

[Marketo Data Ingestion](api/data-ingestion.md)

Use the Data Ingestion API to bulk import your Marketo data.

<Resources slots="heading, links"/>

## Resources

* [Marketo Engage Documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home)
* [Marketo Measure](https://experienceleague.adobe.com/en/docs/marketo-measure/using/home)
* [Marketo SDK for Android](https://github.com/Marketo/android-sdk)
* [Marketo SDK for iOS](https://github.com/Marketo/ios-sdk)
* [Community-Supported Client Libraries](https://github.com/Marketo/Community-Supported-Client-Libraries)

## Contributing

We encourage you to participate in our open documentation initiative. If you have suggestions, corrections, additions
or deletions for this documentation, check out the source from the [Marketo API repo](https://github.com/AdobeDocs/marketo-apis), and submit a pull request.
