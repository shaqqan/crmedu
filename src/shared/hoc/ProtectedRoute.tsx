import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/shared/store";
import type { Permission } from "@/shared/config/rbac";
import { Box, Typography, Button } from "@mui/material";
import { SecuritySafe } from "iconsax-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // If true, requires all permissions; if false, requires any
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  permissions,
  requireAll = false,
}) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, can, canAny, canAll } = useAuthStore();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permissions if specified
  const hasAccess = (() => {
    if (permission) {
      return can(permission);
    }
    if (permissions && permissions.length > 0) {
      return requireAll ? canAll(permissions) : canAny(permissions);
    }
    return true; // No permission required
  })();

  // Show access denied if no permission
  if (!hasAccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: 400,
          gap: 2,
        }}
      >
        <SecuritySafe size={64} color="#E74C3C" variant="Bold" />
        <Typography variant="h5" fontWeight={600}>
          Доступ запрещен
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          У вас нет прав для просмотра этой страницы.
          <br />
          Обратитесь к администратору для получения доступа.
        </Typography>
        <Button variant="contained" href="/" sx={{ mt: 2 }}>
          На главную
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};

// Higher-order component version for easier use
export const withProtection = <P extends object>(
  Component: React.ComponentType<P>,
  permission?: Permission,
  permissions?: Permission[],
  requireAll?: boolean
) => {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        permission={permission}
        permissions={permissions}
        requireAll={requireAll}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};
