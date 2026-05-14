---
title: Performance
description: Boost Marketo REST API performance with HTTP compression. Enable gzip to cut bandwidth; bulk APIs unsupported and under 1024 bytes not compressed.
---

# Performance

This page contains a list of performance-related topics that you can use to increase the performance of your integration.

## HTTP Compression

The Marketo REST API supports HTTP compression of response bodies using standards defined by the HTTP 1.1 specification. Enabling compression is recommended because it reduces bandwidth usage, and time spent retrieving data.

<InlineAlert slots="text" variant="info" />

Payloads less than 1024 bytes are not compressed and bulk APIs do not support compression.

To enable compression, include the following HTTP header in the request:

```html
Accept-Encoding: gzip
```

The Marketo REST API will compress the response body and include this header:

```html
Content-Encoding: gzip
```

Here is an example using Curl to call the [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/getLeadsByFilterUsingGET) endpoint to retrieve 5 leads:

```bash
curl -H 'Accept-Encoding: gzip' 'https://123-ABC-456.mktorest.com/rest/v1/leads.json?filterType=id&filterValues=4,5,7,12,13'
```
