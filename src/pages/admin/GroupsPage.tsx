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
  LinearProgress,
  AvatarGroup,
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Profile2User,
  Teacher,
  Calendar,
  Clock,
  Book1,
} from "iconsax-react";

interface Group {
  id: string;
  name: string;
  course: string;
  mentor: string;
  mentorAvatar?: string;
  studentsCount: number;
  maxStudents: number;
  schedule: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed" | "paused";
  branch: string;
  level: string;
}

const groups: Group[] = [
  { id: "1", name: "English B1 - G1", course: "English", mentor: "Сидоров К.", studentsCount: 12, maxStudents: 15, schedule: "Пн, Ср, Пт 10:00-11:30", startDate: "2025-09-01", endDate: "2026-02-28", status: "active", branch: "Главный офис", level: "B1" },
  { id: "2", name: "English A2 - G2", course: "English", mentor: "Иванов А.", studentsCount: 14, maxStudents: 15, schedule: "Вт, Чт 14:00-15:30", startDate: "2025-10-01", endDate: "2026-03-31", status: "active", branch: "Главный офис", level: "A2" },
  { id: "3", name: "Korean A1 - G3", course: "Korean", mentor: "Петрова М.", studentsCount: 10, maxStudents: 12, schedule: "Пн, Ср, Пт 16:00-17:30", startDate: "2025-10-15", endDate: "2026-04-15", status: "active", branch: "Филиал Чиланзар", level: "A1" },
  { id: "4", name: "German A1 - G4", course: "German", mentor: "Козлова А.", studentsCount: 8, maxStudents: 12, schedule: "Вт, Чт, Сб 11:00-12:30", startDate: "2025-11-01", endDate: "2026-05-01", status: "active", branch: "Филиал Юнусабад", level: "A1" },
  { id: "5", name: "IELTS Prep - G5", course: "IELTS", mentor: "Сидоров К.", studentsCount: 6, maxStudents: 8, schedule: "Пн, Ср, Пт 18:00-20:00", startDate: "2025-11-15", endDate: "2026-02-15", status: "active", branch: "Главный офис", level: "B2+" },
  { id: "6", name: "French A1 - G6", course: "French", mentor: "Морозов Д.", studentsCount: 7, maxStudents: 12, schedule: "Вт, Чт 16:00-17:30", startDate: "2026-01-08", endDate: "2026-07-08", status: "upcoming", branch: "Филиал Чиланзар", level: "A1" },
  { id: "7", name: "English B2 - G7", course: "English", mentor: "Козлова А.", studentsCount: 11, maxStudents: 15, schedule: "Пн, Ср, Пт 14:00-15:30", startDate: "2025-08-01", endDate: "2026-01-31", status: "completed", branch: "Главный офис", level: "B2" },
  { id: "8", name: "Korean A2 - G8", course: "Korean", mentor: "Петрова М.", studentsCount: 9, maxStudents: 12, schedule: "Вт, Чт, Сб 10:00-11:30", startDate: "2025-09-15", endDate: "2026-03-15", status: "paused", branch: "Филиал Чиланзар", level: "A2" },
];

const statusLabels: Record<string, string> = {
  active: "Активна",
  upcoming: "Скоро начнется",
  completed: "Завершена",
  paused: "Приостановлена",
};

const statusColors: Record<string, "success" | "info" | "default" | "warning"> = {
  active: "success",
  upcoming: "info",
  completed: "default",
  paused: "warning",
};

const courses = ["Все", "English", "Korean", "German", "French", "IELTS"];
const branches = ["Все", "Главный офис", "Филиал Чиланзар", "Филиал Юнусабад"];
const statuses = ["Все", "active", "upcoming", "completed", "paused"];

