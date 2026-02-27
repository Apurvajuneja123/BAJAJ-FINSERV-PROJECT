const isInteger = (value) => Number.isInteger(value);

const assertNonEmptyIntegerArray = (arr, key) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error(`${key} must be a non-empty integer array`);
  }

  if (!arr.every(isInteger)) {
    throw new Error(`${key} must contain only integers`);
  }
};

module.exports = {
  isInteger,
  assertNonEmptyIntegerArray,
};