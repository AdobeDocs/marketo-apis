---
title: In-App Messages
description: "Set up Marketo In-App Messages with the Mobile SDK, configure custom event triggers, track tap activity, and fix first app open initialization issues."
---

# In-App Messages

To use the In-App messaging capabilities from Marketo, you must perform the following steps:

1. Install the Marketo Mobile SDK as described in the [Mobile Installation](installation.md).
1. Add your mobile app to Marketo as described in [Add a Mobile App](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/admin/add-a-mobile-app).
1. Optionally, add code to your mobile app to capture [Custom Actions](custom-actions.md).

Once you have installed the Marketo Mobile SDK, and completed adding your app in Marketo, you are ready to send In-App messages that display when a user opens your app.

By default, in-app messages are triggered when your app opens. If you want to trigger in-app messages for other events, such as when a specific page is viewed, or when a specific button is pushed, you must add custom actions to your code. See [Custom Actions](custom-actions.md) section for code samples of this.

## Troubleshooting

**In-App Message is Not Showing Up**

Marketo responds to triggers from apps only after the Marketo Mobile SDK is initialized with the Marketo Platform. The initialization process occurs when you install and open the app for the first time. Since initialization occurs after the first app open, the "App Open" event is not triggered until the app is opened a second time. Close the app and open it again, and a message triggered by App Open should appear on your device.

Custom events are triggered by user interaction after the app is open. Custom events are recognized by Marketo during the first session.

**In-App Tap Activity Tracking**

Make sure to assign an action besides "dismiss" to one of the primary or secondary buttons to track tap activities and to use base display frequencies based on the number of taps.

For additional information, see the [In-App Messages](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/mobile-marketing/in-app-messages/creating-in-app-messages/create-an-in-app-message) section in our product documentation.
