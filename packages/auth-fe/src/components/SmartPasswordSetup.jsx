import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePasswordSetup from "../hooks/usePasswordSetup";
import PasswordSetup from "./PasswordSetup";

const SmartPasswordSetup = ({ loginPath = "/login" }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { validation, setPassword, isValidToken, userEmail, userFirst } = usePasswordSetup(undefined, token);

  const handleSubmit = ({ password }) => {
    setPassword.mutate(
      { token, password },
      {
        onSuccess: () => {
          setTimeout(() => navigate(loginPath), 2000);
        },
      }
    );
  };

  return (
    <PasswordSetup
      isValidating={validation.isLoading || validation.isPending}
      isValidToken={isValidToken}
      validationError={validation.error}
      userEmail={userEmail}
      userFirst={userFirst}
      onSubmit={handleSubmit}
      isSubmitting={setPassword.isLoading || setPassword.isPending}
      isSuccess={setPassword.isSuccess}
      submitError={setPassword.error}
      loginPath={loginPath}
    />
  );
};

export default SmartPasswordSetup;