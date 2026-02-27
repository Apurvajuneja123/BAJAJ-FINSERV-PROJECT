const { getGcd } = require("./hcf.service");

const getLcmOfTwo = (a, b) => {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / getGcd(a, b));
};

const getLcm = (numbers) => numbers.reduce((acc, value) => getLcmOfTwo(acc, value));

module.exports = {
  getLcm,
};