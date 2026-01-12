export interface Branch {
  id: number;
  name: string;
  region: string;
  district: string;
  address: string;
  phone: string;
  employeeCount: number;
  groupCount: number;
  studentCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BranchFormData {
  name: string;
  region: string;
  district: string;
  address: string;
  phone: string;
  isActive: boolean;
}

export interface BranchesState {
  branches: Branch[];
  selectedBranch: Branch | null;
  isLoading: boolean;
  error: string | null;
}

export interface BranchesStore extends BranchesState {
  fetchBranches: () => Promise<void>;
  createBranch: (data: BranchFormData) => Promise<void>;
  updateBranch: (id: number, data: BranchFormData) => Promise<void>;
  deleteBranch: (id: number) => Promise<void>;
  setSelectedBranch: (branch: Branch | null) => void;
  clearError: () => void;
}
