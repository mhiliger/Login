import React, { createContext, useState, useContext, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children, authBaseUrl }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(undefined);

  const authAxios = useMemo(() => {
    return axios.create({
      baseURL: authBaseUrl,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }, [authBaseUrl]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, authBaseUrl, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
