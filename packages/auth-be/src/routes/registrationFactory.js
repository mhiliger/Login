const express = require("express");
const { generateToken, hashToken } = require("../utils/tokenGenerator");
const { createRegistrationLimiter, createVerificationLimiter } = require("../middleware/rateLimiter");

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
 * Creates registration workflow routes.
 * @param {Object} options
 * @param {Object} options.db - Database adapter with registration methods.
 * @param {Object} options.config - Configuration options.
 * @param {string} [options.config.verificationTokenLife='24h'] - Verification token lifetime.
 * @param {string} [options.config.passwordSetupTokenLife='48h'] - Password setup token lifetime.
 * @param {Array<number>} [options.config.adminPermissionIds=["AllowUsers"]] - Permission IDs required for admin operations.
 * @param {number} [options.config.rateLimitWindowMs] - Rate limit window in ms.
 * @param {number} [options.config.rateLimitMax] - Rate limit max requests.
 * @param {Function} [options.config.onRegistrationSubmit] - Callback when registration is submitted (user, token).
 * @param {Function} [options.config.onEmailVerified] - Callback when email is verified (user).
 * @param {Function} [options.config.onApproval] - Callback when admin approves (user, token).
 * @param {Function} [options.config.onRejection] - Callback when admin rejects (user, reason).
 * @param {Function} [options.verifyJWT] - JWT verification middleware for admin routes.
 * @returns {express.Router}
 */
