---
title: Custom Actions
description: "Learn to send and report custom actions with the Marketo Mobile SDK for iOS and Android, queue offline, trigger Smart Campaigns, and meet the 20-character…"
---

# Custom Actions

Custom actions track user interactions in your mobile app. When the app calls the Marketo SDK to send a custom action, the SDK first saves the action to the device. The SDK sends the action after it detects adequate internet connectivity, so Marketo might receive the action after a delay.

Custom actions can be used as triggers and filters in Smart Campaigns. For more information, see [Mobile App Activity](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/flow-actions/triggers-and-filters-for-mobile-smart-campaigns).

## Sending Custom Actions on iOS

Send a custom action.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
Marketo *sharedInstance = [Marketo sharedInstance];
[sharedInstance reportAction:@"Login" withMetaData:nil];
```

### Swift

```swift
sharedInstance.reportAction("Login", withMetaData:nil);
```

Send a custom action with metadata.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
MarketoActionMetaData *meta = [[MarketoActionMetaData alloc] init];
[meta setType:@"Shopping"];
[meta setDetails:@"RedShirt"];
[meta setLength:20];
[meta setMetric:30];

[sharedInstance reportAction:@"Bought Shirt" withMetaData:meta];
```

### Swift

```swift
let meta = MarketoActionMetaData()
meta.setType("Shopping");
meta.setDetails("RedShirt");
meta.setLength(20);
meta.setMetric(30);

sharedInstance.reportAction("Bought Shirt", withMetaData:meta);
```

Report all saved actions immediately.

<Tab orientation="horizontal" slots="heading, content" repeat="2" />

### Objective C

```objectivec
[sharedInstance reportAll];
```

### Swift

```swift
sharedInstance.reportAll();
```

## Sending Custom Actions on Android

1. Send a custom action.

    ```
    Marketo.reportAction("Login", null);
    ```

1. Send a custom action with metadata.

    ```
    MarketoActionMetaData meta = new MarketoActionMetaData();
    meta.setActionType("Shopping");
    meta.setActionDetails("RedShirt");
    meta.setActionLength("20");
    meta.setActionMetric("30");

    Marketo.reportAction("Bought Shirt", meta);
    ```

1. Report all saved custom actions immediately.

    ```
    Marketo.reportAll();
    ```

## Troubleshooting Custom Actions

Custom action names sent from the Mobile SDK to Marketo must be fewer than 20 characters.

**Multi-user use cases on a shared device:** When a user logs in to a mobile app that uses the Marketo SDK, the first call associates the lead with the app installation. After the call succeeds, subsequent user activities appear in the lead's activity log.

The association call is asynchronous. Custom actions logged immediately after login might be associated with the previously logged-in user until the call succeeds.
