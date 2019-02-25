import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fill-up', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
    <style>
      #container {
        width: 500px;
        height: 250px;
      }
    </style>

    {{#fill-up id="container" as |size|}}
      <div id="width">
        width: {{size.width}}
      </div>
      <div id="height">
        height: {{size.height}}
      </div>
    {{/fill-up}}
    `);

    assert.equal(find('#width').textContent.trim(), 'width: 500');
    assert.equal(find('#height').textContent.trim(), 'height: 250');
  });
});
