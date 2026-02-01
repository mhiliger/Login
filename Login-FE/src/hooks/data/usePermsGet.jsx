import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const usePermsGet = (options) => {
  const reqSecureAxios = useSecureAxios();

  const permsGet = () => {
    return reqSecureAxios({ method: "GET", url: "perms" });
  };

  return useQuery(["perms"], permsGet, options);
};
