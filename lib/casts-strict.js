////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

import isNumber from 'lodash-compat/lang/isNumber';
import isBoolean from 'lodash-compat/lang/isBoolean';
import isDate from 'lodash-compat/lang/isDate';
import isFunction from 'lodash-compat/lang/isFunction';
import isString from 'lodash-compat/lang/isString';
import isObject from 'lodash-compat/lang/isObject';
import isArray from 'lodash-compat/lang/isArray';

import { TYPE, CAST_ERROR } from './enums';

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// CASTS_STRICT
////////////////////////////////////////////////////////////////////////////////

const CASTS_STRICT = {

  //////////////////////////////////////////////////////////////////////////////
  // STRING
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.STRING] (v) {
    if (isString(v))
      return v;

    return CAST_ERROR;
  },

  //////////////////////////////////////////////////////////////////////////////
  // STRING NOT EMPTY TRIMMED
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.STRING_NET] (v) {
    let res = CASTS_STRICT[TYPE.STRING](v);

    if (res !== CAST_ERROR) {
      res = res.trim();
      if (res === '')
        res = undefined;
    }

    return res;
  },

  //////////////////////////////////////////////////////////////////////////////
  // NUMBER
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.NUMBER] (v) {
    if (isNumber(v)) {
      if (isNaN(v))
        return CAST_ERROR;
      return v;
    }

    return CAST_ERROR;
  },

  //////////////////////////////////////////////////////////////////////////////
  // DATE
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.DATE] (v) {
    if (isDate(v))
      return new Date(v.getTime());

    return CAST_ERROR;
  },

  //////////////////////////////////////////////////////////////////////////////
  // FUNCTION
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.FUNCTION] (v) {
    if (isFunction(v))
      return v;

    return CAST_ERROR;
  },

  //////////////////////////////////////////////////////////////////////////////
  // BOOLEAN
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.BOOLEAN] (v) {
    if (isBoolean(v))
      return v;

    return CAST_ERROR;
  },

  //////////////////////////////////////////////////////////////////////////////
  // ANY_VALUE
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.ANY_VALUE] (v) {
    return v;
  },

  //////////////////////////////////////////////////////////////////////////////
  // ANY_OBJECT
  //////////////////////////////////////////////////////////////////////////////

  [TYPE.ANY_OBJECT] (v) {
    if (isObject(v) && !isArray(v))
      return v;
    return CAST_ERROR;
  }

};

export default CASTS_STRICT;