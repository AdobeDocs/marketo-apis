---
title: Advanced Security Access Mode
description: "Learn Advanced Security Access Mode for Marketo Mobile SDK, with HMAC signature generation, server endpoint setup, device ID usage, and iOS and Android examples"
---

# Advanced Security Access Mode

The Marketo SDK exposes methods to set and remove the security signature. There is also a utility method to retrieve the device ID. The device ID should be passed along with the email, upon login, to the customer server for use in calculating the security signature. The SDK should the hit new endpoint, pointing to algorithm listed above, to retrieve the necessary fields to instantiate the signature object. Setting this signature in the SDK is a necessary step if the Security Access Mode has been enabled in Marketo Mobile Admin.

## Secure Access Mode Setup

This setup must be implemented before the Secure Access mode has been enabled via the Marketo Admin > Mobile Apps & Devices page. The following further steps describe the process required to complete the security validation process:

Secure Access mode requires implementing the signature algorithm on the customer server-side that will provide an endpoint to retrieve the access key, calculated signature, expiry timestamp, and email. This algorithm requires the user access key, access secret, email, timestamp, and device id to perform the calculation. The customer is responsible for setting up endpoint, implementing the algorithm to preform signature calculations, and also keep expiration timestamp fresh.

```python
import argparse
import datetime
import hashlib
import hmac


ACCESS_KEY = 'Your Access Key'
ACCESS_SECRET = 'Your access secret'

# Key should not be unicode
def get_signing_key(timestamp):
    return 'MKTO' + ACCESS_SECRET + str(timestamp)

def get_string_to_sign(email, uuid):
    return email + uuid

def get_hmac(key, string_to_sign):
    return hmac.new(key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

def get_epoch_plus_day():
    epoch = datetime.datetime.utcfromtimestamp(0)
    valid_until_dt = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    return long((valid_until_dt - epoch).total_seconds())

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-e", "--email", required=True, help="email address")
    parser.add_argument("-u", "--uuid", required=True, help="Device install id")
    parser.add_argument("-t", "--timestamp", type=int, help="Valid until timestamp")
    args = parser.parse_args()
    string_to_sign = get_string_to_sign(args.email, args.uuid)
    if not args.timestamp:
        valid_until = get_epoch_plus_day()
    else:
        valid_until = args.timestamp
    signing_key = get_signing_key(valid_until)
    hmac_string = get_hmac(signing_key, string_to_sign)
    print 'HMAC is ', hmac_string

```

The Marketo SDK exposes new methods to set and remove the security signature. There is also a utility method to retrieve the device ID. The device ID should be passed along with the email, upon login, to the customer server for use in calculating the security signature. The SDK should the hit new endpoint, pointing to algorithm listed above, to retrieve the necessary fields to instantiate the signature object. Setting this signature in the SDK is a necessary step if the Security Access Mode has been enabled in Marketo Mobile Admin.

### iOS

```objectivec
Marketo * sharedInstance =[Marketo sharedInstance];

// set secure signature
MKTSecuritySignature *signature =
[[MKTSecuritySignature alloc] initWithAccessKey:<ACCESS_KEY> signature:<SIGNATURE_TOKEN> timestamp:<EXPIRY_TIMESTAMP> email:<EMAIL>];
[sharedInstance setSecureSignature:signature];

// remove signature
[sharedInstance removeSecureSignature];

// get device id
[sharedInstance getDeviceId];
```

```swift
let sharedInstance = Marketo.sharedInstance()

 // set secure signature
let signature = MKTSecuritySignature(accessKey: <ACCESS_KEY>, signature: <SIGNATURE_TOKEN> , timestamp: <EXPIRY_TIMESTAMP>, email: <EMAIL>)
sharedInstance.setSecureSignature(signature)

// remove signature
[sharedInstance removeSecureSignature];

// get device id
sharedInstance.getDeviceId()
```

### Android

```java
Marketo sdk = Marketo.getInstance(getApplicationContext());

// set signature
MarketoConfig.SecureMode secureMode = new MarketoConfig.SecureMode();
secureMode.setAccessKey(<ACCESS_KEY>);
secureMode.setEmail(<EMAIL_ADDRESS>);
secureMode.setSignature(<SIGNATURE_TOKEN>);
secureMode.setTimestamp(<EXPIRY_DATE>);
if (secureMode.isValid()) {
  sdk.setSecureSignature(secureMode);
}

// remove signature
sdk.removeSecureSignature();

// get device id
sdk.getDeviceId();
```
