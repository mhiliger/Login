const express = require("express");
const router = express.Router();
const { dbUpdate } = require("../db/dbutils.js");
const { permissions } = require("../sql/sql.js");

// Update data for a specific user
router.put("/perm/:id", async (req, res, next) => {
  dbUpdate(permissions.tableName, req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      if (error.code === "23505") {
        // dup role
        res.status(409).json({ error: "Unable to update permission - duplicate record." });
      } else {
        // other error
        res.status(400).json({ error: "Unable to update permission. Permission description must be unique." });
      }
    });
});

module.exports = router;
