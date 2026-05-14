---
title: Standard Fields
description: "Browse the full list of Marketo standard lead fields with REST and SOAP names, labels, and descriptions, plus how to retrieve them via the Describe Lead API."
---

# Standard Fields

Here is a list of standard fields available in Marketo that are accessible via the API.

You can retrieve the list of all supported field names available on your lead records by using the REST [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi) endpoint.

| REST API Name | SOAP API Name | Friendly Label | Description |
| --- | --- | --- | --- |
| address | Address | Address | Lead's address |
| annualRevenue | AnnualRevenue | Annual Revenue | Annual Revenue of the lead's company |
| anonymousIP | AnonymousIP | Anonymous IP | IP address of the lead's first recorded web visit |
| billingCity | BillingCity | Billing City | City of the lead's billing address |
| billingCountry | BillingCountry | Billing Country | Country of the lead's billing address |
| billingPostalCode | BillingPostalCode | Billing Postal Code | Postal code of the lead's billing address |
| billingState | BillingState | Billing State | State or province of the lead's billing address |
| billingStreet | BillingStreet | Billing Address | Billing street address of the lead's company |
| city | City | City | Lead's city |
| company | Company | Company Name | Lead's company name |
| country | Country | Country | Lead's country |
| dateOfBirth | DateofBirth | Date of Birth | Lead's date of birth |
| department | Department | Department | Lead's department in their company |
| doNotCall | DoNotCall | Do Not Call | Lead's do-not-call preference |
| doNotCallReason | DoNotCallReason | Do Not Call Reason | Explanation for lead's do-not-call preference |
| email | Email | Email Address | Lead's email address. Standard Marketo key field for lead records |
| fax | Fax | Fax Number | Lead's fax number |
| firstName | FirstName | First Name | Lead's first name |
| industry | Industry | Industry | Lead's Industry |
| inferredCompany | InferredCompany | Inferred Company | Company name inferred by reverse IP lookup of the lead's first recorded web visit |
| inferredCountry | InferredCountry | Inferred Country | Country inferred by reverse IP lookup of the lead's first recorded web visit |
| lastName | LastName | Last Name | Lead's Last Name |
| leadRole | LeadRole | Role | Lead's role in their company |
| leadScore | LeadScore | Lead Score | Integer score awarded to the lead by scoring campaigns and programs |
| leadSource | LeadSource | Lead Source | Field recording what source the lead originated from |
| leadStatus | LeadStatus | Lead Status | Field recording the current marketing/sales status of the lead |
| mainPhone | MainPhone | Main Phone | Primary phone number of the lead's company |
| jigsawContactId | Marketo Jigsaw Contact Id | Marketo Data.com ID | Lead's Data.com ID if available |
| jigsawContactStatus | Marketo Jigsaw Contact Status | Marketo Data.com Status | Lead's Data.com status if available |
| middleName | MiddleName | Middle Name | Lead's Middle Name |
| mobilePhone | MobilePhone | Mobile Phone Number | Lead's mobile phone number |
| numberOfEmployees | NumberOfEmployees | Num Employees | Number of employees of lead's company |
| phone | Phone | Phone Number | Lead's Phone Number |
| postalCode | PostalCode | Postal Code | Lead's postal code |
| rating | Rating | Lead Rating | Marketing/sales rating of the lead |
| salutation | Salutation | Salutation | Lead's preferred salutation, that is Mister, Misses…and so on |
| sicCode | SICCode | SIC Code | Standard Industrial Classification code of the lead's company |
| site | Site | Site |  |
| state | State | State | Lead's state |
| title | Title | Job Title | Lead's job title |
| unsubscribed | Unsubscribed | Unsubscribed | Lead's email-unsubscribed status. Partially system managed. Will prevent receipt of non-operational emails if set to true. |
| unsubscribedReason | UnsubscribedReason | Unsubscribed Reason | Reason for lead's unsubscribed status. Partially system managed. Populated with Email information if lead unsubscribed directly from a Marketo email. |
| website | Website | Website | URL of the website of the lead's company |
| createdAt |  - | Created At | The time when the lead record was initially created. System managed |
| updatedAt |  - | Updated At | The last time the lead record was updated. System managed |
| emailInvalid |  - | Email Invalid | Email invalid status. All emails to the address will be blocked if set to true. Bounces indicating that the email is invalid will automatically set this field to true. |
| emailInvalidCause |  - | Email Invalid Cause | Cause of email invalid status. The instigating bounce message will be recorded in this field when email invalid is set to true. |
| inferredCity |  - | Inferred City | Lead's city inferred by reverse IP lookup of lead's first recorded web visit. |
| inferredMetropolitanArea |  - | Inferred Metropolitan Area | Lead's metropolitan area inferred by reverse IP lookup of lead's first recorded web visit. |
| inferredPhoneAreaCode |  - | Inferred Phone Area Code | Lead's phone area code inferred by reverse IP lookup of lead's first recorded web visit. |
| inferredPostalCode |  - | Inferred Postal Code | Lead's postal code inferred by reverse IP lookup of lead's first recorded web visit. |
| inferredStateRegion |  - | Inferred State Region | Lead's state region inferred by reverse IP lookup of lead's first recorded web visit. |
| isAnonymous |  - | Is Anonymous | Anonymous status of lead record. System managed. |
| priority |  - | Priority | Lead's Sales Insight priority. System managed. |
| relativeScore |  - | Relative Score | Lead's Sales Insight relative score. System managed. |
| urgency |  - | Urgency | Lead's Sales Insight urgency. System managed. |
