/**
 * A standard Postgres adapter for the authentication library.
 * Assumes a schema with 'users', 'roles', 'permissions', 'UserRoles', and 'RolePerms' tables.
 *
 * @param {Object} db - A database connection object providing methods like one, manyOrNone, and none.
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
      `SELECT DISTINCT p.perm_key FROM users AS u
       JOIN "UserRoles" AS ur ON u.id = ur.userid
       JOIN roles AS r ON r.id = ur.roleid
       JOIN "RolePerms" AS rp ON r.id = rp.roleid
       JOIN permissions AS p ON p.id = rp.permid
       WHERE u.email = $1`,
      [email]
    );
    return result.map((perm) => ({ perm_key: perm.perm_key }));
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
  },

  // ==================== Registration Workflow Methods ====================

  /**
   * Finds a user by their email address.
   * @param {string} email - The email to search for.
   * @returns {Object|null} The user record or null if not found.
   */
  findUserByEmail: async (email) => {
    const result = await db.manyOrNone(
      "SELECT id, email, first, last, status, request_note, admin_rejection_note FROM users WHERE email = $1",
      [email]
    );
    return result.length > 0 ? result[0] : null;
  },

  /**
   * Creates a new registration request (user with PENDING_VERIFICATION status).
   * @param {string} email - User's email address.
   * @param {string} first - User's first name.
   * @param {string} last - User's last name.
   * @param {string} requestNote - User's note explaining why they need access.
   * @returns {Object} The created user record.
   */
  createRegistrationRequest: async (email, first, last, requestNote) => {
    const result = await db.one(
      `INSERT INTO users (email, first, last, status, request_note)
       VALUES ($1, $2, $3, 'PENDING_VERIFICATION', $4)
       RETURNING id, email, first, last, status, request_note`,
      [email, first, last, requestNote || "Requesting login id to system"]
    );
    return result;
  },

  /**
   * Updates a user's status.
   * @param {number} userId - The user's ID.
   * @param {string} status - The new status value.
   */
  updateUserStatus: async (userId, status) => {
    return await db.none("UPDATE users SET status = $1 WHERE id = $2", [status, userId]);
  },

  /**
   * Saves a registration token (email verification or password setup).
   * @param {number} userId - The user's ID.
   * @param {string} tokenHash - SHA-256 hash of the token.
   * @param {string} tokenType - 'email_verification' or 'password_setup'.
   * @param {Date} expiresAt - Token expiration timestamp.
   * @returns {Object} The created token record.
   */
  saveRegistrationToken: async (userId, tokenHash, tokenType, expiresAt) => {
    const result = await db.one(
      `INSERT INTO registration_tokens (user_id, token_hash, token_type, expires_at)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, token_type, expires_at, created_at`,
      [userId, tokenHash, tokenType, expiresAt]
    );
    return result;
  },

  /**
   * Finds a valid (unexpired, unused) token by its hash.
   * @param {string} tokenHash - SHA-256 hash of the token.
   * @param {string} tokenType - 'email_verification' or 'password_setup'.
   * @returns {Object|null} The token record with user info, or null if not found/invalid.
   */
  findValidToken: async (tokenHash, tokenType) => {
    const result = await db.manyOrNone(
      `SELECT t.id, t.user_id, t.token_type, t.expires_at, t.used_at,
              u.email, u.first, u.last, u.status, u.request_note
       FROM registration_tokens t
       JOIN users u ON t.user_id = u.id
       WHERE t.token_hash = $1
         AND t.token_type = $2
         AND t.expires_at > NOW()
         AND t.used_at IS NULL`,
      [tokenHash, tokenType]
    );
    return result.length > 0 ? result[0] : null;
  },

  /**
   * Marks a token as used.
   * @param {number} tokenId - The token's ID.
   */
  markTokenUsed: async (tokenId) => {
    return await db.none("UPDATE registration_tokens SET used_at = NOW() WHERE id = $1", [tokenId]);
  },

  /**
   * Invalidates all tokens of a specific type for a user.
   * @param {number} userId - The user's ID.
   * @param {string} tokenType - 'email_verification' or 'password_setup'.
   */
  invalidateUserTokens: async (userId, tokenType) => {
    return await db.none(
      "UPDATE registration_tokens SET used_at = NOW() WHERE user_id = $1 AND token_type = $2 AND used_at IS NULL",
      [userId, tokenType]
    );
  },

  /**
   * Gets all users with PENDING_APPROVAL status.
   * @returns {Array} List of pending registration requests.
   */
  getPendingRegistrations: async () => {
    const result = await db.manyOrNone(
      `SELECT id, email, first, last, status, request_note, admin_rejection_note
       FROM users
       WHERE status = 'PENDING_APPROVAL'
       ORDER BY id DESC`
    );
    return result;
    console.log("Pending registrations retrieved:");
  },

  /**
   * Gets a single registration by user ID.
   * @param {number} id - The user's ID.
   * @returns {Object|null} The user record or null if not found.
   */
  getRegistrationById: async (id) => {
    const result = await db.manyOrNone(
      `SELECT id, email, first, last, status, request_note, admin_rejection_note
       FROM users
       WHERE id = $1`,
      [id]
    );
    return result.length > 0 ? result[0] : null;
  },

  /**
   * Sets the admin rejection note for a user.
   * @param {number} userId - The user's ID.
   * @param {string} note - The rejection reason.
   */
  setAdminRejectionNote: async (userId, note) => {
    return await db.none("UPDATE users SET admin_rejection_note = $1 WHERE id = $2", [note, userId]);
  },

  /**
   * Sets the user's password using PostgreSQL crypt function.
   * @param {number} userId - The user's ID.
   * @param {string} password - The plain text password (will be hashed).
   */
  setUserPassword: async (userId, password) => {
    return await db.none(
      "UPDATE users SET password = crypt($1, gen_salt('bf')) WHERE id = $2",
      [password, userId]
    );
  }
});

module.exports = createPostgresAdapter;
