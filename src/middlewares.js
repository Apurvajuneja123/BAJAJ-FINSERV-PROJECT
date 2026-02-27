const { errorResponse } = require("./utils/response");

const notFoundHandler = (_req, res) => {
  res.status(404).json(errorResponse("Route not found"));
};

const errorHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : "Internal server error";
  const statusCode = Number.isInteger(err?.statusCode)
    ? err.statusCode
    : message.includes("Gemini API error")
      ? 502
      : 400;
  res.status(statusCode).json(errorResponse(message));
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
