---
title: Authentication
description: "Authenticate Marketo REST APIs with 2 legged OAuth 2.0, create and use access tokens, switch to Authorization header, manage expiry, handle 601 and 602 errors."
---

# Authentication

Marketo's REST APIs are authenticated with 2-legged OAuth 2.0. Client IDs and Client Secrets are provided by custom services that you define. Each custom service is owned by an API-Only user which has a set of roles and permissions which authorize the service to perform specific actions. An access token is associated with a single custom service. Access token expiration is independent of tokens associated with other custom services that may be present in an instance.

## Creating an Access Token

The `Client ID` and `Client Secret` are found in the **Admin** > **Integration** > **LaunchPoint** menu by selecting the custom service, and clicking **View Details**.

![Get REST Service Details](assets/authentication-service-view-details.png)

![Launchpoint Credentials](assets/admin-launchpoint-credentials.png)

The `Identity URL` is found in the **Admin** > **Integration** > **Web Services** menu in the REST API section.

Create an access token using an HTTP GET (or POST) request like so:

```http
GET <Identity URL>/oauth/token?grant_type=client_credentials&client_id=<Client Id>&client_secret=<Client Secret>
```

If your request was valid, you receive a JSON response similar to the following:

```json
{
    "access_token": "cdf01657-110d-4155-99a7-f986b2ff13a0:int",
    "token_type": "bearer",
    "expires_in": 3599,
    "scope": "apis@acmeinc.com"
}
```

Response Definition

- `access_token` - The token that you pass with subsequent calls to authenticate with the target instance.
- `token_type` - The OAuth authentication method.
- `expires_in` - The remaining lifespan of the current token in seconds (after which it is invalid). When an access token is originally created, its lifespan is 3600 seconds or one hour.
- `scope` - The owning user of the custom service that was used to authenticate.

## Using an Access Token

When making calls to REST API methods, an access token must be included in every call for the call to be successful.
The access token must be sent as an HTTP header.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the `access_token` query parameter is being removed on July 31, 2026. If your project uses a query parameter to pass the access token, it should be updated to use the [Authorization header](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/authentication#using-an-access-token) as soon as possible. New development should use the `Authorization` header exclusively.

### Switching to the Authorization header

To switch from using the `access_token` query parameter to an Authorization header, a small code change is required.

Using CURL as an example, this code sends the `access_token` value as a form parameter (the -F flag):

```bash
curl ...  -F access_token=<Access Token> <REST API Endpoint Base URL>/bulk/v1/apiCall.json
```

This code sends the same value as the `Authorization: Bearer` http header (the -H flag):

```bash
curl ... -H 'Authorization: Bearer <Access Token>' <REST API Endpoint Base URL>/bulk/v1/apiCall.json
```

## Tips and Best Practices

Managing access token expiration is important to ensure that your integration works smoothly and prevents unexpected authentication errors from occurring during normal operation. When designing authentication for your integration, be sure to store the token and expiration period contained in the Identity response.

Before making any REST call, you should check the validity of the token based on its remaining lifespan. If the token is expired, then renew it by calling [Identity](https://developer.adobe.com/marketo-apis/api/identity/#tag/Identity/operation/identityUsingGET) endpoint. This helps ensure that your REST call never fails due to an expired token. This helps you manage the latency of your REST calls in a predictable fashion, which is crucial for end-user-facing applications.

If an expired token is used to authenticate a REST call, the REST call will fail and return a 602 error code. If an invalid token is used to authenticate a REST call, a 601 error code is returned. If either of these codes are received, the client should renew the token by calling Identity endpoint.

If you call the Identity endpoint before your token has expired, the same token and the remaining lifespan will be returned in the response.

Remember that your access tokens are owned on a per-Custom-Service basis and not on a user basis. Even though two Identity responses may be scoped to the same user, the access tokens and expiration periods are independent of each other if they were made with credentials from two different services. Keep this in mind when you have multiple sets of credentials in the same application; the Client Id can be a useful key for managing them independently.
