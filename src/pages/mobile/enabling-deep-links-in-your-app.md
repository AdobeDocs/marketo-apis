---
title: Enabling Deep Links
description: "Learn how to enable deep links in your app for Marketo push messages using custom URI schemes, with iOS, Android, and PhoneGap guidance and best practices."
---

# Enabling Deep Links

Deep linking allows you to redirect people to specific content (resources) within your app. For example, when a person clicks a mobile push message that advertises a purple t-shirt, you can open the app directly to the purple t-shirt content (rather than the home page).

The process works like this:

1. The Marketo user places a custom URI in the Tap Action for their push message.
1. When a person taps the push message on their device, the Marketo MME SDK triggers an event with the custom URI.
1. Your app then processes the event and redirects the person to the proper content within your app.

This requires that you define a custom URI structure for your app; register the scheme within your app's manifest; and then add code to process deep link events and route to the proper location in your app.

For iOS, refer to the Apple documentation on [Defining a Custom URL Scheme for Your App](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app).

For Android, refer to Google documentation on [Enabling Deep Links for App Content](https://developer.android.com/training/app-links/deep-linking).

For PhoneGap apps, deep linking is not as straight forward as with native iOS or Android apps, but there are plugins that enable your hybrid app to respond to deep link custom URL schemes and Universal/App Links on both iOS and Android. Consider [these plugins](https://cordova.apache.org/plugins/?q=deeplink).

When you have enabled deep linking in your app, share your custom URIs with your Marketo users so they can insert them into the Tap Action for push messages.

Marketo uses a predefined URI structure when setting up test devices. Refer to the "Test Devices" section of the [Installation Guide](installation.md) for more information.

## Best Practices for Defining a URI Structure

If your brand has an existing mobile site, best practice is to follow its URL structure for the deep link URI as well. For example, if `https://myappname.com/products/purple-shirt` is your website address for the product in question, then `myappname://products/purple-shirt` would be a good deep link URI structure to use in your app.

Generally, your schemes should be unique to your brand. While there currently are no regulations to make schemes unique worldwide, one way to help ensure that your schemes are unique is to reverse your domain name (for example, `org.companyname`).
