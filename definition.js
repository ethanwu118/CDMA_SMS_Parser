// SMS Teleservice Identifier, see 3GPP2 N.S0005-0 v1.0, table 175
CDMA_MSG_TELESERVICE_ID_WMT = 0x1002  // SMS
CDMA_MSG_TELESERVICE_ID_VMN = 0x1003  // Voicemail notification
CDMA_MSG_TELESERVICE_ID_WAP = 0x1004  // WAP Push
CDMA_MSG_TELESERVICE_ID_WEMT = 0x1005 // Wireless Enhanced Messaging
                                      // Teleservice for fragmented SMS
CDMA_MSG_TELESERVICE_ID_CT_WAP = 0xFDEA // China Telecom MMS WAP Push

// Voice mail notification through Message Waiting Indication in CDMA mode or
// Analog mode. Defined in 3GPP2 C.S0005, 3.7.5.6, an Info Record containing an
// 8-bit number with the number of messages waiting, it's used by some CDMA
// carriers for a voice mail count. This is an extension to the standard
// teleservice.
CDMA_MSG_TELESERVICE_ID_MWI = 0x40000

// SMS User Data Subparameters, as defined in 3GPP2 C.S0015-A v2.0, Table 4.5-1
PDU_CDMA_MSG_USERDATA_MSG_ID          = 0x00;  // Message Identifier
PDU_CDMA_MSG_USERDATA_BODY            = 0x01;  // User Data Body
PDU_CDMA_MSG_USERDATA_TIMESTAMP       = 0x03;  // Message Center Time Stamp
PDU_CDMA_MSG_PRIORITY_INDICATOR       = 0x08;  // Priority Indicator
PDU_CDMA_MSG_USERDATA_REPLY_OPTION    = 0x0A;  // Reply Option
PDU_CDMA_MSG_NUMBER_OF_MESSAGES       = 0x0B;  // Number of messages stored at the Voice Mail System
PDU_CDMA_MSG_LANGUAGE_INDICATOR       = 0x0D;  // Language Indicator
PDU_CDMA_MSG_USERDATA_CALLBACK_NUMBER = 0x0E;  // Callback Number
PDU_CDMA_MSG_USER_DATA_MSG_STATUS     = 0x14;  // Message Status

// DCS - Data Coding Scheme
PDU_DCS_MSG_CODING_7BITS_ALPHABET  = 0x00;
PDU_DCS_MSG_CODING_8BITS_ALPHABET  = 0x04;
PDU_DCS_MSG_CODING_16BITS_ALPHABET = 0x08;

// SMS Encoding, as defined in 3GPP2 C.R1001-D, Table 9.1-1
PDU_CDMA_MSG_CODING_OCTET = 0x00;        // octet(8-bit), Not tested
PDU_CDMA_MSG_CODING_IS_91 = 0x01;        // IS-91 Extended Protocol Message(variable), Not tested
PDU_CDMA_MSG_CODING_7BITS_ASCII = 0x02;  // 7-bit ASCII(7-bit)
PDU_CDMA_MSG_CODING_IA5 = 0x03;          // IA5(7-bit), Not tested
PDU_CDMA_MSG_CODING_UNICODE = 0x04;      // Unicode(16-bit)
PDU_CDMA_MSG_CODING_SHIFT_JIS = 0x05;    // Shift-6 JIS(8/16-bit variable), Not supported
PDU_CDMA_MSG_CODING_KOREAN = 0x06;       // Korean(8/16-bit variable), Not supported
PDU_CDMA_MSG_CODING_LATIN_HEBREW = 0x07; // Latin/ Hebrew(8-bit), ISO/IEC 8859-8, Not supported
PDU_CDMA_MSG_CODING_LATIN = 0x08;        // Latin(8-bit), ISO/IEC 8859-1, Not tested
PDU_CDMA_MSG_CODING_7BITS_GSM = 0x09;    // GSM 7-bit default alphabet(7-bit), Not tested
PDU_CDMA_MSG_CODING_GSM_DCS = 0x0A;      // GSM Data-Coding-Scheme, Not supported

