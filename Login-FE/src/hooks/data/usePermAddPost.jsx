import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const postPermAdd = (perm) => {
  return reqSecureAxios({
    url: "/perm",
    method: "POST",
    data: perm,
  });
};

export const usePermAddPost = () => {
  return useMutation({ mutationFn: postPermAdd, mutationKey: "postPermAdd" });
};
