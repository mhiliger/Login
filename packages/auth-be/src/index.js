const createAuthRouter = require("./routes/authFactory");
const createRegistrationRouter = require("./routes/registrationFactory");
const createVerifyJWT = require("./middleware/verifyJWT");
const createPostgresAdapter = require("./adapters/PostgresAdapter");
const { createRegistrationLimiter, createVerificationLimiter } = require("./middleware/rateLimiter");
const { generateToken, hashToken } = require("./utils/tokenGenerator");

module.exports = {
  createAuthRouter,
  createRegistrationRouter,
  createVerifyJWT,
  createPostgresAdapter,
  createRegistrationLimiter,
  createVerificationLimiter,
  generateToken,
  hashToken,
};