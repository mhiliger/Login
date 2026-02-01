const express = require("express");
const router = express.Router();
const { dbDelete, dbDeleteList } = require("../db/dbutils");
const { permissions, RolePerms } = require("../sql/sql.js");

router.delete("/perm/:id", async (req, res, next) => {

  // dbDelete(permissions.tableName, parseInt(req.params.id))
  //   .then((result) => res.json(result))
  //   .catch((error) => res.status(400).json({ error: "Unable to delete permission" }));

  // remove all relationships to Roles in the roleperms table
  dbDeleteList(RolePerms.tableName, [{ permid: parseInt(req.params.id) }])
    .then((result) => {
      // if successful remove the permission
      dbDelete(permissions.tableName, parseInt(req.params.id))
        .then((result) => res.json(result))
        .catch((error) => res.status(400).json({ error: "Unable to delete permission" }));

    })
    .catch((error) =>
      res.status(400).json({ error: "Unable to delete role-permission relationships" }));

});

module.exports = router;
