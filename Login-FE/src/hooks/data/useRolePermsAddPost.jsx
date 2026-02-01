import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const rolePermsAddPost = (items) => {
  return reqSecureAxios({
    url: "/roleperm/",
    method: "POST",
    data: items,
  });
};

export const useRolePermsAddPost = () => {
  return useMutation({
    mutationFn: rolePermsAddPost,
    mutationKey: "rolePermsAddPost",
  });
};
