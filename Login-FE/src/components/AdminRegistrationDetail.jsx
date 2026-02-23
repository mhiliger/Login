import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

/**
 * Admin registration detail component with approve/reject actions.
 * @param {Object} props
 * @param {Object} props.registration - Registration data.
 * @param {Function} props.onApprove - Callback when approving (receives registration id).
 * @param {Function} props.onReject - Callback when rejecting (receives { id, reason }).
 * @param {Function} props.onBack - Callback to go back to list.
 * @param {boolean} props.isApproving - Whether approval is in progress.
 * @param {boolean} props.isRejecting - Whether rejection is in progress.
 * @param {Object} props.approveError - Error from approval.
 * @param {Object} props.rejectError - Error from rejection.
 */
const AdminRegistrationDetail = ({
  registration,
  onApprove,
  onReject,
  onBack,
  isApproving = false,
  isRejecting = false,
  approveError,
  rejectError,
}) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  if (!registration) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography>Registration not found.</Typography>
        {onBack && (
          <Button onClick={onBack} sx={{ mt: 2 }}>
            Back to List
          </Button>
        )}
      </Box>
    );
  }

  const handleApprove = () => {
    if (onApprove) {
      onApprove(registration.id);
    }
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = () => {
    if (onReject && rejectionReason.trim()) {
      onReject({ id: registration.id, reason: rejectionReason });
      setShowRejectDialog(false);
      setRejectionReason("");
    }
  };

  const handleRejectCancel = () => {
    setShowRejectDialog(false);
    setRejectionReason("");
  };

  const Wrapper = Paper || Box;

  return (
    <Box sx={{ padding: "20px" }}>
      {onBack && (
        <Button onClick={onBack} sx={{ mb: 2 }}>
          ← Back to List
        </Button>
      )}

      <Typography variant="h5" gutterBottom>
        Registration Request
      </Typography>

      {(approveError || rejectError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {approveError?.response?.data?.error ||
            rejectError?.response?.data?.error ||
            "An error occurred"}
        </Alert>
      )}

      <Wrapper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            User ID
          </Typography>
          <Typography variant="body1">{registration.id}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1">{registration.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Name
          </Typography>
          <Typography variant="body1">
            {registration.first} {registration.last}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
          <Typography variant="body1">{registration.status}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Request Note
          </Typography>
          <Typography variant="body1">
            {registration.request_note || "No note provided"}
          </Typography>
        </Box>

        {registration.status === "PENDING_APPROVAL" && (
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={isApproving}
            >
              {isApproving ? (
                <CircularProgress size={24} />
              ) : (
                "Approve"
              )}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleRejectClick}
              disabled={isRejecting}
            >
              Reject
            </Button>
          </Box>
        )}

        {registration.status === "REJECTED" && registration.admin_rejection_note && (
          <Box sx={{ mt: 2, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
            <Typography variant="subtitle2">Rejection Reason:</Typography>
            <Typography variant="body2">{registration.admin_rejection_note}</Typography>
          </Box>
        )}
      </Wrapper>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onClose={handleRejectCancel}>
        <DialogTitle>Reject Registration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this registration request.
            This will be sent to the user.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectCancel}>Cancel</Button>
          <Button
            onClick={handleRejectConfirm}
            color="error"
            disabled={!rejectionReason.trim() || isRejecting}
          >
            {isRejecting ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminRegistrationDetail;
