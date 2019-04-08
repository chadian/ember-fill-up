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
    let { label, comparison } = definition;

    let previousDefinition = definitions[ i - 1 ] || {};
    let nextDefinition = definitions[ i + 1 ] || {};

    // will be backfilled on next iteration
    if (nextDefinition.continuation) {
      return matchHash;
    }

    let result;

    if (definition.continuation || previousDefinition.continuation) {
      comparison = x => between(x, previousDefinition.value, definition.value);
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

function between(value, num1, num2) {
  let sorted = [num1, num2].sort();
  return value >= sorted[0] && value <= sorted[1];
}
