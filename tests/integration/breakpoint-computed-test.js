import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import waitForSizeChange from 'dummy/tests/helpers/wait-for-size-change';
import hbs from 'htmlbars-inline-precompile';

module('Integration | breakpoints-computed', function(hooks) {
  setupRenderingTest(hooks);

  test('it contains breakpoint classes', async function (assert) {
    await render(hbs`
      <style>
        #ember-testing .breakpoints-computed { width: 300px; }
      </style>

      {{breakpoints-computed}}
    `);

    await waitForSizeChange();

    let componentElement = find('.breakpoints-computed');

    assert.equal(
      componentElement.classList.contains('greater-than-200'),
      true,
      'it has the greater-than-200 class'
    );

    assert.equal(
      componentElement.classList.contains('less-than-400'),
      true,
      'it has the less-than-400 class'
    );
  });

  test('it hides unmatched breakpoint classes', async function (assert) {
    await render(hbs`
      <style>
        #ember-testing .breakpoints-computed { width: 100px; }
      </style>

      {{breakpoints-computed}}
    `);

    let componentElement = find('.breakpoints-computed');

    assert.equal(
      componentElement.classList.contains('greater-than-200'),
      false,
      'falsy conditioned class is not shown in class list'
    );

    assert.equal(
      componentElement.classList.contains('less-than-400'),
      true,
      'truthy conditioned class is shown in the class list'
    );
  });

  test('it re-computes when conditions change', async function(assert) {
    await render(hbs `
      <style>
        #ember-testing .breakpoints-computed-wrapper { width: 100px; }
      </style>

      <div class="breakpoints-computed-wrapper">
        {{breakpoints-computed}}
      </div>
    `);

    let componentElement = find('.breakpoints-computed');

    assert.equal(
      componentElement.classList.contains('greater-than-200'),
      false,
      'initially class does not meet condition and class is not shown'
    );

    // change parent width
    find('.breakpoints-computed-wrapper').style.width = '250px';

    await waitForSizeChange();

    assert.equal(
      componentElement.classList.contains('greater-than-200'),
      true,
      'after change the condition is met and the class is shown'
    );
  });
});
