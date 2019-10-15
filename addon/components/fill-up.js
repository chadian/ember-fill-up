import Component from '@ember/component';
import layout from '../templates/components/fill-up';
import { definitionsMap } from '../definitions';

export default Component.extend({
  layout,

  tagName: '',

  // public args
  attributePrefix: 'fill-up-',
  onChange: () => {},

  // yieldables
  fillUpElement: null,
  width: null,
  height: null,
  breakpointsMap: null,

  onElementChange(element) {
    if (element) {
      const width = element.clientWidth;
      const height = element.clientHeight;

      this.set('fillUpElement', element);
      this.set('width', width);
      this.set('height', height);

      this.triggerOnChangeHandler();
      this.handleBreakpointChanges();
    }
  },

  triggerOnChangeHandler() {
    if (typeof this.onChange !== 'function') {
      return;
    }

    this.onChange({
      element: this.fillUpElement,
      width: this.width,
      height: this.height,
      breakpoints: this.breakpointsMap
    });
  },

  handleBreakpointChanges() {
    if (this.breakpoints) {
      const dimensions = { width: this.width, height: this.height };
      const map = definitionsMap(dimensions, this.breakpoints);

      this.set('breakpointsMap', map);

      // make changes to element
      for (const key in map) {
        const breakpointIsSet = map[key];
        if (breakpointIsSet) {
          this.fillUpElement.setAttribute(this.attributePrefix + key, '');
        } else {
          this.fillUpElement.removeAttribute(this.attributePrefix + key);
        }
      }
    }
  }
});
