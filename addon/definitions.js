import { assert } from '@ember/debug';

import {
  lt as _lt,
  lte as _lte,
  gt as _gt,
  gte as _gte,
  eq as _eq,
  betweenRightClosed
} from './utils';

function buildDefinition(comparisonFunction, dimension = 'width') {
  dimension = typeof dimension === 'string' ? dimension.toLowerCase() : dimension;

  assert(
    `Breakpoint definition dimensions must be a string defined as 'width' or 'height', received ${dimension}`,
    dimension === 'width' || dimension === 'height'
  );

  return {
    comparison: comparisonFunction,
    dimension
  };
}

export function lt(definedValue, { dimension } = {}) {
  return buildDefinition(value => _lt(value, definedValue), dimension);
}

export function lte(definedValue, { dimension } = {}) {
  return buildDefinition(value => _lte(value, definedValue), dimension);
}

export function gt(definedValue, { dimension } = {}) {
  return buildDefinition(value => _gt(value, definedValue), dimension);
}

export function gte(definedValue, { dimension } = {}) {
  return buildDefinition(value => _gte(value, definedValue), dimension);
}

export function eq(definedValue, { dimension } = {}) {
  return buildDefinition(value => _eq(value, definedValue), dimension);
}

export function between(firstDefined, secondDefined, { dimension } = {}) {
  return buildDefinition(
    value => betweenRightClosed(value, firstDefined, secondDefined),
    dimension
  );
}

export function definitionsMap({ width, height }, definitions) {
  return Object.keys(definitions).reduce((map, breakpointLabel) => {
    const { comparison, dimension } = definitions[breakpointLabel];
    const currentValue = dimension === 'width' ? width : height || 0;

    return {
      ...map,
      [breakpointLabel]: comparison(currentValue)
    };
  }, {});
}
