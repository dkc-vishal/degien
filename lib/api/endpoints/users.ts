import { apiClient } from "../client/axios-client";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilters,
  PaginatedResponse,
} from "../types/user";

export const userEndPoints = {
  getUsers: (filter?: UserFilters): Promise<PaginatedResponse<User>> =>
    apiClient.get("/users/", { params: filter }),
  getUserById: (id: string): Promise<User> => apiClient.get(`/users/${id}/`),
  createUser: (data: CreateUserRequest): Promise<User> =>
    apiClient.post("/users/", data),
  updateUser: (id: string, data: UpdateUserRequest): Promise<User> =>
    apiClient.put(`/users/${id}/`, data),
  deleteUser: (id: string): Promise<void> => apiClient.delete(`/users/${id}/`),
};
