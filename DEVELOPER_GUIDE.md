# Developer Guide: Integrating Auth Libraries

This guide explains how to use the `@your-org/auth-be` and `@your-org/auth-fe` libraries in a new application.

## Backend Integration (`@your-org/auth-be`)

### 1. Installation
```bash
npm install @your-org/auth-be
```

### 2. Initialize and Mount
The library provides a pre-built `PostgresAdapter` that works with the shared authentication database. You simply need to pass your application's database connection to it.

```javascript
const { createAuthRouter, createVerifyJWT, createPostgresAdapter } = require('@your-org/auth-be');
const db = require('./db'); // Your pg-promise database instance

// Initialize the shared adapter with your DB connection
const authAdapter = createPostgresAdapter(db);

const config = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  loginPath: "/auth", // Match your frontend login call
  accessTokenLife: "15m",
  refreshTokenLife: "1d"
};

// Mount login/refresh/logout routes
app.use('/', createAuthRouter({ db: authAdapter, config }));

// Use middleware to protect private routes
const verifyJWT = createVerifyJWT({ 
  accessTokenSecret: config.accessTokenSecret,
  onVerifySuccess: (req, decoded) => {
    // Map decoded token data to request object
    req.user = decoded; 
  }
});

app.use('/api/private', verifyJWT);
```

---

## Frontend Integration (`@your-org/auth-fe`)

### 1. Installation
```bash
npm install @your-org/auth-fe
```

### 2. Configure AuthProvider
Wrap your app and provide a custom password policy (Regex and Message):

```javascript
import { AuthProvider } from '@your-org/auth-fe';

const myConfig = {
  passwordPolicy: {
    regex: /^(?=.*[A-Z]).{8,}$/, // Your custom application policy
    message: "Password must be 8+ characters with at least one uppercase letter."
  }
};

<AuthProvider initialConfig={myConfig}>
  <App />
</AuthProvider>
```

### 3. Initialize Secure API
Use the hook to wrap your Axios instance for automatic token handling:

```javascript
import axios from 'axios';
import { useSecureAxios } from '@your-org/auth-fe';

const baseAxios = axios.create({ baseURL: 'https://api.myapp.com' });

function MyComponent() {
  const api = useSecureAxios(baseAxios, "refresh"); // "refresh" is the endpoint
  
  const fetchData = () => api.get('/data');
}
```

### 4. Standard Routing & Boilerplate UI
Use `StandardAuthRoutes` to handle the logic between Login, Register, and your Protected App.

```javascript
import { StandardAuthRoutes, Login, Register, Unauthorized } from '@your-org/auth-fe';
import { TextField, Button, Box, Stack, Typography, Alert } from '@mui/material';

// Boilerplate components accept UI elements as props for styling flexibility
const MyLogin = (props) => (
  <Login 
    {...props} 
    TextField={MyCustomInput} 
    Button={MyCustomButton}
    Box={Box} Stack={Stack} Typography={Typography} Alert={Alert}
    loginMutation={useLogin(api, "auth")}
  />
);

<StandardAuthRoutes
  LoginComponent={MyLogin}
  RegisterComponent={MyRegister}
  UnauthorizedComponent={Unauthorized}
  LayoutComponent={TopNavBar}
  postLoginRedirect="/dashboard"
>
  {/* Protected Routes inside */}
  <Route path="/dashboard" element={<Dashboard />} />
</StandardAuthRoutes>
```