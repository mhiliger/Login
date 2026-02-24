import { useAuth as useLibAuth } from "@mhiliger/auth-fe";

/**
 * App-specific wrapper for useAuth hook.
 */
const useAuth = () => {
  return useLibAuth();
};

export default useAuth;