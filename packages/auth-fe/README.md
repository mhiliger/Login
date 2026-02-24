# @mhiliger/auth-fe

Shared authentication and registration library for React applications. This package provides components and hooks to implement a complete user registration and login workflow, including email verification, password setup, and role-based access control.

## Installation

```bash
npm install @mhiliger/auth-fe @tanstack/react-query axios jwt-decode react-hook-form @hookform/resolvers yup @mui/material @emotion/react @emotion/styled
```

Ensure you also have `react` and `react-router-dom` installed.

## Setup

### 1. Wrap your application in `AuthProvider`

In your root component (e.g., `main.jsx` or `App.jsx`), wrap your application with `AuthProvider` and `QueryClientProvider`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@mhiliger/auth-fe";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 2. Configure Axios

Create an `axios` instance and use the `useSecureAxios` hook to automatically attach the access token to requests and handle refresh token logic.

```jsx
// src/api/axios.js
import axios from "axios";
import { useSecureAxios } from "@mhiliger/auth-fe";

const BASE_URL = "https://api.yourdomain.com";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Hook to get the secured instance
export const useAxiosPrivate = () => {
  return useSecureAxios(axiosPrivate, "/refresh");
};
```

### 3. Implement Wrapper Components

The library components often require you to pass your specific API hooks or configuration. Create wrappers for the main pages.

**Login Wrapper (`src/components/Login.jsx`):**

```jsx
import React from "react";
import { Login as LibLogin, useLogin } from "@mhiliger/auth-fe";
import { axiosPrivate } from "../api/axios"; // Your axios instance

const Login = (props) => {
  // Initialize the login mutation
  const loginMutation = useLogin(axiosPrivate, "/auth"); // Point to your login endpoint

  return (
    <LibLogin
      {...props}
      loginMutation={loginMutation}
      successRoute="/dashboard" // Redirect after login
      registerPath="/register"
      resetPath="/forgot-password"
    />
  );
};

export default Login;
```

**Registration Wrapper (`src/components/RegistrationRequest.jsx`):**

```jsx
import React from "react";
import { RegistrationRequest as LibRegister, useRegistrationSubmit } from "@mhiliger/auth-fe";
import { axiosPrivate } from "../api/axios";

const RegistrationRequest = () => {
  const submitMutation = useRegistrationSubmit(axiosPrivate, "/register/submit");

  return (
    <LibRegister
      submitMutation={submitMutation}
      loginPath="/login"
    />
  );
};

export default RegistrationRequest;
```

### 4. Define Routes

Use `StandardAuthRoutes` to set up your routing structure with protection.

```jsx
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { StandardAuthRoutes, RequireAuth } from "@mhiliger/auth-fe";
import Login from "./Login"; // Your wrapper
import RegistrationRequest from "./RegistrationRequest"; // Your wrapper
import Unauthorized from "./Unauthorized"; // Your wrapper or lib component
import Layout from "./Layout"; // Your layout component

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <StandardAuthRoutes
        LoginComponent={Login}
        RegisterComponent={RegistrationRequest}
        UnauthorizedComponent={Unauthorized}
        LayoutComponent={Layout}
        postLoginRedirect="/dashboard"
        publicRoutes={[
          // Routes accessible without login
          { path: "/about", element: <AboutPage /> }
        ]}
      >
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedPerms={["AllowUsers"]} />}>
           <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </StandardAuthRoutes>
    </BrowserRouter>
  );
};
```

## Available Components

- **`Login`**: Standard login form.
- **`RegistrationRequest`**: Initial sign-up form.
- **`EmailVerification`**: Handles email verification link (path: `/register/verify/:token`).
- **`PasswordSetup`**: Handles setting up password (path: `/register/setup/:token`).
- **`PasswordResetRequest`**: Forgot password form.
- **`RequireAuth`**: Route guard component.
- **`StandardAuthRoutes`**: Opinionated router setup.

## Available Hooks

- **`useAuth`**: Access `auth` state (user, permissions, accessToken).
- **`useSecureAxios`**: Adds interceptors for JWT auth.
- **`useLogin`**: React Query mutation for login.
- **`useRegistrationSubmit`**: React Query mutation for registration.
- **`usePasswordSetup`**: React Query hooks for password setup flow.
