---
title: Activities
description: "Use the Marketo Engage Activities REST API to list activity types, fetch lead activities with paging tokens, and handle custom and data value changes."
---

# Activities

Marketo supports many activity types related to lead records. Nearly every change, action, or flow step is recorded in a lead's activity log. You can retrieve these activities through the API or use them in Smart List and Smart Campaign filters and triggers.

Each activity has a unique `id` and connects to a lead record through `leadId`, which corresponds to the record's Id field. Every activity also has an `activityDate`.

Available activity types vary by subscription, and each type has its own definition. The meaning of `primaryAttributeValueId` and `primaryAttributeValue` depends on the activity type.

Use the Custom Activities Metadata API to create Custom Activity Types. Use the Add Custom Activities API to add custom activity records.

Most activities will be purged after some period of time.

## Describe

Use the [Get Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getAllActivityTypesUsingGET) endpoint to retrieve the available activity types and their definitions for an instance.

```
GET /rest/v1/activities/types.json
```

```json
  "requestId": "6e78#148ad3b76f1",
  "success": true,
  "result": [
    {
      "id": 2,
      "name": "Fill Out Form",
      "description": "User fills out and submits form on web page",
      "primaryAttribute": {
        "name": "Webform ID",
        "dataType": "integer"
      },
      "attributes": [
        {
          "name": "Client IP Address",
          "dataType": "string"
        },
        {
          "name": "Form Fields",
          "dataType": "text"
        },
        {
          "name": "Query Parameters",
          "dataType": "string"
        },
        {
          "name": "Referrer URL",
          "dataType": "string"
        },
        {
          "name": "User Agent",
          "dataType": "string"
        },
        {
          "name": "Webpage ID",
          "dataType": "integer"
        }
      ]
    }
  ]
}
```

Actual responses include more definitions. This example shows the "Fill Out Form" activity type. Its primary attribute, "Webform ID," refers to the Marketo ID of the submitted form and links the activity to that asset.

The response also defines each possible attribute for the activity type and its data type. If a field is empty, that attribute is omitted from the individual activity record.

## Query

Use the [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) endpoint to retrieve activities. First, retrieve a paging token for the datetime where activity retrieval should begin. Pass that token in the `nextPageToken` query parameter.

Pass up to ten activity type Ids as a comma-separated list in the `activityTypeIds` query parameter.

Optionally, narrow the query with one of these parameters:

- `listId` limits results to records in a specific static list.
- `leadIds` limits results to activities for up to 30 leads, supplied as a comma-separated list.

<InlineAlert slots="text" variant="warning" />

Beginning 2026-12-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit. See the [Migration guide](migration.md).

```
GET /rest/v1/activities.json?activityTypeIds=1&nextPageToken=WQV2VQVPPCKHC6AQYVK7JDSA3I3LCWXH3Y6IIZ7YSGQLXHCPVE5Q====
```

```json
{
  "requestId": "24fd#15188a88d7f",
  "result": [
    {
      "id": 102988,
      "marketoGUID": "102988",
      "leadId": 1,
      "activityDate": "2023-01-16T23:32:19Z",
      "activityTypeId": 1,
      "primaryAttributeValueId": 71,
      "primaryAttributeValue": "localhost/munchkintest2.html",
      "attributes": [
        {
          "name": "Client IP Address",
          "value": "10.0.19.252"
        },
        {
          "name": "Query Parameters",
          "value": ""
        },
        {
          "name": "Referrer URL",
          "value": ""
        },
        {
          "name": "User Agent",
          "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
        },
        {
          "name": "Webpage URL",
          "value": "/munchkintest2.html"
        }
      ]
    }
  ],
  "success": true,
  "nextPageToken": "WQV2VQVPPCKHC6AQYVK7JDSA3J62DUSJ3EXJGDPTKPEBFW3SAVUA====",
  "moreResult": false
}
```

