---
title: Lead Database
description: "Guide to Marketo Lead Database APIs covering objects, CRUD and Describe methods, query patterns, batch limits, and CRM integration restrictions."
---

# Lead Database

The Marketo Lead Database APIs exchange person and person-related data with Marketo. This data includes Activities, Opportunities, and Companies.

## Objects

The Lead Database includes the following objects:

- Leads
- Companies/Accounts
- Named Accounts
- Opportunities
- OpportunityRoles
- SalesPersons
- Custom Objects
- Activities
- List and Program Membership

Most Lead Database objects support Create, Read, Update, and Delete methods. The Describe method provides the available fields for each object type. For non-Lead objects, it also identifies fields used for deduplication and fields that are searchable when retrieving records.

Lead objects support the broadest set of capabilities because leads have the largest variety of uses in Marketo applications.

## API

For a complete list of Lead Database API endpoints, parameters, and modeling information, see the [Lead Database API Endpoint Reference](https://developer.adobe.com/marketo-apis/api/mapi).

When an instance has a native Microsoft Dynamics or Salesforce.com CRM integration, the Company, Opportunity, Opportunity Role, and Sales Person APIs are disabled. The CRM manages these records, so you cannot access or update them through Marketo APIs.

- Max batch size (standard): 300 records
- Max batch size (bulk): 10MB file
- Default batch size: 300 records
- Content-type header (standard): application/json
- Content-type header (bulk): multipart/form-data

## Describe

The Describe API is available for Leads, Companies, Opportunities, Roles, SalesPersons, and Custom Objects. Use it to retrieve object metadata and the fields available for updates and queries.

Except for Describe Leads, each Describe endpoint returns:

- `dedupeFields`: Keys available for deduplication.
- `searchableFields`: Keys available for queries.

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

In this example, `dedupeFields` is a compound key. When you use `dedupeFields` mode for future creates and updates, include `externalOpportunityId`, `leadId`, and `role` for each role.

The `searchableFields` array lists the fields available for querying role records. This list includes the compound key of `externalOpportunityId`, `leadId`, and `role`.

The `fields` response parameter provides the following information for each field:

- Name.
- `displayName` as shown in the Marketo UI.
- Data type.
- Whether the field can be updated after creation.
- Field length, if applicable.

## Query

Lead Database objects share a basic query pattern for simple keys that reference one field.

```http
GET /rest/v1/{type}.json?filterType={field to query}&filterValues={comma-separated list of possible values}
```

For all objects except leads, select `{field to query}` from `searchableFields` in the corresponding Describe response. Provide a comma-separated list of up to 300 values.

You can also include these optional query parameters:

- `batchSize`: An integer that specifies the number of results to return. The default and maximum value is 300.
- `nextPageToken`: A token returned from a previous call for paging. See [Paging Tokens](paging-tokens.md) for more information.
- `fields`: A comma-separated list of field names to return for each record. See the corresponding description for valid fields. If you request a field that is not returned, its value is implied to be null.
- `_method`: Submits queries by using the POST HTTP method. See the _method=GET section for usage.

The following example queries opportunities:

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

The `filterType` in this call is "idField", not "marketoGUID". Both "idField" and "dedupeFields" are special cases that let you use an alias for the corresponding field or fields. Although the call does not explicitly set "marketoGUID", it remains the lookup field.

The fields or field sets identified by `idField` and `dedupeFields` in an object description are always valid `filterTypes` for a query. This call returns records that match the GUIDs in filterValues. If no records match, the response indicates success and returns an empty result array.

If the matching record set exceeds 300 or the specified `batchSize`, whichever is smaller, the response includes `moreResult` with a value of true and a `nextPageToken`. Include the token in a subsequent call to retrieve more records. See [Paging Tokens](paging-tokens.md) for more information.

### Long URIs

A URI can exceed the 8KB limit of the REST service, such as when you query by GUIDs. In this case, use the HTTP POST method instead of GET and add the `_method=GET` query parameter.

Pass the remaining query parameters in the POST body as an "application/x-www-form-urlencoded" string. Also pass the associated Content-type header.

```http
POST /rest/v1/opportunities.json?_method=GET
```

```text
Content-Type: application/x-www-form-urlencoded
```

```text
filterType=idField&filterValues=dff23271-f996-47d7-984f-f2676861b5fa&dff23271-f996-47d7-984f-f2676861b5fc,dff23271-f996-47d7-984f-f2676861b5fb,544fb7f5-2ddf-4fca-ae32-7e6ef1415e9f,f1ba41a2-69d1-4a35-9807-0e159d66f2c9,f7521272-3331-4a89-a768-222baff2f894
```

The `_method=GET` parameter is also required when querying compound keys.

### Compound Keys

To query a compound key, submit a POST request with a JSON body. Use this pattern only when the `filterType` is a `dedupeFields` option with multiple fields.

Compound keys are currently used only by Opportunity Roles and some custom objects. The following example queries Opportunity Roles with the compound key from `dedupeFields`:

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

The JSON object accepts all query parameters used for simple-key queries except `filterValues`. Instead of `filterValues`, provide an "input" array of JSON objects. Each object must include every field in the compound key. In this example, the fields are `externalOpportunityId`, `leadId`, and `role`.

The request queries `roles` against the provided inputs and returns matching results. If the response includes `moreResult=true` and a `nextPageToken`, include all original inputs and the `nextPageToken` in the next request.

## Create and Update

Create and update Lead Database records by sending POST requests with JSON bodies. Opportunities, Roles, Custom Objects, Companies, and SalesPersons use the same interface. Leads use a different interface, which is described in the Leads documentation.

The only required parameter is `input`, an array of up to 300 objects. Each object contains the fields to insert or update.

You can also include these optional parameters:

- `action`: Accepts `createOnly`, `updateOnly`, or `createOrUpdate`. If omitted, the mode defaults to `createOrUpdate`.
- `dedupeBy`: Accepts `idField` or `dedupeFields` when action is set to either createOnly or `createOrUpdate`. If omitted, the mode defaults to `dedupeFields`.

When `dedupeBy` is `idField`, the `idField` listed in the description is used for deduplication and must be included in each record. `idField` mode is not compatible with `createOnly` mode.

When `dedupeBy` is `dedupeFields`, include each `dedupeFields` field listed in the object description in every record.

When you pass field values, the database writes a value of `null` or an empty string as `null`.

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

Except for the Leads API, create and update calls return a `seq` field in each object in the `result` array. The number corresponds to the position of the updated record in the request.

Each result also returns the object type's `idField` value and a `status` of "created," "updated," or "skipped." If the status is skipped, the result includes a "reasons" array. Each reason object contains a code and message that explain why the record was skipped. See [error codes](error-codes.md) for more information.

### Delete

Except for leads, Lead Database objects use a standard delete interface. In addition to input, the only required parameter is `deleteBy,` which accepts idField or dedupeFields.

The following example deletes custom objects:

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

The response includes `seq`, `status`, and `marketoGUID`. For skipped records, it also includes `reasons`.

For details about CRUD operations for a specific object type, see the documentation for that object.
