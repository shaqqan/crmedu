import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
  RegionsTable,
  RegionDialog,
  useRegions,
  type Region,
  type RegionFormData,
} from "@/features/regions";

export const RegionsPage: React.FC = () => {
  const {
    regions,
    selectedRegion,
    isLoading,
    error,
    createRegion,
    updateRegion,
    deleteRegion,
    setSelectedRegion,
    clearError,
  } = useRegions();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState<Region | null>(null);

  const handleAddClick = () => {
    setSelectedRegion(null);
    setDialogOpen(true);
  };

  const handleEditClick = (region: Region) => {
    setSelectedRegion(region);
    setDialogOpen(true);
  };

  const handleDeleteClick = (region: Region) => {
    setRegionToDelete(region);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRegion(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRegionToDelete(null);
  };

  const handleSave = async (data: RegionFormData) => {
    if (selectedRegion) {
      await updateRegion(selectedRegion.id, data);
    } else {
      await createRegion(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (regionToDelete) {
      await deleteRegion(regionToDelete.id);
      handleDeleteDialogClose();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Регионы
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <RegionsTable
        regions={regions}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onAdd={handleAddClick}
      />

      <RegionDialog
        open={dialogOpen}
        region={selectedRegion}
        regions={regions}
        onClose={handleDialogClose}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Удалить регион?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить "{regionToDelete?.name}"? Это
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
