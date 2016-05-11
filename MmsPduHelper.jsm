

var DEBUG; // set to true to see debug messages

this.MMS_VERSION = (function() {
  return MMS_VERSION_1_3;
})();

this.translatePduErrorToStatus = function translatePduErrorToStatus(error) {
  if (error == MMS_PDU_ERROR_OK) {
    return MMS_PDU_STATUS_RETRIEVED;
  }

  if ((error >= MMS_PDU_ERROR_TRANSIENT_FAILURE)
      && (error < MMS_PDU_ERROR_PERMANENT_FAILURE)) {
    return MMS_PDU_STATUS_DEFERRED;
  }

  return MMS_PDU_STATUS_UNRECOGNISED;
}

function defineLazyRegExp(obj, name, pattern) {
  obj.__defineGetter__(name, function() {
    delete obj[name];
    return obj[name] = new RegExp(pattern);
  });
}

function RangedValue(name, min, max) {
  this.name = name;
  this.min = min;
  this.max = max;
}
RangedValue.prototype = {
  name: null,
  min: null,
  max: null,

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded integer.
   *
   * @throws CodeError if decoded value is not in the range [this.min, this.max].
   */
  decode: function(data) {
    var value = Octet.decode(data);
    if ((value >= this.min) && (value <= this.max)) {
      return value;
    }

    throw new CodeError(this.name + ": invalid value " + value);
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        An integer value within thr range [this.min, this.max].
   */
  encode: function(data, value) {
    if ((value < this.min) || (value > this.max)) {
      throw new CodeError(this.name + ": invalid value " + value);
    }

    Octet.encode(data, value);
  },
};

/**
 * Internal decoding function for boolean values.
 *
 * Boolean-value = Yes | No
 * Yes = <Octet 128>
 * No = <Octet 129>
 */
this.BooleanValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Boolean true or false.
   *
   * @throws CodeError if read octet equals to neither 128 nor 129.
   */
  decode: function(data) {
    var value = Octet.decode(data);
    if ((value != 128) && (value != 129)) {
      throw new CodeError("Boolean-value: invalid value " + value);
    }

    return value == 128;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        A boolean value to be encoded.
   */
  encode: function(data, value) {
    Octet.encode(data, value ? 128 : 129);
  },
};

/**
 * MMS Address
 *
 * address = email | device-address | alphanum-shortcode | num-shortcode
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A section 8
 */
this.Address = {
  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   *
   * @return An object of two string-typed attributes: address and type.
   */
  decode: function(data) {
    var str = EncodedStringValue.decode(data);

    var result;
    if (((result = str.match(this.REGEXP_DECODE_PLMN)) != null)
        || ((result = str.match(this.REGEXP_DECODE_IPV4)) != null)
        || ((result = str.match(this.REGEXP_DECODE_IPV6)) != null)
        || (((result = str.match(this.REGEXP_DECODE_CUSTOM)) != null)
            && (result[2] != "PLMN")
            && (result[2] != "IPv4")
            && (result[2] != "IPv6"))) {
      return {address: result[1], type: result[2]};
    }

    var type;
    if (str.match(this.REGEXP_NUM)) {
      type = "num";
    } else if (str.match(this.REGEXP_ALPHANUM)) {
      type = "alphanum";
    } else if (str.match(this.REGEXP_EMAIL)) {
      type = "email";
    } else {
      throw new CodeError("Address: invalid address");
    }

    return {address: str, type: type};
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        An object of two string-typed attributes: address and type.
   */
  encode: function(data, value) {
    if (!value || !value.type || !value.address) {
      throw new CodeError("Address: invalid value");
    }

    var str;
    switch (value.type) {
      case "email":
        if (value.address.match(this.REGEXP_EMAIL)) {
          str = value.address;
        }
        break;
      case "num":
        if (value.address.match(this.REGEXP_NUM)) {
          str = value.address;
        }
        break;
      case "alphanum":
        if (value.address.match(this.REGEXP_ALPHANUM)) {
          str = value.address;
        }
        break;
      case "IPv4":
        if (value.address.match(this.REGEXP_ENCODE_IPV4)) {
          str = value.address + "/TYPE=IPv4";
        }
        break;
      case "IPv6":
        if (value.address.match(this.REGEXP_ENCODE_IPV6)) {
          str = value.address + "/TYPE=IPv6";
        }
        break;
      case "PLMN":
        if (value.address.match(this.REGEXP_ENCODE_PLMN)) {
          str = value.address + "/TYPE=PLMN";
        }
        break;
      default:
        if (value.type.match(this.REGEXP_ENCODE_CUSTOM_TYPE)
            && value.address.match(this.REGEXP_ENCODE_CUSTOM_ADDR)) {
          str = value.address + "/TYPE=" + value.type;
        }
        break;
    }

    if (!str) {
      throw new CodeError("Address: invalid value: " + JSON.stringify(value));
    }

    EncodedStringValue.encode(data, str);
  },

  /**
   * @param address
   *        Address string which want to find the type.
   *
   * @return Address type.
   */
  resolveType: function(address) {
    if (address.match(this.REGEXP_EMAIL)) {
      return "email";
    }

    if (address.match(this.REGEXP_ENCODE_IPV4)) {
      return "IPv4";
    }

    if (address.match(this.REGEXP_ENCODE_IPV6)) {
      return "IPv6";
    }

    var normalizedAddress = PhoneNumberUtils.normalize(address, false);
    if (PhoneNumberUtils.isPlainPhoneNumber(normalizedAddress)) {
      return "PLMN";
    }

    return "Others";
  },
};

defineLazyRegExp(Address, "REGEXP_DECODE_PLMN",        "^(\\+?[\\d.-]+)\\/TYPE=(PLMN)$");
defineLazyRegExp(Address, "REGEXP_DECODE_IPV4",        "^((?:(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9])\\.){3,3}(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9]))\\/TYPE=(IPv4)$");
defineLazyRegExp(Address, "REGEXP_DECODE_IPV6",        "^(" +
                                                       "(?:[0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,7}:|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|" +
                                                       "[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|" +
                                                       ":(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9])\\.){3,3}(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9])" +
                                                       ")\\/TYPE=(IPv6)$");
defineLazyRegExp(Address, "REGEXP_DECODE_CUSTOM",      "^([\\w\\+\\-.%]+)\\/TYPE=(\\w+)$");
defineLazyRegExp(Address, "REGEXP_ENCODE_PLMN",        "^\\+?[\\d.-]+$");
defineLazyRegExp(Address, "REGEXP_ENCODE_IPV4",        "^(?:(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9])\\.){3,3}(?:25[0-5]|(?:2[0-4]|1[0-9]|[1-9]){0,1}[0-9])$");
defineLazyRegExp(Address, "REGEXP_ENCODE_IPV6",        "^(?:" +
                                                       "(?:[0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,7}:|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|" +
                                                       "(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|" +
                                                       "[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|" +
                                                       ":(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)" +
                                                       ")$");
defineLazyRegExp(Address, "REGEXP_ENCODE_CUSTOM_TYPE", "^\\w+$");
defineLazyRegExp(Address, "REGEXP_ENCODE_CUSTOM_ADDR", "^[\\w\\+\\-.%]+$");
defineLazyRegExp(Address, "REGEXP_NUM",                "^[\\+*#]?\\d+$");
defineLazyRegExp(Address, "REGEXP_ALPHANUM",           "^\\w+$");
// OMA-TS-MMS_ENC-V1_3-20110913-A chapter 8:
//
//   E-mail should match the definition of `mailbox` as described in section
//   3.4 of RFC2822, but excluding the obsolete definitions as indicated by
//   the "obs-" prefix.
//
// Here we try to match addr-spec only.
defineLazyRegExp(Address, "REGEXP_EMAIL",              "(?:" +
                                                       "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|" +
                                                       "\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\"" +
                                                       ")@(?:" +
                                                       "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|" +
                                                       "\\[(?:" +
                                                       "[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f]" +
                                                       ")*\\]" +
                                                       ")");

/**
 * Header-field = MMS-header | Application-header
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.2
 */
this.HeaderField = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param options
   *        Extra context for decoding.
   *
   * @return A decoded object containing `name` and `value` properties or null
   *         in case of a failed parsing. The `name` property must be a string,
   *         but the `value` property can be many different types depending on
   *         `name`.
   */
  decode: function(data, options) {
    return decodeAlternatives(data, options,
                                  MmsHeader, ApplicationHeader);
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param octet
   *        Octet value to be encoded.
   * @param options
   *        Extra context for encoding.
   */
  encode: function(data, value, options) {
    encodeAlternatives(data, value, options,
                           MmsHeader, ApplicationHeader);
  },
};

/**
 * MMS-header = MMS-field-name MMS-value
 * MMS-field-name = Short-integer
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.2
 */
this.MmsHeader = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param options
   *        Extra context for decoding.
   *
   * @return A decoded object containing `name` and `value` properties or null
   *         in case of a failed parsing. The `name` property must be a string,
   *         but the `value` property can be many different types depending on
   *         `name`.
   *
   * @throws NotWellKnownEncodingError if decoded well-known header field
   *         number is not registered or supported.
   */
  decode: function(data, options) {
    var index = ShortInteger.decode(data);

    var entry = MMS_HEADER_FIELDS[index];
    if (!entry) {
      throw new NotWellKnownEncodingError(
        "MMS-header: not well known header " + index);
    }

    var cur = data.offset, value;
    try {
      value = entry.coder.decode(data, options);
    } catch (e) {
      data.offset = cur;

      value = skipValue(data);
      debug("Skip malformed well known header: "
            + JSON.stringify({name: entry.name, value: value}));

      return null;
    }

    return {
      name: entry.name,
      value: value,
    };
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param header
   *        An object containing two attributes: a string-typed `name` and a
   *        `value` of arbitrary type.
   *
   * @throws CodeError if got an empty header name.
   * @throws NotWellKnownEncodingError if the well-known header field number is
   *         not registered or supported.
   */
  encode: function(data, header) {
    if (!header.name) {
      throw new CodeError("MMS-header: empty header name");
    }

    var entry = MMS_HEADER_FIELDS[header.name.toLowerCase()];
    if (!entry) {
      throw new NotWellKnownEncodingError(
        "MMS-header: not well known header " + header.name);
    }

    ShortInteger.encode(data, entry.number);
    entry.coder.encode(data, header.value);
  },
};

/**
 * Cancel-status-value = Cancel Request Successfully received |
 *                       Cancel Request corrupted
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.7
 */
this.CancelStatusValue = new RangedValue("Cancel-status-value", 128, 129);

/**
 * Content-class-value = text | image-basic| image-rich | video-basic |
 *                       video-rich | megapixel | content-basic | content-rich
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.9
 */
this.ContentClassValue = new RangedValue("Content-class-value", 128, 135);

/**
 * When used in a PDU other than M-Mbox-Delete.conf and M-Delete.conf:
 *
 *   Content-location-value = Uri-value
 *
 * When used in the M-Mbox-Delete.conf and M-Delete.conf PDU:
 *
 *   Content-location-Del-value = Value-length Status-count-value Content-location-value
 *   Status-count-value = Integer-value
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.10
 */
this.ContentLocationValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param options
   *        Extra context for decoding.
   *
   * @return A decoded object containing `uri` and conditional `statusCount`
   *         properties.
   */
  decode: function(data, options) {
    var type = ensureHeader(options, "x-mms-message-type");

    var result = {};
    if ((type == MMS_PDU_TYPE_MBOX_DELETE_CONF)
        || (type == MMS_PDU_TYPE_DELETE_CONF)) {
      var length = ValueLength.decode(data);
      var end = data.offset + length;

      result.statusCount = IntegerValue.decode(data);
      result.uri = UriValue.decode(data);

      if (data.offset != end) {
        data.offset = end;
      }
    } else {
      result.uri = UriValue.decode(data);
    }

    return result;
  },
};

/**
 * Element-Descriptor-value = Value-length Content-Reference-value *(Parameter)
 * Content-Reference-value = Text-string
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.18
 */
this.ElementDescriptorValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded object containing a string property `contentReference`
   *         and an optinal `params` name-value map.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var result = {};
    result.contentReference = TextString.decode(data);
    if (data.offset < end) {
      result.params = Parameter.decodeMultiple(data, end);
    }

    if (data.offset != end) {
      // Explicitly seek to end in case of skipped parameters.
      data.offset = end;
    }

    return result;
  },
};

