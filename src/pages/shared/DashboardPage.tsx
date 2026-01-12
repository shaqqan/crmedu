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
  DollarCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  Book1,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Stats data
const stats = [
  {
    id: "students",
    title: "Студенты",
    value: "1,234",
    change: "+12%",
    isPositive: true,
    icon: <Profile2User size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
    permission: "dashboard.stats.students",
  },
  {
    id: "groups",
    title: "Группы",
    value: "56",
    change: "+4%",
    isPositive: true,
    icon: <Category size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
    permission: "dashboard.stats.groups",
  },
  {
    id: "mentors",
    title: "Менторы",
    value: "24",
    change: "+2",
    isPositive: true,
    icon: <UserOctagon size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
    permission: "dashboard.stats.mentors",
  },
  {
    id: "income",
    title: "Доход (месяц)",
    value: "$45,200",
    change: "+18%",
    isPositive: true,
    icon: <DollarCircle size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
    permission: "dashboard.stats.income",
  },
] as const;

// Today's schedule
const todaySchedule = [
  { time: "09:00", title: "English B1 - Group 1", teacher: "Алексей Иванов", room: "101", color: "#1264EB" },
  { time: "10:30", title: "English A2 - Group 2", teacher: "Мария Петрова", room: "102", color: "#4CAF50" },
  { time: "14:00", title: "Korean A1 - Group 3", teacher: "Сергей Сидоров", room: "103", color: "#FF9800" },
  { time: "16:00", title: "IELTS Prep - Group 5", teacher: "Анна Козлова", room: "201", color: "#E91E63" },
  { time: "18:00", title: "German A1 - Group 4", teacher: "Дмитрий Морозов", room: "104", color: "#9C27B0" },
];

// Recent activities
const recentActivities = [
  { text: "Новый студент зарегистрирован", name: "Иван Петров", time: "5 мин назад", type: "student" },
  { text: "Оплата получена", name: "Мария Сидорова", time: "15 мин назад", type: "payment" },
  { text: "Занятие завершено", name: "English B1 - Group 1", time: "1 час назад", type: "lesson" },
  { text: "Новая группа создана", name: "French A1 - Group 8", time: "2 часа назад", type: "group" },
  { text: "Студент заморожен", name: "Алексей Козлов", time: "3 часа назад", type: "frozen" },
];

// Popular courses
const popularCourses = [
  { name: "English", students: 456, progress: 85, color: "#1264EB" },
  { name: "Korean", students: 234, progress: 65, color: "#FF9800" },
  { name: "German", students: 189, progress: 52, color: "#9C27B0" },
  { name: "IELTS Prep", students: 167, progress: 45, color: "#E91E63" },
  { name: "French", students: 98, progress: 28, color: "#00BCD4" },
];

// Branches performance
const branchesPerformance = [
  { name: "Главный филиал", students: 523, income: "$18,500", growth: "+15%" },
  { name: "Филиал Чиланзар", students: 312, income: "$12,200", growth: "+8%" },
  { name: "Филиал Юнусабад", students: 245, income: "$9,800", growth: "+12%" },
  { name: "Филиал Сергели", students: 154, income: "$4,700", growth: "+5%" },
];

export const DashboardPage: React.FC = () => {
  const { can, user } = useAuthStore();

  // Filter stats based on permissions
  const visibleStats = stats.filter((stat) =>
    can(stat.permission as Parameters<typeof can>[0])
  );

  const canViewSchedule = can("dashboard.schedule");
  const canViewActivities = can("dashboard.activities");
  const canViewCourses = can("dashboard.courses");
  const canViewBranches = can("dashboard.branches");

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Дашборд
        </Typography>
        {user && (
          <Chip
            label={user.name}
            color="primary"
            variant="outlined"
            avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
          />
        )}
      </Stack>

      {/* Stats Cards */}
      {visibleStats.length > 0 && (
        <Grid container spacing={3} mb={3}>
          {visibleStats.map((stat) => (
            <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 12 / visibleStats.length }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                      {stat.isPositive ? (
                        <ArrowUp size={16} color="#4CAF50" />
                      ) : (
                        <ArrowDown size={16} color="#F44336" />
                      )}
                      <Typography
                        variant="body2"
                        color={stat.isPositive ? "#4CAF50" : "#F44336"}
                        fontWeight={500}
                      >
                        {stat.change}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        vs прошлый месяц
                      </Typography>
                    </Stack>
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
      )}

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        {canViewSchedule && (
          <Grid size={{ xs: 12, lg: canViewActivities ? 8 : 12 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Calendar size={20} color="#1264EB" />
                  <Typography variant="h6" fontWeight={600}>
                    Расписание на сегодня
                  </Typography>
                </Stack>
                <Chip label="5 занятий" size="small" color="primary" />
              </Stack>
              <Stack spacing={1.5} sx={{ maxHeight: 320, overflowY: "auto" }}>
                {todaySchedule.map((lesson, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#F9FAFB",
                      "&:hover": { bgcolor: "#F1F3F5" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: lesson.color,
                      }}
                    />
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 70 }}>
                      <Clock size={16} color="#6B7280" />
                      <Typography variant="body2" fontWeight={600}>
                        {lesson.time}
                      </Typography>
                    </Stack>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {lesson.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {lesson.teacher}
                      </Typography>
                    </Box>
                    <Chip label={`Ауд. ${lesson.room}`} size="small" variant="outlined" />
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        )}

        {/* Recent Activities */}
        {canViewActivities && (
          <Grid size={{ xs: 12, lg: canViewSchedule ? 4 : 12 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Последние действия
              </Typography>
              <Stack spacing={2} sx={{ maxHeight: 320, overflowY: "auto" }}>
                {recentActivities.map((activity, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor:
                          activity.type === "payment"
                            ? "rgba(76, 175, 80, 0.1)"
                            : activity.type === "student"
                            ? "rgba(18, 100, 235, 0.1)"
                            : activity.type === "frozen"
                            ? "rgba(244, 67, 54, 0.1)"
                            : "rgba(255, 152, 0, 0.1)",
                      }}
                    >
                      {activity.type === "payment" ? (
                        <DollarCircle size={18} color="#4CAF50" />
                      ) : activity.type === "student" ? (
                        <Profile2User size={18} color="#1264EB" />
                      ) : activity.type === "frozen" ? (
                        <Profile2User size={18} color="#F44336" />
                      ) : (
                        <Category size={18} color="#FF9800" />
                      )}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{activity.text}</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {activity.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        )}

        {/* Popular Courses */}
        {canViewCourses && (
          <Grid size={{ xs: 12, md: canViewBranches ? 6 : 12 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Book1 size={20} color="#1264EB" />
                <Typography variant="h6" fontWeight={600}>
                  Популярные курсы
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {popularCourses.map((course) => (
                  <Box key={course.name}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2" fontWeight={500}>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.students} студентов
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "rgba(0,0,0,0.08)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          bgcolor: course.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        )}

        {/* Branches Performance */}
        {canViewBranches && (
          <Grid size={{ xs: 12, md: canViewCourses ? 6 : 12 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Филиалы
              </Typography>
              <Stack spacing={1.5}>
                {branchesPerformance.map((branch) => (
                  <Stack
                    key={branch.name}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#F9FAFB",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {branch.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {branch.students} студентов
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="body2" fontWeight={600}>
                        {branch.income}
                      </Typography>
                      <Chip
                        label={branch.growth}
                        size="small"
                        sx={{
                          bgcolor: "rgba(76, 175, 80, 0.1)",
                          color: "#4CAF50",
                          fontWeight: 500,
                        }}
                      />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
