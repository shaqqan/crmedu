import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import {
  Building,
  People,
  LanguageSquare,
  Notification,
  Category,
  Teacher,
  UserOctagon,
  Profile2User,
  Calendar,
  CalendarTick,
  Book1,
  DollarCircle,
  Chart,
  Wallet,
  DocumentText,
  ArrowDown2,
  ArrowUp2,
  Location,
  Shield,
  MoneySend,
  MoneyRecive,
  UserTag,
  ArrowLeft2,
  ArrowRight2,
} from "iconsax-react";
import { useNavigate, useLocation } from "react-router";
import { useAuthStore } from "@/shared/store";
import type { Permission, Role } from "@/shared/config/rbac";
import { roleNames } from "@/shared/config/rbac";

const DRAWER_WIDTH = 310;
const COLLAPSED_WIDTH = 88;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  permission?: Permission;
  children?: MenuItem[];
}

// CEO Menu - Full access with business analytics focus
const ceoMenuItems: MenuItem[] = [
  { text: "Дашборд", icon: <Category size={22} color="currentColor" />, path: "/ceo/dashboard", permission: "dashboard.view" },
  { text: "Филиалы", icon: <Building size={22} color="currentColor" />, path: "/ceo/branches", permission: "branches.view" },
  { text: "Отчеты", icon: <Chart size={22} color="currentColor" />, path: "/ceo/reports", permission: "reports.financial.view" },
  { text: "Сотрудники", icon: <People size={22} color="currentColor" />, path: "/ceo/employees", permission: "employees.view" },
  { text: "Финансы", icon: <DollarCircle size={22} color="currentColor" />, children: [
    { text: "Расходы", icon: <MoneySend size={22} color="currentColor" />, path: "/finance/expenses", permission: "finance.expenses.view" },
    { text: "Настройки зарплаты", icon: <Wallet size={22} color="currentColor" />, path: "/finance/salary-settings", permission: "finance.salary-settings.view" },
  ]},
];

// Admin Menu - Operations management
const adminMenuItems: MenuItem[] = [
  { text: "Дашборд", icon: <Category size={22} color="currentColor" />, path: "/admin/dashboard", permission: "dashboard.view" },
  { text: "Регионы", icon: <Location size={22} color="currentColor" />, path: "/admin/regions", permission: "regions.view" },
  { text: "Филиалы", icon: <Building size={22} color="currentColor" />, path: "/admin/branches", permission: "branches.view" },
  { text: "Сотрудники", icon: <People size={22} color="currentColor" />, path: "/admin/employees", permission: "employees.view" },
  { text: "Роли", icon: <Shield size={22} color="currentColor" />, path: "/admin/roles", permission: "roles.view" },
  { text: "Языки", icon: <LanguageSquare size={22} color="currentColor" />, path: "/admin/languages", permission: "languages.view" },
  { text: "Курсы", icon: <Book1 size={22} color="currentColor" />, path: "/admin/courses", permission: "courses.view" },
  { text: "Группы", icon: <Category size={22} color="currentColor" />, path: "/admin/groups", permission: "groups.view" },
  { text: "Аудитории", icon: <Building size={22} color="currentColor" />, path: "/admin/classrooms", permission: "classrooms.view" },
  { text: "Менторы", icon: <UserOctagon size={22} color="currentColor" />, path: "/admin/mentors", permission: "mentors.view" },
  { text: "Студенты", icon: <Profile2User size={22} color="currentColor" />, path: "/admin/students", permission: "students.view" },
  { text: "Расписание", icon: <Calendar size={22} color="currentColor" />, path: "/admin/schedule", permission: "schedule.view" },
  { text: "Праздники", icon: <CalendarTick size={22} color="currentColor" />, path: "/admin/holidays", permission: "holidays.view" },
  { text: "Новости", icon: <Notification size={22} color="currentColor" />, path: "/admin/news", permission: "news.view" },
];