/**
 * OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.18:
 * `For well-known parameter names binary tokens MUST be used as defined in
 * Table 27.` So we can't reuse that of WSP.
 *
 *   Parameter = Parameter-name Parameter-value
 *   Parameter-name = Short-integer | Text-string
 *   Parameter-value = Constrained-encoding | Text-string
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.18
 */
this.Parameter = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded string.
   *
   * @throws NotWellKnownEncodingError if decoded well-known parameter number
   *         is not registered or supported.
   */
  decodeParameterName: function(data) {
    var begin = data.offset;
    var number;
    try {
      number = ShortInteger.decode(data);
    } catch (e) {
      data.offset = begin;
      return TextString.decode(data).toLowerCase();
    }

    var entry = MMS_WELL_KNOWN_PARAMS[number];
    if (!entry) {
      throw new NotWellKnownEncodingError(
        "Parameter-name: not well known parameter " + number);
    }

    return entry.name;
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded object containing `name` and `value` properties or null
   *         in case of a failed parsing. The `name` property must be a string,
   *         but the `value` property can be many different types depending on
   *         `name`.
   */
  decode: function(data) {
    var name = this.decodeParameterName(data);
    var value = decodeAlternatives(data, null,
                                       ConstrainedEncoding, TextString);
    return {
      name: name,
      value: value,
    };
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param end
   *        Ending offset of following parameters.
   *
   * @return An array of decoded objects.
   */
  decodeMultiple: function(data, end) {
    var params, param;

    while (data.offset < end) {
      try {
        param = this.decode(data);
      } catch (e) {
        break;
      }
      if (param) {
        if (!params) {
          params = {};
        }
        params[param.name] = param.value;
      }
    }

    return params;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param param
   *        An object containing two attributes: `name` and `value`.
   * @param options
   *        Extra context for encoding.
   */
  encode: function(data, param, options) {
    if (!param || !param.name) {
      throw new CodeError("Parameter-name: empty param name");
    }

    var entry = MMS_WELL_KNOWN_PARAMS[param.name.toLowerCase()];
    if (entry) {
      ShortInteger.encode(data, entry.number);
    } else {
      TextString.encode(data, param.name);
    }

    encodeAlternatives(data, param.value, options,
                           ConstrainedEncoding, TextString);
  },
};

/**
 * The Char-set values are registered by IANA as MIBEnum value and SHALL be
 * encoded as Integer-value.
 *
 *   Encoded-string-value = Text-string | Value-length Char-set Text-string
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.19
 * @see OMA-TS-MMS_CONF-V1_3-20110913-A clause 10.2.1
 */
this.EncodedStringValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Decoded string.
   *
   * @throws CodeError if the raw octets cannot be converted.
   * @throws NotWellKnownEncodingError if decoded well-known charset number is
   *         not registered or supported.
   */
  decodeCharsetEncodedString: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var charset = IntegerValue.decode(data);
    var entry = WSP_WELL_KNOWN_CHARSETS[charset];
    if (!entry) {
      throw new NotWellKnownEncodingError(
        "Charset-encoded-string: not well known charset " + charset);
    }

    var str;
    if (entry.converter) {
      // Read a possible string quote(<Octet 127>).
      var begin = data.offset;
      if (Octet.decode(data) != 127) {
        data.offset = begin;
      }

      var raw = Octet.decodeMultiple(data, end - 1);
      // Read NUL character.
      Octet.decodeEqualTo(data, 0);

      if (!raw) {
        str = "";
      } else {
        var conv = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
                   .createInstance(Ci.nsIScriptableUnicodeConverter);
        conv.charset = entry.converter;
        try {
          str = conv.convertFromByteArray(raw, raw.length);
        } catch (e) {
          throw new CodeError("Charset-encoded-string: " + e.message);
        }
      }
    } else {
      str = TextString.decode(data);
    }

    if (data.offset != end) {
      data.offset = end;
    }

    return str;
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Decoded string.
   */
  decode: function(data) {
    var begin = data.offset;
    try {
      return TextString.decode(data);
    } catch (e) {
      data.offset = begin;
      return this.decodeCharsetEncodedString(data);
    }
  },

  /**
   * Always encode target string with UTF-8 encoding.
   *
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param str
   *        A string.
   */
  encodeCharsetEncodedString: function(data, str) {
    var conv = Cc["@mozilla.org/intl/scriptableunicodeconverter"]
               .createInstance(Ci.nsIScriptableUnicodeConverter);
    // `When the text string cannot be represented as us-ascii, the character
    // set SHALL be encoded as utf-8(IANA MIBenum 106) which has unique byte
    // ordering.` ~ OMA-TS-MMS_CONF-V1_3-20110913-A clause 10.2.1
    conv.charset = "UTF-8";

    var raw;
    try {
      raw = conv.convertToByteArray(str);
    } catch (e) {
      throw new CodeError("Charset-encoded-string: " + e.message);
    }

    var length = raw.length + 2; // Charset number and NUL character
    // Prepend <Octet 127> if necessary.
    if (raw[0] >= 128) {
      ++length;
    }

    ValueLength.encode(data, length);

    var entry = WSP_WELL_KNOWN_CHARSETS["utf-8"];
    IntegerValue.encode(data, entry.number);

    if (raw[0] >= 128) {
      Octet.encode(data, 127);
    }
    Octet.encodeMultiple(data, raw);
    Octet.encode(data, 0);
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param str
   *        A string.
   */
  encode: function(data, str) {
    var begin = data.offset;
    try {
      // Quoted from OMA-TS-MMS-CONF-V1_3-20110913-A:
      // Some of the MMS headers have been defined as "Encoded-string-value".
      // The character set IANA MIBEnum value in these headers SHALL be
      // encoded as Integer-value ([WAPWSP] section 8.4.2.3). The character
      // set us-ascii (IANA MIBenum 3) SHALL always be accepted. If the
      // character set is not specified (simple Text-string encoding) the
      // character set SHALL be identified as us-ascii (lower half of ISO
      // 8859-1 [ISO8859-1]). When the text string cannot be represented as
      // us-ascii, the character set SHALL be encoded as utf-8 (IANA MIBenum
      // 106) which has unique byte ordering.
      TextString.encode(data, str, true);
    } catch (e) {
      data.offset = begin;
      this.encodeCharsetEncodedString(data, str);
    }
  },
};

/**
 * Expiry-value = Value-length (Absolute-token Date-value | Relative-token Delta-seconds-value)
 * Absolute-token = <Octet 128>
 * Relative-token = <Octet 129>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.20
 */
this.ExpiryValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A Date object for absolute expiry or an integer for relative one.
   *
   * @throws CodeError if decoded token equals to neither 128 nor 129.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var token = Octet.decode(data);
    if ((token != 128) && (token != 129)) {
      throw new CodeError("Expiry-value: invalid token " + token);
    }

    var result;
    if (token == 128) {
      result = DateValue.decode(data);
    } else {
      result = DeltaSecondsValue.decode(data);
    }

    if (data.offset != end) {
      data.offset = end;
    }

    return result;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        A Date object for absolute expiry or an integer for relative one.
   */
  encode: function(data, value) {
    var isDate, begin = data.offset;
    if (value instanceof Date) {
      isDate = true;
      DateValue.encode(data, value);
    } else if (typeof value == "number") {
      isDate = false;
      DeltaSecondsValue.encode(data, value);
    } else {
      throw new CodeError("Expiry-value: invalid value type");
    }

    // Calculate how much octets will be written and seek back.
    // TODO: use memmove, see bug 730873
    var len = data.offset - begin;
    data.offset = begin;

    ValueLength.encode(data, len + 1);
    if (isDate) {
      Octet.encode(data, 128);
      DateValue.encode(data, value);
    } else {
      Octet.encode(data, 129);
      DeltaSecondsValue.encode(data, value);
    }
  },
};

/**
 * From-value = Value-length (Address-present-token Address | Insert-address-token)
 * Address-present-token = <Octet 128>
 * Insert-address-token = <Octet 129>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.21
 */
this.FromValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded Address-value or null for MMS Proxy-Relay Insert-Address
   *         mode.
   *
   * @throws CodeError if decoded token equals to neither 128 nor 129.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var token = Octet.decode(data);
    if ((token != 128) && (token != 129)) {
      throw new CodeError("From-value: invalid token " + token);
    }

    var result = null;
    if (token == 128) {
      result = Address.decode(data);
    }

    if (data.offset != end) {
      data.offset = end;
    }

    return result;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        A Address-value or null for MMS Proxy-Relay Insert-Address mode.
   */
  encode: function(data, value) {
    if (!value) {
      ValueLength.encode(data, 1);
      Octet.encode(data, 129);
      return;
    }

    // Calculate how much octets will be written and seek back.
    // TODO: use memmove, see bug 730873
    var begin = data.offset;
    Address.encode(data, value);
    var len = data.offset - begin;
    data.offset = begin;

    ValueLength.encode(data, len + 1);
    Octet.encode(data, 128);
    Address.encode(data, value);
  },
};

