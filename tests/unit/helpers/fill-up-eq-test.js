import { fillUpEq } from "dummy/helpers/fill-up-eq";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Helper | fill-up-eq", function(hooks) {
  setupTest(hooks);

  test("generates a eq definition", function(assert) {
    let result = fillUpEq([42]);

    assert.equal(result.comparison(42), true);
    assert.equal(result.comparison(43), false);
    assert.equal(result.comparison(41), false);
  });
});
