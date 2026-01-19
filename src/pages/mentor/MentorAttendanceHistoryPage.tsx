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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from "@mui/material/ButtonBase";
import {
  Calendar,
  Clock,
  Profile2User,
  TickCircle,
  CloseCircle,
  InfoCircle,
  ArrowLeft,
  SearchNormal1,
  Eye,
  Filter,
  DocumentDownload,
  ArrowRight2,
  Category,
} from "iconsax-react";
import { useNavigate } from "react-router";

interface AttendanceRecord {
  id: string;
  date: string;
  lessonTime: string;
  groupId: string;
  groupName: string;
  courseName: string;
  totalStudents: number;
  present: number;
  absent: number;
  excused: number;
  attendanceRate: number;
  color: string;
}

interface StudentAttendance {
  id: string;
  name: string;
  status: "present" | "absent" | "excused";
}

interface GroupOption {
  id: string;
  name: string;
  color: string;
}

// Mock data - guruhlar
const groups: GroupOption[] = [
  { id: "all", name: "Barcha guruhlar", color: "#6B7280" },
  { id: "1", name: "English B1 - Group 1", color: "#1264EB" },
  { id: "2", name: "English A2 - Group 2", color: "#4CAF50" },
  { id: "3", name: "IELTS Prep - Group 5", color: "#FF9800" },
  { id: "4", name: "English B2 - Group 7", color: "#E91E63" },
];

// Mock data - davomat tarixi
const attendanceHistory: AttendanceRecord[] = [
  {
    id: "1",
    date: "2026-01-14",
    lessonTime: "09:00 - 10:30",
    groupId: "1",
    groupName: "Group 1",
    courseName: "English B1",
    totalStudents: 15,
    present: 14,
    absent: 1,
    excused: 0,
    attendanceRate: 93,
    color: "#1264EB",
  },
  {
    id: "2",
    date: "2026-01-14",
    lessonTime: "11:00 - 12:30",
    groupId: "2",
    groupName: "Group 2",
    courseName: "English A2",
    totalStudents: 12,
    present: 11,
    absent: 0,
    excused: 1,
    attendanceRate: 92,
    color: "#4CAF50",
  },
  {
    id: "3",
    date: "2026-01-13",
    lessonTime: "09:00 - 10:30",
    groupId: "1",
    groupName: "Group 1",
    courseName: "English B1",
    totalStudents: 15,
    present: 13,
    absent: 2,
    excused: 0,
    attendanceRate: 87,
    color: "#1264EB",
  },
  {
    id: "4",
    date: "2026-01-13",
    lessonTime: "14:00 - 15:30",
    groupId: "3",
    groupName: "Group 5",
    courseName: "IELTS Prep",
    totalStudents: 8,
    present: 8,
    absent: 0,
    excused: 0,
    attendanceRate: 100,
    color: "#FF9800",
  },
  {
    id: "5",
    date: "2026-01-12",
    lessonTime: "16:00 - 17:30",
    groupId: "4",
    groupName: "Group 7",
    courseName: "English B2",
    totalStudents: 10,
    present: 9,
    absent: 1,
    excused: 0,
    attendanceRate: 90,
    color: "#E91E63",
  },
  {
    id: "6",
    date: "2026-01-10",
    lessonTime: "09:00 - 10:30",
    groupId: "1",
    groupName: "Group 1",
    courseName: "English B1",
    totalStudents: 15,
    present: 15,
    absent: 0,
    excused: 0,
    attendanceRate: 100,
    color: "#1264EB",
  },
  {
    id: "7",
    date: "2026-01-10",
    lessonTime: "11:00 - 12:30",
    groupId: "2",
    groupName: "Group 2",
    courseName: "English A2",
    totalStudents: 12,
    present: 10,
    absent: 1,
    excused: 1,
    attendanceRate: 83,
    color: "#4CAF50",
  },
  {
    id: "8",
    date: "2026-01-08",
    lessonTime: "14:00 - 15:30",
    groupId: "3",
    groupName: "Group 5",
    courseName: "IELTS Prep",
    totalStudents: 8,
    present: 7,
    absent: 1,
    excused: 0,
    attendanceRate: 88,
    color: "#FF9800",
  },
];

