---
title: Leads
description: "Explore Marketo Leads REST API features including Describe, query by ID or filter, default fields, limits, and retrieving ECIDs."
---

# Leads

[Leads Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads)

The Marketo Lead's API provides a large set of capabilities for simple CRUD applications against lead records, as well as the ability to modify a lead's membership in static lists and programs, and initiate Smart Campaign processing for leads.

## Describe

One of the key capabilities of the Leads API is the Describe method. Use Describe Leads to retrieve a full list of the fields available for interaction via both the REST API, as well as metadata for each:

* Data type
* REST API names
* Length (if applicable)
* Read-Only
* Friendly label

Describe is the primary source of truth for whether fields are available for use, and metadata about those fields.

### Request

```http
GET /rest/v1/leads/describe.json
```

### Response

```json
{
   "requestId":"37ca#1475b74e276",
   "success":true,
   "result":[
      {
         "id":2,
         "displayName":"Company Name",
         "dataType":"string",
         "length":255,
         "rest":{
            "name":"company",
            "readOnly":false
         },
         "soap":{
            "name":"Company",
            "readOnly":false
         }
      }
}
```

Normally, responses include a much larger set of fields in the result array, but we are omitting them for demonstration purposes. Each item in the result array corresponds to a field available on the lead record and will have at minimum an id, a displayName, and a datatype. The rest and soap child objects may or may not be present for a given field, and its presence will indicate whether the field is valid for use in either the REST or SOAP APIs. The `readOnly` property indicates whether the field is read-only via the corresponding API (REST or SOAP). The length property indicates the max length of the field if present. The dataType property indicates the data type of the field.

## Query

There are two primary methods for lead retrieval: the Get Lead by Id, and Get Leads by Filter Type methods. Get Lead by Id takes a single lead id as a path parameter and returns a single lead record.

