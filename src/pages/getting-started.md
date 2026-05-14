---
title: Getting Started
description: "Get started with Marketo Engage APIs and data model including leads, activities, programs, tags, lists, REST guidance and SOAP deprecation notice."
---

# Getting Started

Marketo Engage is a marketing automation platform that enables marketers to manage personalized multi-channel programs and campaigns to prospects and customers. The Marketo Engage platform can be extended using integration points. Below you find the core entities and their relationships.

<InlineAlert slots="text" variant="info" />

The SOAP API is being deprecated and will no longer be available after July 31st 2026. All new development should be done with the Marketo [REST API](./rest-api/rest-api.md), and existing services should be migrated by that date to avoid interruptions in service. If you have a service which uses the SOAP API, please consult the SOAP API [Migration Guide](./soap-api/migration.md) for information on how to migrate.

When either the Native SFDC or MS Dynamics CRM connection is enabled on a Marketo Engage instance, the following objects are Read-Only: Company, Opportunity, Opportunity Role, Sales Person

![Data Model](assets/data_model.png)

## Person (Leads)

People are the foundation of any marketing automation platform. Within Marketo, all non-sales person records are referred to as leads, regardless of whether they are designated as leads, prospects, suspects, contacts, and so forth, from a sales perspective. The lead object comes with a set of standard fields, such as email, first name and last name. Additional fields can be added to the lead object type to extend the types of information associated with records in the system. Custom attributes can be read and written to just as the standard fields. A complete list of fields can be found within the Marketo **Admin** > **Field Management** menu. Leads are uniquely identified in Marketo by the id field. Other unique keys must be enforced externally from the system.

Related APIs: [REST](api/mapi.md#tag/Leads), [JavaScript](javascript-api/lead-tracking.md#lead-tracking-api)

## Activities

Leads interact with your organization in a few ways. A lead may visit a page on your company's website, attend a trade show or download a whitepaper. Each of these actions can be captured within Marketo to help a marketer better understand which activities a lead did and when so they can coordinate timely and relevant communications. Activities are always related back to leads by leadId.

You can define your own custom activities. Once you have created and published a custom activity, you can add custom activities via the Marketo API. More information on custom activities can be found in the [Activities](rest-api/activities.md) documentation.

Related APIs: [REST](api/mapi.md#tag/Activities), [JavaScript](javascript-api/lead-tracking.md#munchkin-behavior)

## Programs & Campaigns

A Program is the mechanism by which a marketer organizes all their different types of marketing efforts from one central location. An example of a program is an email blast. A lead can take multiple actions/activities related to a given program that become associated with the program. This is known as lead progression. An example progression of an email blast program would record when a lead is sent an email, when the person opened the email or whether they clicked through a link in the email.

Campaigns are created to serve a specific purpose and specific goal within a Program. An example of a campaign could be to narrow down a group of leads and send them the email blast, or to notify a sales rep for follow-up if a lead clicks through a link within the email blast program.

Related APIs: [REST](api/mapi.md#tag/Campaigns)

## Tags

Tags are a way of grouping data for reporting purposes. These identifiers provide the ability to categorize data and define how you want to report on your Program to understand Program effectiveness and ROI.

As a Marketo Admin, you have the ability to create required and optional tag types available for selection when a Marketo user creates a Program. Possible values for each of these tag types are defined by you and reflect how your company would like to use custom tags for reporting purposes.

For example, you may want to create a custom "Region" tag type with multiple tag values (for example, Northeast, Southeast) allowing you to analyze which region is generating the most leads. Or, for instance, you can create an "Owner" tag type, which allows you to assess and understand which Program owners (for example, Maria, David, or John) are having the greatest impact on creating leads and opportunities. More information about tags can be found in the [Tags](rest-api/tags.md) documentation.

Related APIs: [REST](api/asset.md)

## Lists

Lists allow a marketer to organize a collection of leads. There are two types of lists within Marketo, static and smart. A static list is a fixed list of leads that a marketer can add or remove as they choose. A smart list is a dynamic collection of leads based on a set of designated characteristics. An example of a smart list would be "All leads who have visited the pricing page on our website." This smart list continues to grow as more leads visit the pricing page. More information about lists can be found in the [Static Lists](rest-api/static-lists.md) documentation.

Related APIs: [REST](api/asset.md#tag/Static-Lists)

## Opportunities

Marketers deliver leads to sales in the form of an opportunity. An opportunity represents a potential sales deal and is associated with a lead or contact and an organization in Marketo. An opportunity role is the intersection between a given lead and an organization. The opportunity role pertains to a lead's function within the organization.

Related APIs: [REST](api/mapi.md#tag/Opportunities)

## Companies

An organization, sometimes referred to as an account in Marketo, refers to the organization that a person belongs to. When using ROI reporting in Marketo or Revenue Cycle Analytics (RCA), it is important to associate people with their organization and opportunities so the proper ROI attribution can be determined.

Related APIs: [REST](api/mapi.md#tag/Companies)

## Assets

Assets refer to landing pages, emails, forms, and images that are used within a program. Assets can be either local to a given program or global. Global assets are available across any program.

Related APIs: [REST](api/asset.md)

## Tokens

Tokens allow a marketer to personalize messages with assets and add logic within flow actions. There are tokens for the overall system, programs, leads, and companies. An example of a lead token is `{{lead.First Name}}`. This token can be placed within an email to display the lead's first name.

Tokens defined at the Program or folder level are referred to as "My Tokens" within Marketo. My Tokens can be one of three types, local, inherited, or overridden.

My Tokens that are created locally within a specific campaign folder or program are available to that specific program or campaign folder (local). My Tokens that are created at the campaign folder level are available for use across all programs contained within that campaign folder (inherited). My Tokens that are modified at the program level with custom values do not change the parent My Token value of the token at the program folder level (overridden).

My Tokens use the naming convention `{{my.My Token}}`, with the word "my" added to the beginning of the token name. For example, if you create a Date type My Token with the name EventDate, the name of the token is `{{my.EventDate}}`. More information about My Tokens can be found in the [Tokens](rest-api/tokens.md) documentation.

Related APIs: [REST](api/asset.md#tag/Tokens)

## Custom Objects

A Marketo custom object allows for the creation of a one-to-many, or many-to-many (Edge-Bridge-Edge) relationship between your Marketo Leads and the custom object records. Once you have created and published a Marketo custom object, you can perform CRUD operations on the custom object via the Marketo API. More information about custom object creation can be found in the [Custom Objects](rest-api/custom-objects.md) documentation. When new records are added to the custom object, you can use a smart list trigger to respond. You can also use custom object data as a filter in smart lists (segmentation), or in emails using [Email Scripting](email-scripting.md).

Related APIs: [REST](api/mapi.md#tag/Custom-Objects)

## Sales Persons

Sales Person records and lead relationships can be managed in Marketo when there is no native CRM integration enabled. These records contain basic information about the Sales Person, such as Name, Email, and Job Title, which can be used for filtering and tokens in Marketo when a lead is owned by one. The relationship to a sales person is managed at the lead level through the "externalSalesPersonId" field, which must be updated through the [Sync Leads](api/mapi.md#tag/Leads/operation/syncLeadUsingPOST) API.

Related APIs: [REST](api/mapi.md#tag/Sales-Persons)

