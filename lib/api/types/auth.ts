export interface User {
  user_id: string;
  email: string;
  name: string;
  department: string | null;
  designation?: string | null;
  is_vendor?: boolean;
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
  data: {
    department: string;
    email: string;
    name: string;
    system_generated_password: string;
    type_of_user: TypeOfUser;
    user_id: string;
  };
  error_status: boolean;
  message: string;
  status: number;
}

export interface UserDetailResponse {
  data: {
    user_id: string;
    email: string;
    name: string;
    department: string | null;
    designation?: string | null;
    is_vendor?: boolean;
  };
  error_status: boolean;
  message: string;
  status: number;
}
