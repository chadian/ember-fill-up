import { fillUpGte } from "dummy/helpers/fill-up-gte";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Helper | fill-up-gte", function(hooks) {
  setupTest(hooks);

  test("generates a gte definition", function(assert) {
    let result = fillUpGte([42], { label: "gte-42" });

    assert.equal(result.label, "gte-42");
    assert.equal(result.comparison(42), true);
    assert.equal(result.comparison(43), true);
    assert.equal(result.comparison(41), false);
  });
});
