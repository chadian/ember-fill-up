⛽️ ember-fill-up [![Build Status](https://travis-ci.org/chadian/ember-fill-up.svg?branch=master)](https://travis-ci.org/chadian/ember-fill-up)
==============================================================================

This addon gives you tools to help you create responsive components that are
easier to develop, test, and use.

Instead of using media queries `ember-fill-up` focuses on using container
queries. Container queries, also known as element queries, end up being more powerful
especially when building out responsive components. You can get the general idea of Container
Queries from this [article](https://alistapart.com/article/container-queries-once-more-unto-the-breach/), however it should be noted that this addon tries to achieve the same result in an Ember Way™️ with components.

This addon does not aim at providing support for the [custom css element
queries syntax](https://tomhodgins.github.io/element-queries-spec/element-queries.html),
however with this addon you should be able to achieve many of the same solutions in
designing your responsive components.

`ember-fill-up` detects changes on elements by using a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). If your browser doesn't
[support](https://caniuse.com/#feat=resizeobserver) `ResizeObserver` then you may need to install a polyfill.

Check out the motivations and ideas behind `ember-fill-up` in my [talk at EmberFest 2019](https://www.youtube.com/watch?v=RIdjk9_RSBY).

Demo
------------------------------------------------------------------------------
Check out the [demo app](https://chadian.github.io/ember-fill-up/) (currently
requires a browser that [supports `ResizeObserver`](https://caniuse.com/#feat=resizeobserver))

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-fill-up
```

If your browser does not [support](https://caniuse.com/#feat=resizeobserver) `ResizeObserver` natively then you will need to install a polyfill. There are a few options that
you can try ([1](https://github.com/que-etc/resize-observer-polyfill), [2](https://github.com/juggle/resize-observer)).


## Polyfill Example

For this example we can set up the `que-etc/resize-observer-polyfill` polyfill with
our dummy app.

First we install the polyfill dependencies:
```
npm install resize-observer-polyfill
```

Then we create an intializer:
```
ember g initializer setup-resize-detector-polyfill
```

Inside the initializer file `app/initializers/setup-resize-detector-polyfill.js` we add the `ResizeObserver` polyfill when it doesn't exist:
```js
import ResizeObserver from 'resize-observer-polyfill';

export function initialize() {
  if (!window.ResizeObserver) {
    // eslint-disable-next-line no-console
    console.info(
      'initializer:setup-resize-detector-polyfill: ResizeObserver not found. Polyfilling...'
    );
    window.ResizeObserver = ResizeObserver;
  }
}

export default {
  before: 'register-resize-observer-detector',
  initialize
};
```

Note: To be able to import from npm packages like this you maybe need to install [`ember-auto-import`](https://github.com/ef4/ember-auto-import) in your app.

Your app should be all set now for older browsers that don't support `ResizeObserver`. As an example, the dummy app of this addon has been [setup](https://github.com/chadian/ember-fill-up/blob/master/tests/dummy/app/initializers/setup-resize-detector-polyfill.js) with this initializer.


Usage
------------------------------------------------------------------------------

### Fill Up primatives

1. `{{fill-up}}` element modifier
The element modifier can be placed on any element and a resize detector will
be installed on it. Anytime a change is detected on that element the `onChange`
callback is called.

```hbs
<div {{fill-up onChange=this.changeHandler}}>
</div>
```

The `changeHandler` in this example will receive a single argument which is
the element on which the change occured.

2. `<FillUp />` component
The `<FillUp />` component is using the element modifier behind the scenes, and provides
additional niceties making it easier to manage detected changes.

One fundamental difference is that the component between the component and the element modifier is that the component has a root element where all content from the component's block is put. It's changes from this root element that are being tracked.

### Using the `<FillUp />` component
The `<FillUp />` component is pretty useful and abstracts away the element modifier while its api provides several handy responsive features.

#### `breakpoints`
The breakpoints can be passed in via definitions defined by template helpers in the template
or by functional definitions defined in javascript. It should be noted that all breakpoint
values here are using numbers represented by pixel values.

##### Breakpoint definitions
* gt(value [, options])
  * `@param {number} value` - The value to test whether or not the dimension is greater than
* gte(value [, options])
  * `@param {number} value` - The value to test whether or not the dimension is greater than or equal to
* lt(value [, options])
  * `@param {number} value` - The value to test whether or not the dimension is less than
* lte(value [, options])
  * `@param {number} value` - The value to test whether or not the dimension is less than or equal to
* eq(value [, options])
  * `@param {number} value` - The value to test whether or not the dimension is equal to
* between(inclusiveLowerBound, exclusiveUpperBound [, options])
  * `@param {number} inclusiveLowerBound` - The (inclusive) lowerbound to compare if the value is greater than or equal to.
  * `@param {number} exclusiveUpperBound` - The (exclusive) upperbound to compare if the value is less than.

All definitions accept an optional `options` argument. For examples on how to specify these for the template helpers or functional javascript breakpoint definitions check out the example
`tall` breakpoint in the sections below.
`options`
  * `@param {Object} [options]` - (optional) Options that can be passed to provide additional context to the defintion, currently only used for specifying the dimension.
  * `@param {"width"|"height"} [options.dimension="width"]` - (optional) Passing in a key of `dimension` with a value of `width` or `height` will specify which dimension the breakpoint definition is for. By default, if no options are passed in, the `"width"` dimension will be used.

##### Template helper breakpoint definitions (defined in the template)
```hbs
  <FillUp
    @breakpoints={{hash
      small=(fill-up-lte 500)
      large=(fill-up-gt 500)
      tall=(fill-up-gt 700 dimension="height")
    }}
  ></FillUp>
```

##### Functional breakpoint definitions (defined in javascript):
```js
import { lte, gt } from 'ember-fill-up/definitions';

// ...
// on the component definition:

    breakpoints: {
      small: lte(400),
      large: gt(400),
      tall: gt(700, { dimension: 'height' })
    }
```

With the definition on your component on the `breakpoints` property they
can then be passed into the `@breakpoints` argument on the `<FillUp />` component.

```hbs
  <FillUp @breakpoints={{this.breakpoints}}>
```

#### `@breakpoints` argument
Any breakpoint definitions passed in to the `@breakpoints` argument of the `<FillUp />`
component will be turned into attribute labels on the component's root div element when
those breakpoints are active.

For example:
```hbs
  <FillUp
    @breakpoints={{hash
      small=(fill-up-lte 500)
    }}
  ></FillUp>
```

would end up with the following root element, *only when the small breakpoint is active*:
```html
<div [fill-up-small]></div>
```

You can also override the `fill-up` prefix seen here in the attribute `fill-up-small`, by
specifying an `@attributePrefix` argument on the component.

For example:
```hbs
  <FillUp
    @attributePrefix="bp-"
    @breakpoints={{hash
      small=(fill-up-lte 500)
    }}
  ></FillUp>
```

would end up with the attribute prefix `bp-small`:
```html
<div [bp-small]></div>
```

#### `onChange` handler
The `changeHandler` passed to `onChange` on the component will be called
whenever a size change is detected on component's root element.
The `onChange` on the `<FillUp>` component is different than the one on the
element modifier, it receives an object with additional useful properties.

Example:
```hbs
<FillUp onChange={{changeHandler}}></FillUp>
```

`onChange(change)`
  * `@param {Object} change` - The change object containing useful items relevant to the change
  * `@param {string} change.element` - The element from which a size change was detected
  * `@param {string} change.width` - The `clientWidth` of the changed element
  * `@param {string} change.height` - The `clientHeight` of the changed element
  * `@param {Object.<string, boolean>} change.breakpoints` - If breakpoints were passed in,
  this would represent a hash of breakpoint labels assigned to a boolean representing whether
  or not the breakpoint is active for the current change.

#### FillUp Block Param
The component also yields a useful block param, in this example, denoted by `F`: `<FillUp as |F|></FillUp>`. This block param provides useful information of the most recent change.

`|F|` block param
  * `@param {Object} F` - The last change object containing useful items relevant to the change
  * `@param {string} F.element` - The element from which a size change was detected
  * `@param {string} F.width` - The `clientWidth` of the changed element
  * `@param {string} F.height` - The `cleintHeight` of the changed element
  * `@param {Object.<string, boolean>} F.breakpoints` - If breakpoints were passed in,
  this would represent a hash of breakpoint labels assigned to a boolean representing whether
  or not the breakpoint is active for the current change.

#### Passing attributes
Any attributes specified on the `<FillUp />` component will be "splatted" on the component's
root div.

For example:
```hbs
<FillUp class="hello-friends"></FillUp>
```

Results in the component's root div element receiving the class:
```hbs
<div class="ember-fill-up hello-friends"></div>
```

This applies for other attributes that you might want to set on the root element.

Note: This only applies to the angle-bracket invokation of the component, see below
for the limtiations related to the cury-bracket usage.

#### Curly-Bracket Usage
The curly bracket invokation of the fill-up component will also work with the examples
in this documentation with the one exception of being able to "splat" attributes.
In this case the only attribute that can be set are classes via the `classNames` argument
(which should only be used for the curly-bracket invokation of the fill-up component)

```hbs
{{#fill-up classNames="hello-friends"}}
{{/fill-up}}
```

Results with the root div element receiving the class:
```hbs
<div class="ember-fill-up hello-friends"></div>
```

### Responsive Component Strategies
As a way of getting started you could consider one of following three strategies
for making a responsive component.

1. CSS Breakpoint Selectors
(see the <Article /> example in the dummy demo app)

By passing in a class and using the active attributes available on the root element of the `<FillUp />` component you can use CSS selectors to style things appropriately.

In this example we've passed in a class of `my-component` and a single breakpoint for
when a breakpoint is greater than 500 pixels. In our css below, by default, there is a
`font-size` of `15px` for this component using the `my-component` class. When the
attribute `[fill-up-large`] is applied when the `large` breakpoint is active the
`.my-component[fill-up-large]` selector will apply, changing the `font-size` to `50px`.

```hbs
  <FillUp
    class="my-component"
    @breakpoints={{hash
      large=(fill-up-gt 500)
    }}
  ></FillUp>
```

```css
.my-component {
  font-size: 15px;
}

.my-component[fill-up-large] {
  font-size: 50px;
}
```

2. Responsive Sprinkles
(see the <Weather /> example in the dummy demo app)

The idea behind this technique is to use the yielded block param and use the
necessary breakpoint information conditionally where applicable.

```hbs
  <FillUp
    @breakpoints={{hash
      small=(fill-up-lte 500)
      large=(fill-up-gt 500)
    as |F|
    }}
  >
    {{#if F.breakpoints.small}}
      Look this will only be rendered when
      the small breakpoint is active.
    {{/if}}

    This will always be rendered!

    {{#if F.breakpoint.large}}
      This is shown when we have an active large breakpoint!
    {{/if}}

  </FillUp>
```

3. Component Swap
(see the <GithubCard /> example in the dummy demo app)

In the case you have components that need to look radically different given a
breakpoint it might be easier to use child components and swap between them.

Here we would have a main `<Greeting />` component, with three child components:
* `<Greeting::Small />`
* `<Greeting::Medium />`
* `<Greeting::Large />`

When the `<Greeting />` component is rendered, depending on which breakpoint is
active, it will use the corresponding child component.
It's important in this case to try and create symmetry between the component
arguments and the data available to each of children components. In this case
our parent `<Greeting />` receives a `@model` argument that we're passing
along to each of the chldren components.

`greeting.hbs`:
```hbs
<FillUp
  @breakpoints={{hash
    small=(fill-up-between 0 800)
    medium=(fill-up-between 800 1200)
    large=(fill-up-gte 1200)
  }}
as |F|>
  {{#if F.breakpoints.large}}
    <Greeting::Large model={{@model}}/>
  {{else if F.breakpoints.medium}}
    <Greeting::Medium model={{@model}}/>
  {{else}}
    <Greeting::Small model={{@model}}/>
  {{/if}}
</FillUp>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


### Thanks!
I want to thanks others who have worked on the concept of container and element queries before. Their work has made for invaluable reference in exploring the idea and current options.

* Lucas Wiener * - [`element-resize-detector`](https://github.com/wnr/element-resize-detector)
* Sean Matheson - [`react-sizeme`](https://github.com/ctrlplusb/react-sizeme)
* Marc J. Schmidt - [`css-element-queries`](https://github.com/marcj/css-element-queries)
* Andrey Mikhaylov - [`ember-element-query`](https://github.com/lolmaus/ember-element-query)

\* Lucas Wiener, Tomas Ekholm, and Philipp Haller also authored an [excellent paper](https://arxiv.org/pdf/1511.01223v1.pdf) summarizing the differences in detecting changes in element sizes. I highly encourage reading it over.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
