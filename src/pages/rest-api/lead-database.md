---
title: Lead Database
description: "Guide to Marketo Lead Database APIs covering objects, CRUD and Describe methods, query patterns, batch limits, and CRM integration restrictions."
---

# Lead Database

The Marketo Lead Database APIs are the most frequently utilized APIs that Marketo provides as they allow for data interchange of person and person-related data from Marketo, such as Activities, Opportunities, and Companies.

## Objects

Lead Database objects include the following:

- Leads
- Companies/Accounts
- Named Accounts
- Opportunities
- OpportunityRoles
- SalesPersons
- Custom Objects
- Activities
- List and Program Membership

Most of these objects include at least Create, Read, Update, and Delete methods. Also included is a "Describe" method which provides a list of available fields for each type, and a list of fields used for deduplication (for non-Lead objects), and which fields are searchable for retrieval of records. The richest set is provided for lead's as they have the largest variety of capabilities within Marketo applications.

## API

For a full listing of Lead Database API endpoints, including parameters, and modeling information, see the [Lead Database API Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi).

For instances with a native CRM integration enabled (either Microsoft Dynamics or Salesforce.com), the Company, Opportunity, Opportunity Role, and Sales Person APIs are disabled. The records are managed through the CRM when enabled and cannot be accessed or updated via Marketo's APIs.

- Max batch size (standard): 300 records
- Max batch size (bulk): 10MB file
- Default batch size: 300 records
- Content-type header (standard): application/json
- Content-type header (bulk): multipart/form-data

## Describe

For Leads, Companies, Opportunities, Roles, SalesPersons, and Custom Objects, a describe API is provided. Calling this retrieves metadata for the object, and a list of fields available for updating and querying. Describing is a crucial part of designing a proper integration with Marketo. It provides rich metadata about how objects can and cannot be interacted with, as well as how they can be created, updated, and queried. Apart from Describe Leads, each of these returns a list of keys available for `deduplication` in the `dedupeFields` response parameter. A list of fields is available as keys for querying in the `searchableFields` response parameter.

```http
GET /rest/v1/opportunities/roles/describe.json
```

```json
{
   "requestId":"185d6#14b51985ff0",
   "success":true,
   "result":[
      {
         "name":"opportunityRole",
         "displayName":"Opportunity Role",
         "createdAt":"2015-02-03T22:36:23Z",
         "updatedAt":"2015-02-03T22:36:24Z",
         "idField":"marketoGUID",
         "dedupeFields":[
            "externalOpportunityId",
            "leadId",
            "role"
         ],
         "searchableFields":[
            [
               "externalOpportunityId",
               "leadId",
               "role"
            ],
            [
               "marketoGUID"
            ],
            [
               "leadId"
            ],
            [
               "externalOpportunityId"
            ]
         ],
         "fields":[
            {
               "name":"marketoGUID",
               "displayName":"Marketo GUID",
               "dataType":"string",
               "length":36,
               "updateable":false
            },
            {
               "name":"externalOpportunityId",
               "displayName":"External Opportunity Id",
               "dataType":"string",
               "length":50,
               "updateable":false
            },
            {
               "name":"leadId",
               "displayName":"Lead Id",
               "dataType":"integer",
               "updateable":false
            },
            {
               "name":"role",
               "displayName":"Role",
               "dataType":"string",
               "length":50,
               "updateable":false
            },
            {
               "name":"isPrimary",
               "displayName":"Is Primary",
               "dataType":"boolean",
               "updateable":true
            },
            {
               "name":"externalCreatedDate",
               "displayName":"External Created Date",
               "dataType":"datetime",
               "updateable":true
            }
         ]
      }
   ]
}

```

In this example, `dedupeFields` is actually a compound key. This means that in future updates and creates, when using the `dedupeFields` mode, you must include all three of `externalOpportunityId`, `leadId`, and `role` for each role. The `searchableFields` array, also provides the list of fields available for querying role records. This also includes the compound key of `externalOpportunityId`, `leadId`, and `role`.

There is also a fields response parameter, which will provide the name of each field, the `displayName` as it appears in the Marketo UI, the datatype of the field, whether it can be updated after creation, and the length of the field if applicable.

## Query

