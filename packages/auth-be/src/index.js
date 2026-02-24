const createAuthRouter = require("./routes/authFactory");
const createRegistrationRouter = require("./routes/registrationFactory");
const createInternalRouter = require("./routes/internalFactory");
const createVerifyJWT = require("./middleware/verifyJWT");
const createPostgresAdapter = require("./adapters/PostgresAdapter");
const createHttpAdapter = require("./adapters/HttpAdapter");
const { createRegistrationLimiter, createVerificationLimiter } = require("./middleware/rateLimiter");
const { generateToken, hashToken } = require("./utils/tokenGenerator");

module.exports = {
  createAuthRouter,
  createRegistrationRouter,
  createInternalRouter,
  createVerifyJWT,
  createPostgresAdapter,
  createHttpAdapter,
  createRegistrationLimiter,
  createVerificationLimiter,
  generateToken,
  hashToken,
};