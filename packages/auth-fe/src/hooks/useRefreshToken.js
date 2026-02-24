import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

/**
 * Hook to handle token refresh logic.
 * @param {Object} [axiosInstance] - The axios instance to use. If not provided, uses authAxios from AuthProvider.
 * @param {string} refreshUrl - The endpoint for refreshing the token (e.g., "/refresh").
 */
const useRefreshToken = (axiosInstance, refreshUrl = "refresh") => {
  const { setAuth, authAxios } = useAuth();
  const instance = axiosInstance || authAxios;

  const getRefreshToken = () => {
    return instance({ method: "GET", url: refreshUrl });
  };

  const { refetch } = useQuery({
    queryKey: ["refresh"],
    queryFn: getRefreshToken,
    onSuccess: (data) => {
      setAuth((prev) => ({ ...prev, accessToken: data?.data?.accessToken }));
    },
    onError: (error) => {
      console.log("Refresh Failed", error);
    },
    enabled: false,
    retry: false,
  });

  return refetch;
};

export default useRefreshToken;