Optionally you may pass a fields parameter containing a comma-separated list of field names to return. If the fields parameter is not included in this request, the following default fields are returned: `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, and `id`. When requesting a list of fields, if a particular field is requested, but not returned, the value is implied to be null.

### Request

```http
GET /rest/v1/lead/{id}.json
```

### Response

```json
{
   "requestId": "10226#14d3049e51b",
   "success": true,
   "result": [
      {
         "id": 318581,
         "updatedAt":"2015-05-07T11:47:30-08:00"
         "lastName": "Doe",
         "email": "jdoe@marketo.com",
         "createdAt": "2015-05-01T16:47:30-08:00",
         "firstName": "John"
      }
   ]
}
```

For this method, there will always be a single record in the first position of the result array.

Get Leads by Filter Type will return the same type of records, but may return up to 300 per page. It requires the `filterType` and `filterValues` query parameters.

`filterType` accepts any Custom Field, or most of the commonly used fields. Call the `Describe2` endpoint to get a comprehensive list of searchable fields that are permissible for use in `filterType`. When searching by Custom Field, only the following data types are supported: `string`, `email`, `integer`. You can obtain field detail (description, type, and so on) using the aforementioned Describe method.

`filterValues` accepts up to 300 values in comma-separated format. The call searches for records where the lead's field matches one of the included `filterValues`. If the number of leads matching the lead filter is greater than 1,000 an error is returned: "1003, Too many results match the filter".

If the total length of your GET request exceeds 8KB, an HTTP error is returned: "414, URI too long" (per RFC 7231). As a workaround, you may change your GET to POST, add the _method=GET parameter, and place a query string in the request body.

### Request

```http
GET /rest/v1/leads.json?filterType=id&filterValues=318581,318592
```

### Response

```json
{
    "requestId": "12951#15699db5c97",
    "result": [
        {
            "id": 318581,
            "updatedAt": "2016-05-17T22:11:45Z",
            "lastName": "Lincoln",
            "email": "abe@usa.gov",
            "createdAt": "2015-03-17T00:18:40Z",
            "firstName": "Abraham"
        },
        {
            "id": 318592,
            "updatedAt": "2016-05-17T22:20:51Z",
            "lastName": "Washington",
            "email": "george@usa.gov",
            "createdAt": "2015-04-06T16:29:21Z",
            "firstName": "George"
        }
    ],
    "success": true
}
```

This call searches for records matching the ids included in `filterValues`, and returns any matching records.

If no records are found, the response indicates success but the result array will be empty.

### Response

```json
{
"requestId": "177a1#1578b643357",
"result": [],
"success": true
}
```

Both the Get Lead by Id and Get Leads by Filter Type will also accept a fields query parameter, which accepts a comma separated list of API fields. If this is included, then each record in the response will include those listed fields.  If it is omitted, then a default set of fields will be returned: `id`, `email`, `updatedAt`, `createdAt`, `firstName`, and `lastName`.

## Adobe ECID

When the Adobe Experience Cloud Audience Sharing feature is enabled, a cookie sync process occurs that associates Adobe Experience Cloud ID (ECID) with Marketo leads.  The lead retrieval methods mentioned above can be used to retrieve associated ECID values.  Do this by specifying `ecids` in the fields parameter. For example, `&fields=email,firstName,lastName,ecids`.

## Create and Update

In addition to retrieving lead data, you can create, update and delete lead record via the API. Creating and updating leads share the same endpoint with the operation type being defined in the request, and up to 300 records can be created or updated at the same time.

<InlineAlert slots="text" variant="info" />

Updating Company fields using [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads/operation/syncLeadUsingPOST) endpoint is not supported. Use [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies/operation/syncCompaniesUsingPOST) endpoint instead.

<InlineAlert slots="text" variant="info" />

When creating or updating the email value on a Person record, only ASCII characters are supported in the email address field.

### Request

```http
POST /rest/v1/leads.json
```

### Body

```json
{
   "action":"createOnly",
   "lookupField":"email",
   "input":[
      {
         "email":"kjashaedd-1@klooblept.com",
         "firstName":"Kataldar-1",
         "postalCode":"04828"
      },
      {
         "email":"kjashaedd-2@klooblept.com",
         "firstName":"Kataldar-2",
         "postalCode":"04828"
      },
      {
         "email":"kjashaedd-3@klooblept.com",
         "firstName":"Kataldar-3",
         "postalCode":"04828"
      }
   ]
}
```

### Response

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "id":50,
         "status":"created"
      },
      {
         "id":51,
         "status":"created"
      },
      {
         "id":52,
         "status":"created"
      }
   ]
}
```

In this request, you see two important fields, `action` and `lookupField`.  `action` specifies the operation type of the request, and can be `createOrUpdate`, `createOnly`, `updateOnly`, or `createDuplicate`. If it is omitted, the action defaults to `createOrUpdate`.  The `lookupField` parameter specifies the key to use when action is either `createOrUpdate` or `updateOnly`. If `lookupField` is omitted, the default key is `email`.

By default, the default partition is used. Optionally, you may specify the `partitionName` parameter, which only works if action is `createOnly` or `createOrUpdate`. For `partitionName` to work as additional deduplication criteria, it must be part of source type in custom dedupe rules. During an update operation, if a lead does not exist in the specified partition, then an error is returned. If the API-only user does not have permission to access the specified partition, then an error is returned.

The `id` field can only be included as a parameter when using the `updateOnly` action, as `id` is a system managed unique key.

The request must also have an `input` parameter, which is an array of lead records. Each lead record is a JSON object with any number of lead fields. The keys included in a record should be unique for that record, and all JSON strings should be UTF-8 encoded. The `externalCompanyId` field may be used to link the lead record to a company record. The `externalSalesPersonId` field may be used to link the lead record to a sales person record.

Note: When performing lead upsert requests concurrently or in quick succession, duplicate records may result when making multiple requests with the same key value if a subsequent call with the same value is made before the first returns. This can be avoided either by using the `createOnly`, or `updateOnly` as appropriate, or by queuing calls and waiting for your call to return before making subsequent upsert calls with the same key.

## Fields

The lead object contains standard fields and optionally custom fields. Standard fields are present in every Marketo Engage subscription whereas custom fields are created by the user as needed. Each field definition is comprised of a set of attributes that describe the field. Examples of attributes are display name, API name, and dataType. These attributes are known collectively as metadata.

