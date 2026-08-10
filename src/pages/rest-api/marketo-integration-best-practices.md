---
title: Marketo Integration Best Practices
description: "Best practices for Marketo API integrations covering quotas, rate and concurrency limits, batching, bulk import and export, caching, and latency planning."
---

# Marketo Integration Best Practices

Design integrations around the shared API limits for your Marketo instance. Use batching, caching, and conservative request rates to improve throughput and reliability.

## API Limits

- **Daily quota:** Most subscriptions are allocated 50,000 API calls per day. The quota resets daily at 12:00 AM CST. Contact your account manager to increase the daily quota.
- **Rate limit:** Each instance is limited to 100 API calls per 20 seconds.
- **Concurrency limit:** Each instance allows a maximum of ten concurrent API calls.
- **Batch size:** Lead DB supports 300 records; Asset Query supports 200 records.
- **REST API payload size:** 1 MB.
- **Bulk import file size:** 10 MB.
- **Bulk extract jobs:** Two executing and ten queued, inclusive.

## Quick Tips

- Set conservative usage limits because your application shares quota, rate, and concurrency resources with other applications.
- Use Marketo bulk and batch methods when available. Use single-record or single-result calls only when necessary.
- Use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to retry API calls that fail because of rate or concurrency limits.
- Avoid concurrent API calls unless they benefit your use case.

## Batching

For inserts and updates, group records into as few transactions as possible. When retrieving records from a data store, aggregate them before submission instead of submitting one request for each change.

## Acceptable Latency

Define the acceptable latency—the maximum time before submitting an API call—when you design an integration. This choice determines which Marketo methods and configuration options fit the use case.

For example, a real-time integration that notifies a salesperson when a user starts a trial might submit batches of one when immediate follow-up is required. Most use cases tolerate more latency and operate more efficiently by queuing and batching calls.

| Acceptable Latency | Preferred Methods | Notes |
| --- | --- | --- |
| Low (&lt;10s) | Synchronous APIs (Batched or Unbatched) | Ensure that your use case requires this. Sending immediate and synchronous calls for high volume use cases can quickly consume a daily API quota, and potentially exceed both rate and concurrency limits. |
| Medium(10s – 60m) | Synchronous APIs (Batched) | For inbound data integrations to Marketo, using a queue with both an age and a size limit is highly recommended. When either limit is reached, flush the queue and submit your API request with the accumulated records. This is a strong compromise between speed and efficiency, ensuring that your requests occur at the required cadence, while batching as many records as the queue's age allows for. |
| High(&gt;60m) | Bulk Import/Export (if supported) | For inbound data integrations, records should be queued and submitted via Marketo Bulk APIs whenever available. |

## Daily Limits

Each API-enabled Marketo instance has a daily allocation of at least 10,000 REST API calls, though 50,000 or more is common. Each instance also has 500 MB or more of Bulk Extract capacity. Additional daily capacity can be purchased as part of a Marketo subscription, but application designs should account for common subscription limits.

Capacity is shared by all API services and users in an instance. Eliminate redundant calls and batch records into as few calls as possible.

The most call-efficient import method is the Marketo bulk import API, available for [Leads/Persons](https://developer.adobe.com/marketo-apis/api/mapi#operation/importLeadUsingPOST) and [Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/importCustomObjectUsingPOST). Marketo also provides Bulk Extract for [Leads](bulk-lead-extract.md) and [Activities](bulk-activity-extract.md).

### Caching

Results from the following operations can typically be cached on the client side for a day or more, as they change infrequently:

- Results from Describe operations
- [Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getAllActivityTypesUsingGET)
- [Partitions](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadPartitionsUsingGET)

For use cases such as lead or activity data enrichment, you can also cache asset types such as programs, emails, and folders.

## Rate Limit

Each Marketo instance has a shared rate limit of 100 calls per 20 seconds across all third-party API services. If calls exceed this limit, the API returns a 606 error code.

In general, limit each third-party integration to 50 calls per 20 seconds or fewer so that multiple API integrations and users can share the available capacity. Some use cases might need the full limit. However, applications that use batching and target lower throughput are generally more responsive and consistent, with a small increase in latency.

## Concurrency Limit

Each Marketo instance has a shared limit of ten concurrently executing REST API calls. Do not assume that your application is the only consumer of this limit.

Marketo counts calls that are processing and have not yet returned. When a call returns, it no longer counts toward the concurrency limit.

Most integrations do not benefit from concurrent calls. If you implement concurrency, initially limit the application to five or fewer concurrent requests. Increase the limit only after you determine that the application requires more.

## Errors

Except in rare cases, API requests return HTTP status code 200. Business logic errors also return 200 but include details in the response body. See [Error Codes](error-codes.md) for more information.

Do not evaluate the HTTP reason phrase because it is optional and subject to change.