// See 9.2.3.24 TP‑User Data (TP‑UD)
PDU_IEI_CONCATENATED_SHORT_MESSAGES_8BIT         = 0x00;
PDU_IEI_SPECIAL_SMS_MESSAGE_INDICATION           = 0x01;
PDU_IEI_APPLICATION_PORT_ADDRESSING_SCHEME_8BIT  = 0x04;
PDU_IEI_APPLICATION_PORT_ADDRESSING_SCHEME_16BIT = 0x05;
PDU_IEI_SMSC_CONTROL_PARAMS                      = 0x06;
PDU_IEI_UDH_SOURCE_INDICATOR                     = 0x07;
PDU_IEI_CONCATENATED_SHORT_MESSAGES_16BIT        = 0x08;
PDU_IEI_WIRELESS_CONTROL_MESSAGE_PROTOCOL        = 0x09;
PDU_IEI_TEXT_FORMATING                           = 0x0A;
PDU_IEI_PREDEFINED_SOUND                         = 0x0B;
PDU_IEI_USER_DATA_SOUND                          = 0x0C;
PDU_IEI_PREDEFINED_ANIMATION                     = 0x0D;
PDU_IEI_LARGE_ANIMATION                          = 0x0E;
PDU_IEI_SMALL_ANIMATION                          = 0x0F;
PDU_IEI_LARGE_PICTURE                            = 0x10;
PDU_IEI_SMALL_PICTURE                            = 0x11;
PDU_IEI_VARIABLE_PICTURE                         = 0x12;
PDU_IEI_USER_PROMPT_INDICATOR                    = 0x13;
PDU_IEI_EXTENDED_OBJECT                          = 0x14;
PDU_IEI_REUSED_EXTENDED_OBJECT                   = 0x15;
PDU_IEI_COMPRESS_CONTROL                         = 0x16;
PDU_IEI_OBJECT_DISTRIBUTION_INDICATOR            = 0x17;
PDU_IEI_STANDARD_WVG_OBJECT                      = 0x18;
PDU_IEI_CHARACTER_SIZE_WVG_OBJECT                = 0x19;
PDU_IEI_EXTENDED_OBJECT_DATA_REQUEST_COMMAND     = 0x1A;
PDU_IEI_RFC822_EMAIL_HEADER                      = 0x20;
PDU_IEI_HYPERLINK_FORMAT_ELEMENT                 = 0x21;
PDU_IEI_REPLY_ADDRESS_ELEMENT                    = 0x22;
PDU_IEI_ENHANCED_VOICE_MAIL_INFORMATION          = 0x23;
PDU_IEI_NATIONAL_LANGUAGE_SINGLE_SHIFT           = 0x24;
PDU_IEI_NATIONAL_LANGUAGE_LOCKING_SHIFT          = 0x25;

// Address Information, Digit Mode, as defined in 3GPP2 C.S0015-A v2.0, sec 3.4.3.3
PDU_CDMA_MSG_ADDR_DIGIT_MODE_DTMF = 0x00;      // Digit Mode : DTMF
PDU_CDMA_MSG_ADDR_DIGIT_MODE_ASCII = 0x01;     // Digit Mode : 8-bit ASCII with MSB = 0

// Address Information, Number Type, as defined in 3GPP2 C.S0015-A v2.0, Table 3.4.3.3-1
PDU_CDMA_MSG_ADDR_NUMBER_TYPE_UNKNOWN = 0x00;        // Number Type : Unknown
PDU_CDMA_MSG_ADDR_NUMBER_TYPE_INTERNATIONAL = 0x01;  // Number Type : Internaltional number(+XXXXX)
PDU_CDMA_MSG_ADDR_NUMBER_TYPE_NATIONAL = 0x02;       // Number Type : National number

// Special SMS Message Indication constants
PDU_MWI_STORE_TYPE_BIT     = 0x80;
PDU_MWI_STORE_TYPE_DISCARD = 0x00;
PDU_MWI_STORE_TYPE_STORE   = 0x80;

// CDMA SMS message types, see 3GPP2 C.S0015-B v2.0, table 4.5.1-1
MESSAGE_TYPE_DELIVER        = 0x01;
MESSAGE_TYPE_SUBMIT         = 0x02;
MESSAGE_TYPE_DELIVERY_ACK   = 0x04;

// CDMA SMS priority modes, see 3GPP C.S0015-B v2.0, table 4.5.9-1
PRIORITY_NORMAL      = 0x00;
PRIORITY_INTERACTIVE = 0x01;
PRIORITY_URGENT      = 0x02;
PRIORITY_EMERGENCY   = 0x03;

// IS-91 Message Type, as defined in TIA/EIA/IS-91-A, Table 9
PDU_CDMA_MSG_CODING_IS_91_TYPE_VOICEMAIL_STATUS = 0x82;
PDU_CDMA_MSG_CODING_IS_91_TYPE_SMS_FULL = 0x83;
PDU_CDMA_MSG_CODING_IS_91_TYPE_CLI = 0x84;
PDU_CDMA_MSG_CODING_IS_91_TYPE_SMS = 0x85;

