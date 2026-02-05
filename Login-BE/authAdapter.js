const db = require("./db/index.js");
const { users } = require("./sql/sql.js");
const { dbUpdate, dbRunSql } = require("./db/dbutils");

const authAdapter = {
  /**
   * Validates user credentials.
   */
  validateUser: async (email, password) => {
    const userRecord = await db.manyOrNone(
      "SELECT id, email, first, last, status FROM users WHERE email=$1 AND PASSWORD = crypt($2, PASSWORD)",
      [email, password]
    );
    return userRecord.length === 1 ? userRecord[0] : null;
  },

  /**
   * Retrieves user permissions.
   */
  getUserPermissions: async (email) => {
    const result = await db.manyOrNone(users.authno || "SELECT id FROM permissions", [email]); // Fallback if authno not defined
    return result.map((perm) => perm.id);
  },

  /**
   * Saves the refresh token for a user.
   */
  saveRefreshToken: async (userId, refreshtoken) => {
    return await dbUpdate(users.tableName, userId, { refreshtoken });
  },

  /**
   * Finds a user by their refresh token.
   */
  findUserByRefreshToken: async (refreshToken) => {
    const query = "SELECT id, email, first, last, status FROM users WHERE refreshtoken = $1";
    const result = await dbRunSql(query, [refreshToken]);
    return result.length > 0 ? result[0] : null;
  },

  /**
   * Clears the refresh token for a user.
   */
  clearRefreshToken: async (userId) => {
    return await dbUpdate(users.tableName, userId, { refreshtoken: "" });
  }
};

module.exports = authAdapter;