/**
 * Previously-sent-by-value = Value-length Forwarded-count-value Address
 * Forwarded-count-value = Integer-value
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.23
 */
this.PreviouslySentByValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Decoded object containing an integer `forwardedCount` and an
   *         string-typed `originator` attributes.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var result = {};
    result.forwardedCount = IntegerValue.decode(data);
    result.originator = Address.decode(data);

    if (data.offset != end) {
      data.offset = end;
    }

    return result;
  },
};

/**
 * Previously-sent-date-value = Value-length Forwarded-count-value Date-value
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.23
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.24
 */
this.PreviouslySentDateValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Decoded object containing an integer `forwardedCount` and an
   *         Date-typed `timestamp` attributes.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var result = {};
    result.forwardedCount = IntegerValue.decode(data);
    result.timestamp = DateValue.decode(data);

    if (data.offset != end) {
      data.offset = end;
    }

    return result;
  },
};

/**
 * Message-class-value = Class-identifier | Token-text
 * Class-identifier = Personal | Advertisement | Informational | Auto
 * Personal = <Octet 128>
 * Advertisement = <Octet 129>
 * Informational = <Octet 130>
 * Auto = <Octet 131>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.27
 */
this.MessageClassValue = {
  WELL_KNOWN_CLASSES: ["personal", "advertisement", "informational", "auto"],

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded string.
   *
   * @throws CodeError if decoded value is not in the range 128..131.
   */
  decodeClassIdentifier: function(data) {
    var value = Octet.decode(data);
    if ((value >= 128) && (value < (128 + this.WELL_KNOWN_CLASSES.length))) {
      return this.WELL_KNOWN_CLASSES[value - 128];
    }

    throw new CodeError("Class-identifier: invalid id " + value);
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded string.
   */
  decode: function(data) {
    var begin = data.offset;
    try {
      return this.decodeClassIdentifier(data);
    } catch (e) {
      data.offset = begin;
      return TokenText.decode(data);
    }
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param klass
   */
  encode: function(data, klass) {
    var index = this.WELL_KNOWN_CLASSES.indexOf(klass.toLowerCase());
    if (index >= 0) {
      Octet.encode(data, index + 128);
    } else {
      TokenText.encode(data, klass);
    }
  },
};

 /**
 * Message-type-value = <Octet 128..151>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.30
 */
this.MessageTypeValue = new RangedValue("Message-type-value", 128, 151);

/**
 * MM-flags-value = Value-length ( Add-token | Remove-token | Filter-token ) Encoded-string-value
 * Add-token = <Octet 128>
 * Remove-token = <Octet 129>
 * Filter-token = <Octet 130>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.32
 */
this.MmFlagsValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return Decoded object containing an integer `type` and an string-typed
   *         `text` attributes.
   *
   * @throws CodeError if decoded value is not in the range 128..130.
   */
  decode: function(data) {
    var length = ValueLength.decode(data);
    var end = data.offset + length;

    var result = {};
    result.type = Octet.decode(data);
    if ((result.type < 128) || (result.type > 130)) {
      throw new CodeError("MM-flags-value: invalid type " + result.type);
    }
    result.text = EncodedStringValue.decode(data);

    if (data.offset != end) {
      data.offset = end;
    }

    return result;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param value
   *        An object containing an integer `type` and an string-typed
   *        `text` attributes.
   */
  encode: function(data, value) {
    if ((value.type < 128) || (value.type > 130)) {
      throw new CodeError("MM-flags-value: invalid type " + value.type);
    }

    // Calculate how much octets will be written and seek back.
    // TODO: use memmove, see bug 730873
    var begin = data.offset;
    EncodedStringValue.encode(data, value.text);
    var len = data.offset - begin;
    data.offset = begin;

    ValueLength.encode(data, len + 1);
    Octet.encode(data, value.type);
    EncodedStringValue.encode(data, value.text);
  },
};

/**
 * MM-state-value = Draft | Sent | New | Retrieved | Forwarded
 * Draft = <Octet 128>
 * Sent = <Octet 129>
 * New = <Octet 130>
 * Retrieved = <Octet 131>
 * Forwarded = <Octet 132>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.33
 */
this.MmStateValue = new RangedValue("MM-state-value", 128, 132);

/**
 * Priority-value = Low | Normal | High
 * Low = <Octet 128>
 * Normal = <Octet 129>
 * High = <Octet 130>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.35
 */
this.PriorityValue = new RangedValue("Priority-value", 128, 130);

/**
 * Read-status-value = Read | Deleted without being read
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.38
 */
this.ReadStatusValue = new RangedValue("Read-status-value", 128, 129);

/**
 * Recommended-Retrieval-Mode-value = Manual
 * Manual = <Octet 128>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.39
 */
this.RecommendedRetrievalModeValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded integer.
   */
  decode: function(data) {
    return Octet.decodeEqualTo(data, 128);
  },
};

/**
 * Reply-charging-value = Requested | Requested text only | Accepted |
 *                        Accepted text only
 * Requested = <Octet 128>
 * Requested text only = <Octet 129>
 * Accepted = <Octet 130>
 * Accepted text only = <Octet 131>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.43
 */
this.ReplyChargingValue = new RangedValue("Reply-charging-value", 128, 131);

/**
 * When used in a PDU other than M-Mbox-Delete.conf and M-Delete.conf:
 *
 *   Response-text-value = Encoded-string-value
 *
 * When used in the M-Mbox-Delete.conf and M-Delete.conf PDUs:
 *
 *   Response-text-Del-value = Value-length Status-count-value Response-text-value
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.49
 */
this.ResponseText = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param options
   *        Extra context for decoding.
   *
   * @return An object containing a string-typed `text` attribute and a
   *         integer-typed `statusCount` one.
   */
  decode: function(data, options) {
    var type = ensureHeader(options, "x-mms-message-type");

    var result = {};
    if ((type == MMS_PDU_TYPE_MBOX_DELETE_CONF)
        || (type == MMS_PDU_TYPE_DELETE_CONF)) {
      var length = ValueLength.decode(data);
      var end = data.offset + length;

      result.statusCount = IntegerValue.decode(data);
      result.text = EncodedStringValue.decode(data);

      if (data.offset != end) {
        data.offset = end;
      }
    } else {
      result.text = EncodedStringValue.decode(data);
    }

    return result;
  },
};

