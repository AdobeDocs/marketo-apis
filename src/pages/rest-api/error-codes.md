---
title: Error Codes
description: "Learn Marketo REST API error handling with HTTP 413 and 414, response 6xx 7xx, record-level statuses, logging best practices, retries, and limits."
---

# Error Codes

Marketo REST APIs return errors at the HTTP, response, or record level. This page explains each error type and lists the associated error codes.

## Handling and Logging Exceptions

Log requests and responses when your integration encounters an unexpected exception. Some exceptions, such as expired authentication, can be handled by re-authenticating. Other exceptions can require assistance from Support, which will request the associated request and response details.

## Error Types

The Marketo REST API can return three types of errors during normal operation:

- **HTTP-Level:** Indicated by a `4xx` code.
- **Response-Level:** Included in the "errors" array of the JSON response.
- **Record-Level:** Included in the "result" array of the JSON response and indicated for each record by the "status" field and "reasons" array.

Response-Level and Record-Level errors return HTTP status code 200. For all error types, do not evaluate the HTTP reason phrase because it is optional and subject to change.

### HTTP-Level errors

During normal operation, Marketo returns two HTTP status code errors: `413 Request Entity Too Large` and `414 Request URI Too Long`. To recover from either error, modify the request and retry it. You can prevent these errors by checking request sizes before submission.

Marketo returns 413 when the request payload exceeds 1MB, or 10MB for Import Lead. Check the request size before submission. If records cause the request to exceed the limit, move those records to another request.

Marketo returns 414 when the URI of a GET request exceeds 8KB. Check the query-string length before submission. If it exceeds the limit, change the request method to POST, put the query string in the request body, and add the `_method=GET` parameter. Long URIs are most common when retrieving large record batches with long filter values, such as a GUID.