The following endpoints allow you to query, create, and update fields on the lead object. These APIs require that the owning API user have a role with one or both of the Read-Write Schema Standard Field or Read-Write Schema Custom Field permissions.

## Query Fields

Querying lead fields is straightforward. You may query a single lead field by API name or query the set of all lead fields. Both standard fields and custom fields can be retrieved, depending on the role permissions being used. Hidden fields are also retrieved.

## By Name

The Get Lead Field by Name endpoint retrieves metadata for a single field on the lead object. The required fieldApiName path parameter specifies the API name of the field. The response is like the Describe Lead endpoint but contains additional metadata such as the isCustom attribute, which denotes whether the field is a custom field.

### Request

```http
GET /rest/v1/leads/schema/fields/{fieldApiName}.json
```

### Response

```json
{
    "requestId": "cd97#1793ee0fec4",
    "result": [
        {
            "displayName": "Email Address",
            "name": "email",
            "description": null,
            "dataType": "email",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        }
    ],
    "success": true
}
```

## Browse

The Get Lead Fields endpoint retrieves metadata for all fields on the lead object including. By default, a maximum of 300 records are returned. You can use the `batchSize` query parameter to reduce this number. If the `moreResult` attribute is true, this means more results are available. Continue to call this endpoint until the `moreResult` attribute returns false, which means there are no results available. The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

### Request

```http
GET /rest/v1/leads/schema/fields.json
```

### Response (Truncated)

```json
{
    "requestId": "142c3#1793eb976d8",
    "result": [
        {
            "displayName": "Salutation",
            "name": "salutation",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "First Name",
            "name": "firstName",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Middle Name",
            "name": "middleName",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Last Name",
            "name": "lastName",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Date of Birth",
            "name": "dateOfBirth",
            "description": null,
            "dataType": "date",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Email Address",
            "name": "email",
            "description": null,
            "dataType": "email",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Phone Number",
            "name": "phone",
            "description": null,
            "dataType": "phone",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Mobile Phone Number",
            "name": "mobilePhone",
            "description": null,
            "dataType": "phone",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Fax Number",
            "name": "fax",
            "description": null,
            "dataType": "phone",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Job Title",
            "name": "title",
            "description": null,
            "dataType": "string",
            "length": 255,
            "isHidden": false,
            "isHtmlEncodingInEmail": true,
            "isSensitive": true,
            "isCustom": false
        },
        {
            "displayName": "Unsubscribed",
            "name": "unsubscribed",
            "description": null,
            "dataType": "boolean",
            "isHidden": false,
            "isHtmlEncodingInEmail": false,
            "isSensitive": true,
            "isCustom": false
        },
        ...
    ],
    "success": true,
    "moreResult": false
}
```

## Create Fields

The Create Lead Fields endpoint creates one or more custom fields on the lead object. This endpoint provides functionality that is comparable to what is available in the Marketo Engage UI. You can create a maximum of up to 100 custom fields using this endpoint.
Carefully consider each field that you create in your production instance of Marketo Engage using the API.  Once a field has been created, you cannot delete it (you can only hide it). Proliferation of unused fields is a bad practice that will add clutter to your instance.

The required input parameter is an array of lead field objects. Each object contains one or more attributes. Required attributes are the `displayName`, `name`, and `dataType` which correspond to the UI display name of the field, the API name of the field, and the field type respectively.  Optionally you may specify `description`, `isHidden`, `isHtmlEncodingInEmail`, and `isSensitive`.

There are a few rules associated with name and `displayName` naming. The name attribute must be unique, start with a letter, and only contain letters, numbers, or underscore. The `displayName` must be unique, and cannot contain special characters.  A common naming convention is to apply camel case to `displayName` to produce name. For example, a `displayName` of "My Custom Field" would produce a name of "myCustomField".

### Request

```http
POST /rest/v1/leads/schema/fields.json
```

### Body

