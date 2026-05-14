---
title: Blog Archive
description: "Marketo Developer Blog archive 2014–2023 offering historical posts on Forms 2.0, Zapier, API updates, SOAP deprecation and migration to REST."
---

# Blog Archive

<InlineAlert slots="text" variant="info" />

This is an archive of the Marketo blog, spanning 2014 to 2023. It is provided here as a historical reference only. Some information might be out of date.  Always check the current documentation for the latest functionality.

<InlineAlert slots="text" variant="warning" />

The SOAP API is being deprecated and will no longer be available after July 31, 2026. All new development should be done with the Marketo REST API, and existing services should be migrated by that date to avoid interruptions in service. If you have a service which uses the SOAP API, please consult the [SOAP API Migration Guide](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/migration) for information on how to migrate.

<InlineAlert slots="text" variant="warning" />

Support for authentication using the `access_token` query parameter is being removed on July 31, 2026. If your project uses a query parameter to pass the access token, it should be updated to use the [Authorization header](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/authentication#using-an-access-token) as soon as possible. New development should use the Authorization header exclusively.

## Welcome to the Marketo Developer Blog

Welcome Marketo Developers! We've been quite busy here at Marketo releasing new features to help Marketers be more successful than ever before. Marketers today are supported by a phenomenal developer community. This blog is dedicated to those web developers and software engineers who support the rapidly evolving needs of the modern marketer. As the Marketo Platform evolves we are announcing new integration options and API version updates as they are unleashed. We will also be introducing a new series of how-to articles where we share code samples and best practices on integration with the Marketo Platform. The first article in this series will walk you through how to efficiently retrieve information on the people (customers/contacts/leads) that are stored within Marketo using the API. Please subscribe using the form above to stay up to date. We email you updates as new articles are published.

Posted on _2014-03-06_ by _David_

## January 2014 Release Updates

### Forms 2.0

Forms 2.0 empowers Marketers to create beautiful, stable, and flexible web forms without programming knowledge. In addition to the greatly improved editor, conditional logic and robust design, it's now easier than ever to embed Marketo forms any page of your website. Developers are able to use JavaScript to extend the core functionality; uses cases include:

* Hiding a form after successful submission so the visitor remains on the page after they have filled out the form
* Showing a custom error message on submit based on custom business logic
* Showing the form in a lightbox style dialog box

Developer documentation is available [here](/help/javascript-api/forms-api-reference.md).

### SOAP API version 2_3 now available

* [getLeadChanges:](/help/soap-api/getleadchanges.md) Introduced request field `activityNameFilter`
* [ListOperation:](/help/soap-api/listoperation.md) Removed request field `skipActivityLog`

**Note:** SOAP API revisions are backward compatible

Posted on _2014-01-26_ by _Travis Kaufman_

## Zapier Part II: Marketo Integration Announcement

In a previous post, we discussed how you could use Zapier to integrate external data sources with Marketo. The post presented a hands on approach to building your own Zapier workflow (or "Zap") from scratch to integrate Marketo and other apps. So, you like the idea of using Zapier with Marketo, but need help with getting started? Good news! Zapier has just released a number of example Zaps for Marketo that allow you to get going quickly:

* Capture New Leads
* Nurture Your Customers
* Distribute Contact Information
* React to New Prospects

In addition to these examples, you can browse the [Marketo integrations](https://zapier.com/apps/marketo/integrations) page with hundreds of other apps on Zapier, and build your own automated workflows in minutes. No coding is required. Save time and let automation do your manual work. Get creative. The sky is the limit!

Posted on _2016-06-01_ by _David_

## Retrieving customer and prospect information from Marketo using the API

You can retrieve information about customers and prospects that are stored within Marketo using the `getLead` and [`getMultipleLeads`](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads) SOAP API. It is often desired to extract this information on a recurring basis to keep another system updated as customers and prospect information is updated or new records are created in Marketo. We show you the code sample that would be executed on a recurring basis to poll Marketo for updates. The below diagram depicts the API calls that are made on a set periodic timer. Depending on the use case, the periodic timer could be set to run the below code every 10 minutes.

The first call to [`getMultipleLeads`](https://developer.adobe.com/marketo-apis/api/mapi#tag/Leads) will set the time range, batchSize and which fields are to be returned. All leads within Marketo that were updated in the specified time range will be returned along with a streamPosition when more records are available than the batchSize specified.

**SOAP Request for first call to getMultipleLeads:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:paramsGetMultipleLeads xmlns:ns2="<http://www.marketo.com/mktows/">
  <leadSelector xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ns2:LastUpdateAtSelector">
    <latestUpdatedAt>2014-02-13T11:51:08.710-08:00</latestUpdatedAt>
    <oldestUpdatedAt>2014-02-12T11:51:08.713-08:00</oldestUpdatedAt>
  </leadSelector>
  <batchSize>2</batchSize>
  <includeAttributes>
    <stringItem>FirstName</stringItem>
    <stringItem>LastName</stringItem>
    <stringItem>Email</stringItem>
  </includeAttributes>
</ns2:paramsGetMultipleLeads>
```

**SOAP Response from the first call to getMultipleLeads:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:successGetMultipleLeads xmlns:ns2="<http://www.marketo.com/mktows/">
  <result>
 <returnCount>2</returnCount><remainingCount>24</remainingCount><newStreamPosition>id:1089965:to:1392234668:tl:1392321068:os:2:rc:24</newStreamPosition><leadRecordList>
      <leadRecord>
        <Id>84105</Id>
        <Email>eimang@marketo.com</Email>
        <ForeignSysPersonId xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
        <ForeignSysType xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
        <leadAttributeList xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true">
          <attribute>
            <attrName>FirstName</attrName>
            <attrType>string</attrType>
            <attrValue>French</attrValue>
          </attribute>
          <attribute>
            <attrName>LastName</attrName>
            <attrType>string</attrType>
            <attrValue>Lead</attrValue>
          </attribute>
        </leadAttributeList>
      </leadRecord>
      <leadRecord>
        <Id>1089965</Id>
        <Email>t@t.com</Email>
        <ForeignSysPersonId xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
        <ForeignSysType xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
        <leadAttributeList xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true">
          <attribute>
            <attrName>FirstName</attrName>
            <attrType>string</attrType>
            <attrValue>George</attrValue>
          </attribute>
          <attribute>
            <attrName>LastName</attrName>
            <attrType>string</attrType>
            <attrValue>of the Jungle</attrValue>
          </attribute>
        </leadAttributeList>
      </leadRecord>
    </leadRecordList>
  </result>
</ns2:successGetMultipleLeads>
```

As long as the `<remainingCount/>` value is greater than 0, you make subsequent calls to `getMultipleLeads` to paginate through the rest by passing the `<newStreamPosition/>` value returned in the previous call into the `<streamPosition/>` parameter. **SOAP Request for subsequent call to getMultipleLeads:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:paramsGetMultipleLeads xmlns:ns2="<http://www.marketo.com/mktows/">
  <leadSelector xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ns2:LastUpdateAtSelector">
    <latestUpdatedAt>2014-02-13T11:51:08.710-08:00</latestUpdatedAt>
    <oldestUpdatedAt>2014-02-12T11:51:08.713-08:00</oldestUpdatedAt>
  </leadSelector><streamPosition>id:1089965:to:1392234668:tl:1392321068:os:2:rc:24</streamPosition><batchSize>2</batchSize>
  <includeAttributes>
    <stringItem>FirstName</stringItem>
    <stringItem>LastName</stringItem>
    <stringItem>Email</stringItem>
  </includeAttributes>
</ns2:paramsGetMultipleLeads>
```

This logic continues as long as `<remainingCount/>` is greater than zero. **See below a sample Java program that executes the scenario described above.**

```java
import com.marketo.mktows.\*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

public class GetMultipleLeads {
  public static void main(String[] args) {
    System.out.println("Executing GetMultipleLeads");
        try {
        URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
        String marketoUserId = "CHANGE ME";
        String marketoSecretKey = "CHANGE ME";
        QName serviceName = new QName("<http://www.marketo.com/mktows/>",
        "MktMktowsApiService");
        MktMktowsApiService service = new
        MktMktowsApiService(marketoSoapEndPoint, serviceName);
        MktowsPort port = service.getMktowsApiSoapPort();

        // Create Signature
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        String text = df.format(new Date());
        String requestTimestamp = text.substring(0, 22) + ":" +         text.substring(22);
        String encryptString = requestTimestamp + marketoUserId ;

        SecretKeySpec secretKey = new         SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");

        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(secretKey);
        byte[] rawHmac = mac.doFinal(encryptString.getBytes());
        char[] hexChars = Hex.encodeHex(rawHmac);
        String signature = new String(hexChars);

        // Set Authentication Header
        AuthenticationHeader header = new AuthenticationHeader();
        header.setMktowsUserId(marketoUserId);
        header.setRequestTimestamp(requestTimestamp);
        header.setRequestSignature(signature);

        // Create Request
        ParamsGetMultipleLeads request = new ParamsGetMultipleLeads();

        // Build Request Using LastUpdateAtSelector
        LastUpdateAtSelector leadSelector = new LastUpdateAtSelector();
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTimeInMillis(new Date().getTime());
        gc.add( GregorianCalendar.DAY_OF_YEAR, -20);
        DatatypeFactory factory = DatatypeFactory.newInstance();
        ObjectFactory objectFactory = new ObjectFactory();
        JAXBElement<XMLGregorianCalendar> until =         objectFactory.createLastUpdateAtSelectorLatestUpdatedAt(factory.newXMLGregorianCalendar(gc));

        GregorianCalendar since = new GregorianCalendar();
        since.setTimeInMillis(new Date().getTime());
        since.add( GregorianCalendar.DAY_OF_YEAR, -21);
        leadSelector.setOldestUpdatedAt(factory.newXMLGregorianCalendar(since));
        leadSelector.setLatestUpdatedAt(until);
        request.setLeadSelector(leadSelector);

        ArrayOfString attributes = new ArrayOfString();
        attributes.getStringItems().add("FirstName");
        attributes.getStringItems().add("LastName");
        attributes.getStringItems().add("Email");
        request.setIncludeAttributes(attributes);

        JAXBElement<Integer> batchSize = new
        ObjectFactory().createParamsGetMultipleLeadsBatchSize(2);
        request.setBatchSize(batchSize);

        SuccessGetMultipleLeads result = null;

        int count = 0;

        do {
        if (count > 0) {
        // Set the streamPosition on subsequent calls to paginate
        through large result sets
        String pos = result.getResult().getNewStreamPosition();
        JAXBElement<String> streamPos = new
        ObjectFactory().createParamsGetMultipleLeadsStreamPosition(pos);
        request.setStreamPosition(streamPos);
        }

        JAXBContext context =
        JAXBContext.newInstance(ParamsGetMultipleLeads.class);
        Marshaller m = context.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        System.out.println("REQUEST:");
        m.marshal(request, System.out);
        result = port.getMultipleLeads(request, header);
        System.out.println("RESPONSE:");
        m.marshal(result, System.out);
        count = result.getResult().getReturnCount();
        } while (result.getResult().getRemainingCount() > 0);
        }

        catch(Exception e) {
        // Update to include appropriate retry/error handling
        e.printStackTrace();
        }

  }

}
```

### Tips & Tricks

When extracting large volumes of contacts out of Marketo, it is recommended to tune the API request along the following parameters:

* `<includeAttributes/>`: It is recommended that you only request those fields you are interested in keeping in sync with your system. This reduces the payload of the response and increases query performance.
* `<batchSize/>`: The API supports up to 1000 records to be returned in a single call. Tuning this value down to 500 records also reduces the payload of the response.
* `<LastUpdatedAtSelector/>`: It is recommended to set both the `<oldestUpdatedAt/>` along with the `<latestUpdatedAt/>` parameter to limit the date range. For example, instead of making a single request for a year's worth of data. Break up the API calls to request smaller date ranges.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-03-05_ by _Travis Kaufman_

## February 2014 Release Updates

### SOAP API Update

* [syncMObjects](/help/soap-api/syncmobjects.md): You can now add and update tags and channels for existing programs.

Updates are incorporated into the [2_3 WSDL](http://app.marketo.com/soap/mktows/2_3?WSDL).

Posted on _2014-02-26_ by _Travis Kaufman_

## March 2014 Release Updates

### SOAP API Update

* Performance improvements to [syncLead](/help/soap-api/synclead.md) and [syncMultipleLeads](/help/soap-api/syncmultipleleads.md)

Updates are incorporated into the [2_3 WSDL](http://app.marketo.com/soap/mktows/2_3?WSDL).

Posted on _2014-03-20_ by _Travis Kaufman_

## Merge Anonymous Visitor Activity when Visitor Fills Out Form

In the blog post titled, "Capture Anonymous Visitor Activity Based on Business Logic," we discussed how to create anonymous lead records in Marketo based on custom events. In this blog post, we will build on that post, and associate an anonymous lead record with a known user after you receive the user's contact information. Marketo's [Munchkin tracking code](/help/javascript-api/lead-tracking.md) helps you track visits to your website. The first time someone visits a page on your website that has the Munchkin tracking code, Marketo creates an anonymous lead and uses a browser cookie to track them. Once they identify themselves, they become a known lead and the history associated with their browser cookie is merged in their Marketo lead record. **Anonymous leads are created when someone:**

1. Visits your Marketo landing page for the first time
1. Visits a page that has Munchkin tracking code
1. Click the View as Web Page link in a Marketo email

**An anonymous lead is merged into a new or existing known lead when someone:**

1. Click a link to a Marketo email
1. Fills out a Marketo form
1. Uses one of the techniques below to associate an anonymous lead with a known record.

To submit person data, or associate a browser web-tracking cookie with the corresponding person record in Marketo, use one of the following techniques: **Browser-Side Submission** If your use case requires submission of person data from the browser, you should use background form submission. **Server-Side Submission** If you do not need browser-side submission, the REST API offers many methods for person data submission, and a purpose-built method for associating cookies with person records.

Posted on _2014-04-22_ by _Murta_

## April 2014 Release Updates

### Marketo Forms Security Update

We introduced a limit on the number and frequency of form post submissions from a single IP address. This limit is now enforced at 30 posts per minute to protect our customers from malicious use of programmatic form submissions. The [syncLead API](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/leads/synclead) is the recommended integration vehicle for programmatic submission of new contacts in Marketo.

Posted on _2014-04-29_ by _Travis Kaufman_

## Replace your form post integration with the Marketo API

It is common practice for Marketers using Marketo to associate success for a given marketing campaign based on the # of contacts/leads who have filled out a specific web form. The marketer would simply create a new Marketo form, place it on a landing page and then setup a trigger campaign in Marketo to associate all contacts who filled out that specific form as a success for that Marketing program. (see screenshot below). It is a natural extension to use this same approach when recording program success even when the campaign success resides outside of someone filling out a form. For example, when a marketer executes a promotional offer and the conversion is to call in and schedule an appointment. The prospective customer is not filling out a form at any point in the process. In the below article, we show you how to use the Marketo syncLead API to create a new contact if they are new contacts, and then requestCampaign API to record the success for a given marketing program.

Posted on _1970-01-01_ by _Travis Kaufman_

## Delete a Lead with the Marketo API

Let's say you would like to delete a lead via the Marketo API. You can accomplish this by calling the requestCampaign API on a campaign that has a predefined flow action to delete a lead. We show you first how to create a Smart Campaign, second how to set up a trigger to run a campaign via the API, third how to define deleting a lead as part of a flow action, and fourth a code sample that would be used to execute this campaign. **How to Create a New Smart Campaign in Marketo** Smart Campaigns in Marketo execute all of your marketing activities. In a Smart Campaign, you can set up a series of automated actions to take on a smart list of contacts. In the case of deleting a lead, you set up a trigger in the campaign as shown below. First let's set up the Smart Campaign.

1. In Marketing Activities, choose a Program and then under the New dropdown, click on New Local Asset 1. Click on Smart Campaign
1. Enter the smart campaign name and click Create Add Triggers to a Smart Campaign** Adding Triggers to a Smart Campaign allows you to make a Smart Campaign run on one person at a time based on a live event, which in this case is a request via the requestCampaign API.
1. Search for the "Campaign is Requested" trigger and then drag and drop it to the canvas.
1. In the trigger, select "is" and "Web Service API."

 **How to Create a Delete a Lead Flow Action on a Campaign** Click on Flow in the top menu. From the menu on the right-side, search for Delete Lead, and then drag it to the center to add it as a trigger to the campaign. Note: If you delete a lead from Marketo only and leave it in your CRM, when any of that lead's data is updated, the lead is recreated in Marketo.  **Code Sample to Call the requestCampaign API** After setting up the campaign and triggers in the Marketo interface, we show you how to use the API to run this campaign. The first sample is an XML request, the second is an XML response, and the final one is a Java code sample that can be used to generate the XML request. We also show you how to find the campaign ID that is used when making a call to the requestCampaign API. The API call also requires you to know the ID of the Marketo campaign beforehand. You can determine the campaign ID using either of the following methods:

 1. Use the [getCampaignsForSource](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCampaignsUsingGET) API
 1. Open the Marketo campaign in a browser and look at the URL address bar. The campaign ID (represented as a 4-digit integer) can be found immediately following "SC". For example, `https://app-stage.marketo.com/#SC**1025**A1`. The bolded portion is the campaign ID - "1025." SOAP Request for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809939944BFABAE58E5D27</mktowsUserId><requestSignature>48397ad47b71a1439f13a51eea3137df46441979</requestSignature><requestTimestamp>2013-08-01T12:31:14-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsRequestCampaign>
      <source>MKTOWS</source>
      <campaignId>4496</campaignId>
      <leadList>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>lead@company.com</keyValue>
        </leadKey>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>anotherlead@company.com</keyValue>
        </leadKey>
      </leadList>
    </ns1:paramsRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Response for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successRequestCampaign>
      <result>
        <success>true</success>
      </result>
    </ns1:successRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

See below a sample Java program that executes the scenario described above.

```java
import com.marketo.mktows.*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;


public class RequestCampaign {

    public static void main(String[] args) {
        System.out.println("Executing Request Campaign");
        try {
            URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
            String marketoUserId = "CHANGE ME";
            String marketoSecretKey = "CHANGE ME";

            QName serviceName = new QName("http://www.marketo.com/mktows/", "MktMktowsApiService");
            MktMktowsApiService service = new MktMktowsApiService(marketoSoapEndPoint, serviceName);
            MktowsPort port = service.getMktowsApiSoapPort();

            // Create Signature
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
            String text = df.format(new Date());
            String requestTimestamp = text.substring(0, 22) + ":" + text.substring(22);
            String encryptString = requestTimestamp + marketoUserId ;

            SecretKeySpec secretKey = new SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(encryptString.getBytes());
            char[] hexChars = Hex.encodeHex(rawHmac);
            String signature = new String(hexChars);

            // Set Authentication Header
            AuthenticationHeader header = new AuthenticationHeader();
            header.setMktowsUserId(marketoUserId);
            header.setRequestTimestamp(requestTimestamp);
            header.setRequestSignature(signature);

            // Create Request
            ParamsRequestCampaign request = new ParamsRequestCampaign();

            request.setSource(ReqCampSourceType.MKTOWS);

            ObjectFactory objectFactory = new ObjectFactory();
            JAXBElement<Integer> campaignId = objectFactory.createParamsRequestCampaignCampaignId(4496);
            request.setCampaignId(campaignId);

            ArrayOfLeadKey leadKeyList = new ArrayOfLeadKey();
            LeadKey key = new LeadKey();
            key.setKeyType(LeadKeyRef.EMAIL);
            key.setKeyValue("lead@company.com");

            LeadKey key2 = new LeadKey();
            key2.setKeyType(LeadKeyRef.EMAIL);
            key2.setKeyValue("anotherlead@company.com");

            leadKeyList.getLeadKeies().add(key);
            leadKeyList.getLeadKeies().add(key2);

            JAXBElement<ArrayOfLeadKey> arrayOfLeadKey = objectFactory.createParamsRequestCampaignLeadList(leadKeyList);
            request.setLeadList(arrayOfLeadKey);

            SuccessRequestCampaign result = port.requestCampaign(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessRequestCampaign.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            m.marshal(result, System.out);

        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-05-16_ by _Murta_

## Custom Activity Tracking with the Munchkin AP-

Let's you want to track custom activity in Marketo. For example, you have a video on a webpage, and want to track visitors who watch more than 50% of a video. You can do this using Munchkin's custom activity tracking feature. This would be implemented by listening for an event on the page, which is the video reaching 50%, and then calling the Munchkin API. To do this, we have to set up a custom activity in Marketo to call based on this event on the page. We use YouTube for the video player, and use their [YouTube Iframe API](https://developers.google.com/youtube/iframe_api_reference) to call the method on the Munchkin API.

 We show you first how to generate Munchkin tracking code in Marketo, second how to modify your Munchkin sample code to trigger based on page events, third how to set up a campaign with a smart list that is defined by actions on the page with flows steps, and fifth how to verify that a page visit from an anonymous user was recorded in Marketo. ==== This blog post is a live example of the code being explained. Please fill out this form, so you are a known user in Marketo. This way when you watch 50% of the video, it sends you rest of the video, and if you watch 100% of the video it sends you a link to another blog post. === <https://developers.google.com/youtube/iframe_api_reference>

 **How to Generate Munchkin Tracking Code** The Munchkin tracking code allows you to track visits to your web site. There are three types of Munchkin code described below, but in this example we use the Asynchronous Munchkin tracking code. A) Simple: has the fewest lines of code, but does not optimize for webpage loading time. This code loads the jQuery library each time a webpage is loaded. B) Asynchronous: reduces webpage loading time. This code checks if the jQuery library already exists, loads it if it's missing, and uses it for executing tracking code once the rest of the webpage has loaded. C) Asynchronous jQuery: reduces webpage loading time and also improves system performance. This code assumes that you already have jQuery, and does not check to load it.

1. Click Admin at the top right of the app.
1. Click Munchkin in the tree on the left.
1. Select Asynchronous for Tracking Code Type.
1. Click and copy the JavaScript tracking code to put on your website. **YouTube Code** <https://developers.google.com/youtube/js_api_reference#EventHandlers> <https://developers.google.com/youtube/iframe_api_reference> player.

`getCurrentTime()` Returns the elapsed time in seconds since the video started playing. `player.getDuration()` Returns the duration in seconds of the currently playing video. Note that `getDuration()` will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing. When a non-cookied user goes to a page with the Munchkin tracking code, a new cookie is created on the user's browser, and a new anonymous lead will be created in Marketo. If the user is already cookied and the user is an existing lead in Marketo, the visit to the page will be recorded in the activity log of the user in Marketo. **Code Sample to Cookie User and Track Event** Place the tracking code on your web pages right before the `</body>` tag. Landing pages created in Marketo automatically contain tracking code, so you don't need to put this code on them. This code sample would call the Munchkin API after the script is loaded:

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('XXX-XXX-XXX');
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();
</script>
```

This code sample would call the Munchkin API after the user has been on the page for 5 seconds and has also scrolled 500 pixels down the page:

```javascript
<script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
<script type="text/javascript">
$(function(){
 setTimeout(function(){
  $(window).scroll(function() {
      var y_scroll_position = window.pageYOffset;
      var scroll_position = 500; //Sets number of pixels user must scroll to be tracked

  if(y_scroll_position > scroll_position) {
  //Munchkin tracking code
   (function() {
     var didInit = false;
     function initMunchkin() {
      if(didInit === false) {
        didInit = true;
        Munchkin.init('XXX-XXX-XXX');
      }
     }

     var s = document.createElement('script');
     s.type = 'text/javascript';
     s.async = true;
    s.src = '//munchkin.marketo.net/munchkin.js';
     s.onreadystatechange = function() {
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
          initMunchkin();
      }
     };
     s.onload = initMunchkin;
     document.getElementsByTagName('head')[0].appendChild(s);
   })();
   }
 },5000); //Sets time delay before tracking user
});
</script>
```

**How to Verify Page Visit by Anonymous User Was Recorded in Marketo**

1. Click on Analytics in the top menu, and then click on New Report. Choose Web Page Activity as the report type, and then name your report.
1. After you create a report, click on Smart List. Then select the Visited Web Page filter from the box on the right. Enter the web page where you put the Munchkin tracking code.
1. Click on Setup. Select Anonymous Visitors from ISPs, and change option to Shown.
1. Click on Report. You will now see activity tracked on the web page you selected.
1. Double click on the lead record, which will then show the activity log where you can see the specific page the anonymous user visited.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

For pages with multimedia content, for instance, you may wish to do custom tracking. One common example is to add Munchkin tracking code to the page, and also use the Munchkin API to generate events in your Marketo instance for activities such as playing a video or listening to an audio clip. We recommend that you put Munchkin tracking code on most or all of your Web pages. Munchkin tracking code is automatically included in landing pages that you create using Marketo. Use this call to record that the user did something, like visit a page in Ajax, Flash, or other RIA environment. The URL must not contain " or any domain, but it can point to any page -- even pages that don't exist. If you want to add URL parameters, use the params argument.
The event shows up as a Visit Web Page event in the user's activity log under the domain of the calling web page. Note Your first call to `mktoMunchkin()` always creates a Visit Web Page event for the current page. You do not need to call `visitWebPage` unless you want to track an additional web page visit. `mktoMunchkinFunction('visitWebPage', { url: '/MyFlashMovie/Story1', params: 'x=y&2=3' });`  Note Please ensure that you have access to an experienced JavaScript developer. Marketo Technical Support is not set up to assist with troubleshooting custom JavaScript. The Munchkin JavaScript API allows you to integrate a third-party web system with your Marketo Account. With some web development, you can capture new leads or update current leads with existing applications on your web site. Let's say you have a web application for customer registration that captures new customer information. With just a bit of programming, you can also have lead information for those users captured in Marketo, and a Marketo cookie set for future web tracking.

In addition, another feature allows your web developers to capture and track web activity information from rich web environments, such as Flash or Ajax. Note: If you have the appropriate development resources, you should consider using our SOAP API for integration instead of this API. The SOAP API is more robust and has more functionality than the Munchkin API. Marketo SOAP API Requirements You must include the Munchkin JavaScript code on your web page for any of this to work. You can find the needed script tags in the Munchkin Tutorial. Also enable the Munchkin API, which is also described in the Tutorial.
Under the Hood After you make a Munchkin API call, it automatically cookies the user if they don't have a cookie. In Marketo, it logs the event (click a link, visit a web page, or a new lead) in the person's Activity Log. If you're using the click link or visit a web page call, the event gets added to that lead's Activity Log (known or anonymous). If this is a new lead and you use the associate lead call, that lead becomes a known lead and their activity history will be preserved. If this is an existing lead (based on email address match), any changed or new values will get updated in that lead's record.

Here's the general form of a `munchkinFunction` call. Include it as tags in your web page wherever you want to call it. You can invoke this like any other JavaScript function. However, you must call the Munchkin tracking function `mktoMunchkin()` before making any `mktoMunchkinFunction()` calls:

```javascript
<script src="http://munchkin.marketo.net/munchkin.js" type="text/javascript"> mktoMunchkin("###-###-###"); mktoMunchkinFunction('function', { key: 'value', key2: 'value'}, 'hash');
```

Where: `###-###-###` is the Munchkin account ID for your account function is the call you want to make params be an array of parameters needed for the call hash is only needed for `associateLead`

Posted on _1970-01-01_ by _Murta_

## Getting Data into Marketo

The presentation below shows you the different ways of getting data into Marketo. It focuses on forms, custom objects, and integrations.

[Getting Data into Marketo](https://www.slideshare.net/MurtzaManzur/getting-data-into-marketo-35662408) from [Murtza Manzur](https://www.slideshare.net/MurtzaManzur)

Posted on _2014-06-06_ by _Murta_

## Creating Leads in a Workspace

Let's say your company has two divisions: North America and Europe. You would like to segment your leads based on company division in Marketo. You can accomplish this using workspaces, which is a feature in Marketo that allows you to limit access to leads. To do this, you would create a workspace for North America and another for Europe. You can then create a lead in a particular workspace using the [syncLead API](/help/soap-api/synclead.md). You should consider using workspaces and lead partitions if your organization has:

1. Separate marketing teams for multiple product lines
1. Separate marketing teams for different territories or countries
1. A parent company and subsidiary companies
1. A parent company and resellers

When you use lead partitions and workspaces, you can:

1. Restrict access to leads in your organization
1. Restrict access to assets in your organization
1. Share assets across marketing teams

We show you first how to create a workspace in Marketo via the UI, and second how to write a lead to that workspace using the [syncLead API](/help/soap-api/synclead.md). **Creating a Workspace** A workspace is a set of leads and Marketo assets. In a workspace, you can only see leads from that workspace and assets (emails, campaigns, lists, etc.) in that workspace. Smart campaigns in that workspace only affect leads in that workspace. To see the workspaces in your account:

1. Go to the Workspaces & Lead Partitions page of the Admin section. Your workspaces appear in the Workspaces tab. 1. To create a new workspace, click the New Workspace button in the menu bar of the Workspaces tab.
1. In the dialog, you need to add some information about the new workspace:

* **Workspace Name** - the name of this workspace as it appears in the interface
* **Description** - an optional text description of the workspace
* **Lead Partitions** - which leads are visible in this partition.
* **All Lead Partitions** - will see leads from all present and future partitions
* **Select individual partitions** - only leads from those partitions (and no future partitions) are visible
* **Primary Lead Partition** - leads who visit your landing pages are added to this partition by default
* **Language** - the business language of the workspace

We show you how to use the API write leads to a particular workspace. The first sample is an XML request, the second is an XML response, and the final one is a Ruby code sample that can be used to generate the XML request. 1. After creating lead, Lead Partition is a field on Lead Info. SOAP Request for `requestCampaign`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809939944BFABAE58E5D27</mktowsUserId><requestSignature>48397ad47b71a1439f13a51eea3137df46441979</requestSignature><requestTimestamp>2013-08-01T12:31:14-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsRequestCampaign>
      <source>MKTOWS</source>
      <campaignId>4496</campaignId>
      <leadList>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>lead@company.com</keyValue>
        </leadKey>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>anotherlead@company.com</keyValue>
        </leadKey>
      </leadList>
    </ns1:paramsRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Response for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successRequestCampaign>
      <result>
        <success>true</success>
      </result>
    </ns1:successRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

See below a sample Java program that executes the scenario described above.

```java
import com.marketo.mktows.*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;


public class RequestCampaign {

    public static void main(String[] args) {
        System.out.println("Executing Request Campaign");
        try {
            URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
            String marketoUserId = "CHANGE ME";
            String marketoSecretKey = "CHANGE ME";

            QName serviceName = new QName("http://www.marketo.com/mktows/", "MktMktowsApiService");
            MktMktowsApiService service = new MktMktowsApiService(marketoSoapEndPoint, serviceName);
            MktowsPort port = service.getMktowsApiSoapPort();

            // Create Signature
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
            String text = df.format(new Date());
            String requestTimestamp = text.substring(0, 22) + ":" + text.substring(22);
            String encryptString = requestTimestamp + marketoUserId ;

            SecretKeySpec secretKey = new SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(encryptString.getBytes());
            char[] hexChars = Hex.encodeHex(rawHmac);
            String signature = new String(hexChars);

            // Set Authentication Header
            AuthenticationHeader header = new AuthenticationHeader();
            header.setMktowsUserId(marketoUserId);
            header.setRequestTimestamp(requestTimestamp);
            header.setRequestSignature(signature);

            // Create Request
            ParamsRequestCampaign request = new ParamsRequestCampaign();

            request.setSource(ReqCampSourceType.MKTOWS);

            ObjectFactory objectFactory = new ObjectFactory();
            JAXBElement<Integer> campaignId = objectFactory.createParamsRequestCampaignCampaignId(4496);
            request.setCampaignId(campaignId);

            ArrayOfLeadKey leadKeyList = new ArrayOfLeadKey();
            LeadKey key = new LeadKey();
            key.setKeyType(LeadKeyRef.EMAIL);
            key.setKeyValue("lead@company.com");

            LeadKey key2 = new LeadKey();
            key2.setKeyType(LeadKeyRef.EMAIL);
            key2.setKeyValue("anotherlead@company.com");

            leadKeyList.getLeadKeies().add(key);
            leadKeyList.getLeadKeies().add(key2);

            JAXBElement<ArrayOfLeadKey> arrayOfLeadKey = objectFactory.createParamsRequestCampaignLeadList(leadKeyList);
            request.setLeadList(arrayOfLeadKey);

            SuccessRequestCampaign result = port.requestCampaign(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessRequestCampaign.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            m.marshal(result, System.out);

        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
```

**How do I sign up for Workspaces and Lead Partitions?** For Marketo Enterprise customers, you have free access to workspaces and lead partitions. Contact your customer enablement manager for details on enabling and implementing them. For other customers, please contact your Marketo sales executive or email our sales team for more information on this product.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _1970-01-01_ by _Murta_

## June 2014 Release Updates

### Marketo Real-Time Personalization API

The Marketo Real-Time Personalization (RTP) JavaScript API extends the platform's automated personalization capability. It allows for event tracking and dynamic customization of a webpage. See full documentation [here](/help/javascript-api/web-personalization.md).

Posted on _2014-06-20_ by _Travis Kaufman_

## Storing a Foreign Key in Marketo

When synchronizing contact and lead records between systems like a proprietary CRM or data warehouse, it is a common requirement to associate a lead record with a unique system identifier. In Marketo you can create or update a lead record through a [syncMultipleLeads API](/help/soap-api/syncmultipleleads.md) call using your unique system identifier. To accomplish this, you would store your unique system identifier (primary key) as a foreign key in Marketo. The name of this field in Marketo to store a foreign key is foreignSysPersonId. Here are three important things to note:

1. foreignSysPersonId is not visible in Marketo's UI. So it is a best practice to also populate a custom attribute field with this value.
1. foreignSysPersonId is unique to a lead, but a lead can have more than one foreignSysPersonId.
1. foreignSysPersonId cannot be updated or deleted, but can be reassigned to another record.

We show how to make a call to the [syncMultipleLeads API](/help/soap-api/syncmultipleleads.md) to write a foreignSysPersonId value to two existing lead records in Marketo. **How to Write foreignSysPersonId Using syncMultipleLeads API** You can insert a new lead record and specify the foreignSysPersonId. You can also add it to an existing lead by specifying both Marketo ID and the foreignSysPersonId. We walk you through the latter case. **Request XML for syncMultipleLeads SOAP API Call**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809934544BFABAE58E5D27</mktowsUserId>
      <requestSignature>b5e21953ae9f1b263e644da5eccce9ff33802513</requestSignature>
      <requestTimestamp>2013-08-01T18:22:30-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsSyncMultipleLeads>
      <leadRecordList>
        <leadRecord>
          <leadId>1090240</leadId>
          <foreignSysPersonId>1224191</foreignSysPersonId>
          <leadAttributeList>
            <attribute>
              <attrName>Company</attrName>
              <attrValue>Marketo1000</attrValue>
            </attribute>
            <attribute>
              <attrName>Phone</attrName>
              <attrValue>650-555-1000</attrValue>
            </attribute>
          </leadAttributeList>
        </leadRecord>
        <leadRecord>
          <leadId>1090239</leadId>
          <foreignSysPersonId>1224192</foreignSysPersonId>
          <leadAttributeList>
            <attribute>
              <attrName>Company</attrName>
              <attrValue>Marketo1001</attrValue>
            </attribute>
            <attribute>
              <attrName>Phone</attrName>
              <attrValue>650-555-1001</attrValue>
            </attribute>
          </leadAttributeList>
        </leadRecord>
      </leadRecordList>
      <dedupEnabled>true</dedupEnabled>
    </ns1:paramsSyncMultipleLeads>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

**Response XML for syncMultipleLeads SOAP API Call**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successSyncMultipleLeads>
      <result>
        <syncStatusList>
          <syncStatus>
            <leadId>1090240</leadId>
            <status>UPDATED</status>
            <error xsi:nil="true" />
          </syncStatus>
          <syncStatus>
            <leadId>1090239</leadId>
            <status>UPDATED</status>
            <error xsi:nil="true" />
          </syncStatus>
        </syncStatusList>
      </result>
    </ns1:successSyncMultipleLeads>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

**See below a sample Ruby program that will output the Request XML above.**

```java
require 'savon' # Use version 2.0 Savon gem
require 'date'

mktowsUserId = "" # CHANGE ME
marketoSecretKey = "" # CHANGE ME
marketoSoapEndPoint = "" # CHANGE ME
marketoNameSpace = "<http://www.marketo.com/mktows/>"

# Create Signature
Timestamp = DateTime.now
requestTimestamp = Timestamp.to_s
encryptString = requestTimestamp + mktowsUserId
digest = OpenSSL::Digest.new('sha1')
hashedsignature = OpenSSL::HMAC.hexdigest(digest, marketoSecretKey, encryptString)
requestSignature = hashedsignature.to_s

# Create SOAP Header
headers = {
 'ns1:AuthenticationHeader' => { "mktowsUserId" => mktowsUserId, "requestSignature" => requestSignature,
 "requestTimestamp"  => requestTimestamp
 }
}

client = Savon.client(wsdl: '<http://app.marketo.com/soap/mktows/2_3?WSDL>', soap_header: headers, endpoint: marketoSoapEndPoint, open_timeout: 90, read_timeout: 90, namespace_identifier: :ns1, env_namespace: 'SOAP-ENV')

# Create Request
request = {
        :lead_record_list => {
                :lead_record => {
                        :lead_id => "1090240",
                        :foreign_sys_person_id => "1224191",
                :lead_attribute_list => {
                        :attribute => {
                                :attr_name => "Company",
                                :attr_value => "Marketo1000" },
                         :attribute! => {
                                :attr_name => "Phone",
                                :attr_value => "650-555-1000" }
                }
        },
        :lead_record! => {
                        :lead_id => "1090239",
                        :foreign_sys_person_id => "1224192",
                :lead_attribute_list => {
                        :attribute => {
                                :attr_name => "Company",
                                :attr_value => "Marketo1001" },
                         :attribute! => {
                                :attr_name => "Phone",
                                :attr_value => "650-555-1001" }
                }
        }
        },
    :dedup_enabled => "True"
}

response = client.call(:sync_multiple_leads, message: request)

puts response
```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-06-27_ by _Murta_

## Updating a Lead's Email Address

Let's say a user fills out a Marketo form on your site. What happens? Marketo cookies the user, and associates them with the email they provided. What if the next time the user visits your website, and they fill out the same form again with a different email. What will happen? Marketo will create a new lead record, and overwrite the first cookie on the user's browser. The user is now a new/different lead in Marketo. We show you four ways to update a lead's email address in Marketo including the [syncLead API method](/help/soap-api/synclead.md), the custom field in a form method, the Marketo UI, and by importing a list. **Via the syncLead API** You can use the [syncLead API](/help/soap-api/synclead.md) to update a lead record using their Marketo ID and new email address. Request XML for `syncMultipleLeads` SOAP API Call

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>bigcorp1_461839624B16E06BA2D663</mktowsUserId>
      <requestSignature>92f05a7be4838ae1c0e5aafe814891ee72968a08</requestSignature>
      <requestTimestamp>2013-07-31T12:38:47-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsSyncLead>
      <leadRecord>
        <leadId>1090240</leadId>
        <Email>t@t.com</Email>
      </leadRecord>
      <returnLead>false</returnLead>
    </ns1:paramsSyncLead>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

Response XML for syncMultipleLeads SOAP API Call

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successSyncLead>
      <result>
        <leadId>1090240</leadId>
        <syncStatus>
          <leadId>1090240</leadId>
          <status>UPDATED</status>
          <error xsi:nil="true" />
        </syncStatus>
        <leadRecord xsi:nil="true" />
      </result>
    </ns1:successSyncLead>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

See below a sample Ruby program that will output the Request XML above.

```java
require 'savon' # Use version 2.0 Savon gem
require 'date'

mktowsUserId = "" # CHANGE ME
marketoSecretKey = "" # CHANGE ME
marketoSoapEndPoint = "" # CHANGE ME
marketoNameSpace = "<http://www.marketo.com/mktows/>"

# Create Signature
Timestamp = DateTime.now
requestTimestamp = Timestamp.to_s
encryptString = requestTimestamp + mktowsUserId
digest = OpenSSL::Digest.new('sha1')
hashedsignature = OpenSSL::HMAC.hexdigest(digest, marketoSecretKey, encryptString)
requestSignature = hashedsignature.to_s

# Create SOAP Header
headers = {
 'ns1:AuthenticationHeader' => { "mktowsUserId" => mktowsUserId, "requestSignature" => requestSignature,
 "requestTimestamp"  => requestTimestamp
 }
}

client = Savon.client(wsdl: '<http://app.marketo.com/soap/mktows/2_3?WSDL>', soap_header: headers, endpoint: marketoSoapEndPoint, open_timeout: 90, read_timeout: 90, namespace_identifier: :ns1, env_namespace: 'SOAP-ENV')

# Create Request
request = {
 :lead_record => {
  :Email => "<t@t.com>",
  :lead_id => "1090240",
 :return_lead => "false"
}

response = client.call(:sync_lead, message: request)

puts response
```

**Via a Custom Field in a Form** You can create a custom field for the "New Email Address" in Marketo. Then ask the user to fill out a form that includes this new field. Then create a program in Marketo that would change the data value of the system email address field with the token `{{lead.newEmailAddress}}` when there is a change in the new custom field "New Email Address." **Via the Marketo UI** You can manually update a lead's email address via the Marketo UI. Here is a [help article](https://nation.marketo.com/) that describes how to do this (Marketo login required to see the article). **Via Importing a List** You can update a lead's email address using the import a list method in Marketo described [here](https://nation.marketo.com/) (Marketo login required to see article).  

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _1970-01-01_ by _Murta_

## Store a Second Email Address for a Lead

Let's say you want to change a lead's score in Marketo using the APIs. This is possible to do with the REST API using the Create/Update Lead endpoint. If you want to store more than one email on a lead record, you would need to create a custom field, and store the second email there. Here is a help article with more information: Below is a code sample in Ruby that shows how to make this call.

```java
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/leads.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
request_url = marketo_instance + endpoint + auth_token

# Build request body
data = { "action" => "updateOnly", "input" => [ { "email" => "<example@email.com>", "leadScore" => "30" } ] }

# Make request
response = RestClient.post request_url, data.to_json, :content_type => :json, :accept => :json

# Returns Marketo API response
puts response
```

Posted on _2015-02-20_ by _Murta_

## Create a Custom Field in Marketo, and Update this Field via AP

Let's say you have additional data about your leads that does not fit into the standard Marketo fields. For example, this custom field could be a third-party score. You can create a custom field in Marketo for your third-party score, and then update the value of this field via either the Marketo [REST APIs](https://developer.adobe.com/marketo-apis/) or [SOAP APIs](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/soap/activity-type-filters). We show you first how to create a custom field in Marketo, and second how to update this field using the REST API.

### How to Create a Custom Field in Marketo

1. Under Admin, click on Field Management.
1. Click the New Custom Field button.
1. Choose the field Type. This changes how it is rendered in Smart Lists and Forms in Marketo.
1. Enter the Name as you want it to appear in Marketo. Pick the Name and API Name carefully as renaming fields can be difficult and in some situations not possible.
1. The custom field that you created is now accessible via the APIs.

### How to Update Custom Field via REST API

In the previous section, we created a custom field called `myCustomField` with the data type string. To update the value of that field, we use the REST API endpoint called Create / Update Leads. Before you can make a request to the REST API, you need to authenticate. This is outside of the scope of this article, but in-depth information [is available on the Marketo developers' site](/help/rest-api/authentication.md).

**Endpoint**

`/rest/v1/leads.json`

**Request Body**

```json
{
   "action":"createOrUpdate",
   "input":[
      {
         "email":"<example@example.com>",
         "myCustomField":"examplestring"
      }
   ]
}
```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-08-19_ by _Murta_

## Integrating Unbounce and Marketo

**NOTE: This is a guest blog post by Fab Capodicasa. He is a Marketo-certified consultant at [Hoosh Marketing](https://hooshmarketing.com.au/), a Marketo LaunchPoint agency partner specializing in B2C. He has worked in both SaaS and marketing for the last 13 years. His background is a blend of hardcore IT, direct marketing, and enterprise sales. Fab is also a former Marketo employee.**

 **Overview** In this article we demonstrate how to integrate Unbounce, a popular landing page tool, with Marketo. We show you first how to insert Marketo tracking into Unbounce, and second how to modify Unbounce forms to insert data directly into Marketo. The challenge of integrating Unbounce with Marketo is that Unbounce does not allow default fields to be renamed (for example, first_name cannot be changed to FirstName). It also does not allow field labels to be different from field names. This integration involves JavaScript which tweaks the existing forms to make them compatible with Marketo. I recommend that you have at least a beginner level of JavaScript and an intermediate level of Marketo knowledge to complete the tasks in this article.
 **Part 1: Add Marketo Tracking Code to Unbounce** Adding Marketo's Munchkin tracking script to Unbounce pages is required both for analytics and the form integration to work. Please follow these steps: Copy your Munchkin code from Marketo: Navigate to Admin -> Munchkin and copy the 'Simple' version of the JavaScript. Open the Unbounce landing page and click JavaScript-> Add New JavaScript.  Click Add, call the script 'Munchkin', select 'Before Body End Tag' and then paste the Munchkin code. Click the Done button. For future Unbounce pages, you go to JavaScript and enable the Munchkin script we created. There is no need to recreate it.
 **Part 2: Convert the Unbounce Form to a Marketo Form** Now we need to modify the Unbounce form by adding some new hidden fields and JavaScript to allow your Unbounce landing pages to submit lead information directly into Marketo. We will first create a Marketo placeholder form. In Marketo, create a blank form and approve it.

 This is the proxy form in Marketo which represents the Unbounce form. Add Hidden Fields to the Unbounce Form. These hidden fields are required by Marketo to determine which Marketo instance, which form and user session this form submission will apply to. In Unbounce, open your form by double clicking. Add a hidden field called `_mkt_trk`. Add a second hidden field called `formid`.  233 needs to be replaced with the id of your form, which can be found in the Marketo form embed code in Marketo. In Marketo, Open your form, select Form Actions->Embed Code. Add a hidden field called `returnurl`. `https://hooshmarketing.com.au/thank-you` needs to be replaced with follow-up URL, this is the URL you want users to be redirected to after submitting the form. For example, this could be your thank you page.
 **Part 3: Direct Unbounce Form to Marketo** The follow-up URL is the page which your lead will be redirected to after their lead is submitted to Marketo. In Unbounce, please follow these steps: Click on your form. Modify the Form Confirmation section. Change the Confirmation to Post form data to a URL. Set the URL to the follow-up page you want. `fpmarkets` needs to be replaced with your Marketo account string, which can be found in Marketo under Admin->Landing Pages.
 **Part 4: Add JavaScript to the Unbounce Page** This JavaScript will convert the form to be compatible with Marketo and to submit it to Marketo. In Unbounce, please follow these steps: Open the Unbounce landing page and click JavaScript-> Add New JavaScript. Click Add, call the script 'Marketo Form Convert', select 'Before Body End Tag'. Paste the JavaScript code below:

```javascript
var MARKETO_MUNCHKIN_ID='614-CGT-700';
var MARKETO_ACCOUNT_STRING = 'fpmarkets';

var UNBOUNCE_MARKETO_FIELD_MAP = new Object();

//default field mappings
UNBOUNCE_MARKETO_FIELD_MAP['first_name'] = 'FirstName';
UNBOUNCE_MARKETO_FIELD_MAP['email'] = 'Email';
UNBOUNCE_MARKETO_FIELD_MAP['last_name'] = 'LastName';
UNBOUNCE_MARKETO_FIELD_MAP['phone_number'] = 'Phone';

function getMarketoField(k) {
    return UNBOUNCE_MARKETO_FIELD_MAP[k];
}


var formFields = [];
var hiddenClonedFields = [];
var firstForm = document.forms[0];

//Convert Unbounce form names to Marketo field names
for(i=0; i<firstForm.elements.length; i++){
 var formField = firstForm.elements[i];
 var newFieldName = getMarketoField(formField.name);

  if(newFieldName != undefined) {


    //save original field as hidden field
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", formField.name);
    hiddenField.setAttribute("id", formField.id);
    hiddenClonedFields.push(hiddenField);

    //change original field
    console.log ( 'Changed form field name: ' + formField.name + '=>' + newFieldName );
    formField.name = newFieldName;
    formField.id = newFieldName;
    formFields.push(formField);


  } else {
    console.log ( 'Couldn't map:' + formField.name );
  }
}

//Add hidden cloned Unbounce fields to form
//for Unbounce validation
for(i=0; i<hiddenClonedFields.length; i++){
    firstForm.appendChild(hiddenClonedFields[i]);
    formFields[i].onchange = (function(hf) {
        return function(event) {
            hf.value = event.target.value;
          console.log('Changed hidden cloned field:' + hf.name + '=>' + hf.value);
        };
    }(hiddenClonedFields[i]));
    console.log ( 'Added cloned field: ' + hiddenClonedFields[i].name );
}


//Add MunchkinId to form
var input = document.createElement("input");
input.setAttribute("type", "hidden");
input.setAttribute("name", "munchkinId");
input.setAttribute("value", MARKETO_MUNCHKIN_ID);
firstForm.appendChild(input);
console.log('Added hidden field:' + input.name + '=' + input.value);
```

If you have custom fields which are had API names that aren't compatible with Unbounce, you can add these to the mapping in the JavaScript. For example, if one of your custom fields in Marketo was `Comments_c`, but you wanted the field label to appear as Comments, Unbounce wouldn't let you change the field name to `Comments_c`.

```
//default field mappings
UNBOUNCE_MARKETO_FIELD_MAP['comments'] = 'Comments_c';
UNBOUNCE_MARKETO_FIELD_MAP['first_name'] = 'FirstName';
UNBOUNCE_MARKETO_FIELD_MAP['email'] = 'Email';
```

_comments are the name of the field in Unbounce. _Comments_c_ is the name of the field in Marketo. For future Unbounce pages, you will simply go to JavaScript and enable the Munchkin script we created. There is no need to recreate it.
**Part 5: Testing** The last step is to test this form integration is working. Create a trigger in Marketo which activates on the Marketo form fill out and make sure that leads are being inserted correctly into Marketo. Once the form is submitted, the page should be redirect you to the follow-up URL.

Posted on _2014-08-04_ by _

## July 2014 Release Updates

### Munchkin Updates

The new version of Munchkin is 141. Version 142 is unsupported and will be removed in early September 2011. In Version 142, there were publicly accessible functions that were not documented on the developers' site. Those undocumented functions are no longer publicly available. Documented functions on the developers' site will be continue to be supported long-term.

### RTP Updates

The RTP API has a new function called Get Visitor Data. This RTP API call allows you to get real-time visitor data, such as organization, industry, location and segment code match.

Posted on _2014-07-30_ by _Murta_

## Using Multiple Munchkin Tracking Codes on a Single Page

Let's say you have multiple Marketo instances and you would like to send web tracking events like page visits or clicked links to these multiple instances, it is possible to do this with Munchkin. Marketo tracks visitors to your website by domain (for example "marketo.com"). If you're hosting this Munchkin script on a domain that's different than your primary domain (for example "company.com"), those visitors appear as anonymous leads until they fill out a form on that other domain. To accomplish this, add the `altIds` parameter to your `Munchkin.init` call. The altIds parameter contains an array of the additional Munchkin IDs where web events should be sent. Using the example below, replace the highlighted Munchkin IDs (XXX-XXX-XXX, YYY-YYY-YYY, and ZZZ-ZZZ-ZZZ) with the Munchkin IDs from each Marketo instance where the tracking information should be sent.

```javascript
<script src="http://munchkin.marketo.net/munchkin.js" type="text/javascript"></script>
<script>Munchkin.init('XXX-XXX-XXX', { altIds:['YYY-YYY-YYY', 'ZZZ-ZZZ-ZZZ'] });</script>
```

For additional information on Munchkin initialization parameters, see [this document](/help/javascript-api/configuration.md).

Posted on _2014-08-08_ by _Murta_

## Integrating Munchkin with Google Tag Manage

Google Tag Manger lets you add tags to your website. Rather than manually add each tracking script like Munchkin to the source code of your website, you can put [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) on your site, and then add tags like [Munchkin](/help/javascript-api/lead-tracking.md) through Google Tag Manager's UI. In this post, we'll first show how to generate Munchkin tracking code in Marketo, and then second how to add this Munchkin tracking code to Google Tag Manager.

### How to Generate a Munchkin Tracking Code

1. Click **Admin** at the top right of the app.
1. Click **Munchkin** in the tree on the left.
1. Select **Asynchronous** for Tracking Code Type.
1. Click and copy the JavaScript tracking code.

**How to Add Munchkin Tracking Code to Google Tag Manager**

1. Log in to your Google Tag Manager account and **Add a new tag.**
1. Create a new **Custom HTML Tag**.
1. Copy and paste your Munchkin code into the **HTML** field and click **Continue**.
1. Select **Fire On All Pages** and click **Create Tag.** Note: If you have an extremely high traffic web site, you can exclude sections of your site using **Fire On Some Pages**.
1. Click save, and then verify that the Munchkin tracking code is now loading on your website.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-08-05_ by _Murta_

## Hide Lightbox After Form Submission

### Overview

The current lightbox embed code generated by Marketo does not disappear when the form is submitted. It will reload the page after form submission, and the form will appear again. If you would like to create a lightbox that hides after form submission, then please follow the steps below.

### How to Guide

1. After creating your form in Marketo, generate your embed code. To do this, click Form Actions, and then click Lightbox as the code type. Copy and paste this code into a text editor, so you can edit it in the next step.
1. Replace all the code after "(form)" in your embed code with the code below:

```javascript
{
var lightbox = MktoForms2.lightbox(form).show();
form.onSuccess(function(){
lightbox.hide();
return false;
});
});
</script>
```

After step 2, the completed version should look like the code below. The code is now ready to be used on your website.

```javascript
<script src="http://app-sj04.marketo.com/js/forms2/js/forms2.js"></script>
<form id="mktoForm_0000"></form>
<script>MktoForms2.loadForm("http://app-sj04.marketo.com", "AAA-BBB-CCC", 0000, function (form){
var lightbox = MktoForms2.lightbox(form).show();
form.onSuccess(function(){
lightbox.hide();
return false;
});
});
</script>
```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-08-21_ by _Murta_

## Quick Start Guide for Marketo REST API

This guide shows you how to make your first call to the Marketo REST API in ten minutes. We show you how to retrieve a single lead using the [Get Lead by Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET) REST API endpoint. To do this, we walk you through the authentication process to generate an access token, which you use to make an HTTP GET request to [Get Lead by Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET). Then we provide you with the code to make the request that returns lead information formatted as JSON.

### How to Generate an Authentication Token

<InlineAlert slots="text" variant="info" />

As of June 2025, the authentication token is no longer supported. You must use the Authentication header.

A Custom Service in Marketo allows you to describe and define what data your application will have access to. You need to be logged in as a Marketo administrator to create a Custom Service and associate that service with a single API-Only user.

1. Navigate to the admin area of the Marketo application.
1. Click on the Users & Roles node on the left panel.
1. Create a new role. Reveal the list of role permissions by clicking Access API. Now, scroll down and select only the permissions that you need. In this case, we'll simply select Read-Only Lead permission.
1. The next step is to create an API-Only user and associating it with the API role that you created in the previous step. You can do so by checking the API-Only user checkbox at the time of user creation.
1. A Custom service is required to uniquely identify your client application. To create a custom application, go to the Admin > LaunchPoint screen and create a new service.
1. Provide the Display Name, choose "Custom" Service type, provide the Description, and the user email address created in step 1. We recommend using a descriptive Display Name that represents either the company or purpose of this Custom REST API Service.
1. Click on "View Details" link on the grid to get the Client Id and Client Secret. Your client application is able to use the Client Id and Client Secret to generate an access token.
1. Copy and paste your authentication token into a text editor. Your authentication token looks similar to the example below:

  `cdf01657-110d-4155-99a7-f986b2ff13a0:int`

### How to Determine the Endpoint URL

In making a request to the Marketo API, you need to specify your Marketo instance in the endpoint URL. All non-bulk API requests to the Marketo REST API will follow the format below:

`<REST API Endpoint URL>/rest/`

The REST API Endpoint URL can be found within the Marketo Admin > Web Services panel. Your Marketo endpoint URL structure should look similar to the example below:

`https://100-AEK-913.mktorest.com/rest/v1/lead/{id}.json`

**Note: Bulk API URLs are not prefixed with '/rest/'. For Bulk API, you should only use the host, and append the appropriate path like so:**

`https://100-AEK-913.mktorest.com/bulk/v1/leads/export/create.json`

### How to use Authentication Token to Call Get Lead by Id AP

In the previous sections, we generated an authentication token and found the endpoint URL. We will now make a request to a REST API endpoint called [Get Lead by Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET). The easiest way to make your request to the Marketo REST API is to paste the URL into your web browser address bar. Follow the format below:

`https://<REST API Endpoint URL for your Marketo instance>/rest/v1/<API that you are calling>?access_token=<access_token>`

### Example

`https://100-AEK-913.mktorest.com/rest/v1/lead/318581.json?access_token=cdf01657-110d-4155-99a7-f986b2ff13a0:int`

If your call is successful, then it returns JSON with the format below:

```json
{
    "requestId": "d82a#14e26755a9c",
    "result": [
        {
            "id": 318581,
            "updatedAt": "2015-06-11T23:15:23Z",
            "lastName": "Doe",
            "email": "<jdoe@marketo.com>",
            "createdAt": "2015-03-17T00:18:40Z",
            "firstName": "John"
        }
    ],
    "success": true
}
```

If you are interested in learning more about the Marketo REST APIs, this is a [good place to start](https://developer.adobe.com/marketo-apis/).

Posted on _2015-09-04_ by _David_

## How to Delete Marketo Tracking Cookie

Question: "We have set up a form on our website for the sales team to unsubscribe individuals that have verbally asked to be removed from any email messaging. What we are finding though is when they enter in the email and submit that they are cookied with that email address and start to receive alerts for their activity on our website. The form we have is currently an embedded form. Has anyone figured out a way to disable the cook tracking on an embedded form, I understand how to do it with a Marketo landing page." We can do this. To implement this, speed up the cookie expiration. After the cookie is created by the form, you can force it to immediately expire. Because the cookie is expired, the browser will automatically delete it. To start this process, we are going to use the native form functionality to call under function called `deleteCookie`.

Posted on _2014-08-26_ by _Travis Kaufman_

## Integrate a Marketo Landing Page with Wordpress

Let's say your website is built using Wordpress, and you would like to embed a Marketo landing page on one of the pages. This is possible using an iframe. An iframe allows you to embed a page within another page. In this post, you show how to embed a Marketo landing page into a Wordpress page. **Choosing a Wordpress Plugin** Wordpress There are number of Here is a Wordpress plugin that lets you : `http://wordpress.org/plugins/iframe/` Here are some pro's and con's on using this approach: `http://www.elixiter.com/marketo-landing-page-and-form-hosting-options/` Great post Murtza! Colby, the iframe would preserve the part where after submitting the form you are redirected to a PDF. We used iframes on our site for a long time. Great post Murtza! Colby, the iframe would preserve the part where after submitting the form you are redirected to a PDF. We used iframes on our site for a long time. Of note, if you want to pass through URL parameters from the main URL to the iframe you need to do some coding. Also, make sure your Google Analytics is set up properly. You don't want to have page views counted twice for every visit to the page with the iframe.

Posted on _1970-01-01_ by _Murta_

## Integrate Optimizely with a Marketo Landing Page

[Optimizely](https://www.optimizely.com/) gives you the ability to conduct A/B testing, multipage, and multivariate testing on your site. You can use Optimizely with a Marketo landing page. Here's how to do this:

1. Find and copy your Optimizely code snippet.** Go to your Dashboard in Optimizely, and click the Project Code link. Copy the line of code that appears in the pop-up.
1. Log into Marketo, and select your landing page template. Then click "Edit Draft."**
1. Click Landing Page Actions. Then click Edit Page Meta Tags**
1. Paste your Optimizely code snippet in the Custom HEAD HTML section, and click Save.
1. Test your landing page to confirm that the Optimizely snippet is working

Posted on _2014-09-18_ by _Murta_

## Search by Full Name via Marketo REST API

**Question:** Is there a way to query a lead using Marketo APIs with just a lead's full name?
**Answer:** It is not directly possible. However, the workaround described below will allow you to do this.

1. Create a custom field called "Fullname" in Marketo.
1. Use either [getMultipleLeads](/help/soap-api/getmultipleleads.md) SOAP API or [Get Multiple Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET) to query your lead database. Include your first name and last name as attributes in your request to either REST or SOAP APIs.
1. After you query your lead database, concatenate "First Name" and "Last Name" for each lead, and store this data in a "Fullname" column. 1. Use [syncMultipleLeads](/help/soap-api/syncmultipleleads.md) SOAP API to push this data to "Fullname" custom field. Alternatively, you can use the [Import Lead](/help/rest-api/leads.md) API, or import a CSV or XLS using the Marketo UI.
1. Now, you are able to query by full name using the [Get Multiple Leads by Filter Type API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) to search for this custom field. Specify "Fullname" as "filterType" and "filterValue" would be "Joe Johnson" with a Get Multiple Leads by Filter Type REST API call.

Posted on _2014-09-09_ by _Murta_

## Delete Marketo Tracking Cookie

This method should only be used if the desired effect is to remove the cookie entirely.

This code sample can be used to delete a Marketo tracking cookie from a user's browser after Marketo form submission. It works by calling `deleteMarketoCookie` method after a user submits a form. This method expires the cookie by setting the expiration date to a date in the past. The default behavior of the browser is then to delete this cookie because it is expired.

Posted on _2014-09-09_ by _Murta_

## Restrict Free Email Domains on Form Fill Out

Let's say you would like to restrict site visitors from submitting a form with a free email domain, such as Gmail or Yahoo. To accomplish this, include the script below in the source code of the page with the Marketo form. It checks if a user entered a non-business email (Gmail, Hotmail, etc.), and prevent Marketo form submission if a user enters one. You can extend the list of blocked email domains by modifying line 9 to include domains you would like to restrict.

Posted on _2014-09-09_ by _Murta_

## Debugging a field that is not accessible via the API

If you are coming to this field <https://nation.marketo.com/> When we attempt to update the field AnnualRevenue using the SOAP API, the response says that the record is updated, however the AnnualRevenue field does not persist the change. If we try to update the field manually using the Lead Database, changes to this field are not persisted either. Check if the field is blocked in Admin. The other thing that can sometimes happen is that it might be an Account Field synced over from SFDC. We block changes to those fields by default because SFDC is the system of record for them in many cases. 1) Created At 2) Marketo SFDC ID 3) Marketo Unique Code 4) SFDC Type 5) Updated At 6) Urgency 7) Priority 8) Sales Created Date

Posted on _1970-01-01_ by _Murta_

## Add Custom Code to a Marketo Landing Pag

Let's say you would like to add a third-party tracking script, such as Google Analytics to your Marketo landing page. This is possible via the Marketo UI. More generally, you can add any custom code (HTML, CSS, JavaScript) to your Marketo landing by following the instructions below.

1. Select your landing page and click on Edit Draft.
1. Drag in the HTML element.
1. Enter your custom code, and click Save.

Posted on _2014-09-10_ by _Murta_

## Server-Side Form Post

`https://community.marketo.com/MarketoResource?id=kA650000000GsXXCA0`

Posted on _2014-09-11_ by _Murta_

## Clearing Marketo Tracking Cookie from Forms 2.0 Submissions

### Overview

Forms 1.0 contained the value for the Munchkin tracking cookie as a field in the DOM. This was submitted along with all of the other inputs. [Forms 2.0](/help/javascript-api/forms-api-reference.md) omits this field, and dynamically populates the value upon submission rather than on form load. While this is generally acceptable, it does creates a class of use cases, which require the tracking cookie be cleared to avoid unintended tracking and prefilling. For example, this can occur at a tradeshow where a Marketo customer is using the same form on the same device, and getting contact information from multiple people. The snippet below will allow you to clear the cookie value on submission of the form, without having to delete the cookie itself from the user's browser.

### Code Sample

This snippet expects a single form load on the page. If there are multiple forms, you should use the [loadForm or getForm methods](/help/javascript-api/forms-api-reference.md) to implement your callbacks.

```javascript
<script>
//add a callback to the first ready form on the page
MktoForms2.whenReady( function(form){
 //add the tracking field to be submitted
        form.addHiddenFields({"_mkt_trk":""});
        //clear the value during the onSubmit event to prevent tracking association
 form.onSubmit( function(form){
  form.vals({"_mkt_trk":""});
 })
})
</script>
```

Posted on _2014-09-11_ by _Kenny_

## September 2014 Release Updates

### Updates to REST API

Added a new optional fields value to the [Get Multiple Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) API which will return the Munchkin cookie values associated with a lead record. Simply add "?fields=cookies" to the request.

Posted on _2014-09-16_ by _Murta_

## Add Location Data from RTP API to Marketo Form Fill Out

**You need active RTP and MLM subscriptions to implement the use case described in this blog post.**
Using the [RTP JavaScript APIs](/help/javascript-api/web-personalization.md) and [Marketo Forms 2.0](/help/javascript-api/forms-api-reference.md), you can pull the inferred location data from RTP and push it into Marketo via a form fill out. This allows you to see the user's inferred location (based on IP address) during the most recent form activity. To get started, you need to create three custom string fields in Marketo. You can do this either via your CRM if it has a native integration with Marketo, or from the Field Management menu in Marketo's admin section. I recommend naming these fields 'Most Recent Country', 'Most Recent State', and 'Most Recent City.' We continue this blog using this naming convention. The API names for these fields are 'mostRecentCountry', 'mostRecentState', and 'mostRecentCity'. To retrieve the location data, we are using the [RTP method to get the visitor's location data](/help/javascript-api/web-personalization.md), and then pass it into the form using the [addHiddenFields and vals methods](/help/javascript-api/forms-api-reference.md) from the Marketo Forms 2.0. On your page, add your RTP JS tag and a Marketo form. Then, include the script below. You need to change the names of the target form fields in the example code if you are using a different naming convention than the one described above.

```javascript
<script>
//modify the form and grab the user
MktoForms2.whenReady( function(form) {
        //add the hidden fields to the form
 form.addHiddenFields({
  "mostRecentCountry":"",
  "mostRecentState":"",
  "mostRecentCity":""});
 //Grab the visitor data, a JS object with it is passed in the callback function of the third argument
 rtp('get','visitor',function(visitor){
  //add the desired info from the visitor object to the form fields
  form.vals({
   "mostRecentCountry":visitor.results.location.country,
   "mostRecentCity":visitor.results.location.city,
   "mostRecentState":visitor.results.location.state});
  }
  );
 });
</script>
```

Posted on _2014-09-17_ by _Kenny_

## Block Crawling and Search Indexing of a Marketo Landing Page

Let's say you want to block a Marketo landing page from being crawled and shown in results by search engines like Google. Here's how to do this:

1. Log into Marketo, and select your landing page. Then click "Edit Draft."
1. Click Landing Page Actions. Then click Edit Page Meta Tags
1. Change Robots field to No Index, No Follow. Then click Save.

Posted on _2014-09-19_ by _Murta_

## Marketo REST vs SOAP APIs FAQ

**Updated: March 2016** Here are answers to the most frequently asked questions about Marketo [REST](/help/rest-api/rest-api.md) and [SOAP](/help/soap-api/soap-api.md) APIs. **Q: What are the main differences between the Marketo REST and SOAP APIs?** A: While the ability to push/pull specific data via REST and SOAP APIs mostly overlaps, there is certain functionality that only exists in either REST or SOAP APIs. In terms of performance, the REST API has better [throughput](https://en.wikipedia.org/wiki/Throughput) than the SOAP API. In terms of the authentication model, the REST API has an authentication model that uses an expiring token. Our REST API also provides access to Marketo [assets](https://developer.adobe.com/marketo-apis/api/asset).   **Q: What features are available in the REST API that are not available in the SOAP API?** A: [List of lists API](/help/rest-api/list-of-standard-fields.md), [remove a lead from a list API](/help/rest-api/lead-database.md), [Usage API](/help/rest-api/rest-api.md), and [Error API](/help/rest-api/rest-api.md) are only available with the REST API. **Q: Are there plans to increase the number of APIs available for the SOAP API?** A: No. **Q: Are there plans to increase the number of APIs available for the REST API?** A: Yes. REST is the primary focus of Marketo's API development at this time.

Posted on _2014-09-20_ by _Murta_

## Server-Side Form Post

**Note: This is a non-public and unsupported API, it is not supported and its behavior may change at any time** If you use your own forms on your website, you can still send this data into Marketo using a server-side post. The benefit of this approach is that you can keep your existing form and application logic, but you can still use an actual form post into Marketo. This gives the Marketo users a "Fills Out Form" event, which can be used to trigger automated processes or for segmentation. **NOTE: There is a rate limit of 30 server-side form posts per minute from a one single IP address.** In each scripting or programming language there are different options to do a server-side form submission, and they may have different object/methods that can be used to make the Post Call. For example, in PHP many people use the cURL library. In all cases, you are posting name-value pairs to a specified URL. The names need to be identical to the API names of the Marketo fields. In addition, there are a couple of system fields that need to be included to correctly capture the form submission.

1. Create a Form. The first step is to create a form in Marketo or to use an existing form that you want to submit. The name of the form needs to be descriptive, but it does not actually need any form fields. If you create a new form, simply enter a name, uncheck the "Open form editor" box and you're done.
1. Find a Form ID. In the Marketo UI, select the form and look at the URL: it should be of the format `https://app-x.marketo.com/#FO8B2ZN12`. Behind the # sign, look at the number immediately following "FO" to find the Form ID. In this case, the Form ID is 8. In some cases, your first form may be numbered 1001 and count up from there. The Form ID is a variable, so that you can trigger the submission of different forms.
1. Get your Marketo Account ID. Go to Admin > Munchkin and copy the Munchkin Account ID, which has the format of 000-AAA-000 You need this so that the form is submitted into the correct Marketo instance.
1. Determine the POST URL. When in the Marketo user interface, note the domain in the location bar, usually of the format `<http://app-x.marketo.com/>`. Discard anything after the slash, then append "index.php/leadCapture/save" to get the full form POST URL. Note 1: this is case sensitive. Note 2: Marketo Sandboxes may have a different domain than your Production Marketo system. So an example URL would be: `http://app-x.marketo.com/index.php/leadCapture/save` You can also use HTTPS instead of HTTP (do not use your CNAME as it gives a security exception).
1. Find the Form Field Names** Go to Admin > Field Management and click the "Export Field Names" button to download a spreadsheet with the API field names. Use the API name as the name in your name-value pairs.
1. Decide Which Fields to POST. You can include any Marketo Lead field in your form submission. Note that field names are case sensitive. In addition to the fields you want to submit there are two mandatory fields and two recommended fields: Mandatory fields on the form: (1) `munchkinId` - This field is used for your Munchkin Account ID (2) `formid` - This field indicates which form in Marketo has been submitted Recommended fields on the form: (1) Email - this field is used as the primary key for deduplication. If Marketo finds a matching email address in the Marketo database, it updates the existing record, otherwise it creates a new record. If there are multiple matches, it updates the most recently updated record (2) `_mkt_trk` - this field carries the cookie information, so you are able to track the individual's web page visits. If you have Munchkin on your form page, Munchkin will automatically enter a value in this hidden form field. If not, read it from the cookie with the same name and pass it to Marketo in this field. Note: The body of the POST to a Marketo form must be URL encoded.
1. See the Response** The response to the form post will be an HTTP 302 redirect code. In some systems, this will appear as an error. However, in this case it means that the Lead is was successfully created or updated. If there is an error, you receive a 4xx or 5xx error code.

Here is a [post](https://nation.marketo.com:443/t5/product-blogs/how-to-build-an-external-subscription-center/ba-p/242185) about using this technique for unsubscribe scenarios [by Justin Cooperman, Sr. Product Manager]

Posted on _2014-11-07_ by _Murta_

## Find Leads Updated on Specific Date Range

Let's say you want to find leads that were updated on specific dates via the [Marketo API](/help/soap-api/soap-api.md). This is possible with the [getMultipleLeads SOAP API](/help/soap-api/getmultipleleads.md). This method returns any leads with a data value change or new activity in Marketo for the date range you request. For the `leadSelector`, you would specify `LastUpdateAtSelector`. Then, you would define the date ranges with `oldestUpdatedAt` and `latestUpdatedAt` time bounds. Please see the sample Request XML below, which shows you how to find leads that were updated between 12am PST on June 6, 2014 and 12am PST on June 7, 2011. Note: the date range must not exceed 30 days.

**Sample Request XML to Find Leads Updated by Date**

```xml
<soapenv:Envelope xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>" xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:mkt="<http://www.marketo.com/mktows/">
<soapenv:Header>
<mkt:AuthenticationHeader>
<mktowsUserId>REPLACE</mktowsUserId>
<requestSignature>REPLACE</requestSignature>
<requestTimestamp>2014-10-23T12:19:51-07:00</requestTimestamp>
</mkt:AuthenticationHeader>
</soapenv:Header>
<soapenv:Body>
<mkt:paramsGetMultipleLeads>
<leadSelector xsi:type="mkt:LastUpdateAtSelector">
<oldestUpdatedAt>2014-06-06T00:00:00-08:00</oldestUpdatedAt>
<latestUpdatedAt>2014-06-07T00:00:00-08:00</latestUpdatedAt>
</leadSelector>
</mkt:paramsGetMultipleLeads>
</soapenv:Body>
</soapenv:Envelope>
```

Posted on _2014-09-24_ by _Murta_

## Add Dynamic Content to an Email

Let's say you send out a daily email, and you want to automatically include that day's date in the email template. To do this, you use tokens and email scripting in Marketo.

1. Create a token.** Navigate to the program where you want to use the token. Click My Tokens.
1. Double click on Email Script. Then name this token. Then click Edit.
1. Paste the email script below in this window. Then click Save.

## Access Velocity's calendar object

`set($x = $date.calendar)`

## Format date

`set($current_date = $date.format('dd-MM-yyyy', $x.getTime()))`

## Returns today's date

`$current_date`

1. Reference the token in the email template.** Note the name of the token. Navigate to your email draft. Include the token.  When the email is sent out, the value of the token will be populated. For more information, please see the [Email Scripting developer documentation](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/email-scripting).

Posted on _2014-11-22_ by _Murta_

## Bash Security Advisory

Marketo has performed a thorough investigation of the Bash vulnerability, also known as [Shellshock (CVE-2014-6271)](https://nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-6271), and have concluded that we are not susceptible to these attacks. In addition, we have taken preventive action by updating the software to the latest version to ensure compliance with the [CERT recommendation](https://www.cisa.gov/news-events/alerts/2014/09/25/gnu-bourne-again-shell-bash-shellshock-vulnerability-cve-2014-6271).

Posted on _2014-09-26_ by _Murta_

## How to Update SOAP API Credentials

It is a best practice to regularly update your [SOAP API](/help/soap-api/soap-api.md) credentials. Currently, there is no way to programmatically do this via the Marketo API. The instructions below will show you how to update your SOAP API credentials via the Marketo UI.

1. Go to the Admin section and click on Web Services.
1. Set an Encryption Key that is at least 10 characters, click Save Changes.

Posted on _2014-09-29_ by _Murta_

## How to Clean Up Your Marketo Database

**NOTE: This is a guest blog post. Josh Hill is the Marketo Practice Lead at Perkuto, a marketing automation agency. Josh works at the intersection of marketing, sales, and technology to deliver revenue generation systems. He writes about marketing automation and demand generation at MarketingRockstarGuides.com.** Keeping your Marketo database clean is an important part of administering this powerful system. If your Marketo data is dirty or your CRM data is dirty, then your job as a marketing manager becomes a whole lot harder as you explain why campaigns went to the wrong people or your reports are "directional." A 2011 Gartner study noted that poor data quality lowered labor productivity by 20%. That's 20% of your time (8 hours/week or 1 day per week) that is wasted because you had to fix data. But this loss pales in comparison to the revenue lost because your targeting was wrong. Here are the top five reasons to invest in keeping your data clean: - Better segmentation of leads and clients can be done, allowing you to focus your message on the right people at the right time. That 20% off coupon should go only to new prospects, not your best clients, right? - Avoid duplicate sending of emails. In spite of all the precautions, it is possible to send multiple emails to the same lead, usually because duplicate records are not merged. - Accurate reporting to your boss. Because the CMO has a seat at the revenue table, you must have accurate, consistent, and repeatable reports…or you cannot be a revenue marketer anymore. - Hurt pending deals if you email the wrong marketing material to key prospects during sales negotiations.

If your database is not providing that detail on the lifecycle stage, that could sink a deal or two. - Remove bad or old leads to stay below pricing thresholds. Much has been written about the cost of bad data. Your most immediate concern is that too many bad, duplicate, or old leads are pushing you over your Marketo or Salesforce pricing tier, which can result in thousands of fees per year. So, how do you keep your database clean? You can follow these principles of data cleanliness, but how do you get there inside Marketo? I make a few assumptions about your system: - You have a standard Marketo system. - You have a typical Lead-Contact-Account Salesforce setup. - You are syncing all records between systems. - You are not using purposeful duplicates.

Find the Right Leads to Fix** Let's first find the leads that are potential problems. With each client, I go through a series of smart lists to determine the health of their database. I suggest you do the same on a monthly basis. Once the smart lists are working, this takes you no more than 15 minutes per month. This is a great way to demonstrate the ROI of your work and Marketo. Create a table to understand the total impact on your database. The example below includes the criteria that I look for, so be sure to include other fields important to your business. Breakdown each group by Marketo Only, SFDC Leads, and SFDC Contacts.

Use Automation to Correct Data Values: The use of automation rules to correct common misspellings or missing data goes back several decades. In the 1960s, poor data quality when sending direct mail could result in thousands of dollars being wasted. Today, data quality mistakes ruin reputations faster than a misdirected mail piece. Email reputation, choice of language, and customer experience matter and they matter more because mistakes can go publicly viral in minutes. Save your firm's reputation with automated data cleansing. These data management flows are one of the first things I setup in Marketo. Most firms set up similar flows: - Country Corrector (although you should have followed Principle 1 to not need this) - State Corrector or Mapper – often helpful if you have Country and Inferred State. - Count of Employees to Employee Range. - Bad Lead Source to Good Lead Source - Email Invalid to Email is Good if the Email changed. - Translate old field values to a new field (Full to Empty). For example, this flow adjusts Employee Range based on Employee Number.

Data Appending Tools Filling in empty fields is critical to segmenting your database better. Leads do not always fill in the right Industry or Function or even Title on a form. Sometimes you have legacy data from an older system. This lack of data means you have to either send that email to fewer people, or possibly the wrong people. To fix this, you need data appending tools.

Option 1: Fill it in yourself. You may be able to interpolate data to backfill empty fields. Perhaps you have a SIC code instead of Industry name or Annual Revenue vs. Annual Revenue Range. Marketo can easily automate these fixes.

Option 2: Find a data appending/enrichment vendor via LaunchPoint There are [several vendors in Launchpoint](https://exchange.adobe.com/apps/browse/ec?product=MRKTO), such as NetProspex and ReachForce that can help you enrich your lead data. Some ask you for a sheet of your data, which they then clean and send back. The better option is an automated tool in Marketo or Salesforce, which checks the fields you, want, and then pushes back the right data. Most vendors use the [Marketo API or Webhooks](/help/home.md) to accomplish this.

Option 3: Use Marketo APIs to update leads You can use the Marketo APIs to identify leads that need to be cleansed, and then update them via the API. The [Get Multiple Leads by Filter Type REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) is a good starting place for pulling out data from Marketo that match certain criteria. To update leads, please look at the [Create/Update Leads REST API](/help/rest-api/leads.md).

Alternatively, you can set up a [Marketo Webhook](/help/webhooks/webhooks.md) to notify an external system that a certain event has happened, such as a form fill out. You can then respond back with values to update the lead with.

What Should You Automate? I provided some suggestions in Step 1. But if we want to clean up more of the database, we need to go beyond fixing data values. - Competitor Blacklisting: make sure you are automating the collection and blacklisting of your competitors. If you have competitor-partners, it is still good to mark them properly and place them in a list to possibly suppress.  - Multiple Hard Bounces: definitely automate this flow. If a lead hard bounces more than twice in a 30 day period, set them to Suspended or Invalid. Then go in once a month to review if the issue was a typo or something else.  - Multiple Soft Bounces in 30 Days: set these to marketing suspended=TRUE for 30 days.  - Spam Trap suspension/deletion: be careful if your product means people use possible spam trap addresses. See a list of spam traps. The Smart List.

**What Not to Automate** Never automate the deletion of leads, because there is too much risk in accidentally mass deletion of the wrong records. Instead, review once a month leads marked as Trash. But if you want to delete trashed leads, run a flow like this with a 30-day wait.

Caveats: Using automation is a great way to save time and keep your database clean. Automation is a double-edged sword because if you set it up wrong, it can cause havoc in a few minutes. Be careful as you go through these processes and keep everyone informed. Generally I advise against deleting any SFDC Contacts because they are more likely to be active Opportunities, Clients, or ex-Clients. You may be required by Finance or Legal to retain certain records and Contacts are attached to those records. Instead, focus on Contacts that Hard Bounce, become Invalid, or become No Longer There. Now, you know a few of the techniques to keep your Marketo database clean. Let us know if you came up with other ways to automate these processes using the API or Webhooks!

Posted on _2014-10-08_ by _Josh_

## October 2014 Release Updates

### External Page Prefill

Marketo forms do not provide native prefill functionality when loaded outside of a Marketo landing page. However, we can still implement this using the [Marketo APIs](/help/rest-api/rest-api.md) and the [Forms 2.0 JavaScript API](/help/javascript-api/forms-api-reference.md). The first step is to retrieve the lead data from Marketo via a REST call from your server. Assuming that we do not have an immediate way to crossreference lead IDs or another unique identifier from the server, we need to use the Munchkin cookie, '_mkto_trk', to retrieve data from the Marketo server, using the [Get Leads By Filter Type method](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET).

To make this call, we need your Authentication and REST endpoints from your instance. Once you have authenticated with your Marketo instance that we need to make a call to the leads API at `https://<host>/rest/v1/leads.json`. We then need to create a querystring to filter on the Marketo cookie like this `?filterType=cookie&filterValues=`. You need to retrieve the specific value from the '_mkto_trk' key sent to your server by the client. NOTE: The _mkto_trk cookie value includes an ampersand and needs to be URL encoded to `%26` to be properly accepted by the Marketo endpoint. By default the leads API returns four fields: `id`, `email`, `firstName`, and `updatedAt`. To set a specific set of fields, you need to include a `fields` query parameter, with field names separated by commas like this: `&fields=email,firstName,lastName,company`. Ultimately our call is going to look like this:

`https://<host>/rest/v1/leads.json?filterType=cookie&filterValues=<cookie>&fields=email,firstName,lastName,company&access_token=<token>`

When we make this call, it returns a JSON object which looks this:

```json
{
    "requestId":"e42b#14272d07d78",
    "success":true,
    "result":[
        {
        "id":50,
        "firstName":"Kenny",
 "lastName":"Elkington",
        "email":"<mkto@example.com>",
 "company":"Marketo Inc."
        }]
};
```

Now that we have our lead details, we can go about mapping these into a Marketo form, using the whenReady and vals methods in JavaScript. First we need to set the Lead results as a variable on our page:

```javascript
<script>
//print your JSON object dynamically as the mktoLead variable
var mktoLead = {
    "requestId":"e42b#14272d07d78",
    "success":true,
    "result":[
        {
        "id":50,
        "firstName":"Kenny",
  "lastName":"Elkington",
        "email":"mkto@example.com",
  "company":"Marketo Inc."
        }]
}
</script>
```

Now that we have our results on the page, we can map them into our form fields:

```javascript
<script>
MktoForms2.whenReady( function(form) {
 //set the first result as local variable
 var mktoLeadFields = mktoLead.result[0];
    //map your results from REST call to the corresponding field name on the form
 var prefillFields = {
   "Email" : mktoLeadFields.email,
   "FirstName" : mktoLeadFields.firstName,
   "LastName" : mktoLeadFields.lastName,
   "Company" : mktoLeadFields.company
   };
 //pass our prefillFields objects into the form.vals method to fill our fields
 form.vals(prefillFields);
 }
 );
</script>
```

Posted on _2014-10-24_ by _Kenny_

## Replace Email HTML

This post shows you how to remove the HTML generated by Marketo for an email. You can then use your own HTML without Marketo reformatting it.

1. Navigate to the email, and then click Edit Draft.
1. Click Email Actions, click HTML Tools, and then click Replace HTML.
1. Replace the code in this box with your HTML. Then, click Save.

Posted on _2014-10-28_ by _Murta_

## Get a Visitor's Cookie ID and then Query Associated Lead Data

Using the [Get Multiple Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) REST endpoint, you can query lead data based on a user's cookie id. For example, you can use this approach to prefill a form on a non-Marketo landing page. This post shows you how to capture the user's cookie value during a webpage visit, query [Get Multiple Leads REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) with that cookie id, and then return the user's lead data. First, we need the value of the user's Munchkin cookie, '_mkto_trk'. Here is an example JavaScript function that you can use to get the cookie value. Please see [this StackOverflow page](https://stackoverflow.com/questions/10730362/get-cookie-by-name) for more information about this approach. I recommend setting a delay of 500ms after the page load event before calling this function. This gives Munchkin time to load, and cookie the user.

```javascript
//Function to read value of a cookie
function readCookie(name) {
    var cookiename = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length,c.length);
    }
    return null;
}

//Call readCookie function to get value of user's Marketo cookie
var value = readCookie('_mkto_trk');
```

Next, pass the value of the '_mkto_trk' cookie to your server. To retrieve lead data, from your server you make a call to the [Get Multiple Leads REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) with this cookie value. You need your Authentication and REST endpoints from your instance. Your call should be structured as follows:

NOTE: The `_mkto_trk` cookie value includes an ampersand and needs to be URL encoded to `%26` to be properly accepted by the Marketo endpoint.

```java
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/leads.json"
# Replace with your access token
auth_token =  "?access_token=" + "cde42eff-aca0-48cf-a1ac-576ffec65a84:ab"
# Replace with filter type and values
filter_type_and_values = "&filterType=cookies&filterValues=id:AAA-BBB-CCC%26token:_mch-marketo.com-1418418733122-51548&fields=cookies,email"
request_url = marketo_instance + endpoint + auth_token + filter_type_and_values

# Make request
response = RestClient.get request_url

# Returns Marketo API response
puts response
```

The example above will return the email and all cookies associated with the user. You can then use this data to personalize the subsequent page the user visits.

`{"requestId":"aa00#14a405aa786","result":[{"id":583,"email":"<testaccount@gmail.com>","cookies":"_mch-marketo.com-1418418733122-51548"}],"success":true}`

Posted on _2014-10-30_ by _Murta_

## When do you need a developer to help with marketing automation

NOTE: This is a guest blog post. Josh Hill is the Marketo Practice Lead at Perkuto, a marketing automation agency. Josh works at the intersection of marketing, sales, and technology to deliver revenue generation systems. He writes about marketing automation and demand generation at MarketingRockstarGuides.com.

Marketing automation platforms are tremendously powerful out of the box and in the hands of an experienced operator. Platforms, by definition, allow the use of extension applications to make the system do even more amazing things for your team. You may think Marketo's logic engine is capable of so much (and it is), but there are limitations. Marketo cannot do everything for you, nor should it.

 There are other tools out there that perform their function better than Marketo could build it. Marketo's platform is very open, enabling the [LaunchPoint ecosystem of applications](https://exchange.adobe.com/apps/browse/ec?product=MRKTO) to exist. You can also use this openness to expand the capabilities of your site and Marketo to match your business needs. The great thing about a platform like Marketo is it allows the typical marketer the ability to build pages, emails, and routing logic without being a full-fledged programmer.
A marketer these days does need to understand logic, but actual programming is best left to the experts. So, how do you know when you need to call in a developer? I have a few basic rules, or heuristics, to decide when a programmer should get involved: - When Marketo doesn't have an obvious filter, trigger, or feature for the need, it can often be done with some JavaScript or jQuery. - Will this be too complex for Marketo by itself? - Can Marketo even do this? - Is this a website customization not easily supported? - Does Marketo need to talk to a website or other database? - Does it sound like something a computer can do, but Marketo doesn't have a function for it? Remember that while Marketo may not offer an out-of-the-box function, it does connect to many third-party integrations as well as custom connections.

Take a look at a few of these categories at the [LaunchPoint marketplace](https://exchange.adobe.com/apps/browse/ec?product=MRKTO): - [Analytics Tools](https://exchange.adobe.com/apps/browse/ec?product=MRKTO) - [Data Appending](https://exchange.adobe.com/apps/browse/ec?product=MRKTO) - [Content Management Systems](https://exchange.adobe.com/apps/browse/ec?product=MRKTO) Some third party applications provide intuitive control panels and setup tools right within the platform (GoToWebinar). These are "native" integrations where the most work that you need to do is set up the login and then use it in Marketo. Other extensions, however, require the use of the more complex API that must be programmed more directly.

**Marketo's Integration Options** - LaunchPoint Integration – usually a login or easy settings. - API Integration – requires setup of API and programming: (1) [REST API](/help/rest-api/rest-api.md) (2) [SOAP API](/help/soap-api/soap-api.md) (3) [Webhook Integration](/help/webhooks/webhooks.md) – requires setup of special code, but fairly easy. (4) [Email Scripting](./email-scripting.md) (Velocity) - JavaScript and jQuery: (1) [Forms 2.0](/help/javascript-api/forms-api-reference.md) (2) [Lead Tracking (Munchkin)](/help/javascript-api/lead-tracking.md) (3) [RTP JS](/help/javascript-api/web-personalization.md) Here are a few use cases for using a developer to extend the capabilities of the Marketo platform. Do you have any of these use cases? If so, it might be time to speak with a developer. [Visit the services partner section on LaunchPoint](https://exchange.adobe.com/apps/browse/ec?product=MRKTO).

Posted on _2014-11-06_ by _Josh_

## Integrating Slack with Marketo

 [Slack is an enterprise collaboration platform](https://slack.com/). If your team is on Slack, you can easily bring Marketo notifications into your workflow. This post shows you how to add a notification to your chat log when a specific lead activity happens in Marketo. Potential use cases include notifying your entire team about a form fill, a visit to a pricing page, or a lead that has not been contacted in 30 days. The screenshot below shows how the Marketo notification will look like in Slack after following the steps in this help article.

1. Log in to Slack. Click on Integrations in Slack
1. Click the Add button for Incoming Webhooks
1. Choose the Channel for the Marketo Notification. Then Click Add Incoming Webhook Integration.
1. Copy and Paste Webhook URL (which is needed for step eight)
1. Choose a Name for the Notification
1. Log in to Marketo. Go to Admin. Click on Webhooks.
1. Click New Webhook
1. Enter a Name for the Webhook. Enter the Webhook URL from Step Four. Enter Post as Request Type. Enter a Payload Template.

 Here is the payload template from the screenshot. It uses lead-level first name, company, and email address tokens.

`payload={"text": "DEVELOPER SITE ALERT: {{lead.First Name:default=edit me}} {{lead.Company=edit me}}, {{lead.Email Address:default=no email address}}" }`

1. Set Up Trigger Campaign in Marketo. Flow Step is to Call Webhook to Slack. Smart List is a Web Page Visit.
1. Verify It Works.

Please see the [developer documentation](./webhooks/webhooks.md) for more information about webhooks in Marketo.

Posted on _2014-11-10_ by _Murta_

## Integrating Litmus with Marketo

[Litmus is a service](https://www.litmus.com/) for testing emails across browsers and email clients. Litmus also provides analytics around emails including clicks, opens, and deletions. This post shows you how to integrate Marketo with Litmus.

1. When setting up your email program in Marketo, click "My Tokens" on the program dashboard
1. Drag "Email Script" token to the middle panel to add it.
1. Name the token and click "Click to edit"
1. On the right, underneath "Standard Objects," expand the "Lead" category. Find the "Email Address" field and check the box. In the empty script space on the left of this same page, paste in the tracking code provided by Litmus. In the Litmus code, replace every instance of `{{lead.Email Address}}` with `${lead.Email}`. Click Save to close the lightbox window and click "Save" again on the tokens page.
1. Make note of the name of the token `{{my.LitmusToken}}`. Open the email that you want to track. At the very bottom of your email, place your new script token. You can also add default information to match the Litmus version `{{my.LitmusToken:default=editme}}`.

When the email is sent, the script will be placed into the email by Marketo.

Posted on _2014-11-18_ by _Murta_

## Specify an image when a Marketo landing page is shared on Facebook

Let's say you want an image to show up automatically when you share a Marketo landing page on Facebook. Maybe you also want this image to not be on the Marketo landing page itself, but just on the Facebook share. You can this by adding an open-graph meta tag to your Marketo landing page. The steps to do this are below.

1. Select your landing page. Then click Edit Draft.
1. Click Edit Page Meta Tags.
1. Add open-graph meta to the Facebook OG Tags section. Then click Save. Here is the format: `<meta property="og:image" content="http://example.com/example.jpg"/>`

[See Facebook's developer documentation](https://developers.facebook.com/docs/sharing/best-practices) about open-graph meta tags for more information.

Posted on _2014-11-17_ by _Murta_

## Redirect Page based on Referrer

Let's say you would like to prevent direct traffic to a Marketo landing page. Imagine this page has downloadable content like a PDF that you would like a user to first fill out a form before receiving. You could solve this by checking if the user came from a certain page. In this case, it would be the page where the user has to fill out a form. If the user is not coming from that page, you can then redirect the user to the form fill out page. To accomplish this, you have to check if the referrer page to the landing page with content is the form fillout page.
 Replace both instances of `http://example.com/PageWithForm` in the snippet below with a link to the page that you want to the user to come from. This could be the form fill out page.**

```javascript
<script>
window.onload = function() {
  if (document.referrer !== "http://example.com/PageWithForm") {
    document.location.href = "http://example.com/PageWithForm";
  };
 };
</script>
```

Include the customized JavaScript snippet before the closing tag on your Marketo landing page with content.** If the user is not sent to the landing page with content from the form fill out page, the user will now be redirected to the form fill out page.

Posted on _2014-11-18_ by _Murta_

## Integrating Trello with Marketo

Trello is a [popular web-based project management application](https://trello.com/). If your team uses Trello, you can easily bring Marketo notifications into your workflow. This post shows you how to add a card with a Marketo notification to your Trello board. This card will be added when a specific lead activity happens in Marketo. Potential use cases include notifying your entire team about a form fill, a visit to a pricing page, or a lead that has not been contacted in 30 days.

1. Login into Trello. Navigate to the Trello board that will add Marketo notifications in. Click Add a List, and then name it.
1. Click Show Sidebar. Click Email-to-board Settings. Note the email in "Your email address for this board" box. This email will be used in Step Six. Choose which list to add the Marketo notification.
1. Log in to Marketo. Click the new Smart Campaign. Enter a name, and then click Save.
1. Navigate to Smart List. Choose a trigger for this smart campaign. In this example, we use Form Fill trigger. Drag Fills out Form trigger to Middle Panel. Select the Form that you would like to trigger this notification.
1. Create an email. Click New. Click Local Asset. Click New Email. Name the email. Then click Create.
1. Click "Edit Draft" for the email you created in Step Five. Drag the relevant tokens that you would like to show in your Trello card. The subject line of the Marketo email appears in the title of the Trello card, and the body of the Marketo email will appear in the description of the Trello card. For example, you can use "LEAD ALERT: `{{lead.First Name:default=edit me}}` `{{lead.Last Name:default=edit me}}` if you want the lead's first and last name to be in the title of the Trello card. Then approve the email.
1. Navigate to Smart Campaign. Click Flow. Drag Send Alert to the Middle Panel. Select the Email that was just created. Select "Send to" as None. Select "To Other Emails" as the Trello email from Step Two.
1. Click Schedule in the top menu. Click Activate. Click Confirm.
1. Test the integration. A card with the lead's first and last name in the title will show up in the Trello board. See [Trello's documentation](https://support.atlassian.com/trello/) for more information.

Posted on _2014-11-18_ by _Murta_

## Find Leads by Custom Field Value

Let's say you want to get leads from the Marketo API who match certain activity or inactivity criteria. For example, maybe you want to find a leads whose score has not changed in the past 30 days. By following the steps in this post, you are able to get this list of leads. To do this, we create a smart campaign in Marketo that identifies leads whose score has not changed in the past 30 days, and then store a value on these leads to identify them. We will then query the API with this value.

1. Create a new custom field called customLeadStatus** Login to Marketo, and go to the Admin panel. Click on Field Management. Click "New Custom Field".  Name the field. Then click Create.
1. Create a smart campaign with a smart list that looks for leads that have not been updated in 30 days.** Click New Smart Campaign. Name the new smart campaign. Drag Not Score Was Changed from right panel to middle panel.
1. Add a flow step to the smart campaign from Step 3 to update the customLeadStatus field with a new value.** Drag Change Data Value from right panel to middle panel.
1. Update Smart Campaign to allow leads to run through multiple times.** Click Schedule. Then click Edit.  Select every time. Then click Save. The campaign will now start running.
1. Query the [Get Multiple Leads by Filter Type REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET). Providing the parameters filterType=customLeadStatus & filterValue=needsEnrichment.**

This is an example request that returns this data.

`<https://AAA-BBB-CCC.mktorest.com/rest/v1/leads.json?access_token=><yourAccessToken>&filterType=customLeadStatus&filterValues=needsEnrichment`

A successful API call returns JSON data with leads whose customLeadStatus field matches the value of needsEnrichment. Review the [Get Multiple Leads by Filter Type REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) for more information.

Posted on _2014-11-22_ by _Murta_

## Opportunity Sync via SOAP API

This post describes how to insert Opportunities into Marketo via the SOAP API and associate them with companies and leads. It starts with an explanation of how this process works and then provides code samples for each of the scenarios.

**Table Structure Diagram** First of all, the diagram below describes the table structure. The Id is auto-generated on creation of a record (sequential number). The field in bold are required: only Opportunity Person Role has required fields. The fields in parentheses are optional and so are the connections with a dotted line.

**Basic Opportunity Insertion** You first insert the Opportunity, and then the Opportunity Person Role, which links the Opportunity to the Lead(s). For this example, well use the Lead Id and the Opportunity Id to specify the Opportunity Person Role. You get the Opportunity Id in the SOAP Response when creating the Opportunity. The Lead Id is visible on every Lead in the Marketo Lead database.

**Company Link** In most cases, you want to link an Opportunity to a Company, in addition to an individual. In Marketo, you can't access the Company records via the SOAP API, only the Lead records (the Lead records contain the company fields). It is still possible to link Opportunities to a Company by adding a unique Company identifier to each Lead, and using that ID in your Opportunity. Step 1 is to create a 'Company Id' field on the lead record and populate it with a unique identifier, usually from a back-end system. Step 2 is to create a 'Company Id' field on the Opportunity: you have to ask Marketo Support or Consulting to create such a field for you. Then populate this field when creating Opportunities, which connects the Opportunity to the Company. This is especially important if you use Marketo Revenue Cycle Analytics and you want to use the Opportunity Influence Analyzer, which depends on Company information.

**Using External Identifiers** In many cases, you may have your own unique identifiers when integrating with a back-end system. It is possible to use these unique identifiers in Marketo through Foreign keys. For Leads, you would typically use the Foreign System Person Id (FSPID), which is used instead of the Marketo Id or email address as unique identifier. The FSPID is a hidden system field, which is not visible inside Marketo. If you're not already doing so, it is necessary for Opportunity sync to also save the FSPID in a custom field, for example "Foreign Id" (you can name the field anything). You can create this field yourself as a Marketo administrator. For Opportunities, you have Marketo Support create another custom field on Opportunity, for example called "Foreign Id" (you can name it anything). Then populate this field when inserting Opportunities. Finally, when you create the Opportunity Person Role, you use both foreign keys to specify the link between Leads and Opportunities, instead of using the Marketo IDs. You can also use the foreign keys to update Leads of Opportunities. At this time, it's not possible to add a foreign key to the Opportunity Person Role records, so you'll have to use the auto-generated Marketo Id for this (which you get in the SOAP response after creating the Opportunity Person Role).

**Code Example** Steps: 1. Insert/update Lead with Foreign Key & Company Id 1. Insert Opportunity with Foreign Key 1. Insert Opportunity Person Role with Foreign Keys 1. SOAP Request – Updating existing Lead with Foreign Key & Company Id This updates an existing Lead (Marketo Id "6") with the Foreign Key "12346" and the Account/Company Id "C123". We are also saving the Foreign Key in a custom field, because we need that for the Opportunity Person Role. Using a Foreign Key is optional: you can also use the Marketo Id to link this Lead to the Opportunity. Using the Company Id is also optional, but it's required if you want to use the Opportunity Influence Analyzer in RCA. Request:

```xml
<soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:mkt="<http://www.marketo.com/mktows/">
   <soapenv:Header>
      <mkt:AuthenticationHeader>
         <mktowsUserId>\*\*\*</mktowsUserId>
         <requestSignature>\*\*\*</requestSignature>
         <requestTimestamp>2014-11-20T15:18:30-07:00</requestTimestamp>
      </mkt:AuthenticationHeader>
   </soapenv:Header>
   <soapenv:Body>
      <mkt:paramsSyncLead>
         <leadRecord>
            <Id>6</Id>
            <ForeignSysPersonId>12346</ForeignSysPersonId>
            <leadAttributeList>
               <attribute>
                  <attrName>FSPID</attrName>
                  <attrValue>12346</attrValue>
               </attribute>
               <attribute>
                  <attrName>cAccountFSID</attrName>
                  <attrValue>C123</attrValue>
               </attribute>
            </leadAttributeList>
         </leadRecord>
         <returnLead>false</returnLead>
      </mkt:paramsSyncLead>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>" xmlns:ns1="<http://www.marketo.com/mktows/">
   <SOAP-ENV:Body>
      <ns1:successSyncLead>
         <result>
            <leadId>6</leadId>
            <syncStatus>
               <leadId>6</leadId>
               <status>UPDATED</status>
               <error xsi:nil="true"/>
            </syncStatus>
            <leadRecord xsi:nil="true"/>
         </result>
      </ns1:successSyncLead>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Request – Opportunity Creation In this case, 2 custom fields have been created on the Opportunity table: - `opportunityId` → holds the Opportunity unique ID - `cAccountFSID` → holds the company reference Instead of specifying your own Opportunity ID. You can also use the Marketo-generated Opportunity ID. In that case you leave out the External Key node. The Company association is also optional, but required if you want to use the Opportunity Influence Analyzer in RCA. Request:

```xml
<soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:mkt="<http://www.marketo.com/mktows/">
   <soapenv:Header>
      <mkt:AuthenticationHeader>
         <mktowsUserId>\*\*\*</mktowsUserId>
         <requestSignature>\*\*\*</requestSignature>
         <requestTimestamp>2014-11-20T15:03:28-07:00</requestTimestamp>
      </mkt:AuthenticationHeader>
   </soapenv:Header>
   <soapenv:Body>
      <mkt:paramsSyncMObjects>
         <mObjectList>
            <!--Zero or more repetitions:-->
            <mObject>
               <type>Opportunity</type>
               <externalKey>
                  <name>opportunityId</name>
                  <value>Opportunity_4</value>
               </externalKey>
               <attribList>
                  <attrib>
                     <name>opportunityId</name>
                     <value>Opportunity_4</value>
                  </attrib>
                  <attrib>
                     <name>Name</name>
                     <value>Opportunity 4 for ACME</value>
                  </attrib>
                  <attrib>
                     <name>IsClosed</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>IsWon</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>Amount</name>
                     <value>501.00</value>
                  </attrib>
                  <attrib>
                     <name>CloseDate</name>
                     <value>2014-10-24</value>
                  </attrib>
                  <attrib>
                     <name>ExpectedRevenue</name>
                     <value>501</value>
                  </attrib>
                  <attrib>
                     <name>Probability</name>
                     <value>100</value>
                  </attrib>
               </attribList>
               <associationList>
                  <mObjAssociation>
                     <mObjType>Company</mObjType>
                     <externalKey>
                        <name>cAccountFSID</name>
                        <value>C123</value>
                     </externalKey>
                  </mObjAssociation>
               </associationList>
            </mObject>
         </mObjectList>
         <operation>UPSERT</operation>
      </mkt:paramsSyncMObjects>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
   <SOAP-ENV:Body>
      <ns1:successSyncMObjects>
         <result>
            <mObjStatusList>
               <mObjStatus>
                  <id>40</id>
                  <externalKey>
                     <name>opportunityId</name>
                     <value>Opportunity_4</value>
                  </externalKey>
                  <status>CREATED</status>
               </mObjStatus>
            </mObjStatusList>
         </result>
      </ns1:successSyncMObjects>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Request – Opportunity Person Role This request links the Lead to the Opportunity. You can specify multiple links in a single SOAP Request (this example links the Opportunity to only 1 Lead). This uses the foreign keys to specify the link, but in the comments it also shows how to use the actual IDs (in this case: 6 for the Lead Id and 40 for the Opportunity Id). This "IsPrimary" and "Role" fields are optional. Request:

```xml
<soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:mkt="<http://www.marketo.com/mktows/">
   <soapenv:Header>
      <mkt:AuthenticationHeader>
         <mktowsUserId>\*\*\*</mktowsUserId>
         <requestSignature>\*\*\*</requestSignature>
         <requestTimestamp>2014-11-20T15:18:30-07:00</requestTimestamp>
      </mkt:AuthenticationHeader>
   </soapenv:Header>
   <soapenv:Body>
      <mkt:paramsSyncMObjects>
         <mObjectList>
            <!--Zero or more repetitions:-->
            <mObject>
               <type>OpportunityPersonRole</type>
               <attribList>
                  <attrib>
                     <name>IsPrimary</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>Role</name>
                     <value>Marketing Manager</value>
                  </attrib>
               </attribList>
               <associationList>
                  <mObjAssociation>
                     <mObjType>Lead</mObjType>
                     <!--id>6</id-->
                     <externalKey>
                      <name>FSPID</name>
                      <value>12346</value>
                     </externalKey>
                  </mObjAssociation>
                  <mObjAssociation>
                     <mObjType>Opportunity</mObjType>
                     <!--id>40</id-->
                     <externalKey>
                      <name>opportunityId</name>
                      <value>Opportunity_4</value>
                    </externalKey>
                  </mObjAssociation>
               </associationList>
            </mObject>
         </mObjectList>
         <operation>UPSERT</operation>
      </mkt:paramsSyncMObjects>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
   <SOAP-ENV:Body>
      <ns1:successSyncMObjects>
         <result>
            <mObjStatusList>
               <mObjStatus>
                  <id>11</id>
                  <status>CREATED</status>
               </mObjStatus>
            </mObjStatusList>
         </result>
      </ns1:successSyncMObjects>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

**Alternative Approach (Do Step 2 and 3 in One Call)** While you can first insert the opportunity, then the Opportunity Person Role, it's also possible to do this in one SOAP Call. However, you need to use the Foreign Key for Opportunity (you can't use the auto-generated Opportunity ID in Opportunity Person Role, because the Opportunity hasn't been generated yet). Of course, you can also link multiple Leads to this Opportunity in this same API Call (this example links the Opportunity to only 1 Lead). Request:

```xml
<soapenv:Envelope xmlns:soapenv="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:mkt="<http://www.marketo.com/mktows/">
   <soapenv:Header>
      <mkt:AuthenticationHeader>
         <mktowsUserId>\*\*\*</mktowsUserId>
         <requestSignature>\*\*\*</requestSignature>
         <requestTimestamp>2014-11-20T15:44:08-07:00</requestTimestamp>
      </mkt:AuthenticationHeader>
   </soapenv:Header>
   <soapenv:Body>
      <mkt:paramsSyncMObjects>
         <mObjectList>
            <!--Zero or more repetitions:-->
            <mObject>
               <type>Opportunity</type>
               <externalKey>
                  <name>opportunityId</name>
                  <value>Opportunity_5</value>
               </externalKey>
               <attribList>
                  <attrib>
                     <name>opportunityId</name>
                     <value>Opportunity_5</value>
                  </attrib>
                  <attrib>
                     <name>Name</name>
                     <value>Opportunity 5 for ACME</value>
                  </attrib>
                  <attrib>
                     <name>IsClosed</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>IsWon</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>Amount</name>
                     <value>1500</value>
                  </attrib>
                  <attrib>
                     <name>CloseDate</name>
                     <value>2014-10-24</value>
                  </attrib>
                  <attrib>
                     <name>ExpectedRevenue</name>
                     <value>1500</value>
                  </attrib>
                  <attrib>
                     <name>Probability</name>
                     <value>100</value>
                  </attrib>
               </attribList>
               <associationList>
                  <mObjAssociation>
                     <mObjType>Company</mObjType>
                     <externalKey>
                        <name>cAccountFSID</name>
                        <value>C123</value>
                     </externalKey>
                  </mObjAssociation>
               </associationList>
            </mObject>
             <mObject>
               <type>OpportunityPersonRole</type>
               <attribList>
                  <attrib>
                     <name>IsPrimary</name>
                     <value>1</value>
                  </attrib>
                  <attrib>
                     <name>Role</name>
                     <value>Marketing Manager</value>
                  </attrib>
               </attribList>
               <associationList>
                  <mObjAssociation>
                     <mObjType>Lead</mObjType>
                     <!--id>6</id-->
                     <externalKey>
                      <name>FSPID</name>
                      <value>12346</value>
                     </externalKey>
                  </mObjAssociation>
                  <mObjAssociation>
                     <mObjType>Opportunity</mObjType>
                     <externalKey>
                      <name>opportunityId</name>
                      <value>Opportunity_5</value>
                    </externalKey>
                  </mObjAssociation>
               </associationList>
            </mObject>
         </mObjectList>
         <operation>UPSERT</operation>
      </mkt:paramsSyncMObjects>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
   <SOAP-ENV:Body>
      <ns1:successSyncMObjects>
         <result>
            <mObjStatusList>
               <mObjStatus>
                  <id>41</id>
                  <externalKey>
                     <name>opportunityId</name>
                     <value>Opportunity_5</value>
                  </externalKey>
                  <status>CREATED</status>
               </mObjStatus>
               <mObjStatus>
                  <id>12</id>
                  <status>CREATED</status>
               </mObjStatus>
            </mObjStatusList>
         </result>
      </ns1:successSyncMObjects>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

Posted on _2014-11-26_ by _Jep_

## Multithread REST API Requests

If you would like to improve performance when calling the Marketo API, you can make concurrent requests. This approach allows you to get more data in a shorter period of time. When making an API request, part of the round-trip time between the client and server is the transfer time on the wire. So, if we can reduce the transfer time on the wire for the requests in aggregate, we improve performance. The sample code below shows you how to do this in Ruby. It uses EventMachine, which is an [event-processing library used for making multithreaded requests](https://github.com/igrigorik/em-http-request/wiki/Parallel-Requests). The example below calls the [Lead Activities API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET), and makes two concurrent requests. This approaches eliminates the transfer time from the client to the server for the second request. It does this by including the second request at the same time as the first request. The API responses are written to a text file.

```java
require 'em-http-request'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/activities.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
# Specify datetime needed as nextPageToken
since_date_time = ["&nextPageToken=A5YMOYZQBOGD2OSYYBYDAQGEMGLBDGDANAABQGRAQWAAKKID", "&nextPageToken=GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ"]
# Specify activities needed
activity_type_ids = "&activityTypeIds=1&activityTypeIds=12"
requesturl_a = marketo_instance + endpoint + auth_token + since_date_time.at(0) + activity_type_ids
requesturl_b = marketo_instance + endpoint + auth_token + since_date_time.at(1) + activity_type_ids

# Make request
EventMachine.run do
  http1 = EventMachine::HttpRequest.new(requesturl_a).get
  http2 = EventMachine::HttpRequest.new(requesturl_b).get

# When API response is received, write response to a text file
  http1.callback {
  File.open('response1.txt', 'w') do |t|
  t.puts http1.response
  end }

  http2.callback {
  File.open('response2.txt', 'w') do |t|
  t.puts http2.response
  end }
end
```

Posted on _2014-12-03_ by _Murta_

## Performance Tuning API Requests

This post discusses strategies to improve performance when requesting data from the Marketo API. However, you must weigh the benefits of these strategies against the operating constraint of Marketo API's daily limits.
**Strategy 1 – Request Less Data in Each API Call** Generally, as you request more data in an API call, the amount of time it takes to look up the data in the database by the Marketo server increases. If you are making an API call with date ranges, such as the [getMultipleLeads SOAP API](/help/soap-api/getmultipleleads.md), shorten the time range per call and compensate with more calls. For example, instead of requesting data from June 1 to July 1, request a single day at a time, such as one call for June 1 to 2, and then another call for June 2 to 1. If you are making an API call that returns data from Marketo lead fields, only request those fields necessary. Every additional lead field incrementally increases the amount of time an API call takes. Another approach is to reduce the batch size, or the number of leads requested per call.
**Strategy 2 - Make Concurrent Requests** To improve performance and pull more data at once. You can make concurrent requests to the API. This approach reduces the time on wire API requests spend in aggregate. For example, let's say you are making requests to the Get Multiple Leads by Filter Type. You can make concurrent requests for one request querying leads 1 to 300 and for another request querying leads 301 - 600.
**Strategy 3 - Cache Data** Some data in Marketo is changed less often, such as the list of lead fields, than other data, such as lead activity data. If you cache data that is less often updated, then you reduce the number of API calls you have to make. You will also get better performance because looking up the data locally is generally faster than accessing it from a remote web service.

Posted on _2014-12-05_ by _Murta_

## Send Marketo Form Data to Google Analytics

In Google Analytics, you can send custom data events, and then utilize the data to segment and analyze your website performance. The JavaScript code snippet below allows you to automatically push Marketo 2.0 Form data to Google Analytics after a visitor submits a web form. Here is how to set this up.

**Step One** Insert the JavaScript tag onto any page that includes Marketo Forms at the bottom of the code (before the tag). The JavaScript only sends only non-hidden fields (sendHiddenFields : false). This can be adjusted by changing sendHiddenFields from false to true. You can also select fields to exclude by adding additional field IDs in the 'fieldsToExclude' array.

```javascript
function pushFormDataToGa(a){
setTimeout(function () {
document.getElementsByTagName('form')[0].getElementsByClassName(a.submitButton)[0].addEventListener('click', function() {
  allFields = document.getElementsByTagName('form')[0].getElementsByTagName('input');
  for(i=0;i<allFields.length;i++){
   if( (allFields[i].type !="hidden" && allFields[i].type !="submit" && allFields[i].value !="" && a.fieldsToExclude.indexOf(allFields[i].id) === -1  ) || (allFields[i].type === "hidden" && a.sendHiddenFields) ){
    console.log( allFields[i].name + ": "  + allFields[i].value);
    if(typeof(_gaq) != "undefined"){
    //Classic
    _trackEvent("Marketo Form Submission", allFields[i].value , allFields[i].name
{'nonInteraction': 1});
    }else if(typeof(ga) !="undefined"){
    //Universal
    ga('send', 'event',"Marketo Form Submission", allFields[i].value , allFields[i].name, {'nonInteraction': 1});
}}}}, false);
}, 3000);}
pushFormDataToGa({
 submitButton: "mktoButton",
 fieldsToExclude: ["Email","LastName", "FirstName"],
 sendHiddenFields : false
});
```

**Step Two** The data in GA appears in the Reporting section. Go to Behavior > Events > Top Events. **Script Restrictions:** - This code sample is only compatible with [Marketo Forms 2.0](/help/javascript-api/forms-api-reference.md). - Due to Google's privacy policy you may not send any personal information (email or name). Aside from potential privacy concerns, this is personally identifiable info and so breaches [Google Analytics' Terms of Service](https://marketingplatform.google.com/about/analytics/terms/us/):

"You will not (and will not allow any third party to) use the Service to track, collect or upload any data that personally identifies an individual (such as a name, email address or billing information), or other data which can be reasonably linked to such information by Google."

Posted on _2014-12-16_ by _Yanir_

## Add a Full Name Field to a Marketo Form

We know that shorter web forms improve conversion rates. The JavaScript code sample below allows you to make your forms even shorter by merging the First and Last Name fields into one Full Name field. When visitors are typing in their full name, the script will automatically break the text into first and last name fields. For known visitors the script joins the first and last names, and then copy them to the new field so they won't have to fill the field again. Here is how to set this up.

**Step One** Create a new custom field in Marketo called Full Name. No need to create it in your CRM platform, as the script will only use this field to display the full name.
**Step Two** Add this field to all your web forms. Set your first name and last name fields as hidden. In the JavaScript, change the "splitFullName" configuration to contain the 3 field names. Note: Please make sure these names do not appear anywhere else on the page.
**Step Three** Insert the JavaScript into all your landing pages at the bottom of the code, before the tag.

```javascript
<script>
MktoForms2.whenReady(function (form){
        function splitFullName(a,b,c){
                String.prototype.capitalize = function(){
                        return this.replace( /(^|s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
                };
                document.getElementsByName[c](0).oninput=function(){
                        var fullName = document.getElementsByName[c](0).value;
                        if((fullName.match(/ /g) || []).length ===0 || fullName.substring(fullName.indexOf(" ")+1,fullName.length) === ""){
                                var first = fullName.capitalize();;
                                var last = "null";
                        }else if(fullName.substring(0,fullName.indexOf(" ")).indexOf(".")>-1){
                                var first = fullName.substring(0,fullName.indexOf(" ")).capitalize() + " " + fullName.substring(fullName.indexOf(" ")+1,fullName.length).substring(0,fullName.substring(fullName.indexOf(" ")+1,fullName.length).indexOf(" ")).capitalize();
                                var last = fullName.substring(first.length +1,fullName.length).capitalize();
                        }else{
                                var first = fullName.substring(0,fullName.indexOf(" ")).capitalize();
                                var last = fullName.substring(fullName.indexOf(" ")+1,fullName.length).capitalize();
                        }
                        document.getElementsByName[a](0).value = first;
                        document.getElementsByName[b](0).value = last;
                };
                //Initial Values
                if(document.getElementsByName[c](0).value.length < 2 && document.getElementsByName[b](0).value.length.length >2 && document.getElementsByName[a](0).value.length.length >2 ){
                        var first = document.getElementsByName[a](0).value.capitalize();
                        var last = document.getElementsByName[b](0).value.capitalize();
                        var fullName =  first + " " + last ;
                        console.log(fullName);
                        document.getElementsByName[c](0).value = fullName;
                }
        }
        splitFullName("FirstName","LastName","leadFullName");
});
</script>
```

Note: This code works only with Marketo Forms 2.0.

Posted on _2014-12-16_ by _Yanir_

## Use cURL to Import Leads via the REST API

Do you want to import leads from a CSV file through the REST API, but noticed this is challenging to do using the Postman Chrome extension. In this post, we walk through how to do this with cURL.

1. [Download and install cURL](https://curl.se/download.html), a command line tool we use to push data to Marketo's REST API.
1. Open the command line, and then navigate to the location where the CSV file is located. The column headers in the CSV file must match the API field names, not the Marketo field names.
1. You need an access token. Log in to Marketo, go to Admin, and then LaunchPoint. Find your REST API user and click "View Details". Click the "Get Token" button.
1. You will also need your REST endpoint that is specific to your Marketo instance. Log in to Marketo, and go to Admin, and then Web Services. In the section marked "REST API" you find the Endpoint URL.
1. On the command line, follow this format for the cURL call. Replace `<accesstoken>` with your access token from Step Three and replace `<REST API Endpoint URL>` with your REST API Endpoint URL from Step Four. More info is [available here](https://developer.adobe.com/marketo-apis/api/mapi#operation/importLeadUsingPOST). The "/bulk" here will replace the "/rest" at the end of the Endpoint URL. If you have the endpoint set for /rest/bulk it returns an error.

`curl -i -F format=csv -F file=@leaddata.csv -F access_token=<accesstoken> <REST API Endpoint URL>/bulk/v1/leads.json`

Posted on _2014-12-16_ by _Jordan_

## Add a Confirmation Alert to a Marketo For

Let's say when a user click the "Send" button on a Marketo form, you would like to display a notification that asks the user if "Is it really ok to send?". This is possible by implementing a few lines of JavaScript, which will show a confirmation box when somebody clicks the Send button. Here's an example of how to do this. Add the onSubmit function to your Marketo form as shown below. For more information about Marketo Forms API, please [check out the developer documentation](/help/javascript-api/forms-api-reference.md).

```javascript
<script src="//app-e.marketo.com/js/forms2/js/forms2.js"></script>
<form id="mktoForm_19"></form>
<script>
MktoForms2.loadForm("//app-e.marketo.com", "212-RBI-463", 19,function(form){

//Add this function to your Marketo form script
form.onSubmit(function(){
alert("Do you really want to submit the form?");
});
});
</script>
```

Posted on _2014-12-17_ by _David_

## Show Thank You Message Without a Follow-Up Landing Page

Typically, when you use Marketo forms, you create two landing pages – one to place the form on and one to redirect to after the form is completed. However, in some cases, you may not want to have two separate but very similar landing pages to maintain. You can actually use the same landing page for the form and for the thank you message using the Forms 2.0 JavaScript API. To do this, first create your registration landing page and form and place the form on the landing page as you would normally. Then, add an HTML element to the page. In this element, we add some code that activates at the moment the form is submitted. It will then hide the form and reveal a hidden <div> that contains the thank you message. Your JavaScript should look like this:

```javascript
//Edit host with your Marketo instance info
<script src="//<host>/js/forms2/js/forms2.js"></script>
<script>
MktoForms2.whenReady(function (form){
 //Add an onSuccess handler
  form.onSuccess(function(values, followUpUrl){
   //get the form's jQuery element and hide it
   form.getFormElem().hide();
   document.getElementById('confirmform').style.visibility = 'visible';
   //return false to prevent the submission handler from taking the lead to the follow up url.
   return false;
 });
});
</script>
```

Edit thank you message text.

`<div id="confirmform" style="visibility:hidden;"><p><strong>Thank you. Check your email for details on your request.</strong></p></div>`

You will want to edit the host name and thank you message in the code sample. The first should reference your Marketo instance (for example "//app-sj06.marketo.com/js/forms2/js/forms2.js") and the second should contain the thank you text that you want to display once the form is completed. The text displays on the landing page in the exact position where you place the HTML element, so be sure you edit that in the property sheet. You should also make sure the layer of your HTML element is smaller than the layer for your form. By default, both will be put at Layer 15, so you are safe if you make your HTML element Layer 11. If you don't do this, you won't be able to type in any form field boxes that overlap with the thank you message. It is not necessary to change the follow-up type on the form or on the landing page, as the JavaScript will overwrite those settings. For more information about Marketo Forms API, please check out the [developer documentation](/help/javascript-api/forms-api-reference.md).

Posted on _2014-12-19_ by _Kristin_

## Highlighting Open Source Projects Built on the Marketo Platfor

This is the first post in an ongoing series highlighting open-source projects built around the Marketo platform by the developer community. We maintain [a list on Marketo's GitHub account](https://github.com/Marketo/Community-Supported-Client-Libraries) where we track client libraries and projects created by the Marketo developer community. Below are three projects developed around the Marketo REST and SOAP APIs. Daniel Chesterton created [a client library in PHP for the Marketo REST API](https://github.com/dchesterton/marketo-rest-api). The client library currently has coverage for 12 REST API endpoints.**  Kyle Halstvedt of Elixiter created a project to [pull leads from Marketo static lists into a Google Spreadsheet](https://github.com/Elixiter/mkto_google-spreadsheet). Kyle's project uses the Marketo REST API.  David Santoso created a [Ruby gem for the Marketo SOAP API.](https://github.com/davidsantoso/markety) This project can help you more quickly integrate the Marketo SOAP API with a Ruby on Rails app.  We are excited to see more projects created by the developer community on the Marketo platform. If you are working on an open source project for the Marketo platform, please [submit it to this GitHub repo via a pull request](https://github.com/Marketo/Community-Supported-Client-Libraries).

Posted on _2015-01-02_ by _Murta_

## Dynamically Change Page Content Based on a User's Location

Let's say you would like to dynamically change the phone number on a landing page depending on where a user is located. For example, if the person is in California you would like to show them the phone number for your California office on your landing page, but if they are in Japan you would like to show them the phone number for the Japanese office.  One way to implement this is using JavaScript and the [HTML5 Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). The benefit of this approach is we can create one landing page and dynamically change it based on a user's location, instead of multiple static landing pages. We walk through the technical implementation details below. We create an object for office locations with latitude and longitude coordinates, and a second object with office phone numbers. In production, it would be a better practice to combine these two objects into a single object.

```json
//Coordinates for Marketo offices
var officeLocations = {
    "San Mateo": {latitude: 37.5596465, longitude: -122.2870142},
    "Atlanta": {latitude: 33.8547013, longitude: -84.35552349999999},
    "Tokyo": {latitude: 35.6895, longitude: 139.6917},
    "Dublin": {latitude: 53.3478, longitude: -6.2603097},
    "Sydney": {latitude: -33.873651, longitude: 151.2068896},
    "Portland": {latitude: 45.512089, longitude: -122.6763367},
    "Tel Aviv": {latitude: 32.0852999, longitude: 34.78176759999999}
}

//Phone numbers for Marketo offices
var officePhoneNumbers = {
    "San Mateo": "+1-650-376-2300",
    "Atlanta": "+1-877-260-6586",
    "Tokyo": "+81-03-6759-8280",
    "Dublin": "+353-1-242-3000",
    "Sydney": "+61-2-9045-2711",
    "Portland": "+1-877-260-6586",
    "Tel Aviv": "+1-877-260-6586"
}
```

We create a method to request a user's location. To handle errors, if the user's location is not accessible, we will default to Marketo's headquarters and its phone number.

```javascript
//Method to get user's current location. Returns a position object with user's geo coordinates
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findNearestOffice);
    } else {
        x.innerHTML = "Marketo Location: San Mateo
Marketo Phone Number: +1-877-260-6586";
    }
}
```

Lastly, we create a method to find the closest office to the user's location, and then return the phone number for the closest office on the page. This method uses the findNearest method from [Geolib, which is a JavaScript library that provides geospatial operations](https://github.com/manuelbieh/Geolib).

```javascript
//Find nearest Marketo office to user's location
function findNearestOffice(position) {
        var nearestOffice = geolib.findNearest({latitude: position.coords.latitude, longitude: position.coords.longitude}, officeLocations);
        x.innerHTML = "Marketo Location: " + nearestOffice.key + "
Marketo Phone Number: " +  officePhoneNumbers[nearestOffice.key];
}
```

Here's the full implementation. We trigger the getLocation method when the user clicks the button on the page. This [GitHub repo](https://github.com/MurtzaM/Find-Nearest-Marketo-Office) has the files needed to set up this demo.

Posted on _2014-12-20_ by _Murta_

## Lead Tracking and Multiple Domains

Marketo's Munchkin tracking code helps you track visits to your web site. You're likely to want to use Munchkin tracking code to cookie anonymous leads for most or all of the pages on your website. Let's walk through how Munchkin works. Visits to the page are recorded for existing leads, and a visit to the page by a non-cookied visitor will cause a new cookie to be created and stored, and a new anonymous lead to be created in your Marketo database. The Munchkin-tracker will automatically cookie a visitor if they don't already have an existing cookie for the current domain. In Marketo, it logs the event (click a link, visit a web page, or a new lead) in the lead's Activity Log. The value stored within the cookie is unique for a given visitor. The value is a combination of the unique Munchkin account tracking id, domain name, time stamp and random integer.
**What happens if I have multiple domains?** Lets say you have two sites that you would like to track: `<www.apples.com>` and `<www.bananas.com>`. You can put the tracking code on both sites, however you need to consider the following. Marketo cookies are 'first-party cookies' and are therefore domain specific. This means that a visitor to site 1 will be created as an anonymous lead in Marketo, if that same lead then goes to site 2 this will create a second separate anonymous lead in Marketo. If the lead fills out a form on site 1 then this record becomes known, the anonymous record for site 2 will remain and continue to accumulate subsequent visits to that site. If the lead then goes on to fill out a form on site 2 with the exact same email address as used on site 1, then both known leads will merge automatically and all past and future behavior will be tracked on one single record in Marketo. Both cookie IDs are tied to the same lead and all web activity (from either domain) will be on that lead.
**What about multiple subdomains?** Subdomains are not an issue. Let's use Marketo.com as an example. It has multiple subdomains for different languages, such as fr.marketo.com and de.marketo.com. With subdomains all activity will be recorded against the same lead record/cookie.

Posted on _2015-01-13_ by _David_

## Change the Hint Text Color on a Marketo Form

Let's say you want to change the hint text color (also referred to as the placeholder text) in Forms 2.0. This is possible via custom CSS. For example, in the screenshot below I made the hint text in this Marketo Form blue. There are three options on how to do this depending on how you are using Marketo Forms.

**Option 1: If you are embedding a Marketo form, add the CSS below directly to your main CSS file.**

```css
::-webkit-input-placeholder {
  color: blue;
}
::-moz-placeholder {
  color: blue;
}
:-ms-input-placeholder {
  color: blue;
}
:-moz-placeholder {
  color: blue;
}
```

**Option 2: When you are embedding a Marketo form, you can add the CSS directly on the page between `<style></style>` tags in the `<head>` section.**

```css
<style>
::-webkit-input-placeholder {
  color: blue;
}
::-moz-placeholder {
  color: blue;
}
:-ms-input-placeholder {
  color: blue;
}
:-moz-placeholder {
  color: blue;
}
</style>
```

**Option 3: If you are using a Marketo form on a Marketo landing page, you can add this custom CSS through the Marketo UI.** Find the landing page in the Marketo navigation tree. Then click Edit Draft. Click Edit Page Meta Tags. Add the CSS below to the Custom HEAD HTML section. The `<style></style>` tags should be included.

```css
<style>
::-webkit-input-placeholder {
  color: blue;
}
::-moz-placeholder {
  color: blue;
}
:-ms-input-placeholder {
  color: blue;
}
:-moz-placeholder {
  color: blue;
}
</style>
```

 Click Approve Draft. When you now visit the Marketo landing page, the hint text is the color you defined in the CSS. For more information about Marketo Forms, [please visit the documentation](/help/javascript-api/forms-api-reference.md).

Posted on _2015-01-14_ by _Murta_

## Get Activity Data via the REST API

Let's say you want to get all leads that were added to a list this month. Using the [Get Lead Activities REST API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET), you can get this data. Before calling the Get Lead Activities API, it is necessary to get an access token from the Authentication API and also get a starting date token from the [Get Paging Token API](https://developer.adobe.com/marketo-apis/api/mapi#operation/getActivitiesPagingTokenUsingGET). Below is an example code in Ruby that walks through the individual API endpoints you would have to call to return all leads added to a list this month. 1. Get Access Token**

```ruby
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com/identity/oauth/token?grant_type=client_credentials>"
# Relace with your client id
client_id = "99985d09-22a9-3jl2-84av-f5baae7c3a45"
# Replace with your your  client secret
client_secret = "tZPVrKiEmUDezE18yZfeaPlTJ2vKn2fw"
request_url = marketo_instance + "&client_id=" + client_id + "&client_secret=" + client_secret

# Make request
response = RestClient.get request_url

# Parse reponse and return only access token
results = JSON.parse(response.body)
access_token = results["access_token"]
puts access_token
```

1. Get Paging Token

```ruby
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/activities/pagingtoken.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
# Specify date
since_date_time = "&sinceDatetime=2015-01-01T00:00:00-08:00"
request_url = marketo_instance + endpoint + auth_token + since_date_time

# Make request
response = RestClient.get request_url

# Returns Marketo API response
puts response
```

1. Get Activity Data** To determine the Activity Type Id needed for this call, query the [Gotten Activity Types API](/help/rest-api/activities.md). The Get Activity Types API returns a schema with all activity types and associated ids. For example, it returns id 12 for new leads created and id 1 for webpage visit.

```java
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/activities.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
# Specify datetime needed as nextPageToken
since_date_time = "&nextPageToken=GIYDAOBNGEYS2MBWKQYDAORQGA5DAMBOGAYDAKZQGAYDALBQ"
# Specify activities needed
activity_type_ids = "&activityTypeIds=24"
request_url = marketo_instance + endpoint + auth_token + since_date_time + activity_type_ids

# Make request
response = RestClient.get request_url

# Returns Marketo API response
puts response
```

1. The Get Lead Activities API returns a paging token with each response that you can use to paginate through the results set.** For more information, please see the [REST API documentation](/help/rest-api/rest-api.md).

Posted on _2015-01-20_ by _Murta_

## Highlighting Open Source Projects Built on the Marketo Platform: Part Two

This is the second post in an ongoing series highlighting open-source projects built around the Marketo platform by the developer community. We maintain [a list on Marketo's GitHub account](https://github.com/Marketo/Community-Supported-Client-Libraries) where we track client libraries and projects created by the Marketo developer community. Below are three projects developed around the Marketo SOAP and Munchkin APIs. PunchTab created a client library in Python for the Marketo SOAP API. [Flickerbox](https://www.flickerbox.com/) created [a client library in PHP for the Marketo SOAP API](https://github.com/flickerbox/marketo).* [Richard Morrison](https://x.com/mozz100) created [a PHP script to get lead data from the Marketo SOAP API, and then pass this data to the client using JavaScript.](https://github.com/mozz100/marketo-whodat) This project can help you modify a page based on a user's data in Marketo.  We are excited to see more projects created by the developer community on the Marketo platform. If you are working on an open source project for the Marketo platform, please [submit it to this GitHub repo via a pull request](https://github.com/Marketo/Community-Supported-Client-Libraries).

Posted on _2015-01-20_ by _Murta_

## Send RTP Recommendation Engine Clicks to Google Analytic

Here is a solution for Marketo Real-Time Personalization (RTP) users to see clicks from the Content Recommendation Engine within Google Analytics. Once a visitor clicks the Content Recommendation bar, an event is sent to Google Analytics under Event Category "RTP-Recommendations". In Analytics, the Recommendation Text (as it appears in the bar) will be appended to Event Label and the URL of the recommended asset will be appended to Event Action. The script works for both Classic Google Analytics and Google Universal Analytics. This tag should be pasted at the end of the HTML page code, so it is the last tag before the `</body>` tag.

```javascript
$( document ).ready(function() {
if(document.getElementsByClassName("insightera-bar-content").length
 >0){
document.getElementsByClassName("insightera-bar-content")[0].getElementsByTagName('a')[0].addEventListener("click",
 function(){
assetName
 = document.getElementsByClassName("insightera-bar-content")[0].getElementsByTagName('a')[0].innerText;
assetURL
 = document.getElementsByClassName("insightera-bar-content")[0].getElementsByTagName('a')[0].href;
assetURL=
 assetURL.substring(assetURL.lastIndexOf("/"),assetURL.indexOf("?iesrc"));
console.log(assetName

 * " | " + assetURL);
if(typeof(_gaq)
 != "undefined"){
//Classic
_trackEvent("RTP-Recommendations",
 assetName , assetURL , {'nonInteraction': 1});
}else
 if(typeof(ga) !="undefined"){
//Universal
ga('send',
 'event',"RTP-Recommendations", assetName , assetURL, {'nonInteraction': 1});
}
});
}
});
```

Posted on _2015-01-22_ by _Yanir_

## Using the Marketo REST API with Boomi: Getting and Storing a REST Authentication Toke

Setting up an automatic export of leads that meet a certain criteria is a very common use case with Marketo. Although this can't currently be done in the Marketo interface, it's pretty straightforward to accomplish using the 3rd party tool like Dell Boomi, a static list with some data management campaigns, and the Marketo REST API. The REST API? I thought Boomi didn't have a Marketo REST API Connector! Well, currently, it doesn't, but it's possible to accomplish the same thing using the HTTP Connector and manually defining the jSON response shapes. The first step is to set up your Marketo instance to use the REST API as outlined in the [REST API Marketo Developer page](/help/rest-api/rest-api.md). I'll also assume you have access to a Dell Boomi account and have the Boomi skills to create these types of integration processes. The final process looks like the following, and will include calls to the following Marketo REST API operations, each of which has an associated jSON response shape which can be found on the developer site. To save time, I've listed them below Example JSON for [Authentication](/help/rest-api/authentication.md)

```json
{
  "access_token": "",
  "token_type": "",
  "expires_in": 0,
  "scope": ""
}
```

Example JSON for [Get Multiple Leads By List ID](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists)

```json
{
  "requestId": "",
  "success": true,
  "nextPageToken": "",
  "result": [
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    }
  ]
}
```

Example JSON for [Remove Leads from List](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE)

```json
{
  "requestId": "",
  "success": true,
  "result": [
    {
      "id": 1,
      "status": ""
    },
    {
      "id": 2,
      "status": "",
      "reasons": [
        {
          "code": "",
          "message": ""
        }
      ]
    }
  ]
}
```

Define Properties: Before we start calling REST, it's important to externalize and encapsulate the variables you are using. I've defined the following shown below.

* ClientID: Get this from your REST Launchpoint Service
* Client Secret: Get this from your REST Launchpoint Service
* AccessToken: We get this from a REST call
* Static ListID: The LIST ID of the static list we'll operate on. Get this from the URL in Marketo
* Fields: A comma separated list of fields the rest service gets from Marketo for each lead. Mine is "id, email,firstName,lastName" * IDStringToDelete: Will eventually contain the ID of all the leads in the static list to be used in their removal from the list
* ActivityTypes: Will be used in Part 2 of this blog, where I expand on this!
* SinceDateTime: Will be used in Part 2 of this blog, where I expand on this!
* PagingToken: Will be used in Part 2 of this blog, where I expand on this!
* Folder - Outgoing: The path to the outgoing folder on the SFTP Server. I use "/data/outgoing" in this example. It allows us to parameterize the SFTP Operation to make it generic.

 The Authentication Token: As I mentioned, we'll place a Connector on the canvas after creating the process with a "No Data" start shape (this is just a personal choice, I like all my connectors looking like British plugs).
 The Connector should be configured as follows: - Connector is an HTTP GET Client - Connection uses URL: `https://123-ABC-456.mktorest.com` (note no /rest at the end so that we can use this for REST calls as well as using it to get the identity access token. and change 123-ABC-456 to the right one for your Marketo instance) - Operation is "Get oAuth Token" (new!) - Request Profile = None - Response Profile = JSON - New Profile called "Authentication Token Response" - Content Type: Plain - HTTP Method: GET - Resource Path (add 4 without quotation marks): "identity/oAuth/token?grant_type=client_credentials&client_id="; "ClientID (Replacement variable)"; "&client_secret="; "ClientSecret (Replacement variable)" - Set Parameters under Configure —> Parameters —>(+): Set ClientID = Process Property Client ID; Set ClientSecret = Process Property Client Secret After this, store the success token in the Process Properties "AccessToken" variable as shown, extracting it from the jSON response.
 The pattern for this step will be repeated for the next steps, but using new operations with different jSON return profiles. In fact, many of the REST calls will be dealt with in the same way with minor changes! In the next installment, we'll expand on this and get a list of leads from a static list using REST! For now, run the process, but put a stop shape after your "Set Properties" then run in debug to make sure you see the same token that you see in Marketo. They should match up perfectly!

Posted on _2015-01-26_ by _John_

## Use a Google Font API to Add a Custom Font to a Marketo Landing Page

**Note: This is a blog post by [Murtza Manzur](https://www.linkedin.com/in/murtzam). Murtza is a Marketo Developer Evangelist based out of the San Francisco Bay Area.**
Let's say you are creating a landing page in Marketo and would like to use a custom font. This is possible using the Google Font API.  Add an import method to your CSS file with reference to Google Fonts:

`@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,600);`

Posted on _2015-01-26_ by _Murta_

## Capitalize a Lead's First Name Using Email Scripting

Let's say a lead enters their name in lowercase, such as "John doe". But when you send out an email campaign, you would like to capitalize the lead's name in the email, like John Doe. You can capitalize a lead's name using email scripting. Here's how to do this.

1. In your email program, click the "My Tokens" tab.
1. Create a new email script token by dragging "Email Script" from the right panel to the middle panel. Name the token.
1. In the Edit Script Token text box, paste the code below. In the right panel, under Lead object, select the First Name checkbox. Then click Save.

  ```javascript
  # set($name = ${lead.FirstName})
  # set($formattedFirstName = $name.substring(0).toUpperCase())
  $formattedFirstName
  ```

 1. Reference the token in your email asset. It will output the first name of the lead with the first letter capitalized. For more information about email scripting, please visit the [email scripting documentation](/help/email-scripting.md).

Posted on _2015-01-26_ by _Murta_

## Get All Leads from the Marketo REST API

There was a [question on StackOverflow asking how to get a list of all leads from Marketo through the REST API](https://stackoverflow.com/questions/28184900/how-do-i-get-the-list-of-all-the-leads-in-marketo). You can query this data using the [Get Multiple Leads by Filter Type REST API endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET). Leads in Marketo are assigned lead ids in sequential order starting with 1. Using the [Get Multiple Leads by Filter Type REST API endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET), you can query 300 leads by lead id with each call. You would have to specify id as the filterType and the lead ids as the filterValues with each call to this endpoint. To get all leads, you would iterate through the total number of leads 300 at a time. Y
ou can get the total count of leads in a Marketo instance through the Marketo UI. In the Marketo UI, go to the Lead Database tab, click on System Smart Lists, click on All Leads Smart List, and then finally click on the "Leads" tab. Then click on the Id column and sort descending. After leads are sorted, the id of the first lead will be the upper bound for leads id when you are querying all leads. If you do not have access to the Marketo UI to get the total count of leads, there is an [alternate approach to get this value using the Get Lead Activities REST API](https://stackoverflow.com/questions/28419967/get-all-leads-programmatically-in-marketo-v1).

 1. First API Call: replace ... with all the values in between:

  `/rest/v1/leads.json?filterType=Id&filterValues=1,2,3,...,298,299,300`

Here is a sample code in Ruby for the first call.

```java
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "<https://AAA-BBB-CCC.mktorest.com>"
endpoint = "/rest/v1/leads.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
# Replace with filter type and values
ids_needed = (1..300).to_a.join(",")
filter_type_and_values = "&filterType=Id&filterValues=" + ids_needed
request_url = marketo_instance + endpoint + auth_token + filter_type_and_values

# Make request
response = RestClient.get request_url

# Returns Marketo API response
puts response
```

1. The second API call, and each subsequent API call would follow the same pattern until the total count of leads is reached:

```
//replace ... with all the values in between
/rest/v1/leads.json?filterType=Id&filterValues=301,302,303,...,598,599,600
```

For more information, please see the [REST API documentation](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET).

Posted on _2015-01-28_ by _Murta_

## Execute Form Submission Actions from Iframe to Parent Page

We have seen a few cases where users use iframe forms and want to direct visitors that filled in the form to a thank you page or PDF, video, etc. The problem is that since the form is embedded on a landing page which is different from the parent one, the action happens only on the inner page where the form is. To solve that, below are 2 JavaScript tags we created. Insert in as an HTML element to your iframe pages or directly to the landing page template you use for iframes. Place it before the last `</body>` tag. The first tag performs the action on the parent page and the second tag will open it in a new tab.

**Form Action on a Parent Page**

```javascript
<script>
MktoForms2.whenReady(function (form){
form.onSuccess(function (values, url){
window.parent.location.assign(url);
return false;
           });
});
</script>
```

**Form Action in a New Tab**

```javascript
<script>
MktoForms2.whenReady(function (form){
var newWin;
form.onSubmit(function (){
newWin = window.open('about:blank', 'myWindow');
});
form.onSuccess(function (values, url){
newWin.location.replace(url);
return
 false;
});
});
</script>
```

Posted on _2015-02-02_ by _Yanir_

## Send View Data from a YouTube Video to Market

Let's say you want to segment leads in Marketo based on if they have a started or finished a specific video. This is possible to do using Munchkin, YouTube's Iframe API, and Smart Lists in Marketo. The example code in this post will let you send video started and video finished events into Marketo through Munchkin. For this to work, Munchkin must also be loaded on the page before you can start sending video view events into Marketo. The video started and finished will show up on the lead's activity log. After the data is in Marketo, you can then create a smart list and segment leads that have started or finished a video.

1. Get the id of the YouTube video that you want to embed.** From the URL of the YouTube video you would like to use, note the id, which is the series of random characters after `v=`.
1. Place the YouTube video id from Step One in the eighth line of this code sample. Then place the code before the `</body>` in the HTML of your page.

```javascript
<div id="player"></div>
<script>
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.getElementsByTagName('head')[0].appendChild(tag);

//Change 'iiqxcjxJ5Us' to video needed
var player, videoId = 'iiqxcjxJ5Us';
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
height: '390',
width: '640',
videoId: videoId,
events: {
'onStateChange': onPlayerStateChange
}
});
}

function onPlayerStateChange(event) {
switch( event.data ) {
//Send video started event to Marketo
case YT.PlayerState.PLAYING: Munchkin.munchkinFunction('visitWebPage', {
url: '/video/'+videoId
, params: 'video=started'
}
);
break;
//Send video finished event to Marketo
case YT.PlayerState.ENDED: Munchkin.munchkinFunction('visitWebPage', {
url: '/video/'+videoId
, params: 'video=finished'
}
);
break;
}

}
</script>
```

1. Create a Smart List in Marketo with the URL of the video and the view event that you are looking for as the value of "Querystring contains". For more information about the YouTube Iframe API, [please visit YouTube's API documentation](https://developers.google.com/youtube/iframe_api_reference). For more information about Munchkin, [review the Marketo developer documentation](/help/javascript-api/lead-tracking.md).

Posted on _2015-02-02_ by _Murta_

## Marketo SOAP API Tips and Tricks

NOTE: This is a guest blog post. [Ed Blachman is a Senior Architect](https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fprofile%2Fview%3Fid%3D2777965) at [TIBCO Software, a well-known vendor of enterprise software](https://exchange.adobe.com/apps/browse/ec?product=MRKTO). Ed is working on products that allow what Gartner calls "citizen developers" to integrate the cloud services they use without needing to do any programming themselves. [Marketo's SOAP API](/help/soap-api/soap-api.md) is a powerful tool by which developers can harness the power of Marketo and integrate it with our own applications. Between [the formal documentation](./getting-started.md) and [the community resources](https://nation.marketo.com/), there's much information available regarding how to use it. When I was getting started, I leaned heavily on that information and found it invaluable. However, in that process, I built up some tips and tricks that I hadn't seen in any of those places. Here's some of what I figured out.

**The Developers' Sandbox** The Sandbox is, of course, a wonderful resource for API developers: a safe place in which you can experiment with Marketo features, adding and removing objects without interfering with real marketing activities carried on by your organization's actual Marketo users. However, the Sandbox is not a panacea.
For example, I needed to share our Sandbox with another development group, and this took some doing, because they had gotten accustomed to the notion that they owned the Sandbox. Eventually, we figured out a couple of best practices for sharing: - Don't write tests that depend on complete knowledge of the contents of your Sandbox. As a shared resource, schemas may be subject to change without notice, as well as entire entries in your leads database or programs or other entities. If your tests assume complete knowledge of the Sandbox, your development cycle creates blackout periods for the groups with whom you're sharing it. Since typically their development cycle will not coincide with yours, this amounts to hogging the resource–not cool. It's also not necessary, if you think it through. - Do use a convention to label all of your stuff–your leads, your lead schema fields, your programs, whatever. If you each can identify your own objects, and if you can agree with your co-tenants that each of you will leave the others' objects alone, you should be on a firm foundation for sharing. For leads, you could create a custom field, and create a convention using this custom field to identify these leads as your test leads. For lists or programs, you might start the names of your objects with some string that identifies those objects as belonging to you. - Consider writing tests that clean up after themselves–that first create the objects you're interested in, then access or update or selectively delete them, then finally remove them. (Note that this is not achievable 100% in the SOAP API because not everything in the Sandbox, or in a real instance for that matter, can be managed via the SOAP API. Even so, it's still worthwhile to do this as much as you can.)

**Real Instances** The problem with the Sandbox is that it's not being used in production, so it's difficult to get a sense of what real usage looks like in a Marketo instance. Now, if you're lucky enough to have a Marketo power user on your team, or if you're doing bespoke development for internal Marketo users, that's not such a problem. But in the case of my team, it was a large deal indeed. None of us were Marketo experts, and since we were being asked to understand a large number of cloud services, we just didn't have the headcount to become experts in anything. Here are some of the insights we gleaned from access to a real instance: - Large lead schemas. The lead schema in the production instance we accessed has over 200 fields. That made it crystal clear to our UI designers that the UI they were designing had to accommodate schemas of that size (or larger). - Bursty usage. We saw two orders of magnitude difference between the highest-usage times and low-usage times (in terms of numbers of leads created or updated). This impacted both the volume of data we'd get back from API calls (obvious) and the time it would take for an API call to respond (possibly less obvious).

**API Call Response Time** Depending on the time of day, the details of your API call, and the contents of your instance, you may find the SOAP API's response time takes longer than average. On occasion, we had API calls that took a minute and a half to respond. You need to be aware of the possibility to deal with it: - Test. Maybe this is not a problem for your usage. But don't just assume that, do some testing. - Tweak your usage. In our case, the biggest issue was that we set the page size for our calls to [getMultipleLeads](/help/soap-api/getmultipleleads.md) to be as large as the API allows. In our context that makes a certain amount of sense because our goal is to be as efficient as possible with our customer's API quota. But in your context, you may not need to worry so intensely about your users' API call quotas, in which case you'll definitely get better response time by asking for smaller pages of data.

**Lead Partitioning** Marketo provides powerful tools–partitions and workspaces–that allow multiple marketing groups to share a single Marketo instance. However, those tools aren't reflected directly in the SOAP API. For instance, when you use getMultipleLeads to get all leads that have been updated or created since some datetime, you get back all the leads in your instance for which that's the case, without regard for (and with nothing to indicate) which partition or workspace contains any given lead. Lead creation and adding leads to lists are other contexts in which lead partitioning may impact what your API calls actually do. Note that this means that partitions and workspaces may not be the solution you need to the problem of Sandbox sharing discussed above. So, how do you figure out whether this is an issue for you? I've found all of these to be helpful: The Developer Evangelists are committed to our success in using the APIs, and where there are questions, they're amazingly good at working to find answers. - [API Documentation](./getting-started.md). The Evangelists have already brought this issue into some of the documentation, and as part of their commitment to our success, they're really good about updating the doc. - Your Own Test Cases. Although using partitions and workspaces for sharing the sandbox may not be a great idea, the Sandbox is a great place to play with partitions and workspaces to figure out whether they pose challenges for your intended usage. (It's also a good way to narrow down your questions for the Evangelists, which are always a good idea.)

**TIMTOWTDI and Testing** "There is more than one way to do it"–the Perl programming motto–actually applies in certain contexts to the Marketo SOAP API. For instance, I wanted to combine updating a set of leads with adding those leads to some list. The SOAP API gives you two ways to do this: 1. [importToList](/help/soap-api/importtolist.md) + [getImportToListStatus](/help/soap-api/getimporttoliststatus.md). Reading the documentation, this is obviously the "normal" way to do this. However, the fact that you have to poll for the status of your import operation raised a yellow flag for me. Was this really the way that I wanted to implement my import? 1. [syncMultipleLeads](/help/soap-api/syncmultipleleads.md) + [listOperation](/help/soap-api/listoperation.md). This seems much less elegant than a unitary importToList call, but it doesn't rely on polling. Was it a viable option? Cases like these are hard for the Evangelists to deal with, because they really depend on the nature of the instances that you're dealing with and exactly what you're trying to do. Luckily, if you've set up a robust unit testing environment, you should be able to use it to explore questions like these as well. In this particular case, it turned out that option 2 was better for my use case than option 1–not because of the polling but rather because I ran into field-oriented limitations on importToList, and also because I was trying to write code that could be used in contexts and instances over which I had no control. But your use case may be different–and testing is the only way you find out.

**Conclusion** I don't think any of this is a huge secret. On the other hand, I'd have been ahead of the game if I'd known all this before I got started. I hope you find it useful.

Posted on _2015-02-05_ by _David_

## Using the Marketo REST API with Boomi: Getting and Deleting Leads from a Static Lists

In part 1 of this series, I discussed how it was possible to start using the REST API through Boomi with the Boomi HTTP connector, specifically getting the authentication token needed to access the REST API, and storing it in a Process Variable. Next up, we'll begin making calls into Marketo, and in this installment, I show you how you can both [Get Multiple Leads By List ID](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists) and [Remove Leads from List](/help/rest-api/lead-database.md). Pay particular attention to the removal of leads from a list because there is a very "lightly documented" and subtle aspect of Boomi at work there that I expand on when we get there.

In out NEXT installment we expand on this functionality to start doing interesting things like getting Lead activity, but that's a blog for another day. For this installment we'll be looking at the second and third highlighted areas. As a review, I've included the JSON responses we are needing below. Recall that to create a JSON profile in Boomi, all you need to do is create a profile component of type JSON, and click "import" and select the file. Boomi does the rest, extrapolating things like if there should be multiple IDs allowed. Example JSON for [Get Multiple Leads By List ID](https://developer.adobe.com/marketo-apis/api/mapi#tag/Static-Lists)

```json
{
  "requestId": "",
  "success": true,
  "nextPageToken": "",
  "result": [
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    {
      "id": 0,
      "email": "",
      "firstName": "",
      "lastName": ""
    }
  ]
}
```

Example JSON for [Remove Leads from List Request](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE)

```json
{
   "input":[
      {
         "id": ""
      },
      {
         "id": ""
      }
   ]
}
```

Example JSON for [Remove Leads from List Response](https://developer.adobe.com/marketo-apis/api/mapi#operation/removeLeadsFromListUsingDELETE)

```json
{
  "requestId": "",
  "success": true,
  "result": [
    {
      "id": 1,
      "status": ""
    },
    {
      "id": 2,
      "status": "",
      "reasons": [
        {
          "code": "",
          "message": ""
        }
      ]
    }
  ]
}
```

The Get Multiple Leads by List ID** Drop another connector (Get) into your process, using the same connection as defined in the previous article. Create a new operation called "Get Multiple Leads by List ID" (I'm a stickler for consistency) Its attributes are as follows - Request Profile: None (this one uses the request URL) - Response Profile Type: jSON - Response Profile: Create a new profile based on the Get Multiple Leads by List ID Response above. Note that you can change it so that it returns the fields you want, not just the ones listed. It's important to remember that the JSON response profile should really match the list of fields you're asking for from the REST API, and you should request only the fields you need. In the Process Properties object, we defined a property called "fields" which is a comma separated list of the fields you want REST to return. and that's the list that has to match the profile. Content Type: text/plain (this is just a URL request) HTTP Method: GET (you look this up in the REST API docs, it's always listed) Resource Path (add 5) rest/v1/list/ listID (replacement variable) /leads.json?access_token= access_token (replacement variable) &fields= fields (replacement variable). Then in the parameters tab on the connector, you can enter the variable values, all of which we previously populated into the process properties. In the next section I'll talk about how you can avoid populating these manually. Im going to skip the part of the process where I map the response for Get Multiple Leads by List Id into a flat file profile and stick it on an FTP server because that's straightforward Boomi functionality.

Delete Leads from a List So this one is interesting, one of my coworkers, [Ken Niwa](https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fprofile%2Fview%3Fid%3D7429494) taught me this next technique and it's pretty cool and based on a Boomi article titled "How to Build a POST Request for a RESTful Application," shown below.  ...but first things first. In the process, coming out of the "Get Multiple Leads by List Id" we have the Get Multiple Leads by List Id Response shape, and we need to map that into the "Remove Leads from List Request" that mapping is fairly simple, just mapping the id we got from the leads in the original list into the id list we're passing into the delete jSON. Next, drop another Connector with an action of "Send," using the same Connection Create a new operation called "Remove Leads from List Request". whose attributes are Request Profile: jSON Content Type: application/json Request Profile: [JSON Profile] Remove Leads from List Request (created from the above file) Response Profile Type: jSON Response Profile: [JSON Profile] Remove Leads From List Response (created from the above file) Content Type: application/json HTTP Method: DELETE Resource Path (add 4) rest/v1/lists/ listID (replacement variable) /leads.json?access_token= access_token (replacement variable) Here's the interesting thing about this connector. We're NOT going to explicitly add the parameters in the connector tab. Instead, as the article states, we create dynamic document properties that have the same names as the replacement variables. In this case, those variables listID and access_token. When you do this, the jSON shape flows into the REST call and the parameters appear in their proper place on the URL. We can't do this with the previous call because it's a GET not a POST. So, at this point you've seen a GET and a POST REST API call and you can start to see the pattern for making these REST calls. In the next installment we'll start looking at Lead Activity export through the REST API, which is a bit more involved.

Posted on _2015-02-06_ by _John_

## Embed a YouTube Video with Lead Tracking on a Marketo Landing Page

In a previous blog post, I described how to segment leads in Marketo based on if they have a started or finished a specific YouTube video. In this blog post, we walk through how to take the implementation from that post and use it on a Marketo landing page.

1. Navigate to the Program in Marketo where you want to create the new landing page. Click New Local Asset, and then click Landing Page.
1. Name the landing page. Assign a page URL. Select a template. Then click Create.
1. After the landing page is created, click Edit Draft.
1. From the right panel, drag the HTML button to the main canvas on the left.
1. In the Custom HTML Editor box that pops up. Then click Save.
1. Adjust the size of an HTML element by dragging the box outline. Then click Approve and Close.
1. Test the live version of the landing page by clicking View Approved Page. A landing page with the YouTube opens in a new window. The video started and finished will show up on the lead's activity log as shown in the first and second screenshot below. After the data is in Marketo, you can then create a smart list and segment leads that have started or finished a video, as shown in the screenshot below. For more information about the YouTube Iframe API, [please visit YouTube's API documentation](https://developers.google.com/youtube/iframe_api_reference). For more information about Munchkin, [please review the Marketo developer documentation](/help/javascript-api/lead-tracking.md).

Posted on _2015-02-09_ by _Murta_

## Single Page Application Web Tracking with Munchkin

A Single Page Application is a website that loads all of the resources required to navigate the site on the first page load. When a user clicks a link, the content is loaded from the first page load data. To the user, the website behaves as expected because the URL in the address bar is like the traditional page navigation. Munchkin works well with traditional websites because Munchkin runs every single time the users load a new page. However, with a single page application if you are not loading a new page, Munchkin will run only once. The approach I walk through in this post is to track when a user clicks on a link, and then send this information to Munchkin. We implement this using the `clickLink` Munchkin function. Below is an example implementation in jQuery that binds for click events to the `clickLink` Munchkin method. When calling the `clickLink` Munchkin method it passes the parameter for the URL that was clicked.

```javascript
<script>
$("a").on('click', function(event) {
    var urlThatWasClicked = $(this).attr('href');
    Munchkin.munchkinFunction('clickLink', { href: urlThatWasClicked});
});
</script>
```

Posted on _2015-02-11_ by _Murta_

## Change a Lead's Score via the REST API

Let's say you want to change a lead's score in Marketo using the APIs. This is possible to do with the REST API using the Create/Update Lead endpoint. Below is a code sample in Ruby that shows how to make this call.

```ruby
require 'rest_client'
require 'json'

# Build request URL
# Replace AAA-BBB-CCC with your Marketo instance
marketo_instance = "https://AAA-BBB-CCC.mktorest.com"
endpoint = "/rest/v1/leads.json"
# Replace with your access token
auth_token =  "?access_token=" + "ac756f7a-d54d-41ac-8c3c-f2d2a39ee325:ab"
request_url = marketo_instance + endpoint + auth_token

# Build request body
data = { "action" => "updateOnly", "input" => [ { "email" => "<example@email.com>", "leadScore" => "30" } ] }

# Make request
response = RestClient.post request_url, data.to_json, :content_type => :json, :accept => :json

# Returns Marketo API response
puts response
```

In the JSON body of the request, we specify `updateOnly` as the action. This means that the request will only work if the lead exists, otherwise it fails. If you want to create a lead if one does not exist, then specify `createOrUpdate` as the action. We use the lead's email as the primary identifier to find the lead record in Marketo. Finally, we specify the value for the lead's score using the key `leadScore`. It is possible to update 300 leads at a time using this method.

Posted on _2015-02-19_ by _Murta_

## Highlighting Open Source Projects Built on the Marketo Platform: Part Three

This is the third post in an ongoing series highlighting open-source projects built around the Marketo platform by the developer community. We maintain [a list on Marketo's GitHub account](https://github.com/Marketo/Community-Supported-Client-Libraries) where we track client libraries and projects created by the Marketo developer community. Below are three projects developed around the Marketo REST APIs. **Usermind created [a Node.js client library for the Marketo REST API](https://github.com/MadKudu/node-marketo).**  **[Arunim Samat](https://github.com/asamat) created [a client library in Python for the Marketo REST API](https://github.com/asamat/python_marketo).**  **Jacques Lemieux from Marketo created a client library in Ruby for the Marketo REST API.**  We are excited to see more projects created by the developer community on the Marketo platform. If you are working on an open source project for the Marketo platform, please [submit it to this GitHub repo via a pull request](https://github.com/Marketo/Community-Supported-Client-Libraries).

Posted on _2015-02-20_ by _Murta_

## Insert a Marketo Form into an RTP campaign

Many marketers are interested in placing a Marketo Form into a Marketo Real-Time Personalization (RTP) campaign. Whether it's a Dialog, In Zone or Widget RTP campaign type, you can copy your Form HTML code and paste it into RTP's campaign editor. I've seen these examples of this being used: - Getting visitors to sign up to your newsletter after a 2nd or 3rd click on your site - Quick, effective sign-up form for webinars - Downloading a gated case study - Offering leads that unsubscribed in the past to re-subscribe Fill out a form in the campaign and receive the thank you or content requested, resulting in one less clicks to get to your goals. So, here goes the explanation of how to do this and embed a Marketo Form 2.0 into a Marketo RTP campaign. See a great example below from eMarketer, RTP users that took it one step further and instead of directing the visitors to a thank you page - decided to display a Thank You message within the RTP campaign. The code for this option is also below. Enjoy and I are happy to hear about your experience with it!

1. Right click on an approved form. Select **Embed Code.**
1. Copy the **Code.**
1. In Marketo RTP, go to **Campaigns**.
1. Click **CREATE NEW CAMPAIGN**.
1. In the Rich Text Editor, click on the **HTML icon**.
1. Paste the form embed code into the HTML Source Editor. Click **Update**.
1. The form will not display in the editor view, but you can preview it to see how it will render in a campaign.
1. Click **Launch** to start the campaign.

### Note

Any changes to the form must be done within Marketo's Marketing Activities in Edit Draft of the Form.

### Related Articles

* [Forms 2.0](/help/javascript-api/forms-api-reference.md)

Posted on _2015-12-20_ by _Yanir_

## Add a Reset Button to a Marketo Form

```javascript
<script src="//app-sj01.marketo.com/js/forms2/js/forms2.min.js"></script>
<form id="mktoForm_116"></form>
<script>MktoForms2.loadForm("//app-sj01.marketo.com", "410-XOR-673", 116,
function(form) { form.getFormElem()[0].querySelector('button[type="submit"]').insertAdjacentHTML('afterend','<button type="reset" class="mktoButton">Reset</button>') });
</script>
```

Posted on _2015-03-18_ by _Murta_

## March 2015 Release Updates

The [Marketo REST Asset API was released in the March 2015 release](https://developer.adobe.com/marketo-apis/api/asset). This API allows to access Marketo's file, folder, token, email, and email template objects. Note that two role permissions were added to provide access to the Asset API endpoints: Read-Only Assets, Read-Write Assets. If your API user role predates the release of the Asset APIs, then you need to create a new API user role with these permissions to enable access. Otherwise, you receive a 603 "Access Denied" error response. In addition to the release of the REST Asset API, there were updates to existing REST API endpoints. The [Merge Lead REST API endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) was updated to allow for merging of multiple leads. The [Schedule Campaign REST API endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/scheduleCampaignUsingPOST) was updated to allow for cloning of a campaign while scheduling a campaign.

Posted on _2015-03-23_ by _Murta_

## Triggering RTP Campaigns with a Delay

This custom JavaScript allows RTP users to show campaigns a few seconds after the web page loads. This is recommended for dialog box and widget campaigns. It can be used to show a campaign after a delay, once the visitor viewed the regular content on the page. It is recommended to implement this code only on specific pages where the campaign/s should be displayed. Using this code across all pages is not recommended as it may affect performance. **Setup Instructions** The custom code sends an RTP Custom Data Event (t=timeOnPage, i.e: t=60) and then loads the campaign that matches this event. By default, it will be triggered after 60 seconds. You can customize it by changing the sendCustomRTPEvent parameter to any other number. Place the code immediately after the standard RTP code:

```javascript
<script>
function sendCustomRTPEvent(a){
 var eventValue="t="+a;
 setTimeout(function(){
  rtp('send', 'event', {value: eventValue});
  rtp('get', 'campaign',true);
 }, 1000 \* a);
}
sendCustomRTPEvent(60); //Seconds
</script>
```

To set up an RTP campaign to react after a time delay: 1. Log in to your RTP account 1. Create a new segment 1. In the Segment Events section add: `t=60`. A visitor can only match each RTP segment once per session, therefore seeing each campaign only once (unless it is set to sticky).

Posted on _2015-03-24_ by _Yanir_

## April 2015 Release Updates

### Marketo Mobile Engagement SDK v0.3.2

Marketo now includes marketing automation and user engagement for mobile apps. Installing the [Marketo Mobile SDK](/help/mobile/mobile.md) into your iOS or Android app allows Marketers to listen for in app events and send relevant push notifications.

### REST API Enhancements

* Custom Objects

New [custom object endpoints](/help/rest-api/custom-objects.md) have been introduced that allow you to programmatically list, describe and CRUD the data residing with a Marketo custom object.

Note that role permissions were added to provide access to the Custom Object API endpoints: Read-Only Custom Object, Read-Write Custom Object. If your API user role predates the release of the Custom Objects APIs, then you need to create a new API user role with these permissions to enable access. Otherwise, you receive a 603 "Access Denied" error response.

* Schedule Campaign - Clone Program

A new optional parameter "cloneToProgramName" was introduced in the [schedule campaign API](/help/rest-api/data-ingestion.md). When this parameter is present, the campaign's parent program will be cloned and the newly created campaign will be scheduled. The parameter specifies the desired name for the resulting program.

Posted on _2015-04-28_ by _Travis Kaufman_

## Synchronizing Email Unsubscribes Across Instances

Do you manage multiple instances of Marketo? Keeping lead information synchronized across instances can be challenging. Here is a way to sync email unsubscribes across instances using a webhook that calls an external web service. The external web service loops through each instance looking for the known lead that triggered the unsubscribe event. When a matching lead is found the "unsubscribed" field in the corresponding lead record is updated. Here is a diagram illustrating the idea.  It's up to you to implement the web service, but the code below should help you jumpstart the process!

### External Web Service

The external web service performs the following steps for each Marketo instance that needs to be synchronized:

1. Composes instance-specific REST API [Endpoint URL](/help/rest-api/endpoint-reference.md)
1. Obtains access token using [Identity](/help/rest-api/authentication.md)
1. Obtains list of lead records that match email address using [Get Multiple Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET)
1. Updates "unsubscribed" field of each lead record using Create/Update Leads

Here is another diagram showing the external web service call and Marketo REST API calls in detail.  The sample code below is not an out of the box web service. Rather, it is a console mode program that you can pass arguments to via the command line. The intent here is to show how to call the appropriate Marketo APIs to update lead records across instances. Implementing the web service is left as an exercise for the reader.
**Sample Code** To get the sample code up and running, you need to create a Java project in your favorite IDE. After that, you will need to make the following changes: 1. The sample code uses [json-simple](https://code.google.com/archive/p/json-simple) to parse JSON strings. Add the json-simple jar to your Java project. 1. The sample code has a structure that holds metadata for each Marketo instance. Place actual values from your instances into the structure as follows:

```java
public static String instanceInfo[][] = {
{ "AccountId1", "ClientId1","ClientSecret1" },    // Instance 1 metadata
{ "AccountId2", "ClientId2","ClientSecret2" },    // Instance 2 metadata
{ "AccountId3", "ClientId3","ClientSecret3" }     // Instance 3 metadata
};
```

You can find the metadata for the instance in the Marketo Admin panel:

* Account Id Admin > Integration > Munchkin > Munchkin Account
* Client Id & Client Secret Admin > Integration > LaunchPoint > Email Unsubscribe Sync > View Details

The sample code takes two command line arguments that simulate the "id" and "email" query parameters for the external web service described above.

1. args[0] = Account Id
1. args[1] = Email Address

Pass actual values from your instance as arguments to the program. Here is a project configuration screenshot from Intellij IDEA.

 **SyncEmailUnsubscribe.java**

```java
package com.marketo;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class SyncEmailUnsubscribe {
    // Define Marketo instance meta data here.
    // Each row contains three elements: Account Id, Client Id, Client Secret.
    // For example:
    //  public static String instanceData[][] = {
    //    {"111-AAA-222", "2f4a4435-f6fa-4bd9-3248-098754982345", "asdf6IVE9h4Jjcl59cOMAKFSk78ut12W"},
    //    {"222-BBB-333", "5f4a6657-f6fa-4cd9-4356-123083238821", "gfjgfIVE9h4Jjcl59cOMAKFSk78ut12W"},
    //    {"444-CCC-444", "9f4a4678-f6fa-4dd9-7735-908713247721", "xzcxvbVE9h4Jjcl59cOMAKFSk78ut12W"}
    //  };
    //
    public static String instanceData[][] = {
            // ADD YOUR INSTANCE META DATA HERE
    };

    public static void main(String[] args) {
        String accountId = args[0];     // Account id that processed the unsubscribe
        String emailAddress = args[1];  // Email address of lead that unsubscribed

        SyncEmailUnsubscribe seu = new SyncEmailUnsubscribe();

        // Loop through each Marketo instance
        for (int i = 0; i < instanceData.length; i++) {

            // Make sure we skip instance that triggered the webhook
            if (!accountId.equals(instanceData[i][0])) {
                String endpointUrl = String.format("https://%s.mktorest.com", instanceData[i][0]);

                // Generate access token
                String identityUrl = String.format("%s/identity/oauth/token?grant_type=client_credentials&client_id=%s&client_secret=%s", endpointUrl, instanceData[i][1], instanceData[i][2]);
                String token = seu.getToken(identityUrl);

                // Get lead records for given email address (may be duplicates)
                String getLeadsUrl = String.format("%s/rest/v1/leads.json?access_token=%s&filterType=email&filterValues=%s", endpointUrl, token, emailAddress);
                String leads = seu.getLeads(getLeadsUrl);

                // Update unsubscribed field in lead record
                String updateLeadsUrl = String.format("%s/rest/v1/leads.json?access_token=%s", endpointUrl, token);
                seu.updateLeads(updateLeadsUrl, leads, accountId);
            }
        }

        System.exit(0);
    }

    // Call Identity Service to generate access token
    public String getToken(String url) {
        // Call Identity Service
        String tokenData = getData(url);

        // Convert response into JSONObject
        JSONParser parser = new JSONParser();
        Object obj = null;
        try {
            obj = parser.parse(tokenData);
        } catch (ParseException pe) {
            System.out.println("position: " + pe.getPosition());
            System.out.println(pe);
        }

        // Retrieve access_token
        JSONObject jsonObject = (JSONObject)obj;
        return jsonObject.get("access_token").toString();
    }

    // Call Get Multiple Leads by Filter Type Service to get lead records
    public String getLeads(String url) {
        return getData(url);
    }

    // Call Create/Update Lead Service to update "unsubscribed" flag in lead record
    public void updateLeads(String url, String leads, String account) {
        JSONObject body = composeBody(leads, account);
        if (body != null) {
            postData(url, body);
        }
    }

    // Compose JSON body for Create/Update Leads Service
    private JSONObject composeBody(String leads, String account) {
        JSONObject body = new JSONObject();

        // Convert leads into JSONObject
        JSONParser parser = new JSONParser();
        Object obj = null;
        try {
            obj = parser.parse(leads);
        } catch (ParseException pe) {
            System.out.println("position: " + pe.getPosition());
            System.out.println(pe);
        }
        JSONObject leadsObj = (JSONObject)obj;

        Object success = leadsObj.get("success");
        if (success.equals(true)) {
            body.put("action", "updateOnly");
            body.put("lookupField", "id");
            body.put("asyncProcessing", "true");

            // Build array of lead objects
            JSONArray input = new JSONArray();
            JSONArray result = (JSONArray) leadsObj.get("result");
            Iterator<JSONObject> iterator = result.iterator();
            while (iterator.hasNext()) {
                JSONObject leadIn = (JSONObject)iterator.next();
                JSONObject lead = new JSONObject();
                lead.put("id", leadIn.get("id"));
                lead.put("unsubscribed", "true");
                lead.put("unsubscribedReason", "Cross instance synch triggered by webhook from: " + account);
                input.add(lead);
            }

            body.put("input", input);
        }
        return body;
    }

    // HTTP POST request
    private String postData(String endpoint, JSONObject body) {
        String data = "";
        try {
            // Make request
            URL url = new URL(endpoint);
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setRequestMethod("POST");
            urlConn.setAllowUserInteraction(false);
            urlConn.setDoOutput(true);
            urlConn.setRequestProperty("Content-type", "application/json");
            urlConn.setRequestProperty("accept", "application/json");
            urlConn.connect();
            OutputStream os = urlConn.getOutputStream();
            os.write(body.toJSONString().getBytes());
            os.close();
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                System.out.println("Status: 200");
                InputStream inStream = urlConn.getInputStream();
                data = convertStreamToString(inStream);
                System.out.println(data);
            } else {
                System.out.println(responseCode);
                data = "Status:" + responseCode;
            }
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return data;
    }

    // HTTP GET request
    private String getData(String endpoint) {
        String data = "";
        try {
            URL url = new URL(endpoint);
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setRequestMethod("GET");
            urlConn.setAllowUserInteraction(false);
            urlConn.setDoOutput(true);
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                System.out.println("Status: 200");
                InputStream inStream = urlConn.getInputStream();
                data = convertStreamToString(inStream);
                System.out.println(data);
            } else {
                System.out.println(responseCode);
                data = "Status:" + responseCode;
            }
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return data;
    }

    private String convertStreamToString(InputStream inputStream) {
        try {
            return new Scanner(inputStream).useDelimiter("A").next();
        } catch (NoSuchElementException e) {
            return "";
        }
    }
}
```

### Marketo Setup

Perform the following steps for each Marketo instance that you would like to sync.

1. Create a Custom Service with role permission: Read-Write Lead. If you are unfamiliar with creating a Custom Service, click [here](/help/rest-api/custom-services.md).
1. Create a Webhook that calls your external web service. If you are unfamiliar with creating Webhooks, click [here](/help/webhooks/webhooks.md).
1. Add Webhook as a flow step in Smart Campaign.

The screenshot below shows how to create a webhook to invoke the service specified above using tokens to automatically populate the query parameters. Now that we have created our webhook, we can add it to a Smart Campaign as a flow action.  The Smart List should contain an "Unsubsubscribes from Email" trigger.

### Validation

To test this all out, create a lead with the same email address in several Marketo instances. Make sure that you own the email address! In one instance trigger a send email flow action, open the resultant email, and click unsubscribe. To validate results, log into each of the other instances and inspect the lead records associated with the email address. The "Unsubscribed" checkbox should be checked, and the "Unsubscribed Reason" field should contain a note with the source account id that initiated the sync.

Posted on _2015-05-11_ by _David_

## Synchronizing Lead Data Changes using REST API

That post presented a code sample that could be run on a recurring basis to poll Marketo for updates. The idea was to use Marketo APIs to identify changes to lead data, and extract the lead data that had changed. This data could then be pushed to an external system for synchronization purposes. The code sample presented used our SOAP API. Well we have a [new way to walk](https://www.youtube.com/watch?v=G-7ZJjLy5D8&feature=youtu.be), and that way is using the [Marketo REST API](/help/rest-api/rest-api.md). This post shows you how to accomplish that same goal using two REST endpoints: [Get Lead Changes](/help/rest-api/rest-api.md), [Get Lead by Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET). The program contains 2 main steps:

1. Call Get Lead Changes to generate a list of all Lead Ids that either had specific lead fields changed, or were added during a given time period.
1. Call Get Lead Id for each Lead Id in the list to retrieve field data from the lead record.

We'll take the data retrieved in step 2 and format it for consumption by an external system.  **Program Input** By default the program "goes back" one day from the current date to look for changes. So, you could run this program at the same time each day for example. To go farther back in time, you can specify the number of days as a command line argument, effectively increasing the time window. The program contains several variables that you can modify: CUSTOM_SERVICE_DATA - This contains your Marketo [Custom Service](/help/rest-api/custom-services.md) data (Account Id, Client Id, Client Secret). LEAD_CHANGE_FIELD_FILTER - This contains a comma seperated list of lead fields that we will inspect for changes. READ_BATCH_SIZE - This is the number of records to retrieve at a time. Use this to tune the response to body size. **Program Output** The program gathers up all of the changed lead records and formats them in JSON as an array of lead objects as follows:

```json
{
    "result": [
        {
            "leadId": "318592",
            "updatedAt": "2015-07-22T19:19:07Z",
            "firstName": "David",
            "lastName": "Everly",
            "email": "<deverly@marketo.com>"
        },

        ...more lead objects here...
    ]
}
```

The idea is that you could then pass this JSON as the request payload to an external web service to synchronize the data. **Program Logic** First we establish our time window, compose our REST endpoint URLS, and obtain our Authentication access token. Next we fire up a Get Paging Token/Get Lead Changes loop in which runs until we exhaust the supply of lead changes. The purpose of this loop is to accumulate a list of unique Lead Ids so that we can pass them to Get Lead by Id later in the program. For this example, we tell Get Lead Changes to look for changes to the following fields: firstName, lastName, email. You are free to select any combination of fields for your purposes. Get Lead Changes returns "result" objects that contain an Activity Type Id, which we can use to filter results. Note: You can get a list of Activity Types by calling the [Get Activity Types](https://developer.adobe.com/marketo-apis/api/mapi#operation/getAllActivityTypesUsingGET) REST endpoint. We are interested in 2 activity types that are returned: 1. New Lead (12)

```json
{
    "id": 12024682,
    "leadId": 318581,
    "activityDate": "2015-03-17T00:18:41Z",
    "activityTypeId": 12,
    "primaryAttributeValueId": 318581,
    "primaryAttributeValue": "David Everly",
    "attributes": [
        {
            "name": "Created Date",
            "value": "2015-03-16"
        },
        {
            "name": "Source Type",
            "value": "New lead"
        }
    ]
}
```

1. Change Data Value (13) We can tell which field changed by inspecting the "name" property in the Change Data Value response.

```json
{
    "id": 12024689,
    "leadId": 318581,
    "activityDate": "2015-03-17T22:58:18Z",
    "activityTypeId": 13,
    "fields": [
        {
            "id": 31,
            "name": "lastName",
            "newValue": "Evely",
            "oldValue": "Everly"
        }
    ],
    "attributes": [
        {
            "name": "Source",
            "value": "Web form fillout"
        }
    ]
}
```

When either of these two types of activities are returned, we store the associated Lead Id in a list. Once we have our list, we can iterate through it calling Get Lead by Id for each item. This will retrieve the latest lead data for each lead in the list. For this example we retrieve the following lead fields: `leadId`, `updatedAt`, `firstName`, `lastName`, and `email`. You are free to select any combination of fields for your purposes. This is done by specifying the fields parameter to Get Lead by Id. And finally we JSONify the results as an array of lead objects as described above.

 **Program Code**

```java
package com.marketo;

// minimal-json library (<https://github.com/ralfstx/minimal-json>)
import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import java.io.\*;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.\*;

import javax.net.ssl.HttpsURLConnection;

public class LeadChanges {
    //
    // Define Marketo REST API access credentials: Account Id, Client Id, Client Secret.  For example:
    //    public static String CUSTOM_SERVICE_DATA[] =
    //      {"111-AAA-222", "2f4a4435-f6fa-4bd9-3248-098754982345", "asdf6IVE9h4Jjcl59cOMAKFSk78ut12W"};
    //
    private static final String CUSTOM_SERVICE_DATA[] =
            {INSERT YOUR CUSTOM SERVICE DATA HERE};

    // Lead fields that we are interested in
    private static final String LEAD_CHANGE_FIELD_FILTER = "firstName,lastName,email";

    // Number of lead records to read at a time
    private static final String READ_BATCH_SIZE = "200";

    // Activity type ids that we are interested in
    private static final int ACTIVITY_TYPE_ID_NEW_LEAD = 12;
    private static final int ACTIVITY_TYPE_ID_CHANGE_DATA_VALE = 13;

    public static void main(String[] args) {
        // Command line argument to set how far back to look for lead changes (number of days)
        int lookBackNumDays = 1;
        if (args.length == 1) {
            lookBackNumDays = Integer.parseInt(args[0]);
        }

        // Establish "since date" using current timestamp minus some number of days (default is 1 day)
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -lookBackNumDays);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        String sinceDateTime = sdf.format(cal.getTime());

        // Compose base URL
        String baseUrl = String.format("https://%s.mktorest.com",
                CUSTOM_SERVICE_DATA[0]);

        // Compose Identity URL
        String identityUrl = String.format("%s/identity/oauth/token?grant_type=%s&client_id=%s&client_secret=%s",
                baseUrl, "client_credentials", CUSTOM_SERVICE_DATA[1], CUSTOM_SERVICE_DATA[2]);

        // Call Identity API
        JsonObject identityObj = JsonObject.readFrom(getData(identityUrl));
        String accessToken = identityObj.get("access_token").asString();

        // Compose URLs for Get Lead Changes, and Get Paging Token
        String leadChangesUrl = String.format("%s/rest/v1/activities/leadchanges.json?access_token=%s&fields=%s&batchSize=%s",
                baseUrl, accessToken, LEAD_CHANGE_FIELD_FILTER, READ_BATCH_SIZE);
        String pagingTokenUrl = String.format("%s/rest/v1/activities/pagingtoken.json?access_token=%s&sinceDatetime=%s",
                baseUrl, accessToken, sinceDateTime);

        HashSet leadIdList = new HashSet();

        // Call Get Paging Token API
        JsonObject pagingTokenObj = JsonObject.readFrom(getData(pagingTokenUrl));
        if (pagingTokenObj.get("success").asBoolean()) {

            String nextPageToken = pagingTokenObj.get("nextPageToken").asString();
            boolean moreResult;

            do {
                moreResult = false;

                // Call Get Lead Changes API
                JsonObject leadChangesObj = JsonObject.readFrom(getData(String.format("%s&nextPageToken=%s",
                        leadChangesUrl, nextPageToken)));
                if (leadChangesObj.get("success").asBoolean()) {
                    moreResult = leadChangesObj.get("moreResult").asBoolean();
                    nextPageToken = leadChangesObj.get("nextPageToken").asString();

                    if (leadChangesObj.get("result") != null) {
                        JsonArray resultAry = leadChangesObj.get("result").asArray();
                        for (JsonValue resultObj : resultAry) {
                            int activityTypeId = resultObj.asObject().get("activityTypeId").asInt();


                            // Store lead ids for later use
                            boolean storeThisId = false;
                            if (activityTypeId == ACTIVITY_TYPE_ID_NEW_LEAD) {
                                storeThisId = true;
                            } else if (activityTypeId == ACTIVITY_TYPE_ID_CHANGE_DATA_VALE) {
                                // See if any of the changed fields are of interest to us
                                JsonArray fieldsAry = resultObj.asObject().get("fields").asArray();
                                for (JsonValue fieldsObj : fieldsAry) {
                                    String name = fieldsObj.asObject().get("name").asString();
                                    if (LEAD_CHANGE_FIELD_FILTER.contains(name)) {
                                        storeThisId = true;
                                    }
                                }

                            }

                            if (storeThisId) {
                                leadIdList.add(resultObj.asObject().get("leadId").toString());
                            }
                        }
                    }
                }

            } while (moreResult);
        }

        JsonObject result = new JsonObject();
        JsonArray leads = new JsonArray();

        for (Object o : leadIdList) {
            String leadId = o.toString();

            // Compose Get Lead by Id URL
            String getLeadUrl = String.format("%s/rest/v1/lead/%s.json?access_token=%s",
                    baseUrl, leadId, accessToken);

            // Call Get Lead by Id API
            JsonObject leadObj = JsonObject.readFrom(getData(getLeadUrl));
            if (leadObj.get("success").asBoolean()) {
                if (leadObj.get("result") != null) {
                    JsonArray resultAry = leadObj.get("result").asArray();
                    for (JsonValue resultObj : resultAry) {

                        // Create lead object
                        JsonObject lead = new JsonObject();
                        lead.add("leadId", leadId);
                        lead.add("updatedAt", resultObj.asObject().get("updatedAt").asString());
                        lead.add("firstName", resultObj.asObject().get("firstName").asString());
                        lead.add("lastName", resultObj.asObject().get("lastName").asString());
                        lead.add("email", resultObj.asObject().get("email").asString());

                        // Add lead object to leads array
                        leads.add(lead);
                    }
                }
            }
        }

        // Add leads array to result object
        result.add("result", leads);

        // Print out result object
        System.out.println(result);

        System.exit(0);
    }

    // Perform HTTP GET request
    private static String getData(String endpoint) {
        String data = "";
        try {
            URL url = new URL(endpoint);
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setRequestMethod("GET");
            urlConn.setAllowUserInteraction(false);
            urlConn.setDoOutput(true);
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                InputStream inStream = urlConn.getInputStream();
                data = convertStreamToString(inStream);
            } else {
                System.out.println(responseCode);
                data = "Status:" + responseCode;
            }
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return data;
    }

    private static String convertStreamToString(InputStream inputStream) {
        try {
            return new Scanner(inputStream).useDelimiter("A").next();
        } catch (NoSuchElementException e) {
            return "";
        }
    }
}
```

So there you have it, [life's a happy song](https://www.youtube.com/watch?v=zFaBwZDywLk). Enjoy!

Posted on _2015-07-31_ by _David_

## May 2015 Release Updates

### REST API

* Opportunity API. New [opportunity endpoints](https://developer.adobe.com/marketo-apis/api/mapi#tag/Opportunities) have been introduced that allow you to programmatically list, describe, and CRUD the data residing within a Marketo opportunity object.

Note: Role permissions were added to provide access to the Opportunity endpoints: Read-Only Opportunity, Read-Write Opportunity. If your API user role predates the release of the Opportunity APIs, then you need to create a new API user role with these permissions to enable access. Otherwise, you receive a 603 "Access Denied" error response.

* Asset API - Snippets. New [asset endpoints for snippets](https://developer.adobe.com/marketo-apis/api/asset#snippet_endpoints) have been introduced to allow you to programmatically manipulate snippet objects. Snippets can be used as dynamic content blocks in Emails and Landing Pages.
* Leads API - Update Leads Partition. A new [lead endpoint for partitions](https://developer.adobe.com/marketo-apis/api/mapi#operation/updatePartitionsUsingPOST) has been added to allow you to update the partition for one or more leads.
* Fixed issue where Lead-related APIs were missing time zone offset in "createdAt" and "updatedAt" attributes.
* Fixed issue where Schedule Campaign was not returning the proper error code when the daily maximum number of calls had been exceeded.
* Fixed issue where Get Folder by Id would sometimes return null for "parent" and "description" attributes.
* Fixed issue where Approve Email by Id would give a system error in certain cases.
* Fixed issue where Create Token by Folder Id would produce a token that was unusable in certain cases.

### Real-Time Personalization (RTP)

* Rich Media Recommendation API. New [rich media recommendation](/help/javascript-api/web-personalization.md) capabilities have been added to the RTP JavaScript API. The Rich Media Content Recommendation engages your web visitors with the most relevant content powered by machine learning and predictive analytics. Enhance your content assets with text descriptions and images and embed multiple content recommendations on your website.

### Mobile Engagement SDK

iOS v0.3.4/Android v0.3.3

* Custom Actions. Added the ability to track user interaction by sending custom actions. For details, see "Sending Custom Actions" [here](/help/mobile/mobile.md).
* The trackPushNotification method has been deprecated.

Posted on _2015-05-26_ by _David_

## June 2015 Release Updates

### REST API

* Company API

New [company endpoints](https://developer.adobe.com/marketo-apis/api/mapi#tag/Companies) have been introduced that allow you to programmatically list, describe, and CRUD the data residing within a Marketo company object.

Note: Role permissions were added to provide access to the Program endpoints: Read-Only Company, Read-Write Company. If your API user role predates the release of the Company APIs, then you need to update your API user role with these permissions to enable access. Otherwise, you receive a 603 "Access Denied" error response

* Asset API - Programs

Updated Asset API to support both Application folders and Program folders. Several Asset APIs had accepted a folder id in the request in the form of an integer. The folder id could be passed as part of the URI, or part of the request body, depending on the API.

Now, you must specify the folder type alongside the folder id. The folder type is either "Program" or "Folder". "Folder" specifies an Application folder, whereas "Program" specifies a Program folder. The folder type is specified in two different ways, depending on the API that you are calling:

1. Use the "FolderIdType" data structure. FolderIdType is a simple JSON block containing the id and the type pair as follows:

  `{ "id" : **id**, "type" : "**type**" }`

Where **id** is the folder id, and "**type**" is the folder type. Permissible values for "**type**" are "Folder" or "Program".

Example - Create Folder

`POST /asset/v1/folders.json`

`parent={"id":416,"type":"Folder"}&name=Test Folder&description=This is a test folder`

1. Use the existing id parameter and specifying its type using a "type" query parameter.

Example - Get Folder by Id

`GET /rest/asset/v1/folder/1016.json?type=Program`

All API responses that had contained a folder id in the Result object will now also contain a folderId attribute whose value is a FolderIdType. This can be used to determine the folder type for a given folder id.

Example - Get Folder by Name

`GET /rest/asset/v1/folder/byName.json?name=Social Media`

```json
"result": [
{
...

"folderId": {"id":341, "type": "Program"},
...

"id":"341"
}
]
```

To determine the folder type for a given id, you may use the Browse Folders API.

The "type" attribute in API responses has been renamed to "folderType". This is to avoid confusion with the "type" element contained in FolderIdType.

For example, from this:

"**type**":"Marketing Folder"

to this:

"**folderType**": "Marketing Folder"

### Mobile Engagement SDK

iOS 0.3.5

* Fixed an issue where the set test device dialog was running on the main thread. [MOB-638]
* Added error handling in the case of failure to register the test device. [MOB-639]

Android 0.3.3

* Added android:configChanges attribute to AndroidManifest.xml `<activity>` element to keep progress dialog from being dismissed when you added a test device and changed the orientation. [MOB-687]

Posted on _2015-06-30_ by _David_

## In-App Web Personalization (Beta) using the RTP API

Several of our customers provide web app solutions for their users and we receive requests if they can use Marketo Real-Time Personalization (RTP) within their secured web app environment. The answer is yes! We've released an API for In-App messaging, so you can personalize content and promote marketing activities like webinars, new feature releases, up-sells and engage your users based on your web app data. For example, personalizing In-App content for:

* Trial offers based on user activity
* Different subscription types (up-sell, cross-sell, or webinar training)
* New features relevant to the user activity

**Use Case Example** Marketo's Customer Success team uses In-App Web Personalization to communicate with specific subscription types (Spark, Standard, Select, or Enterprise) with personalized content, making sure they are seeing progressive campaigns and nurturing in-app users based on their engagement. Let's see how this can be done for a user with an Enterprise subscription type. **Prerequisite** Understand the [RTP User Context API](/help/javascript-api/web-personalization.md). **Enable the User Context API** Request from Marketo Support to enable the User Context API for your RTP account. **Set the Custom Variable** There are 5 custom variable slots available in RTP to send data to. In this example, we will send a user subscription type Enterprise to Custom Variable 1.

`rtp('set', 'customVar1', 'Enterprise');`

**Create a New RTP Segment** Go to **Segments**, click **CREATE NEW**.

1. Drag the **User Context API** filter to the segment builder.
1. Select the **Custom Variable 1** (Subscription Type) that **value** is **Enterprise**.

 **Show Campaign Based on Previous Visit History** To show the visitor another campaign if they already clicked on a campaign in a previous visit.

1. Within the **User Context API**, click **(+)** to add another User Context API attribute
1. Add the **operator (AND or OR).**
1. Select **Campaigns - Clicked.** Set **Campaign ID** to the ID of the campaign. (See the note below how to find the Campaign ID.)
1. Click **SAVE & DEFINE CAMPAIGN** to create the campaign creative.

Overall, this segment will match if a visitor is associated with the custom variable (subscription type) equal to Enterprise and if they clicked on the campaign (ID: 5390) in a previous visit. The next step is to define a personalized campaign for this segment. The screenshot below shows an RTP dialog campaign (bottom left) appearing on the My Marketo page promoting a webinar for Enterprise users.  **NOTE:** **Locating the Campaign ID** Go to **Campaigns**, hover over the **Campaign Name** to locate the Campaign ID.
Posted on _2015-06-17_ by _David_

## Sending Transactional Emails with the Marketo REST API: Part 1

There are a few configuration requirements within Marketo to execute the required call with the Marketo REST API.

* The recipient must have a record within Marketo
* There needs to be a Transactional Email created and approved in your Marketo instance.
* There needs to be an active trigger campaign with the Campaign is Requested, Source: Web Service API, that is set up to send the email

First [create and approve your email](https://experienceleague.adobe.com/en/docs/marketo/using/home). If the email is truly transactional, you will likely need to set it to operational, but be sure that it legally qualifies as operational. This is configured from with the Edit Screen under Email Actions > Email Settings. Approve it and we're ready to create our campaign. If you're new to creating campaigns, check out the [Create a New Smart Campaign](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/creating-a-smart-campaign/create-a-new-smart-campaign) article on docs.marketo.com. Once you've created your campaign, we need to go through these steps. Configure your Smart List with the Campaign is Requested trigger: Now we need to configure the flow to point a Send Email step to our email. Before activation, you need to decide on some settings in the Schedule tab. If this particular email should only ever be sent once to a given record, then leave the qualification settings as is. If it's required that they receive the email multiple times, though, you'll want to adjust this to either every time or to one of the available cadences. Now we're ready to activate.

### Sending the API Calls

**Note:** In the Java examples below, we are using the minimal-json package to handle JSON representations in our code. You can read more about this project here: [https://github.com/ralfstx/minimal-json](https://github.com/ralfstx/minimal-json) The first part of sending a transactional email through the API is ensuring that a record with the corresponding email address exists in your Marketo instance and that we have access to its lead ID. For the purposes of this post, we will assume that the email addresses are in Marketo already, and we only need to retrieve the ID of the record. For this, we are using the [Get Multiple Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) call, and we are reusing some of the Java code from the previous post on. Let's take a look at our Main method for to request the campaign:

```java
package dev.marketo.blog_request_campaign;

import com.eclipsesource.json.JsonArray;

public class App
{
    public static void main( String[] args )
    {
     //Create an instance of Auth so that we can authenticate with our Marketo instance
        Leads leadsRequest = new Leads(auth).setFilterType("email").addFilterValue("<requestCampaign.test@marketo.com>");

        //Create and parameterize an instance of Leads
        //Set your email filterValue appropriately
        Leads leadsRequest = new Leads(auth).setFilterType("email").addFilterValue("test.requestCamapign@example.com");

        //Get the inner results array of the response
        JsonArray leadsResult = leadsRequest.getData().get("result").asArray();

        //Get the id of the record indexed at 0
        int lead = leadsResult.get(0).asObject().get("id").asInt();

        //Set the ID of your campaign from Marketo
        int campaignId = 0;
        RequestCampaign rc = new RequestCampaign(auth, campaignId).addLead(lead);

        //Send the request to Marketo
        rc.postData();
    }
}
```

To get to these results from the JsonObject response of leadsRequest, we need to write some code. To retrieve the first result in the Array, we need to extract the Array from the JsonObject and get the object indexed at 0:

`JsonArray leadsResult = leadsRequest.getData().get("result").asArray();`
`int leadId = leadsResult.get(0).asObject().get("id").asInt();`

From here now all we need to do is the Request Campaign call. For this, the required parameters are ID in the URL of the request, and an array of JSON objects containing one member, "id." Let's take a look at the code for this:

```java
package dev.marketo.blog_request_campaign;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import javax.net.ssl.HttpsURLConnection;
import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

public class RequestCampaign {
 private String endpoint;
 private Auth auth;
 public ArrayList leads = new ArrayList();
 public ArrayList tokens = new ArrayList();

 public RequestCampaign(Auth auth, int campaignId) {
  this.auth = auth;
  this.endpoint = this.auth.marketoInstance + "/rest/v1/campaigns/" + campaignId + "/trigger.json";
 }
 public RequestCampaign setLeads(ArrayList leads) {
  this.leads = leads;
  return this;
 }
 public RequestCampaign addLead(int lead){
  leads.add(lead);
  return this;
 }
 public RequestCampaign setTokens(ArrayList tokens) {
  this.tokens = tokens;
  return this;
 }
 public RequestCampaign addToken(String tokenKey, String val){
  JsonObject jo = new JsonObject().add("name", tokenKey);
  jo.add("value", val);
  tokens.add(jo);
  return this;
 }
 public JsonObject postData(){
  JsonObject result = null;
  try {
   JsonObject requestBody = buildRequest(); //builds the Json Request Body
   String s = endpoint + "?access_token=" + auth.getToken(); //takes the endpoint URL and appends the access_token parameter to authenticate
   System.out.println("Executing RequestCampaign calln" + "Endpoint: " + s + "nRequest Body:n"  + requestBody);
   URL url = new URL(s);
   HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection(); //Return a URL connection and cast to HttpsURLConnection
   urlConn.setRequestMethod("POST");
   urlConn.setRequestProperty("Content-type", "application/json");
            urlConn.setRequestProperty("accept", "text/json");
            urlConn.setDoOutput(true);
   OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
   wr.write(requestBody.toString());
   wr.flush();
   InputStream inStream = urlConn.getInputStream(); //get the inputStream from the URL connection
   Reader reader = new InputStreamReader(inStream);
   result = JsonObject.readFrom(reader); //Read from the stream into a JsonObject
   System.out.println("Result:n" + result);
  } catch (MalformedURLException e) {
   e.printStackTrace();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return result;
 }

 private JsonObject buildRequest(){
  JsonObject requestBody = new JsonObject(); //Create a new JsonObject for the Request Body
  JsonObject input = new JsonObject();
  JsonArray leadsArray = new JsonArray();
  for (int lead : leads) {
   JsonObject jo = new JsonObject().add("id", lead);
   leadsArray.add(jo);
  }
  input.add("leads", leadsArray);
  JsonArray tokensArray = new JsonArray();
  for (JsonObject jo : tokens) {
   tokensArray.add(jo);
  }
  input.add("tokens", tokensArray);
  requestBody.add("input", input);
  return requestBody;
 }

}
```

This class has one constructor taking an Auth, and the Id of the campaign. Leads are added to the object either by passing an ArrayList `<Integer>` containing the Ids of the records to setLeads, or by using addLead, which takes one integer and appends it to the existing ArrayList in the leads property. To trigger the API call to pass the lead records to the campaign, postData needs to be called, which returns a JsonObject containing the response data from the request. When a request campaign is called, every lead passed to the call will be processed by the target trigger campaign in Marketo and be is is sent the email which was created previously. Congratulations, you've triggered an email through the Marketo REST API. Keep an eye out for Part 2 where we'll look at dynamically customizing the content of an email through Request Campaign.

Posted on _2015-07-17_ by _Kenny_

## Authenticating and Retrieving Lead Data from Marketo with the REST API

**Note:** In the Java examples below, we are using the minimal-json package to handle JSON representations in our code. You can read more about this project here: [https://github.com/ralfstx/minimal-json](https://github.com/ralfstx/minimal-json) One of the most common requirements when integrating with Marketo is the retrieval of lead data. Most, if not all integrations will require either the retrieval or submission of lead data from a Marketo subscription, so today we will take a look at a basic lead information retrieval task, by [authenticating](/help/rest-api/authentication.md) with a subscription and then retrieving lead data from it. To retrieve our leads, first we need to authenticate with the target Marketo instance using OAuth 2.0. There are three pieces of information that we need to authenticate with Marketo, the client ID, client secret, and the host of the Marketo instance. Here's the class that we are using to authenticate:

```java
package dev.marketo.blog_leads;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;
import com.eclipsesource.json.JsonObject;

public class Auth {
 protected String marketoInstance; //Instance Host obtained from Admin -> Web Service
 private String clientId; //clientId obtained from Admin -> Launchpoint -> View Details for selected service
 private String clientSecret; //clientSecret obtained from Admin -> Launchpoint -> View Details for selected service
 private String idEndpoint; //idEndpoint constructed to authenticate with service when constructor is used
 private String token; //token is stored for reuse until expiration
 private Long expiry; //used to store time of expiration

 //Creates an instance of Auth which is used to Authenticate with a particular service on a particular instance
 public Auth(String id, String secret, String instanceUrl) {
  this.clientId = id;
  this.clientSecret = secret;
  this.marketoInstance = instanceUrl;
  this.idEndpoint = marketoInstance + "/identity/oauth/token?grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
 }
 //The only public method of Auth, used to check if the current value of Token is valid, and then to retrieve a new one if it is not
 public String getToken(){
  long now  = System.currentTimeMillis();
  if (expiry == null || expiry < now){
   System.out.println("Token is empty or expired. Trying new authentication");
   JsonObject jo = getData();
   System.out.println("Got Authentication Response: " + jo);
   this.token = jo.get("access_token").asString();
                        //expires_in is reported as seconds, set expiry to system time in ms + expires \* 1000
   this.expiry = System.currentTimeMillis() + (jo.get("expires_in").asLong() \* 1000);
  }
  return this.token;
 }
 //Executes the authentication request
 private JsonObject getData(){
  JsonObject jsonObject = null;
  try {
   URL url = new URL(idEndpoint);
   HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
   urlConn.setRequestMethod("GET");
            urlConn.setRequestProperty("accept", "application/json");
            System.out.println("Trying to authenticate with " + idEndpoint);
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                InputStream inStream = urlConn.getInputStream();
                Reader reader = new InputStreamReader(inStream);
                jsonObject = JsonObject.readFrom(reader);
            }else {
                throw new IOException("Status: " + responseCode);
            }
  } catch (MalformedURLException e) {
   e.printStackTrace();
  }catch (IOException e) {
            e.printStackTrace();
        }
  return jsonObject;
 }
}
```

This code allows you to create an instance of Auth with our client ID, client secret and host (as marketoInstance) from Admin -> Launchpoint (ID and Secret) and Admin -> Web Services (Host). It exposes the getToken method which tests whether the currently stored token is null or expired, and then returns either the existing token, or makes a new authentication request then returns the new token from the "access_token" member of the JSON response. Now that you can authenticate with your Marketo instance, the next step is to retrieve our leads. We are using this class:

```java
package dev.marketo.blog_leads;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import javax.net.ssl.HttpsURLConnection;
import com.eclipsesource.json.JsonObject;

public class Leads {
 private StringBuilder endpoint;
 private Auth auth;
 public String filterType;
 public ArrayList filterValues = new ArrayList();
 public Integer batchSize;
 public String nextPageToken;
 public ArrayList fields = new ArrayList();

 public Leads(Auth a) {
  this.auth = a;
  this.endpoint = new StringBuilder(this.auth.marketoInstance + "/rest/v1/leads.json");
 }
 public Leads setFilterType(String filterType) {
  this.filterType = filterType;
  return this;
 }
 public Leads setFilterValues(ArrayList filterValues) {
  this.filterValues = filterValues;
  return this;
 }
 public Leads addFilterValue(String filterVal) {
  this.filterValues.add(filterVal);
  return this;
 }
 public Leads setBatchSize(Integer batchSize) {
  this.batchSize = batchSize;
  return this;
 }
 public Leads setNextPageToken(String nextPageToken) {
  this.nextPageToken = nextPageToken;
  return this;
 }
 public Leads setFields(ArrayList fields) {
  this.fields = fields;
  return this;
 }

 public JsonObject getData() {
        JsonObject result = null;
        try {
         endpoint.append("?access_token=" + auth.getToken() + "&filterType=" + filterType + "&filterValues=" + csvString(filterValues));
         if (batchSize != null && batchSize > 0 && batchSize <= 300){
             endpoint.append("&batchSize=" + batchSize);
            }
            if (nextPageToken != null){
             endpoint.append("&nextPageToken=" + nextPageToken);
            }
            if (fields != null){
             endpoint.append("&fields=" + csvString(fields));
            }
            URL url = new URL(endpoint.toString());
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setRequestMethod("GET");
            urlConn.setRequestProperty("accept", "text/json");
            InputStream inStream = urlConn.getInputStream();
            Reader reader = new InputStreamReader(inStream);
            result = JsonObject.readFrom(reader);
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
 private String csvString(ArrayList fields) {
  StringBuilder fieldCsv = new StringBuilder();
     for (int i = 0; i < fields.size(); i++){
      fieldCsv.append(fields.get(i));
      if (i + 1 != fields.size()){
       fieldCsv.append(",");
      }
     }
  return fieldCsv.toString();
 }
}
```

This class has a single constructor which accepts an Auth object, and then exposes several setters for both optional and required parameters. In this case, we really only need to concern ourselves with setting the filterType and filterValues to perform get leads by email address. So we'll use setFilterType for "email," and addFilterValue for the email address that we need to retrieve an ID for. When you've set your parameters, you can use the getData method to retrieve a JsonObject from the leads endpoint, containing a results array which has a JSON representation of the lead records which were retrieved.

### Putting it together

Now that we've gone through the sample code that we are using let's take a look at a simple example to retrieve leads matching a test email address, <testlead@marketo.com>. For this we need to use setFilterType for "email," and addFilterValue for the email address that we need to retrieve information for. When you've set your parameters, you can use the getData method to retrieve a JsonObject from the leads endpoint, containing a results array which has a JSON representation of the lead records which were retrieved.

```java
package dev.marketo.blog_leads;

import com.eclipsesource.json.JsonObject;

public class App
{
    public static void main( String[] args )
    {
     //Create an instance of Auth so that we can authenticate with our Marketo instance
        //Change the credentials here to your own
        Auth auth = new Auth("CHANGE ME", "CHANGE ME", "CHANGE ME");
        //Create and parameterize an instance of Leads
        Leads getLeads = new Leads(auth)
              .setFilterType("email")
              .addFilterValue("<testlead@marketo.com>");
        //get the inner results array of the response
        JsonObject leadsResult = getLeads.getData();
        System.out.println(leadsResult);
    }
}
```

In this main method example, we create an instance of Auth, and then pass this to a new Leads constructor. Using setFilterType, and addFilterValue, we configure our instance of Leads to retrieve just leads matching the email address "<testlead@marketo.com>." This example prints this out to the console:

Token is empty or expired. Trying new authentication
Trying to authenticate with `https://299-BYM-827.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=b417d98f-9289-47d1-a61f-db141bf0267f&client_secret=0DipOvz4h2wP1ANeVjlfwMvECJpo0ZYc`
Got Authentication Response: {"access_token":"ec0f02c0-28ac-4d6c-b7d7-00e47ae85ff1:st","token_type":"bearer","expires_in":538,"scope":"<apiuser@mktosupport.com>"}
{"requestId":"14fb6#14e6a7a9ad6","result":[{"id":1026322,"updatedAt":"2015-07-07T21:43:25Z","lastName":"Lead","email":"<testlead@marketo.com>","createdAt":"2015-07-07T21:43:25Z","firstName":"Test"},{"id":1026323,"updatedAt":"2015-07-07T21:43:43Z","lastName":"Lead2","email":"<testlead@marketo.com>","createdAt":"2015-07-07T21:43:43Z","firstName":"Test"}],"success":true}

Now we have lead data which we can process in whatever way that we need. Thanks for reading, and please leave any feedback you have in the comments.

Posted on _2015-07-10_ by _Kenny_

## July 2015 Release Updates

REST API

* Sales Person API

New [sales person endpoints](/help/rest-api/sales-persons.md) have been introduced that allow you to programmatically list, describe, and CRUD the data residing within a Marketo sales person object. In addition, a sales person can be assigned to a lead, opportunity, or company. This is done by specifying an "externalSalesPersonId" attribute when calling the Create/Update/Upsert endpoint for lead, opportunity, or company.

Note: Role permissions were added to provide access to the Program endpoints: Read-Only Sales Person, Read-Write Sales Person. If your API user role predates the release of the Sales Person APIs, then you need to update your API user role with these permissions to enable access. Otherwise, you receive a 603 "Access Denied" error response.

* Asset API - Landing Page Template

New [landing page template endpoints](https://developer.adobe.com/marketo-apis/api/asset#landing_page_templates_endpoints) have been introduced that allow you to programmatically list, create, and update the data associated with a landing page template.

* Asset API - Segments

Two segment-related endpoints have been introduced:

Get Segments

Get Segmentation by Id

* Fixed issue where Get Folder by Name was not honoring the "workSpace" parameter. [LM-61059]
* Made several performance improvements to the Custom Object APIs.

Posted on _2015-07-17_ by _David_

## Create and Associate Leads, Companies, and Opportunities with the Marketo REST API

In order to take full advantage of Marketo analytics it is crucial to build out correct and robust associations between your lead, company and opportunity records. When you are not leveraging a native CRM-sync, building these relationships can pose some difficulties, so today we walk through building them.

### Object Relationships

In Marketo, there are a few vital relationships to fully establish opportunity reporting:

* Leads and Opportunities have a many to many relationship with the OpportunityRole object.
* OpportunityRole has both a leadId and externalopportunityid field to create the relationship from lead to opportunity.
* In order to qualify for a Has Opportunity smart list filter, a lead must have an OpportunityRole related to an opportunity.
* Opportunities have a many-to-one relationship to the Company object via the externalCompanyId field.
* Leads have a one-to-many relationship to Companies via the externalCompanyId field.
* Opportunities are attributed to a program based on a lead's Acquisition Program or their membership and success in a program (See [Understanding Attribution](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/reporting/revenue-cycle-analytics/revenue-tools/attribution/understanding-attribution)).

Building out these relationships across your lead database will allow you to fully leverage Marketo analytics and see the influence that your programs have on opportunity creation and win rates.

### Companies

The simplest way to build out these relationships is by starting with company creation. This ensures that we can pass externalCompanyId to our opportunities during creation, instead of having to perform additional API calls to update opportunities after they've been created. Depending on the existing configuration, this may or may not be a necessary step, but net new leads and contacts with associated companies need to have these records added to your Marketo instance in order for the relationships to be built, so let's take a look at some code to create company records.

```java
package dev.marketo.opportunities;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

public class UpsertCompanies {
 public List<JsonObject> input; //a list of Companies to use for input.  Each must have a member "externalCompanyId".
 public String action; //specify the action to be undertaken, createOnly, updateOnly, createOrUpdate
 public String dedupeBy; //select mode of Deduplication, dedupeFields for all dedupe parameters(externalCompanyId), idField for marketoId
 private String endpoint; //endpoint URL created with Constructor
 private Auth auth; //Marketo Auth Object


 //Constructs an UpsertOpportunities with Auth, but with no input set
 public UpsertCompanies(Auth auth){
  this.auth = auth;
  this.endpoint = this.auth.marketoInstance + "/rest/v1/companies.json";
 }
 //Constructs and UpsertOpportunities with Auth and input set
 public UpsertCompanies(Auth auth, List<JsonObject> input) {
  this(auth);
  this.input = input;
 }
 //adds input to existing list, creates arraylist if it was built without a list
 public UpsertCompanies addCompanies(JsonObject... companies){
  if (this.input == null){
   this.input = new ArrayList();
  }
  for (JsonObject jo : companies) {
   System.out.println(jo);
   this.input.add(jo);
  }
  return this;
 }

 public JsonObject postData(){
  JsonObject result = null;
  try {
   JsonObject requestBody = buildRequest(); //builds the Json Request Body
   String s = endpoint + "?access_token=" + auth.getToken(); //takes the endpoint URL and appends the access_token parameter to authenticate
   URL url = new URL(s);
   HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection(); //Return a URL connection and cast to HttpsURLConnection
   urlConn.setRequestMethod("POST");
   urlConn.setRequestProperty("Content-type", "application/json");
            urlConn.setRequestProperty("accept", "text/json");
            urlConn.setDoOutput(true);
   OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
   wr.write(requestBody.toString());
   wr.flush();
   InputStream inStream = urlConn.getInputStream(); //get the inputStream from the URL connection
   Reader reader = new InputStreamReader(inStream);
   result = JsonObject.readFrom(reader); //Read from the stream into a JsonObject
   urlConn.disconnect();
  } catch (MalformedURLException e) {
   e.printStackTrace();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return result;
 }

 private JsonObject buildRequest(){
  JsonObject requestBody = new JsonObject(); //Create a new JsonObject for the Request Body
  JsonArray in = new JsonArray(); //Create a JsonArray for the "input" member to hold Opp records
  for (JsonObject jo : input) {
   in.add(jo); //add our company records to the input array
  }
  requestBody.add("input", in);
  if (this.action != null){
   requestBody.add("action", action); //add the action member if available
  }
  if (this.dedupeBy != null){
   requestBody.add("dedupeBy", dedupeBy); //add the dedupeBy member if available
  }
  return requestBody;
 }
 //Getters and Setters
 //Setters return the UpsertCompanies instance to allow simple formatting:
 public List<JsonObject> getInput() {
  return input;
 }
 //sets or replaces existing input with list
 public UpsertCompanies setInput(List input) {
  this.input = input;
  return this;
 }
 public String getAction() {
  return action;
 }
 public UpsertCompanies setAction(String action) {
  this.action = action;
  return this;
 }
 public String getDedupeBy() {
  return dedupeBy;
 }
 public UpsertCompanies setDedupeBy(String dedupeBy) {
  this.dedupeBy = dedupeBy;
  return this;
 }

}
```

The companies API provides two deduplication options, set by the dedupeBy parameter in the request, "dedupeFields" and "idField." These can be explicitly retrieved by calling Describe Companies. If dedupeBy is unset, it defaults to dedupeFields. In the case of company records, dedupeFields always corresponds to "externalCompanyId," which is an arbitrary string set by an external source, and idField, corresponding to the "marketoId" field, which is an integer generated and returned by Marketo after creation. Depending on the selection for dedupeBy, one of externalCompanyId or marketoId must be included in any upsert call for a company record. These same requirements apply to the Opportunity and Opportunity Role object APIs. Our code exposes two constructors: one accepting a single argument of an Auth object, and another which accepts Auth and a list of [JsonObject](https://github.com/ralfstx/minimal-json) company records. If constructed without an input List, then company records must be added through the addCompanies method, which will check create a new ArrayList if the input is null, and then add all JsonObject arguments to the input List. Here's an example usage:

```java
//Create a new company to associate to
JsonObject myCompany = new JsonObject().add("externalCompanyId", "myCompany");
UpsertCompanies upsertCompanies = new UpsertCompanies(auth).addCompanies(myCompany);
JsonObject companiesResult = upsertCompanies.postData();
System.out.println(companiesResult);
```

We're creating a single company JsonObject with just one field, `externalCompanyId`, then constructing an instance of UpsertCompanies, and adding our company to the input list with `addCompanies`.

### Opportunities

Similar to the company objects, the opportunity API has a `dedupeBy` parameter, accepting "dedupeFields" or "idField," corresponding to "externalopportunityid" and "marketoGUID" respectively. So here's our code, which looks quite similar to the UpsertCompanies class:

```java
package dev.marketo.opportunities;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

public class UpsertOpportunities {
 public List<JsonObject> input; //a list of Opportunities to use for input.  Each must have a member "externalopportunityid".  Each can optionally include "externalCompanyId" for company association
 public String action; //specify the action to be undertaken, createOnly, updateOnly, createOrUpdate
 public String dedupeBy; //select mode of Deduplication, dedupeFields for all dedupe parameters, idField for marketoId
 private String endpoint; //endpoint URL created with Constructor
 private Auth auth; //Marketo Auth Object


 //Constructs an UpsertOpportunities with Auth, but with no input set
 public UpsertOpportunities(Auth auth){
  this.auth = auth;
  this.endpoint = this.auth.marketoInstance + "/rest/v1/opportunities.json";
 }
 //Constructs and UpsertOpportunities with Auth and input set
 public UpsertOpportunities(Auth auth, List<JsonObject> input) {
  this(auth);
  this.input = input;
 }
 public UpsertOpportunities addOpportunities(JsonObject... opp){
  if (this.input == null){
   this.input = new ArrayList();
  }
  for (JsonObject jo : opp) {
   System.out.println(jo);
   this.input.add(jo);
  }
  return this;
 }

 public JsonObject postData(){
  JsonObject result = null;
  try {
   JsonObject requestBody = buildRequest(); //builds the Json Request Body
   String s = endpoint + "?access_token=" + auth.getToken(); //takes the endpoint URL and appends the access_token parameter to authenticate
   URL url = new URL(s);
   HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection(); //Return a URL connection and cast to HttpsURLConnection
   urlConn.setRequestMethod("POST");
   urlConn.setRequestProperty("Content-type", "application/json");
            urlConn.setRequestProperty("accept", "text/json");
            urlConn.setDoOutput(true);
   OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
   wr.write(requestBody.toString());
   wr.flush();
   InputStream inStream = urlConn.getInputStream(); //get the inputStream from the URL connection
   Reader reader = new InputStreamReader(inStream);
   result = JsonObject.readFrom(reader); //Read from the stream into a JsonObject
   urlConn.disconnect();
  } catch (MalformedURLException e) {
   e.printStackTrace();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return result;
 }

 private JsonObject buildRequest(){
  JsonObject requestBody = new JsonObject(); //Create a new JsonObject for the Request Body
  JsonArray in = new JsonArray(); //Create a JsonArray for the "input" member to hold Opp records
  for (JsonObject jo : input) {
   in.add(jo); //add our Opportunity records to the input array
  }
  requestBody.add("input", in);
  if (this.action != null){
   requestBody.add("action", action); //add the action member if available
  }
  if (this.dedupeBy != null){
   requestBody.add("dedupeBy", dedupeBy); //add the dedupeBy member if available
  }
  return requestBody;
 }
 //Getters and Setters
 //Setters return the UpsertOpportunites instance to allow simple formatting:
 public List<JsonObject> getInput() {
  return input;
 }
 public UpsertOpportunities setInput(List<JsonObject> input) {
  this.input = input;
  return this;
 }
 public String getAction() {
  return action;
 }
 public UpsertOpportunities setAction(String action) {
  this.action = action;
  return this;
 }
 public String getDedupeBy() {
  return dedupeBy;
 }
 public UpsertOpportunities setDedupeBy(String dedupeBy) {
  this.dedupeBy = dedupeBy;
  return this;
 }

}
```

The same constructor options are provided, taking an Auth or `Auth+List<JsonObject>`, and an `addOpportunities` method to input JsonObject opportunities. Here's a usage example:

```java
//Create some JsonObjects for Opportunity Data
JsonObject opp1 = new JsonObject().add("name", "opportunity1")
    .add("externalopportunityid", "Opportunity1Test")
    .add("externalCompanyId", "myCompany")
    .add("externalCreatedDate", "2015-01-01T00:00:00z");
JsonObject opp2 = new JsonObject().add("name", "opportunity2")
    .add("externalopportunityid", "Opportunity2Test")
    .add("externalCompanyId", "myCompany")
    .add("externalCreatedDate", "2015-01-01T00:00:00z");

//Create an Instance of UpsertOpportunities and POST it
UpsertOpportunities upsertOpps = new UpsertOpportunities(auth)
                        .setAction("createOnly")
                        .addOpportunities(opp1, opp2);
JsonObject oppsResult = upsertOpps.postData();
System.out.println(oppsResult);
```

Here, we're creating two example opportunities and then giving them values for the name, externalopportunityid, externalCompanyId, and externalCreatedDate fields. We haven't discussed externalCreatedDate yet, but it is important to utilize since it is treated as the master field in RCE for when an opportunity was created, making it important for correct attribution. You can use your organization's business logic to determine what you input in this field, based on whether you're backfilling existing opportunity data, or creating new ones on the fly. We create our instance of UpsertOpportunities and then add our JsonObjects via addOpportunities. Now that the instance is configured you can push this to Marketo with postData and print out your result

### Roles

Roles are quite similar to the preceding two objects, except that they have a slightly different requirement when setting dedupeBy to dedupeFields. Roles require that three fields be included when creating or updating a record via this method, "leadId," "role," and"externalopportunityid." "role" may be any string value, but the other two must refer to a valid Id of a lead, and a valid Id of an opportunity respectively.

```java
package dev.marketo.opportunities;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

public class UpsertOpportunityRoles {
 public List<JsonObject> input; //Array of Opportunity Roles as JsonObjects, must have "leadId", "role" and "externalopprtunityid"
 public String action; //specify the action to be undertaken, createOnly, updateOnly, createOrUpdate, defaults to createOrUpdate if unset
 public String dedupeBy;//select mode of Deduplication, dedupeFields for all dedupe parameters, idField for marketoId
 private String endpoint; //endpoint URL created with Constructor
 private Auth auth; //Marketo Auth Object

 //Constructs an UpsertOpportunityRoles with Auth, but with no input set
 public UpsertOpportunityRoles(Auth auth) {
  this.auth = auth;
  this.endpoint = this.auth.marketoInstance + "/rest/v1/opportunities/roles.json";
 }
 //Constructs and UpsertOpportunities with Auth and input set
 public UpsertOpportunityRoles(Auth auth, List<JsonObject> input) {
  this(auth);
  this.input = input;
 }
 public UpsertOpportunityRoles addRoles(JsonObject... role){
  if (this.input == null){
   this.input = new ArrayList();
  }
  for (JsonObject jo : role) {
   System.out.println(jo);
   this.input.add(jo);
  }
  return this;
 }
 //executes the request to Marketo, body will be empty if input is not set
 public JsonObject postData(){
  JsonObject result = null;
  try {
   JsonObject requestBody = buildRequest(); //builds the Json Request Body
   String s = endpoint + "?access_token=" + auth.getToken(); //takes the endpoint URL and appends the access_token parameter to authenticate
   URL url = new URL(s);
   HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection(); //Return a URL connection and cast to HttpsURLConnection
   urlConn.setRequestMethod("POST");
   urlConn.setRequestProperty("Content-type", "application/json");//"application/json" content-type is required.
            urlConn.setRequestProperty("accept", "text/json");
            urlConn.setDoOutput(true);
   OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
   wr.write(requestBody.toString());
   wr.flush();
   InputStream inStream = urlConn.getInputStream();  //get the inputStream from the URL connection
   Reader reader = new InputStreamReader(inStream);
   result = JsonObject.readFrom(reader); //Read from the stream into a JsonObject
   urlConn.disconnect();
  } catch (MalformedURLException e) {
   e.printStackTrace();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return result;
 }

 public JsonObject buildRequest(){
  JsonObject requestBody = new JsonObject();
  JsonArray in = new JsonArray();
  for (JsonObject jo : input) {
   in.add(jo);
  }
  requestBody.add("input", in);
  if (this.action != null){
   requestBody.add("action", action);
  }
  if (this.dedupeBy != null){
   requestBody.add("dedupeBy", dedupeBy);
  }
  return requestBody;
 }
 //Getters and Setters
 //Setters return the UpsertOpportunites instance to allow simple formatting:
 public List<JsonObject> getInput() {
  return input;
 }
 public UpsertOpportunityRoles setInput(List<JsonObject> input) {
  this.input = input;
  return this;
 }
 public String getAction() {
  return action;
 }
 public UpsertOpportunityRoles setAction(String action) {
  this.action = action;
  return this;
 }
 public String getDedupeBy() {
  return dedupeBy;
 }
 public UpsertOpportunityRoles setDedupeBy(String dedupeBy) {
  this.dedupeBy = dedupeBy;
  return this;
 }

}
```

We're following a similar pattern for the constructors and addRoles method as the previous examples. Here's an example.

```java
//Create Some opp roles now
JsonObject opp1Role = new JsonObject()
                        .add("role", "Captain")
                        .add("externalopportunityid", opp1.get("externalopportunityid").asString())
                        .add("leadId", 318794);
JsonObject opp2Role = new JsonObject()
                        .add("role", "Commander")
                        .add("externalopportunityid", opp2.get("externalopportunityid").asString())
                        .add("leadId", 318795);

//Create an Instance of UpsertOpportunityRoles and POST it
UpsertOpportunityRoles upsertRoles = new UpsertOpportunityRoles(auth)
                        .setAction("createOnly")
                        .addRoles(opp1Role, opp2Role);
JsonObject rolesResult = upsertRoles.postData();
System.out.println(rolesResult);
```

Here we're creating the new JsonObjects for our 2 example roles, and adding their required dedupeFields, pulling the externalopportunityid from the opportunities we already created, then pushing them down to Marketo.

### Putting It All Together

Here is the complete example of our main method:

```java
package dev.marketo.opportunities;

import com.eclipsesource.json.JsonObject;

public class App
{
    public static void main( String[] args )
    {
     //create an Instance of Auth
        Auth auth = new Auth("CLIENT_ID_CHANGE_ME", "CLIENT_SECRET_CHANGE_ME", "MARKETO_HOST_CHANGE_ME");

        //Create a new company to associate to
        JsonObject myCompany = new JsonObject().add("externalCompanyId", "myCompany");
        UpsertCompanies upsertCompanies = new UpsertCompanies(auth).addCompanies(myCompany);
        JsonObject companiesResult = upsertCompanies.postData();
        System.out.println(companiesResult);

        //Create some JsonObjects for Opportunity Data
        JsonObject opp1 = new JsonObject().add("name", "opportunity1")
           .add("externalopportunityid", "Opportunity1Test")
           .add("externalCompanyId", "myCompany")
           .add("externalCreatedDate", "2015-01-01T00:00:00z");
        JsonObject opp2 = new JsonObject().add("name", "opportunity2")
           .add("externalopportunityid", "Opportunity2Test")
           .add("externalCompanyId", "myCompany")
           .add("externalCreatedDate", "2015-01-01T00:00:00z");

        //Create an Instance of UpsertOpportunities and POST it
        UpsertOpportunities upsertOpps = new UpsertOpportunities(auth)
                                .setAction("createOnly")
                                .addOpportunities(opp1, opp2);
        JsonObject oppsResult = upsertOpps.postData();
        System.out.println(oppsResult);

        //Create Some opp roles now
        JsonObject opp1Role = new JsonObject()
           .add("role", "Captain")
           .add("externalopportunityid", opp1.get("externalopportunityid").asString())
           .add("leadId", 318794);
        JsonObject opp2Role = new JsonObject()
           .add("role", "Commander")
           .add("externalopportunityid", opp2.get("externalopportunityid").asString())
           .add("leadId", 318795);

        //Create an Instance of UpsertOpportunityRoles and POST it
        UpsertOpportunityRoles upsertRoles = new UpsertOpportunityRoles(auth)
           .setAction("createOnly")
           .addRoles(opp1Role, opp2Role);
        JsonObject rolesResult = upsertRoles.postData();
        System.out.println(rolesResult);

    }
}
```

You can see the sequence of creating companies, opportunities, and roles. Now, you're all set to sync your Company and Opportunity data to Marketo.

Posted on _2015-08-07_ by _Kenny_

## Sending Transactional Emails with the Marketo REST API: Part 2, Custom Content

This week we are looking at how to pass dynamic content to our emails via the Request Campaign API call. Request Campaign not only allows the triggering of emails externally, but you can also replace the content of [My Tokens](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/tokens/understanding-my-tokens-in-a-program) within an email. My tokens are reusable content that can be customized at the program or marketing folder level. These can also just exist as placeholders to be replaced through your request campaign call.

### Building your Email

In order to customize our content, first we need to configure a [program](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/creating-programs/create-a-program) and an [email](https://experienceleague.adobe.com/en/docs/marketo/using/home) in Marketo. To generate our custom content, we need to create tokens inside of the program, and then place them into the email that we're going to be sending. For simplicity's sake, we are using just one token in this example, but you can replace any number of tokens in an email, in the From Email, From Name, Reply-to or any piece of content in the email. So let's create one token Rich Text for replacement and call it "bodyReplacement". Rich Text allows us to replace any content in the token with arbitrary HTML that we want to input. Tokens can't be saved while empty, so go ahead and insert some placeholder text here. Now we need to insert our token into the email: This token will now be accessible for replacement through a Request Campaign call. This token can be as simple as a single line of text which needs to be replaced on a per-email basis, or can include almost the entire layout of the email.

### The Code

We are expanding on the code from last week to pass in customized tokens to our request campaign call.

```java
package dev.marketo.blog_request_campaign;

import com.eclipsesource.json.JsonArray;

public class App
{
    public static void main( String[] args )
    {
     //Create an instance of Auth so that we can authenticate with our Marketo instance
        Auth auth = new Auth("Client ID - CHANGE ME", "Client Secret - CHANGE ME", "Host - CHANGE ME");

        //Create and parameterize an instance of Leads
        Leads leadsRequest = new Leads(auth).setFilterType("email").addFilterValue("requestCampaign.test@marketo.com");

        //get the inner results array of the response
        JsonArray leadsResult = leadsRequest.getData().get("result").asArray();

        //get the id of the record indexed at 0
        int lead = leadsResult.get(0).asObject().get("id").asInt();

        //Set the ID of our campaign from Marketo
        int campaignId = 1578;
        RequestCampaign rc = new RequestCampaign(auth, campaignId).addLead(lead);

        //Create the content of the token here, and add it to the request
        String bodyReplacement = "<div class="replacedContent"><p>This content has been replaced</p></div>";
        rc.addToken("{{my.bodyReplacement}}", bodyReplacement);
        rc.postData();
    }
}
```

This time we're creating the content of our token in the bodyReplacement variable and then using the addToken method to add it to the request. addToken takes a key and a value and then creates a JsonObject representation and adds it to the internal tokens array. This is then serialized during the postData method and creates a body that looks like this:

`{"input":{"leads":[{"id":1}],"tokens":[{"name":"{{my.bodyReplacement}}","value":"<div class="replacedContent"><p>This content has been replaced</p></div>"}]}}`

Combined, our console output looks like this:

```bash
Token is empty or expired. Trying new authentication
Trying to authenticate with&nbsp;...
Got Authentication Response: {"access_token":"19d51b9a-ff60-4222-bbd5-be8b206f1d40:st","token_type":"bearer","expires_in":3565,"scope":"<apiuser@mktosupport.com>"}
Executing RequestCampaign call
Endpoint: .../rest/v1/campaigns/1578/trigger.json?access_token=19d51b9a-ff60-4222-bbd5-be8b206f1d40:st
Request Body:
{"input":{"leads":[{"id":1}],"tokens":[{"name":"{{my.bodyReplacement}}","value":"<div class="replacedContent"><p>This content has been replaced</p></div>"}]}}
Result:
{"requestId":"1e8d#14eadc5143d","result":[{"id":1578}],"success":true}
```

### Wrapping Up

This method is extensible in a multitude of ways, changing content in emails within individual layout sections, or outside emails, allowing custom values to be passed into tasks or interesting moments. Anywhere a token can be used from within a program can be customized using this method. Similar functionality is also available with the [Schedule Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/scheduleCampaignUsingPOST) call which will allow you to process tokens across an entire batch campaign. These can't be customized on a per lead basis, but are very useful for customizing content across a wide set of leads.

Posted on _2015-07-24_ by _Kenny_

## Updating Lead Data in Marketo using the API

Over a year ago we posted Updating customer and prospect information in Marketo using the API. That post presented a code sample that could be run on a recurring basis to poll an external system for updates. The idea was to retrieve the external data and push it into Marketo to update lead information. The code sample presented used our SOAP API. REST endpoint to accomplish the same goal. **Program Input** It is likely that you need to transform the data from the external system into a format that is consumable by Marketo REST APIs. Since we're using the Create/Update Leads API, the data must be formatted as JSON which is sent in the request body. This is best explained by an example. In the Java sample code below, we have placed mock lead data in an array of strings. Each string following data for each lead: first name, last name, email address, job title.

```java
private static String externalLeadData[] = {
        "Henry, Adams, <henry@superstar.com>, Director of Demand Generation",
        "Suzie, Smith, <ssmith@gmail.com>, VP Marketing"
};
```

The sample code transforms the array into the JSON block below.

```json
{
"input":
    [
        {"firstName":"Henry", "lastName":"Adams", "email":"<henry@superstar.com>", "title":"Director of Demand Generation"},
        {"firstName":"Suzie", "lastName":"Smith", "email":"<ssmith@gmail.com>", "title":"VP Marketing"}
    ]
}
```

Each "input" array item corresponds to an individual lead in Marketo. The array items are JSON objects that contain one or more Marketo lead field names and their respective values. The field names that you decide to specify (in this case firstName, lastName, email, and title) must match the REST API name defined for the Marketo subscription. You can find the REST API Names in the field management section within the Marketo admin panel by exporting the field names. The field names will be exported into an excel file as seen below. Alternatively, you can find field names programmatically by calling the [Describe Lead](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2) API. For example, here is a Describe response snippet that contains the REST API name for the First Name field.

```json
{
    "id": 29,
    "displayName": "First Name",
    "dataType": "string",
    "length": 255,
    "soap": {
        "name": "FirstName",
        "readOnly": false
    },
    "rest": {
        "name": "firstName",
        "readOnly": false
    }
},
```

**Program Logic** Once the payload is in the proper format, we are ready to call Create/Update Leads. Note that in this sample we do not specify any of the optional parameters. The default behavior is to create or update lead records (upsert), use email for deduplication purposes, and use synchronous processing. If the call to Create/Update leads is successful, then the response body contains a "result" array containing the Marketo Lead Id and the status of the Create/Update operation. Depending on the "action" parameter you passed in the request, the status can be either "updated," "created," or "skipped". Continuing with our example, suppose the first lead did not exist (Henry Adams), and the second lead did exist (Suzie Smith). A response similar to the following would indicate the first lead was created, and the second lead was updated.

```json
{
    "success":true,
    "requestId":"118f8#14f1a0b82fc",
    "result":[
        {
            "id":318798,
            "status":"created"
        },
        {
            "id":318797,
            "status":"updated"
        }
    ]
}
```

That's it for now. Happy coding! **Program Code**

```java
package com.marketo;

// minimal-json library (<https://github.com/ralfstx/minimal-json>)
import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.\*;

public class CreateUpdateLeads {
    //
    // Define Marketo REST API access credentials: Account Id, Client Id, Client Secret.  For example:
    //    public static String CUSTOM_SERVICE_DATA[] =
    //      {"111-AAA-222", "2f4a4435-f6fa-4bd9-3248-098754982345", "asdf6IVE9h4Jjcl59cOMAKFSk78ut12W"};
    //
    private static final String CUSTOM_SERVICE_DATA[] =
            { INSERT YOUR CUSTOM SERVICE DATA HERE };

    //
    // Mock up data that could be read from an external data source.
    // An array of CSV strings the form:
    //   "firstName, lastName, email, title"
    private static String externalLeadData[] = {
        "Henry, Adams, henry@superstar.com, Director of Demand Generation",
        "Suzie, Smith, ssmith@gmail.com, VP Marketing"
    };

    public static void main(String[] args) {
        // Compose base URL
        String baseUrl = String.format("https://%s.mktorest.com",
                CUSTOM_SERVICE_DATA[0]);

        // Compose Identity URL
        String identityUrl = String.format("%s/identity/oauth/token?grant_type=%s&client_id=%s&client_secret=%s",
                baseUrl, "client_credentials", CUSTOM_SERVICE_DATA[1], CUSTOM_SERVICE_DATA[2]);

        // Call Identity API
        JsonObject identityObj = JsonObject.readFrom(httpRequest("GET", identityUrl, null));
        String accessToken = identityObj.get("access_token").asString();

        // Compose URL for Create/Update Leads
        String createUpdateLeadsUrl = String.format("%s/rest/v1/leads.json?access_token=%s", baseUrl, accessToken);

        // Convert String array into JsonArray to pass as part of request body
        JsonArray input = convertExternalLeadDataToJson(externalLeadData);

        // Build request body JSON
        JsonObject requestObj = new JsonObject();
        requestObj.add("input", input);

        // Call Create/Update Lead API
        JsonArray result = new JsonArray();
        JsonObject leadObj = JsonObject.readFrom(httpRequest("POST", createUpdateLeadsUrl, requestObj.toString()));
        if (leadObj.get("success").asBoolean()) {
            if (leadObj.get("result") != null) {
                result = leadObj.get("result").asArray();
            }
        }

        // Print out results object
        System.out.println(result);
        System.exit(0);
    }

    // Convert array of CSV formatted Strings into an array of JSON objects
    private static JsonArray convertExternalLeadDataToJson(String input[]) {
        JsonArray output = new JsonArray();

        // Loop through each CSV row in array
        for (int i = 0; i < input.length; i++) {
            // Split CSV row into separate fields
            List items = Arrays.asList(input[i].split(","));

            // Add fields to JSON object
            JsonObject lead = new JsonObject();
            lead.add("firstName", items.get(0));
            lead.add("lastName", items.get(1));
            lead.add("email", items.get(2));
            lead.add("title", items.get(3));
            output.add(lead);
        }
        return output;
    }

    // Perform HTTP request
    private static String httpRequest(String method, String endpoint, String body) {
        String data = "";
        try {
            URL url = new URL(endpoint);
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setDoOutput(true);
            urlConn.setRequestMethod(method);
            switch (method) {
                case "GET":
                    break;
                case "POST":
                    urlConn.setRequestProperty("Content-type", "application/json");
                    urlConn.setRequestProperty("accept", "text/json");
                    OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
                    wr.write(body);
                    wr.flush();
                    break;
                default:
                    System.out.println("Error: Invalid method.");
                    return data;
            }
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                InputStream inStream = urlConn.getInputStream();
                data = convertStreamToString(inStream);
            } else {
                System.out.println(responseCode);
                data = "Status:" + responseCode;
            }
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return data;
    }

    private static String convertStreamToString(InputStream inputStream) {
        try {
            return new Scanner(inputStream).useDelimiter("A").next();
        } catch (NoSuchElementException e) {
            return "";
        }
    }
}
```

Posted on _2015-08-14_ by _David_

## Add SalesPerson Data to Marketo

With the new SalesPerson APIs, you can freely associate Marketo leads with SalesPerson records in instances without a native CRM integration. This allows usage of `{{lead.Lead Owner Email Address}}` and related fields and tokens within Marketo.

### Creating SalesPerson records

In order to associate leads with SalesPerson records, we first need to input our SalesPerson records into Marketo. Here's an example class in PHP:

```php
<?php

class SalesPerson{
 private $auth;//auth object
 private $action;// string designating request action, createOnly, updateOnly, createOrUpdate
 private $dedupeBy;//dedupeFields or idField
 private $input;//array of salesperson objects for input

 //takes an Auth object as the first argument
 public function _construct($auth, $input){
  $this->auth = $auth;
  $this->input = $input;
 }

 //constructs the json request body
 private function bodyBuilder(){
  $body = new stdClass();
  $body->input = $this->input;
  if (isset($this->action)){
   $body->action = $this->action;
  }
  if (isset($this->dedupeBy)){
   $body->dedupeBy = $this->dedupeBy;
  }
  return json_encode($body);
 }
 //submits the request to Marketo and returns the response as a string
 public function postData(){
  $url = $this->auth->getHost() . "/rest/v1/salespersons.json?access_token=" . $this->auth->getToken();
  $ch = curl_init($url);
  $requestBody = $this->bodyBuilder();
  curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('accept: application/json','Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
  curl_getinfo($ch);
  $response = curl_exec($ch);
  curl_close($ch);
  return $response;
 }
 //getters and setters
 public function setAction($action){
  $this->action = $action;
 }
 public function getAction($action){
  return $this->action;
 }
 public function setDedupeBy($dedupeBy){
  $this->dedupeBy = $dedupeBy;
 }
 public function getDedupeBy($dedupeBy){
  return $this->dedupeBy;
 }
 public function addSalesPersons($input){
  if($this->input != null){
   if (is_array($input)){
    foreach($input as $item){
     array_push($this->input, $item);
    }
   }else{
    array_push($this->input, $input);
   }
  }else{
   $this->input = $input;
  }
 }
 public function getInput(){
  return $this->input;
 }

}
```

In the above class, the $input variable is an array of stdClass objects with possible members:

* externalSalesPersonId(only valid on create)
* id(only as key-in updateOnly mode)
* email
* fax
* firstName
* lastName
* mobilePhone
* phone
* title

More detailed information about types and fields lengths can be retrieved through the Describe SalesPerson call.

### Synching Leads

Here's a quick example class for synching the leads that we need:

```php
<?php

class Leads{
 private $auth;//auth object
 private $action;// string designating request action, createOnly, updateOnly, createOrUpdate
 private $lookupField;//dedupeFields or idField
 private $input;//array of salesperson objects for input
 private $asyncProcessing;//specify whether input should be processed asynchronously
 private $partitionName;//partition name for update if requires

 //takes an Auth object as the first argument
 public function _construct($auth, $input){
  $this->auth = $auth;
  $this->input = $input;
 }

 //constructs the json request body
 private function bodyBuilder(){
  $body = new stdClass();
  $body->input = $this->input;
  if (isset($this->action)){
   $body->action = $this->action;
  }
  if (isset($this->lookupField)){
   $body->lookupField = $this->lookupField;
  }
  return json_encode($body);
 }
 //submits the request to Marketo and returns the response as a string
 public function postData(){
  $url = $this->auth->getHost() . "/rest/v1/leads.json?access_token=" . $this->auth->getToken();
  $ch = curl_init($url);
  $requestBody = $this->bodyBuilder();
  curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('accept: application/json','Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
  curl_getinfo($ch);
  $response = curl_exec($ch);
  curl_close($ch);
  return $response;
 }
 //getters and setters
 public function setAction($action){
  $this->action = $action;
 }
 public function getAction(){
  return $this->action;
 }
 public function setDedupeBy($lookupField){
  $this->dedupeBy = $lookupField;
 }
 public function getDedupeBy(){
  return $this->dedupeBy;
 }
 public function addLeads($input){
  if($this->input != null){
   if (is_array($input)){
    foreach($input as $item){
     array_push($this->input, $item);
    }
   }else{
    array_push($this->input, $input);
   }
  }else if (is_array($input)){
   $this->input = $input;
  }else{
   $this->input = [$input];
  }
 }
 public function getInput(){
  return $this->input;
 }
 public function setAsyncProcessing($asyncProcessing){
  $this->asyncProcessing = $asyncProcessing;
 }
 public function getAsyncProcessing() {
  return $this->asyncProcessing;
 }
 public function setPartitionName($partitionName){
  $this->partitionName = $partitionName;
 }
 public function getPartitionName() {
  return $this->partitionName;
 }

}
```

### Process

Here's an example creating two salesperson records and associating them to two lead records:

```php
<?php

require 'Auth.php';
require 'SalesPerson.php';
require 'Leads.php';

//Create an Auth object for authentication
$auth = new Auth("https://284-RPR-133.mktorest.com", "7f99bd49-0e0e-4715-a72a-0c9319f75552", "O5lZHhrQDfDKRhulY89IU42PfdhRSe6m");

//Compose new SalesPerson Records
$sales1 = new stdClass();
$sales1->externalSalesPersonId = "SalesPerson 1";
$sales1->email = "sales1@example.com";
$sales1->firstName = "Jane";
$sales1->lastName = "Doe";

$sales2 = new stdClass();
$sales2->externalSalesPersonId = "SalesPerson 2";
$sales2->email = "sales2@example.com";
$sales2->firstName = "John";
$sales2->lastName = "Doe";

//Compose lead records
$lead1 = new stdClass();
$lead1->email = "marketoDev@example.com";
//Add the external id of the desired salesperson
$lead1->externalSalesPersonId = $sales1->externalSalesPersonId;

$lead2 = new stdClass();
$lead2->email = "devBlog@example.com";
$lead2->externalSalesPersonId = $sales2->externalSalesPersonId;

//Create a new instance of SalesPerson to submit records
$salesPerson = new SalesPerson($auth, [$sales1, $sales2]);
$spResponse = $salesPerson->postData();
print_r($spResponse . "rn");
$json = json_decode($spResponse);

//Check for success on synching SalesPersons
if ($json->success){
 $leads = new Leads($auth, [$lead1, $lead2]);
 $leadsResponse = $leads->postData();
 print_r($leadsResponse . "rn");
}else{
 print_r("SalesPerson request failed with errors:rn");
 foreach ($json->errors as $error){
  print_r("code: " . $error->code . ", message: " . $error->message . "rn");
 }
}
```

For our example classes, we're just creating stdClass objects to represent our SalesPerson and Lead records which need to be synched, with each desired field added as a member. After execution of this code, the leads <marketoDev@example.com> and <devBlog@example.com> will both have the Lead Owner Email, Lead Owner First Name, and Lead Owner Last name fields populated, affording them the ability to use the relevant tokens for those fields and be filtered by the relevant smart list filters.

### Auth Class

```php
<?php

class Auth{
 private $host;//host of the target Marketo instance
 private $clientId;//client Id
 private $clientSecret;//client secret
 private $token;//access_token
 private $expiry;

 function _construct($host, $clientId, $clientSecret){
  $this->host = $host;
  $this->clientId = $clientId;
  $this->clientSecret = $clientSecret;
 }
 public function getToken(){
  if (!isset($this->token) || $this->expiry > time()){
   $data = $this->getData();
   $this->expiry = time() + $data->expires_in;
   $this->token = $data->access_token;
   return $this->token;
  }else{
   return $this->token;
  }
 }
 private function getData(){
  $url = $this->host . "/identity/oauth/token?grant_type=client_credentials&client_id=" . $this->clientId . "&client_secret="
     . $this->clientSecret;
  $ch = curl_init($url);
  curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('accept: application/json','Content-Type: application/json'));
  $response = curl_exec($ch);
  $json = json_decode($response);
  curl_close($ch);
  return $json;
 }
 public function getHost(){
  return $this->host;
 }
}
```

Posted on _2015-08-21_ by _Kenny_

## Best Practices for API Users and Custom Services

Marketo's REST APIs use custom services for authentication and each of these services is owned by an API-only Marketo user. The capabilities of each custom service are determined by the permissions of each role assigned to that user. Allocating individual users and custom services to your integrations gives you multiple benefits:

* You can fine-tune the [permissions](/help/rest-api/custom-services.md) given to each individual service through the role given to your user.
* You can disable individual web services from making calls to your instance by deleting the corresponding custom service, without disabling others.
* Reporting on API call usage will be broken down by user, allowing you to identify high and abnormal utilization
* It is easier to determine what data each web service is being given access to
* Workspace-enabled instances can restrict access to specific business units, by only awarding roles to accessible workspaces

### API Usage

Each of your API users is reported individually in the API usage report, so splitting up your web services by user allows you to easily account for the usage of each of your integrations. If the number of API calls to your instance are exceeding the limit and causing subsequent calls to fail, using this practice allows you to account for the volume from each of your services and let you evaluate how to resolve the issue. See your usage by going to Admin -> Web Services and clicking on the number of calls in the past 7 days.

### Disable a Service

If an integration is having undesirable effects, it can be tedious and difficult to disable if you have not assigned each one an individual custom service. Having them broken out one by one makes it as easy as deleting the offending service in your Admin -> Launchpoint.

### Workspace Management

For Marketo Enterprise subscriptions, it is common for a service to only need access to a single workspace, and this can be [enforced by role assignment to the API User](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/workspaces-and-person-partitions/allow-user-access-to-a-workspace). Each user role can be assigned either globally, or on a per-workspace basis, so access can be restricted in workspaces wherever appropriate, providing the most minimal permissions set possible.

Posted on _2015-08-28_ by _Kenny_

## How to Specify Lead Partitions Using the REST APII

**Lead Partitioning** Marketo Lead Partitions provide a convenient way to isolate leads. Partitions can allow different marketing groups within your organization to share a single Marketo instance. For more information, see [Understanding Workspaces and Lead Partitions](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/workspaces-and-person-partitions/understanding-workspaces-and-person-partitions). Suppose that you are using lead partitions and creating leads programmatically using the Marketo REST API. How do you ensure the leads that you create will end up in the correct partition? This post shows you how! For the sake of this example, we'll use Workspaces and Partitions to isolate our leads based on geography.

First we'll define a workspace called "Country". Next, we create two partitions within that workspace called "Mexico" and "Canada".  **Create Lead in Partition** Suppose now that we want to create two leads in the "Mexico" partition. To create leads, we call the. To specify the partition, we must include the "partitionName" attribute in the request body. How do we know what to use for the partitionName value? We can retrieve a list of valid partition name values for our instance by calling the [Get Lead Partitions](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeProgramMemberUsingGET) API as follows:

`GET /rest/v1/leads/partitions.json`

```json
{
    "requestId": "20ae#14f9a1a5a30",
    "result": [
        {
            "id": 1,
            "name": "Default",
            "description": "Initial system lead partition"
        },
        {
            "id": 2,
            "name": "Mexico",
            "description": "Leads that live in Mexico"
        },
        {
            "id": 3,
            "name": "Canada",
            "description": "Leads that live in Canada"
        }
    ],
    "success": true
}
```

In this case, the correct value is "Mexico," so we then pass that to Create/Update Leads as follows:

`POST /rest/v1/leads.json`

```json
{
    "input": [
        {"email":"enrique.pena-nieto@gob.mx"},
        {"email":"angelica.rivera@gob.mx"}
    ],
    "action":"createOrUpdate",
    "partitionName":"Mexico"
}
```

Here are our newly created leads in Marketo.  **Update Lead in Partition** To update existing leads in a partition, we simply call Create/Update Leads and specify partitionName the same as we did before. For this update, we'll assign first name, last name, and title to the leads that we created above.

`POST /rest/v1/leads.json`

```json
{
"input": [
        {"email":"enrique.pena-nieto@gob.mx", "firstName":"Enrique", "lastName":"Pena Neito", "title": "El Presidente"},
        {"email":"angelica.rivera@gob.mx", "firstName":"Angelica", "lastName": "Rivera", "title": "Primera Dama"}
    ],
    "action":"createOrUpdate",
    "partitionName":"Mexico"
}
```

Here are our newly updated leads in Marketo.
 **Identify Partition for a Lead** How do we know which partition that a lead is in? For this we use the [Get Lead by Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadByIdUsingGET) API and specify "leadPartitionId" in the "fields" query parameter. In this case we will retrieve the information for lead id 318816 that we created above.

`GET /rest/v1/lead/318816.json?fields=leadPartitionId,email,firstName,lastName,title`

```json
{
    "requestId": "5c57#14f9a495b1f",
    "result": [
        {
            "id": 318816,
            "lastName": "Pena Neito",
            "title": "El Presidente",
            "email": "enrique.pena-nieto@gob.mx",
            "firstName": "Enrique",
            "leadPartitionId": 2
        }
    ],
    "success": true
}
```

Note that we get back leadPartitionId rather than the partitionName. To get the partitionName we need to revisit the output from the Get Lead Partitions API from above.

```json
{
    "id": 2,
    "name": "Mexico",
    "description": "Leads that live in Mexico"
},
```

In this case a leadPartitionId value of 2 maps to the partitionName of "Mexico". That's all for now. Happy partitioning!

Posted on _2015-09-04_ by _David_

## Comparing Score fields in Marketo Email Scripting

**Note:** This is a guest post by Cathal Moran. Cathal is a Solutions Consultant, working out of Marketo's EMEA Office in Dublin, Ireland.

### Comparing Score fields

Many Marketo customers, particularly those focused on cross-selling, have multiple score fields and this is often used to measure a lead's interest in a particular product /area. Imagine I sell apples and bananas, if a lead has a score of 50 for apples and 10 for bananas then it's clear where the preference lies, wouldn't it be nice if my content reflected this preference. Email scripting can be used to compare scores and to personalize content in an email depending what score is highest (or lowest) for that particular lead receiving the email.

### As I want to compare 2 numbers I need to convert my field values to integers

```
#set ($score1 = $math.toInteger(${lead.Apple_Score}))
#set ($score2 = $math.toInteger(${lead.Banana_Score}))
##check if the lead score is greater than feature score
#if($score1 >= $score2)
                ##if Apple score is greater
                #set($Interest = "Special offer on Apples")
##check is the feature score is higher
#elseif($score2 >= $score1)
                ##if Feature score is greater
                #set($Interest = "Special offer on Bananas")
#else
                ##otherwise
                #set($Interest = "Special offer on Fruit")
#end
##display the Interest as content
${Interest}
```

In the above example I'm just personalizing text but I could just as easily for example display a different image based on the higher score.

Posted on _2015-09-14_ by _Kenny_

## Make a Marketo Form Submission in the Background

When your organization has many different platforms for hosting web content and customer data it becomes fairly common to need parallel submissions from a form so that the resulting data can be gathered in separate platforms. There are several strategies to do this, but the best one is often the simplest: Using the Forms 2 API to submit a hidden Marketo form. This will work with any new Marketo Form, but ideally you should create an empty form for this, which has no fields. This will ensure that the form doesn't load any more data than necessary, since we don't need to render anything. Now just grab the [embed code](https://experienceleague.adobe.com/en/docs/marketo/using/home) from your form and add it to the body of your desired page, making a small modification. Your embed code includes a form element like this:

`<form id="mktoForm_1068"></form>`

You'll want to add 'style="display:none"' to the element so it is not visible, like this:

`<form id="mktoForm_1068" style="display:none"></form>`

Once the form is embedded and hidden, the code to submit the form is really quite simple:

```javascript
var myForm = MktoForms2.allForms()[0];
myForm.addHiddenFields({
 //These are the values which will be submitted to Marketo
 "Email":"test@example.com",
 "FirstName":"John",
 "LastName":"Doe"
 });
myForm.submit();
```

Forms submitted this way will behave exactly like if the lead had filled out and submitted a visible form. Triggering the submission will vary between implementations since each one has a different action to prompt it, but you can make it occur on basically any action. The important part is setting your fields and values correctly. Be sure to use the SOAP API name of your fields which you can find with [Export Field Names](/help/rest-api/list-of-standard-fields.md) to ensure correct submission of values.

Migrating from Munchkin Associate Lead

Background form submission is one of the recommended replacement methods for Munchkin Associate Lead. The sample HTML page below demonstrates migration at a high level, by reusing the same values which are submitted to Associate Lead.

```html
<html>
<head>
    <!--
      Munchkin Code
      Replace with your own instance code
    -->
    <script type="text/javascript">
        (function() {
          var didInit = false;
          function initMunchkin() {
            if(didInit === false) {
              didInit = true;
              Munchkin.init('CHANGE ME');
            }
          }
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = '//munchkin.marketo.net/munchkin-beta.js';
          s.onreadystatechange = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
              initMunchkin();
            }
          };
          s.onload = initMunchkin;
          document.getElementsByTagName('head')[0].appendChild(s);
        })();
        </script>
</head>

<body>
  <!--
    Start Embed code.
    Pasted from Form Actions -> Embed Code except for addition of 'style="display:none"' to the form tag in order to hide it, and instance-specific codes redacted
    Replace with your own code for testing
  -->
  <script src="CHANGE ME"></script>
  <form id="CHANGE ME" style="display:none"></form>
  <script>MktoForms2.loadForm("CHANGE ME", "CHANGE ME", "CHANGE ME TO AN INTEGER ID");</script>
  <!--End Embed Code-->

  <!--Demo code-->
    <script>
        //The same map which is assembled for the Munchkin submission can be reused for the form submission
        let values = {
            "Email": "email@example.com",
            "FirstName": "Test",
            "LastName": "Record"
        }
        //whenReady lets us apply a callback to all mkto forms on the page
        //the callback function fires whenever a form is completely loaded
        //for most use cases this will just be used to capture a reference to the form for later usage
        //submission is done in line here for demonstration only
        MktoForms2.whenReady(function(form){

            //the addHiddenFields methods lets us add arbitrary fields to the form as well as their values
            form.addHiddenFields(values);

            //submit the form
            form.submit();


        })
    </script>
</body>
</html>
```

Posted on _2015-09-25_ by _Kenny_

## Marketo REST API Exception and Error Handling: Part 1

The Marketo REST API may return an exception or error, which, for convenience, we will just call errors from here on out. Errors can occur at three different levels:

* HTTP level, these errors are indicated by a 4xx code
* Response level, these errors are included in the "errors" array of the JSON response
* Record level, these errors are included in the "result" array of the JSON response, and are indicated on an individual record basis with the "status" field and "reasons" array

### HTTP Errors

Under normal operating circumstances Marketo should only return two HTTP status errors, 413 Request Entity Too Large, and 414 Request URI Too Long. These are both recoverable through catching the error, modifying the request and retrying, but with smart coding practices, you should never encounter these in the wild. Marketo will return 413 if the Request Payload exceeds 1MB, or 10MB in the case of [Import Lead](https://developer.adobe.com/marketo-apis/api/mapi#tag/Bulk-Import-Leads). In most scenarios it is unlikely to hit these limits, but adding a check to the size of the request and moving any records which cause the limit to be exceeded to a new request should prevent any circumstances which lead to this error being returned by any endpoints. 414 will be returned when the URI of a GET request exceeds 8KiB. To avoid it, check against the length of your query string to see if it exceeds this limit. If it does change your request to a POST method, then input your query string as the request body with the additional parameter '_method=GET'. This forgoes the limitation on URIs. It's rare to hit this limit in most cases, but it is somewhat common when retrieving large batches of records with long individual filter values such as a GUID.

### Response-Level Errors

Response level errors are present when the "success" parameter of the response is set to false. Each entry in "errors" has two members, "code" a number, either 6xx or 7xx, and a "message" giving the plaintext reason for the error. 6xx codes always indicate that a request failed completely and were not executed. An example of this is a 601, "Access token invalid," which is recoverable by re-authenticating and passing the new access token with the request. 7xx errors indicate that the request failed, either because no data was returned, or the request was incorrectly parameterized, such as including an invalid date, or missing a required parameter.

### Record-Level Errors

Record level errors indicate that an operation could not be completed for an individual record, but the request itself was valid. These occur within individual record in the "result" array of a response. The "status" field of these records will be "skipped" and a "reasons" array will be present. Each reason contains a "code" member, and a "message" member. The code will always be 1xxx, and the message will indicate why the record was skipped. An example would be where a Create/Update Leads request has "action" set to "createOnly" but a lead already exists for one of the keys in the submitted records. This case returns a code of 1005, and a message of "Lead already exists." In the next few posts, we will take a look at recoverable errors, and some examples of how to handle these inside of your code.

Posted on _2015-10-09_ by _Kenny_

## Guest Post - Direct SQL Connectors to the Marketo Database

**This is a guest post from Sumit Sarkar of Progress, Inc.**

**SQL connectors to Marketo database** Marketo has well documented APIs for accessing data. However, sometimes organizations need direct SQL access. We are seeing the lines blur at Marketo shops between Marketing and IT which is increasing the demand for standards based SQL connectivity. Direct SQL connectors to Marketo are available through [Progress DataDirect Cloud](https://www.progress.com/connectors/cloud-data-integration). DataDirect Cloud is a data connectivity service that exposes Marketo data through open industry standards for SQL access across ODBC ("Open Database Connectivity") or JDBC ("Java Database Connectivity"); and REST with OData ("Open Data Protocol"). Below are some popular use cases for connecting Marketo data out-of-box using DataDirect Cloud:

* Data Discovery and Visualization (Qlik, Tableau, SAP Lumira)
* Enterprise Reporting (SAP Business Objects, Microstrategy, Cognos)
* Data Integration (SQL Server Integration Services - SSIS, Oracle Data Integrator - ODI, Informatica)
* Data Federation (SQL Server Linked Server, SAP Hana SDA, Oracle Database Gateway)
* Ad Hoc Query (Microsoft Office, DB Visualizer, Aqua Data Studio)
* Data Preparation (Alteryx, Trifecta, Paxata)

**How does SQL access to Marketo work?**

* DataDirect Cloud creates a logical schema for data exposed by Marketo's integration APIs.
* DataDirect Cloud processes SQL requests from lightweight ODBC or JDBC clients using an elastic real-time query engine on data fetched from the Marketo APIs.
* DataDirect Cloud connectivity is direct and real-time without any duplication of data.
* DataDirect Cloud Service abstracts the Marketo API such that end users do not have to worry about API version changes, or using SOAP versus REST.

DataDirect has been building this style of connectivity to SaaS data sources since 2006 starting with the first Salesforce ODBC driver built on top of its web service APIs. **Getting started connecting to Marketo:**

1. Register for a DataDirect Cloud Login
1. Click "Data Sources" and then "+New Data Source" button
1. Select "Marketo" and enter the connection information. You can check with your Marketo administrator or login to find [connection information for SOAP integration](/help/soap-api/soap-api.md).
1. Click "Test Connection" button. Note there is an OData tab to produce OData from Marketo and we will discuss in a future blog post.
1. Click on "SQL Testing" if you want to inspect the Marketo schema exposed or issue basic SQL queries from within the UI.
1. Click "Downloads" on the left and select the DataDirect Cloud ODBC or JDBC driver for your application and platform to install.
1. Once the DataDirect Cloud ODBC or JDBC driver is installed, you can connect any standards based applications to Marketo.

Here's a video example of [connecting using the DataDirect Cloud ODBC client](https://www.youtube.com/watch?v=H6PHra56Iig). Here are other DataDirect Cloud tutorials that apply to Marketo:

* [SAP Data Analytics](https://scn.sap.com/community/lumira/blog/2015/08/05/connect-sap-lumira-to-eloqua-marketo-google-analytics)
* Microstrategy Enterprise Reporting
* [Oracle Data Integration](https://www.ateam-oracle.com/post/a-universal-cloud-applications-adapter-for-odi/)

**R&D challenges building SQL connectivity across cloud sources such as Marketo**

Not all SaaS APIs expose a standard query language. In those cases, the engineering team looks at each object individually. Each object may be exposed with a different API with unique rules for invoking, searching filtering, etc. It required a significant effort to provide a standard experience querying across the entire data model.

Handling full join capabilities. In cases where the SaaS APIs do not support a query language with JOIN capability, the engineering team has to perform that operation. This requires a translation from SQL to efficiently call Marketo APIs to return the minimal amount of data prior to performing the join. When joining two very large objects, the data access layer may use up considerable resources on the application server or desktop. Therefore, deployment of the data access layer to an elastic cloud service such as DataDirect Cloud makes much sense for two reasons:

1. Faster performance and use fewer memory/CPU resources on the client application server or desktop
1. Leverage the superior bandwidth between DataDirect Cloud and Marketo where pre-joined datasets get exchanged.

How to handle data models? Is it static or dynamic? How are changes detected and communicated to the client? Each SaaS data source is different and in the case of Marketo, certain objects are better queried through views and others through tables. Handling this matrix of data models and objects across all SaaS sources was certainly a challenge.

**Marketo and DataDirect Cloud Reference for Developers:**

* Marketo Connection Properties (link to docs)
* Supported SQL and extensions with Marketo (link to docs)
* Exposed Marketo Tables and Views (link to docs)
* Common error messages returned from Marketo (link to docs)

**Biography:** Sumit Sarkar is a Chief Data Evangelist at Progress, with over 10 years experience working in the data connectivity field. The world's leading consultant on open data standards connectivity with cloud data, Sumit's interests include performance tuning of the data access layer for which he has developed a patent pending technology for its analysis; business intelligence and data warehousing for SaaS platforms; and data connectivity for PaaS environments, with a focus on standards such as ODBC, JDBC, ADO.NET and ODATA. He is an IBM Certified Consultant for IBM Cognos Business Intelligence and a TDWI member. He has presented sessions on data connectivity at various conferences including Dreamforce, Oracle OpenWorld, Strata Hadoop, MongoDB World and SAP Analytics and Business Objects Conference, among many others. Twitter: @SAsInSumit LinkedIn: [www.linkedin.com/in/meetsumit](https://www.linkedin.com/in/meetsumit)

Posted on _2015-12-07_ by _Kenny_

## Create a Dashboard for API Usage and Error Counts

As a Marketo API consumer, this is useful information that you should keep an eye on. What if you could get historical usage data to help detect trends over time? What if you could get a summary of API error codes to help measure the health of your integration? As a Marketo Technology Partner, what if you could get usage and error data across all of your customer accounts in one dashboard? This post will provide an approach to answering the questions above. Buckle up, here we go!
**Scheduled Job for Stats Retrieval** Let's create an app that retrieves usage and error data using [Get Daily Usage](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLast7DaysErrorsUsingGET) and [Get Daily Errors](https://developer.adobe.com/marketo-apis/api/mapi#operation/getDailyErrorsUsingGET) endpoints. The app is designed to be scheduled to run once per day. Each time the app runs, it appends a day's worth of usage data to one file, and a day's worth of error data to another file. At the beginning of each month, a new pair of files is created. These files will serve as a historical record that we can access at any time. Here is the app logic …

* Read Marketo account information (Munchkin id and Client credentials) from an external source. Note: This source must be secure to keep others from accessing account data.
* Iterate through each account and...
  * Call Get Daily Usage to retrieve usage data for one day
  * Append daily usage data to a monthly "usage" file
  * Call Get Daily Errors to retrieve errors data for one day
  * Append daily errors data to a monthly "errors" file

Output File Format The format for the output files is JSON which matches up with the "result" array returned from the respective API calls (Usage and Error). Each element of the "result" array is a JSON object that contains data for one day. Output File Naming The output files are named as follows:

`<type>_<yyyy>_<mm>_<account>.json`

Where,

`<type>` - The type of data ("usage" or "errors") `<yyyy>` - The year (4-digits) `<mm>` - The month (2-digits) `<account>` - The account id (Munchkin id)

Output File Examples usage_2015_10_111-AAA-222.json

```json
[
    { "date": "2015-10-15", "total": 0, "users" : [] },
    { "date": "2015-10-16", "total": 9, "users": [ { "userId": "some.body@yahoo.com", "count": 9 } ] },
    { "date": "2015-10-17", "total": 1120, "users": [ { "userId": "some.body@yahoo.com", "count": 200 }, { "userId": "some.body@marketo.com", "count": 200 }, { "userId": "some.body@gmail.com", "count": 720 } ] },
]
```

`errors_2015_10_111-AAA-222.json:`

```json
[
    { "date": "2015-10-15", "total":80, "errors": [ { "errorCode":"1003", "count":80 } ] },
    { "date": "2015-10-16", "total":148, "errors": [ { "errorCode":"612", "count":40 }, { "errorCode":"609", "count":70 }, { "errorCode":"1008", "count":38 } ] },
    { "date": "2015-10-17", "total":73, "errors": [ { "errorCode":"604", "count":1 }, { "errorCode":"609", "count":56 }, { "errorCode":"610", "count":16 } ] },
]
```

Code for this app is presented at the end of this post (Stats.java). **Stats Web Service** So now we need a way to get this data into our browser. The proposal is to create a web service to deliver the data. The web service will consume the app's output files and then return data to the browser in a form that can be readily presented. For simplicity's sake, and to get around same-origin policy restrictions, we will leverage the [JSONP](https://en.wikipedia.org/wiki/JSONP) pattern. Here is the proposed REST endpoint specification for the external web service: **URI**: /stats **Method**: GET

**Parameter**

**Description**

**Example**

month

Retrieve data for this month. Comma seperated list of months to include (2-digit representation). Default to all months.

10,11

year

Retrieve data for this year. Comma-seperated list of years to include (4-digit representation). Default to all years.

2015

account

Retrieve data for this account (Munchkin id).

111-AAA-222

callback

Name of function to wrap JSON content with.

processStats

Example Request

`GET //localhost:8080/stats?month=10&year=2015&account=111-AAA-222&callback=processStats`

The web service reads "usage" and "error" files, and combines them together and returns them in this format:

```html
**<Name of Callback here>**

<Contents of Usage file here>,

<Contents of Error file here>
```

This is a JSONP callback with 2 arguments. First argument is usage "result" array. Second argument is the errors "result" array. Example Response

```json
processStats(
    [
        { "date": "2015-10-15", "total": 0, "users" : [] },
        { "date": "2015-10-16", "total": 9, "users": [ { "userId": "some.body@yahoo.com", "count": 9 } ] },
        { "date": "2015-10-17", "total": 1120, "users": [ { "userId": "some.body@yahoo.com", "count": 200 }, { "userId": "some.body@marketo.com", "count": 200 }, { "userId": "some.body@gmail.com", "count": 720 } ] }
    ],
    [
        { "date": "2015-10-15", "total":80, "errors": [ { "errorCode":"1003", "count":80 } ] },
        { "date": "2015-10-16", "total":148, "errors": [ { "errorCode":"612", "count":40 }, { "errorCode":"609", "count":70 }, { "errorCode":"1008", "count":38 } ] },
        { "date": "2015-10-17", "total":73, "errors": [ { "errorCode":"604", "count":1 }, { "errorCode":"609", "count":56 }, { "errorCode":"610", "count":16 } ] },
    ]
);
```

As you can see, the web service has simply wrapped the contents of the two output files from our app. We have created a mock web service response using Mocky. An example of the web service the mock is here. Creation of this web service is left as an exercise for the reader : **Dashboard Web Page** So now all we need is a web page that calls our web service and formats the data. To use the JSONP pattern we just need to add a `<script>` tag that invokes the web service:

`<script src="http: //<hostname>/stats?month=10&year=2015&account=284-RPR-133&callback=processStats"></script>`

This will inject the web service response body directly into the HTML page. We then add the JSONP callback function :

```javascript
function processStats(usage, errors) {
    var cfg = { maxDepth: 5};
    document.write("<h2>Usage</h2>");
    document.body.appendChild(prettyPrint(usage, cfg));
    document.write("<h2>Errors</h2>");
    document.body.appendChild(prettyPrint(errors, cfg));
;
```

This function is automatically called after the web service call. In this example, we call a simple JavaScript "variable dumper" called [prettyPrint.js](https://github.com/padolsey-archive/prettyprint.js/tree/master) on each array. The prettyPrint function simply produces an HTML table using the contents of the array. Here is a screenshot of the HTML tables. Voilà, that is our dashboard! Granted this isn't very elegant, but it should give you an idea of what is possible. There is nothing stopping you from transforming the data any way you like to make your own eye catching visualizations. The HTML page is below (Index.html) You can view the tables above live in your browser using the following steps:

1. Save a local copy of Index.html
1. Save a local copy of prettyPrint.js
1. Open Index.html in your browser

So that's it. Hopefully this post has given you some ideas about monitoring your Marketo API stats. Happy coding! **Stats.java**

```java
package com.marketo;

// minimal-json library (https://github.com/ralfstx/minimal-json)
import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;

import java.io.\*;
import java.lang.reflect.Array;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.\*;

import java.nio.file.Files;
import java.nio.file.Paths;

import javax.net.ssl.HttpsURLConnection;

public class Stats {
    //
    // Define Marketo instance meta data here. Each row contains three elements: Account Id, Client Id, Client Secret.
    //
    // Note: that this information would typically be stored read from an external source (i.e. database)
    //
    // For example:
    //
    // private static String final CUSTOM_SERVICE_DATA[][] = {
    // {"111-AAA-222", "2f4a4435-f6fa-4bd9-3248-098754982345", "asdf6IVE9h4Jjcl59cOMAKFSk78ut12W"},
    // {"222-BBB-333", "5f4a6657-f6fa-4cd9-4356-123083238821", "gfjgfIVE9h4Jjcl59cOMAKFSk78ut12W"},
    // {"444-CCC-444", "9f4a4678-f6fa-4dd9-7735-908713247721", "xzcxvbVE9h4Jjcl59cOMAKFSk78ut12W"}
    // };
    //
    private static final String CUSTOM_SERVICE_DATA[][] = {
    };

    // Output directory for stats files
    private static final String OUTPUT_DIR = "C:stats";

public static void main(String[] args) {

    // Loop through each Marketo instance
    for (int i = 0; i < CUSTOM_SERVICE_DATA.length; i++) {

        // Compose base URL
        String baseUrl = String.format("https://%s.mktorest.com",
            CUSTOM_SERVICE_DATA[i][0]);

        // Compose Identity URL
        String identityUrl = String.format("%s/identity/oauth/token?grant_type=%s&client_id=%s&client_secret=%s",
            baseUrl, "client_credentials", CUSTOM_SERVICE_DATA[i][1], CUSTOM_SERVICE_DATA[i][2]);

        // Call Identity API
        JsonObject identityObj = JsonObject.readFrom(httpRequest("GET", identityUrl, null));
        String accessToken = identityObj.get("access_token").asString();

        // Compose Get Last 7 Days Usage URL
        String usageUrl = String.format("%s/rest/v1/stats/usage/last7days.json?access_token=%s",
            baseUrl, accessToken);

        // Compose Get Last 7 Days Errors URL
        String errorsUrl = String.format("%s/rest/v1/stats/errors/last7days.json?access_token=%s",
            baseUrl, accessToken);

        // Process usage data
        JsonObject usageObj = JsonObject.readFrom(httpRequest("GET", usageUrl, null));
        if (usageObj.get("success").asBoolean()) {
            if (usageObj.get("result") != null) {
                updateFile(usageObj, "usage", CUSTOM_SERVICE_DATA[i][0]);
            }
        }

        // Process errors data
        JsonObject errorsObj = JsonObject.readFrom(httpRequest("GET", errorsUrl, null));
        if (usageObj.get("success").asBoolean()) {
            if (errorsObj.get("result") != null) {
                updateFile(errorsObj, "errors", CUSTOM_SERVICE_DATA[i][0]);
            }
        }
    }
    System.exit(0);
}

// Write yesterday's data to output file
private static void updateFile(JsonObject usageObj, String statsType, String account){

    JsonArray usageResultAry = usageObj.get("result").asArray();
    JsonObject yesterdayUsageResultObj = usageResultAry.get(1).asObject();

    String yesterdayDate = yesterdayUsageResultObj.get("date").asString();
    String[] yesterdayDateAry = yesterdayDate.split("[-]+");

    // "C:statsstats_yyyy_mm_account.json"
    String statsFile = String.format("%s%s_%s_%s_%s.json",
        OUTPUT_DIR, statsType, yesterdayDateAry[0], yesterdayDateAry[1], account);

    // Create file
    File file = new File(statsFile);
    try {
        if (file.createNewFile()) {
            // created new file, seed with empty array
            FileWriter fw = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write("[n]");
            bw.close();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }

    // Read file
    String content = null;
    try {
        content = new String(Files.readAllBytes(Paths.get(statsFile)));
    } catch (IOException e) {
        e.printStackTrace();
    }

    // Remove trailing "]", append new record, append trailing "]"
    content = content.substring(0, content.length() - 1);
    content += yesterdayUsageResultObj.toString();
    content += "n]";

    // Write file
    FileWriter fw = null;
    try {
        fw = new FileWriter(file.getAbsoluteFile());
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write(content);
        bw.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// Perform HTTP request
private static String httpRequest(String method, String endpoint, String body) {
    String data = "";
    try {
        URL url = new URL(endpoint);
        HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
        urlConn.setDoOutput(true);
        urlConn.setRequestMethod(method);
        switch (method) {
            case "GET":
                break;
            case "POST":
                urlConn.setRequestProperty("Content-type", "application/json");
                urlConn.setRequestProperty("accept", "text/json");
                OutputStreamWriter wr = new OutputStreamWriter(urlConn.getOutputStream());
                wr.write(body);
                wr.flush();
                break;
            default:
                System.out.println("Error: Invalid method.");
                return data;
        }
        int responseCode = urlConn.getResponseCode();
        if (responseCode == 200) {
            InputStream inStream = urlConn.getInputStream();
            data = convertStreamToString(inStream);
        } else {
            System.out.println(responseCode);
            data = "Status:" + responseCode;
        }
    } catch (MalformedURLException e) {
        System.out.println("URL not valid.");
    } catch (IOException e) {
        System.out.println("IOException: " + e.getMessage());
        e.printStackTrace();
    }
    return data;
}

private static String convertStreamToString(InputStream inputStream) {
    try {
        return new Scanner(inputStream).useDelimiter("A").next();
    } catch (NoSuchElementException e) {
        return "";
    }
}
}
```

**Index.html**

```html
<html>
<head>
<title>Marketo API Stats</title>
<!-- Browser JavaScript variable dumper                  -->
<!-- https://github.com/padolsey-archive/prettyprint.js  -->
<script src="prettyPrint.js"></script>
</head>
<body>

<h1>Marketo API Stats</h1>

<script>
// JSONP callback that uses prettyPrint to format API stats
function processStats(usage, errors) {
    var cfg = { maxDepth: 5};
    document.write("<h2>Usage</h2>");
    document.body.appendChild(prettyPrint(usage, cfg));
    document.write("<h2>Errors</h2>");
    document.body.appendChild(prettyPrint(errors, cfg));
};
</script>

<!-- Web service for you to implement as an exercise                                                        -->
<!-- <script src="http://localhost:8080/stats?month=10&account=111-AAA-222&callback=processStats"></script> -->

<!-- Mock web service that returns sample payload -->
<!-- http://www.mocky.io/                         -->
<script src="http://www.mocky.io/v2/5627b2f9270000f2226eec63?month=10&year=2015&account=111-AAA-222&callback=processStats"></script>"
</body>
</html>
```

Posted on _2015-10-22_ by _David_

## Marketo REST API Exception and Error Handling: Part 3

For the most part, errors received back from the Marketo REST API will not be automatically recoverable. However, there are a handful of cases where you can recover automatically, or ensure you never see a certain type of error.

### Request-Size Errors

As we looked at in the last post of this series, Marketo will emit HTTP Status code 414 if your URI exceeds 8KiB in length, or 413 if your request body exceeds 1MB, or 10MB for Import Lead. Though 414s will be rare, you might see them if you're using the Get Leads By Filter type to request records based on 300 separate GUIDs or similar criteria. Say you have the following request: `<https://AAA-BBB-CCC.mktorest.com/rest/v1/leads.json?filterType=customGUID&fields=email`, company...firstName, lastName> When you submit the request, Marketo returns a status of 414 because the URI exceeds 8KiB.

To handle this, we need to alter the pattern of this request, and submit a POST instead of a GET, append '_method=GET' to the URI, and pass the query string in the request body as an x-www-form-urlencoded request instead: URI: `<https://AAA-BBB-CCC.mktorest.com/rest/v1/leads.json?_method=GET>` Request Body: filterType=customGUID&fields=email,company...firstName, lastName Instead of catching this exception from the HTTP response, however, we can just check the total length of the request at runtime, and deploy this alternative pattern if the URI exceeds 8k. Alternatively, you could use the POST Method in all cases for batch retrievals of records. For 413s, we can follow a similar pattern, checking the length of the request body when adding records during the serialization step, and splitting the request into multiple parts if this limit would be is exceeded.

### Authentication Errors

Our next class of recoverable errors is related to authentication. When a formerly valid access token is used after its expires_in period has elapsed, the first usage will return an error code of 602, "Access token expired." After this, using the same token will return a 601, "Access token invalid." Any other usage of a string which is not a valid access token for the target subscription will result in a 601. In both cases, this error can be recovered from by reauthenticating and passing the new access token with a retry of the failed request.

### Timeouts

In very rare circumstances, a call may return a 604, "Request timed out," after the 30 second timeout period has elapsed. For batched requests, such as Create/Update Leads, the request can be split up into smaller batches and retried until success is returned (if the batch is split to fewer than 100 records and the request is still is timed out, you should probably file a support case). The most common other case is with asset approval calls, where a lock may be held on the current approved record by another user or service, such as the case of an Email or Email Template. In these cases, [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) should be used for retries to allow for any existing locks to be resolved. Check back in the coming weeks for the final part of the series where we'll take a closer look at some specific, non-recoverable errors.

Posted on _2015-10-30_ by _Kenny_

## Marketo Security Enhancements

At Marketo we take security seriously. As a part of an **[industry-wide initiative](https://security.googleblog.com/2014/09/gradually-sunsetting-sha-1.html)**, Marketo is upgrading our web authentication and encryption to enhance our security protections. The rollout is scheduled to occur on December 12, 2011. **Who will be affected?** Only a small number of users will be affected, only those who have an integration to Marketo from a system that is over ten years old and hasn't been updated recently. See this list for more info on what systems and versions are supported. **The following users will not be impacted:**

* End users accessing Marketo.com through modern browsers (see list)
* Customers using integration partners such as Informatica, Dell Boomi, and Scribe.
* Customers using Launchpoint partners.

All other Marketo domains already use SHA2 certificates.

Posted on _2015-11-18_ by _Kenny_

## Polling for Activities using REST API

Activities are a core object in the Marketo Platform. Activities are the behavioral data that is stored about every webpage visit, email open, webinar attendance, or trade show attendance. A common use case is combining activity data with data from other parts of an organization. This sample program contains 6 steps:

1. Call [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) to generate a list of all activity records created at a given date/time. We use a filter to limit the type of activity records that are returned.
1. Extract fields of interest from each activity record.
1. Call [Get Multiple Leads by Filter Type](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadsByFilterUsingGET) to generate a list of lead records that correspond with the activities from Step 1. We use the leadId field extracted from activity record in Step 2 as our filter to specify which leads are returned.
1. Extract fields of interest from each lead record.
1. Join the activity data from step 2 with the lead data from Step 4.
1. Transform the data from Step 5 into a format that is consumable by an external system.

As the diagram below shows, for this example we have chosen to capture email-related activities.

**Program Input** By default the program goes back in time one day from the current date to look for changes. So, you could run this program at the same time each day for example. To go farther back in time, you can specify the number of days as a command line argument, effectively increasing the window of time. The program contains several variables that you can modify: CUSTOM_SERVICE_DATA – This contains your Marketo Custom Service data (Account Id, Client Id, Client Secret). READ_BATCH_SIZE – This is the number of records to retrieve at a time. Use this to tune the response to body size. LEAD_FIELDS – This contains a list of lead fields that we want to collect. ACTIVITY_TYPES – This contains a list of activity types that we want to collect.

**Program Logic** First we establish our time window, compose our REST endpoint URLS, and obtain our Authentication access token. Next we fire up a Get Paging Token/Get Lead Activities loop which runs until we exhaust the supply of activities. The purpose of this loop is to retrieve activity records, and extract fields of interest from those records. We tell Get Lead Activities to look only for the following activity types:

* Email Delivered
* Unsubscribe Email
* Open Email
* Click Email.

We extract the following fields of interest from each activity record:

* leadId
* activityType
* activityDate
* primaryAttributeValue

You are free to select any combination of activity types and activity fields to suit your purpose. Next we fire up a Get Multiple Leads by Filter Type loop which runs until we exhaust the supply of leads. Note that we use the "filterType=id" parameter in combination with a series of "filterValues" parameters to limit the lead records retrieved to only those leads associated with activities that we retrieved earlier. We extract the following fields of interest from each lead record:

* firstName
* lastName
* email

Again, you are feel to select any lead fields that you like. Next we join the lead fields with the activity fields by using the lead id to link them together. Finally, we loop through all of the data, transform it into JSON format, and print it to the console. **Program Output** Here is an example of output from the sample program. This shows the activity fields and the lead fields combined together as JSON "result" objects. The idea here is that you could pass this JSON as a request payload to an external web service.

```json
{
    "result": [
        {
            "leadId": 318581,
            "activityType": "Email Delivered",
            "activityDate": "2015-03-17T20:00:06Z",
            "primaryAttributeValue": "My Email Program",
            "firstName": "David",
            "lastName": "Everly",
            "email": "everlyd@marketo.com"
        },
        {
            "leadId":318581,
            "activityType":"Open Email",
            "activityDate":"2015-03-17T23:23:12Z",
            "primaryAttributeValue":"My Email Program - Auto Response",
            "firstName":"David",
            "lastName":"Everly",
            "email":"everlyd@marketo.com"
       },
        ... more result objects here...
    ]
}
```

**Program Code**

```java
package com.marketo;

// minimal-json library (https://github.com/ralfstx/minimal-json)
import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import java.io.\*;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.\*;

import javax.net.ssl.HttpsURLConnection;

public class LeadActivities {
//
// Define Marketo REST API access credentials: Account Id, Client Id, Client Secret.  For example:
    private static Map<String, String> CUSTOM_SERVICE_DATA;
    static {
        CUSTOM_SERVICE_DATA = new HashMap<String, String>();
//        CUSTOM_SERVICE_DATA.put("accountId", "111-AAA-222");
//        CUSTOM_SERVICE_DATA.put("clientId", "2f4a4435-f6fa-4bd9-3248-098754982345");
//        CUSTOM_SERVICE_DATA.put("clientSecret", "asdf6IVE9h4Jjcl59cOMAKFSk78ut12W");
    }

    // Number of lead records to read at a time
    private static final String READ_BATCH_SIZE = "200";

    // Lookup lead records using lead id as primary key
    private static final String LEAD_FILTER_TYPE = "id";

    // Lead record lookup returns these fields
    private static final String LEAD_FIELDS = "firstName,lastName,email";

    // Lookup activity records for these activity types
    private static Map<Integer, String> ACTIVITY_TYPES;
    static {
        ACTIVITY_TYPES = new HashMap<Integer, String>();
        ACTIVITY_TYPES.put(7, "Email Delivered");
        ACTIVITY_TYPES.put(9, "Unsubscribe Email");
        ACTIVITY_TYPES.put(10, "Open Email");
        ACTIVITY_TYPES.put(11, "Click Email");
    }

    public static void main(String[] args) {
        // Command line argument to set how far back to look for lead changes (number of days)
        int lookBackNumDays = 1;
        if (args.length == 1) {
            lookBackNumDays = Integer.parseInt(args[0]);
        }

        // Establish "since date" using current timestamp minus some number of days (default is 1 day)
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -lookBackNumDays);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        String sinceDateTime = sdf.format(cal.getTime());

        // Compose base URL
        String baseUrl = String.format("https://%s.mktorest.com",
            CUSTOM_SERVICE_DATA.get("accountId"));

        // Compose Identity URL
        String identityUrl = String.format("%s/identity/oauth/token?grant_type=%s&client_id=%s&client_secret=%s",
                baseUrl, "client_credentials", CUSTOM_SERVICE_DATA.get("clientId"), CUSTOM_SERVICE_DATA.get("clientSecret"));

        // Call Identity API
        JsonObject identityObj = JsonObject.readFrom(getData(identityUrl));
        String accessToken = identityObj.get("access_token").asString();

        // Compose URLs for Get Lead Changes, and Get Paging Token
        String activityTypesUrl = String.format("%s/rest/v1/activities/types.json?access_token=%s",
                baseUrl, accessToken);
        String pagingTokenUrl = String.format("%s/rest/v1/activities/pagingtoken.json?access_token=%s&sinceDatetime=%s",
                baseUrl, accessToken, sinceDateTime);

        // Use activity ids to create filter parameter
        String activityTypeIds = "";
        for (Integer id : ACTIVITY_TYPES.keySet()) {
            activityTypeIds += "&activityTypeIds=" + id.toString();
        }

        // Compose URL for Get Lead Activities
        // Only retrieve activities that match our defined activity types
        String leadActivitiesUrl = String.format("%s/rest/v1/activities.json?access_token=%s%s&batchSize=%s",
                baseUrl, accessToken, activityTypeIds, READ_BATCH_SIZE);

        Map<Integer, List> activitiesMap = new HashMap<Integer, List>();
        Set leadsSet = new HashSet();

        // Call Get Paging Token API
        JsonObject pagingTokenObj = JsonObject.readFrom(getData(pagingTokenUrl));
        if (pagingTokenObj.get("success").asBoolean()) {
            String nextPageToken = pagingTokenObj.get("nextPageToken").asString();
            boolean moreResult;
            do {
                moreResult = false;

                // Call Get Lead Activities API to retrieve activity data
                JsonObject leadActivitiesObj = JsonObject.readFrom(getData(String.format("%s&nextPageToken=%s",
                        leadActivitiesUrl, nextPageToken)));
                if (leadActivitiesObj.get("success").asBoolean()) {
                    moreResult = leadActivitiesObj.get("moreResult").asBoolean();
                    nextPageToken = leadActivitiesObj.get("nextPageToken").asString();

                    if (leadActivitiesObj.get("result") != null) {
                        JsonArray activitiesResultAry = leadActivitiesObj.get("result").asArray();
                        for (JsonValue activitiesResultObj : activitiesResultAry) {

                            // Extract activity fields of interest (leadID, activityType, activityDate, primaryAttributeValue)
                            JsonObject leadObj = new JsonObject();
                            int leadId = activitiesResultObj.asObject().get("leadId").asInt();
                            leadObj.add("activityType", ACTIVITY_TYPES.get(activitiesResultObj.asObject().get("activityTypeId").asInt()));
                            leadObj.add("activityDate", activitiesResultObj.asObject().get("activityDate").asString());
                            leadObj.add("primaryAttributeValue", activitiesResultObj.asObject().get("primaryAttributeValue").asString());

                            // Store JSON containing activity fields in a map using lead id as key
                            List leadLst = activitiesMap.get(leadId);
                            if (leadLst == null) {
                                activitiesMap.put(leadId, new ArrayList());
                                leadLst = activitiesMap.get(leadId);
                            }
                            leadLst.add(leadObj);

                            // Store unique lead ids for use as lead filter value below
                            leadsSet.add(leadId);
                        }
                    }
                }
            } while (moreResult);
        }

        // Use unique lead id values to create filter parameter
        String filterValues = "";
        for (Object object : leadsSet) {
            if (filterValues.length() > 0) {
                filterValues += ",";
            }
            filterValues += String.format("%s", object);
        }

        // Compose Get Multiple Leads by Filter Type URL
        // Only retrieve leads that match the list of lead ids that was accumulated during activity query
        String getMultipleLeadsUrl = String.format("%s/rest/v1/leads.json?access_token=%s&filterType=%s&fields=%s&filterValues=%s&batchSize=%s",
                baseUrl, accessToken, LEAD_FILTER_TYPE, LEAD_FIELDS, filterValues, READ_BATCH_SIZE);
        String nextPageToken = "";

        do {
            String gmlUrl = getMultipleLeadsUrl;

            // Append paging token to Get Multiple Leads by Filter Type URL
            if (nextPageToken.length() > 0) {
                gmlUrl = String.format("%s&nextPageToken=%s", getMultipleLeadsUrl, nextPageToken);
            }

            // Call Get Multiple Leads by Filter Type API to retrieve lead data
            JsonObject multipleLeadsObj = JsonObject.readFrom(getData(gmlUrl));
            if (multipleLeadsObj.get("success").asBoolean()) {
                if (multipleLeadsObj.get("result") != null) {
                    JsonArray multipleLeadsResultAry = multipleLeadsObj.get("result").asArray();

                    // Iterate through lead data
                    for (JsonValue leadResultObj : multipleLeadsResultAry) {
                        int leadId = leadResultObj.asObject().get("id").asInt();

                        // Join activity data with lead fields of interest (firstName, lastName, email)
                        List leadLst = activitiesMap.get(leadId);
                        for (JsonObject leadObj : leadLst) {
                            leadObj.add("firstName", leadResultObj.asObject().get("firstName").asString());
                            leadObj.add("lastName", leadResultObj.asObject().get("lastName").asString());
                            leadObj.add("email", leadResultObj.asObject().get("email").asString());
                        }
                    }
                }
            }

            nextPageToken = "";
            if (multipleLeadsObj.asObject().get("nextPageToken") != null) {
                nextPageToken = multipleLeadsObj.get("nextPageToken").asString();
            }
        } while (nextPageToken.length() > 0);

        // Now place activity data into an array of JSON objects
        JsonArray activitiesAry = new JsonArray();
        for (Map.Entry<Integer, List> activity : activitiesMap.entrySet()) {
            int leadId = activity.getKey();
            for (JsonObject leadObj : activity.getValue()) {
                // do something with leadId and each leadObj
                leadObj.add("leadId", leadId);
                activitiesAry.add(leadObj);
            }
        }

        // Print out result objects
        JsonObject result = new JsonObject();
        result.add("result", activitiesAry);
        System.out.println(result);

        System.exit(0);
    }

    // Perform HTTP GET request
    private static String getData(String endpoint) {
        String data = "";
        try {
            URL url = new URL(endpoint);
            HttpsURLConnection urlConn = (HttpsURLConnection) url.openConnection();
            urlConn.setRequestMethod("GET");
            urlConn.setAllowUserInteraction(false);
            urlConn.setDoOutput(true);
            int responseCode = urlConn.getResponseCode();
            if (responseCode == 200) {
                InputStream inStream = urlConn.getInputStream();
                data = convertStreamToString(inStream);
            } else {
                System.out.println(responseCode);
                data = "Status:" + responseCode;
            }
        } catch (MalformedURLException e) {
            System.out.println("URL not valid.");
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
            e.printStackTrace();
        }
        return data;
    }

    private static String convertStreamToString(InputStream inputStream) {
        try {
            return new Scanner(inputStream).useDelimiter("A").next();
        } catch (NoSuchElementException e) {
            return "";
        }
    }
}
```

That's it. Happy coding!

Posted on _2015-11-20_ by _David_

## Integrating the SoundCloud player with the Munchkin API

SoundCloud provides an incredible audio hosting platform, with rich analytics and functionality for everything from aspiring indie rock acts, to EDM artists at the top of the music industry, to storytelling podcasts. Along with the incredible native functionality of the platform comes a world-class API program to move your data and track listening behavior. This is especially useful for podcasters, and can allow you to correlate specific listening actions, like plays, pauses, and shares to specific content in the script and the audio. Today we'll take a look at leveraging [SoundCloud's widget API](https://developers.soundcloud.com/docs/api/html5-widget) to send and track these activities in Marketo. First let's look at generating a Munchkin activity which will be recorded to a lead's activity login Marketo. At its most basic, we make a call to Munchkin.munchkinFunction and pass "visitWebPage" as the first argument. This will log a Visits Web Page activity with Marketo, and record any arbitrary URL and Query String data which we pass to the method. The second argument accepts a JavaScript object with our data, which has two members, "url," and"params," both strings. The url member corresponds to the Web Page of the activity in Marketo, while params corresponds to the Querystring. For our purposes, we'll use the url as an identifier for SoundCloud related actions, "soundCloudInteraction," while params will contain additional data about the particular activity. Here's the function that we are using to track each action:

```javascript
var trackActivity = function(action){

    //set action param to be the string passed to the function
    var qs = "action=" + action;

    //use getCurrentSound callback to get the name of the current track
    soundCloudMunchkin.widget.getCurrentSound(function(currentSound){

        //add it to our querystring
        qs = qs + "&sound=" + currentSound.title;

        //use the getPosition callback to get the position of the track in ms
        soundCloudMunchkin.widget.getPosition(function(position){

            //add it to the querystring
            qs = qs + "&position=" + position;

            //assemble our data object for the munchkin activity
            var dataObject = {
                "url": "soundCloudInteraction",
                "params": qs
            }

            //call the munchkinFunction to submit the activity
            Munchkin.munchkinFunction("visitWebPage", dataObject);
        });
    });
}
```

Since the standard SoundCloud widget is embedded in an iframe, the widget uses post messages to communicate and callbacks need to be used to obtain data, as you can see with the currentSound and getPosition methods. The SoundCloud widget API provides a set of JavaScript callbacks that we can use to respond to individual events in the player and submit these to Marketo. The events that we're interested in are what the user listens to, how long the user listens, and interactions that the user makes with the player, so we're looking at the following events:

* PLAY
* PAUSE
* FINISH
* SEEK
* CLICK_DOWNLOAD
* CLICK_BUY
* OPEN_SHARE_PANEL

We'll also need to use the bind() method from the widget to add callbacks to each of these events. Let's look at one example:

```javascript
widget.bind(SC.Widget.Events.PLAY, function(){
    soundCloudMunchkin.trackPlay();
});
```

This will make it so that whenever a track is played, we'll fire the trackPlay method to send an event to Marketo with data about the current track. You can find the full script [here](https://gist.github.com/kelkingtron/6750bb07c1397d93d9c7#file-soundcloudmunchkin-js). The soundCloudMunchkin object has an init method, which accepts a SoundCloud widget object as its only argument, which binds the tracking methods to the relevant callbacks, and will set up your widget to track activity down to Marketo. Your page will need to have your [Munchkin code](/help/javascript-api/lead-tracking.md) loaded, as well as the [SoundCloud API library](https://w.soundcloud.com/player/api.js). You'll also need to initialize everything, in addition to embedding your actual SoundCloud widget:

```javascript
window.onload=function(){
var iframe = document.getElementById(iframeId);
    if(iframe) {
        widget = SC.Widget(iframe);
        soundCloudMunchkin.init(widget);
    };
};
```

Posted on _2015-12-21_ by _Kenny_

## RTP and the EU E-Privacy Directive

This post explains how you can use RTP to notify website visitors they are being tracked or automatically disable tracking for European visitors. Since 2012, any website available to European visitors must comply with the EU E-Privacy Directive. New laws came into effect in 2011 which prevent identifying information being stored on a user's computer without their knowledge and consent. If you're using cookies or any other technologies for non-essential tracking, you must:

1. Tell users that tracking technologies are used.
1. Explain the reasons for using those technologies.
1. Obtain the user's consent prior to using that technology and allow them to withdraw permission at any time.

Posted on _1970-01-01_ by _Yanir_

## Updating customer and prospect information in Marketo using the AP

There are scenarios where proprietary systems are used to update customer and prospect information. The Marketing team would like to have those updates reflected back in Marketo so they have the most accurate system of record to use in their marketing campaigns. Using the below approach you can set up periodic uploads to Marketo to keep your Marketo contact information updated with the data modified in that proprietary system. The diagram below shows the API calls that are made on a set periodic timer. As the periodic timer is triggered the client logic will first retrieve updated contacts from the proprietary system. How this is done will differ from system to system using either APIs or data exports from the proprietary system. We'll detail the Marketo APIs that are executed once the updated contact information is retrieved. SOAP Request for syncMultipleLeads:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:paramsSyncMultipleLeads xmlns:ns2="<http://www.marketo.com/mktows/">
  <leadRecordList>
    <leadRecord>
      <Email>henry@superstar.com</Email>
      <ns2:leadAttributeList>
        <attribute>
          <attrName>FirstName</attrName>
          <attrValue>Henry</attrValue>
        </attribute>
        <attribute>
          <attrName>LastName</attrName>
          <attrValue>Adams</attrValue>
        </attribute>
        <attribute>
          <attrName>Title</attrName>
          <attrValue>Director of Demand Generation</attrValue>
        </attribute>
      </ns2:leadAttributeList>
    </leadRecord>
    <leadRecord>
      <Email>ssmith@gmail.com</Email>
      <ns2:leadAttributeList>
        <attribute>
          <attrName>FirstName</attrName>
          <attrValue>Suzie</attrValue>
        </attribute>
        <attribute>
          <attrName>LastName</attrName>
          <attrValue>Smith</attrValue>
        </attribute>
        <attribute>
          <attrName>Title</attrName>
          <attrValue>VP Marketing</attrValue>
        </attribute>
      </ns2:leadAttributeList>
    </leadRecord>
  </leadRecordList>
  <dedupEnabled>true</dedupEnabled>
</ns2:paramsSyncMultipleLeads>
```

SOAP Response from the syncMultilpeLeads:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:successSyncMultipleLeads xmlns:ns2="<http://www.marketo.com/mktows/">
  <result>
    <syncStatusList>
      <syncStatus>
        <leadId>1094593</leadId>
        <status>UPDATED</status>
        <error xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
      </syncStatus>
      <syncStatus>
        <leadId>1094594</leadId>
        <status>UPDATED</status>
        <error xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" />
      </syncStatus>
    </syncStatusList>
  </result>
</ns2:successSyncMultipleLeads>
```

`syncMultipleLeads` performs an UPSERT operation. If a contact within Marketo already exists based on the email address submitted, the attributes will be updated. If a contact does not exist it will be created. The response from `syncMultipleLeads` returns the status for each of the contacts submitted. The `<attrName/>` values within the `<leadAttributeList/>` must match the SOAP API Name defined for that Marketo subscription. You can discover the SOAP API Names within the field management section within the Marketo admin panel by exporting the field names.

See the below sample Java program that executes the scenario described above:

```java
 import com.marketo.mktows.\*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import java.util.\*;

public class SyncMultipleLeadsExample {

  public static void main(String[] args) {

    try {
      URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
      String marketoUserId = "CHANGE ME";
      String marketoSecretKey = "CHANGE ME";

      QName serviceName = new QName("http://www.marketo.com/mktows/", "MktMktowsApiService");
      MktMktowsApiService service = new MktMktowsApiService(marketoSoapEndPoint, serviceName);
      MktowsPort port = service.getMktowsApiSoapPort();

      // Create Signature
      DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
      String text = df.format(new Date());
      String requestTimestamp = text.substring(0, 22) + ":" + text.substring(22);
      String encryptString = requestTimestamp + marketoUserId ;

      SecretKeySpec secretKey = new SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");
      Mac mac = Mac.getInstance("HmacSHA1");
      mac.init(secretKey);
      byte[] rawHmac = mac.doFinal(encryptString.getBytes());
      char[] hexChars = Hex.encodeHex(rawHmac);
      String signature = new String(hexChars);

      // Set Authentication Header
      AuthenticationHeader header = new AuthenticationHeader();
      header.setMktowsUserId(marketoUserId);
      header.setRequestTimestamp(requestTimestamp);
      header.setRequestSignature(signature);

      // Create Request
      ParamsSyncMultipleLeads request = new ParamsSyncMultipleLeads();

      ObjectFactory objectFactory = new ObjectFactory();

      JAXBElement dedup = objectFactory.createParamsSyncMultipleLeadsDedupEnabled(true);
      request.setDedupEnabled(dedup);

      // The list of contacts defined here would be retrieved from the proprietary system
      Contact contact = new Contact("Henry","Adams","henry@superstar.com", "Director of Demand Generation");
      Contact contact2 = new Contact("Suzie","Smith","ssmith@gmail.com", "VP Marketing");

      ArrayList updatedContacts = new ArrayList();
      updatedContacts.add(contact);
      updatedContacts.add(contact2);

      ArrayOfLeadRecord arrayOfLeadRecords = new ArrayOfLeadRecord();

      Iterator it = updatedContacts.iterator();
      while(it.hasNext())
      {
        Contact c = it.next();

        LeadRecord leadRec = new LeadRecord();

        JAXBElement email = objectFactory.createLeadRecordEmail(c.email);
        leadRec.setEmail(email);

        Attribute attr1 = new Attribute();
        attr1.setAttrName("FirstName");
        attr1.setAttrValue(c.fname);

        Attribute attr2 = new Attribute();
        attr2.setAttrName("LastName");
        attr2.setAttrValue(c.lname);

        Attribute attr3 = new Attribute();
        attr3.setAttrName("Title");
        attr3.setAttrValue(c.title);

        ArrayOfAttribute aoa = new ArrayOfAttribute();
        aoa.getAttributes().add(attr1);
        aoa.getAttributes().add(attr2);
        aoa.getAttributes().add(attr3);

        QName qname = new QName("http://www.marketo.com/mktows/", "leadAttributeList");
        JAXBElement attrList = new JAXBElement(qname, ArrayOfAttribute.class, aoa);

        leadRec.setLeadAttributeList(attrList);
        arrayOfLeadRecords.getLeadRecords().add(leadRec);

      }

      request.setLeadRecordList(arrayOfLeadRecords);

      JAXBContext context = JAXBContext.newInstance(SuccessSyncMultipleLeads.class);
      Marshaller m = context.createMarshaller();
      m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
      m.marshal(request, System.out);

      SuccessSyncMultipleLeads result = port.syncMultipleLeads(request, header);

      m.marshal(result, System.out);
    }

    catch(Exception e) {
      e.printStackTrace();
    }
  }

  public static class Contact {
    public String fname, lname, email, title;

      public Contact(String fname, String lname, String email, String title) {
          this.fname = fname;
          this.lname = lname;
          this.email = email;
          this.title = title;
      }
  }
}

```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-03-24_ by _Travis Kaufman_

## Sending a transactional email from Marketo using the API

It requires an existing Smart Campaign to be created using the Marketo UI. It also requires the email recipient to exist in Marketo. So before calling the requestCampaign API, use the [getLead API](/help/soap-api/getlead.md to verify if the email exists in Marketo. After you make a call via the requestCampaign API, you can confirm it by checking to see if the Smart Campaign has run in Marketo. We show you first how to create a Smart Campaign, second how to set up a trigger to send a campaign via the API, third how to define an email as part of a flow action, and fourth a code sample that would be used to execute this campaign.
**How to Create a New Smart Campaign in Marketo** Smart Campaigns in Marketo execute all of your marketing activities. You can set up a series of automated actions to take on a smart list of contacts. In the case of sending transactional emails, you set up a trigger in the campaign, as shown below, to send emails using the API. First let's set up the Smart Campaign. 1. In Marketing Activities, choose a Program and then under the New dropdown, click on New Local Asset.

1. Click on Smart Campaign
1. Enter a smart campaign name and click Create

 **Add Triggers to a Smart Campaign** Adding Triggers to a Smart Campaign allows you to make a Smart Campaign run on one person at a time based on a live event, which in this case is a request via the [requestCampaign API](https://developer.adobe.com/marketo-apis/api/mapi#operation/triggerCampaignUsingPOST). 1. Search for the "Campaign is Requested" trigger and then drag and drop it to the canvas.

1. In the trigger, select "is" and "Web Service API."

**How to Create Email Flow Action on a Campaign** The association of an email with a Smart Campaign allows marketers to manage how they want an email to look, and allows the third-party application to determine who receives it and when. After creating an email as a new Local Asset, you can set it as a flow action in a campaign.  Find and select the email you want to send.

**Code Sample to Call the requestCampaign API** After setting up the campaign and triggers in the Marketo interface, we show you how to use the API to send an email. The first sample is an XML request, the second is an XML response, and the final one is a Java code sample that can be used to generate the XML request. We also show you how to find the campaign ID that is used when making a call to the `requestCampaign` API.
The API call also requires you to know the ID of the Marketo campaign beforehand. You can determine the campaign ID using either of the following methods: 1. Use the [getCampaignsForSource](/help/soap-api/getcampaignsforsource.md) API 1. Open the Marketo campaign in a browser and look at the URL address bar. The campaign ID (represented as a 4-digit integer) can be found immediately following "SC". For example, `<https://app-stage.marketo.com/#SC**1025**A1>`. The bolded portion is the campaign ID - "1025." SOAP Request for `requestCampaign`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809939944BFABAE58E5D27</mktowsUserId><requestSignature>48397ad47b71a1439f13a51eea3137df46441979</requestSignature><requestTimestamp>2013-08-01T12:31:14-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsRequestCampaign>
      <source>MKTOWS</source>
      <campaignId>4496</campaignId>
      <leadList>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>lead@company.com</keyValue>
        </leadKey>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>anotherlead@company.com</keyValue>
        </leadKey>
      </leadList>
    </ns1:paramsRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Response for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successRequestCampaign>
      <result>
        <success>true</success>
      </result>
    </ns1:successRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

See below a sample Java program that executes the scenario described above.

```java
import com.marketo.mktows.*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;


public class RequestCampaign {

    public static void main(String[] args) {
        System.out.println("Executing Request Campaign");
        try {
            URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
            String marketoUserId = "CHANGE ME";
            String marketoSecretKey = "CHANGE ME";

            QName serviceName = new QName("http://www.marketo.com/mktows/", "MktMktowsApiService");
            MktMktowsApiService service = new MktMktowsApiService(marketoSoapEndPoint, serviceName);
            MktowsPort port = service.getMktowsApiSoapPort();

            // Create Signature
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
            String text = df.format(new Date());
            String requestTimestamp = text.substring(0, 22) + ":" + text.substring(22);
            String encryptString = requestTimestamp + marketoUserId ;

            SecretKeySpec secretKey = new SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(encryptString.getBytes());
            char[] hexChars = Hex.encodeHex(rawHmac);
            String signature = new String(hexChars);

            // Set Authentication Header
            AuthenticationHeader header = new AuthenticationHeader();
            header.setMktowsUserId(marketoUserId);
            header.setRequestTimestamp(requestTimestamp);
            header.setRequestSignature(signature);

            // Create Request
            ParamsRequestCampaign request = new ParamsRequestCampaign();

            request.setSource(ReqCampSourceType.MKTOWS);

            ObjectFactory objectFactory = new ObjectFactory();
            JAXBElement<Integer> campaignId = objectFactory.createParamsRequestCampaignCampaignId(4496);
            request.setCampaignId(campaignId);

            ArrayOfLeadKey leadKeyList = new ArrayOfLeadKey();
            LeadKey key = new LeadKey();
            key.setKeyType(LeadKeyRef.EMAIL);
            key.setKeyValue("lead@company.com");

            LeadKey key2 = new LeadKey();
            key2.setKeyType(LeadKeyRef.EMAIL);
            key2.setKeyValue("anotherlead@company.com");

            leadKeyList.getLeadKeies().add(key);
            leadKeyList.getLeadKeies().add(key2);

            JAXBElement<ArrayOfLeadKey> arrayOfLeadKey = objectFactory.createParamsRequestCampaignLeadList(leadKeyList);
            request.setLeadList(arrayOfLeadKey);

            SuccessRequestCampaign result = port.requestCampaign(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessRequestCampaign.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            m.marshal(result, System.out);

        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
```

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-03-27_ by _Murta_

## Sending an Email with Dynamic Content from Marketo using the AP-

Imagine you want to automate your call center follow-up emails. After your support rep speaks with a customer, you would like to automatically send an email thanking them for contacting your company. Let's take this a step further, and say you want to include the specific conversation topic discussed with the customer that you track in your CRM. You can do this from Marketo using the requestCampaign SOAP API to send an email with dynamic content. The requestCampaign API allows you to pass in a lead or leads. It also allows you to pass in Program Tokens that can be used with an existing Campaign to send dynamic content. The requestCampaign SOAP API requires the email recipient to exist in Marketo. So before calling the requestCampaign API, use the [getLead API](/help/soap-api/getlead.md) to verify if the email exists in Marketo. We show you first how to create a Smart Campaign, second how to set up a trigger to send a campaign via the API, third how to create an email that accepts dynamic content via Program Tokens, fourth how to define an email as part of a flow action, and fifth a code sample that would be used to execute this campaign. **How to Create a New Smart Campaign in Marketo** Smart Campaigns in Marketo execute all of your marketing activities. You can set up a series of automated actions to take on a smart list of contacts. In the case of sending transactional emails, you set up a trigger in the campaign, as shown below, to send emails using the API. First let's set up the Smart Campaign. 1. In Marketing Activities, choose a Program and then under the New dropdown, click on New Local Asset

1. Click on Smart Campaign
1. Enter the smart campaign name and click Create  **Add Triggers to a Smart Campaign** Adding Triggers to a Smart Campaign allows you to make a Smart Campaign run on one person at a time based on a live event, which in this case is a request via the [requestCampaign API](https://developer.adobe.com/marketo-apis/api/mapi#operation/triggerCampaignUsingPOST).
1. Search for the "Campaign is Requested" trigger and then drag and drop it to the canvas.
1. In the trigger, select "is" and "Web Service API."

**How to Pass in Dynamic Content Using the API** In Marketo, My Tokens are variables that you can use in your Program. My Tokens enable you to enter information pertaining to your Program in one place, replace that information with a value you specify, and retrieve this information in other parts of the application, such as an email template. Using the requestCampaign SOAP API, you can pass an array of Program Tokens, which will override existing tokens. After the campaign runs, the tokens are discarded. You create My Tokens at either the Campaign folder level, or at the Program level. My Tokens at the Campaign folder level will inherit down to all Programs contained within the Campaign folder. If you create My Tokens at the Campaign folder level, you can overwrite the inherited value at the Program level. For example, if you define tokens for the Program Date and the Program Description at the Campaign folder level, you can overwrite these values at the individual Program level.

Here's how to do this. 1. From the Marketing Activities tree, select the Campaign folder or Program where you want to create the tokens. From the top menu bar, select My Tokens. Then the My Tokens canvas displays. From the right hand side tree, drag a Token Type to the canvas, which in this case is "Text." In the Token Name field, highlight My Token and enter a unique Token Name, which in this case is "my.conversationtopic." In the Value field, enter a relevant Value for the token, which in this case is "Thank you for calling us today." Note that by using the API we will override the default My Token value. Click "Save" to save the custom token.  1. Create a New Email by clicking New. Then click on New Local Assets and select Email. Next fill out the relevant fields to name your email. When drafting your email, click the Token icon to include tokens in your email. Now that you have created your template email with Tokens, we will add the email as a flow action for the Campaign in the subsequent step. So when you call the campaign via the API, the email will be sent out.
**How to Create Email Flow Action on a Campaign** The association of an email with a Smart Campaign allows marketers to manage how they want an email to look, and allows the third-party application to determine who receives it and when. After creating an email as a new Local Asset, you can set it as a flow action in a campaign. Find and select the email you want to send.
**Code Sample to Call the requestCampaign API** After setting up the campaign and triggers in the Marketo interface, we show you how to use the API to send an email. The first sample is an XML request, the second is an XML response, and the final one is a Java code sample that can be used to generate the XML request. We also show you how to find the campaign ID that is used when making a call to the requestCampaign API. The API call also requires you to know the ID of the Marketo campaign beforehand. You can determine the campaign ID using either of the following methods: 1. Use the [getCampaignsForSource](/help/soap-api/getcampaignsforsource.md) API 1. Open the Marketo campaign in a browser and look at the URL address bar. The campaign ID (represented as a 4-digit integer) can be found immediately following "SC". For example, `<https://app-stage.marketo.com/#SC**1025**A1>`. The bolded portion is the campaign ID - "1025." SOAP Request for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809939944BFABAE58E5D27</mktowsUserId><requestSignature>48397ad47b71a1439f13a51eea3137df46441979</requestSignature><requestTimestamp>2013-08-01T12:31:14-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsRequestCampaign>
      <source>MKTOWS</source>
      <campaignId>4496</campaignId>
      <leadList>
        <leadKey>
          <keyType>EMAIL</keyType>
          <keyValue>lead@company.com</keyValue>
        </leadKey>
      </leadList>
      <programTokenList>
        <attrib>
          <name>{{my.conversationtopic}}</name>
          <value>Thank you for calling about adding a line of service to your current plan.</value>
        </attrib>
      </programTokenList>
    </ns1:paramsRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

SOAP Response for requestCampaign

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="<http://schemas.xmlsoap.org/soap/envelope/>" xmlns:ns1="<http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successRequestCampaign>
      <result>
        <success>true</success>
      </result>
    </ns1:successRequestCampaign>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

See below a sample Java program that executes the scenario described above.

```java
import com.marketo.mktows.\*;
import java.net.URL;
import javax.xml.namespace.QName;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;


public class RequestCampaign {

    public static void main(String[] args) {
        System.out.println("Executing Request Campaign");
        try {
            URL marketoSoapEndPoint = new URL("CHANGE ME" + "?WSDL");
            String marketoUserId = "CHANGE ME";
            String marketoSecretKey = "CHANGE ME";

            QName serviceName = new QName("http://www.marketo.com/mktows/", "MktMktowsApiService");
            MktMktowsApiService service = new MktMktowsApiService(marketoSoapEndPoint, serviceName);
            MktowsPort port = service.getMktowsApiSoapPort();

            // Create Signature
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
            String text = df.format(new Date());
            String requestTimestamp = text.substring(0, 22) + ":" + text.substring(22);
            String encryptString = requestTimestamp + marketoUserId ;

            SecretKeySpec secretKey = new SecretKeySpec(marketoSecretKey.getBytes(), "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(encryptString.getBytes());
            char[] hexChars = Hex.encodeHex(rawHmac);
            String signature = new String(hexChars);

            // Set Authentication Header
            AuthenticationHeader header = new AuthenticationHeader();
            header.setMktowsUserId(marketoUserId);
            header.setRequestTimestamp(requestTimestamp);
            header.setRequestSignature(signature);

            // Create Request
            ParamsRequestCampaign request = new ParamsRequestCampaign();

            request.setSource(ReqCampSourceType.MKTOWS);

            ObjectFactory objectFactory = new ObjectFactory();
            JAXBElement<Integer> campaignId = objectFactory.createParamsRequestCampaignCampaignId(4496);
            request.setCampaignId(campaignId);

            ArrayOfLeadKey leadKeyList = new ArrayOfLeadKey();
            LeadKey key = new LeadKey();
            key.setKeyType(LeadKeyRef.EMAIL);
            key.setKeyValue("lead@company.com");

            leadKeyList.getLeadKeies().add(key);

            JAXBElement<ArrayOfLeadKey> arrayOfLeadKey = objectFactory.createParamsRequestCampaignLeadList(leadKeyList);
            request.setLeadList(arrayOfLeadKey);

            ArrayOfAttrib aoa = new ArrayOfAttrib();

            Attrib attrib = new Attrib();
            attrib.setName("{{my.conversationtopic}}");
            attrib.setValue("Thank you for calling about adding a line of service to your current plan.");

            aoa.getAttribs().add(attrib);

            JAXBElement<ArrayOfAttrib> arrayOfAttrib = objectFactory.createParamsRequestCampaignProgramTokenList(aoa);
            request.setProgramTokenList(arrayOfAttrib);

            SuccessRequestCampaign result = port.requestCampaign(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessRequestCampaign.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            m.marshal(result, System.out);

        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}
```

After you make a call via the requestCampaign API, you can confirm it by checking to see if the Smart Campaign has run in Marketo.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-04-03_ by _Murta_

## Capture Anonymous Visitor Activity Based on Business Logic

Imagine you want to track users who visit a specific post on your company blog. Let's say out of the total number of users who visit a post, you would only like to track users who signal their interest by spending at least 5 seconds and scrolling down the page. For anonymous users you would like to create a new lead in Marketo with this event, and for known users you would like to update their lead activity with this event. You can accomplish this by using the [Munchkin tracking code](/help/javascript-api/lead-tracking.md) on your website. When a non-cookied user goes to a page with the Munchkin tracking code, a new cookie is created on the user's browser, and a new anonymous lead will be created in Marketo. If the user is already cookied and the user is an existing lead in Marketo, the visit to the page will be recorded in the activity log of the user in Marketo. We show you first how to generate Munchkin tracking code in Marketo, second how to modify your Munchkin sample code to only trigger if certain conditions are met, and third how to verify that a page visit from an anonymous user was recorded in Marketo.

**How to Generate Munchkin Tracking Code** The Munchkin tracking code allows you to track visits to your web site. There are three types of Munchkin code described below, but in this example we use the Asynchronous Munchkin tracking code. A) Simple: has the fewest lines of code, but does not optimize for webpage loading time. This code loads the jQuery library each time a webpage is loaded. B) Asynchronous: reduces webpage loading time. This code checks if the jQuery library already exists, loads it if it's missing, and uses it for executing tracking code once the rest of the webpage has loaded. C) Asynchronous jQuery: reduces webpage loading time and also improves system performance. This code assumes that you already have jQuery, and does not check to load it. 1. Click Admin at the top right of the app.  1. Click Munchkin in the tree on the left.  1. Select Asynchronous for Tracking Code Type. 1. Click and copy the JavaScript tracking code to put on your website.
**Code Sample to Cookie User and Track Event** Place the tracking code on your web pages right before the `</body>` tag. Landing pages created in Marketo automatically contain tracking code, so you don't need to put this code on them. This code sample would call the Munchkin API after the script is loaded:

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('XXX-XXX-XXX');
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();
</script>
```

This code sample would call the Munchkin API after the user has been on the page for 5 seconds and has also scrolled 500 pixels down the page:

```javascript
<script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
<script type="text/javascript">
$(function(){
 setTimeout(function(){
  $(window).scroll(function() {
      var y_scroll_position = window.pageYOffset;
      var scroll_position = 500; //Sets number of pixels user must scroll to be tracked

  if(y_scroll_position > scroll_position) {
  //Munchkin tracking code
   (function() {
     var didInit = false;
     function initMunchkin() {
      if(didInit === false) {
        didInit = true;
        Munchkin.init('XXX-XXX-XXX');
      }
     }

     var s = document.createElement('script');
     s.type = 'text/javascript';
     s.async = true;
    s.src = '//munchkin.marketo.net/munchkin.js';
     s.onreadystatechange = function() {
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
          initMunchkin();
      }
     };
     s.onload = initMunchkin;
     document.getElementsByTagName('head')[0].appendChild(s);
   })();
   }
 },5000); //Sets time delay before tracking user
});
</script>
```

**How to Verify Page Visit by Anonymous User Was Recorded in Marketo**

1. Click on Analytics in the top menu, and then click on New Report. Choose Web Page Activity as the report type, and then name your report.
1. After you create a report, click on Smart List. Then select the Visited Web Page filter from the box on the right. Enter the web page where you put the Munchkin tracking code.
1. Click on Setup. Select Anonymous Visitors from ISPs, and change option to Shown.
1. Click on Report. You will now see activity tracked on the web page you selected.
1. Double click on the lead record, which will then show the activity log where you can see the specific page the anonymous user visited.

This article contains code used to implement custom integrations. Due to its customized nature, The Marketo Technical Support team is unable to troubleshoot custom work. Please do not attempt to implement the following code sample without appropriate technical experience, or access to an experienced developer.

Posted on _2014-04-17_ by _Murta_

## Dynamically Change Local Phone Number using RTP

Personalization is everything - we figured this out a long time ago. With that being said, it's still surprising to me that every time I need immediate assistance, it is so hard to find the relevant local phone numbers on a website. Good thing we have [Marketo Real-Time Personalization](https://business.adobe.com/products/marketo/content-personalization.html) (RTP) installed on <https://business.adobe.com/products/marketo/adobe-marketo.html>. We can leverage the [RTP Visitor API](/help/javascript-api/web-personalization.md) to dynamically change the phone number that a web visitor sees in different sections of the website. Wow! Can you believe this? How does this magic work? First, you need to have RTP installed on your web site as described [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/web-personalization/rtp-tag-implementation/deploy-the-rtp-javascript). Next, follow the instructions below and implement the JavaScript code on your website:

1. Insert your international phone number in the **defaultPhone** configuration
1. Insert the HTML element id(s) in the **divIds** configuration
1. If you want to make the phone number a click-to-call link for mobile browsers, then set the **mobileLink** configuration to **true**.
1. Map the different locations with their phone numbers in the **cityPhone**, **statePhone**, and **countryPhone** configurations

For example, here are sample values for configuration settings:

```json
  defaultPhone:"+1.503.608.4679", // Optional
  divIds:["phoneId1","phoneId2"],
  mobileLink: true,
  cityPhone: {
    "<a href="#">yanir</a>": ["San Mateo", "San Francisco"],
    "+353.1.242.3000": ["tel-aviv"]
  },
  statePhone: {
    "+1.650.376.2300": ["CA"],
    "+1.650.376.2302": ["OR"]
  },
  countryPhone: {
    "+1.650.376.2300": ["United States"],
    "+353.1.242.3000": ["Israel"]
  }
```

Finally, insert an HTML anchor tag that contains an id matching one of the ids in **divIds** (from step 2 above). For example, if you specified "phoneId1" in **divIds**, then your HTML anchor tag would look like this:

`<a href="tel:+1800229933" id="phoneId1">+1800229933</a>`

The script checks if there is a match in this order: cityPhone > statePhone > countryPhone > defaultPhone You can also replace the phone numbers with text (Example: "Join our San Francisco User Group!") or HTML code and dynamically change the content based on the geo-location. Enjoy!

```html
<a href="tel:+1800229933" id="phoneId1">+1800229933</a>
<script>
(function(a){
    rtp('get','visitor',function(yc){
        var location = yc.results.location;
        var loop = true;
        var phoneChanged = false;
        console.log(yc.results);
        function checkObj(obj){
            return Object.getOwnPropertyNames(obj).length >0;
        }
        function changePhone(p){
            d=a.divIds;
            for(i=0;i<d.length;i++){
                if(document.getElementById(d[i]) !== null){
                    document.getElementById(d[i]).innerHTML = p;
                    if(a.mobileLink){
                        document.getElementById(d[i]).href= "tel:" + p;
                    }
                    console.log(p);
                }
            }
            loop = false;
            phoneChanged = true;
        }
        function matchLocation(loc,objc){
            for (var key in objc) {
                for(i=0;i<objc[key].length && loop;i++){
                    if (!loop) { return true;};
                    val = objc[key][i];
                    //console.log(loc + location[loc] + " ? " + val);
                    if(location[loc].toLowerCase() === val.toLowerCase()){
                        changePhone(key);
                    }
                }
            }
        }
        if(checkObj(a.cityPhone)){
            matchLocation("city",a.cityPhone);
        }else if(checkObj(a.statePhone)){
            matchLocation("state",a.statePhone);
        }else if(checkObj(a.countryPhone)){
            matchLocation("country", a.countryPhone);
        }else if(!phoneChanged && a.defaultPhone.length > 0 ){
            changePhone(a.divId,a.defaultPhone);
        }
    });
})({
    defaultPhone:"",  //  [Optional] the number to show if visitor does not match the mapping below
    divIds:["phoneId1","Floater"],  //the phone HTML element ID, can be <div>, <a>, <span>, <p> etc.
    mobileLink: true,  //if you use click to call link (with href="tel:") you can also change its number

    cityPhone: {
        "<a href='#'>yanir</a>": ["San Mateo", "San Francisco"],
        "+353.1.242.3000": ["tel-aviv"]
    },
    statePhone: {
        "+1.650.376.2300": ["CA"],
        "+1.650.376.2302": ["OR"]
    },
    countryPhone: {
        "+1.650.376.2300": ["United States"],
        "+353.1.242.3000": ["Israel"]
    }
});
</script>
```

Posted on _2016-02-02_ by _Yanir_

## Winter 2016 Updates

### Custom Objects

* [Custom Objects N:N relationships now supported](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-custom-objects/create-marketo-custom-objects)
  * Lead or Account records may now have many-to-many relationships through custom objects via the definition of intermediate objects. After creating a standalone custom object type, and intermediate object type can be created with link fields to both the standalone object and either leads or accounts.
  * There are no new API calls for this capability, but the object definitions must be configured correctly to leverage these relationships through the API.
* `getLeadActivities` and `getLeadChanges` will no longer return activities of anonymous leads. See the [Next Generation Munchkin Tracking FAQ](https://experienceleague.adobe.com/en/docs/marketo/using/home) for more information

Posted on _2016-02-05_ by _Kenny_

## Retrieve Activities for a Single Lead using REST API

Here is a question that we are repeatedly asked by our developer community:

"How do I get a list of past activities for an individual lead?"

Up until recently, there was no straightforward way to accomplish this using the REST API. But now there is! The Winter 2016 release of our REST API contains a nice little enhancement. [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) now accepts the **leadIds** parameter that can be used to specify a lead id. When the **leadIds** parameter is specified, only activities for that lead id will be returned. You can think of this as a lead id filter. Note that the **leadIds** parameter can take a comma separated list of lead ids in case you'd like to filter results on more than one lead (up to 30). This might come in handy for example when limiting activities to leads for a particular company. **Example** Below is a sample request to [Get Lead Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadActivitiesUsingGET) that contains the **leadIds** parameter. I have specified a value of "50" for the **leadIds** parameter, which corresponds to an arbitrary lead in my Marketo instance. I have specified a value of "129" for the activityTypeIds parameter, which corresponds to the "Mobile App Session" activity on my Marketo instance.

`<https://123-abc-456.mktorest.com/rest/v1/activities.json?leadIds=50&activityTypeIds=129&nextPageToken=WQV2VQVPPCKHC6AQYVK7JDSA3J4SMAZRQO4RKIXCEMLFCM2APRSQ====>`

Below is an excerpt of the response from that request above. As you can see, it contains only result objects with "leadId": 50 and "activityTypeId": 129.

```json
{
    "id": 846,
    "leadId": 50,
    "activityDate": "2015-04-06T21:58:59Z",
    "activityTypeId": 129,
    "primaryAttributeValueId": 13,
    "primaryAttributeValue": "Sample App",
    "attributes": [
        {
            "name": "Device Type",
            "value": "iPhone"
        },
        {
            "name": "Mobile App Session Length",
            "value": 7
        },
        {
            "name": "Platform",
            "value": "ios"
        }
    ]
}
{
    "id": 879,
    "leadId": 50,
    "activityDate": "2015-04-07T00:45:11Z",
    "activityTypeId": 129,
    "primaryAttributeValueId": 13,
    "primaryAttributeValue": "Sample App",
    "attributes": [
        {
            "name": "Device Type",
            "value": "iPhone"
        },
        {
            "name": "Mobile App Session Length",
            "value": 5
        },
        {
            "name": "Platform",
            "value": "ios"
        }
    ]
}
{
    "id": 1114,
    "leadId": 50,
    "activityDate": "2015-04-08T00:02:41Z",
    "activityTypeId": 129,
    "primaryAttributeValueId": 13,
    "primaryAttributeValue": "Sample App",
    "attributes": [
        {
            "name": "Device Type",
            "value": "iPhone"
        },
        {
            "name": "Mobile App Session Length",
            "value": 241
        },
        {
            "name": "Platform",
            "value": "ios"
        }
    ]
}
{
    "id": 1551,
    "leadId": 50,
    "activityDate": "2015-04-09T23:31:56Z",
    "activityTypeId": 129,
    "primaryAttributeValueId": 13,
    "primaryAttributeValue": "Sample App",
    "attributes": [
        {
            "name": "Device Type",
            "value": "iPhone"
        },
        {
            "name": "Mobile App Session Length",
            "value": 223
        },
        {
            "name": "Platform",
            "value": "ios"
        }
    ]
}
{
    "id": 1716,
    "leadId": 50,
    "activityDate": "2015-04-15T22:44:19Z",
    "activityTypeId": 129,
    "primaryAttributeValueId": 13,
    "primaryAttributeValue": "Sample App",
    "attributes": [
        {
            "name": "Device Type",
            "value": "iPhone"
        },
        {
            "name": "Mobile App Session Length",
            "value": 223
        },
        {
            "name": "Platform",
            "value": "ios"
        }
    ]
}
```

## Seamless Integration with Marketo and Over 500 Apps Using Zapier

This is a post from Philippe Delle Case, Principal Solutions Consultant, Marketo.

### Objectives

This article explains in detail how to integrate Marketo with potentially over 500 Cloud Apps, thanks to Zapier. For that, we're going to build from scratch a Zapier connector for Marketo and implement two practical integration use cases: Use Case 1: Unidirectional Leads integration from FullContact Card Reader to Marketo

* Scan any contact's business card with the FullContact mobile Card Reader app and get a lead automatically created in Marketo.
* Add an existing lead to a static list in Marketo and find the lead automatically added to your Google Sheet.
* Modify any lead in your Google Sheet and find the change echoed back to Marketo.

### Prerequisites

**Sign-up for a free account with Zapier** [Zapier](https://zapier.com/) is a web app Automation Service that lets you easily automate tasks between other online apps without the need for programmers or any IT resources. A brief introduction can be found [here](https://zapier.com/api/v4/helpdocs/category/redirect/what-is-zapier). Today Zapier supports more than 500 apps in many different domains such as Marketing, CRM, CMS, Customer Support, Electronic Signature, Forms, etc. A single integration between one app and another is called a Zap. Check Zapier's [zapbook](https://zapier.com/apps) for an exhaustive list of supported web apps.  Sign up for a free account [here](https://zapier.com/sign-up/). You get access to up to 100 tasks/month, 5 zaps, and zaps running every 15 minutes. You can of course get much more by subscribing to Zapier's paid plans (basic, business, business plus, etc.)

**Access to a Marketo Instance as Administrator or with a provided API User account** Our Zapier connector will use the Marketo REST API to push Lead data to Marketo. In order to use this API, you need an API User and a Custom Service that you can create yourself if you are administrator of your Marketo instance. If not, then an administrator will need to provide those to you. There is also a Webhook to create, only accessible to a Marketo Administrator. A step by step explanation of how to create the Marketo API User and the Custom Service can be found here. Once you're done, you should have the following credentials to invoke the Marketo REST API: Client Id, Client Secret, Munchkin Account Id, Munchkin Account Id

You can get the Munchkin Account Id from the Munchkin or the Web Services Admin screens. Its pattern looks like this: `000-XXX-000`.  No need to get an access token as it would be only valid for a single hour. The Connector will generate tokens for you automatically.
**Sign-up for a free account with Google Docs, Sheets, and Slides are productivity apps that let you create different kinds of online documents, work on them in real time with other people, and store them in your Google Drive online. Our use case needs a Google Sheet. Different features of Google Docs and creation of an account with Google can be found [here](https://workspace.google.com/products/docs/).
**Sign-up for a free account with FullContact** FullContact keeps you fully connected to the people who matter most by pulling in all your contacts and continuously syncing them with changes to social profiles, photos, email signatures, company information, and more. They offer a mobile business cards reader that can scan cards into 250+ Web Apps, including Zapier. You can sign up for a free account here. You may also subscribe to a premium paid account with more features and capacity. The mobile app can be downloaded from the Apple AppStore, or from Google Play. The FullContact Zaps are documented in the [FullContact Zapier integrations](https://zapier.com/apps/contacts-plus/integrations).

### Implementation of the Marketo Connector for Zapier

**Create the Marketo App** From the Zapier web interface, go to the Developers Portal. Click **Add New App** and fill out at minimum the Title (for example 'Marketo') and the Description. The logo is optional, but nice to have.\ **Authentication** In this section we declare the different fields used for the Marketo REST API authentication and the authentication settings. Create first the following fields:

Edit the 'Authentication Settings':

* Auth Type: Session Auth
* Auth Mapping:

  `{"access_token":"{{access_token}}"}`

* Access Token Placement**:** Token in Querystring

Once a Marketo custom service has been created, client id and client secret become available. We use the client id and client secret to generate an access token via the REST API [Authentication](/help/rest-api/authentication.md) endpoint. We can then use this access token to make subsequent requests to the REST API. The token expires after an hour and must be generated again to proceed calling the REST API. We chose authentication Type = 'Session Auth' as it allows us to execute a custom authentication script every time our session token is expired. We'll see in the section 'Scripting API' how to implement this mechanism that can only work with this type of authentication.
**Triggers** Zapier Triggers are there to bring data into Zapier. We do not need one for our use cases as we will leverage a Marketo Webhook instead. However, we still need to write a dummy Trigger as a mandatory test for our Marketo connector. We are going to create a Test Trigger calling the Marketo REST API [Get Daily Usage](https://developer.adobe.com/marketo-apis/api/mapi#operation/getDailyUsageUsingGET) endpoint. Click **Add New Trigger** to start the wizard and fill-up the following fields (fields not mentioned can be left blank): Name and Description

* Name: Test Trigger
* Key: test_trigger
* Description: The Test Trigger of the Marketo App
* Important? Not checked
* Hide? Checked

Trigger Fields

* None

Where Data Comes From

* Data Source: Polling
* Polling URL: `https://{{munchkin_account_id}}.mktorest.com/rest/v1/stats/usage.json`

Sample Result

* Leave blank

Click **Manage Trigger Settings** and set our Test Trigger to be the one we'll use to verify a user's credentials. **Actions** Zapier Actions are there to send data out from Zapier. We are going to implement the Create_Update Lead Action calling the Marketo REST API. This Action allows us to create a new lead within Marketo, or if the lead already exists, it updates it with the submitted values. We'll use the field 'email' for de-duplication. Click **Add New Action** to start the wizard and fill-up the following fields (fields not mentioned can be left blank): Name and Description

* Name: Create_Update Lead
* Noun: Lead
* Key: create-update-lead
* Description: Create a new lead within Marketo, or if the lead already exists update it with the submitted values
* Important? Checked
* Hide? Not Checked

Action Fields Action Fields are the fields users will map data into. Choose them carefully according to your own needs as they will represent all the data you are able to update in Marketo. There is an option in Zapier to offer to the end user all fields available in Marketo, but that would induce more code and complexity, not required for a disposable connector. As an example, we selected the following fields.

Partition Name is mandatory in our case since our Marketo instance has Lead Partitions in service. It could be omitted otherwise. We separated it from the 'input' group so the end-user understands this is not a field to synch. The field 'Notes' comes from a synch between Marketo and Salesforce, do not use it if you don't have it in your Marketo instance. The field 'Called' has been created in our Marketo instance, do not use it if you don't have it in your Marketo instance. Of course, the goal is to let you pick the fields you need from Marketo. It is recommended to start small and add the extra fields later. Where to Send Data

* Action Endpoint URL: `https://{{munchkin_account_id}}.mktorest.com/rest/v1/leads.json`

Sample Result

* Leave blank

### Zapier Scripting API

Zapier's scripting feature allows you to manipulate the requests and responses that are exchanged between your app's API and Zapier. You can modify HTTP requests just before they are sent and can parse responses before Zapier does anything with them. We need it to complete our custom 'Session Auth' authentication so it works with Marketo. More information is [here](https://zapier.com/developer/documentation/scripting/). Copy the following code and we'll go through some explanations later on:

```javascript
var Zap = {

    get_session_info: function(bundle) {

       console.log('Entering get_session_info method ...');

         var access_token,
            access_token_request_payload,
            access_token_response;


        // Assemble the meta data for our Access Token swap request
         console.log('building Request with client_id=' + bundle.auth_fields.client_id + ', and client_secret=' + bundle.auth_fields.client_secret);
        access_token_request_payload = {
            method: 'POST',
            url: 'https://' + bundle.auth_fields.munchkin_account_id + '.mktorest.com/identity/oauth/token',
            params: {
                'grant_type' : 'client_credentials',
                'client_id' : bundle.auth_fields.client_id,
                'client_secret' : bundle.auth_fields.client_secret
            },
            headers: {
                'Content-Type': 'application/json',  // Could be anything.
                Accept: 'application/json'
            }
        };

        // Fire off the Access Token request.
        access_token_response = z.request(access_token_request_payload);

        // Extract the Access Token from returned JSON.
        access_token = JSON.parse(access_token_response.content).access_token;
        console.log('New Access_Token=' + access_token);

        // This will be mixed into bundle.auth_fields in future calls.
        //bundle.auth_fields.access_token=access_token;
        return {'access_token': access_token};
    },


    test_trigger_pre_poll: function(bundle) {

         console.log('Entering test_trigger_pre_poll method ...');

         bundle.request.params = {
         'access_token':bundle.auth_fields.access_token
         };

         return bundle.request;

    },


    test_trigger_post_poll: function(bundle) {

        console.log('Entering test_trigger_post_poll method ...');

        var data = JSON.parse(bundle.response.content);
        if ((!data.success)&&((data.errors[0].code=="601")||(data.errors[0].code=="600"))){
            console.log('Access Token expired or invalid, requesting new one - data.success=' + data.success + ', data.errors[0].code=' + data.errors[0].code);

           throw new InvalidSessionException(); // Calling get_session_info() to regenerate Access Token
        }

        return JSON.parse(bundle.response.content);
    },

    create_update_lead_pre_write: function(bundle) {

       bundle.request.params = {'access_token':bundle.auth_fields.access_token};
       return bundle.request;
    },

    create_update_lead_post_write: function(bundle) {

         var data = JSON.parse(bundle.response.content);
         if ((!data.success)&&((data.errors[0].code=="601")||(data.errors[0].code=="600"))){
            console.log('Access Token expired or invalid, requesting new one - data.success=' + data.success + ', data.errors[0].code=' + data.errors[0].code);
            throw new InvalidSessionException(); // Calling get_session_info() to regenerate Access Token
        }
        return JSON.parse(bundle.response.content);
    }
};
```

**Methods** **get_session_info**

* This method is responsible for generating or regenerating an access token calling the Marketo REST API [Authentication](/help/rest-api/authentication.md) endpoint.
* It is called every time any 'post_poll' method encounters an 'Access Token Expired' error. An access token is scheduled to expire every 1 hour so this is expected.
* Action Endpoint URL: `https://{{munchkin_account_id}}.mktorest.com/identity/oauth/token`

**pre_poll, pre_write**

* We must create a 'pre-poll' method on any Trigger we have created, to modify the HTTP request just before it is sent, so we can add the Marketo Access Token in its parameters.
* We must create a 'pre-write' method on any Action we have created, for the same reason.

**post_poll, post_write**

* We must create a 'post-poll' method on any Trigger we have created, to parse responses before Zapier does anything with them, and eventually intercept the 'Access Token Expired' error.
* We must create a 'post-write' method on any Action we have created, for the same reason.
* If such an error has occurred, we throw an InvalidSessionException that will tell Zapier to replay the authentication and execute again the get_session_info method.

Note that you can access the Bundle logs from the Scripting API from the 'Quick links' menu on the top right corner of the screen. This is really useful to debug the scripts.

Use Case 1: Integration of Marketo with FullContact Card Reader

For this integration we create one single Zap from FullContact to Marketo. With this Zap, you are able to scan business cards with the FullContact Mobile Card Reader and push the leads to Marketo.   **Zap FullContact -> Marketo** From the Zapier Dashboard click the button 'Make a new Zap'.

**Trigger in Zapier**

* Pick the App FullContact
* Choose FullContact Trigger 'New Business Card'
* Connect to your FullContact account
* Test the FullContact App

**Action in Zapier**

* Pick the App Marketo we just created earlier, it should display in Beta
* Choose Marketo Action 'Create_Update Lead'
* Connect to your Marketo account, filling up the authentication parameters (Munchkin Account Id, Client Id, Client Secret)
* Map the fields from FullContact to Marketo
* Fill-up eventually a Partition Name where your new leads should go (only if partitions exist in your Marketo Instance)
* Test the Marketo App
* Activate your Zap

Note: Make sure you download the business cards Reader from FullContact and activate the Zapier Integration right from your mobile device.

Use Case 2: Integration of Marketo with Google Sheets-

For this integration we create two Zaps. One from Marketo to Google Sheets and another one from Google Sheets to Marketo. With this Zap, you are able to synch up some of your leads or contacts between Marketo and a Google Sheet.   **Zap Marketo Webhook -> Google Sheets**
 For the first Zap, we don't rely on a custom connector for Marketo, but we leverage Marketo's Webhooks and the 'Webhooks by Zapier' Trigger. From the Zapier Dashboard click the button 'Make a new Zap'. **Trigger Part 1 in Zapier**

* Pick the 'Webhooks by Zapier' Trigger App
* Check 'Catch Hook' that allows to wait for a POST or GET to a Zapier URL
* No need to pick off a child key
* Zapier generated a custom **webhook URL** for you to send requests to, and copy it in the clipboard

**Webhook in Marketo (steps to be done by an Administrator)**

* Go to Admin -> Webhooks
* Create a new Webhook called 'Push Lead to Zapier' and edit the Webhook form.

In the template's field, declare all the Lead's fields you would like to transfer to Zapier and leverage the Marketo's tokens. For our Use Cases, we take the same fields we defined for the custom Zapier connector that push Leads to Marketo:

```json
{
"firstName":"{{lead.First Name}}",
"lastName":"{{lead.Last Name}}",
"email":"{{lead.Email Address}}",
"phone":"{{lead.Phone Number}}",
"leadOwner":"{{lead.Lead Owner First Name}} {{lead.Lead Owner Last Name}}",
"leadOwnerEmail":"{{lead.Lead Owner Email Address}}",
"leadNotes":"{{lead.Lead Notes:default=edit me}}",
"called":"{{lead.Called}}"
}
```

* Save the form
* No need for a Response Mapping, so you're done with the Webhook

**Test Campaign in Marketo (steps to be done by a Marketer or an Administrator)**

* From the Marketing Activities, create a new Smart Campaign

For testing purpose we are going to create a campaign that triggers our Webhook each time a lead status changes to MQL. Of course you can use the Webhook for any other business purpose.

* Edit the Smart List
* Call the Webhook in the Flow
* Schedule the Campaign
* Make sure each lead can run through the flow every time
* Activate the Smart Campaign

**Trigger Part 2 in Zapier**

* In order to complete the 'Webhooks by Zapier' Trigger App, we need to fire the Marketo Smart Campaign once and catch the Webhook in Zapier
* In our test case, we just need to go to Marketo Lead Database, open a lead and change its status to 'MQL'

**Create the spreadsheet in Google Sheets**

* Create a new spreadsheet
* Create a Worksheet or use the default one
* Add a column for each field that you want to synch from Marketo (the ones declared in the Marketo webhook)

  **Action in Zapier**

* Pick the App Google Sheets
* Check the option 'Create Spreadsheet Row'
* Connect to your Google Sheets account
* Select your Google Sheets spreadsheet
* Select the Worksheet
* Map all the fields between the 'Webhooks by Zapier' Trigger App and Google Sheets.

* Test the Google Sheets App
* Activate your Zap

**Zap Google Sheets -> Marketo**

 From the Zapier Dashboard click the button 'Make a new Zap'.

 **Trigger in Zapier**

* Pick the 'Google Sheets' Trigger App
* Tick the 'Updated Spreadsheet Row' that triggers when a new row is added or modified in a spreadsheet
* Connect to your Google account
* Select the Spreadsheet that you want to trigger from (should be the same one used in the previous Zap) and the Worksheet
* Set Trigger Column to 'any_column'
* Test the Google Sheets App

**Action in Zapier**

* Pick the App Marketo we just created earlier, it should display in Beta
* Choose Marketo Action 'Create_Update Lead'
* Connect to your Marketo account, filling up the authentication parameters (Munchkin Account Id, Client Id, Client Secret)
* Map the fields from Google Sheets to Marketo
* Fill-up eventually a Partition Name where your new leads should go (only if partitions exist in your Marketo Instance)
* Test the Marketo App
* Activate your Zap

### Conclusion

Here are some ideas for improvement for our Marketo connector for Zapier:

* Adding other Triggers and Actions related to diverse Marketo objects (Lists, Custom Objects, etc.)
* Instead of hard coding the fields from Marketo, it's possible to dynamically pull the fields from Marketo, but that would require some technical translation work between Marketo and Zapier.
* Sharing the connector with the development team and eventually make it generally available.

It is possible that Zapier will deploy a Premium Marketo adapter, which would make it much easier to implement our use cases. In any event, this article could always be leveraged to integrate Marketo with Zapier with a free Zapier plan, and also to build custom use cases that might not be supported by a premium adapter. We hope you enjoyed this article and that it will help you to be even more successful with Marketo and Zapier. Thank You!

Posted on _2016-04-17_ by _David_

## Spring 2016 Updates

**REST API**

* Asset API - Web Pages
  * **Landing Pages** are now exposed via fifteen new endpoints which will allowing creating, updating, deleting, cloning and draft management for landing pages. Landing Page templates now also have draft management endpoints exposed
    * Get Landing Pages
    * Get Landing Page by ID
    * Get Landing Page by Name
    * Create Landing Page
    * Update Landing Page Metadata
    * Get Landing Page Content
    * Add Landing Page Content Section
    * Update Landing Page Content Section
    * Delete Landing Page Content Section
    * Get Dynamic Content Section
    * Update Dynamic Content Section
    * Discard Landing Page Draft
    * Approve Landing Page
    * Unnaprove Landing Page Draft
    * Delete Landing Page
  * **Landing Page Templates**
    * Discard Landing Page Template Draft
    * Approve Landing Page Template
    * Unnaprove Landing Page Template
    * Delete Landing Page Template
  * **Forms** have 21 new endpoints released which provide full creation, editing and management capabilities via the API. The APIs will not support changes to Forms 1.0 forms.
    * Get Forms
    * Get Form by ID
    * Get Form by Name
    * Get Form Fields List
    * Update Form Fields List
    * Create Form
    * Get Form Thank You Page
    * Update Form Thank You Page
    * Update Form
    * Discard Form Draft
    * Approve Form
    * Unapprove Form
    * Clone Form
    * Delete Form
    * Update Form Field
    * Remove Form Field
    * Update Form Field Visibility Rules
    * Add Rich Text Form Field
    * Add Fieldset
    * Remove Field from Fieldset
    * Get Available Form Fields
    * Change Form Field Positions
    * Update Submit Button
  * When using **Get or Browse Programs**, SFDC Campaign ID will be returned for Programs which are linked to an SFDC Campaign

**Custom Objects** Custom Objects will now support Text Area datatypes, allowing for string fields of up to 2000 characters to be stored in custom object fields of this type. **IP Address Whitelisting** Admin users will now be able to manage a whitelist of IP addresses to prevent unauthorized access via the APIs. [You can read more about this feature here](https://experienceleague.adobe.com/en/docs/marketo/using/home). **Custom Activity UI** Admin users will now be able to define Custom Activity types in their admin menu, and add records to leads via the [Add Custom Activities](https://developer.adobe.com/marketo-apis/api/mapi#operation/addCustomActivityUsingPOST) API. [You can read about defining custom activity types here](https://experienceleague.adobe.com/en/docs/marketo/using/home).

Posted on _2016-06-01_ by _Kenny_

## Summer 2016 Updates

For the summer 2016 release on September 23rd, there are three developer-oriented features being released.

### Email 2.0 Support in the REST API

All [pre-existing Asset APIs](/help/rest-api/assets.md) which were only compatible with v1.0 Emails and Templates are now enabled for use with v2.0 email assets.

### Push Lead to Marketo

[Push Lead](/help/rest-api/leads.md) is an alternate lead synchronization method designed for easier triggering in Smart Campaigns. You can create a single activity log item, associate a lead, and update the lead record in one call. This works similarly to a single form fill out by a lead, and can more easily be used as a proxy method for form submission in lieu of using the existing Sync Leads method.

### HTTP Compression

The REST API can now compress responses using the standard defined by the HTTP 1.1 specification. This can help reduce the size of the response which will increase transfer speed, and minimize bandwidth utilization.  

Posted on _2016-09-23_ by _Kenny_

## Using swagger-codegen with Marketo

[Swagger-codegen](https://github.com/swagger-api/swagger-codegen) is a powerful Java library which can generate both server stubs and API clients from swagger definitions. This can dramatically ease the difficulty and cost of generating clients for any specific language. To get started and generate your first client, you'll first want to grab an instance-specific copy of one of Marketo's Swagger Definitions. Input the Munchkin ID from the instance you want to test with. Start with the identity definition. Now that you have a definition specific for your instance, you need to download and install swagger-codegen. The process is specific to your operating system, and you can get the instructions [here](https://github.com/swagger-api/swagger-codegen#prerequisites) With the default settings, codegen will output a client covering all of the provided endpoints and models. These are typically managed through a class called DefaultApi, containing methods for calling the available endpoints with examples provided in a 'docs' folder (not all languages include templates for this by default). Now let's build the first client. Create a folder where you want your code to live, and go there in your terminal session and use the generate command to build a client in the language that you want (we'll assume you've used the homebrew install method):

swagger-codegen generate -i $definitionLocation -l $yourLanguage -o $yourLocation

This will output the client code into your desired location. Now let's look at using this to call the identity endpoint and get an access token:

```java
 public static void main(String[] args){
  String client_id = args[0];
  String client_secret = args[1];
  ApiClient client = new ApiClient();
  DefaultApi id = new DefaultApi();
  try {
   String token = id.identityOauthTokenGet(client_id, client_secret, "client_credentials").getAccessToken();
   System.out.println(token);
  } catch (ApiException e) {
   e.printStackTrace();
  }
 }
```

```php
<?php
require_once(_DIR_ . '/vendor/autoload.php');

$api_instance = new Swagger\\Client\\Api\\DefaultApi();
$client_id = "client_id_example";
$client_secret = "client_secret_example";
$grant_type = "grant_type_example";

try {
    $result = $api_instance->identityOauthTokenGet($client_id, $client_secret, $grant_type);
    print_r($result->getAccessToken);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->identityOauthTokenGet: ', $e->getMessage(), "\\n";
}
?>
```

```c#
  public static void Main(string[] args)
  {
      string clientId = "CHANGE ME";
      string clientSecret = "CHANGE ME";

      IdentityApi instance = new IdentityApi();
      ResponseOfIdentity response = instance.IdentityUsingGET(clientId, clientSecret, "client_credentials");

      string message = string.Format("Access Token: {0}, Expires In: {1}, Scope: {2}, Token Type: {3}",
          response.AccessToken, response.ExpiresIn, response.Scope, response.TokenType);
      Console.WriteLine(message);
  }
```

Now that we know how to get authorized, we'll take a look into more advanced use cases of auto-generated clients in the coming weeks.

Posted on _2016-10-10_ by _Kenny_

## Excel Integration Part 1: Extract & Shape Marketo Data Using Power Query

This is the first of a series of articles that explain how to leverage the Power BI technology built into Microsoft Excel to create a true self-service business analytics experience with Marketo. With the concepts covered in these articles, you are able to:

* Import data from Marketo into Excel
* Import and combine data from other sources (SaaS applications, databases, flat files, etc.)
* Shape data for business needs and analysis purpose
* Refresh on demand the data from Excel
* Create calculated columns and measures using formulas
* Create relationships between heterogeneous data
* Analyze data and build advanced reports with Pivot Tables and Pivot Charts
* Produce stunning data visualizations

### Power Query for Excel

This first article covers the data import and shaping process using Power Query technology. Power Query is a data connection technology that enables you to discover, connect, combine, and refine data sources to meet your analysis needs. Features in Power Query are available in Excel and Power BI Desktop. Power Query can connect to many data sources such as databases, Facebook, Salesforce, MS Dynamics CRM, etc. Marketo isn't supported out of the box, but fortunately we can use Marketo REST APIs for remote execution of many of the system's capabilities, and Power Query comes with a rich set of formulas (informally known as "M") allowing you to script a custom data source.

### Custom Connector

Scripting a single REST API call is trivial with Power Query, but it becomes more challenging to handle the following requirements:

* Access token management including authentication mechanism and periodic token refresh
* Pagination mechanism for large set of data
* Error handling

This article explains how to build a robust custom connector that can consume the REST APIs of Marketo to pull all kinds of data (Leads, Activities, Custom Objects, Programs, etc.). Your only restriction is down to your Marketo API daily request limit. The concepts explained here focus on Marketo, but they could also be used to integrate other SaaS solutions that provide a REST API.

### Prerequisites

#### Power Query

Prior to the release of Excel 2016, Microsoft Power Query for Excel functioned as an Excel add-in that was downloaded and installed on Excel 2010 or Excel 2011. From Excel 2016, this technology is a native feature integrated into the 'Data' ribbon under 'Get & Transform' section. All of the scripts produced for this article have been tested on Excel 2016 for Windows. The concepts should be the same for Excel 2013 or Excel 2010 but some adaptations could be required.  Power Query is currently only available on the Microsoft Windows version of Excel; the Mac version is unfortunately not supported.

#### Marketo

Power Query will use the Marketo REST APIs to access data from Marketo. In order to use these APIs, you need an API User and a Custom Service that you can create yourself if you are administrator of your Marketo instance. If not, then an administrator will need to provide those to you. A step by step explanation of how to create the Marketo API User and the Custom Service can be found [here](/help/rest-api/custom-services.md). Once you're done, you should have the following credentials to invoke the Marketo REST APIs: **Client Id** and **Client Secret**. The **REST API Endpoint** can be found in the REST API section of the Web Services Admin in Marketo and it should have the following pattern:

`<https://XXX-XXX-XXX.mktorest.com/rest>`

Marketo has a Daily Request Limit for its API and this limit can be found in the Web Services Admin along with a consumption report. **Make sure to never exceed your daily limit when you design your queries as you may miss some data in your reports**.

### Power Query Workbook Creation

Let start with a new Excel workbook. We create a specific configuration worksheet for declaring all the Marketo REST API Settings. In this worksheet, we create three tables:

 Table '**REST_API_Authentication**' with the columns: **URL**: your Marketo REST API Endpoint. **Client ID**: from your Marketo REST API OAuth2.0 credential. **Client Secret**: from your Marketo REST API OAuth2.0 credential.
Table '**Scoping**' with the columns: **Paging Token SinceDatetime**: a date following the ISO 8601 standard date notation (for example "2016-10-06T13:22:17-08:00," "2016-10-06" are valid date/time) that is used to fetch Marketo activities since a given period, thanks to an initial 'date-based' paging token. This date is mainly used to limit the amount of data to import into the workbook. **List ID**: the ID of a static list in Marketo that reference all the leads/contacts we are dealing with. This static list can be managed freely in Marketo (e.g. a smart campaign can feed it periodically or in real time with leads and contacts).
In order to get the ID of a static list, open it in Marketo and get its numerical ID from the URL, e.g. `<https://myorg.marketo.com/#ST3517A1LA1>`, List ID=3511. **Max Records Pages**: this is used for our pseudo-recursive algorithms that iterate through the Marketo output data, using 'position-based' paging tokens, with a capacity of 300 max records per page. Since this is our interest to get as many records per page as possible, we'll stick to 300. So typically a Max Records Pages set to 33.333 means a capacity of 33.333 X 300 = 9.9999 million records; but it also means 33.333 K on your Marketo API Daily Request Limit. The algorithms will stop anyway as soon as all data from the queries are obtained, so this parameter is just a safety limit for a loop.

Table `Leads` with the column: **Lead Fields**: comma separated lead fields to gather from Marketo when querying the leads and contacts. Declaring a table in Excel is simple. Enter two rows in the spreadsheet with the columns names and values, highlight with the mouse the perimeter of the table, and select the icon Table in the 'Insert' menu, and then give it a name. The names given to the tables and their columns are important as they will be called directly by our scripts.

## Authentication and Access Token

### About Marketo REST API Authentication

Marketo's REST APIs are authenticated with 2-legged OAuth 2.0. Client IDs and Client Secrets are provided by custom services that you define. Each custom service is owned by an API-Only user which has a set of roles and permissions which authorize the service to perform specific actions. An access token is associated with a single custom service.
The full Authentication mechanism is documented [here](/help/rest-api/authentication.md) on the Marketo Developer site. When an access token is originally created, its lifespan is 3600 seconds or 1 hour. Each consecutive authentication call for the same custom service returns the current access token with its remaining lifespan. Once the token is expired, the authentication returns a brand new access token. Managing access token expiration is important to ensure that your integration works smoothly and prevents unexpected authentication errors from occurring during normal operation.

#### Create Query

Create a new query by clicking the 'New Query' icon from the 'Get&Transform' section of the 'Data' Menu. Select a blank query to start with and give it a name such as 'MktoAccessToken'. Launch the Advanced Editor from the Query Editor, so you can script manually some Power Query formulas. Enter the following code in the advanced editor:

```
let
    // Get url and credentials from config worksheet - Table REST_API_Authentication
    mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],
    clientIdStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[Client ID],
    clientSecretStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[Client Secret],

    // Calling Marketo API Get Access Token
    getAccessTokenUrl = mktoUrlStr & "/identity/oauth/token?grant_type=client_credentials&client_id=" & clientIdStr & "&client_secret=" & clientSecretStr,
    TokenJson = try Json.Document(Web.Contents(getAccessTokenUrl)) otherwise "Marketo REST API Authentication failed, please check your credentials",

    // Parsing access token
    accessTokenStr = TokenJson [access_token]

in
    accessTokenStr
```

The comments embedded in the source code, preceded by "//" make the code self-explanatory. If you need any function reference, please check out the links provided in the Reference section of this article. Click the button "Done". Check that the Access token is displayed successfully in output for the final applied step 'accessTokenStr'.  One quick comment about the security in Excel; you may be asked occasionally to enable External Data Connections from the yellow banner. This is required to let the Queries work properly.

#### Converting a Query into a Function

Return to the advanced Editor and wrap your code with the following function declaration:

```
let
    FnMktoGetAccessToken =()=>

        let
            // Get url and credentials from config worksheet - Table REST_API_Authentication
            mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],
            clientIdStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[Client ID],
            clientSecretStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[Client Secret],

            // Calling Marketo API Get Access Token
           getAccessTokenUrl = mktoUrlStr & "/identity/oauth/token?grant_type=client_credentials&client_id=" & clientIdStr & "&client_secret=" & clientSecretStr,
           TokenJson = try Json.Document(Web.Contents(getAccessTokenUrl)) otherwise "Marketo REST API Authentication failed, please check your credentials",

            // Parsing access token from Json
           accessTokenStr = TokenJson [access_token]

        in
            accessTokenStr

in FnMktoGetAccessToken
```

The function does not take any parameters in input but get those from the configuration worksheet. It produces the access token as an output. Rename your query `FnMktoGetAccessToken` and save it. Note that you can see all your queries at any time in Excel by clicking the button 'Show Queries' in the 'Get & Transform' section of the Data menu. Your function should now be marked with the function icon 'Fx'.

### Load Members of Static List

#### Get Leads

The Marketo Lead API provides simple CRUD operations against lead records, the ability to modify a lead's membership in static lists and programs, and initiate Smart Campaign processing for leads. All these capabilities are documented [here](/help/rest-api/leads.md). A large set of lead records can be retrieved based on membership in a static list or a program. Using the id of a static list, you can retrieve all lead records which are members of that static list. The id of the list is a path parameter in the call. See the chapter "List and Program Membership" in the Marketo Developers documentation for details. The maximum number of lead records we can get per API call is 300, so we need to leverage paging tokens to gather the records per pages of 300 records. We get the paging token in the Json answer after the first call and we know we're done when the paging token is not in the output anymore.

### Basic Query

Let's get started with a fully functioning query aimed at downloading all the leads from a static list. Create a new blank query called 'MktoLeads' and enter the following code in the advanced editor:

```
let
    // Get Url from config worksheet - Table REST_API_Authentication
    mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],
    // Get the number of iterations (pages of 300 records) - Table Scoping
    iterationsNum = Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[Max Records Pages],
    // Get the List id - Table Scoping
    listIdStr = Number.ToText(Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[List ID], "D", ""),
    // Get the Lead fields to extract - Table Leads
    LeadFieldsStr = Excel.CurrentWorkbook(){[Name="Leads"]}[Content]{0}[Lead Fields],


    // Build Multiple Leads by List Id URL
    getMultipleLeadsByListIdUrl = mktoUrlStr & "/rest/v1/list/" & listIdStr & "/leads.json?fields=" & LeadFieldsStr,

    // Build Marketo Access Token URL parameter
    accessTokenParamStr = "&access_token=" & FnMktoGetAccessToken(),

    pagingTokenParamStr = "",

    // Function iterating though the pages
    FnProcessOnePage =
    (accessTokenParamStr, pagingTokenParamStr) as record =>
        let

            // Send REST API Request
            content = Web.Contents(getMultipleLeadsByListIdUrl & accessTokenParamStr & pagingTokenParamStr),

            // Recover Json output and watch if token is expired, in that case, regenerate access token
            newAccessTokenParamStr = if Json.Document(content)[success]=true then accessTokenParamStr else "?access_token=" & FnMktoGetAccessToken(),
            getMultipleLeadsByListIdJson = if Json.Document(content)[success]=true then Json.Document(content) else Json.Document(Web.Contents(getMultipleLeadsByListIdUrl & newAccessTokenParamStr & pagingTokenParamStr)),

            // Parse Json outputs: data and next page token
            data = try getMultipleLeadsByListIdJson[result] otherwise null,
            next  = try  "&nextPageToken=" & getMultipleLeadsByListIdJson[nextPageToken] otherwise null,
            res = [Data=data, Next=next, Access=newAccessTokenParamStr]
        in
            res,

    // Generates a list of values given four functions that generate the initial value initial, test against a condition, and if successful select the result and generate the next value next. An optional parameter, selector, may also be specified
    GeneratedList =
        List.Generate(
            ()=>[i=0, res = FnProcessOnePage(accessTokenParamStr, pagingTokenParamStr)],
            each [i]<iterationsNum and [res][Data]<>null,
            each [i=[i]+1, res = FnProcessOnePage([res][Access],[res][Next])],
            each [res][Data])
in
    GeneratedList
```

Power Query does not offer traditional looping functions (e.g. For-loop, While-loop) and does not support recursion. A good workaround is to implement a For-loop using List.Generate. This function is documented [here](https://msdn.microsoft.com/query-bi/m/list-generate). With List. Generate it's possible to iterate over the pages. At each step of the iteration we extract a page of data, keeping the URL that includes the paging token for the next page, and store the results in the next item of the generated list. The blog from [Datachant](https://datachant.com/2016/06/27/cursor-based-pagination-power-query/) was a great resource for solving this. Our parameter 'Max Records Pages' is here to limit the number of pages and restrict it to a realistic range avoiding an infinite loop. Another challenge is to ensure that the access token is never expired. Tracking its remaining lifespan would be too complex with Power Query. So all calls to the REST API are backed up with an error check; if an error occurs, we assume the token has expired and we renew it first and replay the call again. If the second call fails, then the second failure will be notified to Excel (in the worst case, you get no data as a result). Launch the query, after saving it or by clicking the 'Refresh button' at any time.  In our case, 1364 lead records were extracted fitting in 5 pages of data within 5 lists.

### Shaping the Data

We need to shape the data to have all these records in a single flat list of records. There are two ways to do this:

* Using more code
* Leverage the Power Query UI

Right click on the output grid and choose 'To Table' in the contextual menu to convert it to a table of lists.  In the 'To Table' pop-up, leave the default values in the 2 picklists.  Now expand the resulting table of lists. Now we have all the records in a single list. The records encoded in Json format contain the fields and their associated values. Expand again. Select in the pop-up all the fields that you want to keep, uncheck the tick box 'Use original column name as prefix'.  Et voila! All records are displayed nicely in our table. If we re-open the advanced editor, we can see that 3 lines of code have been added to shape our data:

```
# "Converted to Table" = Table.FromList(GeneratedList, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
# "Expanded Column1" = Table.ExpandListColumn(#"Converted to Table", "Column1"),
# "Expanded Column2" = Table.ExpandRecordColumn(#"Expanded Column1", "Column1", {"id", "updatedAt", "lastName", "email", "createdAt", "firstName"}, {"id", "updatedAt", "lastName", "email", "createdAt", "firstName"})
```

You can do much more with Power Query, like creating extra columns with computed values, we'll see some more possibilities later on. Let's save and close this query. It can now be refreshed manually at any time or automatically via background refreshes.

### Redirecting the Results

Now the question is, where to send the result data? Hover over your query with the mouse and select the menu 'Load To…' in the contextual menu. In the popup, then you can select:

* 'Table' if you want to send all the shaped data to a worksheet (new or existing one),
* 'Only Create Connection' if your goal is to do further analysis in the Power Pivot.

The check box 'Add this to the Data Model allows you to exploit the data in the Power Pivot; this is what we want for the second part of this article.

### Managing Pagination

Since the aim of our project is to build many more queries, let's do some refactoring and extract a reusable function that would manage the pagination. Create a new blank query called **FnMktoGetPagedData** and enter the following code in the advanced editor:

```
let
    FnMktoGetPagedData =(url, accessTokenParamStr, pagingTokenParamStr)=>

    let

        // Get the number of iterations (pages of 300 records) - Table Scoping
        iterationsNum = Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[Max Records Pages],

        // Sub-function iterating though the REST API service result pages
        FnProcessOnePage =
        (accessTokenParamStr, pagingTokenParamStr) as record =>
            let

                // Send REST API Request
                content = Web.Contents(url& accessTokenParamStr & pagingTokenParamStr),

                // Recover Json output and watch if token is expired, in that case, regenerate access token
                newAccessTokenParamStr = if Json.Document(content)[success]=true then accessTokenParamStr else "?access_token=" & FnMktoGetAccessToken(),
                contentJson = if Json.Document(content)[success]=true then Json.Document(content) else Json.Document(Web.Contents(url & newAccessTokenParamStr & pagingTokenParamStr)),

                // Parse Json outputs: data and next page token
                data = try contentJson[result] otherwise null,
                next  = try  "&nextPageToken=" & contentJson[nextPageToken] otherwise null,
                res = [Data=data, Next=next, Access=newAccessTokenParamStr]
            in
                res,

        // Generates a list of values given four functions that generate the initial value initial, test against a condition, and if successful select the result and generate the next value next. An optional parameter, selector, may also be specified
        GeneratedList =
            List.Generate(
                ()=>[i=0, res = FnProcessOnePage(accessTokenParamStr, pagingTokenParamStr)],
                each [i]<iterationsNum and [res][Data]<>null,
                each [i=[i]+1, res = FnProcessOnePage([res][Access],[res][Next])],
                each [res][Data])
    in
        GeneratedList

in FnMktoGetPagedData
```

Save the query. We are going to use it next.

### Simplified Query

Let's rewrite again our query 'MktoLeads' which will be calling the **FnMktoGetPagedData** function.

```
let
    // Get Url from config worksheet - Table REST_API_Authentication
    mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],
    // Get the List id - Table Scoping
    listIdStr = Number.ToText(Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[List ID], "D", ""),
    // Get the Lead fields to extract - Table Leads
    LeadFieldsStr = Excel.CurrentWorkbook(){[Name="Leads"]}[Content]{0}[Lead Fields],


    // Build Multiple Leads by List Id URL
    getMultipleLeadsByListIdUrl = mktoUrlStr & "/rest/v1/list/" & listIdStr & "/leads.json?fields=" & LeadFieldsStr,

    // Build Marketo Access Token URL parameter
    accessTokenParamStr = "&access_token=" & FnMktoGetAccessToken(),

    // No initial paging token required for this call
    pagingTokenParamStr = "",

    // Invoke the multiple REST API calls through the FnMktoGetPagedData function
    result = FnMktoGetPagedData (getMultipleLeadsByListIdUrl , accessTokenParamStr, pagingTokenParamStr)

in
    result
```

As you can see, our query is now really simple to read and to maintain. We are going to leverage again the **FnMktoGetPagedData** function for the other queries.

### Load Specific Activities from a Defined Period of Time

#### get Activities with pagination

Marketo permits a huge variety of activity types related to lead records. Nearly every change, action or flow step is recorded against a lead's activity log and can be retrieved via the API or leveraged in Smart List and Smart Campaign filters and triggers. Activities are always related back to the lead record via the leadId, corresponding to the Id of the record, and also have a unique integer id of its own. You find the complete REST API documentation [here](/help/rest-api/activities.md).

There are a very large number of potential activity types, which may vary from subscription to subscription, and have unique definitions for each. While every activity will have its own unique id, leadId and activityDate, the primaryAttributeValueId and primaryAttributeValue will vary in their meaning. We are going to focus on the Interesting Moments, one kind of Marketo tracked activities with the ID 41. The new challenges that we are going to resolve are:

* We need to initiate a 'date-based' paging token to define the period of time when the activities happened,
* Shaping the data is a bit trickier as depending on the activity types, a list of activity-specific attributes is provided in Json and need to be parsed and flattened out to ease up the analysis.

#### Date Based Paging Token

We need to build first this function to generate the initial 'date-based' paging token, required to scope the period of time for our Activity queries. You find the documentation about the paging token [here](/help/rest-api/paging-tokens.md). Create a new blank query called **FnMktoGetPagingToken** and enter the following code in the advanced editor:

```
let
    FnMktoGetPagingToken =(accessTokenStr)=>

        let
            // Get url from config worksheet - Table REST_API_Authentication
            mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],

            // Get Paging Token SinceDatetime from config worksheet - Table Scoping
            mktoPTSinceDatetimeStr = DateTime.ToText(Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[Paging Token SinceDatetime], "yyyy-MM-ddThh:mm:ss"),

            // Building URL for API Call
            getPagingTokenUrl = mktoUrlStr & "/rest/v1/activities/pagingtoken.json?access_token=" & accessTokenStr & "&sinceDatetime=" & mktoPTSinceDatetimeStr,

            // Calling Marketo API Get Paging Token
            content = Web.Contents(getPagingTokenUrl),

            // Recover Json output and watch if access token is expired, in that case, regenerate it
            newAccessTokenStr = if Json.Document(content)[success]=true then accessTokenStr else "?access_token=" & FnMktoGetAccessToken(),
            pagingTokenJson = if Json.Document(content)[success]=true then Json.Document(content) else Json.Document(Web.Contents(mktoUrlStr & "/rest/v1/activities/pagingtoken.json?access_token=" & newAccessTokenStr & "&sinceDatetime=" & mktoPTSinceDatetimeStr)),

            // Parsing Paging Token
            pagingTokenStr = pagingTokenJson[nextPageToken]

        in
            pagingTokenStr

in FnMktoGetPagingToken
```

Save the function. We are going to use it next.

#### Interesting Moments Activities

Let's now write the query 'MktoInterestingMomentsActivities' which will be calling the **FnMktoGetPagedData** and **FnMktoGetPagingToken** functions.

```
let

    // Get Url from config worksheet - Table REST_API_Authentication
    mktoUrlStr = Excel.CurrentWorkbook(){[Name="REST_API_Authentication"]}[Content]{0}[URL],
    // Get the List id - Table Scoping
    listIdStr = Number.ToText(Excel.CurrentWorkbook(){[Name="Scoping"]}[Content]{0}[List ID], "D", ""),

    // Build Get Activities URL
    getActivitiesUrl = mktoUrlStr & "/rest/v1/activities.json?ListId=" & listIdStr & "&activityTypeIds=46",

    // Build Marketo Access Token URL parameter
    accessTokenStr = FnMktoGetAccessToken(),
    accessTokenParamStr = "&access_token=" & accessTokenStr,

    // Obtain date-based paging token used to scope in time the activities
    pagingTokenParamStr = "&nextPageToken=" & FnMktoGetPagingToken(accessTokenStr),

    // Invoke the multiple REST API calls through the FnMktoGetPagedData function
    result = FnMktoGetPagedData (getActivitiesUrl , accessTokenParamStr, pagingTokenParamStr)

in
    result
```

The result of this query is again a list of lists, so it needs some further data processing to be usable for analysis.

### Shaping the Data

Let's do the same shaping operations we did for the Leads:

* Right click on the output grid and choose 'To Table' in the contextual menu to convert it to a table of lists,
* Expand the resulting table of lists,
* Expand one more time, selecting in the pop-up all the fields you want to keep (uncheck the tick box 'Use original column name as prefix').

You can see the columns with their values, except the column 'attributes' that still contain a list of specific attributes associated with the interesting moments. Let's expand these attributes. Now the list has expanded into records, we expand again, selecting the fields we want (name and value of each attribute) and we uncheck the tick box 'use original column name as prefix'.  As a result, all our data are visible, including attributes, but each interesting moment activity is spanned over 3 lines. This is going to be hard to use for our analysis.  Ideally we want just one line per activity, with all attributes displayed as extra columns. We can easily do that by pivoting the 3 attributes from our table. Select the 2 columns 'Name' and 'Value' from the activity attributes and click on 'Pivot Column' in the 'Transform' menu. Ask for the advances options in the pop-up and select 'Values Column' = value and 'Don't aggregate' value function.  Click 'OK' and you have to output one single line of data per activity.  The following 'data shaping' lines of code should have been appended automatically to the script of your query:

```
  #"Converted to Table" = Table.FromList(result, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandListColumn(#"Converted to Table", "Column1"),
    #"Expanded Column2" = Table.ExpandRecordColumn(#"Expanded Column1", "Column1", {"id", "leadId", "activityDate", "activityTypeId", "campaignId", "primaryAttributeValue", "attributes"}, {"id", "leadId", "activityDate", "activityTypeId", "campaignId", "primaryAttributeValue", "attributes"}),
    #"Expanded attributes" = Table.ExpandListColumn(#"Expanded Column2", "attributes"),
    #"Expanded attributes1" = Table.ExpandRecordColumn(#"Expanded attributes", "attributes", {"name", "value"}, {"name", "value"}),
    #"Pivoted Column" = Table.Pivot(#"Expanded attributes1", List.Distinct(#"Expanded attributes1"[name]), "name", "value")
in
    #"Pivoted Column"
```

### Next Steps

You should be able now to design all the queries you need to access any specific Marketo data available through its REST APIs. We hope you enjoyed this article and that it helped you to leverage the great benefits of Excel and Marketo combined. A sample workbook with all queries is also provided in the second article.

### References

#### Power Query

* [Power Query – Overview and Learning](https://support.microsoft.com/en-us/article/Power-Query-Overview-and-Learning-ed614c81-4b00-4291-bd3a-55d80767f81d)
* [Power Query Formula Reference](https://msdn.microsoft.com/query-bi/m/power-query-m-reference)
* Matt Masson Blog provides some good resources about Power Query
* [DataChant Blog](https://datachant.com/2016/06/27/cursor-based-pagination-power-query/) is very useful for the implementation of the pagination mechanism

Posted on _2016-10-18_ by _Philippe_

## Fall 2016 Updates

In the Fall 2016 release, we are adding CRUD support for Email v2 variables and modules, and CRUD support for Named Accounts. You will now be able to locally read and edit the content using Marketo REST APIs, as well as move, reorder and delete them. See the full list of updates below:

### Lead Database APIs

* [**Named Accounts**](/help/rest-api/named-accounts.md)
  * New endpoints for reading, updating, and deleting Named Accounts
  * Known Issues:
    * As of the Fall 2016 release, leads cannot be associated with named accounts via the API

### Asset APIs

* [**Email**](https://developer.adobe.com/marketo-apis/api/asset#operation/describeUsingGET_5)
  * New endpoints for manipulating Email v2 variables
  * New endpoints for manipulating Email v2 modules
  * Known Issues:
    * Queries and updates for sections that contain predictive tokens will return an error
    * Emails with content sections that contain predictive tokens may not be approved using the API

Posted on _2016-12-07_ by _Kenny_

## Why We Retired @MarketoDev Twitter Handl3

We have decided to retire the @MarketoDev handle on Twitter. The account will be deactivated on December 9th, 2011. Curious why? **Rewind back to early 2014...** We had just launched the Marketo Developers Site to help developers build against our APIs. We wanted to increase awareness of the Marketo platform, and to lower barriers to entry for developers. In conjunction with that effort we created @MarketoDev to engage with our technology partners and customers that were inclined to build integrated solutions with Marketo. Like any brave new undertaking, we weren't sure how this would play out. Initially we tweeted new blog posts and new API releases. Things were good; traffic to the Developers Site went up! We also started to receive an assortment of questions, which we dutifully answered. **Fast forward to late 2016...** As the [LaunchPoint Partner](https://exchange.adobe.com/apps/browse/ec?product=MRKTO) ecosystem grew, the amount of tweet activity increased. Responding to the volume of questions posted to @MarketoDev had became a large job for our small team. We received an increasing amount of general product, and sales related questions, which we redirected to @Marketo or @MarketoCares. We also had found that 140 characters were simply not enough for development-related questions. Answering these often led to lengthy and involved threads of conversation, an approach that did not scale. And finally, we analyzed the traffic sources for visitors to the Developers Site and found that the majority come from organic search, and the "Subscribe Now" functionality on our blog. For these reasons, we decided to pull the plug on @MarketoDev. **From here on out...** If you are a Twitter fan (and who isn't), fear not! Our corporate Twitter handle @Marketo lives on; as does our customer support handle @MarketoCares.

Posted on _2016-12-02_ by _David_

## Excel Integration Part 2: Build Advanced Marketo Reports and Data Visualizations Using Power Pivot and Power View-

This is the second in a series of two articles that explain how to leverage the Power BI technology built into Microsoft Excel to create a true self-service business analytics experience with Marketo. With the concepts covered in these articles, you are able to:

* Import data from Marketo into Excel
* Import and combine data from other sources (SaaS applications, databases, flat files, etc.)
* Shape data for business needs and analysis purposes
* Refresh data on demand within Excel
* Create calculated columns and measures using formulas
* Create relationships between heterogeneous data
* Analyze data and build advanced reports with Pivot Tables and Pivot Charts
* Produce stunning data visualizations

### Power Pivot and Power View for Excel

In this article, we provide examples of how to build the following:

* Advanced Marketo reports that leverage relationships between different collections of Marketo data using Power Pivot
* Cool static and animated visualizations using Power View

**Power Pivot** is an Excel add-in, already included in Excel 2016, which you can use to perform powerful data analysis and create sophisticated data models. With Power Pivot, you can mash up large volumes of data from various sources, perform information analysis rapidly, and share insights easily. Data extracted from different data sources with Power Query can be sent to the data model, to the Excel spreadsheet, or to both. In the first article, we imported and shaped data from Marketo and sent it to the data model to perform more sophisticated analysis prior to making it available on the spreadsheet. **Power View** is an alternative to the Excel visualization layer. It is an interactive data exploration, visualization, and presentation experience that encourages intuitive ad-hoc reporting and dashboarding.

All of the steps explained in this article have been tested on Excel 2016 for Windows. The concepts should be the same for Excel 2013 or Excel 2010 (without Power View) but some adaptations could be required. Power Pivot and Power View are currently only available on the Microsoft Windows version of Excel 2016, the Office 365 version of Excel 2016 does not support fully Power Pivot and Power View.

### The Marketo Power Workbook

#### Download Workbook

In the first article, we covered the data import and shaping process using Power Query technology. We learned how to implement some advanced power queries to extract leads and activities from Marketo. Because some of you would want to jump directly to the point where they build reports and visualizations, without coding. This workbook contains all the queries detailed in the first article and a few more. We improved the error handling and added some extra parameters in the configuration worksheet. If you went through the first article, we still recommend you to download the Marketo Power Workbook and check out what has been added.

Disclaimer: The Marketo Power Workbook is not an official Marketo Product, and therefore is not supported by Marketo. Feel free to use and expand for your personal business needs, but do so at your own risk.

#### Configure Workbook

Fill in all of the required information from the Marketo configuration worksheet:

* **Marketo REST API Authentication:** required
* **Scoping:** set the Paging Token SinceDatetime and the Id of your Marketo static list containing all the leads that you want to analyze
* **Leads:** for the reports to come, you must at least specify the following Lead fields: `id`, `firstName`, `lastName`, `email`, create`edAt`, `updatedAt`, `title`, `company`, `industry`, `inferredCountry`, `inferredCity`
  * If the city information is more accurate in one of your custom fields, then you can use your own field instead
* **Activities:** Activity types to fetch from the Marketo database are specified here for each Activity set, no need to change this now.
  * Note that we provided a utility query on the workbook that lists, right in the Excel workbook, all the existing Activity types if you want to adjust this information later on

Note that you may see some security related pop-ups. Trust external connections and set them to 'Public'. If you see the pop-up below, stay with 'Anonymous' web access content. The authentication to Marketo is directly managed by our custom queries, so no need to enable any other kind of access.

#### Download Marketo Data

Make sure first that the parameter you define in the Scoping area of the Marketo configuration worksheet will not result in downloading too much data, exceeding your Marketo API daily request limit. When ready, click the 'Refresh All' button from the 'Data' menu and wait that all the data is downloaded into the workbook. If formatting error messages are displayed when downloading the data, similar to 'column1 not found', that means one or more queries are failing to get the data, so the formatting is also failing. Try again later on, if the error persists, then check your version of Excel (do not use Excel 2016 from Office 365). It is also important to respect the latency from the Marketo platform. If you do any changes in a static list, or in your lead data, then it is preferable to wait before launching the Power Queries.

### Data Modeling in Power Pivot

Open Power Pivot by clicking the 'Manage' button from the Power Pivot menu, available in the top menu bar (if not available check your version of Excel, Power Pivot can be installed as an add-in in some versions of Excel). All the data downloaded from Marketo and sent to the data model should be accessible from the different tabs at the bottom of the Power Pivot window.

### Data Analysis Expressions (DAX)

We need to enrich or reformat the data for some reports. Let's use Power Pivot Data Analysis Expressions (DAX) to define some custom calculations as calculated columns and measures (also known as calculated fields). See the 'DAX in Power Pivot' link in the References section to learn more about DAX. Make sure the Calculation Area is is shown in the Power Pivot window; if not, enable it from the Power Pivot Home menu.  Select the **MktoLeads** tab and add the **Leads Count** measure anywhere in the Leads Calculation Area: **Leads Count:=**DISTINCTCOUNT**([id])**. This measure is counting the distinct leads available in the list, based on their id. It would also take into account the eventual filters in place in the context of a report. This measure is not really necessary since the reports are capable of summing up the number of leads but we did it to have a lead count with a nicer name than 'sum of MktoLeads'. It is also a simple example that lets you easily imagine some more complex measures doing averages, min, max for a specific type of data entry (e.g. all the leads with a score higher than 50, average score, etc. …).  Now let's select the **MktoWebActivities** tab and create three calculated columns. Insert the following calculated columns by scrolling to the far right of the table and by clicking the column 'Add Column'. **Activity:** Obtain the user-friendly Activity label by looking up the Activity Id in the table MktoActivtyTypes. **\=**LOOKUPVALUE**(MktoActivityTypes[name],MktoActivityTypes[id],[activityTypeId])** **Year-Month:** reformat the Activity date with a pattern 'YYYYmm' that is more suitable for some reports. **\=**LEFT**([activityDate],4)&**MID**([activityDate],6,2)** **Date:** Activity Date is just a String from our original query, transform it to a proper date. **\=**DATE**(**LEFT**([activityDate],4),**MID**([activityDate],6,2),**MID**([activityDate],9,2))** Now let's create the three same measures for the **MktoEmailActivities** tab, and 2 additional ones:  **Campaign:** Obtain the user-friendly Campaign name by looking up the Campaign Id in the table MktoCampaigns. **\=**LOOKUPVALUE**(MktoCampaigns[name],MktoCampaigns[id],[campaignId])** **Program:** Obtain the user-friendly Program name by looking up the Campaign Id in the table MktoCampaigns. The table MktoPrograms can provide more details about the Program such as folder, workspace, etc. **\=**LOOKUPVALUE**(MktoCampaigns[programName],MktoCampaigns[id],[campaignId])**

### Entity-Relationships

We saw previously a way to lookup information from another table within the model to complete some missing information. Power Pivot offers a more powerful option to define the relationships between some tables of the data model, allowing us to leverage those relationships directly from the reports. Let define the key relationships for our reports. Select the Diagram View from the Power Pivot window. Trace the following relationships within the Data model diagram:

* **MktoInterestingMomentActivities:leadId →** **MktoLeads:id**
* **MktoScoringActivities:leadId →** **MktoLeads:id**
* **MktoRevenueStageActivities:leadId →** **MktoLeads:id**
* **MktoWebActivities:leadId →** **MktoLeads:id**
* **MktoEmailActivities:leadId →** **MktoLeads: id**

We'll not use all of these relationships and objects in our reports, only the Leads, Web Activities and Email Activities. Now it's time to build some reports.

### Emails Performance Pivot Chart

This first report is showing email performance KPIs based on a standard Excel Pivot Chart. It allows us to filter data by Industry and/or Campaign. You can create a Pivot Chart right from the Power Pivot menu by selecting 'Pivot Chart' from the 'Pivot Table' selector.  An alternative is to create a Pivot Chart directly from the Excel spreadsheet, ticking the option 'Use this workbook's Data Model'.  Drag and drop the fields from the **MktoEmailActivities** and the **MktoLeads** tables, like the figure below: **MktoEmailActivities.Activity →** **Legend** (this use the DAX calculated column we implemented on **MktoEmailActivities** earlier) **MktoEmailActivities.Date →** **Axis** (this use the DAX calculated column we implemented on **MktoEmailActivities** earlier) **MktoEmailActivities.Id →** **∑ Values** **MktoEmailActivities.Campaign →** **Filter** **MktoLeads.industry →** **Filter**

You can create a custom name by selecting 'Value Field Settings' on each dropped field. In this case, we dropped the Email Activity id field into the '∑ Values' section and edited its custom name as 'Number of Activities'. Now let's configure the Pivot Chart. Right click directly on the chart and select the 'Change Chart Type' option in the contextual menu. And this is how we selected the different chart type for all data series.

### Leads Map with Power View

The second report displays your Leads and Contacts by geography on a world map and by Industry. We need Power View for this report. Please follow the reference link below to turn on the menu in Excel. Or you can just type 'power view' in the Excel search box. Select 'Insert a Power View Report'.  On the blank Power View report, select the **MktoLeads** table on the right panel and drag & drop the lead location field (e.g. **inferredCity**). Now the menu 'Design' appear in the main menu.

Switch to the Map visualization by selecting 'Map' in the Power View 'Design' menu. Drag and drop the fields from the **MktoLeads** table, like the figure below: **MktoLeads.industry →** **Color** **MktoLeads.inferredCity →** **Locations** **MktoLeads.Leads Count →** **∑ Size** (this use the DAX measure we implemented on **MktoLeads** earlier) And your Leads map is ready! You just need to adjust the size of the map, customize the title and legends. Power View allows you to build advanced dashboards with multiple graphs on one single spreadsheet. Check out the referenced tutorial below '[Create Amazing Power View Reports](https://support.microsoft.com/en-us/article/Tutorial-Create-Amazing-Power-View-Reports-Part-1-e2842c8f-585f-4a07-bcbd-5bf8ff2243a7)' to see how to proceed with more dashboard components with Power View.

### Web Activities Animated on a 3D Map

This third report displays your Lead web activities, by industry, on a 3D world map. We need a 3D Map for this report. Just type '3D' in the Excel search box and select '3D Map'. Create a new tour from the pop-up window.  Select the Bubble Chart on the right panel. Drag and drop the fields, from the **MktoLeads** and the **MktoWebActivities** tables, like the figure below: **MktoLeads.industry →** **Category** **MktoLeads.inferredCity →** **Location** **MktoWebActivities.Activity →** **Time** (this use the DAX calculated column we implemented on **MktoWebActivities** earlier. The id field could also be used for counting activities.) **MktoWebActivities.Date →** **Time** (this use the DAX calculated column we implemented on **MktoWebActivities** earlier) **MktoWebActivities.Activity** can also be used as a filter to filter out the different types of web activities.

 Use the 'Themes' button to change the color scheme of your 3D Map. Open the 'Scene Options' to customize your animations.
 And you're done with the 3D World Map, now you can have fun animating the globe and creating video from it.

### Next Steps

We just scratched the surface of what is possible to do with the Excel Power BI tools. We recommend you to search the web for other great articles and tutorials to expand your Excel skills and design the reports you need to achieve your business goals. We hope you enjoyed these articles and that they helped you leverage the great benefits of Excel and Marketo combined.

### References

#### Power Pivot

* [Power Pivot: Powerful data analysis and data modeling in Excel](https://support.microsoft.com/en-us/article/Power-Pivot-Powerful-data-analysis-and-data-modeling-in-Excel-d7b119ed-1b3b-4f23-b634-445ab141b59b)
* [Data Analysis Expressions (DAX) in Power Pivot](https://support.microsoft.com/en-us/article/Data-Analysis-Expressions-DAX-in-Power-Pivot-bab3fbe3-2385-485a-980b-5f64d3b0f730)

#### Power View

* [Turn-on Power View in Excel 2016](https://support.microsoft.com/en-us/article/Turn-on-Power-View-in-Excel-2016-for-Windows-f8fc21a6-08fc-407a-8a91-643fa848729a)
* [Tutorial: Create Amazing Power View Reports](https://support.microsoft.com/en-us/article/Tutorial-Create-Amazing-Power-View-Reports-Part-1-e2842c8f-585f-4a07-bcbd-5bf8ff2243a7)

Posted on _2017-02-02_ by _Philippe_

## Important Change to Activity Records in Marketo API

**Note: This post will be updated to reflect changes made to activity records returned by the API due to migration to new infrastructure.** **Last Update: September 13, 2018** With the rollout of Marketo's next-generation Activity Service beginning in September 2017, we will be unable to enforce the uniqueness or presence of the integer "id" field in activities, data value changes, or lead deletion records returned by Marketo's APIs. To avoid service disruptions for integrations which retrieve activity records, the id field should be treated as optional. Cutover of this change will begin to affect subscriptions and upcoming release. This change will affect the following endpoints: REST API

The affected SOAP types are `ActivityRecord` and `LeadChangeRecord`.

### Examples

The following examples show the record types which will be affected. In both examples, the effected field is called "id."

**Example REST Field: id**

```json
  {
      "id" : 102988,
      "leadId" : 1,
      "activityDate" : "2015-01-16T23:32:19Z",
      "activityTypeId" : 1,
      "primaryAttributeValueId" : 71,
      "primaryAttributeValue" : "localhost/munchkintest2.html",
      "attributes" : [
          {
              "name" : "Client IP Address",
              "value" : "10.0.19.252"
          },
          {
              "name" : "Query Parameters",
              "value" : ""
          },
          {
              "name" : "Referrer URL",
              "value" : ""
          },
          {
              "name" : "User Agent",
              "value" : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
          },
          {
              "name" : "Webpage URL",
              "value" : "/munchkintest2.html"
          }
      ]
  }
```

**Example SOAP Field: id**

```xml
  <activityRecord>
    <id>1030680</id>
    <activityDateTime>2013-07-09T16:44:28-05:00</activityDateTime>
    <activityType>Visit Webpage</activityType>
    <mktgAssetName>ClickDemo</mktgAssetName>
    <activityAttributes>
      <attribute>
        <attrName>Webpage ID</attrName>
        <attrType xsi:nil="true" />
        <attrValue>2547</attrValue>
      </attribute>
      <attribute>
        <attrName>Webpage URL</attrName>
        <attrType xsi:nil="true" />
        <attrValue>/ClickDemo.html</attrValue>
      </attribute>
    </activityAttributes>
    <campaign />
    <personName xsi:nil="true" />
    <mktPersonId>1089965</mktPersonId>
    <foreignSysId xsi:nil="true" />
    <orgName xsi:nil="true" />
    <foreignSysOrgId xsi:nil="true" />
  </activityRecord>
```

Posted on _2017-03-01_ by _Kenny_

## Winter 2017 Updates

In the Winter 2017 release, we are adding the ability to bulk import custom object data asynchronously, and to manipulate variables in guided landing pages. See the full list of updates below.

### Lead Database APIs

#### Bulk Import of Custom Objects

New endpoints to support Bulk Import of Custom Objects. Details can be found [here](/help/rest-api/custom-objects.md).

#### Notice of Upcoming Change to Activities

Please note a significant change that will occur when Marketo releases its next-generation Activity Service. This change will affect the following endpoints:

SOAP

[getLeadActivity](/help/soap-api/getleadactivity.md), [getLeadChanges](/help/soap-api/getleadchanges.md)

The integer "id" field contained in records returned by these endpoints will no longer be guaranteed unique. This will impact activity, data value change, and lead deletion record types. To avoid service disruptions for integrations that retrieve these record types, the id field should be treated as optional.

#### Push Token Removal

Added the ability to remove push tokens via the SDK API. Details can be found here: [iOS](/help/mobile/push-notifications.md), [Android](/help/mobile/push-notifications.md).

Posted on _2017-03-01_ by _David_

## Spring 2017 Updates

In the Spring 2017 release, we are adding the ability to bulk extract lead and activity object data asynchronously, and to manipulate named account lists. See the full list of updates below.

### Bulk Extract of Leads

New endpoints to support extraction of leads in bulk. Specify record selection criteria using a variety of options. Details can be found [here](/help/rest-api/bulk-lead-extract.md).

### Bulk Extract of Activities

New endpoints to support extraction of Activities in bulk. Specify record selection criteria using date range, and activity list. Details can be found [here](/help/rest-api/bulk-extract.md).

### Named Account Lists

New endpoints to support CRUD operations on Named Account Lists. Details can be found [here](/help/rest-api/named-account-lists.md).

### Other Enhancements

* The [Get Campaigns](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCampaignByIdUsingGET) endpoint now allows you to filter "triggerable" campaigns. This is achieved by passing "isTriggerable=true" as a query parameter.
* The [Clone Program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) endpoint now supports programs that contain all asset types except SMS Message.

### Ionic

You can now use Marketo Mobile MME and with the [Ionic](https://ionicframework.com/) application framework. Details can be found [here](/help/mobile/ionic.md).

### Unregister Push Notification Token

A new method was added to the SDK that allows you to unregister the push notification token with Marketo. This is useful for example when a user logs out of your app. For usage see `unregisterPushDeviceToken` (iOS) or `uninitializeMarketoPush` (Android) method [here](/help/mobile/push-notifications.md).

Posted on _2017-06-16_ by _David_

## Internet of Things for Marketers with IFTTT and Zapier

The Internet of Things (IoT) is the inter-networking of connected devices, appliances, wearables, vehicles, etc. with embedded electronics, software, sensors, and network connectivity that enable these objects to collect and exchange data with cloud information systems. These technologies are growing and trending so fast that they will impact how we live, how we work and how we do business in no time. Marketo the leading Marketing Engagement Platform is ready for the IoT with its capabilities to scale and interact with any form of communication channel. Marketo can track already over 70 types of activities related to emails, web, mobile, CRM, etc … and it supports also [custom activities](https://experienceleague.adobe.com/docs/marketo/using/product-docs/administration/marketo-custom-activities/create-a-custom-activity.html) that can be fed by any 3rd party system. Marketo [custom objects](https://experienceleague.adobe.com/docs/marketo/using/product-docs/administration/marketo-custom-objects/understanding-marketo-custom-objects.html) make it possible to track all kinds of 3rd party metrics related to your business, and allows marketers to leverage those metrics right from Marketo smart campaign filters and triggers. Implementing IoT for consumers would require a centralized server to interact with consumer devices and this server would exchange data with the Marketo open platform, with capabilities such as REST API, Custom Objects, Custom Activities, etc. Not easy to demonstrate via a blog post. Instead of that, we are going to integrate the IFTTT Service with Marketo to implement some cool IoT use cases for the Marketers like:

* Cheering up your Marketing team each time a lead is registered to a road show by blinking a colored light in the office
* Cheering up your Sales team each time a deal is won by automatically firing up a bell plugged to a connected power plug
* Automatically post Marketing success milestones on social networks such as LinkedIn, Facebook, Slack, etc. …
* Automatically launch a Marketing Campaign based on:
  * when a weather alert occurs (wind, temperature, rain, etc.)
  * when a new article is published by a newspaper such as the New York Times, matching some specific criteria
  * when the U.S. Senate or House of Representatives votes
  * when the International Space Station passes over a certain location
  * etc. …

You might find those scenarios fun but useless, but they are here to demonstrate a new conceptual way to do Marketing not only with people, but also with things in our connected world. Another interesting point covered in this article, is how to leverage an open web integration platform such as Zapier as a "serving hatch" between a 3rd party system and Marketo, to manage the authentication for example.

### The IFTTT Service

IFTTT is an acronym for "IF This Then That". It is a free web-based service that people use to create chains of simple conditional statements, called applets. An applet is triggered by changes that occur within some partner web services and as a result, actions are sent to other partner web services. IFTTT was launched in 2011 by Linden Tibbets, Jesse Tane, Scott Tong, and Alexander Tibbets in San Francisco. At first sight, IFTTT looks similar to a service like [Zapier](https://zapier.com/) for example, it has a much stronger focus on consumers and IoT devices (remotes, alarms, lights, thermostats, cars, printers, mobile phones, and so much more).  First of all, you must create an account for IFTTT from the [IFTTT web site](https://ifttt.com/explore). Feel free to discover all the cool applets already available as that will give you some other scenarios ideas for sure!

### The Maker Channel

A web application that does not have a channel, meaning a partnership with IFTTT, must use the Maker Channel. With the Maker Channel, you can create Applets that work with any device or app that can make or receive a web request. It offers the following integrations:

* Inbound Triggers to receive a web request from a 3rd party system to trigger an action
* Outbound Actions to make a web request to a 3rd party system publicly accessible on the Internet

From IFTTT, search for the "Maker" service and click on it.  The first time, you need to activate it by clicking on the "Connect" button.  Now the Maker Channel is active. You can obtain your secret key by clicking on the Maker Settings button: Copy and paste the provided URL to your browser for more details.

### Triggering Directly an IFTTT Action from Market

First, we are going to focus on triggering all kinds of 3rd party web service actions from Marketo. For that we are going to use a [Marketo Webhook](https://experienceleague.adobe.com/docs/marketo/using/product-docs/administration/additional-integrations/create-a-webhook.html). We'll start with a push message on your mobile phone or tablet via the IFTTT mobile app, and then we implement a IoT scenario blinking a Philips Hue light.

### Marketo Webhook

To trigger an event from Marketo, acting as the "if" of IFTTT, is simple. All you need to do is send a POST web request to IFTTT with an event name and your secret key, following this pattern URL:

`<https://maker.ifttt.com/trigger/{event_name}/with/key/{secret_key}>`

The Maker makes it also possible to communicate up to 3 parameters via the web request. This can be done using query parameters,

`<https://maker.ifttt.com/trigger/{event_name}/with/key/{secret_key}?value1={value1}&value2={value2}&value3={value3}>`

or using a JSON body consisting of up to three values:

`{ "value1" : "{value1}", "value2" : "{value2}", "value3" : "{value3}" }`

In Marketo, create a new Webhook from the Admin interface.  Provide the following information for your new Webhook:

**Webhook Name:** IFTTT Program Success

**Description:** Trigger an event on IFTTT from a Smart Campaign for a Program Success

**URL:** `<https://maker.ifttt.com/trigger/{event_name}/with/key/{secret_key}?value1={{program.name}}&value2={{lead.Email> Address}}&value3={{lead.Full Name}}`

event_name, use MarketoProgramSuccess for example

secret_key, use the secret key from your IFTTT Maker Service

Use static text or Marketo tokens for the three available values. You can push more interactive messages by defining your own tokens at the program level and pass them through these values.

**Request Type:** POST

**Template:** Leave blank

**Request Token Encoding:** Form/Url

**Response type:** None

No need to define a response mapping.

### IFTTT Applet

In the IFTTT web portal, select "My Applets" in the main menu.  Click the button "New Applet" and click on the section **+this**.  Search for the Maker service.  Create the Trigger that will fire every time the Maker service receives a web request to notify it of an event. Use the same Event Name as the one specified in the URL of your Marketo Webhook, for example "MarketoProgramSuccess" and click the "Create trigger" button.  Now it is time to specify the Action Service by clicking the section **+that**.  We are going to start with a simple action service that anyone would be able to test without having to invest in any IoT devices, the Notifications Service. Search for and select the Notifications Service.
 Choose the action "Send a notification" that sends a notification to your devices.  You can leverage the 3 values you have sent from Marketo by adding them as Ingredients to deliver a meaningful notification to the user, just like the example below …  And then click the button "Create action". Review and finish the IFTTT Applet. Make sure it is enabled.

### Testing the IFTTT Applet

If you want to get notified on your Mobile, you must first download the IFTTT app for your device.  You can trigger a Marketo Program Success event by using the Webhook in a Marketo Smart Campaign Flow. Remember that Marketo Webhooks work exclusively with triggered Smart Campaigns (e.g. trigger once a contact filled-out form, was added to a list, etc.).  And here is an example of an IFTTT notification on your mobile phone.

### Let's Get Creative with IFTTT

IFTTT offers Applet Actions with over 300 partners, so your portfolio of apps and appliances together with your imagination are the limits …  Let's take an example with the [Hue lights from Philips](https://www.philips-hue.com/en-us) that you can buy anywhere in electronics shops or online. The following applets would blink one of your lights with its current assigned color when Marketo triggers a program success, that could boost your marketing team in the office. We create a new Applet, following the same steps as before, where Marketo is triggered with a webhook, but this time we choose the action from the Philips Hue service.

Let's select the "Blink lights" action. The app will request from Philips Hue all your available lights, so you can pick the one to blink. You would need to set up an account with Philips Hue first, the Hue bridge and of course at least one Hue bulb, light strip, projector or lamp.  We just added a new Applet that will blink a colored light each time a lead is registered to a roadshow or webinar. Your Marketing team will cheer up every day with that setup in the office.

### Executing a Marketo Action from IFTTT, via Zapie

Now, we are going to trigger a Marketo Smart Campaign from the IFTTT Platform. For that we are going to use the [Marketo REST API](/help/rest-api/rest-api.md). Since this API is secured and requires an OAuth2 Authentication prior to invoke anything, we need to handle that authentication via another platform such as Zapier, because IFTTT doesn't allow to chain two consecutive calls on an API with the Maker Channel. We picked [Zapier](https://zapier.com/) web app Automation Service since we published already introducing Zapier and explaining step by step how to implement a custom Marketo connector for Zapier. Other platforms such as [Workato](https://www.workato.com/integrations/marketo) could be a solution too.

### Marketo Campaign

Create your Marketo Program with a scheduled Smart Campaign. For test purpose, you could create the following Smart Campaign as an example: **Smart List**  Use only filters, not triggers. Make sure at least you would qualify. **Flow** Send you an email or any another kind of notification. **Schedule**  Make sure you can run through the flow every time to handle your multiple tests. You can obtain the Smart Campaign Id from the URL. Example: _`https://{{marketo_url}}/#SC4289A1`_ - the Smart Campaign Id would be 4289. You can trigger this campaign via the Marketo REST API. You can use for example the [Postman](https://www.postman.com/) plugin for Chrome and send the 2 following consecutive HTTPS calls: **Authentication step:**

`https://{{Your Munchkin_Account_id}}.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id={{Your_Client_Id}}&client_secret={{Your_Client_Secret}}`

Recover the access token from the JSON response. **Campaign kick-off step:**

`https://{{Your_Munchkin_Account_id}}.mktorest.com/rest/v1/campaigns/{{Campaign_Id}}/schedule.json?access_token={{access_token}}`

### Intermediate Zapier Custom Connector to Launch the Marketo Campaign

We need to build a custom Zapier connector that authenticates with the Marketo REST API and kicks off our Smart Campaign.

* Prerequisites
* Implementation of the Marketo Connector for Zapier
* Use a different title such as "Marketo Campaign"
  * Do the "Authentication" step
  * Do the "Triggers" step (required for Zapier testing purpose)
  * Do the following specific "Actions" step, responsible to launch a Marketo campaign, explained below:

Where to Send Data Action Endpoint URL :

`https://{{munchkin_account_id}}.mktorest.com/rest/v1/campaigns/{{CampaignId}}/schedule.json`

Leave blank the other optional fields.

#### Scripting API

Zapier's scripting feature allows you to manipulate the requests and responses that are exchanged between your app's API and Zapier. You can modify HTTP requests just before they are sent and can parse responses before Zapier does anything with them. We need it to complete our custom 'Session Auth' authentication. More information is available in the original article. Copy the following code very similar to the original, we just changed the action methods:

```javascript
var Zap = {

 get_session_info: function(bundle) {

 console.log('Entering get_session_info method ...');

 var access_token,
 access_token_request_payload,
 access_token_response;


 // Assemble the meta data for our Access Token swap request
 console.log('building Request with client_id=' + bundle.auth_fields.client_id + ', and client_secret=' + bundle.auth_fields.client_secret);
 access_token_request_payload = {
 method: 'POST',
 url: 'https://' + bundle.auth_fields.munchkin_account_id + '.mktorest.com/identity/oauth/token',
 params: {
 'grant_type' : 'client_credentials',
 'client_id' : bundle.auth_fields.client_id,
 'client_secret' : bundle.auth_fields.client_secret
 },
 headers: {
 'Content-Type': 'application/json', // Could be anything.
 Accept: 'application/json'
 }
 };

 // Fire off the Access Token request.
 access_token_response = z.request(access_token_request_payload);

 // Extract the Access Token from returned JSON.
 access_token = JSON.parse(access_token_response.content).access_token;
 console.log('New Access_Token=' + access_token);

 // This will be mixed into bundle.auth_fields in future calls.
 //bundle.auth_fields.access_token=access_token;
 return {'access_token': access_token};
 },

 test_trigger_pre_poll: function(bundle) {

 console.log('Entering test_trigger_pre_poll method ...');

 bundle.request.params = {
 'access_token':bundle.auth_fields.access_token
 };

 return bundle.request;

 },

 test_trigger_post_poll: function(bundle) {

 console.log('Entering test_trigger_post_poll method ...');

 var data = JSON.parse(bundle.response.content);
 if ((!data.success)&&((data.errors[0].code=="601")||(data.errors[0].code=="600"))){
 console.log('Access Token expired or invalid, requesting new one - data.success=' + data.success + ', data.errors[0].code=' + data.errors[0].code);

 throw new InvalidSessionException(); // Calling get_session_info() to regenerate Access Token
 }

 return JSON.parse(bundle.response.content);
 },

 launch_campaign_pre_write: function(bundle) {

 bundle.request.params = {'access_token':bundle.auth_fields.access_token};
 return bundle.request;
 },

 launch_campaign_post_write: function(bundle) {

 var data = JSON.parse(bundle.response.content);
 if ((!data.success)&&((data.errors[0].code=="601")||(data.errors[0].code=="600"))){
 console.log('Access Token expired or invalid, requesting new one - data.success=' + data.success + ', data.errors[0].code=' + data.errors[0].code);
 throw new InvalidSessionException(); // Calling get_session_info() to regenerate Access Token
 }
 return JSON.parse(bundle.response.content);
 }

};
```

##### New Zap

From the Zapier Dashboard click the button "Make a new Zap". **Trigger**

* Pick the "Webhooks by Zapier" Trigger App
* Check "Catch Hook"
* No need to pick off a child key
* Zapier generated a custom webhook URL for you to send requests to, keep it safe somewhere
* Test the webhook URL, by starting the "IFTTT Applet that calls the Zapier Webhook" scenario below. That allows Zapier to learn about the webhook payload and to let you assign the campaign Id to the Action

**Action**

* Select the Marketo Campaign connector previously created
* Choose the only action available: **Launch Campaign**
* Connect to your Marketo account, filling up the authentication parameters (Munchkin Account Id, Client Id, Client Secret)
* Edit the Template and associate the Campaign ID from the Trigger to the "Launch Campaign" Campaign Id parameter
* Test the step and check that the Marketo Campaign gets launched

### IFTTT Applet that Calls the Zapier Webhook

We start with a simple scenario that is easy to test. We pick in IFTTT a Date & Time trigger that will kick off the Marketo Campaign every hour. The Action is a web request posting to the Zapier Webhook URL and passing over the Smart Campaign Id. Make sure the Zapier Zap and the IFTTT Applet are both active and test that everything is working as expected.

### Let's get Creative with IFTTT

IFTTT offers Applet Triggers with over 300 partners, so again your portfolio of apps and appliances together with your imagination are the limits … Let's take an example with the [Weather Underground](https://www.wunderground.com/) service that we are going to use to launch our Marketo campaign on weather alert. The following trigger would kick off when a Rain condition is announced. And then associate the Trigger with the Maker Webhook Action, and just like previously fill in the Zapier webhook parameters.  Et voila, you just need now a good rain to come to double check this is actually working.

We hope you have many fun applying the concepts provided in this article. But most important, we think it will help anybody wanting to integrate Marketo with other 3rd party systems, thanks to the key concepts from this article:

* Marketo REST API
* Marketo Webhooks
* How to leverage an open web integration platform such as Zapier as a "serving hatch" between a 3rd party system and Marketo, to manage the authentication for example

Posted on _2017-06-20_ by _Philippe_

## Summer 2017 Updates

In the Summer 2017 release, we are releasing some minor enhancements to our Program APIs.

### Browse Programs

We are adding the ability to get programs by date range to our [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#operation/browseProgramsUsingGET) endpoint, via the addition of the optional earliestUpdatedAt and latestUpdatedAt parameters. You can set either or both parameters with the datetime of your choice to return only programs which have been created or updated between the two datetimes. This is useful for retrieving new and updated sets of marketing collateral, most importantly for translation and business intelligence use cases.

Posted on _1970-01-01_ by _Kenny_

## Extend Marketo Business Logic with Google Cloud Function-

This article proposes a solution to extend Marketo with some business logic capabilities with Google Cloud Platform (GCP), based on the following simple example: 3 custom fields on the Marketo Lead record:

* **OnLinePreference**: an incremental score that indicates a prospect/customer appetence for online communications.
* **OfflinePreference**: an incremental score that indicates a prospect/customer appetence for offline communications.
* **Preference**: a field computed by GCP that displays "offline' if the offline score is higher than the online one, and "online" the other way around

This technology opens the way for more advanced business logic and eventually for calling out external web services, transforming and consolidating the results in Marketo.  

### About Google Cloud Platform and Functions

[Google Cloud Platform](https://cloud.google.com/) (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search and YouTube. Alongside a set of management tools, it provides a series of modular cloud services including computing, data storage, data analytics, machine learning, big data and much more. We could have used many different GCP services for our need, such as Compute Engine, App Engine or Kubernetes Engine, but we opted for the [Cloud Functions](https://cloud.google.com/functions) (still in Beta) for the following main advantages:

* Serverless cloud computing is where logic can be spun up on-demand in response to events such as HTTP calls.
* Relieves most of the pain caused by server maintenance and deployments.
* Cost effective, as you pay GCP only for each function call and not for keeping a server up and running.
* Simple and fast to implement as you focus only on your application logic.
* Automatic scaling, ready for very high workloads.

Please check the [GCP web site](https://cloud.google.com/) for more information about this technology and its pricing. Typically, this tutorial should not induce any important cost and will fit perfectly within the free credit of a GCP trial.  

### Preparation of your Google Cloud environment

You need a Google Cloud account. You can try GCP for free with a credit that is more than enough to run this tutorial, just click "Try it free" button on the [GCP web site](https://cloud.google.com/). Follow all the steps from the section 'Before you begin' in the [HTTP Tutorial](https://cloud.google.com/functions/docs/calling) from Google:

1. Create a Cloud Platform project: GO TO THE MANAGE RESOURCES PAGE
1. Enable billing for your project: [ENABLE BILLING](https://cloud.google.com/billing/docs/how-to/modify-project?visit_id=638816637273392093-1926929734&rd=1)
1. Enable the Cloud Functions API: [ENABLE THE API](https://accounts.google.com/InteractiveLogin?continue=https://console.cloud.google.com/flows/enableapi?apiid%3Dcloudfunctions%26redirect%3Dhttps://cloud.google.com/functions/docs/tutorials/http&followup=https://console.cloud.google.com/flows/enableapi?apiid%3Dcloudfunctions%26redirect%3Dhttps://cloud.google.com/functions/docs/tutorials/http&osid=1&passive=1209600&service=cloudconsole&ifkv=ASKV5Mh81NGNsqcJqhx7hst0KFnyA0MJ-2zay8ovyluBfpvDoM820nF9Wq_SKbC1m_sjQvvRNoKSuA)
1. [Install and initialize the Cloud SDK](https://cloud.google.com/sdk/docs/)
1. Update and install Gcloud components

    **gcloud components update &&** **Gcloud components install beta**

1. Prepare your environment for Node.js development: [GO TO THE SETUP GUIDE](https://cloud.google.com/nodejs/docs/setup)

### Implementation of the scoreCompare Cloud Function

1. Create a Cloud Storage bucket to stage your Cloud Functions files. You can do it with the command line:

   `gsutil mb gs://[YOUR_STAGING_BUCKET_NAME]`

    or from the Google Cloud web interface, by selecting your project and clicking the Storage menu:
    * Give your Storage bucket a unique name
    * Select the default storage class
    * Select the best suited regional location

1. Create a directory on your local system for the application code.
1. Create an 'index.js' file in this directory with the following JavaScript code: the code is really simple to understand. It parses the two input parameters from the HTTP request body in JSON, does the processing and encodes in JSON the HTTP response.

```javascript
 /\*\*
     \* HTTP scoreCompare Cloud Function.
     \*
     \* @param {Object} req Cloud Function request context.
     \* @param {Object} res Cloud Function response context.
     \*/
    exports.scoreCompare = function scoreCompare (req, res) {
     var onlineScore=parseInt(req.body.onlineScore);
     var offlineScore=parseInt(req.body.offlineScore);
     console.log('/scoreCompare: got values onlineScore =' + onlineScore + ', offlineScore =' + offlineScore);
     var result;
     if (onlineScore>offlineScore) {result = 'online';} else {result = 'offline';}
     console.log('/scoreCompare: and result is ' + result);
     res.status(200).json({output: result}).end();
    };
```

Deploy the function scoreCompare with an HTTP trigger. Run the following command from your directory:

**gcloud beta functions deploy [FUNCTION] --stage-bucket [YOUR_STAGING_BUCKET_NAME] --trigger-http**

Where [YOUR_STAGING_BUCKET_NAME] is the name of your staging Cloud Storage bucket. In our example:

**gcloud beta functions deploy scoreCompare --stage-bucket mktostorage --trigger-http**

1. Note the Cloud Function URL (httpsTrigger URL) from the console output, that looks like this: `https://[YOUR_REGION]-[YOUR_PROJECT_ID].cloudfunctions.net/[FUNCTION]` where

    * [YOUR_REGION] is the region where your function is deployed. This is visible in your terminal when your function finishes deploying.
    * [YOUR_PROJECT_ID] is your Cloud project ID. This is visible in your terminal when your function finishes deploying.
    * [FUNCTION] is your function name.

    In our example: **`https://us-central1-marketo-cloud-logic.cloudfunctions.net/scoreCompare`**
1. Test your function with a tool like [Postman](https://www.postman.com/):
    * HTTP Verb: POST
    * URL: `https://us-central1-marketo-cloud-logic.cloudfunctions.net/scoreCompare`
    * Headers: content-type = application/json
    * Body: {"onlineScore":110, "offlineScore":200}Output should give: {"output": "offline"}.

### Call the Cloud Function from a Marketo's Webhook

The three following custom fields must be created on the Lead record in Marketo:

* **OnlinePreference**: Integer
* **OfflinePreference**: Integer
* **Preference**: String

Create the following webhook from the Marketo admin interface by using your 'scoreCompare' cloud function URL and the custom field's tokens. Test the webhook with a Marketo triggered smart campaign.

* **Marketo webhooks can only be invoked from triggered smart campaigns, not batch smart campaigns.**
* **If you do not use your cloud function, delete it or delete the whole project, to avoid incurring charges to your Google Cloud Platform account.**

We hope this tutorial was worth your time and that it will make you think about more advanced scenarios involving complex processing and 3rd party services. A good example would be to leverage Google Cloud AI, the machine learning services from Google. You could, for example, parse some free text from a Marketo form and ask Google Natural Language API to reveal the structure and meaning of the text and then save back this analysis in Marketo; just opening the floodgates for ideas.

Posted on _2017-11-21_ by _Philippe_

## Fall 2017 Updates

In the Fall 2017 release, we are releasing several enhancements to our Asset APIs. See the full list of updates below.

### Browse Programs by Date Range

We have added the ability to get programs by date range to our [Get Programs](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneEmailUsingPOST) endpoint. This is done using the `earliestUpdatedAt` and `latestUpdatedAt` parameters. You can set either or both parameters with the datetime of your choice to return only programs which have been created or updated between the two datetimes.

### Preview Email

You many now preview an email using the [Get Email Full Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailFullContentUsingGET) endpoint, which returns the serialized HTML version of an email. All tokens, snippets, dynamic content, and embedded components are fully rendered. An optional **leadId** parameter may be passed to impersonate a given lead.

### Replace HTML of Email 2.0

We have added the [Update Email Full Content](https://developer.adobe.com/marketo-apis/api/asset#operation/createEmailFullContentUsingPOST) endpoint to allow you to replace blocks of HTML email content. If you edit the HTML code of a Marketo email using the Marketo Email 2.0 Editor, then the relationship between the email and its template is broken, more about that [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/edit-an-emails-html). Using this endpoint, you can programmatically update the HTML contents of an email whose relationship has been broken. In addition, we have modified all other email lifecycle-related endpoints to be compatible with emails where the relationship has been broken:

* Approve Email Draft
* Unapprove Email
* Delete Email
* Discard Email Draft
* Clone Email
* Update Email Metadata

### Other Enhancements

* The maximum time span for date range filters has been increased to 31 days. This pertains to [Bulk Lead Extract filters](/help/rest-api/bulk-lead-extract.md) (createdAd or updatedAt), and [Bulk Activity Extract filter](/help/rest-api/bulk-activity-extract.md) (createdAt).

Posted on _2017-12-15_ by _David_

## TEST - External video link on Community

[Email Deliverability Power Pack Tutorial Video](https://nation.marketo.com:443/t5/product-space-archive-videos/email-deliverability-power-pack-tutorial-video/m-p/283550)  

Posted on _1970-01-01_ by _David_

## Winter 2018 Updates

In the Winter 2018 release, we are releasing a few enhancements to our APIs. See the full list of updates below.

### Activate/Deactivate Trigger Campaigns

We have added the ability to activate and deactivate trigger campaigns, which can simplify the process of automating your program templates. This is achieved by calling two newly added endpoints: [Activate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/activateSmartCampaignUsingPOST), [Deactivate Smart Campaign](https://developer.adobe.com/marketo-apis/api/asset#operation/deactivateSmartCampaignUsingPOST). See the Trigger section in [Campaigns](/help/rest-api/assets.md) documentation for details.

### Get Program by Name

Added two parameters to the [Get Program by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getProgramByNameUsingGET) endpoint to facilitate retrieval of program costs and program tags. See **includeCosts** and **includeTags** parameters in the [Programs](/help/rest-api/assets.md) documentation for details.

### Other Enhancements

The Bulk Extract API is now "workspace aware". When you create an API-Only User for a [Custom Service](/help/rest-api/custom-services.md), you must select a User Role with API Access for one or more workspaces. Previously, the Custom Service was granted access to all workspaces. Now, the Custom Service is granted access to only the workspace(s) that were selected during API-Only User creation.

Posted on _2018-03-02_ by _David_

## Spring 2018 Updates

In the Spring 2018 release we are releasing new REST APIs, and web tracking privacy enhancements. See the full list of updates below.

REST API

### Static List CRUD

Allows users to remotely Create, Read, Update, and Delete Static List Records. Enables management of the entire lifecycle of a static list through REST APIs, including populating and maintaining membership. Details can be found [here](/help/rest-api/static-lists.md).

### Custom Activity Metadata

Allows users to remotely create Custom Activity Records. Enables management of the entire lifecycle of custom activities through REST APIs, including manipulation of types and type attributes. Details can be found [here](/help/rest-api/activities.md).

### Smart List Metadata

Allows users to remotely Read, Clone, and Delete Smart List Records. Enables management of smart lists through REST APIs. Details can be found [here](/help/rest-api/smart-lists.md).

### Web Tracking Privacy

The Munchkin JavaScript web tracking code has been enhanced to include the following privacy-related enhancements:

* Opt-Out - Ability to allow visitors to permanently opt-out of web tracking. Details can be found [here](/help/javascript-api/lead-tracking.md).
* IP Address Anonymization - Comply with local and international privacy regulations by providing the ability to anonymize the IP addresses of web visitors. See **anonymizeIP** configuration parameter [here](/help/javascript-api/configuration.md).

### Other Enhancements

* The [Get Folders](https://developer.adobe.com/marketo-apis/api/asset#operation/getFolderUsingGET) endpoint now returns all folders when a non-root parent and maxDepth=1 are specified.
* The [Get Landing Page by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getLandingPageByIdUsingGET) endpoint now returns URL attributes with the protocol in all cases (http:// or https://).

Posted on _2018-06-29_ by _David_

## Summer 2018 Updates

The Summer 2018 release is primarily a maintenance release comprised of minor enhancements, and defect resolutions. See the full list of updates below.

### REST API

* Added support for Email Disposition fields that were unnecessarily omitted originally. These fields will now be available for reading and writing over REST, as appropriate.
  * Black Listed
  * Marketing Suspended
  * Email Suspended
  * Relative Urgency
* The Get Leads by Filter Type endpoint now supports leadPartionId as a filterType.

### Defect Resolutions

**REST Endpoint**

**Description**

[Approve Program](https://developer.adobe.com/marketo-apis/api/asset#operation/approveProgramUsingPOST)

If you had set Block Non-Operational Emails to false when creating the program, a call to Approve Program would reset to true.

[Bulk Extract](/help/rest-api/bulk-extract.md)

Certain Unicode characters were corrupted in the extract output file.

[Clone Program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST)

* If you cloned Email Program, then the SmartList filter logic was reset to "All" in the resulting program regardless of initial setting.
* If you tried to clone a program that had contained a static list (that was deleted), then you received a 709, "The following assets are unsupported:List" error.
* If you tried to clone a program across workspaces, then you received a 611, "Unable to clone program" error.

[Get Static List by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getStaticListByIdUsingGET)

If your Custom Service had Read-Only Asset role permission, then you would received a 603, "Access denied" error.

[Push Lead to Marketo](https://developer.adobe.com/marketo-apis/api/mapi#operation/pushToMarketoUsingPOST)

If **cookies** attribute was specified in an **input** array lead object, prior anonymous activity was not associated with newly created Lead.

[Schedule Campaign](https://developer.adobe.com/marketo-apis/api/mapi#operation/scheduleCampaignUsingPOST)

If you specified a **runAt** date far into the future, then the campaign was never run and **success=true** was returned. Now if the **runAt** date is farther than 2 years into the future, an error is returned [1042](/help/rest-api/error-codes.md).

[Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST)

If you specified `action=createDuplicate` and an `externalCompanyId` parameter (to associate the new Lead with an existing Company), then the Lead was associated with an empty Company (instead of the specified Company).

#### Miscellaneous

* Removed the following Data Change Value from all endpoint responses: mktoClientReqId. This was for internal use only.
* Added error lookup functionality. Enter a REST API error code into the search box and select from the autocomplete list underneath to jump to the error description.
* Added [Endpoint Reference](/help/rest-api/endpoint-reference.md) page. This is a sortable list of all REST API endpoints in one place. You can also use this page to generate the minimal set of permissions needed by your application. This comes in handy when creating a Custom Service.

Posted on _2018-10-12_ by _David_

## Fall 2018 Updates

The Fall 2019 release is primarily a maintenance release comprised of minor enhancements, and defect resolutions. See the full list of updates below.

### Enhancements

* Added [Email CC Fields](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/email-cc) support for [Asset API](/help/rest-api/assets.md). CC Field settings are propagated as expected during approval/clone operations (Email or Email Template draft approval, Email or Program clone). All Email-related endpoints now return CC Fields values in the **ccFields** property. Scroll down in the response below to see an example. This change affects the following endpoints: [Get Email by ID](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailByIdUsingGET), [Get Email by Name](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailByNameUsingGET), [Get Emails](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailUsingGET), [Approve Email Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveDraftUsingPOST), [Approve Email Template Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveDraftUsingPOST_1), [Clone Email](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneEmailUsingPOST), [Clone Program.](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST)

```json
{
    "success": true,
    "errors": [],
    "requestId": "cc96#166e836348b",
    "warnings": [],
    "result": [
        {
            "id": 2061,
            "name": "Test Email",
            "description": "This is a test",
            "createdAt": "2018-11-06T05:27:10Z+0000",
            "updatedAt": "2018-11-06T08:33:16Z+0000",
            "url": "<https://app-sjqe.marketo.com/#EM2061A1LA1>",
            "subject": {
                "type": "Text",
                "value": "This is a test with CC Fields"
            },
            "fromName": {
                "type": "Text",
                "value": "Tommy Tester"
            },
            "fromEmail": {
                "type": "Text",
                "value": "<tommy.tester@marketo.com>"
            },
            "replyEmail": {
                "type": "Text",
                "value": "<tommy.tester@marketo.com>"
            },
            "folder": {
                "type": "Program",
                "value": 7494,
                "folderName": "Initiative"
            },
            "operational": false,
            "textOnly": false,
            "publishToMSI": false,
            "webView": false,
            "status": "approved",
            "template": 1218,
            "workspace": "Default",
            "version": 2,
            "autoCopyToText": true,
            "ccFields": [
                {
                    "attributeId": "855",
                    "objectName": "lead",
                    "displayName": "emailcc",
                    "apiName": "emailcc"
                },
                {
                    "attributeId": "857",
                    "objectName": "lead",
                    "displayName": "leadDetails",
                    "apiName": "leadDetails"
                },
                {
                    "attributeId": "859",
                    "objectName": "company",
                    "displayName": "headquarters",
                    "apiName": "headquarters"
                }
            ]
        }
    ]
}
```

### Defect Resolutions

* Adjusted [Multiple Branding Domains](https://experienceleague.adobe.com/en/docs/marketo/using/home) support for [Asset API](/help/rest-api/assets.md). Previously, Multiple Branding Domains settings were not propagated when approving an Email draft, cloning an Email, or cloning a Program. This has been corrected. This change affects the following endpoints: [Approve Email Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveDraftUsingPOST), [Clone Email](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneEmailUsingPOST), [Clone Program.](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST)
* Added [apiOnly](/help/javascript-api/configuration.md) configuration setting. By default, web pages that contain the Munchkin tag fire a "Visits Web Page" event when the web page is loaded in the browser. In some cases, this is undesirable. For example, single page web applications that need full control of when this event is fired. To support this use case, we added a new **apiOnly** configuration setting. When set to true, the Munchkin tag does not generate a "Visits Web Page" activity during page load.
* Added [domainSelectorV2](/help/javascript-api/configuration.md) configuration setting. By default, the Munchkin tag doesn't correctly handle web pages that are hosted on sites with two-letter [country code top-level domains](https://en.wikipedia.org/wiki/Country_code_top-level_domain) (examples: .io, .co, .ly). This causes the Munchkin cookie domain attribute to be set incorrectly. To achieve a better out of box experience, we added a new **domainSelectorV2** configuration setting. When set to true, an improved algorithm is used to automatically set the Munchkin cookie domain attribute.
* Adjusted [Opt-Out](/help/javascript-api/lead-tracking.md) cookie domain. In certain cases, the domain attribute of the Munchkin Opt-Out cookie (mkto_opt_out) was set incorrectly. The Munchkin Opt-Out cookie now uses the same logic as the Munchkin cookie (_mkto_trk) to determine the domain cookie attribute, including honoring the **domainLevel** configuration setting.
* Android application developers can now directly use Google's [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM) with this SDK. Details can be found [here](/help/mobile/installation.md).

Posted on _2018-12-07_ by _David_

## Spring 2019 Updates

The Spring 2019 release is primarily a maintenance release comprised of minor enhancements, and defect resolutions. See the full list of updates below.

Posted on _2019-03-19_ by _David_

## June 2019 Updates

The June 2019 release is primarily a maintenance release comprised of minor enhancements, and defect resolutions. See the full list of updates below.

### REST API

1. Added a checksum to Bulk Export status endpoints. You can compare the checksum with a hash of the retrieved file to verify the integrity of the retrieved file. The checksum is a SHA-256 hash of the exported file and is stored in the fileCheckSum attribute when an export job is completed.

The following endpoints return the checksum: [Get Export Lead Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsStatusUsingGET), [Get Export Lead Jobs](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsFileUsingGET), [Get Export Activity Job Status](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsStatusUsingGET), [Get Export Activity Jobs](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportActivitiesUsingGET)

#### Defect Resolutions

1. Fixed issue with [Bulk Custom Object Import](/help/rest-api/bulk-custom-object-import.md) when importing decimal numbers into integer fields. Before the fix, the decimal number was converted to an integer by assigning the whole number portion and discarding the fractional portion (e.g. 5.432 was converted to 5). Now an "Invalid data type in field Source ID" error is generated for each row that contains a data mismatch.
1. Fixed issue where an Email program created using the [Clone Program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) endpoint did not honor Communication Limits settings in certain cases.
1. Fixed issue with [Approve Landing Page Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveLandingPageUsingPOST) endpoint where it would return 611. "System error" when the landing page contained the Email Unsubscribe form.
1. Fixed issue with [Approve Landing Page Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveLandingPageUsingPOST) endpoint where it would return 611. "System error" when the landing page had been cloned using the [Clone Landing Page](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneLandingPageUsingPOST) endpoint.

#### Deprecations

1. As part of the [Email Editor 1.0 Deprecation](https://nation.marketo.com:443/t5/knowledgebase/email-editor-1-0-is-being-deprecated-june-18th/ta-p/250666), 1.0 Email Assets will become read-only at the end of 2019. All 1.0 Email Assets must be converted to 2.0 as descriDiscard Email Draft, bed [here](https://nation.marketo.com:443/t5/knowledgebase/email-editor-1-0-is-being-deprecated-june-18th/ta-p/250666). To help developers prepare for that event, we have added warnings to all Email-related endpoints that attempt to modify 1.0 Email Assets. Here is an example response that contains the warning:

`{` `"success": true,` `"errors": [],` `"requestId": "15c57#16b338d6e75",` `"warnings": [` `"This is a v1 email asset. API support for modifying v1 emails is being dropped, and this operation will not work on v1 emails in the future. To avoid service interruptions, upgrade this and related assets by editing them in the User Interface."` `],` `"result": [` `"{\"service\":\"sendTestEmail\",\"result\":true}"` `]` `}`

The following Email-related endpoints return the warning:

* Update Email Full Content
* Update Email Content
* Send Sample Email
* Unapprove Email
* Clone Program
* Clone Email
* Approve Email Draft
* Update Email Dynamic Content Section
* Update Email Metadata
* Approve Program

Email Scripting (Apache Velocity)

#### Deprecations

1. A subset of Velocity Script functionality was disabled for security purposes. This includes the following methods and variables: getClass(), $class, $context, $text. More information can be found [here](https://nation.marketo.com:443/t5/knowledgebase/unsupported-velocity-tools-disabled-in-june-2019-release/ta-p/251177).

Posted on _2019-06-14_ by _David_

## August 2019 Updates

In August 2019 we are releasing new REST APIs, enhancing existing APIs, and resolving defects. See the full list of updates below.

### Enhancements

1. Enhanced Smart Campaign lifecycle capabilities. Added new endpoints to allow you to perform the following operations on Smart Campaigns: get by name, create, update, clone, and delete. Complete information can be found [here](/help/rest-api/smart-campaigns.md).
1. Enhanced Smart List endpoints to improve query capabilities.
    1. [Get Smart List by Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartListByIdUsingGET) endpoint now returns Smart List rule descriptions (triggers and filters) when you pass the **includeRules** boolean parameter.
    1. [Get Smart Lists](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartListsUsingGET) endpoint now allows you to filter the results by date range when you pass the **earliestUpdatedAt** and **latestUpdatedAt** datetime parameters. Additionally, this endpoint now returns Smart Lists that are members of campaigns and email programs.
1. Added endpoints for extracting Smart List definitions.
    1. Get [Smart List by Smart Campaign Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartListBySmartCampaignIdUsingGET) endpoint returns the smart list record for a given smart campaign id.
    1. Get [Smart List by Program Id](https://developer.adobe.com/marketo-apis/api/asset#operation/getSmartListByProgramIdUsingGET) endpoint returns the smart list record for a given program id.
1. Enhanced the [Update Email Content](https://developer.adobe.com/marketo-apis/api/asset#operation/updateEmailContentUsingPOST) endpoint to allow updates to email header fields for emails that have been broken from their template (subject, from name, from email, reply to). Broken from the template is described [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/edit-an-emails-html).

### Defect Resolutions

1. Fixed issue where calling [Delete Landing Page](https://developer.adobe.com/marketo-apis/api/asset#operation/deleteLandingPageByIdUsingPOST) on an approved landing page would delete the landing page. It now correctly returns a "709, Approved landing page cannot be deleted" error. [LM-127271]
1. Fixed issue with [Send Sample Email](https://developer.adobe.com/marketo-apis/api/asset#operation/sendSampleEmailUsingPOST) endpoint where it would return 611. "System error" when email had been broken from its template. [LM-127288]
1. Fixed issue with [Delete Program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) endpoint where in some cases it would delete an in-use program instead of issuing a "709, Cannot delete program. The assets are in use elsewhere or not deletable" error. [LM-125431]

### Deprecations

1. API support for Email Editor 1.0 is scheduled to be deprecated in January 2020. Please remember to convert your assets to 2.0 before then. Attempts to write to or clone Email 1.0 assets after January will result in errors instead of warnings. Learn more about Email APIs [here](https://nation.marketo.com:443/t5/knowledgebase/email-2-0-and-email-api-faq-s/ta-p/251423).
1. To align with Adobe's world-class standard for security, we will be deprecating support for Transport Layer Security (TLS) 1.0 and 1.1 starting December 13, 2019. Systems integrating with Marketo that are not compliant with 1.2 protocol could potentially lose access to Marketo Engage services. To maintain your Marketo Engage access, please ensure that all client systems are TLS 1.2 compliant before December 13, 2019. More detailed information can be found [here](https://nation.marketo.com:443/t5/knowledgebase/tls-1-0-1-1-deprecation-faq/ta-p/249085).

1. All Smart Campaign related content now resides in the [Smart Campaigns](/help/rest-api/smart-campaigns.md) menu item (underneath REST API > Assets).

Posted on _2019-08-16_ by _David_

## January 2020 Updates

In January 2020 we are releasing new REST APIs, enhancing existing APIs, and resolving defects. See the full list of updates below.

* Added the ability to programmatically create of Custom Object schema definitions. This allows you to define a custom object once and provision it to as many instances as needed. This allows you to enable users to effectively leverage sandbox and center-of-excellence models. Also allows ISVs to simplify the customer onboarding process. You need an appropriate subscription type to access the Custom Object Metadata API.
* Added the ability to import and export of Program Members in bulk. This new set of endpoints follow the existing Marketo REST API pattern for creating asynchronous bulk processing jobs. Program Member records can contain Program Member custom fields, and/or Lead fields.
* Added Get Available Form Program Member Fields endpoint to support the use of Program Member Custom Fields as Form Fields. This returns a list of all program member custom fields that can be used in a Marketo Form.
* Added [Get Email Template Used By an](/help/rest-api/email-templates.md) endpoint that returns a list of email assets that depend on a given email template. This allows you to quickly understand the impact of a potential email template change, and more easily address these dependencies.

Posted on _2020-01-17_ by _David_

## How to Retrieve Every Custom Object

We are often asked how to use Marketo's API to get a list of all [custom objects](https://experienceleague.adobe.com/en/docs/marketo/using/home) (COs). Querying for COs requires more than its name: some _a priori_ knowledge about each CO is also required. The methods to get that knowledge may not be obvious since the API provides no method for querying it directly. As with many goals in Marketo Engage, Smart Lists provide an answer for COs linked to Persons (Leads). Smart Lists work differently with Companies and you'll end up with a list of all Persons whose Companies are linked to the type of object for the filter so you may find it necessary to deduplicate companies depending on your goals. Anytime a new Custom Object is approved, an associated filter is created. It will be named in the format "**Has CO NAME**". In the example below, the custom object name is "**Conference Track Subscription"** and its filter is named "**Has Conference Track Subscription**". Once you have created the Smart List, you can retrieve the information necessary to query for associated COs using the [custom objects endpoint](/help/rest-api/custom-objects.md). Export the list ensuring the linked field is included (either ID or email address). You can export using the [Bulk Lead Extract API](/help/rest-api/bulk-lead-extract.md) filtering by the **smartListName** or **smartListId** filter or [export from the UI](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-lists-and-static-lists/managing-people-in-smart-lists/export-people-to-excel-from-a-list-or-smart-list). You'll use each linked field value to query associated custom objects individually in the next step. The custom object's name is **"Conference Track Subscription"** in this example, and its API name is **conferenceTrackSubscription_c**. You find the API name both in the UI as "**API Name**" and via the API as "**name**".  Admin | Marketo Custom Objects[/caption] And here's a fragment returned by the [List Custom Objects API](https://developer.adobe.com/marketo-apis/api/mapi#operation/listCustomObjectsUsingGET) endpoint:

```json
{
    "name": "conferenceTrackSubscription_c",
    "displayName": "Conference Track Subscription",
    "description": "Track subscription for conference attendees",
    "createdAt": "2020-01-13T19:50:06Z",
    "updatedAt": "2020-01-13T19:50:06Z",
    "idField": "marketoGUID",
    "dedupeFields": [
        "subscriptionID"
    ],
    "searchableFields": [
        [
            "subscriptionID"
        ],
        [
            "marketoGUID"
        ],
        [
            "leadID"
        ]
    ],
    "relationships": [
        {
            "field": "leadID",
            "type": "child",
            "relatedTo": {
                "name": "Lead",
                "field": "Id"
            }
        }
    ]
}
```

To retrieve the custom objects associated one to one (1:1) or one to many (1:N) with the Persons in your Smart List, make a request like this:

`GET /rest/v1/customobjects/conferenceTrackSubscription_c.json?filterType=leadID&filterValues=1000302,1000303,1000304,1000306,1000307`

In this example, this custom object is linked to Persons by the **leadID** field so the filter type is "**leadID**". The filter values parameter is a comma-separated list of the IDs taken from the Smart List export. The request may include as many filter values as you can fit in a single request URI: up to 8K characters. Requests exceeding this length returns a 414 HTTP-level error code. The response may be returned in more than one chunk. If so, **moreResult** will be **true** and a **nextPageToken** will be included. You will then need to [page through](/help/rest-api/paging-tokens.md) the results until **moreResult** is **false**. Here's part of the result for the above API request:

```json
"result": [
    {
        "seq": 0,
        "marketoGUID": "d6b3ed3d-4eb8-4066-a9cd-184c8d385cfe",
        "leadID": "1000302",
        "subscriptionID": "4ad59184-6bf1-4eeb-a583-d82aeee68210",
        "createdAt": "2020-01-13T21:24:04Z",
        "updatedAt": "2020-01-13T21:24:04Z"
    },
    {
        "seq": 1,
        "marketoGUID": "e5e0aba4-f27f-494d-93ed-9cb580989bf3",
        "leadID": "1000303",
        "subscriptionID": "fc5596d5-6fa2-4848-b4a2-89d96e245c59",
        "createdAt": "2020-01-13T21:24:04Z",
        "updatedAt": "2020-01-13T21:24:04Z"
    },
    {
        "seq": 2,
        "marketoGUID": "e65007cd-86b1-4c17-8d55-057c96e1788a",
        "leadID": "1000304",
        "subscriptionID": "7e54b8a0-2170-4d81-a809-4eac349508d0",
        "createdAt": "2020-01-13T21:24:04Z",
        "updatedAt": "2020-01-13T21:24:04Z"
    },
    {
        "seq": 3,
        "marketoGUID": "39d956b2-85e2-4c24-94e7-e9fa5a09d3d0",
        "leadID": "1000306",
        "subscriptionID": "644c8e5b-fc0c-4d4a-80f8-358a65ce0a68",
        "createdAt": "2020-01-13T21:24:04Z",
        "updatedAt": "2020-01-13T21:24:04Z"
    },
    {
        "seq": 4,
        "marketoGUID": "a2151350-50c8-437f-bc71-7a054bb601f0",
        "leadID": "1000307",
        "subscriptionID": "bf14218c-ae6a-42b3-a14e-f7182903cbcd",
        "createdAt": "2020-01-13T21:24:04Z",
        "updatedAt": "2020-01-13T21:24:04Z"
    }
```

You now have the values for each custom object directly associated with the Persons in your Smart List and beyond retrieving the values, you can use the **marketoGUID** to [Update](/help/rest-api/custom-objects.md) or [Delete](/help/rest-api/custom-objects.md) these objects. For custom objects associated with Persons in a many to many relationship (N:N), the above technique returns the first level object which is the intermediary object connecting each Person to multiple second level COs.

To retrieve those 2nd level COs, start a new set of queries for the 2nd level CO type by filtering on the link field and the values extracted from the 1st level intermediary object. For example, the above "**Conference Track Subscription"** object could have another level of objects representing sessions called **"Session"** which would probably be linked by the **subscriptionID**. The request to retrieve Sessions linked to the above Conference Track Subscriptions would then look like this:

`GET /rest/v1/customobjects/session_c.json?filterType=subscriptionID&filterValues=4ad59184-6bf1-4eeb-a583-d82aeee68210,e5e0aba4-f27f-494d-93ed-9cb580989bf3,e65007cd-86b1-4c17-8d55-057c96e1788a,39d956b2-85e2-4c24-94e7-e9fa5a09d3d0,bf14218c-ae6a-42b3-a14e-f7182903cbcd`

_Footnote_ _1) **smartListName** and **smartListId** filter types are unavailable for some subscriptions. If unavailable for your subscription, you receive an error when calling the Create Export Lead Job endpoint (**"1035, Unsupported filter type for target subscription"**). Customers may contact Marketo Support to have this functionality enabled in their subscription._

Posted on _2020-01-14_ by _Tony_

## How to Retrieve Every Person (Lead)

We get many inquiries about the processes required to retrieve every person (lead) from a Marketo Engage instance. We have provided many useful answers, but none has been as complete as this one. I have identified a few key concepts needed to extract every lead using Marketo's Bulk Extract API. All the other details can be learned from the demonstration code I created to go with it. After reading this post and exploring the demo code, you will have all the information you need to know to retrieve every lead from a Marketo Engage instance.

### Overview

The core technique uses the [Bulk Lead Extract API](/help/rest-api/bulk-lead-extract.md). You might expect to be able to create a bulk lead export job with no filter, but you can't: **the API requires a filter**. The available filters are **createdAt**, **staticListName**, **staticListId,** **updatedAt**, **smartListName**, and **smartListId**. Filtering by a Smart List with no filters also seems attractive. Try that and you find that the system is smart enough to treat a Smart List with no filter the same: the API requires a filter here too. Since we need a filter, the trustworthy and canonical filter to use is **createdAt**. This filter type permits datetime ranges up to 31 days, so we need to run multiple jobs and combine the results. We start by finding the oldest possible create date for a lead in the target instance. Starting at that oldest possible date, we create jobs spanning 31 days minus one second (more on that later). After creating each job, we will enqueue it and wait for it to complete. Then we'll download the resulting file, and check its integrity using a checksum. And finally, deduplicate leads by ID then write unique leads to an output CSV file.

### Find Your Oldest Lead

I'm using a little "trick" to get the oldest possible date for a lead in the target instance. There's no API endpoint dedicated to that task, so we need a little creativity. What I do is query all folders with a **maxDepth = 1** which will give us a list of all the top-level folders in the instance. Then I collect the **createdAt** dates, parse them, and find the oldest date. This method works because some default, top-level folders are created with the instance and no leads could be created before then.

### Select Required Fields

You need to decide which fields you need to extract. Find the available fields for your target instance using the [Describe Lead 2 endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/describeUsingGET_2). The response to that request will include a list named "fields". Here's an excerpt from an example response:

```json
  "fields": [
      {
          "name": "AccountSource",
          "displayName": "Account Source",
          "dataType": "string",
          "length": 40,
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "acquisitionProgramId",
          "displayName": "Acquisition Program",
          "dataType": "reference",
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "Active_c",
          "displayName": "Active",
          "dataType": "string",
          "length": 255,
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "address",
          "displayName": "Address",
          "dataType": "text",
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "Address_lead",
          "displayName": "Address (L)",
          "dataType": "string",
          "length": 255,
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "annualRevenue",
          "displayName": "Annual Revenue",
          "dataType": "currency",
          "updateable": true,
          "crmManaged": false
      },
      {
          "name": "anonymousIP",
          "displayName": "Anonymous IP",
          "dataType": "string",
          "length": 255,
          "updateable": true,
          "crmManaged": false
      }, ...
```

This endpoint returns an exhaustive list including both standard and custom fields. The more fields that you request, the longer your export job takes to complete and the larger the resulting file will be. You should typically choose just the fields you need. Nothing prevents you from requesting every available field, so that's what I'm demoing. The field identifier required when creating an export job is the **name** value. I will extract the name values to a list of all field names. Then I'll use it to request every available field when I create each export job.

### Export Job Date Ranges: 31 Days Each

Each export job can span up to 31 days. The demo instance that I'm using was created in August of 2016, so I need to create a little over 40 jobs today. That's the number of days since the first create date divided by 31 rounded up. The API permits two export jobs to be processing at once so you could extract with two jobs running in parallel. Bulk extract jobs are a resource shared with every other integration, so I'm going to be nice. I leave the other job available for other integrations and will demonstrate running single jobs one after the other. The dates used for the **createdAt** filter are formatted using the [ISO 8601 specification](https://www.w3.org/TR/NOTE-datetime). They are always in GMT (Z+0000) so the timezone will be simply be is represented as "Z" or "+00:00". August 1st, 2016 is **2016-08-01T00:00:00+00:00** and 31 days later is September 1st, 2016 which is **2016-09-01T00:00:00+00:00.** Both start and end times are inclusive, so I'm going to subtract 1 second from that ending time: **2016-09-01T00:00:00+00:00** becomes **2016-08-31T23:59:59+00:00**. Subtracting a second avoids overlapping times. Since GMT is the default, you can also leave the **Z** or **+00:00** off.

### Deduplication

Even though I've gone to the trouble of avoiding overlapping times, I also implemented de-duplication. I did that since there are some edge cases when times change ([Daylight Saving Time](https://en.wikipedia.org/wiki/Daylight_saving_time)) resulting in ambiguous values, and, as a result, Marketo's Bulk Extract API can return otherwise unexpected duplicate leads. It's rare that this happens, but needs to be accounted for in any integration using datetime filter ranges. I removed one second to make clear that times are inclusive. I wouldn't want you to think that creating a job with the **createdAt** and **endAt** times of **2016-08-01T00:00:00Z** and **2016-09-01T00:00:00Z** respectively won't include leads created on **2016-09-01T00:00:00Z**; it will.

### Create a Job

The first step is to create a job using the [Create Export Lead Job endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/createExportLeadsUsingPOST). In this demo, the request to create our first export job looks like this:

`POST /bulk/v1/leads/export/create.json`

```json
{ "filter": {"createdAt": {"startAt": "2016-08-01T00:00:00",
                           "endAt": "2016-09-01T00:00:00"}},
"fields":["AccountSource","acquisitionProgramId","Active_c","address","Address_lead","annualRevenue","anonymousIP","BillingAddress","billingCity","billingCountry","BillingGeocodeAccuracy","BillingLatitude","BillingLongitude","billingPostalCode","billingState","billingStreet","blackListed","blackListedCause","city","CleanStatus","CleanStatus_account","company","CompanyDunsNumber","contactCompany","cookies","country","createdAt","customfield","DandbCompanyId","DandbCompanyId_account","dateOfBirth","dddS","department","doNotCall","doNotCallReason","dS","dueDate","DunsNumber","email","EmailBouncedDate","EmailBouncedReason","emailInvalid","emailInvalidCause","emailSuspended","emailSuspendedAt","emailSuspendedCause","externalCompanyId","externalSalesPersonId","facebookDisplayName","facebookId","facebookPhotoURL","facebookProfileURL","facebookReach","facebookReferredEnrollments","facebookReferredVisits","fax","firstName","gender","GeocodeAccuracy","holll","id","industry","inferredCity","inferredCompany","inferredCountry","inferredMetropolitanArea","inferredPhoneAreaCode","inferredPostalCode","inferredStateRegion","interested","interestedIn","isAnonymous","IsEmailBounced","isLead","iSTRUE","Jigsaw","JigsawCompanyId_account","JigsawContactId_lead","Jigsaw_account","Languages_c","lastName","LastReferencedDate","LastReferencedDate_account","lastReferredEnrollment","lastReferredVisit","LastViewedDate","LastViewedDate_account","Latitude","leadPartitionId","leadPerson","leadRevenueCycleModelId","leadRevenueStageId","leadRole","leadScore","leadSource","leadStatus","linkedInDisplayName","linkedInId","linkedInPhotoURL","linkedInProfileURL","linkedInReach","linkedInReferredEnrollments","linkedInReferredVisits","links","Longitude","MailingAddress","MailingGeocodeAccuracy","MailingLatitude","MailingLongitude","mainPhone","marketingSuspended","marketingSuspendedCause","middleName","mktoAcquisitionDate","mktocomment1","mktocomments2","mktoCompanyNotes","mktoDoNotCallCause","mktoIsCustomer","mktoIsPartner","mktoName","mktoPersonNotes","mktosync","mktotest1","mobile","mobilePhone","NaicsCode","NaicsDesc","newcustom","numberOfEmployees","originalReferrer","originalSearchEngine","originalSearchPhrase","originalSourceInfo","originalSourceType","OtherAddress","OtherGeocodeAccuracy","OtherLatitude","OtherLongitude","personPrimaryLeadInterest","personTimeZone","personType","phone","PhotoUrl","PhotoUrl_account","postalCode","priority","ProductInterest_c","rating","referal","registrationSourceInfo","registrationSourceType","relativeScore","relativeUrgency","requiredNumberofCylinder","salutation","sfdcAccountId","sfdcContactId","sfdcId","sfdcLeadId","sfdcLeadOwnerId","sfdcType","ShippingAddress","ShippingGeocodeAccuracy","ShippingLatitude","ShippingLongitude","sicCode","SicDesc","site","state","surveyAnswers","syndicationId","testBooleanField","testscore","title","totalReferredEnrollments","totalReferredVisits","Tradestyle","twitterDisplayName","twitterId","twitterPhotoURL","twitterProfileURL","twitterReach","twitterReferredEnrollments","twitterReferredVisits","uNSUBSCIBE","unsubscribed","unsubscribedReason","updatedAt","urgency","url","website","YearStarted"]}
```

The response looks like this:

```json
{
  "requestId": "6902#16fb52118bf",
  "result": [
      {
          "exportId": "4f2b9115-c3f2-4e40-a87c-bf803bbfed99",
          "format": "CSV",
          "status": "Created",
          "createdAt": "2020-01-17T20:10:43Z"
      }
  ],
  "success": true
}
```

### Enqueue the Job

The job is now created but just sitting there doing nothing. To run the job, we need to call the [enqueue endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/enqueueExportLeadsUsingPOST) using the **exportId** value to build the URI for the request. That looks like this:

`POST /bulk/v1/leads/export/4f2b9115-c3f2-4e40-a87c-bf803bbfed99/enqueue.json`

There's no body for this POST, we are simply using the POST HTTP verb here. That request will generate a response like this:

```json
{
  "requestId": "1836a#16fb5238a48",
  "result": [
      {
          "exportId": "4f2b9115-c3f2-4e40-a87c-bf803bbfed99",
          "format": "CSV",
          "status": "Queued",
          "createdAt": "2020-01-17T20:10:43Z",
          "queuedAt": "2020-01-17T20:13:23Z"
      }
  ],
  "success": true
}
```

As I mentioned earlier, you are limited in the number of jobs that can be run at a time. There is also a limit to the number of jobs queued at one time: 10. We need more than 40 so that limit prevents us from creating all the jobs at once. Other integrations can run jobs too, so we need to account for the possibility that all slots are full. Trying to enqueue a new job when there are already 10 queued jobs will generate a [1029](/help/rest-api/error-codes.md) error. When you get a **1029**, use an exponential backoff until the job can be enqueued. I wait 1 minute and double that value each time I get a **1029** error code up to 4 minutes between requests, but never longer than that. This technique is known as [Truncated Binary Exponential Backoff](https://devopedia.org/binary-exponential-backoff) and is best practice for recoverable errors and status checks.

### Wait for Job to Complete

Each job takes some time to run so we will call the [status endpoint](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsStatusUsingGET) to monitor its progress. Again, we'll include the **exportId** in the request URI like this:

`GET /bulk/v1/leads/export/4f2b9115-c3f2-4e40-a87c-bf803bbfed99/status.json`

Before the job is complete, you get a response that looks like this:

```json
{
    "requestId": "153cb#16fb525435d",
    "result": [
        {
            "exportId": "4f2b9115-c3f2-4e40-a87c-bf803bbfed99",
            "format": "CSV",
            "status": "Processing",
            "createdAt": "2020-01-17T20:10:43Z",
            "queuedAt": "2020-01-17T20:13:23Z",
            "startedAt": "2020-01-17T20:13:49Z"
        }
    ],
    "success": true
}
```

I execute the same exponential backoff (1 minute up to 4 minutes) while the job status is "Queued". The status isn't real-time; it's updated once per minute and there's very little benefit to polling faster. I reset the backoff when the job status changes to "Processing". We are waiting for a status "Completed," which looks like this:

```json
{
  "requestId": "10ad9#16fb5268f9b",
  "result": [
      {
          "exportId": "4f2b9115-c3f2-4e40-a87c-bf803bbfed99",
          "format": "CSV",
          "status": "Completed",
          "createdAt": "2020-01-17T20:10:43Z",
          "queuedAt": "2020-01-17T20:13:23Z",
          "startedAt": "2020-01-17T20:13:49Z",
          "finishedAt": "2020-01-17T20:15:28Z",
          "numberOfRecords": 59,
          "fileSize": 74436,
          "fileChecksum": "sha256:de553362e7ffad6556ae9ea749655c35010c7f0e944fc5a85782183130dca18d"
      }
  ],
  "success": true
}
```

The **numberOfRecords** value is zero when the request returns no leads. I check this value and skip the next steps when that makes sense. When leads are returned, I extract the **fileChecksum** value. We use it to check the integrity of the file when it's downloaded.

### Get Your Leads

If the **numberOfRecords** is larger than zero, download the exported file using [Get Export Lead File](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportLeadsFileUsingGET) with a request like this:

`GET /bulk/v1/leads/export/4f2b9115-c3f2-4e40-a87c-bf803bbfed99/file.json`

Check that the file transferred without error: calculate the checksum of the file and compare to the **fileChecksum** we saved earlier. Calculate the checksum using [SHA-2](https://en.wikipedia.org/wiki/SHA-2) and specifically the SHA256 hash function. If the calculated checksums don't match, there was an error in the file transfer and you can either try the transfer again or abort and recover manually.

### Aggregate the Data

After cycling through every 31-day range from the first lead until today, you'll have a complete set. You'll also have one file for each range. The simplest way to build a single aggregated file with every lead would be to concatenate these files after removing the header row for all but the first file. If you do that, don't forget to expect and plan for potential duplication later in your data processing pipeline. In my demonstration, I process the files as I download them. Before adding each row of data to the output file, I deduplicate by checking to see if the row's lead ID has already been written.

I've developed some demonstration code hosted [here](https://github.com/Marketo/REST-Sample-Code/tree/master/python/LeadDatabase/Leads) which hopefully fills in the details of this process and can serve as a template for your own development. The demo code is intended to be a learning tool so there are improvements to robustness that would be required for a production system. **The code is provided AS-IS** under the MIT license, but it's probably good enough for one-off usage with human supervision. Nothing is stopping you now! When you follow this process, you will extract every lead using Marketo's Bulk Extract API and potentially every field for the target Marketo Engage instance. To extend your data further, get each lead's activities using the techniques.

Posted on _2020-03-05_ by _Tony_

## February 2020 Updates

In February 2020 we are releasing new REST APIs. See the full list of updates below.

### Announcements

* After September 2020, [Asset API](/help/rest-api/assets.md) Endpoints will no longer accept **_method** query parameter. This was used to pass query parameters in a POST body to bypass URI length limitations. To accommodate requests which required this parameter, the URI limit for Asset APIs will be increased from 6KiB to 65KiB.
* With regard to our position on ITP, please see thisMarketo Community post: [Browser Cookie Updates: How Marketo/Munchkin Is Affected](https://nation.marketo.com:443/t5/knowledgebase/browser-cookie-updates-how-marketo-munchkin-is-affected/ta-p/251524)
* A change was made to the "Change Status in Progression" activity. The "Program Member ID" attribute was added to in support of the upcoming feature "Program Member Custom Fields".

Posted on _2020-02-26_ by _David_

## Deprecation of Munchkin Associate Lead Method

With the next release of the Munchkin JavaScript Client, version 159, we will begin deprecation of the Munchkin [Associate Lead method](/help/javascript-api/api-reference.md). Beginning with this version, when the method is invoked, a warning will be issued in the browser console indicating that the method will be removed in a future release. Once the method has been removed, attempts to use the method will result in failure. Marketo customers which we have identified as having used this method recently will be notified individually of their use. For more information on the Munchkin 159 release, [see this Marketing Nation Post](https://nation.marketo.com:443/t5/product-documents/munchkin-javascript-version-159-amp-associate-lead-deprecation/ta-p/299687).

### FAQs

How do I know if I'm affected?

Adobe will notify customers where we have observed usage of this method on their subscription, and will do so several times over the deprecation period.

When will the method be removed?

This method will be removed in Munchkin JS v161, scheduled for General Availability alongside the October 2021 Marketo release.

Why is this method being removed?

More performant ways of fulfilling the same use cases have been implemented and released since the introduction of this method. In order to improve the performance and health of our services, it is sometimes necessary to remove features which do not perform to acceptable standards.

What should I use instead of this method?

Munchkin Associate Lead has two primary use cases, submission of person data, and association of a browser web-tracking cookie to the corresponding person record in Marketo. Since Munchkin Associate Lead was introduced, more robust ways of performing data submission and cookie association have been implemented.

#### Server-Side Submission

If you do not need browser-side submission, the REST API offers many methods for [person data submission](/help/rest-api/leads.md), and a [purpose-built method for associating cookies with person records](/help/rest-api/leads.md).

When is Version 159 of Munchkin Rolling Out?

Version 159 has been in General Availability since the October 2020 Marketo release.

Posted on _2020-05-06_ by _Kenny_

## Make a Marketo Form Submission in the Background

When your organization has many different platforms for hosting web content and customer data it becomes fairly common to need parallel submissions from a form so that the resulting data can be gathered in separate platforms. There are several strategies to do this, but the best one is often the simplest: Using the Forms 2 API to submit a hidden Marketo form. This will work with any new Marketo Form, but ideally you should create an empty form for this, which has no fields. This will ensure that the form doesn't load any more data than necessary, since we don't need to render anything. Now just grab the [embed code](https://experienceleague.adobe.com/en/docs/marketo/using/home) from your form and add it to the body of your desired page, making a small modification. Your embed code includes a form element like this:

`<form id="mktoForm_1068"></form>`

You'll want to add 'style="display:none"' to the element so it is not visible, like this:

`<form id="mktoForm_1068" style="display:none"></form>`

Once the form is embedded and hidden, the code to submit the form is really quite simple:

```javascript
var myForm = MktoForms2.allForms()[0];
myForm.addHiddenFields({
 //These are the values which will be submitted to Marketo
 "Email":"<test@example.com>",
 "FirstName":"John",
 "LastName":"Doe"
 });
myForm.submit();
```

Forms submitted this way will behave exactly like if the lead had filled out and submitted a visible form. Triggering the submission will vary between implementations since each one have a different action to prompt it, but you can make it occur on basically any action. The important part is setting your fields and values correctly. Be sure to use the SOAP API name of your fields which you can find with Export Field Names to ensure correct submission of values.

### Migrating from Munchkin Associate Lead

Background form submission is one of the recommended replacement methods for Munchkin Associate Lead. The sample HTML page below demonstrates migration at a high level, by reusing the same values which are submitted to Associate Lead.

```html
<html>
<head>
    <!--
      Munchkin Code
      Replace with your own instance code
    -->
    <script type="text/javascript">
        (function() {
          var didInit = false;
          function initMunchkin() {
            if(didInit === false) {
              didInit = true;
              Munchkin.init('CHANGE ME');
            }
          }
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = '//munchkin.marketo.net/munchkin-beta.js';
          s.onreadystatechange = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
              initMunchkin();
            }
          };
          s.onload = initMunchkin;
          document.getElementsByTagName['head'](0).appendChild(s);
        })();
        </script>
</head>

<body>
  <!--
    Start Embed code.
    Pasted from Form Actions -> Embed Code except for addition of 'style="display:none"' to the form tag in order to hide it, and instance-specific codes redacted
    Replace with your own code for testing
  -->
  <script src="CHANGE ME"></script>
  <form id="CHANGE ME" style="display:none"></form>
  <script>MktoForms2.loadForm("CHANGE ME", "CHANGE ME", "CHANGE ME TO AN INTEGER ID");</script>
  <!--End Embed Code-->

  <!--Demo code-->
    <script>
        //The same map which is assembled for the Munchkin submission can be reused for the form submission
        let values = {
            "Email": "email@example.com",
            "FirstName": "Test",
            "LastName": "Record"
        }
        //whenReady lets us apply a callback to all mkto forms on the page
        //the callback function fires whenever a form is completely loaded
        //for most use cases this will just be used to capture a reference to the form for later usage
        //submission is done in line here for demonstration only
        MktoForms2.whenReady(function(form){

            //the addHiddenFields methods lets us add arbitrary fields to the form as well as their values
            form.addHiddenFields(values);

            //pass the same set of values to associateLead
            //hashString: secret + email
            Munchkin.munchkinFunction('associateLead', values, "CHANGE ME");

            //submit the form
            form.submit();


        })
    </script>
</body>

</html>
```

Posted on _2020-05-26_ by _Kenny_

## July 2020 Updates

In July 2020 we are releasing new REST APIs, enhancing existing APIs, and resolving defects. See the full list of updates below.

* Added two endpoints that allow you to query and delete users that have not yet accepted their invitation (i.e. are "pending" users). The [Get Invited User by Id](/help/rest-api/user-management.md) endpoint allows you to query a pending user. The [Delete Invited User](/help/rest-api/user-management.md) endpoint allows you to delete a pending user.
* The [Invite User](/help/rest-api/user-management.md) endpoint has been updated to accept ISO 8601 compliant datetime strings for the **expiresAt** parameter.
* Both the [Get User by Id](/help/rest-api/user-management.md) and [Update User Attribute](/help/rest-api/user-management.md) endpoints have been updated to return the last user login time in the **lastLoginAt** attribute.
* Fixed issue where the [Create Static List](https://developer.adobe.com/marketo-apis/api/asset#operation/createStaticListUsingPOST) endpoint would return an error "611, System error" when you tried to create a static list that already existed. Changed to return error "709, Static List with the same name already exists". [LM-135934]
* Fixed issue where [Create Email](https://developer.adobe.com/marketo-apis/api/asset#operation/createEmailUsingPOST) endpoint would return an error "611, System error" when you tried to create an email that already existed. Changed to return error "709, Email with the same name already exists". [LM-138648]
* Fixed issue where Landing Page query endpoints were returning incorrect **createdAt** values. The endpoints were returning the time when a landing page was last approved. They now return to the time when a landing page was created. [LM-138648]
* Fixed issue where [Merge Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/mergeLeadsUsingPOST) endpoint would return an error "611, System error" for invalid merge operation. Occurred when the merge resulted in a duplicate lead and **mergeinCRM** was set to true. Changed to return error "712, You're creating a duplicate record. We recommend you use an existing record instead". [LM-137463]

Posted on _2020-08-01_ by _David_

## Guest Post - Deep Dive: Custom Object vs Custom Activities vs Custom field

**This is a guest post from Amit Jain, Marketo Champion 2020, MarTech IT Specialist** As the Enterprise level Marketing automation platform, Marketo manages your user/customer/prospects information acquired from several sources and maintain that in Marketo for better personalization, segmentation and reporting. These sources can range from your website forms to list build to your CRM data to your e-commerce data. Marketo offers standard objects i.e. Lead, Company, Opportunity and Activity etc. These standard objects are sometimes not sufficient to fulfill the emerging marketing needs of extended datasets to be available in Marketo.

 For example, items added to the cart, students applied for different courses, products owned by a specific person, and consents for different subscriptions etc. This information can be critical for Marketers to keep the customer/prospect engaged by providing more personalized content and unified user experience across platforms. To accommodate these business needs, Marketo provides custom ways to store this type of data in Custom Fields, Custom Activities and Custom Objects. I have observed people having issues understanding when to use which of the options. In this blog post, **we will understand in detail what these three things actually are and when to use which one with some examples.**

**Custom Fields**

The "Lead" object in Marketo is the master object and everything else is connected with this one, directly or indirectly. Marketo allow you to create custom fields on the "Lead" object, "Company" object and recently they announced the support of "Program member" custom fields. These custom fields fulfill your need to store certain type of data. For example, you might need to store the Job Function or different consents from the user. There are two types of custom fields in Marketo:

1. **Synced From CRM Fields:** As part of the auto Marketo ↔︎ SFDC sync, Marketo syncs all the custom fields visible to Marketo user in SFDC on Lead, Contact, Account and Opportunity Object.
1. **Marketo Only Fields:** You can directly create a field in Marketo. The data of these fields will not be synced with SFDC.

**Quick Tips**

* Do you have a Marketo only field and now want to sync the data in SFDC? Check out [this blog](https://themarketingautomationblog.com/2019/12/06/field-management-merging-remapping-hiding-marketo-fields/) to learn how you can do that.
* Learn more about custom fields [here](https://themarketingautomationblog.com/2019/11/15/knowing-your-marketo-fields/).
* Marketo APIs do not support updating/creation of custom fields as of now.

**Custom Objects**

Apart from standard objects, Marketo allows you to create your own custom objects. _You can create custom objects and relate to either Company or Lead object or another custom object._ A custom object is a set of custom records that supplement standard Lead and Company records. Custom objects allow you to store additional data in a scalable manner and link that data to a Lead or Company record. You can build a custom object with any combination of standard (Link Fields) and custom fields, populate those fields to create custom object _records_, and then link those records to a Lead or a Company record. Powerful and flexible, linked records enrich your Segments, Smart Lists, and Campaigns by letting you build those assets with information not found in Lead fields and Company fields. A custom object can have one of the following types of relationships:

* **One-to-one Relationship**: where each custom object has a single Lead/Company object record.
* **One-to-Many Relationship**: where each custom object contains multiple custom object records related to a Lead/Company.
* **Many-to-Many Relationship:** where multiple custom object records can link with multiple lead/company objects. For example, multiple students are enrolled in multiple courses from a course catalog.

**Quick Tips**

* Learn more to set up custom objects [here](https://experienceleague.adobe.com/en/docs/marketo/using/home).
* You can use the Marketo custom object as an intermediary object as well meaning custom object of custom object.

### Why Custom Objects?

Custom objects allow you to compile and use unique data that is relevant to a company or lead but is not necessarily static information about the company or lead themselves. While lead fields relate to an individual's lead information (_Email Address_, _Zip Code_, and so on), business information (_Job Title_, _Industry_, and so on), or system-driven information (_Marketo ID_, an SFDC ID, or Create Date etc.), custom object fields are fully customizable. For example, use custom objects to store information such as the following:

* A user's purchase history.
* Cart information.
* Whether or not a customer has used one of your limited-time, promotional discount codes.
* Supplementary information acquired from survey results, interviews, and event attendance.
* A user's trial information including trial instance URL, Start Date, End Date, Number of user's etc.

### Marketo Custom Object Limitations

1. By default, Marketo allows you to create 10 custom objects. You can increase the limit with an additional subscription fee.
1. The Default number of fields per object is 50 but you can request Marketo support for additional fields if required. Thank you [Michael Florin](https://www.linkedin.com/in/michaelflorin/) for additional input here.
1. There is a limit on the number of records that you can have across all the custom objects. It depends on your subscription with Marketo. This limit can be increased with an additional subscription fee.
1. If a custom object was created using the API, Marketo does not allow to edit the CO schema from Marketo UI.

**Quick Tips**

* Marketo API's support CRUD (Create, Read, Update, and Delete) operation on custom objects.
* You can use this custom object data for email personalization using Velocity Script.
* You can find all Custom object related endpoints [here](https://developer.adobe.com/marketo-apis/api/mapi#operation/getExportProgramMembersStatusUsingGET).

### Custom Object Terminology

**Custom Object**: A container that holds a grouping of all the custom object records. Formally known as a data card set or custom table. **Custom Object Record**: Data record holding additional field information that can be tied to a lead or company. A record can be made up of standard lead or company fields, and custom object record fields. Formally known as a data card or data table row. **Custom Object Record Field**: Completely customizable fields to collect unique or temporary information. These fields are created and housed inside the custom object itself. Formally known as a data card field or database table field/column. **Link Field**: Special type of custom object record field to define the relationship between custom object record and linked Lead/Company object record. When you create custom objects, you must provide link fields to connect the custom object record to the correct parent record.

* For a one-to-many or one-to-one custom structure, use the link field in the custom object to connect it to a person or a company.
* For a many-to-many structure, you use two link fields, connected from a separately created intermediary object (which is a type of custom object, too). One link connects to people or companies in your database and the other connects to the custom object. In this case, the link field is not located in the custom object itself.

### Custom Activities

**There are several ways someone can interact with our organization. They may visit your company's website, attend one of your tradeshows, or perhaps click a link in an email sent by you. These actions are activities**, and whatever action they take, Marketo captures it so your Marketing and Sales Teams can better understand user's behavior for personalized and unified engagement. **_Custom Activities_** _can help you track an activity that isn't related to a Marketo form, email, or landing page_. For example, if you want to track when someone viewed a video on a website or took a survey, use a custom activity. Custom activities differ from custom objects. Use custom objects when the value can change (i.e. "car color" changes from blue to red). Use custom activities when tracking moments that occurred, and their details cannot change (i.e. "purchased car"). By default, the limit of max number of custom activities that can be defined is 10. This can be increased with an additional subscription fee. As per the [Marketo data retention policy](https://nation.marketo.com/t5/knowledgebase/tkb-p/support_solutions-documents), custom activities will be deleted automatically after 25 months.

**Custom Activity:** Non-Marketo events that you would want to track inside Marketo. **Custom Activity ID:** Marketo assign a numeric ID to the custom activity that can be used while trying to push/pull the activity data using Marketo API. **Custom Activity Fields:** Activity meta data can be stored in an activity field. For example, if you are tracking the views on video, the fields could be the Page URL, Video Title etc. **Custom Activity Primary Field:** Custom activity fields that can be used as the smart list filer criteria.

**Quick Tips**

* The API endpoints for custom activities are available [here.](https://developer.adobe.com/marketo-apis/api/mapi#operation/addCustomActivityUsingPOST)

## Custom Object vs Custom Activity

**Custom Object**

**Custom Activity**

1

Max 10 Custom objects by default per instance.

Max 10 custom activities by default.

2

Max 50 custom object fields per custom object.

Each custom activity type can have up to 20 secondary attributes.

3

Max 1MM custom object records; May very based on your subscription.

After 25 months custom activities will be deleted as per the Marketo data retention policy.

4

Can be used as Filter and Trigger in Smart Lists and Smart Campaigns.

Can be used as Filter and Trigger in Smart Lists and Smart Campaigns.

5

Can be used to personalize the email content.

Cannot be used to personalize the email content.

6

Can perform CRUD operation on a custom object record.

Only Create and Read is allowed in custom activities.

7

Use custom objects when the value can change (i.e. "car color" changes from blue to red).

Use custom activities when tracking moments that occurred, and their details cannot change (i.e. "purchased car").

8

Custom objects tell you the fact. i.e. present value.

Custom Activities tell you the events that have happened in the past.

Posted on _2020-10-18_ by _Amit_

## January 2021 Updates

In January 2021 we are releasing new REST APIs and resolving several defects. See the full list of updates below.

* Added [Submit Form](/help/rest-api/leads.md) endpoint which allows you to perform programmatic form submissions. Third party forms can now integrate with Marketo forms to take advantage of existing marketing workflows.
* Added [Get Landing Page Full Content](/help/rest-api/landing-pages.md) endpoint which returns the serialized HTML version of a landing page. Allows you to render fully personalized previews of landing pages without having to log in to Marketo Engage. This can help streamline editing and translation workflows within integrated applications.
* You can now configure the number of custom objects available for access via the Velocity script. Configuration instructions can be found [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/email-setup/change-custom-object-retrieval-limits-in-velocity-scripting).

### Defect Resolutions

* Fixed issue where the [Delete User](/help/rest-api/user-management.md) endpoint would allow you to delete an API-Only User that was in-use by a Custom Service. Now it returns an error "611, You cannot delete an API user that is being used in API service". [LM-141893]
* Fixed issue where the [Get Users](/help/rest-api/user-management.md) endpoint would return deleted users in some cases. [LM-141542]
* Fixed issue where [Clone Program](https://developer.adobe.com/marketo-apis/api/asset#operation/cloneProgramUsingPOST) endpoint. If you specified a program name that exceeded 255 characters, it would return "611, Unable to clone program error". Now it returns "701, name cannot exceed more than 255 characters". [LM-143436]
* Fixed issue with [Approve Landing Page Draft](https://developer.adobe.com/marketo-apis/api/asset#operation/approveLandingPageUsingPOST) endpoint. When you approved a landing page with the mobile version activated, you would see content from the mobile version in the desktop version in certain cases. [LM-146867]
* Fixed issue with [Unapprove Landing Page](https://developer.adobe.com/marketo-apis/api/asset#operation/unapproveLandingPageByIdUsingPOST) endpoint which allowed you to unapprove a landing page that was in use as a follow-up page by one or more forms. It now returns an error "709, Unapprove landing page failed. Landing page is in use by one or more forms as a follow-up page with form IDs:[_formId1,formId2,..._]". [LM-143326]

Posted on _2021-01-15_ by _David_

## Munchkin 160 Beta and Beacon API

**Jan 27th 2021:** Some Marketo users who will be affected by Associate Lead deprecation received an email notification in error indicating that they have the Munchkin Beta setting enabled on one or more of their instances. This release will be held until the correct audience can be notified. Beginning with version 160 of the Munchkin JavaScript, the [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) becomes the default way that Munchkin communicates with the Marketo backend. This became available as an option in Summer 2020 with the release of version 159 via the **useBeaconAPI** configuration parameter. The Beacon API has several advantages over using the old XMLHttpRequest method, but the principal improvement is that it is a non-blocking asynchronous API for HTTP communication which is available for use in all modern Internet browsers. While most users of Munchkin will not notice a change in website behavior, this update will prevent Munchkin from blocking navigation while waiting to submit a click event to the backend, or more simply, this all but eliminates the possibility of Munchkin causing a browser to "hang" after clicking a link to a new page. This has been a rare but frustrating occurrence for some Marketo customers.

As of Jan 27th 2021, the rollout of this version is on hold pending rescheduling. While no problems related to this change are anticipated, and none have been identified while testing, it is impossible for Marketo to test all possible deployment configurations of Munchkin and you may wish to test these changes beforehand or forego this change until general availability of this version. Instructions for various scenarios are presented below.

### Test Beacon API

If you wish to test the updated Beacon API in anticipation of the upcoming version, you can do so, by adding the **useBeaconAPI** parameter to your Munchkin configuration on an external test page. This test will work with either the generally available or beta version of Munchkin. The configuration parameter is shown below in the second argument of the invocation of the `Munchkin.init()` method on line 7: `{ 'useBeaconAPI': true}`

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('299-BYM-827', {"useBeaconAPI":true});
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName['head'](0).appendChild(s);
})();
</script>
```

### Disable Munchkin Beta on Marketo Landing Pages

To disable Munchkin Beta on Marketo landing pages, you need to access your [Treasure Chest](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/settings/enable-or-disable-treasure-chest-features) menu in the Admin section of your subscription and change the Munchkin Beta on Landing Pages setting to disabled.

### Disable Munchkin Beta on External Pages

If you have deployed the Beta version of Munchkin JavaScript to external web pages, and wish to forego this change until it is generally available, you need to alter your Munchkin JS snippet to target the **munchkin.****js** file instead of the **munchkin-beta.****js** file. In the example below, this is the value of the **s.src** variable on line 11. Your snippet may not closely resemble the example, or may be deployed by a tag manager on your external pages and you may need to reach out to your IT resources or whomever manages your websites with Munchkin tracking enabled.

```javascript
<script type="text/javascript">
(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('299-BYM-827');
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';//This line should have the munchkin.js file, not munchkin-beta.js
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName['head'](0).appendChild(s);
})();
</script>
```

Posted on _2021-01-08_ by _Kenny_

## Final API Deprecation of Email V1

[Deprecation of Email V1 began almost two years ago](https://nation.marketo.com:443/t5/knowledgebase/email-editor-1-0-is-being-deprecated-june-18th/ta-p/250666) and beginning with the March maintenance release to London & Netherlands subscriptions on March 17th, 2021 and all other subscriptions on March 19th, 2021, all API support for V1 emails will be ended. After this release, any attempts to interact with V1 emails via the Asset APIs will result in errors and no actions taken. All known remaining users since February 24th, 2021 have been notified, but it is possible that there are still integrations which may attempt to interact with these assets. The most common types of affected integrations are services which offer digital asset management, translation, and localization. If you do observe integration failures as a result of this change, [you will still be able to upgrade problematic assets by editing and approving them](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/email-editor-2/transitioning-to-email-editor-2-0). Once an email asset is upgraded to V2, you should be able to resume using it with integrated services.

Posted on _2021-03-17_ by _Kenny_

## May 2021 Updates

In May 2021 we are releasing new REST APIs, enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* Added Program Member APIs that allow you to retrieve, update, and delete program membership records. For more information see [REST API > Lead Database > Program Members](/help/rest-api/program-members.md).
* Added Bulk Custom Object Extract APIs that allow you to export first-level Marketo Custom Object records which are associated with leads in a one-to-many relationship. For more information see [REST API > Bulk Extract > Bulk Custom Object Extract](/help/rest-api/bulk-custom-object-extract.md).
* We have enhanced both the [Lead API](/help/rest-api/leads.md) and the [Bulk Lead Extract API](/help/rest-api/bulk-lead-extract.md) to permit users to retrieve the Adobe Experience Cloud Id (ECID). This allows users who [Sync Audiences from Adobe Experience Cloud](https://experienceleague.adobe.com/docs/marketo/using/product-docs/core-marketo-concepts/miscellaneous/set-up-adobe-experience-cloud-audience-sharing.html) to identify leads that have associated ECIDs. This opens up [integration possibilities](https://adobeexchangeec.zendesk.com/hc/en-us/articles/360024277392-Adobe-Experience-Cloud-Using-the-ECID-for-integration) with other Adobe Experience Cloud products.
* We have enhanced the [Bulk Lead Import API](/help/rest-api/bulk-lead-import.md) to support adding leads to company records during the import process. This is done by including the **externalCompanyId** field to the import file.
* We have enhanced several Program endpoints to provide parity with functionality found in the Marketo Engage UI. We have enhanced the [Create Programs](/help/rest-api/assets.md) and [Clone Programs](https://developer.adobe.com/marketo-apis/api/asset) endpoints to permit create, clone, or move operations on event programs. This is for users that organize event programs by "nesting" them underneath other program types. We have also enhanced the [Delete Program](https://developer.adobe.com/marketo-apis/api/asset) endpoint to permit deletion of programs that contain the following assets: Push Notifications, In-App Messages, Reports, Landing Pages with Embedded Social Assets.
* As a Marketo Admin, you can [mark a specific field as "sensitive"](https://experienceleague.adobe.com/en/docs/marketo/using/home) so its values [never get pre-filled in forms](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/forms/form-fields/disable-pre-fill-for-a-form-field), thereby protecting users' sensitive data. We have enhanced several Form Field endpoints to provide parity with this functionality found in the Marketo Engage UI.

### Defect Resolutions

* Fixed issue with Delete Program endpoint. If you tried to delete a program in a shared folder, it would return "611, System Error". Now it returns " "Target program is in a shared folder and cannot be deleted. The folder must be unshared before attempting deletion."
* Fixed issue with Clone Program endpoint. If you tried to clone a program that contained a DateTime in a flow step, it would return "611, System Error". Now it successfully clones the program.
* Fixed issue with Create Programs endpoint that inadvertently allowed you to create a program underneath an email program (which is not allowed).
* Fixed issue with Clone Program endpoint. If you cloned a program that contained a landing page, the name of the landing page in the target program was missing an underscore between program name and landing page name. e.g. `http://<_pod_\>.marketo.com/lp/<_munchkin_\>/<_program name_\>**_**<_LP name_\>.html`

Posted on _2021-05-07_ by _David_

## Limited Time Offer to Join Adobe Exchang

Marketo Engage partner community support is one of the pillars of our customers' success. We want to ensure the Marketo Engage Integration ecosystem is well represented in the Exchange Marketplace, and have a special offer for LaunchPoint partners. For a very limited time that will not be extended we are offering our LaunchPoint partners a free Innovate partnership in the Exchange program through the end of 2022 (approximately $15k value). We designed this offer to encourage LaunchPoint partners to create their integration listings in the Exchange Partner Portal, which will then be publicly searchable in the Adobe Exchange Marketplace. To see a full list of the Innovate partnership benefits that you receive for no charge through December 2022.

1. Go to [Adobe Exchange Partner Support Center](https://adobeexchangeec.zendesk.com/hc/en-us?mkt_tok=NjA4LURIVi05MTUAAAF-P5lIeVWOuBmKMS_uE_NpgFKtC0ukt7z_ksnq_Sbzb6mzXUuXpqpqQeujtPdZ24WcjMdptygQSR9XrYt_Cw)
1. Click on "Submit a request" in the top right corner
1. In **Please choose your issue below** dropdown choose "Adobe Exchange Support"
1. In **Your email address** enter your email address
1. In the **Subject** box enter "LaunchPoint Offer"
1. In the **Description** box enter "LaunchPoint Offer"
1. In the **Support Type** dropdown select "Program Support"
1. In the **Adobe Exchange Product** dropdown select "Adobe Exchange Program"
1. Submit the Form. Our team is in contact with you shortly!

Posted on _2021-07-22_ by _David_

## August 2021 Updates

In August 2021 we are enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* We have enhanced the Bulk Activity Extract API to permit users to filter using primary attributes for 6 different activity types. For more information see [Bulk Activity Extract](/help/rest-api/bulk-activity-extract.md).
* In order to give Marketo Sales Connect users more access to their sales activity data we enabled additional sales activity attributes. We added the following attributes to Send Sales Email, Open Sales Email, and Click Sales Email activities:

* Marketo Sales Person ID - Unique ID for person record in Sales Connect
* Sales Campaign Name - Name of sales campaign, if email was part of a sales campaign
* Sales Campaign URL - Sales Connect URL for sales campaign if email was part of a sales campaign
* Sales Template Name - Name of email template in Sales Connect, if a template was used
* Sales Template URL - Sales Connect URL for email template, if a template was used

### Emails

* We have enhanced the Get Emails endpoint by adding `earliestUpdatedAt`/`latestUpdatedAt` filter. This allows you to use the `updatedAt` field to search only for a subset of emails, allowing incremental synchronization.
* We have enhanced the Get Emails, Get Email by Name, Get Email by Id endpoints to support retrieval of [Champion and Challenger](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/email-tests-champion-challenger/add-an-email-champion-challenger) type email records.

### Defect Resolutions

* Fixed issue with the Get Users endpoint. Users that had been issued a [Marketing Calendar](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/marketing-calendar/understanding-the-calendar/issue-revoke-a-marketing-calendar-license) license were not being returned. Marketing Calendar users are now correctly returned.
* Fixed issue with Submit Form endpoint. In the event of duplicate lead records, Submit Form is used to issue a "1007, Multiple lead match lookup criteria" error. Submit Form now updates the most recently updated record in the same way that the [Forms 2.0 API](/help/javascript-api/forms-api-reference.md) does.
* Improved several misleading error messages returned by Update Lead Field and Create Lead Fields endpoints. [LM-151890, LM-151888, LM-151889]
* Fixed issue with Get Lead Field by Name and Get Lead Fields endpoints. Both endpoints could potentially return slightly out of date information. They now always return current information.
* Fixed issue with [Bulk Extract API](/help/rest-api/bulk-extract.md) when using the "range" HTTP header for partial retrieval where the last byte in the range was not returned.
* Fixed issue with Update Snippet Metadata endpoint. When updating the snippet name or description, the snippet status was changed to "approved with draft". Now the snipped status remains unchanged after updating the snippet name or description.
* Fixed issue with Add Email Module endpoint. When adding a module that contained a snippet, it returned a "611, System Error". It now correctly adds the module to the email.
* Fixed issue with Delete Program endpoint. When deleting a program that contained an In-App Message local asset, it returned a "611, System Error". It now correctly deletes the program.

Posted on _2021-08-22_ by _David_

## Munchkin Version 161 Rollout

On September 7th 2021, version 161 of Munchkin will begin rolling out to 10% of subscriptions with Munchkin Beta enabled, followed by 50% on September 16th, and 100% on September 30th. This change will affect Marketo landing pages and the version of the file munchkin-beta.js served to external landing pages which are loaded from subscriptions that the new version has been rolled out to. This version fully deprecates the Munchkin Associate Lead method, which is a feature that allowed submission of person data to a Marketo subscription and associated web browsing history with a known person record. Associate Lead is being removed in favor of more modern and secure alternatives, like the [Forms JS API](/help/javascript-api/forms-api-reference.md), the Form Submit API and the [Associate Lead REST API](/help/rest-api/leads.md). If you or your organization uses this method, you should migrate away from usage by October 12th 2021 when the October release rollout is scheduled to begin. If you no longer wish to opt into the Munchkin beta, you can disable usage on Marketo landing pages by toggling the "Munchkin Beta on Landing Pages" feature to `disabled` in the [Treasure Chest menu](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/settings/enable-or-disable-treasure-chest-features). If you have deployed the Munchkin Beta JavaScript to external web pages and wish to switch to the default Munchkin release channel, you need to update your code snippet to load Munchkin JavaScript from munchkin.js instead of munchkin-beta.js.

Posted on _2021-08-24_ by _Kenny_

## TLS 1.0 and TLS 1.1 End-of-Life for Munchkin Service

Beginning on October 21st 2021, munchkin.marketo.net, which is used to serve Munchkin JavaScript to visitors, will no longer accept connections using [TLS 1.0 or TLS 1.1.](https://en.wikipedia.org/wiki/Transport_Layer_Security) These encryption standards are no longer accepted as part of web security best practices and are no longer supported by modern browser versions. There are no anticipated negative impacts as a result of this change.

Posted on _2021-10-04_ by _Kenny_

## October 2021 Updates

In October 2021 we are enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* We have enhanced the [Submit Form](https://developer.adobe.com/marketo-apis/api/mapi#operation/SubmitFormUsingPOST) endpoint to support program member custom fields as part of the form submission. Optionally, a program can be specified as the program to add form to, and/or the program to add program member custom fields to as described [here](/help/rest-api/leads.md).
 We have enhanced the [Get Program Members](https://developer.adobe.com/marketo-apis/api/mapi#operation/getProgramMembersUsingGET) endpoint to support date range based queries based on the updatedAt attribute. This is done by passing starting and ending datetime parameters as described [here](/help/rest-api/program-members.md).
* We have enhanced the [Leads Fields](/help/rest-api/leads.md) APIs to support [Sensitive Fields](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/field-management/mark-a-field-as-sensitive). The [Get Lead Field by Name](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadFieldByNameUsingGET), [Get Lead Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/getLeadFieldsUsingGET), [Create Lead Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/createLeadFieldUsingPOST), and [Update Lead Field](https://developer.adobe.com/marketo-apis/api/mapi#operation/updateLeadFieldUsingPOST) endpoints now support the isSensitive attribute.

### Defect Resolutions

* Fixed issue with [User Management](/help/rest-api/user-management.md) API. Pertains to Marketo users that are configured for use with [Sales Insight](https://business.adobe.com/products/marketo/sales-insight.html). These users are now returned by the [Get Users](https://developer.adobe.com/marketo-apis/api/user/#operation/getUsersUsingGET) endpoint, and these users may now be deleted using the [Delete User](https://developer.adobe.com/marketo-apis/api/user/#operation/deleteUserUsingPOST) endpoint. [LM-155864]
* Fixed issue with Add [Rich Text Field](https://developer.adobe.com/marketo-apis/api/asset#tag/Form-Fields/addRichTextFieldUsingPOST) endpoint. When adding a rich text field that is longer than 65k characters to an email, landing page, snippet, or form, it returned a "611, System Error". It now returns error "701, Operation cannot be completed. 'content' exceeds a maximum length of 65,535 bytes".

Posted on _2021-10-25_ by _David_

## January 2022 Updates

In January 2022 we are enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* We have enhanced the [Bulk Custom Object Extract](/help/rest-api/bulk-custom-object-extract.md) API to permit users to filter using an **updatedAt** date range.
* Added Program Member field metadata APIs that allow you to create, update, and retrieve metadata for Program Member fields. For more information see [Program Members > Fields](/help/rest-api/program-members.md).
* Added Company field metadata APIs that allow you to retrieve metadata for Company fields. For more information see [Companies > Fields](/help/rest-api/companies.md).
* Added Opportunity field metadata APIs that allow you to retrieve metadata for Opportunity fields. For more information see [Opportunities > Fields](/help/rest-api/opportunities.md).
* Added Named Account field metadata APIs that allow you to retrieve metadata for Named Account fields. For more information see [Named Accounts > Fields](/help/rest-api/named-accounts.md).
* Updated field metadata endpoints to return a new boolean property **isApiCreated** to indicate whether or not a field was created by the REST API.

### Defect Resolutions

* Fixed latency issue between time of call to [Create Lead Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/createLeadFieldUsingPOST) endpoint and time when newly created lead field was available in smart list. [LM-152838]
* Fixed issue with the [Create Lead Fields](https://developer.adobe.com/marketo-apis/api/mapi#operation/createLeadFieldUsingPOST) endpoint where created fields were not available in the form fields dropdown list used to [add fields to form](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/forms/creating-a-form/add-a-field-to-a-form) in Marketo Engage UI. [LM-158243]
* Fixed issue with the [Get Campaigns](https://developer.adobe.com/marketo-apis/api/mapi#operation/getCampaignsUsingGET) endpoint where triggerable campaigns were not returned when the isTriggerable=true parameter was specified. [LM-158283]
* Fixed issue where [Get Leads by List Id](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteTokenByNameUsingPOST) endpoint would return an error "611, System error" in certain cases. [LM-157214]
* Cleaned up several error messages returned by the [Update Lead Field](/help/rest-api/leads.md) endpoint. [LM-151886, LM-151888, LM-151889]

Posted on _2022-01-27_ by _David_

## March 2022 Updates

In March 2022 we are enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* We have added the **actionResult** field to the export file produced by the Bulk Activity Extract API. This field can be used to distinguish between successful, skipped, and failed activities.
* We have added the **isOpenTrackingDisabled** field to responses from the [Emails API](/help/rest-api/emails.md). This field can be used to determine whether [Disable Open Tracking](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/email-editor-2/email-editor-v2-0-overview) feature is enabled.
* We have added two endpoints that allow you to selectively manage program tags. The [Update Program Tags](/help/rest-api/programs.md) endpoint allows you to selectively update a program tag. The [Delete Program Tags](/help/rest-api/programs.md) endpoint allows you to selectively delete a program tag.
* We have added the **isExecutable** parameter to the [Clone Smart Campaign](/help/rest-api/smart-campaigns.md) endpoint. This parameter allows you to clone a program as an executable program.
* We have added the **headStart** field to the [Programs API](/help/rest-api/programs.md). This allows you to create, update, and retrieve the [Head Start](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/email-programs/email-program-actions/head-start-for-email-programs) setting for Email Programs.

### Defect Resolutions

* Fixed issue with [Get Email Dynamic Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailDynamicContentUsingGET) endpoint. When trying to retrieve subject lines with dynamic content from emails that had broken template relationships, an error was returned, 709, ""API only allows operations on emails with a template". The endpoint now returns the dynamic content. [LM-152331]
* Fixed issue with [Sync Leads](https://developer.adobe.com/marketo-apis/api/mapi#operation/syncLeadUsingPOST) endpoint. When using externalSalesPersonId to associate Sales Person with a lead using externalSalesPersonId and using action = createDuplicate, then the Sales Person association would not occur. [LM-158990]

### Adobe IMS Integration

* Those who've been onboarded to [Adobe IMS](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/marketo-with-adobe-identity/adobe-identity-management-overview) cannot utilize all of the [Marketo User Management APIs](/help/rest-api/user-management.md). The following endpoints will return an error on when called on Marketo Instances that have been integrated with Adobe IMS : [Invite User](https://developer.adobe.com/marketo-apis/api/user/#operation/inviteUserUsingPOST), [Get Invited User by Id](https://developer.adobe.com/marketo-apis/api/user/#operation/getInvitedUserUsingGET), [Update User Attributes](https://developer.adobe.com/marketo-apis/api/user/#operation/updateUserAttributeUsingPOST), [Delete User](https://developer.adobe.com/marketo-apis/api/user/#operation/deleteUserUsingPOST), and [Delete Invited User](https://developer.adobe.com/marketo-apis/api/user/#operation/deleteInvitedUserUsingPOST). As a replacement, the [Adobe User Management APIs](https://developer.adobe.com/umapi/) should be used.

Posted on _2022-03-14_ by _David_

## May 2022 Updates-

In May 2022 we are enhancing existing REST APIs, and resolving several defects. See the full list of updates below.

* We have added the ability to retrieve [Company](/help/rest-api/companies.md), [Opportunity](/help/rest-api/opportunities.md), and [Sales Persons](/help/rest-api/sales-persons.md) records when either [SFDC Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/salesforce-sync/sfdc-sync-details/sfdc-sync-field-sync) or [Microsoft Dynamics Sync](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/crm-sync/microsoft-dynamics/microsoft-dynamics-sync-details/microsoft-dynamics-sync-user-sync) are enabled in your Marketo Engage instance.
* We have updated the [Get Email Dynamic Content](https://developer.adobe.com/marketo-apis/api/asset#operation/getEmailDynamicContentUsingGET) endpoint to allow you to retrieve [Dynamic Content](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/general/functions-in-the-editor/using-dynamic-content-in-an-email) from an email subject line. This works regardless of whether the given email is linked to an email template.

`POST /rest/asset/v1/form/{id}/field/State.json?values=[{"label":"Alaska"},{"value":"AK"},{"label":"West Virginia","value":"WV"},{"label":"Wyoming","value":"WY"}]`

* We have updated the [Add Form Field Visibility Rules](https://developer.adobe.com/marketo-apis/api/asset#operation/getAllProgramMemberFieldsUsingGET) endpoint to allow you to add multiple comparison values for **isNot** type [Invisibility Rules](/help/rest-api/forms.md). Here is an example:

`POST /rest/asset/v1/form/{id}/field/LastName/visibility.json?visibilityRule={"ruleType":"show","rules":[{"subjectField":"LastName","operator":"isNot","values":["A","B","C"]}`

### Defect Resolutions

* Fixed issue with the [Submit Form](/help/rest-api/leads.md) endpoint that occurred when passing "null" for an attribute in the [leadFormFields](/help/rest-api/leads.md) parameter, an error was returned, "611, System Error". It now correctly returns, "1003, Form validation failed" error. [LM-162213]

Posted on _2022-05-09_ by _David_

## August 2022 Updates

In August 2022 we are enhancing existing REST APIs. See the full list of updates below.

LWe have added several new filters that can be used when calling Create Export Program Member Job endpoint. Note that many of the filters can be used in combination with each other to refine the extracted data set.

* The **programIds** filter can be used to specify up to 10 program identifiers which can help improve throughput.
* The **isExhausted** filter can be used to filter records for [people who have exhausted content](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/email-marketing/drip-nurturing/using-engagement-programs/people-who-have-exhausted-content).
* The **nurtureCadence** filter can be used to filter records based on [engagement program cadence](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/program-flow-actions/change-engagement-program-cadence).
* The **statusNames** filter can be used to filter records for one or more [program statuses](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/programs/creating-programs/understanding-program-membership).
* The **updatedAt** filter can be used to filter records based on a date range.

### Announcements

* The behavior of the [Identity](https://developer.adobe.com/marketo-apis/api/identity/#operation/identityUsingGET) endpoint has changed. When you call the endpoint and do not include an **access_token** parameter, the "603, Access denied" error is returned. Previously, the "600, Empty access token" error was returned. Note that the "600, Empty access token" error has been deprecated.

Posted on _2022-09-03_ by _David_

## October 2022 Updates

In October 2022 we are enhancing existing REST APIs. See the full list of updates below.

* We have enhanced the [Bulk Lead Import API](/help/rest-api/bulk-lead-import.md) to support adding Leads to Sales Persons records during the import process. This is done by including the **externalSalesPersonId** field in the import file.
* Fixed issue with the [Create Lead Fields](/help/rest-api/leads.md) endpoint that occurred when creating Score type fields. These fields were not available for use in the [Change Score](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/core-marketo-concepts/smart-campaigns/flow-actions/change-score) flow action in the Marketo Engage UI. [LM-166815]

### Announcements

* The Program Membership attribute `acquiredBy` has been changed to be updateable.

Posted on _2022-10-18_ by _David_

## Upcoming change to Marketo Forms REST AP

Beginning with the 2022.R2 release, currently scheduled for the week of March 24th 2023, the Adobe Marketo Engage Forms Asset APIs will consistently return only the name of the form without a prefixed program name, regardless of whether the form is a child of a program or not. This change will make the Forms API's behaviors with regard to asset names consistent with the rest of the Adobe Marketo Engage Asset APIs. To avoid service disruptions, you should review any integrations which use MArketo Engage Forms APIs and work with your integrators to see if any changes are needed to accommodate this Prior to this upcoming change, names returned by the Forms APIs inconsistently prefixed a program name for forms which are children of programs in Marketing Activities. For example, a form named "Form 1," that was a child of "Program 1," may have its name returned by the API as: Program 1.Form 1 Or Form 1 Beginning with the 2022.R2 release, the name of a form will always be returned without a prefixed program name. Using the same example, the name would always be: Form 1

Posted on _2022-11-04_ by _Kenny_

## January 2023 Updates

In January 2023 we made an API-related enhancement to the Admin UI and are making two announcements. See the full list of updates below.

Admin UI

### Bulk Lead Extract

* We have enhanced the Marketo Engage Admin UI to allow you to view the Bulk Extract API daily capacity allocation for your subscription. In addition, you can view capacity use by API-User over the past 7 days. More information can be found [here](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/administration/settings/bulk-export-api-information).

### Defect Resolutions

* Fixed issue with [Delete Opportunities](https://developer.adobe.com/marketo-apis/api/mapi#operation/deleteOpportunitiesUsingPOST) endpoint. In certain cases, a "Remove from Opportunity" activity was not being generated. [LM-172208]

### Announcements

* Please see [this article](https://nation.marketo.com/t5/product-documents/upcoming-change-to-marketo-rest-api/ta-p/331698) on Marketo Community regarding REST API and a change to the HTTP response message [reason phrase](https://www.rfc-editor.org/rfc/rfc7230#section-3.1.2).
* The Program Membership attribute **statusReason** has been changed to be updateable.

Posted on _2023-01-21_ by _David_