// CDMA Language Indicator: Language groups
// see 3GPP2 C.R1001-F table 9.2-1
CB_CDMA_LANG_GROUP = [
  null, "en", "fr", "es", "ja", "ko", "zh", "he"
];

PDU_NL_IDENTIFIER_DEFAULT    = 0;
PDU_NL_IDENTIFIER_TURKISH    = 1;
PDU_NL_IDENTIFIER_SPANISH    = 2;
PDU_NL_IDENTIFIER_PORTUGUESE = 3;
PDU_NL_IDENTIFIER_BENGALI    = 4;
PDU_NL_IDENTIFIER_GUJARATI   = 5;
PDU_NL_IDENTIFIER_HINDI      = 6;
PDU_NL_IDENTIFIER_KANNADA    = 7;
PDU_NL_IDENTIFIER_MALAYALAM  = 8;
PDU_NL_IDENTIFIER_ORIYA      = 9;
PDU_NL_IDENTIFIER_PUNJABI    = 10;
PDU_NL_IDENTIFIER_TAMIL      = 11;
PDU_NL_IDENTIFIER_TELUGU     = 12;
PDU_NL_IDENTIFIER_URDU       = 13;

// 7bit alphabet escape character. The encoded value of this code point is left
// undefined in official spec. Its code value is internally assigned to \uffff,
// <noncharacter-FFFF> in Unicode basic multilingual plane.
PDU_NL_EXTENDED_ESCAPE = 0x1B;

// Application Port Addressing, see 3GPP TS 23.040 9.2.3.24.3
this.PDU_APA_RESERVED_8BIT_PORTS = 240;
this.PDU_APA_VALID_16BIT_PORTS   = 49152;

