const express = require("express");
const router = express.Router();
const {
  overview,
  standings,
} = require("../controllers/statsController");

router.get("/overview", overview);
router.get("/standings", standings);

module.exports = router;
