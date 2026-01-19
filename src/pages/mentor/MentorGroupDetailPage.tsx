import React, { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {
  Category,
  Calendar,
  Clock,
  Profile2User,
  ArrowLeft,
  TickCircle,
  CloseCircle,
  Star1,
  SearchNormal1,
  Location,
  Book1,
  Chart,
  InfoCircle,
} from "iconsax-react";
import { useNavigate, useParams } from "react-router";

interface GroupStudent {
  id: string;
  name: string;
  phone: string;
  attendance: number;
  avgScore: number;
  status: "active" | "frozen" | "completed";
  lastAttendance: string;
  grades: number[];
}

interface GroupLesson {
  id: string;
  date: string;
  time: string;
  topic: string;
  status: "completed" | "upcoming" | "cancelled";
  attendance: number;
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
  description: string;
  students: GroupStudent[];
  lessons: GroupLesson[];
}

// Mock data
const groupsData: Record<string, MentorGroup> = {
  "1": {
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
    description: "Intermediate English course focusing on communication skills and grammar",
    students: [
      { id: "s1", name: "Иван Петров", phone: "+998 90 123 45 67", attendance: 95, avgScore: 4.2, status: "active", lastAttendance: "2026-01-13", grades: [5, 4, 4, 5, 4] },
      { id: "s2", name: "Мария Сидорова", phone: "+998 91 234 56 78", attendance: 88, avgScore: 4.6, status: "active", lastAttendance: "2026-01-13", grades: [5, 5, 4, 5, 4] },
      { id: "s3", name: "Алексей Козлов", phone: "+998 93 345 67 89", attendance: 100, avgScore: 3.8, status: "active", lastAttendance: "2026-01-13", grades: [4, 4, 3, 4, 4] },
      { id: "s4", name: "Анна Морозова", phone: "+998 94 456 78 90", attendance: 75, avgScore: 4.0, status: "frozen", lastAttendance: "2026-01-10", grades: [4, 4, 4, 4, 4] },
      { id: "s5", name: "Дмитрий Волков", phone: "+998 95 567 89 01", attendance: 92, avgScore: 4.4, status: "active", lastAttendance: "2026-01-13", grades: [5, 4, 4, 5, 4] },
      { id: "s6", name: "Елена Новикова", phone: "+998 90 678 90 12", attendance: 98, avgScore: 4.8, status: "active", lastAttendance: "2026-01-13", grades: [5, 5, 5, 4, 5] },
      { id: "s7", name: "Сергей Федоров", phone: "+998 91 789 01 23", attendance: 85, avgScore: 3.6, status: "active", lastAttendance: "2026-01-13", grades: [4, 3, 4, 3, 4] },
      { id: "s8", name: "Ольга Михайлова", phone: "+998 93 890 12 34", attendance: 90, avgScore: 4.2, status: "active", lastAttendance: "2026-01-13", grades: [4, 4, 5, 4, 4] },
    ],
    lessons: [
      { id: "l1", date: "2026-01-13", time: "09:00 - 10:30", topic: "Present Perfect Continuous", status: "completed", attendance: 14 },
      { id: "l2", date: "2026-01-15", time: "09:00 - 10:30", topic: "Passive Voice", status: "upcoming", attendance: 0 },
      { id: "l3", date: "2026-01-17", time: "09:00 - 10:30", topic: "Reported Speech", status: "upcoming", attendance: 0 },
      { id: "l4", date: "2026-01-10", time: "09:00 - 10:30", topic: "Conditionals", status: "completed", attendance: 13 },
      { id: "l5", date: "2026-01-08", time: "09:00 - 10:30", topic: "Modal Verbs", status: "completed", attendance: 15 },
    ],
  },
  "2": {
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
    description: "Elementary English course for beginners",
    students: [
      { id: "s9", name: "Камилла Ахмедова", phone: "+998 90 111 22 33", attendance: 98, avgScore: 4.8, status: "active", lastAttendance: "2026-01-14", grades: [5, 5, 5, 4, 5] },
      { id: "s10", name: "Бобур Каримов", phone: "+998 91 222 33 44", attendance: 85, avgScore: 3.6, status: "active", lastAttendance: "2026-01-14", grades: [4, 3, 4, 3, 4] },
      { id: "s11", name: "Нигора Рахимова", phone: "+998 93 333 44 55", attendance: 90, avgScore: 4.4, status: "active", lastAttendance: "2026-01-14", grades: [5, 4, 4, 5, 4] },
    ],
    lessons: [
      { id: "l6", date: "2026-01-14", time: "11:00 - 12:30", topic: "Present Simple", status: "completed", attendance: 11 },
      { id: "l7", date: "2026-01-16", time: "11:00 - 12:30", topic: "Present Continuous", status: "upcoming", attendance: 0 },
    ],
  },
  "3": {
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
    description: "IELTS preparation course targeting band 7+",
    students: [
      { id: "s12", name: "Алишер Мирзаев", phone: "+998 90 333 44 55", attendance: 100, avgScore: 4.6, status: "active", lastAttendance: "2026-01-13", grades: [5, 5, 4, 5, 4] },
      { id: "s13", name: "Зарина Холматова", phone: "+998 91 444 55 66", attendance: 95, avgScore: 4.4, status: "active", lastAttendance: "2026-01-13", grades: [4, 5, 4, 5, 4] },
    ],
    lessons: [
      { id: "l8", date: "2026-01-13", time: "14:00 - 15:30", topic: "Writing Task 2", status: "completed", attendance: 8 },
      { id: "l9", date: "2026-01-15", time: "14:00 - 15:30", topic: "Speaking Part 2", status: "upcoming", attendance: 0 },
    ],
  },
  "4": {
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
    description: "Upper-Intermediate English focusing on fluency and academic skills",
    students: [
      { id: "s14", name: "Виктор Лебедев", phone: "+998 90 555 66 77", attendance: 92, avgScore: 4.2, status: "active", lastAttendance: "2026-01-14", grades: [4, 4, 5, 4, 4] },
      { id: "s15", name: "Татьяна Орлова", phone: "+998 91 666 77 88", attendance: 88, avgScore: 4.6, status: "active", lastAttendance: "2026-01-14", grades: [5, 5, 4, 5, 4] },
    ],
    lessons: [
      { id: "l10", date: "2026-01-14", time: "16:00 - 17:30", topic: "Advanced Grammar Review", status: "completed", attendance: 9 },
      { id: "l11", date: "2026-01-16", time: "16:00 - 17:30", topic: "Final Exam Prep", status: "upcoming", attendance: 0 },
    ],
  },
};

export const MentorGroupDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const group = groupId ? groupsData[groupId] : null;

  const filteredStudents = useMemo(() => {
    if (!group) return [];
    if (!searchQuery) return group.students;
    return group.students.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [group, searchQuery]);

  const stats = useMemo(() => {
    if (!group) return null;
    const activeStudents = group.students.filter((s) => s.status === "active").length;
    const frozenStudents = group.students.filter((s) => s.status === "frozen").length;
    const avgAttendance = Math.round(
      group.students.reduce((acc, s) => acc + s.attendance, 0) / group.students.length
    );
    const avgScore = (
      group.students.reduce((acc, s) => acc + s.avgScore, 0) / group.students.length
    ).toFixed(1);
    return { activeStudents, frozenStudents, avgAttendance, avgScore };
  }, [group]);

  if (!group) {
    return (
      <Box>
        <Typography>Guruh topilmadi</Typography>
        <Button onClick={() => navigate("/mentor/groups")}>Orqaga</Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate("/mentor/groups")}>
          <ArrowLeft size={24} />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            {group.course} {group.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {group.name} • {group.schedule}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<TickCircle size={18} color="#4CAF50" />}
            onClick={() => navigate(`/mentor/attendance?lesson=1`)}
            sx={{ textTransform: "none" }}
          >
            Davomat olish
          </Button>
          <Button
            variant="contained"
            startIcon={<Star1 size={18} />}
            onClick={() => navigate(`/mentor/grading?lesson=1`)}
            sx={{ textTransform: "none" }}
          >
            Baholash
          </Button>
        </Stack>
      </Stack>

      {/* Group Info Card */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3, borderLeft: `4px solid ${group.color}` }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: `${group.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Category size={28} color={group.color} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} mb={0.5}>
                  {group.course} {group.level} - {group.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {group.description}
                </Typography>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Calendar size={18} color="#6B7280" />
                    <Typography variant="body2">{group.schedule}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Location size={18} color="#6B7280" />
                    <Typography variant="body2">Aud. {group.room}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Profile2User size={18} color="#6B7280" />
                    <Typography variant="body2">{group.studentsCount} talaba</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Clock size={18} color="#6B7280" />
                    <Typography variant="body2">
                      {group.startDate} - {group.endDate}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Kurs progressi
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {group.lessonsCompleted}/{group.totalLessons} dars ({group.progress}%)
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={group.progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "rgba(0,0,0,0.08)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    bgcolor: group.color,
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Profile2User size={20} color="#4CAF50" />
              <Box>
                <Typography variant="h5" fontWeight={700} color="#4CAF50">
                  {stats?.activeStudents}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Faol talabalar
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <InfoCircle size={20} color="#FF9800" />
              <Box>
                <Typography variant="h5" fontWeight={700} color="#FF9800">
                  {stats?.frozenStudents}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Muzlatilgan
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chart size={20} color="#1264EB" />
              <Box>
                <Typography variant="h5" fontWeight={700} color="#1264EB">
                  {stats?.avgAttendance}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  O'rtacha davomat
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(233, 30, 99, 0.1)" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Star1 size={20} color="#E91E63" />
              <Box>
                <Typography variant="h5" fontWeight={700} color="#E91E63">
                  {stats?.avgScore}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  O'rtacha baho
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}
        >
          <Tab label="Talabalar" icon={<Profile2User size={18} />} iconPosition="start" />
          <Tab label="Darslar" icon={<Book1 size={18} />} iconPosition="start" />
        </Tabs>

        {/* Students Tab */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Talabalar ro'yxati ({group.students.length})
              </Typography>
              <TextField
                size="small"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchNormal1 size={18} color="#9CA3AF" style={{ marginRight: 8 }} />,
                }}
                sx={{ width: 250 }}
              />
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Talaba</TableCell>
                    <TableCell>Telefon</TableCell>
                    <TableCell align="center">Davomat</TableCell>
                    <TableCell align="center">O'rtacha baho</TableCell>
                    <TableCell align="center">Oxirgi baholar</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: group.color, width: 36, height: 36 }}>
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {student.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {student.phone}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={`${student.attendance}%`}
                          color={student.attendance >= 90 ? "success" : student.attendance >= 75 ? "warning" : "error"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight={600}>
                          {student.avgScore}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          {student.grades.slice(-5).map((grade, i) => (
                            <Chip
                              key={i}
                              size="small"
                              label={grade}
                              sx={{
                                minWidth: 28,
                                bgcolor: grade >= 4 ? "rgba(76, 175, 80, 0.2)" : grade >= 3 ? "rgba(255, 152, 0, 0.2)" : "rgba(244, 67, 54, 0.2)",
                                color: grade >= 4 ? "#4CAF50" : grade >= 3 ? "#FF9800" : "#F44336",
                                fontWeight: 600,
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={student.status === "active" ? "Faol" : student.status === "frozen" ? "Muzlatilgan" : "Tugatgan"}
                          color={student.status === "active" ? "success" : student.status === "frozen" ? "warning" : "default"}
                          icon={student.status === "active" ? <TickCircle size={14} /> : <CloseCircle size={14} />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Lessons Tab */}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Darslar tarixi
            </Typography>
            <Stack spacing={2}>
              {group.lessons.map((lesson) => (
                <Stack
                  key={lesson.id}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: lesson.status === "completed" ? "rgba(76, 175, 80, 0.08)" : lesson.status === "upcoming" ? "#F9FAFB" : "rgba(244, 67, 54, 0.08)",
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 50,
                      borderRadius: 1,
                      bgcolor: lesson.status === "completed" ? "#4CAF50" : lesson.status === "upcoming" ? "#1264EB" : "#F44336",
                    }}
                  />
                  <Stack sx={{ minWidth: 120 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {lesson.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.time}
                    </Typography>
                  </Stack>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={500}>
                      {lesson.topic}
                    </Typography>
                    {lesson.status === "completed" && (
                      <Typography variant="caption" color="text.secondary">
                        Davomat: {lesson.attendance}/{group.studentsCount} talaba
                      </Typography>
                    )}
                  </Box>
                  <Chip
                    size="small"
                    label={lesson.status === "completed" ? "O'tkazildi" : lesson.status === "upcoming" ? "Kutilmoqda" : "Bekor qilindi"}
                    color={lesson.status === "completed" ? "success" : lesson.status === "upcoming" ? "primary" : "error"}
                    variant={lesson.status === "upcoming" ? "outlined" : "filled"}
                  />
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
