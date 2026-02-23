import React from "react";
import { useParams } from "react-router-dom";
import {
  EmailVerification as LibEmailVerification,
  useEmailVerification,
} from "@your-org/auth-fe";
import { reqAxios } from "../api/axios";

/**
 * App-specific wrapper for the email verification result page.
 */
function EmailVerification() {
  const { token } = useParams();
  const verificationQuery = useEmailVerification(reqAxios, token);

  return (
    <LibEmailVerification
      isLoading={verificationQuery.isLoading}
      isSuccess={verificationQuery.isSuccess}
      isError={verificationQuery.isError}
      error={verificationQuery.error}
      data={verificationQuery.data}
    />
  );
}

export default EmailVerification;
