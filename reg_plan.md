# Registration Workflow Implementation Plan

## Overview

Implement a multi-phase user registration workflow with email verification, admin approval, and credential setup. The implementation adds reusable registration logic to the `auth-be` and `auth-fe` packages, then integrates with Login-BE and Login-FE.

### User State Machine
```
PENDING_VERIFICATION → PENDING_APPROVAL → APPROVED → ACTIVE
                                        ↘ REJECTED
```

### Configuration Choices
- **Email Provider**: Console-only mode (logs emails to console; Resend integration added later)
- **Rate Limiting**: Yes (express-rate-limit)
- **User Migration**: Yes (migrate existing status values)

---

## 1. Database Schema Changes

### 1.1 Modify Users Table
```sql
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS request_note VARCHAR(256) DEFAULT 'Requesting login id to system',
ADD COLUMN IF NOT EXISTS admin_rejection_note TEXT;
```

### 1.2 Create Registration Tokens Table
```sql
CREATE TABLE IF NOT EXISTS public.registration_tokens (
    id serial PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    token_type TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_setup')),
    expires_at timestamptz NOT NULL,
    used_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registration_tokens_user_id ON public.registration_tokens(user_id);
CREATE INDEX idx_registration_tokens_token_hash ON public.registration_tokens(token_hash);
```

### 1.3 Migrate Existing User Status Values
```sql
-- Map old status values to new ones
UPDATE public.users SET status = 'ACTIVE' WHERE status = 'Active';
UPDATE public.users SET status = 'PENDING_APPROVAL' WHERE status = 'Pending';
UPDATE public.users SET status = 'REJECTED' WHERE status = 'Inactive';
```

### 1.4 Status Values
- `PENDING_VERIFICATION` - Initial state after submission
- `PENDING_APPROVAL` - Email verified, awaiting admin
- `APPROVED` - Admin approved, awaiting password setup
- `ACTIVE` - Password set, fully authorized
- `REJECTED` - Admin declined request

---

## 2. auth-be Package Additions

### 2.1 New Files
```
packages/auth-be/src/
├── routes/registrationFactory.js    # NEW
├── middleware/rateLimiter.js        # NEW
├── utils/tokenGenerator.js          # NEW
└── adapters/PostgresAdapter.js      # MODIFY
```

### 2.2 New Routes (registrationFactory.js)

| Method | Path | Description | Auth | Rate Limit |
|--------|------|-------------|------|------------|
| POST | `/register/submit` | Phase 1: Submit registration | Public | 5/hour |
| GET | `/register/verify/:token` | Phase 2: Verify email | Public | 10/hour |
| GET | `/register/setup/:token` | Phase 4: Validate setup token | Public | 10/hour |
| POST | `/register/setup/:token` | Phase 4: Set password | Public | 5/hour |
| GET | `/admin/pending-registrations` | List pending approvals | Admin | None |
| GET | `/admin/registration/:id` | Get single registration | Admin | None |
| POST | `/admin/registration/:id/approve` | Approve registration | Admin | None |
| POST | `/admin/registration/:id/reject` | Reject registration | Admin | None |

### 2.3 Rate Limiter Middleware (rateLimiter.js)
```javascript
const rateLimit = require('express-rate-limit');

const createRegistrationLimiter = (config = {}) => {
  return rateLimit({
    windowMs: config.windowMs || 60 * 60 * 1000, // 1 hour
    max: config.max || 5,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = { createRegistrationLimiter };
```

### 2.4 Configuration Pattern
```javascript
createRegistrationRouter({
  db: adapter,
  config: {
    verificationTokenLife: '24h',
    passwordSetupTokenLife: '48h',
    adminPermissionIds: [3],
    rateLimitWindowMs: 60 * 60 * 1000,  // 1 hour
    rateLimitMax: 5,

    // Email callbacks (dependency injection)
    onRegistrationSubmit: async (user, token) => {},
    onEmailVerified: async (user) => {},
    onApproval: async (user, token) => {},
    onRejection: async (user, reason) => {}
  }
})
```

### 2.5 PostgresAdapter New Methods
- `createRegistrationRequest(email, first, last, requestNote)`
- `findUserByEmail(email)`
- `updateUserStatus(userId, status)`
- `saveRegistrationToken(userId, tokenHash, tokenType, expiresAt)`
- `findValidToken(tokenHash, tokenType)`
- `markTokenUsed(tokenId)`
- `invalidateUserTokens(userId, tokenType)`
- `getPendingRegistrations()`
- `getRegistrationById(id)`
- `setAdminRejectionNote(userId, note)`
- `setUserPassword(userId, passwordHash)`

### 2.6 Token Generator Utility (tokenGenerator.js)
```javascript
const crypto = require('crypto');

module.exports = {
  generateToken: () => {
    const token = crypto.randomBytes(32).toString('base64url');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    return { token, tokenHash };
  },
  hashToken: (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
};
```

### 2.7 Updated package.json
```json
{
  "dependencies": {
    "jsonwebtoken": "^9.0.0",
    "express-rate-limit": "^7.0.0"
  }
}
```

