import { module, test } from 'qunit';
import {
  lt,
  lte,
  gt,
  gte,
  eq,
  between,
  definitionClassNames
} from 'ember-fill-up/breakpoints/computed';

module('Unit | computed | breakpoints', function() {
  module('definitions', function() {
    test('lt definition', function(assert) {
      let definition = lt(400, 'lt label');

      assert.equal(definition.label, 'lt label');
      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), false);
      assert.equal(definition.comparison(300), true);
    });

    test('lte definition', function(assert) {
      let definition = lte(400, 'lte label');

      assert.equal(definition.label, 'lte label');
      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), true);
    });

    test('gt definition', function(assert) {
      let definition = gt(400, 'gt label');

      assert.equal(definition.label, 'gt label');
      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), false);
      assert.equal(definition.comparison(300), false);
    });

    test('gte definition', function(assert) {
      let definition = gte(400, 'gte label');

      assert.equal(definition.label, 'gte label');
      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), false);
    });

    test('eq definition', function(assert) {
      let definition = eq(400, 'eq label');

      assert.equal(definition.label, 'eq label');
      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), false);
    });

    test('between definition', function(assert) {
      let definition = between(400, 600, 'between label');

      assert.equal(definition.label, 'between label');
      assert.equal(definition.comparison(700), false);
      assert.equal(definition.comparison(600), false, 'upper bound is not included');
      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), true, 'lower bound is included');
      assert.equal(definition.comparison(300), false);
    });
  });

  module('breakpointClasses', function () {
    test('it generates a css class string for truthy values', function(assert) {
      let definitions = [
        eq(400, 'truthy-equal'),
        lt(800, 'truthy-less-than'),
        lt(0, 'falsy-less-than'),
        gt(200, 'truthy-greater-than')
      ];

      let currentValue = 400;
      let result = definitionClassNames(currentValue, definitions);

      assert.equal(result, 'truthy-equal truthy-less-than truthy-greater-than');
    });
  });
});