const createRegistrationRouter = ({ db, config = {}, verifyJWT }) => {
  const router = express.Router();

  const {
    verificationTokenLife = "24h",
    passwordSetupTokenLife = "48h",
    rateLimitWindowMs,
    rateLimitMax,
    onRegistrationSubmit,
    onEmailVerified,
    onApproval,
    onRejection,
    onPasswordReset,
  } = config;

  // Rate limiters
  const submitLimiter = createRegistrationLimiter({
    windowMs: rateLimitWindowMs,
    max: rateLimitMax,
  });
  const verifyLimiter = createVerificationLimiter({
    windowMs: rateLimitWindowMs,
    max: rateLimitMax ? rateLimitMax * 2 : undefined,
  });

  // ==================== Public Routes ====================

  /**
   * Phase 1: Submit Registration
   * POST /register/submit
   */
  router.post("/register/submit", submitLimiter, async (req, res) => {
    try {
      const { email, first, last, requestNote } = req.body;

      // Validate required fields
      if (!email || !first || !last) {
        return res.status(400).json({ error: "Email, first name, and last name are required" });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Validate request note length
      if (requestNote && requestNote.length > 256) {
        return res.status(400).json({ error: "Request note must be 256 characters or less" });
      }

      // Check if email already exists
      const existingUser = await db.findUserByEmail(email);
      if (existingUser) {
        // Return generic success to prevent user enumeration
        return res.json({
          success: true,
          message: "If this email is not already registered, you will receive a verification email shortly.",
        });
      }

      // Create the registration request
      const user = await db.createRegistrationRequest(email, first, last, requestNote);

      // Generate verification token
      const { token, tokenHash } = generateToken();
      const expiresAt = new Date(Date.now() + parseDuration(verificationTokenLife));

      await db.saveRegistrationToken(user.id, tokenHash, "email_verification", expiresAt);

      // Send verification email via callback
      if (onRegistrationSubmit) {
        try {
          await onRegistrationSubmit(user, token);
        } catch (emailError) {
          console.error("Failed to send verification email:", emailError);
          // Don't fail the registration if email fails
        }
      }

      res.json({
        success: true,
        message: "If this email is not already registered, you will receive a verification email shortly.",
      });
    } catch (error) {
      console.error("Registration submit error:", error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  });

  /**
   * Phase 2: Verify Email
   * GET /register/verify/:token
   */
  router.get("/register/verify/:token", verifyLimiter, async (req, res) => {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }

      const tokenHash = hashToken(token);
      const tokenRecord = await db.findValidToken(tokenHash, "email_verification");

      if (!tokenRecord) {
        return res.status(400).json({ error: "Invalid or expired verification link" });
      }

      // Check if user is in correct state
      if (tokenRecord.status !== "PENDING_VERIFICATION") {
        return res.status(400).json({ error: "Email has already been verified" });
      }

      // Mark token as used
      await db.markTokenUsed(tokenRecord.id);

      // Update user status to PENDING_APPROVAL
      await db.updateUserStatus(tokenRecord.user_id, "PENDING_APPROVAL");

      // Notify admin via callback
      if (onEmailVerified) {
        try {
          const user = {
            id: tokenRecord.user_id,
            email: tokenRecord.email,
            first: tokenRecord.first,
            last: tokenRecord.last,
            request_note: tokenRecord.request_note,
          };
          await onEmailVerified(user);
        } catch (notifyError) {
          console.error("Failed to notify admin:", notifyError);
          // Don't fail the verification if notification fails
        }
      }

      res.json({
        success: true,
        message: "Email verified successfully. Your request is now pending administrator review.",
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "An error occurred during verification" });
    }
  });

  /**
   * Phase 4: Validate Password Setup Token
   * GET /register/setup/:token
   */
  router.get("/register/setup/:token", verifyLimiter, async (req, res) => {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }

      const tokenHash = hashToken(token);
      const tokenRecord = await db.findValidToken(tokenHash, "password_setup");

      if (!tokenRecord) {
        return res.status(400).json({ error: "Invalid or expired setup link" });
      }

      // Check if user is in correct state
      if (tokenRecord.status !== "APPROVED" && tokenRecord.status !== "ACTIVE") {
        return res.status(400).json({ error: "Account is not in the correct state for password setup" });
      }

      res.json({
        success: true,
        valid: true,
        email: tokenRecord.email,
        first: tokenRecord.first,
      });
    } catch (error) {
      console.error("Setup token validation error:", error);
      res.status(500).json({ error: "An error occurred during validation" });
    }
  });

  /**
   * Phase 4: Set Password
   * POST /register/setup/:token
   */
  router.post("/register/setup/:token", submitLimiter, async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      // Validate password format (same as PWD_REGEX in frontend)
      const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      if (!pwdRegex.test(password)) {
        return res.status(400).json({
          error: "Password must be 8-24 characters with uppercase, lowercase, number, and special character (!@#$%)",
        });
      }

      const tokenHash = hashToken(token);
      const tokenRecord = await db.findValidToken(tokenHash, "password_setup");

      if (!tokenRecord) {
        return res.status(400).json({ error: "Invalid or expired setup link" });
      }

      // Check if user is in correct state
      if (tokenRecord.status !== "APPROVED" && tokenRecord.status !== "ACTIVE") {
        return res.status(400).json({ error: "Account is not in the correct state for password setup" });
      }

      // Mark token as used
      await db.markTokenUsed(tokenRecord.id);

      // Set password and update status to ACTIVE
      await db.setUserPassword(tokenRecord.user_id, password);
      await db.updateUserStatus(tokenRecord.user_id, "ACTIVE");

      res.json({
        success: true,
        message: "Password set successfully. You can now log in.",
      });
    } catch (error) {
      console.error("Password setup error:", error);
      res.status(500).json({ error: "An error occurred during password setup" });
    }
  });

  /**
   * Phase 0: Request Password Reset (Public)
   * POST /register/forgot-password
   */
  router.post("/register/forgot-password", submitLimiter, async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await db.findUserByEmail(email);

      // We always return a success message to prevent user enumeration
      const successResponse = {
        success: true,
        message: "If an account exists for this email, you will receive a password reset link shortly.",
      };

      // Only proceed if user exists and is ACTIVE or APPROVED (already has/had access)
      if (!user || (user.status !== "ACTIVE" && user.status !== "APPROVED")) {
        return res.json(successResponse);
      }

      // Invalidate any existing password setup tokens
      await db.invalidateUserTokens(user.id, "password_setup");

      // Generate password setup token
      const { token, tokenHash } = generateToken();
      const expiresAt = new Date(Date.now() + parseDuration(passwordSetupTokenLife));

      await db.saveRegistrationToken(user.id, tokenHash, "password_setup", expiresAt);

      // Send password reset email via callback
      if (onPasswordReset) {
        try {
          await onPasswordReset(user, token);
        } catch (emailError) {
          console.error("Failed to send password reset email:", emailError);
          // Don't fail the request if email fails
        }
      }

      res.json(successResponse);
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  // ==================== Admin Routes ====================
  // Admin routes have been moved to the main application (Login-BE/routes/adminRegistrations.js)

  return router;
};

module.exports = createRegistrationRouter;
