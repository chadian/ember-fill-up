import SizeProperty from '../-property';
import {
  lt as _lt,
  lte as _lte,
  gt as _gt,
  gte as _gte,
  eq as _eq,
  betweenRightClosed
} from '../comparisons/helpers';

export function lt(definedValue, label) {
  return buildDefinition(label, value => _lt(value, definedValue));
}

export function lte(definedValue, label) {
  return buildDefinition(label, value => _lte(value, definedValue));
}

export function gt(definedValue, label) {
  return buildDefinition(label, value => _gt(value, definedValue));
}

export function gte(definedValue, label) {
  return buildDefinition(label, value => _gte(value, definedValue));
}

export function eq(definedValue, label) {
  return buildDefinition(label, value => _eq(value, definedValue));
}

export function between(firstDefined, secondDefined, label) {
  return buildDefinition(label, value => betweenRightClosed(value, firstDefined, secondDefined));
}

function buildDefinition(label, comparisonFunction) {
  return {
    label,
    comparison: comparisonFunction
  }
}

export function definitionClassNames(currentValue, definitions) {
  let classNames = definitions
    .filter(({ comparison }) => comparison(currentValue) === true)
    .map(({ label }) => label)
    .join(' ');

  return classNames;
}

export function breakpointClassNames(...definitions) {
  return new SizeProperty(
    ({ offsetWidth }) => definitionClassNames(offsetWidth, definitions)
  );
}
