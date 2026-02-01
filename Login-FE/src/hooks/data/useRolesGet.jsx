import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useRolesGet = (options) => {
  const reqSecureAxios = useSecureAxios();

  const rolesGet = () => {
    return reqSecureAxios({ method: "GET", url: "roles" });
  };

  return useQuery(["roles"], rolesGet, options);
};
