export interface User {
  user_id: string;
  email: string;
  name: string;
  department?: string | null;
  designation?: string | null;
  is_vendor: boolean;
}
export interface GetAllUsersResponse {
  data: User[];
  message: string;
  status: number;
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
    user_data: {
      user_id: string;
      email: string;
      name: string;
      department?: string | null;
      designation?: string | null;
      is_vendor: boolean;
    };
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UserRole = "admin" | "manager" | "employee";
export type Department = "admin" | "manager" | "employee";
