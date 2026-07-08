# @mhiliger/auth-fe

Shared authentication and registration library for React applications. This package provides components and hooks to implement a complete user registration and login workflow, including email verification, password setup, and role-based access control.

## Installation

```bash
npm install @mhiliger/auth-fe @tanstack/react-query axios jwt-decode react-hook-form @hookform/resolvers yup @mui/material @emotion/react @emotion/styled
```

Ensure you also have `react` and `react-router-dom` installed.

## Setup

### 1. Wrap your application in `AuthProvider`

In your root component (e.g., `main.jsx` or `App.jsx`), wrap your application with `AuthProvider` and `QueryClientProvider`. You must provide the `authBaseUrl` which points to your authentication backend.

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
      <AuthProvider authBaseUrl="https://api.yourdomain.com">
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

Use `StandardAuthRoutes` to set up your routing structure with protection. By default, `StandardAuthRoutes` automatically handles the following paths using built-in "Smart" components:
- `/register` -> `SmartRegistrationRequest`
- `/register/verify/:token` -> `SmartEmailVerification`
- `/register/setup/:token` -> `SmartPasswordSetup`
- `/forgot-password` -> `SmartPasswordResetRequest`

```jsx
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { StandardAuthRoutes, RequireAuth } from "@mhiliger/auth-fe";
import Login from "./Login"; // Your wrapper
import Unauthorized from "./Unauthorized"; // Your wrapper or lib component
import Layout from "./Layout"; // Your layout component

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <StandardAuthRoutes
        LoginComponent={Login}
        // RegisterComponent={RegistrationRequest} // Optional: override default
        UnauthorizedComponent={Unauthorized}
        LayoutComponent={Layout}
        postLoginRedirect="/dashboard"
        publicRoutes={[
          // Additional public routes (core registration workflow is handled automatically)
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

### 5. Customizing the User Interface

If you want to use the library's state management and API logic but completely replace or customize the UI (e.g., to match your app's specific design system instead of the default Material-UI components), you can build your own components using the provided React Query hooks.

**Example: Custom Password Reset Form**

```jsx
import React, { useState } from "react";
import { useRequestPasswordReset } from "@mhiliger/auth-fe";
import { axiosPrivate } from "../api/axios";

const MyCustomPasswordReset = () => {
  const [email, setEmail] = useState("");
  // Pass your secured axios instance
  const resetMutation = useRequestPasswordReset(axiosPrivate);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMutation.mutate({ email });
  };

  if (resetMutation.isSuccess) {
    return <div className="success-banner">Check your email!</div>;
  }

  return (
    <form className="my-custom-form" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {resetMutation.isError && <p className="error">Something went wrong.</p>}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        disabled={resetMutation.isLoading}
      />
      <button type="submit" disabled={resetMutation.isLoading}>
        {resetMutation.isLoading ? "Sending..." : "Reset"}
      </button>
    </form>
  );
};
```

**Injecting Custom Components into the Router:**

If you are using `StandardAuthRoutes`, you can override the default registration component by passing the `RegisterComponent` prop. For other routes (like `/forgot-password`), simply pass them via the `publicRoutes` array to override the default "Smart" component behavior.

```jsx
<StandardAuthRoutes
  LoginComponent={MyCustomLogin}
  RegisterComponent={MyCustomRegistration} // Overrides /register
  UnauthorizedComponent={Unauthorized}
  LayoutComponent={Layout}
  postLoginRedirect="/dashboard"
  publicRoutes={[
    // Passing this path explicitly overrides the built-in SmartPasswordResetRequest
    { path: "/forgot-password", element: <MyCustomPasswordReset /> },
    { path: "/about", element: <AboutPage /> }
  ]}
>
```

## Available Components

- **`Login`**: Standard login form.
- **`RegistrationRequest`**: Initial sign-up form.
- **`EmailVerification`**: Handles email verification link.
- **`PasswordSetup`**: Handles setting up password.
- **`PasswordResetRequest`**: Forgot password form.
- **`RequireAuth`**: Route guard component.
- **`StandardAuthRoutes`**: Opinionated router setup that handles the full registration and password reset lifecycle.

### Smart Components (Pre-wired with hooks)
The library provides "Smart" versions of the components that are already connected to the necessary React Query hooks and routing logic:
- **`SmartRegistrationRequest`**
- **`SmartEmailVerification`**
- **`SmartPasswordSetup`**
- **`SmartPasswordResetRequest`**

These are used by default in `StandardAuthRoutes` but can be used individually if you are building a custom router.

## Available Hooks

- **`useAuth`**: Access `auth` state (user, permissions, accessToken).
- **`useSecureAxios`**: Adds interceptors for JWT auth.
- **`useLogin`**: React Query mutation for login.
- **`useRegistrationSubmit`**: React Query mutation for registration.
- **`usePasswordSetup`**: React Query hooks for password setup flow.
