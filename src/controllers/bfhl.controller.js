const { successResponse } = require("../utils/response");
const { getFibonacciSeries } = require("../services/fibonacci.service");
const { getPrimeNumbers } = require("../services/prime.service");
const { getLcm } = require("../services/lcm.service");
const { getHcf } = require("../services/hcf.service");
const { getSingleWordAIResponse } = require("../services/ai.service");
const { assertNonEmptyIntegerArray } = require("../utils/validators");

const handleBfhl = async (req, res, next) => {
  try {
    const body = req.body || {};
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      throw new Error("Request body must contain exactly one key");
    }

    const key = keys[0];

    if (key === "fibonacci") {
      return res.status(200).json(successResponse(getFibonacciSeries(body.fibonacci)));
    }

    if (key === "prime") {
      assertNonEmptyIntegerArray(body.prime, "prime");
      return res.status(200).json(successResponse(getPrimeNumbers(body.prime)));
    }

    if (key === "lcm") {
      assertNonEmptyIntegerArray(body.lcm, "lcm");
      return res.status(200).json(successResponse(getLcm(body.lcm)));
    }

    if (key === "hcf") {
      assertNonEmptyIntegerArray(body.hcf, "hcf");
      return res.status(200).json(successResponse(getHcf(body.hcf)));
    }

    if (key === "AI") {
      const answer = await getSingleWordAIResponse(body.AI);
      return res.status(200).json(successResponse(answer));
    }

    throw new Error("Invalid key. Use one of: fibonacci, prime, lcm, hcf, AI");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  handleBfhl,
};