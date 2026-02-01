const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { permissions } = require("../sql/sql.js");

// Provide all defined roles
router.get("/perms", async (req, res, next) => {
  dbRunSql(permissions.read)
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
