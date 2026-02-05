/**
 * A standard Postgres adapter for the authentication library.
 * Assumes a schema with 'users', 'roles', 'permissions', 'UserRoles', and 'RolePerms' tables.
 * 
 * @param {Object} db - A database connection object (e.g., pg-promise instance).
 * @returns {Object} An auth adapter implementation.
 */
const createPostgresAdapter = (db) => ({
  /**
   * Validates user credentials using PostgreSQL crypt function.
   */
  validateUser: async (email, password) => {
    const userRecord = await db.manyOrNone(
      "SELECT id, email, first, last, status FROM users WHERE email=$1 AND PASSWORD = crypt($2, PASSWORD)",
      [email, password]
    );
    return userRecord.length === 1 ? userRecord[0] : null;
  },

  /**
   * Retrieves user permissions IDs.
   */
  getUserPermissions: async (email) => {
    const result = await db.manyOrNone(
      `SELECT DISTINCT p.id FROM users AS u
       JOIN "UserRoles" AS ur ON u.id = ur.userid
       JOIN roles AS r ON r.id = ur.roleid
       JOIN "RolePerms" AS rp ON r.id = rp.roleid
       JOIN permissions AS p ON p.id = rp.permid
       WHERE u.email = $1`,
      [email]
    );
    return result.map((perm) => perm.id);
  },

  /**
   * Saves the refresh token for a user.
   */
  saveRefreshToken: async (userId, refreshtoken) => {
    return await db.none("UPDATE users SET refreshtoken = $1 WHERE id = $2", [refreshtoken, userId]);
  },

  /**
   * Finds a user by their refresh token.
   */
  findUserByRefreshToken: async (refreshToken) => {
    const result = await db.manyOrNone(
      "SELECT id, email, first, last, status FROM users WHERE refreshtoken = $1",
      [refreshToken]
    );
    return result.length > 0 ? result[0] : null;
  },

  /**
   * Clears the refresh token for a user.
   */
  clearRefreshToken: async (userId) => {
    return await db.none("UPDATE users SET refreshtoken = '' WHERE id = $1", [userId]);
  }
});

module.exports = createPostgresAdapter;
