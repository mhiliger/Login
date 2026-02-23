import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography, Alert, CircularProgress } from "@mui/material";

/**
 * Password setup form component (Phase 4).
 * @param {Object} props
 * @param {boolean} props.isValidating - Whether token validation is in progress.
 * @param {boolean} props.isValidToken - Whether the token is valid.
 * @param {Object} props.validationError - Error from token validation.
 * @param {string} props.userEmail - User's email from validation.
 * @param {string} props.userFirst - User's first name from validation.
 * @param {Function} props.onSubmit - Submit handler function.
 * @param {boolean} props.isSubmitting - Whether password submission is in progress.
 * @param {boolean} props.isSuccess - Whether password was set successfully.
 * @param {Object} props.submitError - Error from password submission.
 * @param {string} [props.loginPath='/login'] - Path to login page.
 * @param {RegExp} [props.passwordRegex] - Regex for password validation.
 * @param {string} [props.passwordMessage] - Password validation message.
 */
const PasswordSetup = ({
  isValidating = false,
  isValidToken = false,
  validationError,
  userEmail,
  userFirst,
  onSubmit: externalOnSubmit,
  isSubmitting = false,
  isSuccess = false,
  submitError,
  loginPath = "/login",
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  passwordMessage = "8-24 characters, must include uppercase and lowercase letters, a number and a special character (!@#$%)",
}) => {
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(passwordRegex, passwordMessage)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });

  const { handleSubmit, register, formState: { errors } } = form;

  const onSubmit = (values) => {
    if (externalOnSubmit) {
      externalOnSubmit({ password: values.password });
    }
  };

  // Loading state while validating token
  if (isValidating) {
    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="h6">Validating your link...</Typography>
      </Box>
    );
  }

  // Invalid token state
  if (!isValidToken && !isValidating) {
    const errorMessage = validationError?.response?.data?.error || validationError?.message || "Invalid or expired link";

    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Invalid Link
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
        <Typography variant="body1" paragraph>
          This password setup link is invalid or has expired.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          If you believe this is an error, please contact an administrator.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
            Return to Login
          </NavLink>
        </Box>
      </Box>
    );
  }

  // Success state after password is set
  if (isSuccess) {
    return (
      <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Password Set Successfully
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          Your password has been set. You can now log in to your account.
        </Alert>
        <Box sx={{ mt: 3 }}>
          <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
            Go to Login
          </NavLink>
        </Box>
      </Box>
    );
  }

  // Password setup form
  return (
    <Box sx={{ width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Set Your Password
      </Typography>
      {userFirst && (
        <Typography variant="body1" sx={{ mb: 1 }}>
          Welcome, {userFirst}!
        </Typography>
      )}
      {userEmail && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Setting password for: {userEmail}
        </Typography>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError.response?.data?.error || submitError.message || "An error occurred"}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            placeholder="Enter your password"
            margin="normal"
            size="small"
            required
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Typography variant="caption" color="text.secondary">
            {passwordMessage}
          </Typography>
          <TextField
            {...register("confirmPassword")}
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            margin="normal"
            size="small"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              "Set Password"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PasswordSetup;
