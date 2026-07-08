export { AuthProvider, useAuth, default as AuthContext } from "./context/AuthProvider";
export { default as useRefreshToken } from "./hooks/useRefreshToken";
export { default as useSecureAxios } from "./hooks/useSecureAxios";
export { default as useLogin } from "./hooks/useLogin";
export { default as RequireAuth } from "./components/RequireAuth";
export { default as StandardAuthRoutes } from "./components/StandardAuthRoutes";
export { default as Login } from "./components/Login";
export { default as Register } from "./components/Register";
export { default as Unauthorized } from "./components/Unauthorized";

// Registration workflow components
export { default as RegistrationRequest } from "./components/RegistrationRequest";
export { default as EmailVerification } from "./components/EmailVerification";
export { default as PasswordSetup } from "./components/PasswordSetup";
export { default as RegistrationSuccess } from "./components/RegistrationSuccess";
export { default as PasswordResetRequest } from "./components/PasswordResetRequest";

// Smart workflow components
export { default as SmartRegistrationRequest } from "./components/SmartRegistrationRequest";
export { default as SmartEmailVerification } from "./components/SmartEmailVerification";
export { default as SmartPasswordSetup } from "./components/SmartPasswordSetup";
export { default as SmartPasswordResetRequest } from "./components/SmartPasswordResetRequest";

// Registration workflow hooks
export { default as useRegistrationSubmit } from "./hooks/useRegistrationSubmit";
export { default as useEmailVerification } from "./hooks/useEmailVerification";
export { default as usePasswordSetup, useValidateSetupToken, useSetPassword, useRequestPasswordReset } from "./hooks/usePasswordSetup";