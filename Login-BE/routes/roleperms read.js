const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { RolePerms } = require("../sql/sql.js");

// Provide permissions for a specific user
router.get("/roleperms/:roleid", async (req, res, next) => {
  dbRunSql(RolePerms.read, [req.params.roleid])
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
