import Component from '@ember/component';
import layout from './template';
import { size } from 'ember-fill-up';

export default Component.extend({
  layout,
  elementSize: size()
});
