import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/**
 * Boilerplate Register component.
 * @param {Object} props
 * @param {React.Component} props.TextField - Text input component to use.
 * @param {React.Component} props.Button - Button component to use.
 * @param {React.Component} props.Box - Box/Container component.
 * @param {React.Component} props.Stack - Stack/Layout component.
 * @param {React.Component} props.Typography - Typography component.
 * @param {Function} props.onSubmit - Custom submit handler.
 */
const Register = ({
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  onSubmit: externalOnSubmit,
  loginPath = "/login"
}) => {
  const navigate = useNavigate();
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const message = "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character";

  const registrationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(regex, message)
      .required("Required"),
    confirmPwd: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPwd: "",
    },
    resolver: yupResolver(registrationSchema),
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = (values) => {
    if (externalOnSubmit) {
      externalOnSubmit(values);
    } else {
      console.log("Registration submitted:", values);
      // Default behavior or link to a hook
    }
  };

  return (
    <Box sx={{ width: { xs: '90%', md: '33%' }, margin: 'auto', padding: '20px' }}>
      <Typography variant="h5">Register</Typography>

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
          <TextField
            form={form}
            name="confirmPwd"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter Password"
            margin="normal"
            size="small"
          />

          <Button sx={{ margin: "10px" }} variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Box sx={{ mt: 2 }}>
        <NavLink style={{ textDecoration: "underline" }} to={loginPath}>
          Login if already a user
        </NavLink>
      </Box>
    </Box>
  );
};

export default Register;
