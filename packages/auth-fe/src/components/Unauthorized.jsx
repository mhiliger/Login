import React from "react";

/**
 * Boilerplate Unauthorized component.
 */
const Unauthorized = ({ Typography, Stack, Box }) => {
  return (
    <Stack
      sx={{
        margin: "10vh",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        You are not authorized to access this page.
      </Typography>
      <br />
      <br />
      <Typography variant="h5">
        Contact your system administrator for access rights.
      </Typography>
    </Stack>
  );
};

export default Unauthorized;
