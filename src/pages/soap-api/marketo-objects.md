---
title: Marketo Objects
description: "Overview of Marketo MObjects including types, attributes, external-key behavior, and supported SOAP APIs for Opportunity, Program, and related records."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# Marketo Objects

Marketo uses Marketo objects (MObjects) to represent various classes like Program, Opportunity, and OpportunityPersonRole.

## Structure of MObjects

MObjects can be one of three types: Standard, Custom or Virtual. Standard and Custom MObjects represent distinct entities, such as Lead or Company, while Virtual Objects, such as LeadRecord, are composed of fields from one or more objects. Virtual Objects are convenience objects used within the API but do not exist within the Marketo application.

MObjects consist of:

- A small set of fixed attributes that are common to all MObjects
  - Required type
  - Optional externalKey
  - read-only id, createdAt, updatedAt
- A list of one or more object-specific attributes, as name/value pairs, some of which may be required. For example, name on Opportunity.
- A list of associated object references, as object-name plus
  - Marketo ID or
  - External-key as an attribute-name/attribute-value pair.

### External-Keys

External-keys are custom fields defined on Marketo objects, such as Lead or Opportunity. The name is the field name and value is the field value, generated in an external system. **Marketo does not enforce a unique constraint on these values.** It is the responsibility of the API user to ensure that the values are unique. Should a duplicate occur, Marketo uses the most recently added object. This is similar to the behavior for the Email Address standard field.

### Available APIs

| API | Can Operate On |
| --- | --- |
| describeMObject | ActivityRecord, LeadRecord, Opportunity, OpportunityPersonRole |
| getMObjects | Opportunity, OpportunityPersonRole, Program |
| syncMObjects | Opportunity, OpportunityPersonRole, Program |
| deleteMObjects | Opportunity, OpportunityPersonRole |
| listMObjects | ActivityRecord, LeadRecord, Opportunity, OpportunityPersonRole |
