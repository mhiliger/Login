import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useRolesByPermGet = (perm, options) => {
  const reqSecureAxios = useSecureAxios();

  const rolesByPermGet = () => {
    return reqSecureAxios({ method: "GET", url: "rolesbyperm/" + perm?.id });
  };
  return useQuery(["rolesbyperm", perm?.id], rolesByPermGet, {
    // ...options,
    enabled: !!perm?.id,
    ...options,
  });
};
