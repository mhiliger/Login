import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const permEditPut = (perm) => {
  return reqSecureAxios({
    url: "/perm/" + perm?.id,
    method: "PUT",
    data: perm?.perm,
  });
};

export const usePermEditPut = () => {
  return useMutation({ mutationFn: permEditPut, mutationKey: "permEditPut" });
};
