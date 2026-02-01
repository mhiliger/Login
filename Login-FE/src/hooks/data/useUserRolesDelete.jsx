import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const userRoleDelete = (items) => {
  return reqSecureAxios({
    url: "/userrole/",
    method: "DELETE",
    data: items,
  });
};

export const useUserRolesDelete = () => {
  return useMutation({
    mutationFn: userRoleDelete,
    mutationKey: "userRoleDelete",
  });
};