/**
 * Retrieve-status-value = Ok | Error-transient-failure |
 *                         Error-transient-message-not-found |
 *                         Error-transient-network-problem |
 *                         Error-permanent-failure |
 *                         Error-permanent-service-denied |
 *                         Error-permanent-message-not-found |
 *                         Error-permanent-content-unsupported
 * Ok = <Octet 128>
 * Error-transient-failure = <Octet 192>
 * Error-transient-message-not-found = <Octet 193>
 * Error-transient-network-problem = <Octet 194>
 * Error-permanent-failure = <Octet 224>
 * Error-permanent-service-denied = <Octet 225>
 * Error-permanent-message-not-found = <Octet 226>
 * Error-permanent-content-unsupported = <Octet 227>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.50
 */
this.RetrieveStatusValue = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   *
   * @return A decoded integer.
   */
  decode: function(data) {
    var value = Octet.decode(data);
    if (value == MMS_PDU_ERROR_OK) {
      return value;
    }

    if ((value >= MMS_PDU_ERROR_TRANSIENT_FAILURE) && (value < 256)) {
      return value;
    }

    // Any other values SHALL NOT be used. They are reserved for future use.
    // An MMS Client that receives such a reserved value MUST react the same
    // as it does to the value 224 (Error-permanent-failure).
    return MMS_PDU_ERROR_PERMANENT_FAILURE;
  },
};

