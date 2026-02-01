import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const userRolesAddPost = (items) => {
  return reqSecureAxios({
    url: "/userrole/",
    method: "POST",
    data: items,
  });
};

export const useUserRolesAddPost = () => {
  return useMutation({
    mutationFn: userRolesAddPost,
    mutationKey: "userRolesAddPost",
  });
};
