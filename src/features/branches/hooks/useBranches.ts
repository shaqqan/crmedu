import { useEffect } from "react";
import { useBranchesStore } from "../stores/branchesStore";

export const useBranches = () => {
  const {
    branches,
    selectedBranch,
    isLoading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    setSelectedBranch,
    clearError,
  } = useBranchesStore();

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    branches,
    selectedBranch,
    isLoading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    setSelectedBranch,
    clearError,
  };
};
