---
title: User Management
description: "Guide to Marketo User Management APIs for CRUD on users, header-based auth, roles and workspaces, status code handling, datetime format, and query endpoints."
---

# User Management

[User Management Endpoint Reference](https://developer.adobe.com/marketo-apis/api/user/)

Marketo User Management endpoints perform CRUD operations on user records. To create a user, send an invitation. The user then sets a password and accesses Marketo for the first time.

Unlike other Marketo REST APIs, when using the User Management APIs:

- Send the access token in an HTTP header. You cannot pass the access token as a query-string parameter. See the [Authentication guide](authentication.md).
- When creating the user role for a REST API [Custom Service](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-custom-service-for-use-with-rest-api), select a permission from each of these groups:
  1. "Access Users" permission from the [Access Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/descriptions-of-role-permissions) group
  1. "Access User Management Api" from the [Access API](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/descriptions-of-role-permissions) group
- Evaluate the HTTP response status code because response bodies do not contain the "success" boolean attribute. A successful call returns status code 200. A failed call returns a non-200 status code and the standard "errors" array with an error code and descriptive message.
- Format datetime strings as `yyyyMMdd'T'HH:mm:ss.SSS't'+|-hhmm`. This format applies to `createdAt`, `updatedAt`, and `expiresAt`.
- Do not prefix User Management API endpoints with "/rest".

## Query

User Management queries can retrieve all users, roles, and workspaces. They can also retrieve one user or the associated role and workspace records by user id.

### User by Id

The [Get User by Id](https://developer.adobe.com/marketo-apis/api/user#operation/getUserUsingGET) endpoint takes a single `userid` path parameter and returns a single user record for a user that has accepted their invitation.

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

The [Get Invited User by Id](https://developer.adobe.com/marketo-apis/api/user#operation/getInvitedUserUsingGET) endpoint takes a single `userid` path parameter and returns a single user record for a "pending" user (has not yet accepted their invitation).

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

The [Get Roles and Workspaces by Id](https://developer.adobe.com/marketo-apis/api/user#operation/getUserRolesAndWorkspacesUsingGET) endpoint takes one `userid` path parameter and returns the user's role and workspace records. Each object in the response array contains the role and workspace id and name.

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

The [Get Users](https://developer.adobe.com/marketo-apis/api/user#operation/getUsersUsingGET) endpoint returns all user records. It supports these optional integer parameters:

- `pageSize` specifies the maximum number of entries to return. The default is 20 and the maximum is 200.
- `pageOffset` specifies where to begin retrieving entries. The default is 0, and it can be used with `pageSize`.

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

The [Get Roles](https://developer.adobe.com/marketo-apis/api/user#operation/getRolesUsingGET) endpoint returns a list of all role records.

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

The [Get Workspaces](https://developer.adobe.com/marketo-apis/api/user#operation/getWorkspacesUsingGET) endpoint returns a list of all workspace records.

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

The [Invite User](https://developer.adobe.com/marketo-apis/api/user#operation/inviteUserUsingPOST) endpoint sends a "Welcome to Marketo" email invitation to a new user. The email contains a "Login to Marketo" link. The recipient selects the link, creates a password, and gains access to Marketo.

Until the recipient accepts the invitation, its status is "pending" and the user record cannot be edited. A pending invitation expires seven days after it is sent. See the [Marketo user management documentation](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users) for more information.

Pass parameters in the request body in `application/json` format.

The required parameters are `emailAddress`, `firstName`, `lastName`, and `userRoleWorkspaces`. The `userRoleWorkspaces` parameter is an array of objects that contain `accessRoleId` and `workspaceId` attributes.

The `userid` parameter is the unique user identifier used for login and must be formatted as an email address. If the request omits `userid`, its value defaults to the value of `emailAddress`.

The boolean `apiOnly` parameter specifies whether the user is an [API-Only user](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user). The `expiresAt` parameter specifies when the user login expires and uses W3C ISO-8601 format without milliseconds. If the request omits `expiresAt`, the user never expires. The `reason` parameter describes the reason for the invitation.

The endpoint returns "true" when the invitation succeeds. Otherwise, it returns an error message.

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

The following image shows the "Welcome to Marketo" email sent to the new user. The subject is "Marketo Login Information." The sender is the email address of the API-Only User associated with the [REST API Custom Service](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-custom-service-for-use-with-rest-api). The firstName, lastName, and emailAddress parameters specify the recipient.

![Invite User Email](assets/invite-user-email.png)

The user accepts the invitation by entering a password twice and selecting the "CREATE PASSWORD" button. The user then receives access to Marketo.

## Update User

You can update user attributes or delete a user after the user accepts the invitation. Pass attributes as parameters in the request body in application/json format.

### Update User Attributes

On [Adobe IMS-integrated subscriptions](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview), this endpoint supports updating attributes of [API-Only Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/create-an-api-only-user) only. To update attributes for [standard Users](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/users-and-roles/managing-marketo-users), use the [Adobe User Management API](https://developer.adobe.com/umapi/) instead.

The [Update User Attributes](https://developer.adobe.com/marketo-apis/api/user#operation/updateUserAttributeUsingPOST) endpoint takes a single `userid` path parameter and returns a single user record. The request body contains one or more user attributes to update: `emailAddress`, `firstName`, `lastName`, `expiresAt`.

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

The [Delete User](https://developer.adobe.com/marketo-apis/api/user#operation/deleteUserUsingPOST) endpoint takes a single `userid` path parameter and deletes the corresponding user from the instance. This is a destructive delete and cannot be reversed. If successful, a 200 status code is returned, otherwise an error message is returned.

```http
POST /userservice/management/v1/users/{userid}/delete.json
```

#### Delete Invited User

The [Delete Invited User](https://developer.adobe.com/marketo-apis/api/user#operation/deleteInvitedUserUsingPOST) endpoint takes a single `userid` path parameter and deletes the corresponding "pending" user from the instance (user had not yet accepted their invitation). This is a destructive delete and cannot be reversed. If successful, a 200 status code is returned, otherwise an error message is returned.

```http
POST /userservice/management/v1/users/{userid}/invite/delete.json
```

## Update Roles

You can add or delete roles. Pass attributes as parameters in the request body in application/json format.

## Add Roles

The [Add Roles](https://developer.adobe.com/marketo-apis/api/user#operation/addRolesUsingPOST) endpoint takes a single `userid` path parameter and adds one or more user roles to the corresponding user. The request body contains a list of one or more objects each containing an  `accessRoleId` and a `workspaceId` attribute. If successful, the entire list of `accessRoleId/workspaceId` pairs for the specified user is returned.

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

The [Delete Roles](https://developer.adobe.com/marketo-apis/api/user#operation/deleteRolesUsingPOST) endpoint takes a single `userid` path parameter and deletes one or more user roles from the corresponding user. The request body contains a list of one or more objects each containing an  `accessRoleId` and a `workspaceId` attribute. If successful, the remaining list of accessRoleId/workspaceId pairs for the specified user is returned.

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
