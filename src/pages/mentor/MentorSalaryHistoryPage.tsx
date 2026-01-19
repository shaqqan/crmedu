import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  MoneyRecive,
  DollarCircle,
  Chart,
  TickCircle,
  Clock,
  CloseCircle,
  DocumentDownload,
  Eye,
  Category,
} from "iconsax-react";

interface SalaryRecord {
  id: string;
  month: string;
  year: number;
  baseSalary: number;
  bonuses: number;
  perLessonRate: number;
  lessonsCount: number;
  lessonEarnings: number;
  deductions: number;
  totalEarned: number;
  status: "paid" | "pending" | "processing";
  paidDate: string | null;
}

// Mock salary history data
const salaryHistory: SalaryRecord[] = [
  {
    id: "1",
    month: "Yanvar",
    year: 2026,
    baseSalary: 5000000,
    bonuses: 1500000,
    perLessonRate: 50000,
    lessonsCount: 72,
    lessonEarnings: 3600000,
    deductions: 0,
    totalEarned: 10100000,
    status: "paid",
    paidDate: "2026-02-05",
  },
  {
    id: "2",
    month: "Dekabr",
    year: 2025,
    baseSalary: 5000000,
    bonuses: 1200000,
    perLessonRate: 50000,
    lessonsCount: 68,
    lessonEarnings: 3400000,
    deductions: 0,
    totalEarned: 9600000,
    status: "paid",
    paidDate: "2026-01-05",
  },
  {
    id: "3",
    month: "Noyabr",
    year: 2025,
    baseSalary: 5000000,
    bonuses: 800000,
    perLessonRate: 50000,
    lessonsCount: 64,
    lessonEarnings: 3200000,
    deductions: 200000,
    totalEarned: 8800000,
    status: "paid",
    paidDate: "2025-12-05",
  },
  {
    id: "4",
    month: "Oktabr",
    year: 2025,
    baseSalary: 4500000,
    bonuses: 1000000,
    perLessonRate: 45000,
    lessonsCount: 70,
    lessonEarnings: 3150000,
    deductions: 0,
    totalEarned: 8650000,
    status: "paid",
    paidDate: "2025-11-05",
  },
  {
    id: "5",
    month: "Sentyabr",
    year: 2025,
    baseSalary: 4500000,
    bonuses: 500000,
    perLessonRate: 45000,
    lessonsCount: 60,
    lessonEarnings: 2700000,
    deductions: 0,
    totalEarned: 7700000,
    status: "paid",
    paidDate: "2025-10-05",
  },
  {
    id: "6",
    month: "Avgust",
    year: 2025,
    baseSalary: 4500000,
    bonuses: 0,
    perLessonRate: 45000,
    lessonsCount: 40,
    lessonEarnings: 1800000,
    deductions: 0,
    totalEarned: 6300000,
    status: "paid",
    paidDate: "2025-09-05",
  },
];

