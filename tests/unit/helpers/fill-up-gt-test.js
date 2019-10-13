import { fillUpGt } from 'dummy/helpers/fill-up-gt';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | fill-up-gt', function(hooks) {
  setupTest(hooks);

  test('generates a gt definition', function(assert) {
    let result = fillUpGt([42]);

    assert.equal(result.comparison(42), false);
    assert.equal(result.comparison(43), true);
    assert.equal(result.comparison(41), false);
  });
});
