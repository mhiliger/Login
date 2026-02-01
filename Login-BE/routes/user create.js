const express = require("express");
const router = express.Router();
const db = require("../db/index.js");

// Create user
router.post("/user", async (req, res, next) => {
  let rec = req.body;

  // Validate user and password are provided
  if (!rec.email || !rec.password) {
    res.status(400).json({ error: "missing user or password" });
    return;
  }

  try {
    // Check user exists
    let result = await db.oneOrNone("SELECT email FROM users WHERE email=$1", [
      rec.email,
    ]);

    if (result) {
      res.status(401).json({ error: "User already exists." });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: "Unable to find user." });
    return;
  }

  try {
    // Set defaults if not defined
    rec.first = rec.first === undefined ? "" : rec.first;
    rec.last = rec.last === undefined ? "" : rec.last;
    rec.status = rec.status === undefined ? "Pending" : rec.status;

    const query =
      "INSERT INTO users (email, FIRST, LAST, PASSWORD, status) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5) RETURNING id";

    let result = await db.oneOrNone(query, [
      rec.email,
      rec.first,
      rec.last,
      rec.password,
      rec.status,
    ]);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: " Unable to save user." });
  }
});

module.exports = router;
