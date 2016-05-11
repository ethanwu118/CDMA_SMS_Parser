<!DOCTYPE html>
<html>
<body>
Select Example:<br>
<select name=select onchange="handleExample(this.options[this.options.selectedIndex].value)">
<option value="">Select</option>
<option value="0003101020017C21EC80CB3178021802200268020801000298026802980102E00A982BEF43C5E371645337F80802080318030803200348037003280104B1FA8A5CF87476FCD6A4AC5BB3E3384CB2828B629FC1801001E00104AC5BB3E0031003C8010002A0032803600328038003400378037003C8010002A0032803080368010001F003061601271735140E08064434C3AB8BCC80">SMS-UCS2</option>
<option value="0003104638018E150028001808100A0E1C3870E1C3870E1150B162C58B162C58B10A878F1E3C78F1E3C78C544C993264C99326415172E5CB972F2CB9728A8D9B366CD9B366CD98547CF9F3E7CF9F3E7CE2A468D1A3468D1A346815274E9D3A74E9D3A748A95AB56AD5AB56AD5A854BD7AF5EBD7AF5EBD62A66CD9B366CD9B366C15376EDDBB76EDDBB768A9DB776EDDBB76EDDB85003061601211138520E08064434911B89A200">SMS-7Bit ASCII</option>
<option value="000316D060018304080010011F805C200031CB0B8383634B1B0BA34B7B717BB3732173BB0B81736B6B996B6B2B9B9B0B3B28057C222B731B7B234B73396AB32B939B4B7B70018971A005A43C6414C1899189C98991C229B1C9C21181818181C2218981818181898188046C8454047011D4A4402C081834BBFC1B43A3A381D17979B1B17189B9A171B9880306140220154529">MMS WAP PUSH 1</option>
<option value="000316D0600154029000100971C1B97B9B2B93B3632BA3997B6B6B99FB6B2B9B9B0B3B296B4B21E9899189C98991C229B1C9C21181818181C22189818181818981880448B401C1A9C1B99989B981B9A97AA2CA8229EA82626A70000306140220154529">MMS WAP PUSH 2</option>
<option value="00031115B0018904380018B78B800C001F80004008FC02E105C189185C1C1B1A58D85D1A5BDB8BDD9B990B9DD85C0B9B5B5CCB5B595CDCD859D9402D21EBE12320A61AD653CC0C0C10D65516150C0023642243600C4E0E4CCC0D8E4E0E4C4D8022A023810000140022016040C0FD1D60DA1D1D1C0E8BCBCC4C0B8C8CCD0B8D0D4B8C4E0C0E8E0C0BDD8C1BDDDE0C000003061511261023190801400E06040D32CC1080">CT MMS WAP PUSH</option>
<option value="62">WMI</option>
<option value="00031DA900011F110D59D222C1A5116A040E5055A51E2CEA8B50206482A4FA90662D4081039003061401071231160801000B01990E0301DC30">VMN</option>
</select>
<br><br>
Please Select Teleservice ID:
<form id="TeleserviceId" method="post" action="...">
  <input type="radio" name="statisticType" value="4098" checked="checked" />SMS(0x1002/4098)<br />
  <input type="radio" name="statisticType" value="4101" />WEMT(0x1005/4101)<br />
  <input type="radio" name="statisticType" value="4100" />WAP Push(0x1004/4100)<br />
  <input type="radio" name="statisticType" value="65002" />CT WAP Push(0xFDEA/65002)<br />
  <input type="radio" name="statisticType" value="262144" />WMI(0x40000/262144)<br />
  <input type="radio" name="statisticType" value="4099" />VMN(0x1003/4099)<br />
</form>
<br>
Enter Bearer Data:<br>
<input id="input_data" type="text" />
<input id="input_data2" type="text" />
<br><br>
<button onclick="decodeFunction()">Decode</button>
<button onclick="clearAllFunction()">Clear</button>

<p id="0_DecodedInfo_Tag"></p>
<p id="1_MWICount_Body"></p>
<p id="2_BearerData_Body"></p>
<p id="3_MessageIdentifier_Tag"></p>
<p id="3_1_MessageIdentifier_Body"></p>
<p id="4_UserData_Tag"></p>
<p id="4_1_encoding_Body"></p>
<p id="4_2_UserDataHeader_Tag"></p>
<p id="4_3_UserDataHeader_Body"></p>
<p id="4_4_UserDataBody_Tag"></p>
<p id="4_5_UserDataBodySize_Body"></p>
<p id="4_6_UserDataBodyWAPHeader_Body"></p>
<p id="4_7_UserDataBodyWAPMsg_Body"></p>
<p id="4_8_UserDataBodyChar_Body"></p>
<p id="4_9_UserDataBodyMsg_Body"></p>
<p id="5_MessageCenterTimeStamp_Tag"></p>
<p id="5_1_MessageCenterTimeStamp_Body"></p>
<p id="6_PriorityIndicator_Tag"></p>
<p id="6_1_PriorityIndicator_Body"></p>
<p id="7_ReplyOption_Tag"></p>
<p id="7_1_ReplyOption_Body"></p>
<p id="8_VoiceMessageCount_Tag"></p>
<p id="8_1_VoiceMessageCount_Body"></p>
<p id="9_LanguageIndicator_Tag"></p>
<p id="9_1_LanguageIndicator_Body"></p>
<p id="10_CallbackNumber_Tag"></p>
<p id="10_1_CallbackNumber_Body"></p>
<p id="11_MessageStatus_Tag"></p>
<p id="11_1_MessageStatus_Body"></p>

<script src="definition.js"></script>
<script src="mms_consts.js"></script>

<script src="WspPduHelper.jsm" type="text/javascript"></script>
<script src="MmsPduHelper.jsm" type="text/javascript"></script>

<script>
var readBuffer = [];
var readCache = 0;
var readCacheSize = 0;
var readIndex = 0;
var userHeader = 0;
var decodeResult = {};

