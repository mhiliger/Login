import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

/**
 * Hook to handle token refresh logic.
 * @param {Object} axiosInstance - The axios instance to use for the refresh request.
 * @param {string} refreshUrl - The endpoint for refreshing the token (e.g., "/refresh").
 */
const useRefreshToken = (axiosInstance, refreshUrl = "refresh") => {
  const { setAuth } = useAuth();

  const getRefreshToken = () => {
    return axiosInstance({ method: "GET", url: refreshUrl });
  };

  const { refetch } = useQuery(
    ["refresh"],
    getRefreshToken,
    {
      onSuccess: (data) => {
        setAuth((prev) => ({ ...prev, accessToken: data?.data?.accessToken }));
      },
      onError: (error) => {
        console.log("Refresh Failed", error);
      },
      enabled: false,
      retry: false,
    }
  );

  return refetch;
};

export default useRefreshToken;
