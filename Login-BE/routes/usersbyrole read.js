const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { users } = require("../sql/sql.js");
const verifyJWT = require("../middleware/verifyJWT");

// Provide list of all users
// router.get("/users", verifyJWT, async (req, res, next) => {
router.get("/usersbyrole/:id", async (req, res, next) => {
  dbRunSql(users.usersbyrole, [parseInt(req.params.id)])
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
