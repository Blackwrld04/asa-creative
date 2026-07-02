/**
 * server/index.js
 * Express app entry point for the àṣà backend.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const campaignRoutes = require("./routes/campaign");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "asa-creative-backend" });
});

app.use("/api", campaignRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`àṣà backend running on http://localhost:${PORT}`);
});