/**
 * Sender-visibility-value = Hide | Show
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.52
 */
this.SenderVisibilityValue = new RangedValue("Sender-visibility-value", 128, 129);

/**
 * Status-value = Expired | Retrieved | Rejected | Deferred | Unrecognised |
 *                Indeterminate | Forwarded | Unreachable
 * Expired = <Octet 128>
 * Retrieved = <Octet 129>
 * Rejected = <Octet 130>
 * Deferred = <Octet 131>
 * Unrecognised = <Octet 132>
 * Indeterminate = <Octet 133>
 * Forwarded = <Octet 134>
 * Unreachable = <Octet 135>
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.3.54
 */
this.StatusValue = new RangedValue("Status-value", 128, 135);

this.mmsPduHelper = {
  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param headers
   *        An optional object to store parsed header fields. Created
   *        automatically if undefined.
   *
   * @return A boolean value indicating whether it's followed by message body.
   */
  parseHeaders: function(data, headers) {
    if (!headers) {
      headers = {};
    }

    var header;
    while (data.offset < data.array.length) {
      // There is no `header length` information in MMS PDU. If we just got
      // something wrong in parsing header fields, we might not be able to
      // determine the correct header-content boundary.
      header = HeaderField.decode(data, headers);

      if (header) {
        var orig = headers[header.name];
        if (Array.isArray(orig)) {
          headers[header.name].push(header.value);
        } else if (orig) {
          headers[header.name] = [orig, header.value];
        } else {
          headers[header.name] = header.value;
        }
        if (header.name == "content-type") {
          // `... if the PDU contains a message body the Content Type MUST be
          // the last header field, followed by message body.` See
          // OMA-TS-MMS_ENC-V1_3-20110913-A section 7.
          break;
        }
      }
    }

    return headers;
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param msg
   *        A message object to store decoded multipart or octet array content.
   */
  parseContent: function(data, msg) {
    var contentType = msg.headers["content-type"].media;
    if ((contentType == "application/vnd.wap.multipart.related")
        || (contentType == "application/vnd.wap.multipart.mixed")) {
      msg.parts = mmsPduHelper.parseMultiPart(data);
      return;
    }

    if (data.offset >= data.array.length) {
      return;
    }

    msg.content = Octet.decodeMultiple(data, data.array.length);
    if (false) {
      for (var begin = 0; begin < msg.content.length; begin += 20) {
        debug("content: " + JSON.stringify(msg.content.subarray(begin, begin + 20)));
      }
    }
  },

  /**
   * Check existences of all mandatory fields of a MMS message. Also sets `type`
   * for convenient access.
   *
   * @param msg
   *        A MMS message object.
   *
   * @return The corresponding entry in MMS_PDU_TYPES;
   *
   * @throws FatalCodeError if the PDU type is not supported yet.
   */
  checkMandatoryFields: function(msg) {
    var type = ensureHeader(msg.headers, "x-mms-message-type");
    var entry = MMS_PDU_TYPES[type];
    if (!entry) {
      throw new FatalCodeError(
        "checkMandatoryFields: unsupported message type " + type);
    }

    entry.mandatoryFields.forEach(function(name) {
      ensureHeader(msg.headers, name);
    });

    // Setup convenient alias that referenced frequently.
    msg.type = type;

    return entry;
  },

  /**
   * @param data
   *        A wrapped object containing raw PDU data.
   * @param msg [optional]
   *        Optional target object for decoding.
   *
   * @return A MMS message object or null in case of errors found.
   */
  parse: function(data, msg) {
    if (!msg) {
      msg = {};
    }

    try {
      msg.headers = this.parseHeaders(data, msg.headers);

      // Validity checks
      var typeinfo = this.checkMandatoryFields(msg);
      if (typeinfo.hasContent) {
        this.parseContent(data, msg);
      }
    } catch (e) {
      debug("Failed to parse MMS message, error message: " + e.message);
      return null;
    }

    return msg;
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param headers
   *        A dictionary object containing multiple name/value mapping.
   * @param name
   *        Name of the header field to be encoded.
   */
  encodeHeader: function(data, headers, name) {
    var value = headers[name];
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        HeaderField.encode(data, {name: name, value: value[i]}, headers);
      }
    } else {
      HeaderField.encode(data, {name: name, value: value}, headers);
    }
  },

  /**
   * @param data
   *        A wrapped object to store encoded raw data.
   * @param headers
   *        A dictionary object containing multiple name/value mapping.
   */
  encodeHeaderIfExists: function(data, headers, name) {
    // Header value could be zero or null.
    if (headers[name] !== undefined) {
      this.encodeHeader(data, headers, name);
    }
  },

  /**
   * @param data [optional]
   *        A wrapped object to store encoded raw data. Created if undefined.
   * @param headers
   *        A dictionary object containing multiple name/value mapping.
   *
   * @return the passed data parameter or a created one.
   */
  encodeHeaders: function(data, headers) {
    if (!data) {
      data = {array: [], offset: 0};
    }

    // `In the encoding of the header fields, the order of the fields is not
    // significant, except that X-Mms-Message-Type, X-Mms-Transaction-ID (when
    // present) and X-Mms-MMS-Version MUST be at the beginning of the message
    // headers, in that order, and if the PDU contains a message body the
    // Content Type MUST be the last header field, followed by message body.`
    // ~ OMA-TS-MMS_ENC-V1_3-20110913-A section 7
    this.encodeHeader(data, headers, "x-mms-message-type");
    this.encodeHeaderIfExists(data, headers, "x-mms-transaction-id");
    this.encodeHeaderIfExists(data, headers, "x-mms-mms-version");

    for (var key in headers) {
      if ((key == "x-mms-message-type")
          || (key == "x-mms-transaction-id")
          || (key == "x-mms-mms-version")
          || (key == "content-type")) {
        continue;
      }
      this.encodeHeader(data, headers, key);
    }

    this.encodeHeaderIfExists(data, headers, "content-type");

    return data;
  },

  /**
   * @param multiStream
   *        An exsiting nsIMultiplexInputStream.
   * @param msg
   *        A MMS message object.
   *
   * @return An instance of nsIMultiplexInputStream or null in case of errors.
   */
  compose: function(multiStream, msg) {
    if (!multiStream) {
      multiStream = Cc["@mozilla.org/io/multiplex-input-stream;1"]
                    .createInstance(Ci.nsIMultiplexInputStream);
    }

    try {
      // Validity checks
      var typeinfo = this.checkMandatoryFields(msg);

      var data = this.encodeHeaders(null, msg.headers);
      debug("Composed PDU Header: " + JSON.stringify(data.array));
      mmsPduHelper.appendArrayToMultiStream(multiStream, data.array, data.offset);

      if (msg.content) {
        mmsPduHelper.appendArrayToMultiStream(multiStream, msg.content, msg.content.length);
      } else if (msg.parts) {
        mmsPduHelper.composeMultiPart(multiStream, msg.parts);
      } else if (typeinfo.hasContent) {
        throw new CodeError("Missing message content");
      }

      return multiStream;
    } catch (e) {
      debug("Failed to compose MMS message, error message: " + e.message);
      return null;
    }
  },
};

