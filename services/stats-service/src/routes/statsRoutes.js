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
} = require("../controllers/statsController");

/**
 * @swagger
 * /api/stats/overview:
 *   get:
 *     summary: Get league overview
 *     description: Returns general overview statistics for the league.
 *     responses:
 *       200:
 *         description: Overview data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTeams:
 *                   type: integer
 *                   example: 20
 *                 totalMatches:
 *                   type: integer
 *                   example: 380
 */
router.get("/overview", overview);

/**
 * @swagger
 * /api/stats/standings:
 *   get:
 *     summary: Get league standings
 *     description: Returns the current league standings table.
 *     responses:
 *       200:
 *         description: Standings data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   position:
 *                     type: integer
 *                     example: 1
 *                   team:
 *                     type: string
 *                     example: "Team A"
 *                   points:
 *                     type: integer
 *                     example: 75
 */
router.get("/standings", standings);

/**
 * @swagger
 * /api/stats/team-form:
 *   get:
 *     summary: Get team form
 *     description: Returns recent form (last 5 matches) for each team.
 *     responses:
 *       200:
 *         description: Team form data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   team:
 *                     type: string
 *                     example: "Team A"
 *                   form:
 *                     type: string
 *                     example: "W-W-D-L-W"
 */
router.get("/team-form", teamForm);

/**
 * @swagger
 * /api/stats/home-away:
 *   get:
 *     summary: Get home/away stats
 *     description: Returns statistics for home and away matches for all teams.
 *     responses:
 *       200:
 *         description: Home/away stats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   team:
 *                     type: string
 *                     example: "Team A"
 *                   homeWins:
 *                     type: integer
 *                     example: 10
 *                   awayWins:
 *                     type: integer
 *                     example: 6
 */
router.get("/home-away", homeAway);

/**
 * @swagger
 * /api/stats/leaders:
 *   get:
 *     summary: Get league leaders
 *     description: Returns the top players for goals, assists, and other stats.
 *     responses:
 *       200:
 *         description: Leaders data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   player:
 *                     type: string
 *                     example: "Player A"
 *                   goals:
 *                     type: integer
 *                     example: 20
 *                   assists:
 *                     type: integer
 *                     example: 10
 */
router.get("/leaders", leaders);

/**
 * @swagger
 * /api/stats/streaks:
 *   get:
 *     summary: Get team streaks
 *     description: Returns winning or losing streaks of teams.
 *     responses:
 *       200:
 *         description: Streaks data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   team:
 *                     type: string
 *                     example: "Team A"
 *                   streak:
 *                     type: string
 *                     example: "W-W-W-L"
 */
router.get("/streaks", streaks);

/**
 * @swagger
 * /api/stats/h2h:
 *   get:
 *     summary: Get head-to-head stats
 *     description: Returns head-to-head match statistics between teams.
 *     responses:
 *       200:
 *         description: Head-to-head data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   homeTeam:
 *                     type: string
 *                     example: "Team A"
 *                   awayTeam:
 *                     type: string
 *                     example: "Team B"
 *                   homeGoals:
 *                     type: integer
 *                     example: 2
 *                   awayGoals:
 *                     type: integer
 *                     example: 1
 */
router.get("/h2h", headToHead);

module.exports = router;
