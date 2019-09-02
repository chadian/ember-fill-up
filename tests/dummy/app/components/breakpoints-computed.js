import Component from '@ember/component';
import layout from '../templates/components/breakpoints-computed';
import {
  lt,
  gt,
  breakpointClassNames
} from "ember-fill-up/breakpoints";

export default Component.extend({
  layout,

  classNames: 'breakpoints-computed',
  classNameBindings: 'breakpoints',

  breakpoints: breakpointClassNames(
    gt(200, 'greater-than-200'),
    lt(400, 'less-than-400')
  )
});