const MMS_PDU_TYPES = (function() {
  var pdus = {};
  function add(number, hasContent, mandatoryFields) {
    pdus[number] = {
      number: number,
      hasContent: hasContent,
      mandatoryFields: mandatoryFields,
    };
  }

  add(MMS_PDU_TYPE_SEND_REQ, true, ["x-mms-message-type",
                                    "x-mms-transaction-id",
                                    "x-mms-mms-version",
                                    "from",
                                    "content-type"]);
  add(MMS_PDU_TYPE_SEND_CONF, false, ["x-mms-message-type",
                                      "x-mms-transaction-id",
                                      "x-mms-mms-version",
                                      "x-mms-response-status"]);
  add(MMS_PDU_TYPE_NOTIFICATION_IND, false, ["x-mms-message-type",
                                             "x-mms-transaction-id",
                                             "x-mms-mms-version",
                                             "x-mms-message-class",
                                             "x-mms-message-size",
                                             "x-mms-expiry",
                                             "x-mms-content-location"]);
  add(MMS_PDU_TYPE_RETRIEVE_CONF, true, ["x-mms-message-type",
                                         "x-mms-mms-version",
                                         "date",
                                         "content-type"]);
  add(MMS_PDU_TYPE_NOTIFYRESP_IND, false, ["x-mms-message-type",
                                           "x-mms-transaction-id",
                                           "x-mms-mms-version",
                                           "x-mms-status"]);
  add(MMS_PDU_TYPE_DELIVERY_IND, false, ["x-mms-message-type",
                                         "x-mms-mms-version",
                                         "message-id",
                                         "to",
                                         "date",
                                         "x-mms-status"]);
  add(MMS_PDU_TYPE_ACKNOWLEDGE_IND, false, ["x-mms-message-type",
                                            "x-mms-transaction-id",
                                            "x-mms-mms-version"]);
  add(MMS_PDU_TYPE_READ_REC_IND, false, ["x-mms-message-type",
                                         "message-id",
                                         "x-mms-mms-version",
                                         "to",
                                         "from",
                                         "x-mms-read-status"]);
  add(MMS_PDU_TYPE_READ_ORIG_IND, false, ["x-mms-message-type",
                                          "x-mms-mms-version",
                                          "message-id",
                                          "to",
                                          "from",
                                          "date",
                                          "x-mms-read-status"]);

  return pdus;
})();

