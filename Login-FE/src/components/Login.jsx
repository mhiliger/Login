import React from "react";
import { Login as LibLogin, useLogin } from "@your-org/auth-fe";
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
    />
  );
}

export default Login;