import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

export const useUsersGet = (options) => {
  const reqSecureAxios = useSecureAxios();

  const usersGet = () => {
    return reqSecureAxios({ method: "GET", url: "users" });
  };

  return useQuery(["users"], usersGet, options);
};
