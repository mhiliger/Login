const express = require("express");
const router = express.Router();
const { dbUpdate } = require("../db/dbutils.js");
const { users } = require("../sql/sql.js");

// Update data for a specific user
router.put("/user/:id", async (req, res, next) => {
  dbUpdate(users.tableName, req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      if (error.code === "23505") {
        // dup user
        res.status(409).json({ error: "Unable to update user.  Duplicate user exists." });
      } else {
        // other error
        res.status(400).json({ error: "Unable to update user." });
      }
    });
});

module.exports = router;
