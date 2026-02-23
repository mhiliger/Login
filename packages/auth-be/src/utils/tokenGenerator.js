const crypto = require("crypto");

/**
 * Generates a secure random token and its hash.
 * The plain token is sent to the user, while only the hash is stored in the database.
 * @returns {{ token: string, tokenHash: string }}
 */
const generateToken = () => {
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
};

/**
 * Hashes a token for comparison with stored hash.
 * @param {string} token - The plain token to hash.
 * @returns {string} The SHA-256 hash of the token.
 */
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = {
  generateToken,
  hashToken,
};
