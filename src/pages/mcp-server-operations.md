---
title: Marketo Engage MCP operations
description: Learn which Marketo Engage MCP operations are available for use with AI assistants.
---

# Marketo Engage MCP operations

The following operations are available through the Marketo Engage MCP server. The server provides read-only or non-destructive endpoints. The AI system cannot use `Delete` or other destructive operations.

<InlineAlert slots="text" variant="info" />

The MCP Server team is working on enabling the Smart List and Smart Campaign Asset APIs to work with the MCP Server. This work, including allowlisting items, is expected to be finished in Q3 2026.

For information on how data is handled with Marketo AI and the Marketo Engage MCP server, see the [Data Information](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/marketo-ai/data-information) page.

## Bulk export

[Bulk export API reference](https://developer.adobe.com/marketo-apis/api/mapi)

- `bulk_export_create`
- `bulk_export_enqueue`
- `bulk_export_file`
- `bulk_export_status`
- `get_import_status`

## Channels and tags

[Channels API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Channels) | [Tags API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Tags)

- `browse_channels`
- `browse_tag_types`
- `get_channel_by_name`
- `get_tag_type_by_name`

## Emails

[Emails API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Emails)

- `approve_email`
- `browse_emails`
- `create_email`
- `get_email_by_id`
- `get_email_by_name`
- `get_email_content`
- `update_email_content`

## Folders

[Folders API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Folders)

- `browse_folders`
- `create_folder`
- `delete_folder`
- `get_folder_by_id`
- `get_folder_by_name`
- `get_folder_content`
- `update_folder`

## Forms

[Forms API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Forms)

- `add_field_set`
- `add_field_to_form`
- `add_field_visibility_rule`
- `add_rich_text_field`
- `approve_form`
- `browse_forms`
- `clone_form`
- `create_form`
- `delete_field_from_fieldset`
- `delete_form`
- `delete_form_field`
- `discard_form_draft`
- `get_form_by_id`
- `get_form_by_name`
- `get_form_field_metadata`
- `get_form_fields`
- `get_forms_used_by`
- `get_program_member_fields`
- `get_thank_you_page`
- `set_field_autofill`
- `update_field_positions`
- `update_form`
- `update_form_field`

## Leads

[Leads API reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads)

- `add_leads_to_list`
- `describe_lead`
- `get_activity_types`
- `get_lead_activities`
- `get_leads_by_filter`
- `get_leads_by_smart_list`
- `get_paging_token`

## Programs

[Programs API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Programs)

- `approve_program`
- `browse_email_batch_programs`
- `browse_nurture_programs`
- `browse_program_details`
- `browse_program_events`
- `browse_programs`
- `browse_scheduled_programs`
- `clone_program`
- `create_program`
- `delete_program_tag`
- `get_program_by_id`
- `get_program_by_name`
- `get_program_creation_options`
- `get_program_smart_list`
- `get_programs_by_tag`
- `unapprove_program`
- `update_program`
- `update_program_tag`

## Smart campaigns

[Smart campaigns API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Campaigns)

- `activate_smart_campaign`
- `add_flow_step`
- `browse_smart_campaigns`
- `create_smart_campaign`
- `facet_smart_campaigns`
- `get_smart_campaign_auto_suggest`
- `get_smart_campaign_by_id`
- `get_smart_campaign_by_name`
- `get_smart_campaign_flow_step_by_name`
- `get_smart_campaign_flow_step_type_by_name`
- `get_smart_campaign_flow_step_types`
- `get_smart_campaign_flow_steps`
- `get_smart_campaign_rule_by_name`
- `get_smart_campaign_rules`
- `get_smart_campaign_scheduled_runs`
- `get_smart_campaign_used_by`
- `get_smart_list_by_campaign_id`
- `schedule_campaign`
- `trigger_campaign`
- `update_flow_step_choice`
- `update_smart_campaign`

## Smart lists

[Smart lists API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Smart-Lists)

- `add_smart_list_rule`
- `browse_smart_lists`
- `clone_smart_list`
- `create_smart_list`
- `delete_all_smart_list_rules`
- `get_smart_list_auto_suggest`
- `get_smart_list_by_id`
- `get_smart_list_by_name`
- `get_smart_list_rule_by_name`
- `get_smart_list_rules`
- `get_smart_list_used_by`
- `remove_smart_list_rule_constraint`
- `reorder_smart_list_rules`
- `update_smart_list_filter_logic`
- `update_smart_list_rule`

## Snippets

[Snippets API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Snippets)

- `approve_snippet`
- `browse_snippets`
- `clone_snippet`
- `create_snippet`
- `delete_snippet`
- `discard_snippet_draft`
- `facet_snippets`
- `get_snippet_by_id`
- `get_snippet_content`
- `get_snippet_dynamic_content`
- `unapprove_snippet`
- `update_snippet`
- `update_snippet_content`
- `update_snippet_dynamic_content`

## Static lists

[Static lists API reference](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists)

- `browse_lists`
- `create_list`
- `get_list_by_id`
- `get_list_by_name`
- `get_list_members`
- `remove_from_list`
- `update_list`

## Tokens

[Tokens API reference](https://developer.adobe.com/marketo-apis/api/asset#tag/Tokens)

- `create_calendar_token`
- `create_token`
- `delete_token`
- `get_calendar_tokens`
- `get_tokens_by_folder`
