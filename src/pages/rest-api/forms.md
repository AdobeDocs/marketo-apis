---
title: Forms
description: "Marketo Forms REST API guide to create and manage forms, retrieve by id or name, browse with status filters, and manage fields, fieldsets, and rules."
---

# Forms

[Forms Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Forms)

[Form Fields Endpoint Reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Form-Fields)

Use the forms endpoints to manage forms from remote systems. A form can include several object types:

- Forms
- Fields
- Fieldsets
- Visibility Rules
- Followup Page Rules

## Query

Forms support the standard asset retrieval methods: [by id](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByIdUsingGET), [by name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByNameUsingGET), and by [browsing](https://developer.adobe.com/marketo-apis/api/asset#operation/browseForms2UsingGET). A form response contains every form property except the field list.

### By ID

Pass a form `id` as a path parameter to [Get Form by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByIdUsingGET). The endpoint returns the matching form record.

```http
GET /rest/asset/v1/form/{id}.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "948f#154e3bad8e3",
    "result": [
        {
            "id": 736,
            "name": "newForm",
            "description": "test",
            "createdAt": "2016-05-24T17:05:54Z+0000",
            "updatedAt": "2016-05-24T17:05:54Z+0000",
            "url": "https://app-devlocal1.marketo.com/#FO736B2",
            "status": "draft",
            "theme": "simple",
            "language": "French",
            "locale": "fr_FR",
            "progressiveProfiling": false,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 293,
                "folderName": "yyLNLHzgOM"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Envoyer",
            "waitingLabel": "Veuillez patienter"
        }
    ]
}

```

### By Name

Pass a form `name` to [Get Form by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getLpFormByNameUsingGET). The endpoint returns the matching form record.

```http
GET /rest/asset/v1/form/byName.json?name=newForm
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "948f#154e3bad8e3",
    "result": [
        {
            "id": 736,
            "name": "newForm",
            "description": "test",
            "createdAt": "2016-05-24T17:05:54Z+0000",
            "updatedAt": "2016-05-24T17:05:54Z+0000",
            "url": "https://app-devlocal1.marketo.com/#FO736B2",
            "status": "draft",
            "theme": "simple",
            "language": "French",
            "locale": "fr_FR",
            "progressiveProfiling": false,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 293,
                "folderName": "yyLNLHzgOM"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Envoyer",
            "waitingLabel": "Veuillez patienter"
        }
    ]
}
```

### Browse

[Get Forms](https://developer.adobe.com/marketo-apis/api/asset#operation/browseForms2UsingGET) follows the standard Asset API browse pattern. It supports these optional filters:

- `status`: Filters by `approved`, `approved with draft`, or `draft`.
- `maxReturn`: Limits the number of returned records.
- `offset`: Pages through the result set.

```http
GET /rest/asset/v1/forms.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "645d#154e3d499ac",
    "result": [
        {
            "id": 227,
            "name": "aKAUVDfbsX",
            "description": "",
            "createdAt": "2016-05-18T20:36:20Z+0000",
            "updatedAt": "2016-05-18T20:36:20Z+0000",
            "url": "https://app-devlocal1.marketo.com/#FO227B2",
            "status": "draft",
            "theme": "simple",
            "language": "English",
            "locale": "en_US",
            "progressiveProfiling": false,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 293,
                "folderName": "yyLNLHzgOM"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Submit",
            "waitingLabel": "Please Wait"
        },
        {
            "id": 695,
            "name": "AoMXgfFbma",
            "description": "",
            "createdAt": "2016-05-19T18:50:40Z+0000",
            "updatedAt": "2016-05-19T18:50:40Z+0000",
            "url": "https://app-devlocal1.marketo.com/#FO695B2",
            "status": "draft",
            "theme": "simple",
            "language": "English",
            "locale": "en_US",
            "progressiveProfiling": true,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 565,
                "folderName": "WfUvYmlcyT"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Submit",
            "waitingLabel": "Please Wait"
        }
    ]
}
```

### Field List

Retrieve the field list separately for each form by passing the form ID.

```http
GET /rest/asset/v1/form/{id}/fields.json
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "2165#154eee00d01",
    "result": [
        {
            "id": "FirstName",
            "label": "First Name:",
            "dataType": "text",
            "validationMessage": "This field is required.",
            "rowNumber": 0,
            "columnNumber": 0,
            "maxLength": 255,
            "required": false,
            "formPrefill": true,
            "visibilityRules": {
                "ruleType": "alwaysShow"
            }
        },
        {
            "id": "LastName",
            "label": "Last Name:",
            "dataType": "text",
            "validationMessage": "This field is required.",
            "rowNumber": 1,
            "columnNumber": 0,
            "maxLength": 255,
            "required": false,
            "formPrefill": true,
            "visibilityRules": {
                "ruleType": "alwaysShow"
            }
        },
        {
            "id": "Email",
            "label": "Email Address:",
            "dataType": "email",
            "validationMessage": "Must be valid email. <span class='mktoErrorDetail'>example@yourdomain.com</span>",
            "rowNumber": 2,
            "columnNumber": 0,
            "required": false,
            "formPrefill": true,
            "visibilityRules": {
                "ruleType": "alwaysShow"
            }
        },
        {
            "id": "Profiling",
            "dataType": "profiling",
            "rowNumber": 3,
            "columnNumber": 0
        }
    ]
}

```

Before updating or deleting fields or changing their behavior, retrieve the form's field list. Use the returned field ID in subsequent requests.

### Field Types

| UI Type | API Name |
| --- | --- |
| Checkboxes | checkbox |
| Radio Button | radio |
| Text Area | textarea |
| Picklist | picklist |
| String | string |
| Email | email |
| Date | date |
| Number | number |
| Double | double |
| Phone | phone |
| URL | url |
| Currency | currency |
| Checkbox | single_checkbox |
| Slider | range |

### Dependencies

Pass a form `id` as a path parameter to [Get Form Used By](https://developer.adobe.com/marketo-apis/api/asset#operation/getFormUsedByUsingGET). The endpoint returns assets that depend on the form.

The following asset types can use forms:

- Landing Pages
- Smart Lists
- Smart Campaigns
- Reports
- Email Programs

```http
GET /rest/asset/v1/form/{id}/usedBy.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "fdf4#17285b25038",
    "warnings": [],
    "result": [
        {
            "id": 1038,
            "name": "LP Redirect Rules Program.LP Test 01",
            "type": "Landing Page",
            "status": "approved",
            "updatedAt": "2020-02-23T01:31:21Z+0000"
        }
    ]
}
```

## Create and Update

To [create a form](https://developer.adobe.com/marketo-apis/api/asset#operation/createLpFormsUsingPOST), provide two required fields:

- The parent folder of the form.
- The form name.

All other parameters are optional and have default values. A new form includes three default fields: First Name, Last Name, and Email.

```http
POST /rest/asset/v1/forms.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=newForm&description=test&folder={"type": "Folder","id": 293}&language=French
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "948f#154e3bad8e3",
    "result": [
        {
            "id": 736,
            "name": "newForm",
            "description": "test",
            "createdAt": "2016-05-24T17:05:54Z+0000",
            "updatedAt": "2016-05-24T17:05:54Z+0000",
            "url": "https://app-devlocal1.marketo.com/#FO736B2",
            "status": "draft",
            "theme": "simple",
            "language": "French",
            "locale": "fr_FR",
            "progressiveProfiling": false,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 293,
                "folderName": "yyLNLHzgOM"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Envoyer",
            "waitingLabel": "Veuillez patienter"
        }
    ]
}

```

To [update a form](https://developer.adobe.com/marketo-apis/api/asset#operation/updateFormsUsingPOST), pass its ID. During creation or update, you can set the base styling parameters that control how the form appears to the user.

```http
POST /rest/asset/v1/form/736.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
name=updated name&description=This is a test for updateapi&language=English&progressiveProfiling=true&locale=en_US
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "6307#154e3cf6efe",
    "result": [
        {
            "id": 736,
            "name": "updated name",
            "description": "This is a test for update api",
            "createdAt": "2016-05-24T17:05:54Z+0000",
            "updatedAt": "2016-05-24T17:28:23Z+0000",
            "status": "draft",
            "theme": "simple",
            "language": "English",
            "locale": "en_US",
            "progressiveProfiling": true,
            "labelPosition": "left",
            "fontFamily": "Helvetica",
            "fontSize": "13px",
            "folder": {
                "type": "Folder",
                "value": 293,
                "folderName": "yyLNLHzgOM"
            },
            "knownVisitor": {
                "type": "form",
                "template": null
            },
            "thankYouList": [
                {
                    "followupType": "none",
                    "followupValue": null,
                    "default": true
                }
            ],
            "buttonLocation": 120,
            "buttonLabel": "Submit",
            "waitingLabel": "Please Wait"
        }
    ]
}

```

The create and update form endpoints do not modify known visitor or thank-you page behavior. Use the corresponding endpoints to manage those behaviors.

## Field Metadata

Before adding or editing form fields, retrieve the valid fields for the target instance. Field operations use the `id` property returned for each field.

For lead fields, use the [Get Available Form Fields](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllFieldsUsingGET) endpoint. The response includes each field's data type and the default metadata applied when the field is added to a form.

```http
GET /rest/asset/v1/form/fields.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "176ca#167a9808f4c",
    "warnings": [],
    "result": [
        {
            "id": "AnnualRevenue",
            "isRequired": false,
            "dataType": "currency"
        },
        {
            "id": "City",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Company",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Country",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Description",
            "isRequired": false,
            "dataType": "textarea",
            "maxLength": 32000,
            "visibleRows": 2
        },
        {
            "id": "Email",
            "isRequired": false,
            "dataType": "email"
        },
        {
            "id": "Fax",
            "isRequired": false,
            "dataType": "phone"
        },
        {
            "id": "FirstName",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Industry",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "LastName",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "LeadSource",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "MobilePhone",
            "isRequired": false,
            "dataType": "phone"
        },
        {
            "id": "NumberOfEmployees",
            "isRequired": false,
            "dataType": "int"
        },
        {
            "id": "Phone",
            "isRequired": false,
            "dataType": "phone"
        },
        {
            "id": "PostalCode",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Rating",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "Salutation",
            "isRequired": false,
            "dataType": "picklist",
            "picklistValues": "Mr.,Ms.,Mrs.,Dr.,Prof."
        },
        {
            "id": "State",
            "isRequired": false,
            "dataType": "picklist",
            "picklistValues": "AK::AK,AL::AL,AR::AR,AZ::AZ,CA::CA,CO::CO,CT::CT,DE::DE,FL::FL,GA::GA,HI::HI,IA::IA,ID::ID,IL::IL,IN::IN,KS::KS,KY::KY,LA::LA,MA::MA,MD::MD,ME::ME,MI::MI,MN::MN,MO::MO,MS::MS,MT::MT,NC::NC,ND::ND,NE::NE,NH::NH,NJ::NJ,NM::NM,NV::NV,NY::NY,OH::OH,OK::OK,OR::OR,PA::PA,RI::RI,SC::SC,SD::SD,TN::TN,TX::TX,UT::UT,VA::VA,VT::VT,WA::WA,WI::WI,WV::WV,WY::WY"
        },
        {
            "id": "Street",
            "isRequired": false,
            "dataType": "textarea",
            "maxLength": 2000,
            "visibleRows": 2
        },
        {
            "id": "Title",
            "isRequired": false,
            "dataType": "picklist"
        }
    ]
}

```

For Program Member custom fields, call the [Get Available Form Program Member Fields](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllProgramMemberFieldsUsingGET) endpoint. The response includes Program Member custom field data types and default metadata.

To use these fields, the form must be under a Program, not in Design Studio. A Landing Page that contains a form with these fields must also be under a Program. It cannot be in or cloned into Design Studio.

```http
GET /rest/asset/v1/form/programMemberFields.json
```

```json
{
    "success": true,
    "errors": [],
    "requestId": "109c6#16fa0b9c51a",
    "warnings": [],
    "result": [
        {
            "id": "pMCFCustomField01",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "pMCFCustomField02",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        },
        {
            "id": "myPMCF",
            "isRequired": false,
            "dataType": "string",
            "maxLength": 255
        }
    ]
}
```

### Edit Field

Each form has an editable list of fields displayed to the user when the form loads. Use the corresponding endpoint to add, update, or delete one field at a time.

To [add a field](https://developer.adobe.com/marketo-apis/api/asset#operation/addFieldToAFormUsingPOST), provide the parent form ID and the field `fieldId`. All other properties are empty or use defaults based on the field's data type and metadata.

Send the data as a POST with `application/x-www-form-urlencoded`, not as JSON.

```http
POST /rest/asset/v1/form/{id}/fields.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
fieldId=NumberOfEmployees&maxLength=125&defaultValue=this is default&required=true&fieldWidth=100&validationMessage=hey, you there?&label=employee count&hintText=Hint me&minValue=10
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "1826e#154f41b214c",
    "result": [
        {
            "id": "NumberOfEmployees",
            "label": "employee count",
            "fieldWidth": 100,
            "dataType": "number",
            "defaultValue": "this is default",
            "validationMessage": "hey, you there?",
            "rowNumber": 5,
            "columnNumber": 0,
            "required": true,
            "formPrefill": true,
            "fieldMetaData": {
                "minValue": 10,
                "maxValue": null
            },
            "visibilityRules": {
                "ruleType": "alwaysShow"
            },
            "hintText": "Hint me"
        }
    ]
}

```

An update can edit the same properties used when adding a field. It also requires the form ID and `fieldId`, but the update endpoint passes `fieldId` as a path parameter rather than a query parameter.

```http
POST /rest/asset/v1/form/{id}/field/LastName.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
label=enter the last name here
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "5634#15508303abb",
    "result": [
        {
            "id": "LastName",
            "label": "enter the last name here",
            "dataType": "text",
            "validationMessage": "This field is required.",
            "rowNumber": 0,
            "columnNumber": 0,
            "maxLength": 255,
            "required": false,
            "formPrefill": true,
            "visibilityRules": {
                "ruleType": "alwaysShow"
            }
        }
    ]
}

```

The previous example updates `LastName`, which is a simple string field. Other form fields have more complex metadata. For example, `Salutation` is a `select` field with a list of items and a default value.

When adding or updating a select field, set one choice's `isDefault` value to `true`. Otherwise, the first choice has no value and is labeled `Select...`.

![Salutation](assets/form-field-salutation.png)

To update the list items, format the `values` parameter as shown in the following example:

```http
POST /rest/asset/v1/form/{id}/field/Salutation.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```sql
values=[{"label":"Select...","value":"","isDefault":true,"selected":true}, {"label":"MR","value":"MR"}, {"label":"MS","value":"MS"}, {"label":"MRS","value":"MRS"}, {"label":"DR","value":"DR"}, {"label":"PROF","value":"PROF"}]
```

```json
{
  "success": true,
  "warnings": [ ],
  "errors": [ ],
  "requestId": "71fd#1588d9d1b0c",
  "result": [
    {
      "id": "Salutation",
      "label": "Salutation:",
      "dataType": "select",
      "validationMessage": "This field is required.",
      "rowNumber": 3,
      "columnNumber": 0,
      "required": false,
      "formPrefill": true,
      "fieldMetaData": {
        "multiSelect": false,
        "values": [
          {
            "label": "Select...",
            "value": "",
            "isDefault": true,
            "selected": true
          },
          {
            "label": "MR",
            "value": "MR"
          },
          {
            "label": "MS",
            "value": "MS"
          },
          {
            "label": "MRS",
            "value": "MRS"
          },
          {
            "label": "DR",
            "value": "DR"
          },
          {
            "label": "PROF",
            "value": "PROF"
          }
        ],
        "visibleLines": 1
      },
      "visibilityRules": {
        "ruleType": "alwaysShow"
      }
    }
  ]
}
```

Use the Add Field to Form response to determine how to format a complex form field.

### Rearranging Field

Use the [Change Form Field Positions](https://developer.adobe.com/marketo-apis/api/asset#operation/updateFieldPositionsUsingPOST) endpoint to rearrange all form fields as a single unit. The endpoint requires `positions`, a JSON array of objects with three members:

- `columnNumber`
- `rowNumber`
- `fieldName`, which refers to the field ID

Form fields use a table-like arrangement with up to three columns and 10 rows. Row and column indexes start at 0, so the first row and column both use 0. Every field must occupy a unique position.

If the target field is a fieldset, its record in `positions` must also contain `fieldList`. This parameter is an array of objects with the same `columnNumber`, `rowNumber`, and `fieldName` members.

The parent list treats the fieldset as one field. The positions in `fieldList` determine the arrangement of its child fields.

```http
POST /rest/asset/v1/form/{id}/reArrange.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
positions=[{"columnNumber":0,"rowNumber":0,"fieldName":"FirstName"},{"columnNumber":0,"rowNumber":1,"fieldName":"LastName"}, {"columnNumber":0,"rowNumber":2, "fieldName":"Email"}]
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "bb18#15508ef9c04",
    "result": [
        {
            "id": 764
        }
    ]
}

```

### Rich Text

Use a [separate endpoint](https://developer.adobe.com/marketo-apis/api/asset#operation/addRichTextFieldUsingPOST) to add rich text fields. Pass the content as HTML in a `multipart/form-data` request. The HTML must not contain scripts, meta tags, or link tags.

```http
POST /rest/asset/v1/form/{id}/richText.json
```

```html
Content-Type: multipart/form-data; boundary=---------------------------9051914041544843365972754266
-----------------------------9051914041544843365972754266
Content-Disposition: form-data; name="text"
Content-Type: text/html
<div>Fancy Rich Text Component</div>
-----------------------------9051914041544843365972754266--
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "82c8#154f423bf5c",
    "result": [
        {
            "id": "SHRtbFRleHRfMjAxNi0wNS0yN1QxNDozNDoyNC4xMTVa",
            "labelWidth": 260,
            "dataType": "htmltext",
            "rowNumber": 8,
            "columnNumber": 0,
            "visibilityRules": {
                "ruleType": "alwaysShow"
            },
            "text": "<div>Fancy Rich Text Component</div>"
        }
    ]
}

```

### Fieldset

A fieldset is an optional group of fields. The top-level field list treats a fieldset as one field for positioning and visibility rules. For example, selecting yes for a Compliance Requirements field can reveal a fieldset containing HIPAA and PCI Compliance fields.

A field must be unique within the form. The same field cannot appear in both the form's parent field list and a child fieldset.

Add a fieldset with the [Add Fieldset to Form](https://developer.adobe.com/marketo-apis/api/asset#operation/addFieldSetUsingPOST) endpoint. The fieldset then appears in the [Get Fields for Form](https://developer.adobe.com/marketo-apis/api/asset#operation/getFormFieldByFormVidUsingGET) response. To add fields to the fieldset, use [Update Field Positions](https://developer.adobe.com/marketo-apis/api/asset#operation/updateFieldPositionsUsingPOST) to move them into its `fieldList`.

For these endpoints, send the data as a POST with `application/x-www-form-urlencoded`, not as JSON.

## Visibility Rule

Visibility rules determine whether a visitor can see a field based on values entered in the form. Each rule compares the value of a `subjectField` in the form with a list of values in the rule.

A field can have one visibility rule type: `show`, `hide`, or `alwaysShow`. The API evaluates the field's rules from top to bottom and applies the first rule that evaluates to true.

Changing visibility rules is a destructive update.

```http
POST /rest/asset/v1/form/{id}/field/Email/visibility.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
visibilityRule={"ruleType":"show", "rules":[{"subjectField": "LastName", "operator": "isNotEmpty", "values": [], "altLabel": "Email:"}]}
```

```json
{
    "success": true,
    "warnings": [],
    "errors": [],
    "requestId": "ab4a#15509030601",
    "result": [
        {
            "formFieldId": "Email",
            "ruleType": "show",
            "rules": [
                {
                    "subjectField": "LastName",
                    "operator": "isNotEmpty",
                    "values": [],
                    "altLabel": "Email:"
                }
            ]
        }
    ]
}

```

For the complete list of operators, see [Add Form Field Visibility Rules](https://developer.adobe.com/marketo-apis/api/asset#operation/addFormFieldVisibilityRuleUsingPOST).

## Followup

Dynamic follow-up rules can redirect visitors to a page or keep them on the current page based on designated field values at submission. Thank You Page rules and Followup Page rules refer to the same behavior.

Represent the rules as a JSON array whose records contain `followupType`, `followupValue`, `operator`, `subjectField`, `values`, and `default`. Only one record in the array can have the Boolean `default` set to `true`. The form uses that record when a visitor does not qualify for another rule.

The `followupType` value can be `lp` or `url`. The `lp` value indicates that `followupValue` is a Marketo Landing Page ID. The `url` value indicates that `followupValue` is the URL of another page. The operator compares the subject field value with the provided values.

## Submit Button

Use the [Update Submit Button](https://developer.adobe.com/marketo-apis/api/asset#operation/updateFormSubmitButtonUsingPOST) endpoint to modify submit button styling. You can update `buttonPosition`, `buttonStyle`, `label`, and `waitingLabel`. The `waitingLabel` appears while submission is pending.

This is a destructive update.

## Approval

Forms follow a draft-approved lifecycle. A form can have a draft version, an approved version, or both. Updates always apply to the draft and become live only after approval.

Approving a form replaces the existing approved version, if any, with the current draft. Unapproving a live form deletes any current drafts and demotes the approved version to a draft-only state. Always unapprove a form before attempting to delete it.

## Progressive Profiling

When progressive profiling is enabled, the form field list includes a fieldset named `Profiling`. Use the Update Field Positions endpoint to add or remove fields from the progressive profiling list.

This endpoint performs destructive updates, so every request must include all fields in the form. The following example adds `Phone` to the progressive profiling list.

```http
POST /rest/asset/v1/form/{id}/reArrange.json
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
positions=[{"columnNumber":0,"rowNumber":0,"fieldName":"Email"},{"columnNumber":0,"rowNumber":1,"fieldName":"LastName"},{"columnNumber":0,"rowNumber":2,"fieldName":"Company"},{"columnNumber":0,"rowNumber":3,"fieldName":"Website"},{"columnNumber":0,"rowNumber":4,"fieldName":"Profiling","fieldList":[{"columnNumber":0,"rowNumber":0,"fieldName":"Phone"}]}]

```

```json
{
    "success": true,
    "errors": [],
    "requestId": "3d6a#164190dbdf2",
    "result": [
        {
            "id": 1031
        }
    ]
}
```
