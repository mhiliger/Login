const express = require("express");
const router = express.Router();
const { dbUpdate } = require("../db/dbutils.js");
const { roles } = require("../sql/sql.js");

// Update data for a specific user
router.put("/role/:id", async (req, res, next) => {
  dbUpdate(roles.tableName, req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error: "Error updating role - duplicate" });
      } else {
        // other error
        res.status(400).json({ error: "Error updating role" });
      }
    });
});

module.exports = router;
