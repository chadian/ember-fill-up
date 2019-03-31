⛽️ ember-fill-up [![Build Status](https://travis-ci.org/chadian/ember-fill-up.svg?branch=master)](https://travis-ci.org/chadian/ember-fill-up)
==============================================================================

The purpose of this addon is to provide useful primatives to create responsive
designs using the principles behind element queries, also known as  container
queries. `ember-fill-up` is built around `element-resize-detector` to be able to provide updates when an element has changed.

This addon does not aim at providing any support for the [custom css element
queries syntax](https://tomhodgins.github.io/element-queries-spec/element-queries.html).

Installation
------------------------------------------------------------------------------

```
ember install ember-fill-up
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-fill-up`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).


### Thanks!
This addon is made possible by the many people who have worked on the concept
of element queries before. Notably, I have referenced the work from:

* Lucas Wiener * - [`element-resize-detector`](https://github.com/wnr/element-resize-detector)
* Sean Matheson - [`react-sizeme`](https://github.com/ctrlplusb/react-sizeme)
* Marc J. Schmidt - [`css-element-queries`](https://github.com/marcj/css-element-queries)

\* Lucas Wiener, Tomas Ekholm, and Philipp Haller also authored an [excellent paper](https://arxiv.org/pdf/1511.01223v1.pdf) summarizing the differences in detecting changes in element sizes. I highly encourage reading it over.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
