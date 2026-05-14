---
title: describeMObject
description: "Learn to use describeMObject in Marketo SOAP to retrieve metadata and field attributes for ActivityRecord, LeadRecord, Opportunity, and OpportunityPersonRole."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# describeMObject

This function returns the metadata for Standard and Virtual MObjects. It takes in the Marketo object as input and returns the field attributes that are associated to that object.

## Request

| Field Name | Required/Optional | Description |
| --- | --- | --- |
| objectName | Required | The name of the MObject you wish to get meta data for. `objectName` can be one of: `ActivityRecord`, `LeadRecord`, `Opportunity`, `OpportunityPersonRole` |

## Request XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809934544BFABAE58E5D27</mktowsUserId>
      <requestSignature>d27074cb49414b3410fd7ab58b5945c3e86d28d4</requestSignature>
      <requestTimestamp>2013-08-05T11:01:07-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsDescribeMObject>
      <objectName>ActivityRecord</objectName>
    </ns1:paramsDescribeMObject>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Response XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successDescribeMObject>
      <result>
        <metadata>
          <name>ActivityRecord</name>
          <description>Composite object composed of fields from Event, Campaign, Lead, and Company</description>
          <isCustom>false</isCustom>
          <isVirtual>true</isVirtual>
          <fieldList>
            <field>
              <name>id</name>
              <description>Unique system id of Event</description>
              <displayName xsi:nil="true" />
              <sourceObject>Event</sourceObject>
              <dataType>integer</dataType>
              <size>10</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>true</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>activityDateTime</name>
              <description>Event timestamp</description>
              <displayName xsi:nil="true" />
              <sourceObject>Event</sourceObject>
              <dataType>dateTime</dataType>
              <size xsi:nil="true" />
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>activityType</name>
              <description>Name of Event</description>
              <displayName xsi:nil="true" />
              <sourceObject>Event</sourceObject>
              <dataType>string</dataType>
              <size>255</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>true</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>mktgAssetName</name>
              <description>Name of email, landing page, or object field</description>
              <displayName xsi:nil="true" />
              <sourceObject>Event</sourceObject>
              <dataType>string</dataType>
              <size>255</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>activityAttributes</name>
              <description>Array of name / value pairs of dynamic event attributes</description>
              <displayName xsi:nil="true" />
              <sourceObject>Event</sourceObject>
              <dataType>Array</dataType>
              <size xsi:nil="true" />
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>campaign</name>
              <description>Name of Campaign that caused the Event</description>
              <displayName xsi:nil="true" />
              <sourceObject>Campaign</sourceObject>
              <dataType>string</dataType>
              <size>255</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>personName</name>
              <description>Name of Lead that owns the Event</description>
              <displayName xsi:nil="true" />
              <sourceObject>Lead</sourceObject>
              <dataType>string</dataType>
              <size>255</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>mktPersonId</name>
              <description>Unique system id of Lead</description>
              <displayName xsi:nil="true" />
              <sourceObject>Lead</sourceObject>
              <dataType>integer</dataType>
              <size>10</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>foreignSysId</name>
              <description>Unique foreign system id of Lead</description>
              <displayName xsi:nil="true" />
              <sourceObject>Lead</sourceObject>
              <dataType>string</dataType>
              <size>50</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>orgName</name>
              <description>Name of Company associated to the Lead</description>
              <displayName xsi:nil="true" />
              <sourceObject>Company</sourceObject>
              <dataType>string</dataType>
              <size>255</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
            <field>
              <name>foreignSysOrgId</name>
              <description>Unique foreign system id of Company</description>
              <displayName xsi:nil="true" />
              <sourceObject>Company</sourceObject>
              <dataType>string</dataType>
              <size>50</size>
              <isReadonly>true</isReadonly>
              <isUpdateBlocked>true</isUpdateBlocked>
              <isName>false</isName>
              <isPrimaryKey>false</isPrimaryKey>
              <isCustom>false</isCustom>
              <isDynamic>false</isDynamic>
              <dynamicFieldRef xsi:nil="true" />
              <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
            </field>
          </fieldList>
          <updatedAt>2010-01-01T00:00:00+00:00</updatedAt>
        </metadata>
      </result>
    </ns1:successDescribeMObject>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Sample Code - PHP

## Sample Code - Java

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
import javax.xml.bind.Marshaller;


public class DescribeMObject {
    public static void main(String[] args) {

        System.out.println("Executing Describe MObject");
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
            ParamsDescribeMObject request = new ParamsDescribeMObject();
            request.setObjectName("ActivityRecord");

            SuccessDescribeMObject result = port.describeMObject(request, header);
            JAXBContext context = JAXBContext.newInstance(SuccessDescribeMObject.class);
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

## Sample Code - Ruby

```ruby
require 'savon' # Use version 2.0 Savon gem
require 'date'

mktowsUserId = "" # CHANGE ME
marketoSecretKey = "" # CHANGE ME
marketoSoapEndPoint = "" # CHANGE ME
marketoNameSpace = "http://www.marketo.com/mktows/"

#Create Signature
Timestamp = DateTime.now
requestTimestamp = Timestamp.to_s
encryptString = requestTimestamp + mktowsUserId
digest = OpenSSL::Digest.new('sha1')
hashedsignature = OpenSSL::HMAC.hexdigest(digest, marketoSecretKey, encryptString)
requestSignature = hashedsignature.to_s

#Create SOAP Header
headers = {
    'ns1:AuthenticationHeader' => { "mktowsUserId" => mktowsUserId, "requestSignature" => requestSignature,
    "requestTimestamp"  => requestTimestamp
    }
}

client = Savon.client(wsdl: 'http://app.marketo.com/soap/mktows/2_3?WSDL', soap_header: headers, endpoint: marketoSoapEndPoint, open_timeout: 90, read_timeout: 90, namespace_identifier: :ns1, env_namespace: 'SOAP-ENV')

#Create Request
request = {
    :object_name => "ActivityRecord"
}

response = client.call(:describe_m_object, message: request)

puts response
```
