---
title: Enabling Deep Links
description: "Learn how to enable deep links in your app for Marketo push messages using custom URI schemes, with iOS, Android, and PhoneGap guidance and best practices."
---

# Enabling Deep Links

Deep linking directs people to specific content in your app. For example, when a person selects a mobile push message that advertises a purple t-shirt, the app can open the purple t-shirt content instead of the home page.

The process works like this:

1. A Marketo user places a custom URI in the Tap Action for a push message.
1. When a person taps the push message on their device, the Marketo MME SDK triggers an event with the custom URI.
1. Your app processes the event and directs the person to the corresponding content.

To enable this process:

1. Define a custom URI structure for your app.
1. Register the scheme in your app manifest.
1. Add code that processes deep link events and routes people to the corresponding content.

For iOS, see the Apple documentation on [Defining a Custom URL Scheme for Your App](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app).

For Android, see the Google documentation on [Enabling Deep Links for App Content](https://developer.android.com/training/app-links/deep-linking).

For PhoneGap apps, use a plugin to enable your hybrid app to respond to custom URL schemes and Universal/App Links on iOS and Android. See the available [deep-link plugins](https://cordova.apache.org/plugins/?q=deeplink).

When you have enabled deep linking in your app, share your custom URIs with your Marketo users so they can insert them into the Tap Action for push messages.

Marketo uses a predefined URI structure when setting up test devices. For more information, see "Test Devices" in the [Installation Guide](installation.md).

## Best Practices for Defining a URI Structure

If your brand has a mobile site, follow its URL structure when you define the deep link URI. For example, if the product URL is `https://myappname.com/products/purple-shirt`, use `myappname://products/purple-shirt` as the corresponding deep link URI.

Use a scheme that is unique to your brand. Although no regulation requires schemes to be globally unique, you can help create a unique scheme by reversing your domain name, such as `org.companyname`.
