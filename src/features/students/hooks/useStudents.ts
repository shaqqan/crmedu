import { useEffect } from "react";
import { useStudentsStore } from "../stores/studentsStore";

export const useStudents = () => {
  const {
    students,
    selectedStudent,
    isLoading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    setSelectedStudent,
    clearError,
  } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    selectedStudent,
    isLoading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    setSelectedStudent,
    clearError,
  };
};