/**
 * Header field names and assigned numbers.
 *
 * @see OMA-TS-MMS_ENC-V1_3-20110913-A clause 7.4
 */
const MMS_HEADER_FIELDS = (function() {
  var names = {};
  function add(name, number, coder) {
    var entry = {
      name: name,
      number: number,
      coder: coder,
    };
    names[name] = names[number] = entry;
  }

  add("bcc",                                     0x01, Address);
  add("cc",                                      0x02, Address);
  add("x-mms-content-location",                  0x03, ContentLocationValue);
  add("content-type",                            0x04, ContentTypeValue);
  add("date",                                    0x05, DateValue);
  add("x-mms-delivery-report",                   0x06, BooleanValue);
  add("x-mms-delivery-time",                     0x07, ExpiryValue);
  add("x-mms-expiry",                            0x08, ExpiryValue);
  add("from",                                    0x09, FromValue);
  add("x-mms-message-class",                     0x0A, MessageClassValue);
  add("message-id",                              0x0B, TextString);
  add("x-mms-message-type",                      0x0C, MessageTypeValue);
  add("x-mms-mms-version",                       0x0D, ShortInteger);
  add("x-mms-message-size",                      0x0E, LongInteger);
  add("x-mms-priority",                          0x0F, PriorityValue);
  add("x-mms-read-report",                       0x10, BooleanValue);
  add("x-mms-report-allowed",                    0x11, BooleanValue);
  add("x-mms-response-status",                   0x12, RetrieveStatusValue);
  add("x-mms-response-text",                     0x13, ResponseText);
  add("x-mms-sender-visibility",                 0x14, SenderVisibilityValue);
  add("x-mms-status",                            0x15, StatusValue);
  add("subject",                                 0x16, EncodedStringValue);
  add("to",                                      0x17, Address);
  add("x-mms-transaction-id",                    0x18, TextString);
  add("x-mms-retrieve-status",                   0x19, RetrieveStatusValue);
  add("x-mms-retrieve-text",                     0x1A, EncodedStringValue);
  add("x-mms-read-status",                       0x1B, ReadStatusValue);
  add("x-mms-reply-charging",                    0x1C, ReplyChargingValue);
  add("x-mms-reply-charging-deadline",           0x1D, ExpiryValue);
  add("x-mms-reply-charging-id",                 0x1E, TextString);
  add("x-mms-reply-charging-size",               0x1F, LongInteger);
  add("x-mms-previously-sent-by",                0x20, PreviouslySentByValue);
  add("x-mms-previously-sent-date",              0x21, PreviouslySentDateValue);
  add("x-mms-store",                             0x22, BooleanValue);
  add("x-mms-mm-state",                          0x23, MmStateValue);
  add("x-mms-mm-flags",                          0x24, MmFlagsValue);
  add("x-mms-store-status",                      0x25, RetrieveStatusValue);
  add("x-mms-store-status-text",                 0x26, EncodedStringValue);
  add("x-mms-stored",                            0x27, BooleanValue);
  //add("x-mms-attributes", 0x28);
  add("x-mms-totals",                            0x29, BooleanValue);
  //add("x-mms-mbox-totals", 0x2A);
  add("x-mms-quotas",                            0x2B, BooleanValue);
  //add("x-mms-mbox-quotas", 0x2C);
  add("x-mms-message-count",                     0x2D, IntegerValue);
  //add("content", 0x2E);
  add("x-mms-start",                             0x2F, IntegerValue);
  //add("additional-headers", 0x30);
  add("x-mms-distribution-indicator",            0x31, BooleanValue);
  add("x-mms-element-descriptor",                0x32, ElementDescriptorValue);
  add("x-mms-limit",                             0x33, IntegerValue);
  add("x-mms-recommended-retrieval-mode",        0x34, RecommendedRetrievalModeValue);
  add("x-mms-recommended-retrieval-mode-text",   0x35, EncodedStringValue);
  //add("x-mms-status-text", 0x36);
  add("x-mms-applic-id",                         0x37, TextString);
  add("x-mms-reply-applic-id",                   0x38, TextString);
  add("x-mms-aux-applic-id",                     0x39, TextString);
  add("x-mms-content-class",                     0x3A, ContentClassValue);
  add("x-mms-drm-content",                       0x3B, BooleanValue);
  add("x-mms-adaptation-allowed",                0x3C, BooleanValue);
  add("x-mms-replace-id",                        0x3D, TextString);
  add("x-mms-cancel-id",                         0x3E, TextString);
  add("x-mms-cancel-status",                     0x3F, CancelStatusValue);

  return names;
})();

