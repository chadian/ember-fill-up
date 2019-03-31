import Component from '@ember/component';
import layout from '../templates/components/comparison-computed';
import {
  WIDTH,
  HEIGHT,
  greaterThan,
  lessThan,
  equalTo
} from "ember-fill-up";

const COMPARISON_PIXEL_VALUE = 500;

export default Component.extend({
  layout,

  comparisonValue: COMPARISON_PIXEL_VALUE,

  greaterThanWidth: greaterThan('comparisonValue'),
  greaterThanHeight: greaterThan('comparisonValue', HEIGHT),
  lessThanWidth: lessThan('comparisonValue'),
  lessThanHeight: lessThan('comparisonValue', HEIGHT),
  equalToWidth: equalTo('comparisonValue'),
  equalToHeight: equalTo('comparisonValue', HEIGHT),


  // explicit computed width's by constant
  greaterThanWithWidthConstant: greaterThan('comparisonValue', WIDTH),
  lessThanWithWidthConstant: lessThan('comparisonValue', WIDTH),
  equalToWithWidthConstant: equalTo('comparisonValue', WIDTH),
});
