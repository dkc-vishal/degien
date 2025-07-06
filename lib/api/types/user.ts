export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  departmentId?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  departmentId?: string;
  isActive?: boolean;
}

export interface UserFilter extends QueryParams {
  search?: string;
  role?: UserRole;
  departmentId?: string;
  isActive?: boolean;
}
