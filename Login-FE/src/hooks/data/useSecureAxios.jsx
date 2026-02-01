import { reqSecureAxios } from "../../api/axios";
import { useEffect } from "react";
import useAuth from "../useAuth";
import useRefreshToken from "./useRefreshToken";

const useSecureAxios = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = reqSecureAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = reqSecureAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if detailed error was sent in the response then use it rather than the generic error message
        if (error?.response?.data?.error) {
          error.message =
            error?.response?.data?.error + " (" + error?.response?.status + ")";
        }
        const prevRequest = error?.config;
        // if the previous request was a refresh then return error
        if (prevRequest.url === "refresh") {
          return Promise.reject(error);
        }
        // if the non-refresh request returns 403 then token expired so try to refresh
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true; // label request refresh was tried
          try {
            // execute refresh get request
            const newAccessToken = await refresh();
            // if refresh request returns error then return error
            // debugging showed that error returns are not throwing an error so
            // it does not cause the catch to be triggered that is why it is handled below
            // I think this is a side effect of using useQuery to make the fetch call
            if (newAccessToken.status === "error") {
              // this means a new login request is required
              setAuth({
                error: newAccessToken,
                message: "Unable to refresh connection... please login again.",
              });
              return Promise.reject(newAccessToken?.error);
            }
            // install the new refreshed access token in header
            prevRequest.headers[
              "authorization"
            ] = `Bearer ${newAccessToken?.data?.data?.accessToken}`;
            console.log("Old access token:", auth?.accessToken);
            console.log(
              "New access token:",
              newAccessToken?.data?.data?.accessToken
            );
            // reprocess the request with updated header
            return reqSecureAxios(prevRequest);
          } catch (error) {
            // In case an error is raised by the refresh call then reject the promise
            // this means a new login request is required
            setAuth({
              error: error,
              message: "Unable to refresh connection... please login again.",
            });
            return Promise.reject(error);
          }
        }
        // any other types of errors should just be returned
        return Promise.reject(error);
      }
    );
    return () => {
      reqSecureAxios.interceptors.request.eject(requestIntercept);
      reqSecureAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return reqSecureAxios;
};

export default useSecureAxios;
