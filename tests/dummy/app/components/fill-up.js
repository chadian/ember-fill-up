import Component from '@ember/component';
import layout from '../templates/components/fill-up';
import { fillUp } from 'ember-fill-up';

export default Component.extend({
  layout,

  dimensions: fillUp(function() {
    let element = this.get('element');

    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    }
  })
});
