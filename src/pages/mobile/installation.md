---
title: Installation
description: "Guide to install and initialize the Marketo Mobile SDK on iOS and Android using CocoaPods, Swift Package Manager, or Gradle, enabling push and in-app messages."
---

# Installation

Install and initialize the Marketo Mobile SDK to send push notifications, in-app messages, or both.

## Install Marketo SDK on iOS

### Prerequisites

1. [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) and obtain the application Secret Key and Munchkin Id.
1. Optional: [Set up push notifications](push-notifications.md).

### Install Framework via CocoaPods

1. Install CocoaPods. `$ sudo gem install cocoapods`
1. Change directory to your project directory and create a Podfile with smart defaults. `$ pod init`
1. Open your Podfile. `$ open -a Xcode Podfile`
1. Add the following line to your Podfile. `$ pod 'Marketo-iOS-SDK'`
1. Save and close your Podfile.
1. Download and install Marketo iOS SDK. `$ pod install`
1. Open the workspace in Xcode. `$ open App.xcworkspace`

### Install Framework using Swift Package Manager

1. Select your project in the Project Navigator. Under "Add Package Dependency", select '+'.

    ![Add Dependency](assets/dependency-manager-add.png)

1. Add the Marketo package from [https://github.com/Marketo/ios-sdk](https://github.com/Marketo/ios-sdk).

    ![Repo URL](assets/dependency-manager-url.png)

1. Add the resource bundle. Locate `MarketoFramework.XCframework` in the Project Navigator and open it in Finder. Drag `MKTResources.bundle` to Copy Bundle Resources.

### Setup Swift Bridging Header

1. Go to File > New > File and select "Header File".

    ![Select "Header File"](assets/choose-header-file.png)

1. Name the file "`_ProjectName_`-Bridging-Header".

1. Go to Project > Target > Build Phases > Swift Compiler > Code Generation. Add the following path to Objective-Bridging Header:

    `$(PODS_ROOT)/_ProjectName_-Bridging-Header.h`

    ![Build Phases](assets/build-phases.png)

## Initialize SDK

Initialize the Marketo iOS SDK with your Munchkin Account Id and App Secret Key. Find both values under "Mobile Apps and Devices" in Marketo Admin.

1. Open the AppDelegate.m file for Objective-C or the Bridging file for Swift. Import the Marketo.h header file.

    ```
    #import <MarketoFramework/MarketoFramework.h>
    ```

1. Paste the following code inside the `application:didFinishLaunchingWithOptions`: function.

    Pass "native" as the framework type for native apps.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
Marketo *sharedInstance = [Marketo sharedInstance];

[sharedInstance initializeWithMunchkinID:@"munchkinAccountId" appSecret:@"secretKey" mobileFrameworkType:@"native" launchOptions:launchOptions];
```

### Swift

```swift
let sharedInstance: Marketo = Marketo.sharedInstance()

sharedInstance.initialize(withMunchkinID: "munchkinAccountId", appSecret: "secretKey", mobileFrameworkType: "native", launchOptions: launchOptions)
```

1. Replace `munkinAccountId` and `secretKey` with the "Munchkin Account ID" and "Secret Key" from Marketo **Admin** > **Mobile Apps and Devices**.

## iOS Test Devices

1. Select Project > Target > Info > URL Types.
1. Add the identifier $\{PRODUCT_NAME}.
1. Set URL Schemes to `mkto-Secret Key_`.
1. Add application:openURL:sourceApplication:annotation: to the AppDelegate.m file for Objective-C.

## Handle Custom Url Type in AppDelegate

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{

    return [[Marketo sharedInstance] application:app
                                         openURL:url
                                         options:options];
}

```

### Swift

```swift
private func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool
    {
        return Marketo.sharedInstance().application(app, open: url, options: options)
    }

```

## How to Install Marketo SDK on Android

### Prerequisites

1. [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) and obtain the application Secret Key and Munchkin Id.
1. Optional: [Set up push notifications](push-notifications.md#android_setup_push).
1. [Download Marketo SDK for Android](https://codeload.github.com/Marketo/android-sdk/zip/refs/heads/master)

### Android SDK Setup with Gradle

1. In the application-level build.gradle file, add the dependency under the dependencies section.

   `implementation 'com.marketo:MarketoSDK:0.8.9'`

1. Add the following configuration to the root `build.gradle` file.

    ```
    buildscript {
        repositories {
            google()
            mavenCentral()
        }
    ```

1. Sync the project with the Gradle files.

### Configure Permissions

Open `AndroidManifest.xml` and add the following permissions. Your app must request the "INTERNET" and "ACCESS_NETWORK_STATE" permissions. Skip this step if the app already requests them.

```xml
<uses‐permission android:name="android.permission.INTERNET"></uses‐permission>
<uses‐permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses‐permission>
```

### Initialize SDK

1. Open the Application or Activity class. Import the Marketo SDK into the Activity before setContentView or in Application Context.

    ```java
    // Initialize Marketo
    Marketo marketoSdk = Marketo.getInstance(getApplicationContext());
    marketoSdk.initializeSDK("native","munchkinAccountId","secretKey");
    ```

1. ProGuard Configuration (Optional)

    If your app uses ProGuard, add the following lines to the `proguard.cfg` file in the project folder. This configuration excludes the Marketo SDK from obfuscation.

    ```
    -dontwarn com.marketo.*
    -dontnote com.marketo.*
    -keep class com.marketo.`{ *; }
    ```

## Android Test Devices

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
    1. Create/Add a Project on [](https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://console.firebase.google.com/&followup=https://console.firebase.google.com/)Firebase Console.
        1. In the [Firebase console](https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://console.firebase.google.com/&followup=https://console.firebase.google.com/), select `Add Project`.
        1. Select your GCM project from the list of existing Google Cloud projects, and select `Add Firebase`.
        1. In the Firebase welcome screen, select `Add Firebase to your Android App`.
        1. Provide your package name and SHA-1, and select `Add App`. A new `google-services.json` file for your Firebase app is downloaded.
        1. Select `Continue` and follow the detailed instructions for adding the Google Services plugin in Android Studio.

    1. Navigate to 'Project Settings' in Project Overview
        1. Click 'General' tab. Download the 'google-services.json' file.
        1. Click on 'Cloud Messaging' tab. Copy 'Server Key' and 'Sender ID'. Provide these 'Server Key' and 'Sender ID' to Marketo.
    1. Configure FCM in the Android app.
        1. Switch to the Project view in Android Studio to see your project root directory
            1. Move the downloaded 'google-services.json' file into your Android app module root directory
            1. In Project-level build.gradle, add the following:

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

            1. Finally, select **Sync now** in the bar that appears in the ID
    1. Edit the app manifest. The FCM SDK automatically adds the required permissions and receiver functionality. Remove the following obsolete elements, which might cause message duplication:

        ```xml
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <permission android:name="<your-package-name>.permission.C2D_MESSAGE" android:protectionLevel="signature" />
        <uses-permission android:name="<your-package-name>.permission.C2D_MESSAGE" />

        ...

        <receiver>
          android:name="com.google.android.gms.gcm.GcmReceiver"
          android:exported="true"
          android:permission="com.google.android.c2dm.permission.SEND"
          <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <category android:name="<your-package-name> />
          </intent-filter>
        </receiver>
        ```
