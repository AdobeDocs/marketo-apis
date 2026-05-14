---
title: Landing Page Templates
description: "Manage Marketo Landing Page Templates via REST API endpoints for free form and guided types, query by id or name, create, update HTML, clone, Munchkin."
---

# Landing Page Templates

[Landing Page Template Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates)

Landing Page Templates are a parent resource and dependency for individual Marketo landing pages. Landing pages derive the skeleton of their content from the parent template.

## Template Types

Marketo has two types of Landing Page Templates, free form and guided. Free form landing page templates provide a loosely structured editing experience for pages derived from them. Guided templates provide a heavily structured experience, where element types and locations can be restricted at the template level. For more information on the differences, see [this document](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/understanding-landing-pages/understanding-free-form-vs-guided-landing-pages).

## Query

Landing Page Templates support the standard query types for assets of [by id](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates/operation/getLandingPageTemplateByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates/operation/getLandingPageTemplateByNameUsingGET), and [browsing](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates/operation/getLandingPageTemplatesUsingGET). These endpoints return metadata for the templates. Retrieving the HTML content of templates must be done on a per-template basis via its id.

## Create and Update

Templates are created as empty assets with associated metadata. When creating a template, a name, and folder must be included, along with an optional description, templateType and enableMunchkin parameter. templateType may be either freeform or guided and defaults to freeForm. For differences between the types, see the Guided vs. Free Form section. enableMunchkin defaults to false, and when enabled will prevent Munchkin tracking from being performed on any child landing pages of the template.

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

Content for the template must be populated separately via the [Update Landing Page Template Content](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates/operation/updateLandingPageTemplateContentUsingPOST) endpoint.

### Update Metadata

Metadata for landing page templates can be updated via the [Update Landing Page Template Metadata](https://developer.adobe.com/marketo-apis/api/asset#tag/Landing-Page-Templates/operation/updateLpTemplateUsingPOST) endpoint. Name, description and the enableMunchkin setting may be updated this way.

### Update Content

Content in Landing Page Templates is made as a destructive update to the entirety of the HTML content. The content must be passed as multipart/form-data, with the only parameter being named content.

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

Marketo provides a simple method for cloning a Landing Page Templates. This is an application/x-www-url-formencoded POST request.

The `id` path parameter specifies the id of the source Landing Page Template to clone.

The `name` parameter is used to specify the name of the new Landing Page Template.

The `folder` parameter is used to specify the parent folder where new Landing Page Template will reside. This is in the form of an embedded JSON object containing  `id` and `type`.

The optional `description` parameter is used to describe the new Landing Page Template.

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

Landing Page Templates follow the standard draft-approved model, where there can be a draft version and/or an approved version. Whenever updates are applied to a template, they are always applied to the draft version first, and will only be seen live when the template has been approved.

For a template to be approved it must conform to the rules for its type, either guided of free form. For more information on the requirements for creating and approving templates of their respective types, see their respective creation documents:

- [Free Form Landing Page Templates](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/create-a-free-form-landing-page-template)
- [Guided Landing Page Templates](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/create-a-guided-landing-page-template)
- [Guided Template Examples](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/landing-page-templates/guided-landing-page-template-list)

## Delete

To delete a template, it must be out of use and unapproved, meaning that no child landing page may reference it.  Landing Page Templates with embedded social buttons may not be deleted with this API.
