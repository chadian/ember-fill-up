import Component from '@ember/component';
import layout from '../templates/components/comparison-computed';
import {
  WIDTH,
  HEIGHT,
  greaterThan,
  lessThan,
  isEqualTo
} from "ember-fill-up";

const COMPARISON_PIXEL_VALUE = 500;

export default Component.extend({
  layout,

  comparisonValue: COMPARISON_PIXEL_VALUE,

  greaterThanWidth: greaterThan(COMPARISON_PIXEL_VALUE),
  greaterThanHeight: greaterThan(COMPARISON_PIXEL_VALUE, HEIGHT),
  lessThanWidth: lessThan(COMPARISON_PIXEL_VALUE),
  lessThanHeight: lessThan(COMPARISON_PIXEL_VALUE, HEIGHT),
  isEqualToWidth: isEqualTo(COMPARISON_PIXEL_VALUE),
  isEqualToHeight: isEqualTo(COMPARISON_PIXEL_VALUE, HEIGHT),


  // explicit computed width's by constant
  greaterThanWithWidthConstant: greaterThan(COMPARISON_PIXEL_VALUE, WIDTH),
  lessThanWithWidthConstant: lessThan(COMPARISON_PIXEL_VALUE, WIDTH),
  isEqualToWithWidthConstant: isEqualTo(COMPARISON_PIXEL_VALUE, WIDTH),
});
