import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import { Header } from "../Header";
import { Sidebar, SIDEBAR_WIDTH } from "../Sidebar";

export const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <Header onMenuClick={handleDrawerToggle} />

      {/* Mobile sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
      />

      {/* Desktop sidebar */}
      <Sidebar open={true} onClose={() => {}} variant="permanent" />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          height: "100%",
          overflowY: "auto",
          boxSizing: "border-box",
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
