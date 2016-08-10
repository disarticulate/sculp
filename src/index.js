////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

import isObject from 'lodash-compat/lang/isObject';
import { setDefaultOptions } from './options';
import { getInitial, getSubScheme } from './helper';

import ValidationError from './error';
import { Type, Presence } from './enums';

import Sculp from './sculp';

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// tryValidate static
////////////////////////////////////////////////////////////////////////////////

export function tryValidate (value, scheme, options = {}) {
  // eslint-disable-next-line prefer-rest-params
  if (arguments.length >= 4 || arguments.length < 2)
    throw new Error('Validate function expects 2 or 3 arguments');
  if (options != null && isObject(options) === false)
    throw new Error('Options argument should be an object');

  const sculp = new Sculp(value, scheme, {
    ...options,
    disableDependencyTracking : true
  });
  return sculp.tryValidate();
}

////////////////////////////////////////////////////////////////////////////////
// validate static
////////////////////////////////////////////////////////////////////////////////

export function validate (value, scheme, options = {}) {
  // eslint-disable-next-line prefer-rest-params
  if (arguments.length >= 4 || arguments.length < 2)
    throw new Error('Validate function expects 2 or 3 arguments');
  if (options != null && isObject(options) === false)
    throw new Error('Options argument should be an object');

  const sculp = new Sculp(value, scheme, {
    ...options,
    disableDependencyTracking : true
  });
  return sculp.validate();
}

////////////////////////////////////////////////////////////////////////////////
// getSchemeValue static
////////////////////////////////////////////////////////////////////////////////

export function getSchemeValue (scheme, value, path, rule) {
  const sculp = new Sculp(value, scheme, { disableDependencyTracking : true });
  return sculp.getSchemeValue(path, rule);
}

////////////////////////////////////////////////////////////////////////////////
// getFieldName static
////////////////////////////////////////////////////////////////////////////////

export function getFieldName (scheme, value, path) {
  const sculp = new Sculp(value, scheme, { disableDependencyTracking : true });
  return sculp.getFieldName(path);
}

////////////////////////////////////////////////////////////////////////////////
// getFieldPresence static
////////////////////////////////////////////////////////////////////////////////

export function getFieldPresence (scheme, value, path) {
  const sculp = new Sculp(value, scheme, { disableDependencyTracking : true });
  return sculp.getFieldPresence(path);
}

////////////////////////////////////////////////////////////////////////////////
// setDefaultOptions static
////////////////////////////////////////////////////////////////////////////////

export { setDefaultOptions };

////////////////////////////////////////////////////////////////////////////////
// getInitial static
////////////////////////////////////////////////////////////////////////////////

export { getInitial, getSubScheme };

////////////////////////////////////////////////////////////////////////////////
// Error and enums
////////////////////////////////////////////////////////////////////////////////

export { ValidationError, Type, Presence };

////////////////////////////////////////////////////////////////////////////////
// export
////////////////////////////////////////////////////////////////////////////////

export { Sculp };
