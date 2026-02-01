import * as Yup from "yup";

export const userRoleDeleteSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});

export const userRoleAddSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});
