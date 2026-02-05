import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

/**
 * Hook to attach interceptors to an axios instance for JWT handling.
 * @param {Object} axiosInstance - The axios instance to secure.
 * @param {string} refreshUrl - The endpoint for refreshing the token.
 */
const useSecureAxios = (axiosInstance, refreshUrl = "refresh") => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken(axiosInstance, refreshUrl);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        
        if (error?.response?.data?.error) {
          error.message = `${error.response.data.error} (${error.response.status})`;
        }

        if (prevRequest.url === refreshUrl) {
          return Promise.reject(error);
        }

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const result = await refresh();
            const newAccessToken = result?.data?.data?.accessToken;
            
            if (!newAccessToken) {
               setAuth({ message: "Session expired. Please login again." });
               return Promise.reject(error);
            }

            prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          } catch (refreshError) {
            setAuth({ message: "Session expired. Please login again." });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, axiosInstance, refreshUrl, setAuth]);

  return axiosInstance;
};

export default useSecureAxios;
