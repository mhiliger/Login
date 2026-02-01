import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import TextField from "./HookFormMUI/TextField";

import { Button, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useNavigate, NavLink } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        PWD_REGEX,
        "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
      )
      .required("Required"),
    confirmPwd: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPwd: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { register, handleSubmit, formState, control } = form;

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Box width="33%" margin="auto" padding="20px">
        <Typography variant="h5">Register</Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack>
            <TextField
              form={form}
              name="email"
              label="email"
              type="email"
              placeholder="Enter email"
              margin="normal"
              size="small"
            />
            <TextField
              form={form}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              margin="normal"
              size="small"
            />
            <TextField
              form={form}
              name="confirmPwd"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter Password"
              margin="normal"
              size="small"
            />

            <Button sx={{ margin: "10px" }} variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
        <DevTool control={control} />
        <NavLink style={{ textDecoration: "underline" }} to="/login">
          Login if already a user
        </NavLink>
      </Box>
    </>
  );
}

export default Register;
