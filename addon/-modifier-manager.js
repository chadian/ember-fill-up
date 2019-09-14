export default class FillUpModifierManager {
  constructor(owner) {
    this.owner = owner;
    this.detector = owner.lookup('resize-detector:resize-observer');
  }

  createModifier(factory, args) {
    const instance = factory.create(args.named);
    instance.onChange = args.named.onChange;

    return instance;
  }

  installModifier(instance, element/*, args*/) {
    instance.element = element;
    instance.detector = this.detector;

    if (instance.onChange) {
      instance.detector.listenTo(element, instance.onChange);
      instance.onChange(element);
    }
  }

  destroyModifier(instance) {
    if (instance.onChange) {
      this.detector.removeListener(instance.element, instance.onChange);
    }
  }
}
