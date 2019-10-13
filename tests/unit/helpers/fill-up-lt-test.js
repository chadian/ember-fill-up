import { fillUpLt } from "dummy/helpers/fill-up-lt";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Helper | fill-up-lt", function(hooks) {
  setupTest(hooks);

  test("generates a lt definition", function(assert) {
    let result = fillUpLt([42]);

    assert.equal(result.label);
    assert.equal(result.comparison(42), false);
    assert.equal(result.comparison(43), false);
    assert.equal(result.comparison(41), true);
  });
});
