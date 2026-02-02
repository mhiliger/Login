# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Project Overview

This is a monorepo using npm workspaces with two main applications:

- **Login-BE**: An Express.js REST API backend that provides user authentication and management functionalities. It uses a PostgreSQL database and connects to Google Cloud Secret Manager for secrets management.
- **Login-FE**: A React single-page application built with Vite that serves as the user interface for the login system. It uses Material-UI for components, React Hook Form for forms, and React Query for data fetching.

## Development Commands

### Backend (Login-BE)

```bash
cd Login-BE
npm start
```

This will start the backend server with `nodemon`, which will automatically restart the server on file changes.

### Frontend (Login-FE)

```bash
cd Login-FE
npm run dev
```

This will start the Vite dev server, typically at `https://localhost:5173`.

### Other Frontend Commands

- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview production build.

## Architecture Overview

### Backend Architecture

The backend is a traditional Express.js application with a route-based architecture.

- **Entry Point**: `index.js` - This file initializes the application by loading secrets from Google Cloud Secret Manager, then starts an HTTPS server.
- **Database**: The application uses a PostgreSQL database named "SysAccess", accessed via `pg-promise`. The database connection is configured in `db/index.js`.
- **Authentication**: Authentication is JWT-based, using an access/refresh token pattern. Tokens are stored in httpOnly cookies.
- **Secret Management**: Secrets (database password, JWT secrets, SSL certificate paths) are loaded from Google Cloud Secret Manager using the `utilities/getSecret.js` module.
- **SSL**: The server runs on HTTPS, with certificates loaded from paths stored in Secret Manager.
- **Routes**: The application uses file-based routing with descriptive names (e.g., `user create.js`, `users read.js`).

### Frontend Architecture

The frontend is a React single-page application that uses React Router v6 for routing and has a permission-based access control system.

- **Entry Point**: `main.jsx` -> `App.jsx`.
- **State Management**:
  - React Context (`AuthProvider`) is used for managing authentication state.
  - TanStack Query (React Query) is used for server state management.
- **Routing**: The `AppRoutes.jsx` component handles routing, conditionally rendering routes based on the user's authentication state and permissions. The `RequireAuth.jsx` component protects routes based on user permissions.
- **Components**: The UI is built with Material-UI components. Reusable components like `TableTemplate.jsx` are used for displaying data. Forms are built using React Hook Form and Yup for validation.
- **API Layer**: `api/axios.js` configures an Axios instance for making HTTP requests to the backend.

### Permission System

The application has a three-tier access control system: Users -> Roles -> Permissions.

- Users can be assigned multiple roles.
- Roles can have multiple permissions.
- Frontend routes are protected based on permission IDs using the `RequireAuth` component.
- The backend's `verifyJWT` middleware attaches user permissions to the request object for authorization checks.

## Key Files

-   `Login-BE/index.js`: Backend entry point, server initialization, and route registration.
-   `Login-BE/middleware/verifyJWT.js`: JWT verification middleware.
-   `Login-BE/db/index.js`: Database connection configuration.
-   `Login-BE/utilities/getSecret.js`: Google Cloud Secret Manager integration.
-   `Login-FE/src/components/AppRoutes.jsx`: Frontend route definitions and permission guards.
-   `Login-FE/src/components/RequireAuth.jsx`: Component for protecting routes based on permissions.
-   `Login-FE/src/context/AuthProvider.jsx`: Authentication context for the frontend.
-   `Login-FE/src/api/axios.js`: Axios configuration for frontend HTTP requests.
-   `Login-FE/vite.config.js`: Vite build and development server configuration.
-   `CLAUDE.md`: Existing documentation with more in-depth information.

## Environment Variables

### Backend (`.env` in `Login-BE`)

-   `DB_HOST`, `DB_PORT`, `DB_USER`: Database connection details. The password is loaded from Secret Manager.
-   `REST_PORT`: The port for the backend server (defaults to 8080).

### Frontend (`.env` in `Login-FE`)

-   The frontend uses environment variables set up in `envSetup.js`. The API base URL is configured in `api/axios.js`.