import ResizeObserver from 'resize-observer-polyfill';

export function initialize() {
  if (!window.ResizeObserver) {
    // eslint-disable-next-line no-console
    console.info(
      'initializer:setup-resize-detector-polyfill: ResizeObserver not found. Polyfilling...'
    );
    window.ResizeObserver = ResizeObserver;
  }
}

export default {
  initialize
};
