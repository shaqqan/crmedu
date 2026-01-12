import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit2, Trash, SearchNormal1, Add } from "iconsax-react";
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
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        border: "1px solid #E0E0E0",
        p: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          placeholder="Поиск..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 250 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal1 size={20} color="#9E9E9E" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={onAdd}
        >
          Добавить
        </Button>
      </Stack>

      <DataGrid
        rows={filteredHolidays}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#F1F3F5",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #F0F0F0",
          },
        }}
      />
    </Box>
  );
};
