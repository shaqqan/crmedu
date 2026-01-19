import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";
import {
  Profile2User,
  Category,
  Calendar,
  Clock,
  Book1,
  Teacher,
  TickCircle,
  CloseCircle,
  Star1,
  ArrowRight2,
  Notification,
  CalendarTick,
} from "iconsax-react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/shared/store";

// Quick actions for mentor
const quickActions = [
  {
    id: "attendance",
    title: "Davomat olish",
    description: "Bugungi dars uchun",
    icon: <TickCircle size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
    hoverColor: "rgba(76, 175, 80, 0.15)",
    path: "/mentor/attendance?lesson=2",
  },
  {
    id: "grading",
    title: "Baholash",
    description: "Talabalarni baholash",
    icon: <Star1 size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
    hoverColor: "rgba(18, 100, 235, 0.15)",
    path: "/mentor/grading?lesson=2",
  },
  {
    id: "groups",
    title: "Guruhlarim",
    description: "4 ta guruh",
    icon: <Category size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
    hoverColor: "rgba(255, 152, 0, 0.15)",
    path: "/mentor/groups",
  },
  {
    id: "schedule",
    title: "Jadval",
    description: "Haftalik jadval",
    icon: <Calendar size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
    hoverColor: "rgba(233, 30, 99, 0.15)",
    path: "/mentor/schedule",
  },
  {
    id: "attendance-history",
    title: "Davomat tarixi",
    description: "O'tgan darslar",
    icon: <CalendarTick size={24} color="#9C27B0" />,
    bgColor: "rgba(156, 39, 176, 0.1)",
    hoverColor: "rgba(156, 39, 176, 0.15)",
    path: "/mentor/attendance-history",
  },
];

// Mentor's stats
const mentorStats = [
  {
    id: "groups",
    title: "Guruhlarim",
    value: "4",
    icon: <Category size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
    path: "/mentor/groups",
  },
  {
    id: "students",
    title: "Talabalarim",
    value: "67",
    icon: <Profile2User size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
    path: "/mentor/students",
  },
  {
    id: "lessons_today",
    title: "Bugungi darslar",
    value: "3",
    icon: <Calendar size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
    path: "/mentor/schedule",
  },
  {
    id: "hours_week",
    title: "Haftalik soat",
    value: "18",
    icon: <Clock size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
    path: "/mentor/schedule",
  },
];

// Today's schedule for mentor
const todaySchedule = [
  {
    id: "1",
    time: "09:00 - 10:30",
    title: "English B1",
    group: "Group 1",
    groupId: "1",
    room: "101",
    students: 15,
    color: "#1264EB",
    status: "completed",
    attendanceMarked: true,
  },
  {
    id: "2",
    time: "11:00 - 12:30",
    title: "English A2",
    group: "Group 2",
    groupId: "2",
    room: "102",
    students: 12,
    color: "#4CAF50",
    status: "current",
    attendanceMarked: false,
  },
  {
    id: "3",
    time: "14:00 - 15:30",
    title: "IELTS Prep",
    group: "Group 5",
    groupId: "3",
    room: "201",
    students: 8,
    color: "#FF9800",
    status: "upcoming",
    attendanceMarked: false,
  },
];

// Mentor's groups with progress
const myGroups = [
  { id: "1", name: "English B1 - Group 1", students: 15, progress: 72, lessonsLeft: 12, color: "#1264EB" },
  { id: "2", name: "English A2 - Group 2", students: 12, progress: 45, lessonsLeft: 24, color: "#4CAF50" },
  { id: "3", name: "IELTS Prep - Group 5", students: 8, progress: 30, lessonsLeft: 32, color: "#FF9800" },
  { id: "4", name: "English B2 - Group 7", students: 10, progress: 85, lessonsLeft: 6, color: "#E91E63" },
];

