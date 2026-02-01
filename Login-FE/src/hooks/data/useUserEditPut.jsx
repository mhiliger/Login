import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const userEditPut = (user) => {
  return reqSecureAxios({
    url: "/user/" + user?.id,
    method: "PUT",
    data: user?.user,
  });
};

export const useUserEditPut = () => {
  return useMutation({ mutationFn: userEditPut, mutationKey: "userEditPut" });
};
