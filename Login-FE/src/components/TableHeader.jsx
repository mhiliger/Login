import { forwardRef } from "react";
import { Box, Stack, Alert, Button, Typography } from "@mui/material";

const TableHeader = forwardRef(function TableHeader(props, ref) {
  const { query, headerText } = props;

  return (
    <Box ref={ref}>
      <Typography variant="h6">{headerText}</Typography>

      {query?.isError && (
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Alert severity="error">{query?.error?.message}</Alert>
          <Button
            size="small"
            sx={{ height: "75%", borderColor: "red", color: "red" }}
            variant="outlined"
            onClick={query.refetch}
          >
            Retry
          </Button>
        </Stack>
      )}
    </Box>
  );
});

export default TableHeader;
