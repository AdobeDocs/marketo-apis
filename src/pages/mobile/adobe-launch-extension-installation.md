---
title: Adobe Launch Extension Installation
description: "Install the Adobe Launch Marketo extension for mobile. Follow iOS and Android setup, test devices, permissions, and FCM steps for push and in-app."
---

# Adobe Launch Extension Installation

Install the Adobe Launch Marketo extension to send push notifications, in-app messages, or both.

## Prerequisites

1. [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) and obtain the application Secret Key and Munchkin Id.
1. [Configure the property in the Adobe Launch portal](https://experience.adobe.com/#/@amc/data-collection/home).
1. Configure the application Secret Key and Munchkin ID for the property in the Adobe Launch portal.
1. Optional: [Set up push notifications](push-notifications.md).

## How to Install Marketo Extension on iOS

### Setup Swift Bridging Header

1. Go to **File** > **New** > **File** and select **Header File**.

1. Name the file "`_ProjectName_`-Bridging-Header".

1. Go to **Project** > **Target** > **Build Settings** > **Swift Compiler** > **Code Generation**.
1. Add the following path to the "Objective-Bridging" Header:

  `$(PODS_ROOT)/_ProjectName_-Bridging-Header.h`

## Initialize Extension

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

Update the `applicationDidBecomeActive` method as follows.

```objectivec
(void)applicationDidBecomeActive:(UIApplication*) application
{
 [[ALMarketo sharedInstance] initializeMarketo:nil];
}
```

### Swift

Update the `applicationDidBecomeActive` method as follows.

```objectivec
func applicationDidBecomeActive(_ application: UIApplication)
{
 ALMarketo.sharedInstance().initializeMarketo(nil)
}
```

## iOS Test Devices

1. Select **Project** > **Target** > **Info** > **URL Types**.
1. Add the identifier $\{PRODUCT_NAME}.
1. Set URL Schemes to mkto-S_ecret Key_.
1. Add `application:openURL:sourceApplication:annotation:` to `AppDelegate.m file` for Objective-C.

### Handle Custom Url Type in AppDelegate

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
#ifdef __IPHONE_10_0
-(BOOL)application:(UIApplication *)application
           openURL:(NSURL *)url
           options:(NSDictionary *)options{
    return [[ALMarketo sharedInstance] application:application
                                         openURL:url
                               sourceApplication:nil
                                      annotation:nil];
}
#endif

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    return [[ALMarketo sharedInstance] application:application
                                         openURL:url
                               sourceApplication:nil
                                      annotation:nil];
}

```

### Swift

```objectivec
func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return ALMarketo.sharedInstance().application(application, open: url, sourceApplication: nil, annotation: nil)
}
```

## How to Install Marketo SDK on Android

### Android Extension Setup

Follow the instructions in the Adobe Launch portal.

### Configure Permissions

Open `AndroidManifest.xml` and add the following permissions. Your app must request the "INTERNET" and "ACCESS_NETWORK_STATE" permissions. Skip this step if the app already requests them.

```xml
<uses‐permission android:name="android.permission.INTERNET"></uses‐permission>
<uses‐permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses‐permission>
```

## Initialize Extension

ProGuard Configuration (Optional)

If your app uses ProGuard, add the following lines to the `proguard.cfg` file in the `project` folder. This configuration excludes the Marketo SDK from obfuscation.

```text
-dontwarn com.marketo.*
-dontnote com.marketo.*
-keep class com.marketo.**{ *; }
```

## Android  Test  Devices

Add "MarketoActivity" to `AndroidManifest.xml` inside the application tag.

```xml
<activity android:name="com.marketo.MarketoActivity"  android:configChanges="orientation|screenSize" >
    <intent-filter android:label="MarketoActivity" >
        <action  android:name="android.intent.action.VIEW"/>
        <category  android:name="android.intent.category.DEFAULT"/>
        <category  android:name="android.intent.category.BROWSABLE"/>
        <data android:host="add_test_device" android:scheme="mkto" />
    </intent-filter>
</activity>
```

## Firebase Cloud Messaging Support

The MME SDK for Android supports direct use of Google's [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM).

### Adding FCM to your Application

1. Integrate the latest Marketo Android SDK into the Android app. See the steps on [GitHub](https://github.com/Marketo/android-sdk).
1. Configure the Firebase app in Firebase Console.
    1. Create or add a project in [](https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://console.firebase.google.com/&followup=https://console.firebase.google.com/)Firebase Console.
        1. In the [Firebase console](https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://console.firebase.google.com/&followup=https://console.firebase.google.com/), select **Add Project**.
        1. Select your GCM project from the list of existing Google Cloud projects, and select **Add Firebase**.
        1. In the Firebase welcome screen, select **Add Firebase to your Android App**.
        1. Provide your package name and SHA-1, and select **Add App**. A new `google-services.json` file for your Firebase app is downloaded.
        1. Select **Continue** and follow the detailed instructions for adding the Google Services plugin in Android Studio.

    1. Go to **Project Settings** in **Project Overview**.
        1. Select the **General** tab and download `google-services.json`.
        1. Select the **Cloud Messaging** tab. Copy the **Server Key** and **Sender ID**, and provide them to Marketo.
    1. Configure FCM in the Android app.
        1. Switch to the Project view in Android Studio to display the project root directory.
            1. Move the downloaded `google-services.json` file into the Android app module root directory.
            1. In Project-level `build.gradle` add the following:

                ```
                buildscript {
                  dependencies {
                    classpath 'com.google.gms:google-services:4.0.0'
                  }
                }
                ```

            1. In App-level build.gradle, add the following:

                ```
                dependencies {
                  compile 'com.google.firebase:firebase-core:17.4.0'
                }
                // Add to the bottom of the file
                apply plugin: 'com.google.gms.google-services'
                ```

            1. Select **Sync now** in the bar that appears in the IDE.
    1. Edit the app manifest. The FCM SDK automatically adds the required permissions and receiver functionality. Remove the following obsolete elements, which might cause message duplication:

        ```xml
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <permission android:name="<your-package-name>.permission.C2D_MESSAGE" android:protectionLevel="signature" />
        <uses-permission android:name="<your-package-name>.permission.C2D_MESSAGE" />

        ...

        <receiver>
          android:name="com.google.android.gms.gcm.GcmReceiver"
          android:exported="true"
          android:permission="com.google.android.c2dm.permission.SEND">
          <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <category android:name="<your-package-name> />
          </intent-filter>
        </receiver>
        ```

### FCM FAQ

These questions cover Firebase Cloud Messaging support.

**Q: Where can I find instructions to update to the latest version of the MME SDK?** See the [installation instructions](installation.md) on the Marketo Developer site.

**Q: Will updating to the latest version of the SDK require me to publish an updated version of my Android Application to my existing users?** No.

**Q: How does it affect existing MME customers with published Android apps that use the Marketo Android SDK?** Migrate an existing Android GCM client app to Firebase Cloud Messaging (FCM) as follows:

1. In the [Firebase console](https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://console.firebase.google.com/&followup=https://console.firebase.google.com/), select **Add Project**.
1. Select your GCM project from the list of existing Google Cloud projects, and select **Add Firebase**.
1. In the Firebase welcome screen, select **Add Firebase to your Android App**.
1. Provide your package name and SHA-1, and select **Add App**. A new google-services.json file for your Firebase app is downloaded.
1. Select **Continue** and follow the detailed instructions for adding the Google Services plugin in Android Studio.

**Q: Can we target leads created with the old Marketo SDK that used a GCM app?** Yes. You can target all leads created with the Marketo SDK for push notifications.