// Financier Menu - Finance focused
const financierMenuItems: MenuItem[] = [
  { text: "Дашборд", icon: <Category size={22} color="currentColor" />, path: "/financier/dashboard", permission: "dashboard.view" },
  { text: "Расходы", icon: <MoneySend size={22} color="currentColor" />, path: "/financier/expenses", permission: "finance.expenses.view" },
  { text: "Типы расходов", icon: <Wallet size={22} color="currentColor" />, path: "/financier/expense-types", permission: "finance.expense-types.view" },
  { text: "Зарплаты", icon: <DollarCircle size={22} color="currentColor" />, path: "/finance/salary-settings", permission: "finance.salary-settings.view" },
  { text: "Фин. отчет", icon: <Chart size={22} color="currentColor" />, path: "/reports/financial", permission: "reports.financial.view" },
  { text: "Филиалы", icon: <Building size={22} color="currentColor" />, path: "/branches", permission: "branches.view" },
  { text: "Студенты", icon: <Profile2User size={22} color="currentColor" />, path: "/students", permission: "students.view" },
];

// Mentor Menu - Teaching focused
const mentorMenuItems: MenuItem[] = [
  { text: "Дашборд", icon: <Category size={22} color="currentColor" />, path: "/mentor/dashboard", permission: "dashboard.view" },
  { text: "Мои группы", icon: <Category size={22} color="currentColor" />, path: "/mentor/groups", permission: "groups.view" },
  { text: "Мои студенты", icon: <Profile2User size={22} color="currentColor" />, path: "/mentor/students", permission: "students.view" },
  { text: "Мое расписание", icon: <Calendar size={22} color="currentColor" />, path: "/mentor/schedule", permission: "schedule.view" },
  { text: "Davomat tarixi", icon: <CalendarTick size={22} color="currentColor" />, path: "/mentor/attendance-history", permission: "schedule.view" },
  { text: "Зарплата", icon: <DollarCircle size={22} color="currentColor" />, children: [
    { text: "Мониторинг", icon: <Chart size={22} color="currentColor" />, path: "/mentor/salary", permission: "dashboard.view" },
    { text: "История зарплаты", icon: <MoneyRecive size={22} color="currentColor" />, path: "/mentor/salary-history", permission: "dashboard.view" },
    { text: "Зарплата", icon: <Wallet size={22} color="currentColor" />, path: "/mentor/salary-info", permission: "dashboard.view" },
  ]},
];

// Receptionist Menu - Front desk operations
const receptionistMenuItems: MenuItem[] = [
  { text: "Дашборд", icon: <Category size={22} color="currentColor" />, path: "/receptionist/dashboard", permission: "dashboard.view" },
  { text: "Лиды", icon: <UserTag size={22} color="currentColor" />, path: "/receptionist/leads", permission: "leads.view" },
  { text: "Студенты", icon: <Profile2User size={22} color="currentColor" />, path: "/receptionist/students", permission: "students.view" },
  { text: "Расписание", icon: <Calendar size={22} color="currentColor" />, path: "/schedule", permission: "schedule.view" },
  { text: "Группы", icon: <Category size={22} color="currentColor" />, path: "/groups", permission: "groups.view" },
  { text: "Новости", icon: <Notification size={22} color="currentColor" />, path: "/news", permission: "news.view" },
];

// Role to menu mapping
const roleMenuMap: Record<Role, MenuItem[]> = {
  ceo: ceoMenuItems,
  admin: adminMenuItems,
  financier: financierMenuItems,
  mentor: mentorMenuItems,
  receptionist: receptionistMenuItems,
};

