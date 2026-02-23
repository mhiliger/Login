import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";

/**
 * Email verification result component (Phase 2).
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether verification is in progress.
 * @param {boolean} props.isSuccess - Whether verification succeeded.
 * @param {boolean} props.isError - Whether verification failed.
 * @param {Object} props.error - Error object if verification failed.
 * @param {Object} props.data - Response data from verification.
 * @param {string} [props.loginPath='/login'] - Path to login page.
 */
const EmailVerification = ({
  isLoading = false,
  isSuccess = false,
  isError = false,
  error,
  data,
  loginPath = "/login",
}) => {
  if (isLoading) {
    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="h6">Verifying your email...</Typography>
      </Box>
    );
  }

  if (isError) {
    const errorMessage = error?.response?.data?.error || error?.message || "Verification failed";

    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Verification Failed
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
        <Typography variant="body1" paragraph>
          The verification link may have expired or already been used.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          If you need a new verification link, please submit a new registration request.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <NavLink style={{ textDecoration: "underline" }} to="/register">
            Submit New Request
          </NavLink>
          <Box component="span" sx={{ mx: 2 }}>|</Box>
          <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
            Return to Login
          </NavLink>
        </Box>
      </Box>
    );
  }

  if (isSuccess) {
    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Email Verified
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          {data?.message || "Your email has been verified successfully."}
        </Alert>
        <Typography variant="body1" paragraph>
          Your request is now pending administrator review.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You will receive an email when your request has been reviewed. This typically takes 1-2 business days.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
            Return to Login
          </NavLink>
        </Box>
      </Box>
    );
  }

  // Default/initial state
  return (
    <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }}>
      <Typography variant="h6">Processing verification...</Typography>
    </Box>
  );
};

export default EmailVerification;
