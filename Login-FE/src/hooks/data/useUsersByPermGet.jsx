import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useUsersByPermGet = (perm, options) => {
  const reqSecureAxios = useSecureAxios();

  const usersByPermGet = () => {
    return reqSecureAxios({ method: "GET", url: "usersbyperm/" + perm?.id });
  };
  return useQuery(["usersbyperm", perm?.id], usersByPermGet, {
    // ...options,
    enabled: !!perm?.id,
    ...options,
  });
};
