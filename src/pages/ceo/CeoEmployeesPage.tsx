import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Avatar,
  Chip,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  People,
  Building,
  Teacher,
  DollarCircle,
  TrendUp,
  SearchNormal1,
  Star1,
  Medal,
} from "iconsax-react";

interface Employee {
  id: string;
  name: string;
  role: string;
  branch: string;
  performance: number;
  salary: number;
  studentsCount?: number;
  rating?: number;
}

// Stats by role
const roleStats = [
  { role: "Менторы", count: 12, icon: <Teacher size={24} color="#4CAF50" />, color: "rgba(76, 175, 80, 0.1)" },
  { role: "Администраторы", count: 3, icon: <People size={24} color="#1264EB" />, color: "rgba(18, 100, 235, 0.1)" },
  { role: "Финансисты", count: 2, icon: <DollarCircle size={24} color="#FF9800" />, color: "rgba(255, 152, 0, 0.1)" },
  { role: "Ресепшионисты", count: 4, icon: <Building size={24} color="#9C27B0" />, color: "rgba(156, 39, 176, 0.1)" },
];

// Branch distribution
const branchStats = [
  { branch: "Главный офис", employees: 8, percentage: 38 },
  { branch: "Филиал Чиланзар", employees: 6, percentage: 29 },
  { branch: "Филиал Юнусабад", employees: 5, percentage: 24 },
  { branch: "Филиал Сергели", employees: 2, percentage: 9 },
];

// Top performers
const topPerformers: Employee[] = [
  { id: "1", name: "Сидоров Константин", role: "Ментор", branch: "Главный офис", performance: 98, salary: 4500000, studentsCount: 45, rating: 4.9 },
  { id: "2", name: "Козлова Анна", role: "Ментор", branch: "Филиал Юнусабад", performance: 95, salary: 4000000, studentsCount: 38, rating: 4.8 },
  { id: "3", name: "Петрова Мария", role: "Ментор", branch: "Филиал Чиланзар", performance: 92, salary: 4000000, studentsCount: 42, rating: 4.7 },
  { id: "4", name: "Иванов Алексей", role: "Администратор", branch: "Главный офис", performance: 90, salary: 5000000, rating: 4.6 },
  { id: "5", name: "Морозов Дмитрий", role: "Финансист", branch: "Главный офис", performance: 88, salary: 4500000, rating: 4.5 },
];

// All employees for table
const allEmployees: Employee[] = [
  { id: "1", name: "Сидоров Константин", role: "Ментор", branch: "Главный офис", performance: 98, salary: 4500000 },
  { id: "2", name: "Козлова Анна", role: "Ментор", branch: "Филиал Юнусабад", performance: 95, salary: 4000000 },
  { id: "3", name: "Петрова Мария", role: "Ментор", branch: "Филиал Чиланзар", performance: 92, salary: 4000000 },
  { id: "4", name: "Иванов Алексей", role: "Администратор", branch: "Главный офис", performance: 90, salary: 5000000 },
  { id: "5", name: "Морозов Дмитрий", role: "Финансист", branch: "Главный офис", performance: 88, salary: 4500000 },
  { id: "6", name: "Волкова Елена", role: "Ресепшионист", branch: "Филиал Чиланзар", performance: 85, salary: 3000000 },
  { id: "7", name: "Белов Сергей", role: "Ментор", branch: "Филиал Юнусабад", performance: 82, salary: 4000000 },
  { id: "8", name: "Кузнецова Ольга", role: "Ресепшионист", branch: "Главный офис", performance: 80, salary: 3000000 },
];

// Salary summary
const salarySummary = {
  total: 85500000,
  average: 4023000,
  highest: 5000000,
  lowest: 3000000,
};

export const CeoEmployeesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = allEmployees.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Сотрудники
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Обзор персонала и показатели эффективности
          </Typography>
        </Box>
        <Chip
          icon={<TrendUp size={16} />}
          label="21 сотрудник"
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* Role Stats */}
      <Grid container spacing={2} mb={3}>
        {roleStats.map((stat) => (
          <Grid key={stat.role} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: stat.color }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.role}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Branch Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Building size={20} color="#1264EB" />
              <Typography variant="h6" fontWeight={600}>
                По филиалам
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {branchStats.map((branch) => (
                <Box key={branch.branch}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{branch.branch}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {branch.employees} чел.
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={branch.percentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Salary Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <DollarCircle size={20} color="#4CAF50" />
              <Typography variant="h6" fontWeight={600}>
                Фонд зарплаты
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Box sx={{ p: 2, bgcolor: "rgba(76, 175, 80, 0.1)", borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Общий ФЗП (месяц)
                </Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">
                  {salarySummary.total.toLocaleString()} сум
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Средняя
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {salarySummary.average.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Макс.
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {salarySummary.highest.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Top Performers */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Medal size={20} color="#FF9800" />
              <Typography variant="h6" fontWeight={600}>
                Лучшие сотрудники
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {topPerformers.slice(0, 4).map((emp, index) => (
                <Stack
                  key={emp.id}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ p: 1, bgcolor: "#F9FAFB", borderRadius: 2 }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "#E0E0E0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: index < 3 ? "white" : "text.primary",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "#1264EB" }}>
                    {emp.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {emp.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {emp.role}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Star1 size={14} color="#FF9800" variant="Bold" />
                    <Typography variant="body2" fontWeight={600}>
                      {emp.rating}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* All Employees Table */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Все сотрудники
              </Typography>
              <TextField
                placeholder="Поиск..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: 250 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchNormal1 size={18} color="#9E9E9E" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Сотрудник</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Филиал</TableCell>
                    <TableCell>Эффективность</TableCell>
                    <TableCell align="right">Зарплата</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((emp) => (
                    <TableRow key={emp.id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "#1264EB" }}>
                            {emp.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {emp.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={emp.role} variant="outlined" />
                      </TableCell>
                      <TableCell>{emp.branch}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LinearProgress
                            variant="determinate"
                            value={emp.performance}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                            color={emp.performance >= 90 ? "success" : emp.performance >= 80 ? "primary" : "warning"}
                          />
                          <Typography variant="body2" fontWeight={500}>
                            {emp.performance}%
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight={500}>
                          {emp.salary.toLocaleString()} сум
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
