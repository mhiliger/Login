import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const RequireAuth = ({ allowedPerms }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.permissions?.find((perm) => allowedPerms?.includes(perm)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
