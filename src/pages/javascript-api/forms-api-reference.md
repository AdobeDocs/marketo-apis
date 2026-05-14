---
title: Forms API Reference
description: "Comprehensive reference for Marketo Forms 2.0 API, detailing MktoForms2 and Form methods, parameters, callbacks, and returns for loading and rendering forms."
---

# Forms API Reference

There are two main objects that you will interact with using the Forms 2.0 API. The `MktoForms2` object and the `Form` object. The `MktoForms2` object is the top-level publicly visible namespace for Forms2 functionality and contains functions to create, load, and fetch Form objects.

## MktoForms2 Methods

<table>
  <tbody>
    <tr valign="top">
      <td><strong>Method</strong></td>
      <td><strong>Description</strong></td>
      <td><strong>Parameters</strong></td>
      <td><strong>Returns</strong></td>
    </tr>
    <tr valign="top">
      <td>.loadForm(baseUrl, munchkinId, formId, callback)</td>
      <td>Loads a form descriptor from Marketo servers and creates a new Form object.</td>
      <td> baseUrl(String) - URL to the Marketo server instance for your subscription</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>munchkinId (String) -Munchkin ID of the subscription</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>formId (String or Number) - The form version id (Vid) of the form to load</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>callback (optional) (Function) - A callback function to pass the constructed Form object to once it has been loaded and initialized.</td>
      <td></td>
    </tr>
    <tr valign="top">
      <td>.lightbox(form, opts)</td>
      <td>Renders a lightbox style modal dialog with the Form object in it.</td>
      <td>form (Form Object) - An instance of a Form object that you want to have rendered in a lightbox.</td>
      <td>A lightbox object with .show() and .hide() methods.</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>opts (optional)(Object) - An object of options passed to the lightbox object</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>onSuccess(Function) - A callback that is triggered when the form is submitted.</td>
      <td></td>
    </tr>
    <tr>
          <td></td>
      <td></td>
      <td>closeBtn(Boolean) default true - Controls if a close button (X) is displayed on the lightbox dialog.</td>
      <td></td>
    </tr>
    <tr valign="top">
      <td>.newForm(formData, callback)</td>
      <td>Creates a new Form object from a Form Descriptor JS object. Adds a callback function that is called once all stylesheets and known lead information has been fetched and the Form object has been created.</td>
      <td>formData (Form Descriptor Object) - A form descriptor object, as created by the Marketo Forms V2 Editor</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>callback (optional)(Function) - This callback is called with a single argument, a newly created instance of Form object.</td>
      <td></td>
    </tr>
    <tr valign="top">
      <td>.getForm(formId)</td>
      <td>Gets a previously created Form object by form identifier</td>
      <td> formId (Number or String) - Form Vid Identifier.</td>
      <td>Form Object</td>
    </tr>
    <tr valign="top">
      <td>.allForms()</td>
      <td>Fetches an array of all form objects that have been previously constructed on the page.</td>
      <td>n/a</td>
      <td>Array of Form Object</td>
    </tr>
    <tr valign="top">
      <td>.getPageFields()</td>
      <td>Gets a JS object containing data from the url and referrer that may be interesting for tracking purposes.</td>
      <td>n/a</td>
      <td>Object</td>
    </tr>
    <tr valign="top">
      <td>.whenReady(callback)</td>
      <td>Adds a callback that is called exactly once for each form on the page that becomes "ready". Readiness means that the form exists, has been initially rendered and had its initial callbacks called. If there is already a form that is ready at the time this function is called, the passed callback is called immediately.</td>
      <td>callback(Function) - The callback is passed a single argument, a form object.</td>
      <td>MktoForms2 Object</td>
    </tr>
    <tr valign="top">
      <td>.onFormRender(callback)</td>
      <td>Adds a callback that is called every time any form on the page renders. Forms are rendered when initially created, then again every time that visibility rules alter the structure of the form.</td>
      <td>callback (Function) - The callback is passed a single argument, the form object of the form that was rendered.</td>
      <td>MktoForms2 Object</td>
    </tr>
    <tr valign="top">
      <td>.whenRendered(callback)</td>
      <td>Like onFormRender, this adds a callback that is called every time a form is rendered. Additionally, this also calls the callback immediately for all forms that have already been rendered.</td>
      <td>callback(Function) - The callback is passed a single argument, the form object of the rendered form.</td>
      <td></td>
    </tr>
</table>

## Form Methods