```json
{
  "input": [
      {
        "displayName": "Acme Access Code",
        "name": "acmeAccessCode",
        "description": "Acme Direct Mail Integration",
        "dataType": "string"
      },
      {
        "displayName": "Acme Mail Date",
        "name": "acmeMailDate",
        "description": "Acme Direct Mail Integration",
        "dataType": "string"
      }
  ]
}
```

### Response

```json
{
    "requestId": "d9f1#17943666811",
    "result": [
        {
            "name": "acmeAccessCode",
            "status": "created"
        },
        {
            "name": "acmeMailDate",
            "status": "created"
        }
    ],
    "success": true
}
```

## Update Field

The Update Lead Field endpoint updates a single custom field on the lead object. For the most part, field update operations performed using the Marketo Engage UI are achievable using the API. There are a few differences summarized in the table below.

<table>
<tbody>
<tr>
<td style="width: 26.5306%;" rowspan="2"><strong>Attribute</strong></td>
<td style="width: 35%;" colspan="2"><strong>Standard Field</strong></td>
<td style="width: 38.2654%;" colspan="2"><strong>Custom Field</strong></td>
</tr>
<tr>
<td style="width: 17.449%;"><strong>Updatable by API?</strong></td>
<td style="width: 17.551%;"><strong>Updatable by UI?</strong></td>
<td style="width: 19.3878%;"><strong>Updatable by API?</strong></td>
<td style="width: 18.8776%;"><strong>Updatable by UI?</strong></td>
</tr>
<tr>
<td style="width: 26.5306%;">dataType</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">no</td>
<td style="width: 19.3878%;">no</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">description</td>
<td style="width: 17.449%;">yes</td>
<td style="width: 17.551%;">yes</td>
<td style="width: 19.3878%;">yes</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">displayName</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">no</td>
<td style="width: 19.3878%;">yes</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">isCustom</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">no</td>
<td style="width: 19.3878%;">no</td>
<td style="width: 18.8776%;">no</td>
</tr>
<tr>
<td style="width: 26.5306%;">isHidden</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">yes</td>
<td style="width: 19.3878%;">yes (if created by API)</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">isHtmlEncodingInEmail</td>
<td style="width: 17.449%;">yes</td>
<td style="width: 17.551%;">yes</td>
<td style="width: 19.3878%;">yes</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">isSensitive</td>
<td style="width: 17.449%;">yes</td>
<td style="width: 17.551%;">yes</td>
<td style="width: 19.3878%;">yes</td>
<td style="width: 18.8776%;">yes</td>
</tr>
<tr>
<td style="width: 26.5306%;">length</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">no</td>
<td style="width: 19.3878%;">no</td>
<td style="width: 18.8776%;">no</td>
</tr>
<tr>
<td style="width: 26.5306%;">name</td>
<td style="width: 17.449%;">no</td>
<td style="width: 17.551%;">no</td>
<td style="width: 19.3878%;">no</td>
<td style="width: 18.8776%;">no</td>
</tr>
</tbody>
</table>

The required `fieldApiName` path parameter specifies the API name of the field to update. The required input parameter is an array that contains a single lead field object.  The field object contains one or more attributes.

### Request

```http
POST /rest/v1/leads/schema/fields/{fieldApiName}.json
```

### Body

```json
{
  "input": [
      {
        "displayName": "Acme Access Code",
        "description": "Acme Direct Mail Integration",
        "isHtmlEncodingInEmail": true
      }
  ]
}
```

### Response

```json
{
    "requestId": "9f57#1794324f44c",
    "result": [
        {
            "name": "acmeAccessCode",
            "status": "updated"
        }
    ],
    "success": true
}
```

## Push Lead to Marketo

Push Lead is an alternative for synching leads to Marketo, primarily designed to allow a greater degree of trigger-ability than the standard Sync Leads (similar in usage to a Marketo form). In addition to synchronization of lead fields, this endpoint allows for lead association based on cookie values, which are passed to the endpoint. This is done by passing the `mkt_tok` value generated by clicking through a Marketo email, or by passing a program name in the call. This endpoint also creates a single triggerable activity, which is associated to a program and/or campaign in Marketo. This allows triggering on lead capture events which are attributed to a specific campaign or program to kick off associated workflows from within Marketo.