// @see OMA-TS-MMS_ENC-V1_3-20110913-A Table 27: Parameter Name Assignments
const MMS_WELL_KNOWN_PARAMS = (function() {
  var params = {};

  function add(name, number, coder) {
    var entry = {
      name: name,
      number: number,
      coder: coder,
    };
    params[name] = params[number] = entry;
  }

  // Encoding Version: 1.2
  add("type", 0x02, TypeValue);

  return params;
})();

var debug;
if (DEBUG) {
  debug = function(s) {
    dump("-$- MmsPduHelper: " + s + "\n");
  };
} else {
  debug = function(s) {};
}

this.EXPORTED_SYMBOLS = ALL_CONST_SYMBOLS.concat([
  // Constant values
  "MMS_VERSION",

  // Utility functions
  "translatePduErrorToStatus",

  // Decoders
  "BooleanValue",
  "Address",
  "HeaderField",
  "MmsHeader",
  "CancelStatusValue",
  "ContentClassValue",
  "ContentLocationValue",
  "ElementDescriptorValue",
  "Parameter",
  "EncodedStringValue",
  "ExpiryValue",
  "FromValue",
  "PreviouslySentByValue",
  "PreviouslySentDateValue",
  "MessageClassValue",
  "MessageTypeValue",
  "MmFlagsValue",
  "MmStateValue",
  "PriorityValue",
  "ReadStatusValue",
  "RecommendedRetrievalModeValue",
  "ReplyChargingValue",
  "ResponseText",
  "RetrieveStatusValue",
  "SenderVisibilityValue",
  "StatusValue",

  // Parser
  "mmsPduHelper",
]);

