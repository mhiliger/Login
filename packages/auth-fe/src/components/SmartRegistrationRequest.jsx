import React from "react";
import useRegistrationSubmit from "../hooks/useRegistrationSubmit";
import RegistrationRequest from "./RegistrationRequest";

const SmartRegistrationRequest = ({ loginPath = "/login" }) => {
  const submitMutation = useRegistrationSubmit();

  const handleSubmit = (values) => {
    submitMutation.mutate(values);
  };

  return (
    <RegistrationRequest
      onSubmit={handleSubmit}
      isLoading={submitMutation.isLoading || submitMutation.isPending}
      isSuccess={submitMutation.isSuccess}
      successMessage={submitMutation.data?.message}
      error={submitMutation.error}
      loginPath={loginPath}
    />
  );
};

export default SmartRegistrationRequest;