---

## 3. auth-fe Package Additions

### 3.1 New Files
```
packages/auth-fe/src/
├── components/
│   ├── RegistrationRequest.jsx      # NEW: Phase 1 form
│   ├── EmailVerification.jsx        # NEW: Phase 2 result
│   ├── PasswordSetup.jsx            # NEW: Phase 4 form
│   ├── RegistrationSuccess.jsx      # NEW: Success message
│   ├── AdminRegistrationList.jsx    # NEW: Admin list view
│   └── AdminRegistrationDetail.jsx  # NEW: Admin detail view
└── hooks/
    ├── useRegistrationSubmit.js     # NEW
    ├── useEmailVerification.js      # NEW
    ├── usePasswordSetup.js          # NEW
    └── useAdminRegistrations.js     # NEW
```

### 3.2 RegistrationRequest Component
Phase 1 submission form collecting:
- email (required)
- first name (required)
- last name (required)
- request note (optional, max 256 chars)

### 3.3 EmailVerification Component
Phase 2 - displays result of clicking verification link:
- Loading state
- Success: "Email verified, awaiting admin review"
- Error: Token expired/invalid/used

### 3.4 PasswordSetup Component
Phase 4 - set password after approval:
- Password field (PWD_REGEX validation)
- Confirm password field
- Redirects to login on success

### 3.5 New Hooks
```javascript
useRegistrationSubmit(axios, url)     // Phase 1 mutation
useEmailVerification(axios, token)    // Phase 2 query
usePasswordSetup(axios)               // Phase 4 mutation
useAdminRegistrations(secureAxios)    // Admin queries/mutations
```

---

## 4. Login-BE Integration

### 4.1 Files to Create/Modify
- `sql/registration/alter_users.sql` - NEW
- `sql/registration/create_tokens.sql` - NEW
- `sql/registration/migrate_status.sql` - NEW
- `services/emailService.js` - NEW (console-only mode)
- `index.js` - MODIFY

### 4.2 Email Service (Console-Only Mode)
```javascript
// services/emailService.js
// Console-only mode - logs emails for testing
// TODO: Replace with Resend integration for production

const createEmailService = (baseUrl) => {
  const logEmail = (type, to, subject, body) => {
    console.log('\n' + '='.repeat(60));
    console.log(`EMAIL [${type}]`);
    console.log('='.repeat(60));
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('-'.repeat(60));
    console.log(body);
    console.log('='.repeat(60) + '\n');
  };

  return {
    sendVerificationEmail: async (user, token) => {
      const verificationUrl = `${baseUrl}/register/verify/${token}`;
      logEmail(
        'VERIFICATION',
        user.email,
        'Verify your email address',
        `Welcome, ${user.first}!\n\nVerify your email:\n${verificationUrl}\n\nExpires in 24 hours.`
      );
    },

    sendAdminNotification: async (user, adminEmail) => {
      logEmail(
        'ADMIN_NOTIFICATION',
        adminEmail,
        'New Registration Request',
        `Name: ${user.first} ${user.last}\nEmail: ${user.email}\nNote: ${user.request_note}`
      );
    },

    sendApprovalEmail: async (user, token) => {
      const setupUrl = `${baseUrl}/register/setup/${token}`;
      logEmail(
        'APPROVAL',
        user.email,
        'Your account has been approved!',
        `Welcome, ${user.first}!\n\nSet your password:\n${setupUrl}\n\nExpires in 48 hours.`
      );
    },

    sendRejectionEmail: async (user, reason) => {
      logEmail(
        'REJECTION',
        user.email,
        'Registration Status Update',
        `Your registration was not approved.\n\nReason: ${reason}`
      );
    }
  };
};

module.exports = { createEmailService };
```

### 4.3 Mount Registration Routes in index.js
```javascript
// After existing auth routes, BEFORE verifyJWT middleware:
const { createRegistrationRouter } = require("@your-org/auth-be");
const { createEmailService } = require("./services/emailService");

const baseUrl = 'https://localhost:5173';  // Frontend URL for links
const emailService = createEmailService(baseUrl);

app.use("/", createRegistrationRouter({
  db: authAdapter,
  config: {
    verificationTokenLife: '24h',
    passwordSetupTokenLife: '48h',
    adminPermissionIds: [3],
    adminEmail: 'admin@yourdomain.com',
    onRegistrationSubmit: (user, token) =>
      emailService.sendVerificationEmail(user, token),
    onEmailVerified: (user) =>
      emailService.sendAdminNotification(user, 'admin@yourdomain.com'),
    onApproval: (user, token) =>
      emailService.sendApprovalEmail(user, token),
    onRejection: (user, reason) =>
      emailService.sendRejectionEmail(user, reason)
  }
}));
```

