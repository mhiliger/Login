import { reqSecureAxios } from "../../api/axios";
import { useSecureAxios as useLibSecureAxios } from "@your-org/auth-fe";

/**
 * App-specific wrapper for the library's useSecureAxios hook.
 */
const useSecureAxios = () => {
  // We pass our existing reqSecureAxios instance to the library hook
  // which will attach the necessary JWT interceptors.
  return useLibSecureAxios(reqSecureAxios, "refresh");
};

export default useSecureAxios;