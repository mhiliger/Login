import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const roleEditPut = (role) => {
  return reqSecureAxios({
    url: "/role/" + role.id,
    method: "PUT",
    data: role?.role,
  });
};

export const useRoleEditPut = () => {
  return useMutation({ mutationFn: roleEditPut, mutationKey: "roleEditPut" });
};
