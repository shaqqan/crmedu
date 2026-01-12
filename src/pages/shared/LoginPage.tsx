import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { LoginForm } from "@/features/auth";

export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F6F6F6",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  );
};
