import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Profile2User,
  Category,
  UserOctagon,
  DollarCircle,
  ArrowUp,
  ArrowDown,
  Building,
  TrendUp,
  Wallet,
  Chart,
  MoneyRecive,
  MoneySend,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// CEO Stats - comprehensive overview
const ceoStats = [
  {
    id: "revenue",
    title: "Общий доход",
    value: "$156,400",
    change: "+23%",
    isPositive: true,
    icon: <DollarCircle size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "expenses",
    title: "Расходы",
    value: "$42,300",
    change: "+8%",
    isPositive: false,
    icon: <MoneySend size={24} color="#F44336" />,
    bgColor: "rgba(244, 67, 54, 0.1)",
  },
  {
    id: "profit",
    title: "Чистая прибыль",
    value: "$114,100",
    change: "+31%",
    isPositive: true,
    icon: <TrendUp size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "students",
    title: "Всего студентов",
    value: "1,234",
    change: "+12%",
    isPositive: true,
    icon: <Profile2User size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
];

// Branches performance
const branchesData = [
  { name: "Главный филиал", revenue: 58500, expenses: 15200, students: 523, growth: 18 },
  { name: "Филиал Чиланзар", revenue: 42200, expenses: 11800, students: 312, growth: 12 },
  { name: "Филиал Юнусабад", revenue: 31800, expenses: 9300, students: 245, growth: 15 },
  { name: "Филиал Сергели", revenue: 23900, expenses: 6000, students: 154, growth: 8 },
];

// Monthly revenue trend
const monthlyRevenue = [
  { month: "Июль", revenue: 125000 },
  { month: "Август", revenue: 132000 },
  { month: "Сентябрь", revenue: 141000 },
  { month: "Октябрь", revenue: 148000 },
  { month: "Ноябрь", revenue: 152000 },
  { month: "Декабрь", revenue: 156400 },
];

// Top mentors by performance
const topMentors = [
  { name: "Алексей Иванов", groups: 4, students: 67, rating: 4.9, revenue: "$8,200" },
  { name: "Мария Петрова", groups: 3, students: 52, rating: 4.8, revenue: "$6,800" },
  { name: "Сергей Сидоров", groups: 3, students: 48, rating: 4.7, revenue: "$6,200" },
  { name: "Анна Козлова", groups: 2, students: 35, rating: 4.9, revenue: "$5,100" },
];

// Expense categories
const expenseCategories = [
  { category: "Зарплаты", amount: 28500, percentage: 67 },
  { category: "Аренда", amount: 8000, percentage: 19 },
  { category: "Маркетинг", amount: 3500, percentage: 8 },
  { category: "Прочее", amount: 2300, percentage: 6 },
];

export const CeoDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Добро пожаловать, {user?.name?.split(" ")[0] || "Директор"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Обзор бизнеса и ключевые показатели
          </Typography>
        </Box>
        <Chip
          icon={<Chart size={16} />}
          label="CEO Dashboard"
          color="error"
          variant="outlined"
        />
      </Stack>

      {/* Main Stats */}
      <Grid container spacing={3} mb={3}>
        {ceoStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                    {stat.isPositive ? (
                      <ArrowUp size={14} color="#4CAF50" />
                    ) : (
                      <ArrowDown size={14} color="#F44336" />
                    )}
                    <Typography
                      variant="caption"
                      color={stat.isPositive ? "#4CAF50" : "#F44336"}
                      fontWeight={500}
                    >
                      {stat.change}
                    </Typography>
                  </Stack>
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
        {/* Revenue Trend */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Динамика доходов
              </Typography>
              <Chip label="Последние 6 месяцев" size="small" />
            </Stack>
            <Stack spacing={2}>
              {monthlyRevenue.map((item) => (
                <Stack key={item.month} direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body2" sx={{ width: 80 }}>
                    {item.month}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(item.revenue / maxRevenue) * 100}
                      sx={{
                        height: 24,
                        borderRadius: 2,
                        bgcolor: "rgba(0,0,0,0.08)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 2,
                          bgcolor: "#4CAF50",
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight={600} sx={{ width: 80, textAlign: "right" }}>
                    ${(item.revenue / 1000).toFixed(0)}K
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Expense Breakdown */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Wallet size={20} color="#F44336" />
              <Typography variant="h6" fontWeight={600}>
                Структура расходов
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {expenseCategories.map((item) => (
                <Box key={item.category}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{item.category}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${item.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: "#F44336",
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Branches Performance */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Building size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                Показатели филиалов
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {branchesData.map((branch) => (
                <Stack
                  key={branch.name}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ p: 2, borderRadius: 2, bgcolor: "#F9FAFB" }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {branch.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {branch.students} студентов
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" color="success.main" fontWeight={600}>
                        ${(branch.revenue / 1000).toFixed(1)}K
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Доход
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" color="error.main" fontWeight={600}>
                        ${(branch.expenses / 1000).toFixed(1)}K
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Расход
                      </Typography>
                    </Box>
                    <Chip
                      label={`+${branch.growth}%`}
                      size="small"
                      sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Top Mentors */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <UserOctagon size={20} color="#FF9800" />
              <Typography variant="h6" fontWeight={600}>
                Лучшие менторы
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {topMentors.map((mentor, index) => (
                <Stack
                  key={mentor.name}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ p: 1.5, borderRadius: 2, bgcolor: "#F9FAFB" }}
                >
                  <Avatar sx={{ bgcolor: ["#1264EB", "#4CAF50", "#FF9800", "#E91E63"][index] }}>
                    {mentor.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {mentor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mentor.groups} групп • {mentor.students} студентов
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end">
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      {mentor.revenue}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="caption" color="warning.main">
                        ★ {mentor.rating}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
