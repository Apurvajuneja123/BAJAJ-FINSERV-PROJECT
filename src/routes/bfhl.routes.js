const express = require("express");
const { handleBfhl } = require("../controllers/bfhl.controller");

const router = express.Router();

router.post("/bfhl", handleBfhl);

module.exports = router;