---
title: getMObjects
description: "Use getMObjects to fetch Marketo MObjects by ID, attributes, or associations, up to 100 per batch, paginate with streamPosition, with XML examples."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# getMObjects

Retrieves one or more [MObjects](marketo-objects.md) using a combination of criteria consisting of:

- Zero or one unique ID, either the Marketo ID or external ID
- Zero or more attribute filters as name/value/comparison trios
- Zero or more associated object filters as object name/ID pairs

Returns a list of matching MObjects, all of a single type, up to 100 in a batch, and a [stream position](stream-position.md) token for retrieving successive batches.

## Request

| Field Name | Required/Optional | Description |
| --- | --- | --- |
| type | Required | The object type you wish to query. Can be one of the following: `Opportunity`, `OpportunityPersonRole`, or `Program` |
| id | Optional | Id of the MObject |
| includeDetails | Optional | When true will return all attributes for a given MObject. This parameter is only applicable when used with Program MObjects |
| mObjCriteriaList->mObjCriteria->attrName | Optional | One or more of the following input parameters may be used:`Name`, `Role`, `Type`, `Stage`, `CRM Id`, `Created At`, `Updated At` or `Tag Type` (only one can be specified), `Tag Value`, `Workspace Name`, `Workspace Id`, `Include Archive` |
| mObjCriteriaList->mObjCriteria->attrValue | Optional | The value that you wish to use for filtering |
| mObjCriteriaList->mObjCriteria->comparison | Optional | One of `EQ`, `NE`, `LT` ,`LE`, `GT`, `GE` |
| mObjAssociationList->mObjAssociation->mObjType | Optional |  |
| mObjAssociationList->mObjAssociation->id | Optional | The id of the associated object (Lead/Company/Opportunity) |
| mObjAssociationList->mObjAssociation->externalKey | Optional | A custom attribute of the associated object |
| streamPosition | Optional | Used to paginate through multiple result sets. The value passed is the value returned by the previous `getMObjects` call. |

## Request XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809934544BFABAE58E5D27</mktowsUserId>
      <requestSignature>3f1becf66fac77423fa7af0710f710f9adefb3fc</requestSignature>
      <requestTimestamp>2013-08-05T13:03:58-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsGetMObjects>
      <type>Program</type>
      <mObjCriteriaList>
        <mObjCriteria>
          <attrName>Id</attrName>
          <comparison>LE</comparison>
          <attrValue>1010</attrValue>
        </mObjCriteria>
        <mObjCriteria>
          <attrName>Name</attrName>
          <comparison>NE</comparison>
          <attrValue>elizprogramtest</attrValue>
        </mObjCriteria>
      </mObjCriteriaList>
    </ns1:paramsGetMObjects>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Response XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successGetMObjects>
      <result>
        <returnCount>6</returnCount>
        <hasMore>false</hasMore>
        <newStreamPosition>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</newStreamPosition>
        <mObjectList>
          <mObject>
            <type>Program</type>
            <id>1001</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>Program01</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Program</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/Training/Program01</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Content</value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
          <mObject>
            <type>Program</type>
            <id>1002</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>Coffee Promotion</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Program</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/Neelesh/Coffee Promotion</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Content</value>
                  </attrib>
                </attrList>
              </typeAttrib>
              <typeAttrib>
                <attrType>Token</attrType>
                <attrList>
                  <attrib>
                    <name>Name</name>
                    <value>testtoken</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value><p><span>This email was sent by&amp;nbsp;</span><tt>campaign.Name</tt><span>&amp;nbsp;on&amp;nbsp;</span><tt>system.DateTime</tt><span>.</span><br /><span>You are in&amp;nbsp;</span><tt>company.Company Name:default=a company</tt><span>&amp;nbsp;and your last name on our record is&amp;nbsp;</span><tt>lead.Last Name:default=not recorded</tt><span>. This is a message sent to</span><tt>lead.Email Address:default=your email</tt><span>.</span><br /><span>Click this link: Yahoo.com</span></p></value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
          <mObject>
            <type>Program</type>
            <id>1004</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>elizprogramtest2</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Program</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/Elizabeth/elizprogramtest2</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Email Blast</value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
          <mObject>
            <type>Program</type>
            <id>1005</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>elizprogramtest3</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Program</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/Elizabeth/elizprogramtest3</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Email Blast</value>
                  </attrib>
                </attrList>
              </typeAttrib>
              <typeAttrib>
                <attrType>Token</attrType>
                <attrList>
                  <attrib>
                    <name>Name</name>
                    <value>My Token</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>2011-12-25</value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
          <mObject>
            <type>Program</type>
            <id>1006</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>Big Launch Webinar</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Event</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/MKTO Training/MKTO Events/Big Launch Webinar</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
              <attrib>
                <name>Start Date</name>
                <value>2011-08-01 11:00:00</value>
              </attrib>
              <attrib>
                <name>End Date</name>
                <value>2011-08-01 02:00:00</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Webinar</value>
                  </attrib>
                </attrList>
              </typeAttrib>
              <typeAttrib>
                <attrType>Cost</attrType>
                <attrList>
                  <attrib>
                    <name>Id</name>
                    <value>1</value>
                  </attrib>
                  <attrib>
                    <name>Month</name>
                    <value>2011-07-01</value>
                  </attrib>
                  <attrib>
                    <name>Amount</name>
                    <value>3000</value>
                  </attrib>
                  <attrib>
                    <name>Note</name>
                    <value>Speaker</value>
                  </attrib>
                </attrList>
              </typeAttrib>
              <typeAttrib>
                <attrType>Cost</attrType>
                <attrList>
                  <attrib>
                    <name>Id</name>
                    <value>2</value>
                  </attrib>
                  <attrib>
                    <name>Month</name>
                    <value>2011-07-01</value>
                  </attrib>
                  <attrib>
                    <name>Amount</name>
                    <value>1000</value>
                  </attrib>
                  <attrib>
                    <name>Note</name>
                    <value>Post-production</value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
          <mObject>
            <type>Program</type>
            <id>1007</id>
            <attribList>
              <attrib>
                <name>Name</name>
                <value>Lead Scoring</value>
              </attrib>
              <attrib>
                <name>Type</name>
                <value>Marketing Program</value>
              </attrib>
              <attrib>
                <name>Workspace Id</name>
                <value>1</value>
              </attrib>
              <attrib>
                <name>Workspace Name</name>
                <value>Default</value>
              </attrib>
              <attrib>
                <name>Tree Path</name>
                <value>/Marketing Activities/Default/MKTO Training/MKTO Lead Lifecycle/Lead Scoring</value>
              </attrib>
              <attrib>
                <name>Is Archived</name>
                <value>false</value>
              </attrib>
            </attribList>
            <typeAttribList>
              <typeAttrib>
                <attrType>Tag</attrType>
                <attrList>
                  <attrib>
                    <name>Type</name>
                    <value>Channel</value>
                  </attrib>
                  <attrib>
                    <name>Value</name>
                    <value>Blog</value>
                  </attrib>
                </attrList>
              </typeAttrib>
            </typeAttribList>
          </mObject>
        </mObjectList>
      </result>
    </ns1:successGetMObjects>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Sample Code - PHP

