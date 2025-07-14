import { apiClient } from "../client/axios-client";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordResponse,
  User,
  UserDetailResponse,
  Department,
} from "../types/auth";

export const authEndpoints = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post("/auth/login/", data),

  logout: (): Promise<void> => apiClient.post("/auth/logout/"),

  getProfile: (): Promise<UserDetailResponse> => apiClient.get("/auth/user-detail/"),

  changePassword: (data: ChangePasswordRequest): Promise<void> =>
    apiClient.post("/auth/change-password/", data),

  getDepartments: (): Promise<Department[]> =>
    apiClient.get("/auth/departments/"),

  resetPassword: (user_id: string): Promise<ResetPasswordResponse> =>
    apiClient.post("/auth/reset-password/admin/", { user_id }),

  refreshToken: (
    refreshToken: string
  ): Promise<{ access_token: string; refresh_token?: string }> =>
    apiClient.post("/token/refresh/", { refresh_token: refreshToken }),
};
