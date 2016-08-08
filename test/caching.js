/* eslint-env mocha */
////////////////////////////////////////////////////////////////////////////////
// REQUIRES : BEGIN
////////////////////////////////////////////////////////////////////////////////

import { assert } from 'chai';

import { Sculp, TYPE, PRESENCE } from '../lib/index';

const { OPTIONAL, ABSENT } = PRESENCE;

////////////////////////////////////////////////////////////////////////////////
// REQUIRES : END
////////////////////////////////////////////////////////////////////////////////

describe('Results caching and reuse:', function () {

  const scheme = {
    type : TYPE.OBJECT,
    $presence : PRESENCE.REQUIRED,
    properties : {
      name : { type : TYPE.STRING },
      age : { type : TYPE.NUMBER },
      married : { type : TYPE.BOOLEAN },
      spouse : {
        type : TYPE.OBJECT,
        $presence : (fa) => fa('^^.married') === true ? OPTIONAL : ABSENT,
        properties : {
          name : { type : TYPE.STRING },
          age : { type : TYPE.NUMBER }
        }
      }
    }
  };

  const value = {
    name : 'John',
    age : 25,
    married : true,
    spouse : {
      name : 'Anna',
      age : 20
    }
  };

  it('should return the same object on re-validation', function () {
    const sculp = new Sculp(value, scheme);

    const result = sculp.validate();
    assert.strictEqual(sculp.validate(), result);

    sculp.setField('.age', result.age);

    assert.strictEqual(sculp.validate(), result);
  });

  it('should return new object on re-validation after field change', function () {
    const sculp = new Sculp(value, scheme);

    const result = sculp.validate();
    sculp.setField('.age', result.age + 1);

    assert.notStrictEqual(sculp.validate(), result);
  });

  it('should reuse the same subfield value after field change that subfield does not depend on',
  function () {
    const sculp = new Sculp(value, scheme);

    const result = sculp.validate();
    sculp.setField('.age', result.age + 1);

    assert.notStrictEqual(sculp.validate(), result);
    assert.strictEqual(sculp.validate().spouse, result.spouse);
  });

  it('should not reuse subfield value after field change that subfield depends on',
  function () {
    const sculp = new Sculp(value, scheme);

    const result = sculp.validate();
    sculp.setField('.married', false);
    sculp.setField('.married', true);

    assert.deepEqual(sculp.validate().spouse, result.spouse);
    assert.notStrictEqual(sculp.validate().spouse, result.spouse);
  });

});