// Summary stats
const summaryStats = [
  {
    id: "total_2025",
    title: "2025 yil jami",
    value: "41 050 000",
    subtitle: "UZS",
    icon: <DollarCircle size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "avg_monthly",
    title: "O'rtacha oylik",
    value: "8 210 000",
    subtitle: "UZS",
    icon: <Chart size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "total_lessons",
    title: "Jami darslar",
    value: "374",
    subtitle: "dars",
    icon: <Category size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  {
    id: "total_bonuses",
    title: "Jami bonuslar",
    value: "5 000 000",
    subtitle: "UZS",
    icon: <MoneyRecive size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusChip = (status: SalaryRecord["status"]) => {
  switch (status) {
    case "paid":
      return (
        <Chip
          size="small"
          icon={<TickCircle size={14} />}
          label="To'langan"
          color="success"
          sx={{ fontSize: 12 }}
        />
      );
    case "pending":
      return (
        <Chip
          size="small"
          icon={<Clock size={14} />}
          label="Kutilmoqda"
          color="warning"
          sx={{ fontSize: 12 }}
        />
      );
    case "processing":
      return (
        <Chip
          size="small"
          icon={<Clock size={14} />}
          label="Jarayonda"
          color="info"
          sx={{ fontSize: 12 }}
        />
      );
    default:
      return null;
  }
};

export const MentorSalaryHistoryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<SalaryRecord | null>(null);

  const filteredHistory = selectedYear === "all"
    ? salaryHistory
    : salaryHistory.filter(r => r.year === parseInt(selectedYear));

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Maosh tarixi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Barcha to'lovlar tarixi
          </Typography>
        </Box>
        <TextField
          select
          size="small"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">Barchasi</MenuItem>
          <MenuItem value="2026">2026</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </TextField>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        {summaryStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.bgColor }}>
                  {stat.icon}
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Salary History Table */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MoneyRecive size={20} color="#1264EB" />
            <Typography variant="h6" fontWeight={600}>
              To'lovlar ro'yxati
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Jami: {filteredHistory.length} ta yozuv
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Oy</TableCell>
                <TableCell align="right">Bazaviy</TableCell>
                <TableCell align="right">Darslar</TableCell>
                <TableCell align="right">Bonuslar</TableCell>
                <TableCell align="right">Ushlab qolish</TableCell>
                <TableCell align="right">Jami</TableCell>
                <TableCell align="center">Holat</TableCell>
                <TableCell align="center">Sana</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistory.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { bgcolor: "#F9FAFB" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {row.month} {row.year}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatCurrency(row.baseSalary)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {row.lessonsCount} dars
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatCurrency(row.lessonEarnings)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color={row.bonuses > 0 ? "success.main" : "text.secondary"}>
                      {row.bonuses > 0 ? `+${formatCurrency(row.bonuses)}` : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color={row.deductions > 0 ? "error.main" : "text.secondary"}>
                      {row.deductions > 0 ? `-${formatCurrency(row.deductions)}` : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {formatCurrency(row.totalEarned)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusChip(row.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(row.paidDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => setSelectedRecord(row)}
                      sx={{ color: "primary.main" }}
                    >
                      <Eye size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                  {selectedRecord.month} {selectedRecord.year} - Maosh tafsiloti
                </Typography>
                <IconButton onClick={() => setSelectedRecord(null)} size="small">
                  <CloseCircle size={20} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ pt: 1 }}>
                {/* Status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Holat</Typography>
                  {getStatusChip(selectedRecord.status)}
                </Stack>

                <Divider />

                {/* Base Salary */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Bazaviy maosh</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(selectedRecord.baseSalary)}
                  </Typography>
                </Stack>

                {/* Lessons */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">
                    Darslar ({selectedRecord.lessonsCount} × {formatCurrency(selectedRecord.perLessonRate).replace(" UZS", "")})
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(selectedRecord.lessonEarnings)}
                  </Typography>
                </Stack>

                {/* Bonuses */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Bonuslar</Typography>
                  <Typography variant="body2" fontWeight={500} color="success.main">
                    +{formatCurrency(selectedRecord.bonuses)}
                  </Typography>
                </Stack>

                {/* Deductions */}
                {selectedRecord.deductions > 0 && (
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Ushlab qolish</Typography>
                    <Typography variant="body2" fontWeight={500} color="error.main">
                      -{formatCurrency(selectedRecord.deductions)}
                    </Typography>
                  </Stack>
                )}

                <Divider />

                {/* Total */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" fontWeight={600}>Jami</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {formatCurrency(selectedRecord.totalEarned)}
                  </Typography>
                </Stack>

                {/* Payment Date */}
                {selectedRecord.paidDate && (
                  <Paper elevation={0} sx={{ p: 2, bgcolor: "rgba(76, 175, 80, 0.05)", borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TickCircle size={18} color="#4CAF50" />
                      <Typography variant="body2" color="text.secondary">
                        To'langan: {formatDate(selectedRecord.paidDate)}
                      </Typography>
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
