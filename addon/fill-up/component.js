import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  tagName: '',

  width: null,
  height: null,

  onElementChange(element) {
    if (element) {
      this.set('width', element.offsetWidth);
      this.set('height', element.offsetHeight);
    }
  }
});
