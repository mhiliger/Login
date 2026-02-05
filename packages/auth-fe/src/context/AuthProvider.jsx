import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

/**
 * AuthProvider with configurable settings.
 * @param {Object} props
 * @param {Object} [props.initialConfig] - Optional initial configuration (e.g., passwordPolicy)
 */
export const AuthProvider = ({ children, initialConfig = {} }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(undefined);
  const [config, setConfig] = useState({
    passwordPolicy: {
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
      message: "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
    },
    ...initialConfig
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, config, setConfig }}>
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