export const GroupsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("Все");
  const [branchFilter, setBranchFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    let result = groups;

    if (courseFilter !== "Все") {
      result = result.filter((g) => g.course === courseFilter);
    }

    if (branchFilter !== "Все") {
      result = result.filter((g) => g.branch === branchFilter);
    }

    if (statusFilter !== "Все") {
      result = result.filter((g) => g.status === statusFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(query) ||
          g.mentor.toLowerCase().includes(query) ||
          g.course.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, courseFilter, branchFilter, statusFilter]);

  const columns: GridColDef<Group>[] = [
    {
      field: "name",
      headerName: "Группа",
      flex: 1,
      minWidth: 180,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: "#1264EB" }}>
            <Book1 size={18} color="white" />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.level}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "course",
      headerName: "Курс",
      width: 100,
      renderCell: ({ value }) => (
        <Chip size="small" label={value} variant="outlined" />
      ),
    },
    {
      field: "mentor",
      headerName: "Ментор",
      width: 140,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: "#4CAF50" }}>
            {row.mentor.charAt(0)}
          </Avatar>
          <Typography variant="body2">{row.mentor}</Typography>
        </Stack>
      ),
    },
    {
      field: "studentsCount",
      headerName: "Студенты",
      width: 130,
      renderCell: ({ row }) => (
        <Stack spacing={0.5} sx={{ width: "100%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption">
              {row.studentsCount}/{row.maxStudents}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {Math.round((row.studentsCount / row.maxStudents) * 100)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={(row.studentsCount / row.maxStudents) * 100}
            sx={{ height: 6, borderRadius: 3 }}
            color={row.studentsCount >= row.maxStudents ? "error" : row.studentsCount >= row.maxStudents * 0.8 ? "warning" : "primary"}
          />
        </Stack>
      ),
    },
    {
      field: "schedule",
      headerName: "Расписание",
      width: 180,
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Clock size={14} color="#6B7280" />
          <Typography variant="body2" sx={{ fontSize: 12 }}>{value}</Typography>
        </Stack>
      ),
    },
    {
      field: "branch",
      headerName: "Филиал",
      width: 140,
    },
    {
      field: "status",
      headerName: "Статус",
      width: 130,
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
          <IconButton size="small" onClick={() => setSelectedGroup(row)}>
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
  const activeGroups = groups.filter((g) => g.status === "active").length;
  const totalStudents = groups.reduce((sum, g) => sum + g.studentsCount, 0);
  const upcomingGroups = groups.filter((g) => g.status === "upcoming").length;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Группы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление учебными группами
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Создать группу
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {activeGroups}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Активных групп
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {totalStudents}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Всего студентов
          </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="info.main">
            {upcomingGroups}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Скоро начнутся
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2} bgcolor="white" borderRadius={3} p={2}>
        <TextField
          placeholder="Поиск по названию, ментору..."
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

        <FormControl size="small" sx={{ minWidth: 130 }}>
          <Select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course === "Все" ? "Все курсы" : course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
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
      </Stack>

      {/* Table */}
      <DataGrid
        rows={filteredGroups}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ bgcolor: "white", borderRadius: 3 }}
      />

      {/* Group Details Dialog */}
      <Dialog open={!!selectedGroup} onClose={() => setSelectedGroup(null)} maxWidth="sm" fullWidth>
        {selectedGroup && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#1264EB" }}>
                    <Book1 size={24} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedGroup.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={statusLabels[selectedGroup.status]}
                      color={statusColors[selectedGroup.status]}
                    />
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedGroup(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Курс и уровень
                  </Typography>
                  <Typography variant="body2">
                    {selectedGroup.course} • {selectedGroup.level}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ментор
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#4CAF50" }}>
                      {selectedGroup.mentor.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">{selectedGroup.mentor}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Студенты
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mt={0.5}>
                    <Profile2User size={18} color="#6B7280" />
                    <Typography variant="body2">
                      {selectedGroup.studentsCount} из {selectedGroup.maxStudents} мест
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(selectedGroup.studentsCount / selectedGroup.maxStudents) * 100}
                      sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Расписание
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Clock size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedGroup.schedule}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Период обучения
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Calendar size={16} color="#6B7280" />
                    <Typography variant="body2">
                      {new Date(selectedGroup.startDate).toLocaleDateString("ru-RU")} — {new Date(selectedGroup.endDate).toLocaleDateString("ru-RU")}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Филиал
                  </Typography>
                  <Typography variant="body2">{selectedGroup.branch}</Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Profile2User size={18} />}>
                Студенты
              </Button>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                Редактировать
              </Button>
              <Button variant="contained" onClick={() => setSelectedGroup(null)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Group Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Создать группу
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Название группы" size="small" fullWidth />
            <FormControl fullWidth size="small">
              <InputLabel>Курс</InputLabel>
              <Select label="Курс" defaultValue="">
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="korean">Korean</MenuItem>
                <MenuItem value="german">German</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="ielts">IELTS Prep</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Уровень</InputLabel>
              <Select label="Уровень" defaultValue="">
                <MenuItem value="a1">A1 (Beginner)</MenuItem>
                <MenuItem value="a2">A2 (Elementary)</MenuItem>
                <MenuItem value="b1">B1 (Intermediate)</MenuItem>
                <MenuItem value="b2">B2 (Upper-Intermediate)</MenuItem>
                <MenuItem value="c1">C1 (Advanced)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Ментор</InputLabel>
              <Select label="Ментор" defaultValue="">
                <MenuItem value="1">Сидоров К.</MenuItem>
                <MenuItem value="2">Петрова М.</MenuItem>
                <MenuItem value="3">Козлова А.</MenuItem>
                <MenuItem value="4">Иванов А.</MenuItem>
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
            <TextField label="Максимум студентов" size="small" fullWidth type="number" defaultValue={15} />
            <TextField label="Расписание" size="small" fullWidth placeholder="Пн, Ср, Пт 10:00-11:30" />
            <Stack direction="row" spacing={2}>
              <TextField label="Дата начала" size="small" fullWidth type="date" slotProps={{ inputLabel: { shrink: true } }} />
              <TextField label="Дата окончания" size="small" fullWidth type="date" slotProps={{ inputLabel: { shrink: true } }} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
