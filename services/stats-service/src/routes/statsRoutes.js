// routes/stats.routes.js
const express = require("express");
const router = express.Router();
const { overview } = require("../controllers/statsController");

router.get("/overview", overview);

module.exports = router;
