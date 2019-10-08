import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import waitForSizeChange from 'dummy/tests/helpers/wait-for-size-change';
import { gt } from 'ember-fill-up/definitions';
import * as sinon from "sinon";

module('Integration | Component | fill-up', function(hooks) {
  setupRenderingTest(hooks);

  module('dimensions', function() {
    test('it reports width and height set in pixels', async function(assert) {
      await render(hbs`
        <style>
          #container {
            width: 500px;
            height: 250px;
          }
        </style>

        <FillUp id="container" as |size|>
          <div id="width">
            width: {{size.width}}
          </div>
          <div id="height">
            height: {{size.height}}
          </div>
        </FillUp>
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
          <FillUp id="container" as |size|>
            <div id="width">
              width: {{size.width}}
            </div>
            <div id="height">
              height: {{size.height}}
            </div>
          </FillUp>
        </div>
      `);

      assert.equal(find('#width').textContent.trim(), 'width: 20');
      assert.equal(find('#height').textContent.trim(), 'height: 10');
    });

    test('it reports width and height excluding borders', async function(assert) {
      await render(hbs `
        <style>
          #container {
            box-sizing: content-box;

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

        <FillUp id="container" as |size|>
          <div id="width">
            width: {{size.width}}
          </div>
          <div id="height">
            height: {{size.height}}
          </div>
        </FillUp>
      `);

      assert.equal(find('#width').textContent.trim(), 'width: 200');
      assert.equal(find('#height').textContent.trim(), 'height: 100');
    });

    test('it detects changes in width and height', async function(assert) {
      await render(hbs `
        <style>
          #container {
            width: 100px;
            height: 125px;
          }
        </style>

        <FillUp id="container" as |size|>
          <div id="width">
            width: {{size.width}}
          </div>
          <div id="height">
            height: {{size.height}}
          </div>
        </FillUp>
      `);

      assert.equal(find('#width').textContent.trim(), 'width: 100');
      assert.equal(find('#height').textContent.trim(), 'height: 125');

      let container = find("#container");
      container.style.width = "300px";
      container.style.height = "600px";

      await waitForSizeChange();

      assert.equal(find('#width').textContent.trim(), 'width: 300');
      assert.equal(find('#height').textContent.trim(), 'height: 600');
    });
  });

  module('curly component invokation', function() {
    test("it renders", async function(assert) {
      await render(hbs`
        <style>
          .ember-fill-up {
            width: 100px;
            height: 125px;
          }
        </style>

        {{#fill-up as |size|}}
          <div id="width">
            width: {{size.width}}
          </div>
          <div id="height">
            height: {{size.height}}
          </div>
        {{/fill-up}}
      `);

      assert.equal(find("#width").textContent.trim(), "width: 100");
      assert.equal(find("#height").textContent.trim(), "height: 125");

      let container = find(".ember-fill-up");
      container.style.width = "300px";
      container.style.height = "600px";

      await waitForSizeChange();

      assert.equal(find("#width").textContent.trim(), "width: 300");
      assert.equal(find("#height").textContent.trim(), "height: 600");
    });

    test("it supports additional classes via `classNames`", async function(assert) {
      await render(hbs`
        <style>
          #container {
            width: 100px;
            height: 125px;
          }

          .additional-class {
            width: 100%;
            height: 100%;
          }
        </style>

        <div id="container">
          {{#fill-up classNames="additional-class" as |size|}}
            <div id="width">
              width: {{size.width}}
            </div>
            <div id="height">
              height: {{size.height}}
            </div>
          {{/fill-up}}
        </div>
      `);

      assert.equal(find("#width").textContent.trim(), "width: 100");
      assert.equal(find("#height").textContent.trim(), "height: 125");
    });
  });

  module('breakpoint definitions', function() {
    test("it sets breakpoint results as attrs on the element", async function(assert) {
      this.set("breakpoints", [gt(50, "greater-than-50")]);

      await render(hbs`
        <style>
          .container {
            width: 100px;
            height: 125px;
          }
        </style>

        <div class="container">
          <FillUp @breakpoints={{this.breakpoints}}>
            Hello world
          </FillUp>
        </div>
      `);

      assert.equal(
        find(".ember-fill-up").getAttribute("fill-up-greater-than-50"),
        "true"
      );
    });

    test("it yields breakpoint results from external definition", async function(assert) {
      this.set("breakpoints", [gt(50, "greater-than-50")]);

      await render(hbs`
        <style>
          .container {
            width: 100px;
            height: 125px;
          }
        </style>

        <div class="container">
          <FillUp @breakpoints={{this.breakpoints}} as |F|>
            breakpoints-greater-than-50: {{F.breakpoints.greater-than-50}}
          </FillUp>
        </div>
      `);

      assert.equal(find('.ember-fill-up').textContent.trim(), 'breakpoints-greater-than-50: true');
    });

    test("it yields breakpoint results from helper definition", async function(assert) {
      await render(hbs`
        <style>
          .container {
            width: 100px;
            height: 125px;
          }
        </style>

        <div class="container">
          <FillUp @breakpoints={{array (fill-up-gt 50 label="greater-than-50")}} as |F|>
            breakpoints-greater-than-50: {{F.breakpoints.greater-than-50}}
          </FillUp>
        </div>
      `);

      assert.equal(find('.ember-fill-up').textContent.trim(), 'breakpoints-greater-than-50: true');
    });
  });

  module('#onChange', function() {
    test('it can use an onChange callback when things change', async function(assert) {
      const onChange = sinon.stub();
      this.set('onChange', onChange);

      await render(hbs`
        <style>
          .container {
            width: 100px;
            height: 125px;
          }

          .ember-fill-up {
            height: 100%;
          }
        </style>

        <div class="container">
          <FillUp @onChange={{this.onChange}} @breakpoints={{array (fill-up-gt 50 label="greater-than-50")}} as |F|>
            Hello World!
          </FillUp>
        </div>
      `);

      assert.equal(onChange.callCount, 2);

      const firstCallArg = onChange.firstCall.args[0];
      const secondCallArg = onChange.secondCall.args[0];

      assert.equal(firstCallArg.width, null);
      assert.equal(firstCallArg.height, null);
      assert.notOk(firstCallArg.element);
      assert.equal(firstCallArg.breakpoints, null);

      assert.equal(secondCallArg.width, 100);
      assert.equal(secondCallArg.height, 125);
      assert.ok(secondCallArg.element);
      assert.deepEqual(secondCallArg.breakpoints, {
        'greater-than-50': true
      });
    });
  })
});
