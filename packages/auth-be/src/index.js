const createAuthRouter = require("./routes/authFactory");
const createVerifyJWT = require("./middleware/verifyJWT");
const createPostgresAdapter = require("./adapters/PostgresAdapter");

module.exports = {
  createAuthRouter,
  createVerifyJWT,
  createPostgresAdapter,
};