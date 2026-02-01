const express = require("express");
const router = express.Router();
const { createDb } = require("../db/initdb.js");

// Route to create the database tables
router.post("/createDb", async (req, res, next) => {
  result = await createDb();
  // console.log(result);
  res.send("created all");
});

module.exports = router;
