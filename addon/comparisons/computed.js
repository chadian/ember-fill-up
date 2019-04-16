import SizeProperty from '../-property';
import {
  gt,
  lt,
  eq
} from './helpers';

export let WIDTH = Symbol();
export let HEIGHT = Symbol();

let defaultPropertyFn = element => element;

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

export let sizeChange = (fn) => new SizeProperty(typeof fn === 'function' ? fn : defaultPropertyFn);

export let size = () => new SizeProperty(element => {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  }
});

export let greaterThan = dimensionComparison(gt);
export let lessThan = dimensionComparison(lt);
export let equalTo = dimensionComparison(eq);
