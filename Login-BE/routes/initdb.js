const express = require("express");
const router = express.Router();
const { initTestDb } = require("../db/initdb.js");

// Initialize test data into the database
router.post("/initDb", async (req, res, next) => {
  result = await initTestDb();
  // console.log(result);
  res.send("Data Initialized");
});

module.exports = router;
