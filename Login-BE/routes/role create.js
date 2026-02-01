const express = require("express");
const router = express.Router();
const { dbInsert } = require("../db/dbutils.js");
const { roles } = require("../sql/sql.js");

// Insert role
router.post("/role", async (req, res, next) => {
  // console.log(dbInsert);
  dbInsert(roles.tableName, roles.fields, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error: "Unable to add role.  Duplicate entry." });
      } else {
        // other error
        res.status(400).json({ error: "Error adding role." });
      }
    });
});

module.exports = router;
