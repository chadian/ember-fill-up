import {
  lt as _lt,
  lte as _lte,
  gt as _gt,
  gte as _gte,
  eq as _eq,
  betweenRightClosed
} from "./utils";

function buildDefinition(comparisonFunction) {
  return {
    comparison: comparisonFunction
  };
}

export function lt(definedValue) {
  return buildDefinition(value => _lt(value, definedValue));
}

export function lte(definedValue) {
  return buildDefinition(value => _lte(value, definedValue));
}

export function gt(definedValue) {
  return buildDefinition(value => _gt(value, definedValue));
}

export function gte(definedValue) {
  return buildDefinition(value => _gte(value, definedValue));
}

export function eq(definedValue) {
  return buildDefinition(value => _eq(value, definedValue));
}

export function between(firstDefined, secondDefined) {
  return buildDefinition(value =>
    betweenRightClosed(value, firstDefined, secondDefined)
  );
}

export function definitionsMap(currentValue, definitions) {
  return Object.keys(definitions)
    .reduce((map, breakpointLabel) => {
      const { comparison } = definitions[breakpointLabel];
      return {
        ...map,
        [breakpointLabel]: comparison(currentValue)
      };
    }, {});
}
