---
title: Stream Position
description: "Explains stream position for paginating time sequenced data in SOAP, simple and complex formats, and use in getLeadChanges, getLeadActivity, and more"
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# Stream Position

Stream position elements contain a position reference for one or more logical streams of time sequenced data. The position reference may be an approximate external specification like a timestamp, or an opaque internal specification of position returned by a previous API call. Stream positions may be defined as a complex, multi-element type or may be a string.

The stream position is used to retrieve data in batches, and allows the caller to paginate through the result. The stream position passed within an API request is the value of the stream position returned in the previous response. Modifying the stream position returned from the previous API call is not recommended and may result in unexpected API behavior.

## APIs Supporting Stream Position

- [getCustomObjects](getcustomobjects.md)
- [getLeadChanges](getleadchanges.md)
- [getLeadActivity](getleadactivity.md)
- [getMObjects](getmobjects.md)
- [getMultipleLeads](getmultipleleads.md)

## Simple Stream Position

```xml
<streamPosition>8UJZetaMb1V6uUZl+L7DcPP2jG+PMmtpF</streamPosition>
```

## Complex Stream Position

```xml
<startPosition>
  <latestCreatedAt  />
  <oldestCreatedAt>2013-08-01T00:13:13+00:00</oldestCreatedAt>
  <activityCreatedAt  />
  <offset>ID:1086173</offset>
</startPosition>
```
