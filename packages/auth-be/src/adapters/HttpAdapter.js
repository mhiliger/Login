/**
 * An HTTP adapter for the authentication library that delegates to a central identity service.
 * This allows applications to use the authentication and registration routers without
 * connecting directly to the Login database.
 *
 * @param {Object} httpClient - An axios-like HTTP client (e.g., axios instance).
 * @param {string} baseUrl - The base URL of the central identity service.
 * @returns {Object} An auth adapter implementation.
 */
const createHttpAdapter = (httpClient, baseUrl = "") => {
  const getUrl = (path) => `${baseUrl}${path}`;

  return {
    /**
     * Validates user credentials by calling the central service.
     */
    validateUser: async (email, password) => {
      try {
        const response = await httpClient.post(getUrl("/internal/auth/validate"), { email, password });
        return response.data;
      } catch (error) {
        return null;
      }
    },

    /**
     * Retrieves user permissions IDs from the central service.
     */
    getUserPermissions: async (email) => {
      try {
        const response = await httpClient.get(getUrl(`/internal/auth/permissions/${email}`));
        return response.data;
      } catch (error) {
        return [];
      }
    },

    /**
     * Saves the refresh token for a user via the central service.
     */
    saveRefreshToken: async (userId, refreshtoken) => {
      return await httpClient.post(getUrl("/internal/auth/refresh-token"), { userId, refreshtoken });
    },

    /**
     * Finds a user by their refresh token via the central service.
     */
    findUserByRefreshToken: async (refreshToken) => {
      try {
        const response = await httpClient.post(getUrl("/internal/auth/find-by-refresh"), { refreshToken });
        return response.data;
      } catch (error) {
        return null;
      }
    },

    /**
     * Clears the refresh token for a user via the central service.
     */
    clearRefreshToken: async (userId) => {
      return await httpClient.post(getUrl("/internal/auth/clear-refresh"), { userId });
    },

    // ==================== Registration Workflow Methods ====================

    findUserByEmail: async (email) => {
      try {
        const response = await httpClient.get(getUrl(`/internal/reg/user/${email}`));
        return response.data;
      } catch (error) {
        return null;
      }
    },

    createRegistrationRequest: async (email, first, last, requestNote) => {
      const response = await httpClient.post(getUrl("/internal/reg/submit"), { email, first, last, requestNote });
      return response.data;
    },

    updateUserStatus: async (userId, status) => {
      return await httpClient.post(getUrl("/internal/reg/status"), { userId, status });
    },

    saveRegistrationToken: async (userId, tokenHash, tokenType, expiresAt) => {
      const response = await httpClient.post(getUrl("/internal/reg/token"), { userId, tokenHash, tokenType, expiresAt });
      return response.data;
    },

    findValidToken: async (tokenHash, tokenType) => {
      try {
        const response = await httpClient.post(getUrl("/internal/reg/find-token"), { tokenHash, tokenType });
        return response.data;
      } catch (error) {
        return null;
      }
    },

    markTokenUsed: async (tokenId) => {
      return await httpClient.post(getUrl("/internal/reg/mark-token-used"), { tokenId });
    },

    invalidateUserTokens: async (userId, tokenType) => {
      return await httpClient.post(getUrl("/internal/reg/invalidate-tokens"), { userId, tokenType });
    },

    getPendingRegistrations: async () => {
      const response = await httpClient.get(getUrl("/internal/reg/pending"));
      return response.data;
    },

    getRegistrationById: async (id) => {
      try {
        const response = await httpClient.get(getUrl(`/internal/reg/request/${id}`));
        return response.data;
      } catch (error) {
        return null;
      }
    },

    setAdminRejectionNote: async (userId, note) => {
      return await httpClient.post(getUrl("/internal/reg/rejection-note"), { userId, note });
    },

    setUserPassword: async (userId, password) => {
      return await httpClient.post(getUrl("/internal/reg/set-password"), { userId, password });
    }
  };
};

module.exports = createHttpAdapter;
