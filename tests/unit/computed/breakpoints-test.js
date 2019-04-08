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

  test('it works with layered breapoint definitions', function (assert) {
    let currentBreakPoint = 500;

    let definitions = [
      from(500, 'from-500-to-700'),
      layer(700, 'from-700-to-900'),
      to(900)
    ];

    let results = match(currentBreakPoint, definitions);

    assert.deepEqual(results, {
      'from-500-to-700': true,
      'from-700-to-900': false
    });
  });
});
