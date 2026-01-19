import { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable, StatItem } from "@/shared/ui";
import {
  Box,
  Stack,
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
  TextField,
} from "@mui/material";
import {
  Call,
  Sms,
  Eye,
  CloseCircle,
  Profile2User,
  TickCircle,
} from "iconsax-react";

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  group: string;
  status: "active" | "trial" | "frozen" | "inquiry";
  registeredAt: string;
  lastContact: string;
}

const students: Student[] = [
  { id: "1", name: "Иван Петров", phone: "+998901234567", email: "ivan@mail.com", course: "English B1", group: "Group 1", status: "active", registeredAt: "2025-09-01", lastContact: "2026-01-10" },
  { id: "2", name: "Мария Сидорова", phone: "+998901234568", email: "maria@mail.com", course: "Korean A1", group: "Group 3", status: "active", registeredAt: "2025-10-15", lastContact: "2026-01-08" },
  { id: "3", name: "Алексей Козлов", phone: "+998901234569", email: "alexey@mail.com", course: "IELTS Prep", group: "Group 5", status: "trial", registeredAt: "2026-01-05", lastContact: "2026-01-12" },
  { id: "4", name: "Анна Морозова", phone: "+998901234570", email: "anna@mail.com", course: "German A1", group: "Group 4", status: "inquiry", registeredAt: "2026-01-10", lastContact: "2026-01-10" },
  { id: "5", name: "Дмитрий Новиков", phone: "+998901234571", email: "dmitry@mail.com", course: "English A2", group: "Group 2", status: "frozen", registeredAt: "2025-11-01", lastContact: "2026-01-05" },
  { id: "6", name: "Елена Волкова", phone: "+998901234572", email: "elena@mail.com", course: "English B1", group: "Group 1", status: "active", registeredAt: "2025-09-01", lastContact: "2026-01-09" },
  { id: "7", name: "Сергей Белов", phone: "+998901234573", email: "sergey@mail.com", course: "French A1", group: "Group 6", status: "trial", registeredAt: "2026-01-08", lastContact: "2026-01-11" },
  { id: "8", name: "Ольга Кузнецова", phone: "+998901234574", email: "olga@mail.com", course: "Korean A1", group: "Group 3", status: "active", registeredAt: "2025-10-15", lastContact: "2026-01-07" },
];

const statusOptions = ["Все", "active", "trial", "frozen", "inquiry"];
const statusLabels: Record<string, string> = {
  active: "Активен",
  trial: "Пробный",
  frozen: "Заморожен",
  inquiry: "Заявка",
};

export const ReceptionistStudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Filtrlangan talabalar
  const filteredStudents = useMemo(() => {
    let result = students;

    if (statusFilter !== "Все") {
      result = result.filter((s) => s.status === statusFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.phone.includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, statusFilter]);

  // Statistika
  const activeCount = students.filter((s) => s.status === "active").length;
  const trialCount = students.filter((s) => s.status === "trial").length;
  const inquiryCount = students.filter((s) => s.status === "inquiry").length;

  const stats: StatItem[] = [
    {
      id: "active",
      title: "Активных",
      value: activeCount,
      icon: <TickCircle size={20} color="#4CAF50" />,
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      id: "trial",
      title: "На пробном",
      value: trialCount,
      icon: <Profile2User size={20} color="#1264EB" />,
      bgColor: "rgba(18, 100, 235, 0.1)",
    },
    {
      id: "inquiry",
      title: "Заявок",
      value: inquiryCount,
      icon: <Sms size={20} color="#FF9800" />,
      bgColor: "rgba(255, 152, 0, 0.1)",
    },
  ];

  // Jadval ustunlari
  const columns: GridColDef<Student>[] = [
    {
      field: "name",
      headerName: "Студент",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ width: "100%", minWidth: 0 }}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#1264EB", flexShrink: 0 }}>
            {row.name.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1, overflow: "hidden" }}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {row.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: 150,
      renderCell: ({ value }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Call size={14} color="#6B7280" />
          <Typography variant="body2">{value}</Typography>
        </Stack>
      ),
    },
    {
      field: "course",
      headerName: "Курс",
      width: 130,
    },
    {
      field: "group",
      headerName: "Группа",
      width: 100,
    },
    {
      field: "status",
      headerName: "Статус",
      width: 120,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={statusLabels[value]}
          color={
            value === "active"
              ? "success"
              : value === "trial"
                ? "info"
                : value === "frozen"
                  ? "warning"
                  : "default"
          }
        />
      ),
    },
    {
      field: "lastContact",
      headerName: "Посл. контакт",
      width: 120,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => setSelectedStudent(row)}>
            <Eye size={18} color="#1264EB" />
          </IconButton>
          <IconButton size="small">
            <Call size={18} color="#4CAF50" />
          </IconButton>
          <IconButton size="small">
            <Sms size={18} color="#FF9800" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      {/* DataTable - universal komponent */}
      <DataTable
        rows={filteredStudents}
        columns={columns}
        // Statistika
        stats={stats}
        statsColumns={{ xs: 6, md: 4 }}
        // Qidiruv
        searchEnabled
        searchValue={searchQuery}
        searchPlaceholder="Поиск по имени, телефону, email..."
        onSearchChange={setSearchQuery}
        // Qo'shish tugmasi
        addButtonEnabled
        addButtonText="Новая запись"
        onAddClick={() => setAddDialogOpen(true)}
        // Custom filterlar
        renderFilters={() => (
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="Все">Все статусы</MenuItem>
              {statusOptions.filter((s) => s !== "Все").map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabels[status]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onClose={() => setSelectedStudent(null)} maxWidth="sm" fullWidth>
        {selectedStudent && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48, bgcolor: "#1264EB" }}>
                    {selectedStudent.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedStudent.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={statusLabels[selectedStudent.status]}
                      color={
                        selectedStudent.status === "active"
                          ? "success"
                          : selectedStudent.status === "trial"
                            ? "info"
                            : "default"
                      }
                    />
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedStudent(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Контакты
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Call size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedStudent.phone}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Sms size={16} color="#6B7280" />
                    <Typography variant="body2">{selectedStudent.email}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Обучение
                  </Typography>
                  <Typography variant="body2">
                    {selectedStudent.course} - {selectedStudent.group}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Дата регистрации
                  </Typography>
                  <Typography variant="body2">
                    {new Date(selectedStudent.registeredAt).toLocaleDateString("ru-RU")}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} mt={2}>
                  <Button variant="outlined" startIcon={<Call size={18} />} fullWidth>
                    Позвонить
                  </Button>
                  <Button variant="outlined" startIcon={<Sms size={18} />} fullWidth>
                    SMS
                  </Button>
                </Stack>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Новая запись
            </Typography>
            <IconButton onClick={() => setAddDialogOpen(false)}>
              <CloseCircle size={24} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="ФИО" size="small" fullWidth />
            <TextField label="Телефон" size="small" fullWidth />
            <TextField label="Email" size="small" fullWidth />
            <FormControl fullWidth size="small">
              <Typography variant="body2" mb={0.5}>
                Интересующий курс
              </Typography>
              <Select defaultValue="">
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="korean">Korean</MenuItem>
                <MenuItem value="german">German</MenuItem>
                <MenuItem value="ielts">IELTS Prep</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Комментарий" size="small" multiline rows={3} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Отмена
          </Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
