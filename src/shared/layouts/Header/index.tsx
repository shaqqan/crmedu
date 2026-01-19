import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Notification,
  Building,
  User,
  Setting2,
  Logout,
  SearchNormal1,
  Calendar,
  Moon,
  Sun1,
  MessageQuestion,
  ArrowDown2,
  TickCircle,
  Clock,
  CloseCircle,
} from "iconsax-react";
import { SIDEBAR_WIDTH } from "../Sidebar";
import { useAuthStore } from "@/shared/store";
import { roleNames } from "@/shared/config/rbac";
import { useNavigate } from "react-router";

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarWidth?: number;
}

// Role badge colors
const roleBadgeColors: Record<string, string> = {
  ceo: "#E91E63",
  admin: "#1264EB",
  financier: "#4CAF50",
  mentor: "#FF9800",
  receptionist: "#9C27B0",
};

// Mock notifications
const notifications = [
  {
    id: "1",
    title: "Yangi talaba qo'shildi",
    description: "Abdullayev Jasur guruhga qo'shildi",
    time: "5 daqiqa oldin",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Dars boshlanmoqda",
    description: "English B1 - 10 daqiqada boshlanadi",
    time: "10 daqiqa oldin",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "To'lov qabul qilindi",
    description: "500,000 UZS to'lov tasdiqlandi",
    time: "1 soat oldin",
    type: "info",
    read: true,
  },
];

