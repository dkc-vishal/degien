import { apiClient } from "../client/axios-client";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  User,
} from "../types/auth";

export const authEndpoints = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post("/auth/login/", data),

  logout: (): Promise<void> => apiClient.post("/auth/logout/"),

  getProfile: (): Promise<User> => apiClient.get("/auth/profile/"),

  changePassword: (data: ChangePasswordRequest): Promise<void> =>
    apiClient.post("/auth/change-password/", data),

  forgotPassword: (email: string): Promise<void> =>
    apiClient.post("/auth/forgot-password/", { email }),

  refreshToken: (refreshToken: string): Promise<{ token: string }> =>
    apiClient.post("/auth/refresh/", { refreshToken }),
};
