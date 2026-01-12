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
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Building,
  People,
  Monitor,
  Wifi,
  VideoPlay,
  Microphone2,
} from "iconsax-react";

interface Classroom {
  id: string;
  name: string;
  capacity: number;
  branch: string;
  floor: number;
  equipment: string[];
  status: "available" | "occupied" | "maintenance";
}

const classrooms: Classroom[] = [
  {
    id: "1",
    name: "Аудитория 101",
    capacity: 20,
    branch: "Главный офис",
    floor: 1,
    equipment: ["projector", "whiteboard", "ac"],
    status: "available",
  },
  {
    id: "2",
    name: "Аудитория 102",
    capacity: 15,
    branch: "Главный офис",
    floor: 1,
    equipment: ["projector", "whiteboard", "ac", "computers"],
    status: "occupied",
  },
  {
    id: "3",
    name: "Аудитория 103",
    capacity: 12,
    branch: "Главный офис",
    floor: 1,
    equipment: ["whiteboard", "ac"],
    status: "available",
  },
  {
    id: "4",
    name: "Аудитория 201",
    capacity: 25,
    branch: "Главный офис",
    floor: 2,
    equipment: ["projector", "whiteboard", "ac", "sound"],
    status: "available",
  },
  {
    id: "5",
    name: "Аудитория 202",
    capacity: 18,
    branch: "Главный офис",
    floor: 2,
    equipment: ["projector", "whiteboard", "ac"],
    status: "maintenance",
  },
  {
    id: "6",
    name: "Кабинет А",
    capacity: 15,
    branch: "Филиал Чиланзар",
    floor: 1,
    equipment: ["projector", "whiteboard", "ac"],
    status: "available",
  },
  {
    id: "7",
    name: "Кабинет Б",
    capacity: 12,
    branch: "Филиал Чиланзар",
    floor: 1,
    equipment: ["whiteboard", "ac"],
    status: "occupied",
  },
  {
    id: "8",
    name: "Класс 1",
    capacity: 20,
    branch: "Филиал Юнусабад",
    floor: 1,
    equipment: ["projector", "whiteboard", "ac", "computers"],
    status: "available",
  },
  {
    id: "9",
    name: "Класс 2",
    capacity: 16,
    branch: "Филиал Юнусабад",
    floor: 1,
    equipment: ["whiteboard", "ac"],
    status: "available",
  },
  {
    id: "10",
    name: "Лаборатория",
    capacity: 10,
    branch: "Главный офис",
    floor: 2,
    equipment: ["projector", "computers", "ac", "sound"],
    status: "available",
  },
];

const statusLabels: Record<string, string> = {
  available: "Свободна",
  occupied: "Занята",
  maintenance: "Ремонт",
};

const statusColors: Record<string, "success" | "error" | "warning"> = {
  available: "success",
  occupied: "error",
  maintenance: "warning",
};

const equipmentLabels: Record<
  string,
  { label: string; icon: React.ReactElement }
> = {
  projector: { label: "Проектор", icon: <VideoPlay size={14} /> },
  whiteboard: { label: "Доска", icon: <Monitor size={14} /> },
  ac: { label: "Кондиционер", icon: <Wifi size={14} /> },
  computers: { label: "Компьютеры", icon: <Monitor size={14} /> },
  sound: { label: "Звук", icon: <Microphone2 size={14} /> },
};

const branches = ["Все", "Главный офис", "Филиал Чиланзар", "Филиал Юнусабад"];
const statuses = ["Все", "available", "occupied", "maintenance"];

