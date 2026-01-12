import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput, EventClickArg, DateSelectArg, EventDropArg } from "@fullcalendar/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import { CloseCircle, Add, Edit2, Trash } from "iconsax-react";

// Groups data
const groups = [
  { id: "1", name: "English B1 - Group 1", color: "#1264EB" },
  { id: "2", name: "English A2 - Group 2", color: "#4CAF50" },
  { id: "3", name: "Korean A1 - Group 3", color: "#FF9800" },
  { id: "4", name: "German A1 - Group 4", color: "#9C27B0" },
  { id: "5", name: "IELTS Prep - Group 5", color: "#E91E63" },
  { id: "6", name: "French A1 - Group 6", color: "#00BCD4" },
  { id: "7", name: "Spanish A2 - Group 7", color: "#FF5722" },
];

// Teachers data
const teachers = [
  { id: "1", name: "Алексей Иванов" },
  { id: "2", name: "Мария Петрова" },
  { id: "3", name: "Сергей Сидоров" },
  { id: "4", name: "Анна Козлова" },
  { id: "5", name: "Дмитрий Морозов" },
];

// Days of week for recurring
const daysOfWeek = [
  { value: 1, label: "Пн" },
  { value: 2, label: "Вт" },
  { value: 3, label: "Ср" },
  { value: 4, label: "Чт" },
  { value: 5, label: "Пт" },
  { value: 6, label: "Сб" },
  { value: 0, label: "Вс" },
];

// Extended event interface
interface ScheduleEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end: string;
  groupId: string;
  teacherId: string;
  color: string;
  isRecurring?: boolean;
  recurringDays?: number[];
  room?: string;
}

// Initial mock events with time
const initialEvents: ScheduleEvent[] = [
  { id: "1", title: "English B1 - Group 1", start: "2026-01-06T09:00:00", end: "2026-01-06T10:30:00", groupId: "1", teacherId: "1", color: "#1264EB", room: "101" },
  { id: "2", title: "English A2 - Group 2", start: "2026-01-06T10:30:00", end: "2026-01-06T12:00:00", groupId: "2", teacherId: "2", color: "#4CAF50", room: "102" },
  { id: "3", title: "Korean A1 - Group 3", start: "2026-01-06T14:00:00", end: "2026-01-06T15:30:00", groupId: "3", teacherId: "3", color: "#FF9800", room: "103" },
  { id: "4", title: "IELTS Prep - Group 5", start: "2026-01-06T16:00:00", end: "2026-01-06T18:00:00", groupId: "5", teacherId: "4", color: "#E91E63", room: "201" },
  { id: "5", title: "English B1 - Group 1", start: "2026-01-07T09:00:00", end: "2026-01-07T10:30:00", groupId: "1", teacherId: "1", color: "#1264EB", room: "101" },
  { id: "6", title: "English A2 - Group 2", start: "2026-01-07T10:30:00", end: "2026-01-07T12:00:00", groupId: "2", teacherId: "2", color: "#4CAF50", room: "102" },
  { id: "7", title: "German A1 - Group 4", start: "2026-01-08T09:00:00", end: "2026-01-08T10:30:00", groupId: "4", teacherId: "5", color: "#9C27B0", room: "104" },
  { id: "8", title: "Korean A1 - Group 3", start: "2026-01-08T14:00:00", end: "2026-01-08T15:30:00", groupId: "3", teacherId: "3", color: "#FF9800", room: "103" },
  { id: "9", title: "English B1 - Group 1", start: "2026-01-09T09:00:00", end: "2026-01-09T10:30:00", groupId: "1", teacherId: "1", color: "#1264EB", room: "101" },
  { id: "10", title: "French A1 - Group 6", start: "2026-01-09T11:00:00", end: "2026-01-09T12:30:00", groupId: "6", teacherId: "2", color: "#00BCD4", room: "105" },
  { id: "11", title: "Spanish A2 - Group 7", start: "2026-01-10T10:00:00", end: "2026-01-10T11:30:00", groupId: "7", teacherId: "4", color: "#FF5722", room: "106" },
  { id: "12", title: "IELTS Prep - Group 5", start: "2026-01-10T16:00:00", end: "2026-01-10T18:00:00", groupId: "5", teacherId: "4", color: "#E91E63", room: "201" },
  { id: "13", title: "English B1 - Group 1", start: "2026-01-13T09:00:00", end: "2026-01-13T10:30:00", groupId: "1", teacherId: "1", color: "#1264EB", room: "101" },
  { id: "14", title: "English A2 - Group 2", start: "2026-01-13T10:30:00", end: "2026-01-13T12:00:00", groupId: "2", teacherId: "2", color: "#4CAF50", room: "102" },
  { id: "15", title: "Korean A1 - Group 3", start: "2026-01-14T14:00:00", end: "2026-01-14T15:30:00", groupId: "3", teacherId: "3", color: "#FF9800", room: "103" },
];

