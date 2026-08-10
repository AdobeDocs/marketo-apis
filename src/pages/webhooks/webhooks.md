---
title: Webhooks
description: "Learn how to configure Marketo webhooks to call third-party services, set payload templates, encoding, response mappings, tokens, custom headers, and tips."
---

# Webhooks

Marketo webhooks communicate with third-party web services. A webhook uses the GET or POST HTTP verb to send data to or retrieve data from a specific URL.

For instructions on creating a webhook and adding it to a Smart Campaign, see:

- [Create a Webhook](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/additional-integrations/create-a-webhook)
- [Call Webhook](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/flow-actions/call-webhook)
- [Use a Webhook in a Smart Campaign](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/flow-actions/use-a-webhook-in-a-smart-campaign)

Configure each webhook with these properties:

- **URL** - The URL to which you submit the web service request.
- **Request Type** - The HTTP method.
- **Payload Template** - The template for information sent in the POST body. Use any data format that supports HTTP POST, including XML and JSON. The serialization format must allow double quotes around strings. To insert a token, select **Insert Token**. Marketo automatically encloses string-type tokens in double quotes.
- **Request Token Encoding** - The request format, JSON or Form/Url, used to encode token values that include special characters such as an ampersand, '&'. Select the correct body encoding so that the webhook communicates with the web service correctly.
- **Response Type** - The response format, JSON or XML. Select the correct type to map response properties to lead fields in Marketo.
- **Custom Headers** - Key-Value pairs added as HTTP Headers through **Webhooks Actions** > **Set Custom Header**. You can add any number of custom headers.

Use [Response Mappings](response-mappings.md) to write data from web service responses back to leads.

## Tokens

All outgoing webhook fields, including URL, Template, and Custom Headers, populate token content in the same context as the flow step.

Lead and System tokens are always available. Trigger, Campaign, and Program tokens are available in their respective scopes. For more information, see:

- [Tokens Overview](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/landing-pages/personalizing-landing-pages/tokens-overview)
- [System Tokens Glossary](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/using-tokens/system-tokens-glossary)
- [Tokens for Interesting Moments](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/marketo-sales-insight/msi-for-salesforce/features/tabs-in-the-msi-panel/interesting-moments/trigger-tokens-for-interesting-moments)

For example, when a Program or Campaign maps to a third-party resource, set an ID at the Program level as a `My Token`. Then pass the ID into the webhook request as a token.

## Custom Headers

Webhooks can send any number of Custom Header fields with an outgoing request. Add headers through **Webhooks Actions** > **Set Custom Header**.

Each header is a Key-Value pair and can contain tokens.

![Custom Headers](assets/custom-headers.png)

## Tips

- Use the Call Webhook flow step only in Trigger campaigns.
- Response mappings update a record only when the web service returns a 2xx HTTP response code.
- You can use web services to perform custom data enrichment, validation, or normalization from internal or external services.
- Webhook execution time depends on the response time of the service and can cause long campaign execution delays. Even if a service takes only 50ms to execute, 100,000 executions take 1.5 hours.
- Marketo waits up to 30 seconds for a given service call before terminating the call (also known as timing out).
- Marketo passes characters in the URL field as written. For example, '&' is sent as '&', and '%26' is sent as '%26'.
  - To send a percent-encoded character to the recipient server, explicitly pass the string that represents that character.
