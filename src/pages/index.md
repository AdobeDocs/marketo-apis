---
title: Marketo Engage API Documentation
description: A guide to using Marketo Engage APIs
---

<SuperHero slots="heading, text"/>

# Marketo Engage API

The Adobe Marketo Engage APIs allow you to directly call Adobe's servers to perform actions on your Marketo data.

## Overview

This documentation provides instructions for Marketo APIs.

Marketo API include REST, SOAP, Javascript, and User Management APIs, plus code for working with mobile devices and email templates.

The REST API allows for remote execution of many of the system's capabilities. From creating programs to bulk lead import, there are a large number of options which allow fine-grained control of a Marketo instance.

The following User Management APIs are only available to users that are on [Marketo Identity](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview): Invite Users, Delete User, Delete Invited User and Update User Attributes. These APIs are not available on Adobe Identity.

## Discover

<DiscoverBlock width="100%" slots="heading, link, text"/>

### Get Started

[Marketo Product page](https://experienceleague.adobe.com/en/docs/marketo/using/getting-started/what-is-adobe-marketo-engage)

Learn about Marketo.

<DiscoverBlock slots="heading, link, text"/>

### Guides

[Marketo Engage Documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home)

Learn how to configure and use Marketo Engage.

<DiscoverBlock slots="heading, text"/>

## Asset API

[Marketo Asset](api/asset.md) includes:

* Folders
* Programs
* Emails and email templates
* Landing pages and landing page templates
* Snippets
* Forms
* Tokens
* Files

<DiscoverBlock slots="heading, text"/>

## Identity API

[Marketo Identity](api/identity.md) - Retrieves access tokens for Marketo users.

<DiscoverBlock slots="heading, text"/>

## Lead Database API

[Marketo Lead Database](api/mapi.md) includes the following:

* Leads
* Companies/Accounts
* Named Accounts
* Opportunities
* Opportunity Roles
* Sales Persons
* Custom Objects
* Activities
* List and Program Membership

<DiscoverBlock slots="heading, text"/>

## User Management API

[Marketo User Management](api/user.md)

The User Management endpoints allow you to perform CRUD operations on user records in Marketo. Users are created by sending an invitation to a user, who then sets a password and gains access to Marketo for the first time.

<DiscoverBlock slots="heading, text"/>

## Lists API

[Marketo Lists](api/lists.md) includes:

* Add leads to a static list
* Remove leads from a static list

<DiscoverBlock slots="heading, text"/>

## Data Ingestion API

[Marketo Data Ingestion](api/data-ingestion.md) includes:

* Upsert person/lead records
* Upsert custom object records by type
* Sync company records (create, update, or upsert)
* Add or update program member status for leads
* Remove leads from programs
* Add leads to a static list
* Remove leads from a static list

<Resources slots="heading, links"/>

## Resources

* [Marketo Engage Documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home)
* [Marketo Measure](https://experienceleague.adobe.com/en/docs/marketo-measure/using/home)
* [Marketo SDK for Android](https://github.com/Marketo/android-sdk)
* [Marketo SDK for iOS](https://github.com/Marketo/ios-sdk)

## Contributing

We encourage you to participate in our open documentation initiative. If you have suggestions, corrections, additions
or deletions for this documentation, check out the source from the [Marketo API repo](https://github.com/AdobeDocs/marketo-apis), and submit a pull request.
