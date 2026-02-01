import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import Login from "./Login";
import Register from "./Register";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";
import RequireAuth from "./RequireAuth";

import Users from "./Users";
import Roles from "./Roles";
import Perms from "./Perms";

function AppRoutes() {
  const { auth } = useAuth();
  const loginSuccessRoute = "/loginadmin/users";
  return (
    <>
      <Router>
        <Routes>
          {!auth.email ? (
            <>
              <Route path="/" element={<TopNavBar />}>
                <Route
                  index
                  element={
                    <Login
                      successRoute={loginSuccessRoute}
                      // errorRoute="login"
                      allowStay={true}
                    />
                  }
                />
                <Route
                  path="login"
                  element={
                    <Login successRoute={loginSuccessRoute} allowStay={true} />
                  }
                />
                <Route path="register" element={<Register />} />
                <Route
                  path="*"
                  element={
                    <Login successRoute={loginSuccessRoute} allowStay={true} />
                  }
                />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" element={<TopNavBar />}>
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
                <Route element={<RequireAuth allowedPerms={[3]} />}>
                  <Route path="*" element={<Users />} />
                </Route>
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
