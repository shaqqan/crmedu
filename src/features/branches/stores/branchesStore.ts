import { create } from "zustand";
import type { Branch, BranchFormData, BranchesStore } from "../types/branches.types";

// Mock data
const mockBranches: Branch[] = [
  {
    id: 1,
    name: "Главный филиал",
    region: "Ташкент",
    district: "Мирзо-Улугбекский",
    address: "ул. Навои 25",
    phone: "+998 71 123 45 67",
    employeeCount: 25,
    groupCount: 12,
    studentCount: 180,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Филиал Чиланзар",
    region: "Ташкент",
    district: "Чиланзарский",
    address: "Чиланзар 10 квартал",
    phone: "+998 71 234 56 78",
    employeeCount: 18,
    groupCount: 8,
    studentCount: 120,
    isActive: true,
    createdAt: "2024-02-20T09:00:00Z",
    updatedAt: "2024-02-20T09:00:00Z",
  },
  {
    id: 3,
    name: "Филиал Юнусабад",
    region: "Ташкент",
    district: "Юнусабадский",
    address: "Юнусабад 4 квартал",
    phone: "+998 71 345 67 89",
    employeeCount: 15,
    groupCount: 6,
    studentCount: 90,
    isActive: false,
    createdAt: "2024-03-10T14:00:00Z",
    updatedAt: "2024-03-10T14:00:00Z",
  },
  {
    id: 4,
    name: "Филиал Сергели",
    region: "Ташкент",
    district: "Сергелийский",
    address: "ул. Янги Сергели 15",
    phone: "+998 71 456 78 90",
    employeeCount: 12,
    groupCount: 5,
    studentCount: 75,
    isActive: true,
    createdAt: "2024-04-05T11:00:00Z",
    updatedAt: "2024-04-05T11:00:00Z",
  },
];

let nextId = 5;

export const useBranchesStore = create<BranchesStore>((set) => ({
  branches: mockBranches,
  selectedBranch: null,
  isLoading: false,
  error: null,

  fetchBranches: async () => {
    // Mock: data already loaded
    set({ isLoading: false });
  },

  createBranch: async (data: BranchFormData) => {
    const newBranch: Branch = {
      id: nextId++,
      ...data,
      employeeCount: 0,
      groupCount: 0,
      studentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      branches: [...state.branches, newBranch],
    }));
  },

  updateBranch: async (id: number, data: BranchFormData) => {
    set((state) => ({
      branches: state.branches.map((b) =>
        b.id === id
          ? { ...b, ...data, updatedAt: new Date().toISOString() }
          : b
      ),
      selectedBranch: null,
    }));
  },

  deleteBranch: async (id: number) => {
    set((state) => ({
      branches: state.branches.filter((b) => b.id !== id),
    }));
  },

  setSelectedBranch: (branch: Branch | null) => {
    set({ selectedBranch: branch });
  },

  clearError: () => {
    set({ error: null });
  },
}));
