const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");

// Cost control settings
setGlobalOptions({ maxInstances: 10 });

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Sample API Route (Apne endpoints yahan add karein)
app.get("/hello", (req, res) => {
  logger.info("Hello endpoint called!");
  res.json({ message: "Firebase Functions Backend Successfully Live!" });
});

// Firebase Cloud Function Export (Main Endpoint)
exports.api = onRequest(app);