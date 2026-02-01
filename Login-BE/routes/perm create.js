const express = require("express");
const router = express.Router();
const { dbInsert } = require("../db/dbutils.js");
const { permissions } = require("../sql/sql.js");

// Insert permission
router.post("/perm", async (req, res, next) => {
  // console.log(dbInsert);
  dbInsert(permissions.tableName, permissions.fields, req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error: "Permission already exists." });
      } else {
        // other error
        res.status(400).json({ error: "Unable to add permission." });
      }
    });
});

module.exports = router;
