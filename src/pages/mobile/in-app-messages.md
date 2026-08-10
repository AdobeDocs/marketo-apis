---
title: In-App Messages
description: "Set up Marketo In-App Messages with the Mobile SDK, configure custom event triggers, track tap activity, and fix first app open initialization issues."
---

# In-App Messages

Complete these steps to use Marketo in-app messaging:

1. Install the Marketo Mobile SDK as described in the [Mobile Installation](installation.md).
1. Add your mobile app to Marketo as described in [Add a Mobile App](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app).
1. Optional: Add code to your mobile app to capture [Custom Actions](custom-actions.md).

After you install the Marketo Mobile SDK and add your app to Marketo, you can send in-app messages that appear when a user opens your app.

By default, in-app messages are triggered when the app opens. To trigger a message for another event, such as viewing a specific page or selecting a specific button, add a custom action to your code. See [Custom Actions](custom-actions.md) for code samples.

## Troubleshooting

**In-App Message is Not Showing Up**

Marketo responds to app triggers only after the Marketo Mobile SDK is initialized with the Marketo Platform. Initialization occurs when you install and open the app for the first time.

Because initialization occurs after the first app open, the "App Open" event is not triggered until you open the app a second time. Close and reopen the app. A message triggered by App Open should then appear on your device.

Custom events are triggered by user interaction after the app is open. Custom events are recognized by Marketo during the first session.

**In-App Tap Activity Tracking**

To track tap activities and base display frequency on the number of taps, assign an action other than "dismiss" to a primary or secondary button.

For more information, see [In-App Messages](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/in-app-messages/creating-in-app-messages/create-an-in-app-message) in the product documentation.
