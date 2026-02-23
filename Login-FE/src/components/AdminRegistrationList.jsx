import React from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

/**
 * Admin registration list component.
 * @param {Object} props
 * @param {Array} props.registrations - List of pending registrations.
 * @param {boolean} props.isLoading - Whether data is loading.
 * @param {Object} props.error - Error object if loading failed.
 * @param {Function} props.onViewDetails - Callback when viewing details (receives registration).
 * @param {Function} props.onApprove - Callback when approving (receives registration id).
 * @param {Function} props.onReject - Callback when rejecting (receives registration id).
 * @param {boolean} props.isApproving - Whether an approval is in progress.
 * @param {boolean} props.isRejecting - Whether a rejection is in progress.
 */
const AdminRegistrationList = ({
  registrations = [],
  isLoading = false,
  error,
  onViewDetails,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}) => {
  console.log("AdminRegistrationList render:", { registrations, isLoading, error });
  if (isLoading) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <CircularProgress size={48} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading registrations...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Pending Registrations
        </Typography>
        <Alert severity="error">
          {error.response?.data?.error || error.message || "Failed to load registrations"}
        </Alert>
      </Box>
    );
  }

  const Wrapper = Paper || Box;

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Pending Registrations
      </Typography>

      {registrations.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No pending registration requests.
        </Typography>
      ) : (
        <Wrapper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Request Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.id}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>{reg.first} {reg.last}</TableCell>
                  <TableCell>{reg.request_note}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {onViewDetails && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onViewDetails(reg)}
                        >
                          Details
                        </Button>
                      )}
                      {onApprove && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => onApprove(reg.id)}
                          disabled={isApproving}
                        >
                          Approve
                        </Button>
                      )}
                      {onReject && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => onReject(reg.id)}
                          disabled={isRejecting}
                        >
                          Reject
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Wrapper>
      )}
    </Box>
  );
};

export default AdminRegistrationList;
