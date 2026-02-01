import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useUsersByRoleGet = (role, options) => {
  const reqSecureAxios = useSecureAxios();

  const usersByRoleGet = () => {
    return reqSecureAxios({ method: "GET", url: "usersbyrole/" + role?.id });
  };
  return useQuery(["usersbyrole", role?.id], usersByRoleGet, {
    // ...options,
    enabled: !!role?.id,
    ...options,
  });
};