export const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarWidth = SIDEBAR_WIDTH }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [branch, setBranch] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const notifOpen = Boolean(notifAnchorEl);

  const userRole = user?.role || "admin";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "success":
        return <TickCircle size={18} color="#4CAF50" variant="Bold" />;
      case "warning":
        return <Clock size={18} color="#FF9800" variant="Bold" />;
      case "error":
        return <CloseCircle size={18} color="#F44336" variant="Bold" />;
      default:
        return <Notification size={18} color="#1264EB" variant="Bold" />;
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        bgcolor: "#FFFFFF",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        height: 65,
        transition: "width 0.3s ease, margin-left 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          height: 65,
          minHeight: "65px !important",
          justifyContent: "space-between",
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Left side */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Branch select */}
          <FormControl size="small" sx={{ minWidth: 180, display: { xs: "none", sm: "block" } }}>
            <Select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              displayEmpty
              startAdornment={
                <Building
                  size={18}
                  color="#6B7280"
                  style={{ marginRight: 8 }}
                />
              }
              sx={{
                bgcolor: "#F9FAFB",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": { bgcolor: "#F3F4F6" },
                transition: "all 0.2s",
              }}
            >
              <MenuItem value="main">Asosiy filial</MenuItem>
              <MenuItem value="branch1">Chilonzor filiali</MenuItem>
              <MenuItem value="branch2">Yunusobod filiali</MenuItem>
            </Select>
          </FormControl>

          {/* Search */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              bgcolor: searchFocused ? "#FFFFFF" : "#F9FAFB",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              border: "1px solid",
              borderColor: searchFocused ? "primary.main" : "transparent",
              transition: "all 0.2s",
              minWidth: 280,
              boxShadow: searchFocused ? "0 0 0 3px rgba(18, 100, 235, 0.1)" : "none",
            }}
          >
            <SearchNormal1 size={18} color="#9CA3AF" />
            <InputBase
              placeholder="Qidirish... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              sx={{
                ml: 1,
                flex: 1,
                fontSize: 14,
                "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
              }}
            />
            <Chip
              label="⌘K"
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                bgcolor: "#E5E7EB",
                color: "#6B7280",
                display: { xs: "none", lg: "flex" },
              }}
            />
          </Box>
        </Stack>

        {/* Right side */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Help */}
          <Tooltip title="Yordam">
            <IconButton
              sx={{
                bgcolor: "#F9FAFB",
                borderRadius: 2,
                "&:hover": { bgcolor: "#F3F4F6" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <MessageQuestion size={20} color="#6B7280" />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Bildirishnomalar">
            <IconButton
              onClick={handleNotifClick}
              sx={{
                bgcolor: notifOpen ? "rgba(18, 100, 235, 0.1)" : "#F9FAFB",
                borderRadius: 2,
                "&:hover": { bgcolor: notifOpen ? "rgba(18, 100, 235, 0.15)" : "#F3F4F6" },
              }}
            >
              <Badge
                badgeContent={unreadCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                <Notification size={20} color={notifOpen ? "#1264EB" : "#6B7280"} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notifAnchorEl}
            open={notifOpen}
            onClose={handleNotifClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                mt: 1,
                width: 360,
                maxHeight: 400,
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight={600}>
                  Bildirishnomalar
                </Typography>
                <Chip
                  label={`${unreadCount} ta yangi`}
                  size="small"
                  color="primary"
                  sx={{ height: 22, fontSize: 11 }}
                />
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ maxHeight: 280, overflow: "auto" }}>
              {notifications.map((notif) => (
                <ButtonBase
                  key={notif.id}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    p: 2,
                    bgcolor: notif.read ? "transparent" : "rgba(18, 100, 235, 0.03)",
                    "&:hover": { bgcolor: "#F9FAFB" },
                  }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor:
                          notif.type === "success"
                            ? "rgba(76, 175, 80, 0.1)"
                            : notif.type === "warning"
                            ? "rgba(255, 152, 0, 0.1)"
                            : "rgba(18, 100, 235, 0.1)",
                        height: "fit-content",
                      }}
                    >
                      {getNotifIcon(notif.type)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={notif.read ? 400 : 600}>
                        {notif.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notif.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                        {notif.time}
                      </Typography>
                    </Box>
                    {!notif.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          mt: 0.5,
                        }}
                      />
                    )}
                  </Stack>
                </ButtonBase>
              ))}
            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
              <ButtonBase
                sx={{
                  width: "100%",
                  p: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#F9FAFB" },
                }}
              >
                <Typography variant="body2" color="primary" fontWeight={500}>
                  Barchasini ko'rish
                </Typography>
              </ButtonBase>
            </Box>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: "none", sm: "block" } }} />

          {/* Profile */}
          <ButtonBase
            onClick={handleAvatarClick}
            sx={{
              borderRadius: 2,
              p: 0.75,
              "&:hover": { bgcolor: "#F9FAFB" },
              transition: "all 0.2s",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: roleBadgeColors[userRole],
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0) || "U"}
              </Avatar>
              <Box sx={{ textAlign: "left", display: { xs: "none", md: "block" } }}>
                <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                  {user?.name || "Foydalanuvchi"}
                </Typography>
                <Typography variant="caption" color="text.secondary" lineHeight={1}>
                  {roleNames[userRole]}
                </Typography>
              </Box>
              <ArrowDown2 size={16} color="#9CA3AF" style={{ display: "none" }} />
            </Stack>
          </ButtonBase>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              },
            }}
          >
            {/* User info */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: roleBadgeColors[userRole],
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {user?.name?.charAt(0) || "U"}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {user?.name || "Foydalanuvchi"}
                  </Typography>
                  <Chip
                    label={roleNames[userRole]}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      bgcolor: roleBadgeColors[userRole],
                      color: "#FFFFFF",
                      mt: 0.5,
                    }}
                  />
                </Box>
              </Stack>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/${userRole}/profile`);
              }}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <User size={20} color="#6B7280" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Profil</Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Setting2 size={20} color="#6B7280" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Sozlamalar</Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Calendar size={20} color="#6B7280" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">Jadval</Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: "error.main",
                "&:hover": { bgcolor: "rgba(244, 67, 54, 0.08)" },
              }}
            >
              <ListItemIcon>
                <Logout size={20} color="#F44336" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" color="error">
                  Chiqish
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
