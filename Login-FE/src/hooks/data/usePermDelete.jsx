import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const permDelete = (id) => {
  return reqSecureAxios({
    url: "/perm/" + id,
    method: "DELETE",
  });
};

export const usePermDelete = () => {
  return useMutation({
    mutationFn: permDelete,
    mutationKey: "permDelete",
  });
};
