const express = require("express");
const router = express.Router();
const { dbDelete, dbDeleteList } = require("../db/dbutils");
const { roles, RolePerms, UserRoles } = require("../sql/sql.js");

// Create user
router.delete("/role/:id", async (req, res, next) => {
  // remove all relationships in the roleperms table
  dbDeleteList(RolePerms.tableName, [{ roleid: parseInt(req.params.id) }])
    .then((result) => {
      // now remove all relationship in the UserRoles table
      dbDeleteList(UserRoles.tableName, [{ roleid: parseInt(req.params.id) }])
        .then((result) => {
          // now remove the role
          dbDelete(roles.tableName, parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((error) => res.status(400).json({ error: "Unable to delete role" }));
        })
        .catch((error) =>
          res.status(400).json({ error: "Deleted permissions from roles but unable to delete role from users or role definition." }))
    }).catch((error) =>
      res.status(400).json({ error: "Unable to delete role or any relationships to users or permissions." }));
});
module.exports = router;
