import { Typography, Box, Stack } from "@mui/material";
import React from "react";

function Unauthorized() {
  return (
    <Stack
      sx={{
        margin: "10vh",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        Your are not authorized to access this page.
      </Typography>
      <br />
      <br />
      <Typography variant="h5">
        Contact your system administrator for access rights.
      </Typography>
    </Stack>
  );
}

export default Unauthorized;
