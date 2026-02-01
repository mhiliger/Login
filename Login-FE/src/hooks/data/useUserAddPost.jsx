import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const postUserAdd = (user) => {
  return reqSecureAxios({
    url: "/user",
    method: "POST",
    data: user,
  });
};

export const useUserAddPost = () => {
  return useMutation({ mutationFn: postUserAdd, mutationKey: "postUserAdd" });
};
