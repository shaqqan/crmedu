import React, { useState, useMemo } from "react";
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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  LinearProgress,
  Grid2 as Grid,
} from "@mui/material";
import {
  Profile2User,
  Eye,
  CloseCircle,
  TickCircle,
  Calendar,
  Chart,
} from "iconsax-react";

interface MentorStudent {
  id: string;
  name: string;
  phone: string;
  email: string;
  group: string;
  groupColor: string;
  attendance: number;
  avgScore: number;
  homeworkDone: number;
  totalHomework: number;
  status: "active" | "frozen" | "completed";
  joinedAt: string;
}

// Mock data for mentor's students
const myStudents: MentorStudent[] = [
  { id: "1", name: "Иван Петров", phone: "+998901234567", email: "ivan@mail.com", group: "English B1 - Group 1", groupColor: "#1264EB", attendance: 95, avgScore: 87, homeworkDone: 18, totalHomework: 20, status: "active", joinedAt: "2025-09-01" },
  { id: "2", name: "Мария Сидорова", phone: "+998901234568", email: "maria@mail.com", group: "English B1 - Group 1", groupColor: "#1264EB", attendance: 88, avgScore: 92, homeworkDone: 20, totalHomework: 20, status: "active", joinedAt: "2025-09-01" },
  { id: "3", name: "Алексей Козлов", phone: "+998901234569", email: "alexey@mail.com", group: "English B1 - Group 1", groupColor: "#1264EB", attendance: 100, avgScore: 78, homeworkDone: 17, totalHomework: 20, status: "active", joinedAt: "2025-09-01" },
  { id: "4", name: "Анна Морозова", phone: "+998901234570", email: "anna@mail.com", group: "English B1 - Group 1", groupColor: "#1264EB", attendance: 75, avgScore: 85, homeworkDone: 15, totalHomework: 20, status: "frozen", joinedAt: "2025-09-01" },
  { id: "5", name: "Дмитрий Новиков", phone: "+998901234571", email: "dmitry@mail.com", group: "English B1 - Group 1", groupColor: "#1264EB", attendance: 92, avgScore: 90, homeworkDone: 19, totalHomework: 20, status: "active", joinedAt: "2025-09-01" },
  { id: "6", name: "Елена Волкова", phone: "+998901234572", email: "elena@mail.com", group: "English A2 - Group 2", groupColor: "#4CAF50", attendance: 98, avgScore: 95, homeworkDone: 10, totalHomework: 10, status: "active", joinedAt: "2025-10-15" },
  { id: "7", name: "Сергей Белов", phone: "+998901234573", email: "sergey@mail.com", group: "English A2 - Group 2", groupColor: "#4CAF50", attendance: 85, avgScore: 72, homeworkDone: 8, totalHomework: 10, status: "active", joinedAt: "2025-10-15" },
  { id: "8", name: "Ольга Кузнецова", phone: "+998901234574", email: "olga@mail.com", group: "English A2 - Group 2", groupColor: "#4CAF50", attendance: 90, avgScore: 88, homeworkDone: 9, totalHomework: 10, status: "active", joinedAt: "2025-10-15" },
  { id: "9", name: "Артем Соколов", phone: "+998901234575", email: "artem@mail.com", group: "IELTS Prep - Group 5", groupColor: "#FF9800", attendance: 100, avgScore: 92, homeworkDone: 6, totalHomework: 6, status: "active", joinedAt: "2025-11-01" },
  { id: "10", name: "Наталья Попова", phone: "+998901234576", email: "natalia@mail.com", group: "IELTS Prep - Group 5", groupColor: "#FF9800", attendance: 95, avgScore: 89, homeworkDone: 6, totalHomework: 6, status: "active", joinedAt: "2025-11-01" },
  { id: "11", name: "Виктор Лебедев", phone: "+998901234577", email: "victor@mail.com", group: "English B2 - Group 7", groupColor: "#E91E63", attendance: 92, avgScore: 86, homeworkDone: 22, totalHomework: 24, status: "active", joinedAt: "2025-06-01" },
  { id: "12", name: "Татьяна Орлова", phone: "+998901234578", email: "tatiana@mail.com", group: "English B2 - Group 7", groupColor: "#E91E63", attendance: 88, avgScore: 91, homeworkDone: 24, totalHomework: 24, status: "active", joinedAt: "2025-06-01" },
];

const groups = [
  "Все группы",
  "English B1 - Group 1",
  "English A2 - Group 2",
  "IELTS Prep - Group 5",
  "English B2 - Group 7",
];

