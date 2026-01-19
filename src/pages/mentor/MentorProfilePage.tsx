import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  User,
  Call,
  Sms,
  Calendar,
  Location,
  Teacher,
  Category,
  Profile2User,
  Clock,
  Star1,
  Edit2,
  Camera,
  TickCircle,
  Medal,
  Chart,
  Book1,
  Shield,
  Key,
  Notification,
  Moon,
  DocumentText,
  Award,
} from "iconsax-react";
import { useAuthStore } from "@/shared/store";

// Mock mentor profile data
const mentorProfile = {
  id: "1",
  name: "Abdullayev Jasur",
  email: "jasur.abdullayev@educrm.uz",
  phone: "+998 90 123 45 67",
  birthDate: "1995-03-15",
  address: "Toshkent sh., Yunusobod tumani",
  joinDate: "2024-03-01",
  department: "Ingliz tili",
  position: "Senior Mentor",
  branch: "Asosiy filial",
  bio: "5 yillik tajribaga ega ingliz tili o'qituvchisi. IELTS 8.0, CELTA sertifikati. Interaktiv o'qitish metodlaridan foydalanaman.",
  languages: ["O'zbek", "Ingliz", "Rus"],
  certifications: [
    { name: "IELTS Academic", score: "8.0", date: "2023-06" },
    { name: "CELTA", score: "Pass A", date: "2022-08" },
    { name: "TKT Modules 1-3", score: "Band 4", date: "2021-12" },
  ],
  skills: ["Speaking", "Grammar", "IELTS Prep", "Business English", "Kids English"],
};

// Mentor statistics
const mentorStats = {
  totalStudents: 156,
  activeStudents: 67,
  totalGroups: 12,
  activeGroups: 4,
  totalLessons: 1240,
  avgRating: 4.8,
  totalReviews: 89,
  attendanceRate: 98.5,
  completionRate: 96.2,
};

// Achievement badges
const achievements = [
  { id: "1", title: "100 ta dars", icon: <Book1 size={20} color="#FFFFFF" />, color: "#1264EB", earned: true },
  { id: "2", title: "500 ta dars", icon: <Book1 size={20} color="#FFFFFF" />, color: "#4CAF50", earned: true },
  { id: "3", title: "1000 ta dars", icon: <Book1 size={20} color="#FFFFFF" />, color: "#FF9800", earned: true },
  { id: "4", title: "5 yulduzli mentor", icon: <Star1 size={20} color="#FFFFFF" />, color: "#E91E63", earned: true },
  { id: "5", title: "100 ta talaba", icon: <Profile2User size={20} color="#FFFFFF" />, color: "#9C27B0", earned: true },
  { id: "6", title: "Eng yaxshi davomat", icon: <TickCircle size={20} color="#FFFFFF" />, color: "#00BCD4", earned: false },
];

