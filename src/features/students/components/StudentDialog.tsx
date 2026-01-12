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
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import type { Student, StudentFormData, Gender, StudentStatus } from "../types/students.types";

interface StudentDialogProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onSave: (data: StudentFormData) => Promise<void>;
  isLoading: boolean;
}

// Mock data for branches
const branches = [
  { id: 1, name: "Чиланзар" },
  { id: 2, name: "Юнусабад" },
  { id: 3, name: "Сергели" },
];

const initialFormData: StudentFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  birthDate: "",
  gender: "male",
  parentName: "",
  parentPhone: "",
  branchId: null,
  groupId: null,
  languageId: null,
  status: "active",
  notes: "",
};

export const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  student,
  onClose,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        birthDate: student.birthDate,
        gender: student.gender,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        branchId: student.branchId,
        groupId: student.groupId,
        languageId: student.languageId,
        status: student.status,
        notes: student.notes,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [student, open]);

  const handleChange = (field: keyof StudentFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (field: keyof StudentFormData) => (
    e: { target: { value: string } }
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? null : (field === "branchId" || field === "groupId" || field === "languageId" ? Number(value) : value),
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value as Gender,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  const isEdit = Boolean(student);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Редактировать студента" : "Добавить студента"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Personal Info */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Личная информация
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Имя"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  fullWidth
                  required
                  autoFocus
                />
                <TextField
                  label="Фамилия"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  fullWidth
                  required
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
                <TextField
                  label="Телефон"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  fullWidth
                  required
                  placeholder="+998901234567"
                />
                <TextField
                  label="Дата рождения"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange("birthDate")}
                  fullWidth
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              </Stack>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>Пол</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                  <FormControlLabel value="female" control={<Radio />} label="Женский" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider />

            {/* Parent Info */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Информация о родителях
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="ФИО родителя"
                  value={formData.parentName}
                  onChange={handleChange("parentName")}
                  fullWidth
                />
                <TextField
                  label="Телефон родителя"
                  value={formData.parentPhone}
                  onChange={handleChange("parentPhone")}
                  fullWidth
                  placeholder="+998901234567"
                />
              </Stack>
            </Box>

            <Divider />

            {/* Education Info */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Учебная информация
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel>Филиал</InputLabel>
                  <Select
                    value={formData.branchId === null ? "" : String(formData.branchId)}
                    onChange={handleSelectChange("branchId")}
                    label="Филиал"
                  >
                    {branches.map((b) => (
                      <MenuItem key={b.id} value={String(b.id)}>
                        {b.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleSelectChange("status")}
                    label="Статус"
                  >
                    <MenuItem value="active">Активный</MenuItem>
                    <MenuItem value="frozen">Заморожен</MenuItem>
                    <MenuItem value="graduated">Выпускник</MenuItem>
                    <MenuItem value="left">Ушёл</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            {/* Notes */}
            <TextField
              label="Заметки"
              value={formData.notes}
              onChange={handleChange("notes")}
              fullWidth
              multiline
              rows={3}
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
