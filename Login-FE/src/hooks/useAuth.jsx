import { useAuth as useLibAuth } from "@your-org/auth-fe";

/**
 * App-specific wrapper for useAuth hook.
 */
const useAuth = () => {
  return useLibAuth();
};

export default useAuth;