import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import {
  BranchesTable,
  BranchDialog,
  useBranches,
  type Branch,
  type BranchFormData,
} from "@/features/branches";

export const BranchesPage: React.FC = () => {
  const {
    branches,
    selectedBranch,
    isLoading,
    error,
    createBranch,
    updateBranch,
    deleteBranch,
    setSelectedBranch,
    clearError,
  } = useBranches();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  const handleAddClick = () => {
    setSelectedBranch(null);
    setDialogOpen(true);
  };

  const handleEditClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setDialogOpen(true);
  };

  const handleDeleteClick = (branch: Branch) => {
    setBranchToDelete(branch);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBranch(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setBranchToDelete(null);
  };

  const handleSave = async (data: BranchFormData) => {
    if (selectedBranch) {
      await updateBranch(selectedBranch.id, data);
    } else {
      await createBranch(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (branchToDelete) {
      await deleteBranch(branchToDelete.id);
      handleDeleteDialogClose();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Филиалы
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <BranchesTable
        branches={branches}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onAdd={handleAddClick}
      />

      <BranchDialog
        open={dialogOpen}
        branch={selectedBranch}
        onClose={handleDialogClose}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Удалить филиал?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить филиал "{branchToDelete?.name}"? Это
            действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Отмена</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
