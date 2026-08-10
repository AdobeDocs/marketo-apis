---
title: Paging Tokens
description: "Use Marketo REST API paging tokens to retrieve activities and leads, covering date-based and position-based tokens, ISO 8601 sinceDatetime, and 414 errors."
---

# Paging Tokens

Marketo provides paging tokens to page through results or retrieve data updated relative to a specific date.

Some responses return long paging token strings, which can cause an HTTP 414 error. See information about handling these [errors](error-codes.md).

See the [Paging Token API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getActivitiesPagingTokenUsingGET) documentation.

## Token Types

Marketo provides two related but distinct types of paging tokens:

- Date-based tokens retrieve records that occur after a specified datetime.
- Position-based tokens traverse records in a result set.

## Date-Based

A date-based paging token represents a datetime. Use it to retrieve activities, data value changes, and deleted leads that occur after that datetime.

Generate a date-based token by calling the [Get Paging Token](https://developer.adobe.com/marketo-apis/api/mapi#operation/getActivitiesPagingTokenUsingGET) endpoint with a datetime:

```http
GET /rest/v1/activities/pagingtoken.json?sinceDatetime=2014-10-06T13:22:17-08:00
```

```json
{
    "requestId": "1607c#14884f3e74e",
    "success": true,
    "nextPageToken": "GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ"
}
```

The `sinceDateTime` parameter must use [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard date notation. For best results, provide a full datetime with a time zone.

Represent the time zone as an offset from GMT in the following format:

`yyyy-mm-ddThh:mm:ss+|-hh:mm`

Alternatively, use a capital "Z" to represent UTC:

`yyyy-mm-ddThh:mm:ssZ`

For example:

`2016-09-15T15:53:00+05:00`

`2016-09-15T10:53:00Z`

Because `sinceDateTime` is a query parameter, URL-encode its value.

Pass the returned `nextPageToken` string to a [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET), [Get Lead Changes](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadChangesUsingGET), or [Get Deleted Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/getDeletedLeadsUsingGET) call. The call retrieves records that occur after the datetime supplied to the Get Paging Token API.

```http
GET /rest/v1/activities.json?nextPageToken=GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ&activityTypeIds=1&activityTypeIds=12
```

## Position-Based

A position-based paging token can be returned by any batch retrieval call to a Lead Database API. The token works like a database cursor and enables traversal of records.

For example, a Get Leads By Filter Type call can return a result set larger than the requested batch size, which usually has a maximum and default value of 300. When more results are available, the response sets the moreResult field to true and returns a `nextPageToken`.

To retrieve the next page, make another call and pass the `nextPageToken` value from the previous response. The response returns the next page in the result set.
