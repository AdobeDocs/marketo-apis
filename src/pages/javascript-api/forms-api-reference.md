---
title: Forms API Reference
description: "Comprehensive reference for Marketo Forms 2.0 API, detailing MktoForms2 and Form methods, parameters, callbacks, and returns for loading and rendering forms."
---

# Forms API Reference

The Forms 2.0 API provides two main objects: `MktoForms2` and `Form`.

`MktoForms2` is the top-level public namespace for Forms2 functionality. It contains functions that create, load, and retrieve `Form` objects.

## MktoForms2 Methods

table
  tbody
    tr valign="top"
      tdstrongMethod/strong/td
      tdstrongDescription/strong/td
      tdstrongParameters/strong/td
      tdstrongReturns/strong/td
    /tr
    tr valign="top"
      td.loadForm(baseUrl, munchkinId, formId, callback)/td
      tdLoads a form descriptor from Marketo servers and creates a new Form object./td
      td baseUrl(String) - URL to the Marketo server instance for your subscription/td
      tdundefined/td
    /tr
    tr
      td/td
      td/td
      tdmunchkinId (String) -Munchkin ID of the subscription/td
      td/td
    /tr
    tr
      td/td
      td/td
      tdformId (String or Number) - The form version id (Vid) of the form to load/td
      td/td
    /tr
    tr
      td/td
      td/td
      tdcallback (optional) (Function) - A callback function to pass the constructed Form object to once it has been loaded and initialized./td
      td/td
    /tr
    tr valign="top"
      td.lightbox(form, opts)/td
      tdRenders a lightbox style modal dialog with the Form object in it./td
      tdform (Form Object) - An instance of a Form object that you want to have rendered in a lightbox./td
      tdA lightbox object with .show() and .hide() methods./td
    /tr
    tr
      td/td
      td/td
      tdopts (optional)(Object) - An object of options passed to the lightbox object/td
      td/td
    /tr
    tr
      td/td
      td/td
      tdonSuccess(Function) - A callback that is triggered when the form is submitted./td
      td/td
    /tr
    tr
          td/td
      td/td
      tdcloseBtn(Boolean) default true - Controls if a close button (X) is displayed on the lightbox dialog./td
      td/td
    /tr
    tr valign="top"
      td.newForm(formData, callback)/td
      tdCreates a new Form object from a Form Descriptor JS object. Adds a callback function that is called once all stylesheets and known lead information has been fetched and the Form object has been created./td
      tdformData (Form Descriptor Object) - A form descriptor object, as created by the Marketo Forms V2 Editor/td
      tdundefined/td
    /tr
    tr
      td/td
      td/td
      tdcallback (optional)(Function) - This callback is called with a single argument, a newly created instance of Form object./td
      td/td
    /tr
    tr valign="top"
      td.getForm(formId)/td
      tdGets a previously created Form object by form identifier/td
      td formId (Number or String) - Form Vid Identifier./td
      tdForm Object/td
    /tr
    tr valign="top"
      td.allForms()/td
      tdFetches an array of all form objects that have been previously constructed on the page./td
      tdn/a/td
      tdArray of Form Object/td
    /tr
    tr valign="top"
      td.getPageFields()/td
      tdGets a JS object containing data from the url and referrer that may be interesting for tracking purposes./td
      tdn/a/td
      tdObject/td
    /tr
    tr valign="top"
      td.whenReady(callback)/td
      tdAdds a callback that is called exactly once for each form on the page that becomes "ready". Readiness means that the form exists, has been initially rendered and had its initial callbacks called. If there is already a form that is ready at the time this function is called, the passed callback is called immediately./td
      tdcallback(Function) - The callback is passed a single argument, a form object./td
      tdMktoForms2 Object/td
    /tr
    tr valign="top"
      td.onFormRender(callback)/td
      tdAdds a callback that is called every time any form on the page renders. Forms are rendered when initially created, then again every time that visibility rules alter the structure of the form./td
      tdcallback (Function) - The callback is passed a single argument, the form object of the form that was rendered./td
      tdMktoForms2 Object/td
    /tr
    tr valign="top"
      td.whenRendered(callback)/td
      tdLike onFormRender, this adds a callback that is called every time a form is rendered. Additionally, this also calls the callback immediately for all forms that have already been rendered./td
      tdcallback(Function) - The callback is passed a single argument, the form object of the rendered form./td
      td/td
    /tr
/table

## Form Methods

