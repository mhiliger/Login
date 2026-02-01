import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const roleDelete = (id) => {
  return reqSecureAxios({
    url: "/role/" + id,
    method: "DELETE",
  });
};

export const useRoleDelete = () => {
  return useMutation({
    mutationFn: roleDelete,
    mutationKey: "roleDelete",
  });
};
