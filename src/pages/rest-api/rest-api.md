---
title: REST API
description: "Learn how to use Marketo REST API, set up API users and LaunchPoint, view quotas and limits, authenticate with Authorization header, and retrieve leads."
---

# REST API

The Marketo REST API provides remote access to many system capabilities. You can use it to create programs, import leads in bulk, and control a Marketo instance at a detailed level.

The REST APIs fall into two broad categories:

- [Lead Database](https://developer.adobe.com/marketo-apis/api/mapi) APIs retrieve and interact with Marketo person records and associated object types, such as Opportunities and Companies.
- [Asset](https://developer.adobe.com/marketo-apis/api/asset) APIs interact with marketing collateral and workflow-related records.

<InlineAlert slots="text" variant="info" />

As of July 31st, 2026,the SOAP API is deprecated and is no longer be available. All new development should be done with the Marketo [REST API](./rest-api.md).

<InlineAlert slots="text" variant="warning" />

See this [Nation post](https://nation.marketo.com/t5/product-blogs/rest-api-double-slash-deprecation/ba-p/358616) about the deprecation of the double slash in API gateway URLs.

- **Daily quota:** Each subscription is allocated 50,000 API calls per day. The quota resets daily at 12:00 AM CST. Contact your account manager to increase the daily quota.
- **Rate limit:** Each instance is limited to 100 API calls per 20 seconds.
- **Concurrency limit:** Each instance allows a maximum of ten concurrent API calls.

Standard API calls have a maximum URI length of 8 KB and a maximum body size of 1 MB. Bulk API calls support a maximum body size of 10 MB.

When a call contains an error, the API typically still returns HTTP status code 200. The JSON response contains a `success` member with a value of `false` and an array of errors in the `errors` member. More information about errors is available [here](error-codes.md).

## Getting Started

You need admin privileges in your Marketo instance to complete the following steps. This workflow creates API credentials and uses them to retrieve a lead record.

First, create an API user and obtain credentials for authenticated calls. Log in to your instance and go to **Admin** > **Users and Roles**.

![Admin Users and Roles](assets/admin-users-and-roles.png)

Select the **Roles** tab, and then select New Role. Assign the role at least the "Read-Only Lead" (or "Read- Only Person") permission from the Access API group. Give the role a descriptive name and select **Create**.

![New Role](assets/new-role.png)

Return to the **Users** tab and select **Invite New User**. Enter a descriptive name that identifies the user as an API user, enter an email address, and select **Next**.

![New User Info](assets/new-user-info.png)

Select the **API Only** option, assign the API role that you created, and select **Next**.

![New User Permissions](assets/new-user-permissions.png)

Select **Send** to create the user.

![New User Message](assets/new-user-message.png)

Next, go to the **Admin** menu and select **LaunchPoint**.

![Launchpoint](assets/admin-launchpoint.png)

Select **New** > **New Service**. Enter a descriptive name and description, and select **Custom** from the **Service** menu. Select your new user from the **API Only User** menu, and then select **Create**.

![New Launchpoint Service](assets/admin-launchpoint-new-service.png)

Select **View Details** for the new service to access the Client ID and Client Secret. Select **Get Token** to generate an access token that is valid for one hour. Save the token for the first API call.

![Get Token](assets/get-token.png)

Go to **Admin** > **Web Services**.

![Web Services](assets/admin-web-services.png)

Find the **Endpoint** in the REST API box and save it for the first API call.

![REST Endpoint](assets/admin-web-services-rest-endpoint-1.png)

Every REST API call must include an access token in an HTTP header.

```text
Authorization: Bearer cdf01657-110d-4155-99a7-f986b2ff13a0:int
```

<InlineAlert slots="text" variant="warning" />

Support for authentication using the **access_token** query parameter is being removed on June 30, 2025. If your project uses a query parameter to pass the access token, it should be updated to use the **Authorization** header as soon as possible. New development should use the **Authorization** header exclusively.

Open a new browser tab and enter the following URL. Replace the placeholders with the endpoint and email address for your instance to call [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET).

```text
<Your Endpoint URL>/rest/v1/leads.json?&filterType=email&filterValues=<Your Email Address>
```

If your database does not contain a lead record with your email address, use the email address of an existing lead. Submit the URL to receive a JSON response similar to the following example:

```json
{
    "requestId":"c493#1511ca2b184",
    "result":[
       {
           "id":1,
           "updatedAt":"2015-08-24T20:17:23Z",
           "lastName":"Elkington",
           "email":"developerfeedback@marketo.com",
           "createdAt":"2013-02-19T23:17:04Z",
           "firstName":"Kenneth"
        }
    ],
    "success":true
}

```

## API Usage

The API usage report tracks each API user separately. Assigning a separate user to each web service helps you identify the API usage of each integration.

If calls exceed your instance limit and subsequent calls fail, use the report to identify the call volume from each service. Go to **Admin** > **Integration** > **Web Services**, and select the number of calls made in the past seven days.

For the REST endpoints that return daily and last-7-days usage and error statistics, see [Usage](usage.md).
