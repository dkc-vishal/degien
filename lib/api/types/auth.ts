import { PaginationResponse } from "./comman";

export interface User {
  user_id: string;
  email: string;
  name: string;
  department: string | null;
  designation?: string | null;
  is_vendor?: boolean;
}
export interface GetAllUsersResponse {
  data: User[];
  message: string;
  status: number;
  error_status: boolean;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    role: string;
    user_data: User;
  };
}

export interface FirstTimeLoginRequest {
  email: string;
  system_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ForgotPasswordResponse {
  data: {
    token: string;
  };
  error_status: boolean;
  message: string;
  status: number;
}

export interface VerifyOTPRequest {
  otp: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export type UserRole =
  | "vendor"
  | "merchant"
  | "sop manager"
  | "admin"
  | "tech"
  | "sampling";
export type Department = "production" | "sampling" | "factory" | "qa";
export type TypeOfUser = "staff" | "vendor";
export type DepartmentResponse = {
  [key: string]: string;
};

export interface ResetPasswordResponse {
  data: User;
  error_status: boolean;
  message: string;
  status: number;
}

export interface UserDetailResponse {
  data: User;
  error_status: boolean;
  message: string;
  status: number;
}
