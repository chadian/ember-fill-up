
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

    // `propertyFunctionWrapper` function called when:
    //   * there is a `get` of the attached property
    //   * `notifyPropertyChange` of this property
    //   * one of the watched properties changes
    function propertyFunctionWrapper(property) {
      let componentContext = this;
      let componentSetup = propertyInstance.componentSetup.bind(propertyInstance, componentContext, property);
      let componentTeardown = propertyInstance.componentTeardown.bind(propertyInstance, componentContext);

      assert(
        "Must be used on a component",
        get(componentContext, "isComponent") === true
      );

      componentContext.on('didInsertElement', componentSetup);
      componentContext.on('willDestroyElement', componentTeardown);

      // call propertyFn whose value ends up being the value of the
      // property
      let element = getWithDefault(componentContext, 'element', null);
      return propertyFn.call(componentContext, element);
    }

    super(propertyFunctionWrapper, { dependentKeys });

    propertyInstance = this;
    this.detector = resizeDectectorFactory();
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
