---
title: Marketo Mobile Extension for Adobe Launch
description: "Install and configure the Marketo Mobile SDK extension in Adobe Launch for iOS and Android, including setup for push notifications and in-app messages."
---

# Marketo Mobile Extension for Adobe Launch

Installation instructions for Marketo Mobile SDK extension in Adobe Launch. The steps below are required to send Push Notifications and/or In-App Messages.

## Prerequisites

- [Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) (obtain your application Secret Key and Munchkin Id)
- Follow instructions provided in the Adobe Launch portal for installation
- [Setup Push Notifications](push-notifications.md) (optional)

## iOS

### Setup Swift Bridging Header

1. Go to File > New > File and Select "Header File".
1. Name the file "<_ProjectName_>-Bridging-Header".
1. Go to Project > Target > Build Phases > Swift Compiler > Code Generation. Add the following path to Objective-Bridging Header:

    `$(PODS_ROOT)/<_ProjectName_>-Bridging-Header.h`

For Swift users: Remove the following import statement, as the bridging header is added in the above steps.

`import Marketo/ALMarketo`

### iOS Test Devices

Follow instructions at [Adding iOS Test Devices](installation.md#ios_test_devices)

### Handle Custom Url Type in AppDelegate

Follow instructions [here](installation.md#ios_test_devices)

### Set up push notifications on iOS

Follow instructions [here](push-notifications.md) and use the class name "ALMarketo" instead of "Marketo"

## Android

### Configure Permissions

Open `AndroidManifest.xml` and add following permissions. Your app must request the "INTERNET" and "ACCESS_NETWORK_STATE" permissions. If your app already requests these permissions, then skip this step.

```xml
<uses‐permission android:name="android.permission.INTERNET"></uses‐permission>
<uses‐permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses‐permission>
```

### ProGuard Configuration (Optional)

If you are using ProGuard for your app, then add the following lines in your `proguard.cfg` file. The file is located within your project folder. Adding this code excludes the Marketo SDK from the obfuscation process.

```text
-dontwarn com.marketo.*
-dontnote com.marketo.*
-keep class com.marketo.**{ *; }
```

### Android Test Devices

Follow instructions [here](installation.md#android_test_devices)

## Set up push notifications on Android

Follow instructions [here](installation.md#android_firebase_cloud_messaging_support) and use the class name "ALMarketo" instead of "Marketo"

For setting up user profiles follow instructions [here](user-profiles.md) and for custom actions follow instructions [here](custom-actions.md#android_custom_action). In following instructions, use the class name "ALMarketo" instead of "Marketo"
