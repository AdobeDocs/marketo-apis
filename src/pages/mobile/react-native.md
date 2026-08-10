---
title: React Native
description: "Install and set up the Marketo SDK in React Native apps with Android Gradle and iOS CocoaPods steps, native module bridging, push, and lead association."
---

# React Native

Install and configure the Marketo native SDK to integrate a React Native mobile app with Marketo.

## Prerequisites

[Add an application in Marketo Admin](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app) and obtain the application Secret Key and Munchkin Id.

## SDK Integration

### Android SDK Integration

**Setup using Gradle**

Add the latest Marketo SDK dependency under the dependencies section of the application-level `build.gradle` file. Include the appropriate SDK version.

```groovy
implementation 'com.marketo:MarketoSDK:0.x.x'
```

**Add mavencentral repository**

The Marketo SDK is available in the [Maven Central repository](https://mvnrepository.com/). Add the `mavencentral` repository to the root `build.gradle` file.

```groovy
build script {
  repositories {
    google()
    mavencentral()
  }
}
```

Sync the project with the Gradle files.

#### iOS SDK Integration

Set up the SDK in the Xcode project before creating a bridge for the React Native project.

**SDK integration - Using CocoaPods**

Use [CocoaPods](https://cocoapods.org/) to add the iOS SDK to the app's Xcode project. CocoaPods is a Ruby dependency manager for Objective-C and Swift.

1. Install CocoaPods.

  `$ sudo gem install cocoapods`

1. Open the Podfile in the iOS folder of the ReactNative project.

  `$ open -a Xcode Podfile`

1. Add the following line to your Podfile.

  `$ pod 'Marketo-iOS-SDK'`

1. Save and close your Podfile.

1. Download and install Marketo iOS SDK.

  `$ pod install`

1. Open the workspace in Xcode.

  `$ open App.xcworkspace`

## Native Module Installation Instructions

Use a native module when the React Native app must access a platform API or native library that JavaScript does not expose. The NativeModule system exposes Java, Objective-C, or C++ classes as JavaScript objects.

The React Native bridge connects the JSX and native app layers. The host app can use JSX code to call Marketo SDK methods through this bridge.

### Android

Create a file containing wrapper methods that call the Marketo SDK with the provided parameters.

```java
public class RNMarketoModule extends ReactContextBaseJavaModule {

   final Marketo marketoSdk;
   RNMarketoModule(ReactApplicationContext context) {
       super(context);
       marketoSdk = Marketo.getInstance(context);
   }

   @NonNull
   @Override
   public String getName() {
       return "RNMarketoModule";
   }

   @ReactMethod
   public void associateLead(ReadableMap leadData) {

       MarketoLead mLead = new MarketoLead();
       try {
           mLead.setCity(leadData.getString(MarketoLead.KEY_CITY));
           mLead.setFirstName(leadData.getString(MarketoLead.KEY_FIRST_NAME));
           mLead.setLastName(leadData.getString(MarketoLead.KEY_LAST_NAME));
           mLead.setAddress(leadData.getString(MarketoLead.KEY_ADDRESS));
           mLead.setEmail(leadData.getString(MarketoLead.KEY_EMAIL));
           mLead.setBirthDay(leadData.getString(MarketoLead.KEY_BIRTHDAY));
           mLead.setCountry(leadData.getString(MarketoLead.KEY_COUNTRY));
           mLead.setFacebookId(leadData.getString(MarketoLead.KEY_FACEBOOK));
           mLead.setGender(leadData.getString(MarketoLead.KEY_GENDER));
           mLead.setState(leadData.getString(MarketoLead.KEY_STATE));
           mLead.setPostalCode(leadData.getString(MarketoLead.KEY_POSTAL_CODE));
           mLead.setTwitterId(leadData.getString(MarketoLead.KEY_TWITTER));
           marketoSdk.associateLead(mLead);
       }
       catch (MktoException e){
       }
   }
   @ReactMethod
   public void setSecureSignature(ReadableMap readableMap) {
       MarketoConfig.SecureMode secureMode = new MarketoConfig.SecureMode();
       secureMode.setAccessKey(readableMap.getString("accessKey"));
       secureMode.setEmail(readableMap.getString("email"));
       secureMode.setSignature(readableMap.getString("signature"));
       secureMode.setTimestamp(readableMap.getInt("timeStamp"));
       marketoSdk.setSecureSignature(secureMode);
   }
   @ReactMethod
      public void initializeSDK(String frameworkType, String munchkinId, String appSecreteKey){
          marketoSdk.initializeSDK(munchkinId,appSecreteKey,frameworkType);
    }


   @ReactMethod
   public void initializeMarketoPush(String projectId){
       marketoSdk.initializeMarketoPush( projectId);
   }

   @ReactMethod
   public void initializeMarketoPush(String projectId, String channelName){
       marketoSdk.initializeMarketoPush( projectId, channelName);
   }

   @ReactMethod
   public void uninitializeMarketoPush(){
       marketoSdk.uninitializeMarketoPush();
   }

   @ReactMethod
   public void reportAction(String action){
       Marketo.reportAction(action, null);
   }

   @ReactMethod
   public void reportAction(String action, ReadableMap readableMap){
       MarketoActionMetaData marketoActionMetaData = new MarketoActionMetaData();
       marketoActionMetaData.setActionDetails(readableMap.getString("setMetric"));
       marketoActionMetaData.setActionMetric(readableMap.getString("setLength"));
       marketoActionMetaData.setActionLength(readableMap.getString("actionDetails"));
       marketoActionMetaData.setActionType(readableMap.getString("actionType"));
       Marketo.reportAction(action, marketoActionMetaData);
   }
}
```

**Register the Package**

Register the Marketo package with React Native.

```java
public class MarketoPluginPackage implements ReactPackage {

   @NonNull
   @Override
   public List createNativeModules(@NonNull ReactApplicationContext reactContext) {
           List modules = new ArrayList<>();

           modules.add(new RNMarketoModule(reactContext));

           return modules;
   }

   @NonNull
   @Override
   public List createViewManagers(@NonNull ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }
}
```

Add the MarketoPluginPackage to the React package list in the Application Class.

```java
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List packages = new PackageList(this).getPackages();
          packages.add(new MarketoPluginPackage());     //Add the Marketo Package here.
          // Packages that cannot be autolinked yet can be added manually here, for example:
          return packages;
        }
}
```

### iOS

Create a native module, _RNMarketoModule_, to access Marketo APIs from JavaScript.

Open the iOS project for the React Native application in Xcode. Use Xcode to write the native code and identify syntax errors.

Create the custom native module header and implementation files. Create `MktoBridge.h` and add the following content.

```objectivec
//
//  MktoBridge.h
//
//  Created by Marketo, An Adobe company.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface MktoBridge : NSObject

@end

NS_ASSUME_NONNULL_END
```

Create `MktoBridge.m` in the same folder and add the following content.

```objectivec
//
//  MktoBridge.h
//  Created by Marketo, An Adobe company.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface MktoBridge : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END


//
//  MktoBridge.m
//  Created by Marketo, An Adobe company.
//

#import "MktoBridge.h"
#import <MarketoFramework/Marketo.h>
#import <React/RCTBridge.h>
#import "ConstantStringsHeader.h"

@implementation MktoBridge

RCT_EXPORT_MODULE(RNMarketoModule);

+(BOOL)requiresMainQueueSetup{
  return NO;
}

RCT_EXPORT_METHOD(initializeSDK:(NSString *) munchkinId SecretKey: (NSString *) secretKey andFrameworkType: (NSString *) frameworkType){
  [[Marketo sharedInstance] initializeWithMunchkinID:munchkinId appSecret:secretKey mobileFrameworkType:frameworkType launchOptions:nil];
}

RCT_EXPORT_METHOD(reportAction:(NSString *)actionName withMetaData:(NSDictionary *)metaData){
  MarketoActionMetaData *meta = [[MarketoActionMetaData alloc] init];
  [meta setType:[metaData objectForKey:KEY_ACTION_TYPE]];
  [meta setDetails:[metaData objectForKey:KEY_ACTION_DETAILS]];
  [meta setLength:[metaData valueForKey:KEY_ACTION_LENGTH]];
  [meta setMetric:[metaData valueForKey:KEY_ACTION_METRIC]];
  [[Marketo sharedInstance] reportAction:actionName withMetaData:meta];
}

RCT_EXPORT_METHOD(associateLead:(NSDictionary *)leadDetails){
  MarketoLead *lead = [[MarketoLead alloc] init];
  if ([leadDetails objectForKey:KEY_EMAIL] != nil) {
    [lead setEmail:[leadDetails objectForKey:KEY_EMAIL]];
  }
  if ([leadDetails objectForKey:KEY_FIRST_NAME] != nil) {
    [lead setFirstName:[leadDetails objectForKey:KEY_FIRST_NAME]];
  }

  if ([leadDetails objectForKey:KEY_LAST_NAME] != nil) {
    [lead setLastName:[leadDetails objectForKey:KEY_LAST_NAME]];
  }

  if ([leadDetails objectForKey:KEY_CITY] != nil) {
    [lead setCity:[leadDetails objectForKey:KEY_CITY]];
  }
    [[Marketo sharedInstance] associateLead:lead];
}

RCT_EXPORT_METHOD(uninitializeMarketoPush){
  [[Marketo sharedInstance] unregisterPushDeviceToken];
}

RCT_EXPORT_METHOD(reportAll){
  [[Marketo sharedInstance] reportAll];
}

RCT_EXPORT_METHOD(setSecureSignature:(NSDictionary *)secureSignature){
  MKTSecuritySignature *secSignature = [[MKTSecuritySignature alloc]
                                        initWithAccessKey:[secureSignature objectForKey:KEY_ACCESSKEY]
                                        signature:[secureSignature objectForKey:KEY_SIGNATURE]
                                        timestamp: [secureSignature objectForKey:KEY_EMAIL]
                                        email:[secureSignature objectForKey:KEY_EMAIL]];

    [[Marketo sharedInstance] setSecureSignature:secSignature];
}

RCT_EXPORT_METHOD(requestPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound + UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (error) {
      reject(@"PERMISSION_ERROR", @"Permission request failed", error);
    } else {
      resolve(@(granted));
    }
  }];
}

RCT_EXPORT_METHOD(registerForRemoteNotifications) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  });
}


@end

```

#### Initialize Marketo SDK

Add a call to the native module's createCalendarEvent() method. The following example adds a NewModuleButton component and invokes the native module in its onPress() function.

```javascript
import React from 'react';
import { NativeModules, Button } from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (

  );
  };

export default NewModuleButton;
```

Load the native module into the JavaScript layer.

```javascript
import React from 'react';
import {Node} from 'react';
import { NativeModules } from 'react-native';

const { RNMarketoModule } = NativeModules;
```

After placing the files, import the JavaScript module into a JavaScript class and call its methods directly.

Pass "reactNative" as the framework type for React Native apps.

```javascript
// Initialize marketo SDK with Munchkin & Seretkey you have from step 1.
RNMarketoModule.initializeSDK("MunchkinID","SecreteKEY","FrameworkType")

//You can create a Marketo Lead by calling the associateLead function.
RNMarketoModule.associateLead({ email: "", firstName: "", lastName:"", city:""})

//You can report any user performed action by calling the reportaction function.
RNMarketoModule.reportAction("Bought Shirt", {actionType:"Shopping", actionDetails: "Red Shirt", setLength : 20, setMetric : 30 })

//You can set Secure Signature by calling this method.
RNMarketoModule.setSecureSignature({accessKey: "Key102", email: "testleadrk@001.com", signature : "asdfghjkloiuytds", timeStamp: "12345678987654"})

//This function will Enable user notifications (Only Android)
RNMarketoModule.initializeMarketoPush("350312872033", "MKTO")

//The token can also be unregistered on logout.
RNMarketoModule.uninitializeMarketoPush()
```

#### Configure Push Notifications

Initialize push notifications with the Project ID and channel name.

```javascript
RNMarketoModule.initializeMarketoPush("ProjectId", "Channel_name")
```

Add the following service to `AndroidManifest.xml`.

```xml
<service android:exported="true" android:name=".MyFirebaseMessagingService" android:stopWithTask="true">
    <intent-filter>
        <action  android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
    </intent-filter/>
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter/>
</activity/>
```

Create a class named `FirebaseMessagingService.java` and add the following code.

```java
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.marketo.Marketo;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

   @Override
   public void onNewToken(String token) {
       super.onNewToken(token);
       Marketo marketoSdk = Marketo.getInstance(this.getApplicationContext());
       marketoSdk.setPushNotificationToken(token);
   }

   @Override
   public void onMessageReceived(RemoteMessage remoteMessage) {
       Marketo marketoSdk = Marketo.getInstance(this.getApplicationContext());
       marketoSdk.showPushNotification(remoteMessage);
   }
}
```

Enable permissions in the Xcode project to send push notifications to the user's device.

To send push notifications, [add Push Notifications](push-notifications.md).

To set up iOS push notifications, create PushNotifications.tsx and add the following code.

```javascript
import { NativeModules } from 'react-native';
const { RNMarketoModule } = NativeModules;

const requestPermission = (): Promise<boolean> => {
return RNMarketoModule.requestPermission()
.then((granted: boolean) => {
console.log('Permission granted:', granted);
return granted;
})
.catch((error: any) => {
console.error('Permission error:', error);
throw error;
});
};

const registerForRemoteNotifications = (): void => {
RNMarketoModule.registerForRemoteNotifications();
};

export { requestPermission, registerForRemoteNotifications };
```

Add the following code to `App.tsx` to allow push notifications.

```javascript
import React, { useEffect } from 'react';

useEffect(() => {
requestPermission().then(granted => {
if (granted) {
registerForRemoteNotifications();
}
});
}, []);
```

Update `AppDelegate.mm` with the APNS delegate methods.

```objectivec
#import "AppDelegate.h"
#import "MktoBridge.h"
#import <MarketoFramework/Marketo.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MyNewApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center
      willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{
    completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
    [[Marketo sharedInstance] userNotificationCenter:center
                      didReceiveNotificationResponse:response
                               withCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    // Register the push token with Marketo
    [[Marketo sharedInstance] registerPushDeviceToken:deviceToken];
}

- (void)applicationWillTerminate:(UIApplication *)application {
    [[Marketo sharedInstance] unregisterPushDeviceToken];
}

-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
  NSLog(@"Failed to register for remote notification - %@", [error userInfo]);
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
```

### Add Test Devices

**Android**

Add "MarketoActivity" to `AndroidManifest.xml` inside the application tag.

```xml
<activity android:name="com.marketo.MarketoActivity" android:configChanges="orientation|screenSize" android:exported="true">
    <intent-filter android:label="MarketoActivity">
        <action  android:name="android.intent.action.VIEW"/>
        <category  android:name="android.intent.category.DEFAULT"/>
        <category  android:name="android.intent.category.BROWSABLE"/>
        <data android:host="add_test_device" android:scheme="mkto"/>
    </intent-filter/>
</activity/>
```

**iOS**

1. Select Project > Target > Info > URL Types.

1. Add the identifier $\{PRODUCT_NAME}.

1. Set URL Schemes to `mkto-S_ecret Key_`.

1. Add `application:openURL:sourceApplication:annotation:` to the `AppDelegate.m` file for Objective-C.

**iOS - Handle Custom Url Type/Deeplinks in AppDelegate**

```objectivec
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary *)options{

    return [[Marketo sharedInstance] application:app
                                         openURL:url
                                         options:options];
}
```

Create constant files and add the following constants for JavaScript API calls.

```objectivec
// Lead attributes.
static NSString *const KEY_FIRST_NAME = @"firstName";
static NSString *const KEY_LAST_NAME = @"lastName";
static NSString *const KEY_ADDRESS = @"address";
static NSString *const KEY_CITY = @"city";
static NSString *const KEY_STATE = @"state";
static NSString *const KEY_COUNTRY = @"country";
static NSString *const KEY_GENDER = @"gender";
static NSString *const KEY_EMAIL = @"email";
static NSString *const KEY_TWITTER = @"twitterId";
static NSString *const KEY_FACEBOOK = @"facebookId";
static NSString *const KEY_LINKEDIN = @"linkedinId";
static NSString *const KEY_LEAD_SOURCE = @"leadSource";
static NSString *const KEY_BIRTHDAY = @"dateOfBirth";
static NSString *const KEY_FACEBOOK_PROFILE_URL = @"facebookProfileURL";
static NSString *const KEY_FACEBOOK_PROFILE_PIC = @"facebookPhotoURL";

// Custom actions
static NSString *const KEY_ACTION_TYPE = @"actionType";
static NSString *const KEY_ACTION_DETAILS = @"actionDetails";
static NSString *const KEY_ACTION_LENGTH = @"setLength";
static NSString *const KEY_ACTION_METRIC = @"setMetric";

//Secure Signature
static NSString *const KEY_ACCESSKEY = @"accessKey";
static NSString *const KEY_SIGNATURE = @"signature";
static NSString *const KEY_TIMESTAMP = @"timeStamp";
```

Use the constants as shown in the following example.

```javascript
//You can create a Marketo Lead by calling the associateLead function.
RNMarketoModule.associateLead({ email: "", firstName: "", lastName:"", city:""})
```
