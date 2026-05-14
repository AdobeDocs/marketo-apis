---
title: Marketo Objects
description: "Guide to using Marketo Velocity with Leads, Opportunities, and Custom Objects, loading fields, top 10 list access, SFDC relationships, and $TriggerObject."
---

# Marketo Objects

Marketo's Velocity implementation can operate on data from several sources within Marketo: Leads, Opportunities, Custom Objects, Mobile App, Mobile App Installation.

## Loading Fields

To load a field for use in a script, that field must be checked under the corresponding list in the script token editor.

If you do not load a field and it is referenced within the script, then script execution fails at runtime. You can drag and drop fields from the field menu into the script. This enables them for loading, and adds a reference to the field at the cursor.

## Opportunity and Custom Object Lists

When retrieving from Opportunities or Custom Objects, only the 10 most recently updated objects of a type are loaded. The number of Custom Objects available can be increased by following the steps described here. These are given as a list, with the name of `<objectName>List` and are ordered from most to least recently updated record. So, to access the Amount field from the opportunity which was most recently updated, you would use the following:

`${OpportunityList.get(0).Amount}`

In this example, you reference the OpportunityList object, use the get method to access the record indexed at 0, and then retrieve the Amount property from the returned object. If you drag a field from an Opportunity or Custom Object into the editor, it will automatically retrieve the field from the record indexed at 0.

## SFDC Custom Object Relationships

To be available for use, an SFDC custom object must have only one relationship to the Marketo lead. Objects are often linked through both the contact and account, so it is important to only sync objects to Marketo with the lead/contact relationship enabled.

## Trigger Objects

When a campaign is triggered via the Added to Opportunity, Opportunity is Updated, or Added to `<Custom Object Name>` triggers, a special variable becomes available in Script Tokens executed within the context of the trigger campaign: `$TriggerObject`(not supported for `<Custom Object Name>` is Updated trigger).  If a token using a `$TriggerObject` reference is used in a batch campaign, the email send will fail, as this object is not available in batch campaigns of any kind.  This is a reference to the object which triggered the campaign. The object contains all of the data which the record has when accessed via a different variable name.

For example, if a campaign was triggered via a Custom Object for a product order, then the order to which lead was added is exposed in the `$TriggerObject` variable. 

Here's a sample script for an order follow-up email:

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

The advantage of using the `$TriggerObject` variable is that you do not need to dedicate any code to determine which of the available objects that you want to pull your local data from.  The object is determined by the triggering action. This is the most explicit way of choosing an object to reference and should be used whenever available and appropriate.

Note: When using the `$TriggerObject`, fields must be checked in the editing pane for the object to be made available to the script.

Note 2: The `$TriggerObject` only works for "Added" triggers and not for "Updated" triggers.
