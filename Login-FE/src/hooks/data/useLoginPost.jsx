import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const loginPost = (login) => {
  return reqSecureAxios({
    url: "/auth",
    method: "POST",
    data: login,
  });
};

export const useLoginPost = () => {
  return useMutation({ mutationFn: loginPost, mutationKey: "loginPost" });
};