function clearAllFunction() {
  clearInputFunction();
  clearDataFunction();
}
function clearInputFunction() {
  document.getElementById('input_data').value = '';
}
function clearDataFunction() {
  document.getElementById("0_DecodedInfo_Tag").innerHTML = "";
  document.getElementById("1_MWICount_Body").innerHTML = "";
  document.getElementById("2_BearerData_Body").innerHTML = "";
  document.getElementById("3_MessageIdentifier_Tag").innerHTML = "";
  document.getElementById("3_1_MessageIdentifier_Body").innerHTML = "";
  document.getElementById("4_UserData_Tag").innerHTML = "";
  document.getElementById("4_1_encoding_Body").innerHTML = "";
  document.getElementById("4_2_UserDataHeader_Tag").innerHTML = "";
  document.getElementById("4_3_UserDataHeader_Body").innerHTML = "";
  document.getElementById("4_4_UserDataBody_Tag").innerHTML = "";
  document.getElementById("4_5_UserDataBodySize_Body").innerHTML = "";
  document.getElementById("4_6_UserDataBodyWAPHeader_Body").innerHTML = "";
  document.getElementById("4_7_UserDataBodyWAPMsg_Body").innerHTML = "";
  document.getElementById("4_8_UserDataBodyChar_Body").innerHTML = "";
  document.getElementById("4_9_UserDataBodyMsg_Body").innerHTML = "";
  document.getElementById("5_MessageCenterTimeStamp_Tag").innerHTML = "";
  document.getElementById("5_1_MessageCenterTimeStamp_Body").innerHTML = "";
  document.getElementById("6_PriorityIndicator_Tag").innerHTML = "";
  document.getElementById("6_1_PriorityIndicator_Body").innerHTML = "";
  document.getElementById("7_ReplyOption_Tag").innerHTML = "";
  document.getElementById("7_1_ReplyOption_Body").innerHTML = "";
  document.getElementById("8_VoiceMessageCount_Tag").innerHTML = "";
  document.getElementById("8_1_VoiceMessageCount_Body").innerHTML = "";
  document.getElementById("9_LanguageIndicator_Tag").innerHTML = "";
  document.getElementById("9_1_LanguageIndicator_Body").innerHTML = "";
  document.getElementById("10_CallbackNumber_Tag").innerHTML = "";
  document.getElementById("10_1_CallbackNumber_Body").innerHTML = "";
  document.getElementById("11_MessageStatus_Tag").innerHTML = "";
  document.getElementById("11_1_MessageStatus_Body").innerHTML = "";
}

function handleExample(s) {
  clearAllFunction();
  var uTeleserviceID;
  var demo = document.getElementById("TeleserviceId");
  console.log("example bearer data: ", s);

  var id = document.all.select.options.selectedIndex;
  document.all.select.options[id].selected = true;
  if (id == 1 || id ==2) {
    demo.statisticType[0].checked = true;
  } else if (id == 3 || id ==4){
    demo.statisticType[2].checked = true;
  } else if (id == 5){
    demo.statisticType[3].checked = true;
  } else if (id == 6){
    demo.statisticType[4].checked = true;
  } else if (id == 7){
    demo.statisticType[5].checked = true;
  } else {
    demo.statisticType[0].checked = true;
    document.getElementById("0_DecodedInfo_Tag").innerHTML = "";
    document.getElementById("2_BearerData_Body").innerHTML = "";
    return;
  }

  for (var i = 0; i < demo.statisticType.length; i++) {
    if (demo.statisticType[i].checked) {
      uTeleserviceID = demo.statisticType[i].value;
      break;
    }
  }
  console.log("uTeleserviceID: ", uTeleserviceID);
  var bytes = hexToBytes(s);
  document.getElementById("0_DecodedInfo_Tag").innerHTML = "<font color='orange'>Decoded Information:</font><BR><font color='green'>Teleservice ID:</font> <br>" + uTeleserviceID;

  if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_MWI) {
    document.getElementById("1_MWICount_Body").innerHTML = "MWI msg count: " + bytes[0];
  } else if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WAP
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_CT_WAP
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WMT
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_VMN) {
    decodeUserData(bytes, uTeleserviceID);
  }
}

function decodeFunction() {
  var uTeleserviceID;
  var demo = document.getElementById("TeleserviceId");

  for (var i = 0; i < demo.statisticType.length; i++) {
    if (demo.statisticType[i].checked) {
      uTeleserviceID = demo.statisticType[i].value;
      break;
    }
  }
  if (uTeleserviceID == '') {
    uTeleserviceID = CDMA_MSG_TELESERVICE_ID_WMT; // CDMA SMS
  }
  var str = document.getElementById('input_data').value;
  console.log("bearer data: ", str);
  console.log("uTeleserviceID: ", uTeleserviceID);
  var bytes = hexToBytes(str);
  document.getElementById("0_DecodedInfo_Tag").innerHTML = "<font color='orange'>Decoded Information:</font><BR><font color='green'>Teleservice ID:</font> <br>" + uTeleserviceID;
  clearDataFunction();
  if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_MWI) {
    document.getElementById("1_MWICount_Body").innerHTML = "MWI msg count: " + bytes[0];
  } else if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WAP
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_CT_WAP
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WMT
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_VMN
    || uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WEMT) {
    decodeUserData(bytes, uTeleserviceID);
  }
}

