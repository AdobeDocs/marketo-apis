---
title: Usage
description: "Monitor Marketo REST API usage and errors with daily and last-7-days stats endpoints, including per-user counts and error code totals."
---

# Usage

[Usage Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Usage)

The Usage APIs provide a summary of REST API consumption and error activity for your subscription. These endpoints are useful for monitoring integrations, tracking daily call volume, and identifying error trends over time.

Usage data includes a total count of API calls and a per-user breakdown. Error data includes a total count of errors and a breakdown by error code.

The Usage APIs use the same authentication method as other Marketo REST APIs. Pass the access token in the `Authorization: Bearer {accessToken}` header.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/rest/v1/stats/usage.json` | Retrieves API usage for the current day. |
| GET | `/rest/v1/stats/usage/last7days.json` | Retrieves API usage for the last 7 days. |
| GET | `/rest/v1/stats/errors.json` | Retrieves API errors for the current day. |
| GET | `/rest/v1/stats/errors/last7days.json` | Retrieves API errors for the last 7 days. |

## Daily Usage

Retrieves API usage for the current day.

```http
GET /rest/v1/stats/usage.json
```

```json
{
   "requestId": "5f7f#17d7d8f2b6f",
   "success": true,
   "result": [
      {
         "date": "2015-10-17",
         "total": 1120,
         "users": [
            {
               "userId": "some.body@yahoo.com",
               "count": 200
            },
            {
               "userId": "some.body@marketo.com",
               "count": 200
            },
            {
               "userId": "some.body@gmail.com",
               "count": 720
            }
         ]
      }
   ]
}
```

Each object in the `result` array contains one day of usage totals and a per-user breakdown.

## Last 7 Days Usage

Retrieves API usage for the last 7 days. Each element in the `result` array represents one day.

```http
GET /rest/v1/stats/usage/last7days.json
```

## Daily Errors

Retrieves API errors for the current day.

```http
GET /rest/v1/stats/errors.json
```

```json
{
   "requestId": "5f7f#17d7d8f2b6f",
   "success": true,
   "result": [
      {
         "date": "2015-10-17",
         "total": 73,
         "errors": [
            {
               "errorCode": "604",
               "count": 1
            },
            {
               "errorCode": "609",
               "count": 56
            },
            {
               "errorCode": "610",
               "count": 16
            }
         ]
      }
   ]
}
```

Each object in the `result` array contains one day of error totals and a breakdown by error code.

## Last 7 Days Errors

Retrieves API errors for the last 7 days. Each element in the `result` array represents one day.

```http
GET /rest/v1/stats/errors/last7days.json
```

## Response Members

### Usage Result Object

| Name | Data Type | Description |
| --- | --- | --- |
| `date` | String | The date for the usage summary in `YYYY-MM-DD` format. |
| `total` | Integer | Total number of API calls for that day. |
| `users` | Array | List of per-user usage counts for that day. |

### Usage User Object

| Name | Data Type | Description |
| --- | --- | --- |
| `userId` | String | API user identifier. |
| `count` | Integer | Number of API calls made by that user for the day. |

### Error Result Object

| Name | Data Type | Description |
| --- | --- | --- |
| `date` | String | The date for the error summary in `YYYY-MM-DD` format. |
| `total` | Integer | Total number of API errors for that day. |
| `errors` | Array | List of per-error-code counts for that day. |

### Error Object

| Name | Data Type | Description |
| --- | --- | --- |
| `errorCode` | String | Marketo error code. |
| `count` | Integer | Number of times that error occurred for the day. |

## Notes

Each of your API users is reported individually in the usage response. Splitting integrations across separate API users makes it easier to identify which service is consuming quota and producing errors.
