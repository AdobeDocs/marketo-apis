---
title: Leads
description: "Explore Marketo Leads REST API features including Describe, query by ID or filter, default fields, limits, and retrieving ECIDs."
---

# Leads

[Leads Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads)

The Marketo Leads API supports CRUD operations on lead records. You can also modify a lead's membership in static lists and programs and initiate Smart Campaign processing for leads.

## Describe

Use Describe Leads to retrieve the fields available through the REST API and the metadata for each field:

- Data type
- REST API name
- Length, if applicable
- Read-only status
- Friendly label

Describe is the primary source of truth for field availability and metadata.

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

Actual responses include more fields in the result array. Each item represents a field available on the lead record and contains at least an id, a displayName, and a datatype.

The REST child objects appear only when the field is valid for the corresponding API. The `readOnly` property indicates whether the corresponding API can update the field. When present, the length property gives the maximum field length, and the dataType property gives the field's data type.

## Query

Use one of two primary methods to retrieve leads:

- Get Lead by Id takes one lead id as a path parameter and returns one lead record.
- Get Leads by Filter Type finds records whose selected field matches one of the supplied values.

For Get Lead by Id, optionally pass a fields parameter with a comma-separated list of field names to return. If the request omits fields, the response includes `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, and `id`. If a requested field is not returned, its value is implied to be null.

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

Get Lead by Id always returns one record in the first position of the result array.

Get Leads by Filter Type returns the same record type and can return up to 300 records per page. The `filterType` and `filterValues` query parameters are required.

`filterType` accepts any Custom Field and most commonly used fields. Call the `Describe2` endpoint to retrieve the searchable fields allowed for `filterType`. When searching by Custom Field, the supported data types are `string`, `email`, and `integer`. Use the Describe method to retrieve field details such as description and type.

`filterValues` accepts up to 300 comma-separated values. The call returns records where the selected lead field matches one of those values. If more than 1,000 leads match the filter, the API returns "1003, Too many results match the filter".

If the total GET request exceeds 8KB, the API returns "414, URI too long" under RFC 7231. To work around this limit, change GET to POST, add the _method=GET parameter, and put the query string in the request body.

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

This call returns records whose ids match the values in `filterValues`.

If no records match, the response indicates success and contains an empty result array.

### Response

```json
{
"requestId": "177a1#1578b643357",
"result": [],
"success": true
}
```

Both Get Lead by Id and Get Leads by Filter Type accept a fields query parameter containing a comma-separated list of API fields. When fields is present, each response record includes the listed fields. If it is omitted, the response includes `id`, `email`, `updatedAt`, `createdAt`, `firstName`, and `lastName`.

## Adobe ECID

When Adobe Experience Cloud Audience Sharing is enabled, cookie synchronization associates Adobe Experience Cloud ID (ECID) values with Marketo leads. To retrieve associated ECID values with the preceding lead retrieval methods, include `ecids` in the fields parameter. For example, `&fields=email,firstName,lastName,ecids`.

## Create and Update

The Leads API can create, update, and delete lead records. Create and update operations use the same endpoint, with the operation type defined in the request. One request can create or update up to 300 records.

<InlineAlert slots="text" variant="info" />

Updating Company fields using [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) endpoint is not supported. Use [Sync Companies](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCompaniesUsingPOST) endpoint instead.

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

The request uses two important fields:

- `action` specifies the operation type: `createOrUpdate`, `createOnly`, `updateOnly`, or `createDuplicate`. If omitted, it defaults to `createOrUpdate`.
- `lookupField` specifies the key when action is `createOrUpdate` or `updateOnly`. If omitted, it defaults to `email`.

By default, the operation uses the default partition. The optional `partitionName` parameter works only when action is `createOnly` or `createOrUpdate`. To use `partitionName` as additional deduplication criteria, include it in the source type for custom dedupe rules.

During an update, the API returns an error if the lead does not exist in the specified partition or if the API-only user cannot access that partition.

Because `id` is a system-managed unique key, include it only with the `updateOnly` action.

The request must include an `input` parameter containing an array of lead records. Each lead record is a JSON object with any number of lead fields. Keys must be unique within each record, and all JSON strings must use UTF-8 encoding.

Use `externalCompanyId` to link a lead record to a company record. Use `externalSalesPersonId` to link a lead record to a sales person record.

Concurrent or closely timed upsert requests can create duplicate records when multiple requests use the same key value before the first request returns. To prevent duplicates, use `createOnly` or `updateOnly` as appropriate. Alternatively, queue calls and wait for each call to return before submitting another upsert with the same key.

## Fields

The lead object contains standard fields and optional custom fields. Standard fields exist in every Marketo Engage subscription, while users create custom fields as needed.

Each field definition contains metadata attributes such as display name, API name, and dataType.

Use the following endpoints to query, create, and update fields on the lead object. The API user's role must have the Read-Write Schema Standard Field permission, the Read-Write Schema Custom Field permission, or both.

## Query Fields

Query one lead field by API name or query all lead fields. Depending on the role permissions, the response can include standard fields, custom fields, and hidden fields.

## By Name

The Get Lead Field by Name endpoint retrieves metadata for one lead field. The required fieldApiName path parameter specifies the field's API name.

The response resembles the Describe Lead response but includes additional metadata. For example, the isCustom attribute indicates whether the field is custom.

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

The Get Lead Fields endpoint retrieves metadata for all fields on the lead object. By default, it returns a maximum of 300 records. Use the `batchSize` query parameter to reduce this number.

If `moreResult` is true, more results are available. Pass the returned `nextPageToken` in each subsequent call until `moreResult` is false.

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

The Create Lead Fields endpoint creates one or more custom fields on the lead object and provides functionality comparable to the Marketo Engage UI. You can create up to 100 custom fields with this endpoint.

Carefully consider each field before creating it in a production instance. After a field is created, you can hide it but cannot delete it. Unused fields add clutter to the instance.

The required input parameter is an array of lead field objects. Each object requires these attributes:

- `displayName` is the field's UI display name.
- `name` is the field's API name.
- `dataType` is the field type.

Optional attributes are `description`, `isHidden`, `isHtmlEncodingInEmail`, and `isSensitive`.

The name attribute must be unique, start with a letter, and contain only letters, numbers, or underscores. The `displayName` must be unique and cannot contain special characters.

A common convention applies camel case to `displayName` to produce name. For example, a `displayName` of "My Custom Field" produces a name of "myCustomField".

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

The Update Lead Field endpoint updates one custom field on the lead object. Most field updates available in the Marketo Engage UI are also available through the API. The following table summarizes the differences.

table
tbody
tr
td style="width: 26.5306%;" rowspan="2"strongAttribute/strong/td
td style="width: 35%;" colspan="2"strongStandard Field/strong/td
td style="width: 38.2654%;" colspan="2"strongCustom Field/strong/td
/tr
tr
td style="width: 17.449%;"strongUpdatable by API?/strong/td
td style="width: 17.551%;"strongUpdatable by UI?/strong/td
td style="width: 19.3878%;"strongUpdatable by API?/strong/td
td style="width: 18.8776%;"strongUpdatable by UI?/strong/td
/tr
tr
td style="width: 26.5306%;"dataType/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"no/td
td style="width: 19.3878%;"no/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"description/td
td style="width: 17.449%;"yes/td
td style="width: 17.551%;"yes/td
td style="width: 19.3878%;"yes/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"displayName/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"no/td
td style="width: 19.3878%;"yes/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"isCustom/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"no/td
td style="width: 19.3878%;"no/td
td style="width: 18.8776%;"no/td
/tr
tr
td style="width: 26.5306%;"isHidden/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"yes/td
td style="width: 19.3878%;"yes (if created by API)/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"isHtmlEncodingInEmail/td
td style="width: 17.449%;"yes/td
td style="width: 17.551%;"yes/td
td style="width: 19.3878%;"yes/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"isSensitive/td
td style="width: 17.449%;"yes/td
td style="width: 17.551%;"yes/td
td style="width: 19.3878%;"yes/td
td style="width: 18.8776%;"yes/td
/tr
tr
td style="width: 26.5306%;"length/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"no/td
td style="width: 19.3878%;"no/td
td style="width: 18.8776%;"no/td
/tr
tr
td style="width: 26.5306%;"name/td
td style="width: 17.449%;"no/td
td style="width: 17.551%;"no/td
td style="width: 19.3878%;"no/td
td style="width: 18.8776%;"no/td
/tr
/tbody
/table

The required `fieldApiName` path parameter specifies the API name of the field to update. The required input parameter is an array containing one lead field object with one or more attributes.

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

Push Lead is an alternative to Sync Leads and provides more triggering options, similar to a Marketo form. In addition to synchronizing lead fields, the endpoint can associate a lead based on a cookie value. Pass the `mkt_tok` value generated by a click from a Marketo email, or pass a program name in the call.

The endpoint also creates one triggerable activity associated with a Marketo program, campaign, or both. Use this activity to start workflows from lead capture events attributed to a specific campaign or program.

Push Lead uses the same primary keys and field API names as Sync Leads. It has no action parameter because it always performs an upsert.

The `programName` and input parameters are required. The input parameter is an array of lead objects, and the resulting activity is attributed to the named program. The `lookupField`, `source`, and `reason` parameters are optional. Add arbitrary strings in `source` and `reason` to include those values in the resulting activities. You can use the values as constraints in the corresponding triggers (Lead is Pushed to Marketo) and filters (Lead Was Pushed to Marketo).

To associate prior anonymous activities with a newly created lead, omit the cookies attribute from the lead object and call Associate Lead after Push Lead. To create a lead without activity history, specify the cookies attribute in the lead object.

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

To pass the `mkt_tok` parameter, assign its value to the mktToken member in a lead record within the input parameter.

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

Submit Form is an alternative for synchronizing leads and provides functionality equivalent to a Marketo Form submission. Use it to start workflows from lead capture events attributed to a specific campaign or program.

The Submit Form endpoint supports the following functionality:

- Upserts a lead record using the email field as the primary key.
- Creates a "Fill out Form" activity associated with a program, campaign, or both.
- Associates a lead based on a cookie value.
- Validates form fields.

Submit a form with the standard lead database pattern. Pass one object record in the required input member of the POST request's JSON body. The required `formId` member contains the target Marketo form ID.

Use the optional `programId` to identify the program that receives the lead, program member custom fields, or both. If `programId` is present, the lead is added to the program along with any program member fields in the form. The program must be in the same workspace as the form.

If the form does not contain program member custom fields and `programId` is omitted, the lead is not added to a program. If the form belongs to a program, contains one or more program member custom fields, and omits `programId`, the endpoint uses the form's program.

The required `leadFormFields` object contains one or more name/value pairs for fields to populate. Every field must be defined in the specified form, and each name must be the field's REST API name. The `email` field is required.

The optional `visitorData` object contains page-visit data, including `pageURL`, `queryString`, `leadClientIpAddress`, and `userAgentString`. Use it to populate additional activity fields for filters and triggers.

The optional cookie member associates a Munchkin cookie with a Marketo person record. When the endpoint creates a lead, it associates prior anonymous activities with that lead unless the cookie was previously associated with another known record.

If the cookie was previously associated, new activities are tracked against the new record, but old activities remain with the existing known record. To create a lead without activity history, omit the cookie member.

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

The following image shows the corresponding "Fill Out Form" activity details in the Marketo Engage UI:

![Fill Out Form UI](assets/fill_out_form_activity_details.png)

## Merge

<InlineAlert slots="text" variant="info" />

Beginning March 31, 2026, calls which include more than 25 IDs in the `leadIds` parameter of a Merge Leads API call will result in a 1080 error code, and the call will be skipped. Jobs requiring the merger of more than 25 records into one, should be split into multiple jobs to ensure the success of those calls. 

Use the Merge Leads API to combine duplicate records into one record. A merge combines activity logs; program, campaign, and list memberships; CRM information; and field values.

Pass the winning lead id as a path parameter. Pass either one `leadId` as a query parameter or up to 25 comma-separated ids in the `leadIds` parameter.


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

The lead in the path parameter is the winning lead. When field values conflict, the merge uses the winner's value unless that value is empty and the losing record's value is not. The leads in the `leadId` or `leadIds` parameter are the losing leads.

For an SFDC-sync enabled subscription, use the `mergeInCRM` parameter to also perform the merge in the CRM. If both records are in SFDC and one is a CRM lead while the other is a CRM contact, the CRM contact wins regardless of the specified winner. If one record is in SFDC and the other exists only in Marketo, the SFDC lead wins regardless of the specified winner.

## Associate Web Activity

Lead Tracking (Munchkin) records Visits and Clicks for visitors to your website and Marketo Landing Pages. These activities use a key that corresponds to the "_mkto_trk" cookie in the lead's browser, allowing Marketo to track the same person's activities.

Association with a lead record usually occurs when a lead follows a link from a Marketo email or submits a Marketo form. To associate a lead after another type of event, use the Associate Lead endpoint. Pass the known lead record id as a path parameter and the "_mkto_trk" cookie value in the cookie query parameter.

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

If the cookie is already associated with a known lead, using this API for a different lead records new web activity against the new record. Existing web activity does not move to the new record.
Membership

Retrieve lead records based on membership in a static list or program. You can also retrieve all static lists, programs, or smart campaigns that include a specific lead.

The response structure and optional parameters match Get Leads by Filter Type, but this API does not accept `filterType` or `filterValues`.

To find the list id in the Marketo UI, navigate to the list and inspect its URL. In `https://app-****.marketo.com/#ST1001A1`, 1001 is the list `id`.

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

