import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { useAuthStore } from "@/shared/store";
import { roleNames, type Role } from "@/shared/config/rbac";

// Demo users for testing different roles
const demoUsers: Record<Role, { id: string; email: string; name: string }> = {
  ceo: { id: "1", email: "ceo@educrm.uz", name: "Директор Иванов" },
  admin: { id: "2", email: "admin@educrm.uz", name: "Администратор Петрова" },
  financier: {
    id: "3",
    email: "finance@educrm.uz",
    name: "Финансист Сидорова",
  },
  mentor: { id: "4", email: "mentor@educrm.uz", name: "Ментор Козлов" },
  receptionist: {
    id: "5",
    email: "reception@educrm.uz",
    name: "Ресепшионист Морозова",
  },
};

export const DevRoleSwitcher: React.FC = () => {
  const { user, login, isAuthenticated } = useAuthStore();

  const handleRoleChange = (role: Role) => {
    const demoUser = demoUsers[role];
    login(
      {
        ...demoUser,
        role,
      },
      "demo-token-" + role
    );
  };

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        p: 2,
        zIndex: 9999,
        minWidth: 200,
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="caption" color="text.secondary">
            DEV Mode
          </Typography>
          <Chip label="RBAC Tester" size="small" color="warning" />
        </Stack>

        <FormControl size="small" fullWidth>
          <Select
            value={user?.role || ""}
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            displayEmpty
            MenuProps={{
              sx: { zIndex: 99999 },
            }}
          >
            <MenuItem value="" disabled>
              Выберите роль
            </MenuItem>
            {(Object.keys(roleNames) as Role[]).map((role) => (
              <MenuItem key={role} value={role}>
                {roleNames[role]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isAuthenticated && user && (
          <Typography variant="caption" color="text.secondary">
            {user.name}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
