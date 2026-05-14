---
title: Endpoint Reference
description: "Comprehensive Marketo REST API endpoint list with methods, URIs, and required permissions across activities, bulk export, identity, leads, assets, users."
---

# Endpoint Reference

Below are links to the Marketo REST API references.

- [Asset](https://developer.adobe.com/marketo-apis/api/asset)
- [Identity](https://developer.adobe.com/marketo-apis/api/identity/)
- [Lead Database](https://developer.adobe.com/marketo-apis/api/mapi)
- [User Management](https://developer.adobe.com/marketo-apis/api/user/)

## Endpoint List {#endpoint_list}

Here is a comprehensive list of REST API endpoints.

| Name | Group | Method | URI | Required Permission |
| --- | --- | --- | --- | --- |
| Add Custom Activities | Activities | POST | /rest/v1/activities/external.json | Read-Write Activity |
| Approve Custom Activity Type | Activities | POST | /rest/v1/activities/external/type/{apiName}/approve.json | Read-Write Activity Metadata |
| Create Custom Activity Type Attributes | Activities | POST | /rest/v1/activities/external/type/{apiName}/attributes/create.json | Read-Write Activity Metadata |
| Create Custom Activity Types | Activities | POST | /rest/v1/activities/external/type.json | Read-Write Activity Metadata |
| Delete Custom Activity Type | Activities | POST | /rest/v1/activities/external/type/{apiName}/delete.json | Read-Write Activity Metadata |
| Delete Custom Activity Type Attributes | Activities | POST | /rest/v1/activities/external/type/{apiName}/attributes/delete.json | Read-Write Activity Metadata |
| Describe Custom Activity Type | Activities | GET | /rest/v1/activities/external/type/{apiName}/describe.json | Read-Only Activity Metadata |
| Discard Custom Activity Type Draft | Activities | POST | /rest/v1/activities/external/type/{apiName}/discardDraft.json | Read-Write Activity Metadata |
| Get Activity Types | Activities | GET | /rest/v1/activities/types.json | Read-Only Activity |
| Get Custom Activity Types | Activities | GET | /rest/v1/activities/external/types.json | Read-Only Activity Metadata |
| Get Deleted Leads | Activities | GET | /rest/v1/activities/deletedleads.json | Read-Only Activity |
| Get Lead Activities | Activities | GET | /rest/v1/activities.json | Read-Only Activity |
| Get Lead Changes | Activities | GET | /rest/v1/activities/leadchanges.json | Read-Only Activity |
| Get Paging Token | Activities | GET | /rest/v1/activities/pagingtoken.json | Read-Only Activity |
| Update Custom Activity Type | Activities | POST | /rest/v1/activities/external/type/{apiName}.json | Read-Write Activity Metadata |
| Update Custom Activity Type Attributes | Activities | POST | /rest/v1/activities/external/type/{apiName}/attributes/update.json | Read-Write Activity Metadata |
| Identity | Authentication | GET or POST | /identity/oauth/token | None |
| Cancel Export Activity Job | Bulk Export Activities | POST | /bulk/v1/activities/export/{exportid}/cancel.json | Read-Only Activity |
| Create Export Activity Job | Bulk Export Activities | POST | /bulk/v1/activities/export/create.json | Read-Only Activity |
| Enqueue Export Activity Job | Bulk Export Activities | POST | /bulk/v1/activities/export/{exportid}/enqueue.json | Read-Only Activity |
| Get Export Activity File | Bulk Export Activities | GET | /bulk/v1/activities/export/{exportid}/file.json | Read-Only Activity |
| Get Export Activity Job Status | Bulk Export Activities | GET | /bulk/v1/activities/export/{exportid}/status.json | Read-Only Activity |
| Get Export Activity Jobs | Bulk Export Activities | GET | /bulk/v1/activities/export.json | Read-Only Activity |
| Cancel Export Custom Object Job | Bulk Export Custom Objects | POST | /bulk/v1/customobjects/export/{exportid}/cancel.json | Read-Only Custom Object |
| Create Export Custom Object Job | Bulk Export Custom Objects | POST | /bulk/v1/customobjects/export/create.json | Read-Only Custom Object |
| Enqueue Export Custom Object Job | Bulk Export Custom Objects | POST | /bulk/v1/customobjects/export/{exportid}/enqueue.json | Read-Only Custom Object |
| Get Export Custom Object File | Bulk Export Custom Objects | GET | /bulk/v1/customobjects/export/{exportid}/file.json | Read-Only Custom Object |
| Get Export Custom Object Job Status | Bulk Export Custom Objects | GET | /bulk/v1/customobjects/export/{exportid}/status.json | Read-Only Custom Object |
| Get Export Custom Object Jobs | Bulk Export Custom Objects | GET | /bulk/v1/customobjects/export.json | Read-Only Custom Object |
| Cancel Export Lead Job | Bulk Export Leads | POST | /bulk/v1/leads/export/{exportid}/cancel.json | Read-Only Lead |
| Create Export Lead Job | Bulk Export Leads | POST | /bulk/v1/leads/export/create.json | Read-Only Lead |
| Enqueue Export Lead Job | Bulk Export Leads | POST | /bulk/v1/leads/export/{exportid}/enqueue.json | Read-Only Lead |
| Get Export Lead File | Bulk Export Leads | GET | /bulk/v1/leads/export/{exportid}/file.json | Read-Only Lead |
| Get Export Lead Job Status | Bulk Export Leads | GET | /bulk/v1/leads/export/{exportid}/status.json | Read-Only Lead |
| Get Export Lead Jobs | Bulk Export Leads | GET | /bulk/v1/leads/export.json | Read-Only Lead |
| Cancel Export Program Member Job | Bulk Export Program Members | POST | /bulk/v1/program/members/export/{exportid}/cancel.json | Read-Only Lead |
| Create Export Program Member Job | Bulk Export Program Members | POST | /bulk/v1/program/members/export/create.json | Read-Only Lead |
| Enqueue Export Program Member Job | Bulk Export Program Members | POST | /bulk/v1/program/members/export/{exportid}/enqueue.json | Read-Only Lead |
| Get Export Program Member File | Bulk Export Program Members | GET | /bulk/v1/program/members/export/{exportid}/file.json | Read-Only Lead |
| Get Export Program Member Job Status | Bulk Export Program Members | GET | /bulk/v1/program/members/export/{exportid}/status.json | Read-Only Lead |
| Get Export Program Member Jobs | Bulk Export Program Members | GET | /bulk/v1/program/members/export.json | Read-Only Lead |
| Get Import Custom Object Failures | Bulk Import Custom Objects | GET | /bulk/v1/customobjects/import/{id}/failures.json | Read-Write Custom Object |
| Get Import Custom Object Status | Bulk Import Custom Objects | GET | /bulk/v1/customobjects/import/{id}/status.json | Read-Write Custom Object |
| Get Import Custom Object Warnings | Bulk Import Custom Objects | GET | /bulk/v1/customobjects/import/{id}/warnings.json | Read-Write Custom Object |
| Import Custom Objects | Bulk Import Custom Objects | POST | /bulk/v1/customobjects/{apiName}/import.json | Read-Write Custom Object |
| Get Import Lead Failures | Bulk Import Leads | GET | /bulk/v1/leads/batch/{id}/failures.json | Read-Write Lead |
| Get Import Lead Status | Bulk Import Leads | GET | /bulk/v1/leads/batch/{id}.json | Read-Write Lead |
| Get Import Lead Warnings | Bulk Import Leads | GET | /bulk/v1/leads/batch/{id}/warnings.json | Read-Write Lead |
| Import Leads | Bulk Import Leads | POST | /bulk/v1/leads.json | Read-Write Lead |
| Get Import Program Member Failures | Bulk Import Program Members | GET | /bulk/v1/program/members/import/{id}/failures.json | Read-Write Lead |
| Get Import Program Member Status | Bulk Import Program Members | GET | /bulk/v1/program/members/import/{id}/status.json | Read-Write Lead |
| Get Import Program Member Warnings | Bulk Import Program Members | GET | /bulk/v1/program/members/import/{id}/warnings.json | Read-Write Lead |
| Import Program Members | Bulk Import Program Members | POST | /bulk/v1/program/{programId}/members/import.json | Read-Write Lead |
| Get Campaign by ID | Campaigns | GET | /rest/v1/campaigns/{id}.json | Read-Only Campaigns |
| Get Campaigns | Campaigns | GET | /rest/v1/campaigns.json | Read-Only Campaigns |
| Request Campaign | Campaigns | POST | /rest/v1/campaigns/{id}/trigger.json | Read-Write Campaigns |
| Schedule Campaign | Campaigns | POST | /rest/v1/campaigns/{id}/schedule.json | Read-Write Campaigns |
| Get Channel by Name | Channels | GET | /rest/asset/v1/channel/byName.json | Read-Only Asset |
| Get Channels | Channels | GET | /rest/asset/v1/channels.json | Read-Only Asset |
| Delete Companies | Companies | POST | /rest/v1/companies/delete.json | Read-Write Company |
| Describe Companies | Companies | GET | /rest/v1/companies/describe.json | Read-Only Company |
| Get Companies | Companies | GET | /rest/v1/companies.json | Read-Only Company |
| Sync Companies | Companies | POST | /rest/v1/companies.json | Read-Write Company |
| Get Company Field by Name | Companies | GET | /rest/v1/companies/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Get Company Fields | Companies | GET | /rest/v1/companies/schema/fields.json | Read-Write Schema Custom Field |
| Add Custom Object Type Fields | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/addField.json | Read-Write Custom Object Type |
| Approve Custom Object Type | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/approve.json | Read-Write Custom Object Type |
| Delete Custom Objects | Custom Objects | POST | /rest/v1/customobjects/{name}/delete.json | Read-Write Custom Object |
| Delete Custom Object Type | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/delete.json | Read-Write Custom Object Type |
| Delete Custom Object Type Fields | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/deleteField.json | Read-Write Custom Object Type |
| Describe Custom Objects | Custom Objects | GET | /rest/v1/customobjects/{name}/describe.json | Read-Only Custom Object |
| Describe Custom Object Type | Custom Objects | GET | /rest/v1/customobjects/schema/{apiName}/describe.json | Read-Only Custom Object Type |
| Discard Custom Object Type Draft | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/discardDraft.json | Read-Write Custom Object Type |
| Get Custom Objects | Custom Objects | GET | /rest/v1/customobjects/{name}.json | Read-Only Custom Object |
| Get Custom Object Linkable Objects | Custom Objects | GET | /rest/v1/customobjects/schema/linkableObjects.json | Read-Only Custom Object Type |
| Get Custom Object Dependent Assets | Custom Objects | GET | /rest/v1/customobjects/schema/{apiName}/dependentAssets.json | Read-Only Custom Object Type |
| Get Custom Object Type Field Data Types | Custom Objects | GET | /rest/v1/customobjects/schema/fieldDataTypes.json | Read-Only Custom Object Type |
| List of Custom Objects | Custom Objects | GET | /rest/v1/customobjects.json | Read-Only Custom Object |
| List of Custom Object Types | Custom Objects | GET | /rest/v1/customobjects/schema.json | Read-Only Custom Object Type |
| Sync Custom Objects | Custom Objects | POST | /rest/v1/customobjects/{name}.json | Read-Write Custom Object |
| Sync Custom Object Type | Custom Objects | POST | /rest/v1/customobjects/schema.json | Read-Write Custom Object Type |
| Update Custom Object Type Field | Custom Objects | POST | /rest/v1/customobjects/schema/{apiName}/updateField.json | Read-Write Custom Object Type |
| Approve Email Template Draft | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/approveDraft.json | Read-Write Asset |
| Clone Email Template | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/clone.json | Read-Write Asset |
| Create Email Template | Email Templates | POST | /rest/asset/v1/emailTemplates.json | Read-Write Asset |
| Delete Email Template | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/delete.json | Read-Write Asset |
| Discard Email Template Draft | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/discardDraft.json | Read-Write Asset |
| Get Email Template by ID | Email Templates | GET | /rest/asset/v1/emailTemplate/{id}.json | Read-Only Asset |
| Get Email Template by Name | Email Templates | GET | /rest/asset/v1/emailTemplate/byName.json | Read-Only Asset |
| Get Email Template Content by ID | Email Templates | GET | /rest/asset/v1/emailTemplate/{id}/content.json | Read-Only Asset |
| Get Email Template Used By | Email Templates | GET | /rest/asset/v1/emailTemplates/{id}/usedBy.json | Read-Only Asset |
| Get Email Templates | Email Templates | GET | /rest/asset/v1/emailTemplates.json | Read-Only Asset |
| Unapprove Email Template Draft | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/unapprove.json | Read-Write Asset |
| Update Email Template Content | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}/content.json | Read-Write Asset |
| Update Email Template Metadata | Email Templates | POST | /rest/asset/v1/emailTemplate/{id}.json | Read-Write Asset |
| Add Email Module | Emails | POST | /rest/asset/v1/email/{id}/content/{moduleId}/add.json | Read-Write Asset |
| Approve Email Draft | Emails | POST | /rest/asset/v1/email/{id}/approveDraft.json | Read-Write Asset |
| Clone Email | Emails | POST | /rest/asset/v1/email/{id}/clone.json | Read-Write Asset |
| Create Email | Emails | POST | /rest/asset/v1/emails.json | Read-Write Asset |
| Delete Email | Emails | POST | /rest/asset/v1/email/{id}/delete.json | Read-Write Asset |
| Delete Module | Emails | POST | /rest/asset/v1/email/{id}/content/{moduleId}/delete.json | Read-Write Asset |
| Discard Email Draft | Emails | POST | /rest/asset/v1/email/{id}/discardDraft.json | Read-Write Asset |
| Duplicate Email Module | Emails | POST | /rest/asset/v1/email/{id}/content/{moduleId}/duplicate.json | Read-Write Asset |
| Get Email by ID | Emails | GET | /rest/asset/v1/email/{id}.json | Read-Only Asset |
| Get Email by Name | Emails | GET | /rest/asset/v1/email/byName.json | Read-Only Asset |
| Get Email Content | Emails | GET | /rest/asset/v1/email/{id}/content.json | Read-Only Asset |
| Get Email Dynamic Content | Emails | GET | /rest/asset/v1/email/{id}/dynamicContent/{dynamicContentId}.json | Read-Only Asset |
| Get Email Full Content | Emails | GET | /rest/asset/v1/email/{id}/fullContent.json | Read-Only Asset |
| Get Email Variables | Emails | GET | /rest/asset/v1/email/{id}/variables.json | Read-Only Asset |
| Get Email CC Fields | Emails | GET | /rest/asset/v1/email/ccFields.json | Read-Only Asset |
| Get Emails | Emails | GET | /rest/asset/v1/emails.json | Read-Only Asset |
| Rearrange Email Modules | Emails | POST | /rest/asset/v1/email/{id}/content/rearrange.json | Read-Write Asset |
| Rename Email Module | Emails | POST | /rest/asset/v1/email/{id}/content/{moduleId}/rename.json | Read-Write Asset |
| Send Sample Email | Emails | POST | /rest/asset/v1/email/{id}/sendSample.json | Read-Write Asset |
| Unapprove Email | Emails | POST | /rest/asset/v1/email/{id}/unapprove.json | Read-Write Asset |
| Update Email Content | Emails | POST | /rest/asset/v1/email/{id}/content.json | Read-Write Asset |
| Update Email Content Section | Emails | POST | /rest/asset/v1/email/{id}/content/{htmlId}.json | Read-Write Asset |
| Update Email Dynamic Content Section | Emails | POST | /rest/asset/v1/email/{id}/dynamicContent/{dynamicContentId}.json | Read-Write Asset |
| Update Email Full Content | Emails | POST | /rest/asset/v1/emails/{id}/fullContent.json | Read-Write Asset |
| Update Email Metadata | Emails | POST | /rest/asset/v1/email/{id}.json | Read-Write Asset |
| Update Email Variable | Emails | POST | /rest/asset/v1/email/{id}/variable/{name}.json | Read-Write Asset |
| Create File | Files | POST | /rest/asset/v1/files.json | Read-Write Asset |
| Get File by ID | Files | GET | /rest/asset/v1/file/{id}.json | Read-Only Asset |
| Get File by Name | Files | GET | /rest/asset/v1/file/byName.json | Read-Only Asset |
| Get Files | Files | GET | /rest/asset/v1/files.json | Read-Only Asset |
| Update File Content | Files | POST | /rest/asset/v1/file/{id}/content.json | Read-Write Asset |
| Create Folder | Folders | POST | /rest/asset/v1/folders.json | Read-Write Asset |
| Delete Folder | Folders | POST | /rest/asset/v1/folder/{id}/delete.json | Read-Write Asset |
| Get Folder by ID | Folders | GET | /rest/asset/v1/folder/{id}.json | Read-Only Asset |
| Get Folder by Name | Folders | GET | /rest/asset/v1/folder/byName.json | Read-Only Asset |
| Get Folder Contents | Folders | GET | /rest/asset/v1/folder/{id}/content.json | Read-Only Asset |
| Get Folders | Folders | GET | /rest/asset/v1/folders.json | Read-Only Asset |
| Update Folder Metadata | Folders | POST | /rest/asset/v1/folder/{id}.json | Read-Write Asset |
| Add Field to Form | Form Fields | POST | /rest/asset/v1/form/{id}/fields.json | Read-Write Asset |
| Add Fieldset to Form | Form Fields | POST | /rest/asset/v1/form/{id}/fieldSet.json | Read-Write Asset |
| Add Form Field Visibility Rules | Form Fields | POST | /rest/asset/v1/form/{formId}/field/{fieldId}/visibility.json | Read-Write Asset |
| Add Rich Text Field | Form Fields | POST | /rest/asset/v1/form/{id}/richText.json | Read-Write Asset |
| Delete Field from Fieldset | Form Fields | POST | /rest/asset/v1/form/{id}/fieldSet/{fieldSetId}/field/{fieldId}/delete.json | Read-Write Asset |
| Delete Form Field | Form Fields | POST | /rest/asset/v1/form/{id}/field/{fieldId}/delete.json | Read-Write Asset |
| Get Available Form Fields | Form Fields | GET | /rest/asset/v1/form/fields.json | Read-Only Asset |
| Get Available Form Program Member Fields | Form Fields | GET | /rest/asset/v1/form/programMemberFields.json | Read-Only Asset |
| Get Fields for Form | Form Fields | GET | /rest/asset/v1/form/{id}/fields.json | Read-Only Asset |
| Update Field Positions | Form Fields | POST | /rest/asset/v1/form/{id}/reArrange.json | Read-Write Asset |
| Update Form Field | Form Fields | POST | /rest/asset/v1/form/{id}/field/{fieldId}.json | Read-Write Asset |
| Approve Form Draft | Forms | POST | /rest/asset/v1/form/{id}/approveDraft.json | Read-Write Asset |
| Clone Form | Forms | POST | /rest/asset/v1/form/{id}/clone.json | Read-Write Asset |
| Create Form | Forms | POST | /rest/asset/v1/forms.json | Read-Write Asset |
| Get Form Used By | Forms | GET | /rest/asset/v1/form/{id}/usedBy.json | Read-Write Asset |
| Delete Form | Forms | POST | /rest/asset/v1/form/{id}/delete.json | Read-Write Asset |
| Discard Form Draft | Forms | POST | /rest/asset/v1/form/{id}/discardDraft.json | Read-Write Asset |
| Get Form by ID | Forms | GET | /rest/asset/v1/form/{id}.json | Read-Only Asset |
| Get Form by Name | Forms | GET | /rest/asset/v1/form/byName.json | Read-Only Asset |
| Get Forms | Forms | GET | /rest/asset/v1/forms.json | Read-Only Asset |
| Get Thank You Page by Form ID | Forms | GET | /rest/asset/v1/form/{id}/thankYouPage.json | Read-Only Asset |
| Update Form Metadata | Forms | POST | /rest/asset/v1/form/{id}.json | Read-Write Asset |
| Update Submit Button | Forms | POST | /rest/asset/v1/{id}/submitButton.json | Read-Write Asset |
| Update Thank You Page | Forms | POST | /rest/asset/v1/form/{id}/thankYouPage.json | Read-Write Asset |
| Add Landing Page Content Section | Landing Page Content | POST | /rest/asset/v1/landingPage/{id}/content.json | Read-Write Asset |
| Delete Landing Page Content Section | Landing Page Content | POST | /rest/asset/v1/landingPage/{id}/content/{contentId}/delete.json | Read-Write Asset |
| Get Landing Page Content | Landing Page Content | GET | /rest/asset/v1/landingPage/{id}/content.json | Read-Only Asset |
| Get Landing Page Dynamic Content | Landing Page Content | GET | /rest/asset/v1/landingPage/{id}/dynamicContent/{dynamicContentId}.json | Read-Only Asset |
| Update Landing Page Content Section | Landing Page Content | POST | /rest/asset/v1/landingPage/{id}/content/{contentId}.json | Read-Write Asset |
| Update Landing Page Dynamic Content Section | Landing Page Content | POST | /rest/asset/v1/landingPage/{id}/dynamicContent/{dynamicContentId}.json | Read-Write Asset |
| Approve Landing Page Template Draft | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/approveDraft.json | Read-Write Asset |
| Clone Landing Page Template | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/clone.json | Read-Write Asset |
| Create Landing Page Template | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate.json | Read-Write Asset |
| Delete Landing Page Template | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/delete.json | Read-Write Asset |
| Discard Landing Page Template Draft | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/discardDraft.json | Read-Write Asset |
| Get Landing Page Template by ID | Landing Page Templates | GET | /rest/asset/v1/landingPageTemplate/{id}.json | Read-Only Asset |
| Get Landing Page Template by Name | Landing Page Templates | GET | /rest/asset/v1/landingPageTemplates/byName.json | Read-Only Asset |
| Get Landing Page Template Content | Landing Page Templates | GET | /rest/asset/v1/landingPageTemplate/{id}/content.json | Read-Only Asset |
| Get Landing Page Templates | Landing Page Templates | GET | /rest/asset/v1/landingPageTemplates.json | Read-Only Asset |
| Unapprove Landing Page Template | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/unapprove.json | Read-Write Asset |
| Update Landing Page Template Content | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}/content.json | Read-Write Asset |
| Update Landing Page Template Metadata | Landing Page Templates | POST | /rest/asset/v1/landingPageTemplate/{id}.json | Read-Write Asset |
| Approve Landing Page Draft | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/approveDraft.json | Read-Write Asset |
| Clone Landing Page | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/clone.json | Read-Write Asset |
| Create Landing Pages | Landing Pages | POST | /rest/asset/v1/landingPages.json | Read-Write Asset |
| Delete Landing Page | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/delete.json | Read-Write Asset |
| Discard Landing Page Draft | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/discardDraft.json | Read-Write Asset |
| Get Landing Page by ID | Landing Pages | GET | /rest/asset/v1/landingPage/{id}.json | Read-Only Asset |
| Get Landing Page by Name | Landing Pages | GET | /rest/asset/v1/landingPage/byName.json | Read-Only Asset |
| Get Landing Page Variables | Landing Pages | GET | /rest/asset/v1/landingPage/{id}/variables.json | Read-Only Asset |
| Get Landing Pages | Landing Pages | GET | /rest/asset/v1/landingPages.json | Read-Only Asset |
| Preview Landing Page | Landing Pages | GET | /rest/asset/v1/landingPage/{id}/preview.json | Read-Only Asset |
| Unapprove Landing Page | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/unapprove.json | Read-Write Asset |
| Update Landing Page Metadata | Landing Pages | POST | /rest/asset/v1/{id}.json | Read-Write Asset |
| Update Landing Page Variables | Landing Pages | POST | /rest/asset/v1/landingPage/{id}/variable/{variableId}.json | Read-Write Asset |
| Create Landing Page Redirect Rules | Landing Pages | POST | /rest/asset/v1/redirectRules.json | Read-Write Redirect Rules |
| Delete Landing Page Redirect Rule | Landing Pages | POST | /rest/asset/v1/redirectRule/{id}/delete.json | Read-Write Redirect Rules |
| Get Landing Page Redirect Rules | Landing Pages | GET | /rest/asset/v1/redirectRules.json | Read-Only Redirect Rules |
| Get Landing Page Redirect Rule by ID | Landing Pages | GET | /rest/asset/v1/redirectRule/{id}.json | Read-Only Redirect Rules |
| Update Landing Page Redirect Rule | Landing Pages | POST | /rest/asset/v1/redirectRule/{id}.json | Read-Write Redirect Rules |
| Get Landing Page Domains | Landing Pages | GET | /rest/asset/v1/landingPageDomains.json | Read-Only Redirect Rules |
| Associate Lead | Leads | POST | /rest/v1/leads/{id}/associate.json | Read-Write Lead |
| Change Lead Program Status | Leads | POST | /rest/v1/leads/programs/{programId}/status.json | Read-Write Lead |
| Delete Leads | Leads | POST | /rest/v1/leads.json | Read-Write Lead |
| Describe Lead | Leads | GET | /rest/v1/leads/describe.json | Read-Only Lead |
| Describe Lead2 | Leads | GET | /rest/v1/leads/describe2.json | Read-Only Lead |
| Describe Program Member | Leads | GET | /rest/v1/program/members/describe.json | Read-Only Lead |
| Get Lead by ID | Leads | GET | /rest/v1/lead/{id}.json | Read-Only Lead |
| Get Lead Partitions | Leads | GET | /rest/v1/leads/partitions.json | Read-Only Lead |
| Get Leads by Filter Type | Leads | GET | /rest/v1/leads.json | Read-Only Lead |
| Get Leads by Program ID | Leads | GET | /rest/v1/leads/programs/{programId}.json | Read-Only Lead |
| Merge Leads | Leads | POST | /rest/v1/leads/{id}/merge.json | Read-Write Lead |
| Get Lists by Lead ID | Leads | GET | /rest/v1/leads/{leadId}.json | Read-Only Asset |
| Get Programs by Lead ID | Leads | GET | /rest/v1/leads/{leadId}programMembership.json | Read-Only Asset |
| Get Smart Campaigns by Lead ID | Leads | GET | /rest/v1/leads/{leadId}/smartCampaignMembership.json | Read-Only Asset |
| Push Lead to Marketo | Leads | POST | /rest/v1/leads/partitions.json | Read-Write Lead |
| Submit Form | Leads | POST | /rest/v1/leads/submitForm.json | Read-Write Lead |
| Sync Leads | Leads | POST | /rest/v1/leads.json | Read-Write Lead |
| Update Lead Partition | Leads | POST | /rest/v1/leads/partitions.json | Read-Write Lead |
| Get Lead Field by Name | Leads | GET | /rest/v1/leads/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Get Lead Fields | Leads | GET | /rest/v1/leads/schema/fields.json | Read-Write Schema Custom Field |
| Create Lead Fields | Leads | POST | /rest/v1/leads/schema/fields.json | Read-Write Schema Custom Field |
| Update Lead Field | Leads | POST | /rest/v1/leads/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Add Named Account List Members | Named Account Lists | POST | /rest/v1/namedaccountlist/{id}/namedaccounts.json | Read-Write Named Account |
| Delete Named Account Lists | Named Account Lists | POST | /rest/v1/namedaccountlists/delete.json | Read-Write Named Account List |
| Get Named Account List Members | Named Account Lists | GET | /rest/v1/namedaccountlist/{id}/namedaccounts.json | Read-Only Named Account |
| Get Named Account Lists | Named Account Lists | GET | /rest/v1/namedaccountlists.json | Read-Only Named Account List |
| Remove Named Account List Members | Named Account Lists | POST | /rest/v1/namedaccountlist/{id}/namedaccounts/remove.json | Read-Write Named Account |
| Sync Named Account Lists | Named Account Lists | POST | /rest/v1/namedaccountlists.json | Read-Write Named Account List |
| Delete Named Accounts | Named Accounts | POST | /rest/v1/namedaccounts/delete.json | Read-Write Named Account |
| Describe Named Accounts | Named Accounts | GET | /rest/v1/namedaccounts/describe.json | Read-Only Named Account |
| Get Named Accounts | Named Accounts | GET | /rest/v1/namedaccounts.json | Read-Only Named Account |
| Sync Named Accounts | Named Accounts | POST | /rest/v1/namedaccounts.json | Read-Write Named Account |
| Get Named Account Field by Name | Named Accounts | GET | /rest/v1/namedaccounts/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Get Named Account Fields | Named Accounts | GET | /rest/v1/namedaccounts/schema/fields.json | Read-Write Schema Custom Field |
| Delete Opportunities | Opportunities | POST | /rest/v1/opportunities/delete.json | Read-Write Opportunity |
| Delete Opportunity Roles | Opportunities | POST | /rest/v1/opportunities/roles/delete.json | Read-Write Opportunity |
| Describe Opportunity | Opportunities | GET | /rest/v1/opportunities/describe.json | Read-Only Opportunity |
| Describe Opportunity Role | Opportunities | GET | /rest/v1/opportunities/roles/describe.json | Read-Only Opportunity |
| Get Opportunities | Opportunities | GET | /rest/v1/opportunities.json | Read-Only Opportunity |
| Get Opportunity Roles | Opportunities | GET | /rest/v1/opportunities/roles.json | Read-Only Opportunity |
| Sync Opportunities | Opportunities | POST | /rest/v1/opportunities.json | Read-Write Opportunity |
| Sync Opportunity Roles | Opportunities | POST | /rest/v1/opportunities/roles.json | Read-Write Opportunity |
| Get Opportunity Field by Name | Opportunities | GET | /rest/v1/opportunities/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Get Opportunity Fields | Opportunities | GET | /rest/v1/opportunities/schema/fields.json | Read-Write Schema Custom Field |
| Delete Program Members | Program Members | POST | /rest/v1/programs/{programId}/members/delete.json | Read-Write Lead |
| Describe Program Member | Program Members | GET | /rest/v1/programs/members/describe.json | Read-Only Lead |
| Get Program Members | Program Members | GET | /rest/v1/programs/{programId}/members.json | Read-Only Lead |
| Sync Program Member Data | Program Members | POST | /rest/v1/programs/{programId}/members.json | Read-Write Lead |
| Sync Program Member Status | Program Members | POST | /rest/v1/programs/{programId}/members/status.json | Read-Write Lead |
| Get Program Member Field by Name | Program Members | GET | /rest/v1/programs/members/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Get Program Member Fields | Program Members | GET | /rest/v1/programs/members/schema/fields.json | Read-Write Schema Custom Field |
| Create Program Member Fields | Program Members | POST | /rest/v1/programs/members/schema/fields.json | Read-Write Schema Custom Field |
| Update Program Member Field | Program Members | POST | /rest/v1/programs/members/schema/fields/{fieldApiName}.json | Read-Write Schema Custom Field |
| Approve Program | Programs | POST | /rest/asset/v1/program/{id}/approve.json | Read-Write Asset |
| Clone Program | Programs | POST | /rest/asset/v1/program/{id}/clone.json | Read-Write Asset |
| Create Programs | Programs | POST | /rest/asset/v1/programs.json | Read-Write Asset |
| Delete Program | Programs | POST | /rest/asset/v1/program/{id}/delete.json | Read-Write Asset |
| Get Program by ID | Programs | GET | /rest/asset/v1/program/{id}.json | Read-Only Asset |
| Get Program by Name | Programs | GET | /rest/asset/v1/program/byName.json | Read-Only Asset |
| Get Programs | Programs | GET | /rest/asset/v1/programs.json | Read-Only Asset |
| Get Programs by Tag | Programs | GET | /rest/asset/v1/program/byTag.json | Read-Only Asset |
| Get Smart List by Program ID | Programs | GET | /rest/asset/v1/program/{id}/smartList.json | Read-Only Asset |
| Unapprove Program | Programs | POST | /rest/asset/v1/program/{id}/unapprove.json | Read-Write Asset |
| Update Program Metadata | Programs | POST | /rest/asset/v1/program/{id}.json | Read-Write Asset |
| Update Program Tag | Programs | POST | /rest/asset/v1/program/{id}/tag/{tagType}.json | Read-Write Asset |
| Delete Program Tag | Programs | POST | /rest/asset/v1/program/{id}/tag/{tagType}/delete.json | Read-Write Asset |
| Delete SalesPersons | Sales Persons | POST | /rest/v1/salespersons/delete.json | Read-Write Sales Person |
| Describe SalesPersons | Sales Persons | GET | /rest/v1/salespersons/describe.json | Read-Only Sales Person |
| Get SalesPersons | Sales Persons | GET | /rest/v1/salespersons.json | Read-Only Sales Person |
| Sync SalesPersons | Sales Persons | POST | /rest/v1/salespersons.json | Read-Write Sales Person |
| Get Segmentations | Segments | GET | /rest/asset/v1/segmentation.json | Read-Only Asset |
| Get Segments For Segmentations | Segments | GET | /rest/asset/v1/segmentation/{id}/segments.json | Read-Only Asset |
| Activate Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaign/{id}/activate.json | Activate Campaign |
| Clone Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaign/{id}/clone.json | Read-Write Asset |
| Create Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaigns.json | Read-Write Asset |
| Deactivate Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaign/{id}/deactivate.json | Deactivate Campaign |
| Delete Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaign/{id}/delete.json | Read-Write Asset |
| Get Smart Campaigns | Smart Campaigns | GET | /rest/asset/v1/smartCampaigns.json | Read-Only Asset |
| Get Smart Campaign by ID | Smart Campaigns | GET | /rest/asset/v1/smartCampaign/{id}.json | Read-Only Asset |
| Get Smart Campaign by Name | Smart Campaigns | GET | /rest/asset/v1/smartCampaign/byName.json | Read-Only Asset |
| Get Smart List by Smart Campaign ID | Smart Campaigns | GET | /rest/asset/v1/smartCampaign/{id}/smartList.json | Read-Only Asset |
| Update Smart Campaign | Smart Campaigns | POST | /rest/asset/v1/smartCampaign/{id}.json | Read-Write Asset |
| Clone Smart List | Smart Lists | POST | /rest/asset/v1/smartList/{id}/clone.json | Read-Write Asset |
| Delete Smart List | Smart Lists | POST | /rest/asset/v1/smartList/{id}/delete.json | Read-Write Asset |
| Get Smart List by ID | Smart Lists | GET | /rest/asset/v1/smartList/{id}.json | Read-Only Asset |
| Get Smart List by Name | Smart Lists | GET | /rest/asset/v1/smartList/byName.json | Read-Only Asset |
| Get Smart Lists | Smart Lists | GET | /rest/asset/v1/smartLists.json | Read-Only Asset |
| Approve Snippet Draft | Snippets | POST | /rest/asset/v1/snippet/{id}/approveDraft.json | Read-Write Asset |
| Clone Snippet | Snippets | POST | /rest/asset/v1/snippet/{id}/clone.json | Read-Write Asset |
| Create Snippet | Snippets | POST | /rest/asset/v1/snippets.json | Read-Write Asset |
| Delete Snippet | Snippets | POST | /rest/asset/v1/snippet/{id}/delete.json | Read-Write Asset |
| Discard Snippet Draft | Snippets | POST | /rest/asset/v1/snippet/{id}/discardDraft.json | Read-Write Asset |
| Get Dynamic Content | Snippets | GET | /rest/asset/v1/snippet/{id}/dynamicContent.json | Read-Only Asset |
| Get Snippet by ID | Snippets | GET | /rest/asset/v1/snippet/{id}.json | Read-Only Asset |
| Get Snippet Content | Snippets | GET | /rest/asset/v1/snippet/{id}/content.json | Read-Only Asset |
| Get Snippets | Snippets | GET | /rest/asset/v1/snippets.json | Read-Only Asset |
| Unapprove Snippet | Snippets | POST | /rest/asset/v1/snippet/{id}/unapprove.json | Read-Write Asset |
| Update Snippet Content | Snippets | POST | /rest/asset/v1/snippet/{id}/content.json | Read-Write Asset |
| Update Snippet Dynamic Content | Snippets | POST | /rest/asset/v1/snippet/{id}/dynamicContent/{segmentId}.json | Read-Write Asset |
| Update Snippet Metadata | Snippets | POST | /rest/asset/v1/snippet/{id}.json | Read-Write Asset |
| Add to List | Static Lists | POST | /rest/v1/lists/{listId}/leads.json | Read-Write Lead |
| Create Static List | Static Lists | POST | /asset/v1/staticLists.json | Read-Write Asset |
| Delete Static List | Static Lists | POST | /asset/v1/staticList/{id}/delete.json | Read-Write Asset |
| Get Leads by List ID | Static Lists | GET | /rest/v1/lists/{listId}/leads.json | Read-Only Lead |
| Get List by ID | Static Lists | GET | /rest/v1/lists/{id}.json | Read-Only Lead |
| Get Lists | Static Lists | GET | /rest/v1/lists.json | Read-Only Lead |
| Get Static List by ID | Static Lists | GET | /asset/v1/staticList/{id}.json | Read-Only Asset |
| Get Static List by Name | Static Lists | GET | /asset/v1/staticList/byName.json | Read-Only Asset |
| Get Static Lists | Static Lists | GET | /asset/v1/staticLists.json | Read-Only Asset |
| Member of List | Static Lists | GET | /rest/v1/lists/{listId}/leads/ismember.json | Read-Only Lead |
| Remove from List | Static Lists | DELETE | /rest/v1/lists/{listId}/leads.json | Read-Write Lead |
| Update Static List Metadata | Static Lists | POST | /asset/v1/staticList/{id}.json | Read-Write Asset |
| Get Tag by Name | Tags | GET | /rest/asset/v1/tagType/byName.json | Read-Only Asset |
| Get Tag Types | Tags | GET | /rest/asset/v1/tagTypes.json | Read-Only Asset |
| Create Token | Tokens | POST | /rest/asset/v1/folder/{id}/tokens.json | Read-Write Asset |
| Delete Token by Name | Tokens | POST | /rest/asset/v1/folder/{id}/tokens/delete.json | Read-Write Asset |
| Get Tokens by Folder ID | Tokens | GET | /rest/asset/v1/folder/{id}/tokens.json | Read-Only Asset |
| Add Roles | User Management | POST | /userservice/management/v1/users/{userid}/roles/create.json | Access User Management Api |
| Delete Invited User | User Management | POST | /userservice/management/v1/users/{userId}/invite/delete.json | Access User Management Api |
| Delete Roles | User Management | POST | /userservice/management/v1/users/{userid}/roles/delete.json | Access User Management Api |
| Delete User | User Management | POST | /userservice/management/v1/users/{userId}/delete.json | Access User Management Api |
| Get Invited User by Id | User Management | GET | /userservice/management/v1/users/{userid}/invite.json | Access User Management Api |
| Get Roles | User Management | GET | /userservice/management/v1/users/roles.json | Access User Management Api |
| Get Roles and Workspaces by Id | User Management | GET | /userservice/management/v1/users/{userid}/roles.json | Access User Management Api |
| Get Users | User Management | GET | /userservice/management/v1/users/allusers.json | Access User Management Api |
| Get User by Id | User Management | GET | /userservice/management/v1/users/{userid}/user.json | Access User Management Api |
| Get Workspaces | User Management | GET | /userservice/management/v1/users/workspaces.json | Access User Management Api |
| Invite User | User Management | POST | /userservice/management/v1/users/invite.json | Access User Management Api |
| Update User Attributes | User Management | POST | /userservice/management/v1/users/{userId}/update.json | Access User Management Api |
