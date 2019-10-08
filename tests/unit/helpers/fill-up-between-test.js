import { fillUpBetween } from "dummy/helpers/fill-up-between";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Helper | fill-up-between", function(hooks) {
  setupTest(hooks);

  test("generates a between definition", function(assert) {
    let result = fillUpBetween([42, 45], { label: "between-42-45" });

    assert.equal(result.label, "between-42-45");
    assert.equal(result.comparison(41), false);
    assert.equal(result.comparison(42), true);
    assert.equal(result.comparison(43), true);
    assert.equal(result.comparison(44), true);
    assert.equal(result.comparison(45), false);
    assert.equal(result.comparison(46), false);
  });
});
