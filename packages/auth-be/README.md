# @mhiliger/auth-be

Shared authentication backend for Express.js applications. This package provides:
- Secure JWT (JSON Web Token) issuance and verification.
- User registration workflow (Sign up -> Verify Email -> Admin Approve -> Set Password).
- Role-based access control middleware.
- Database adapter pattern for user management.

## Installation

```bash
npm install @mhiliger/auth-be express jsonwebtoken express-rate-limit pg-promise
```

## Setup

### 1. Configure Database Adapter

Create a database adapter that implements the required methods. The package provides a standard `createPostgresAdapter` that works with a specific schema.

**Database Schema:**

The adapter expects tables: `users`, `roles`, `permissions`, `UserRoles`, `RolePerms`, `registration_tokens`.
See migration scripts in your project for exact schema.

**Initialize Adapter:**

```javascript
// db/index.js
const pgp = require("pg-promise")();
const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "SysAccess",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const { createPostgresAdapter } = require("@mhiliger/auth-be");
const authAdapter = createPostgresAdapter(db);

module.exports = authAdapter;
```

### 2. Configure Email Service

You need an email service to send verification links. Implement an object with these methods:

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

Mount the auth and registration routers.

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const { createAuthRouter, createRegistrationRouter, createVerifyJWT } = require("@mhiliger/auth-be");
const authAdapter = require("./db"); // Your adapter
const emailService = require("./services/email"); // Your service

const app = express();
app.use(express.json());
app.use(cookieParser());

// Secrets Configuration
const authConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenLife: "15m",
  refreshTokenLife: "1d",
  loginPath: "/auth", // Endpoint for login
};

// 1. Mount Auth Routes (Login, Refresh, Logout)
app.use("/", createAuthRouter({
  db: authAdapter,
  config: authConfig
}));

// 2. Configure JWT Verification Middleware
const verifyJWT = createVerifyJWT({
  accessTokenSecret: authConfig.accessTokenSecret,
  onVerifySuccess: (req, decoded) => {
    // Attach user info to request
    req.user = decoded;
    req.permissions = decoded.permissions;
  }
});

// 3. Mount Registration Routes (Public + Admin)
app.use("/", createRegistrationRouter({
  db: authAdapter,
  verifyJWT: verifyJWT, // Protect admin routes
  config: {
    verificationTokenLife: "24h",
    passwordSetupTokenLife: "48h",
    // Callbacks for email notifications
    onRegistrationSubmit: (user, token) => emailService.sendVerificationEmail(user, token),
    onEmailVerified: (user) => emailService.sendAdminNotification(user, "admin@example.com"),
    onApproval: (user, token) => emailService.sendApprovalEmail(user, token),
    onRejection: (user, reason) => emailService.sendRejectionEmail(user, reason),
    onPasswordReset: (user, token) => emailService.sendPasswordResetEmail(user, token),
  }
}));

// 4. Protect Your API Routes
app.get("/api/protected-resource", verifyJWT, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

app.listen(3000, () => console.log("Server running"));
```

## API Reference

### `createAuthRouter({ db, config })`
Creates routes:
- `POST /auth` (Login)
- `GET /refresh` (Refresh Token)
- `POST /logout` (Logout)

### `createRegistrationRouter({ db, verifyJWT, config })`
Creates routes:
- `POST /register/submit`
- `GET /register/verify/:token`
- `GET /register/setup/:token`
- `POST /register/setup/:token`
- `POST /register/forgot-password`

### `createVerifyJWT({ accessTokenSecret, onVerifySuccess })`
Middleware that verifies the Bearer token in the `Authorization` header.
