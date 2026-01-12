import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Profile2User,
  Category,
  UserOctagon,
  Calendar,
  Clock,
  TrendUp,
  TickCircle,
  CloseCircle,
  Add,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Admin Stats
const adminStats = [
  {
    id: "students",
    title: "Всего студентов",
    value: "1,234",
    change: "+45",
    subtext: "за месяц",
    icon: <Profile2User size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "groups",
    title: "Активные группы",
    value: "56",
    change: "+3",
    subtext: "новых",
    icon: <Category size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "mentors",
    title: "Менторы",
    value: "24",
    change: "2",
    subtext: "в отпуске",
    icon: <UserOctagon size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  {
    id: "lessons",
    title: "Занятий сегодня",
    value: "42",
    change: "8",
    subtext: "завершено",
    icon: <Calendar size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

// Today's schedule overview
const todaySchedule = [
  { time: "09:00", group: "English B1 - G1", mentor: "Иванов А.", room: "101", status: "completed" },
  { time: "09:00", group: "Korean A1 - G3", mentor: "Петрова М.", room: "102", status: "completed" },
  { time: "11:00", group: "English A2 - G2", mentor: "Иванов А.", room: "101", status: "current" },
  { time: "11:00", group: "IELTS - G5", mentor: "Сидоров К.", room: "201", status: "current" },
  { time: "14:00", group: "German A1 - G4", mentor: "Козлова А.", room: "103", status: "upcoming" },
  { time: "16:00", group: "English B2 - G7", mentor: "Морозов Д.", room: "104", status: "upcoming" },
];

// Recent registrations
const recentRegistrations = [
  { name: "Иван Петров", course: "English B1", date: "Сегодня", status: "pending" },
  { name: "Мария Сидорова", course: "Korean A1", date: "Сегодня", status: "approved" },
  { name: "Алексей Козлов", course: "IELTS Prep", date: "Вчера", status: "approved" },
  { name: "Анна Морозова", course: "German A1", date: "Вчера", status: "pending" },
  { name: "Дмитрий Новиков", course: "English A2", date: "2 дня назад", status: "approved" },
];

// Group fill rates
const groupFillRates = [
  { name: "English B1 - G1", current: 15, max: 15, color: "#4CAF50" },
  { name: "Korean A1 - G3", current: 12, max: 15, color: "#FF9800" },
  { name: "IELTS Prep - G5", current: 8, max: 10, color: "#1264EB" },
  { name: "German A1 - G4", current: 6, max: 12, color: "#E91E63" },
  { name: "English A2 - G2", current: 14, max: 15, color: "#9C27B0" },
];

// Mentor workload
const mentorWorkload = [
  { name: "Иванов А.", groups: 4, students: 58, hours: 20 },
  { name: "Петрова М.", groups: 3, students: 42, hours: 15 },
  { name: "Сидоров К.", groups: 3, students: 38, hours: 15 },
  { name: "Козлова А.", groups: 2, students: 24, hours: 10 },
];

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Добро пожаловать, {user?.name?.split(" ")[0] || "Администратор"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Панель управления учебным центром
          </Typography>
        </Box>
        <Chip icon={<Category size={16} />} label="Admin Panel" color="primary" variant="outlined" />
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        {adminStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                    <TrendUp size={14} color="#4CAF50" />
                    <Typography variant="caption" color="success.main">
                      {stat.change}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.subtext}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.bgColor }}>
                  {stat.icon}
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Calendar size={20} color="#1264EB" />
                <Typography variant="h6" fontWeight={600}>
                  Расписание на сегодня
                </Typography>
              </Stack>
              <Chip label={`${todaySchedule.length} занятий`} size="small" color="primary" />
            </Stack>
            <Stack spacing={1} sx={{ maxHeight: 300, overflowY: "auto" }}>
              {todaySchedule.map((lesson, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: lesson.status === "current" ? "rgba(18, 100, 235, 0.08)" : "#F9FAFB",
                    border: lesson.status === "current" ? "1px solid #1264EB" : "none",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ width: 70 }}>
                    <Clock size={14} color="#6B7280" />
                    <Typography variant="body2" fontWeight={500}>
                      {lesson.time}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {lesson.group}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 100 }}>
                    {lesson.mentor}
                  </Typography>
                  <Chip label={`Ауд. ${lesson.room}`} size="small" variant="outlined" sx={{ width: 70 }} />
                  {lesson.status === "completed" ? (
                    <TickCircle size={18} color="#4CAF50" />
                  ) : lesson.status === "current" ? (
                    <Chip label="Сейчас" size="small" color="primary" />
                  ) : (
                    <Clock size={18} color="#9E9E9E" />
                  )}
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Registrations */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Новые регистрации
              </Typography>
              <Chip icon={<Add size={14} />} label="Добавить" size="small" color="primary" />
            </Stack>
            <Stack spacing={1.5}>
              {recentRegistrations.map((reg, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "#1264EB" }}>
                    {reg.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {reg.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {reg.course} • {reg.date}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={reg.status === "approved" ? "Одобрено" : "Ожидает"}
                    color={reg.status === "approved" ? "success" : "warning"}
                    icon={reg.status === "approved" ? <TickCircle size={14} /> : <Clock size={14} />}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Group Fill Rates */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Заполненность групп
            </Typography>
            <Stack spacing={2}>
              {groupFillRates.map((group) => (
                <Box key={group.name}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{group.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {group.current}/{group.max}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(group.current / group.max) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: group.color },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Mentor Workload */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Нагрузка менторов
            </Typography>
            <Stack spacing={1.5}>
              {mentorWorkload.map((mentor) => (
                <Stack
                  key={mentor.name}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "#FF9800", mr: 2 }}>
                    {mentor.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {mentor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mentor.groups} групп • {mentor.students} студентов
                    </Typography>
                  </Box>
                  <Chip label={`${mentor.hours}ч/нед`} size="small" variant="outlined" />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
