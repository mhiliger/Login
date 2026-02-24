import { AuthProvider as LibAuthProvider } from "@mhiliger/auth-fe";

/**
 * App-specific wrapper for AuthProvider.
 * In this project, it's a direct re-export from the library.
 */
export const AuthProvider = LibAuthProvider;

export default LibAuthProvider;