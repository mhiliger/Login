# @mhiliger/auth-be

Shared authentication backend for Express.js applications. This package provides a generic, database-agnostic framework for:
- Secure JWT (JSON Web Token) issuance and verification.
- User registration workflow (Sign up -> Verify Email -> Admin Approve -> Set Password).
- Role-based access control middleware.
- Extensible adapter pattern (HTTP or Database).

## Installation

```bash
npm install @mhiliger/auth-be express jsonwebtoken express-rate-limit axios
```

## Setup

### 1. Configure Adapter

The library uses an adapter pattern to interact with identity data. For most applications, you should use the **HttpAdapter** to delegate to a central identity service.

**Using the HttpAdapter (Recommended):**

This allows your application to authenticate users without connecting directly to the database. **Note:** The central identity service requires an API key for internal access. You must configure your HTTP client to include the `x-api-key` header.

```javascript
const axios = require("axios");
const { createHttpAdapter } = require("@mhiliger/auth-be");

// Create a client with the internal API key
const identityClient = axios.create({
  headers: {
    "x-api-key": process.env.LOGIN_SERVICE_API_KEY
  }
});

const authAdapter = createHttpAdapter(identityClient, process.env.IDENTITY_SERVICE_URL);

module.exports = authAdapter;
```

**Using the built-in Postgres Adapter (Master Identity Service only):**

The package includes a `createPostgresAdapter` for the service that owns the database. This requires a database connection object (e.g., from `pg-promise`).

```javascript
// This should typically only be used by the central identity service
const { createPostgresAdapter } = require("@mhiliger/auth-be");
const db = require("./db"); // Your pg-promise database instance

const authAdapter = createPostgresAdapter(db);
module.exports = authAdapter;
```

### 2. Configure Email Service

The registration workflow requires an email service. Implement an object with the following methods:

```javascript
const emailService = {
  sendVerificationEmail: async (user, token) => { ... },
  sendAdminNotification: async (user, adminEmail) => { ... },
  sendApprovalEmail: async (user, token) => { ... },
  sendRejectionEmail: async (user, reason) => { ... },
  sendPasswordResetEmail: async (user, token) => { ... }
};
```

### 3. Initialize Express App

Mount the auth and registration routers in your Express application.

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const { createAuthRouter, createRegistrationRouter, createVerifyJWT } = require("@mhiliger/auth-be");
const authAdapter = require("./db");
const emailService = require("./services/email");

const app = express();
app.use(express.json());
app.use(cookieParser());

const authConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenLife: "15m",
  refreshTokenLife: "1d",
};

// 1. Mount Auth Routes (Login, Refresh, Logout)
app.use("/api/auth", createAuthRouter({
  db: authAdapter,
  config: authConfig
}));

// 2. Configure JWT Verification Middleware
const verifyJWT = createVerifyJWT({
  accessTokenSecret: authConfig.accessTokenSecret,
  onVerifySuccess: (req, decoded) => {
    // Map decoded token data to request object
    req.user = decoded;
    req.permissions = decoded.permissions;
  }
});

// 3. Mount Registration Routes
app.use("/api/register", createRegistrationRouter({
  db: authAdapter,
  verifyJWT: verifyJWT,
  config: {
    verificationTokenLife: "24h",
    passwordSetupTokenLife: "48h",
    onRegistrationSubmit: (user, token) => emailService.sendVerificationEmail(user, token),
    onEmailVerified: (user) => emailService.sendAdminNotification(user, process.env.ADMIN_EMAIL),
    onApproval: (user, token) => emailService.sendApprovalEmail(user, token),
    onRejection: (user, reason) => emailService.sendRejectionEmail(user, reason),
    onPasswordReset: (user, token) => emailService.sendPasswordResetEmail(user, token),
  }
}));

app.listen(3000, () => console.log("Server running"));
```

## API Reference

### `createAuthRouter({ db, config })`
Creates authentication endpoints.
- `POST /` (Login)
- `GET /refresh` (Refresh Token)
- `POST /logout` (Logout)

### `createRegistrationRouter({ db, verifyJWT, config })`
Creates registration and password management endpoints.
- `POST /submit` (Public: Initial registration)
- `GET /verify/:token` (Public: Email verification)
- `POST /setup/:token` (Public: Password setup)
- `GET /admin/list` (Admin: List pending requests)
- `POST /admin/approve/:id` (Admin: Approve request)
- `POST /admin/reject/:id` (Admin: Reject request)

### `createInternalRouter({ db, apiKey })`
Creates an Express router that exposes auth adapter methods as HTTP endpoints. This is used by the master identity service to provide identity data to other applications.
- **apiKey**: A required string used to protect these endpoints. Consumer applications must provide this key in the `x-api-key` header.
- `POST /auth/validate`
- `GET /auth/permissions/:email`
- `POST /auth/refresh-token`
- `POST /auth/find-by-refresh`
- `POST /auth/clear-refresh`
- (And various registration/token management endpoints)
