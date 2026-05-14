---
title: Marketo Integration Best Practices
description: "Best practices for Marketo API integrations covering quotas, rate and concurrency limits, batching, bulk import and export, caching, and latency planning."
---

# Marketo Integration Best Practices

## API Limits

- **Daily Quota:** Most subscriptions are allocated 50,000 API calls per day (which resets daily at 12:00AM CST). You can increase your daily quota through your account manager.
- **Rate Limit:** API access per instance limited to 100 calls per 20 seconds.
- **Concurrency Limit:**  Maximum of ten concurrent API calls.
- **Batch Size:** Lead DB - 300 records; Asset Query - 200 records
- **REST API Payload Size:** 1MB
- **Bulk Import File Size:** 10MB
- **SOAP Max Batch Size:** 300 records
- **Bulk Extract Jobs:** 2 executing; 10 queued (inclusive)

## Quick Tips

- Assume that your application will compete for quota, rate, and concurrency resources with other applications, and set conservative usage limits.
- Use Marketo's bulk and batch methods when available and appropriate. Only use single record or single result calls when necessary.
- Use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to retry API calls which fail due to rate or concurrency limits.
- Avoid making concurrent API calls if your use case does not benefit from it.

## Batching

To ensure the best performance for your integrations, when performing inserts or updates, records should be grouped into as few transactions as possible. When retrieving records from a data store for submission, the records should always be aggregated before submission, rather than submitting a request for each individual change.

## Acceptable Latency

Determining your latency tolerances, or the maximum amount of time that may pass before submitting an API call, will inform many, if not most, of the decisions that you make when designing your integration to Marketo. Marketo provides many different methods and configuration options which are suitable for different use cases, and different latency classes. For example, a real-time integration to notify a salesperson of a user signing up for a trial might only submit batches of one if immediate follow-up is required. However, most cases do not require this and can tolerate additional latency and can be managed more efficiently through queuing and batching calls.

| Acceptable Latency | Preferred Methods | Notes |
| --- | --- | --- |
| Low (&lt;10s) | Synchronous APIs (Batched or Unbatched) | Ensure that your use case requires this. Sending immediate and synchronous calls for high volume use cases can quickly consume a daily API quota, and potentially exceed both rate and concurrency limits. |
| Medium(10s – 60m) | Synchronous APIs (Batched) | For inbound data integrations to Marketo, using a queue with both an age and a size limit is highly recommended. When either limit is reached, flush the queue and submit your API request with the accumulated records. This is a strong compromise between speed and efficiency, ensuring that your requests occur at the required cadence, while batching as many records as the queue's age allows for. |
| High(&gt;60m) | Bulk Import/Export (if supported) | For inbound data integrations, records should be queued and submitted via Marketo Bulk APIs whenever available. |

## Daily Limits

Each API-enabled instance of Marketo has a daily allocation of at least 10,000 REST API calls per day, but more commonly 50,000 or more, and 500MB or more of Bulk Extract capacity. While additional daily capacity may be purchased as part of a Marketo subscription, your application design should consider the common limits of Marketo subscriptions.

As capacity is shared among all API services and users in an instance, best practice is to eliminate redundant calls, and to batch records into as few calls as possible. The most call efficient way to import records is using Marketo's bulk import APIs, which are available for [Leads/Persons](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads/operation/importLeadUsingPOST) and [Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Snippets/operation/createSnippetUsingPOST). Marketo also provides Bulk Extract for [Leads](bulk-lead-extract.md) and [Activities](bulk-activity-extract.md).

### Caching

Results from the following operations can typically be cached on the client side for a day or more, as they change infrequently:

- Results from Describe operations
- [Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getAllActivityTypesUsingGET)
- [Partitions](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/getLeadPartitionsUsingGET)

Caching certain asset types, like programs, emails and folders, is also appropriate for certain use cases, such as data enrichment for lead or activity records.

## Rate Limit

Each Marketo instance has a rate limit of 100 calls per 20 seconds, which is shared among all third-party API services. If this limit is exceeded the API responds with a 606 error code indicating that the rate limit has been exceeded. In general, third-party integrations should limit their utilization to 50 calls per 20 seconds or fewer to allow for fair usage of the rate limits by multiple API integrations and users. Though it may be appropriate to saturate this limit in certain cases, in general, applications which use batching and target their throughput to less than this limit are more responsive and consistent in their operation, at a small cost of increased latency.

## Concurrency Limit

Each Marketo instance has a shared limit of ten concurrently executing REST API calls. Like the daily quota and rate limits it is shared, so you should not assume that your application will be the exclusive consumer of this limit. Marketo counts the number of concurrent calls as those which are processing and have not yet returned, so when a call returns, it is no longer counted against the concurrent calls limit.

Most integration use cases do not benefit from making concurrent calls, so consider whether your application benefits before deciding to submit concurrent requests to Marketo. If you do wish to implement concurrency, you should cap the number of concurrent requests at five or fewer in your initial design, and only increase this after determining that your application requires more.

## Errors

Except for a few rare cases, API requests return an HTTP status code of 200. Business logic errors also return a 200, but contain detailed information in the body of the response. See [Error Codes](error-codes.md) for a detailed explanation. The HTTP reason phrase should not be evaluated as it is optional and subject to change.
