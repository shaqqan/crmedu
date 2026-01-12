import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Chart,
  DollarCircle,
  Profile2User,
  TrendUp,
  TrendDown,
  Building,
  Calendar,
} from "iconsax-react";

// Financial summary
const financialSummary = {
  totalRevenue: 156400,
  totalExpenses: 42300,
  netProfit: 114100,
  profitMargin: 73,
  revenueGrowth: 23,
  expenseGrowth: 8,
};

// Monthly data
const monthlyData = [
  { month: "Янв", revenue: 98000, expenses: 32000, students: 890 },
  { month: "Фев", revenue: 105000, expenses: 34000, students: 920 },
  { month: "Мар", revenue: 112000, expenses: 35000, students: 980 },
  { month: "Апр", revenue: 118000, expenses: 36000, students: 1020 },
  { month: "Май", revenue: 125000, expenses: 38000, students: 1080 },
  { month: "Июн", revenue: 132000, expenses: 39000, students: 1120 },
  { month: "Июл", revenue: 138000, expenses: 40000, students: 1150 },
  { month: "Авг", revenue: 142000, expenses: 40500, students: 1180 },
  { month: "Сен", revenue: 148000, expenses: 41000, students: 1200 },
  { month: "Окт", revenue: 152000, expenses: 41500, students: 1215 },
  { month: "Ноя", revenue: 154000, expenses: 42000, students: 1225 },
  { month: "Дек", revenue: 156400, expenses: 42300, students: 1234 },
];

// Branch comparison
const branchComparison = [
  { name: "Главный филиал", revenue: 58500, students: 523, efficiency: 112 },
  { name: "Чиланзар", revenue: 42200, students: 312, efficiency: 135 },
  { name: "Юнусабад", revenue: 31800, students: 245, efficiency: 130 },
  { name: "Сергели", revenue: 23900, students: 154, efficiency: 155 },
];

// Course performance
const coursePerformance = [
  { name: "English", students: 456, revenue: 52000, growth: 15 },
  { name: "Korean", students: 234, revenue: 38000, growth: 28 },
  { name: "IELTS Prep", students: 167, revenue: 35000, growth: 12 },
  { name: "German", students: 189, revenue: 18000, growth: 8 },
  { name: "French", students: 98, revenue: 8400, growth: 5 },
];

export const CeoReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const maxMonthlyRevenue = Math.max(...monthlyData.map((m) => m.revenue));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Отчеты
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Аналитика и статистика бизнеса
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip icon={<Calendar size={16} />} label="2025" variant="outlined" />
          <Chip icon={<Chart size={16} />} label="Экспорт" color="primary" />
        </Stack>
      </Stack>

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Финансы" />
        <Tab label="Студенты" />
        <Tab label="Филиалы" />
        <Tab label="Курсы" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Financial Summary Cards */}
          <Grid size={4}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "rgba(76, 175, 80, 0.05)" }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <DollarCircle size={20} color="#4CAF50" />
                <Typography variant="body2" color="text.secondary">
                  Общий доход
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={700} color="success.main">
                ${financialSummary.totalRevenue.toLocaleString()}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                <TrendUp size={14} color="#4CAF50" />
                <Typography variant="caption" color="success.main">
                  +{financialSummary.revenueGrowth}% за год
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={4}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "rgba(244, 67, 54, 0.05)" }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <TrendDown size={20} color="#F44336" />
                <Typography variant="body2" color="text.secondary">
                  Общие расходы
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={700} color="error.main">
                ${financialSummary.totalExpenses.toLocaleString()}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                <TrendUp size={14} color="#F44336" />
                <Typography variant="caption" color="error.main">
                  +{financialSummary.expenseGrowth}% за год
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={4}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "rgba(18, 100, 235, 0.05)" }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Chart size={20} color="#1264EB" />
                <Typography variant="body2" color="text.secondary">
                  Чистая прибыль
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={700} color="primary">
                ${financialSummary.netProfit.toLocaleString()}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Маржа: {financialSummary.profitMargin}%
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Monthly Revenue Chart */}
          <Grid size={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Динамика по месяцам
              </Typography>
              <Stack spacing={1.5}>
                {monthlyData.map((item) => (
                  <Stack key={item.month} direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" sx={{ width: 40 }}>
                      {item.month}
                    </Typography>
                    <Box sx={{ flex: 1, position: "relative" }}>
                      <LinearProgress
                        variant="determinate"
                        value={(item.revenue / maxMonthlyRevenue) * 100}
                        sx={{
                          height: 20,
                          borderRadius: 1,
                          bgcolor: "rgba(244, 67, 54, 0.2)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 1,
                            bgcolor: "#4CAF50",
                          },
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ width: 180 }}>
                      <Typography variant="caption" color="success.main" fontWeight={600}>
                        ${(item.revenue / 1000).toFixed(0)}K
                      </Typography>
                      <Typography variant="caption" color="error.main">
                        -${(item.expenses / 1000).toFixed(0)}K
                      </Typography>
                      <Typography variant="caption" color="primary" fontWeight={600}>
                        =${((item.revenue - item.expenses) / 1000).toFixed(0)}K
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid size={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Рост числа студентов
              </Typography>
              <Stack spacing={1.5}>
                {monthlyData.map((item, index) => (
                  <Stack key={item.month} direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" sx={{ width: 40 }}>
                      {item.month}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(item.students / 1300) * 100}
                        sx={{
                          height: 20,
                          borderRadius: 1,
                          bgcolor: "rgba(0,0,0,0.08)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 1,
                            bgcolor: "#1264EB",
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ width: 60 }}>
                      {item.students}
                    </Typography>
                    {index > 0 && (
                      <Chip
                        size="small"
                        label={`+${item.students - monthlyData[index - 1].students}`}
                        sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          {branchComparison.map((branch) => (
            <Grid key={branch.name} size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Building size={20} color="#1264EB" />
                  <Typography variant="h6" fontWeight={600}>
                    {branch.name}
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                      <Typography variant="h5" fontWeight={700} color="success.main">
                        ${(branch.revenue / 1000).toFixed(0)}K
                      </Typography>
                      <Typography variant="caption">Доход</Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                      <Typography variant="h5" fontWeight={700} color="primary">
                        {branch.students}
                      </Typography>
                      <Typography variant="caption">Студенты</Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                      <Typography variant="h5" fontWeight={700} color="warning.main">
                        ${branch.efficiency}
                      </Typography>
                      <Typography variant="caption">На студента</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid size={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Эффективность курсов
              </Typography>
              <Stack spacing={2}>
                {coursePerformance.map((course) => (
                  <Stack
                    key={course.name}
                    direction="row"
                    alignItems="center"
                    sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {course.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {course.students} студентов
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="success.main" sx={{ width: 100 }}>
                      ${(course.revenue / 1000).toFixed(0)}K
                    </Typography>
                    <Chip
                      label={`+${course.growth}%`}
                      size="small"
                      sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}
                    />
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