```php
<?php
$debug = true;
$marketoSoapEndPoint    = "";  // CHANGE ME
$marketoUserId      = "";  // CHANGE ME
$marketoSecretKey   = "";  // CHANGE ME
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
$params->type = 'Program';
// $params->id = "1003";

$mObjCriteria1 = new stdClass();
$mObjCriteria1->attrName="Id";
$mObjCriteria1->comparison="LE";
$mObjCriteria1->attrValue="1010";

$mObjCriteria2 = new stdClass();
$mObjCriteria2->attrName="Name";
$mObjCriteria2->comparison="NE";
$mObjCriteria2->attrValue="elizprogramtest";

$params->mObjCriteriaList=array($mObjCriteria1, $mObjCriteria2);

$soapClient = new SoapClient($marketoSoapEndPoint ."?WSDL", $options);
try {
  $leads = $soapClient->__soapCall('getMObjects', array($params), $options, $authHdr);
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


public class getMObjects {

    public static void main(String[] args) {
        System.out.println("Executing Get MObjects");
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
            ParamsGetMObjects request = new ParamsGetMObjects();
            request.setType("Program");

            MObjCriteria criteria = new MObjCriteria();
            criteria.setAttrName("Id");
            criteria.setComparison(ComparisonEnum.LE);
            criteria.setAttrValue("1010");

            MObjCriteria criteria2 = new MObjCriteria();
            criteria2.setAttrName("Name");
            criteria2.setComparison(ComparisonEnum.NE);
            criteria2.setAttrValue("elizprogramtest");

            ArrayOfMObjCriteria mObjCriteria= new ArrayOfMObjCriteria();
            mObjCriteria.getMObjCriterias().add(criteria);
            mObjCriteria.getMObjCriterias().add(criteria2);

            request.setMObjCriteriaList(mObjCriteria);

            SuccessGetMObjects result = port.getMObjects(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessGetMObjects.class);
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
    :type => "Program",
    :m_obj_criteria_list => {
          :m_obj_criteria => {
            :attr_name => "Id",
            :comparsion => "LE",
            :attr_value => "1010"
          },
          :m_obj_criteria! => {
            :attr_name => "Name",
            :comparsion => "NE",
            :attr_value => "elizprogramtest"
          }
      }
}

response = client.call(:get_m_objects, message: request)

puts response
```