For the first call, use the Get Paging Token API to obtain `nextPageToken`. For each subsequent call, pass the `nextPageToken` returned by the previous response. This endpoint always returns `nextPageToken`.

If `moreResult` is true, more results are available. Continue calling the endpoint with the returned `nextPageToken` until `moreResult` is false.

The API can return fewer than 300 activity items while setting `moreResult` to true. In this case, include the returned `nextPageToken` in another call to retrieve more recent activities.

Within each result array item, the `marketoGUID` string attribute is replacing the `id` integer attribute as the unique identifier.

### Data value changes

Use the [Get Lead Changes](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadChangesUsingGET) endpoint to retrieve Data Value Change records for lead fields. Its interface differs from the Get Lead Activities API in two ways:

- The endpoint has no `activityTypeIds` parameter because it returns only Data Value Change and New Lead activities.
- The required `fields` query parameter accepts a comma-separated list of fields whose changes you want to retrieve.

<InlineAlert slots="text" variant="warning" />

Beginning 2026-12-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit. See the [Migration guide](migration.md).

```http
GET /rest/v1/activities/leadchanges.json?nextPageToken=GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ&fields=firstName,lastName,department
```

```json
{
  "requestId": "a9ae#148add1e53d",
  "success": true,
  "nextPageToken": "GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBRGA3TQ===",
  "moreResult": true,
  "result": [
    {
      "id": 1078,
      "marketoGUID": "1078",
      "leadId": 775,
      "activityDate": "2014-09-17T22:31:49+0000",
      "activityTypeId": 13,
      "fields": [
        {
          "id": 48,
          "name": "firstName",
          "newValue": "FirstName_6176",
          "oldValue": "FirstName_4914"
        }
      ],
      "attributes": [
        {
          "name": "Reason",
          "value": "Web service API"
        },
        {
          "name": "Source",
          "value": "Web service API"
        },
        {
          "name": "Lead ID",
          "value": 775
        }
      ]
    }
  ]
}
```

Each activity in the response has a fields array that lists its changes. Each change specifies the field's `id` and `name`, along with the new and old values.

Within each result array item, the `marketoGUID` string attribute is replacing the `id` integer attribute as the unique identifier.

### Deleted leads

Use the [Get Deleted Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/getDeletedLeadsUsingGET) endpoint to retrieve deleted lead activities from Marketo.

```http
GET /rest/v1/activities/deletedleads.json?nextPageToken=GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ
```

```json
{
  "requestId": "a9ae#148add1e53d",
  "success": true,
  "nextPageToken": "GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBRGA3TQ===",
  "moreResult": true,
  "result": [
    {
      "id": 2,
      "marketoGUID": "2",
      "leadId": 6,
      "activityDate": "2013-09-26T06:56:35+0000",
      "activityTypeId": 37,
      "primaryAttributeValueId": 6,
      "primaryAttributeValue": "Owyliphys Iledil",
      "attributes": []
    },
    {
      "id": 3,
      "marketoGUID": "3",
      "leadId": 9,
      "activityDate": "2013-12-28T00:39:45+0000",
      "activityTypeId": 37,
      "primaryAttributeValueId": 4,
      "primaryAttributeValue": "First Last",
      "attributes": []
    }
  ]
}
```

Within each result array item, the `marketoGUID` string attribute is replacing the `id` integer attribute as the unique identifier.

### Page through results

By default, the endpoints in this section return 300 activity items at a time. If `moreResult` is true, more results are available. Pass the returned `nextPageToken` in each subsequent call until `moreResult` is false.

An endpoint can return fewer than 300 activity items while setting `moreResult` to true. In this case, include the returned `nextPageToken` in another call to retrieve more recent activities. URL-encode `nextPageToken` in the request.

## Custom Activity Types

Custom Activities work like standard activities, but third parties manage their schemas. Custom activity records link to lead records through `leadId`, and their primary and secondary attributes are user-defined.

