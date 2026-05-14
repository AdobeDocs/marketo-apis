---
title: Custom Actions
description: "Learn to send and report custom actions with the Marketo Mobile SDK for iOS and Android, queue offline, trigger Smart Campaigns, and meet the 20-character…"
---

# Custom Actions

You can track user interaction by sending custom actions. When your mobile app calls into the Marketo SDK to send a custom action, the custom action is initially saved to the device. The Marketo SDK then checks to see if there is adequate internet connectivity before sending out the custom action. As a result, there can be a delay between the time the custom action is sent, and the time it is received by Marketo.

Custom actions can be used as triggers and filters in Smart Campaigns. For more information, see [Mobile App Activity](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/flow-actions/triggers-and-filters-for-mobile-smart-campaigns).

## Sending Custom Actions on iOS

Send custom action.

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

Send custom action with metadata.

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

Report all actions immediately (send all saved actions).

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

1. Send custom action.

    ```
    Marketo.reportAction("Login", null);
    ```

1. Send custom action with metadata.

    ```
    MarketoActionMetaData meta = new MarketoActionMetaData();
    meta.setActionType("Shopping");
    meta.setActionDetails("RedShirt");
    meta.setActionLength("20");
    meta.setActionMetric("30");

    Marketo.reportAction("Bought Shirt", meta);
    ```

1. Report all custom actions immediately (send all saved actions).

    ```
    Marketo.reportAll();
    ```

## Troubleshooting Custom Actions

Setting up mobile custom actions is straightforward, but there are restrictions as to the number characters you can send from the Mobile SDK to Marketo. Ensure that all of your custom actions that report back to Marketo through the mobile SDK are fewer than 20 characters long.

**Note on multi-user use cases on a shared device:** When a user logs into a mobile app integrated with Marketo SDK, the first call is made to associate the lead with the app install. After this call successfully completes, further user activities in the app can be seen in the lead's activity log. Note, as this is an asynchronous call if there are any custom actions logged immediately after login they may get associated with the user that was previously logged in until the associate call succeeds.
