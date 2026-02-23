import { useMutation } from "@tanstack/react-query";
import { reqSecureAxios } from "../../api/axios";

const userResetPassword = (userId) => {
  return reqSecureAxios({
    url: "/admin/registration/" + userId + "/reset-password",
    method: "POST",
  });
};

export const useUserResetPassword = () => {
  return useMutation({ mutationFn: userResetPassword, mutationKey: "userResetPassword" });
};
