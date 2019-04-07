
import ComputedProperty from "@ember/object/computed";
import resizeDectectorFactory from "element-resize-detector";
import { get, getWithDefault } from "@ember/object";
import { assert } from "@ember/debug";

export default class SizeProperty extends ComputedProperty {
  constructor(...args) {
    let propertyInstance;

    // last argument should be the propertyFn
    let propertyFn = args.pop();

    // remaining arguments should be the dependent keys
    let dependentKeys = args;

    // function calls happen when:
    //   * there is a get of the attached property
    //   * `notifyPropertyChange` of this property
    //   * one of the watched properties changes
    function propertyFunctionWrapper(property) {
      let componentContext = this;

      assert(
        "Must be used on a component",
        get(componentContext, "isComponent") === true
      );

      // future setup of component setup/teardown
      componentContext.on(
        'didInsertElement',
        propertyInstance.componentSetup.bind(propertyInstance, componentContext, property)
      );

      componentContext.on(
        'willDestroyElement',
        propertyInstance.componentTeardown.bind(propertyInstance, componentContext)
      );

      // call propertyFn whose value ends up being the value of the
      // property
      let element = getWithDefault(componentContext, 'element', null);
      return propertyFn.call(componentContext, element);
    }

    super(propertyFunctionWrapper, { dependentKeys });

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
    this.detector.listenTo(element, () => component.notifyPropertyChange(property));
  }

  componentTeardown(component) {
    let element = get(component, 'element');
    this.detector.removeAllListeners(element);
  }

  teardown(...args) {
    super.teardown(...args);
    this.detector.uninstall();
    this.detector = null;
  }
}
