import React, { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable, StatItem } from "@/shared/ui";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  MoneySend,
  CloseCircle,
  Wallet,
} from "iconsax-react";

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  branch: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  createdBy: string;
}

const expenses: Expense[] = [
  { id: "1", category: "Зарплаты", description: "Зарплата - Иванов А.", amount: 1200, branch: "Главный", date: "2026-01-10", status: "approved", createdBy: "Админ" },
  { id: "2", category: "Аренда", description: "Аренда - Январь", amount: 2000, branch: "Главный", date: "2026-01-05", status: "approved", createdBy: "Админ" },
  { id: "3", category: "Маркетинг", description: "Реклама Instagram", amount: 450, branch: "Все", date: "2026-01-08", status: "approved", createdBy: "Маркетолог" },
  { id: "4", category: "Материалы", description: "Учебники English", amount: 320, branch: "Главный", date: "2026-01-07", status: "pending", createdBy: "Админ" },
  { id: "5", category: "Зарплаты", description: "Зарплата - Петрова М.", amount: 1000, branch: "Чиланзар", date: "2026-01-10", status: "approved", createdBy: "Админ" },
  { id: "6", category: "Коммунальные", description: "Электричество", amount: 180, branch: "Главный", date: "2026-01-03", status: "approved", createdBy: "Админ" },
  { id: "7", category: "Маркетинг", description: "Листовки", amount: 150, branch: "Юнусабад", date: "2026-01-06", status: "rejected", createdBy: "Маркетолог" },
  { id: "8", category: "Прочее", description: "Канцтовары", amount: 85, branch: "Главный", date: "2026-01-04", status: "approved", createdBy: "Админ" },
];

const categories = ["Все", "Зарплаты", "Аренда", "Маркетинг", "Материалы", "Коммунальные", "Прочее"];
const branches = ["Все филиалы", "Главный", "Чиланзар", "Юнусабад", "Сергели"];

export const FinancierExpensesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Все");
  const [branchFilter, setBranchFilter] = useState("Все филиалы");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    branch: "",
    date: dayjs(),
  });

  const filteredExpenses = useMemo(() => {
    let result = expenses;

    if (categoryFilter !== "Все") {
      result = result.filter((e) => e.category === categoryFilter);
    }

    if (branchFilter !== "Все филиалы") {
      result = result.filter((e) => e.branch === branchFilter || e.branch === "Все");
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((e) => e.description.toLowerCase().includes(query));
    }

    return result;
  }, [searchQuery, categoryFilter, branchFilter]);

  const columns: GridColDef<Expense>[] = [
    {
      field: "date",
      headerName: "Дата",
      width: 110,
      renderCell: ({ value }) => dayjs(value).format("DD.MM.YYYY"),
    },
    {
      field: "category",
      headerName: "Категория",
      width: 130,
      renderCell: ({ value }) => (
        <Chip label={value} size="small" variant="outlined" />
      ),
    },
    {
      field: "description",
      headerName: "Описание",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "branch",
      headerName: "Филиал",
      width: 120,
    },
    {
      field: "amount",
      headerName: "Сумма",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={600} color="error.main">
          -${value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Статус",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value === "approved" ? "Одобрено" : value === "pending" ? "Ожидает" : "Отклонено"}
          color={value === "approved" ? "success" : value === "pending" ? "warning" : "error"}
        />
      ),
    },
    {
      field: "createdBy",
      headerName: "Создал",
      width: 120,
    },
  ];

  // Stats
  const totalExpenses = expenses.filter((e) => e.status === "approved").reduce((acc, e) => acc + e.amount, 0);
  const pendingExpenses = expenses.filter((e) => e.status === "pending").reduce((acc, e) => acc + e.amount, 0);

  const stats: StatItem[] = [
    {
      id: "total",
      title: "Всего расходов",
      value: `$${totalExpenses.toLocaleString()}`,
      icon: <MoneySend size={20} color="#F44336" />,
      bgColor: "rgba(244, 67, 54, 0.1)",
    },
    {
      id: "pending",
      title: "Ожидает одобрения",
      value: `$${pendingExpenses.toLocaleString()}`,
      icon: <Wallet size={20} color="#FF9800" />,
      bgColor: "rgba(255, 152, 0, 0.1)",
    },
  ];

  const renderFilters = () => (
    <>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <Select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
          {branches.map((branch) => (
            <MenuItem key={branch} value={branch}>{branch}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Расходы
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Управление расходами учебного центра
            </Typography>
          </Box>
        </Stack>

        <DataTable
          rows={filteredExpenses}
          columns={columns}
          stats={stats}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Поиск..."
          addButtonText="Добавить расход"
          onAddClick={() => setAddDialogOpen(true)}
          renderFilters={renderFilters}
          initialState={{
            sorting: { sortModel: [{ field: "date", sort: "desc" }] },
          }}
        />

        {/* Add Expense Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Добавить расход
              </Typography>
              <IconButton onClick={() => setAddDialogOpen(false)}>
                <CloseCircle size={24} />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <Typography variant="body2" mb={0.5}>Категория</Typography>
                <Select
                  size="small"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  {categories.filter((c) => c !== "Все").map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Описание"
                size="small"
                fullWidth
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />

              <TextField
                label="Сумма ($)"
                size="small"
                type="number"
                fullWidth
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />

              <FormControl fullWidth>
                <Typography variant="body2" mb={0.5}>Филиал</Typography>
                <Select
                  size="small"
                  value={newExpense.branch}
                  onChange={(e) => setNewExpense({ ...newExpense, branch: e.target.value })}
                >
                  {branches.filter((b) => b !== "Все филиалы").map((branch) => (
                    <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="Дата"
                value={newExpense.date}
                onChange={(date) => setNewExpense({ ...newExpense, date: date || dayjs() })}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
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
    </LocalizationProvider>
  );
};
