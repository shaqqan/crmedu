import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import {
  Category,
  Calendar,
  Clock,
  Profile2User,
  Eye,
} from "iconsax-react";
import { useNavigate } from "react-router";

interface GroupStudent {
  id: string;
  name: string;
  avatar?: string;
  attendance: number;
  avgScore: number;
  status: "active" | "frozen" | "completed";
}

interface MentorGroup {
  id: string;
  name: string;
  course: string;
  level: string;
  schedule: string;
  room: string;
  studentsCount: number;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  startDate: string;
  endDate: string;
  color: string;
  students: GroupStudent[];
}

// Mock data for mentor's groups
const myGroups: MentorGroup[] = [
  {
    id: "1",
    name: "Group 1",
    course: "English",
    level: "B1",
    schedule: "Пн, Ср, Пт - 09:00",
    room: "101",
    studentsCount: 15,
    progress: 72,
    lessonsCompleted: 36,
    totalLessons: 50,
    startDate: "2025-09-01",
    endDate: "2026-02-28",
    color: "#1264EB",
    students: [
      { id: "1", name: "Иван Петров", attendance: 95, avgScore: 87, status: "active" },
      { id: "2", name: "Мария Сидорова", attendance: 88, avgScore: 92, status: "active" },
      { id: "3", name: "Алексей Козлов", attendance: 100, avgScore: 78, status: "active" },
      { id: "4", name: "Анна Морозова", attendance: 75, avgScore: 85, status: "frozen" },
      { id: "5", name: "Дмитрий Новиков", attendance: 92, avgScore: 90, status: "active" },
    ],
  },
  {
    id: "2",
    name: "Group 2",
    course: "English",
    level: "A2",
    schedule: "Вт, Чт - 11:00",
    room: "102",
    studentsCount: 12,
    progress: 45,
    lessonsCompleted: 18,
    totalLessons: 40,
    startDate: "2025-10-15",
    endDate: "2026-03-15",
    color: "#4CAF50",
    students: [
      { id: "6", name: "Елена Волкова", attendance: 98, avgScore: 95, status: "active" },
      { id: "7", name: "Сергей Белов", attendance: 85, avgScore: 72, status: "active" },
      { id: "8", name: "Ольга Кузнецова", attendance: 90, avgScore: 88, status: "active" },
    ],
  },
  {
    id: "3",
    name: "Group 5",
    course: "IELTS Prep",
    level: "Advanced",
    schedule: "Пн, Ср, Пт - 14:00",
    room: "201",
    studentsCount: 8,
    progress: 30,
    lessonsCompleted: 12,
    totalLessons: 40,
    startDate: "2025-11-01",
    endDate: "2026-04-01",
    color: "#FF9800",
    students: [
      { id: "9", name: "Артем Соколов", attendance: 100, avgScore: 92, status: "active" },
      { id: "10", name: "Наталья Попова", attendance: 95, avgScore: 89, status: "active" },
    ],
  },
  {
    id: "4",
    name: "Group 7",
    course: "English",
    level: "B2",
    schedule: "Вт, Чт, Сб - 16:00",
    room: "104",
    studentsCount: 10,
    progress: 85,
    lessonsCompleted: 42,
    totalLessons: 50,
    startDate: "2025-06-01",
    endDate: "2026-01-15",
    color: "#E91E63",
    students: [
      { id: "11", name: "Виктор Лебедев", attendance: 92, avgScore: 86, status: "active" },
      { id: "12", name: "Татьяна Орлова", attendance: 88, avgScore: 91, status: "active" },
    ],
  },
];

export const MentorGroupsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Мои группы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управление вашими учебными группами
          </Typography>
        </Box>
        <Chip
          icon={<Category size={16} />}
          label={`${myGroups.length} групп`}
          color="primary"
        />
      </Stack>

      <Grid container spacing={3}>
        {myGroups.map((group) => (
          <Grid key={group.id} size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${group.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Category size={24} color={group.color} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {group.course} {group.level}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.name}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  size="small"
                  startIcon={<Eye size={16} />}
                  onClick={() => navigate(`/mentor/groups/${group.id}`)}
                >
                  Подробнее
                </Button>
              </Stack>

              <Stack spacing={2}>
                <Stack direction="row" spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Calendar size={16} color="#6B7280" />
                    <Typography variant="body2" color="text.secondary">
                      {group.schedule}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Clock size={16} color="#6B7280" />
                    <Typography variant="body2" color="text.secondary">
                      Ауд. {group.room}
                    </Typography>
                  </Stack>
                </Stack>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Прогресс курса
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {group.lessonsCompleted}/{group.totalLessons} занятий ({group.progress}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={group.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: group.color,
                      },
                    }}
                  />
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Profile2User size={16} color="#6B7280" />
                    <Typography variant="body2" color="text.secondary">
                      {group.studentsCount} студентов
                    </Typography>
                  </Stack>
                  <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
                    {group.students.slice(0, 4).map((student) => (
                      <Avatar key={student.id} sx={{ bgcolor: group.color }}>
                        {student.name.charAt(0)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
