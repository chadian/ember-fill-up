import Component from '@ember/component';
import layout from '../templates/components/fill-up';
import { fillUp } from 'ember-fill-up';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,

  width: readOnly('watchedElement.offsetWidth'),

  watchedElement: fillUp(function() {
    return this.get('element');
  })
});
