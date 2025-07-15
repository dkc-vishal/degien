import { apiClient } from "../client/axios-client";
import { UpdateUserRequest, UpdateUserResponse } from "../types";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordResponse,
  User,
  UserDetailResponse,
  Department,
  FirstTimeLoginRequest,
  ForgotPasswordResponse,
  VerifyOTPRequest,
} from "../types/auth";

export const authEndpoints = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post("/auth/login/", data),

  logout: (data: { refresh: string }): Promise<void> =>
    apiClient.post("/auth/logout/", data),

  getProfile: (): Promise<UserDetailResponse> =>
    apiClient.get("/auth/user-detail/"),

  updateProfile: (data: UpdateUserRequest): Promise<UpdateUserResponse> =>
    apiClient.post("/auth/user-detail/", data),

  changePassword: (data: ChangePasswordRequest): Promise<void> =>
    apiClient.post("/auth/change-password/", data),

  firstTimeLogin: (data: FirstTimeLoginRequest): Promise<void> =>
    apiClient.post("/auth/change-system-password/", data),

  forgotPassword: (email: string): Promise<ForgotPasswordResponse> =>
    apiClient.post("/auth/reset-password/self/request/", { email }),

  verifyOTP: (data: VerifyOTPRequest): Promise<void> =>
    apiClient.post("/auth/reset-password/self/change/", data),

  getDepartments: (): Promise<Department[]> =>
    apiClient.get("/auth/departments/"),

  resetPassword: (user_id: string): Promise<ResetPasswordResponse> =>
    apiClient.post("/auth/reset-password/admin/", { user_id }),

  refreshToken: (
    refreshToken: string
  ): Promise<{ access_token: string; refresh_token?: string }> =>
    apiClient.post("/token/refresh/", { refresh_token: refreshToken }),
};
