---
title: Dynamic Content
description: "Configure section-level Marketo dynamic content via REST APIs using segmentations to personalize emails, landing pages, and snippets with endpoints and examples"
---

# Dynamic Content

Marketo facilitates the usage of dynamic content through lead segmentation on multiple asset types:

- Emails
- Landing Pages
- Snippets

## Overview

Dynamic content is implemented at the section level, by designating specific variations of a section to be served to a lead based on their qualification in a segment within a chosen segmentation. If a piece of content is configured to serve dynamic content based on a certain segmentation, then a lead seeing that content is served the content variation which matches the segment that they fall in, or the Default content, if they do not qualify for a segment.

## Example

To demonstrate, let's look at an email example, where we have a Region (US) segmentation, and want to display an event promotion only for leads who fall in the Southwest segment, which includes California, Nevada, Utah, Colorado, Arizona, and New Mexico leads. To do this, we make an editable section in our email with id "Q1-promotion-banner" into a DynamicContent section. To do this, we must use the [Update Email Content Section](https://developer.adobe.com/marketo-apis/api/asset#tag/Emails/operation/updateEmailComponentContentUsingPOST) endpoint for our email. The `value` parameter is used to specify the Id of the segmentation.

Note: Both Emails and Landing Pages follow this pattern. Snippets have a different pattern, detailed in the Snippets API documentation.

The following example sets the section to be a Dynamic Content section, segmented by segmentation 1001.

```http
POST /rest/asset/v1/email/{id}/content/Q1-promotion-banner.json
```

```text
type=DynamicContent&value=1001
```

```json
{
  "success": true,
  "errors": [],
  "requestId": "891b#1729b34b9a5",
  "warnings": [],
  "result": [
    {
      "id": 1909
    }
  ]
}
```

To add content for individual segments, we must call the [Update Email Dynamic Content Section](https://developer.adobe.com/marketo-apis/api/asset#tag/Emails/operation/updateEmailDynamicContentUsingPOST) endpoint for the specific section.

The following example sets the section to show our special banner image for leads in the Southwest segment instead of the default. If we wanted to create more variations for more segments, then we would call this endpoint again for each segment and section.

```http
POST /rest/asset/v1/email/{id}/dynamicContent/{dynamicContentId}.json
```

```text
segment=Southwest&type=HTML&value=<img src='//www.example.com/SuperSpecialBannerForAmericanSouthwestLeads.jpg'/>
```

```json
{
  "success": true,
  "errors": [],
  "requestId": "891b#1729b34b9a5",
  "warnings": [],
  "result": [
    {
      "id": 1637
    }
  ]
}
```

## Segmentation

Segmentation is the core of Marketo dynamic content. A segmentation is a user-defined list of individual sets of rules which are evaluated from top to bottom against the entire lead database. A lead may only be a member of one segment in each segmentation, and will be a member of the first one that it qualifies for in each segmentation. If it does not qualify for a segment, then it will be a member of the Default segment, and will receive the default content for any given piece of dynamic content using that segmentation.

### List

Segmentations have a list endpoint that returns a response with a list of available segmentations.

```http
GET /rest/asset/v1/segmentation.json
```

```json
{
  "success": true,
  "warnings": [ ],
  "errors": [ ],
  "requestId": "78eb#14e9de95868",
  "result": [
    {
      "id": 1001,
      "name": "My Industry Segmentation",
      "description": "",
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:10Z+0000",
      "url": "https://app-abm.marketo.com/#SG1001A1",
      "folder": {
        "type": "Program",
        "value": 396,
        "folderName": null
      },
      "status": "approved",
      "workspace": "Default"
    },
    {
      "id": 1002,
      "name": "My Country Segmentation",
      "description": "",
      "createdAt": "2015-04-06T18:28:23Z+0000",
      "updatedAt": "2015-04-06T18:37:18Z+0000",
      "url": "https://app-abm.marketo.com/#SG1002A1",
      "folder": {
        "type": "Program",
        "value": 396,
        "folderName": null
      },
      "status": "approved",
      "workspace": "Default"
    }
  ]
}
```

Segmentations also have an endpoint that returns a response with a list of segments from a parent segmentation.

```http
GET /rest/asset/v1/segmentation/1001/segments.json
```

```json
{
  "success": true,
  "warnings": [ ],
  "errors": [ ],
  "requestId": "2031#14e9df08796",
  "result": [
    {
      "id": 1001,
      "name": "Manufacturing",
      "description": null,
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:09Z+0000",
      "status": "approved",
      "segmentationId": 1001
    },
    {
      "id": 1002,
      "name": "Healthcare",
      "description": null,
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:09Z+0000",
      "url": "https://app-abm.marketo.com/#SL769688A1",
      "status": "approved",
      "segmentationId": 1001
    },
    {
      "id": 1003,
      "name": "Financial",
      "description": null,
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:09Z+0000",
      "url": "https://app-abm.marketo.com/#SL769690A1",
      "status": "approved",
      "segmentationId": 1001
    },
    {
      "id": 1004,
      "name": "Technology",
      "description": null,
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:09Z+0000",
      "url": "https://app-abm.marketo.com/#SL769692A1",
      "status": "approved",
      "segmentationId": 1001
    },
    {
      "id": 1005,
      "name": "Default",
      "description": null,
      "createdAt": "2015-04-06T18:23:32Z+0000",
      "updatedAt": "2015-04-06T18:37:09Z+0000",
      "url": "https://app-abm.marketo.com/#SL769694A1",
      "status": "approved",
      "segmentationId": 1001
    }
  ]
}
```
