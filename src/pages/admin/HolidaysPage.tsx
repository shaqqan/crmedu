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
  HolidaysTable,
  HolidayDialog,
  useHolidays,
  type Holiday,
  type HolidayFormData,
} from "@/features/holidays";

export const HolidaysPage: React.FC = () => {
  const {
    holidays,
    selectedHoliday,
    isLoading,
    error,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    setSelectedHoliday,
    clearError,
  } = useHolidays();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | null>(null);

  const handleAddClick = () => {
    setSelectedHoliday(null);
    setDialogOpen(true);
  };

  const handleEditClick = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setDialogOpen(true);
  };

  const handleDeleteClick = (holiday: Holiday) => {
    setHolidayToDelete(holiday);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedHoliday(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setHolidayToDelete(null);
  };

  const handleSave = async (data: HolidayFormData) => {
    if (selectedHoliday) {
      await updateHoliday(selectedHoliday.id, data);
    } else {
      await createHoliday(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (holidayToDelete) {
      await deleteHoliday(holidayToDelete.id);
      handleDeleteDialogClose();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Выходные дни
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <HolidaysTable
        holidays={holidays}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onAdd={handleAddClick}
      />

      <HolidayDialog
        open={dialogOpen}
        holiday={selectedHoliday}
        onClose={handleDialogClose}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Удалить выходной день?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить "{holidayToDelete?.name}"? Это
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
