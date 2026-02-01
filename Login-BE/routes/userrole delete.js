const express = require("express");
const router = express.Router();
const { dbDeleteList } = require("../db/dbutils");
const { UserRoles } = require("../sql/sql.js");

// Create user
router.delete("/userrole", async (req, res, next) => {
  const { delList } = req.body;
  // const sqlQuery = "DELETE FROM $1:name WHERE userid=$2 AND roleid=$3 RETURNING *";
  dbDeleteList(UserRoles.tableName, delList)
    .then((result) =>
      res.json(result))
    .catch((error) =>
      res.status(400).json(error));
});


module.exports = router;
