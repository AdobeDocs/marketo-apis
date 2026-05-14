---
title: Ionic
description: "Step-by-step guide to integrate the Marketo Cordova Plugin with Ionic, enable push notifications, initialize SDK, track sessions, and associate leads."
---

# Ionic

This topic describes how to integrate the Marketo Cordova Plugin. Ionic capacitor is not currently supported.

## Prerequisites

1. [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) (obtain your application Secret Key and Munchkin Id).
1. Setup Push Notifications ([iOS](push-notifications.md) | [Android](push-notifications.md) ).
1. Install [Ionic](https://ionicframework.com/getting-started/) & [Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/).

## Installation Instructions

### Setup Marketo Ionic Plugin

1. Assuming the Cordova CLI is installed, go to your Ionic application directory and run the following command to add the Marketo Plugin into your application:

   `$ ionic plugin add https://github.com/Marketo/PhoneGapPlugin.git --variable APPLICATION_SECRET_KEY="YOUR_APPLICATION_SECRET"`

1. To confirm that the plugin has been added to the application, run following command:

   `$ ionic plugin list com.marketo.plugin 0.X.0 "MarketoPlugin"`

### Migrate to Newer Version (Optional)

1. To remove an existing plugin, run the following command:

   `$ ionic plugin remove com.marketo.plugin`

1. To readd the plugin, run the following command:

   `$ ionic plugin add https://github.com/Marketo/PhoneGapPlugin.git --variable APPLICATION_SECRET_KEY="YOUR_APPLICATION_SECRET"`

### Enable Push Notifications in xCode

1. Turn on push notification capability in xCode project.![Notification Capability](assets/notification-capability.png)

### Track Push Notifications

Paste the following code inside the `application:didFinishLaunchingWithOptions:` function.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
Marketo *sharedInstance = [Marketo sharedInstance];

[sharedInstance trackPushNotification:launchOptions];
```

### Swift

```swift
let sharedInstance: Marketo = Marketo.sharedInstance()

sharedInstance.trackPushNotfication(launchOptions)
```

### Initialize Marketo Framework

To ensure that the Marketo framework is initiated on app startup, add the following code under the `onDeviceReady` function in your main JavaScript file.

You must pass `ionicCordova` as framework type for Ionic Cordova Apps.

#### Syntax

```javascript
// This method will Initialize the Marketo Framework using Your MunchkinId and Secret Key
marketo.initialize(
  function() { console.log("MarketoSDK Init done."); },
  function(error) { console.log("an error occurred:" + error); },
  'YOUR_MUNCHKIN_ID',
  'YOUR_SECRET_KEY',
  'FRAMEWORK_TYPE'
);

// For session tracking, add following.
marketo.onStart(
  function(){ console.log("onStart."); },
  function(error){ console.log("Failed to report onStart." + error); }
);
```

#### Parameters

- Success Callback : function to execute if Marketo framework initializes successfully.
- Failure Callback : function to execute if Marketo framework fails to initialize.
- MUNCHKIN ID : Munchkin ID received from Marketo at time of registration.
- SECRET KEY : Secret Key received from Marketo at time of registration.

### Initialize Marketo Push Notification

To make sure that Marketo push notification gets initiated add the following code after the initialized function in your main JavaScript file.

#### Syntax

```javascript
// This function will Enable user notifications (prompts the user to accept push notifications in iOS)
marketo.initializeMarketoPush(
    function() { console.log("Marketo push successfully initialized."); },
    function(error) { console.log("an error occurred:" + error); },
    'YOUR_GCM_PROJECT_ID' // This is required for Android and will be ignored in iOS
);
```

#### Parameters

- Success Callback : function to execute if Marketo push notification initializes successfully.
- Failure Callback : function to execute if Marketo push notification fails to initialize.
- GCM_PROJECT_ID : GCM Project ID found in [Google Developers Console](https://accounts.google.com/ServiceLogin?service=cloudconsole&passive=1209600&osid=1&continue=https://console.cloud.google.com/apis/dashboard&followup=https://console.cloud.google.com/apis/dashboard) after creating app.

The token can also be unregistered on logout.

```javascript
marketo.uninitializeMarketoPush(
  function() { console.log("Marketo push successfully uninitialized."); } ,
  function(error) { console.log("an error occurred:" + error); }
);
```

## Associate Lead

You can create a Marketo Lead by calling the associateLead function.

### Syntax

```javascript
marketo.associateLead(
  function(){ console.log("MarketoSDK : Lead Added"); },
  function(error){ console.log("an error occurred:" + error); },
  'Lead_Data_JSON_String'
);
```

### Parameters

- Success Callback : function to execute if Marketo framework associates the lead successfully.
- Failure Callback : function to execute if Marketo framework fails to associate the lead.
- Lead Data : lead data in JSON string format.

### Example

```javascript
// First create a lead as shown below
var lead = {};
lead[marketo.KEY_FIRST_NAME] = "Ionic";
lead[marketo.KEY_LAST_NAME] = "App";
lead[marketo.KEY_EMAIL] = email;
lead[marketo.KEY_ADDRESS] = "demo address";
lead[marketo.KEY_CITY] = "city";
lead[marketo.KEY_STATE] = "state";
lead[marketo.KEY_COUNTRY] = "country";
lead[marketo.KEY_POSTAL_CODE] = "postalCode";
lead[marketo.KEY_GENDER] = "gender";

// Use associateLead function to associate it.
marketo.associateLead(
  function() { console.log("MarketoSDK : Lead Associated"); },
  function(error) { console.log("an error occurred:" + error); },
  JSON.stringify(lead)
);
```

## Report Action

You can report any user performed action by calling the `reportaction` function.

### Syntax

```javascript
marketo.reportaction(
  function(){ console.log("MarketoSDK : New event sent "); },
  function(error){ console.log("an error occurred:" + error); },
  'Action_Name',
  'Action_Data_JSON_String'
);
```

### Parameters

- Success Callback : function to execute if Marketo framework reports action successfully.
- Failure Callback : function to execute if Marketo framework fails to report action.
- Action Name : action name.
- Action Data : action data in JSON string format.

### Example

```javascript
// First create an event as below
var event = {
    "Action Type":"Add To Cart",
    "Action Details":"Adding Product in cart",
    "Action Metric":"10",
    "Action Length":"1"
}

marketo.reportaction(
    function(){ console.log("Reported action successfully."); },
    function(error){ console.log("Failed to report action." + error); },
    "Add To Cart",
    JSON.stringify(event)
);
```

## Session Reporting

Bind the "pause" and "resume" event types as shown below to report Start and Stop events. This is used to track time spent in your mobile application. Note: this is required in Android.

```javascript
//Add the following code in your www/js/index.js

bindEvents: function() {
   document.addEventListener('pause', this.onStop, false);
   document.addEventListener('resume', this.onStart, false);
},
onStop: function() {
   marketo.onStop(
       function(){ console.log("onStop"); },
       function(error){ console.log("Failed to report onStop." + error); }
   );
},
onStart: function() {
   marketo.onStart(
       function(){ console.log("onStart."); },
       function(error){console.log( "Failed to report onStart." + error); }
   );
},
```

## Creating Leads

There are three ways to create leads from a hybrid app:

1. Marketo MME SDK
1. Marketo REST API
1. Form Submit

Depending on the method used, a newly created lead is recognized by different triggers and filters. Leads created using the MME SDK or REST API appear in the "Lead Created" triggers and filters. Leads created by form submissions appear in the "Fills Out Form" triggers and filters.

The best practice is to remain consistent with the method used by the Web app when creating leads. If you already have a Web app that uses form submission as the mechanism to create leads, then use that same mechanism when creating leads in your hybrid app. If you already have a Web app that uses our REST API as the mechanism to create leads, then use that same mechanism when creating leads in your hybrid app. In cases where you use neither form submission nor REST API as a mechanism to create leads in your Web app, you can consider using the MME SDK to create leads in Marketo.
