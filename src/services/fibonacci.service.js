const { isInteger } = require("../utils/validators");

const getFibonacciSeries = (count) => {
  if (!isInteger(count) || count < 0) {
    throw new Error("fibonacci must be a non-negative integer");
  }

  if (count === 0) return [];
  if (count === 1) return [0];

  const series = [0, 1];
  while (series.length < count) {
    const len = series.length;
    series.push(series[len - 1] + series[len - 2]);
  }

  return series;
};

module.exports = {
  getFibonacciSeries,
};