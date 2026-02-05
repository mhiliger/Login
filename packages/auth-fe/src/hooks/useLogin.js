import { useMutation } from "@tanstack/react-query";

/**
 * Hook to handle login mutation.
 * @param {Object} axiosInstance - The axios instance to use.
 * @param {string} loginUrl - The endpoint for login.
 */
const useLogin = (axiosInstance, loginUrl = "auth") => {
  return useMutation({
    mutationFn: (loginData) => {
      return axiosInstance({
        url: loginUrl,
        method: "POST",
        data: loginData,
      });
    },
    mutationKey: ["login"]
  });
};

export default useLogin;
