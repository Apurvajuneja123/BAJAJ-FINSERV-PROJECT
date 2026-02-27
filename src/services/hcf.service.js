const getGcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x;
};

const getHcf = (numbers) => numbers.reduce((acc, value) => getGcd(acc, value));

module.exports = {
  getGcd,
  getHcf,
};