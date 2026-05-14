---
title: Custom Objects
description: "Learn how Marketo Custom Objects link one lead to many records, with structure, limits, and SOAP API calls for get, sync, delete, plus Smart List and email use."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# Custom Objects

A Marketo Custom object allows for the creation of a one to many relationship between your Marketo leads and the custom object records. For example, you may want to track all the roadshows attended by a lead. As leads may attend a number of roadshows (over multiple years), custom objects are better suited to store this information.

Custom objects are supported on all Marketo editions except Spark. When the Marketo custom object is successfully provisioned in your account, you can

- Create/Read/Update/Delete records in the custom object via Marketo SOAP API
- Use Smart List trigger when new records are added to the custom object
- Use the custom object data as a filter in Smart Lists
- Use the custom object data in emails using Marketo Email Scripting

## Structure of Custom Objects

Custom objects consist of:

- A small set of fixed attributes that are common to all custom objects:
  - Object Name (aka the Object Type Name)
  - Object Description
  - Custom Object to Marketo Lead Link Field Name - this is a field on the Lead (Person) object that the Custom Object references
  - Object Key Field Name - the primary key used by your object
- One or more object specific fields (we support a max of 50 such fields)

## Custom Object Operations

The following calls can be used to interact with COs.

- [getCustomObjects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/getCustomObjectsUsingGET)
- [syncCustomObjects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/syncCustomObjectsUsingPOST)
- [deleteCustomObjects](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects/operation/deleteCustomObjectsUsingPOST)
