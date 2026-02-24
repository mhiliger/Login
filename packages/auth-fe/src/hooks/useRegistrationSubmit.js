import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

/**
 * Hook for submitting a registration request.
 * @param {Object} [axios] - Axios instance for API calls. If not provided, uses authAxios from AuthProvider.
 * @param {string} [url='/register/submit'] - Registration endpoint URL.
 * @returns {Object} TanStack Query mutation object.
 */
const useRegistrationSubmit = (axios, url = "/register/submit") => {
  const { authAxios } = useAuth();
  const instance = axios || authAxios;

  return useMutation({
    mutationFn: async ({ email, first, last, requestNote }) => {
      const response = await instance.post(url, {
        email,
        first,
        last,
        requestNote,
      });
      return response.data;
    },
  });
};

export default useRegistrationSubmit;
