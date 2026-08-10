---
title: PhoneGap
description: "Set up the Marketo PhoneGap Plugin with Cordova, configure Firebase Cloud Messaging, enable iOS and Android push, track notifications, and initialize the SDK."
---

# PhoneGap

Integrate the Marketo PhoneGap Plugin with a Cordova app.

## Prerequisites

1. [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) and obtain the application Secret Key and Munchkin Id.
1. Set up push notifications for [iOS](push-notifications.md) or [Android](push-notifications.md).
1. [Install PhoneGap/Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/).

## Installation Instructions

1. Set up the Marketo PhoneGap Plugin.

   Go to the PhoneGap application directory and run the following command to add the Marketo Plugin:

   `$ cordova plugin add https://github.com/Marketo/PhoneGapPlugin.git --variable APPLICATION_SECRET_KEY="YOUR_APPLICATION_SECRET"`

1. Install the FCM plugin.

   `$ cordova plugin add cordova-plugin-fcm`

   Run the following command to confirm that the plugin was added:

   `$ cordova plugin ls com.marketo.plugin 0.X.0 "MarketoPlugin" cordova-plugin-fcm 2.1.2 "FCMPlugin"`

**Migrate to Newer Version (Optional)**

To remove an existing plugin, run the following command:

`$ cordova plugin remove com.marketo.plugin`

To add the plugin again, run the following command:

`$ cordova plugin add https://github.com/Marketo/PhoneGapPlugin.git --variable APPLICATION_SECRET_KEY="YOUR_APPLICATION_SECRET"`

**Cordova version 8.0.0 (Cordova@Android7.0.0) and above**

After building the Cordova Android platform, open the app in Android Studio. Update the `dirs` value in the `Marketo.gradle` file in the `com.marketo.plugin` folder.

```groovy
repositories{
  jcenter()
  flatDir{
      dirs '../app/src/main/aar'
   }
}
```

Add the target platforms for the app: `$cordova platform add android` `$ cordova platform add ios`

Check the added platforms: `$cordova platform ls`

1. Firebase Cloud Messaging Support

