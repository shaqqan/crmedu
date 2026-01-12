import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  Button,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  Call,
  Sms,
  Eye,
  CloseCircle,
  Building,
} from "iconsax-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "mentor" | "financier" | "receptionist";
  branch: string;
  status: "active" | "inactive";
  hiredAt: string;
  salary: number;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Иванов Алексей",
    email: "ivanov@edu.com",
    phone: "+998901234567",
    role: "admin",
    branch: "Главный офис",
    status: "active",
    hiredAt: "2024-01-15",
    salary: 5000000,
  },
  {
    id: "2",
    name: "Петрова Мария",
    email: "petrova@edu.com",
    phone: "+998901234568",
    role: "mentor",
    branch: "Филиал Чиланзар",
    status: "active",
    hiredAt: "2024-03-01",
    salary: 4000000,
  },
  {
    id: "3",
    name: "Сидоров Константин",
    email: "sidorov@edu.com",
    phone: "+998901234569",
    role: "mentor",
    branch: "Главный офис",
    status: "active",
    hiredAt: "2024-02-10",
    salary: 4500000,
  },
  {
    id: "4",
    name: "Козлова Анна",
    email: "kozlova@edu.com",
    phone: "+998901234570",
    role: "mentor",
    branch: "Филиал Юнусабад",
    status: "active",
    hiredAt: "2024-04-15",
    salary: 4000000,
  },
  {
    id: "5",
    name: "Морозов Дмитрий",
    email: "morozov@edu.com",
    phone: "+998901234571",
    role: "financier",
    branch: "Главный офис",
    status: "active",
    hiredAt: "2024-01-20",
    salary: 4500000,
  },
  {
    id: "6",
    name: "Волкова Елена",
    email: "volkova@edu.com",
    phone: "+998901234572",
    role: "receptionist",
    branch: "Филиал Чиланзар",
    status: "active",
    hiredAt: "2024-05-01",
    salary: 3000000,
  },
  {
    id: "7",
    name: "Белов Сергей",
    email: "belov@edu.com",
    phone: "+998901234573",
    role: "mentor",
    branch: "Филиал Юнусабад",
    status: "inactive",
    hiredAt: "2023-09-01",
    salary: 4000000,
  },
  {
    id: "8",
    name: "Кузнецова Ольга",
    email: "kuznecova@edu.com",
    phone: "+998901234574",
    role: "receptionist",
    branch: "Главный офис",
    status: "active",
    hiredAt: "2024-06-01",
    salary: 3000000,
  },
];

const roleLabels: Record<string, string> = {
  admin: "Администратор",
  mentor: "Ментор",
  financier: "Финансист",
  receptionist: "Ресепшионист",
};

const roleColors: Record<
  string,
  "primary" | "success" | "warning" | "secondary"
> = {
  admin: "primary",
  mentor: "success",
  financier: "warning",
  receptionist: "secondary",
};

const branches = ["Все", "Главный офис", "Филиал Чиланзар", "Филиал Юнусабад"];
const roles = ["Все", "admin", "mentor", "financier", "receptionist"];

export const EmployeesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("Все");
  const [roleFilter, setRoleFilter] = useState("Все");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    let result = employees;

    if (branchFilter !== "Все") {
      result = result.filter((e) => e.branch === branchFilter);
    }

    if (roleFilter !== "Все") {
      result = result.filter((e) => e.role === roleFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.email.toLowerCase().includes(query) ||
          e.phone.includes(query)
      );
    }

    return result;
  }, [searchQuery, branchFilter, roleFilter]);

  const columns: GridColDef<Employee>[] = [
    {
      field: "rowNumber",
      headerName: "№",
      type: "number",
      width: 60,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => filteredEmployees.findIndex((e) => e.id === params.row.id) + 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Сотрудник",
      flex: 1,
      minWidth: 220,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Телефон",
      flex: 1,
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Роль",
      flex: 1,
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={roleLabels[value]}
          color={roleColors[value]}
          variant="outlined"
        />
      ),
    },
    {
      field: "branch",
      headerName: "Филиал",
      flex: 1,
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Статус",
      flex: 1,
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value === "active" ? "Активен" : "Неактивен"}
          color={value === "active" ? "success" : "default"}
        />
      ),
    },
    {
      field: "salary",
      headerName: "Зарплата",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={500}>
          {value.toLocaleString()} сум
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 130,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => setSelectedEmployee(row)}>
            <Eye size={18} color="#1264EB" />
          </IconButton>
          <IconButton size="small">
            <Edit2 size={18} color="#FF9800" />
          </IconButton>
          <IconButton size="small">
            <Trash size={18} color="#F44336" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "active").length;
  const mentorCount = employees.filter((e) => e.role === "mentor").length;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Сотрудники
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление персоналом учебного центра
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} color="#FFFFFF" />}
          onClick={() => setAddDialogOpen(true)}
        >
          Добавить
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {totalEmployees}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Всего сотрудников
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {activeEmployees}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Активных
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="warning.main">
            {mentorCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Менторов
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={2}
        bgcolor="white"
        borderRadius={3}
        p={2}
      >
        <TextField
          placeholder="Поиск по имени, email, телефону..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
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

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch === "Все" ? "Все филиалы" : branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="Все">Все роли</MenuItem>
            {roles
              .filter((r) => r !== "Все")
              .map((role) => (
                <MenuItem key={role} value={role}>
                  {roleLabels[role]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ bgcolor: "white", borderRadius: 3 }}
      />

      {/* Employee Details Dialog */}
      <Dialog
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedEmployee && (
          <>
            <DialogTitle>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#1264EB" }}>
                    {selectedEmployee.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedEmployee.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={roleLabels[selectedEmployee.role]}
                      color={roleColors[selectedEmployee.role]}
                    />
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedEmployee(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Контакты
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    mt={0.5}
                  >
                    <Call size={16} color="#6B7280" />
                    <Typography variant="body2">
                      {selectedEmployee.phone}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    mt={0.5}
                  >
                    <Sms size={16} color="#6B7280" />
                    <Typography variant="body2">
                      {selectedEmployee.email}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Филиал
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    mt={0.5}
                  >
                    <Building size={16} color="#6B7280" />
                    <Typography variant="body2">
                      {selectedEmployee.branch}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Дата найма
                  </Typography>
                  <Typography variant="body2">
                    {new Date(selectedEmployee.hiredAt).toLocaleDateString(
                      "ru-RU"
                    )}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Зарплата
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {selectedEmployee.salary.toLocaleString()} сум
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                Редактировать
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedEmployee(null)}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600}>
              Добавить сотрудника
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="ФИО" size="small" fullWidth />
            <TextField label="Email" size="small" fullWidth type="email" />
            <TextField label="Телефон" size="small" fullWidth />
            <FormControl fullWidth size="small">
              <InputLabel>Роль</InputLabel>
              <Select label="Роль" defaultValue="">
                <MenuItem value="admin">Администратор</MenuItem>
                <MenuItem value="mentor">Ментор</MenuItem>
                <MenuItem value="financier">Финансист</MenuItem>
                <MenuItem value="receptionist">Ресепшионист</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Филиал</InputLabel>
              <Select label="Филиал" defaultValue="">
                <MenuItem value="main">Главный офис</MenuItem>
                <MenuItem value="chilanzar">Филиал Чиланзар</MenuItem>
                <MenuItem value="yunusabad">Филиал Юнусабад</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Зарплата" size="small" fullWidth type="number" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
