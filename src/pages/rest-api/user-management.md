---
title: User Management
description: "Guide to Marketo User Management APIs for CRUD on users, header-based auth, roles and workspaces, status code handling, datetime format, and query endpoints."
---

# User Management

[User Management Endpoint Reference](https://developer.adobe.com/marketo-apis/api/user/)

Marketo provides a set of User Management endpoints allow you to perform CRUD operations on user records in Marketo. Users are created by sending an invitation to a user, who then sets a password and gains access to Marketo for the first time.

Unlike other Marketo REST APIs, when using the User Management APIs:

- You must use the HTTP header method to send the access token to authenticate. You cannot pass the access token as a query string parameter. More information is available in the [Authentication guide](authentication.md).
- You must select a role permission from two different groups when creating the user role for [Custom Service](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-custom-service-for-use-with-rest-api) for REST API:
  1. "Access Users" permission from the [Access Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/descriptions-of-role-permissions) group
  1. "Access User Management Api" from the [Access API](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/descriptions-of-role-permissions) group
- Response bodies do not contain the "success" boolean attribute indicating success or failure of a call. Instead you must evaluate the HTTP response status code. If a call succeeds, a 200 status code is returned. If a call fails, a non-200 level status code is returned and the response body contains the standard "errors" array with error code and descriptive error message.
- The format of datetime strings is `yyyyMMdd'T'HH:mm:ss.SSS't'+|-hhmm`. This applies to the following attributes: `createdAt`, `updatedAt`, `expiresAt`.
- User Management API endpoints are not prefixed with "/rest" like other endpoints.

## Query

Query support for user management includes ability to retrieve all users, roles, and workspaces. Also, you can retrieve a single user record by user id, or a role/workspace record by user id.

### User by Id

The [Get User by Id](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getUserUsingGET) endpoint takes a single `userid` path parameter and returns a single user record for a user that has accepted their invitation.

```http
GET /userservice/management/v1/users/{userid}/user.json
```

```json
{
  "userid": "jamie@houselannister.com",
  "firstName": "Jamie",
  "lastName": "Lannister",
  "emailAddress": "jamie@lannister.com",
  "optedIn": false,
  "failedLogins": 0,
  "failedDeviceCode": 0,
  "isLocked": false,
  "lockedReason": null,
  "id": 0,
  "apiOnly": false,
  "userRoleWorkspaces": [
    {
      "accessRoleId": 1,
      "accessRoleName": "Admin",
      "workspaceId": 0,
      "workspaceName": "AllZones"
    },
    {
      "accessRoleId": 2,
      "accessRoleName":
      "Standard User",
      "workspaceId": 1008,
      "workspaceName": "World"
    }
  ],
  "expiresAt": "2020-12-31T08:00:00.000t+0000",
  "lastLoginAt": "2020-02-05T01:02:23.000t+0000"
}
```

### Invited User by Id

The [Get Invited User by Id](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getInvitedUserUsingGET) endpoint takes a single `userid` path parameter and returns a single user record for a "pending" user (has not yet accepted their invitation).

```http
GET /userservice/management/v1/users/{userid}/invite.json
```

```json
{
    "id": 25112,
    "firstName": "Jamie",
    "lastName": "Lannister",
    "emailAddress": "jamie@lannister.com",
    "userId": "jamie@lannister.com",
    "subscriptionId": 3381,
    "status": "pending",
    "expiresAt": "20200807T20:49:54.0t+0000",
    "createdAt": "20200731T20:49:54.0t+0000",
    "updatedAt": "20200731T20:49:54.0t+0000"
}
```

### Roles and Workspaces by Id

The [Get Roles and Workspaces by Id](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getUserRolesAndWorkspacesUsingGET) endpoint takes a single `userid` path parameter and returns a list of user role and workspace records. The response contains an array with one object that contains role and workspace id and name for the specified user.

```http
GET /userservice/management/v1/users/{userid}/roles.json
```

```json
[
  {
    "accessRoleId": 1,
    "accessRoleName": "Admin",
    "workspaceId": 0,
    "workspaceName": "AllZones"
  },
  {
    "accessRoleId": 2,
    "accessRoleName": "Standard User",
    "workspaceId": 1008,
    "workspaceName": "World"
  }
]
```

### Browse Users

The [Get Users](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getUsersUsingGET) endpoint returns a list of all user records. The optional `pageSize` parameter is an integer that specifies the maximum number of entries to return. Default is 20. Maximum is 200. The optional `pageOffset` parameter is an integer that specifies where to begin retrieving entries. Can be used with `pageSize`. Default is 0.

```http
GET /userservice/management/v1/users/allusers.json
```

```json
[
  {
    "userid": "jamie@lannister.com",
    "firstName": "Jamie",
    "lastName": "Lannister",
    "emailAddress": "jamie@houselannister.com",
    "id": 6785,
    "apiOnly": false
  },
  {
    "userid": "jeoffery@housebaratheon.com",
    "firstName": "Jeoffery",
    "lastName": "Baratheon",
    "emailAddress": "jeoffery@housebaratheon.com",
    "id": 7718,
    "apiOnly": false
  },
  {
    "userid": "rickon@housestark.com",
    "firstName": "Rickon",
    "lastName": "Stark",
    "emailAddress": "rickon@housestark.com",
    "id": 8612,
    "apiOnly": false
  }
]
```

<InlineAlert slots="text" variant="info" />

In the code sample above, the `userid` displayed is for a customer that has been migrated to Adobe IMS. Those customers yet to migrate will see a regular email address in the `userid` field.

### Browse Roles

The [Get Roles](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getRolesUsingGET) endpoint returns a list of all role records.

```http
GET /userservice/management/v1/users/roles.json
```

```json
[
    {
        "id": 1,
        "name": "Admin",
        "description": "All permissions",
        "type": "system",
        "hidden": false,
        "onlyAllZones": true,
        "createdAt": "20100327T18:27:42.0t+0000",
        "updatedAt": "20100327T18:27:42.0t+0000"
    },
    {
        "id": 2,
        "name": "Standard User",
        "description": "All permissions except Admin",
        "type": "system",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20100327T18:27:42.0t+0000",
        "updatedAt": "20180423T02:33:29.0t+0000"
    },
    {
        "id": 24,
        "name": "RTP Launcher",
        "description": "Role required for launcher in RTP",
        "type": "system",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20151024T01:45:40.0t+0000",
        "updatedAt": "20171024T23:41:24.0t+0000"
    },
    {
        "id": 25,
        "name": "RTP Editor",
        "description": "Role required for editor in RTP",
        "type": "system",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20151024T01:45:40.0t+0000",
        "updatedAt": "20171024T23:41:24.0t+0000"
    },
    {
        "id": 101,
        "name": "Analytics User",
        "description": "Has access to Analytics",
        "type": "custom",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20100327T18:27:42.0t+0000",
        "updatedAt": "20180423T02:33:29.0t+0000"
    },
    {
        "id": 102,
        "name": "Marketing User",
        "description": "All permissions except Admin",
        "type": "custom",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20100327T18:27:42.0t+0000",
        "updatedAt": "20100327T18:27:42.0t+0000"
    },
    {
        "id": 103,
        "name": "Web Designer",
        "description": "Has access to Design Studio except approval permission",
        "type": "custom",
        "hidden": false,
        "onlyAllZones": false,
        "createdAt": "20100327T18:27:42.0t+0000",
        "updatedAt": "20180423T02:33:29.0t+0000"
    }
]
```

### Browse Workspaces

The [Get Workspaces](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/getWorkspacesUsingGET) endpoint returns a list of all workspace records.

```http
GET /userservice/management/v1/users/workspaces.json
```

```json
[
  {
    "id": 1,
    "name": "Default",
    "description": "Initial workspace for Marketing Activities, Design Studio, and so on.",
    "globalViz": 0,
    "status": "active",
    "currencyInfo": null,
    "createdAt": "20160910T23:08:05.0t+0000",
    "updatedAt": "20160910T23:08:05.0t+0000"
  },
  {
    "id": 1008,
    "name": "World",
    "description": "",
    "globalViz": 0,
    "status": "active",
    "currencyInfo": null,
    "createdAt": "20181119T21:59:36.0t+0000",
    "updatedAt": "20181119T21:59:36.0t+0000"
  },
  {
    "id": 1009,
    "name": "Reproduction - US English - All Leads",
    "description": "A Workspace for recreating customer-reported problems.",
    "globalViz": 1,
    "status": "active",
    "currencyInfo": null,
    "createdAt": "20190129T23:36:37.0t+0000",
    "updatedAt": "20190129T23:36:37.0t+0000"
  },
  {
    "id": 1010,
    "name": "US",
    "description": "United States - Qualified Leads",
    "globalViz": 0,
    "status": "active",
    "currencyInfo": null,
    "createdAt": "20190322T15:55:40.0t+0000",
    "updatedAt": "20190322T15:55:40.0t+0000"
  }
]
```

## Invite User

On [Adobe IMS-integrated subscriptions](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview), this endpoint supports invitation of [API-Only Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user) only. To invite [standard Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users), use the [Adobe User Management API](https://developer.adobe.com/umapi/) instead.

The [Invite User](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/inviteUserUsingPOST) endpoint sends a "Welcome to Marketo" email invitation to a new user. The email body contains a "Login to Marketo" link which allows the user to access Marketo for the first time. To accept the invitation, the email recipient clicks the "Login to Marketo" link, creates their password, and gains access to Marketo. Until the acceptance process is complete, the invitation is "pending" and the user record may not be edited. A pending invitation expires seven days after being sent. More information is available in the [Marketo user management documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users).

Parameters are passed in the request body in `application/json` format.

The following parameters are required: `emailAddress`, `firstName`, `lastName`, and `userRoleWorkspaces`. The `userRoleWorkspaces` parameter is an array of objects which contain `accessRoleId` and `workspaceId` attributes.

The `userid` parameter is a unique user identifier string value used for user login purposes and must be formatted as an email address. If not provided in the request, the value of `userid` defaults to the value provided in the `emailAddress` parameter.

The boolean `apiOnly` parameter specifies whether the user is an [API-Only user](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user). The `expiresAt` parameter specifies when user login expires and is formatted using W3C ISO-8601 format (without milliseconds). If not provided in the request, the user never expires. The `reason` parameter is a string that describes the reason for the user invitation.

The endpoint returns a value of "true" if successful, otherwise an error message is returned.

```http
POST /userservice/management/v1/users/invite.json
```

```text
Content-Type: application/json
```

```json
{
  "emailAddress": "daenerys@housetargaryen.com",
  "firstName": "Daenerys",
  "lastName": "Targaryen",
  "expiresAt": "2020-12-31T23:59:59-05:00",
  "reason": "Keeper of dragons",
  "userRoleWorkspaces": [
    {
      "accessRoleId": 1,
      "workspaceId": 0
    }
  ]
}
```

```text
true
```

Below is an example of the "Welcome to Marketo" email invitation that is sent to the new user. The email subject line is "Marketo Login Information", the sender is the email address of the API-Only User associated with the [REST API Custom Service](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-custom-service-for-use-with-rest-api), and the recipient is as specified via the firstName, lastName, and emailAddress parameters.

![Invite User Email](assets/invite-user-email.png)

The user accepts the email invitation by entering her password twice and clicking "CREATE PASSWORD" button. She then is granted access to Marketo for the first time.

## Update User

Update support for users includes ability to update user attributes or delete a user. Only users that have accepted their invitation can be updated. Attributes are passed as parameters the request body in application/json format .

### Update User Attributes

On [Adobe IMS-integrated subscriptions](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview), this endpoint supports updating attributes of [API-Only Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user) only. To update attributes for [standard Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users), use the [Adobe User Management API](https://developer.adobe.com/umapi/) instead.

The [Update User Attributes](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/updateUserAttributeUsingPOST) endpoint takes a single `userid` path parameter and returns a single user record. The request body contains one or more user attributes to update: `emailAddress`, `firstName`, `lastName`, `expiresAt`.

```http
POST /userservice/management/v1/users/{userid}/update.json
```

```text
Content-Type: application/json
```

```json
{
  "firstName": "JAMIE",
  "lastName": "LANISTER",
  "expiresAt": "20211231T08:00:00.000t+0000"
}
```

```json
{
  "userid": "jamie@houselannister.com",
  "firstName": "JAMIE",
  "lastName": "LANISTER",
  "emailAddress": "jamie@houselannister.com",
  "optedIn": false,
  "failedLogins": 0,
  "failedDeviceCode": 0,
  "isLocked": false,
  "lockedReason": null,
  "id": 0,
  "apiOnly": false,
  "userRoleWorkspaces": [
    {
      "accessRoleId": 1,
      "accessRoleName": "Admin",
      "workspaceId": 0,
      "workspaceName": "AllZones"
    },
    {
      "accessRoleId": 2,
      "accessRoleName":
      "Standard User",
      "workspaceId": 1008,
      "workspaceName": "World"
    }
  ],
  "expiresAt": "2021-12-31T08:00:00.000t+0000"
  "lastLoginAt": "2020-02-05T01:02:23.000t+0000"
}
```

#### Delete User

On [Adobe IMS-integrated subscriptions](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview), this endpoint supports deletion of [API-Only Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user) only. To delete [standard Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users), use the [Adobe User Management API](https://developer.adobe.com/umapi/) instead.

The [Delete User](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/deleteUserUsingPOST) endpoint takes a single `userid` path parameter and deletes the corresponding user from the instance. This is a destructive delete and cannot be reversed. If successful, a 200 status code is returned, otherwise an error message is returned.

```http
POST /userservice/management/v1/users/{userid}/delete.json
```

#### Delete Invited User

The [Delete Invited User](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/deleteInvitedUserUsingPOST) endpoint takes a single `userid` path parameter and deletes the corresponding "pending" user from the instance (user had not yet accepted their invitation). This is a destructive delete and cannot be reversed. If successful, a 200 status code is returned, otherwise an error message is returned.

```http
POST /userservice/management/v1/users/{userid}/invite/delete.json
```

## Update Roles

Update support for roles includes ability to add and delete roles. Attributes are passed as parameters the request body in application/json format.

## Add Roles

The [Add Roles](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/addRolesUsingPOST) endpoint takes a single `userid` path parameter and adds one or more user roles to the corresponding user. The request body contains a list of one or more objects each containing an  `accessRoleId` and a `workspaceId` attribute. If successful, the entire list of `accessRoleId/workspaceId` pairs for the specified user is returned.

```http
POST /userservice/management/v1/users/{userid}/roles/create.json
```

```text
Content-Type: application/json
```

```json
[
  {
    "accessRoleId": 2,
    "workspaceId": 1008
  }
]
```

```json
[
  {
    "accessRoleId": 1,
    "accessRoleName": "Admin",
    "workspaceId": 0,
    "workspaceName": "AllZones"
  },
  {
    "accessRoleId": 2,
    "accessRoleName": "Standard User",
    "workspaceId": 1008,
    "workspaceName": "World"
  }
]
```

## Delete Roles

The [Delete Roles](https://developer.adobe.com/marketo-apis/api/user/#tag/User-Management/operation/deleteRolesUsingPOST) endpoint takes a single `userid` path parameter and deletes one or more user roles from the corresponding user. The request body contains a list of one or more objects each containing an  `accessRoleId` and a `workspaceId` attribute. If successful, the remaining list of accessRoleId/workspaceId pairs for the specified user is returned.

```http
POST /userservice/management/v1/users/{userid}/roles/delete.json

```

```text
Content-Type: application/json
```

```json
[
  {
    "accessRoleId": 2,
    "workspaceId": 1008
  }
]
```

```json
[
  {
    "accessRoleId": 1,
    "accessRoleName": "Admin",
    "workspaceId": 0,
    "workspaceName": "AllZones"
  }
]
```
