const express = require("express");
const router = express.Router();
const { dropDb } = require("../db/initdb.js");

// Route used to drop all tables
router.delete("/deleteDb", async (req, res, next) => {
  result = await dropDb();
  // console.log(result);
  res.send("deleted all");
});

module.exports = router;
