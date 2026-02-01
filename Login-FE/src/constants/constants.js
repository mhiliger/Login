import * as Yup from "yup";

export const validStatus = [
  {
    id: 1,
    name: "Pending",
    value: "Pending",
  },
  {
    id: 2,
    name: "Active",
    value: "Active",
  },
  {
    id: 3,
    name: "Inactive",
    value: "Inactive",
  },
];

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const userSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(validStatus.map((status)=>status.value), "Invalid status value"),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    ).required("Required!"),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const userAddSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(validStatus.map((status)=>status.value), "Invalid status value"),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    ).required("Required!"),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const userEditSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(validStatus.map((status)=>status.value), "Invalid status value"),
  password: Yup.string(),
    // .matches(
    //   PWD_REGEX,
    //   "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    // ),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const userDeleteSchema = Yup.object().shape({});

export const userRoleDeleteSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});

export const userRoleAddSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});


export const roleSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  role_desc: Yup.string().required("Required"),
});
export const permSchema = Yup.object().shape({
  system: Yup.string().required("Required"),
  perm_desc: Yup.string().required("Required"),
});

