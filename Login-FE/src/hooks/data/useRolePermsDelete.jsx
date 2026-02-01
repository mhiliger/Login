import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const rolePermsDelete = (items) => {
  return reqSecureAxios({
    url: "/roleperm/",
    method: "DELETE",
    data: items,
  });
};

export const useRolePermsDelete = () => {
  return useMutation({
    mutationFn: rolePermsDelete,
    mutationKey: "rolePermsDelete",
  });
};