### 4.4 Future: Add Resend Integration
When ready to send real emails:
1. `npm install resend` in Login-BE
2. Add `RESEND_API_KEY` to Google Secret Manager
3. Update `emailService.js` to use Resend API instead of console.log
```

---

## 5. Login-FE Integration

### 5.1 Files to Create/Modify
- `src/components/RegistrationRequest.jsx` - NEW (wrapper)
- `src/components/EmailVerification.jsx` - NEW (wrapper)
- `src/components/PasswordSetup.jsx` - NEW (wrapper)
- `src/components/RegistrationSuccess.jsx` - NEW (wrapper)
- `src/components/AdminRegistrations.jsx` - NEW
- `src/components/AppRoutes.jsx` - MODIFY
- `src/constants/userSchema.js` - MODIFY

### 5.2 Route Updates
```javascript
// New public routes (unauthenticated)
/register              → RegistrationRequest
/register/verify/:token → EmailVerification
/register/setup/:token  → PasswordSetup
/register/success       → RegistrationSuccess

// New admin route (authenticated, permission 3)
/loginadmin/registrations → AdminRegistrations
```

### 5.3 Update User Status Options
```javascript
// userSchema.js
export const validStatus = [
  { id: 1, name: "Pending Verification", value: "PENDING_VERIFICATION" },
  { id: 2, name: "Pending Approval", value: "PENDING_APPROVAL" },
  { id: 3, name: "Approved", value: "APPROVED" },
  { id: 4, name: "Active", value: "ACTIVE" },
  { id: 5, name: "Rejected", value: "REJECTED" },
];
```

---

## 6. Security Considerations

1. **Token Security**: Use `crypto.randomBytes(32)`, store only SHA-256 hash
2. **Enumeration Prevention**: Return generic success on duplicate email
3. **Rate Limiting**: 5 req/hour on submit/setup, 10 req/hour on verify
4. **Password Hashing**: Use existing bcrypt pattern with `crypt()` and `gen_salt('bf')`
5. **Admin Authorization**: Verify permission before admin operations
6. **Token Expiration**: 24h for verification, 48h for password setup

---

## 7. Verification / Testing

### Manual Testing Checklist
1. **Phase 1**: Submit registration → user created with PENDING_VERIFICATION → verification URL logged to console
2. **Phase 2**: Copy verification URL from console, navigate to it → status updates to PENDING_APPROVAL → admin notification logged
3. **Phase 3**: Admin approves → status updates to APPROVED → setup URL logged to console
4. **Phase 3 (alt)**: Admin rejects with reason → status updates to REJECTED → rejection logged
5. **Phase 4**: Copy setup URL from console, navigate to it → set password → status updates to ACTIVE → can login
6. **Rate Limiting**: Verify 429 response after exceeding limits
7. **Migration**: Verify existing users have correct new status values

---

## 8. Critical Files Summary

### auth-be Package
| File | Action |
|------|--------|
| `packages/auth-be/src/index.js` | MODIFY - Add exports |
| `packages/auth-be/src/routes/registrationFactory.js` | NEW |
| `packages/auth-be/src/middleware/rateLimiter.js` | NEW |
| `packages/auth-be/src/utils/tokenGenerator.js` | NEW |
| `packages/auth-be/src/adapters/PostgresAdapter.js` | MODIFY - Add methods |
| `packages/auth-be/package.json` | MODIFY - Add express-rate-limit |

### auth-fe Package
| File | Action |
|------|--------|
| `packages/auth-fe/src/index.js` | MODIFY - Add exports |
| `packages/auth-fe/src/components/RegistrationRequest.jsx` | NEW |
| `packages/auth-fe/src/components/EmailVerification.jsx` | NEW |
| `packages/auth-fe/src/components/PasswordSetup.jsx` | NEW |
| `packages/auth-fe/src/components/RegistrationSuccess.jsx` | NEW |
| `packages/auth-fe/src/components/AdminRegistrationList.jsx` | NEW |
| `packages/auth-fe/src/components/AdminRegistrationDetail.jsx` | NEW |
| `packages/auth-fe/src/hooks/useRegistrationSubmit.js` | NEW |
| `packages/auth-fe/src/hooks/useEmailVerification.js` | NEW |
| `packages/auth-fe/src/hooks/usePasswordSetup.js` | NEW |
| `packages/auth-fe/src/hooks/useAdminRegistrations.js` | NEW |

### Login-BE
| File | Action |
|------|--------|
| `Login-BE/index.js` | MODIFY - Mount routes |
| `Login-BE/services/emailService.js` | NEW (console-only mode) |
| `Login-BE/sql/registration/alter_users.sql` | NEW |
| `Login-BE/sql/registration/create_tokens.sql` | NEW |
| `Login-BE/sql/registration/migrate_status.sql` | NEW |

### Login-FE
| File | Action |
|------|--------|
| `Login-FE/src/components/AppRoutes.jsx` | MODIFY - Add routes |
| `Login-FE/src/components/RegistrationRequest.jsx` | NEW |
| `Login-FE/src/components/EmailVerification.jsx` | NEW |
| `Login-FE/src/components/PasswordSetup.jsx` | NEW |
| `Login-FE/src/components/RegistrationSuccess.jsx` | NEW |
| `Login-FE/src/components/AdminRegistrations.jsx` | NEW |
| `Login-FE/src/constants/userSchema.js` | MODIFY - Update status values |
