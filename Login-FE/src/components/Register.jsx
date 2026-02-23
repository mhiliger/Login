import React from "react";
import { Register as LibRegister } from "@your-org/auth-fe";

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
    />
  );
}

export default Register;