export const ClassroomsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredClassrooms = useMemo(() => {
    let result = classrooms;

    if (branchFilter !== "Все") {
      result = result.filter((c) => c.branch === branchFilter);
    }

    if (statusFilter !== "Все") {
      result = result.filter((c) => c.status === statusFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((c) => c.name.toLowerCase().includes(query));
    }

    return result;
  }, [searchQuery, branchFilter, statusFilter]);

  const columns: GridColDef<Classroom>[] = [
    {
      field: "name",
      headerName: "Аудитория",
      flex: 1,
      minWidth: 160,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 2,
              bgcolor: "rgba(18, 100, 235, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Building size={20} color="#1264EB" />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Этаж {row.floor}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "capacity",
      headerName: "Вместимость",
      width: 120,
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <People size={16} color="#6B7280" />
          <Typography variant="body2">{value} мест</Typography>
        </Stack>
      ),
    },
    {
      field: "branch",
      headerName: "Филиал",
      width: 160,
    },
    {
      field: "equipment",
      headerName: "Оборудование",
      width: 200,
      renderCell: ({ value }) => (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {value.slice(0, 3).map((eq: string) => (
            <Chip
              key={eq}
              size="small"
              label={equipmentLabels[eq]?.label || eq}
              variant="outlined"
              sx={{ fontSize: 10, height: 22 }}
            />
          ))}
          {value.length > 3 && (
            <Chip
              size="small"
              label={`+${value.length - 3}`}
              sx={{ fontSize: 10, height: 22 }}
            />
          )}
        </Stack>
      ),
    },
    {
      field: "status",
      headerName: "Статус",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={statusLabels[value]}
          color={statusColors[value]}
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => setSelectedClassroom(row)}>
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
  const availableCount = classrooms.filter(
    (c) => c.status === "available"
  ).length;
  const occupiedCount = classrooms.filter(
    (c) => c.status === "occupied"
  ).length;
  const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);

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
            Аудитории
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление учебными аудиториями
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Добавить аудиторию
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {availableCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Свободных
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="error.main">
            {occupiedCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Занятых
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 140 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {totalCapacity}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Общая вместимость
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="Все">Все статусы</MenuItem>
            {statuses
              .filter((s) => s !== "Все")
              .map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabels[status]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <DataGrid
        rows={filteredClassrooms}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ bgcolor: "white", borderRadius: 3 }}
      />

      {/* Classroom Details Dialog */}
      <Dialog
        open={!!selectedClassroom}
        onClose={() => setSelectedClassroom(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedClassroom && (
          <>
            <DialogTitle>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "rgba(18, 100, 235, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Building size={24} color="#1264EB" />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedClassroom.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={statusLabels[selectedClassroom.status]}
                      color={statusColors[selectedClassroom.status]}
                    />
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedClassroom(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Филиал
                  </Typography>
                  <Typography variant="body2">
                    {selectedClassroom.branch}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Этаж
                  </Typography>
                  <Typography variant="body2">
                    {selectedClassroom.floor} этаж
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Вместимость
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <People size={18} color="#6B7280" />
                    <Typography variant="body2">
                      {selectedClassroom.capacity} мест
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Оборудование
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selectedClassroom.equipment.map((eq) => (
                      <Chip
                        key={eq}
                        icon={equipmentLabels[eq]?.icon}
                        label={equipmentLabels[eq]?.label || eq}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                Редактировать
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedClassroom(null)}
              >
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Classroom Dialog */}
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
              Добавить аудиторию
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Название" size="small" fullWidth />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Вместимость"
                size="small"
                fullWidth
                type="number"
              />
              <TextField label="Этаж" size="small" fullWidth type="number" />
            </Stack>
            <FormControl fullWidth size="small">
              <InputLabel>Филиал</InputLabel>
              <Select label="Филиал" defaultValue="">
                <MenuItem value="main">Главный офис</MenuItem>
                <MenuItem value="chilanzar">Филиал Чиланзар</MenuItem>
                <MenuItem value="yunusabad">Филиал Юнусабад</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Оборудование</InputLabel>
              <Select label="Оборудование" multiple defaultValue={[]}>
                <MenuItem value="projector">Проектор</MenuItem>
                <MenuItem value="whiteboard">Доска</MenuItem>
                <MenuItem value="ac">Кондиционер</MenuItem>
                <MenuItem value="computers">Компьютеры</MenuItem>
                <MenuItem value="sound">Звуковое оборудование</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Статус</InputLabel>
              <Select label="Статус" defaultValue="available">
                <MenuItem value="available">Свободна</MenuItem>
                <MenuItem value="occupied">Занята</MenuItem>
                <MenuItem value="maintenance">На ремонте</MenuItem>
              </Select>
            </FormControl>
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
