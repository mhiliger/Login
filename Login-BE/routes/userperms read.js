const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { permissions } = require("../sql/sql.js");

// Provide permissions for a specific user
router.get("/userperms/:userid", async (req, res, next) => {


  dbRunSql(permissions.userperms, [req.params.userid])
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
