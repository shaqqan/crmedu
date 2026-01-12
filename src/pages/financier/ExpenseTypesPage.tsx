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
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  CloseCircle,
  Wallet,
  Building,
  Chart,
  Book1,
  Flash,
  More,
  Category,
  MoneyRecive,
} from "iconsax-react";

interface ExpenseType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
}

const initialExpenseTypes: ExpenseType[] = [
  {
    id: "1",
    name: "Зарплаты",
    description: "Выплаты сотрудникам и бонусы",
    icon: "wallet",
    color: "#4CAF50",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Аренда",
    description: "Аренда помещений и офисов",
    icon: "building",
    color: "#2196F3",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Маркетинг",
    description: "Реклама и продвижение",
    icon: "chart",
    color: "#FF9800",
    isActive: true,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Материалы",
    description: "Учебные материалы и канцелярия",
    icon: "book",
    color: "#9C27B0",
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    name: "Коммунальные",
    description: "Электричество, вода, интернет",
    icon: "flash",
    color: "#F44336",
    isActive: true,
    createdAt: "2024-02-10",
  },
  {
    id: "6",
    name: "Прочее",
    description: "Другие расходы",
    icon: "more",
    color: "#607D8B",
    isActive: false,
    createdAt: "2024-02-15",
  },
];

const iconOptions = [
  { value: "wallet", label: "Кошелек", icon: <Wallet size={20} /> },
  { value: "building", label: "Здание", icon: <Building size={20} /> },
  { value: "chart", label: "График", icon: <Chart size={20} /> },
  { value: "book", label: "Книга", icon: <Book1 size={20} /> },
  { value: "flash", label: "Молния", icon: <Flash size={20} /> },
  { value: "more", label: "Прочее", icon: <More size={20} /> },
  { value: "category", label: "Категория", icon: <Category size={20} /> },
  { value: "money", label: "Деньги", icon: <MoneyRecive size={20} /> },
];

const colorOptions = [
  { value: "#4CAF50", label: "Зеленый" },
  { value: "#2196F3", label: "Синий" },
  { value: "#FF9800", label: "Оранжевый" },
  { value: "#9C27B0", label: "Фиолетовый" },
  { value: "#F44336", label: "Красный" },
  { value: "#607D8B", label: "Серый" },
  { value: "#E91E63", label: "Розовый" },
  { value: "#00BCD4", label: "Голубой" },
];

const getIconComponent = (iconName: string, color: string) => {
  const iconProps = { size: 20, color };
  switch (iconName) {
    case "wallet":
      return <Wallet {...iconProps} />;
    case "building":
      return <Building {...iconProps} />;
    case "chart":
      return <Chart {...iconProps} />;
    case "book":
      return <Book1 {...iconProps} />;
    case "flash":
      return <Flash {...iconProps} />;
    case "more":
      return <More {...iconProps} />;
    case "category":
      return <Category {...iconProps} />;
    case "money":
      return <MoneyRecive {...iconProps} />;
    default:
      return <Category {...iconProps} />;
  }
};

const statusFilters = ["Все", "Активные", "Неактивные"];

interface FormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

const initialFormData: FormData = {
  name: "",
  description: "",
  icon: "wallet",
  color: "#4CAF50",
  isActive: true,
};

export const ExpenseTypesPage: React.FC = () => {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>(initialExpenseTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<ExpenseType | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<ExpenseType | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const filteredTypes = useMemo(() => {
    let result = expenseTypes;

    if (statusFilter === "Активные") {
      result = result.filter((t) => t.isActive);
    } else if (statusFilter === "Неактивные") {
      result = result.filter((t) => !t.isActive);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [expenseTypes, searchQuery, statusFilter]);

  const handleOpenAddDialog = () => {
    setEditingType(null);
    setFormData(initialFormData);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (type: ExpenseType) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      description: type.description,
      icon: type.icon,
      color: type.color,
      isActive: type.isActive,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingType(null);
    setFormData(initialFormData);
  };

  const handleSave = () => {
    if (editingType) {
      // Update
      setExpenseTypes((prev) =>
        prev.map((t) =>
          t.id === editingType.id
            ? { ...t, ...formData }
            : t
        )
      );
    } else {
      // Create
      const newType: ExpenseType = {
        id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setExpenseTypes((prev) => [...prev, newType]);
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (type: ExpenseType) => {
    setTypeToDelete(type);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (typeToDelete) {
      setExpenseTypes((prev) => prev.filter((t) => t.id !== typeToDelete.id));
    }
    setDeleteDialogOpen(false);
    setTypeToDelete(null);
  };

  const columns: GridColDef<ExpenseType>[] = [
    {
      field: "name",
      headerName: "Название",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: `${row.color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getIconComponent(row.icon, row.color)}
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "description",
      headerName: "Описание",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "isActive",
      headerName: "Статус",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value ? "Активен" : "Неактивен"}
          color={value ? "success" : "default"}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Создан",
      width: 120,
      renderCell: ({ value }) => {
        const date = new Date(value);
        return (
          <Typography variant="body2" color="text.secondary">
            {date.toLocaleDateString("ru-RU")}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => handleOpenEditDialog(row)}>
            <Edit2 size={18} color="#FF9800" />
          </IconButton>
          <IconButton size="small" onClick={() => handleOpenDeleteDialog(row)}>
            <Trash size={18} color="#F44336" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Stats
  const totalCount = expenseTypes.length;
  const activeCount = expenseTypes.filter((t) => t.isActive).length;
  const inactiveCount = expenseTypes.filter((t) => !t.isActive).length;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Типы расходов
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление категориями расходов
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={handleOpenAddDialog}
        >
          Добавить тип
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {totalCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Всего типов
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {activeCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Активных
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="text.secondary">
            {inactiveCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Неактивных
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
          placeholder="Поиск по названию..."
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

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusFilters.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <DataGrid
        rows={filteredTypes}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ bgcolor: "white", borderRadius: 3 }}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              {editingType ? "Редактировать тип" : "Добавить тип расхода"}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="Название"
              size="small"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <TextField
              label="Описание"
              size="small"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Иконка</InputLabel>
              <Select
                label="Иконка"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                {iconOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {opt.icon}
                      <span>{opt.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Цвет</InputLabel>
              <Select
                label="Цвет"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              >
                {colorOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: 1,
                          bgcolor: opt.value,
                        }}
                      />
                      <span>{opt.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Активен"
            />

            {/* Preview */}
            <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary" mb={1} display="block">
                Предпросмотр
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: `${formData.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getIconComponent(formData.icon, formData.color)}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.name || "Название типа"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formData.description || "Описание типа расхода"}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name.trim()}
          >
            {editingType ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Удалить тип расхода?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Вы уверены, что хотите удалить тип "{typeToDelete?.name}"? Это действие нельзя отменить.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
