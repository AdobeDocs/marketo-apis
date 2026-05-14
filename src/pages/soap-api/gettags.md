---
title: getTags
description: "Marketo SOAP getTags retrieves non-channel tag types and values with optional tag filters, plus request fields and full XML request response samples."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# getTags

This function retrieves the following information about non-channel tags set up in Marketo.

- Tag Type
- Tag Value

You can get information on all non-channel tags or specify a specific list of tags and/or values.

## Request

| Field Name | Required/Optional | Description |
| --- | --- | --- |
| tagList->tag | Optional | List of tags that you wish to query. Each tag can have a type and an array of values as strings. If `<tagList>` is omitted, you will receive info about all the channels |

## Request XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809934544BFABAE58E5D27</mktowsUserId>
      <requestSignature>75864de9b56d7b373b32ec5b80a7f846b49137ea</requestSignature>
      <requestTimestamp>2013-08-05T11:33:06-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsGetTags>
      <tagList>
        <tag>
          <type>Content Channel</type>
          <values>
            <stringItem>SEM</stringItem>
            <stringItem>Email</stringItem>
          </values>
        </tag>
      </tagList>
    </ns1:paramsGetTags>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Response XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns2:successGetTags xmlns:ns2="http://www.marketo.com/mktows/">
  <result>
    <tagList>
      <tag>
        <type>Regions</type>
        <values>
          <stringItem>North</stringItem>
          <stringItem>South</stringItem>
          <stringItem>East</stringItem>
          <stringItem>West</stringItem>
          <stringItem>EMEA</stringItem>
          <stringItem>Africa</stringItem>
          <stringItem>South Africa</stringItem>
        </values>
      </tag>
      <tag>
        <type>Author</type>
        <values>
          <stringItem>Angelo</stringItem>
          <stringItem>JohnG</stringItem>
          <stringItem>Chrism</stringItem>
          <stringItem>Cathal</stringItem>
          <stringItem>Carra</stringItem>
          <stringItem>Bob</stringItem>
          <stringItem>Charlie Neimeth</stringItem>
          <stringItem>Christina Gustie</stringItem>
          <stringItem>Jordan</stringItem>
        </values>
      </tag>
      <tag>
        <type>Products</type>
        <values>
          <stringItem>Lead Management</stringItem>
          <stringItem>Revenue Cycle Analytics</stringItem>
          <stringItem>Sales Insights</stringItem>
        </values>
      </tag>
      <tag>
        <type>Cost Center</type>
        <values>
          <stringItem>a</stringItem>
        </values>
      </tag>
      <tag>
        <type>Marketing Organizer</type>
        <values>
          <stringItem>Text</stringItem>
          <stringItem>hithere</stringItem>
          <stringItem>Carol</stringItem>
        </values>
      </tag>
      <tag>
        <type>This is my special tag</type>
        <values>
          <stringItem>red</stringItem>
          <stringItem>blue</stringItem>
          <stringItem>green</stringItem>
        </values>
      </tag>
      <tag>
        <type>bgomes_tag1</type>
        <values>
          <stringItem>bgomes_tag1_value1</stringItem>
          <stringItem>bgomes_tag1_value2</stringItem>
        </values>
      </tag>
      <tag>
        <type>Jennifer test Theme</type>
        <values>
          <stringItem>Revenue Master</stringItem>
          <stringItem>Revenue Power house</stringItem>
        </values>
      </tag>
      <tag>
        <type>Products Cyndie</type>
        <values>
          <stringItem>MLM</stringItem>
          <stringItem>RTS</stringItem>
        </values>
      </tag>
      <tag>
        <type>KoolMarketo_Geography</type>
        <values>
          <stringItem>US</stringItem>
          <stringItem>Non-US</stringItem>
        </values>
      </tag>
      <tag>
        <type>Presenter</type>
        <values>
          <stringItem>Dana</stringItem>
          <stringItem>John</stringItem>
          <stringItem>Krishna</stringItem>
          <stringItem>Liz</stringItem>
          <stringItem>Paul</stringItem>
        </values>
      </tag>
      <tag>
        <type>Author AM</type>
        <values>
          <stringItem>Andy</stringItem>
          <stringItem>Mikhail</stringItem>
          <stringItem>Chris</stringItem>
        </values>
      </tag>
      <tag>
        <type>Product Line</type>
        <values>
          <stringItem>Apples</stringItem>
        </values>
      </tag>
      <tag>
        <type>Region</type>
        <values>
          <stringItem>North America</stringItem>
          <stringItem>Region A</stringItem>
          <stringItem>Region B</stringItem>
        </values>
      </tag>
      <tag>
        <type>Product</type>
        <values>
          <stringItem>CBS - CPS</stringItem>
          <stringItem>CBS - CB</stringItem>
          <stringItem>All IP</stringItem>
          <stringItem>AKL Test</stringItem>
          <stringItem>AKL Test 2</stringItem>
        </values>
      </tag>
      <tag>
        <type>Objective</type>
        <values>
          <stringItem>Demand Gen</stringItem>
        </values>
      </tag>
      <tag>
        <type>Target</type>
        <values>
          <stringItem>NN</stringItem>
        </values>
      </tag>
      <tag>
        <type>Content Channel</type>
        <values>
          <stringItem>SEM</stringItem>
          <stringItem>Email</stringItem>
          <stringItem>Website</stringItem>
        </values>
      </tag>
      <tag>
        <type>Industry</type>
        <values>
          <stringItem>Printing</stringItem>
          <stringItem>Gambling</stringItem>
          <stringItem>Technology</stringItem>
          <stringItem>Marketing</stringItem>
        </values>
      </tag>
      <tag>
        <type>Making a new tag</type>
        <values>
          <stringItem>200</stringItem>
        </values>
      </tag>
      <tag>
        <type>JJames Test Tag</type>
        <values>
          <stringItem>Progression Status</stringItem>
          <stringItem>Program Status</stringItem>
        </values>
      </tag>
      <tag>
        <type>Author123</type>
        <values>
          <stringItem>Dereks test tag</stringItem>
          <stringItem>product</stringItem>
        </values>
      </tag>
      <tag>
        <type>Program Lead</type>
        <values>
          <stringItem>Carra Manahan</stringItem>
        </values>
      </tag>
      <tag>
        <type>Presenter - Will</type>
        <values>
          <stringItem>Dennis</stringItem>
          <stringItem>James</stringItem>
          <stringItem>Jamie</stringItem>
          <stringItem>Sean</stringItem>
        </values>
      </tag>
      <tag>
        <type>Test-P-Tag</type>
        <values>
          <stringItem>val1</stringItem>
        </values>
      </tag>
    </tagList>
  </result>
