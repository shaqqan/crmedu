import { LoginCredentials, RegisterData, AuthResponse } from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem("accessToken");
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) throw new Error("Token refresh failed");
    return response.json();
  },

  getProfile: async (): Promise<AuthResponse["user"]> => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to get profile");
    return response.json();
  },
};