Lead Database objects all share basic pattern for querying against simple keys, where just one field is referenced.

```http
GET /rest/v1/{type}.json?filterType={field to query}&filterValues={comma-separated list of possible values}
```

For all objects except leads, you can select your {field to query} from the searchableFields of the corresponding describe call, and compose a comma-separated list of up to 300 values. There are also these optional query parameters:

- `batchSize` - An integer count of the number of results to return. Default and Maximum are 300.
- `nextPageToken` - Token returned from a previous call for paging. See [Paging Tokens](paging-tokens.md) for more detail.
- `fields` - A comma-separated list of field names to return for each record. See corresponding description for a list of valid fields. If a particular field is requested, but not returned, the value is implied to be null.
- `_method` - Used for submitting queries using the POST HTTP method. See _method=GET section below for usage.

For a quick example, let's look at querying opportunities:

```http
GET /rest/v1/opportunities.json?filterType=idField&filterValues=dff23271-f996-47d7-984f-f2676861b5fa&dff23271-f996-47d7-984f-f2676861b5fc,dff23271-f996-47d7-984f-f2676861b5fb
```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fa ",
         "externalOpportunityId":"19UYA31581L000000",
         "name":"Chairs",
         "description":"Chairs",
         "amount":"1604.47",
         "source":"Inbound Sales Call/Email"
      },
      {
         "seq":1,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fc ",
         "externalOpportunityId":"29UYA31581L000000",
         "name":"Big Dog Day Care-Phase12",
         "description":"Big Dog Day Care-Phase12",
         "amount":"1604.47",
         "source":"Email"
      }
   ]
}

```

The `filterType` specified in this call is "idField" and not "marketoGUID". This and "dedupeFields" are both special cases, where the field corresponding to the idField, or dedupeFields can be aliased in this way. The "marketoGUID" is still the resulting lookup field in the call, but it is not explicitly set in the call. The fields and/or sets of fields indicated by the `idField` and `dedupeFields` of an object description will always be valid `filterTypes` for a query. This call searches for records matching the GUIDs included in filterValues, and returns any matching records. If there are no records found using this method, the response will still indicate success, however the result array will be empty, since the search was executed successfully, but there were no records to return.

If the set of records in the query exceeds 300 or the `batchSize` which was specified, whichever is smaller, then the response has a member `moreResult` with a value of true, and a `nextPageToken`, which can be included in a subsequent call to retrieve more of the set. See [Paging Tokens](paging-tokens.md) for more details.

### Long URIs

Sometimes, such as when querying by GUIDs, your URI may be long and exceed the 8KB permitted by the REST service. In this case, you must use the HTTP POST method instead of GET, and add a query parameter `_method=GET`. In addition, the rest of the query parameters must be passed in the POST body as an "application/x-www-form-urlencoded" string, and pass the associated Content-type header.

```http
POST /rest/v1/opportunities.json?_method=GET
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
filterType=idField&filterValues=dff23271-f996-47d7-984f-f2676861b5fa&dff23271-f996-47d7-984f-f2676861b5fc,dff23271-f996-47d7-984f-f2676861b5fb,544fb7f5-2ddf-4fca-ae32-7e6ef1415e9f,f1ba41a2-69d1-4a35-9807-0e159d66f2c9,f7521272-3331-4a89-a768-222baff2f894
```

Besides long URIs, this parameter is also required when querying compound keys.

### Compound Keys

The pattern for querying compound keys is different from simple keys, as it requires submitting a POST with a JSON body. This is not necessary in all cases, only in those where a `dedupeFields` option with multiple fields is used as the `filterType`. Currently compound keys are only used by Opportunity Roles, and some custom objects. Let's look at an example of a query for Opportunity Roles with the compound key from `dedupeFields`:

```http
POST /rest/v1/opportunities/roles.json?_method=GET
```

```json
{
   "filterType":"dedupeFields",
   "fields":[
      "marketoGuid",
      "externalOpportunityId",
      "leadId",
      "role"
   ],
   "input":[
      {
        "externalOpportunityId":"Opportunity1",
        "leadId": 1,
        "role": "Captain"
      },
      {
        "externalOpportunityId":"Opportunity2",
        "leadId": 1872,
        "role": "Commander"
      },
      {
        "externalOpportunityId":"Opportunity3",
        "leadId": 273891,
        "role": "Lieutenant Commander"
      }
   ]
}