1. Configure the Firebase app in Firebase Console.
    1. Create or add a project in [](https://console.firebase.google.com/)Firebase Console.
        1. In the [Firebase console](https://console.firebase.google.com/), select **Add Project**.
        1. Select your GCM project from the list of existing Google Cloud projects, and select **Add Firebase**.
        1. In the Firebase welcome screen, select 'Add Firebase to your Android App'.
        1. Provide your package name and SHA-1, and select **Add App**. A new `google-services.json` file for your Firebase app is downloaded.
    1. Go to **Project Settings** in **Project Overview**.
        1. Select the **General** tab and download the 'google-services.json' file.
        1. Select the **Cloud Messaging** tab. Copy the **Server Key** and **Sender ID**, and provide them to Marketo.
    1. Configure FCM in the PhoneGap app.
        1. Move the downloaded 'google-services.json' file into the PhoneGap app module root directory.
        1. Remove the file 'MyFirebaseInstanceIDService' from location `platforms/android/app/src/main/java/com/gae/scaffolder/plugin` (Deprecated)
        1. Modify the file 'MyFirebaseMessagingService' in location `platforms/android/app/src/main/java/com/gae/scaffolder/plugin` as follows:

              ```
              import com.marketo.Marketo;

              public class MyFirebaseMessagingService extends FirebaseMessagingService{

              @Override
              public void onNewToken(String s){
                super.onNewToken(s);
                MarketoExtension.setPushNotificaitonTokens(s);
                //Add your code here
              }

              @Override
              public void onMessageReceived(RemoteMessage remoteMessage) {
                MarketoExtension.showPushNotificaiton(remoteMessage);
                //Add your code here
              }
              }
              ```

            1. Modify the file 'fcm_config_files_process.js' in location plugins/cordova-plugin-fcm/scripts as follows

                ```
                //change
                var strings = fs.readFileSync("platforms/android/res/values/strings.xml").toString();
                //to
                var strings = fs.readFileSync("platforms/android/app/src/main/res/values/strings.xml").toString();

                //AND change
                fs.writeFileSync("platforms/android/res/values/strings.xml", strings);
                //to
                fs.writeFileSync("platforms/android/app/src/main/res/values/strings.xml", strings);



                ```

### 3. Enable Push Notifications in xCode

Turn on the push notification capability in the xCode project.

### 4. Track Push Notifications

Paste the following code inside the `application:didFinishLaunchingWithOptions:` function.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

Update the `applicationDidBecomeActive` method as follows.

```objectivec
Marketo *sharedInstance = [Marketo sharedInstance];

[sharedInstance trackPushNotification:launchOptions];
```

### Swift

Update the `applicationDidBecomeActive` method as follows.

```swift
let sharedInstance: Marketo = Marketo.sharedInstance()

sharedInstance.trackPushNotification(launchOptions)
```

### 5. Initialize Marketo Framework

To initialize the Marketo framework when the app starts, add the following code under the `onDeviceReady` function in the main JavaScript file.

Pass `phonegap` as the framework type for PhoneGap apps.

### Syntax

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

### Parameters

- Success Callback: Function to run if the Marketo framework initializes successfully.
- Failure Callback: Function to run if the Marketo framework fails to initialize.
- MUNCHKIN ID: Munchkin ID received from Marketo during registration.
- SECRET KEY: Secret Key received from Marketo during registration.

### 6. Initialize Marketo Push Notification

To initialize Marketo push notifications, add the following code after the initialize function in the main JavaScript file.

### Syntax

```javascript
// This function will Enable user notifications (prompts the user to accept push notifications in iOS)
marketo.initializeMarketoPush(
    function() { console.log("Marketo push successfully initialized."); },
    function(error) { console.log("an error occurred:" + error); },
    'YOUR_GCM_PROJECT_ID' // This is required for Android and will be ignored in iOS
);
```

### Parameters

- Success Callback: Function to run if Marketo push notification initializes successfully.
- Failure Callback: Function to run if Marketo push notification fails to initialize.
- GCM_PROJECT_ID: GCM Project ID found in [Google Developers Console](https://console.developers.google.com/) after creating the app.

You can also unregister the token at logout.

```javascript
marketo. uninitializeMarketoPush(
  function() { console.log("Marketo push successfully uninitialized."); } ,
  function(error) { console.log("an error occurred:" + error); }
);
```

## Associate Lead

Call the associateLead function to create a Marketo lead.

### Syntax

```javascript
marketo.associateLead(
  function(){ console.log("MarketoSDK : Lead Added"); },
  function(error){ console.log("an error occurred:" + error); },
  'Lead_Data_JSON_String'
);
```

### Parameters

- Success Callback: Function to run if the Marketo framework associates the lead successfully.
- Failure Callback: Function to run if the Marketo framework fails to associate the lead.
- Lead Data: Lead data in JSON string format.

### Example

```javascript
// First create a lead as shown below
var lead = {};
lead[marketo.KEY_FIRST_NAME] = "Phone";
lead[marketo.KEY_LAST_NAME] = "Gap";
lead[marketo.KEY_EMAIL] = email;
lead[marketo.KEY_ADDRESS] = "demo address";
lead[marketo.KEY_CITY] = "city";
lead[marketo.KEY_STATE] = "state";
lead[marketo.KEY_COUNTRY] = "country";
lead[marketo.KEY_POSTAL_CODE] = "postalCode";
lead[marketo.KEY_GENDER] = "gender";
// To use lead custom field, use the REST API NAME as key
lead["REST API NAME"] = "value";

// Use associateLead function to associate it.
marketo.associateLead(
  function() { console.log("MarketoSDK : Lead Associated"); },
  function(error) { console.log("an error occurred:" + error); },
  JSON.stringify(lead)
);
```

## Report Action

Call the `reportaction` function to report a user action.

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

- Success Callback: Function to run if the Marketo framework reports the action successfully.
- Failure Callback: Function to run if the Marketo framework fails to report the action.
- Action Name: Action name.
- Action Data: Action data in JSON string format.

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

Bind the "pause" and "resume" event types to report Start and Stop events. These events track time spent in the mobile application and are required on Android.

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

The triggers and filters that recognize a new lead depend on the creation method:

- Leads created with the MME SDK or REST API appear in the "Lead Created" triggers and filters.
- Leads created by form submission appear in the "Fills Out Form" triggers and filters.

Use the same lead-creation method in the hybrid app and web app. If the web app uses form submission or the REST API, use that method in the hybrid app. If the web app uses neither method, consider using the MME SDK to create leads in Marketo.
