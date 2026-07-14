---
title: Marketo APIs Release Notes
description: Recent documentation, OpenAPI, and site updates for Marketo APIs
---

# Marketo APIs Release Notes

Last updated: July 14, 2026

## July 2026

### Email text synchronization setting

The Asset API specification now documents the `autoCopyToText` setting for email creation and updates.

* Added the boolean `autoCopyToText` property to `CreateEmailRequest` and `UpdateEmailMetaDataRequest`.

## June 2026

### Asset API OpenAPI update

The Asset API specification was updated in `static/swagger-asset.json`.

* Replaced the `folderIds` query parameter with `folderType` on three Asset API operations.

## April 2026

### OpenAPI corrections

Several API specification fixes were merged.

* Asset API: corrected `CreateEmailRequest.textOnly` from `string` to `boolean`.

## March 2026

### Major Asset API OpenAPI refresh

The Asset API specification received a large OpenAPI update in `static/swagger-asset.json`.

* Added new Email Designer-related groups for Emails, Email Templates, and Fragments.
* Added `fieldType` to Asset API definitions.

### JSON file cleanup

The repository cleaned up duplicate and transitional Swagger files.

* Added and then removed transitional `static/swagger.json` and `static/swagger-new.json` files during Swagger testing.
* Updated summaries in the transitional Swagger file before cleanup.
* Removed the duplicate Swagger file after the active API specs were split into their current files.

## JSON and OpenAPI Change Log

The following JSON files had notable recent changes:

* `static/swagger-asset.json`: major Asset API refresh in March; enum and field fixes in April; `folderIds` replaced by `folderType` in June; `autoCopyToText` added to email creation and update requests in July.
* `static/swagger-mapi.json`: Lead Database API warnings, required-field corrections, enum fixes, and typo cleanup in April.
* `static/swagger-user.json`: User Management API type and description fixes in April.
* `static/swagger-identity.json`: Identity API operation badge metadata added in May.
* `static/swagger-data-ingestion.json`: new Data Ingestion API specification added in May.
* `static/swagger-lists.json`: Lists API specification added in May, then removed before final merge.
* `static/xswagger-identity.json`: temporary Identity API test specification added in May, then removed.
* `src/pages/contributors.json`: regenerated in May.
* `src/pages/adp-site-metadata.json`: regenerated in May.
* `package.json`: auto-content-update changes were applied, then repo-specific metadata and scripts were restored.