// Decode user data from bearer data to get message body
function decodeUserData(bytes, uTeleserviceID) {
  var i = 0, id, dataLen = bytes.length, length = 0;
  var hexStr = bytesToHex(bytes);
  document.getElementById("2_BearerData_Body").innerHTML = "<font color='green'>BearerData: </font> <br>Decimal: <br>" + bytes + "<br><br>Hex:<br>"+hexStr;

  while (dataLen > 0) {
    id = bytes[i++];      // Subparameter_id
    length = bytes[i++];  // Subparam_len
    var userDataBuffer = [];

    for (var index = i; index < i+length; index++) {
      userDataBuffer.push(bytes[index]);
    }
    startRead(userDataBuffer);
    console.log("subparamId: ", id);
    switch (id) {
      case PDU_CDMA_MSG_USERDATA_MSG_ID: // message identifier
        document.getElementById("3_MessageIdentifier_Tag").innerHTML = "<font color='blue'>Message Identifier</font><br>" + "======================";
        decodeResult.msg_identifier = decodeUserDataMsgId();
        break;
      case PDU_CDMA_MSG_USERDATA_BODY: // user data
        document.getElementById("4_UserData_Tag").innerHTML = "<font color='blue'>User Data</font><br>" + "======================";
        decodeResult.user_data = decodeUserDataMsg(uTeleserviceID);
        break;
      case PDU_CDMA_MSG_USERDATA_TIMESTAMP: // Message Center Time Stamp
        document.getElementById("5_MessageCenterTimeStamp_Tag").innerHTML = "<font color='blue'>Message Center Time Stamp</font><br>" + "======================";
        decodeResult.time_stamp = decodeUserDataTimestamp();
        break;
      case PDU_CDMA_MSG_PRIORITY_INDICATOR:
        document.getElementById("6_PriorityIndicator_Tag").innerHTML = "<font color='blue'>Priority Indicator</font><br>" + "======================";
        decodeResult.priority_ind = DecodePriorityIndicator();
        break;
      case PDU_CDMA_MSG_USERDATA_REPLY_OPTION:
        document.getElementById("7_ReplyOption_Tag").innerHTML = "<font color='blue'>Reply Option</font><br>" + "======================";
        decodeResult.reply_option = decodeUserDataReplyOption();
        break;
      case PDU_CDMA_MSG_NUMBER_OF_MESSAGES:
        document.getElementById("8_VoiceMessageCount_Tag").innerHTML = "<font color='blue'>Number Of Voice Message</font><br>" + "======================";
        decodeResult.msg_count = DecodeMsgCount();
        break;
      case PDU_CDMA_MSG_LANGUAGE_INDICATOR:
        document.getElementById("9_LanguageIndicator_Tag").innerHTML = "<font color='blue'>Language Indicator</font><br>" + "======================";
        decodeResult.language_ind = decodeLanguageIndicator();
        break;
      case PDU_CDMA_MSG_USERDATA_CALLBACK_NUMBER:
        document.getElementById("10_CallbackNumber_Tag").innerHTML = "<font color='blue'>Callback Number</font><br>" + "======================";
        decodeResult.callback_num = decodeUserDataCallbackNumber();
        break;
      case PDU_CDMA_MSG_USER_DATA_MSG_STATUS:
        document.getElementById("11_MessageStatus_Tag").innerHTML = "<font color='blue'>Message Status</font><br>" + "======================";
        decodeResult.msg_status = decodeUserDataMsgStatus();
        break;
    }
    i += length;
    dataLen -= (length + 2);
    userDataBuffer = [];
  }
  console.log("decode : ", JSON.stringify(decodeResult));
}

// User data subparameter decoder: Message Identifier
function decodeUserDataMsgId() {
  // Msg Indetifier:
  // MESSAGE_TYPE   4    0001 (Deliver) /0010 (Submit)
  // MESSAGE_ID     16   Generated
  // HEADER_IND     1
  // RESERVED       3
  var result = {};
  var msgType = readBits(4); // message_type
  var msgId = readBits(16); // message_id
  userHeader = readBits(1); // has user data header
  result.msgType = msgType;
  result.msgId = msgId;
  result.userHeader = userHeader;
  document.getElementById("3_1_MessageIdentifier_Body").innerHTML = "msgType: " + msgType +
    "<br>msgId: " + msgId + "<br>userHeader: " + userHeader;
  return result;
}

// User data subparameter decoder : User Data
function decodeUserDataMsg(uTeleserviceID) {
  var result = {},
      encoding = readBits(5),
      msgType;

  result.cdmaEncoding = displayEncodingType(encoding);

  if (encoding === PDU_CDMA_MSG_CODING_IS_91) {
    msgType = readBits(8);
    result.msgType = msgType;
  }
  result.encoding = getCdmaMsgEncoding(encoding);

  var msgBodySize = readBits(8);

  if (userHeader) {
    document.getElementById("4_2_UserDataHeader_Tag").innerHTML = "<font color='red'>User Data Header</font><br>" + "-------------------------";
    result.header = decodeUserDataHeader(result.encoding, encoding);
    msgBodySize -= result.header.length;
  }
  result.msgBodySize = msgBodySize;
  document.getElementById("4_4_UserDataBody_Tag").innerHTML = "<font color='red'>User Data Body</font><br>" + "-------------------------";
  document.getElementById("4_5_UserDataBodySize_Body").innerHTML = "msg body size: <br>" + msgBodySize;

  // Store original payload if enconding is OCTET for further handling of WAP Push, etc.
  if (encoding === PDU_CDMA_MSG_CODING_OCTET && msgBodySize > 0) {
    result.data = new Uint8Array(msgBodySize);
    for (var i = 0; i < msgBodySize; i++) {
      result.data[i] = readBits(8);
    }
    backwardReadPilot(8 * msgBodySize);
  }

  // handle MMS WAP push
  if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_WAP) {
    result.body  = handleWapPush(msgBodySize);
    //return result.body;
  } else if (uTeleserviceID == CDMA_MSG_TELESERVICE_ID_CT_WAP) {
    result.body = handleCtWapPush();
    //return result.body;
  } else {
    // Decode sms content
    var headerPaddingBits = 0;
    if (userHeader && result.header.headerPaddingBits > 0){
      headerPaddingBits = result.header.headerPaddingBits;
    }
    result.body = decodeCdmaPDUMsg(encoding, msgType, msgBodySize, headerPaddingBits);
    document.getElementById("4_9_UserDataBodyMsg_Body").innerHTML = "body: <br>" + result.body;
    //return result;
  }
  return result;
}

