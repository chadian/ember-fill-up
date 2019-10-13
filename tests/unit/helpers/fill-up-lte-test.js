import { fillUpLte } from "dummy/helpers/fill-up-lte";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Helper | fill-up-lte", function(hooks) {
  setupTest(hooks);

  test("generates a lte definition", function(assert) {
    let result = fillUpLte([42]);

    assert.equal(result.comparison(42), true);
    assert.equal(result.comparison(43), false);
    assert.equal(result.comparison(41), true);
  });
});
