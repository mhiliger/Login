import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography, Alert, CircularProgress } from "@mui/material";

/**
 * Registration request form component (Phase 1).
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler function.
 * @param {boolean} props.isLoading - Whether submission is in progress.
 * @param {boolean} props.isSuccess - Whether submission succeeded.
 * @param {string} props.successMessage - Message to show on success.
 * @param {Object} props.error - Error object if submission failed.
 * @param {string} [props.loginPath='/login'] - Path to login page.
 */
const RegistrationRequest = ({
  onSubmit: externalOnSubmit,
  isLoading = false,
  isSuccess = false,
  successMessage = "If this email is not already registered, you will receive a verification email shortly.",
  error,
  loginPath = "/login",
}) => {
  const registrationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    first: Yup.string().required("First name is required"),
    last: Yup.string().required("Last name is required"),
    requestNote: Yup.string().max(256, "Request note must be 256 characters or less"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      first: "",
      last: "",
      requestNote: "",
    },
    resolver: yupResolver(registrationSchema),
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
          Registration Submitted
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
        <Typography variant="body1" paragraph>
          Please check your email for a verification link. The link will expire in 24 hours.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          If you don't receive an email within a few minutes, check your spam folder.
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
        Request Access
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Fill out this form to request access. An administrator will review your request after you verify your email.
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
          <TextField
            {...register("first")}
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            margin="normal"
            size="small"
            required
            error={!!errors.first}
            helperText={errors.first?.message}
          />
          <TextField
            {...register("last")}
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            margin="normal"
            size="small"
            required
            error={!!errors.last}
            helperText={errors.last?.message}
          />
          <TextField
            {...register("requestNote")}
            label="Request Note (Optional)"
            type="text"
            placeholder="Why do you need access?"
            margin="normal"
            size="small"
            multiline
            rows={3}
            error={!!errors.requestNote}
            helperText={errors.requestNote?.message || "Max 256 characters"}
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
              "Submit Request"
            )}
          </Button>
        </Stack>
      </form>

      <Box sx={{ mt: 2 }}>
        <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
          Already have an account? Login
        </NavLink>
      </Box>
    </Box>
  );
};

export default RegistrationRequest;
