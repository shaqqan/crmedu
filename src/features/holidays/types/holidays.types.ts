export interface Holiday {
  id: number;
  name: string;
  date: string;
  is_recurring: boolean;
  created_at: string;
}

export interface HolidayFormData {
  name: string;
  date: string;
  is_recurring: boolean;
}

export interface HolidaysState {
  holidays: Holiday[];
  selectedHoliday: Holiday | null;
  isLoading: boolean;
  error: string | null;
}

export interface HolidaysStore extends HolidaysState {
  fetchHolidays: () => Promise<void>;
  createHoliday: (data: HolidayFormData) => Promise<void>;
  updateHoliday: (id: number, data: HolidayFormData) => Promise<void>;
  deleteHoliday: (id: number) => Promise<void>;
  setSelectedHoliday: (holiday: Holiday | null) => void;
  clearError: () => void;
}
