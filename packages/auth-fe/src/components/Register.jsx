import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";

/**
 * Boilerplate Register component.
 * @param {Object} props
 * @param {Function} props.onSubmit - Custom submit handler.
 */
const Register = ({
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

  const { handleSubmit, register, formState: { errors } } = form;

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
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter email"
            margin="normal"
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            placeholder="Enter password"
            margin="normal"
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register("confirmPwd")}
            label="Confirm Password"
            type="password"
            placeholder="Re-enter Password"
            margin="normal"
            size="small"
            error={!!errors.confirmPwd}
            helperText={errors.confirmPwd?.message}
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
