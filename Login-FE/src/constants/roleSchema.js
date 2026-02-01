import * as Yup from "yup";


export const roleSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});