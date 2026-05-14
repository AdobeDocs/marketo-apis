---
title: Landing Page Redirect Rules
description: "Use Marketo Asset REST APIs to create, query, update, and delete landing page redirect rules with filters, pagination, hostname options, non-Marketo targets."
---

# Landing Page Redirect Rules

[Landing Page Redirect Rules Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules)

Marketo offers a set of REST APIs for performing CRUD operations on Landing Page Redirect URLs. These APIs follow the standard interface pattern for asset APIs providing Query, Create, Update, and Delete options.

Landing Page Redirect Rules provide the capability to redirect a landing page URL to another page URL. You can redirect Marketo landing pages, non-Marketo landing pages, or combinations thereof. Additional information on Redirect Landing Page Rules can be found [here](https://experienceleague.adobe.com/docs/marketo/using/home.html).

## Query

Querying landing page redirect rules follows the standard query types for assets of [by id](#by_id), and [browsing](#browse).

### By Id

The [Get Landing Page Redirect Rules by Id](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/getLandingPageRedirectRuleByIdUsingGET) endpoint takes a single landing page rule redirect `id` path parameter and returns a single landing page redirect rule record.

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

The [Get Landing Page Redirect Rules](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/getLandingPageRedirectRulesUsingGET) endpoint returns a list of landing page redirect rule records.

There are several optional query parameters that can be passed to filter results.

The `offset` parameter is an integer that specifies the maximum number of entries to return (default is 20). Maximum is 200. The `maxReturn` parameter is an integer that specifies where to begin retrieving entries. Can be used on conjunction with offset (default is 0).

The `hostname` parameter can be used to filter on hostname of the landing pages.

The `redirectToLandingPageId` is an integer that can be used to filter on the Id of landing page that you are redirecting to. The `redirectToPath` can be used to filter on the path of the landing pages that you are redirecting to.

The `earliestUpdatedAt` and `latestUpdatedAt` parameters allow you to set low and high datetime watermarks for returning landing page redirect rules which were either updated or initially created within the given range.

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

The [Create Landing Page Redirect Rule](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/createLandingPageRedirectRuleUsingPOST) endpoint is executed with an application/x-www-form-urlencoded POST that has the following three required parameters.

The `hostname` parameter specifies the hostname for the landing page. This should belong to a branding domain or alias. Maximum length is 255 characters.

The `redirectFrom` parameter specifies the source landing page. This is a JSON object that contains a type/value pair which determines whether the source is a Marketo landing page, or a non-Marketo landing page. The `type` attribute can be either "landingPageId" or "path".

| Parameter | Optional/Required | Type | Description |
| --- | --- | --- | --- |
| 'get' | Required | String | Method action. |
| 'visitor' | Required | String | Method name. |
| callback | Required | Function | Callback function to be triggered for each campaign returned. |

The `redirectTo` parameter specifies the target landing page. This is a JSON object that contains a type/value pair which determines whether the source is a Marketo landing page, or a non-Marketo landing page. The `type` attribute can be either "landingPageId" or "url".

| Landing Page Type | redirectTo type | Example |
| --- | --- | --- |
| Marketo | landingPageId | {"type":"landingPageId","value":"1774"} |
| Non-Marketo | url | {"type":"url","value":"www.contactLogs.com"} |

More information on creating landing page redirect rules can be found [here](https://experienceleague.adobe.com/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-actions/redirect-a-marketo-landing-page-to-another-page.html).

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

The [Update Landing Page Redirect Rules](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/updateLandingPageRedirectRuleUsingPOST) endpoint takes a single landing page redirect rule `id` path parameter. This endpoint is executed with an application/x-www-form-urlencoded POST.

As with the create call described above, one or more of the following query parameters are passed to specify which attribute of the rule to update: `hostname`, `redirectFrom`, `redirectTo`.

The updated landing page redirect rule record is returned in the response.

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

The [Delete Landing Page Redirect Rule by Id](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/deleteLandingPageRedirectRuleUsingPOST) endpoint takes a single landing page rule redirect `id` path parameter.

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

The [Get Landing Page Domains](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Redirect-Rules/operation/getLandingPageDomainsUsingGET) endpoint returns a list of landing page domain records.

There are two optional query parameters that can be passed to filter results.

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
