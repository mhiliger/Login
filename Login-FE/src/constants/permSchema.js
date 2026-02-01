import * as Yup from "yup";

export const permSchema = Yup.object().shape({
  system: Yup.string().required("Required"),
  perm_desc: Yup.string().required("Required"),
});