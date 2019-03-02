import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const COMPARISON_VALUE = 500;

module('Integration | Component | comparison-computed', function(hooks) {
  setupRenderingTest(hooks);

  // ensure that test constant used as a reference value matches
  // what is used internally with dummy test component and for
  // the rest of the tests
  test('comparison values matches test constant', async function(assert) {
    await render(hbs`
      <div id="comparisonValue">
        {{#comparison-computed as |_|}}
          {{_.comparisonValue}}
        {{/comparison-computed}}
      </div>
    `);

    assert.equal(find('#comparisonValue').textContent.trim(), COMPARISON_VALUE);
  });

  module('isEqualTo', function() {
    test('isEqualTo handles dimensions equal to the comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 500px; height: 500px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonEqualToWidth">
            {{_.equalToWidth}}
          </div>
          <div id="comparisonEqualToHeight" >
            {{_.equalToHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(find('#comparisonEqualToWidth').textContent.trim(), "true");
      assert.equal(find('#comparisonEqualToHeight').textContent.trim(), "true");
    });

    test('isEqualTo handles dimensions NOT equal to the comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 499px; height: 499px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonEqualToWidth">
            {{_.equalToWidth}}
          </div>
          <div id="comparisonEqualToHeight" >
            {{_.equalToHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(find('#comparisonEqualToWidth').textContent.trim(), "false");
      assert.equal(find('#comparisonEqualToHeight').textContent.trim(), "false");
    });
  });

  module('greaterThan', function() {
    test('greaterThan handles dimensions less than comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 499px; height: 499px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonGreaterThanWidth">
            {{_.greaterThanWidth}}
          </div>
          <div id="comparisonGreaterThanHeight" >
            {{_.greaterThanHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(
        find('#comparisonGreaterThanWidth').textContent.trim(),
        "false"
      );

      assert.equal(
        find('#comparisonGreaterThanHeight').textContent.trim(),
        "false"
      );
    });

    test('greaterThan handles dimensions greater than comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 501px; height: 501px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonGreaterThanWidth">
            {{_.greaterThanWidth}}
          </div>
          <div id="comparisonGreaterThanHeight" >
            {{_.greaterThanHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(
        find('#comparisonGreaterThanWidth').textContent.trim(),
        "true"
      );

      assert.equal(
        find('#comparisonGreaterThanHeight').textContent.trim(),
        "true"
      );
    });
  });

  module('lessThan', function() {
    test('lessThan handles dimensions less than comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 499px; height: 499px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonLessThanWidth">
            {{_.lessThanWidth}}
          </div>
          <div id="comparisonLessThanHeight" >
            {{_.lessThanHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(
        find('#comparisonLessThanWidth').textContent.trim(),
        "true"
      );

      assert.equal(
        find('#comparisonLessThanHeight').textContent.trim(),
        "true"
      );
    });

    test('lessThan handles dimensions greater than comparison value', async function (assert) {
      await render(hbs`
        <style>
          #ember-testing div { width: 501px; height: 501px; }
        </style>
        {{#comparison-computed as |_|}}
          <div id="comparisonLessThanWidth">
            {{_.lessThanWidth}}
          </div>
          <div id="comparisonLessThanHeight" >
            {{_.lessThanHeight}}
          </div>
        {{/comparison-computed}}
      `);

      assert.equal(
        find('#comparisonLessThanWidth').textContent.trim(),
        "false"
      );

      assert.equal(
        find('#comparisonLessThanHeight').textContent.trim(),
        "false"
      );
    });
  });

  test('it can use explicit WIDTH constant', async function(assert) {
    await render(hbs`
      <style>
        #ember-testing div { width: 501px; height: 501px; }
      </style>
      {{#comparison-computed as |_|}}
        <div id="greaterThanWithWidthConstant" >
          {{_.greaterThanWithWidthConstant}}
        </div>
        <div id="lessThanWithWidthConstant" >
          {{_.lessThanWithWidthConstant}}
        </div>
        <div id="equalToWithWidthConstant" >
          {{_.equalToWithWidthConstant}}
        </div>
      {{/comparison-computed}}
    `);

    assert.equal(
      find('#greaterThanWithWidthConstant').textContent.trim(),
      "true",
      "width with constant greater than"
    );

    assert.equal(
      find('#lessThanWithWidthConstant').textContent.trim(),
      "false",
      "width with constant less than"
    );

    assert.equal(
      find('#equalToWithWidthConstant').textContent.trim(),
      "false",
      "width with constant equals"
    );
  });
});
