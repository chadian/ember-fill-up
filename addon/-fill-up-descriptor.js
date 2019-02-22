
import ComputedProperty from "@ember/object/computed";
import resizeDectectorFactory from "element-resize-detector";
import { get } from "@ember/object";
import { assert } from "@ember/debug";

export default class FillUpProperty extends ComputedProperty {
  constructor(propertyFn) {
    let propertyInstance;

    super(function(property) {
      let componentContext = this;

      assert(
        "Must be used on a component",
        get(componentContext, "isComponent") === true
      );

      componentContext.on('didInsertElement', propertyInstance.componentSetup.bind(propertyInstance, componentContext, property));
      componentContext.on('willDestroyElement', propertyInstance.componentTeardown.bind(propertyInstance, componentContext));

      return propertyFn.call(componentContext);
    });

    propertyInstance = this;
    this.detector = resizeDectectorFactory();
    this.propertyFn = propertyFn;
  }

  componentSetup(component, property) {
    debugger;

    let element = get(component, 'element');

    assert(
      "Make sure you aren't using a tagless component (`tagName: '') otherwise fillUp cannot measure the container",
      Boolean(element)
    );

    this.detector.removeAllListeners(element);
    this.detector.listenTo(element, component.notifyPropertyChange.bind(component, property));
  }

  componentTeardown(component) {
    let element = get(component, 'element');
    this.detector.uninstall(element);
  }
}
