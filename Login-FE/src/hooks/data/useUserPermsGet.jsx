import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useUserPermsGet = (user, options) => {
  const reqSecureAxios = useSecureAxios();

  const userPermsGet = () => {
    return reqSecureAxios({ method: "GET", url: "userperms/" + user?.id });
  };
  return useQuery(["userperms", user?.id], userPermsGet, {
    // ...options,
    enabled: !!user?.id,
    ...options,
  });
};
