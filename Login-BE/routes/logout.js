const express = require("express");
const router = express.Router();
const { users } = require("../sql/sql.js");
const { dbUpdate } = require("../db/dbutils");

// Authorize the provided user and password
router.post("/logout", async (req, res) => {
  // On client also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Success but no content

  const refreshToken = cookies.jwt;

  // Look for refresh token in database
  let userRecord = undefined;
  try {
    const query = "SELECT id WHERE refreshtoken = $1";
    let result = await dbRunSql(query, [refreshToken]);
    userRecord = result[0];
  } catch (error) {
    return res.sendStatus(403);
  }

  if (!userRecord?.email) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // user Record found with refesh token so go and clear it in the db
  try {
    let result = await dbUpdate(users.tableName, userRecord.id, {
      refreshtoken: "",
    });
  } catch (error) {}

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.sendStatus(204);
});

module.exports = router;
