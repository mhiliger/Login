const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

/**
 * Fetches a secret from Google Cloud Secret Manager
 * @param {string} secretName - The name of the secret (e.g., 'DATABASE_URL')
 * @returns {Promise<string>} The secret payload
 */
async function getSecret(secretName) {
     try {
          const name = `projects/general-485822/secrets/${secretName}/versions/latest`;
          const [version] = await client.accessSecretVersion({ name });
          return version.payload.data.toString();
     } catch (err) {
          console.error(`Error accessing secret ${secretName}:`, err);
          throw err; // Re-throw so the caller knows the boot failed
     }
}

// This line makes the function available to other files
module.exports = { getSecret };