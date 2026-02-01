const express = require("express");
const router = express.Router();
const { dbDelete } = require("../db/dbutils");
const { users } = require("../sql/sql.js");

// Create user
router.delete("/user/:id", async (req, res, next) => {
  dbDelete(users.tableName, req.params.id)
    .then((result) => res.json(result))
    .catch((error) => {
      if (error.code === "23503") {
        // user in-use unable to delete
        res.status(409).json({ error });
      } else {
        // other error unable to delete
        res.status(400).json({ error });
      }
    });
});

module.exports = router;
