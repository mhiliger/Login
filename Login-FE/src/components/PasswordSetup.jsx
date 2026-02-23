import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PasswordSetup as LibPasswordSetup,
  usePasswordSetup,
} from "@your-org/auth-fe";
import { reqAxios } from "../api/axios";

/**
 * App-specific wrapper for the password setup page.
 */
function PasswordSetup() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { validation, setPassword, isValidToken, userEmail, userFirst } = usePasswordSetup(reqAxios, token);

  const handleSubmit = ({ password }) => {
    setPassword.mutate(
      { token, password },
      {
        onSuccess: () => {
          // Redirect to login after short delay so user can see success message
          setTimeout(() => navigate("/login"), 2000);
        },
      }
    );
  };

  return (
    <LibPasswordSetup
      isValidating={validation.isLoading}
      isValidToken={isValidToken}
      validationError={validation.error}
      userEmail={userEmail}
      userFirst={userFirst}
      onSubmit={handleSubmit}
      isSubmitting={setPassword.isPending}
      isSuccess={setPassword.isSuccess}
      submitError={setPassword.error}
    />
  );
}

export default PasswordSetup;