When a custom activity type is approved, Marketo creates a corresponding Smart List trigger and filter. You can then process leads based on current or historical custom activity data.

- Maximum Custom Activities: 10
- Maximum attributes per Custom Activity: 20

Retrieve custom activity data through the [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) API, the same way that you retrieve standard activities.

## Query Types

Use [Get Custom Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomActivityTypeUsingGET) to retrieve details about the types provisioned in a Marketo instance. Use [Describe Custom Activity Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeCustomActivityTypeUsingGET) to retrieve attribute metadata for a specific type.

The standard [Get Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getAllActivityTypesUsingGET) endpoint also returns custom activity metadata, but it does not identify whether a type is custom.

### Get types

```http
GET /rest/v1/activities/external/types.json
```

```json
{
  "requestId": "185d6#14b51985ff0",
  "success": true,
  "result": [
    {
      "id": 100001,
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attends Conference",
      "filterName": "Attended Conference",
      "createdAt": "2016-02-03T22:36:23Z",
      "updatedAt": "2016-02-03T22:36:23Z",
      "status": "approved"
    }
  ]
}
```

### Describe types

To describe a type, pass `apiName` as a path parameter. By default, the endpoint returns the approved version of the activity. To retrieve the draft version, pass the optional `draft=true` parameter.

```http
GET /rest/v1/activities/external/type/{apiName}/describe.json
```

```json
{
  "requestId": "185d6#14b51985ff0",
  "success": true,
  "result": [
    {
      "id": 100001,
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attends Conference",
      "filterName": "Attended Conference",
      "createdAt": "2016-02-03T22:36:23Z",
      "updatedAt": "2016-02-03T22:36:23Z",
      "status": "approved",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      },
      "attributes": [
        {
          "apiName": "conferenceDate",
          "name": "Conference Date",
          "description": "Date of the conference",
          "dataType": "datetime"
        },
        {
          "apiName": "numberOfAttendees",
          "name": "Number of Attendees",
          "description": "Number of people attending conference",
          "dataType": "integer"
        }
      ]
    }
  ]
}
```

## Create type

Each custom activity type requires a display name, API name, trigger name, filter name, and primary attribute. Use the following guidelines to keep types consistent with Marketo conventions and avoid naming collisions:

- **Display Name:** Briefly describe what an activity record represents, such as "Send Email" or "Change Data Value." Use the infinitive form, such as "Attend Event." Display names accept alphanumeric characters, spaces, and underscores and must contain at least one letter.

- **API Name:** Use alphanumeric characters, with a maximum length of 255. If you are a LaunchPoint partner, prepend a representative namespace to activity type API names to avoid collisions with customer-provisioned types. Use lowercase or camelCase to distinguish API names from other strings.

- **Description:** For activities with non-obvious behavior, explain what the activity type represents in relation to the lead.

- **Trigger Name:** Provide a unique, human-readable name in the third-person present tense, such as "Attends an Event." LaunchPoint partners should include their company name, such as "Attends Webinar – Acme Company."

- **Filter Name:** Provide a unique, human-readable name in the third-person past tense, such as "Attended an Event." LaunchPoint partners should include their company name, such as "Attended Webinar – Acme Company."

- **Primary Attribute:** Select the most significant field for the activity type. For an "Attended Event" activity, this field is the event name. The primary attribute appears by default as a parameter in every trigger or filter for the activity type. Its value also appears in a person's activity log without requiring drill-down into the activity.

A new custom activity type is created as a draft. Approve the type before adding activity records of that type. Updates apply to the draft version and must be approved before they appear in the live version. After a custom activity type is approved and in use, the preceding fields cannot be changed.

When creating a type, the description parameter is optional. The required parameters are `apiName`, `name`, `triggerName`, `filterName`, and `primaryAttribute`.

```http
POST /rest/v1/activities/external/type.json
```

