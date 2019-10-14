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

      this.onChange({
        element: this.fillUpElement,
        width: this.width,
        height: this.height,
        breakpoints: this.breakpointsMap
      });

      if (this.breakpoints) {
        const map = definitionsMap(this.width, this.breakpoints);

        this.set('breakpointsMap', map);

        for (const key in map) {
          const breakpointIsSet = map[key];
          if (breakpointIsSet) {
            element.setAttribute(this.attributePrefix + key, '');
          } else {
            element.removeAttribute(this.attributePrefix + key);
          }
        }
      }
    }
  }
});
