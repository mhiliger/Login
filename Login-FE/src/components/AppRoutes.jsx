import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StandardAuthRoutes, RequireAuth } from "@your-org/auth-fe";
import TopNavBar from "./TopNavBar";
import Login from "./Login";
import RegistrationRequest from "./RegistrationRequest";
import EmailVerification from "./EmailVerification";
import PasswordSetup from "./PasswordSetup";
import PasswordResetRequest from "./PasswordResetRequest";
import RegistrationSuccess from "./RegistrationSuccess";
import Unauthorized from "./Unauthorized";
import AdminRegistrations from "./AdminRegistrations";

import Users from "./Users";
import Roles from "./Roles";
import Perms from "./Perms";

function AppRoutes() {
  const loginSuccessRoute = "/loginadmin/users";

  // Public routes accessible without authentication (registration workflow)
  const publicRoutes = [
    { path: "/register/verify/:token", element: <EmailVerification /> },
    { path: "/register/setup/:token", element: <PasswordSetup /> },
    { path: "/register/success", element: <RegistrationSuccess /> },
    { path: "/forgot-password", element: <PasswordResetRequest /> },
  ];

  return (
    <Router>
      <StandardAuthRoutes
        LoginComponent={(props) => (
          <Login {...props} allowStay={true} successRoute={loginSuccessRoute} />
        )}
        RegisterComponent={RegistrationRequest}
        UnauthorizedComponent={Unauthorized}
        LayoutComponent={TopNavBar}
        postLoginRedirect={loginSuccessRoute}
        publicRoutes={publicRoutes}
      >
        {/* Post-authorization routes defined by the application */}
        <Route element={<RequireAuth allowedPerms={["AllowUsers"]} />}>
          <Route index element={<Users />} />
          <Route path="loginadmin/users" element={<Users />} />
          <Route path="loginadmin/registrations" element={<AdminRegistrations />} />
        </Route>
        <Route element={<RequireAuth allowedPerms={["AllowRoles"]} />}>
          <Route path="loginadmin/roles" element={<Roles />} />
        </Route>
        <Route element={<RequireAuth allowedPerms={["AllowPerms"]} />}>
          <Route path="loginadmin/perms" element={<Perms />} />
        </Route>
        {/* The StandardAuthRoutes will handle 404s and redirections */}
      </StandardAuthRoutes>
    </Router>
  );
}

export default AppRoutes;