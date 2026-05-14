---
title: listOperation
description: "Marketo SOAP listOperation to add remove or check static list membership. Supports up to 1000 leads per call with strict mode, XML examples, PHP and Java code."
---

<InlineAlert slots="text" variant="warning" />

The SOAP API is deprecated and will reach end of life on July 31, 2026. All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), and existing integrations should be migrated before that date.

# listOperation

This method is used to perform operations on a static list defined within the Marketo lead database. To add, or remove members of a static list defined within a program, use [importToList](importtolist.md). Each call to this endpoint has a limit of 1000 leads per call.

Operation types include:

- Add to list
- Remove from List
- Check Membership of List

## Request

| Field Name | Required/Optional | Description |
| --- | --- | --- |
| listOperation | Required | The type of operation you wish to execute on the specified list. Possible operations: `ADDTOLIST`, `ISMEMBEROFLIST`, `REMOVEFROMLIST` |
| listKey->keyType | Required | The type of list you wish to operate on. Possible values: `MKTOLISTNAME`, `MKTOSALESUSERID`, `SFDCLEADOWNERID` |
| listKey->keyValue | Required | Name of the list you wish to operate on. |
| listMemberList->leadKey->keyType | Required | `keyType` allows you to specify the ID you wish to reference the lead by. Possible values: `IDNUM` |
| listMemberList->leadKey->keyValue | Required | `keyValue` is the value that you wish to operate the list on |
| strict | Optional | Strict mode fails for the entire operation if any subset of the call fails. Non-strict mode completes everything it can and return errors for anything that failed. |

## Request XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Header>
    <ns1:AuthenticationHeader>
      <mktowsUserId>demo17_1_809934544BFABAE58E5D27</mktowsUserId>
      <requestSignature>9890d974aa58ccb96d7a0a3166573f6436c883dd</requestSignature>
      <requestTimestamp>2013-08-05T16:34:19-07:00</requestTimestamp>
    </ns1:AuthenticationHeader>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:paramsListOperation>
      <listOperation>ISMEMBEROFLIST</listOperation>
      <listKey>
        <keyType>MKTOLISTNAME</keyType>
        <keyValue>Trav-Test-List</keyValue>
      </listKey>
      <listMemberList>
        <leadKey>
          <keyType>IDNUM</keyType>
          <keyValue>87710</keyValue>
        </leadKey>
        <leadKey>
          <keyType>IDNUM</keyType>
          <keyValue>1089946</keyValue>
        </leadKey>
      </listMemberList>
      <strict>false</strict>
    </ns1:paramsListOperation>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Response XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://www.marketo.com/mktows/">
  <SOAP-ENV:Body>
    <ns1:successListOperation>
      <result>
        <success>false</success>
        <statusList>
          <leadStatus>
            <leadKey>
              <keyType>IDNUM</keyType>
              <keyValue>87710</keyValue>
            </leadKey>
            <status>false</status>
          </leadStatus>
          <leadStatus>
            <leadKey>
              <keyType>IDNUM</keyType>
              <keyValue>1089946</keyValue>
            </leadKey>
            <status>true</status>
          </leadStatus>
        </statusList>
      </result>
    </ns1:successListOperation>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Sample Code - PHP

```php
 <?php

  $debug = true;

  $marketoSoapEndPoint     = "";  // CHANGE ME
  $marketoUserId           = "";  // CHANGE ME
  $marketoSecretKey        = "";  // CHANGE ME
  $marketoNameSpace        = "http://www.marketo.com/mktows/";

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
  $options = array("connection_timeout" => 20, "location" => $marketoSoapEndPoint);
  if ($debug) {
    $options["trace"] = true;
  }

  // Create Request
  $request = new stdClass();
  $request->listOperation = "ISMEMBEROFLIST"; // ADDTOLIST, ISMEMBEROFLIST, REMOVEFROMLIST

  $listKey = new stdClass();
  $listKey->keyType = "MKTOLISTNAME";  // MKTOLISTNAME, MKTOSALESUSERID, SFDCLEADOWNERID
  $listKey->keyValue = "Trav-Test-List";
  $request->listKey = $listKey;

  $leadKey = array("keyType" => "IDNUM", "keyValue" => "87710");
  $leadKey2 = array("keyType" => "IDNUM", "keyValue" => "1089946");
  $leadList = new stdClass();

  $leadList->leadKey = array($leadKey, $leadKey2);
  $request->listMemberList = $leadList;
  $request->strict = false;

  $params = array("paramsListOperation" => $request);
  $soapClient = new SoapClient($marketoSoapEndPoint ."?WSDL", $options);
  try {
    $response = $soapClient->__soapCall('listOperation', $params, $options, $authHdr);
  }
  catch(Exception $ex) {
    var_dump($ex);
  }
  if ($debug) {
    print "RAW request:\n" .$soapClient->__getLastRequest() ."\n";
    print "RAW response:\n" .$soapClient->__getLastResponse() ."\n";
  }

  print_r($response);

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
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;


public class ListOperation {
    public static void main(String[] args) {

        System.out.println("Executing List Operation");
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
            ParamsListOperation request = new ParamsListOperation();
            request.setListOperation(ListOperationType.ISMEMBEROFLIST);

            ListKey listKey = new ListKey();
            listKey.setKeyType(ListKeyType.MKTOLISTNAME);
            listKey.setKeyValue("Trav-Test-List");
            request.setListKey(listKey);

            LeadKey key = new LeadKey();
            key.setKeyType(LeadKeyRef.IDNUM);
            key.setKeyValue("87710");

            LeadKey key2 = new LeadKey();
            key2.setKeyType(LeadKeyRef.IDNUM);
            key2.setKeyValue("1089946");

            ArrayOfLeadKey leadKeys = new ArrayOfLeadKey();
            leadKeys.getLeadKeies().add(key);
            leadKeys.getLeadKeies().add(key2);

            request.setListMemberList(leadKeys);

            JAXBElement<Boolean> strict = new ObjectFactory().createParamsListOperationStrict(false);
            request.setStrict(strict);

            SuccessListOperation result = port.listOperation(request, header);

            JAXBContext context = JAXBContext.newInstance(SuccessListOperation.class);
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
    :list_operation => "ISMEMBEROFLIST",
    :list_key => {
        :key_type => "MKTOLISTNAME",
        :key_value => "Trav-Test-List" },
    :list_member_list => {
        :lead_key => {
            :key_type => "IDNUM",
            :key_value => "87710" },
        :lead_key! => {
            :key_type => "IDNUM",
            :key_value => "1089946" }
    },
    :strict => "false"
}

response = client.call(:list_operation, message: request)

puts response
```
