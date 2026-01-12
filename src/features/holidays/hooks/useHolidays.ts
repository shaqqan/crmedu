import { useEffect } from "react";
import { useHolidaysStore } from "../stores/holidaysStore";

export const useHolidays = () => {
  const {
    holidays,
    selectedHoliday,
    isLoading,
    error,
    fetchHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    setSelectedHoliday,
    clearError,
  } = useHolidaysStore();

  useEffect(() => {
    fetchHolidays();
  }, []);

  return {
    holidays,
    selectedHoliday,
    isLoading,
    error,
    fetchHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    setSelectedHoliday,
    clearError,
  };
};
