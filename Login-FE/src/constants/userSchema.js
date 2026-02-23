import * as Yup from "yup";

export const validStatus = [
  {
    id: 1,
    name: "Pending Verification",
    value: "PENDING_VERIFICATION",
  },
  {
    id: 2,
    name: "Pending Approval",
    value: "PENDING_APPROVAL",
  },
  {
    id: 3,
    name: "Approved",
    value: "APPROVED",
  },
  {
    id: 4,
    name: "Active",
    value: "ACTIVE",
  },
  {
    id: 5,
    name: "Rejected",
    value: "REJECTED",
  },
];

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const userSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(
    validStatus.map((status) => status.value),
    "Invalid status value"
  ),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    )
    .required("Required!"),
  confirmPwd: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const userAddSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(
    validStatus.map((status) => status.value),
    "Invalid status value"
  ),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    )
    .required("Required!"),
  confirmPwd: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const userLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const userEditSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first: Yup.string(),
  last: Yup.string(),
  status: Yup.string().oneOf(
    validStatus.map((status) => status.value),
    "Invalid status value"
  ),
  password: Yup.string()
    .nullable() // Allows the field to be null (not required)
    .test(
      "password-match",
      "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character",
      function (value) {
        if (value && PWD_REGEX.test(value)) {
          return true; // Invalid password format
        }
        if (!value) {
          return true;
        }
        return false;
      }
    ),
  confirmPwd: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const userDeleteSchema = Yup.object().shape({});
