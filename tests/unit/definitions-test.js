import { module, test } from 'qunit';
import { lt, lte, gt, gte, eq, between, definitionsMap } from 'ember-fill-up/definitions';

module('Unit | definitions', function() {
  module('comparisons', function() {
    test('lt definition', function(assert) {
      let definition = lt(400);

      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), false);
      assert.equal(definition.comparison(300), true);
    });

    test('lte definition', function(assert) {
      let definition = lte(400);

      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), true);
    });

    test('gt definition', function(assert) {
      let definition = gt(400);

      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), false);
      assert.equal(definition.comparison(300), false);
    });

    test('gte definition', function(assert) {
      let definition = gte(400);

      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), false);
    });

    test('eq definition', function(assert) {
      let definition = eq(400);

      assert.equal(definition.comparison(500), false);
      assert.equal(definition.comparison(400), true);
      assert.equal(definition.comparison(300), false);
    });

    test('between definition', function(assert) {
      let definition = between(400, 600);

      assert.equal(definition.comparison(700), false);
      assert.equal(definition.comparison(600), false, 'upper bound is not included');
      assert.equal(definition.comparison(500), true);
      assert.equal(definition.comparison(400), true, 'lower bound is included');
      assert.equal(definition.comparison(300), false);
    });

    test('it creates a definitions map from a hash of definitions', function(assert) {
      let definitions = {
        'truthy-equal': eq(400),
        'truthy-less-than': lt(800),
        'falsy-less-than': lt(0),
        'truthy-greater-than': gt(200)
      };

      let currentValue = 400;
      let result = definitionsMap({ width: currentValue }, definitions);

      assert.deepEqual(result, {
        'truthy-equal': true,
        'truthy-less-than': true,
        'truthy-greater-than': true,
        'falsy-less-than': false
      });
    });
  });

  test('it by default saves the width dimension on the definition', function(assert) {
    const ltDefinition = lt(5);
    const lteDefinition = lte(5);
    const gtDefinition = gt(5);
    const gteDefinition = gte(5);
    const eqDefinition = eq(5);
    const betweenDefinition = between(5, 10);

    assert.equal(ltDefinition.dimension, 'width');
    assert.equal(lteDefinition.dimension, 'width');
    assert.equal(gtDefinition.dimension, 'width');
    assert.equal(gteDefinition.dimension, 'width');
    assert.equal(eqDefinition.dimension, 'width');
    assert.equal(betweenDefinition.dimension, 'width');
  });

  test('it saves the width dimension on the dimension', function(assert) {
    const ltDefinition = lt(5, { dimension: 'width' });
    const lteDefinition = lte(5, { dimension: 'width' });
    const gtDefinition = gt(5, { dimension: 'width' });
    const gteDefinition = gte(5, { dimension: 'width' });
    const eqDefinition = eq(5, { dimension: 'width' });
    const betweenDefinition = between(5, 10, { dimension: 'width' });

    assert.equal(ltDefinition.dimension, 'width');
    assert.equal(lteDefinition.dimension, 'width');
    assert.equal(gtDefinition.dimension, 'width');
    assert.equal(gteDefinition.dimension, 'width');
    assert.equal(eqDefinition.dimension, 'width');
    assert.equal(betweenDefinition.dimension, 'width');
  });

  test('it saves the height dimension on the dimension', function(assert) {
    const ltDefinition = lt(5, { dimension: 'height' });
    const lteDefinition = lte(5, { dimension: 'height' });
    const gtDefinition = gt(5, { dimension: 'height' });
    const gteDefinition = gte(5, { dimension: 'height' });
    const eqDefinition = eq(5, { dimension: 'height' });
    const betweenDefinition = between(5, 10, { dimension: 'height' });

    assert.equal(ltDefinition.dimension, 'height');
    assert.equal(lteDefinition.dimension, 'height');
    assert.equal(gtDefinition.dimension, 'height');
    assert.equal(gteDefinition.dimension, 'height');
    assert.equal(eqDefinition.dimension, 'height');
    assert.equal(betweenDefinition.dimension, 'height');
  });

  test('it throws when a value that is not width or height is given for the dimension', function(assert) {
    assert.throws(
      () => lt(5, { dimension: 'not-a-dimension' }),
      'lt throws when passed something that is not a dimension'
    );

    assert.throws(
      () => lte(5, { dimension: 'not-a-dimension' }),
      'lte throws when passed something that is not a dimension'
    );

    assert.throws(
      () => gt(5, { dimension: 'not-a-dimension' }),
      'gt throws when passed something that is not a dimension'
    );

    assert.throws(
      () => gte(5, { dimension: 'not-a-dimension' }),
      'gte throws when passed something that is not a dimension'
    );

    assert.throws(
      () => eq(5, { dimension: 'not-a-dimension' }),
      'eq throws when passed something that is not a dimension'
    );

    assert.throws(
      () => between(5, 10, { dimension: 'not-a-dimension' }),
      'between throws when passed something that is not a dimension'
    );
  });
});
