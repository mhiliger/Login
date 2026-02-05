const express = require("express");
const jwt = require("jsonwebtoken");

/**
 * Creates an Express router with auth endpoints.
 * @param {Object} options - Configuration options
 * @param {Object} options.db - Database interface object
 * @param {Object} options.queries - Object containing SQL queries or functions
 * @param {Object} options.config - Config for secrets and tokens
 * @returns {express.Router}
 */
const createAuthRouter = ({ db, queries, config }) => {
  const router = express.Router();

  const {
    accessTokenSecret,
    refreshTokenSecret,
    accessTokenLife,
    refreshTokenLife,
    cookieName = "jwt",
    cookieOptions = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    loginPath = "/login",
  } = config;

  // Login Route
  router.post(loginPath, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "missing user or password" });
    }

    try {
      // 1. Validate User Credentials
      // This should return user details if valid, or null/throw if not
      const user = await db.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // 2. Get Permissions
      const permissions = await db.getUserPermissions(email);
      if (!permissions || permissions.length === 0) {
        return res.status(403).json({ error: "No permissions for user" });
      }

      // 3. Create Tokens
      const payload = {
        userId: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        status: user.status,
        permissions: [...new Set(permissions)],
      };

      const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenLife });
      const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenLife });

      // 4. Save Refresh Token to DB
      await db.saveRefreshToken(user.id, refreshToken);

      // 5. Respond
      res.cookie(cookieName, refreshToken, cookieOptions);
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error during login" });
    }
  });

  // Refresh Token Route
  router.get("/refresh", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.[cookieName]) return res.status(403).json({ error: "Missing refresh token" });

    const refreshToken = cookies[cookieName];

    try {
      // 1. Find user by refresh token
      const user = await db.findUserByRefreshToken(refreshToken);
      if (!user) return res.status(403).json({ error: "Invalid refresh token" });

      // 2. Verify token
      const decoded = jwt.verify(refreshToken, refreshTokenSecret);
      if (user.email !== decoded.email) {
        return res.status(403).json({ error: "Token mismatch" });
      }

      // 3. Refresh Permissions
      const permissions = await db.getUserPermissions(user.email);
      
      // 4. Issue new Access Token
      const payload = {
        userId: user.id,
        email: user.email,
        first: user.first,
        last: user.last,
        status: user.status,
        permissions: [...new Set(permissions)],
      };

      const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenLife });
      res.json({ accessToken });
    } catch (error) {
      console.error("Refresh error:", error);
      res.status(403).json({ error: "Refresh failed" });
    }
  });

  // Logout Route
  router.post("/logout", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.[cookieName]) return res.sendStatus(204);

    const refreshToken = cookies[cookieName];

    try {
      const user = await db.findUserByRefreshToken(refreshToken);
      if (user) {
        await db.clearRefreshToken(user.id);
      }
    } catch (error) {
      // Log error but proceed to clear cookie
      console.error("Logout DB error:", error);
    }

    res.clearCookie(cookieName, cookieOptions);
    res.sendStatus(204);
  });

  return router;
};

module.exports = createAuthRouter;
