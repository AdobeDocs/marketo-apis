---
title: Get Visitor Data
description: "Get real-time visitor identification using the RTP User Context API with params, callback example, and sample responses for segments, ABM, and location."
---

# Get Visitor Data

Use this method to get visitor identification data in real time.

- You must be a Web Personalization customer and have the [RTP tag deployed](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript) on your site before using the User Context API.
- RTP does not support Account Based Marketing named account lists. ABM lists and code only pertain to the uploaded account lists (CSV files) managed within RTP.

If an error occurs, the response JSON includes an error message. If the API returns a 500 code, contact support and provide the request that caused the error.

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| `get` | Required | String | Method action. |
| `visitor` | Required | String | Method name. |
| `callback` | Required | Function | Callback function to be triggered for each campaign returned. |

## Examples

The following example gets visitor identification data.

```javascript
function callbackFunction() {
    console.log('RTP is awesome!');
}
rtp('get', 'visitor', callbackFunction);
```

Response with Segment Match:

The following response includes `matchedSegments` because the visitor matched real-time segments before the Get Visitor Data API call.

```json
{
    "status": 200,
    "results": {
        "matchedSegments": [
            {
                "name": "first click",
                "id": 177
            }
        ],
        "abm": [
            {
                "code": 4,
                "name": "abm_saleforce_customers"
            },
            {
                "code": 5,
                "name": "abm_top_customers"
            }
        ],
        "org": "Marketo",
        "location": {
            "country": "United States",
            "city": "San Mateo",
            "state": "CA"
        },
        "industries": [
            "Software & Internet"
        ],
        "isp": false
    }
}
```

Response without Segment Match:

The following response does not include `matchedSegments` because the visitor did not match any real-time segments before the Get Visitor Data API call.

```json
{
    "status": 200,
    "results": {
        "abm": [
            {
                "code": 4,
                "name": "abm_saleforce_customers"
            },
            {
                "code": 5,
                "name": "abm_top_customers"
            }
        ],
        "org": "Marketo",
        "location": {
            "country": "United States",
            "city": "San Mateo",
            "state": "CA"
        },
        "industries": [
            "Software & Internet"
        ],
        "isp": false
    }
}
```
