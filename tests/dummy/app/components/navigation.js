import Component from '@ember/component';
import layout from '../templates/components/navigation';

export default Component.extend({
  layout,

  tagName: '',
  expanded: false,

  toggle() {
    this.toggleProperty('expanded');
  }
});
