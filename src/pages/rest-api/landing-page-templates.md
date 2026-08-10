---
title: Landing Page Templates
description: "Manage Marketo Landing Page Templates via REST API endpoints for free form and guided types, query by id or name, create, update HTML, clone, Munchkin."
---

# Landing Page Templates

[Landing Page Template Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates)

Landing page templates are parent resources for Marketo landing pages. Each landing page derives its initial content structure from its parent template.

## Template Types

Marketo provides free-form and guided landing page templates. Free-form templates provide a loosely structured editing experience. Guided templates can restrict element types and locations at the template level.

For a detailed comparison, see [Understanding free-form vs. guided landing pages](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/understanding-landing-pages/understanding-free-form-vs-guided-landing-pages).

## Query

Query landing page templates [by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageTemplateByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageTemplateByNameUsingGET), or by [browsing](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageTemplatesUsingGET). These endpoints return template metadata. Retrieve HTML content separately for each template by ID.

## Create and Update

Templates are created as empty assets with metadata. The `name` and `folder` parameters are required. The `description`, `templateType`, and `enableMunchkin` parameters are optional.

The `templateType` value can be `freeform` or `guided` and defaults to `freeForm`. The `enableMunchkin` value defaults to `false`. When enabled, it prevents Munchkin tracking on the template's child landing pages.

```http
POST /rest/asset/v1/landingPageTemplates.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=New LPT - PHP&folder={"id":12,"type":"Folder"}
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "11b7#14dfe1e3bcf",
    "result": [
        {
            "id": 286,
            "name": "assetAPITest",
            "description": "test",
            "createdAt": "2015-06-16T20:45:03Z+0000",
            "updatedAt": "2015-06-16T20:45:03Z+0000",
            "url": "https://app-devlocal1.marketo.com/#LT286B2ZN12",
            "folder": {
                "type": "Folder",
                "value": 12,
                "folderName": "Templates"
            },
            "status": "draft",
            "workspace": "Default"
        }
    ]
}
```

Add template content separately with the [Update Landing Page Template Content](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLandingPageTemplateContentUsingPOST) endpoint.

### Update Metadata

Use the [Update Landing Page Template Metadata](https://developer.adobe.com/marketo-apis/api/asset#operation/updateLpTemplateUsingPOST) endpoint to change the name, description, or `enableMunchkin` setting.

### Update Content

Updating template content replaces all existing HTML content. Pass the replacement as `multipart/form-data` in the `content` parameter.

```http
POST /rest/asset/v1/landingPageTemplate/286/content.json
```

```html
content-type: multipart/form-data; boundary=--------------------------435851813185237176536801
----------------------------435851813185237176536801
Content-Disposition: form-data; name="content"; filename="content.txt"
Content-Type: text/plain

<html>
<head>
</head>
<body>
<div>Placeholder Content</div>
</body>
</html>
----------------------------435851813185237176536801--
```

```json
 {
  "success": true,
  "warnings": [],
  "errors": [],
  "requestId": "7516#14e0dc60bbc",
  "result": [
    {
      "id": 286
    }
  ]
}
```

## Clone

Clone a landing page template with an `application/x-www-url-formencoded` POST request.

The `id` path parameter specifies the source landing page template.

The `name` parameter specifies the name of the new landing page template.

The `folder` parameter specifies the parent folder for the new template. Pass it as an embedded JSON object containing `id` and `type`.

The optional `description` parameter describes the new template.

```http
POST /rest/asset/v1/landingPageTemplate/{id}/clone.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=Standard Template Clone&folder={"type": "Folder", "id": 732}
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "dee6#1683e9fd410",
    "warnings": [],
    "result": [
        {
            "id": 61,
            "name": "Standard Template Clone",
            "createdAt": "2019-01-11T20:34:48Z+0000",
            "updatedAt": "2019-01-11T20:34:48Z+0000",
            "url": "https://app-abm.marketo.com/#LT61B2ZN732",
            "folder": {
                "type": "Folder",
                "value": 732,
                "folderName": "Test LP Template Clone"
            },
            "status": "draft",
            "workspace": "Default",
            "templateType": "freeForm",
            "enableMunchkin": true
        }
    ]
}
```

## Approval

Landing page templates use the standard draft and approved model. Updates apply to the draft first and become live only after the template is approved.

Before approval, a template must meet the requirements for its guided or free-form type. See these resources:

- [Free Form Landing Page Templates](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/create-a-free-form-landing-page-template)
- [Guided Landing Page Templates](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/create-a-guided-landing-page-template)
- [Guided Template Examples](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/guided-landing-page-template-list)

## Delete

To delete a template, ensure that it is not approved and that no child landing page references it. You cannot use this API to delete landing page templates with embedded social buttons.
