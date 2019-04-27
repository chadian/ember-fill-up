import SizeProperty from '../-property';
import {
  gt,
  lt,
  eq
} from './helpers';

export let WIDTH = Symbol();
export let HEIGHT = Symbol();

let dimensionComparison = (compareFunction) => ((comparisonProperty, dimension = WIDTH) => {
  return new SizeProperty(comparisonProperty, function (element) {
    let number = Number(this.get(comparisonProperty));

    if (Number.isNaN(number)) {
      return false;
    }

    let dimensionValue = element[dimension === WIDTH ? 'offsetWidth' : 'offsetHeight'];
    return compareFunction(dimensionValue, number);
  });
});

export let sizeChange = (...args) => {
  let fn = args.pop() || (element => element);
  let properties = args;

  return new SizeProperty(...properties, fn);
};

export let size = () => new SizeProperty(element => {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  }
});

export let greaterThan = dimensionComparison(gt);
export let lessThan = dimensionComparison(lt);
export let equalTo = dimensionComparison(eq);
