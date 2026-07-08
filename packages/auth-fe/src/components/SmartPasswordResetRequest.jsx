import React from "react";
import { useRequestPasswordReset } from "../hooks/usePasswordSetup";
import PasswordResetRequest from "./PasswordResetRequest";

const SmartPasswordResetRequest = ({ loginPath = "/login" }) => {
  const resetMutation = useRequestPasswordReset();

  const handleSubmit = (values) => {
    resetMutation.mutate(values);
  };

  return (
    <PasswordResetRequest
      onSubmit={handleSubmit}
      isLoading={resetMutation.isLoading || resetMutation.isPending}
      isSuccess={resetMutation.isSuccess}
      error={resetMutation.error}
      loginPath={loginPath}
    />
  );
};

export default SmartPasswordResetRequest;