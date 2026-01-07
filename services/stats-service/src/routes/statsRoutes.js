const express = require("express");
const router = express.Router();
const {
  overview,
  standings,
  teamForm,
  homeAway,
  leaders,
  streaks,
  headToHead,
  userStats // new controller for user-specific stats
} = require("../controllers/statsController");

// Existing routes
router.get("/overview", overview);
router.get("/standings", standings);
router.get("/team-form", teamForm);
router.get("/home-away", homeAway);
router.get("/leaders", leaders);
router.get("/streaks", streaks);
router.get("/h2h", headToHead);

// ------------------ NEW: User-specific stats ------------------
router.get("/user/:userId", userStats);

module.exports = router;
