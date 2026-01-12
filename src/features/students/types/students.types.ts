export type StudentStatus = 'active' | 'frozen' | 'graduated' | 'left';
export type Gender = 'male' | 'female';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  parentName: string;
  parentPhone: string;
  branchId: number;
  groupId: number | null;
  languageId: number | null;
  status: StudentStatus;
  photo: string | null;
  notes: string;
  createdAt: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  parentName: string;
  parentPhone: string;
  branchId: number | null;
  groupId: number | null;
  languageId: number | null;
  status: StudentStatus;
  notes: string;
}

export interface StudentsState {
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  error: string | null;
}

export interface StudentsStore extends StudentsState {
  fetchStudents: () => Promise<void>;
  createStudent: (data: StudentFormData) => Promise<void>;
  updateStudent: (id: number, data: StudentFormData) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  setSelectedStudent: (student: Student | null) => void;
  clearError: () => void;
}
