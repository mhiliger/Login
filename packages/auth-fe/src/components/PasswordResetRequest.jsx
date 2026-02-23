import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography, Alert, CircularProgress } from "@mui/material";

/**
 * Password reset request form component.
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler function.
 * @param {boolean} props.isLoading - Whether submission is in progress.
 * @param {boolean} props.isSuccess - Whether submission succeeded.
 * @param {string} props.successMessage - Message to show on success.
 * @param {Object} props.error - Error object if submission failed.
 * @param {string} [props.loginPath='/login'] - Path to login page.
 */
const PasswordResetRequest = ({
  onSubmit: externalOnSubmit,
  isLoading = false,
  isSuccess = false,
  successMessage = "If an account exists for this email, you will receive a password reset link shortly.",
  error,
  loginPath = "/login",
}) => {
  const resetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(resetSchema),
  });

  const { handleSubmit, register, formState: { errors } } = form;

  const onSubmit = (values) => {
    if (externalOnSubmit) {
      externalOnSubmit(values);
    }
  };

  if (isSuccess) {
    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Reset Link Sent
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
        <Typography variant="body1" paragraph>
          Please check your email for a link to reset your password.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
            Return to Login
          </NavLink>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter your email address below and we'll send you a link to reset your password.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.error || error.message || "An error occurred"}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter your email"
            margin="normal"
            size="small"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </Stack>
      </form>

      <Box sx={{ mt: 2 }}>
        <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
          Back to Login
        </NavLink>
      </Box>
    </Box>
  );
};

export default PasswordResetRequest;
