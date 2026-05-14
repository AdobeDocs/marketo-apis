---
title: Base URL
description: "Learn to build Marketo REST API requests, understand base URL path resource and parameters, and find your unique base URL."
---

# Base URL

The [Endpoint Reference](endpoint-reference.md) documentation for each API call shows the REST method, path, resource, and parameters that must be appended to the base URL to form a request.

The following is an example of a well-formed REST URL:

`https://284-RPR-133.mktorest.com/rest/v1/lead/318581.json?fields=email,firstName,lastName`

which is composed of the following parts:

- Base URL: `https://284-RPR-133.mktorest.com/rest`
- Path: `/v1/lead/`
- Resource: `318582.json`
- Query parameter: `fields=email,firstName,lastName`

The base URL contains the account id (a.k.a. Munchkin id) and is therefore unique for each Marketo subscription. Your base URL is found by logging into Marketo and navigating to the **Admin** > **Integration** > **Web Services** menu. It is labeled as "Endpoint:" underneath the "REST API" section as shown in the following screenshots.

![Web Services Base URL Endpoint](assets/rest-api-base-url-web-services.png)

Once you have found the base URL, copy it and include it in URLs that you use when calling any of the REST APIs.
