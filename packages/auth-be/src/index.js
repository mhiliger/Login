const createAuthRouter = require("./routes/authFactory");
const createVerifyJWT = require("./middleware/verifyJWT");

module.exports = {
  createAuthRouter,
  createVerifyJWT,
};
