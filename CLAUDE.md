# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using npm workspaces with two main applications:

- **Login-BE** - Express.js REST API backend with PostgreSQL database
- **Login-FE** - React + Vite frontend with Material-UI

## Development Commands

### Backend (Login-BE)
```bash
cd Login-BE
npm start          # Start backend with nodemon (auto-reload)
```

### Frontend (Login-FE)
```bash
cd Login-FE
npm run dev        # Start Vite dev server (typically https://localhost:5173)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Architecture Overview

### Backend Architecture

The backend follows a traditional Express.js route-based architecture:

- **Entry Point**: `index.js` - Initializes app by loading secrets from Google Cloud Secret Manager, then starts HTTPS server
- **Database**: PostgreSQL accessed via pg-promise. Connection configured in `db/index.js` with database name "SysAccess"
- **Authentication**: JWT-based with access/refresh token pattern
  - Tokens stored in httpOnly cookies
  - `middleware/verifyJWT.js` validates access tokens and attaches user info (email, permissions) to req object
  - Public routes: `/auth`, `/logout`, `/refreshtoken`
  - Protected routes: All others require valid JWT
- **Secret Management**: Uses Google Cloud Secret Manager (`utilities/getSecret.js`) to load:
  - Database password
  - JWT access/refresh token secrets
  - SSL certificate paths
- **SSL**: Server runs on HTTPS using certificates loaded from paths stored in Secret Manager
- **Routes**: File-based routing with descriptive names (e.g., `user create.js`, `users read.js`)
  - Database initialization routes: `/createdb`, `/deletedb`, `/initdb`
  - User management: CRUD operations for users
  - Role management: CRUD operations for roles
  - Permission management: CRUD operations for permissions
  - Association endpoints: user-roles, role-permissions mappings

### Frontend Architecture

React SPA using React Router v6 with permission-based access control:

- **Entry Point**: `main.jsx` → `App.jsx`
- **State Management**:
  - React Context (`AuthProvider`) for authentication state
  - TanStack Query (React Query) for server state management with credentials
  - MUI theme provider with custom theme
- **Routing**: `AppRoutes.jsx` conditionally renders routes based on auth state
  - Unauthenticated: Login/Register pages
  - Authenticated: Protected admin routes with permission checks via `RequireAuth` wrapper
  - Permission-based routing: Users (perm 3), Roles (perm 4), Perms (perm 5)
- **Components**: Material-UI based with custom table templates
  - `TableTemplate.jsx` - Reusable data table with material-react-table
  - Form components use React Hook Form + Yup validation
  - Modal dialogs for CRUD operations (AED = Add/Edit/Delete)
- **API Layer**: `api/axios.js` configures axios instance with base URL and credentials

### Permission System

Three-tier access control: Users → Roles → Permissions

- Users can have multiple roles
- Roles can have multiple permissions
- Frontend routes protected by permission IDs
- Backend verifyJWT middleware attaches permissions to request for authorization checks

## Key Files

- `Login-BE/index.js` - Backend initialization and route registration (auth must come before verifyJWT middleware)
- `Login-BE/middleware/verifyJWT.js` - JWT verification middleware
- `Login-BE/db/index.js` - Database connection configuration
- `Login-BE/utilities/getSecret.js` - Google Cloud Secret Manager integration
- `Login-FE/src/components/AppRoutes.jsx` - Route definitions with permission guards
- `Login-FE/src/context/AuthProvider.jsx` - Authentication context
- `Login-FE/src/api/axios.js` - HTTP client configuration

## Environment Variables

### Backend (.env in Login-BE)
- `DB_HOST`, `DB_PORT`, `DB_USER` - Database connection (password loaded from Secret Manager)
- `REST_PORT` - Backend port (default 8080)
- Secrets loaded at runtime: `DB_PASSWORD`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, SSL paths

### Frontend (.env in Login-FE)
- Check `envSetup.js` for environment-specific configuration
- API base URL configured in `api/axios.js`

## Database

PostgreSQL database named "SysAccess" with tables for:
- Users
- Roles
- Permissions
- User-Role associations
- Role-Permission associations

Database initialization scripts available in `Login-BE/sql/` and routes `/createdb`, `/deletedb`, `/initdb`.
