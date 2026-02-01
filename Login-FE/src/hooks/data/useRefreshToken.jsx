import { reqSecureAxios } from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const getRefreshToken = () => {
    return reqSecureAxios({ method: "GET", url: "refresh" });
  };

  const getRefreshTokenSuccess = (data) => {
    setAuth((prev) => {
      return { ...prev, accessToken: data?.data?.accessToken };
    });
  };

  const getRefreshTokenError = (error) => {
    console.log("Refresh Failed", error);
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    ["refresh"],
    getRefreshToken,
    {
      onSuccess: getRefreshTokenSuccess,
      onError: getRefreshTokenError,
      enabled: false,
      retry: false,
      throwOnError: true,
    }
  );

  return refetch;
};

export default useRefreshToken;
