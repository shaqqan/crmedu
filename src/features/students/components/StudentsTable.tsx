import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Edit2, Trash, SearchNormal1, Add, Eye } from "iconsax-react";
import type { Student, StudentStatus } from "../types/students.types";

interface StudentsTableProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onView: (student: Student) => void;
  onAdd: () => void;
}

const statusConfig: Record<
  StudentStatus,
  { label: string; color: "success" | "warning" | "info" | "error" }
> = {
  active: { label: "Активный", color: "success" },
  frozen: { label: "Заморожен", color: "warning" },
  graduated: { label: "Выпускник", color: "info" },
  left: { label: "Ушёл", color: "error" },
};

// Mock branch names for display
const branchNames: Record<number, string> = {
  1: "Чиланзар",
  2: "Юнусабад",
  3: "Сергели",
};

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  isLoading,
  onEdit,
  onDelete,
  onView,
  onAdd,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">(
    "all"
  );
  const [branchFilter, setBranchFilter] = useState<number | "all">("all");

  const filteredStudents = useMemo(() => {
    let result = students;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter);
    }

    // Filter by branch
    if (branchFilter !== "all") {
      result = result.filter((s) => s.branchId === branchFilter);
    }

    // Search by name or phone
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        ({ firstName, lastName, phone }) =>
          firstName.toLowerCase().includes(query) ||
          lastName.toLowerCase().includes(query) ||
          phone.includes(query)
      );
    }

    return result;
  }, [students, searchQuery, statusFilter, branchFilter]);

  const columns = useMemo<GridColDef<Student>[]>(
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
          filteredStudents.findIndex((s) => s.id === params.row.id) + 1,
      },
      {
        flex: 1,
        field: "fullName",
        headerName: "ФИО",
        minWidth: 200,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => `${row.lastName} ${row.firstName}`,
      },
      {
        flex: 1,
        field: "phone",
        headerName: "Телефон",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
      {
        flex: 1,
        field: "branchId",
        headerName: "Филиал",
        width: 130,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => branchNames[value] || "-",
      },
      {
        flex: 1,
        field: "status",
        headerName: "Статус",
        width: 130,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => {
          const config = statusConfig[value as StudentStatus];
          return (
            <Chip label={config.label} color={config.color} size="small" />
          );
        },
      },
      {
        flex: 1,
        field: "createdAt",
        headerName: "Дата регистрации",
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
          <Stack direction="row" spacing={0.5} justifyContent="center">
            <IconButton size="small" onClick={() => onView(row)}>
              <Eye size={18} color={theme.palette.info.main} />
            </IconButton>
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
    [filteredStudents, onEdit, onDelete, onView, theme]
  );

  // Get unique branches from students
  const branches = useMemo(() => {
    const branchIds = [...new Set(students.map((s) => s.branchId))];
    return branchIds.map((id) => ({
      id,
      name: branchNames[id] || `Филиал ${id}`,
    }));
  }, [students]);

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
        flexWrap="wrap"
        gap={2}
      >
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            placeholder="Поиск по ФИО или телефону..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 280 }}
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

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={branchFilter}
              onChange={(e) =>
                setBranchFilter(e.target.value as number | "all")
              }
              displayEmpty
            >
              <MenuItem value="all">Все филиалы</MenuItem>
              {branches.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StudentStatus | "all")
              }
              displayEmpty
            >
              <MenuItem value="all">Все статусы</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="frozen">Замороженные</MenuItem>
              <MenuItem value="graduated">Выпускники</MenuItem>
              <MenuItem value="left">Ушедшие</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={onAdd}
        >
          Добавить
        </Button>
      </Stack>

      <DataGrid
        rows={filteredStudents}
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
