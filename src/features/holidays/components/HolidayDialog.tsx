import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import type { Holiday, HolidayFormData } from "../types/holidays.types";

interface HolidayDialogProps {
  open: boolean;
  holiday: Holiday | null;
  onClose: () => void;
  onSave: (data: HolidayFormData) => Promise<void>;
  isLoading: boolean;
}

const initialFormData: HolidayFormData = {
  name: "",
  date: "",
  is_recurring: true,
};

export const HolidayDialog: React.FC<HolidayDialogProps> = ({
  open,
  holiday,
  onClose,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<HolidayFormData>(initialFormData);

  useEffect(() => {
    if (holiday) {
      setFormData({
        name: holiday.name,
        date: holiday.date,
        is_recurring: holiday.is_recurring,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [holiday, open]);

  const handleChange = (field: keyof HolidayFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      is_recurring: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  const isEdit = Boolean(holiday);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Редактировать выходной день" : "Добавить выходной день"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Название"
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
              autoFocus
            />
            <TextField
              label="Дата"
              type="date"
              value={formData.date}
              onChange={handleChange("date")}
              fullWidth
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_recurring}
                  onChange={handleSwitchChange}
                />
              }
              label="Повторяется ежегодно"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