The Push Lead interface is very similar to Sync Leads. All of the same primary keys are valid, and the same API names are used for fields (there is no action parameter because this is always an upsert operation). The `programName` and input parameters are required, and the `lookupField`, `source`, and `reason` parameters are optional. The input parameter is an array of lead objects. The resulting activity is attributed to the corresponding named program. The `source` and `reason` parameters are arbitrary string fields which can be added to the request to embed those values in the resulting activities. These may be used as constraints in the corresponding triggers (Lead is Pushed to Marketo) and filters (Lead Was Pushed to Marketo).

Note regarding anonymous activities. If you want to associate prior anonymous activities with the newly created lead, then do not specify cookies attribute in the lead object, and call Associate Lead following Push Lead. If you want to create a new lead with no activity history, then simply specify the cookies attribute in the lead object.

### Request

```http
POST /rest/v1/leads/push.json
```

### Body

```json
{
    "programName": "Big Blue Thing Product Launch",
    "source": "Cool Sales Site",
    "reason": "Downloaded pricing sheet",
    "lookupField": "email",
    "input": [
        {
             "email": "Theresa.May@westminister.gov.uk",
             "country": "united kingdom",
             "firstName": "Theresa",
             "website": "www.brexit.com",
             "leadScore": 45,
             "jobTitle": "Prime Minister"
         },
         {
             "email": "Justin.Trudeau@ottowa.gov.ca",
             "country": "canada",
             "firstName": "Justin",
             "website": "www.take-off-eh.com",
             "leadScore": 92,
             "jobTitle": "Sonny"
         }
     ]
}
```

### Response

```json
{
    "requestId": "939079529805",
    "success": true,
    "warnings": [],
    "result": [
       {
           "id": 483894,
           "status": "created"
       },
       {
           "id": 1087425,
           "status": "updated"
       },
       {
           "id": 3525,
           "reasons": [
                    {
                        "code": "501",
                        "message": "Bad stuff happened"
                    }
           ]
       }
    ]
}
```

To pass the `mkt_tok` parameter, assign the value to the mktToken member within a lead record in the input parameter as follows.

### Body

```json
{
  "programName": "Big Blue Thing Product Launch",
  "source": "Cool Sales Site",
  "reason": "Downloaded pricing sheet",
  "lookupField": "mktToken",
  "input" : [
     {
       "mktToken" : "<tokenValue>",
       "firstName" : "Thelma"
     },
     {
       "mktToken" : "<tokenValue>",
       "firstName" : "Louise"
     }
   ]
}
```

## Submit Form

Submit Form is an alternative for synchronizing leads to Marketo and is designed to provide functionality that is equivalent to a Marketo Form submission. This allows triggering on lead capture events which are attributed to a specific campaign or program to kick off associated workflows from within Marketo.

The Submit Form endpoint supports the following functionality:

* Upserts a lead record using email field as the primary key
* Creates a "Fill out Form" activity which is associated to a program and/or campaign
* Allows lead association based on cookie value
* Performs form field validation

Submitting a form follows the standard lead database pattern. A single object record is passed in the required input member of the JSON body of a POST request. The required `formId` member contains the target Marketo form ID.

The optional `programId` can be used to specify the program to add the lead to, and/or specify the program to add program member custom fields to. If `programId` is provided, the lead is added to the program and any program member fields present in form are also added. Note that the specified program must be in the same workspace as the form. If form does not contain program member custom fields and `programId` is not provided, then lead is not added to a program. If form resides in a program and `programId` is not provided, that program is used when one or more program member custom fields are present in form.

Within the input record, the `leadFormFields` object is required. This object contains one or more name/value pairs that correspond to the form fields to populate.  All fields specified must be defined within the specified form. The name is the REST API name for the field. Note that the `email` field is required.

The `visitorData` member object is optional and contains name/value pairs that correspond to page-visit data including `pageURL`, `queryString`, `leadClientIpAddress`, and `userAgentString`. Can be used to populate additional activity fields for filtering and triggering purposes.

