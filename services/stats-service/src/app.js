require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("../swagger"); 

const statsRoutes = require("./routes/statsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/stats", statsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Stats service running on port ${PORT}`);
});
