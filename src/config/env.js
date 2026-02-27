const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  officialEmail: process.env.OFFICIAL_EMAIL || "YOUR CHITKARA EMAIL",
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
};
