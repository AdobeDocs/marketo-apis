---
title: SOAP FAQ
description: "Learn how to list programs with getMObjects, optimize getMultipleLeads, create opportunities, and send or schedule personalized emails via the Marketo SOAP API."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# SOAP FAQ

**Q:** How can I get a list of all Programs within Marketo along with their meta data?

**A:** To retrieve a list of all programs, you can use [getMObjects](./getmobjects.md) passing the type equal to "Program" and setting includeDetails to true.

**Q:** Is there a way to speed up the performance of getMultipleLeads?

**A:** There are a few options to speed up the performance of the getMultipleLeads call. The first is to reduce the batchSize you are requesting for each call. 200 is the recommended batch size. The second option is to specify the fields you are interested in using the includeAttributes filter. This speeds up the query and reduce the payload of the response you receive. The final approach is to use the LastUpdateAtSelector and specify oldestUpdatedAt and latestUpdatedAt. You can specify different date ranges and then thread multiple requests concurrently. If using the threaded approach make sure that your SOAP/WSDL client is supporting [persistent connections](https://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html).

**Q:** How can I create Opportunities via the SOAP API when not integrated with a CRM like SalesForce or Microsoft Dynamics?

**A:** You can create Opportunities using the SOAP API using the [syncMObjects](syncmobjects.md) call writing to the OpportunityPersonRole and Opportunity [MObject](marketo-objects.md) types.

**Q:** Can I programmatically send an email from Marketo? If so, how can I send custom content for each email recipient?

**A:** Absolutely. You can request an email to be sent from Marketo using either the [requestCampaign](requestcampaign.md) or combination of [importToList](importtolist.md) and [scheduleCampaign](schedulecampaign.md) SOAP APIs. To immediately send an email to one or more people, you would use [requestCampaign](requestcampaign.md). If you want to schedule an email to be sent at a specified date and time you would use [importToList](importtolist.md) to specify the recipients of the email, and [scheduleCampaign](schedulecampaign.md) to specify when those recipients will be sent that email.

If you want to customize the content for each email recipient, you can do so by overriding the values of [program tokens](../rest-api/tokens.md) that are set within the email template.
