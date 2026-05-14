---
title: Error Codes
description: "Reference guide to Marketo SOAP API error codes with messages and notes, covering authentication failures, rate and concurrency limits, and request issues."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# Error Codes

When developing for Marketo, it is very important that requests and responses get logged when an unexpected exception is encountered.  While certain types of exceptions, such as expired authentication can be safely handled by re-authentication, others may require support interactions, and requests and responses will always be requested in this scenario.

Below is a list of SOAP API error codes.

| Code | Message | Notes |
| --- | --- | --- |
| 10001 | Internal Error | Severe system failure |
| 20011 | Internal Error | API service failure |
| 20012 | Request Not Understood | Unexpected SOAP Message |
| 20013 | Access Denied | Client is blocked from API access |
| 20014 | Authentication failed | Client did not provide valid credentials |
| 20015 | Request Limit Exceeded | Number of calls today exceeded the subscription's quota. The default subscription quota is 10,000/day. |
| 20016 | Request Expired | Request signature is too old. The given timestamp and request signature are in the past and are no longer valid. Request can be retried with a newly generated timestamp and signature. |
| 20017 | Invalid Request | Request is missing an expected parameter |
| 20019 | Unsupported Operation | Operation invoked is not defined in the Marketo API WSDL |
| 20022 | Time range specified in query filter exceeded limit | The number of days elapsed between the "oldestUpdatedAt" and "latestUpdatedAt" fields was greater than 30 |
| 20023 | Rate Limit Exceeded | The number of calls in the past 20 seconds was greater than 100 |
| 20024 | Concurrency Limit Exceeded | The number of concurrent calls was greater than 10 |
| 20101 | Lead Key Required | LeadKey is Required but was not provided |
| 20102 | Lead Key Bad | LeadKeyType is not Valid |
| 20103 | Lead Not Found | LeadKey Value did not match any lead |
| 20104 | Lead Detail Required | LeadRecord is required but was not provided |
| 20105 | Lead Attribute Bad | LeadRecord contains an Attribute with a bad name |
| 20106 | Lead Sync Failed | LeadRecord could not be updated or created |
| 20107 | Activity Key Bad | LeadActivityFilter contains a bad activity type |
| 20108 | Lead Owner Not Found | LeadKey specifies a lead owner that does not exist |
| 20109 | Parameter Required | Parameter value was null or missing |
| 20110 | Bad Parameter | A parameter value is bad |
| 20111 | List Not Found | ListKey specifies a list that does not exist |
| 20113 | Campaign Not Found | Campaign does not exist |
| 20114 | Bad Parameter | Parameter Value is bad |
| 20122 | Bad Stream Position | Stream position is bad |
| 20123 | Stream at End | Stream position indicates that no more records are available |
