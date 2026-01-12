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
  Rating,
  LinearProgress,
} from "@mui/material";
import {
  SearchNormal1,
  Add,
  Edit2,
  Trash,
  Eye,
  CloseCircle,
  Call,
  Sms,
  Building,
  Book1,
  Profile2User,
  Star1,
  Calendar,
} from "iconsax-react";

interface Mentor {
  id: string;
  name: string;
  email: string;
  phone: string;
  languages: string[];
  branch: string;
  status: "active" | "inactive" | "vacation";
  groupsCount: number;
  studentsCount: number;
  rating: number;
  hiredAt: string;
  salary: number;
}

const mentors: Mentor[] = [
  { id: "1", name: "Сидоров Константин", email: "sidorov@edu.com", phone: "+998901234567", languages: ["English", "IELTS"], branch: "Главный офис", status: "active", groupsCount: 3, studentsCount: 45, rating: 4.9, hiredAt: "2024-01-15", salary: 4500000 },
  { id: "2", name: "Петрова Мария", email: "petrova@edu.com", phone: "+998901234568", languages: ["Korean"], branch: "Филиал Чиланзар", status: "active", groupsCount: 2, studentsCount: 28, rating: 4.8, hiredAt: "2024-02-01", salary: 4000000 },
  { id: "3", name: "Козлова Анна", email: "kozlova@edu.com", phone: "+998901234569", languages: ["English", "German"], branch: "Филиал Юнусабад", status: "active", groupsCount: 2, studentsCount: 32, rating: 4.7, hiredAt: "2024-03-10", salary: 4000000 },
  { id: "4", name: "Иванов Алексей", email: "ivanov@edu.com", phone: "+998901234570", languages: ["English"], branch: "Главный офис", status: "active", groupsCount: 2, studentsCount: 26, rating: 4.6, hiredAt: "2024-04-01", salary: 4000000 },
  { id: "5", name: "Морозов Дмитрий", email: "morozov@edu.com", phone: "+998901234571", languages: ["French"], branch: "Филиал Чиланзар", status: "active", groupsCount: 1, studentsCount: 12, rating: 4.5, hiredAt: "2024-05-15", salary: 3800000 },
  { id: "6", name: "Волкова Елена", email: "volkova@edu.com", phone: "+998901234572", languages: ["English", "Korean"], branch: "Главный офис", status: "vacation", groupsCount: 2, studentsCount: 24, rating: 4.7, hiredAt: "2024-02-20", salary: 4200000 },
  { id: "7", name: "Белов Сергей", email: "belov@edu.com", phone: "+998901234573", languages: ["German"], branch: "Филиал Юнусабад", status: "inactive", groupsCount: 0, studentsCount: 0, rating: 4.3, hiredAt: "2023-09-01", salary: 3500000 },
  { id: "8", name: "Кузнецова Ольга", email: "kuznecova@edu.com", phone: "+998901234574", languages: ["English", "IELTS"], branch: "Главный офис", status: "active", groupsCount: 2, studentsCount: 22, rating: 4.8, hiredAt: "2024-06-01", salary: 4000000 },
];

const statusLabels: Record<string, string> = {
  active: "Активен",
  inactive: "Неактивен",
  vacation: "В отпуске",
};

const statusColors: Record<string, "success" | "default" | "warning"> = {
  active: "success",
  inactive: "default",
  vacation: "warning",
};

const allLanguages = ["Все", "English", "Korean", "German", "French", "IELTS"];
const branches = ["Все", "Главный офис", "Филиал Чиланзар", "Филиал Юнусабад"];
const statuses = ["Все", "active", "inactive", "vacation"];

