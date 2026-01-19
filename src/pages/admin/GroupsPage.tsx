import { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable, StatItem } from "@/shared/ui";
import {
  Box,
  Stack,
  Typography,
  Chip,
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
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import {
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Profile2User,
  Clock,
  Book1,
  Calendar,
  TickCircle,
  Timer1,
} from "iconsax-react";

interface Group {
  id: string;
  name: string;
  course: string;
  mentor: string;
  mentorAvatar?: string;
  studentsCount: number;
  maxStudents: number;
  days: string[];
  timeStart: string;
  timeEnd: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed" | "paused";
  branch: string;
  level: string;
}

const weekDays = [
  { value: "mon", label: "Пн" },
  { value: "tue", label: "Вт" },
  { value: "wed", label: "Ср" },
  { value: "thu", label: "Чт" },
  { value: "fri", label: "Пт" },
  { value: "sat", label: "Сб" },
  { value: "sun", label: "Вс" },
];

const formatDays = (days: string[]) => {
  return days.map((d) => weekDays.find((w) => w.value === d)?.label || d).join(", ");
};

const groups: Group[] = [
  { id: "1", name: "English B1 - G1", course: "English", mentor: "Сидоров К.", studentsCount: 12, maxStudents: 15, days: ["mon", "wed", "fri"], timeStart: "10:00", timeEnd: "11:30", startDate: "2025-09-01", endDate: "2026-02-28", status: "active", branch: "Главный офис", level: "B1" },
  { id: "2", name: "English A2 - G2", course: "English", mentor: "Иванов А.", studentsCount: 14, maxStudents: 15, days: ["tue", "thu"], timeStart: "14:00", timeEnd: "15:30", startDate: "2025-10-01", endDate: "2026-03-31", status: "active", branch: "Главный офис", level: "A2" },
  { id: "3", name: "Korean A1 - G3", course: "Korean", mentor: "Петрова М.", studentsCount: 10, maxStudents: 12, days: ["mon", "wed", "fri"], timeStart: "16:00", timeEnd: "17:30", startDate: "2025-10-15", endDate: "2026-04-15", status: "active", branch: "Филиал Чиланзар", level: "A1" },
  { id: "4", name: "German A1 - G4", course: "German", mentor: "Козлова А.", studentsCount: 8, maxStudents: 12, days: ["tue", "thu", "sat"], timeStart: "11:00", timeEnd: "12:30", startDate: "2025-11-01", endDate: "2026-05-01", status: "active", branch: "Филиал Юнусабад", level: "A1" },
  { id: "5", name: "IELTS Prep - G5", course: "IELTS", mentor: "Сидоров К.", studentsCount: 6, maxStudents: 8, days: ["mon", "wed", "fri"], timeStart: "18:00", timeEnd: "20:00", startDate: "2025-11-15", endDate: "2026-02-15", status: "active", branch: "Главный офис", level: "B2+" },
  { id: "6", name: "French A1 - G6", course: "French", mentor: "Морозов Д.", studentsCount: 7, maxStudents: 12, days: ["tue", "thu"], timeStart: "16:00", timeEnd: "17:30", startDate: "2026-01-08", endDate: "2026-07-08", status: "upcoming", branch: "Филиал Чиланзар", level: "A1" },
  { id: "7", name: "English B2 - G7", course: "English", mentor: "Козлова А.", studentsCount: 11, maxStudents: 15, days: ["mon", "wed", "fri"], timeStart: "14:00", timeEnd: "15:30", startDate: "2025-08-01", endDate: "2026-01-31", status: "completed", branch: "Главный офис", level: "B2" },
  { id: "8", name: "Korean A2 - G8", course: "Korean", mentor: "Петрова М.", studentsCount: 9, maxStudents: 12, days: ["tue", "thu", "sat"], timeStart: "10:00", timeEnd: "11:30", startDate: "2025-09-15", endDate: "2026-03-15", status: "paused", branch: "Филиал Чиланзар", level: "A2" },
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

interface GroupFormData {
  name: string;
  course: string;
  level: string;
  mentor: string;
  branch: string;
  maxStudents: number;
  days: string[];
  timeStart: Dayjs | null;
  timeEnd: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const initialFormData: GroupFormData = {
  name: "",
  course: "",
  level: "",
  mentor: "",
  branch: "",
  maxStudents: 15,
  days: [],
  timeStart: dayjs().hour(10).minute(0),
  timeEnd: dayjs().hour(11).minute(30),
  startDate: null,
  endDate: null,
};

export const GroupsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("Все");
  const [branchFilter, setBranchFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<GroupFormData>(initialFormData);

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

  // Stats
  const activeGroups = groups.filter((g) => g.status === "active").length;
  const totalStudents = groups.reduce((sum, g) => sum + g.studentsCount, 0);
  const upcomingGroups = groups.filter((g) => g.status === "upcoming").length;

  const stats: StatItem[] = [
    {
      id: "active",
      title: "Активных групп",
      value: activeGroups,
      icon: <TickCircle size={20} color="#4CAF50" />,
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      id: "students",
      title: "Всего студентов",
      value: totalStudents,
      icon: <Profile2User size={20} color="#1264EB" />,
      bgColor: "rgba(18, 100, 235, 0.1)",
    },
    {
      id: "upcoming",
      title: "Скоро начнутся",
      value: upcomingGroups,
      icon: <Timer1 size={20} color="#2196F3" />,
      bgColor: "rgba(33, 150, 243, 0.1)",
    },
  ];

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
            color={
              row.studentsCount >= row.maxStudents
                ? "error"
                : row.studentsCount >= row.maxStudents * 0.8
                  ? "warning"
                  : "primary"
            }
          />
        </Stack>
      ),
    },
    {
      field: "days",
      headerName: "Расписание",
      width: 200,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Clock size={14} color="#6B7280" />
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            {formatDays(row.days)} {row.timeStart}-{row.timeEnd}
          </Typography>
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

  return (
    <Box>
      <DataTable
        rows={filteredGroups}
        columns={columns}
        stats={stats}
        statsColumns={{ xs: 6, md: 4 }}
        searchEnabled
        searchValue={searchQuery}
        searchPlaceholder="Поиск по названию, ментору..."
        onSearchChange={setSearchQuery}
        addButtonEnabled
        addButtonText="Создать группу"
        onAddClick={() => setAddDialogOpen(true)}
        renderFilters={() => (
          <>
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
          </>
        )}
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
                    <Chip size="small" label={statusLabels[selectedGroup.status]} color={statusColors[selectedGroup.status]} />
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
                  <Typography variant="subtitle2" color="text.secondary">Курс и уровень</Typography>
                  <Typography variant="body2">{selectedGroup.course} • {selectedGroup.level}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Ментор</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#4CAF50" }}>{selectedGroup.mentor.charAt(0)}</Avatar>
                    <Typography variant="body2">{selectedGroup.mentor}</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Студенты</Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mt={0.5}>
                    <Profile2User size={18} color="#6B7280" />
                    <Typography variant="body2">{selectedGroup.studentsCount} из {selectedGroup.maxStudents} мест</Typography>
                    <LinearProgress variant="determinate" value={(selectedGroup.studentsCount / selectedGroup.maxStudents) * 100} sx={{ flex: 1, height: 8, borderRadius: 4 }} />
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Расписание</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Clock size={16} color="#6B7280" />
                    <Typography variant="body2">{formatDays(selectedGroup.days)} {selectedGroup.timeStart}-{selectedGroup.timeEnd}</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Период обучения</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Calendar size={16} color="#6B7280" />
                    <Typography variant="body2">{new Date(selectedGroup.startDate).toLocaleDateString("ru-RU")} — {new Date(selectedGroup.endDate).toLocaleDateString("ru-RU")}</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Филиал</Typography>
                  <Typography variant="body2">{selectedGroup.branch}</Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Profile2User size={18} />}>Студенты</Button>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>Редактировать</Button>
              <Button variant="contained" onClick={() => setSelectedGroup(null)}>Закрыть</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Group Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>Создать группу</Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Название группы" size="small" fullWidth value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
            <FormControl fullWidth size="small">
              <InputLabel>Курс</InputLabel>
              <Select label="Курс" value={formData.course} onChange={(e) => setFormData((prev) => ({ ...prev, course: e.target.value }))}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Korean">Korean</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="IELTS">IELTS Prep</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Уровень</InputLabel>
              <Select label="Уровень" value={formData.level} onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}>
                <MenuItem value="A1">A1 (Beginner)</MenuItem>
                <MenuItem value="A2">A2 (Elementary)</MenuItem>
                <MenuItem value="B1">B1 (Intermediate)</MenuItem>
                <MenuItem value="B2">B2 (Upper-Intermediate)</MenuItem>
                <MenuItem value="C1">C1 (Advanced)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Ментор</InputLabel>
              <Select label="Ментор" value={formData.mentor} onChange={(e) => setFormData((prev) => ({ ...prev, mentor: e.target.value }))}>
                <MenuItem value="Сидоров К.">Сидоров К.</MenuItem>
                <MenuItem value="Петрова М.">Петрова М.</MenuItem>
                <MenuItem value="Козлова А.">Козлова А.</MenuItem>
                <MenuItem value="Иванов А.">Иванов А.</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Филиал</InputLabel>
              <Select label="Филиал" value={formData.branch} onChange={(e) => setFormData((prev) => ({ ...prev, branch: e.target.value }))}>
                <MenuItem value="Главный офис">Главный офис</MenuItem>
                <MenuItem value="Филиал Чиланзар">Филиал Чиланзар</MenuItem>
                <MenuItem value="Филиал Юнусабад">Филиал Юнусабад</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Максимум студентов" size="small" fullWidth type="number" value={formData.maxStudents} onChange={(e) => setFormData((prev) => ({ ...prev, maxStudents: Number(e.target.value) }))} />
            <FormControl fullWidth size="small">
              <InputLabel>Дни занятий</InputLabel>
              <Select multiple value={formData.days} onChange={(e) => setFormData((prev) => ({ ...prev, days: e.target.value as string[] }))} input={<OutlinedInput label="Дни занятий" />} renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={weekDays.find((d) => d.value === value)?.label} size="small" />
                  ))}
                </Box>
              )}>
                {weekDays.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    <Checkbox size="small" checked={formData.days.includes(day.value)} />
                    <ListItemText primary={day.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <Stack direction="row" spacing={2}>
                <TimePicker label="Время начала" value={formData.timeStart} onChange={(time) => setFormData((prev) => ({ ...prev, timeStart: time }))} slotProps={{ textField: { size: "small", fullWidth: true } }} ampm={false} format="HH:mm" />
                <TimePicker label="Время окончания" value={formData.timeEnd} onChange={(time) => setFormData((prev) => ({ ...prev, timeEnd: time }))} slotProps={{ textField: { size: "small", fullWidth: true } }} ampm={false} format="HH:mm" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <DatePicker label="Дата начала" value={formData.startDate} onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))} slotProps={{ textField: { size: "small", fullWidth: true } }} format="DD.MM.YYYY" />
                <DatePicker label="Дата окончания" value={formData.endDate} onChange={(date) => setFormData((prev) => ({ ...prev, endDate: date }))} slotProps={{ textField: { size: "small", fullWidth: true } }} format="DD.MM.YYYY" />
              </Stack>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => { setAddDialogOpen(false); setFormData(initialFormData); }}>Отмена</Button>
          <Button variant="contained" onClick={() => { setAddDialogOpen(false); setFormData(initialFormData); }} disabled={!formData.name || !formData.course || formData.days.length === 0 || !formData.timeStart || !formData.timeEnd || !formData.startDate || !formData.endDate}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
