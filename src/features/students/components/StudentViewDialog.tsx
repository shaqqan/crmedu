import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import type { Student, StudentStatus } from "../types/students.types";

interface StudentViewDialogProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onEdit: () => void;
}

const statusConfig: Record<StudentStatus, { label: string; color: "success" | "warning" | "info" | "error" }> = {
  active: { label: "Активный", color: "success" },
  frozen: { label: "Заморожен", color: "warning" },
  graduated: { label: "Выпускник", color: "info" },
  left: { label: "Ушёл", color: "error" },
};

// Mock branch names
const branchNames: Record<number, string> = {
  1: "Чиланзар",
  2: "Юнусабад",
  3: "Сергели",
};

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value || "-"}
    </Typography>
  </Stack>
);

export const StudentViewDialog: React.FC<StudentViewDialogProps> = ({
  open,
  student,
  onClose,
  onEdit,
}) => {
  if (!student) return null;

  const statusInfo = statusConfig[student.status];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
            {student.firstName[0]}{student.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {student.lastName} {student.firstName}
            </Typography>
            <Chip
              label={statusInfo.label}
              color={statusInfo.color}
              size="small"
            />
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Personal Info */}
          <Box>
            <Typography variant="subtitle2" color="primary" mb={1}>
              Личная информация
            </Typography>
            <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2 }}>
              <InfoRow label="Телефон" value={student.phone} />
              <Divider />
              <InfoRow
                label="Дата рождения"
                value={student.birthDate ? new Date(student.birthDate).toLocaleDateString("ru-RU") : "-"}
              />
              <Divider />
              <InfoRow
                label="Пол"
                value={student.gender === "male" ? "Мужской" : "Женский"}
              />
            </Box>
          </Box>

          {/* Parent Info */}
          <Box>
            <Typography variant="subtitle2" color="primary" mb={1}>
              Родители
            </Typography>
            <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2 }}>
              <InfoRow label="ФИО родителя" value={student.parentName} />
              <Divider />
              <InfoRow label="Телефон родителя" value={student.parentPhone} />
            </Box>
          </Box>

          {/* Education Info */}
          <Box>
            <Typography variant="subtitle2" color="primary" mb={1}>
              Учебная информация
            </Typography>
            <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2 }}>
              <InfoRow label="Филиал" value={branchNames[student.branchId]} />
              <Divider />
              <InfoRow
                label="Дата регистрации"
                value={new Date(student.createdAt).toLocaleDateString("ru-RU")}
              />
            </Box>
          </Box>

          {/* Notes */}
          {student.notes && (
            <Box>
              <Typography variant="subtitle2" color="primary" mb={1}>
                Заметки
              </Typography>
              <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2 }}>
                <Typography variant="body2">{student.notes}</Typography>
              </Box>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Закрыть</Button>
        <Button variant="contained" onClick={onEdit}>
          Редактировать
        </Button>
      </DialogActions>
    </Dialog>
  );
};
