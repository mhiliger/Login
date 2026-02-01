import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const userDelete = (id) => {
  return reqSecureAxios({
    url: "/user/" + id,
    method: "DELETE",
  });
};

export const useUserDelete = () => {
  return useMutation({
    mutationFn: userDelete,
    mutationKey: "userDelete",
  });
};
