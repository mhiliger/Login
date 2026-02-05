import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/**
 * Guard component for routes that require specific permissions.
 * @param {Object} props
 * @param {Array<number|string>} props.allowedPerms - List of permission IDs allowed to access the route.
 * @param {string} [props.unauthorizedPath="/unauthorized"] - Where to redirect if user is logged in but lacks permissions.
 * @param {string} [props.loginPath="/"] - Where to redirect if user is not logged in.
 */
const RequireAuth = ({ 
  allowedPerms, 
  unauthorizedPath = "/unauthorized", 
  loginPath = "/" 
}) => {
  const { auth } = useAuth();
  const location = useLocation();

  const hasPermission = auth?.permissions?.some((perm) => allowedPerms?.includes(perm));

  if (hasPermission) {
    return <Outlet />;
  }

  if (auth?.email) {
    return <Navigate to={unauthorizedPath} state={{ from: location }} replace />;
  }

  return <Navigate to={loginPath} state={{ from: location }} replace />;
};

export default RequireAuth;
