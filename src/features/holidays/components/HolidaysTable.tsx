import React, { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/shared/ui";
import {
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit2, Trash } from "iconsax-react";
import type { Holiday } from "../types/holidays.types";

interface HolidaysTableProps {
  holidays: Holiday[];
  isLoading: boolean;
  onEdit: (holiday: Holiday) => void;
  onDelete: (holiday: Holiday) => void;
  onAdd: () => void;
}

export const HolidaysTable: React.FC<HolidaysTableProps> = ({
  holidays,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHolidays = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return holidays;

    return holidays.filter(({ name }) => name.toLowerCase().includes(query));
  }, [holidays, searchQuery]);

  const columns = useMemo<GridColDef<Holiday>[]>(
    () => [
      {
        field: "rowNumber",
        headerName: "№",
        width: 60,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) =>
          filteredHolidays.findIndex((h) => h.id === params.row.id) + 1,
      },
      {
        field: "name",
        headerName: "Название",
        flex: 1,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "date",
        headerName: "Дата",
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
      },
      {
        field: "is_recurring",
        headerName: "Повторяется",
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => (
          <Chip
            label={value ? "Ежегодно" : "Однократно"}
            color={value ? "success" : "default"}
            size="small"
          />
        ),
      },
      {
        field: "created_at",
        headerName: "Дата создания",
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
      },
      {
        field: "actions",
        headerName: "Действия",
        width: 150,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton size="small" onClick={() => onEdit(row)}>
              <Edit2 size={18} color={theme.palette.primary.main} />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(row)}>
              <Trash size={18} color={theme.palette.error.main} />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [filteredHolidays, onEdit, onDelete, theme]
  );

  return (
    <DataTable
      rows={filteredHolidays}
      columns={columns}
      loading={isLoading}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Поиск..."
      addButtonText="Добавить"
      onAddClick={onAdd}
    />
  );
};
