const express = require("express");
const router = express.Router();
const { users } = require("../sql/sql.js");
const jwt = require("jsonwebtoken");
const { dbRunSql } = require("../db/dbutils");
require("dotenv").config();

// Authorize the provided user and password
router.get("/refresh", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(403).json({ error: "Missing or invalid web token" });
  // return res.status(401).json({ error: "Missing or invalid web token" });
  const refreshToken = cookies.jwt;

  // Look for refresh token in database
  let userRecord = undefined;
  try {
    const query =
      "SELECT email, first, last, status FROM users WHERE refreshtoken = $1";
    let result = await dbRunSql(query, [refreshToken]);
    userRecord = result[0];
  } catch (error) {
    return res.status(403).json({ error: "Refresh token not found in database" });
  }

  try {
    var decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (userRecord.email !== decoded.email) {
      return res.status(403).json({ error: "Invalid user email for refresh... login required" });
    }
  } catch (error) {
    return res.status(403).json({ error: "Invalid web token may have expired... login required" });
  }

  // Verify the refresh token
  // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
  //   if (err || userRecord.email !== decoded.email)
  //     return res.status(403).json({ error: "Invalid web token... cannot refresh" });
  // });

  // Go get permissions for found user
  let perms = [];
  try {
    let result = await dbRunSql(users.refresh, [userRecord.email]);
    if (result.length > 0) {
      result.map((perm) => {
        perms.push(perm.id);
      });
    } else {
      return res
        .status(403)
        .json({ error: "No permissions for user access forbidden" });
    }
  } catch (error) {
    return res.status(403).json({ error: "Unable to read permissions for user" });
  }
  let uniquePerms = [...new Set(perms)];
  // Create JWT Access Token
  let payload = {
    email: userRecord?.email,
    first: userRecord?.first,
    last: userRecord?.last,
    status: userRecord?.status,
    permissions: uniquePerms,
  };
  // create new access token
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.json({ accessToken });
});

module.exports = router;