// Recent activity
const recentActivity = [
  { action: "Dars o'tkazdi", detail: "English B1 - Group 1", time: "Bugun, 10:30" },
  { action: "Baholash kiritdi", detail: "15 ta talaba baholandi", time: "Bugun, 11:45" },
  { action: "Davomat oldi", detail: "English A2 - Group 2", time: "Kecha, 14:00" },
  { action: "Guruhga qo'shildi", detail: "IELTS Prep - Group 5", time: "3 kun oldin" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const MentorProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: mentorProfile.name,
    phone: mentorProfile.phone,
    address: mentorProfile.address,
    bio: mentorProfile.bio,
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box>
      {/* Header Card */}
      <Paper
        sx={{
          p: 0,
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* Cover */}
        <Box
          sx={{
            height: 120,
            background: "linear-gradient(135deg, #1264EB 0%, #0D4FC9 100%)",
            position: "relative",
          }}
        />

        {/* Profile Info */}
        <Box sx={{ px: 3, pb: 3, mt: -6 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "center", sm: "flex-end" }}>
            {/* Avatar */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  bgcolor: "#FF9800",
                  fontSize: 48,
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {mentorProfile.name.charAt(0)}
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  bgcolor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": { bgcolor: "#F9FAFB" },
                }}
              >
                <Camera size={16} color="#6B7280" />
              </IconButton>
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" }, pt: { xs: 0, sm: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
                <Typography variant="h5" fontWeight={700}>
                  {mentorProfile.name}
                </Typography>
                <TickCircle size={20} color="#1264EB" variant="Bold" />
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {mentorProfile.position} • {mentorProfile.department}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: "center", sm: "flex-start" }}>
                <Chip
                  size="small"
                  icon={<Teacher size={14} color="#FF9800" />}
                  label="Mentor"
                  sx={{ bgcolor: "rgba(255, 152, 0, 0.1)", color: "#FF9800" }}
                />
                <Chip
                  size="small"
                  icon={<Star1 size={14} color="#FFA000" />}
                  label={`${mentorStats.avgRating} (${mentorStats.totalReviews})`}
                  sx={{ bgcolor: "rgba(255, 193, 7, 0.1)", color: "#FFA000" }}
                />
                <Chip
                  size="small"
                  icon={<Location size={14} color="#6B7280" />}
                  label={mentorProfile.branch}
                  variant="outlined"
                />
              </Stack>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={1} sx={{ pt: { xs: 0, sm: 2 } }}>
              <Button
                variant="outlined"
                startIcon={<Edit2 size={18} color="#1264EB" />}
                onClick={() => setEditDialogOpen(true)}
                sx={{ textTransform: "none" }}
              >
                Tahrirlash
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Jami talabalar", value: mentorStats.totalStudents, icon: <Profile2User size={22} color="#1264EB" />, color: "rgba(18, 100, 235, 0.1)" },
          { label: "Faol guruhlar", value: mentorStats.activeGroups, icon: <Category size={22} color="#4CAF50" />, color: "rgba(76, 175, 80, 0.1)" },
          { label: "O'tkazilgan darslar", value: mentorStats.totalLessons, icon: <Book1 size={22} color="#FF9800" />, color: "rgba(255, 152, 0, 0.1)" },
          { label: "Davomat %", value: `${mentorStats.attendanceRate}%`, icon: <TickCircle size={22} color="#E91E63" />, color: "rgba(233, 30, 99, 0.1)" },
        ].map((stat, index) => (
          <Grid key={index} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color }}>
                  {stat.icon}
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            px: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
          }}
        >
          <Tab label="Ma'lumotlar" />
          <Tab label="Yutuqlar" />
          <Tab label="Faoliyat" />
          <Tab label="Sozlamalar" />
        </Tabs>

        {/* Tab 1: Information */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 3, pt: 0 }}>
            <Grid container spacing={3}>
              {/* Contact Info */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Aloqa ma'lumotlari
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                      <Sms size={18} color="#1264EB" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body2">{mentorProfile.email}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
                      <Call size={18} color="#4CAF50" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Telefon</Typography>
                      <Typography variant="body2">{mentorProfile.phone}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
                      <Location size={18} color="#FF9800" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Manzil</Typography>
                      <Typography variant="body2">{mentorProfile.address}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(233, 30, 99, 0.1)" }}>
                      <Calendar size={18} color="#E91E63" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Tug'ilgan sana</Typography>
                      <Typography variant="body2">{formatDate(mentorProfile.birthDate)}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              {/* Work Info */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Ish ma'lumotlari
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                      <Teacher size={18} color="#1264EB" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Lavozim</Typography>
                      <Typography variant="body2">{mentorProfile.position}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
                      <Category size={18} color="#4CAF50" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Bo'lim</Typography>
                      <Typography variant="body2">{mentorProfile.department}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
                      <Location size={18} color="#FF9800" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Filial</Typography>
                      <Typography variant="body2">{mentorProfile.branch}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(233, 30, 99, 0.1)" }}>
                      <Clock size={18} color="#E91E63" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Ishga kirgan sana</Typography>
                      <Typography variant="body2">{formatDate(mentorProfile.joinDate)}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              {/* Bio */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Bio
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {mentorProfile.bio}
                  </Typography>
                </Paper>
              </Grid>

              {/* Skills */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Ko'nikmalar
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {mentorProfile.skills.map((skill) => (
                    <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Grid>

              {/* Languages */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Tillar
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {mentorProfile.languages.map((lang) => (
                    <Chip key={lang} label={lang} size="small" variant="outlined" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Grid>

              {/* Certifications */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Sertifikatlar
                </Typography>
                <Stack spacing={1.5}>
                  {mentorProfile.certifications.map((cert, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#F9FAFB",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                            <Award size={20} color="#1264EB" />
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {cert.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {cert.date}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip label={cert.score} size="small" color="primary" />
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Tab 2: Achievements */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ p: 3, pt: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={3}>
              Yutuq nishonlari
            </Typography>
            <Grid container spacing={2}>
              {achievements.map((achievement) => (
                <Grid key={achievement.id} size={{ xs: 6, sm: 4, md: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      textAlign: "center",
                      bgcolor: achievement.earned ? `${achievement.color}10` : "#F9FAFB",
                      border: "1px solid",
                      borderColor: achievement.earned ? `${achievement.color}30` : "divider",
                      opacity: achievement.earned ? 1 : 0.5,
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: achievement.earned ? "translateY(-2px)" : "none",
                        boxShadow: achievement.earned ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        bgcolor: achievement.earned ? achievement.color : "#E5E7EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1.5,
                        color: "white",
                      }}
                    >
                      {achievement.icon}
                    </Box>
                    <Typography variant="caption" fontWeight={500}>
                      {achievement.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Progress to next achievement */}
            <Paper elevation={0} sx={{ p: 3, mt: 4, borderRadius: 3, bgcolor: "#F9FAFB" }}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Keyingi yutuqqa progress
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Eng yaxshi davomat</Typography>
                    <Typography variant="body2" fontWeight={600}>85%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": { borderRadius: 4 },
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Box>
        </TabPanel>

        {/* Tab 3: Activity */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ p: 3, pt: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={3}>
              So'nggi faoliyat
            </Typography>
            <Stack spacing={2}>
              {recentActivity.map((activity, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#F9FAFB",
                    "&:hover": { bgcolor: "#F3F4F6" },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      mt: 0.8,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.detail}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </TabPanel>

        {/* Tab 4: Settings */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ p: 3, pt: 0 }}>
            <Stack spacing={3}>
              {/* Security */}
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Xavfsizlik
                </Typography>
                <Stack spacing={1.5}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#F9FAFB",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#F3F4F6" },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                        <Key size={18} color="#1264EB" />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>Parolni o'zgartirish</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Oxirgi o'zgarish: 30 kun oldin
                        </Typography>
                      </Box>
                    </Stack>
                    <Edit2 size={18} color="#6B7280" />
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#F9FAFB",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#F3F4F6" },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(76, 175, 80, 0.1)" }}>
                        <Shield size={18} color="#4CAF50" />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>Ikki bosqichli autentifikatsiya</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Yoqilmagan
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip label="Yoqish" size="small" color="primary" clickable />
                  </Paper>
                </Stack>
              </Box>

              {/* Notifications */}
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Bildirishnomalar
                </Typography>
                <Stack spacing={1.5}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#F9FAFB",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(255, 152, 0, 0.1)" }}>
                        <Notification size={18} color="#FF9800" />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>Push bildirishnomalar</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Yangi xabarlar haqida ogohlantirish
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip label="Yoqilgan" size="small" color="success" />
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#F9FAFB",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: "rgba(18, 100, 235, 0.1)" }}>
                        <Sms size={18} color="#1264EB" />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>Email bildirishnomalar</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Muhim yangilanishlar email orqali
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip label="Yoqilgan" size="small" color="success" />
                  </Paper>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </TabPanel>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Profilni tahrirlash
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="To'liq ism"
              fullWidth
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              label="Telefon"
              fullWidth
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />
            <TextField
              label="Manzil"
              fullWidth
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={3}
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ textTransform: "none" }}>
            Bekor qilish
          </Button>
          <Button
            variant="contained"
            onClick={() => setEditDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
