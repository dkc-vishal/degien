import { apiClient } from "../client/axios-client";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilter,
  PaginationResponse,
  CreateUserResponse,
  DepartmentResponse,
} from "../types/index";

export const userEndPoints = {
  getUsers: (
    endpoint?: string,
    filter?: UserFilter
  ): Promise<PaginationResponse<User>> =>
    apiClient.get(`${endpoint || "/users"}`, { params: filter }),
  getUserById: (id: string): Promise<User> => apiClient.get(`/users/${id}/`),
  createUser: (data: CreateUserRequest): Promise<CreateUserResponse> =>
    apiClient.post("/auth/create-user/", data),
  updateUser: (id: string, data: UpdateUserRequest): Promise<User> =>
    apiClient.post(`/auth/update-details/admin/${id}/`, data),
  deleteUser: (id: string): Promise<void> => apiClient.delete(`/users/${id}/`),
  getDepartments: (): Promise<DepartmentResponse> =>
    apiClient.get("/auth/departments/"),
};
