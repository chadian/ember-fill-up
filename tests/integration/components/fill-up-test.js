import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module('Integration | Component | fill-up', function(hooks) {
  setupRenderingTest(hooks);

  test('it reports width and height set in pixels', async function(assert) {
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

  test('it reports width and height set based on percentages', async function(assert) {
    await render(hbs`
      <style>
        #outer-container {
          width: 100px;
          height: 100px;
        }

        #container {
          width: 20%;
          height: 10%;
        }
      </style>

      <div id="outer-container">
        {{#fill-up id="container" as |size|}}
          <div id="width">
            width: {{size.width}}
          </div>
          <div id="height">
            height: {{size.height}}
          </div>
        {{/fill-up}}
      </div>
    `);

    assert.equal(find('#width').textContent.trim(), 'width: 20');
    assert.equal(find('#height').textContent.trim(), 'height: 10');
  });

  test('it reports width and height set based on percentages', async function (assert) {
    await render(hbs `
      <style>
        #container {
          width: 200px;
          border-left: 50px;
          border-right: 30px;

          height: 100px;
          border-top: 10px;
          border-bottom: 20px;

          border-color: black;
          border-style: solid;
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

    assert.equal(find('#width').textContent.trim(), 'width: 280');
    assert.equal(find('#height').textContent.trim(), 'height: 130');
  });

  test('it detects changes in width and height', async function (assert) {
    await render(hbs `
      <style>
        #container {
          width: 100px;
          height: 125px;
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

    assert.equal(find('#width').textContent.trim(), 'width: 100');
    assert.equal(find('#height').textContent.trim(), 'height: 125');

    let container = find("#container");
    container.style.width = "300px";
    container.style.height = "600px";

    await wait(50);

    assert.equal(find('#width').textContent.trim(), 'width: 300');
    assert.equal(find('#height').textContent.trim(), 'height: 600');
  });
});
