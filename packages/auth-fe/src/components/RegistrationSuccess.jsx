import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Alert } from "@mui/material";

/**
 * Registration success message component.
 * @param {Object} props
 * @param {string} [props.title='Registration Complete'] - Page title.
 * @param {string} [props.message='Your account is now active.'] - Success message.
 * @param {string} [props.loginPath='/login'] - Path to login page.
 */
const RegistrationSuccess = ({
  title = "Registration Complete",
  message = "Your account is now active. You can log in with your credentials.",
  loginPath = "/login",
}) => {
  return (
    <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Alert severity="success" sx={{ mb: 2 }}>
        {message}
      </Alert>
      <Box sx={{ mt: 3 }}>
        <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
          Go to Login
        </NavLink>
      </Box>
    </Box>
  );
};

export default RegistrationSuccess;
