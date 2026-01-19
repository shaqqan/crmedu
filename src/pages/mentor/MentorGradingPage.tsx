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
import {
  Calendar,
  Clock,
  Location,
  Profile2User,
  ArrowLeft,
  SearchNormal1,
  Star1,
} from "iconsax-react";
import { useNavigate, useSearchParams } from "react-router";

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
    room: "101",
    time: "09:00 - 10:30",
    date: "2026-01-13",
    color: "#1264EB",
  },
  "2": {
    id: "2",
    title: "English A2",
    group: "Group 2",
    room: "102",
    time: "11:00 - 12:30",
    date: "2026-01-13",
    color: "#4CAF50",
  },
  "3": {
    id: "3",
    title: "IELTS Prep",
    group: "Group 5",
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

const gradeColors: Record<number, string> = {
  1: "#EF4444",
  2: "#F97316",
  3: "#EAB308",
  4: "#22C55E",
  5: "#10B981",
};

export const MentorGradingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lesson") || "1";

  const lesson = todayLessons[lessonId];
  const students = studentsData[lessonId] || [];

  const [grades, setGrades] = useState<Record<string, number | null>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    return students.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const handleGrade = (studentId: string, grade: number) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === grade ? null : grade,
    }));
  };

  const handleSave = () => {
    const gradedCount = Object.values(grades).filter((g) => g !== null).length;

    setSnackbar({
      open: true,
      message: `Baholar saqlandi! Baholangan: ${gradedCount} ta talaba`,
      severity: "success",
    });
  };

  const stats = useMemo(() => {
    const graded = Object.values(grades).filter((g) => g !== null).length;
    const ungraded = students.length - graded;
    const gradeValues = Object.values(grades).filter((g): g is number => g !== null);
    const avgGrade = gradeValues.length > 0
      ? (gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length).toFixed(1)
      : "-";

    const gradeDistribution = {
      5: gradeValues.filter((g) => g === 5).length,
      4: gradeValues.filter((g) => g === 4).length,
      3: gradeValues.filter((g) => g === 3).length,
      2: gradeValues.filter((g) => g === 2).length,
      1: gradeValues.filter((g) => g === 1).length,
    };

    return { graded, ungraded, avgGrade, gradeDistribution };
  }, [grades, students.length]);

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
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate("/mentor/dashboard")}>
          <ArrowLeft size={24} />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Baholash
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lesson.title} - {lesson.group}
          </Typography>
        </Box>
      </Stack>

      {/* Lesson Info Card */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3, borderLeft: `4px solid ${lesson.color}` }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ sm: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={1}>
              {lesson.title}
            </Typography>
            <Chip
              label={lesson.group}
              size="small"
              sx={{ bgcolor: `${lesson.color}20`, color: lesson.color, fontWeight: 500 }}
            />
          </Box>
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Calendar size={18} color="#6B7280" />
              <Typography variant="body2">{lesson.date}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Clock size={18} color="#6B7280" />
              <Typography variant="body2">{lesson.time}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Location size={18} color="#6B7280" />
              <Typography variant="body2">Aud. {lesson.room}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Profile2User size={18} color="#6B7280" />
              <Typography variant="body2">{students.length} talaba</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Star1 size={20} color="#1264EB" variant="Bold" />
            <Box>
              <Typography variant="h5" fontWeight={700} color="#1264EB">
                {stats.avgGrade}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                O'rtacha baho
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(16, 185, 129, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Star1 size={20} color="#10B981" />
            <Box>
              <Typography variant="h5" fontWeight={700} color="#10B981">
                {stats.graded}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Baholangan
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Profile2User size={20} color="#6B7280" />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {stats.ungraded}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Baholanmagan
              </Typography>
            </Box>
          </Stack>
        </Paper>
        {/* Grade Distribution */}
        <Paper sx={{ p: 2, borderRadius: 2, flex: 2 }}>
          <Typography variant="caption" color="text.secondary" mb={1} display="block">
            Baholar taqsimoti
          </Typography>
          <Stack direction="row" spacing={1}>
            {[5, 4, 3, 2, 1].map((grade) => (
              <Chip
                key={grade}
                label={`${grade}: ${stats.gradeDistribution[grade as keyof typeof stats.gradeDistribution]}`}
                size="small"
                sx={{
                  bgcolor: `${gradeColors[grade]}20`,
                  color: gradeColors[grade],
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        </Paper>
      </Stack>

      {/* Search & Students List */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Talabalar ro'yxati
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

        <Stack spacing={1}>
          {filteredStudents.map((student, index) => {
            const currentGrade = grades[student.id];
            return (
              <Stack
                key={student.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: currentGrade
                    ? `${gradeColors[currentGrade]}10`
                    : "#F9FAFB",
                  transition: "all 0.2s",
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
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Baho:
                  </Typography>
                  {[1, 2, 3, 4, 5].map((grade) => {
                    const isSelected = currentGrade === grade;
                    return (
                      <IconButton
                        key={grade}
                        size="small"
                        onClick={() => handleGrade(student.id, grade)}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: isSelected ? gradeColors[grade] : "transparent",
                          color: isSelected ? "#fff" : gradeColors[grade],
                          border: "2px solid",
                          borderColor: gradeColors[grade],
                          fontSize: 16,
                          fontWeight: 700,
                          "&:hover": {
                            bgcolor: isSelected ? gradeColors[grade] : `${gradeColors[grade]}20`,
                          },
                        }}
                      >
                        {grade}
                      </IconButton>
                    );
                  })}
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        {/* Save Button */}
        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            disabled={stats.graded === 0}
            sx={{ minWidth: 200 }}
          >
            Saqlash
          </Button>
        </Stack>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