function handleWapPush(msgBodySize) {
  var result = {};
  var payloadBits = msgBodySize * 8;
  var consumedBits = 0;

  // The WAP message type should be for WDP messages (value of 0)
  var msgType = readBits(8);
  consumedBits += 8;
  if (msgType != 0) {
    console.log("Received a WAP SMS which is not WDP");
    return ;
  }
  result.msgType = msgType;

  // Total segments that make up the complete datagram
  var totalSegments = readBits(8);
  consumedBits += 8;
  if (totalSegments == 0) {
    console.log("Total segment: , expecting >= 1" ,totalSegments);
    return ;
  }
  result.totalSegments = totalSegments;

  // Segment number for a single segment of the datagram, each subsequent
  // segment increases by 1
  var segment = readBits(8) + 1;
  consumedBits += 8;
  if (segment > totalSegments) {
    console.log("WDP bad segment: ",segment);
    return ;
  }
  result.segment = segment;

  console.log("msgType: ",msgType);
  console.log("totalSegments: ",totalSegments);
  console.log("segment: ",segment);

  // Only the first segment (zero-based) contains source and destination port
  if (segment == 1) {
    var originatorPort = readBits(16);
    consumedBits += 16;
    var destinationPort = readBits(16);
    consumedBits += 16;
    result.originatorPort = originatorPort;
    result.destinationPort = destinationPort;
    console.log("originatorPort: ",originatorPort);
    console.log("destinationPort: ",destinationPort);
  }

  var binaryBits = payloadBits - consumedBits;

  wapData = new Uint8Array(binaryBits/8);
  for (var i = 0; i < binaryBits/8; i++) {
    wapData[i] = readBits(8);
    console.log("wapData: " + wapData[i]);
  }
  var options = {
      bearer: WDP_BEARER_GSM_SMS_GSM_MSISDN,
      sourcePort: originatorPort,
      destinationPort: destinationPort
  };
  var rawData = {array: wapData, offset: 0};
  PduHelper.parse(rawData, true, options);

  var msg = mmsPduHelper.parse(rawData, options);
  console.log("msg: " + JSON.stringify(msg));

  if (segment == 1) {
    document.getElementById("4_6_UserDataBodyWAPHeader_Body").innerHTML = "totalSegments: " + totalSegments +
    "<br>segment: " + segment + "<br>originatorPort: " + originatorPort+ "<br>destinationPort: " + destinationPort +
    "<br>transactionId: " + options.transactionId +
    "<br>type: " + options.type + "<br>content-type: " + options.headers["content-type"].media+ "<br>params: " + options.headers["content-type"].params +
    "<br>x-wap-application-id: " + options.headers["x-wap-application-id"] + "<br>encoding-version: " + options.headers["encoding-version"] +
    "<br>push-flag: " + options.headers["push-flag"] + "<br>x-mms-message-type: " + options.headers["x-mms-message-type"] + "<br>x-mms-transaction-id: " + options.headers["x-mms-transaction-id"] +
    "<br>x-mms-mms-version: " + options.headers["x-mms-mms-version"] + "<br>x-mms-message-class: " + options.headers["x-mms-message-class"] + "<br>x-mms-message-size: " + options.headers["x-mms-message-size"] +
    "<br>x-mms-expiry: " + options.headers["x-mms-expiry"] + "<br>x-mms-content-location: " + options.headers["x-mms-content-location"].uri;
  } else {
  document.getElementById("4_6_UserDataBodyWAPHeader_Body").innerHTML = "transactionId: " + options.transactionId +
    "<br>type: " + options.type + "<br>content-type: " + options.headers["content-type"].media+ "<br>params: " + options.headers["content-type"].params +
    "<br>x-wap-application-id: " + options.headers["x-wap-application-id"] + "<br>encoding-version: " + options.headers["encoding-version"] +
    "<br>push-flag: " + options.headers["push-flag"] + "<br>x-mms-message-type: " + options.headers["x-mms-message-type"] + "<br>x-mms-transaction-id: " + options.headers["x-mms-transaction-id"] +
    "<br>x-mms-mms-version: " + options.headers["x-mms-mms-version"] + "<br>x-mms-message-class: " + options.headers["x-mms-message-class"] + "<br>x-mms-message-size: " + options.headers["x-mms-message-size"] +
    "<br>x-mms-expiry: " + options.headers["x-mms-expiry"] + "<br>x-mms-content-location: " + options.headers["x-mms-content-location"].uri;
  }
  result.wapPushBody = msg;
  return result;
}

