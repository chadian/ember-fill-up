// export function breakpoints(...definitions) {
//   // return a computed property that can take the definitions
//   // and determine what to return...
//   // a hash of true or false of labels on whether or not they match the condition


//   return;
// }

export function to(toValue, label) {
  return _meta({ label, value: toValue, comparison: x => x <= toValue });
}

export function from(fromValue, label) {
  return _meta({ label, value: fromValue, comparison: x => x >= fromValue });
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
      comparison = x => rightClosedBetween(x, previousDefinition.value, definition.value);
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

// right-closed refers to a right-closed interval, meaning:
// the value can not equal the larger right-sided number
function rightClosedBetween(value, num1, num2) {
  let sorted = [num1, num2].sort((a, b) => a - b);
  return value >= sorted[0] && value < sorted[1];
}
