---
title: Marketo Objects
description: "Guide to using Marketo Velocity with Leads, Opportunities, and Custom Objects, loading fields, top 10 list access, SFDC relationships, and $TriggerObject."
---

# Marketo Objects

Marketo's Velocity implementation can use data from these Marketo sources:

- Leads
- Opportunities
- Custom Objects
- Mobile App
- Mobile App Installation

## Loading Fields

To use a field in a script, select the field under the corresponding list in the script token editor.

If a script references a field that is not loaded, the script fails at runtime. Drag a field from the field menu into the script to load it and add a reference at the cursor.

## Opportunity and Custom Object Lists

For Opportunities and Custom Objects, Marketo loads only the 10 most recently updated objects of each type. You can increase the number of available Custom Objects by following the steps described here.

Marketo provides the objects in a list named `objectNameList`, ordered from the most recently updated record to the least recently updated record. To access the Amount field from the most recently updated opportunity, use:

`${OpportunityList.get(0).Amount}`

This example references the OpportunityList object, uses the get method to access the record at index 0, and retrieves the Amount property from that record.

When you drag an Opportunity or Custom Object field into the editor, Marketo automatically retrieves the field from the record at index 0.

## SFDC Custom Object Relationships

To use an SFDC custom object, the object must have only one relationship to the Marketo lead. Objects are often linked through both the contact and account. Sync only objects that have the lead/contact relationship enabled.

## Trigger Objects

When a campaign uses the Added to Opportunity, Opportunity is Updated, or Added to `Custom Object Name` trigger, the `$TriggerObject` variable is available to Script Tokens that run in the trigger campaign. This variable is not supported for the `Custom Object Name` is Updated trigger.

This variable references the object that triggered the campaign. It contains the same record data that is available when you access the object through another variable name.

Do not use a token that references `$TriggerObject` in a batch campaign. The object is not available in batch campaigns, and the email send fails.

For example, if a Custom Object for a product order triggers a campaign, the `$TriggerObject` variable exposes the order to which the lead was added.

The following example shows a script for an order follow-up email:

```html
<div>
<strong>Your order information:</strong>
##pull information from the Triggering Order and format it in a list
<ul>
<li>Product Ordered: $!{TriggerObject.ProductName}</li>
<li>Product Quantity: $!{TriggerObject.Quanitity}</li>
<li>Shipping Address: $!{TriggerObject.ShippingAddress}</li>
<li>Billing Address: $!{TriggerObject.BillingAddress}</li>
<li>Order Total: $!{TriggerObject.Amount}</li>
</ul>
<p><a href="$!{TriggerObject.OrderURL}">View Your Order Online</a></p>
</div>
```

The triggering action determines the object. You do not need additional code to determine which available object contains the local data. Use `$TriggerObject` when it is available and appropriate because it explicitly identifies the object to reference.

Note: When you use `$TriggerObject`, select the object's fields in the editing pane to make them available to the script.

Note 2: `$TriggerObject` works only for "Added" triggers, not for "Updated" triggers.