export const MentorStudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("Все группы");
  const [selectedStudent, setSelectedStudent] = useState<MentorStudent | null>(null);

  const filteredStudents = useMemo(() => {
    let result = myStudents;

    if (groupFilter !== "Все группы") {
      result = result.filter((s) => s.group === groupFilter);
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
  }, [searchQuery, groupFilter]);

  const columns: GridColDef<MentorStudent>[] = [
    {
      field: "rowNumber",
      headerName: "№",
      width: 60,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        filteredStudents.findIndex((s) => s.id === params.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Студент",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: row.groupColor }}>
            {row.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.phone}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "group",
      headerName: "Группа",
      width: 180,
      renderCell: ({ row }) => (
        <Chip
          label={row.group.split(" - ")[0]}
          size="small"
          sx={{
            bgcolor: `${row.groupColor}20`,
            color: row.groupColor,
            fontWeight: 500,
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      field: "attendance",
      headerName: "Посещаемость",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <Chip
          label={`${value}%`}
          size="small"
          color={value >= 90 ? "success" : value >= 75 ? "warning" : "error"}
          variant="outlined"
        />
      ),
    },
    {
      field: "avgScore",
      headerName: "Ср. балл",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <Typography
          variant="body2"
          fontWeight={600}
          color={value >= 85 ? "success.main" : value >= 70 ? "warning.main" : "error.main"}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: "homeworkDone",
      headerName: "Д/З",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <Typography variant="body2">
          {row.homeworkDone}/{row.totalHomework}
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
          label={value === "active" ? "Активен" : value === "frozen" ? "Заморожен" : "Завершил"}
          color={value === "active" ? "success" : value === "frozen" ? "warning" : "default"}
          icon={value === "active" ? <TickCircle size={14} /> : <CloseCircle size={14} />}
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <IconButton size="small" onClick={() => setSelectedStudent(row)}>
          <Eye size={18} color="#1264EB" />
        </IconButton>
      ),
    },
  ];

  // Stats
  const totalStudents = myStudents.length;
  const activeStudents = myStudents.filter((s) => s.status === "active").length;
  const avgAttendance = Math.round(
    myStudents.reduce((acc, s) => acc + s.attendance, 0) / totalStudents
  );
  const avgScore = Math.round(
    myStudents.reduce((acc, s) => acc + s.avgScore, 0) / totalStudents
  );

  const stats: StatItem[] = [
    {
      id: "total",
      title: "Всего студентов",
      value: totalStudents,
      icon: <Profile2User size={20} color="#1264EB" />,
      bgColor: "rgba(18, 100, 235, 0.1)",
    },
    {
      id: "active",
      title: "Активных",
      value: activeStudents,
      icon: <TickCircle size={20} color="#4CAF50" />,
      bgColor: "rgba(76, 175, 80, 0.1)",
    },
    {
      id: "attendance",
      title: "Ср. посещаемость",
      value: `${avgAttendance}%`,
      icon: <Calendar size={20} color="#FF9800" />,
      bgColor: "rgba(255, 152, 0, 0.1)",
    },
    {
      id: "score",
      title: "Ср. балл",
      value: avgScore,
      icon: <Chart size={20} color="#E91E63" />,
      bgColor: "rgba(233, 30, 99, 0.1)",
    },
  ];

  const renderFilters = () => (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <Select
        value={groupFilter}
        onChange={(e) => setGroupFilter(e.target.value)}
      >
        {groups.map((group) => (
          <MenuItem key={group} value={group}>
            {group}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Мои студенты
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Все студенты в ваших группах
          </Typography>
        </Box>
      </Stack>

      <DataTable
        rows={filteredStudents}
        columns={columns}
        stats={stats}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Поиск студента..."
        addButtonEnabled={false}
        renderFilters={renderFilters}
      />

      {/* Student Details Dialog */}
      <Dialog
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedStudent && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48, bgcolor: selectedStudent.groupColor }}>
                    {selectedStudent.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedStudent.name}
                    </Typography>
                    <Chip
                      label={selectedStudent.group}
                      size="small"
                      sx={{
                        bgcolor: `${selectedStudent.groupColor}20`,
                        color: selectedStudent.groupColor,
                      }}
                    />
                  </Box>
                </Stack>
                <IconButton onClick={() => setSelectedStudent(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Контактные данные
                  </Typography>
                  <Typography variant="body2">
                    Телефон: {selectedStudent.phone}
                  </Typography>
                  <Typography variant="body2">
                    Email: {selectedStudent.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Успеваемость
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={4}>
                      <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#F9FAFB" }}>
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          color={
                            selectedStudent.attendance >= 90
                              ? "success.main"
                              : selectedStudent.attendance >= 75
                              ? "warning.main"
                              : "error.main"
                          }
                        >
                          {selectedStudent.attendance}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Посещаемость
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid size={4}>
                      <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#F9FAFB" }}>
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          color={
                            selectedStudent.avgScore >= 85
                              ? "success.main"
                              : selectedStudent.avgScore >= 70
                              ? "warning.main"
                              : "error.main"
                          }
                        >
                          {selectedStudent.avgScore}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Средний балл
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid size={4}>
                      <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#F9FAFB" }}>
                        <Typography variant="h5" fontWeight={700} color="primary">
                          {selectedStudent.homeworkDone}/{selectedStudent.totalHomework}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Д/З сдано
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Прогресс домашних заданий
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {Math.round((selectedStudent.homeworkDone / selectedStudent.totalHomework) * 100)}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(selectedStudent.homeworkDone / selectedStudent.totalHomework) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: selectedStudent.groupColor,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
