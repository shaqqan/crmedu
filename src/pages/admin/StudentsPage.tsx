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
  StudentsTable,
  StudentDialog,
  StudentViewDialog,
  useStudents,
  type Student,
  type StudentFormData,
} from "@/features/students";

export const StudentsPage: React.FC = () => {
  const {
    students,
    selectedStudent,
    isLoading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    setSelectedStudent,
    clearError,
  } = useStudents();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setDialogOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleViewClick = (student: Student) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleEditFromView = () => {
    setViewDialogOpen(false);
    setDialogOpen(true);
  };

  const handleSave = async (data: StudentFormData) => {
    if (selectedStudent) {
      await updateStudent(selectedStudent.id, data);
    } else {
      await createStudent(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete.id);
      handleDeleteDialogClose();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Студенты
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <StudentsTable
        students={students}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onView={handleViewClick}
        onAdd={handleAddClick}
      />

      <StudentDialog
        open={dialogOpen}
        student={selectedStudent}
        onClose={handleDialogClose}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <StudentViewDialog
        open={viewDialogOpen}
        student={selectedStudent}
        onClose={handleViewDialogClose}
        onEdit={handleEditFromView}
      />

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Удалить студента?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить "{studentToDelete?.lastName} {studentToDelete?.firstName}"?
            Это действие нельзя отменить.
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