function handleCtWapPush() {
  var num_field = 0;
  var totalSegments = 0;
  var segment = 0;
  var id = 0;
  var result = {};

  while(true) {
    id = readBits(8);
    if (id == 0) {
      // bear data id 0x00, skip unknow bits
      readBits(12);
      readBits(8);
      readBits(8);
      readBits(4);
    } else if(id == 1) {
      // bear data id 0x01 (length/encode/num_field)
      readBits(8);
      readBits(5);
      num_field = 0xFF & readBits(8);
      console.log("num_field: ",num_field);

      // The WAP message type should be for WDP messages (value of 0)
      var msgType = readBits(8);
      if (msgType != 0) {
        console.log("Received a WAP SMS which is not WDP");
        return ;
      }
      result.msgType = msgType;

      // Total segments that make up the complete datagram
      totalSegments = readBits(8);
      if (totalSegments == 0) {
        console.log("Total segment: " + totalSegments +" ,expecting >= 1");
        return ;
      }
    result.totalSegments = totalSegments;

      // Segment number for a single segment of the datagram, each subsequent
      // segment increases by 1
      segment = readBits(8) + 1;
      if (segment > totalSegments) {
        console.log("WDP bad segment: ",segment);
        return ;
      }
      result.segment = segment;

      console.log("msgType: ",msgType);
      console.log("totalSegments: ",totalSegments);
      console.log("segment: ",segment);

      var binaryBits = num_field * 8 - 24;
      // Only the first segment (zero-based) contains source and destination port
      if (segment == 1) {
        var originatorPort = readBits(16);
        var destinationPort = readBits(16);
        //readBits(24); // no ideal why need to skip 3 bytes.
        binaryBits = num_field * 8 - 56;
        console.log("originatorPort: ",originatorPort);
        console.log("destinationPort: ",destinationPort);
        result.originatorPort = originatorPort;
        result.destinationPort = destinationPort;
      }
      console.log("Binary bits : ", binaryBits);

    wapData = new Uint8Array(binaryBits/8);
      for (var i = 0; i < binaryBits/8; i++) {
    wapData[i] = readBits(8);
    console.log("wapData: " + wapData[i]);
    }
      var options = {
    bearer: WDP_BEARER_GSM_SMS_GSM_MSISDN,
    sourcePort: originatorPort,
    destinationPort: destinationPort
    };
    var rawData = {array: wapData, offset: 0};
      PduHelper.parse(rawData, true, options);

      var msg = mmsPduHelper.parse(rawData, options);
      console.log("msg: " + JSON.stringify(msg));

      if (segment == 1) {
    document.getElementById("4_6_UserDataBodyWAPHeader_Body").innerHTML = "totalSegments: " + totalSegments +
    "<br>segment: " + segment + "<br>originatorPort: " + originatorPort+ "<br>destinationPort: " + destinationPort +
    "<br>transactionId: " + options.transactionId +
    "<br>type: " + options.type + "<br>content-type: " + options.headers["content-type"].media+ "<br>params: " + options.headers["content-type"].params +
    "<br>x-wap-application-id: " + options.headers["x-wap-application-id"] + "<br>encoding-version: " + options.headers["encoding-version"] +
    "<br>push-flag: " + options.headers["push-flag"] + "<br>x-mms-message-type: " + options.headers["x-mms-message-type"] + "<br>x-mms-transaction-id: " + options.headers["x-mms-transaction-id"] +
    "<br>x-mms-mms-version: " + options.headers["x-mms-mms-version"] + "<br>x-mms-message-class: " + options.headers["x-mms-message-class"] + "<br>x-mms-message-size: " + options.headers["x-mms-message-size"] +
    "<br>x-mms-expiry: " + options.headers["x-mms-expiry"] + "<br>x-mms-content-location: " + options.headers["x-mms-content-location"].uri;
    } else {
    document.getElementById("4_6_UserDataBodyWAPHeader_Body").innerHTML = "transactionId: " + options.transactionId +
    "<br>type: " + options.type + "<br>content-type: " + options.headers["content-type"].media+ "<br>params: " + options.headers["content-type"].params +
    "<br>x-wap-application-id: " + options.headers["x-wap-application-id"] + "<br>encoding-version: " + options.headers["encoding-version"] +
    "<br>push-flag: " + options.headers["push-flag"] + "<br>x-mms-message-type: " + options.headers["x-mms-message-type"] + "<br>x-mms-transaction-id: " + options.headers["x-mms-transaction-id"] +
    "<br>x-mms-mms-version: " + options.headers["x-mms-mms-version"] + "<br>x-mms-message-class: " + options.headers["x-mms-message-class"] + "<br>x-mms-message-size: " + options.headers["x-mms-message-size"] +
    "<br>x-mms-expiry: " + options.headers["x-mms-expiry"] + "<br>x-mms-content-location: " + options.headers["x-mms-content-location"].uri;
    }

      result.wapPushBody = msg;
    return result;
    } else {
      console.log("Received a bad bear data Id");
      return ;
    }
  }
}

function displayEncodingType(encoding) {
  var encodingId;
  switch (encoding) {
    case PDU_CDMA_MSG_CODING_OCTET:
      // octet(8-bit)
      encodingId = "0x00 - Octet";
      break;
    case PDU_CDMA_MSG_CODING_IS_91:
      // IS-91 Extended Protocol Message
      encodingId = "0x01 - IS-91";
      break;
    case PDU_CDMA_MSG_CODING_7BITS_ASCII:
      // 7-bit ASCII
      encodingId = "0x02 - 7bit ASCII";
      break;
    case PDU_CDMA_MSG_CODING_IA5:
      // IA5(7-bit)
      encodingId = "0x03 - IA5(7-bit)";
      break;
    case PDU_CDMA_MSG_CODING_UNICODE:
      // Unicode(16-bit)
      encodingId = "0x04 - Unicode";
      break;
    case PDU_CDMA_MSG_CODING_LATIN_HEBREW:
      // Latin/ Hebrew(8-bit)
      encodingId = "0x07 - Latin/ Hebrew";
      break;
    case PDU_CDMA_MSG_CODING_LATIN:
      // Latin(8-bit)
      encodingId = "0x08 - Latin(8-bit)";
      break;
    case PDU_CDMA_MSG_CODING_7BITS_GSM:
      // GSM 7-bit default alphabet(7-bit)
      encodingId = "0x09 - GSM 7bit alphabet";
      break;
    default:
      encodingId = "Not supported!";
  }
  document.getElementById("4_1_encoding_Body").innerHTML = "encoding: <br>" + encodingId;
  return encodingId;
}

