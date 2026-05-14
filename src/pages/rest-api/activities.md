---
title: Activities
description: "Use the Marketo Engage Activities REST API to list activity types, fetch lead activities with paging tokens, and handle custom and data value changes."
---

# Activities

Marketo permits a huge variety of activity types related to lead records.  Nearly every change, action or flow step is recorded against a lead's activity log and can be retrieved via the API or leveraged in Smart List and Smart Campaign filters and triggers.  Activities are always related back to the lead record via the leadId, corresponding to the Id field of the record, and also has a unique id of its own.

There are a very large number of potential activity types, which may vary from subscription to subscription, and have unique definitions for each. While every activity has its own unique `id`, `leadId` and `activityDate`, the `primaryAttributeValueId` and `primaryAttributeValue` values vary in their meaning.

Marketo also permits the creation of Custom Activity Types through the Custom Activities Metadata API. Adding custom activities is done through the Add Custom Activities API.

Most activities will be purged after some period of time.

## Describe

To retrieve a list of available types and their definitions for an instance, you can use the [Get Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getAllActivityTypesUsingGET) endpoint.

```http
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

Real world responses include far more definitions. In this example, the type shown is a "Fill Out Form", which has a primary attribute of "Webform ID", which refers back to the Marketo ID of the form that was filled out, and can be used to relate back to that particular asset in Marketo. Additionally, there are definitions for each of the possible attributes of a particular activity record of this type and their data types. Note that if the field is empty, then that particular attribute is omitted from an individual activity record.

## Query

To retrieve activities from Marketo, call the [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getLeadActivitiesUsingGET) endpoint. You need to first retrieve a paging token for the datetime that you want to begin retrieving activities from. You then pass the paging token in the `nextPageToken` query parameter. In addition, you pass up to ten activity type Ids in the `activityTypeIds` query parameter as a comma-separated list.

You can optionally include either a `listId` query parameter to narrow your search to only those records included in a specific static list, or a `leadIds` query parameter and search for activities from only a specified set of leads. You can pass up to 30 `leadIds` as a comma separated list.

<InlineAlert slots="text" variant="warning" />

Beginning 2026-12-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit.

```http
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

For the first call, use the Get Paging Token API to get `nextPageToken`. For subsequent calls to this endpoint, use the `nextPageToken returned` from the response. This endpoint always returns `the nextPageToken`.

If the `moreResult` attribute is true, this means more results are available. Continue to call this endpoint until the `moreResult` attribute returns false, which means there are no results available. The `nextPageToken` returned from this API should always be reused for the next iteration of this call.

In some cases, this API may respond with fewer than 300 activity items, but also have the `moreResult` attribute set to true.  This indicates that there are more activities that can be returned and that the endpoint can be queried for more recent activities by including the returned `nextPageToken` in a subsequent call.

Note that within each result array item, the `id` integer attribute is being replaced by the `marketoGUID` string attribute as unique identifier.

### Data value changes

For Data Value Change activities, a specialized version of the activities API is provided. The [Get Lead Changes](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getLeadChangesUsingGET) endpoint only returns activities of Data Value Change records to lead fields. The interface is the same as the Get Lead Activities API with two differences:

* There is no `activityTypeIds` parameter, since the endpoint only returns Data Value Change and New Lead activities.
* The `fields` query parameter is required, where you can pass a comma-separated list of fields to indicate which fields you want to retrieve changes for.

<InlineAlert slots="text" variant="warning" />

Beginning 2026-12-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit.

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

Each activity in the response has a fields array, including a list of changes in the activity, which will specify the `id` and `name` of the field changed, as well as the new and old values relative to the change.

Note that within each result array item, the `id` integer attribute is being replaced by the `marketoGUID` string attribute as unique identifier.

### Deleted leads

There is also a special endpoint [Get Deleted Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getDeletedLeadsUsingGET) for retrieving deleted activities from Marketo.

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

Note that within each result array item, the `id` integer attribute is being replaced by the `marketoGUID` string attribute as unique identifier.

### Page through results

By default, the endpoints mentioned in this section return 300 activity items at a time.  If the `moreResult` attribute is true, more results are available. Call the endpoint until the `moreResult` attribute returns false, which means that there are no more results available. The `nextPageToken` returned from this endpoint should always be reused for the next iteration of this call.

In some cases, this endpoint may respond with fewer than 300 activity items, but also have the `moreResult` attribute set to true.  This indicates that there are additional activities that can be returned and that the endpoint can be queried for more recent activities by including the returned `nextPageToken` in a subsequent call. Note that the `nextPageToken` needs to be URL Encoded in the request.

## Custom Activity Types

Custom Activities function just like standard activities, except the schema is managed by third-parties, and not by Marketo. Instances of custom activities are linked to lead records through the `leadId` just as standard activities, but both primary and secondary attributes are arbitrarily defined. When a custom activity type is approved, a corresponding Smart List trigger and filter are created, so that leads can be processed based on current or historical custom activity data.

* Maximum number of Custom Activities: 10
* Maximum number of attributes per Custom Activity: 20

Retrieving custom activity data is done in the same way as standard activities, through the [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getLeadActivitiesUsingGET) API.

## Query Types

