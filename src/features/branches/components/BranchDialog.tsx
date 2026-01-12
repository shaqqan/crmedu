import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import type { Branch, BranchFormData } from "../types/branches.types";

interface BranchDialogProps {
  open: boolean;
  branch: Branch | null;
  onClose: () => void;
  onSave: (data: BranchFormData) => Promise<void>;
  isLoading: boolean;
}

const initialFormData: BranchFormData = {
  name: "",
  region: "",
  district: "",
  address: "",
  phone: "",
  isActive: true,
};

export const BranchDialog: React.FC<BranchDialogProps> = ({
  open,
  branch,
  onClose,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<BranchFormData>(initialFormData);

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name,
        region: branch.region,
        district: branch.district,
        address: branch.address,
        phone: branch.phone,
        isActive: branch.isActive,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [branch, open]);

  const handleChange = (field: keyof BranchFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "isActive" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  const isEdit = Boolean(branch);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Редактировать филиал" : "Добавить филиал"}
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
              label="Адрес"
              value={formData.address}
              onChange={handleChange("address")}
              fullWidth
              required
              multiline
              rows={2}
            />
            <TextField
              label="Телефон"
              value={formData.phone}
              onChange={handleChange("phone")}
              fullWidth
              required
              placeholder="+998 XX XXX XX XX"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleChange("isActive")}
                />
              }
              label="Активен"
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
