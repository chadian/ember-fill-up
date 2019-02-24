
import ComputedProperty from "@ember/object/computed";
import resizeDectectorFactory from "element-resize-detector";
import { get, getWithDefault } from "@ember/object";
import { assert } from "@ember/debug";

export default class SizeProperty extends ComputedProperty {
  constructor(propertyFn) {
    let propertyInstance;

    // function calls happen on any get of the attached property
    // or on `notifyPropertyChange`.
    super(function parentPropertyFunction(property) {
      let componentContext = this;

      assert(
        "Must be used on a component",
        get(componentContext, "isComponent") === true
      );

      // future handling of attached component/teardown
      componentContext.on('didInsertElement', propertyInstance.componentSetup.bind(propertyInstance, componentContext, property));
      componentContext.on('willDestroyElement', propertyInstance.componentTeardown.bind(propertyInstance, componentContext));

      // call propertyFn whose value ends up being the value of the
      // property
      let element = getWithDefault(componentContext, 'element', null);
      return propertyFn.call(componentContext, element);
    });

    propertyInstance = this;
    this.detector = resizeDectectorFactory();
    this.propertyFn = propertyFn;
  }

  componentSetup(component, property) {
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