// Recent student activity
const studentActivity = [
  { name: "Иван Петров", action: "Uy vazifasini topshirdi", group: "English B1", time: "10 min oldin", type: "homework" },
  { name: "Мария Сидорова", action: "Darsga kelmadi", group: "English A2", time: "2 soat oldin", type: "absent" },
  { name: "Алексей Козлов", action: "Testdan 95% oldi", group: "IELTS Prep", time: "kecha", type: "test" },
  { name: "Анна Морозова", action: "Guruhga qo'shildi", group: "English B2", time: "2 kun oldin", type: "joined" },
];

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const currentLesson = todaySchedule.find((l) => l.status === "current");

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Salom, {user?.name?.split(" ")[0] || "Mentor"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bugun {new Date().toLocaleDateString("uz-UZ", { weekday: "long", day: "numeric", month: "long" })}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Bildirishnomalar">
            <ButtonBase
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: "#F9FAFB",
                "&:hover": { bgcolor: "#F3F4F6" },
              }}
            >
              <Notification size={20} color="#6B7280" />
            </ButtonBase>
          </Tooltip>
          <Chip
            icon={<Teacher size={16} />}
            label="Mentor"
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Stack>

      {/* Current Lesson Alert */}
      {currentLesson && !currentLesson.attendanceMarked && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            bgcolor: "rgba(18, 100, 235, 0.08)",
            border: "1px solid rgba(18, 100, 235, 0.3)",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%, 100%": { borderColor: "rgba(18, 100, 235, 0.3)" },
              "50%": { borderColor: "rgba(18, 100, 235, 0.6)" },
            },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: currentLesson.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Book1 size={24} color="#fff" />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Hozirgi dars: {currentLesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentLesson.time} • Aud. {currentLesson.room} • {currentLesson.students} talaba
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                startIcon={<TickCircle size={18} />}
                onClick={() => navigate(`/mentor/attendance?lesson=${currentLesson.id}`)}
                sx={{ textTransform: "none" }}
              >
                Davomat olish
              </Button>
              <Button
                variant="outlined"
                startIcon={<Star1 size={18} />}
                onClick={() => navigate(`/mentor/grading?lesson=${currentLesson.id}`)}
                sx={{ textTransform: "none" }}
              >
                Baholash
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}

      {/* Quick Actions */}
      <Grid container spacing={2} mb={3}>
        {quickActions.map((action) => (
          <Grid key={action.id} size={{ xs: 6, md: 3 }}>
            <ButtonBase
              onClick={() => navigate(action.path)}
              sx={{ width: "100%", textAlign: "left" }}
            >
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  width: "100%",
                  bgcolor: action.bgColor,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: action.hoverColor,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  {action.icon}
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {action.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        {mentorStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <ButtonBase
              onClick={() => navigate(stat.path)}
              sx={{ width: "100%", textAlign: "left" }}
            >
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  width: "100%",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
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
            </ButtonBase>
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
                  Bugungi jadval
                </Typography>
              </Stack>
              <Button
                size="small"
                endIcon={<ArrowRight2 size={16} />}
                onClick={() => navigate("/mentor/schedule")}
                sx={{ textTransform: "none" }}
              >
                Barchasini ko'rish
              </Button>
            </Stack>
            <Stack spacing={2}>
              {todaySchedule.map((lesson) => (
                <Paper
                  key={lesson.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: lesson.status === "current" ? "rgba(18, 100, 235, 0.08)" : "#F9FAFB",
                    border: lesson.status === "current" ? "1px solid #1264EB" : "1px solid transparent",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: lesson.status === "current" ? "rgba(18, 100, 235, 0.12)" : "#F3F4F6",
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 4,
                        height: 60,
                        borderRadius: 1,
                        bgcolor: lesson.color,
                      }}
                    />
                    <Stack sx={{ minWidth: 100 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {lesson.time}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Aud. {lesson.room}
                      </Typography>
                    </Stack>
                    <ButtonBase
                      onClick={() => navigate(`/mentor/groups/${lesson.groupId}`)}
                      sx={{ flex: 1, textAlign: "left", borderRadius: 1 }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                          {lesson.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lesson.group} • {lesson.students} talaba
                        </Typography>
                      </Box>
                    </ButtonBase>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {lesson.status === "completed" && lesson.attendanceMarked && (
                        <Chip
                          size="small"
                          icon={<TickCircle size={14} />}
                          label="Bajarildi"
                          color="success"
                        />
                      )}
                      {lesson.status === "current" && (
                        <Chip size="small" label="Hozir" color="primary" />
                      )}
                      {lesson.status === "upcoming" && (
                        <Chip size="small" label="Kutilmoqda" variant="outlined" />
                      )}
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Davomat olish">
                        <ButtonBase
                          onClick={() => navigate(`/mentor/attendance?lesson=${lesson.id}`)}
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: "rgba(76, 175, 80, 0.1)",
                            "&:hover": { bgcolor: "rgba(76, 175, 80, 0.2)" },
                          }}
                        >
                          <TickCircle size={18} color="#4CAF50" />
                        </ButtonBase>
                      </Tooltip>
                      <Tooltip title="Baholash">
                        <ButtonBase
                          onClick={() => navigate(`/mentor/grading?lesson=${lesson.id}`)}
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: "rgba(18, 100, 235, 0.1)",
                            "&:hover": { bgcolor: "rgba(18, 100, 235, 0.2)" },
                          }}
                        >
                          <Star1 size={18} color="#1264EB" />
                        </ButtonBase>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Student Activity */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Talabalar faoliyati
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowRight2 size={16} />}
                onClick={() => navigate("/mentor/students")}
                sx={{ textTransform: "none" }}
              >
                Barchasi
              </Button>
            </Stack>
            <Stack spacing={2}>
              {studentActivity.map((activity, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": { bgcolor: "#F9FAFB" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
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
                      <TickCircle size={20} color="#4CAF50" />
                    ) : activity.type === "absent" ? (
                      <CloseCircle size={20} color="#F44336" />
                    ) : activity.type === "test" ? (
                      <Book1 size={20} color="#1264EB" />
                    ) : (
                      <Profile2User size={20} color="#FF9800" />
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
                      <Typography variant="caption" color="primary.main" fontWeight={500}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Category size={20} color="#1264EB" />
                <Typography variant="h6" fontWeight={600}>
                  Guruhlarim
                </Typography>
              </Stack>
              <Button
                size="small"
                endIcon={<ArrowRight2 size={16} />}
                onClick={() => navigate("/mentor/groups")}
                sx={{ textTransform: "none" }}
              >
                Barchasi
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {myGroups.map((group) => (
                <Grid key={group.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ButtonBase
                    onClick={() => navigate(`/mentor/groups/${group.id}`)}
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#F9FAFB",
                        width: "100%",
                        borderLeft: `4px solid ${group.color}`,
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "#F3F4F6",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} mb={1}>
                        {group.name}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
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
                          {group.students} talaba
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {group.lessonsLeft} dars qoldi
                        </Typography>
                      </Stack>
                    </Box>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
