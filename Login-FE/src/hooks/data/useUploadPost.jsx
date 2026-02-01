import { useMutation } from "@tanstack/react-query";
import { reqAxios } from "../api/axios";

const uploadPost = (userId, multiGroup, files, title) => {
  for (const [key, value] of files.entries()) {
    console.log(`${key}:`, value);
  }

  return reqAxios({
    url: "/uploadGroups/4",
    method: "POST",
    data: files,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useUploadPost = () => {
  return useMutation({
    mutationFn: uploadPost,
    mutationKey: "uploadPost",
    onSuccess: (data) => {
      console.log("Mutation succeeded:", data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