// National Language Locking Shift Tables, see 3GPP TS 23.038
PDU_NL_LOCKING_SHIFT_TABLES = [
  /**
   * National Language Identifier: 0x00
   * 6.2.1 GSM 7 bit Default Alphabet
   */
  // 01.....23.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.E.....F.....
    "@\u00a3$\u00a5\u00e8\u00e9\u00f9\u00ec\u00f2\u00c7\n\u00d8\u00f8\r\u00c5\u00e5"
  // 0.....12.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0394_\u03a6\u0393\u039b\u03a9\u03a0\u03a8\u03a3\u0398\u039e\uffff\u00c6\u00e6\u00df\u00c9"
  // 012.34.....56789ABCDEF
  + " !\"#\u00a4%&'()*+,-./"
  // 0123456789ABCDEF
  + "0123456789:;<=>?"
  // 0.....123456789ABCDEF
  + "\u00a1ABCDEFGHIJKLMNO"
  // 0123456789AB.....C.....D.....E.....F.....
  + "PQRSTUVWXYZ\u00c4\u00d6\u00d1\u00dc\u00a7"
  // 0.....123456789ABCDEF
  + "\u00bfabcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u00e4\u00f6\u00f1\u00fc\u00e0",

  /**
   * National Language Identifier: 0x01
   * A.3.1 Turkish National Language Locking Shift Table
   */
  // 01.....23.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.E.....F.....
    "@\u00a3$\u00a5\u20ac\u00e9\u00f9\u0131\u00f2\u00c7\n\u011e\u011f\r\u00c5\u00e5"
  // 0.....12.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0394_\u03a6\u0393\u039b\u03a9\u03a0\u03a8\u03a3\u0398\u039e\uffff\u015e\u015f\u00df\u00c9"
  // 012.34.....56789ABCDEF
  + " !\"#\u00a4%&'()*+,-./"
  // 0123456789ABCDEF
  + "0123456789:;<=>?"
  // 0.....123456789ABCDEF
  + "\u0130ABCDEFGHIJKLMNO"
  // 0123456789AB.....C.....D.....E.....F.....
  + "PQRSTUVWXYZ\u00c4\u00d6\u00d1\u00dc\u00a7"
  // 0.....123456789ABCDEF
  + "\u00e7abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u00e4\u00f6\u00f1\u00fc\u00e0",

  /**
   * National Language Identifier: 0x02
   * A.3.2 Void
   */
  // 0123456789A.BCD.EF
    "          \n  \r  "
  // 0123456789AB.....CDEF
  + "           \uffff    "
  // 0123456789ABCDEF
  + "                "
  // 0123456789ABCDEF
  + "                "
  // 0123456789ABCDEF
  + "                "
  // 0123456789ABCDEF
  + "                "
  // 0123456789ABCDEF
  + "                "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x03
   * A.3.3 Portuguese National Language Locking Shift Table
   */
  // 01.....23.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.E.....F.....
    "@\u00a3$\u00a5\u00ea\u00e9\u00fa\u00ed\u00f3\u00e7\n\u00d4\u00f4\r\u00c1\u00e1"
  // 0.....12.....3.....4.....5.....67.8.....9.....AB.....C.....D.....E.....F.....
  + "\u0394_\u00aa\u00c7\u00c0\u221e^\\\u20ac\u00d3|\uffff\u00c2\u00e2\u00ca\u00c9"
  // 012.34.....56789ABCDEF
  + " !\"#\u00ba%&'()*+,-./"
  // 0123456789ABCDEF
  + "0123456789:;<=>?"
  // 0.....123456789ABCDEF
  + "\u00cdABCDEFGHIJKLMNO"
  // 0123456789AB.....C.....D.....E.....F.....
  + "PQRSTUVWXYZ\u00c3\u00d5\u00da\u00dc\u00a7"
  // 0123456789ABCDEF
  + "~abcdefghijklmno"
  // 0123456789AB.....C.....DE.....F.....
  + "pqrstuvwxyz\u00e3\u00f5`\u00fc\u00e0",

  /**
   * National Language Identifier: 0x04
   * A.3.4 Bengali National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....CD.EF.....
    "\u0981\u0982\u0983\u0985\u0986\u0987\u0988\u0989\u098a\u098b\n\u098c \r \u098f"
  // 0.....123.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0990  \u0993\u0994\u0995\u0996\u0997\u0998\u0999\u099a\uffff\u099b\u099c\u099d\u099e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u099f\u09a0\u09a1\u09a2\u09a3\u09a4)(\u09a5\u09a6,\u09a7.\u09a8"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u09aa\u09ab?"
  // 0.....1.....2.....3.....4.....56.....789A.....B.....C.....D.....E.....F.....
  + "\u09ac\u09ad\u09ae\u09af\u09b0 \u09b2   \u09b6\u09b7\u09b8\u09b9\u09bc\u09bd"
  // 0.....1.....2.....3.....4.....5.....6.....789.....A.....BCD.....E.....F.....
  + "\u09be\u09bf\u09c0\u09c1\u09c2\u09c3\u09c4  \u09c7\u09c8  \u09cb\u09cc\u09cd"
  // 0.....123456789ABCDEF
  + "\u09ceabcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u09d7\u09dc\u09dd\u09f0\u09f1",

  /**
   * National Language Identifier: 0x05
   * A.3.5 Gujarati National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.EF.....
    "\u0a81\u0a82\u0a83\u0a85\u0a86\u0a87\u0a88\u0a89\u0a8a\u0a8b\n\u0a8c\u0a8d\r \u0a8f"
  // 0.....1.....23.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0a90\u0a91 \u0a93\u0a94\u0a95\u0a96\u0a97\u0a98\u0a99\u0a9a\uffff\u0a9b\u0a9c\u0a9d\u0a9e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0a9f\u0aa0\u0aa1\u0aa2\u0aa3\u0aa4)(\u0aa5\u0aa6,\u0aa7.\u0aa8"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0aaa\u0aab?"
  // 0.....1.....2.....3.....4.....56.....7.....89.....A.....B.....C.....D.....E.....F.....
  + "\u0aac\u0aad\u0aae\u0aaf\u0ab0 \u0ab2\u0ab3 \u0ab5\u0ab6\u0ab7\u0ab8\u0ab9\u0abc\u0abd"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89.....A.....B.....CD.....E.....F.....
  + "\u0abe\u0abf\u0ac0\u0ac1\u0ac2\u0ac3\u0ac4\u0ac5 \u0ac7\u0ac8\u0ac9 \u0acb\u0acc\u0acd"
  // 0.....123456789ABCDEF
  + "\u0ad0abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0ae0\u0ae1\u0ae2\u0ae3\u0af1",

  /**
   * National Language Identifier: 0x06
   * A.3.6 Hindi National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.E.....F.....
    "\u0901\u0902\u0903\u0905\u0906\u0907\u0908\u0909\u090a\u090b\n\u090c\u090d\r\u090e\u090f"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0910\u0911\u0912\u0913\u0914\u0915\u0916\u0917\u0918\u0919\u091a\uffff\u091b\u091c\u091d\u091e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u091f\u0920\u0921\u0922\u0923\u0924)(\u0925\u0926,\u0927.\u0928"
  // 0123456789ABC.....D.....E.....F
  + "0123456789:;\u0929\u092a\u092b?"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u092c\u092d\u092e\u092f\u0930\u0931\u0932\u0933\u0934\u0935\u0936\u0937\u0938\u0939\u093c\u093d"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u093e\u093f\u0940\u0941\u0942\u0943\u0944\u0945\u0946\u0947\u0948\u0949\u094a\u094b\u094c\u094d"
  // 0.....123456789ABCDEF
  + "\u0950abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0972\u097b\u097c\u097e\u097f",

  /**
   * National Language Identifier: 0x07
   * A.3.7 Kannada National Language Locking Shift Table
   */
  // 01.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....CD.E.....F.....
    " \u0c82\u0c83\u0c85\u0c86\u0c87\u0c88\u0c89\u0c8a\u0c8b\n\u0c8c \r\u0c8e\u0c8f"
  // 0.....12.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0c90 \u0c92\u0c93\u0c94\u0c95\u0c96\u0c97\u0c98\u0c99\u0c9a\uffff\u0c9b\u0c9c\u0c9d\u0c9e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0c9f\u0ca0\u0ca1\u0ca2\u0ca3\u0ca4)(\u0ca5\u0ca6,\u0ca7.\u0ca8"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0caa\u0cab?"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89.....A.....B.....C.....D.....E.....F.....
  + "\u0cac\u0cad\u0cae\u0caf\u0cb0\u0cb1\u0cb2\u0cb3 \u0cb5\u0cb6\u0cb7\u0cb8\u0cb9\u0cbc\u0cbd"
  // 0.....1.....2.....3.....4.....5.....6.....78.....9.....A.....BC.....D.....E.....F.....
  + "\u0cbe\u0cbf\u0cc0\u0cc1\u0cc2\u0cc3\u0cc4 \u0cc6\u0cc7\u0cc8 \u0cca\u0ccb\u0ccc\u0ccd"
  // 0.....123456789ABCDEF
  + "\u0cd5abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0cd6\u0ce0\u0ce1\u0ce2\u0ce3",

  /**
   * National Language Identifier: 0x08
   * A.3.8 Malayalam National Language Locking Shift Table
   */
  // 01.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....CD.E.....F.....
    " \u0d02\u0d03\u0d05\u0d06\u0d07\u0d08\u0d09\u0d0a\u0d0b\n\u0d0c \r\u0d0e\u0d0f"
  // 0.....12.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0d10 \u0d12\u0d13\u0d14\u0d15\u0d16\u0d17\u0d18\u0d19\u0d1a\uffff\u0d1b\u0d1c\u0d1d\u0d1e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0d1f\u0d20\u0d21\u0d22\u0d23\u0d24)(\u0d25\u0d26,\u0d27.\u0d28"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0d2a\u0d2b?"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....EF.....
  + "\u0d2c\u0d2d\u0d2e\u0d2f\u0d30\u0d31\u0d32\u0d33\u0d34\u0d35\u0d36\u0d37\u0d38\u0d39 \u0d3d"
  // 0.....1.....2.....3.....4.....5.....6.....78.....9.....A.....BC.....D.....E.....F.....
  + "\u0d3e\u0d3f\u0d40\u0d41\u0d42\u0d43\u0d44 \u0d46\u0d47\u0d48 \u0d4a\u0d4b\u0d4c\u0d4d"
  // 0.....123456789ABCDEF
  + "\u0d57abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0d60\u0d61\u0d62\u0d63\u0d79",

  /**
   * National Language Identifier: 0x09
   * A.3.9 Oriya National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....CD.EF.....
    "\u0b01\u0b02\u0b03\u0b05\u0b06\u0b07\u0b08\u0b09\u0b0a\u0b0b\n\u0b0c \r \u0b0f"
  // 0.....123.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0b10  \u0b13\u0b14\u0b15\u0b16\u0b17\u0b18\u0b19\u0b1a\uffff\u0b1b\u0b1c\u0b1d\u0b1e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0b1f\u0b20\u0b21\u0b22\u0b23\u0b24)(\u0b25\u0b26,\u0b27.\u0b28"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0b2a\u0b2b?"
  // 0.....1.....2.....3.....4.....56.....7.....89.....A.....B.....C.....D.....E.....F.....
  + "\u0b2c\u0b2d\u0b2e\u0b2f\u0b30 \u0b32\u0b33 \u0b35\u0b36\u0b37\u0b38\u0b39\u0b3c\u0b3d"
  // 0.....1.....2.....3.....4.....5.....6.....789.....A.....BCD.....E.....F.....
  + "\u0b3e\u0b3f\u0b40\u0b41\u0b42\u0b43\u0b44  \u0b47\u0b48  \u0b4b\u0b4c\u0b4d"
  // 0.....123456789ABCDEF
  + "\u0b56abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0b57\u0b60\u0b61\u0b62\u0b63",

  /**
   * National Language Identifier: 0x0A
   * A.3.10 Punjabi National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9A.BCD.EF.....
    "\u0a01\u0a02\u0a03\u0a05\u0a06\u0a07\u0a08\u0a09\u0a0a \n  \r \u0a0f"
  // 0.....123.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0a10  \u0a13\u0a14\u0a15\u0a16\u0a17\u0a18\u0a19\u0a1a\uffff\u0a1b\u0a1c\u0a1d\u0a1e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0a1f\u0a20\u0a21\u0a22\u0a23\u0a24)(\u0a25\u0a26,\u0a27.\u0a28"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0a2a\u0a2b?"
  // 0.....1.....2.....3.....4.....56.....7.....89.....A.....BC.....D.....E.....F
  + "\u0a2c\u0a2d\u0a2e\u0a2f\u0a30 \u0a32\u0a33 \u0a35\u0a36 \u0a38\u0a39\u0a3c "
  // 0.....1.....2.....3.....4.....56789.....A.....BCD.....E.....F.....
  + "\u0a3e\u0a3f\u0a40\u0a41\u0a42    \u0a47\u0a48  \u0a4b\u0a4c\u0a4d"
  // 0.....123456789ABCDEF
  + "\u0a51abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0a70\u0a71\u0a72\u0a73\u0a74",

  /**
   * National Language Identifier: 0x0B
   * A.3.11 Tamil National Language Locking Shift Table
   */
  // 01.....2.....3.....4.....5.....6.....7.....8.....9A.BCD.E.....F.....
    " \u0b82\u0b83\u0b85\u0b86\u0b87\u0b88\u0b89\u0b8a \n  \r\u0b8e\u0b8f"
  // 0.....12.....3.....4.....5.....6789.....A.....B.....CD.....EF.....
  + "\u0b90 \u0b92\u0b93\u0b94\u0b95   \u0b99\u0b9a\uffff \u0b9c \u0b9e"
  // 012.....3456.....7.....89ABCDEF.....
  + " !\u0b9f   \u0ba3\u0ba4)(  , .\u0ba8"
  // 0123456789ABC.....D.....EF
  + "0123456789:;\u0ba9\u0baa ?"
  // 012.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....EF
  + "  \u0bae\u0baf\u0bb0\u0bb1\u0bb2\u0bb3\u0bb4\u0bb5\u0bb6\u0bb7\u0bb8\u0bb9  "
  // 0.....1.....2.....3.....4.....5678.....9.....A.....BC.....D.....E.....F.....
  + "\u0bbe\u0bbf\u0bc0\u0bc1\u0bc2   \u0bc6\u0bc7\u0bc8 \u0bca\u0bcb\u0bcc\u0bcd"
  // 0.....123456789ABCDEF
  + "\u0bd0abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0bd7\u0bf0\u0bf1\u0bf2\u0bf9",

  /**
   * National Language Identifier: 0x0C
   * A.3.12 Telugu National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....CD.E.....F.....
    "\u0c01\u0c02\u0c03\u0c05\u0c06\u0c07\u0c08\u0c09\u0c0a\u0c0b\n\u0c0c \r\u0c0e\u0c0f"
  // 0.....12.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0c10 \u0c12\u0c13\u0c14\u0c15\u0c16\u0c17\u0c18\u0c19\u0c1a\uffff\u0c1b\u0c1c\u0c1d\u0c1e"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u0c1f\u0c20\u0c21\u0c22\u0c23\u0c24)(\u0c25\u0c26,\u0c27.\u0c28"
  // 0123456789ABCD.....E.....F
  + "0123456789:; \u0c2a\u0c2b?"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89.....A.....B.....C.....D.....EF.....
  + "\u0c2c\u0c2d\u0c2e\u0c2f\u0c30\u0c31\u0c32\u0c33 \u0c35\u0c36\u0c37\u0c38\u0c39 \u0c3d"
  // 0.....1.....2.....3.....4.....5.....6.....78.....9.....A.....BC.....D.....E.....F.....
  + "\u0c3e\u0c3f\u0c40\u0c41\u0c42\u0c43\u0c44 \u0c46\u0c47\u0c48 \u0c4a\u0c4b\u0c4c\u0c4d"
  // 0.....123456789ABCDEF
  + "\u0c55abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0c56\u0c60\u0c61\u0c62\u0c63",

  /**
   * National Language Identifier: 0x0D
   * A.3.13 Urdu National Language Locking Shift Table
   */
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.B.....C.....D.E.....F.....
    "\u0627\u0622\u0628\u067b\u0680\u067e\u06a6\u062a\u06c2\u067f\n\u0679\u067d\r\u067a\u067c"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u062b\u062c\u0681\u0684\u0683\u0685\u0686\u0687\u062d\u062e\u062f\uffff\u068c\u0688\u0689\u068a"
  // 012.....3.....4.....5.....6.....7.....89A.....B.....CD.....EF.....
  + " !\u068f\u068d\u0630\u0631\u0691\u0693)(\u0699\u0632,\u0696.\u0698"
  // 0123456789ABC.....D.....E.....F
  + "0123456789:;\u069a\u0633\u0634?"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u0635\u0636\u0637\u0638\u0639\u0641\u0642\u06a9\u06aa\u06ab\u06af\u06b3\u06b1\u0644\u0645\u0646"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....C.....D.....E.....F.....
  + "\u06ba\u06bb\u06bc\u0648\u06c4\u06d5\u06c1\u06be\u0621\u06cc\u06d0\u06d2\u064d\u0650\u064f\u0657"
  // 0.....123456789ABCDEF
  + "\u0654abcdefghijklmno"
  // 0123456789AB.....C.....D.....E.....F.....
  + "pqrstuvwxyz\u0655\u0651\u0653\u0656\u0670"
];

