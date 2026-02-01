const express = require("express");
const router = express.Router();
const { dbInsert } = require("../db/dbutils");
const { UserRoles } = require("../sql/sql.js");

// Provide all defined roles
router.post("/userrole", async (req, res, next) => {
  dbInsert(UserRoles.tableName, UserRoles.fields, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error: "Error adding duplicate user roles" });
      } else {
        // other error
        res.status(400).json({ error: "Error adding user roles" });
      }
    });
});

module.exports = router;
