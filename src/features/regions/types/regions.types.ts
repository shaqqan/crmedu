export interface Region {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
}

export interface RegionFormData {
  name: string;
  parent_id: number | null;
}

export interface RegionsState {
  regions: Region[];
  selectedRegion: Region | null;
  isLoading: boolean;
  error: string | null;
}

export interface RegionsStore extends RegionsState {
  fetchRegions: () => Promise<void>;
  createRegion: (data: RegionFormData) => Promise<void>;
  updateRegion: (id: number, data: RegionFormData) => Promise<void>;
  deleteRegion: (id: number) => Promise<void>;
  setSelectedRegion: (region: Region | null) => void;
  clearError: () => void;
}
