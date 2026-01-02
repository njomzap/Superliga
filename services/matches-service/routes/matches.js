const express = require("express");
const {
  getLatestMatches,
  getMatchesByTeam,
  getMatchesByDate,
} = require("../controllers/matchesController");

const router = express.Router();

router.get("/", getLatestMatches);
router.get("/team/:team", getMatchesByTeam);
router.get("/date/:date", getMatchesByDate);

module.exports = router;
