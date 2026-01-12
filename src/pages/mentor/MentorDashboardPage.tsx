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
  Calendar,
  Clock,
  Book1,
  Teacher,
  TickCircle,
  CloseCircle,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Mentor's stats
const mentorStats = [
  {
    id: "groups",
    title: "Мои группы",
    value: "4",
    icon: <Category size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "students",
    title: "Мои студенты",
    value: "67",
    icon: <Profile2User size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "lessons_today",
    title: "Занятий сегодня",
    value: "3",
    icon: <Calendar size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  {
    id: "hours_week",
    title: "Часов в неделю",
    value: "18",
    icon: <Clock size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

// Today's schedule for mentor
const todaySchedule = [
  {
    time: "09:00 - 10:30",
    title: "English B1",
    group: "Group 1",
    room: "101",
    students: 15,
    color: "#1264EB",
    status: "completed",
  },
  {
    time: "11:00 - 12:30",
    title: "English A2",
    group: "Group 2",
    room: "102",
    students: 12,
    color: "#4CAF50",
    status: "current",
  },
  {
    time: "14:00 - 15:30",
    title: "IELTS Prep",
    group: "Group 5",
    room: "201",
    students: 8,
    color: "#FF9800",
    status: "upcoming",
  },
];

// Mentor's groups with progress
const myGroups = [
  { name: "English B1 - Group 1", students: 15, progress: 72, lessonsLeft: 12, color: "#1264EB" },
  { name: "English A2 - Group 2", students: 12, progress: 45, lessonsLeft: 24, color: "#4CAF50" },
  { name: "IELTS Prep - Group 5", students: 8, progress: 30, lessonsLeft: 32, color: "#FF9800" },
  { name: "English B2 - Group 7", students: 10, progress: 85, lessonsLeft: 6, color: "#E91E63" },
];

// Recent student activity
const studentActivity = [
  { name: "Иван Петров", action: "Сдал домашнее задание", group: "English B1", time: "10 мин назад", type: "homework" },
  { name: "Мария Сидорова", action: "Пропустила занятие", group: "English A2", time: "2 часа назад", type: "absent" },
  { name: "Алексей Козлов", action: "Получил 95% на тесте", group: "IELTS Prep", time: "вчера", type: "test" },
  { name: "Анна Морозова", action: "Присоединилась к группе", group: "English B2", time: "2 дня назад", type: "joined" },
];

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Добро пожаловать, {user?.name?.split(" ")[0] || "Ментор"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ваша панель управления
          </Typography>
        </Box>
        <Chip
          icon={<Teacher size={16} />}
          label="Ментор"
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        {mentorStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: stat.bgColor,
                  }}
                >
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
                  Мое расписание на сегодня
                </Typography>
              </Stack>
              <Chip label={`${todaySchedule.length} занятия`} size="small" color="primary" />
            </Stack>
            <Stack spacing={2}>
              {todaySchedule.map((lesson, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: lesson.status === "current" ? "rgba(18, 100, 235, 0.08)" : "#F9FAFB",
                    border: lesson.status === "current" ? "1px solid #1264EB" : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 50,
                      borderRadius: 1,
                      bgcolor: lesson.color,
                    }}
                  />
                  <Stack sx={{ minWidth: 110 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {lesson.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Ауд. {lesson.room}
                    </Typography>
                  </Stack>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={500}>
                      {lesson.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.group} • {lesson.students} студентов
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={
                      lesson.status === "completed"
                        ? "Завершено"
                        : lesson.status === "current"
                        ? "Сейчас"
                        : "Предстоит"
                    }
                    color={
                      lesson.status === "completed"
                        ? "success"
                        : lesson.status === "current"
                        ? "primary"
                        : "default"
                    }
                    variant={lesson.status === "upcoming" ? "outlined" : "filled"}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Student Activity */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Активность студентов
            </Typography>
            <Stack spacing={2}>
              {studentActivity.map((activity, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor:
                        activity.type === "homework"
                          ? "rgba(76, 175, 80, 0.1)"
                          : activity.type === "absent"
                          ? "rgba(244, 67, 54, 0.1)"
                          : activity.type === "test"
                          ? "rgba(18, 100, 235, 0.1)"
                          : "rgba(255, 152, 0, 0.1)",
                    }}
                  >
                    {activity.type === "homework" ? (
                      <TickCircle size={18} color="#4CAF50" />
                    ) : activity.type === "absent" ? (
                      <CloseCircle size={18} color="#F44336" />
                    ) : activity.type === "test" ? (
                      <Book1 size={18} color="#1264EB" />
                    ) : (
                      <Profile2User size={18} color="#FF9800" />
                    )}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.action}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="primary">
                        {activity.group}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {activity.time}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* My Groups Progress */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Category size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                Мои группы
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {myGroups.map((group) => (
                <Grid key={group.name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#F9FAFB",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500} mb={1}>
                      {group.name}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Прогресс курса
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {group.progress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={group.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "rgba(0,0,0,0.08)",
                        mb: 1,
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          bgcolor: group.color,
                        },
                      }}
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        {group.students} студентов
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {group.lessonsLeft} занятий осталось
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
