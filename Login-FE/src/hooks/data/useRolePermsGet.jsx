import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useRolePermsGet = (role, options) => {
  const reqSecureAxios = useSecureAxios();

  const rolePermsGet = () => {
    return reqSecureAxios({ method: "GET", url: "roleperms/" + role?.id });
  };
  return useQuery(["roleperms", role?.id], rolePermsGet, {
    // ...options,
    enabled: !!role?.id,
    ...options,
  });
};
