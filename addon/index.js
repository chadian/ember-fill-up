import SizeProperty from './-property';

export let WIDTH = Symbol();
export let HEIGHT = Symbol();

let defaultPropertyFn = element => element;

let dimensionComparison = (compareFunction) => ((comparisonProperty, dimension = WIDTH) => {
  return new SizeProperty(comparisonProperty, function(element) {
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

export let greaterThan = dimensionComparison((value, number) => value > number);
export let lessThan = dimensionComparison((value, number) => value < number);
export let equalTo = dimensionComparison((value, number) => value === number);
