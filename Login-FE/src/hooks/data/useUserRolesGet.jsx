import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useUserRolesGet = (user, options) => {
  const reqSecureAxios = useSecureAxios();

  const userRolesGet = () => {
    return reqSecureAxios({ method: "GET", url: "userroles/" + user?.id });
  };
  return useQuery(["userroles", user?.id], userRolesGet, {
    enabled: !!user?.id,
    ...options,
  });
};
