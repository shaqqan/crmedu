import { API_URL } from "@/shared";
import type { Branch, BranchFormData } from "../types/branches.types";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const branchesApi = {
  getAll: async (): Promise<Branch[]> => {
    const response = await fetch(`${API_URL}/branches`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch branches");
    return response.json();
  },

  getById: async (id: number): Promise<Branch> => {
    const response = await fetch(`${API_URL}/branches/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch branch");
    return response.json();
  },

  create: async (data: BranchFormData): Promise<Branch> => {
    const response = await fetch(`${API_URL}/branches`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create branch");
    return response.json();
  },

  update: async (id: number, data: BranchFormData): Promise<Branch> => {
    const response = await fetch(`${API_URL}/branches/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update branch");
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/branches/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete branch");
  },
};
