const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { roles } = require("../sql/sql.js");

// Provide all defined roles
router.get("/roles", async (req, res, next) => {
  dbRunSql(roles.read)
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