The [Identity](https://developer.adobe.com/marketo-apis/api/identity/) endpoint can return a 401 Unauthorized error, typically because the Client Id or Client Secret is invalid. The following table lists HTTP-Level error codes.

table
  thead
    tr
      th Response Code /th
      th Description /th
      th colspan="1" Comment /th
    /tr
  /thead
  tbody
    tr
      td413/td
      tdRequest Entity Too Large/td
      tdThe payload exceeded the 1MB limit./td
    /tr
    tr
      td414/td
      tdRequest-URI Too Long/td
      tdThe URI of the request exceeded 8k. The request should be retried as a POST with param `_method=GET` in the URL, and the rest of the query string in the body of the request./td
    /tr
  /tbody
/table

#### Response-Level errors

Response-Level errors occur when the response sets the `success` parameter to false. They use the following structure:

```json
{
    "requestId": "e42b#14272d07d78",
    "success": false,
    "errors": [
        {
            "code": "601",
            "message": "Unauthorized"
        }
    ]
}
```

Each object in the "errors" array contains two members:

- `code`: A quoted integer from 601 to 799.
- `message`: The plain-text reason for the error.

A 6xx code indicates that the entire request failed and was not executed. For example, recover from a 601 "Access token invalid" error by re-authenticating and passing the new access token with the request.

A 7xx code indicates that the request failed because no data was returned or the request parameters were invalid. Causes include an invalid date or a missing required parameter.

#### Response-Level Error Codes

<InlineAlert slots="text" variant="info" />

An API call that returns this response code is not counted against your daily quota, or your rate limit.

table
  thead
    tr
      th Response Code /th
      th Description /th
      th Comment /th
    /tr
  /thead
  tbody
  tr
      td500/td
      tdInternal Server error/td
      tdThe server encountered an unexpected condition that prevented it from fulfilling the request.  Within Marketo, this may include improperly formed REST API request URLs./td
    /tr
    tr
      td502/td
      tdBad Gateway/td
      tdThe remote server returned an error. Likely a timeout. The request should be retried with exponential backoff./td
    /tr
    tr
      td601*/td
      tdAccess token invalid/td
      tdAn Access Token parameter was included in the request, but the value was not a valid access token./td
    /tr
    tr
      td602*/td
      tdAccess token expired/td
      tdThe Access Token included in the call is no longer valid due to expiration./td
    /tr
    tr
      td603/td
      tdAccess denied/td
      tdAuthentication is successful but the user does not have sufficient permission to call this API. [Additional permissions](custom-services.md) may need to be assigned to the user role, or [Allowlist for IP-Based API Access](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-an-allowlist-for-ip-based-api-access) may be enabled./td
    /tr
    tr
      td604*/td
      tdRequest time-out/td
      tdThe request was running for too long (for example, encountered database contention), or exceeded the time-out period specified in the header of the call./td
    /tr
    tr
      td605*/td
      tdHTTP Method not supported/td
      tdGET is not supported for the Sync Leads endpoint. POST must be used./td
    /tr
    tr
      td606/td
      tdMax rate limit `%s`; exceeded with in `%s` secs/td
      tdThe number of calls in the past 20 seconds was greater than 100/td
    /tr
    tr
      td607/td
      tdDaily quota reached/td
      tdThe number of calls today exceeded the subscription's quota (resets daily at 12:00AM CST).>Your quota can be found in your Admin->Web Services menu. You can increase your quota through your account manager./td
    /tr
    tr
      td608*/td
      tdAPI Temporarily Unavailable/td
      td/td
    /tr
    tr
      td609/td
      tdInvalid JSON/td
      tdThe body included in the request is not valid JSON./td
    /tr
    tr
      td610/td
      tdRequested resource not found/td
      tdThe URI in the call did not match a REST API resource type. This is often due to an incorrectly spelled or incorrectly formatted request URI/td
    /tr
    tr
      td611*/td
      tdSystem error/td
      tdAll unhandled exceptions/td
    /tr
    tr
      td612/td
      tdInvalid Content Type/td
      tdIf you see this error, add a content type header specifying JSON format to your request. For example, try using `content type: application/json`. [See this StackOverflow question](https://stackoverflow.com/questions/28181325/why-invalid-content-type) for more details./td
    /tr
    tr
      td613/td
      tdInvalid Multipart Request/td
      tdThe multipart content of the POST was not formatted correctly/td
    /tr
    tr
      td614/td
      tdInvalid Subscription/td
      tdThe destination subscription cannot be found or is unreachable. This usually indicates temporary inaccessibility./td
    /tr
    tr
      td615/td
      tdConcurrent access limit reached/td
      tdAt most, requests are processed by any subscription 10 at a time. This is returned if there are already 10 ongoing requests./td
    /tr
    tr
      td616/td
      tdInvalid subscription type/td
      tdThe appropriate Marketo subscription type is required to access the Custom Object Metadata API. Consult your CSM for details./td
    /tr
    tr
      td701/td
      td%s cannot be blank/td
      tdThe reported field must not be empty in the request/td
    /tr
    tr
      td702/td
      tdNo data found for a given search scenario/td
      tdNo records matched the given search parameters.
        Note: Many failed search operations return `success = true` and no errors and set a warnings informational string./td
    /tr
    tr
      td703/td
      tdThe feature is not enabled for the subscription/td
      tdA beta feature that has not been in enabled in a user's subscription/td
    /tr
    tr
      td704/td
      tdInvalid date format/td
      tdul
          liA date was specified that was not in the correct format/li
          liAn invalid dynamic content id was specified/li
        /ul/td
    /tr
    tr
      td709/td
      tdBusiness Rule Violation/td
      tdThe call cannot be fulfilled because it violates a requirement to create or update an asset, for example, trying to create an email without a template. It is also possible to get this error when trying to:
        ul
          liRetrieve content for landing pages that contain social content./li
          liClone a program that contains certain asset types (see [Program Clone](programs.md#clone) for more information)./li
          liApprove an asset that has no draft (that is, has already been approved)./li
        /ul/td
    /tr
    tr
      td710/td
      tdParent Folder Not Found/td
      tdThe specified parent folder could not be found/td
    /tr
    tr
      td711/td
      tdIncompatible Folder Type/td
      tdThe specified folder was not of the correct type to fulfill the request/td
    /tr
    tr
      td712/td
      tdMerge to person Account operation is invalid/td
      tdA Merge Leads call failed because of an attempt to merge leads that are Salesforce Person Accounts.  Salesforce Person Accounts must be merged in Salesforce./td
    /tr
    tr
      td713/td
      tdTransient Error/td
      tdA system resource was temporarily unavailable at the time of the API call. When this error is encountered, it is advised to wait for time and then retry the request./td
    /tr
    tr
      td714/td
      tdUnable to find the default record type/td
      tdA Merge Leads call failed because it was unable to find a default record type./td
    /tr
    tr
      td718/td
      tdExternalSalesPersonID not found/td
      tdA Sync Opportunities call was made with a non-existent `ExternalSalesPersonID` value./td
    /tr
    tr
      td719/td
      tdLock wait timeout exception/td
      tdA Clone Program call was made and timed out waiting for a lock./td
    /tr
  /tbody
/table

### Record-Level \{#record_level_errors}

Record-Level errors indicate that the request was valid but the operation could not be completed for an individual record. A response with Record-Level errors follows this pattern:

#### Response

```json
{
   "requestId":"e42b#14272d07d78",
   "success":true,
   "result":[
      {
         "id":50,
         "status":"created"
      },
      {
         "id":51,
         "status":"created"
      },
      {
         "status":"skipped",
         "reasons":[
            {
               "code":"1005",
               "message":"Lead already exists"
            }
         ]
      }
   ]
}
```

Records in the result array appear in the same order as records in the request input array. Each record can succeed or fail independently, as indicated by its status field.

For a failed record, the "status" field is "skipped" and the record includes a "reasons" array. Each reason contains a "code" member and a "message" member. The code is always 1xxx, and the message explains why the record was skipped.

For example, if a Sync Leads request sets "action" to "createOnly" and a lead already exists for one of the submitted keys, the response returns code 1005 and the message "Lead already exists," as shown above.

#### Record-Level Error Codes

<InlineAlert slots="text" variant="info" />

table
  tbody
    tr
      tdResponse Code/td
      tdDescription/td
      tdComment/td
    /tr
    tr
      td1001/td
      tdInvalid value &#8216;%s'. Required of type &#8216;%s'/td
      tdError is generated whenever a parameter value has a type mismatch. For example the string value specified for an integer parameter./td
    /tr
    tr
      td1002/td
      tdMissing value for the required parameter &#8216;%s'/td
      tdError is generated when a required parameter is missing from the request/td
    /tr
    tr
      td1003/td
      tdInvalid data/td
      tdWhen the data submitted is not a valid type for the given endpoint or mode; such as when id is submitted for a lead with action designated as createOnly or when using Request Campaign on a batch campaign./td
    /tr
    tr
      td1004/td
      tdLead not found/td
      tdFor syncLead, when action is &#8220;updateOnly&#8221; and if lead is not found/td
    /tr
    tr
      td1005/td
      tdLead already exists/td
      tdFor syncLead, when action is &#8220;createOnly&#8221; and if a lead already exists/td
    /tr
    tr
      td1006/td
      tdField &#8216;%s' not found/td
      tdAn included field in the call is not a valid field./td
    /tr
    tr
      td1007/td
      tdMultiple leads match the lookup criteria/td
      tdMultiple leads match the lookup criteria. Updates can only be performed when the key matches a single record/td
    /tr
    tr
      td1008/td
      tdAccess denied to partition &#8216;%s'/td
      tdThe user for the custom service does not have access to a workspace with the partition where the record exists./td
    /tr
    tr
      td1009/td
      tdPartition name must be specified/td
      td/td
    /tr
    tr
      td1010/td
      tdPartition update not allowed/td
      tdThe specified record already exists in a separate lead partition./td
    /tr
    tr
      td1011/td
      tdField &#8216;%s' not supported/td
      tdWhen lookup field or `filterType` specified with unsupported standard fields (ex: firstName, lastName)/td
    /tr
    tr
      td1012/td
      tdInvalid cookie value &#8216;%s'/td
      tdCan occur when calling the [Associate Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/associateLeadUsingPOST) with an invalid value for the `cookie` parameter.
        This also occurs when calling [Get Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) with `filterType=cookies` and an invalid value for the `filterValues` parameter./td
    /tr
    tr
      td1013/td
      tdObject not found/td
      tdGet object (list, campaign) by id returns this error code/td
    /tr
    tr
      td1014/td
      tdFailed to create Object/td
      tdFailed to create Object (list)/td
    /tr
    tr
      td1015/td
      tdLead not in list/td
      tdThe designated lead is not a member of the target list/td
    /tr
    tr
      td1016/td
      tdToo many imports/td
      tdThere are too many imports queued. A maximum of 10 is allowed/td
    /tr
    tr
      td1017/td
      tdObject already exists/td
      tdCreation failed because the record already exists/td
    /tr
    tr
      td1018/td
      tdCRM Enabled/td
      tdThe action could not be carried out, because the instance has a native CRM integration enabled./td
    /tr
    tr
      td1019/td
      tdImport in progress/td
      tdThe target list is already being imported to/td
    /tr
    tr
      td1020/td
      tdToo many clones to program/td
      tdThe subscription has reached the allotted use of `cloneToProgramName` in the Schedule Program for the day/td
    /tr
    tr
      td1021/td
      tdCompany update not allowed/td
      tdCompany update not allowed during syncLead/td
    /tr
    tr
      td1022/td
      tdObject in use/td
      tdDelete is not allowed when an object is in use by another object/td
    /tr
    tr
      td1025/td
      tdProgram status not found/td
      tdA status was specified to Change Lead Program Status that did not match a status available for the program's channel./td
    /tr
    tr
      td1026/td
      tdCustom object not enabled/td
      tdThe action could not be carried out, because the instance does not have custom objects integration enabled./td
    /tr
    tr
      td1027/td
      tdMax Activity Type Limit Reached/td
      tdThe subscription has reached the maximum number of available custom activity types./td
    /tr
    tr
      td1028/td
      tdMax field limit reached/td
      tdCustom activities have a maximum of 20 secondary attributes./td
    /tr
    tr
      td1029/td
      tdul
          liToo many jobs in queue/li
          liExport daily quota exceeded/li
          liJob already queued/li
        /ul/td
      tdul
          liSubscriptions are allowed a maximum of 10 bulk extract jobs in the queue at any given time./li
          liBy default extract jobs are limited to 500MB per day (resets daily at 12:00AM CST)./li
          liThe export id has already been queued./li
        /ul/td
    /tr
    tr
      td1035/td
      tdUnsupported filter type/td
      tdIn some subscriptions, the following Bulk Lead Extract filter types are not supported:  updatedAt, smartListId, smartListName./td
    /tr
    tr
      td1036/td
      tdDuplicate object found in input/td
      tdA call was made to update two or more records using the same foreign key. For example,  a Sync Companies call using the same externalCompanyId for more than one company./td
    /tr
    tr
      td1037/td
      tdLead was skipped/td
      tdThe Lead was skipped because it is already in or past this status./td
    /tr
    tr
      td1042/td
      tdInvalid runAt date/td
      tdThe runAt date specified for Schedule Campaign was too far into the future (the maximum is 2 years)./td
    /tr
    tr
      td1048/td
      tdCustom Object Discard Draft Failed/td
      tdA call was made to discard the draft version of a custom object./td
    /tr
    tr
      td1049/td
      tdFailed to Create Activity/td
      tdAttributes array too long.
        The array of attributes passed to the record exceeded the max length of 65536 bytes/td
    /tr
    tr
      td1076/td
      td[Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) call with mergeInCRM flag is 4./td
      tdYou are creating a duplicate record. It is recommended that you use an existing record instead.
        This is the error msg, which Marketo receives when merging in Salesforce./td
    /tr
    tr
      td1077/td
      td[Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) call failed due to `SFDC Field` length/td
      tdA Merge Leads call with mergeInCRM set to true failed due to `SFDC Field` exceeding the limit of allowed characters. To correct, reduce the length of `SFDC Field`, or set mergeInCRM to false./td
    /tr
    tr
      td1078/td
      td[Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) call failed due to deleted entity, not a lead/contact, or field filter criteria does not match./td
      tdMerge failure, unable to perform merge operation in natively synced CRM
        This is the error msg, which Marketo receives when merging in Salesforce./td
    /tr
    tr
      td1079/td
      td[Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST)  call failed due to Personalized URL conflict in duplicate records/td
      tdA Merge Leads call specified many Leads with the same Personalized URL. To resolve use Marketo Engage user interface to merge these records./td
    /tr
  /tbody
/table
