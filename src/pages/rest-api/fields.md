---
title: Fields
description: "Learn REST and SOAP lead field naming, list fields via REST Describe Lead, feature mapping, why sfdcId is null, and use sfdcLeadId or sfdcContactId."
---

# Fields

The REST API and SOAP API use different naming conventions for lead fields.

## Retrieve the List of Field Names

Retrieve the list of all supported field names available on your lead records by using the REST 'Describe Lead' endpoint.

## Where to Use Which Field Name Type?

Sometimes it is difficult to know which field name type that you must use when leveraging a particular integration-related feature. The following is a quick reference for which features use REST or SOAP field name types.

| Feature | Field Name Type to Use |
| --- | --- |
| Lead Tracking API (Munchkin) | SOAP |
| Forms 2.0 API | SOAP |
| List Import (UI) | SOAP |
| List Import (REST API) | REST |
| Webhook Response Mappings | SOAP |
| Email Scripting (Velocity) | SOAP |
| SOAP API | SOAP |
| REST API | REST |

### Why does the REST API field sfdcId always return a value of null?

The field `sfdcId` is a formula field which was erroneously included in the original field map for the REST API. Records retrieved via the REST API do not compute the value of formula fields, so the value will always be null. To capture the real SFDC ID, you should use the fields called `sfdcLeadId` and `sfdcContactId`.
