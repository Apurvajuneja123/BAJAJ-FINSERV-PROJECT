const { officialEmail } = require("../config/env");

const handleHealth = (_req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: officialEmail,
  });
};

module.exports = {
  handleHealth,
};