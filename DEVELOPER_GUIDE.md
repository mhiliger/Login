# Developer Guide: Integrating Auth Libraries

This guide explains how to use the `@your-org/auth-be` and `@your-org/auth-fe` libraries in a new application.

## Backend Integration (`@your-org/auth-be`)

### 1. Installation
```bash
npm install @your-org/auth-be
```

### 2. Implement the Database Adapter
The library requires a "Database Adapter" to handle storage operations. Create a file (e.g., `authAdapter.js`):

```javascript
const authAdapter = {
  validateUser: async (email, password) => {
    // Logic to verify email/password in your DB
    // Return user object { id, email, first, last, status }
  },
  getUserPermissions: async (email) => {
    // Return an array of permission IDs [1, 2, 3]
  },
  saveRefreshToken: async (userId, token) => {
    // Store the refresh token in the user's DB record
  },
  findUserByRefreshToken: async (token) => {
    // Find and return user associated with this token
  },
  clearRefreshToken: async (userId) => {
    // Clear the token from the user's DB record
  }
};
```

### 3. Mount Routes and Middleware
In your `index.js` or `app.js`:

```javascript
const { createAuthRouter, createVerifyJWT } = require('@your-org/auth-be');

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
    req.user = decoded; // Custom mapping if needed
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
Wrap your app and provide a custom password policy:

```javascript
import { AuthProvider } from '@your-org/auth-fe';

const myConfig = {
  passwordPolicy: {
    regex: /^(?=.*[A-Z]).{8,}$/, // At least one uppercase, min 8 chars
    message: "Password must be 8+ characters with one uppercase letter."
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