// Role badge colors
const roleBadgeColors: Record<Role, string> = {
  ceo: "#E91E63",
  admin: "#1264EB",
  financier: "#4CAF50",
  mentor: "#FF9800",
  receptionist: "#9C27B0",
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: "permanent" | "temporary";
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  variant = "permanent",
  collapsed = false,
  onCollapsedChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverItem, setPopoverItem] = useState<MenuItem | null>(null);
  const { can, user } = useAuthStore();

  const currentWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleToggleCollapse = () => {
    onCollapsedChange?.(!collapsed);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, item: MenuItem) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverItem(item);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverItem(null);
  };

  // Get menu items based on user role
  const userRole = user?.role || "admin";
  const baseMenuItems = roleMenuMap[userRole] || adminMenuItems;

  // Filter menu items based on user permissions
  const filteredMenuItems = useMemo(() => {
    const filterItems = (items: MenuItem[]): MenuItem[] => {
      return items
        .map((item) => {
          if (item.children) {
            const filteredChildren = item.children.filter(
              (child) => !child.permission || can(child.permission)
            );
            if (filteredChildren.length > 0) {
              return { ...item, children: filteredChildren };
            }
            return null;
          }
          if (!item.permission || can(item.permission)) {
            return item;
          }
          return null;
        })
        .filter((item): item is MenuItem => item !== null);
    };

    return filterItems(baseMenuItems);
  }, [can, baseMenuItems]);

  const handleToggleMenu = (text: string) => {
    setOpenMenus((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
  };

  const isMenuOpen = (text: string) => openMenus.includes(text);

  const listItemButtonStyles = {
    borderRadius: "8px",
    "&.Mui-selected": {
      bgcolor: "primary.main",
      color: "#FFFFFF",
      "&:hover": { bgcolor: "primary.main" },
      "& .MuiListItemIcon-root": { color: "#FFFFFF" },
    },
  };

  const drawerContent = (
    <Box sx={{ pl: collapsed ? 1 : 2, pr: collapsed ? 1 : 2, height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ height: 65, minHeight: "65px !important", px: collapsed ? 1 : 3, justifyContent: collapsed ? "center" : "flex-start" }}>
        {collapsed ? (
          <Typography variant="h5" fontWeight={700} color="primary" p={0} m={0}>
            F
          </Typography>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} color="primary" p={0} m={0}>
              FuckCRM
            </Typography>
            {user && (
              <Chip
                label={roleNames[userRole]}
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: roleBadgeColors[userRole],
                  color: "white",
                  fontSize: 10,
                  height: 20,
                }}
              />
            )}
          </>
        )}
      </Toolbar>
      <Divider sx={{ borderColor: "divider" }} variant="middle" />
      <List sx={{
        mt: 2,
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
        {filteredMenuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <Tooltip title={collapsed && !item.children ? item.text : ""} placement="right" arrow>
                <ListItemButton
                  selected={item.path ? location.pathname === item.path : false}
                  onClick={(e) => {
                    if (item.children) {
                      if (collapsed) {
                        handlePopoverOpen(e, item);
                      } else {
                        handleToggleMenu(item.text);
                      }
                    } else if (item.path) {
                      navigate(item.path);
                      if (variant === "temporary") onClose();
                    }
                  }}
                  sx={{
                    ...listItemButtonStyles,
                    justifyContent: collapsed ? "center" : "flex-start",
                    px: collapsed ? 1 : 2,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />}
                  {!collapsed && item.children &&
                    (isMenuOpen(item.text) ? (
                      <ArrowUp2 size={18} color="currentColor" />
                    ) : (
                      <ArrowDown2 size={18} color="currentColor" />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            {!collapsed && item.children && (
              <Collapse in={isMenuOpen(item.text)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.text} disablePadding>
                      <ListItemButton
                        selected={location.pathname === child.path}
                        onClick={() => {
                          if (child.path) {
                            navigate(child.path);
                            if (variant === "temporary") onClose();
                          }
                        }}
                        sx={{ ...listItemButtonStyles, pl: 6 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Popover for collapsed menu with children */}
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              ml: 1,
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              minWidth: 200,
            },
          },
        }}
      >
        {popoverItem && (
          <Box sx={{ py: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ px: 2, py: 1, color: "text.secondary", fontWeight: 600 }}
            >
              {popoverItem.text}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List disablePadding>
              {popoverItem.children?.map((child) => (
                <ListItem key={child.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === child.path}
                    onClick={() => {
                      if (child.path) {
                        navigate(child.path);
                        handlePopoverClose();
                      }
                    }}
                    sx={{
                      ...listItemButtonStyles,
                      mx: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>{child.icon}</ListItemIcon>
                    <ListItemText primary={child.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Popover>
      {/* Collapse toggle button */}
      {variant === "permanent" && (
        <Box sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}>
          <Tooltip title={collapsed ? "Kengaytirish" : "Yig'ish"} placement="right" arrow>
            <IconButton
              onClick={handleToggleCollapse}
              sx={{
                width: "100%",
                borderRadius: 2,
                bgcolor: "#F9FAFB",
                "&:hover": { bgcolor: "#F3F4F6" },
              }}
            >
              {collapsed ? (
                <ArrowRight2 size={20} color="#6B7280" />
              ) : (
                <ArrowLeft2 size={20} color="#6B7280" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  if (variant === "temporary") {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            bgcolor: "#FFFFFF",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: currentWidth,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          bgcolor: "#FFFFFF",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export const SIDEBAR_WIDTH = DRAWER_WIDTH;
export const SIDEBAR_COLLAPSED_WIDTH = COLLAPSED_WIDTH;