The Get Lists by Lead Id endpoint takes a lead record `id` path parameter and returns every static list that includes the lead.

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

Retrieve program membership in the same way as list membership. Get Leads by Program Id accepts the same optional request parameters and requires the `programId` path parameter.

Optionally, pass a fields parameter containing a comma-separated list of field names. If fields is omitted, the response includes `email`, `updatedAt`, `createdAt`, `lastName`, `firstName`, `membership`, and `id`. If a requested field is not returned, its value is implied to be null.

Each item in the result array is a lead with a child object called "membership." This object describes the lead's relationship to the requested program and always includes `progressionStatus`, `acquiredBy`, `reachedSuccess`, and `membershipDate`.

If the parent program is an engagement program, membership also includes `stream`, `nurtureCadence`, and `isExhausted` to describe the lead's position and activity in that program.

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

The Get Programs by Lead Id endpoint takes a lead record id path parameter and returns every program that includes the lead. Use the optional `filterType` and `filterValues` parameters to filter on program Id.

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

The Get Smart Campaigns by Lead Id endpoint takes a lead record id path parameter and returns every smart campaign that includes the lead.

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

Use the Delete Leads endpoint to remove lead records. Specify the lead ids in the body with id attributes. A request can delete up to 300 leads. Send the Content-Type: application/json header.

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

- Companies through the externalCompanyId field on the lead record
- SalesPersons through the externalSalesPersonId field on the lead record
- Programs through program membership
- Lists through list membership
- Activities through the leadId field in the activity
- Segmentation through individual segment fields on the lead record
- Partitions through the leadPartitionId field on the lead record

## Timeouts

Leads endpoints have a 30s timeout, except for the following endpoints:

- Sync Leads: 90s
- Associate Lead: 60s
- Merge Leads: 180s
- Update Lead Partition: 60s
- Push Lead to Marketo: 90s
- Get Leads by Filter Type: 60s
- Get Leads by List ID: 60s
