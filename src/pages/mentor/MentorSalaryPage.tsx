import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import {
  MoneyRecive,
  Calendar,
  DollarCircle,
  Chart,
  Category,
  Clock,
  TrendUp,
  TrendDown,
  TickCircle,
} from "iconsax-react";

// Current month data
const currentMonthData = {
  month: "Fevral 2026",
  baseSalary: 5000000,
  perLessonRate: 50000,
  lessonsCompleted: 48,
  lessonsPlanned: 72,
  lessonEarnings: 2400000,
  estimatedBonuses: 1000000,
  estimatedTotal: 8400000,
  daysLeft: 14,
};

// Previous month comparison
const previousMonth = {
  total: 10100000,
  lessons: 72,
};

// Stats
const salaryStats = [
  {
    id: "base_salary",
    title: "Bazaviy maosh",
    value: "5 000 000",
    subtitle: "UZS / oy",
    icon: <DollarCircle size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "per_lesson",
    title: "Har bir dars uchun",
    value: "50 000",
    subtitle: "UZS",
    icon: <MoneyRecive size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "lessons_done",
    title: "Bajarilgan darslar",
    value: "48",
    subtitle: `${currentMonthData.lessonsPlanned} dan`,
    icon: <Category size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
  {
    id: "estimated",
    title: "Taxminiy maosh",
    value: "8 400 000",
    subtitle: "UZS",
    icon: <Chart size={24} color="#E91E63" />,
    bgColor: "rgba(233, 30, 99, 0.1)",
  },
];

// Weekly breakdown
const weeklyBreakdown = [
  { week: "1-hafta", lessons: 12, earnings: 600000, completed: true },
  { week: "2-hafta", lessons: 14, earnings: 700000, completed: true },
  { week: "3-hafta", lessons: 12, earnings: 600000, completed: true },
  { week: "4-hafta", lessons: 10, earnings: 500000, completed: false },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";
};

export const MentorSalaryPage: React.FC = () => {
  const progressPercent = (currentMonthData.lessonsCompleted / currentMonthData.lessonsPlanned) * 100;
  const comparison = currentMonthData.estimatedTotal - previousMonth.total;
  const comparisonPercent = ((comparison / previousMonth.total) * 100).toFixed(1);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Maosh monitoringi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Joriy oy: {currentMonthData.month}
          </Typography>
        </Box>
        <Chip
          icon={<Clock size={16} />}
          label={`${currentMonthData.daysLeft} kun qoldi`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        {salaryStats.map((stat) => (
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

      <Grid container spacing={3}>
        {/* Main Progress Card */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
              <Chart size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                Joriy oy progressi
              </Typography>
            </Stack>

            {/* Big Progress */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Taxminiy daromad
                  </Typography>
                  <Typography variant="h3" fontWeight={700} color="primary.main">
                    {formatCurrency(currentMonthData.estimatedTotal)}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  icon={comparison >= 0 ? <TrendUp size={14} /> : <TrendDown size={14} />}
                  label={`${comparison >= 0 ? "+" : ""}${comparisonPercent}% o'tgan oyga nisbatan`}
                  color={comparison >= 0 ? "success" : "error"}
                  sx={{ mb: 1 }}
                />
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 16,
                  borderRadius: 8,
                  bgcolor: "rgba(18, 100, 235, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 8,
                    bgcolor: "#1264EB",
                  },
                }}
              />
              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Typography variant="body2" color="text.secondary">
                  {currentMonthData.lessonsCompleted} dars bajarildi
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {progressPercent.toFixed(0)}%
                </Typography>
              </Stack>
            </Box>

            {/* Breakdown */}
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              Daromad tarkibi
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#1264EB" }} />
                  <Typography variant="body2">Bazaviy maosh</Typography>
                </Stack>
                <Typography variant="body2" fontWeight={600}>
                  {formatCurrency(currentMonthData.baseSalary)}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4CAF50" }} />
                  <Typography variant="body2">
                    Darslar uchun ({currentMonthData.lessonsCompleted} × {formatCurrency(currentMonthData.perLessonRate).replace(" UZS", "")})
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight={600}>
                  {formatCurrency(currentMonthData.lessonEarnings)}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#FF9800" }} />
                  <Typography variant="body2">Taxminiy bonuslar</Typography>
                </Stack>
                <Typography variant="body2" fontWeight={600} color="success.main">
                  +{formatCurrency(currentMonthData.estimatedBonuses)}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Weekly Breakdown */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
              <Calendar size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                Haftalik ko'rsatkichlar
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {weeklyBreakdown.map((week, index) => (
                <Paper
                  key={week.week}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: week.completed ? "rgba(76, 175, 80, 0.05)" : "#F9FAFB",
                    border: "1px solid",
                    borderColor: week.completed ? "rgba(76, 175, 80, 0.2)" : "divider",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {week.week}
                        </Typography>
                        {week.completed && (
                          <TickCircle size={16} color="#4CAF50" variant="Bold" />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {week.lessons} dars
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600} color={week.completed ? "success.main" : "text.primary"}>
                      {formatCurrency(week.earnings)}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            {/* Total */}
            <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  Jami darslar uchun
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {formatCurrency(weeklyBreakdown.reduce((sum, w) => sum + w.earnings, 0))}
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Payment Info */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "rgba(18, 100, 235, 0.05)" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(18, 100, 235, 0.1)",
                }}
              >
                <Clock size={24} color="#1264EB" />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Maosh to'lov sanasi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maosh har oyning 5-sanasida to'lanadi. Keyingi to'lov: <strong>5 Mart 2026</strong>
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
