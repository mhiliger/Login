import React from "react";
import { Login as LibLogin, useLogin } from "@your-org/auth-fe";
import { Button, Stack, Box, Typography, Alert } from "@mui/material";
import TextField from "./HookFormMUI/TextField";
import Checkbox from "./HookFormMUI/Checkbox";
import { reqSecureAxios } from "../api/axios";

/**
 * App-specific wrapper for the library's boilerplate Login component.
 */
function Login(props) {
  const loginMutation = useLogin(reqSecureAxios, "auth");

  return (
    <LibLogin
      {...props}
      loginMutation={loginMutation}
      TextField={TextField}
      Checkbox={Checkbox}
      Button={Button}
      Box={Box}
      Stack={Stack}
      Typography={Typography}
      Alert={Alert}
    />
  );
}

export default Login;