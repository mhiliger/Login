const express = require("express");
const { generateToken, hashToken } = require("../utilities/tokenGenerator");

/**
 * Parses a duration string (e.g., '24h', '48h') into milliseconds.
 * @param {string} duration - Duration string like '24h', '1d', '30m'.
 * @returns {number} Milliseconds.
 */
const parseDuration = (duration) => {
  const match = duration.match(/^(\d+)([hdm])$/);
  if (!match) return 24 * 60 * 60 * 1000; // default 24h

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    case "m":
      return value * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
};

/**
 * Creates admin registration workflow routes.
 * @param {Object} options
 * @param {Object} options.db - Database adapter with registration methods.
 * @param {Function} options.verifyJWT - JWT verification middleware.
 * @param {Object} options.emailService - Email service for notifications.
 * @returns {express.Router}
 */
const createAdminRegistrationRouter = ({ db, verifyJWT, emailService }) => {
  const router = express.Router();
  const passwordSetupTokenLife = "48h";
  const adminPermissionIds = ["AllowUsers"];

  // ==================== Admin Routes ====================

  /**
   * Middleware to check admin permissions.
   */
  const requireAdminPermission = (req, res, next) => {
    const userPermissions = req.permissions || [];
    const hasAdminPermission = adminPermissionIds.some((id) =>
      userPermissions.some(p => (p.perm_key || p) == id)
    );

    if (!hasAdminPermission) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };

  /**
   * Get all pending registrations
   * GET /admin/pending-registrations
   */
  router.get("/admin/pending-registrations", verifyJWT, requireAdminPermission, async (req, res) => {
    try {
      const pendingRegistrations = await db.getPendingRegistrations();
      res.json(pendingRegistrations);
    } catch (error) {
      console.error("Get pending registrations error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  /**
   * Get single registration by ID
   * GET /admin/registration/:id
   */
  router.get("/admin/registration/:id", verifyJWT, requireAdminPermission, async (req, res) => {
    try {
      const { id } = req.params;
      const registration = await db.getRegistrationById(parseInt(id, 10));

      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      res.json(registration);
    } catch (error) {
      console.error("Get registration error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  /**
   * Approve registration
   * POST /admin/registration/:id/approve
   */
  router.post("/admin/registration/:id/approve", verifyJWT, requireAdminPermission, async (req, res) => {
    try {
      const { id } = req.params;
      const registration = await db.getRegistrationById(parseInt(id, 10));

      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      if (registration.status !== "PENDING_APPROVAL") {
        return res.status(400).json({ error: "Registration is not pending approval" });
      }

      // Invalidate any existing password setup tokens
      await db.invalidateUserTokens(registration.id, "password_setup");

      // Update status to APPROVED
      await db.updateUserStatus(registration.id, "APPROVED");

      // Generate password setup token
      const { token, tokenHash } = generateToken();
      const expiresAt = new Date(Date.now() + parseDuration(passwordSetupTokenLife));

      await db.saveRegistrationToken(registration.id, tokenHash, "password_setup", expiresAt);

      // Send approval email via service
      if (emailService) {
        try {
          await emailService.sendApprovalEmail(registration, token);
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
          // Don't fail the approval if email fails
        }
      }

      res.json({
        success: true,
        message: "Registration approved. User has been notified.",
      });
    } catch (error) {
      console.error("Approve registration error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  /**
   * Reject registration
   * POST /admin/registration/:id/reject
   */
  router.post("/admin/registration/:id/reject", verifyJWT, requireAdminPermission, async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      if (!reason) {
        return res.status(400).json({ error: "Rejection reason is required" });
      }

      const registration = await db.getRegistrationById(parseInt(id, 10));

      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      if (registration.status !== "PENDING_APPROVAL") {
        return res.status(400).json({ error: "Registration is not pending approval" });
      }

      // Update status to REJECTED and save rejection note
      await db.setAdminRejectionNote(registration.id, reason);
      await db.updateUserStatus(registration.id, "REJECTED");

      // Send rejection email via service
      if (emailService) {
        try {
          await emailService.sendRejectionEmail(registration, reason);
        } catch (emailError) {
          console.error("Failed to send rejection email:", emailError);
          // Don't fail the rejection if email fails
        }
      }

      res.json({
        success: true,
        message: "Registration rejected. User has been notified.",
      });
    } catch (error) {
      console.error("Reject registration error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  /**
   * Reset user password (admin initiated)
   * POST /admin/registration/:id/reset-password
   */
  router.post("/admin/registration/:id/reset-password", verifyJWT, requireAdminPermission, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.getRegistrationById(parseInt(id, 10));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Invalidate any existing password setup tokens
      await db.invalidateUserTokens(user.id, "password_setup");

      // Generate password setup token
      const { token, tokenHash } = generateToken();
      const expiresAt = new Date(Date.now() + parseDuration(passwordSetupTokenLife));

      await db.saveRegistrationToken(user.id, tokenHash, "password_setup", expiresAt);

      // Send password reset email via service
      if (emailService) {
        try {
          await emailService.sendPasswordResetEmail(user, token);
        } catch (emailError) {
          console.error("Failed to send password reset email:", emailError);
          // Don't fail if email fails
        }
      }

      res.json({
        success: true,
        message: "Password reset initiated. User has been notified.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  return router;
};

module.exports = createAdminRegistrationRouter;