<table>
  <tbody>
    <tr valign="top">
      <td><strong>Method</strong></td>
      <td><strong>Description</strong></td>
      <td><strong>Parameters</strong></td>
      <td><strong>Returns</strong></td>
    </tr>
    <tr valign="top">
      <td>.render(formElem)</td>
      <td>Renders a form object, returning a jQuery object wrapping a form element that contains the form. If passed a formElem, it will use that as the form element, otherwise it will create a new one.</td>
      <td>formElem (optional) - A jQuery object-wrapped form element into which to render.</td>
      <td> A jQuery object-wrapped form element containing the rendered form.</td>
    </tr>
    <tr valign="top">
      <td>.getId()</td>
      <td>Gets the id of the form.</td>
      <td>n/a</td>
      <td>Number - The id of the form object that this form represents</td>
    </tr>
    <tr valign="top">
      <td>.getFormElem()</td>
      <td>Gets the jQuery wrapped form element of a rendered form.</td>
      <td>n/a</td>
      <td>A jQuery object-wrapped form element or null if the form has not been rendered with the render() method yet.</td>
    </tr>
    <tr valign="top">
      <td>.validate()</td>
      <td>Forces the form to validate, highlighting any errors that may exist and returning the result. Does not submit the form.</td>
      <td>n/a</td>
      <td>Boolean - Returns true if all the validators on the form passed, false otherwise.</td>
    </tr>
    <tr valign="top">
      <td>.onValidate(callback)</td>
      <td>Adds a validation callback that will be called anytime validation is triggered.</td>
      <td>callback(Function) - A callback that will be triggered any time that validation occurs. The callback will be passed one parameter, a boolean stating if the validation had succeeded.</td>
      <td>Form Object - The same form object on which the method was called, for chaining purposes.</td>
    </tr>
    <tr valign="top">
      <td>.submit()</td>
      <td>Triggers the form's submit event. This will start the from submit flow, performing validation, firing any onSubmit events, submitting the form, and firing any onSuccess events if form submission was successful.</td>
      <td>n/a</td>
      <td>Form Object - The same form object on which the method was called, for chaining purposes.</td>
    </tr>
    <tr valign="top">
      <td>.onSubmit(callback)</td>
      <td>Adds a callback that will be called when the form is submitted. This is fired when the submission begins, before the success/failure of the request is known.</td>
      <td>callback - A function that will be called when the form is submitted. This callback will be passed one argument, this Form object.</td>
      <td>Form Object - The same form object on which the method was called, for chaining purposes.</td>
    </tr>
    <tr valign="top">
      <td>.onSuccess(callback)</td>
      <td>Adds a callback that will be called when the form has been successfully submitted but before the lead is forwarded to the follow up page. Can be used to prevent the lead from being forwarded to the follow up page after successful submission.</td>
      <td>callback - A function that will be called when the form has been successfully submitted. This callback will be passed two arguments. A JS Object containing the values that were submitted and a String url of the follow up page that the user will be forwarded to, or null or empty string if there is no configured follow up page. Special behavior: If this callback returns `false` (measured using ===) then the visitor will NOT be forwarded to the follow up page and the page will NOT be reloaded. This allows the implementor to do extra processing to the follow up url, or to take action on page using JavaScript instead of leaving the page.</td>
      <td>Form Object - The same form object on which the method was called, for chaining purposes.</td>
    </tr>
    <tr valign="top">
      <td>.submittable(canSubmit) <em>also available as:</em> <em>.submitable(canSubmit)</em></td>
      <td>Gets or sets whether the form can be submitted. If called with no arguments, it gets the value, if called with one argument it sets the value.This can be used to prevent a form from being submitted while other criteria outside of the normal form must be fulfilled.</td>
      <td>canSubmit (optional)(Boolean) - Sets the form to be submittable or non submittable.</td>
      <td>Boolean or Form Object - If called with no arguments, returns a boolean indicating if the form is submittable. If called with one argument, returns this Form Object for chaining purposes. </td>
    </tr>
    <tr valign="top">
      <td>.allFieldsFilled()</td>
      <td>Returns true if all the fields in the form have non-blank values set.</td>
      <td>n/a</td>
      <td>Boolean - True if all fields have non-blank/empty/unset/null values, false otherwise.</td>
    </tr>
    <tr valign="top">
      <td>.setValues(vals)</td>
      <td>Sets values on one or more fields in the form.</td>
      <td>vals - A JS Object. For each key/value pair in the object, the form field named key will be set to value.</td>
      <td>undefined</td>
    </tr>
    <tr valign="top">
      <td>.getValues()</td>
      <td>Gets all the values of all the fields in the form.</td>
      <td>n/a</td>
      <td>Object - A JS Object containing key/value pairs representing the names and values of the fields in the form.</td>
    </tr>
    <tr valign="top">
      <td>.addHiddenFields(values)</td>
      <td>Adds input type=hidden fields to the form.</td>
      <td>values - A JS Object containing key/value pairs representing the names and values of the hidden fields to add to the form.</td>
      <td>undefined</td>
    </tr>
    <tr valign="top">
      <td>.vals(values)</td>
      <td>jQuery style .vals() setter/getter. If called with no arguments, is equivalent to calling getValues(). If called with one argument, is equivalent to calling setValues()</td>
      <td>values (optional) - Object</td>
      <td>undefined</td>
    </tr>
    <tr valign="top">
      <td>.showErrorMessage(msg, elem)</td>
      <td>Shows an error message, pointing at elem.</td>
      <td>msg (String of HTML) - A string containing the text of the error you want to show.</td>
            <td>Form Object - This Form object, for chaining.</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>elem (optional)(jQuery Object)- The element for the error to point to. If unset, the form's submit button is used.</td>
<td></td>
    </tr>
  </tbody>
</table>
