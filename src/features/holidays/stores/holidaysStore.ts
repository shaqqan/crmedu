import { create } from "zustand";
import type { Holiday, HolidayFormData, HolidaysStore } from "../types/holidays.types";

// Mock data
const mockHolidays: Holiday[] = [
  {
    id: 1,
    name: "Новый год",
    date: "2025-01-01",
    is_recurring: true,
    created_at: "2024-01-01T10:00:00Z",
  },
  {
    id: 2,
    name: "День защитника Отечества",
    date: "2025-01-14",
    is_recurring: true,
    created_at: "2024-01-02T10:00:00Z",
  },
  {
    id: 3,
    name: "Международный женский день",
    date: "2025-03-08",
    is_recurring: true,
    created_at: "2024-01-03T10:00:00Z",
  },
  {
    id: 4,
    name: "Навруз",
    date: "2025-03-21",
    is_recurring: true,
    created_at: "2024-01-04T10:00:00Z",
  },
  {
    id: 5,
    name: "День памяти и почестей",
    date: "2025-05-09",
    is_recurring: true,
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: 6,
    name: "День независимости",
    date: "2025-09-01",
    is_recurring: true,
    created_at: "2024-01-06T10:00:00Z",
  },
  {
    id: 7,
    name: "День учителя",
    date: "2025-10-01",
    is_recurring: true,
    created_at: "2024-01-07T10:00:00Z",
  },
  {
    id: 8,
    name: "День Конституции",
    date: "2025-12-08",
    is_recurring: true,
    created_at: "2024-01-08T10:00:00Z",
  },
];

let nextId = 9;

export const useHolidaysStore = create<HolidaysStore>((set) => ({
  holidays: mockHolidays,
  selectedHoliday: null,
  isLoading: false,
  error: null,

  fetchHolidays: async () => {
    set({ isLoading: false });
  },

  createHoliday: async (data: HolidayFormData) => {
    const newHoliday: Holiday = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString(),
    };
    set((state) => ({
      holidays: [...state.holidays, newHoliday],
    }));
  },

  updateHoliday: async (id: number, data: HolidayFormData) => {
    set((state) => ({
      holidays: state.holidays.map((h) =>
        h.id === id ? { ...h, ...data } : h
      ),
      selectedHoliday: null,
    }));
  },

  deleteHoliday: async (id: number) => {
    set((state) => ({
      holidays: state.holidays.filter((h) => h.id !== id),
    }));
  },

  setSelectedHoliday: (holiday: Holiday | null) => {
    set({ selectedHoliday: holiday });
  },

  clearError: () => {
    set({ error: null });
  },
}));
