import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { Region, RegionFormData } from "../types/regions.types";

interface RegionDialogProps {
  open: boolean;
  region: Region | null;
  regions: Region[];
  onClose: () => void;
  onSave: (data: RegionFormData) => Promise<void>;
  isLoading: boolean;
}

const initialFormData: RegionFormData = {
  name: "",
  parent_id: null,
};

export const RegionDialog: React.FC<RegionDialogProps> = ({
  open,
  region,
  regions,
  onClose,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<RegionFormData>(initialFormData);

  const parentRegions = regions.filter((r) => r.parent_id === null && r.id !== region?.id);

  useEffect(() => {
    if (region) {
      setFormData({
        name: region.name,
        parent_id: region.parent_id,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [region, open]);

  const handleChange = (field: keyof RegionFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleParentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      parent_id: value === "" ? null : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  const isEdit = Boolean(region);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Редактировать регион" : "Добавить регион"}
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
            <FormControl fullWidth>
              <InputLabel>Родительский регион</InputLabel>
              <Select
                value={formData.parent_id === null ? "" : String(formData.parent_id)}
                onChange={(e) => handleParentChange(e.target.value as string)}
                label="Родительский регион"
              >
                <MenuItem value="">
                  <em>Нет (это регион)</em>
                </MenuItem>
                {parentRegions.map((r) => (
                  <MenuItem key={r.id} value={String(r.id)}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
