import { apiClient } from "../client/axios-client";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  User,
  Department,
} from "../types/auth";

export const authEndpoints = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post("/auth/login/", data),

  logout: (): Promise<void> => apiClient.post("/auth/logout/"),

  getProfile: (): Promise<User> => apiClient.get("/auth/profile/"),

  changePassword: (data: ChangePasswordRequest): Promise<void> =>
    apiClient.post("/auth/change-password/", data),

  getDepartments: (): Promise<Department[]> =>
    apiClient.get("/auth/departments/"),

  refreshToken: (
    refreshToken: string
  ): Promise<{ access_token: string; refresh_token?: string }> =>
    apiClient.post("/token/refresh/", { refresh_token: refreshToken }),
};
