import Component from '@ember/component';
import layout from '../templates/components/fill-up';
import { size } from 'ember-fill-up';

export default Component.extend({
  layout,
  elementSize: size()
});
