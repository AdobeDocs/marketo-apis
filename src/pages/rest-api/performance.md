---
title: Performance
description: Boost Marketo REST API performance with HTTP compression. Enable gzip to cut bandwidth; bulk APIs unsupported and under 1024 bytes not compressed.
---

# Performance

Use the performance options on this page to improve the efficiency of your integration.

## HTTP Compression

The Marketo REST API supports HTTP response-body compression as defined by the HTTP 1.1 specification. Enable compression to reduce bandwidth usage and data retrieval time.

<InlineAlert slots="text" variant="info" />

Payloads less than 1024 bytes are not compressed and bulk APIs do not support compression.

To enable compression, include the following HTTP header in the request:

```html
Accept-Encoding: gzip
```

The Marketo REST API compresses the response body and includes the following header:

```html
Content-Encoding: gzip
```

The following cURL example calls the [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) endpoint to retrieve five leads:

```bash
curl -H 'Accept-Encoding: gzip' 'https://123-ABC-456.mktorest.com/rest/v1/leads.json?filterType=id&filterValues=4,5,7,12,13'
```
