import { create } from "zustand";
import type { Region, RegionFormData, RegionsStore } from "../types/regions.types";

// Mock data
const mockRegions: Region[] = [
  // Regions (parent_id = null)
  {
    id: 1,
    name: "Ташкент",
    parent_id: null,
    created_at: "2024-01-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Самарканд",
    parent_id: null,
    created_at: "2024-01-02T10:00:00Z",
  },
  {
    id: 3,
    name: "Бухара",
    parent_id: null,
    created_at: "2024-01-03T10:00:00Z",
  },
  {
    id: 4,
    name: "Фергана",
    parent_id: null,
    created_at: "2024-01-04T10:00:00Z",
  },
  // Districts for Ташкент
  {
    id: 5,
    name: "Мирзо-Улугбекский",
    parent_id: 1,
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: 6,
    name: "Чиланзарский",
    parent_id: 1,
    created_at: "2024-01-06T10:00:00Z",
  },
  {
    id: 7,
    name: "Юнусабадский",
    parent_id: 1,
    created_at: "2024-01-07T10:00:00Z",
  },
  {
    id: 8,
    name: "Сергелийский",
    parent_id: 1,
    created_at: "2024-01-08T10:00:00Z",
  },
  // Districts for Самарканд
  {
    id: 9,
    name: "Самаркандский",
    parent_id: 2,
    created_at: "2024-01-09T10:00:00Z",
  },
  {
    id: 10,
    name: "Акдарьинский",
    parent_id: 2,
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 11,
    name: "Булунгурский",
    parent_id: 2,
    created_at: "2024-01-11T10:00:00Z",
  },
  // Districts for Бухара
  {
    id: 12,
    name: "Бухарский",
    parent_id: 3,
    created_at: "2024-01-12T10:00:00Z",
  },
  {
    id: 13,
    name: "Каракульский",
    parent_id: 3,
    created_at: "2024-01-13T10:00:00Z",
  },
  // Districts for Фергана
  {
    id: 14,
    name: "Ферганский",
    parent_id: 4,
    created_at: "2024-01-14T10:00:00Z",
  },
  {
    id: 15,
    name: "Маргиланский",
    parent_id: 4,
    created_at: "2024-01-15T10:00:00Z",
  },
];

let nextId = 16;

export const useRegionsStore = create<RegionsStore>((set) => ({
  regions: mockRegions,
  selectedRegion: null,
  isLoading: false,
  error: null,

  fetchRegions: async () => {
    set({ isLoading: false });
  },

  createRegion: async (data: RegionFormData) => {
    const newRegion: Region = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString(),
    };
    set((state) => ({
      regions: [...state.regions, newRegion],
    }));
  },

  updateRegion: async (id: number, data: RegionFormData) => {
    set((state) => ({
      regions: state.regions.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
      selectedRegion: null,
    }));
  },

  deleteRegion: async (id: number) => {
    set((state) => ({
      regions: state.regions.filter((r) => r.id !== id),
    }));
  },

  setSelectedRegion: (region: Region | null) => {
    set({ selectedRegion: region });
  },

  clearError: () => {
    set({ error: null });
  },
}));
