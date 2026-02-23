import { useMutation } from "@tanstack/react-query";

/**
 * Hook for submitting a registration request.
 * @param {Object} axios - Axios instance for API calls.
 * @param {string} [url='/register/submit'] - Registration endpoint URL.
 * @returns {Object} TanStack Query mutation object.
 */
const useRegistrationSubmit = (axios, url = "/register/submit") => {
  return useMutation({
    mutationFn: async ({ email, first, last, requestNote }) => {
      const response = await axios.post(url, {
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
