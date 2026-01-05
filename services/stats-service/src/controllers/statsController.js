// controllers/stats.controller.js
const { getOverviewStats } = require("../services/stats.service");

async function overview(req, res) {
  try {
    const stats = await getOverviewStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}

module.exports = { overview };
