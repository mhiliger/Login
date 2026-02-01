const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { roles } = require("../sql/sql.js");

// Provide roles for user :id
router.get("/userroles/:id", async (req, res, next) => {

  dbRunSql(roles.userroles, [req.params.id])
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