```json
{
  "apiName": "attendConference",
  "name": "Attend Conference",
  "description": "Attend the conference",
  "triggerName": "Attends Conference",
  "filterName": "Attended Conference",
  "primaryAttribute": {
    "apiName": "conferenceName",
    "name": "Conference Name",
    "description": "Name of the conference"
  }
}
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attends Conference",
      "filterName": "Attended Conference",
      "status": "draft",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      }
    }
  ]
}
```

## Update Type

To update a type, pass the required apiName as a path parameter. Other fields can be supplied in the request body.

```http
POST /rest/v1/activities/external/type/{apiName}.json
```

```json
{
  "name": "Attend Conference",
  "description": "Attend the conference",
  "triggerName": "Attend Conference",
  "filterName": "Attended Conference",
  "primaryAttribute": {
    "apiName": "conferenceName",
    "name": "Conference Name",
    "description": "Name of the conference"
  }
}
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attend Conference",
      "filterName": "Attended Conference",
      "status": "draft",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      }
    }
  ]
}
```

## Approve Type

Manage types with Approve Custom Activity Type, Discard Custom Activity Type Draft, and Delete Custom Activity Type, as you would standard Marketo assets.

## Custom Activity Type Attributes

Each custom activity type can have 0–20 secondary attributes. A secondary attribute can use any valid Marketo field type. Add, update, and remove secondary attributes separately from the parent type.

You can edit attributes while an activity type is in use and then approve the changes. Activities created after approval use the new secondary attribute set. Changes do not apply retroactively to existing activities of that type.

Removing attributes also removes their availability in the corresponding filters.

Updates to the secondary attribute list use each attribute's API name as the primary key. To change an API Name, delete the attribute and add it again with the desired API name.

Valid data types for attributes are: string, boolean, integer, float, link, email, currency, date, datetime, phone, text.

Before changing the primary attribute of an activity type, demote the existing primary attribute by setting `isPrimary` to false.

### Create Attributes

To create an attribute, pass the required `apiName` path parameter. The `name` and `dataType` parameters are also required. The description and `isPrimary` parameters are optional.

```http
POST /rest/v1/activities/external/type/{apiName}/attributes/create.json
```

```json
{
  "attributes": [
    {
      "apiName": "conferenceDate",
      "name": "Conference Date",
      "description": "Date of the conference",
      "dataType": "datetime"
    },
    {
      "apiName": "numberOfAttendees",
      "name": "Number of Attendees",
      "description": "Number of people attending conference",
      "dataType": "integer"
    }
  ]
}
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "id": 100001,
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attend Conference",
      "filterName": "Attended Conference",
      "createdAt": "2016-02-03T22:36:23Z",
      "updatedAt": "2016-02-03T22:36:23Z",
      "status": "approved with draft",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      },
      "attributes": [
        {
          "apiName": "conferenceDate",
          "name": "Conference Date",
          "description": "Date of the conference",
          "dataType": "datetime"
        },
        {
          "apiName": "numberOfAttendees",
          "name": "Number of Attendees",
          "description": "Number of people attending conference",
          "dataType": "integer"
        }
      ]
    }
  ]
}
```

### Update attributes

When updating attributes, the attribute `apiName` is the primary key and must already exist. You cannot change `apiName` with an update.

```http
POST /rest/v1/activities/external/type/{apiName}/attributes/update.json
```

```json
{
  "attributes": [
    {
      "apiName": "conferenceDate",
      "name": "Conference Date",
      "description": "Date of the conference",
      "dataType": "datetime"
    },
    {
      "apiName": "numberOfAttendee",
      "name": "Number of Attendee",
      "description": "Number of people attending conference",
      "dataType": "integer"
    }
  ]
}
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "id": 100001,
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attend Conference",
      "filterName": "Attended Conference",
      "createdAt": "2016-02-03T22:36:23Z",
      "updatedAt": "2016-02-03T22:36:23Z",
      "status": "approved with draft",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      },
      "attributes": [
        {
          "apiName": "conferenceDate",
          "name": "Conference Date",
          "description": "Date of the conference",
          "dataType": "datetime"
        },
        {
          "apiName": "numberOfAttendee",
          "name": "Number of Attendee",
          "description": "Number of people attending conference",
          "dataType": "integer"
        }
      ]
    }
  ]
}
```

