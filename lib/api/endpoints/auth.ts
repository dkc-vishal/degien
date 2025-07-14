import { apiClient } from "../client/axios-client";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordResponse,
  User,
  UserDetailResponse,
} from "../types/auth";

export const authEndpoints = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post("/auth/login/", data),

  logout: (): Promise<void> => apiClient.post("/auth/logout/"),

  getProfile: (): Promise<UserDetailResponse> => apiClient.get("/auth/user-detail/"),

  changePassword: (data: ChangePasswordRequest): Promise<void> =>
    apiClient.post("/auth/change-password/", data),

  forgotPassword: (email: string): Promise<void> =>
    apiClient.post("/auth/forgot-password/", { email }),

  resetPassword: (user_id: string): Promise<ResetPasswordResponse> =>
    apiClient.post("/auth/reset-password/admin/", { user_id }),

  refreshToken: (refreshToken: string): Promise<{ token: string }> =>
    apiClient.post("/auth/refresh/", { refreshToken }),
};
