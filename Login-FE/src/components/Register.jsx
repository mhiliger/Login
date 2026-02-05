import React from "react";
import { Register as LibRegister } from "@your-org/auth-fe";
import { Button, Stack, Box, Typography } from "@mui/material";
import TextField from "./HookFormMUI/TextField";

/**
 * App-specific wrapper for the library's boilerplate Register component.
 */
function Register(props) {
  const onSubmit = (values) => {
    console.log("App-specific registration submit:", values);
    // In a real app, you'd call a registration mutation here
  };

  return (
    <LibRegister
      {...props}
      onSubmit={onSubmit}
      TextField={TextField}
      Button={Button}
      Box={Box}
      Stack={Stack}
      Typography={Typography}
    />
  );
}

export default Register;