// National Language Single Shift Tables, see 3GPP TS 23.038
PDU_NL_SINGLE_SHIFT_TABLES = [
  /**
   * National Language Identifier: 0x00
   * 6.2.1.1 GSM 7 bit default alphabet extension table
   */
  // 0123456789A.....BCD.....EF
    "          \u000c  \ufffe  "
  // 0123456789AB.....CDEF
  + "    ^      \uffff    "
  // 0123456789ABCDEF.
  + "        {}     \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|               "
  // 0123456789ABCDEF
  + "                "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x01
   * A.2.1 Turkish National Language Single Shift Table
   */
  // 0123456789A.....BCD.....EF
    "          \u000c  \ufffe  "
  // 0123456789AB.....CDEF
  + "    ^      \uffff    "
  // 0123456789ABCDEF.
  + "        {}     \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 01234567.....89.....ABCDEF
  + "|      \u011e \u0130      "
  // 0123.....456789ABCDEF
  + "   \u015e            "
  // 0123.....45.....67.....89.....ABCDEF
  + "   \u00e7 \u20ac \u011f \u0131      "
  // 0123.....456789ABCDEF
  + "   \u015f            ",

  /**
   * National Language Identifier: 0x02
   * A.2.2 Spanish National Language Single Shift Table
   */
  // 0123456789.....A.....BCD.....EF
    "         \u00e7\u000c  \ufffe  "
  // 0123456789AB.....CDEF
  + "    ^      \uffff    "
  // 0123456789ABCDEF.
  + "        {}     \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 01.....23456789.....ABCDEF.....
  + "|\u00c1       \u00cd     \u00d3"
  // 012345.....6789ABCDEF
  + "     \u00da          "
  // 01.....2345.....6789.....ABCDEF.....
  + " \u00e1   \u20ac   \u00ed     \u00f3"
  // 012345.....6789ABCDEF
  + "     \u00fa          ",

  /**
   * National Language Identifier: 0x03
   * A.2.3 Portuguese National Language Single Shift Table
   */
  // 012345.....6789.....A.....B.....C.....D.....E.....F.....
    "     \u00ea   \u00e7\u000c\u00d4\u00f4\ufffe\u00c1\u00e1"
  // 012.....3.....45.....6.....7.....8.....9.....AB.....CDEF.....
  + "  \u03a6\u0393^\u03a9\u03a0\u03a8\u03a3\u0398 \uffff   \u00ca"
  // 0123456789ABCDEF.
  + "        {}     \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 01.....23456789.....ABCDEF.....
  + "|\u00c0       \u00cd     \u00d3"
  // 012345.....6789AB.....C.....DEF
  + "     \u00da     \u00c3\u00d5   "
  // 01.....2345.....6789.....ABCDEF.....
  + " \u00c2   \u20ac   \u00ed     \u00f3"
  // 012345.....6789AB.....C.....DEF.....
  + "     \u00fa     \u00e3\u00f5  \u00e2",

  /**
   * National Language Identifier: 0x04
   * A.2.4 Bengali National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u09e6\u09e7\uffff\u09e8\u09e9\u09ea\u09eb"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u09ec\u09ed\u09ee\u09ef\u09df\u09e0\u09e1\u09e2{}\u09e3\u09f2\u09f3\u09f4\u09f5\\"
  // 0.....1.....2.....3.....4.....56789ABCDEF
  + "\u09f6\u09f7\u09f8\u09f9\u09fa       [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x05
   * A.2.5 Gujarati National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0ae6\u0ae7\u0ae8\u0ae9"
  // 0.....1.....2.....3.....4.....5.....6789ABCDEF.
  + "\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef  {}     \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x06
   * A.2.6 Hindi National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0966\u0967\u0968\u0969"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u096a\u096b\u096c\u096d\u096e\u096f\u0951\u0952{}\u0953\u0954\u0958\u0959\u095a\\"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....BCDEF
  + "\u095b\u095c\u095d\u095e\u095f\u0960\u0961\u0962\u0963\u0970\u0971 [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x07
   * A.2.7 Kannada National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0ce6\u0ce7\u0ce8\u0ce9"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....BCDEF.
  + "\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0cde\u0cf1{}\u0cf2    \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x08
   * A.2.8 Malayalam National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0d66\u0d67\u0d68\u0d69"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u0d6a\u0d6b\u0d6c\u0d6d\u0d6e\u0d6f\u0d70\u0d71{}\u0d72\u0d73\u0d74\u0d75\u0d7a\\"
  // 0.....1.....2.....3.....4.....56789ABCDEF
  + "\u0d7b\u0d7c\u0d7d\u0d7e\u0d7f       [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x09
   * A.2.9 Oriya National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0b66\u0b67\u0b68\u0b69"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....DEF.
  + "\u0b6a\u0b6b\u0b6c\u0b6d\u0b6e\u0b6f\u0b5c\u0b5d{}\u0b5f\u0b70\u0b71  \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x0A
   * A.2.10 Punjabi National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0a66\u0a67\u0a68\u0a69"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....EF.
  + "\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a59\u0a5a{}\u0a5b\u0a5c\u0a5e\u0a75 \\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x0B
   * A.2.11 Tamil National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0964\u0965\uffff\u0be6\u0be7\u0be8\u0be9"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0bf3\u0bf4{}\u0bf5\u0bf6\u0bf7\u0bf8\u0bfa\\"
  // 0123456789ABCDEF
  + "            [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x0C
   * A.2.12 Telugu National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789AB.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*  \uffff\u0c66\u0c67\u0c68\u0c69"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u0c6a\u0c6b\u0c6c\u0c6d\u0c6e\u0c6f\u0c58\u0c59{}\u0c78\u0c79\u0c7a\u0c7b\u0c7c\\"
  // 0.....1.....2.....3456789ABCDEF
  + "\u0c7d\u0c7e\u0c7f         [~] "
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                ",

  /**
   * National Language Identifier: 0x0D
   * A.2.13 Urdu National Language Single Shift Table
   */
  // 01.....23.....4.....5.6.....789A.....BCD.....EF
    "@\u00a3$\u00a5\u00bf\"\u00a4%&'\u000c*+\ufffe-/"
  // 0123.....45.....6789.....A.....B.....C.....D.....E.....F.....
  + "<=>\u00a1^\u00a1_#*\u0600\u0601\uffff\u06f0\u06f1\u06f2\u06f3"
  // 0.....1.....2.....3.....4.....5.....6.....7.....89A.....B.....C.....D.....E.....F.
  + "\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9\u060c\u060d{}\u060e\u060f\u0610\u0611\u0612\\"
  // 0.....1.....2.....3.....4.....5.....6.....7.....8.....9.....A.....B.....CDEF.....
  + "\u0613\u0614\u061b\u061f\u0640\u0652\u0658\u066b\u066c\u0672\u0673\u06cd[~]\u06d4"
  // 0123456789ABCDEF
  + "|ABCDEFGHIJKLMNO"
  // 0123456789ABCDEF
  + "PQRSTUVWXYZ     "
  // 012345.....6789ABCDEF
  + "     \u20ac          "
  // 0123456789ABCDEF
  + "                "
];

dtmfChars = ".1234567890*#...";
