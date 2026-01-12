import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import {
  Building,
  Location,
  Profile2User,
  UserOctagon,
  DollarCircle,
  TrendUp,
  Eye,
  CloseCircle,
  Call,
  Sms,
} from "iconsax-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  students: number;
  mentors: number;
  groups: number;
  revenue: number;
  expenses: number;
  growth: number;
  status: "active" | "inactive";
}

const branches: Branch[] = [
  {
    id: "1",
    name: "Главный филиал",
    address: "ул. Навои, 23",
    phone: "+998 71 123 45 67",
    email: "main@educrm.uz",
    manager: "Иванов А.П.",
    students: 523,
    mentors: 12,
    groups: 24,
    revenue: 58500,
    expenses: 15200,
    growth: 18,
    status: "active",
  },
  {
    id: "2",
    name: "Филиал Чиланзар",
    address: "ул. Чиланзар, 15",
    phone: "+998 71 234 56 78",
    email: "chilanzar@educrm.uz",
    manager: "Петрова М.И.",
    students: 312,
    mentors: 8,
    groups: 16,
    revenue: 42200,
    expenses: 11800,
    growth: 12,
    status: "active",
  },
  {
    id: "3",
    name: "Филиал Юнусабад",
    address: "ул. Юнусабад, 7",
    phone: "+998 71 345 67 89",
    email: "yunusabad@educrm.uz",
    manager: "Сидоров К.В.",
    students: 245,
    mentors: 6,
    groups: 12,
    revenue: 31800,
    expenses: 9300,
    growth: 15,
    status: "active",
  },
  {
    id: "4",
    name: "Филиал Сергели",
    address: "ул. Сергели, 45",
    phone: "+998 71 456 78 90",
    email: "sergeli@educrm.uz",
    manager: "Козлова А.Н.",
    students: 154,
    mentors: 4,
    groups: 8,
    revenue: 23900,
    expenses: 6000,
    growth: 8,
    status: "active",
  },
];

export const CeoBranchesPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const totalStudents = branches.reduce((acc, b) => acc + b.students, 0);
  const totalRevenue = branches.reduce((acc, b) => acc + b.revenue, 0);
  const totalMentors = branches.reduce((acc, b) => acc + b.mentors, 0);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Филиалы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Обзор и сравнение филиалов
          </Typography>
        </Box>
        <Chip icon={<Building size={16} />} label={`${branches.length} филиалов`} color="primary" />
      </Stack>

      {/* Summary Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 4 }}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} color="primary">
              {totalStudents}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Всего студентов
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} color="success.main">
              ${(totalRevenue / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Общий доход
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {totalMentors}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Всего менторов
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Branches Grid */}
      <Grid container spacing={3}>
        {branches.map((branch) => (
          <Grid key={branch.id} size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.main" }}>
                    <Building size={24} color="#fff" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {branch.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Location size={14} color="#6B7280" />
                      <Typography variant="caption" color="text.secondary">
                        {branch.address}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Button size="small" startIcon={<Eye size={16} />} onClick={() => setSelectedBranch(branch)}>
                  Детали
                </Button>
              </Stack>

              <Grid container spacing={2} mb={2}>
                <Grid size={4}>
                  <Stack alignItems="center" sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                    <Profile2User size={20} color="#1264EB" />
                    <Typography variant="h6" fontWeight={700}>
                      {branch.students}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Студенты
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={4}>
                  <Stack alignItems="center" sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                    <UserOctagon size={20} color="#FF9800" />
                    <Typography variant="h6" fontWeight={700}>
                      {branch.mentors}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Менторы
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={4}>
                  <Stack alignItems="center" sx={{ p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                    <DollarCircle size={20} color="#4CAF50" />
                    <Typography variant="h6" fontWeight={700}>
                      ${(branch.revenue / 1000).toFixed(0)}K
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Доход
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Рост за месяц
                </Typography>
                <Chip
                  icon={<TrendUp size={14} />}
                  label={`+${branch.growth}%`}
                  size="small"
                  sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4CAF50" }}
                />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Branch Details Dialog */}
      <Dialog open={!!selectedBranch} onClose={() => setSelectedBranch(null)} maxWidth="sm" fullWidth>
        {selectedBranch && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                  {selectedBranch.name}
                </Typography>
                <IconButton onClick={() => setSelectedBranch(null)}>
                  <CloseCircle size={24} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Контакты
                  </Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Location size={16} color="#6B7280" />
                      <Typography variant="body2">{selectedBranch.address}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Call size={16} color="#6B7280" />
                      <Typography variant="body2">{selectedBranch.phone}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Sms size={16} color="#6B7280" />
                      <Typography variant="body2">{selectedBranch.email}</Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Управляющий
                  </Typography>
                  <Typography variant="body2">{selectedBranch.manager}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Финансы
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Paper sx={{ p: 2, bgcolor: "#F9FAFB", textAlign: "center" }}>
                        <Typography variant="h5" fontWeight={700} color="success.main">
                          ${selectedBranch.revenue.toLocaleString()}
                        </Typography>
                        <Typography variant="caption">Доход</Typography>
                      </Paper>
                    </Grid>
                    <Grid size={6}>
                      <Paper sx={{ p: 2, bgcolor: "#F9FAFB", textAlign: "center" }}>
                        <Typography variant="h5" fontWeight={700} color="error.main">
                          ${selectedBranch.expenses.toLocaleString()}
                        </Typography>
                        <Typography variant="caption">Расходы</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Прибыль
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    ${(selectedBranch.revenue - selectedBranch.expenses).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