// Decode user data header, we only care about segment information on CDMA.
function decodeUserDataHeader(encoding, cdmaEncoding) {
  var header = {},
      headerSize = readBits(8),
      userDataHeaderSize = headerSize + 1,
      headerPaddingBits = 0;

  header.headerPaddingBits = 0;
  // Calculate header size
  if (encoding === PDU_DCS_MSG_CODING_7BITS_ALPHABET) {
    // Length is in 7-bit
    header.length = Math.ceil(userDataHeaderSize * 8 / 7);
    // Calulate padding length
    headerPaddingBits = (header.length * 7) - (userDataHeaderSize * 8);
    header.headerPaddingBits = headerPaddingBits;
  } else if (encoding === PDU_DCS_MSG_CODING_8BITS_ALPHABET) {
    header.length = userDataHeaderSize;
  } else {
    header.length = userDataHeaderSize / 2;
  }

  while (headerSize) {
    var identifier = readBits(8),
        length = readBits(8);

    header.identifier = identifier;
    header.id_length = length;

    headerSize -= (2 + length);

    switch (identifier) {
      case PDU_IEI_CONCATENATED_SHORT_MESSAGES_8BIT: {
        var ref = readBits(8),
            max = readBits(8),
            seq = readBits(8);
        document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
        "<br>IEI len: " + length + "<br>ref: " + ref+ "<br>max: " + max+ "<br>seq: " + seq;
        if (max && seq && (seq <= max)) {
          header.segmentRef = ref;
          header.segmentMaxSeq = max;
          header.segmentSeq = seq;
        }
        break;
      }
      case PDU_IEI_APPLICATION_PORT_ADDRESSING_SCHEME_16BIT: {
        var stp = (eadBits(8) << 8) | readBits(8),
            orip = (readBits(8) << 8) | readBits(8);
        // 3GPP TS 23.040 clause 9.2.3.24.4: "A receiving entity shall
        // ignore any information element where the value of the
        // Information-Element-Data is Reserved or not supported"
        if ((dstp < PDU_APA_VALID_16BIT_PORTS)
            && (orip < PDU_APA_VALID_16BIT_PORTS)) {
          header.destinationPort = dstp;
          header.originatorPort = orip;
          document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
          "<br>IEI len: " + length + "<br>destinationPort: " + dstp+ "<br>originatorPort: " + orip;
        }
        break;
      }
      case PDU_IEI_APPLICATION_PORT_ADDRESSING_SCHEME_16BIT: {
        var stp = (readBits(8) << 8) | readBits(8),
            orip = (readBits(8) << 8) | readBits(8);
        // 3GPP TS 23.040 clause 9.2.3.24.4: "A receiving entity shall
        // ignore any information element where the value of the
        // Information-Element-Data is Reserved or not supported"
        if ((dstp < PDU_APA_VALID_16BIT_PORTS)
            && (orip < PDU_APA_VALID_16BIT_PORTS)) {
          header.destinationPort = dstp;
          header.originatorPort = orip;
          document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
          "<br>IEI len: " + length + "<br>destinationPort: " + dstp+ "<br>originatorPort: " + orip;
        }
        break;
      }
      case PDU_IEI_CONCATENATED_SHORT_MESSAGES_16BIT: {
        var ref = (readBits(8) << 8) | readBits(8),
            max = readBits(8),
            seq = readBits(8);
        document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
        "<br>IEI len: " + length + "<br>ref: " + ref+ "<br>max: " + max+ "<br>seq: " + seq;
        if (max && seq && (seq <= max)) {
          header.segmentRef = ref;
          header.segmentMaxSeq = max;
          header.segmentSeq = seq;
        }
        break;
      }
      case PDU_IEI_NATIONAL_LANGUAGE_SINGLE_SHIFT: {
        var langShiftIndex = readBits(8);
        if (langShiftIndex < PDU_NL_SINGLE_SHIFT_TABLES.length) {
          header.langShiftIndex = langShiftIndex;
          document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
          "<br>IEI len: " + length + "<br>langShiftIndex: " + langShiftIndex;
        }
        break;
      }
      case PDU_IEI_NATIONAL_LANGUAGE_LOCKING_SHIFT: {
        var langIndex = readBits(8);
        if (langIndex < PDU_NL_LOCKING_SHIFT_TABLES.length) {
          header.langIndex = langIndex;
          document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
          "<br>IEI len: " + length + "<br>langIndex: " + langIndex;
        }
        break;
      }
      case PDU_IEI_SPECIAL_SMS_MESSAGE_INDICATION: {
        var msgInd = readBits(8) & 0xFF,
            msgCount = readBits(8);
        /*
         * TS 23.040 V6.8.1 Sec 9.2.3.24.2
         * bits 1 0   : basic message indication type
         * bits 4 3 2 : extended message indication type
         * bits 6 5   : Profile id
         * bit  7     : storage type
         */
        var storeType = msgInd & PDU_MWI_STORE_TYPE_BIT;
        header.mwi = {};
        mwi = header.mwi;
        if (storeType == PDU_MWI_STORE_TYPE_STORE) {
          // Store message because TP_UDH indicates so, note this may override
          // the setting in DCS, but that is expected
          mwi.discard = false;
        } else if (mwi.discard === undefined) {
          // storeType == PDU_MWI_STORE_TYPE_DISCARD
          // only override mwi.discard here if it hasn't already been set
          mwi.discard = true;
        }

        mwi.msgCount = msgCount & 0xFF;
        mwi.active = mwi.msgCount > 0;
        document.getElementById("4_3_UserDataHeader_Body").innerHTML = "IEI: " + identifier +
        "<br>IEI len: " + length + "<br>msgInd: " + msgInd+ "<br>msgCount: " + msgCount+
        "<br>mwi.discard: " + mwi.discard + "<br>mwi.active: " + mwi.active;
        break;
      }
      default:
      // Drop unsupported id
      for (var i = 0; i < length; i++) {
        readBits(8);
      }
    }
  }

  // Consume padding bits
  if (headerPaddingBits) {
    if (cdmaEncoding != PDU_CDMA_MSG_CODING_7BITS_GSM) {
      readBits(headerPaddingBits);
    }
  }

  return header;
}

