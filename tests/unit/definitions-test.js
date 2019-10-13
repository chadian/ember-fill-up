import { module, test } from "qunit";
import {
  lt,
  lte,
  gt,
  gte,
  eq,
  between,
  definitionsMap
} from "ember-fill-up/definitions";

module("Unit | definitions", function() {
  test("lt definition", function(assert) {
    let definition = lt(400);

    assert.equal(definition.comparison(500), false);
    assert.equal(definition.comparison(400), false);
    assert.equal(definition.comparison(300), true);
  });

  test("lte definition", function(assert) {
    let definition = lte(400);

    assert.equal(definition.comparison(500), false);
    assert.equal(definition.comparison(400), true);
    assert.equal(definition.comparison(300), true);
  });

  test("gt definition", function(assert) {
    let definition = gt(400);

    assert.equal(definition.comparison(500), true);
    assert.equal(definition.comparison(400), false);
    assert.equal(definition.comparison(300), false);
  });

  test("gte definition", function(assert) {
    let definition = gte(400);

    assert.equal(definition.comparison(500), true);
    assert.equal(definition.comparison(400), true);
    assert.equal(definition.comparison(300), false);
  });

  test("eq definition", function(assert) {
    let definition = eq(400);

    assert.equal(definition.comparison(500), false);
    assert.equal(definition.comparison(400), true);
    assert.equal(definition.comparison(300), false);
  });

  test("between definition", function(assert) {
    let definition = between(400, 600);

    assert.equal(definition.comparison(700), false);
    assert.equal(
      definition.comparison(600),
      false,
      "upper bound is not included"
    );
    assert.equal(definition.comparison(500), true);
    assert.equal(definition.comparison(400), true, "lower bound is included");
    assert.equal(definition.comparison(300), false);
  });

  test("it creates a definitions map from an array of definitions", function(assert) {
    let definitions = {
      "truthy-equal": eq(400),
      "truthy-less-than": lt(800),
      "falsy-less-than": lt(0),
      "truthy-greater-than": gt(200)
    };

    let currentValue = 400;
    let result = definitionsMap(currentValue, definitions);

    assert.deepEqual(result, {
      "truthy-equal": true,
      "truthy-less-than": true,
      "truthy-greater-than": true,
      "falsy-less-than": false
    });
  });
});