The cookie member string is optional and allows you to associate a Munchkin cookie with a person record in Marketo. When a new lead is created, any prior anonymous activities are associated with that lead, unless the cookie value had previously been associated with another known record. If the cookie value was previously associated, then new activities are tracked against the record, but old activities will not be migrated away from the existing known record. To create a new lead with no activity history, simply omit the cookie member.

New leads are created in the primary partition for the workspace in which the form resides.

### Request

```http
POST /rest/v1/leads/submitForm.json
```

### Header

```text
Content-Type: application/json
```

### Body

```json
{
  "formId": 1029,
  "input": [
    {
      "leadFormFields": {
        "firstName": "Marge",
        "lastName": "Simpson",
        "email": "marge.simpson@fox.com",
        "pMCFField": "PMCF value"
      },
      "visitorData": {
        "pageURL": "https://na-sjst.marketo.com/lp/063-GJP-217/UnsubscribePage.html",
        "queryString": "Unsubscribed=yes",
        "leadClientIpAddress": "192.150.22.5",
        "userAgentString": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
      },
      "cookie": "id:063-GJP-217&token:_mch-marketo.com-1594662481190-60776"
    }
  ]
}
```

### Response

```json
{
  "requestId": "10667#173bc585ca5",
  "result": [
    {
      "id": 319174,
      "status": "updated"
    }
  ],
  "success": true
}
```

Here we can see the corresponding "Fill Out Form" activity details from within the Marketo Engage UI:

![Fill Out Form UI](assets/fill_out_form_activity_details.png)

## Merge

<InlineAlert slots="text" variant="info" />

Beginning March 31, 2026, calls which include more than 25 IDs in the `leadIds` parameter of a Merge Leads API call will result in a 1080 error code, and the call will be skipped. Jobs requiring the merger of more than 25 records into one, should be split into multiple jobs to ensure the success of those calls. 

Sometimes it is necessary to merge duplicate records and Marketo facilitates this through the Merge Leads API. Merging leads will combine their activity logs, program, campaign, and list memberships and CRM information, as well as merge all of their field values into a single record. Merge Leads takes a lead id as a path parameter, and either a single `leadId` as a query parameter, or a list of 25 or fewer comma-separated ids in the `leadIds` parameter


### Request

```http
POST /rest/v1/leads/{id}/merge.json?leadId=1324
```

### Response

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true
}
```

The lead specified in the path parameter is the winning lead, so if there are any fields in conflict between the records being merged, the value from the winner will be taken, except if the field in the winning record is empty and the corresponding field in the losing record is not. The leads specified in either `leadId` or `leadIds` parameter are the losing leads.

If you have an SFDC-sync enabled subscription, then you can also use the `mergeInCRM` parameter in your request. If set to true, the corresponding merge in your CRM will also be performed. If both leads are in SFDC and one is a CRM lead and the other is a CRM contact, then the winner is the CRM contact (regardless which lead is specified as winner). If one of the leads is in SFDC and the other is Marketo only, then the winner is the SFDC lead (regardless of which lead is specified as winner).

## Associate Web Activity

Through Lead Tracking (Munchkin), Marketo records web activity for visitors to your Web Site and Marketo Landing Pages. These activities, Visits and Clicks, are recorded with a key which corresponds to a "_mkto_trk" cookie set in the lead's browser, and Marketo uses this to keep track of the same person's activities. Normally, association to lead records occurs when a lead clicks through from a Marketo email or fills out a Marketo form, but sometimes an association can be triggered by a different type of event, and you can use the Associate Lead endpoint to do so. The endpoint takes the known lead record's id as a path parameter and the "_mkto_trk" cookie value in the cookie query parameter.

### Request

```http
POST /rest/v1/leads/{id}/associate.json?cookie=id:287-GTJ-838%26token:_mch-marketo.com-1396310362214-46169
```

### Response

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true
}
```

If a cookie is already associated with a known lead record, using this API on a different lead record causes new web activity to be recorded against that record, but will not move any existing web activity to the new record.
Membership

Lead records can also be retrieved based on membership in a static list, or a program. Additionally, you can retrieve all static lists, programs, or smart campaigns that a lead is a member of.

