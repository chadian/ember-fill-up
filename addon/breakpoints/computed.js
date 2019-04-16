import {
  lte,
  gte,
  betweenRightClosed
} from '../comparisons/helpers';

// TODO:
// export function breakpoints(...definitions)

export function to(toValue, label) {
  return _meta({ label, value: toValue, comparison: x => lte(x, toValue) });
}

export function from(fromValue, label) {
  return _meta({ label, value: fromValue, comparison: x => gte(x, fromValue) });
}

export function layer(layeredValue, label) {
  return _meta({ label, continuation: true, value: layeredValue })
}

export function _meta(options) {
  let {
    label = '',
    value,
    comparison = () => {},
    continuation
  } = options;

  return {
    label,
    value,
    comparison,
    continuation
  }
}

export function match(currentValue, definitions) {
  let matchHash = definitions.reduce((matchHash, definition, i) => {
    let previousDefinition = definitions[ i - 1 ] || {};
    let nextDefinition = definitions[ i + 1 ] || {};

    // will be backfilled on next iteration
    if (isStartOfLayer(definition, nextDefinition)) {
      return matchHash;
    }

    let result;
    let {
      label,
      comparison
    } = definition;

    if (definition.continuation || previousDefinition.continuation) {
      comparison = x => betweenRightClosed(x, previousDefinition.value, definition.value);
      label = previousDefinition.label;
    }

    result = comparison(currentValue);

    return Object.assign(
      matchHash,
      label ? { [label]: result } : {}
    );
  }, {});

  return matchHash;
}

function isStartOfLayer(definition, nextDefinition) {
  return !definition.continuation && nextDefinition.continuation;
}
