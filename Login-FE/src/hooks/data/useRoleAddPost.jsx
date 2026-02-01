import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const postRoleAdd = (role) => {
  return reqSecureAxios({
    url: "/role",
    method: "POST",
    data: role,
  });
};

export const useRoleAddPost = () => {
  return useMutation({ mutationFn: postRoleAdd, mutationKey: "postRoleAdd" });
};