export const MentorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("Все");
  const [branchFilter, setBranchFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredMentors = useMemo(() => {
    let result = mentors;

    if (languageFilter !== "Все") {
      result = result.filter((m) => m.languages.includes(languageFilter));
    }

    if (branchFilter !== "Все") {
      result = result.filter((m) => m.branch === branchFilter);
    }

    if (statusFilter !== "Все") {
      result = result.filter((m) => m.status === statusFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.phone.includes(query)
      );
    }

    return result;
  }, [searchQuery, languageFilter, branchFilter, statusFilter]);

  const columns: GridColDef<Mentor>[] = [
    {
      field: "name",
      headerName: "Ментор",
      flex: 1,
      minWidth: 220,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#4CAF50" }}>
            {row.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "languages",
      headerName: "Языки",
      width: 160,
      renderCell: ({ value }) => (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {value.map((lang: string) => (
            <Chip key={lang} size="small" label={lang} variant="outlined" sx={{ fontSize: 11 }} />
          ))}
        </Stack>
      ),
    },
    {
      field: "groupsCount",
      headerName: "Группы",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Chip size="small" label={value} color="primary" variant="outlined" />
      ),
    },
    {
      field: "studentsCount",
      headerName: "Студенты",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Profile2User size={14} color="#6B7280" />
          <Typography variant="body2" fontWeight={500}>{value}</Typography>
        </Stack>
      ),
    },
    {
      field: "rating",
      headerName: "Рейтинг",
      width: 130,
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Star1 size={16} color="#FF9800" variant="Bold" />
          <Typography variant="body2" fontWeight={600}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">/ 5</Typography>
        </Stack>
      ),
    },
    {
      field: "branch",
      headerName: "Филиал",
      width: 150,
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Building size={14} color="#6B7280" />
          <Typography variant="body2">{value}</Typography>
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
          <IconButton size="small" onClick={() => setSelectedMentor(row)}>
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
  const activeMentors = mentors.filter((m) => m.status === "active").length;
  const totalStudents = mentors.reduce((sum, m) => sum + m.studentsCount, 0);
  const avgRating = (mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length).toFixed(1);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Менторы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление преподавательским составом
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add size={20} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Добавить ментора
        </Button>
      </Stack>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box sx={{ p: 2, bgcolor: "white", borderRadius: 2, minWidth: 150 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {activeMentors}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Активных менторов
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
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {avgRating}
            </Typography>
            <Star1 size={20} color="#FF9800" variant="Bold" />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Средний рейтинг
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2} bgcolor="white" borderRadius={3} p={2}>
        <TextField
          placeholder="Поиск по имени, email, телефону..."
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
          <Select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
            {allLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang === "Все" ? "Все языки" : lang}
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

        <FormControl size="small" sx={{ minWidth: 140 }}>
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
        rows={filteredMentors}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ bgcolor: "white", borderRadius: 3 }}
      />

      {/* Mentor Details Dialog */}
      <Dialog open={!!selectedMentor} onClose={() => setSelectedMentor(null)} maxWidth="sm" fullWidth>
        {selectedMentor && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#4CAF50" }}>
                    {selectedMentor.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedMentor.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        size="small"
                        label={statusLabels[selectedMentor.status]}
                        color={statusColors[selectedMentor.status]}
                      />
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Star1 size={14} color="#FF9800" variant="Bold" />
                        <Typography variant="body2" fontWeight={600}>{selectedMentor.rating}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedMentor(null)}>
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
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Call size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedMentor.phone}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Sms size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedMentor.email}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Языки преподавания
                  </Typography>
                  <Stack direction="row" spacing={1} mt={0.5}>
                    {selectedMentor.languages.map((lang) => (
                      <Chip key={lang} size="small" label={lang} color="primary" variant="outlined" />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Статистика
                  </Typography>
                  <Stack direction="row" spacing={3} mt={1}>
                    <Box sx={{ textAlign: "center", p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2, flex: 1 }}>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        {selectedMentor.groupsCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Групп</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2, flex: 1 }}>
                      <Typography variant="h5" fontWeight={700} color="success.main">
                        {selectedMentor.studentsCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Студентов</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2, flex: 1 }}>
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                        <Typography variant="h5" fontWeight={700} color="warning.main">
                          {selectedMentor.rating}
                        </Typography>
                        <Star1 size={16} color="#FF9800" variant="Bold" />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">Рейтинг</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Филиал
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Building size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedMentor.branch}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Дата найма
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Calendar size={16} color="#6B7280" />
                    <Typography variant="body2">
                      {new Date(selectedMentor.hiredAt).toLocaleDateString("ru-RU")}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Зарплата
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedMentor.salary.toLocaleString()} сум
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="outlined" startIcon={<Calendar size={18} />}>
                Расписание
              </Button>
              <Button variant="outlined" startIcon={<Edit2 size={18} />}>
                Редактировать
              </Button>
              <Button variant="contained" onClick={() => setSelectedMentor(null)}>
                Закрыть
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Mentor Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Добавить ментора
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
              <InputLabel>Языки преподавания</InputLabel>
              <Select label="Языки преподавания" multiple defaultValue={[]}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Korean">Korean</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="IELTS">IELTS</MenuItem>
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
