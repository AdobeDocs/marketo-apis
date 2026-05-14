---
title: Data Ingestion
description: "Use the Marketo Data Ingestion API for high volume, low latency ingestion of Persons, Custom Objects, Companies, and Program Members."
---

# Data Ingestion API

The Data Ingestion API is a high volume, low latency, highly available service designed to handle ingestion of large amounts of person and person related data efficiently and with minimal delays.

Data is ingested by submitting requests that execute asynchronously. Request status can be retrieved by subscribing to events from the [Marketo Observability Data Stream](https://developer.adobe.com/events/docs/guides/using/marketo/marketo-observability-data-stream-setup).

Interfaces are offered for four object types: Persons, Custom Objects, Companies, and Program Members. The record operation is "insert or update" only, except for Program Members which also supports delete.

<InlineAlert slots="text" variant="info" />

Access to the Data Ingestion API requires entitlement to the [Marketo Engage Performance Tier](https://nation.marketo.com/t5/product-documents/marketo-engage-performance-tiers/ta-p/328835) Package.

## Authentication

The Data Ingestion API uses the same OAuth 2.0 authentication method as Marketo REST API to generate an access token, but the access token must be passed via HTTP header `X-Mkto-User-Token`. You cannot pass the access token via a query parameter.

Example Access Token via Header:

`X-Mkto-User-Token: 11606815-aa7a-405a-80a1-f9683efa528b:ab`

## Permissions

Data Ingestion uses the same permissions model as the Marketo REST API, and does not require any additional special permissions to use, though specific permissions are required for each endpoint.

| Endpoint | Permission |
| --- | --- |
| Persons | Read-Write Lead |
| Custom Objects | Read-Write Custom Object |
| Companies | Read-Write Company |
| Program Members | Read-Write Lead |

## Supported Object Types

| Object Type | Supported Operations |
| --- | --- |
| Persons | Upsert (insert or update) |
| Custom Objects | Upsert (insert or update) |
| Companies | Sync (`createOnly`, `updateOnly`, `createOrUpdate`) |
| Program Members | Sync (upsert status), Delete (remove from program) |

## Headers

Data Ingestion makes use of the following custom HTTP headers.

### Request

| Key | Value | Required | Description |
| --- | --- | --- | --- |
| `X-Correlation-Id` | Arbitrary string (maximum length 255 characters). | No | Can be used to trace requests through the system. See Marketo Observability Data Stream |
| `X-Request-Source` | Arbitrary string (maximum length 50 characters). | No | Can be used to trace the source of requests through the system. See Marketo Observability Data Stream |

### Response

| Key | Value | Required |
| --- | --- | --- |
| `X-Request-Id` | Unique request ID. | Yes |

## Requests

Use the HTTP POST method to send data to the server.

The data representation is included in the request body as application/json.

The domain name is: `mkto-ingestion-api.adobe.io`

The path begins with `/subscriptions/MunchkinId` where MunchkinId is specific to your Marketo instance. You can find your Munchkin ID in the Marketo Engage UI under **Admin** > **My Account** > **Support Information**.  The remainder of the path is used to specify the resource of interest.

Example URL for Persons:

`https://mkto-ingestion-api.adobe.io/subscriptions/556-RJS-213/persons`

Example URL for Custom Objects:

`https://mkto-ingestion-api.adobe.io/subscriptions/556-RJS-213/customobjects/purchases`

Example URL for Companies:

`https://mkto-ingestion-api.adobe.io/subscriptions/556-RJS-213/companies`

Example URL for Program Members:

`https://mkto-ingestion-api.adobe.io/subscriptions/556-RJS-213/programmembers`

### Responses

All responses return a unique request ID via the `X-Request-Id` header.

Example of request ID via header:

`X-Request-Id: WOUBf3fHJNU6sTmJqLL281lOmAEpMZFw`

### Success

When a call is successful, a 202 status is returned.  No response body is returned.

Example of Success Response:

```http
HTTP/1.1 202 Accepted
X-Request-Id: e3d92152-0fb1-444a-8f8f-29d5a2338598
Content-Length: 0
Date: Wed, 18 Oct 2023 18:56:49 GMT
```

### Error

When a call produces an error, a non-202 status is returned along with a response body with additional error detail. The response body is `application/json` and contains a single object with members `error_code` and `message`.

Below are reused error codes from Adobe Developer Gateway.

| HTTP Status Code | error_code | message |
| --- | --- | --- |
| 401 | 401013 | Oauth token is invalid |
| 403 | 403010 | Oauth token is missing |
| 404 | 404040 | Resource not found |
| 429 | 429001 | Service usage limit reached |

Below are error codes that are unique to the Data Ingestion API and are comprised of 3 segments.  The first three digits are the status (returned by Adobe Developer Gateway), followed by a zero "0", followed by three digits.

| HTTP Status Code | error_code | message |
| --- | --- | --- |
| 400 | 4000801 | Bad request |
| 400 | 4000802 | Invalid data |
| 403 | 4030801 | Unauthorized |
| 429 | 4290801 | Daily quota reached |
| 500 | 5000801 | Internal Server Error |

## Retries

When a transient error is detected, the service retries the operation. Retries happen for various reasons, primarily when a dependent service times out or is temporarily not available.

Retry intervals:

* Initial operation and the 1st retry : 5 min 
* 1st and 2nd : 15 min
* 2nd and 3rd : 20 min
* 3rd and 4th : 20 min
* 4th and 5th : 2 hours
* after 5th retry -> 3 hours

## Endpoints

Ingestion endpoints are available for Persons, Custom Objects, Companies, and Program Members.

### Persons

Endpoint used to upsert person records.

| Method | Path |
| --- | --- |
| POST | /subscriptions/{munchkinId}/persons |

#### Headers

| Key | Value |
| --- | --- |
| `Content-Type` | application/json |
| `X-Mkto-User-Token` | {accessToken} |

#### Request body

| Key | Data Type | Required | Value | Default Value |
| --- | --- | --- | --- | --- |
| `priority` | String | No | Priority of the request: normal or high | normal |
| `partitionName` | String | No | Name of person partition | Default |
| `dedupeFields` | Object | No | Attributes to deduplicate on. One or two attribute names are allowed. \<br/> Two attributes are used in an AND operation. For example, if both `email` and `firstName` are specified, they are both used to look up a person using the AND operation. \<br/>Supported attributes are: `id`, `email`, `sfdcAccountId`, `sfdcContactId`, `sfdcLeadId` `sfdcLeadOwnerId`, Custom attributes ("string" and "integer" type only), `email` |  |
| `persons` | Array of Object | Yes | List of attribute name-value pairs for the person | – |

Permissions required are `Read-Write Lead`.

### Persons example

#### Request

`POST /subscriptions/{munchkinId}/persons`

#### Headers

`Content-Type: application/json`
`X-Mkto-User-Token: {accessToken}`

#### Body

```json
{
   "priority": "high",
   "partitionName": "EMEA",
   "dedupeFields": {
      "field1": "email",
      "field2": "firstName"
   },
   "persons":[
      {
         "email": "brooklyn.parker@karnv.com",
         "firstName": "Brooklyn",
         "lastName": "Parker",
         "company": "Karnv"
      },
      {
         "email": "johnny.neal@yvu30.com",
         "firstName": "Johnny",
         "lastName": "Neal",
         "company": "Acme Inc"
      }
   ]
}
```

#### Response

`HTTP/1.1 202`
`X-Request-ID: WOUBf3fHJNU6sTmJqLL281lOmAEpMZFw`

### Custom Objects

Endpoint used to upsert custom object records.

| Method | Path |
| --- | --- |
| POST | `/subscriptions/{munchkinId}/customobjects/{customObjectAPIName}` |

#### Headers

| Key | Value |
| --- | --- |
| `Content-Type` | application/json |
| `X-Mkto-User-Token` | {accessToken} |

#### Request body

| Key | Data Type | Required | Value | Default Value |
| --- | --- | --- | --- | --- |
| `priority` | String | No | Priority of the request: normal, high | normal |
| `dedupeBy` | String | No | Attributes to deduplicate on: dedupeFields, marketoGUID | dedupeFields |
| `customObjects` | Array of Object | Yes | List of attribute name-value pairs for the object. | – |

Required permissions are `Read-Write Custom Object`.

If a link field to a Person is specified in the request and that Person does not exist, several retries occur. If that Person is added during the retry window (65 minutes), then the update is successful. For example, if the link field is `email` on Person, and Person does not exist, then retries occur.

### Custom Objects example

#### Request

`POST /subscriptions/{munchkinId}/customobjects/{customObjectAPIName}`

#### Headers

`Content-Type: application/json`
`X-Mkto-User-Token: {accessToken}`

#### Body

```json
{
   "dedupeBy": "dedupeFields",
   "priority": "high",
   "customObjects": [
      {
         "email": "brooklyn.parker@karnv.com",
         "vin": "20UYA31581L000000",
         "make": "BMW",
         "model": "3-Series 330i",
         "year": 2003
      },
      {
         "email": "johnny.neal@yvu30.com",
         "vin": "19UYA31581L000000",
         "make": "BMW",
         "model": "3-Series 325i",
         "year": 1989
      }
   ]
}
```

#### Response

`HTTP/1.1 202`
`X-Request-ID: WOUBf3fHJNU6sTmJqLL281lOmAEpMZFw`

### Companies

Endpoint used to sync company records. Supports create, update, and upsert operations with deduplication by external company ID or Marketo internal ID.

| Method | Path |
| --- | --- |
| POST | `/subscriptions/{munchkinId}/companies` |

#### Headers

| Key | Value | Required |
| --- | --- | --- |
| `Content-Type` | application/json | Yes |
| `X-Mkto-User-Token` | {accessToken} | Yes |
| `X-Correlation-Id` | Arbitrary string (maximum length 255 characters) | No |
| `X-Request-Source` | Arbitrary string (maximum length 50 characters) | No |

#### Request body

| Key | Data Type | Required | Value | Default Value |
| --- | --- | --- | --- | --- |
| `action` | String | No | Sync action: `createOnly`, `updateOnly`, or `createOrUpdate` | `createOrUpdate` |
| `dedupeBy` | String | No | Field to deduplicate on: `dedupeFields` or `idField` (case-insensitive). For `createOnly` and `createOrUpdate`, only `dedupeFields` is allowed. For `updateOnly`, both are allowed. | `dedupeFields` |
| `input` | Array of Object | Yes | List of company attribute name-value pairs. Accepts JSON key `input` or `companies`. | – |

Each company object in the `input` array supports the following fields:

| Key | Data Type | Required | Description |
| --- | --- | --- | --- |
| `externalCompanyId` | String | Conditional | External company identifier. Required when `dedupeBy` is `dedupeFields`. Not allowed when `dedupeBy` is `idField`. |
| `id` | Long | Conditional | Marketo internal company ID. Required when `dedupeBy` is `idField` and `action` is `updateOnly`. Not allowed when `dedupeBy` is `dedupeFields`. |
| `company` | String | No | Company name. |
| (any field) | Any | No | Additional standard or custom company fields as defined by [Describe Companies](companies.md). Field names are case-insensitive. |

Required permissions are `Read-Write Company`.

### Companies example

#### Request

`POST /subscriptions/{munchkinId}/companies`

#### Headers

`Content-Type: application/json`
`X-Mkto-User-Token: {accessToken}`

#### Body

```json
{
   "action": "createOrUpdate",
   "dedupeBy": "dedupeFields",
   "input": [
      {
         "externalCompanyId": "ext-company-001",
         "company": "Acme Corporation",
         "industry": "Technology",
         "numberOfEmployees": 5000,
         "annualRevenue": 100000000
      },
      {
         "externalCompanyId": "ext-company-002",
         "company": "Globex Industries",
         "industry": "Manufacturing",
         "numberOfEmployees": 1200
      }
   ]
}
```

#### Response

`HTTP/1.1 202`
`X-Request-ID: WOUBf3fHJNU6sTmJqLL281lOmAEpMZFw`

### Companies update-by-ID example

```json
{
   "action": "updateOnly",
   "dedupeBy": "idField",
   "input": [
      {
         "id": 12345,
         "company": "Acme Corporation (Renamed)",
         "numberOfEmployees": 5500
      }
   ]
}
```

### Companies validation rules

| Rule | Detail |
| --- | --- |
| action | Must be one of: `createOnly`, `updateOnly`, `createOrUpdate`. Case-sensitive. |
| dedupeBy | Must be `dedupeFields` or `idField` (case-insensitive). Defaults to `dedupeFields`. |
| dedupeBy + action | `createOnly` and `createOrUpdate` only allow `dedupeFields`. `updateOnly` allows both `dedupeFields` and `idField`. |
| When `dedupeBy=dedupeFields` | Each company must have `externalCompanyId`. Field `id` must not be present. |
| When `dedupeBy=idField` | Each company must have `id`. Field `externalCompanyId` must not be present. |
| `input` / `companies` | Must not be null or empty. |
| Max objects per request | 1,000 |

### Program Members (Sync)

Endpoint used to sync program member status, adding leads to programs or updating their program status.

| Method | Path |
| --- | --- |
| POST | `/subscriptions/{munchkinId}/programmembers` |

#### Headers

| Key | Value | Required |
| --- | --- | --- |
| Content-Type | application/json | Yes |
| X-Mkto-User-Token | {accessToken} | Yes |
| X-Correlation-Id | Arbitrary string (maximum length 255 characters) | No |
| X-Request-Source | Arbitrary string (maximum length 50 characters) | No |

#### Request body

| Key | Data Type | Required | Value | Default Value |
| --- | --- | --- | --- | --- |
| programs | Array of Object | Yes | List of program operations. Each specifies a program, a target status, and the leads to sync. | – |

Each object in the `programs` array contains:

| Key | Data Type | Required | Description |
| --- | --- | --- | --- |
| programId | Long | Yes | The Marketo program ID. Must be a positive integer. |
| status | String | Yes | The program member status to set, for example `"Member"` or `"Influenced"`. Accepts JSON key `statusName` or `status`. The value must not be `"Not in Program"`; use the delete endpoint instead. |
| members | Array of Object | Yes | List of lead references to add or update in the program. Accepts JSON key `input` or `members`. |

Each object in the `members` array contains:

| Key | Data Type | Required | Description |
| --- | --- | --- | --- |
| leadId | Long | Yes | The Marketo lead ID. |
| (any field) | Any | No | Additional custom program member fields. Field names are case-insensitive. |

Required permissions are `Read-Write Lead`.

### Program Members sync example

#### Request

`POST /subscriptions/{munchkinId}/programmembers`

#### Headers

`Content-Type: application/json`
`X-Mkto-User-Token: {accessToken}`

#### Body

```json
{
   "programs": [
      {
         "programId": 1001,
         "status": "Member",
         "members": [
            {
               "leadId": 10001
            },
            {
               "leadId": 10002
            }
         ]
      },
      {
         "programId": 1002,
         "status": "Influenced",
         "members": [
            {
               "leadId": 10003
            }
         ]
      }
   ]
}
```

#### Response

`HTTP/1.1 202`
`X-Request-ID: e3d92152-0fb1-444a-8f8f-29d5a2338598`

### Program Members sync validation rules

| Rule | Detail |
| --- | --- |
| programs | Must not be null or empty. |
| programId | Required. Must be a positive integer. |
| status | Required. Must not be blank. Must not be `"Not in Program"` (case-insensitive). Use the delete endpoint instead. |
| members | Must not be null or empty. |
| leadId | Required for each member in the input array. |
| Max leads per request | 1,000 total members across all programs. |

### Program Members (Delete)

Endpoint used to remove leads from programs. This sets the lead's membership status to `"Not in Program"` and removes the member from that program.

<InlineAlert slots="text" variant="info" />

This endpoint uses POST rather than DELETE because the request requires a JSON body with structured data.

| Method | Path |
| --- | --- |
| POST | `/subscriptions/{munchkinId}/programmembers/delete` |

#### Headers

| Key | Value | Required |
| --- | --- | --- |
| Content-Type | application/json | Yes |
| X-Mkto-User-Token | {accessToken} | Yes |
| X-Correlation-Id | Arbitrary string (maximum length 255 characters) | No |
| X-Request-Source | Arbitrary string (maximum length 50 characters) | No |

#### Request body

| Key | Data Type | Required | Value | Default Value |
| --- | --- | --- | --- | --- |
| programs | Array of Object | Yes | List of program delete operations. Each specifies a program and the leads to remove. | – |

Each object in the `programs` array contains:

| Key | Data Type | Required | Description |
| --- | --- | --- | --- |
| programId | Long | Yes | The Marketo program ID. Must be a positive integer. |
| members | Array of Object | Yes | List of lead references to remove from the program. Accepts JSON key `input` or `members`. |

Each object in the `members` array contains:

| Key | Data Type | Required | Description |
| --- | --- | --- | --- |
| leadId | Long | Yes | The Marketo lead ID. |

Required permissions are `Read-Write Lead`.

### Program Members delete example

#### Request

`POST /subscriptions/{munchkinId}/programmembers/delete`

#### Headers

`Content-Type: application/json`
`X-Mkto-User-Token: {accessToken}`

#### Body

```json
{
   "programs": [
      {
         "programId": 1001,
         "members": [
            {
               "leadId": 10001
            },
            {
               "leadId": 10002
            }
         ]
      },
      {
         "programId": 1002,
         "members": [
            {
               "leadId": 10003
            }
         ]
      }
   ]
}
```

#### Response

`HTTP/1.1 202`
`X-Request-ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Program Members delete validation rules

| Rule | Detail |
| --- | --- |
| programs | Must not be null or empty. |
| programId | Required. Must be a positive integer. |
| members | Must not be null or empty. |
| leadId | Required for each member in the input array. |
| Max leads per request | 1,000 total members across all programs. |

## Limits

Here is an updated list of guardrails:

* Maximum size of request: 1 MB
* Maximum objects per request per object type: 1,000
* Maximum requests per second per client ID: 5,000
* Maximum objects per day: 10,000,000

These limits apply uniformly across Persons, Custom Objects, Companies, and Program Members. For Program Members, "objects per request" is the total number of lead references across all programs in a single request.

## Data Ingestion API vs REST API

Here is a list of differences between Data Ingestion API and other Marketo REST APIs:

* To authenticate, you must pass access token using the `X-Mkto-User-Token` header
* The URL domain name is `mkto-ingestion-api.adobe.io`
* The URL path begins with `/subscriptions/MunchkinId`
* There are no query parameters
* If the call is successful, a 202 status is returned and the response body is empty
* If a call fails, a non-202 status is returned and the response body contains `{ "error_code" : "Error Code", "message" : "Message" }`
* The request ID is returned via `X-Request-Id` header
