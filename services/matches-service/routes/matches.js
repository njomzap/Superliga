const express = require("express");
const {
  getLatestMatches,
  getMatchesByTeam,
  getMatchesByDate,
} = require("../controllers/matchesController");

const router = express.Router();

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get latest matches
 *     description: Returns a list of the latest matches.
 *     responses:
 *       200:
 *         description: List of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   homeTeam:
 *                     type: string
 *                     example: "Team A"
 *                   awayTeam:
 *                     type: string
 *                     example: "Team B"
 *                   date:
 *                     type: string
 *                     example: "2026-01-10"
 */
router.get("/", getLatestMatches);

/**
 * @swagger
 * /api/matches/team/{team}:
 *   get:
 *     summary: Get matches by team
 *     description: Returns all matches for a specific team.
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Team name
 *     responses:
 *       200:
 *         description: List of matches for the team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "2"
 *                   homeTeam:
 *                     type: string
 *                     example: "Team A"
 *                   awayTeam:
 *                     type: string
 *                     example: "Team C"
 *                   date:
 *                     type: string
 *                     example: "2026-01-11"
 */
router.get("/team/:team", getMatchesByTeam);

/**
 * @swagger
 * /api/matches/date/{date}:
 *   get:
 *     summary: Get matches by date
 *     description: Returns all matches on a specific date.
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: List of matches on that date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "3"
 *                   homeTeam:
 *                     type: string
 *                     example: "Team B"
 *                   awayTeam:
 *                     type: string
 *                     example: "Team D"
 *                   date:
 *                     type: string
 *                     example: "2026-01-12"
 */
router.get("/date/:date", getMatchesByDate);

module.exports = router;
