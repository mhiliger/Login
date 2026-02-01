const express = require("express");
const router = express.Router();
const db = require("../db/index.js");
const { users } = require("../sql/sql.js");
const jwt = require("jsonwebtoken");
const { dbUpdate } = require("../db/dbutils");
require("dotenv").config();

// Authorize the provided user and password
router.post("/auth", async (req, res, next) => {
  const { email, password } = req.body;

  // Validate user and password are provided
  if (!email || !password) {
    res.status(400).json({ error: "missing user or password" });
    return;
  }

  let result = undefined;
  try {
    // Check user exists
    result = await db.manyOrNone("SELECT email FROM users WHERE email=$1", [
      email,
    ]);

    if (result.length === 0) {
      res.status(401).json({ error: "Unkown email." });
      return;
    }
    // Check password valid
    let userRecord = await db.manyOrNone(
      "SELECT id, email, first, last, status FROM users WHERE email=$1 AND PASSWORD = crypt($2, PASSWORD)",
      // "SELECT id, email, first, last, status FROM users WHERE email=$1",
      [email, password]
      // [email]

    );

    if (userRecord.length !== 1) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }
    // User and Password Validated!

    // Go get the permissions for the validated email & password

    let perms = [];
    // let mysql = pgp.as.format(users.auth, [email, password]);
    result = await db.manyOrNone(users.auth, [email, password]);
    // result = await db.manyOrNone(users.authno, [email]);

    if (result.length > 0) {
      result.map((perm) => {
        perms.push(perm.id);
      });
    } else {
      res
        .status(403)
        .json({ error: "No permissions for user access forbidden" });
      return;
    }
    let uniquePerms = [...new Set(perms)];

    // Create JWT Access Token
    let payload = {
      userId: userRecord[0].id,
      email: userRecord[0]?.email,
      first: userRecord[0]?.first,
      last: userRecord[0]?.last,
      status: userRecord[0]?.status,
      permissions: uniquePerms,
    };

    // Create jwt tokens and save refreshToken to user db
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    const refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    dbUpdate(users.tableName, userRecord[0].id, { refreshtoken }).catch(
      (err) => {
        res
          .status(400)
          .json({ error: "Unable to write refreshToken to user db" });
        return;
      }
    );

    // Send the user details and permissions and accessToken to user ....
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: (24 * 60 * 60 * 1000), // one day
      path: "/"
    });
    res.status(200).json({ accessToken });

    return;
  } catch (error) {
    res.status(400).json({ error: "Error accessing login database" });
    return;
  }
});

module.exports = router;