In addition to the standard Get Activity Types endpoint, the [Get Custom Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getCustomActivityTypeUsingGET) and [Describe Custom Activity Type](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/describeCustomActivityTypeUsingGET) endpoints returns details about the activity types provisioned in the Marketo instance, and metadata regarding the attributes for a given type. The normal [Get Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/getAllActivityTypesUsingGET) still returns metadata regarding custom activities, but does not indicate whether a given type is custom.

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

For type descriptions you must pass `apiName` as a path parameter. By default you get the approved version of the activity. You can optionally pass the `draft=true` parameter to retrieve the draft version of the activity.

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

Each custom activity type requires a display name, API name, trigger name, filter name, and primary attribute.

To ensure consistency of your types with Marketo conventions, and to avoid collisions, it is important to follow a few guidelines when creating your types:

**Display Name:** The display name of the activity type should briefly describe what an activity record represents, such as "Send Email", or "Change Data Value". These names should typically be in the infinitive form, that is "Attend Event".  Display names accept alphanumeric characters, spaces and underscores. Display names must contain at least one letter.

**API Name:** The API name is comprised of alphanumeric characters (maximum length of 255). If you are a LaunchPoint partner, you should prepend a representative namespace to your activity type API names. This is to avoid collisions with customer-provisioned types.  The convention is to use all lowercase or camelCase to help distinguish between other text strings.

**Description:** For activities that may have non-obvious behavior should include a description of what the activity type represents with relation to the lead.

**Trigger Name:** Each activity type must have a unique, human-readable trigger name. Trigger names should be in the third-person present tense, such as "Attends an Event". LaunchPoint partners should include their company name in the activity, such as "Attends Webinar – Acme Company."

**Filter Name:**  Each activity type must have a unique, human-readable filter name. Filter names should be in the third-person past tense, such as "Attended an Event". LaunchPoint partners should include their company name in the activity, that is "Attended Webinar – Acme Company."

**Primary Attribute:** The primary attribute of a custom activity should be the most significant field for the activity type. For example, for an "Attended Event" activity this would be the name of the event. Primary attributes are included as parameters by default in every instance of a trigger or filter for that activity type, and the value is displayed in the activity log of a person record without requiring drill-down into the activity.

When a custom activity is created, it is created as a draft, and must be approved before it can be used to add activity records of that type. All updates are implicitly applied to the draft version of the type. To reflect the changes in the live version of the type, it must be approved. When a custom activity type is approved and in use, no changes to the above fields may be made.

When creating a type, the description parameter is optional, while all of the following parameters are required: `apiName`, `name`, `triggerName`, `filterName`, `primaryAttribute`.

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

Updating a type is very similar, except the apiName is the only required parameter as a path parameter.

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

Types can be managed with the Approve Custom Activity Type, Discard Custom Activity Type Draft, and Delete Custom Activity Type, just like standard Marketo assets.

## Custom Activity Type Attributes

Each custom activity type can have from 0-20 secondary attributes. Secondary attributes may have any valid field type for a Marketo field. They are added, updated, and removed separately from the parent type, but may be edited while an activity type is in use and then approved. When fields are edited on a live type, then all activities of that type created after approval has the new secondary attribute set. Changes will not be applied retroactively to existing activities sharing that type.

Be careful about the removal of attributes, as this will affect their availability for use in the corresponding filters.

Updates made to the secondary attribute list use the API name of each attribute as a primary key. The API Name for an attribute may not be changed, it must be deleted and added again with the desired API name.

Valid data types for attributes are: string, boolean, integer, float, link, email, currency, date, datetime, phone, text.

When changing the primary attribute of an activity type, any existing primary attribute should be demoted by setting `isPrimary` to false first.

### Create Attributes

Creating an attribute takes a required `apiName` path parameter. Also required are the `name` and `dataType` parameters.`The description and` `isPrimary` parameters are optional.

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

When performing updates to attributes, the `apiName` of the attribute is the primary key. The `apiName` parameter must exist for the update to succeed (that is, you cannot change the `apiName` parameter using update).

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

Deleting an attribute takes a required `apiName` path parameter that is the custom activity API name.  Also required is an attribute parameter that is an array of attribute objects.  Each object must contain an `apiName` parameter that is the custom activity type API name.

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

Custom activities are write-once records of historical activities related to individual person records in Marketo. These activities have a schema that is managed by Marketo Admins or remotely via an API integration. Custom activities are added to lead records via the [Add Custom Activities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities/operation/addCustomActivityUsingPOST) endpoint and related to each lead record via its `leadId` field. Custom activities can be viewed in the user interface via the lead's activity log, or retrieved via Get Lead Activities endpoint by specifying the custom activity's type ID.

Custom activities are appropriate for recording data that is related to a single person record and which does not need to be updated or overwritten. An example would be recording a person attending an event as an "Attended Event" activity. For records related to a person that may change, such as student enrollment, custom objects should be used instead, as they can be updated, where custom activities may not.

The input member is an array of activity objects. A maximum of 300 activity records can be submitted at a time.

The `leadId`, `activityDate`, `activityTypeId`, `primaryAttributeValue`, and attributes members are required. The attributes array must contain the non-primary attribute. This can be specified using either name (field name), or apiName (API name), and value that corresponds to the value that you are setting.

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

Activities endpoints have a timeout of 30s unless noted below.

* Get Paging Token: 300s
* Add Custom Activity: 90s
