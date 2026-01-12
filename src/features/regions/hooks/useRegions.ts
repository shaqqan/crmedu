import { useEffect } from "react";
import { useRegionsStore } from "../stores/regionsStore";

export const useRegions = () => {
  const {
    regions,
    selectedRegion,
    isLoading,
    error,
    fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
    setSelectedRegion,
    clearError,
  } = useRegionsStore();

  useEffect(() => {
    fetchRegions();
  }, []);

  return {
    regions,
    selectedRegion,
    isLoading,
    error,
    fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
    setSelectedRegion,
    clearError,
  };
};
