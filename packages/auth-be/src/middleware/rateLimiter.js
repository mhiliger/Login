const rateLimit = require("express-rate-limit");

/**
 * Creates a rate limiter for registration endpoints.
 * @param {Object} config - Configuration options.
 * @param {number} [config.windowMs=3600000] - Time window in milliseconds (default: 1 hour).
 * @param {number} [config.max=5] - Maximum requests per window (default: 5).
 * @returns {Function} Express rate limiting middleware.
 */
const createRegistrationLimiter = (config = {}) => {
  return rateLimit({
    windowMs: config.windowMs || 60 * 60 * 1000, // 1 hour default
    max: config.max || 5,
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

/**
 * Creates a rate limiter for verification endpoints (more lenient).
 * @param {Object} config - Configuration options.
 * @param {number} [config.windowMs=3600000] - Time window in milliseconds (default: 1 hour).
 * @param {number} [config.max=10] - Maximum requests per window (default: 10).
 * @returns {Function} Express rate limiting middleware.
 */
const createVerificationLimiter = (config = {}) => {
  return rateLimit({
    windowMs: config.windowMs || 60 * 60 * 1000, // 1 hour default
    max: config.max || 10,
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = {
  createRegistrationLimiter,
  createVerificationLimiter,
};
