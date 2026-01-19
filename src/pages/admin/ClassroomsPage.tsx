import { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable, StatItem } from "@/shared/ui";
import {
  Box,
  Stack,
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
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import {
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Building,
  People,
  Monitor,
  VideoPlay,
  Microphone2,
  TickCircle,
  CloseSquare,
  Wifi,
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
  const availableCount = classrooms.filter((c) => c.status === "available").length;
  const occupiedCount = classrooms.filter((c) => c.status === "occupied").length;
  const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);

  const stats: StatItem[] = [
    {
      id: "available",
      title: "Свободных",
      value: availableCount,
      icon: <TickCircle size={20} color="#4CAF50" />,
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      id: "occupied",
      title: "Занятых",
      value: occupiedCount,
      icon: <CloseSquare size={20} color="#F44336" />,
      bgColor: "rgba(244, 67, 54, 0.1)",
    },
    {
      id: "capacity",
      title: "Общая вместимость",
      value: totalCapacity,
      icon: <People size={20} color="#1264EB" />,
      bgColor: "rgba(18, 100, 235, 0.1)",
    },
  ];

  return (
    <Box>
      <DataTable
        rows={filteredClassrooms}
        columns={columns}
        stats={stats}
        statsColumns={{ xs: 6, md: 4 }}
        searchEnabled
        searchValue={searchQuery}
        searchPlaceholder="Поиск по названию..."
        onSearchChange={setSearchQuery}
        addButtonEnabled
        addButtonText="Добавить аудиторию"
        onAddClick={() => setAddDialogOpen(true)}
        renderFilters={() => (
          <>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch === "Все" ? "Все филиалы" : branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="Все">Все статусы</MenuItem>
                {statuses.filter((s) => s !== "Все").map((status) => (
                  <MenuItem key={status} value={status}>
                    {statusLabels[status]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
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