The response structure and optional parameters are identical to those of Get Leads by Filter Type, though `filterType` and `filterValues` cannot be used with this API.
To access the list id through the Marketo UI, navigate to the list. The list `id` is in the URL of the static list, `https://app-****.marketo.com/#ST1001A1`. In this example, 1001 is the `id` for the list.

## Get Programs by Lead Id

### Request

```http
GET /rest/v1/list/{listId}/leads.json?batchSize=3
```

### Response

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "nextPageToken":
"PS5VL5WD4UOWGOUCJR6VY7JQO2KUXL7BGBYXL4XH4BYZVPYSFBAONP4V4KQKN4SSBS55U4LEMAKE6===",
    "result":[
       {
            "id":50,
            "email":"kjashaedd@klooblept.com",
            "firstName":"Kataldar",
             "postalCode":"04828"
       },
       {
           "id":2343,
           "email":"kjashaedd@klooblept.com",
           "firstName":"Kataldar",
           "postalCode":"04828"
       },
      {
           "id":88498,
           "email":"kjashaedd@klooblept.com",
           "firstName":"Kataldar",
         "postalCode":"04828"
         }
    ]
}
```

## Get Lists by Lead Id

The Get Lists by Lead Id endpoint takes a lead record `id` path parameter and returns all static list records that the lead is a member of.

### Request

```http
GET /rest/v1/leads/{id}/listMembership.json?batchSize=3
```

### Response

```json
{
    "requestId": "1184b#1706f0ec23f",
    "result": [
        {
            "listId": 3379,
            "createdAt": "2016-05-17T19:32:44Z",
            "updatedAt": "2016-05-17T19:32:44Z"
        },
        {
            "listId": 2792,
            "createdAt": "2009-05-19T18:29:15Z",
            "updatedAt": "2009-05-19T18:29:15Z"
        },
        {
            "listId": 42,
            "createdAt": "2009-04-22T19:24:22Z",
            "updatedAt": "2009-04-22T19:24:22Z"
        }
    ],
    "success": true,
    "nextPageToken": "BFRV7OMVSNJWDVKVTUFS3XHT4E======",
    "moreResult": true
}
```

## Programs

Program membership can be retrieved in a similar fashion as lists. The same optional request parameters are available when calling the Get Leads by Program Id endpoint and pass the `programId` path parameter.

Optionally you may pass a fields parameter containing a comma-separated list of field names to return. If the fields parameter is not included in this request, the following default fields will be returned: `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, `membership`, and `id`. When requesting a list of fields, if a particular field is requested, but not returned, the value is implied to be null.

The response structure is very similar, as each item in the result array is a lead, except that each record also has a child object called "membership". This membership object includes data about the lead's relationship to the program indicated in the call, always showing its `progressionStatus`, `acquiredBy`, `reachedSuccess`, and `membershipDate`. If the parent program is also an engagement program, then membership will have members `stream`, `nurtureCadence`, and `isExhausted` to indicate its position and activity in the engagement program.

### Request

```http
GET /rest/v1/leads/programs/{programId}.json?batchSize=3
```

### Response

