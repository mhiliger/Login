import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

/**
 * Hook to handle login mutation.
 * @param {Object} [axiosInstance] - The axios instance to use. If not provided, uses authAxios from AuthProvider.
 * @param {string} loginUrl - The endpoint for login.
 */
const useLogin = (axiosInstance, loginUrl = "auth") => {
  const { authAxios } = useAuth();
  const instance = axiosInstance || authAxios;

  return useMutation({
    mutationFn: (loginData) => {
      return instance({
        url: loginUrl,
        method: "POST",
        data: loginData,
      });
    },
    mutationKey: ["login"]
  });
};

export default useLogin;
