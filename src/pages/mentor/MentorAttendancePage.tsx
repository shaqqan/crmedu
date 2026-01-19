import React, { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from "@mui/material/ButtonBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import {
  Calendar,
  Clock,
  Location,
  Profile2User,
  TickCircle,
  CloseCircle,
  InfoCircle,
  ArrowLeft,
  SearchNormal1,
  Star1,
  More,
  Refresh,
  ArrowRight2,
} from "iconsax-react";
import { useNavigate, useSearchParams } from "react-router";

type AttendanceStatus = "present" | "absent" | "excused" | null;

interface Student {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
}

interface LessonInfo {
  id: string;
  title: string;
  group: string;
  groupId: string;
  room: string;
  time: string;
  date: string;
  color: string;
}

// Mock data - bugungi darslar
const todayLessons: Record<string, LessonInfo> = {
  "1": {
    id: "1",
    title: "English B1",
    group: "Group 1",
    groupId: "1",
    room: "101",
    time: "09:00 - 10:30",
    date: "2026-01-13",
    color: "#1264EB",
  },
  "2": {
    id: "2",
    title: "English A2",
    group: "Group 2",
    groupId: "2",
    room: "102",
    time: "11:00 - 12:30",
    date: "2026-01-13",
    color: "#4CAF50",
  },
  "3": {
    id: "3",
    title: "IELTS Prep",
    group: "Group 5",
    groupId: "3",
    room: "201",
    time: "14:00 - 15:30",
    date: "2026-01-13",
    color: "#FF9800",
  },
};

// Mock data - studentlar
const studentsData: Record<string, Student[]> = {
  "1": [
    { id: "s1", name: "Иван Петров", phone: "+998 90 123 45 67" },
    { id: "s2", name: "Мария Сидорова", phone: "+998 91 234 56 78" },
    { id: "s3", name: "Алексей Козлов", phone: "+998 93 345 67 89" },
    { id: "s4", name: "Анна Морозова", phone: "+998 94 456 78 90" },
    { id: "s5", name: "Дмитрий Волков", phone: "+998 95 567 89 01" },
    { id: "s6", name: "Елена Новикова", phone: "+998 90 678 90 12" },
    { id: "s7", name: "Сергей Федоров", phone: "+998 91 789 01 23" },
    { id: "s8", name: "Ольга Михайлова", phone: "+998 93 890 12 34" },
    { id: "s9", name: "Артем Соколов", phone: "+998 94 901 23 45" },
    { id: "s10", name: "Наталья Павлова", phone: "+998 95 012 34 56" },
    { id: "s11", name: "Максим Егоров", phone: "+998 90 123 45 67" },
    { id: "s12", name: "Виктория Орлова", phone: "+998 91 234 56 78" },
    { id: "s13", name: "Андрей Киселев", phone: "+998 93 345 67 89" },
    { id: "s14", name: "Татьяна Макарова", phone: "+998 94 456 78 90" },
    { id: "s15", name: "Роман Зайцев", phone: "+998 95 567 89 01" },
  ],
  "2": [
    { id: "s16", name: "Камилла Ахмедова", phone: "+998 90 111 22 33" },
    { id: "s17", name: "Бобур Каримов", phone: "+998 91 222 33 44" },
    { id: "s18", name: "Нигора Рахимова", phone: "+998 93 333 44 55" },
    { id: "s19", name: "Жасур Усманов", phone: "+998 94 444 55 66" },
    { id: "s20", name: "Дилноза Шарипова", phone: "+998 95 555 66 77" },
    { id: "s21", name: "Азиз Норматов", phone: "+998 90 666 77 88" },
    { id: "s22", name: "Мадина Турсунова", phone: "+998 91 777 88 99" },
    { id: "s23", name: "Шохрух Исмаилов", phone: "+998 93 888 99 00" },
    { id: "s24", name: "Гулнора Бекмуратова", phone: "+998 94 999 00 11" },
    { id: "s25", name: "Фаррух Хамидов", phone: "+998 95 000 11 22" },
    { id: "s26", name: "Севара Юлдашева", phone: "+998 90 111 22 33" },
    { id: "s27", name: "Улугбек Содиков", phone: "+998 91 222 33 44" },
  ],
  "3": [
    { id: "s28", name: "Алишер Мирзаев", phone: "+998 90 333 44 55" },
    { id: "s29", name: "Зарина Холматова", phone: "+998 91 444 55 66" },
    { id: "s30", name: "Давронбек Тошпулатов", phone: "+998 93 555 66 77" },
    { id: "s31", name: "Малика Абдуллаева", phone: "+998 94 666 77 88" },
    { id: "s32", name: "Сардор Рустамов", phone: "+998 95 777 88 99" },
    { id: "s33", name: "Нозима Кадырова", phone: "+998 90 888 99 00" },
    { id: "s34", name: "Ботир Эргашев", phone: "+998 91 999 00 11" },
    { id: "s35", name: "Лола Назарова", phone: "+998 93 000 11 22" },
  ],
};