interface EventFormData {
  id?: string;
  groupId: string;
  teacherId: string;
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  room: string;
  isRecurring: boolean;
  recurringDays: number[];
}

const initialFormData: EventFormData = {
  groupId: "",
  teacherId: "",
  date: null,
  startTime: dayjs().hour(9).minute(0),
  endTime: dayjs().hour(10).minute(30),
  room: "",
  isRecurring: false,
  recurringDays: [],
};

export const SchedulePage: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Filter states
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    let result = events;

    // Date range filter
    if (startDate || endDate) {
      result = result.filter((event) => {
        if (!event.start) return false;
        const eventDate = dayjs(event.start as string);

        if (startDate && endDate) {
          return eventDate.isAfter(startDate.subtract(1, "day")) && eventDate.isBefore(endDate.add(1, "day"));
        }
        if (startDate) {
          return eventDate.isAfter(startDate.subtract(1, "day"));
        }
        if (endDate) {
          return eventDate.isBefore(endDate.add(1, "day"));
        }
        return true;
      });
    }

    // Group filter
    if (selectedGroup) {
      result = result.filter((event) => event.groupId === selectedGroup);
    }

    // Teacher filter
    if (selectedTeacher) {
      result = result.filter((event) => event.teacherId === selectedTeacher);
    }

    return result;
  }, [events, startDate, endDate, selectedGroup, selectedTeacher]);

  // Clear all filters
  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedGroup("");
    setSelectedTeacher("");
  };

  // Open add dialog
  const handleAddClick = () => {
    setFormData(initialFormData);
    setAddDialogOpen(true);
  };

  // Date click - quick add
  const handleDateClick = useCallback((arg: DateSelectArg) => {
    setFormData({
      ...initialFormData,
      date: dayjs(arg.start),
      startTime: dayjs(arg.start),
      endTime: dayjs(arg.end || arg.start).add(1.5, "hour"),
    });
    setAddDialogOpen(true);
  }, []);

  // Event click - view event
  const handleEventClick = useCallback((arg: EventClickArg) => {
    const event = events.find((e) => e.id === arg.event.id);
    if (event) {
      setSelectedEvent(event);
      setViewDialogOpen(true);
    }
  }, [events]);

  // Event drop - drag & drop
  const handleEventDrop = useCallback((arg: EventDropArg) => {
    const { event } = arg;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              start: event.start?.toISOString() || e.start,
              end: event.end?.toISOString() || e.end,
            }
          : e
      )
    );
  }, []);

  // Event resize
  const handleEventResize = useCallback((arg: { event: EventClickArg["event"] }) => {
    const { event } = arg;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              start: event.start?.toISOString() || e.start,
              end: event.end?.toISOString() || e.end,
            }
          : e
      )
    );
  }, []);

  // Close dialogs
  const handleDialogClose = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setViewDialogOpen(false);
    setDeleteDialogOpen(false);
    setFormData(initialFormData);
    setSelectedEvent(null);
  };

  // Open edit from view
  const handleEditFromView = () => {
    if (!selectedEvent) return;

    setFormData({
      id: selectedEvent.id,
      groupId: selectedEvent.groupId,
      teacherId: selectedEvent.teacherId,
      date: dayjs(selectedEvent.start),
      startTime: dayjs(selectedEvent.start),
      endTime: dayjs(selectedEvent.end),
      room: selectedEvent.room || "",
      isRecurring: selectedEvent.isRecurring || false,
      recurringDays: selectedEvent.recurringDays || [],
    });
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Open delete from view
  const handleDeleteFromView = () => {
    setViewDialogOpen(false);
    setDeleteDialogOpen(true);
  };

  // Save new event
  const handleSave = () => {
    if (!formData.groupId || !formData.teacherId || !formData.date || !formData.startTime || !formData.endTime) return;

    const group = groups.find((g) => g.id === formData.groupId);
    if (!group) return;

    const baseDate = formData.date.format("YYYY-MM-DD");
    const startTime = formData.startTime.format("HH:mm:ss");
    const endTime = formData.endTime.format("HH:mm:ss");

    if (formData.isRecurring && formData.recurringDays.length > 0) {
      // Create recurring events for next 4 weeks
      const newEvents: ScheduleEvent[] = [];
      for (let week = 0; week < 4; week++) {
        formData.recurringDays.forEach((day) => {
          const eventDate = formData.date!.day(day).add(week, "week");
          if (eventDate.isBefore(formData.date!, "day")) {
            return;
          }
          newEvents.push({
            id: `${Date.now()}-${week}-${day}`,
            title: group.name,
            start: `${eventDate.format("YYYY-MM-DD")}T${startTime}`,
            end: `${eventDate.format("YYYY-MM-DD")}T${endTime}`,
            groupId: formData.groupId,
            teacherId: formData.teacherId,
            color: group.color,
            room: formData.room,
            isRecurring: true,
            recurringDays: formData.recurringDays,
          });
        });
      }
      setEvents((prev) => [...prev, ...newEvents]);
    } else {
      const newEvent: ScheduleEvent = {
        id: String(Date.now()),
        title: group.name,
        start: `${baseDate}T${startTime}`,
        end: `${baseDate}T${endTime}`,
        groupId: formData.groupId,
        teacherId: formData.teacherId,
        color: group.color,
        room: formData.room,
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    handleDialogClose();
  };

  // Update event
  const handleUpdate = () => {
    if (!formData.id || !formData.groupId || !formData.teacherId || !formData.date || !formData.startTime || !formData.endTime) return;

    const group = groups.find((g) => g.id === formData.groupId);
    if (!group) return;

    const baseDate = formData.date.format("YYYY-MM-DD");
    const startTime = formData.startTime.format("HH:mm:ss");
    const endTime = formData.endTime.format("HH:mm:ss");

    setEvents((prev) =>
      prev.map((e) =>
        e.id === formData.id
          ? {
              ...e,
              title: group.name,
              start: `${baseDate}T${startTime}`,
              end: `${baseDate}T${endTime}`,
              groupId: formData.groupId,
              teacherId: formData.teacherId,
              color: group.color,
              room: formData.room,
            }
          : e
      )
    );

    handleDialogClose();
  };

  // Delete event
  const handleDelete = () => {
    if (!selectedEvent) return;
    setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
    handleDialogClose();
  };

  // Toggle recurring day
  const toggleRecurringDay = (day: number) => {
    setFormData((prev) => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(day)
        ? prev.recurringDays.filter((d) => d !== day)
        : [...prev.recurringDays, day],
    }));
  };

  const hasFilter = startDate || endDate || selectedGroup || selectedTeacher;
  const eventCount = filteredEvents.length;

  // Get teacher/group names
  const getTeacherName = (id: string) => teachers.find((t) => t.id === id)?.name || "";

  // Navigate calendar when date filter changes
  useEffect(() => {
    if (startDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(startDate.toDate());
    }
  }, [startDate]);

  // Calculate valid range for calendar
  const validRange = useMemo(() => {
    if (startDate && endDate) {
      return {
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.add(1, "day").format("YYYY-MM-DD"),
      };
    }
    if (startDate) {
      return {
        start: startDate.format("YYYY-MM-DD"),
      };
    }
    if (endDate) {
      return {
        end: endDate.add(1, "day").format("YYYY-MM-DD"),
      };
    }
    return undefined;
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight={600}>
            Расписание
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add size={20} color="#FFFFFF" />}
            onClick={handleAddClick}
          >
            Добавить занятие
          </Button>
        </Stack>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            flexWrap="wrap"
          >
            <DatePicker
              label="Дата начала"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="DD.MM.YYYY"
              slotProps={{
                textField: { size: "small", sx: { minWidth: 150 } },
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              —
            </Typography>
            <DatePicker
              label="Дата окончания"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="DD.MM.YYYY"
              minDate={startDate || undefined}
              slotProps={{
                textField: { size: "small", sx: { minWidth: 150 } },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Группа</InputLabel>
              <Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                label="Группа"
              >
                <MenuItem value="">Все группы</MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: group.color,
                        }}
                      />
                      <span>{group.name}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Преподаватель</InputLabel>
              <Select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                label="Преподаватель"
              >
                <MenuItem value="">Все преподаватели</MenuItem>
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {hasFilter && (
              <>
                <Chip
                  label={`${eventCount} ${eventCount === 1 ? "занятие" : "занятий"}`}
                  color="primary"
                  size="small"
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<CloseCircle size={18} />}
                  onClick={handleClearFilter}
                >
                  Сбросить
                </Button>
              </>
            )}
          </Stack>
        </Paper>

        {/* Calendar */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            "& .fc": { fontFamily: "inherit" },
            "& .fc-toolbar-title": { fontSize: "1.25rem", fontWeight: 600 },
            "& .fc-button": { textTransform: "capitalize" },
            "& .fc-button-primary": {
              backgroundColor: "#1264EB",
              borderColor: "#1264EB",
              "&:hover": { backgroundColor: "#0d4fc4", borderColor: "#0d4fc4" },
              "&:disabled": { backgroundColor: "#1264EB", borderColor: "#1264EB" },
            },
            "& .fc-button-primary:not(:disabled).fc-button-active": {
              backgroundColor: "#0d4fc4",
              borderColor: "#0d4fc4",
            },
            "& .fc-daygrid-day-top": { justifyContent: "center" },
            "& .fc-daygrid-day-number": { padding: "8px" },
            "& .fc-event": {
              borderRadius: "4px",
              padding: "2px 4px",
              fontSize: "0.75rem",
              cursor: "pointer",
            },
            "& .fc-timegrid-event": {
              borderRadius: "4px",
              fontSize: "0.75rem",
            },
            "& .fc-daygrid-event": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            "& .fc-day-today": {
              backgroundColor: "rgba(18, 100, 235, 0.08) !important",
            },
            "& .fc-col-header-cell": {
              padding: "12px 0",
              backgroundColor: "#F1F3F5",
            },
            "& .fc-timegrid-slot": {
              height: "40px",
            },
          }}
        >
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={filteredEvents}
            locale="ru"
            validRange={validRange}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: "Сегодня",
              month: "Месяц",
              week: "Неделя",
              day: "День",
            }}
            height="auto"
            dayMaxEvents={3}
            moreLinkText={(num) => `+${num} ещё`}
            firstDay={1}
            weekends={true}
            eventDisplay="block"
            selectable={true}
            selectMirror={true}
            editable={true}
            droppable={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            slotDuration="00:30:00"
            allDaySlot={false}
            nowIndicator={true}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
          />
        </Paper>

        {/* Events List for Selected Range */}
        {hasFilter && filteredEvents.length > 0 && (
          <Paper sx={{ mt: 3, p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Занятия за выбранный период
            </Typography>
            <Stack spacing={1} sx={{ maxHeight: 480, overflowY: "auto" }}>
              {filteredEvents.map((event, index) => (
                <Stack
                  key={`${event.id}-${index}`}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "#F9FAFB",
                    "&:hover": { bgcolor: "#F1F3F5" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setViewDialogOpen(true);
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: event.color,
                    }}
                  />
                  <Typography variant="body2" fontWeight={500} sx={{ minWidth: 100 }}>
                    {dayjs(event.start as string).format("dd, D MMM")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                    {dayjs(event.start as string).format("HH:mm")} - {dayjs(event.end as string).format("HH:mm")}
                  </Typography>
                  <Typography variant="body2">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getTeacherName(event.teacherId)}
                  </Typography>
                  {event.room && (
                    <Chip label={`Ауд. ${event.room}`} size="small" variant="outlined" />
                  )}
                </Stack>
              ))}
            </Stack>
          </Paper>
        )}

        {hasFilter && filteredEvents.length === 0 && (
          <Paper sx={{ mt: 3, p: 3, borderRadius: 3, textAlign: "center" }}>
            <Typography color="text.secondary">
              Нет занятий за выбранный период
            </Typography>
          </Paper>
        )}

        {/* Add Event Dialog */}
        <Dialog open={addDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>Добавить занятие</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormControl fullWidth required>
                <InputLabel>Группа</InputLabel>
                <Select
                  value={formData.groupId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, groupId: e.target.value }))}
                  label="Группа"
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                          sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: group.color }}
                        />
                        <span>{group.name}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Преподаватель</InputLabel>
                <Select
                  value={formData.teacherId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, teacherId: e.target.value }))}
                  label="Преподаватель"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="Дата"
                value={formData.date}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, date: newValue }))}
                format="DD.MM.YYYY"
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />

              <Stack direction="row" spacing={2}>
                <TimePicker
                  label="Начало"
                  value={formData.startTime}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, startTime: newValue }))}
                  ampm={false}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
                <TimePicker
                  label="Конец"
                  value={formData.endTime}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, endTime: newValue }))}
                  ampm={false}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Stack>

              <TextField
                label="Аудитория"
                value={formData.room}
                onChange={(e) => setFormData((prev) => ({ ...prev, room: e.target.value }))}
                fullWidth
                placeholder="Например: 101"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isRecurring: e.target.checked }))}
                  />
                }
                label="Повторять каждую неделю"
              />

              {formData.isRecurring && (
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Выберите дни недели:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {daysOfWeek.map((day) => (
                      <Chip
                        key={day.value}
                        label={day.label}
                        onClick={() => toggleRecurringDay(day.value)}
                        color={formData.recurringDays.includes(day.value) ? "primary" : "default"}
                        variant={formData.recurringDays.includes(day.value) ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleDialogClose}>Отмена</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.groupId || !formData.teacherId || !formData.date || !formData.startTime || !formData.endTime}
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Event Dialog */}
        <Dialog open={viewDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: selectedEvent?.color,
                  }}
                />
                <span>{selectedEvent?.title}</span>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Редактировать">
                  <IconButton size="small" onClick={handleEditFromView}>
                    <Edit2 size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Удалить">
                  <IconButton size="small" color="error" onClick={handleDeleteFromView}>
                    <Trash size={18} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                    Дата:
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(selectedEvent.start as string).format("dddd, D MMMM YYYY")}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                    Время:
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(selectedEvent.start as string).format("HH:mm")} - {dayjs(selectedEvent.end as string).format("HH:mm")}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                    Преподаватель:
                  </Typography>
                  <Typography variant="body2">
                    {getTeacherName(selectedEvent.teacherId)}
                  </Typography>
                </Stack>
                {selectedEvent.room && (
                  <Stack direction="row" spacing={2}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                      Аудитория:
                    </Typography>
                    <Typography variant="body2">{selectedEvent.room}</Typography>
                  </Stack>
                )}
                {selectedEvent.isRecurring && (
                  <Chip
                    label="Повторяющееся занятие"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleDialogClose}>Закрыть</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>Редактировать занятие</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormControl fullWidth required>
                <InputLabel>Группа</InputLabel>
                <Select
                  value={formData.groupId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, groupId: e.target.value }))}
                  label="Группа"
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                          sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: group.color }}
                        />
                        <span>{group.name}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Преподаватель</InputLabel>
                <Select
                  value={formData.teacherId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, teacherId: e.target.value }))}
                  label="Преподаватель"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="Дата"
                value={formData.date}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, date: newValue }))}
                format="DD.MM.YYYY"
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />

              <Stack direction="row" spacing={2}>
                <TimePicker
                  label="Начало"
                  value={formData.startTime}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, startTime: newValue }))}
                  ampm={false}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
                <TimePicker
                  label="Конец"
                  value={formData.endTime}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, endTime: newValue }))}
                  ampm={false}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Stack>

              <TextField
                label="Аудитория"
                value={formData.room}
                onChange={(e) => setFormData((prev) => ({ ...prev, room: e.target.value }))}
                fullWidth
                placeholder="Например: 101"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleDialogClose}>Отмена</Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={!formData.groupId || !formData.teacherId || !formData.date || !formData.startTime || !formData.endTime}
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
          <DialogTitle>Удалить занятие?</DialogTitle>
          <DialogContent>
            <Typography>
              Вы уверены, что хотите удалить занятие "{selectedEvent?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleDialogClose}>Отмена</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
