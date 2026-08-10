---
title: Landing Pages
description: "Use the Marketo REST API to query metadata and content, create, update, approve, delete, and clone landing pages, including guided and free-form types."
---

# Landing Pages

[Landing Page Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Pages)

Landing pages are web pages hosted by Marketo. Use the Landing Pages REST APIs to query and manage their metadata, content, lifecycle, and preview.

## Query

Query landing pages [by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageByNameUsingGET), [by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageByIdUsingGET), or by [browsing](https://developer.adobe.com/marketo-apis/api/asset#operation/browseLandingPagesUsingGET). These queries return metadata only. Query a landing page's content sections separately by page ID.

Querying landing page content returns its available content sections. A section must appear in this list before you can update it.

```http
GET /rest/asset/v1/landingPage/{id}/content.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "6307#154ea1689d7",
    "result": [
        {
            "id": "67",
            "type": "Form",
            "index": 1,
            "content": {
                "content": "189",
                "contentType": "Form",
                "contentUrl": "https://app-devlocal1.marketo.com/#FO189A1ZN13LA1"
            },
            "formattingOptions": {
                "zIndex": 15,
                "left": "359px",
                "top": "122px"
            }
        }
    ]
}
```

Guided landing pages include sections defined by their template. Free-form pages do not include predefined sections, so add their content before editing it.

The format of the `content` attribute depends on the `type` attribute and whether the field is static or dynamic.

## Create and Update

[Create a landing page](https://developer.adobe.com/marketo-apis/api/asset#operation/createLandingPageUsingPOST) from a template. The page name, template ID, and destination folder are required. See the endpoint reference for optional metadata.

The [landing page content](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Content) endpoints support these content types: `richText`, `HTML`, `Form`, `Image`, `Rectangle`, and `Snippet`.

```http
POST rest/asset/v1/landingPages.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=createLandingPage&folder={"type": "Folder", "id": 11}&template=1&description=this is a test&workspace=default&title=test create&keywords=awesome&formPrefill=false
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "7a39#154cf7922c6",
    "result": [
        {
            "id": 27,
            "name": "createLandingPage",
            "description": "this is a test",
            "createdAt": "2016-05-20T18:41:43Z+0000",
            "updatedAt": "2016-05-20T18:41:43Z+0000",
            "folder": {
                "type": "Folder",
                "value": 11,
                "folderName": "Landing Pages"
            },
            "workspace": "Default",
            "status": "draft",
            "template": 1,
            "title": "test create",
            "keywords": "awesome",
            "robots": "index, nofollow",
            "formPrefill": false,
            "mobileEnabled": false,
            "URL": "https://app-devlocal1.marketo.com/lp/622-LME-718/createLandingPage.html",
            "computedUrl": "https://app-devlocal1.marketo.com/#LP27B2"
        }
    ]
}
```

Landing page metadata can be updated with the [Update Landing Page Metadata endpoint](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageUsingPOST).

## Approval

Landing pages use the standard draft and approved model. Updates apply to the draft and become live only after approval.

## Delete

Before deleting a landing page, ensure that it is not approved and that no other Marketo asset references it. Delete pages individually with the [Delete Landing Page](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteLandingPageByIdUsingPOST) endpoint. You cannot use this API to delete pages with embedded social buttons.

## Clone

Clone a landing page with an `application/x-www-url-formencoded` POST request.

The `id` path parameter specifies the source landing page.

The `name` parameter specifies the new landing page name.

The `folder` parameter specifies the parent folder. Pass it as an embedded JSON object containing `id` and `type`.

The `template` parameter specifies the source landing page template ID.

The optional `description` parameter describes the new landing page.

```http
POST /rest/asset/v1/landingPage/{id}/clone.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=MyNewLandingPage&folder={"type":"Program","id":1119}&template=57
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "1078d#1683e4881c6",
    "warnings": [],
    "result": [
        {
            "id": 3291,
            "name": "MyNewLandingPage",
            "createdAt": "2019-01-11T18:59:25Z+0000",
            "updatedAt": "2019-01-11T18:59:25Z+0000",
            "folder": {
                "type": "Program",
                "value": 1119,
                "folderName": "DefaultProgramWithGuidedLP"
            },
            "workspace": "Default",
            "status": "draft",
            "template": 57,
            "robots": "index, nofollow",
            "formPrefill": false,
            "mobileEnabled": false,
            "URL": "http://na-abm.marketo.com/lp/284-RPR-133/DefaultProgramWithGuidedLPPerkutoTestLP-Clone-1.html",
            "computedUrl": "https://app-abm.marketo.com/#LP3291A1LA1"
        }
    ]
}
```

## Manage Content Section

Content sections are ordered by their `index` property and displayed according to the client's CSS rules. Use the [Add](https://developer.adobe.com/marketo-apis/api/asset#operation/addLandingPageContentUsingPOST), [Update](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageContentUsingPOST), and [Delete](https://developer.adobe.com/marketo-apis/api/asset#operation/removeLandingPageContentUsingPOST) endpoints to manage sections. Use [Get Landing Page Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageContentUsingGET) to query them.

Each section has `type` and `value` parameters. The `type` determines the expected `value`. Pass data to these endpoints as POST `x-www-form-urlencoded`, not as JSON.

**Section Types**

| Type | Value |
| --- | --- |
| DynamicContent | The id of the segmentation. |
| Form | The id of the form. |
| HTML | Text HTML content. |
| Image | The id of the image asset. |
| Rectangle | Empty. |
| RichText | Text HTML content.  May only contain rich text elements. |
| Snippet | The id of the snippet. |
| SocialButton | The id of  the social button. |
| Video | The id of the video. |

For free-form pages, add each required content section. Marketo embeds them in the `div` element with the ID `mktoContent`.

Guided pages can include predefined elements returned by [Get Landing Page Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageContentUsingGET). Use the corresponding endpoints to add elements or [update their content](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageContentUsingPOST).

### Dynamic Content

To make a section dynamic, first ensure that it appears in the landing page's content list. Then use [Update Landing Page Content Section](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageContentUsingPOST) to set its type to `DynamicContent`.

Marketo creates underlying dynamic sections that inherit the converted element's base type and content.

```http
GET /rest/asset/v1/landingPage/{id}/dynamicContent/RVMtNDg=.json
```

```json
{
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "46e#1560fa169d9",
  "result": [
    {
      "createdAt": "2016-07-21",
      "updatedAt": "2016-07-21",
      "segmentation": 1007,
      "segments": [
        {
          "segmentId": 1018,
          "segmentName": "Default",
          "type": "RichText",
          "content": "\n\t\t\t\t\t\t\tAlice was beginning to get very tired of sitting by her sister on the bank, and having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.\n\t\t\t\t\t\t"
        },
        {
          "segmentId": 1017,
          "segmentName": "New Segment",
          "type": "RichText",
          "content": "\n\t\t\t\t\t\t\tAlice was beginning to get very tired of sitting by her sister on the bank, and having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.\n\t\t\t\t\t\t"
        }
      ]
    }
  ]
}
```

[Updating the content](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageDynamicContentUsingPOST) for each individual segment is done on the basis of the segment id.

```http
POST /rest/asset/v1/landingPage/{id}/dynamicContent/{dynamicContentId}.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
segment=New Segment&value=New Content
```

```json
 {
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "7516#14e08fe7cbbc",
  "result": [
    {
      "id": 1012
    }
  ]
}
```

## Variables

Guided landing pages support editable variables that contain element values. Modify variables in the landing page editor:

![Landing Page Variables](assets/landing-page-variables.png)

Variables are meta tags in the `head` element of a guided landing page template. Supported types are String, Color, and Boolean. The following example defines one variable of each type:

```html
<head>
  <meta charset="utf-8">
  <meta class="mktoString" mktoName="My String Variable" id="stringVar" default="Hello World!">
  <meta class="mktoColor" mktoName="My Color Variable" id="colorVar" default="#ffffff">
  <meta class="mktoBoolean" mktoName="My Boolean Variable" id="boolVar" default="true">
</head>
```

For more information see "Editable Variable" section in [Create a Guided Landing Page Template](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/create-a-guided-landing-page-template) documentation.

### Query

Retrieve variables for a guided landing page by passing the landing page id to Get Landing Page Variables endpoint.

```http
GET /rest/asset/v1/landingPage/{id}/variables.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "10843#15a6d7e5fa1",
    "result": [
        {
            "id": "stringVar",
            "value": "Hello World!",
            "type": "string"
        },
        {
            "id": "colorVar",
            "value": "#FFFFFF",
            "type": "color"
        },
        {
            "id": "boolVar",
            "value": "true",
            "type": "boolean"
        }
    ]
}
```

This guided landing page contains three variables: `stringVar`, `colorVar`, and `boolVar`.

### Update

Update a variable for a guided landing page by passing the landing page id, the variable id, and the variable value to Update Landing Page Variables endpoint.

```http
POST /rest/asset/v1/landingPage/{id}/variable/{variableId}.json?value={newValue}
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "2b07#15a6db77da3",
    "result": [
        {
            "id": "stringVar",
            "value": "Hello Brave New World!",
            "type": "String"
        }
    ]
}
```

## Preview Landing Page

Use [Get Landing Page Full Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageFullContentUsingGET) to retrieve a browser-rendered preview. The landing page `id` path parameter is required. The endpoint also accepts two optional query parameters:

- `segmentation`: An array of JSON objects containing `segmentationId` and `segmentId`. The preview represents a lead that matches those segments.
- `leadId`: An integer lead ID. The preview represents the specified lead.

```http
GET /rest/asset/v1/landingPage/{id}/fullContent.json?leadId=1001&segmentation=[{"segmentationId":1030,"segmentId":1103}]
```

```json
{
  "success": true,
  "errors": [],
  "requestId": "119ab#17692849f1e",
  "warnings": [],
  "result": [
    {
      "id": 1023,
      "content": "<!DOCTYPE html>\n<html>\n <head>\n <meta charset=\"utf-8\">\n \n \n <meta name=\"robots\" content=\"index, nofollow\">\n <title></title>\n <style>\n body {background:#FFFFFF} \n #myConditionalDisplayArea {\n display: true;\n }\n </style>\n <link rel=\"shortcut icon\" href=\"/favicon.ico\" type=\"image/x-icon\" >\n<link rel=\"icon\" href=\"/favicon.ico\" type=\"image/x-icon\" >\n\n\n<style>.mktoGen.mktoImg {display:inline-block; line-height:0;}</style>\n </head>\n <body id=\"bodyId\">\n \n Hello Brave New World!\n <div class=\"mktoText\" id=\"exampleText\"><div>This is an example editable text area.</div>\n<div>Lead Full Name = Hanna Crawford</div>\n<div><br /></div>\n <script type=\"text/javascript\" src=\"//munchkin.marketo.net//munchkin.js\"></script><script>Munchkin.init('123-ABC-456', {customName: 'Test-Landing-Page-APIs_Guided-Landing-Page---deverly', PURL_VISIT_TOKEN, wsInfo: 'j1RR'});</script>\n<div id=\"mktoClickBlockingDiv\"></div>\n </body>\n</html>\n"
    }
  ]
}
```