export const MentorAttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lesson") || "1";

  const lesson = todayLessons[lessonId];
  const students = studentsData[lessonId] || [];

  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [bulkMenuAnchor, setBulkMenuAnchor] = useState<null | HTMLElement>(null);

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    return students.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const handleAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  const handleBulkAction = (status: AttendanceStatus) => {
    const newAttendance: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      newAttendance[s.id] = status;
    });
    setAttendance(newAttendance);
    setBulkMenuAnchor(null);
    setSnackbar({
      open: true,
      message: status === "present"
        ? "Barcha talabalar 'Keldi' deb belgilandi"
        : status === "absent"
        ? "Barcha talabalar 'Kelmadi' deb belgilandi"
        : "Barcha belgilar tozalandi",
      severity: "success",
    });
  };

  const handleClearAll = () => {
    setAttendance({});
    setBulkMenuAnchor(null);
    setSnackbar({
      open: true,
      message: "Barcha belgilar tozalandi",
      severity: "success",
    });
  };

  const handleSave = () => {
    const presentCount = Object.values(attendance).filter((s) => s === "present").length;
    const absentCount = Object.values(attendance).filter((s) => s === "absent").length;
    const excusedCount = Object.values(attendance).filter((s) => s === "excused").length;

    setSnackbar({
      open: true,
      message: `Davomat saqlandi! Keldi: ${presentCount}, Kelmadi: ${absentCount}, Sababli: ${excusedCount}`,
      severity: "success",
    });
  };

  const stats = useMemo(() => {
    const present = Object.values(attendance).filter((s) => s === "present").length;
    const absent = Object.values(attendance).filter((s) => s === "absent").length;
    const excused = Object.values(attendance).filter((s) => s === "excused").length;
    const unmarked = students.length - present - absent - excused;
    const progress = Math.round(((students.length - unmarked) / students.length) * 100);
    return { present, absent, excused, unmarked, progress };
  }, [attendance, students.length]);

  if (!lesson) {
    return (
      <Box>
        <Typography>Dars topilmadi</Typography>
        <Button onClick={() => navigate("/mentor/dashboard")}>Orqaga</Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumb Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <ButtonBase onClick={() => navigate("/mentor/dashboard")} sx={{ borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Dashboard
          </Typography>
        </ButtonBase>
        <ArrowRight2 size={14} color="#9CA3AF" />
        <ButtonBase onClick={() => navigate(`/mentor/groups/${lesson.groupId}`)} sx={{ borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {lesson.group}
          </Typography>
        </ButtonBase>
        <ArrowRight2 size={14} color="#9CA3AF" />
        <Typography variant="body2" color="primary" fontWeight={500}>
          Davomat
        </Typography>
      </Stack>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "#F9FAFB" }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Davomat olish
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lesson.title} - {lesson.group}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Star1 size={18} />}
            onClick={() => navigate(`/mentor/grading?lesson=${lessonId}`)}
            sx={{ textTransform: "none" }}
          >
            Baholashga o'tish
          </Button>
        </Stack>
      </Stack>

      {/* Lesson Info Card */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3, borderLeft: `4px solid ${lesson.color}` }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ md: "center" }} justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${lesson.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Calendar size={24} color={lesson.color} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {lesson.title}
              </Typography>
              <Stack direction="row" spacing={2} mt={0.5}>
                <Chip
                  label={lesson.group}
                  size="small"
                  sx={{ bgcolor: `${lesson.color}20`, color: lesson.color, fontWeight: 500 }}
                />
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Clock size={14} color="#6B7280" />
                  <Typography variant="caption" color="text.secondary">{lesson.time}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Location size={14} color="#6B7280" />
                  <Typography variant="caption" color="text.secondary">Aud. {lesson.room}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight={700} color="primary">
                {students.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">talaba</Typography>
            </Box>
            <Box sx={{ width: 120 }}>
              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <Typography variant="caption" fontWeight={600}>{stats.progress}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={stats.progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(0,0,0,0.08)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    bgcolor: stats.progress === 100 ? "#4CAF50" : "#1264EB",
                  },
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            flex: 1,
            bgcolor: "rgba(76, 175, 80, 0.1)",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)" },
          }}
          onClick={() => handleBulkAction("present")}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <TickCircle size={24} color="#4CAF50" variant="Bold" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#4CAF50">
                {stats.present}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Keldi
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            flex: 1,
            bgcolor: "rgba(244, 67, 54, 0.1)",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(244, 67, 54, 0.2)" },
          }}
          onClick={() => handleBulkAction("absent")}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <CloseCircle size={24} color="#F44336" variant="Bold" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#F44336">
                {stats.absent}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Kelmadi
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InfoCircle size={24} color="#FF9800" variant="Bold" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#FF9800">
                {stats.excused}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sababli
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Profile2User size={24} color="#6B7280" />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {stats.unmarked}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Belgilanmagan
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Search & Students List */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Talabalar ro'yxati
          </Typography>
          <Stack direction="row" spacing={2}>
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
            <Tooltip title="Bulk amallar">
              <IconButton
                onClick={(e) => setBulkMenuAnchor(e.currentTarget)}
                sx={{ bgcolor: "#F9FAFB" }}
              >
                <More size={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Bulk Actions Menu */}
        <Menu
          anchorEl={bulkMenuAnchor}
          open={Boolean(bulkMenuAnchor)}
          onClose={() => setBulkMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleBulkAction("present")}>
            <ListItemIcon>
              <TickCircle size={18} color="#4CAF50" />
            </ListItemIcon>
            Barchasini "Keldi" deb belgilash
          </MenuItem>
          <MenuItem onClick={() => handleBulkAction("absent")}>
            <ListItemIcon>
              <CloseCircle size={18} color="#F44336" />
            </ListItemIcon>
            Barchasini "Kelmadi" deb belgilash
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClearAll}>
            <ListItemIcon>
              <Refresh size={18} color="#6B7280" />
            </ListItemIcon>
            Barcha belgilarni tozalash
          </MenuItem>
        </Menu>

        <Stack spacing={1}>
          {filteredStudents.map((student, index) => {
            const status = attendance[student.id];
            return (
              <Stack
                key={student.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: status === "present"
                    ? "rgba(76, 175, 80, 0.08)"
                    : status === "absent"
                    ? "rgba(244, 67, 54, 0.08)"
                    : status === "excused"
                    ? "rgba(255, 152, 0, 0.08)"
                    : "#F9FAFB",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: status === "present"
                      ? "rgba(76, 175, 80, 0.12)"
                      : status === "absent"
                      ? "rgba(244, 67, 54, 0.12)"
                      : status === "excused"
                      ? "rgba(255, 152, 0, 0.12)"
                      : "#F3F4F6",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minWidth: 30, fontWeight: 500 }}
                >
                  {index + 1}
                </Typography>
                <Avatar sx={{ bgcolor: lesson.color, width: 40, height: 40 }}>
                  {student.name.split(" ").map((n) => n[0]).join("")}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight={500}>
                    {student.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {student.phone}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Keldi (1)" placement="top">
                    <Button
                      variant={status === "present" ? "contained" : "outlined"}
                      color="success"
                      size="small"
                      onClick={() => handleAttendance(student.id, "present")}
                      sx={{
                        minWidth: 44,
                        px: 1.5,
                        textTransform: "none",
                        ...(status !== "present" && {
                          borderColor: "#E5E7EB",
                          color: "#6B7280",
                        }),
                      }}
                    >
                      <TickCircle size={18} color={status === "present" ? "#fff" : "#22C55E"} />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Kelmadi (2)" placement="top">
                    <Button
                      variant={status === "absent" ? "contained" : "outlined"}
                      color="error"
                      size="small"
                      onClick={() => handleAttendance(student.id, "absent")}
                      sx={{
                        minWidth: 44,
                        px: 1.5,
                        textTransform: "none",
                        ...(status !== "absent" && {
                          borderColor: "#E5E7EB",
                          color: "#6B7280",
                        }),
                      }}
                    >
                      <CloseCircle size={18} color={status === "absent" ? "#fff" : "#EF4444"} />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Sababli (3)" placement="top">
                    <Button
                      variant={status === "excused" ? "contained" : "outlined"}
                      color="warning"
                      size="small"
                      onClick={() => handleAttendance(student.id, "excused")}
                      sx={{
                        minWidth: 44,
                        px: 1.5,
                        textTransform: "none",
                        ...(status !== "excused" && {
                          borderColor: "#E5E7EB",
                          color: "#6B7280",
                        }),
                      }}
                    >
                      <InfoCircle size={18} color={status === "excused" ? "#fff" : "#F59E0B"} />
                    </Button>
                  </Tooltip>
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        {/* Save Button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body2" color="text.secondary">
            {stats.unmarked > 0
              ? `${stats.unmarked} ta talaba belgilanmagan`
              : "Barcha talabalar belgilangan"}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/mentor/grading?lesson=${lessonId}`)}
              startIcon={<Star1 size={18} />}
              sx={{ textTransform: "none" }}
            >
              Baholashga o'tish
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={stats.unmarked === students.length}
              sx={{ minWidth: 160 }}
            >
              Saqlash
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
