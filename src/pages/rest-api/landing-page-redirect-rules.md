---
title: Landing Page Redirect Rules
description: "Use Marketo Asset REST APIs to create, query, update, and delete landing page redirect rules with filters, pagination, hostname options, non-Marketo targets."
---

# Landing Page Redirect Rules

[Landing Page Redirect Rules Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules)

Use the Landing Page Redirect Rules REST APIs to query, create, update, and delete landing page redirect URLs.

Redirect rules send one landing page URL to another page URL. The source and destination can be Marketo or non-Marketo pages. For related product documentation, see [Marketo Engage documentation](https://experienceleague.adobe.com/docs/marketo/using/home.html).

## Query

Query landing page redirect rules [by ID](#by_id) or by [browsing](#browse).

### By Id

The [Get Landing Page Redirect Rules by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageRedirectRuleByIdUsingGET) endpoint takes one redirect-rule `id` path parameter and returns the matching record.

```http
GET /rest/asset/v1/redirectRule/{id}.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "3d0#1707b2521e4",
    "warnings": [],
    "result": [
        {
            "id": 20,
            "redirectFromUrl": "https://calqeauto.com/DefDelPro1_LandingPage1.html",
            "hostname": "calqeauto.com",
            "redirectFrom": {
                "type": "landingPageId",
                "value": 5483
            },
            "redirectTo": {
                "type": "landingPageId",
                "value": 5559
            },
            "redirectToUrl": "https://calqeauto.com/DefDelPro1_LandingPage2.html",
            "createdAt": "2020-02-25T06:56:44Z+0000",
            "updatedAt": "2020-02-25T06:56:44Z+0000"
        }
    ]
}
```

### Browse

The [Get Landing Page Redirect Rules](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageRedirectRulesUsingGET) endpoint returns landing page redirect-rule records.

Use optional query parameters to filter the results.

The `offset` parameter is an integer that specifies the maximum number of entries to return (default is 20). Maximum is 200. The `maxReturn` parameter is an integer that specifies where to begin retrieving entries. Can be used on conjunction with offset (default is 0).

The `hostname` parameter filters by landing page hostname.

The `redirectToLandingPageId` integer filters by the destination landing page ID. The `redirectToPath` parameter filters by the destination landing page path.

The `earliestUpdatedAt` and `latestUpdatedAt` parameters set the low and high date-time boundaries. The endpoint returns rules created or updated within the range.

```http
GET /rest/asset/v1/redirectRules.json&maxReturn=3
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "12213#1707b27efb5",
    "warnings": [],
    "result": [
        {
            "id": 5,
            "redirectFromUrl": "https://www.kirtideep.contact/LandingPage2.html",
            "hostname": "www.kirtideep.contact",
            "redirectFrom": {
                "type": "landingPageId",
                "value": 5406
            },
            "redirectTo": {
                "type": "landingPageId",
                "value": 5404
            },
            "redirectToUrl": "https://www.kirtideep.contact/www.showLogs.com.html",
            "createdAt": "2019-11-14T06:26:29Z+0000",
            "updatedAt": "2019-11-14T06:26:29Z+0000"
        },
        {
            "id": 6,
            "redirectFromUrl": "https://www.kirtideep.contact/www.showLogs.com.html",
            "hostname": "www.kirtideep.contact",
            "redirectFrom": {
                "type": "landingPageId",
                "value": 5404
            },
            "redirectTo": {
                "type": "url",
                "value": "www.contactLogs.com"
            },
            "redirectToUrl": "www.contactLogs.com",
            "createdAt": "2019-11-14T06:27:10Z+0000",
            "updatedAt": "2019-11-14T06:27:10Z+0000"
        },
        {
            "id": 7,
            "redirectFromUrl": "https://www.kirtideep.contact/contact/log/check",
            "hostname": "www.kirtideep.contact",
            "redirectFrom": {
                "type": "path",
                "value": "/contact/log/check"
            },
            "redirectTo": {
                "type": "landingPageId",
                "value": 5404
            },
            "redirectToUrl": "https://www.kirtideep.contact/www.showLogs.com.html",
            "createdAt": "2019-11-14T06:27:49Z+0000",
            "updatedAt": "2019-11-14T06:27:49Z+0000"
        }
    ]
}
```

## Create

Call the [Create Landing Page Redirect Rule](https://developer.adobe.com/marketo-apis/api/asset#operation/createLandingPageRedirectRuleUsingPOST) endpoint with an `application/x-www-form-urlencoded` POST request. The request has three required parameters.

The `hostname` parameter specifies the landing page hostname. It must belong to a branding domain or alias and cannot exceed 255 characters.

The `redirectFrom` parameter specifies the source landing page as a JSON object with a type/value pair. The `type` attribute can be `landingPageId` for a Marketo landing page or `path` for a non-Marketo page.

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'get' | Required | String | Method action. |
| 'visitor' | Required | String | Method name. |
| callback | Required | Function | Callback function to be triggered for each campaign returned. |

The `redirectTo` parameter specifies the destination as a JSON object with a type/value pair. The `type` attribute can be `landingPageId` for a Marketo landing page or `url` for a non-Marketo page.

| Landing Page Type | redirectTo type | Example |
| --- | --- | --- |
| Marketo | landingPageId | \{"type":"landingPageId","value":"1774"} |
| Non-Marketo | url | \{"type":"url","value":"www.contactLogs.com"} |

For more information, see [Redirect a Marketo landing page to another page](https://experienceleague.adobe.com/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-actions/redirect-a-marketo-landing-page-to-another-page.html).

```http
POST /rest/asset/v1/redirectRules.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
hostname=calqeauto.com&redirectFrom={"type":"landingPageId", "value":"5483"}&redirectTo={"type":"landingPageId", "value":"5559"}
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "d7c6#1707b223522",
    "warnings": [],
    "result": [
        {
            "id": 20,
            "redirectFromUrl": "https://calqeauto.com/DefDelPro1_LandingPage1.html",
            "hostname": "calqeauto.com",
            "redirectFrom": {
                "type": "landingPageId",
                "value": 5483
            },
            "redirectTo": {
                "type": "landingPageId",
                "value": 5559
            },
            "redirectToUrl": "https://calqeauto.com/DefDelPro1_LandingPage2.html",
            "createdAt": "2020-02-25T06:56:44Z+0000",
            "updatedAt": "2020-02-25T06:56:44Z+0000"
        }
    ]
}
```

## Update

The [Update Landing Page Redirect Rules](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageRedirectRuleUsingPOST) endpoint takes one redirect-rule `id` path parameter. Send the update as an `application/x-www-form-urlencoded` POST request.

Pass one or more of these parameters to select the attributes to update: `hostname`, `redirectFrom`, or `redirectTo`.

The response returns the updated redirect-rule record.

```http
POST /rest/asset/v1/redirectRule/{id}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
redirectTo={"type":"landingPageId", "value":"5561"}
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "57b2#1707b3852d7",
    "warnings": [],
    "result": [
        {
            "id": 20,
            "redirectFromUrl": "https://calqeauto.com/DefDelPro1_LandingPage1.html",
            "hostname": "calqeauto.com",
            "redirectFrom": {
                "type": "landingPageId",
                "value": 5483
            },
            "redirectTo": {
                "type": "landingPageId",
                "value": 5561
            },
            "redirectToUrl": "https://calqeauto.com/DefDelPro1_LandingPage3.html",
            "createdAt": "2020-02-25T06:56:44Z+0000",
            "updatedAt": "2020-02-25T07:20:53Z+0000"
        }
    ]
}
```

## Delete

The [Delete Landing Page Redirect Rule by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteLandingPageRedirectRuleUsingPOST) endpoint takes one redirect-rule `id` path parameter.

```http
POST /rest/asset/v1/redirectRule/{id}/delete.json
```

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "d505#154d01c8364",
  "result": [
    {
      "id": 2
    }
  ]
}
```

## Browse Landing Page Domains

The [Get Landing Page Domains](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageDomainsUsingGET) endpoint returns landing page domain records.

Use two optional query parameters to filter results.

The `offset` parameter is an integer that specifies the maximum number of entries to return (default is 20, maximum is 200).

The `maxReturn` parameter is an integer that specifies where to begin retrieving entries. Can be used on conjunction with `offset` (default is 0).

```http
POST /rest/asset/v1/landingPageDomains.json?maxReturn=3
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "6eb8#1707b43d3cb",
    "warnings": [],
    "result": [
        {
            "hostname": "calqeauto.com",
            "type": "domain"
        },
        {
            "hostname": "www.google.com",
            "type": "domain-alias"
        },
        {
            "hostname": "www.kirti.com",
            "type": "domain-alias"
        }
    ]
}
```
