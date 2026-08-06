const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const path = require("path");

// Cost control settings
setGlobalOptions({ maxInstances: 10 });

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Serve static files from the 'public' folder (Jahan aapki HTML/CSS/JS files hain)
app.use(express.static(path.join(__dirname, "public")));

// Sample API Route
app.get("/hello", (req, res) => {
  logger.info("Hello endpoint called!");
  res.json({ message: "Firebase Functions Backend Successfully Live!" });
});

// Catch-all route to serve index.html for SPA routing (agar single page app hai)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Firebase Cloud Function Export (Main Endpoint)
exports.api = onRequest(app);