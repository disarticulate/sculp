////////////////////////////////////////////////////////////////////////////////
// DEFAULT_OPTIONS
////////////////////////////////////////////////////////////////////////////////

const DEFAULT_OPTIONS = {
  strict : false, // use strict casts or not
  extendFieldStatesWithScheme : false,
  extendFieldStatesWithValues : false,
  extendArrayStatesWithItemStates : false,
  extendFieldStatesWithErrors : false,
  fixFailedValuesValidation : false,
  calculateTransformsAndComputes : true,
  preserveEmptyArrayItems : false,
  removeEmpty : false,
  removeInitial : false,
  validations : {},
  casts : {},
  castsStrict : {},
  lang : 'en'
};

////////////////////////////////////////////////////////////////////////////////
// currentDefaultOptions
////////////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line import/no-mutable-exports
export let currentDefaultOptions = DEFAULT_OPTIONS;

////////////////////////////////////////////////////////////////////////////////
// setDefaultOptions
////////////////////////////////////////////////////////////////////////////////

export function setDefaultOptions (options) {
  currentDefaultOptions = {
    ...currentDefaultOptions,
    ...options
  };
}
