require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const matchesRouter = require("./routes/matches");
app.use("/api/matches", matchesRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Matches service running on port ${PORT}`);
});
