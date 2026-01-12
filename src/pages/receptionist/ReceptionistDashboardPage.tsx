import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {
  Profile2User,
  Calendar,
  Clock,
  Call,
  Add,
  TickCircle,
  CloseCircle,
  Sms,
  MessageText,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Today's stats for receptionist
const todayStats = [
  {
    id: "visitors",
    title: "Посетителей сегодня",
    value: "23",
    icon: <Profile2User size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "registrations",
    title: "Новых регистраций",
    value: "5",
    icon: <Add size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "calls",
    title: "Звонков",
    value: "18",
    icon: <Call size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  {
    id: "lessons",
    title: "Занятий сейчас",
    value: "8",
    icon: <Calendar size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

// Current lessons
const currentLessons = [
  { time: "11:00-12:30", group: "English B1 - G1", mentor: "Иванов А.", room: "101", students: 15 },
  { time: "11:00-12:30", group: "Korean A1 - G3", mentor: "Петрова М.", room: "102", students: 12 },
  { time: "11:00-12:30", group: "IELTS - G5", mentor: "Сидоров К.", room: "201", students: 8 },
  { time: "11:00-12:30", group: "German A1 - G4", mentor: "Козлова А.", room: "103", students: 10 },
];

// Upcoming lessons (next 2 hours)
const upcomingLessons = [
  { time: "14:00", group: "English A2 - G2", mentor: "Иванов А.", room: "101" },
  { time: "14:00", group: "French A1 - G6", mentor: "Морозов Д.", room: "104" },
  { time: "16:00", group: "English B2 - G7", mentor: "Козлова А.", room: "103" },
];

// Today's visitors/inquiries
const todayVisitors = [
  { name: "Алексей Новиков", type: "inquiry", course: "English B1", time: "10:30", status: "completed" },
  { name: "Мария Иванова", type: "trial", course: "Korean A1", time: "11:00", status: "in_progress" },
  { name: "Дмитрий Петров", type: "payment", course: "IELTS Prep", time: "11:30", status: "waiting" },
  { name: "Анна Сидорова", type: "inquiry", course: "German A1", time: "12:00", status: "waiting" },
];

// Recent messages/tasks
const recentTasks = [
  { text: "Позвонить Иванову И. - напомнить об оплате", priority: "high", done: false },
  { text: "Подготовить договор для Петровой М.", priority: "medium", done: true },
  { text: "Отправить расписание группе B2", priority: "low", done: false },
  { text: "Заказать учебники для Korean A1", priority: "medium", done: false },
];

export const ReceptionistDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Добро пожаловать, {user?.name?.split(" ")[0] || "Ресепшионист"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Call size={18} />}>
            Новый звонок
          </Button>
          <Button variant="contained" startIcon={<Add size={18} />}>
            Новая запись
          </Button>
        </Stack>
      </Stack>

      {/* Today's Stats */}
      <Grid container spacing={2} mb={3}>
        {todayStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: stat.bgColor }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Current Lessons */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Calendar size={20} color="#E91E63" />
                <Typography variant="h6" fontWeight={600}>
                  Сейчас идут занятия
                </Typography>
              </Stack>
              <Chip label={`${currentLessons.length} занятий`} size="small" color="error" />
            </Stack>
            <Stack spacing={1.5}>
              {currentLessons.map((lesson, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1.5, bgcolor: "rgba(233, 30, 99, 0.05)", borderRadius: 2 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ width: 100 }}>
                    <Clock size={14} color="#E91E63" />
                    <Typography variant="body2" fontWeight={500}>
                      {lesson.time.split("-")[0]}
                    </Typography>
                  </Stack>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {lesson.group}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.mentor} • {lesson.students} студентов
                    </Typography>
                  </Box>
                  <Chip label={`Ауд. ${lesson.room}`} size="small" variant="outlined" />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Today's Visitors */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Profile2User size={20} color="#1264EB" />
                <Typography variant="h6" fontWeight={600}>
                  Посетители сегодня
                </Typography>
              </Stack>
              <Button size="small" startIcon={<Add size={16} />}>
                Добавить
              </Button>
            </Stack>
            <Stack spacing={1.5}>
              {todayVisitors.map((visitor, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "#1264EB", mr: 1.5 }}>
                    {visitor.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {visitor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {visitor.type === "inquiry" ? "Консультация" : visitor.type === "trial" ? "Пробный урок" : "Оплата"} • {visitor.course}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end">
                    <Typography variant="caption" color="text.secondary">
                      {visitor.time}
                    </Typography>
                    <Chip
                      size="small"
                      label={visitor.status === "completed" ? "Завершен" : visitor.status === "in_progress" ? "Сейчас" : "Ожидает"}
                      color={visitor.status === "completed" ? "success" : visitor.status === "in_progress" ? "primary" : "warning"}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Upcoming Lessons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Clock size={20} color="#FF9800" />
              <Typography variant="h6" fontWeight={600}>
                Ближайшие занятия
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {upcomingLessons.map((lesson, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ width: 60 }}>
                    {lesson.time}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">{lesson.group}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.mentor}
                    </Typography>
                  </Box>
                  <Chip label={`Ауд. ${lesson.room}`} size="small" variant="outlined" />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Tasks */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <MessageText size={20} color="#9C27B0" />
              <Typography variant="h6" fontWeight={600}>
                Задачи на сегодня
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {recentTasks.map((task, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    p: 1.5,
                    bgcolor: "#F9FAFB",
                    borderRadius: 2,
                    opacity: task.done ? 0.6 : 1,
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.done ? (
                    <TickCircle size={20} color="#4CAF50" />
                  ) : (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: task.priority === "high" ? "#F44336" : task.priority === "medium" ? "#FF9800" : "#9E9E9E",
                      }}
                    />
                  )}
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {task.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