```json
{
    "requestId": "13ad4#1727b748a17",
    "result": [
        {
            "id": 319141,
            "firstName": "Meera",
            "lastName": "Reed",
            "email": "mree@housestark.com",
            "updatedAt": "2020-04-21T16:27:14Z",
            "createdAt": "2020-04-21T16:27:14Z",
            "membership": {
                "id": 1127,
                "progressionStatus": "Visited",
                "progressionStatusType": "Visited",
                "isExhausted": false,
                "acquiredBy": true,
                "reachedSuccess": false,
                "membershipDate": "2020-04-21T16:27:16Z",
                "updatedAt": "2020-04-21T16:27:16Z"
            }
        },
        {
            "id": 319142,
            "firstName": "Jon",
            "lastName": "Umber",
            "email": "jumb@housestark.com",
            "updatedAt": "2020-04-21T16:27:14Z",
            "createdAt": "2020-04-21T16:27:14Z",
            "membership": {
                "id": 1127,
                "progressionStatus": "Visited",
                "progressionStatusType": "Visited",
                "isExhausted": false,
                "acquiredBy": true,
                "reachedSuccess": false,
                "membershipDate": "2020-04-21T16:27:16Z",
                "updatedAt": "2020-04-21T16:27:16Z"
            }
        },
        {
            "id": 319143,
            "firstName": "Lyanna",
            "lastName": "Mormont",
            "email": "lmor@housestark.com",
            "updatedAt": "2020-04-21T16:27:14Z",
            "createdAt": "2020-04-21T16:27:14Z",
            "membership": {
                "id": 1127,
                "progressionStatus": "Visited",
                "progressionStatusType": "Visited",
                "isExhausted": false,
                "acquiredBy": true,
                "reachedSuccess": false,
                "membershipDate": "2020-04-21T16:27:16Z",
                "updatedAt": "2020-04-21T16:27:16Z"
            }
        }
    ],
    "success": true,
    "nextPageToken": "SW3PTMBVFCNHSHJGZ7LQH3ZWNUOHKADJZ3MOQ2LOZZVNO3WEIUPDKPRTTHBSMW756KOCWURTOF2XS==="
}
```

The Get Programs by Lead Id endpoint takes a lead record id path parameter and returns all program records that the lead is a member of. The optional `filterType` and `filterValues` parameters allow you to filter on program Id.

### Request

```http
GET /rest/v1/leads/{id}/programMembership.json
```

### Response

```json
{
    "requestId": "12e84#1706f13a379",
    "result": [
        {
            "id": 1044,
            "progressionStatus": "Sent",
            "isExhausted": false,
            "acquiredBy": false,
            "reachedSuccess": false,
            "membershipDate": "2016-05-27T19:50:29Z",
            "updatedAt": "2016-05-27T19:50:29Z"
        }
    ],
    "success": true,
    "moreResult": false
}
```

## Smart Campaigns

The Get Smart Campaigns by Lead Id endpoint takes a lead record id path parameter and returns all smart campaign records that the lead is a member of.

### Request

```http
GET /rest/v1/leads/{id}/smartCampaignMembership.json?batchSize=3
```

### Response

```json
{
    "requestId": "e7b0#1706f163632",
    "result": [
        {
            "smartCampaignId": 3746,
            "createdAt": "2018-06-01T18:00:04Z",
            "updatedAt": "2018-06-01T18:00:06Z"
        },
        {
            "smartCampaignId": 3678,
            "createdAt": "2015-04-06T18:37:30Z",
            "updatedAt": "2015-04-06T18:37:41Z"
        },
        {
            "smartCampaignId": 3680,
            "createdAt": "2015-04-06T18:37:30Z",
            "updatedAt": "2015-04-06T18:37:40Z"
        }
    ],
    "success": true,
    "nextPageToken": "TNGAH3NKDUFDHNXUVGTNBXJCQM======",
    "moreResult": true
}
```

## Delete

Removing leads is straightforward using the Delete Leads endpoint.  Specify lead ids to delete using the id attributes in the body.  The maximum is 300 leads per request.  Use Content-Type: application/json header.

### Request

```http
POST /rest/v1/leads/delete.json
```

### Body

```json
{
   "input":[
      {
         "id": 235
      },
      {
         "id":766
      }
   ]
}
```

### Response

```json
{
  "requestId":"3608#16664333670",
  "result":[
    {
      "id":235,
      "status":"deleted"
    },
    {
      "id":766,
      "status":"deleted"
    }
  ],
  "success":true
}
```

## Relationships

* Companies through externalCompanyId field on lead record
* SalesPersons through externalSalesPersonId field on lead record
* Programs through program membership
* Lists through list membership
* Activities through leadId field in the activity
* Segmentation through individual segment fields on lead record
* Partitions through leadPartitionId on lead record

## Timeouts

Leads Endpoints have a 30s timeout unless noted below:

* Sync Leads: 90s
* Associate Lead: 60s
* Merge Leads: 180s
* Update Lead Partition: 60s
* Push Lead to Marketo: 90s
* Get Leads by Filter Type: 60s
* Get Leads by List ID: 60s
