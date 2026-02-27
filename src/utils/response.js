const { officialEmail } = require("../config/env");

const successResponse = (data) => ({
  is_success: true,
  official_email: officialEmail,
  data,
});

const errorResponse = (message) => ({
  is_success: false,
  official_email: officialEmail,
  error: message,
});

module.exports = {
  successResponse,
  errorResponse,
};