### Delete Attributes

To delete an attribute, pass the required `apiName` path parameter for the custom activity. Also pass the required attribute parameter as an array of attribute objects. Each object must contain an `apiName` parameter for the custom activity type.

```http
POST /rest/v1/activities/external/type/{apiName}/attributes/delete.json
```

```json
{ "attributes":[ { "apiName":"conferenceDate" }, { "apiName":"numberOfAttendees" } ] }
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "id": 100001,
      "apiName": "attendConference",
      "name": "Attend Conference",
      "description": "Attend the conference",
      "triggerName": "Attend Conference",
      "filterName": "Attended Conference",
      "createdAt": "2016-02-03T22:36:23Z",
      "updatedAt": "2016-02-03T22:36:23Z",
      "status": "approved with draft",
      "primaryAttribute": {
        "apiName": "conferenceName",
        "name": "Conference Name",
        "description": "Name of the conference",
        "dataType": "string"
      }
    }
  ]
}
```

## Add Custom Activities

Custom activities are write-once records of historical activities for individual person records. Marketo Admins can manage their schema in Marketo, or an API integration can manage it remotely.

Use the [Add Custom Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/addCustomActivityUsingPOST) endpoint to add custom activities to lead records. The `leadId` field associates each activity with a lead. View custom activities in the lead's activity log, or retrieve them through Get Lead Activities by specifying the custom activity type ID.

Use custom activities for data related to one person that does not need to be updated or overwritten. For example, record event attendance as an "Attended Event" activity.

Use custom objects for person-related records that can change, such as student enrollment. Custom objects can be updated, but custom activities cannot.

The input member is an array of activity objects. You can submit a maximum of 300 activity records at a time.

The `leadId`, `activityDate`, `activityTypeId`, `primaryAttributeValue`, and attributes members are required. The attributes array must contain the non-primary attribute. Specify it with either name (field name) or apiName (API name), and value for the value to set.

```http
POST /rest/v1/activities/external.json
```

```json
{
  "input": [
    {
      "leadId": 1001,
      "activityDate": "2016-09-26T06:56:35+07:00",
      "activityTypeId": 1001,
      "primaryAttributeValue": "Game Giveaway",
      "attributes": [
        {
          "apiName": "uRL",
          "value": "http://www.nvidia.com/game-giveaway"
        }
      ]
    },
    {
      "leadId": 1200,
      "activityDate": "2016-09-26T06:56:35+07:00",
      "activityTypeId": 1001,
      "primaryAttributeValue": "Game Giveaway",
      "attributes": [
        {
          "apiName": "uRL",
          "value": "http://www.nvidia.com/game-giveaway"
        }
      ]
    },
    {
      "leadId": 3000,
      "activityDate": "2016-09-26T06:56:35+07:00",
      "activityTypeId": 1001,
      "primaryAttributeValue": "Contest Form",
      "attributes": [
        {
          "apiName": "uRL",
          "value": "http://www.nvidia.com/game-giveaway"
        }
      ]
    }
  ]
}
```

```json
{
  "requestId": "e42b#14272d07d78",
  "success": true,
  "result": [
    {
      "id": 50,
      "marketoGUID": "50",
      "status": "added"
    },
    {
      "id": 51,
      "marketoGUID": "51",
      "status": "added"
    },
    {
      "status": "skipped",
      "errors": [
        {
          "code": "1004",
          "message": "Lead not found"
        }
      ]
    }
  ]
}
```

## Timeouts

Activities endpoints have a timeout of 30s, except for the following endpoints:

- Get Paging Token: 300s
- Add Custom Activity: 90s