function decodeCdmaPDUMsg(encoding, msgType, msgBodySize, numPaddingBits) {
  const langTable = PDU_NL_LOCKING_SHIFT_TABLES[PDU_NL_IDENTIFIER_DEFAULT];
  const langShiftTable = PDU_NL_SINGLE_SHIFT_TABLES[PDU_NL_IDENTIFIER_DEFAULT];
  var result = "";
  var msgDigit;
  var Chars = [];

  switch (encoding) {
    case PDU_CDMA_MSG_CODING_OCTET:
      while(msgBodySize > 0) {
        msgDigit = readBits(8);
        Chars.push(msgDigit);
        msgDigit = String.fromCharCode(msgDigit);
        result += msgDigit;
        msgBodySize--;
      }
      break;
    case PDU_CDMA_MSG_CODING_IS_91:
      // Referenced from android code
      switch (msgType) {
        case PDU_CDMA_MSG_CODING_IS_91_TYPE_SMS:
        case PDU_CDMA_MSG_CODING_IS_91_TYPE_SMS_FULL:
        case PDU_CDMA_MSG_CODING_IS_91_TYPE_VOICEMAIL_STATUS:
          while(msgBodySize > 0) {
            msgDigit = readBits(6);
            Chars.push(msgDigit + 0x20);
            msgDigit = String.fromCharCode(msgDigit + 0x20);
            result += msgDigit;
            msgBodySize--;
          }
          break;
        case PDU_CDMA_MSG_CODING_IS_91_TYPE_CLI:
          var addrInfo = {};
          addrInfo.digitMode = PDU_CDMA_MSG_ADDR_DIGIT_MODE_DTMF;
          addrInfo.numberMode = PDU_CDMA_MSG_ADDR_NUMBER_MODE_ANSI;
          addrInfo.numberType = PDU_CDMA_MSG_ADDR_NUMBER_TYPE_UNKNOWN;
          addrInfo.numberPlan = PDU_CDMA_MSG_ADDR_NUMBER_PLAN_UNKNOWN;
          addrInfo.addrLength = msgBodySize;
          addrInfo.address = [];
          for (var i = 0; i < addrInfo.addrLength; i++) {
            msgDigit = readBits(4);
            Chars.push(msgDigit);
            addrInfo.address.push(msgDigit);
          }
          result = decodeAddr(addrInfo);
          break;
      }
    case PDU_CDMA_MSG_CODING_7BITS_ASCII:
    case PDU_CDMA_MSG_CODING_IA5:
      while(msgBodySize > 0) {
        msgDigit = readBits(7);
        Chars.push(msgDigit);

        if (msgDigit >= 32) {
          msgDigit = String.fromCharCode(msgDigit);
        } else {
          if (msgDigit !== PDU_NL_EXTENDED_ESCAPE) {
            msgDigit = langTable[msgDigit];
          } else {
            msgDigit = readBits(7);
            msgBodySize--;
            Chars.push(msgDigit);
            msgDigit = langShiftTable[msgDigit];
          }
        }
        result += msgDigit;
        msgBodySize--;
      }
      break;
    case PDU_CDMA_MSG_CODING_UNICODE:
      while(msgBodySize > 0) {
        msgDigit = readBits(16);
        Chars.push(msgDigit);
        msgDigit = String.fromCharCode(msgDigit);
        result += msgDigit;
        msgBodySize--;
      }
      break;
    case PDU_CDMA_MSG_CODING_7BITS_GSM:
      var data = [], shift = 0;
      for (var j=0 ;j< msgBodySize ; j++) {
        data.push(readBits(8));
      }
      for (var i = 0; i < msgBodySize; i++) {
        var bitOffset = (7 * i) + numPaddingBits;
        var byteOffset = Math.floor(bitOffset / 8);
        shift = bitOffset % 8;

        var msgDigit = (0x7f & (data[byteOffset] >> shift));
        // If it crosses a byte boundary
        if (shift > 1) { // set msb bits to 0
          msgDigit &= 0x7f >> (shift - 1);
          msgDigit |= 0x7f & (data[byteOffset + 1] << (8 - shift));
        }
        console.log("msgDigit: ",msgDigit);

        if (msgDigit !== PDU_NL_EXTENDED_ESCAPE) {
          msgDigit = langTable[msgDigit];
          console.log("msgDigit",msgDigit);
        } else {
          msgDigit = langShiftTable[msgDigit];
          console.log("msgDigit",msgDigit);
        }
        result += msgDigit;
      }
      break;
    case PDU_CDMA_MSG_CODING_LATIN:
      // Reference : http://en.wikipedia.org/wiki/ISO/IEC_8859-1
      while(msgBodySize > 0) {
        msgDigit = readBits(8);
        Chars.push(msgDigit);
        msgDigit = String.fromCharCode(msgDigit);
        result += msgDigit;
        msgBodySize--;
      }
      break;
    case PDU_CDMA_MSG_CODING_LATIN_HEBREW:  // TODO : Require Test
      // Reference : http://en.wikipedia.org/wiki/ISO/IEC_8859-8
      while(msgBodySize > 0) {
        msgDigit = readBits(8);
        Chars.push(msgDigit);
        if (msgDigit === 0xDF) {
          msgDigit = String.fromCharCode(0x2017);
        } else if (msgDigit === 0xFD) {
          msgDigit = String.fromCharCode(0x200E);
        } else if (msgDigit === 0xFE) {
          msgDigit = String.fromCharCode(0x200F);
        } else if (msgDigit >= 0xE0 && msgDigit <= 0xFA) {
          msgDigit = String.fromCharCode(0x4F0 + msgDigit);
        } else {
          msgDigit = String.fromCharCode(msgDigit);
        }
        result += msgDigit;
        msgBodySize--;
      }
      break;
    case PDU_CDMA_MSG_CODING_SHIFT_JIS:
    case PDU_CDMA_MSG_CODING_KOREAN:
    case PDU_CDMA_MSG_CODING_GSM_DCS:
      // Fall through.
    default:
      break;
  }
  document.getElementById("4_8_UserDataBodyChar_Body").innerHTML = "char code: <br>" + bytesToHex(Chars);
  Chars = [];
  return result;
}

function getCdmaMsgEncoding(encoding) {
  // Determine encoding method
  switch (encoding) {
    case PDU_CDMA_MSG_CODING_7BITS_ASCII:
    case PDU_CDMA_MSG_CODING_IA5:
    case PDU_CDMA_MSG_CODING_7BITS_GSM:
      return PDU_DCS_MSG_CODING_7BITS_ALPHABET;
    case PDU_CDMA_MSG_CODING_OCTET:
    case PDU_CDMA_MSG_CODING_IS_91:
    case PDU_CDMA_MSG_CODING_LATIN_HEBREW:
    case PDU_CDMA_MSG_CODING_LATIN:
      return PDU_DCS_MSG_CODING_8BITS_ALPHABET;
    case PDU_CDMA_MSG_CODING_UNICODE:
    case PDU_CDMA_MSG_CODING_SHIFT_JIS:
    case PDU_CDMA_MSG_CODING_KOREAN:
      return PDU_DCS_MSG_CODING_16BITS_ALPHABET;
  }
  return null;
}

/**
 * Decode CDMA address data into address string
 * @see 3GGP2 C.S0015-B 2.0, 3.4.3.3 Address Parameters
 */
function decodeAddr(addrInfo) {
  var result = "";
  for (var i = 0; i < addrInfo.addrLength; i++) {
    if (addrInfo.digitMode === PDU_CDMA_MSG_ADDR_DIGIT_MODE_DTMF) {
      result += dtmfChars.charAt(addrInfo.address[i]);
    } else {
      result += String.fromCharCode(addrInfo.address[i]);
    }
  }
  return result;
}

/**
 * User data subparameter decoder : Time Stamp
 * @see 3GGP2 C.S0015-B 2.0, 4.5.4 Message Center Time Stamp
 */