// Mock data - talabalar davomati (detail uchun)
const studentAttendanceDetail: Record<string, StudentAttendance[]> = {
  "1": [
    { id: "s1", name: "Иван Петров", status: "present" },
    { id: "s2", name: "Мария Сидорова", status: "present" },
    { id: "s3", name: "Алексей Козлов", status: "present" },
    { id: "s4", name: "Анна Морозова", status: "absent" },
    { id: "s5", name: "Дмитрий Волков", status: "present" },
    { id: "s6", name: "Елена Новикова", status: "present" },
    { id: "s7", name: "Сергей Федоров", status: "present" },
    { id: "s8", name: "Ольга Михайлова", status: "present" },
  ],
  "3": [
    { id: "s1", name: "Иван Петров", status: "present" },
    { id: "s2", name: "Мария Сидорова", status: "absent" },
    { id: "s3", name: "Алексей Козлов", status: "present" },
    { id: "s4", name: "Анна Морозова", status: "absent" },
    { id: "s5", name: "Дмитрий Волков", status: "present" },
  ],
};

export const MentorAttendanceHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const filteredRecords = useMemo(() => {
    let records = attendanceHistory;

    if (selectedGroup !== "all") {
      records = records.filter((r) => r.groupId === selectedGroup);
    }

    if (searchQuery) {
      records = records.filter(
        (r) =>
          r.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.date.includes(searchQuery)
      );
    }

    return records;
  }, [selectedGroup, searchQuery]);

  const stats = useMemo(() => {
    const totalLessons = filteredRecords.length;
    const avgAttendance = totalLessons > 0
      ? Math.round(filteredRecords.reduce((acc, r) => acc + r.attendanceRate, 0) / totalLessons)
      : 0;
    const totalPresent = filteredRecords.reduce((acc, r) => acc + r.present, 0);
    const totalAbsent = filteredRecords.reduce((acc, r) => acc + r.absent, 0);
    const totalExcused = filteredRecords.reduce((acc, r) => acc + r.excused, 0);

    return { totalLessons, avgAttendance, totalPresent, totalAbsent, totalExcused };
  }, [filteredRecords]);

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "#4CAF50";
    if (rate >= 75) return "#FF9800";
    return "#F44336";
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <ButtonBase onClick={() => navigate("/mentor/dashboard")} sx={{ borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Dashboard
          </Typography>
        </ButtonBase>
        <ArrowRight2 size={14} color="#9CA3AF" />
        <Typography variant="body2" color="primary" fontWeight={500}>
          Davomat tarixi
        </Typography>
      </Stack>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={() => navigate("/mentor/dashboard")} sx={{ bgcolor: "#F9FAFB" }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Davomat tarixi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              O'tgan darslar davomati
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="outlined"
          startIcon={<DocumentDownload size={18} />}
          sx={{ textTransform: "none" }}
        >
          Export
        </Button>
      </Stack>

      {/* Stats Cards */}
      <Stack direction="row" spacing={2} mb={3}>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Calendar size={24} color="#1264EB" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#1264EB">
                {stats.totalLessons}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Jami darslar
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TickCircle size={24} color="#4CAF50" variant="Bold" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#4CAF50">
                {stats.avgAttendance}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                O'rtacha davomat
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(76, 175, 80, 0.05)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Profile2User size={24} color="#4CAF50" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#4CAF50">
                {stats.totalPresent}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Kelganlar
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(244, 67, 54, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CloseCircle size={24} color="#F44336" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#F44336">
                {stats.totalAbsent}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Kelmaganlar
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InfoCircle size={24} color="#FF9800" />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#FF9800">
                {stats.totalExcused}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sababli
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Filters & Table */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Davomat yozuvlari
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
              sx={{ width: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Guruh</InputLabel>
              <Select
                value={selectedGroup}
                label="Guruh"
                onChange={(e) => setSelectedGroup(e.target.value)}
                startAdornment={<Filter size={16} color="#6B7280" style={{ marginRight: 8 }} />}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: group.color,
                        }}
                      />
                      <Typography variant="body2">{group.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sana</TableCell>
                <TableCell>Dars</TableCell>
                <TableCell>Guruh</TableCell>
                <TableCell align="center">Talabalar</TableCell>
                <TableCell align="center">Keldi</TableCell>
                <TableCell align="center">Kelmadi</TableCell>
                <TableCell align="center">Sababli</TableCell>
                <TableCell align="center">Davomat %</TableCell>
                <TableCell align="center">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                  sx={{
                    "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                  }}
                >
                  <TableCell>
                    <Stack>
                      <Typography variant="body2" fontWeight={500}>
                        {record.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.lessonTime}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 4,
                          height: 32,
                          borderRadius: 1,
                          bgcolor: record.color,
                        }}
                      />
                      <Typography variant="body2" fontWeight={500}>
                        {record.courseName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.groupName}
                      size="small"
                      sx={{
                        bgcolor: `${record.color}20`,
                        color: record.color,
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{record.totalStudents}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={record.present}
                      size="small"
                      sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50", fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={record.absent}
                      size="small"
                      sx={{
                        bgcolor: record.absent > 0 ? "rgba(244, 67, 54, 0.1)" : "rgba(0,0,0,0.05)",
                        color: record.absent > 0 ? "#F44336" : "#9CA3AF",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={record.excused}
                      size="small"
                      sx={{
                        bgcolor: record.excused > 0 ? "rgba(255, 152, 0, 0.1)" : "rgba(0,0,0,0.05)",
                        color: record.excused > 0 ? "#FF9800" : "#9CA3AF",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                      <Box sx={{ width: 60 }}>
                        <LinearProgress
                          variant="determinate"
                          value={record.attendanceRate}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(0,0,0,0.08)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              bgcolor: getAttendanceColor(record.attendanceRate),
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={getAttendanceColor(record.attendanceRate)}
                      >
                        {record.attendanceRate}%
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Batafsil ko'rish">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedRecord(record)}
                        sx={{ bgcolor: "#F9FAFB" }}
                      >
                        <Eye size={18} color="#6B7280" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredRecords.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Calendar size={48} color="#E5E7EB" />
            <Typography variant="body1" color="text.secondary" mt={2}>
              Davomat yozuvlari topilmadi
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: `${selectedRecord.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Category size={20} color={selectedRecord.color} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {selectedRecord.courseName} - {selectedRecord.groupName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedRecord.date} • {selectedRecord.lessonTime}
                  </Typography>
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent>
              {/* Stats */}
              <Stack direction="row" spacing={2} mb={3}>
                <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
                  <Stack alignItems="center">
                    <Typography variant="h5" fontWeight={700} color="#4CAF50">
                      {selectedRecord.present}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Keldi
                    </Typography>
                  </Stack>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(244, 67, 54, 0.1)" }}>
                  <Stack alignItems="center">
                    <Typography variant="h5" fontWeight={700} color="#F44336">
                      {selectedRecord.absent}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Kelmadi
                    </Typography>
                  </Stack>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, flex: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
                  <Stack alignItems="center">
                    <Typography variant="h5" fontWeight={700} color="#FF9800">
                      {selectedRecord.excused}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sababli
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>

              {/* Students list */}
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Talabalar ro'yxati
              </Typography>
              <Stack spacing={1}>
                {(studentAttendanceDetail[selectedRecord.id] || []).map((student) => (
                  <Stack
                    key={student.id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor:
                        student.status === "present"
                          ? "rgba(76, 175, 80, 0.08)"
                          : student.status === "absent"
                          ? "rgba(244, 67, 54, 0.08)"
                          : "rgba(255, 152, 0, 0.08)",
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: selectedRecord.color }}>
                      {student.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {student.name}
                    </Typography>
                    <Chip
                      size="small"
                      icon={
                        student.status === "present" ? (
                          <TickCircle size={14} />
                        ) : student.status === "absent" ? (
                          <CloseCircle size={14} />
                        ) : (
                          <InfoCircle size={14} />
                        )
                      }
                      label={
                        student.status === "present"
                          ? "Keldi"
                          : student.status === "absent"
                          ? "Kelmadi"
                          : "Sababli"
                      }
                      color={
                        student.status === "present"
                          ? "success"
                          : student.status === "absent"
                          ? "error"
                          : "warning"
                      }
                    />
                  </Stack>
                ))}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
