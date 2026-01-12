import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role, Permission } from "../config/rbac";
import { rolePermissions, hasPermission, hasAnyPermission } from "../config/rbac";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  branchId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;

  // Permission helpers
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
  canAll: (permissions: Permission[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      can: (permission: Permission): boolean => {
        const { user } = get();
        if (!user) return false;
        return hasPermission(user.role, permission);
      },

      canAny: (permissions: Permission[]): boolean => {
        const { user } = get();
        if (!user) return false;
        return hasAnyPermission(user.role, permissions);
      },

      canAll: (permissions: Permission[]): boolean => {
        const { user } = get();
        if (!user) return false;
        return permissions.every((p) => hasPermission(user.role, p));
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useUserRole = () => useAuthStore((state) => state.user?.role);
export const usePermission = (permission: Permission) =>
  useAuthStore((state) => (state.user ? hasPermission(state.user.role, permission) : false));
