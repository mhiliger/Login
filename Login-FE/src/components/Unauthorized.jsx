import React from "react";
import { Unauthorized as LibUnauthorized } from "@your-org/auth-fe";

/**
 * App-specific wrapper for the library's boilerplate Unauthorized component.
 */
function Unauthorized(props) {
  return (
    <LibUnauthorized
      {...props}
    />
  );
}

export default Unauthorized;