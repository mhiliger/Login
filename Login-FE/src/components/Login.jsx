import { useEffect, useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useLoginPost } from "../hooks/data/useLoginPost";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import jwt_decode from "jwt-decode";

import { Button, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import TextField from "./HookFormMUI/TextField";
import Checkbox from "./HookFormMUI/Checkbox";

import { userLoginSchema } from "../constants/userSchema";

function Login(props) {
  const { successRoute, errorRoute, allowStay } = props;
  const [formError, setFormError] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    },
    resolver: yupResolver(userLoginSchema),
  });

  const { register, handleSubmit, formState, control } = form;

  const login = useLoginPost();

  const onSubmit = (values) => {
    setFormError("");
    login.mutate(values);
  };

  useEffect(() => {
    if (login.isSuccess) {
      setFormError("");
      console.log(login.data);
      let payload = jwt_decode(login.data?.data?.accessToken);
      console.log("payload", payload);
      const accessToken = payload?.accessToken;
      const permissions = payload?.permissions;
      const first = payload?.first;
      const last = payload?.last;
      const status = payload?.status;
      const update_at = payload?.update_at;
      const email = payload?.email;
      const userId = payload?.userId;
      if (status === "Active") {
        setAuth({
          userId: userId,
          email: email,
          first,
          last,
          status,
          update_at,
          permissions,
          accessToken: login.data?.data?.accessToken,
        });
      } else {
        setFormError(
          "Successful login... but user is not Active.  See system administrator"
        );
        return;
      }
      navigate(successRoute);
    }
  }, [login.isSuccess]);

  useEffect(() => {
    if (login.isError) {
      if (errorRoute) {
        navigate(errorRoute);
        return;
      }

      // if error response body has error member
      // use this error message with message status
      // This transformation is done with interceptor after successful login
      if (login.error?.response?.data?.error) {
        setFormError(
          login.error?.response?.data?.error +
            " (" +
            login.error?.response?.status +
            ")"
        );
      } else {
        setFormError(login?.error?.message);
      }
    }
  }, [login.isError]);

  useEffect(() => {
    // This will happen if unable to refresh connection
    if (auth?.error && auth?.message) {
      console.log("SET AUTH ERROR");
      console.log(auth?.error);
      setFormError(auth?.message);
    }
  }, [auth]);

  // {
  //   if (login.isLoading) {
  //     return <Typography variant="h3">Validating Login</Typography>;
  //   }
  // }

  return (
    <>
      <Box width="33%" margin="auto" padding="20px">
        {login.isLoading && (
          <Alert severity="info">Logging on to system...</Alert>
        )}
        {formError && <Alert severity="error">{formError}</Alert>}
        <Typography variant="h5">Login</Typography>
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
            {allowStay && (
              <Checkbox
                form={form}
                name="stayLoggedIn"
                label="Stay Logged In:"
                labelPlacement="end"
              />
            )}
            <Button sx={{ margin: "10px" }} variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
        <DevTool control={control} />
        <NavLink style={{ textDecoration: "underline" }} to="/register">
          Register to Login
        </NavLink>
      </Box>
    </>
  );
}

export default Login;
