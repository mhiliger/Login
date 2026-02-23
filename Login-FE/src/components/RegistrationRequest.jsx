import React from "react";
import {
  RegistrationRequest as LibRegistrationRequest,
  useRegistrationSubmit,
} from "@your-org/auth-fe";
import { reqAxios } from "../api/axios";

/**
 * App-specific wrapper for the registration request form.
 */
function RegistrationRequest() {
  const submitMutation = useRegistrationSubmit(reqAxios);

  const handleSubmit = (values) => {
    submitMutation.mutate(values);
  };

  return (
    <LibRegistrationRequest
      onSubmit={handleSubmit}
      isLoading={submitMutation.isPending}
      isSuccess={submitMutation.isSuccess}
      successMessage={submitMutation.data?.message}
      error={submitMutation.error}
    />
  );
}

export default RegistrationRequest;
