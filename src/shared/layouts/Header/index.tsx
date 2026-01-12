import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Notification,
  Global,
  Building,
  User,
  Setting2,
  Logout,
} from "iconsax-react";
import { SIDEBAR_WIDTH } from "../Sidebar";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [branch, setBranch] = useState("main");
  const [language, setLanguage] = useState("uz");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        bgcolor: "#FFFFFF",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        height: 65,
      }}
    >
      <Toolbar
        sx={{
          height: 65,
          minHeight: "65px !important",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              displayEmpty
              startAdornment={
                <Building
                  size={18}
                  color="currentColor"
                  style={{ marginRight: 8 }}
                />
              }
              sx={{
                bgcolor: "#F6F6F6",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              <MenuItem value="main">Asosiy filial</MenuItem>
              <MenuItem value="branch1">Chilonzor filiali</MenuItem>
              <MenuItem value="branch2">Yunusobod filiali</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Right side */}
        <Stack direction="row" alignItems="center" gap="16px">
          {/* Notification */}
          <IconButton
            color="inherit"
            sx={{
              bgcolor: "#F6F6F6",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#EBEBEB" },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notification size={22} color="currentColor" />
            </Badge>
          </IconButton>

          {/* Language select */}
          <FormControl size="small">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                bgcolor: "#F6F6F6",
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                minWidth: 100,
              }}
            >
              <MenuItem value="kaa">Qaraqalpaq</MenuItem>
              <MenuItem value="uz">O'zbek</MenuItem>
              <MenuItem value="ru">Руский</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>

          {/* Profile */}
          <IconButton onClick={handleAvatarClick} sx={{ ml: 1, p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#1264EB",
                cursor: "pointer",
              }}
            >
              A
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: "8px",
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <User size={20} color="currentColor" />
              </ListItemIcon>
              <ListItemText>Profil</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Setting2 size={20} color="currentColor" />
              </ListItemIcon>
              <ListItemText>Sozlamalar</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ color: "error.main" }}>
              <ListItemIcon>
                <Logout size={20} color="currentColor" />
              </ListItemIcon>
              <ListItemText>Chiqish</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
