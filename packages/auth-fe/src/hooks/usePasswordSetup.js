import { useQuery, useMutation } from "@tanstack/react-query";

/**
 * Hook for validating a password setup token.
 * @param {Object} axios - Axios instance for API calls.
 * @param {string} token - Password setup token from the URL.
 * @param {string} [baseUrl='/register/setup'] - Setup endpoint base URL.
 * @returns {Object} TanStack Query query object.
 */
export const useValidateSetupToken = (axios, token, baseUrl = "/register/setup") => {
  return useQuery({
    queryKey: ["validateSetupToken", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No setup token provided");
      }
      const response = await axios.get(`${baseUrl}/${token}`);
      return response.data;
    },
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for setting password after approval.
 * @param {Object} axios - Axios instance for API calls.
 * @param {string} [baseUrl='/register/setup'] - Setup endpoint base URL.
 * @returns {Object} TanStack Query mutation object.
 */
export const useSetPassword = (axios, baseUrl = "/register/setup") => {
  return useMutation({
    mutationFn: async ({ token, password }) => {
      const response = await axios.post(`${baseUrl}/${token}`, { password });
      return response.data;
    },
  });
};

/**
 * Hook for requesting a password reset.
 * @param {Object} axios - Axios instance for API calls.
 * @param {string} [baseUrl='/register/forgot-password'] - Forgot password endpoint base URL.
 * @returns {Object} TanStack Query mutation object.
 */
export const useRequestPasswordReset = (axios, baseUrl = "/register/forgot-password") => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await axios.post(baseUrl, { email });
      return response.data;
    },
  });
};

/**
 * Combined hook for password setup workflow.
 * @param {Object} axios - Axios instance for API calls.
 * @param {string} token - Password setup token from the URL.
 * @param {string} [baseUrl='/register/setup'] - Setup endpoint base URL.
 * @returns {Object} Object with validation query and setPassword mutation.
 */
const usePasswordSetup = (axios, token, baseUrl = "/register/setup") => {
  const validation = useValidateSetupToken(axios, token, baseUrl);
  const setPassword = useSetPassword(axios, baseUrl);

  return {
    validation,
    setPassword,
    isValidToken: validation.isSuccess && validation.data?.valid,
    userEmail: validation.data?.email,
    userFirst: validation.data?.first,
  };
};

export default usePasswordSetup;
