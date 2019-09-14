import EmberObject from "@ember/object";

export function initialize(application) {
  application.register(
    "resize-detector:resize-observer",
    EmberObject.extend({
      init() {
        this.set("observers", new WeakMap());
      },

      listenTo(element, handler) {
        const resizeObserver = new ResizeObserver(([{ target: element }]) =>
          handler(element)
        );
        resizeObserver.observe(element);
        let observers = this.observers.get(handler);

        if (!observers) {
          observers = [];
          this.observers.set(handler, observers);
        }

        observers.push(resizeObserver);
      },

      removeListener(element, handler) {
        const observers = this.observers.get(handler);
        observers.forEach(observer => observer.unobserve(element));
      }
    })
  );
}

export default {
  initialize
};
