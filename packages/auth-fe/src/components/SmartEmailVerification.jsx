import React from "react";
import { useParams } from "react-router-dom";
import useEmailVerification from "../hooks/useEmailVerification";
import EmailVerification from "./EmailVerification";

const SmartEmailVerification = ({ loginPath = "/login" }) => {
  const { token } = useParams();
  const { isLoading, isPending, isSuccess, isError, error, data } = useEmailVerification(undefined, token);

  return (
    <EmailVerification
      isLoading={isLoading || isPending}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      data={data}
      loginPath={loginPath}
    />
  );
};

export default SmartEmailVerification;