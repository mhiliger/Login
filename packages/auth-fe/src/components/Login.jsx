import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import { useAuth } from "../context/AuthProvider";

/**
 * Boilerplate Login component.
 */
const Login = ({
  TextField,
  Checkbox,
  Button,
  Box,
  Stack,
  Typography,
  Alert,
  loginMutation, // result of useLogin hook
  successRoute = "/",
  registerPath = "/register",
  allowStay = true,
  onLoginSuccess
}) => {
  const [formError, setFormError] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    }
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = (values) => {
    setFormError("");
    loginMutation.mutate(values);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setFormError("");
      try {
        const token = loginMutation.data?.data?.accessToken;
        const payload = jwt_decode(token);
        
        if (payload.status !== "Active") {
          setFormError("Successful login... but user is not Active. See system administrator");
          return;
        }

        const authData = {
          userId: payload.userId,
          email: payload.email,
          first: payload.first,
          last: payload.last,
          status: payload.status,
          permissions: payload.permissions,
          accessToken: token,
        };

        setAuth(authData);
        
        if (onLoginSuccess) {
          onLoginSuccess(authData);
        }

        navigate(successRoute);
      } catch (err) {
        console.error("Token decoding error:", err);
        setFormError("Error processing login response");
      }
    }
  }, [loginMutation.isSuccess, loginMutation.data, navigate, setAuth, successRoute, onLoginSuccess]);

  useEffect(() => {
    if (loginMutation.isError) {
      const errorMsg = loginMutation.error?.response?.data?.error || loginMutation.error?.message;
      setFormError(errorMsg);
    }
  }, [loginMutation.isError, loginMutation.error]);

  return (
    <Box sx={{ width: { xs: '90%', md: '33%' }, margin: 'auto', padding: '20px' }}>
      {loginMutation.isLoading && <Alert severity="info">Logging on to system...</Alert>}
      {formError && <Alert severity="error">{formError}</Alert>}
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            margin="normal"
            size="small"
          />
          <TextField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            margin="normal"
            size="small"
          />
          {allowStay && (
            <Checkbox
              form={form}
              name="stayLoggedIn"
              label="Stay Logged In"
            />
          )}
          <Button sx={{ margin: "10px" }} variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Box sx={{ mt: 2 }}>
        <NavLink style={{ textDecoration: "underline" }} to={registerPath}>
          Register to Login
        </NavLink>
      </Box>
    </Box>
  );
};

export default Login;
