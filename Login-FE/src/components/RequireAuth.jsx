import { RequireAuth as LibRequireAuth } from "@your-org/auth-fe";

/**
 * App-specific wrapper for RequireAuth.
 * This ensures the component remains compatible with existing imports.
 */
const RequireAuth = LibRequireAuth;

export default RequireAuth;