---
title: Getting Started
description: "Get started with Marketo Engage APIs and data model including leads, activities, programs, tags, lists, REST guidance and SOAP deprecation notice."
---

# Getting Started

Marketo Engage is a marketing automation platform for managing personalized multichannel programs and campaigns for prospects and customers. You can extend the platform through its integration points.

This page introduces the core Marketo Engage entities and their relationships.

<InlineAlert slots="text" variant="info" />

As of July 31st, 2026,the SOAP API is deprecated and no longer available. Use the Marketo [REST API](./rest-api/rest-api.md) for all new development.

When either the Native SFDC or MS Dynamics CRM connection is enabled on a Marketo Engage instance, these objects are read-only:

- Company
- Opportunity
- Opportunity Role
- Sales Person

![Data Model](assets/data_model.png)

## Person (Leads)

People are the foundation of marketing automation. Marketo refers to all non-sales-person records as leads, regardless of whether sales considers them leads, prospects, suspects, or contacts.

The lead object includes standard fields such as email, first name, and last name. You can add fields to store other information, and you can read and write custom attributes in the same way as standard fields. Find the complete field list under **Admin** > **Field Management** in Marketo.

Marketo uniquely identifies leads by the id field. You must enforce other unique keys outside the system.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads), [JavaScript](javascript-api/lead-tracking.md#lead-tracking-api)

## Activities

Leads can interact with your organization in several ways, such as visiting a webpage, attending a trade show, or downloading a whitepaper. Marketo captures these actions as activities so that marketers can understand what a lead did and when it occurred.

Activities are always related to leads by leadId.

You can also define custom activities. After you create and publish a custom activity, you can add instances of it through the Marketo API. For more information, see [Understanding Custom Activities](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-activities/understanding-custom-activities).

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Activities), [JavaScript](javascript-api/lead-tracking.md#munchkin-behavior)

## Programs & Campaigns

A Program organizes a marketer's related marketing efforts in one location. For example, an email blast can be a Program.

A lead can take multiple actions or activities associated with a Program. This process is known as lead progression. For an email blast Program, progression can record when Marketo sends the email, when the person opens it, and whether the person clicks a link.

A Campaign serves a specific purpose and goal within a Program. For example, a Campaign can select a group of leads and send an email blast. Another Campaign can notify a sales representative when a lead clicks a link in the email blast.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Campaigns)

## Tags

Tags group and categorize Program data for reporting. Use tags to measure Program effectiveness and ROI.

As a Marketo Admin, you can create required and optional tag types that users select when they create a Program. You define the possible values for each tag type based on your company's reporting requirements.

For example, create a custom "Region" tag type with values such as Northeast and Southeast to analyze which region generates the most leads. Create an "Owner" tag type to compare which Program owners, such as Maria, David, or John, have the greatest impact on creating leads and opportunities. For more information, see [Understanding Tags](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/working-with-programs/understanding-tags).

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/asset)

## Lists

Lists organize collections of leads. Marketo provides two types:

- A static list is a fixed collection from which a marketer can add or remove leads.
- A smart list is a dynamic collection based on defined characteristics.

For example, a smart list named "All leads who have visited the pricing page on our website" continues to grow as more leads visit that page. For more information, see the [Marketo Engage documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home).

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/asset#tag/Static-Lists)

## Opportunities

An opportunity represents a potential sales deal that marketers deliver to sales. In Marketo, an opportunity is associated with a lead or contact and an organization.

An opportunity role connects a lead with an organization and describes the lead's function in that organization.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities)

## Companies

An organization, sometimes called an account in Marketo, is the organization to which a person belongs.

For accurate ROI attribution in Marketo ROI reporting or Revenue Cycle Analytics (RCA), associate people with their organizations and opportunities.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies)

## Assets

Assets include landing pages, emails, forms, and images used in a Program. An asset can be local to a specific Program or global. Global assets are available to every Program.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/asset)

## Tokens

Tokens let marketers personalize messages with assets and add logic to flow actions. Marketo provides tokens for the overall system, Programs, leads, and companies.

For example, place the lead token `{{lead.First Name}}` in an email to display the lead's first name.

Tokens defined at the Program or folder level are called "My Tokens" in Marketo. My Tokens have three types:

- Local: Created in a specific campaign folder or Program and available only in that folder or Program.
- Inherited: Created at the campaign folder level and available to all Programs in that folder.
- Overridden: Modified with a custom value at the Program level without changing the parent My Token value at the Program folder level.

My Tokens use the naming convention `{{my.My Token}}`, with the word "my" at the beginning of the token name. For example, a Date type My Token named EventDate has the token name `{{my.EventDate}}`. For more information, see [Understanding My Tokens in a Program](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/tokens/understanding-my-tokens-in-a-program).

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens)

## Custom Objects

A Marketo custom object creates a one-to-many or many-to-many (Edge-Bridge-Edge) relationship between Marketo Leads and custom object records.

After you create and publish a Marketo custom object, you can perform CRUD operations on it through the Marketo API. When new records are added, you can use a smart list trigger to respond. You can also use custom object data as a smart list filter for segmentation or in emails through [Email Scripting](email-scripting.md). For more information about creating custom objects, see the [Marketo Engage documentation](https://experienceleague.adobe.com/en/docs/marketo/using/home).

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Custom-Objects)

## Sales Persons

You can manage Sales Person records and their lead relationships in Marketo when no native CRM integration is enabled. These records contain information such as Name, Email, and Job Title. When a Sales Person owns a lead, you can use this information for filtering and tokens.

Manage the relationship to a sales person at the lead level through the "externalSalesPersonId" field. Update this field through the [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) API.

Related APIs: [REST](https://developer.adobe.com/marketo-apis/api/mapi#tag/Sales-Persons)
