import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import { Header } from "../Header";
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "../Sidebar";

export const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const currentSidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <Header onMenuClick={handleDrawerToggle} sidebarWidth={currentSidebarWidth} />

      {/* Mobile sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
      />

      {/* Desktop sidebar */}
      <Sidebar
        open={true}
        onClose={() => {}}
        variant="permanent"
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${currentSidebarWidth}px)` },
          height: "100vh",
          overflowY: "auto",
          boxSizing: "border-box",
          p: 3,
          transition: "width 0.3s ease",
        }}
      >
        <Box sx={{ mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