table
  tbody
    tr valign="top"
      tdstrongMethod/strong/td
      tdstrongDescription/strong/td
      tdstrongParameters/strong/td
      tdstrongReturns/strong/td
    /tr
    tr valign="top"
      td.render(formElem)/td
      tdRenders a form object, returning a jQuery object wrapping a form element that contains the form. If passed a formElem, it will use that as the form element, otherwise it will create a new one./td
      tdformElem (optional) - A jQuery object-wrapped form element into which to render./td
      td A jQuery object-wrapped form element containing the rendered form./td
    /tr
    tr valign="top"
      td.getId()/td
      tdGets the id of the form./td
      tdn/a/td
      tdNumber - The id of the form object that this form represents/td
    /tr
    tr valign="top"
      td.getFormElem()/td
      tdGets the jQuery wrapped form element of a rendered form./td
      tdn/a/td
      tdA jQuery object-wrapped form element or null if the form has not been rendered with the render() method yet./td
    /tr
    tr valign="top"
      td.validate()/td
      tdForces the form to validate, highlighting any errors that may exist and returning the result. Does not submit the form./td
      tdn/a/td
      tdBoolean - Returns true if all the validators on the form passed, false otherwise./td
    /tr
    tr valign="top"
      td.onValidate(callback)/td
      tdAdds a validation callback that will be called anytime validation is triggered./td
      tdcallback(Function) - A callback that will be triggered any time that validation occurs. The callback will be passed one parameter, a boolean stating if the validation had succeeded./td
      tdForm Object - The same form object on which the method was called, for chaining purposes./td
    /tr
    tr valign="top"
      td.submit()/td
      tdTriggers the form's submit event. This will start the from submit flow, performing validation, firing any onSubmit events, submitting the form, and firing any onSuccess events if form submission was successful./td
      tdn/a/td
      tdForm Object - The same form object on which the method was called, for chaining purposes./td
    /tr
    tr valign="top"
      td.onSubmit(callback)/td
      tdAdds a callback that will be called when the form is submitted. This is fired when the submission begins, before the success/failure of the request is known./td
      tdcallback - A function that will be called when the form is submitted. This callback will be passed one argument, this Form object./td
      tdForm Object - The same form object on which the method was called, for chaining purposes./td
    /tr
    tr valign="top"
      td.onSuccess(callback)/td
      tdAdds a callback that will be called when the form has been successfully submitted but before the lead is forwarded to the follow up page. Can be used to prevent the lead from being forwarded to the follow up page after successful submission./td
      tdcallback - A function that will be called when the form has been successfully submitted. This callback will be passed two arguments. A JS Object containing the values that were submitted and a String url of the follow up page that the user will be forwarded to, or null or empty string if there is no configured follow up page. Special behavior: If this callback returns `false` (measured using ===) then the visitor will NOT be forwarded to the follow up page and the page will NOT be reloaded. This allows the implementor to do extra processing to the follow up url, or to take action on page using JavaScript instead of leaving the page./td
      tdForm Object - The same form object on which the method was called, for chaining purposes./td
    /tr
    tr valign="top"
      td.submittable(canSubmit) emalso available as:/em em.submitable(canSubmit)/em/td
      tdGets or sets whether the form can be submitted. If called with no arguments, it gets the value, if called with one argument it sets the value.This can be used to prevent a form from being submitted while other criteria outside of the normal form must be fulfilled./td
      tdcanSubmit (optional)(Boolean) - Sets the form to be submittable or non submittable./td
      tdBoolean or Form Object - If called with no arguments, returns a boolean indicating if the form is submittable. If called with one argument, returns this Form Object for chaining purposes. /td
    /tr
    tr valign="top"
      td.allFieldsFilled()/td
      tdReturns true if all the fields in the form have non-blank values set./td
      tdn/a/td
      tdBoolean - True if all fields have non-blank/empty/unset/null values, false otherwise./td
    /tr
    tr valign="top"
      td.setValues(vals)/td
      tdSets values on one or more fields in the form./td
      tdvals - A JS Object. For each key/value pair in the object, the form field named key will be set to value./td
      tdundefined/td
    /tr
    tr valign="top"
      td.getValues()/td
      tdGets all the values of all the fields in the form./td
      tdn/a/td
      tdObject - A JS Object containing key/value pairs representing the names and values of the fields in the form./td
    /tr
    tr valign="top"
      td.addHiddenFields(values)/td
      tdAdds input type=hidden fields to the form./td
      tdvalues - A JS Object containing key/value pairs representing the names and values of the hidden fields to add to the form./td
      tdundefined/td
    /tr
    tr valign="top"
      td.vals(values)/td
      tdjQuery style .vals() setter/getter. If called with no arguments, is equivalent to calling getValues(). If called with one argument, is equivalent to calling setValues()/td
      tdvalues (optional) - Object/td
      tdundefined/td
    /tr
    tr valign="top"
      td.showErrorMessage(msg, elem)/td
      tdShows an error message, pointing at elem./td
      tdmsg (String of HTML) - A string containing the text of the error you want to show./td
            tdForm Object - This Form object, for chaining./td
    /tr
    tr
      td/td
      td/td
      tdelem (optional)(jQuery Object)- The element for the error to point to. If unset, the form's submit button is used./td
td/td
    /tr
  /tbody
/table
