import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

/**
 * Hook for verifying an email with a token.
 * @param {Object} [axios] - Axios instance for API calls. If not provided, uses authAxios from AuthProvider.
 * @param {string} token - Verification token from the URL.
 * @param {string} [baseUrl='/register/verify'] - Verification endpoint base URL.
 * @returns {Object} TanStack Query query object.
 */
const useEmailVerification = (axios, token, baseUrl = "/register/verify") => {
  const { authAxios } = useAuth();
  const instance = axios || authAxios;

  return useQuery({
    queryKey: ["emailVerification", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No verification token provided");
      }
      const response = await instance.get(`${baseUrl}/${token}`);
      return response.data;
    },
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useEmailVerification;
