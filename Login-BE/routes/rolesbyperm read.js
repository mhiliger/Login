const express = require("express");
const router = express.Router();
const { dbRunSql } = require("../db/dbutils");
const { roles } = require("../sql/sql.js");
const verifyJWT = require("../middleware/verifyJWT");

// Provide list of all users
// router.get("/users", verifyJWT, async (req, res, next) => {
router.get("/rolesbyperm/:id", async (req, res, next) => {
  dbRunSql(roles.rolesbyperm, [parseInt(req.params.id)])
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
