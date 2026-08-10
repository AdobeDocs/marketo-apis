---
title: Get Lead API Updates
description: Learn changes to the limits for Get Lead Activities and Get Lead Changes endpoints.
---

# Get Lead API Updates

Beginning 30 September 2026, calls to the [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) or [Get Lead Changes](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadChangesUsingGET) endpoints that include the `listId` parameter will fail if the target lists contain 10,000 or more leads. The endpoints will return a 1003 Error Code indicating that the target static list has too many records.

One or more recent API calls would be affected by this change. To avoid service disruptions, you may need to update how your applications integrate with Marketo by 30 September 2026.

These queries often create searches that have no potential results or time out before finding results. Limiting the set size improves query responsiveness and helps searches complete in a timely manner.

## How Can I Tell If I'm Affected? 

This change affects only a small number of Marketo Engage instances. Administrators of affected subscriptions will receive an in-application notification before the change is applied.

## What Do I Need to Do? 

Share this document with the people or team responsible for your Marketo Engage integrations.

Depending on your use case, use one of these migration options:

* Limit static lists used for activity extraction to 10,000 members. Split existing lists into smaller lists to continue polling the same audience for activities.
* Extract Activities or Data Value Changes by using Bulk Activity Extract or Data Streams. Join the results to static list membership with [getLeadByListId](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByListIdUsingGET_1) or [Bulk Lead Extract](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/bulk-extract/bulk-lead-extract).

## What Will Happen If I Do Nothing? 

Your API integrations might be interrupted by unhandled errors when querying activities from static lists with large numbers of members.
