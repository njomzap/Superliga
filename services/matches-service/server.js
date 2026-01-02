require("dotenv").config();
const express = require("express");
const cors = require("cors");
const healthRouter = require("./routes/health");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/health", healthRouter);

const matchesRouter = require("./routes/matches");
app.use("/api/matches", matchesRouter);

const PORT =  5001;
app.listen(PORT, () => {
  console.log(`Matches service running on port ${PORT}`);
});
