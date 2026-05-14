---
title: Migrating to REST API
description: "Step-by-step guide to migrate Marketo Engage from SOAP to REST by Jan 31, 2026, with endpoint mappings, OAuth, lead sync methods, and reference architectures."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# Migrating to REST API

The Marketo Engage SOAP API will be retired after March 31, 2026. All existing integrations using the SOAP API should be retired or migrated to the [Marketo Engage REST API](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/rest-api) by this date in order to avoid interruptions in service.

## Migration

The SOAP API supports a limited range of use cases compared to the [REST AP](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/rest-api)I. When determining which endpoints to map your use cases, you should follow [Marketo Integration Best Practices](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/marketo-integration-best-practices)

[Reference Architectures](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/reference-architectures) are available for [CRM Synchronization](https://experienceleague.adobe.com/docs/marketo-developer/assets/sync-architecture-whitepaper.pdf?lang=en) and [Data Warehouse Export](https://experienceleague.adobe.com/docs/marketo-developer/assets/reference_architecture.pdf?lang=en) use cases.

## Authentication

[Authentication Documentation](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/authentication)

The Marketo REST API uses OAuth 2.0 based authentication with the Client Credentials grant type. Access tokens are valid for one hour after creation.

## Leads

[Lead API Documentation](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/leads)

The SOAP API supports lead data synchronization, [Munchkin cookie association](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/javascriptapi/leadtracking/lead-tracking), and lead merging. If your application calls the SOAP syncLead method and sets the `marketoCookie` parameter, you can migrate by either:

1. Using the [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) REST method, followed by [Associated Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/associateLeadUsingPOST)
2. You can call [Submit Form](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/leads), though this requires configuration of some Marketing Assets and some interaction with the [Forms API](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/forms)

Applications which use the `foreignSysPersonId` key type, should migrate to using a custom lead field to represent this external identifier, and use either [Sync Leads](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/leads#create-and-update) or [Bulk Lead Import](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-import/bulk-lead-import) REST Methods.

| SOAP Method | REST Method(s) |
| --- | --- |
| [getLead](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/getlead) | [Get Lead by ID](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET), [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) |
| [getMultipleLeads](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/getmultipleleads) | [Get Lead by ID](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET), [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET), [Get Leads by Program ID](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByProgramIdUsingGET), [Get Leads by List ID](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByListIdUsingGET), [Bulk Lead Export](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Leads) |
| [mergeLeads](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/mergeleads) | [Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) |
| [syncLead](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/synclead) | [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) [Submit Form](https://developer.adobe.com/marketo-apis/api/mapi#operation/SubmitFormUsingPOST) [Associate Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/associateLeadUsingPOST) |
| [syncMultipleLeads](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/syncmultipleleads) | [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) [Bulk Import](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads) |

## M Objects

M Objects was a catch-all concept to support export of Opportunity Attribution data for external analysis, and worked with three object types: Opportunities, Opportunity Roles, and Programs.

REST Documentation:

- [Opportunity](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/opportunities)
- [Roles](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/opportunity-roles)
- [Programs](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/programs)

| SOAP Method | REST Method(s) |
| --- | --- |
| [deleteMObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/marketo-objects/deletemobjects) | [Delete Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteOpportunitiesUsingPOST), [Delete Opportunity Roles](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteOpportunityRolesUsingPOST) |
| [describeMObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/marketo-objects/describemobject) | [Describe Opportunity](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_4), [Describe Opportunity Role](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeOpportunityRoleUsingGET) |
| [getMObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/marketo-objects/getmobjects) | [Get Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getOpportunitiesUsingGET), [Get Opportunity Roles](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeOpportunityRoleUsingGET) |
| [listMObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/marketo-objects/listmobjects) | N/A |
| [syncMObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/marketo-objects/syncmobjects) | [Sync Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncOpportunitiesUsingPOST), [Sync Opportunity Roles](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncOpportunityRolesUsingPOST) |
| [getChannels](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/programs/getchannels) | [Get Channels](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllChannelsUsingGET) |
| [getTags](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/programs/gettags) | [Get Tag Types](https://developer.adobe.com/marketo-apis/api/asset#operation/getTagTypesUsingGET), [Get Tag by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getTagByNameUsingGET) |

## Static Lists

Static List Use cases in the SOAP API are limited to ingestion of membership and lead data, and removal of membership which can be accomplished with the [Add to List](https://developer.adobe.com/marketo-apis/api/mapi#operation/addLeadsToListUsingPOST), [Bulk Import Leads](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-import/bulk-lead-import), or [Remove from List](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE) REST Methods.

| SOAP Method | REST Method(s) |
| --- | --- |
| [getImportToListStatus](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/static-lists/getimporttoliststatus) | [Bulk Import Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads) |
| [importToList](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/static-lists/importtolist) | [Add To List](https://developer.adobe.com/marketo-apis/api/mapi#operation/addLeadsToListUsingPOST) [Bulk Import Leads](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads) |
| [listOperation](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/static-lists/listoperation) | [Remove From List](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE) |

## Activities

The SOAP API only supports retrieval of activities.

REST Documentation:

- [Synchronous Activities](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/activities)
- [Bulk Activity Extract](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-extract/bulk-activity-extract)

| SOAP Method | REST Method(s) |
| --- | --- |
| [getLeadActivity](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/activities/getleadactivity) | [Bulk Export Activities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Activities) [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) |
| [getLeadChanges](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/activities/getleadchanges) | [Bulk Export Activities](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Export-Activities) [Get Lead Changes](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadChangesUsingGET) |

## Campaigns

REST Documentation:

- [Smart Campaigns](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/smart-campaigns)

The SOAP API only supports three use cases for smart campaigns: [Triggering Leads to Qualify for a Requestable Smart Campaign](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/smart-campaigns#trigger), retrieving those Requestable Campaigns, and [Scheduling a Future Run of a Smart Campaign](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/assets/smart-campaigns#schedule).

| SOAP Method | REST Method(s) |
| --- | --- |
| [getCampaignsForSource](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/campaigns/getcampaignsforsource) | [Get Smart Campaigns](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllSmartCampaignsGET) |
| [requestCampaign](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/campaigns/requestcampaign) | [Request Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/triggerCampaignUsingPOST) |
| [scheduleCampaign](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/campaigns/schedulecampaign) | [Schedule Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/scheduleCampaignUsingPOST) |

## Custom Objects

REST Documentation:

- [Custom Objects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/lead-database/custom-objects)

The SOAP API only supported CRUD operations for custom objects.

| SOAP Method | REST Method(s) |
| --- | --- |
| [deleteCustomObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/custom-objects/deletecustomobjects) | [Delete Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteCustomObjectsUsingPOST) |
| [getCustomObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/custom-objects/getcustomobjects) | [Get Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCustomObjectsUsingGET) |
| [syncCustomObjects](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/custom-objects/synccustomobjects) | [Sync Custom Objects](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncCustomObjectsUsingPOST) [Bulk Import Custom Object](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-import/bulk-custom-object-import) |
