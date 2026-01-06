// controllers/stats.controller.js
const {
  getOverviewStats,
  getStandings,
} = require("../services/stats.service");

async function overview(req, res) {
  try {
    const stats = await getOverviewStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}

async function standings(req, res) {
  try {
    const table = await getStandings();
    res.json(table);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch standings" });
  }
}

module.exports = {
  overview,
  standings,
};
