import React, { useState } from "react";
import AdminRegistrationList from "./AdminRegistrationList";
import AdminRegistrationDetail from "./AdminRegistrationDetail";
import useAdminRegistrations from "../hooks/useAdminRegistrations";
import useSecureAxios from "../hooks/data/useSecureAxios";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from "@mui/material";

/**
 * App-specific admin registrations management page.
 */
function AdminRegistrations() {
  console.log("AdminRegistrations component render");
  const secureAxios = useSecureAxios();
  const {
    pendingRegistrations,
    isLoading,
    error,
    approve,
    reject,
    isApproving,
    isRejecting,
    approveError,
    rejectError,
  } = useAdminRegistrations(secureAxios);

  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectId, setRejectId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
  };

  const handleBack = () => {
    setSelectedRegistration(null);
  };

  const handleApprove = (id) => {
    approve(id, {
      onSuccess: () => {
        setSelectedRegistration(null);
      },
    });
  };

  const handleRejectClick = (id) => {
    setRejectId(id);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = () => {
    if (rejectId && rejectionReason.trim()) {
      reject(
        { id: rejectId, reason: rejectionReason },
        {
          onSuccess: () => {
            setShowRejectDialog(false);
            setRejectId(null);
            setRejectionReason("");
            setSelectedRegistration(null);
          },
        }
      );
    }
  };

  const handleRejectCancel = () => {
    setShowRejectDialog(false);
    setRejectId(null);
    setRejectionReason("");
  };

  // Show detail view if a registration is selected
  if (selectedRegistration) {
    return (
      <AdminRegistrationDetail
        registration={selectedRegistration}
        onApprove={handleApprove}
        onReject={({ id, reason }) => {
          reject({ id, reason }, {
            onSuccess: () => setSelectedRegistration(null),
          });
        }}
        onBack={handleBack}
        isApproving={isApproving}
        isRejecting={isRejecting}
        approveError={approveError}
        rejectError={rejectError}
      />
    );
  }

  // Show list view
  return (
    <>
      <AdminRegistrationList
        registrations={pendingRegistrations}
        isLoading={isLoading}
        error={error}
        onViewDetails={handleViewDetails}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        isApproving={isApproving}
        isRejecting={isRejecting}
      />

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onClose={handleRejectCancel}>
        <DialogTitle>Reject Registration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this registration request.
            This will be sent to the user.
          </Typography>
          <MuiTextField
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
    </>
  );
}

export default AdminRegistrations;