```

The structure of the JSON object is mostly flat, and all of the query parameters for queries with simple keys are valid members, except for `filterValues`. Instead of a filter value, there is an "input" array of JSON objects, which each must have a member for each of the fields in your compound key; in this case, they are `externalOpportunityId`, `leadId`, and `role`. This executes a query for `roles`, against the provided inputs and return the matching results. If the response returns a parameter with `moreResult=true`, and a `nextPageToken`, you must include all of the original inputs and the `nextPageToken` for the query to execute properly.

## Create and Update

Creates and updates for lead database records, are all performed through POSTs with JSON bodies. The interface for Opportunities, Roles, Custom Objects, Companies, and SalesPersons are each the same. The Lead's interface is a little different, and you can read more about it there specifically.

The only required parameter is an array called `input` containing up to 300 objects, each with the fields that you want to insert/update as members. You can also optionally include an `action` parameter which can be one of: `createOnly`, `updateOnly`, or `createOrUpdate`. If the action is omitted, then the mode defaults to `createOrUpdate`. `dedupeBy` is another optional parameter that can be used when action is set to either createOnly or `createOrUpdate`. `dedupeBy` can be either `idField`, or `dedupeFields`. If `idField` is selected, then the `idField` listed in the description is used for deduplication and must be included in each record. `idField` mode is not compatible with `createOnly` mode. If `dedupeFields` are selected , then the `dedupeFields` listed in the object description used, and each one must be included in each record. If the `dedupeBy` parameter is omitted, the mode defaults to `dedupeFields`.

When passing a list of field values, a value of `null`, or an empty string, is written to the database as `null`.

```http
POST /rest/v1/opportunities.json
```

```json
{
   "action":"createOrUpdate",
   "dedupeBy":"dedupeFields",
   "input":[
      {
         "externalOpportunityId":"19UYA31581L000000",
         "name":"Chairs",
         "description":"Chairs",
         "amount":"1604.47",
         "source":"Inbound Sales Call/Email"
      },
      {
         "externalOpportunityId":"29UYA31581L000000",
         "name":"Big Dog Day Care-Phase12",
         "description":"Big Dog Day Care-Phase12",
         "amount":"1604.47",
         "source":"Email"
      }
   ]
}

```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "status":"updated",
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb"
      },
      {
         "seq":1,
         "status":"created",
         "marketoGUID":"cff23271-f996-47d7-984f-f2676861b5fb"
      }
   ]
}

```

Other than the leads API, calls to create or update lead database objects return a `seq` field in each object in the `result` array. The number listed corresponds to the order of the updated record in the request made. Each item returns the value of the `idField` for the object type, and a `status`. The status field indicates one of "created," "updated," or "skipped."  If the status is skipped, then there will also be a corresponding "reasons" array with one or more reason objects that includes a code and a message, indicating why a record was skipped. See [error codes](error-codes.md) for additional details.

### Delete

The interface for deletions is standard for Lead Database objects aside from leads. Aside from input, there is only one required parameter `deleteBy,` which can have a value of idField or dedupeFields. Let's look at deleting some custom objects.

```http
POST /rest/v1/customobjects/{name}/delete.json
```

```json
{
   "deleteBy":"dedupeFields",
   "input":[
      {
         "vin":"19UYA31581L000000"
      },
      {
         "vin":"29UYA31581L000000"
      },
      {
         "vin":"39UYA31581L000000"
      }
   ]
}

```

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "seq":0,
         "marketoGUID":"dff23271-f996-47d7-984f-f2676861b5fb",
         "status": "deleted"
      },
      {
         "seq":1,
         "marketoGUID":"da42707c-4dc4-4fc1-9fef-f30a3017240a",
         "status": "deleted"
      },
      {
         "seq":2,
         "status": "skipped"
         "reasons":[
            {
               "code":"1013",
               "message":"Object not found"
            }
         ]
      }
   ]
}

```

The `seq`, `status`, `marketoGUID`, and `reasons` should all be familiar to you by now.

For more details on working with CRUD operations for each individual object type, check out their respective pages.
