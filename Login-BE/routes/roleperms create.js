const express = require("express");
const router = express.Router();
const { dbInsert } = require("../db/dbutils");
const { RolePerms } = require("../sql/sql.js");

// Provide all defined roles
router.post("/roleperm", async (req, res, next) => {
  dbInsert(RolePerms.tableName, RolePerms.fields, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error });
      } else {
        // other error
        res.status(400).json({ error });
      }
    });
});

module.exports = router;
