import React, { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput, EventClickArg } from "@fullcalendar/core";
import {
  Calendar,
  Clock,
  Location,
  Profile2User,
  CloseCircle,
  TickCircle,
  Timer,
} from "iconsax-react";

interface MentorLesson extends EventInput {
  id: string;
  title: string;
  start: string;
  end: string;
  group: string;
  room: string;
  studentsCount: number;
  color: string;
  status: "completed" | "upcoming" | "cancelled";
}

// Mock data for mentor's schedule
const myLessons: MentorLesson[] = [
  // This week
  { id: "1", title: "English B1", start: "2026-01-12T09:00:00", end: "2026-01-12T10:30:00", group: "Group 1", room: "101", studentsCount: 15, color: "#1264EB", status: "upcoming" },
  { id: "2", title: "English A2", start: "2026-01-12T11:00:00", end: "2026-01-12T12:30:00", group: "Group 2", room: "102", studentsCount: 12, color: "#4CAF50", status: "upcoming" },
  { id: "3", title: "IELTS Prep", start: "2026-01-12T14:00:00", end: "2026-01-12T15:30:00", group: "Group 5", room: "201", studentsCount: 8, color: "#FF9800", status: "upcoming" },
  { id: "4", title: "English B2", start: "2026-01-13T16:00:00", end: "2026-01-13T17:30:00", group: "Group 7", room: "104", studentsCount: 10, color: "#E91E63", status: "upcoming" },
  { id: "5", title: "English B1", start: "2026-01-14T09:00:00", end: "2026-01-14T10:30:00", group: "Group 1", room: "101", studentsCount: 15, color: "#1264EB", status: "upcoming" },
  { id: "6", title: "English A2", start: "2026-01-14T11:00:00", end: "2026-01-14T12:30:00", group: "Group 2", room: "102", studentsCount: 12, color: "#4CAF50", status: "upcoming" },
  { id: "7", title: "English B2", start: "2026-01-15T16:00:00", end: "2026-01-15T17:30:00", group: "Group 7", room: "104", studentsCount: 10, color: "#E91E63", status: "upcoming" },
  { id: "8", title: "English B1", start: "2026-01-16T09:00:00", end: "2026-01-16T10:30:00", group: "Group 1", room: "101", studentsCount: 15, color: "#1264EB", status: "upcoming" },
  { id: "9", title: "IELTS Prep", start: "2026-01-16T14:00:00", end: "2026-01-16T15:30:00", group: "Group 5", room: "201", studentsCount: 8, color: "#FF9800", status: "upcoming" },
  { id: "10", title: "English B2", start: "2026-01-17T16:00:00", end: "2026-01-17T17:30:00", group: "Group 7", room: "104", studentsCount: 10, color: "#E91E63", status: "upcoming" },
  // Past lessons
  { id: "11", title: "English B1", start: "2026-01-09T09:00:00", end: "2026-01-09T10:30:00", group: "Group 1", room: "101", studentsCount: 15, color: "#1264EB", status: "completed" },
  { id: "12", title: "English A2", start: "2026-01-09T11:00:00", end: "2026-01-09T12:30:00", group: "Group 2", room: "102", studentsCount: 12, color: "#4CAF50", status: "completed" },
  { id: "13", title: "IELTS Prep", start: "2026-01-10T14:00:00", end: "2026-01-10T15:30:00", group: "Group 5", room: "201", studentsCount: 8, color: "#FF9800", status: "completed" },
];

export const MentorSchedulePage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<MentorLesson | null>(null);

  const calendarEvents = useMemo(() => {
    return myLessons.map((lesson) => ({
      ...lesson,
      backgroundColor: lesson.status === "completed" ? "#9E9E9E" : lesson.color,
      borderColor: lesson.status === "completed" ? "#9E9E9E" : lesson.color,
    }));
  }, []);

  const handleEventClick = (info: EventClickArg) => {
    const lesson = myLessons.find((l) => l.id === info.event.id);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  // Stats for this week
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weekLessons = myLessons.filter((l) => {
    const lessonDate = new Date(l.start);
    return lessonDate >= startOfWeek && lessonDate <= endOfWeek;
  });

  const completedThisWeek = weekLessons.filter((l) => l.status === "completed").length;
  const upcomingThisWeek = weekLessons.filter((l) => l.status === "upcoming").length;
  const totalHoursThisWeek = weekLessons.length * 1.5;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Мое расписание
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Просмотр и управление вашими занятиями
          </Typography>
        </Box>
      </Stack>

      {/* Week Stats */}
      <Stack direction="row" spacing={2} mb={3}>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
              <TickCircle size={20} color="#4CAF50" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {completedThisWeek}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Проведено на этой неделе
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
              <Calendar size={20} color="#1264EB" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {upcomingThisWeek}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Предстоит на этой неделе
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
              <Timer size={20} color="#FF9800" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {totalHoursThisWeek}ч
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Часов на этой неделе
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Calendar */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          locale="ru"
          firstDay={1}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="21:00:00"
          slotDuration="00:30:00"
          events={calendarEvents}
          eventClick={handleEventClick}
          height={600}
          buttonText={{
            today: "Сегодня",
            week: "Неделя",
            day: "День",
          }}
          eventContent={(arg) => (
            <Box sx={{ p: 0.5, overflow: "hidden" }}>
              <Typography variant="caption" fontWeight={600} sx={{ display: "block" }}>
                {arg.event.title}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {arg.event.extendedProps.group}
              </Typography>
            </Box>
          )}
        />
      </Paper>

      {/* Legend */}
      <Stack direction="row" spacing={2} mt={2} justifyContent="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#1264EB" }} />
          <Typography variant="caption">English B1</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#4CAF50" }} />
          <Typography variant="caption">English A2</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#FF9800" }} />
          <Typography variant="caption">IELTS Prep</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#E91E63" }} />
          <Typography variant="caption">English B2</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#9E9E9E" }} />
          <Typography variant="caption">Завершено</Typography>
        </Stack>
      </Stack>

      {/* Lesson Details Dialog */}
      <Dialog
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        maxWidth="xs"
        fullWidth
      >
        {selectedLesson && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                  {selectedLesson.title}
                </Typography>
                <IconButton onClick={() => setSelectedLesson(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <Chip
                  label={selectedLesson.group}
                  sx={{
                    bgcolor: `${selectedLesson.color}20`,
                    color: selectedLesson.color,
                    fontWeight: 500,
                    alignSelf: "flex-start",
                  }}
                />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Calendar size={18} color="#6B7280" />
                  <Typography variant="body2">
                    {new Date(selectedLesson.start).toLocaleDateString("ru-RU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Clock size={18} color="#6B7280" />
                  <Typography variant="body2">
                    {new Date(selectedLesson.start).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(selectedLesson.end).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Location size={18} color="#6B7280" />
                  <Typography variant="body2">Аудитория {selectedLesson.room}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Profile2User size={18} color="#6B7280" />
                  <Typography variant="body2">
                    {selectedLesson.studentsCount} студентов
                  </Typography>
                </Stack>

                <Chip
                  label={
                    selectedLesson.status === "completed"
                      ? "Завершено"
                      : selectedLesson.status === "upcoming"
                      ? "Предстоит"
                      : "Отменено"
                  }
                  color={
                    selectedLesson.status === "completed"
                      ? "success"
                      : selectedLesson.status === "upcoming"
                      ? "primary"
                      : "error"
                  }
                  sx={{ alignSelf: "flex-start" }}
                />

                {selectedLesson.status === "upcoming" && (
                  <Button variant="contained" fullWidth>
                    Начать занятие
                  </Button>
                )}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
