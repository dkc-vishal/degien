import { TypeOfUser, UserRole } from "./auth";
import { QueryParams } from "./comman";

export interface CreateUserRequest {
  email: string;
  name: string;
  department: string;
  type_of_user: TypeOfUser;
}

export interface CreateUserResponse {
  user_id: string;
  email: string;
  name: string;
  department: string;
  system_generated_password: string;
  type_of_user: TypeOfUser;
}

export interface UpdateUserRequest {
  name?: string;
  department?: string;
  is_active?: boolean;
}

export interface UpdateUserResponse {
  user_id: string;
  name: string;
  email: string;
  department: string;
  designation?: string;
  is_vendor?: boolean;
}

export interface UserFilter extends QueryParams {
  search?: string;
  role?: UserRole;
  departmentId?: string;
  is_active?: boolean;
}
