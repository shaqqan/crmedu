import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import {
  DollarCircle,
  Calendar,
  Wallet,
  Category,
  Clock,
  TickCircle,
  DocumentText,
  Building,
  Teacher,
  Star1,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Mentor salary info
const salaryInfo = {
  baseSalary: 5000000,
  perLessonRate: 50000,
  currency: "UZS",
  paymentDay: 5,
  contractStart: "2024-03-01",
  contractType: "Doimiy",
  position: "Mentor",
  department: "Ingliz tili",
  branch: "Asosiy filial",
  workSchedule: "Dushanba - Shanba",
  workHours: "09:00 - 18:00",
};

// Bonus structure
const bonusStructure = [
  { title: "Yuqori davomat (95%+)", amount: 500000, type: "monthly" },
  { title: "Yangi guruh ochish", amount: 300000, type: "one-time" },
  { title: "Talaba tavsiyasi", amount: 100000, type: "per-student" },
  { title: "IELTS 7.0+ natija", amount: 200000, type: "per-student" },
];

// Deduction rules
const deductionRules = [
  { title: "Kechikish (15+ min)", amount: 50000, type: "per-case" },
  { title: "Dars bekor qilish", amount: 100000, type: "per-lesson" },
  { title: "Sababsiz yo'qlama", amount: 200000, type: "per-day" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const MentorSalaryInfoPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Maosh ma'lumotlari
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Shartnoma va to'lov shartlari
          </Typography>
        </Box>
        <Chip
          icon={<TickCircle size={16} />}
          label="Faol shartnoma"
          color="success"
          variant="outlined"
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Employee Info Card */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Stack alignItems="center" spacing={2} mb={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: 32,
                }}
              >
                {user?.name?.charAt(0) || "M"}
              </Avatar>
              <Box textAlign="center">
                <Typography variant="h6" fontWeight={600}>
                  {user?.name || "Mentor"}
                </Typography>
                <Chip
                  size="small"
                  icon={<Teacher size={14} />}
                  label={salaryInfo.position}
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                  <Category size={18} color="#1264EB" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Bo'lim</Typography>
                  <Typography variant="body2" fontWeight={500}>{salaryInfo.department}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
                  <Building size={18} color="#4CAF50" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Filial</Typography>
                  <Typography variant="body2" fontWeight={500}>{salaryInfo.branch}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
                  <Calendar size={18} color="#FF9800" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Ish jadvali</Typography>
                  <Typography variant="body2" fontWeight={500}>{salaryInfo.workSchedule}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(233, 30, 99, 0.1)" }}>
                  <Clock size={18} color="#E91E63" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Ish soatlari</Typography>
                  <Typography variant="body2" fontWeight={500}>{salaryInfo.workHours}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Salary Details */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Main Salary Info */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <DollarCircle size={20} color="#1264EB" />
                <Typography variant="h6" fontWeight={600}>
                  Asosiy maosh
                </Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: "rgba(18, 100, 235, 0.05)",
                      border: "1px solid rgba(18, 100, 235, 0.1)",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Bazaviy maosh
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="primary.main">
                      {formatCurrency(salaryInfo.baseSalary)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      oyiga
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: "rgba(76, 175, 80, 0.05)",
                      border: "1px solid rgba(76, 175, 80, 0.1)",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Har bir dars uchun
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      {formatCurrency(salaryInfo.perLessonRate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      darsiga
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Calendar size={18} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">To'lov kuni</Typography>
                      <Typography variant="body2" fontWeight={500}>Har oyning {salaryInfo.paymentDay}-kuni</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <DocumentText size={18} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Shartnoma turi</Typography>
                      <Typography variant="body2" fontWeight={500}>{salaryInfo.contractType}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Clock size={18} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Boshlanish</Typography>
                      <Typography variant="body2" fontWeight={500}>{formatDate(salaryInfo.contractStart)}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Wallet size={18} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Valyuta</Typography>
                      <Typography variant="body2" fontWeight={500}>{salaryInfo.currency}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Bonuses */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Star1 size={20} color="#FF9800" />
                <Typography variant="h6" fontWeight={600}>
                  Bonuslar
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {bonusStructure.map((bonus, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "#F9FAFB",
                      "&:hover": { bgcolor: "#F3F4F6" },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4CAF50" }} />
                      <Typography variant="body2">{bonus.title}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        +{formatCurrency(bonus.amount)}
                      </Typography>
                      <Chip
                        size="small"
                        label={
                          bonus.type === "monthly" ? "oylik" :
                          bonus.type === "one-time" ? "bir martalik" : "har bir"
                        }
                        sx={{ fontSize: 10, height: 20 }}
                      />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {/* Deductions */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Wallet size={20} color="#F44336" />
                <Typography variant="h6" fontWeight={600}>
                  Ushlab qolishlar
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {deductionRules.map((rule, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "#F9FAFB",
                      "&:hover": { bgcolor: "#F3F4F6" },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#F44336" }} />
                      <Typography variant="body2">{rule.title}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={600} color="error.main">
                        -{formatCurrency(rule.amount)}
                      </Typography>
                      <Chip
                        size="small"
                        label={
                          rule.type === "per-case" ? "har holat" :
                          rule.type === "per-lesson" ? "har dars" : "har kun"
                        }
                        sx={{ fontSize: 10, height: 20 }}
                      />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
