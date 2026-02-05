import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import RequireAuth from "./RequireAuth";

/**
 * A standard routing component that handles pre and post authorization flow.
 * @param {Object} props
 * @param {React.Component} props.LoginComponent - The component to render for the login page.
 * @param {React.Component} props.RegisterComponent - The component to render for the registration page.
 * @param {React.Component} props.UnauthorizedComponent - The component to render for unauthorized access.
 * @param {React.Component} props.LayoutComponent - A layout component (like TopNavBar) to wrap the routes.
 * @param {string} props.postLoginRedirect - Where to redirect after a successful login.
 * @param {React.ReactNode} props.children - The protected application routes.
 */
const StandardAuthRoutes = ({
  LoginComponent,
  RegisterComponent,
  UnauthorizedComponent,
  LayoutComponent: Layout = ({ children }) => <>{children}</>,
  postLoginRedirect = "/",
  children
}) => {
  const { auth } = useAuth();
  const isAuthenticated = !!auth.email;

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginComponent successRoute={postLoginRedirect} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      ) : (
        <Route element={<Layout />}>
          {children}
          <Route path="/unauthorized" element={<UnauthorizedComponent />} />
          {/* Default catch-all for authenticated users if no other route matches */}
          <Route path="*" element={<Navigate to={postLoginRedirect} replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default StandardAuthRoutes;
