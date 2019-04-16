import { module, test } from 'qunit';
import { to, from, layer, match } from 'ember-fill-up/breakpoints/computed';

module('Unit | computed | breakpoints', function() {
  test('it works with to breapoint definition', function(assert) {
    let currentBreakPoint = 500;
    let definition = to(400, 'meow');

    let results = match(currentBreakPoint, [definition]);

    assert.deepEqual(results, {
      'meow': false
    });
  });

  test('it works with from breapoint definition', function(assert) {
    let currentBreakPoint = 500;
    let definition = from(400, 'meow');

    let results = match(currentBreakPoint, [definition]);

    assert.deepEqual(results, {
      'meow': true
    });
  });

  module('layered breakpoint definitions', function() {
    test('it works with a from, single layer, and to', function (assert) {
      let currentBreakPoint = 500;

      let definitions = [
        from(500, 'from-500-to-700'),
        layer(700, 'from-700-to-900'),
        to(900)
      ];

      let expected = {
        'from-500-to-700': true,
        'from-700-to-900': false
      };

      let result = match(currentBreakPoint, definitions);

      assert.deepEqual(result, expected);
    });

    test('it works with a from, two layers, and a to', function(assert) {
      let currentBreakPoint = 910;

      let definitions = [
        from(500, 'from-500-to-700'),
        layer(700, 'from-700-to-900'),
        layer(900, 'from-900-to-1000'),
        to(1000)
      ];

      let expected = {
        'from-500-to-700': false,
        'from-700-to-900': false,
        'from-900-to-1000': true,
      };

      let result = match(currentBreakPoint, definitions);

      assert.deepEqual(result, expected);
    });

    module('it can handle multiple layering sequences', function() {
      test('it works when falling in the gap between layering sequences', function (assert) {
        let currentBreakPoint = 675;

        let definitions = [
          from(500, 'from-500-to-550'),
          layer(550, 'from-550-to-600'),
          layer(600, 'from-600-to-650'),
          to(650),
          from(700, 'from-700-to-750'),
          layer(750, 'from-750-to-800'),
          layer(800, 'from-800-to-850'),
          to(850)
        ];

        let expected = {
          'from-500-to-550': false,
          'from-550-to-600': false,
          'from-600-to-650': false,
          'from-700-to-750': false,
          'from-750-to-800': false,
          'from-800-to-850': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });

      test('it works when falling in one of the layering sequences', function (assert) {
        let currentBreakPoint = 600;

        let definitions = [
          from(500, 'from-500-to-550'),
          layer(550, 'from-550-to-600'),
          layer(600, 'from-600-to-650'),
          to(650),
          from(700, 'from-700-to-750'),
          layer(750, 'from-750-to-800'),
          layer(800, 'from-800-to-850'),
          to(850)
        ];

        let expected = {
          'from-500-to-550': false,
          'from-550-to-600': false,
          'from-600-to-650': true,
          'from-700-to-750': false,
          'from-750-to-800': false,
          'from-800-to-850': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });

      test('it works with truthy layers in multiple layering sequences', function (assert) {
        let currentBreakPoint = 525;

        let definitions = [
          from(500, 'from-500-to-550'),
          layer(550, 'from-550-to-600'),
          layer(600, 'from-600-to-650'),
          to(650),
          from(525, 'from-525-to-575'),
          layer(575, 'from-575-to-625'),
          layer(625, 'from-625-to-675'),
          to(675)
        ];

        let expected = {
          'from-500-to-550': true,
          'from-550-to-600': false,
          'from-600-to-650': false,
          'from-525-to-575': true,
          'from-575-to-625': false,
          'from-625-to-675': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });
    });

    module('with head, body, and tail layers', function() {
      test('it works with head layers', function (assert) {
        let currentBreakPoint = 500;

        let definitions = [
          from(500, 'from-500-to-700'),
          layer(700, 'from-700-to-900'),
          layer(900, 'from-900-to-1000'),
          to(1000)
        ];

        let expected = {
          'from-500-to-700': true,
          'from-700-to-900': false,
          'from-900-to-1000': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });

      test('it works with the body layers', function (assert) {
        let currentBreakPoint = 700;

        let definitions = [
          from(500, 'from-500-to-700'),
          layer(700, 'from-700-to-900'),
          layer(900, 'from-900-to-1000'),
          to(1000)
        ];

        let expected = {
          'from-500-to-700': false,
          'from-700-to-900': true,
          'from-900-to-1000': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });

      test('it works with the body to body layers', function (assert) {
        let currentBreakPoint = 750;

        let definitions = [
          from(500, 'from-500-to-700'),
          layer(700, 'from-700-to-750'),
          layer(750, 'from-750-to-900'),
          layer(900, 'from-900-to-1000'),
          to(1000)
        ];

        let expected = {
          'from-500-to-700': false,
          'from-700-to-750': false,
          'from-750-to-900': true,
          'from-900-to-1000': false,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });

      test('it works with the end layers', function (assert) {
        let currentBreakPoint = 900;

        let definitions = [
          from(500, 'from-500-to-700'),
          layer(700, 'from-700-to-900'),
          layer(900, 'from-900-to-1000'),
          to(1000)
        ];

        let expected = {
          'from-500-to-700': false,
          'from-700-to-900': false,
          'from-900-to-1000': true,
        };

        let result = match(currentBreakPoint, definitions);

        assert.deepEqual(result, expected);
      });
    });
  });
});
