import { module, test } from 'qunit';
import { to, from, layer, match } from 'ember-fill-up/computed/breakpoints';

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
    test('it works with from-layer-to', function (assert) {
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

    test('it works with from-layer-layer-to', function(assert) {
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
  });
});
