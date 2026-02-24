const express = require("express");

/**
 * Creates an Express router that exposes auth adapter methods as HTTP endpoints.
 * This is used by the master identity service to provide identity data to other applications.
 *
 * @param {Object} options
 * @param {Object} options.db - The auth adapter (e.g., PostgresAdapter).
 * @param {string} options.apiKey - A shared secret key to protect these endpoints.
 * @returns {express.Router}
 */
const createInternalRouter = ({ db, apiKey }) => {
  const router = express.Router();

  if (!apiKey) {
    throw new Error("apiKey is required for internal auth router");
  }

  // Middleware to verify internal API key
  router.use((req, res, next) => {
    const providedKey = req.headers["x-api-key"];
    if (!providedKey || providedKey !== apiKey) {
      return res.status(403).json({ error: "Unauthorized internal access" });
    }
    next();
  });

  // ==================== Auth Methods ====================

  router.post("/auth/validate", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.validateUser(email, password);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/auth/permissions/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const permissions = await db.getUserPermissions(email);
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/auth/refresh-token", async (req, res) => {
    try {
      const { userId, refreshtoken } = req.body;
      await db.saveRefreshToken(userId, refreshtoken);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/auth/find-by-refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const user = await db.findUserByRefreshToken(refreshToken);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/auth/clear-refresh", async (req, res) => {
    try {
      const { userId } = req.body;
      await db.clearRefreshToken(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== Registration Methods ====================

  router.get("/reg/user/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const user = await db.findUserByEmail(email);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/submit", async (req, res) => {
    try {
      const { email, first, last, requestNote } = req.body;
      const user = await db.createRegistrationRequest(email, first, last, requestNote);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/status", async (req, res) => {
    try {
      const { userId, status } = req.body;
      await db.updateUserStatus(userId, status);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/token", async (req, res) => {
    try {
      const { userId, tokenHash, tokenType, expiresAt } = req.body;
      const token = await db.saveRegistrationToken(userId, tokenHash, tokenType, expiresAt);
      res.json(token);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/find-token", async (req, res) => {
    try {
      const { tokenHash, tokenType } = req.body;
      const token = await db.findValidToken(tokenHash, tokenType);
      res.json(token);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/mark-token-used", async (req, res) => {
    try {
      const { tokenId } = req.body;
      await db.markTokenUsed(tokenId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/invalidate-tokens", async (req, res) => {
    try {
      const { userId, tokenType } = req.body;
      await db.invalidateUserTokens(userId, tokenType);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/reg/pending", async (req, res) => {
    try {
      const registrations = await db.getPendingRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/reg/request/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const registration = await db.getRegistrationById(id);
      res.json(registration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/rejection-note", async (req, res) => {
    try {
      const { userId, note } = req.body;
      await db.setAdminRejectionNote(userId, note);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/reg/set-password", async (req, res) => {
    try {
      const { userId, password } = req.body;
      await db.setUserPassword(userId, password);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

module.exports = createInternalRouter;
