const { isInteger } = require("../utils/validators");

const isPrime = (num) => {
  if (!isInteger(num) || num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(num));
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

const getPrimeNumbers = (numbers) => numbers.filter(isPrime);

module.exports = {
  getPrimeNumbers,
};