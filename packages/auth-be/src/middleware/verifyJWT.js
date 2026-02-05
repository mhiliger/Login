const jwt = require("jsonwebtoken");

/**
 * Factory to create verifyJWT middleware with custom configuration.
 * @param {Object} config - Configuration object
 * @param {string} config.accessTokenSecret - The secret used to verify the access token.
 * @param {Function} [config.onVerifySuccess] - Optional callback when verification succeeds, receives (req, decoded).
 * @param {Function} [config.onVerifyError] - Optional callback when verification fails, receives (res, error).
 * @returns {Function} Express middleware
 */
const createVerifyJWT = (config) => {
  const { accessTokenSecret, onVerifySuccess, onVerifyError } = config;

  if (!accessTokenSecret) {
    throw new Error("accessTokenSecret is required for verifyJWT middleware");
  }

  return (req, res, next) => {
    const authHeader = req?.headers["authorization"] || req?.headers["Authorization"];
    
    if (!authHeader?.startsWith("Bearer ")) {
      if (onVerifyError) return onVerifyError(res, new Error("No Bearer token provided"));
      return res.status(401).json({ error: "no header to verify jwt" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, accessTokenSecret);
      
      // Default behavior: attach common fields to req
      req.user = decoded;
      // Also attach specific fields for backward compatibility if needed or as configured
      if (onVerifySuccess) {
        onVerifySuccess(req, decoded);
      } else {
        req.email = decoded.email;
        req.permissions = decoded.permissions;
        req.userId = decoded.userId;
      }

      next();
    } catch (error) {
      if (onVerifyError) return onVerifyError(res, error);
      return res.status(403).json({ error: "error verifying jwt" });
    }
  };
};

module.exports = createVerifyJWT;
