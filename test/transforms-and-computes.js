/* eslint-env mocha */
////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

import { assert } from 'chai';
import capitalize from 'underscore.string/capitalize';

import { validate, Type, Presence } from '../lib/index';

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

describe('Transform and compute functions:', function () {

  it('should calculate transforms', function () {
    const scheme = {
      type : Type.OBJECT,
      $presence : Presence.REQUIRED,
      properties : {
        name : {
          type : Type.STRING,
          transform : [
            (v) => v && v.split(' '),
            (v) => v && v.map(capitalize),
            (v) => v && v.join(' ')
          ]
        }
      }
    };

    const value = {
      name : 'john smith'
    };
    const result = validate(value, scheme);
    assert.deepEqual(result, { name : 'John Smith' });
  });

  it('should calculate computes', function () {
    const scheme = {
      type : Type.OBJECT,
      properties : {
        firstname : {
          type : Type.STRING
        },
        lastname : {
          type : Type.STRING
        },
        fullnameUpper : {
          type : Type.STRING,
          compute : [
            (fa) => `${fa('^.firstname') || ''} ${fa('^.lastname') || ''}`,
            (fa) => fa() && fa().trim(),
            (fa) => fa() && fa().toUpperCase(),
          ]
        }
      }
    };

    const result = validate({
      firstname : 'john',
      lastname : 'smith'
    }, scheme);

    assert.deepEqual(result, {
      firstname : 'john',
      lastname : 'smith',
      fullnameUpper : 'JOHN SMITH'
    });

    const result2 = validate({
      lastname : 'smith'
    }, scheme);

    assert.deepEqual(result2, {
      lastname : 'smith',
      fullnameUpper : 'SMITH'
    });
  });

  it('should calculate transforms only once', function () {
    const scheme = {
      type : Type.NUMBER,
      transform : (v) => v + 1
    };
    assert.deepEqual(validate(-1, scheme), 0);
    assert.deepEqual(validate(5, scheme), 6);
    assert.deepEqual(validate('23', scheme), 24);
  });

  it('should calculate transforms before computes', function () {
    const scheme = {
      type : Type.NUMBER,
      transform : (v) => v + 1,
      compute : (fa) => 0 - fa()
    };
    assert.deepEqual(validate(5, scheme), -6); // -4 if it was another way around
  });

});