</ns2:successGetTags>
```

## Sample Code - PHP

```php
<?php
$debug = true;
$marketoSoapEndPoint    = "";  // CHANGE ME
$marketoUserId      = "";  // CHANGE ME
$marketoSecretKey   = ""; // CHANGE ME
$marketoNameSpace   = "http://www.marketo.com/mktows/";

// Create Signature
$dtzObj = new DateTimeZone("America/Los_Angeles");
$dtObj  = new DateTime('now', $dtzObj);
$timeStamp = $dtObj->format(DATE_W3C);
$encryptString = $timeStamp . $marketoUserId;
$signature = hash_hmac('sha1', $encryptString, $marketoSecretKey);

// Create SOAP Header
$attrs = new stdClass();
$attrs->mktowsUserId = $marketoUserId;
$attrs->requestSignature = $signature;
$attrs->requestTimestamp = $timeStamp;
$authHdr = new SoapHeader($marketoNameSpace, 'AuthenticationHeader', $attrs);
$options = array("connection_timeout" => 15, "location" => $marketoSoapEndPoint);
if ($debug) {
  $options["trace"] = 1;
}

// Create Request
$params = new stdClass();
$tag = new stdClass();
$tag->type = "Content Channel";
$tag->values=array("SEM", "Email");
$params->tagList=array($tag);
$soapClient = new SoapClient($marketoSoapEndPoint ."?WSDL", $options);
try {
  $leads = $soapClient->__soapCall('getTags', array($params), $options, $authHdr);
  //      print_r($leads);
}
catch(Exception $ex) {
  var_dump($ex);
}
if ($debug) {
  print "RAW request:\n" .$soapClient->__getLastRequest() ."\n";
  print "RAW response:\n" .$soapClient->__getLastResponse() ."\n";
}

?>
```

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


public class GetTags {
    public static void main(String[] args) {


        System.out.println("Executing Get Tags");
        try {
            URL marketoSoapEndPoint = new URL("https://100-AEK-913.mktoapi.com/soap/mktows/2_1" + "?WSDL");
            String marketoUserId = "demo17_1_809934544BFABAE58E5D27";
            String marketoSecretKey = "27272727aa";

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
            ParamsGetTags request = new ParamsGetTags();
            ArrayOfTag tags = new ArrayOfTag();

            Tag tag = new Tag();
            tag.setType("Content Channel");
            /*
            ArrayOfString values = new ArrayOfString();
            values.getStringItems().add("SEM");
            values.getStringItems().add("Email");

            tag.setValues(values);
            tags.getTags().add(tag);

            request.setTagList(tags);
            */

            SuccessGetTags result = port.getTags(request, header);
            JAXBContext context = JAXBContext.newInstance(SuccessGetTags.class);
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
    :tag_list => {
        :tag => {
            :type => "Content Channel",
            :values => { :string_item => ["SEM", "Email"] }
        }
    }
}

response = client.call(:get_tags, message: request)

puts response
```
