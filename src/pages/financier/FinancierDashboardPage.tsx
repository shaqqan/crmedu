import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import {
  DollarCircle,
  Wallet,
  MoneyRecive,
  MoneySend,
  TrendUp,
  TrendDown,
  Calendar,
  Building,
  Profile2User,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Financial Stats
const financialStats = [
  {
    id: "income",
    title: "Доход (месяц)",
    value: "$45,200",
    change: "+18%",
    isPositive: true,
    icon: <MoneyRecive size={24} color="#4CAF50" />,
    bgColor: "rgba(76, 175, 80, 0.1)",
  },
  {
    id: "expenses",
    title: "Расходы (месяц)",
    value: "$12,800",
    change: "+5%",
    isPositive: false,
    icon: <MoneySend size={24} color="#F44336" />,
    bgColor: "rgba(244, 67, 54, 0.1)",
  },
  {
    id: "profit",
    title: "Прибыль",
    value: "$32,400",
    change: "+24%",
    isPositive: true,
    icon: <TrendUp size={24} color="#1264EB" />,
    bgColor: "rgba(18, 100, 235, 0.1)",
  },
  {
    id: "pending",
    title: "К оплате",
    value: "$8,500",
    change: "23",
    isPositive: false,
    icon: <Wallet size={24} color="#FF9800" />,
    bgColor: "rgba(255, 152, 0, 0.1)",
  },
];

// Recent transactions
const recentTransactions = [
  { id: 1, type: "income", description: "Оплата за English B1", student: "Иван Петров", amount: 350, date: "Сегодня" },
  { id: 2, type: "expense", description: "Зарплата - Иванов А.", amount: -1200, date: "Сегодня" },
  { id: 3, type: "income", description: "Оплата за IELTS", student: "Мария Сидорова", amount: 500, date: "Вчера" },
  { id: 4, type: "expense", description: "Аренда - Декабрь", amount: -2000, date: "Вчера" },
  { id: 5, type: "income", description: "Оплата за Korean A1", student: "Алексей Козлов", amount: 280, date: "2 дня назад" },
  { id: 6, type: "expense", description: "Маркетинг - Instagram", amount: -450, date: "3 дня назад" },
];

// Expense categories
const expenseCategories = [
  { name: "Зарплаты", amount: 8500, percentage: 66, color: "#1264EB" },
  { name: "Аренда", amount: 2000, percentage: 16, color: "#4CAF50" },
  { name: "Маркетинг", amount: 1200, percentage: 9, color: "#FF9800" },
  { name: "Материалы", amount: 600, percentage: 5, color: "#E91E63" },
  { name: "Прочее", amount: 500, percentage: 4, color: "#9C27B0" },
];

// Branch income
const branchIncome = [
  { name: "Главный филиал", income: 18500, target: 20000 },
  { name: "Чиланзар", income: 12200, target: 15000 },
  { name: "Юнусабад", income: 9800, target: 12000 },
  { name: "Сергели", income: 4700, target: 8000 },
];

// Pending payments
const pendingPayments = [
  { student: "Анна Морозова", course: "English B1", amount: 350, dueDate: "15.01.2026", daysOverdue: 0 },
  { student: "Дмитрий Новиков", course: "German A1", amount: 280, dueDate: "10.01.2026", daysOverdue: 2 },
  { student: "Елена Волкова", course: "IELTS Prep", amount: 500, dueDate: "05.01.2026", daysOverdue: 7 },
  { student: "Сергей Белов", course: "Korean A1", amount: 280, dueDate: "01.01.2026", daysOverdue: 11 },
];

export const FinancierDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const totalExpenses = expenseCategories.reduce((acc, cat) => acc + cat.amount, 0);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Добро пожаловать, {user?.name?.split(" ")[0] || "Финансист"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Финансовая панель управления
          </Typography>
        </Box>
        <Chip icon={<DollarCircle size={16} />} label="Finance Dashboard" color="success" variant="outlined" />
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        {financialStats.map((stat) => (
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
                      <TrendUp size={14} color="#4CAF50" />
                    ) : (
                      <TrendDown size={14} color="#F44336" />
                    )}
                    <Typography
                      variant="caption"
                      color={stat.isPositive ? "success.main" : "error.main"}
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
        {/* Recent Transactions */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Последние транзакции
              </Typography>
              <Chip label="Все транзакции" size="small" variant="outlined" />
            </Stack>
            <Stack spacing={1.5}>
              {recentTransactions.map((tx) => (
                <Stack
                  key={tx.id}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: tx.type === "income" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                      mr: 2,
                    }}
                  >
                    {tx.type === "income" ? (
                      <MoneyRecive size={20} color="#4CAF50" />
                    ) : (
                      <MoneySend size={20} color="#F44336" />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {tx.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tx.student || tx.date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={tx.amount > 0 ? "success.main" : "error.main"}
                  >
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Expense Breakdown */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Wallet size={20} color="#F44336" />
              <Typography variant="h6" fontWeight={600}>
                Структура расходов
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight={700} color="error.main" mb={2}>
              ${totalExpenses.toLocaleString()}
            </Typography>
            <Stack spacing={2}>
              {expenseCategories.map((cat) => (
                <Box key={cat.name}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{cat.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${cat.amount.toLocaleString()} ({cat.percentage}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={cat.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: cat.color },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Branch Income */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Building size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                Доход по филиалам
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {branchIncome.map((branch) => (
                <Box key={branch.name}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{branch.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${branch.income.toLocaleString()} / ${branch.target.toLocaleString()}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((branch.income / branch.target) * 100, 100)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: branch.income >= branch.target ? "#4CAF50" : "#FF9800",
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Pending Payments */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Calendar size={20} color="#FF9800" />
              <Typography variant="h6" fontWeight={600}>
                Ожидающие оплаты
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {pendingPayments.map((payment) => (
                <Stack
                  key={payment.student}
                  direction="row"
                  alignItems="center"
                  sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Profile2User size={20} color="#6B7280" style={{ marginRight: 12 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {payment.student}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.course} • до {payment.dueDate}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end">
                    <Typography variant="body2" fontWeight={600}>
                      ${payment.amount}
                    </Typography>
                    {payment.daysOverdue > 0 && (
                      <Typography variant="caption" color="error.main">
                        {payment.daysOverdue} дн. просрочки
                      </Typography>
                    )}
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
