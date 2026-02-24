import React from "react";
import { PasswordResetRequest as LibPasswordResetRequest, useRequestPasswordReset } from "@mhiliger/auth-fe";
import { reqSecureAxios } from "../api/axios";

/**
 * App-specific wrapper for the library's PasswordResetRequest component.
 */
function PasswordResetRequest() {
  const resetMutation = useRequestPasswordReset(reqSecureAxios);

  const handleSubmit = (values) => {
    resetMutation.mutate(values);
  };

  return (
    <LibPasswordResetRequest
      onSubmit={handleSubmit}
      isLoading={resetMutation.isLoading}
      isSuccess={resetMutation.isSuccess}
      error={resetMutation.error}
    />
  );
}

export default PasswordResetRequest;
