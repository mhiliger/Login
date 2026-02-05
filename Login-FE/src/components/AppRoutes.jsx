import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StandardAuthRoutes, RequireAuth } from "@your-org/auth-fe";
import TopNavBar from "./TopNavBar";
import Login from "./Login";
import Register from "./Register";
import Unauthorized from "./Unauthorized";

import Users from "./Users";
import Roles from "./Roles";
import Perms from "./Perms";

function AppRoutes() {
  const loginSuccessRoute = "/loginadmin/users";

  return (
    <Router>
      <StandardAuthRoutes
        LoginComponent={(props) => (
          <Login {...props} allowStay={true} successRoute={loginSuccessRoute} />
        )}
        RegisterComponent={Register}
        UnauthorizedComponent={Unauthorized}
        LayoutComponent={TopNavBar}
        postLoginRedirect={loginSuccessRoute}
      >
        {/* Post-authorization routes defined by the application */}
        <Route element={<RequireAuth allowedPerms={[3]} />}>
          <Route index element={<Users />} />
          <Route path="loginadmin/users" element={<Users />} />
        </Route>
        <Route element={<RequireAuth allowedPerms={[4]} />}>
          <Route path="loginadmin/roles" element={<Roles />} />
        </Route>
        <Route element={<RequireAuth allowedPerms={[5]} />}>
          <Route path="loginadmin/perms" element={<Perms />} />
        </Route>
        {/* The StandardAuthRoutes will handle 404s and redirections */}
      </StandardAuthRoutes>
    </Router>
  );
}

export default AppRoutes;