function decodeUserDataTimestamp() {
  var year = decodeBcd(readBits(8)),
      month = decodeBcd(readBits(8)),
      date = decodeBcd(readBits(8)),
      hour = decodeBcd(readBits(8)),
      min = decodeBcd(readBits(8)),
      sec = decodeBcd(readBits(8));
  if (year >= 96 && year <= 99) {
    year += 1900;
  } else {
    year += 2000;
  }
  var result = hour + ":" + min + ":" + sec + " " + month + "/" + date + "/" + year;
  document.getElementById("5_1_MessageCenterTimeStamp_Body").innerHTML = "Time Stamp :<br>" + result ;

  return result;
}

/**
 * Decode priority indicator part of bearer data
 * @see 3GPP2 C.S0015-B v2.0 section 4.5.9 Priority Indicator
 */
function DecodePriorityIndicator() {
  var priorityIndicator = readBits(2);
  console.log("priority indicator: ",priorityIndicator);
  var priorityIndicatorStr;
  switch (priorityIndicator) {
    case PRIORITY_NORMAL:
      priorityIndicatorStr = "Normal";
      break;
    case PRIORITY_INTERACTIVE:
      priorityIndicatorStr = "Interactive";
      break;
    case PRIORITY_URGENT:
      priorityIndicatorStr = "Urgent";
      break;
    case PRIORITY_EMERGENCY:
      priorityIndicatorStr = "Emergency";
      break;
  }
  document.getElementById("6_1_PriorityIndicator_Body").innerHTML = "Priority Indicator : <br>" + priorityIndicatorStr;
  return priorityIndicatorStr;
}

/**
 * User data subparameter decoder : Reply Option
 * @see 3GGP2 C.S0015-B 2.0, 4.5.11 Reply Option
 */
function decodeUserDataReplyOption() {
  var replyAction = readBits(4),
      result = { userAck: (replyAction & 0x8) ? true : false,
                deliverAck: (replyAction & 0x4) ? true : false,
                readAck: (replyAction & 0x2) ? true : false,
                report: (replyAction & 0x1) ? true : false
                };
  document.getElementById("7_1_ReplyOption_Body").innerHTML = "Reply Option :<br> " + "user Ack: " +
  result.userAck + " ,deliver Ack: " + result.deliverAck + " ,read Ack: " + result.readAck + " ,report: " + result.report ;

  return result;
}

/**
 * Decode number of messages stored at the Voice Mail System
 * @see 3GPP2 C.S0015-B v2.0 section 4.5.12 Number of Messages
 */
function DecodeMsgCount() {
  var numberOfMessages = decodeBcd(readBits(8));
  document.getElementById("8_1_VoiceMessageCount_Body").innerHTML = "Number of messages : <br>" + numberOfMessages;
  return numberOfMessages;
}

/**
 * User data subparameter decoder : Language Indicator
 * @see 3GGP2 C.S0015-B 2.0, 4.5.14 Language Indicator
 */
function decodeLanguageIndicator() {
  var language = readBits(8);
  var result = CB_CDMA_LANG_GROUP[language];
  document.getElementById("9_1_LanguageIndicator_Body").innerHTML = "Language Indicator :<br> " + result ;
  return result;
}

/**
 * User data subparameter decoder : Call-Back Number
 * @see 3GGP2 C.S0015-B 2.0, 4.5.15 Call-Back Number
 */
function decodeUserDataCallbackNumber() {
  var digitMode = readBits(1);
  if (digitMode) {
    var numberType = readBits(3),
        numberPlan = readBits(4);
  }
  var numberFields = readBits(8),
      result = "";
  for (var i = 0; i < numberFields; i++) {
    if (digitMode === PDU_CDMA_MSG_ADDR_DIGIT_MODE_DTMF) {
      var addrDigit = readBits(4);
      result += dtmfChars.charAt(addrDigit);
    } else {
      var addrDigit = readBits(8);
      result += String.fromCharCode(addrDigit);
    }
  }
  document.getElementById("10_1_CallbackNumber_Body").innerHTML = "Call Back Number :<br> " + result ;
  return result;
}

/**
 * User data subparameter decoder : Message Status
 * @see 3GGP2 C.S0015-B 2.0, 4.5.21 Message Status
 */
function decodeUserDataMsgStatus() {
  var result = {
    errorClass: readBits(2),
    msgStatus: readBits(6)
  };
  document.getElementById("11_1_MessageStatus_Body").innerHTML = "Message Status " + "errorClass: " + errorClass + " ,msgStatus: " + msgStatus;
  return result;
}

function decodeBcd(value) {
  return ((value >> 4) & 0xF) * 10 + (value & 0x0F);
}

// Convert a hex string to a byte array
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
  bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
    hex.push('  ');
  }
  return hex.join("");
}

function startRead(dataBuffer) {
  readBuffer = dataBuffer;
  readCache = 0;
  readCacheSize = 0;
  readIndex = 0;
}

function readBits(length) {
  if (length <= 0 || length > 32) {
    return null;
  }
  if (length > readCacheSize) {
    var bytesToRead = Math.ceil((length - readCacheSize) / 8);
    for(var i = 0; i < bytesToRead; i++) {
      readCache = (readCache << 8) | (readBuffer[readIndex++] & 0xFF);
      readCacheSize += 8;
    }
  }
  var bitOffset = (readCacheSize - length);
  var resultMask = (1 << length) - 1;
  var result = 0;

  result = (readCache >> bitOffset) & resultMask;
  readCacheSize -= length;

  return result;
}

function backwardReadPilot(length) {
  if (length <= 0) {
    return;
  }

  // Zero-based position.
  var bitIndexToRead = readIndex * 8 - readCacheSize - length;

  if (bitIndexToRead < 0) {
    return;
  }

  // Update readIndex, readCache, readCacheSize accordingly.
  var readBits = bitIndexToRead % 8;
  readIndex = Math.floor(bitIndexToRead / 8) + ((readBits) ? 1 : 0);
  readCache = (readBits) ? this.readBuffer[this.readIndex - 1] : 0;
  readCacheSize = (readBits) ? (8 - readBits) : 0;
}
</script>

</body>
</html>



