import React from "react";
import { Unauthorized as LibUnauthorized } from "@your-org/auth-fe";
import { Typography, Stack, Box } from "@mui/material";

/**
 * App-specific wrapper for the library's boilerplate Unauthorized component.
 */
function Unauthorized(props) {
  return (
    <LibUnauthorized
      {...props}
      Typography={Typography}
      Stack={Stack}
      Box={Box}
    />
  );
}

export default Unauthorized;