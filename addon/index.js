import SizeProperty from './-property';

let defaultPropertyFn = element => element;

export let sizeChange = (fn) => new SizeProperty(fn || defaultPropertyFn);

export let size = () => new SizeProperty(element => {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  }
});
