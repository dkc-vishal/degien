import { apiClient } from "../client/axios-client";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilter,
  PaginationResponse,
} from "../types/index";

export const userEndPoints = {
  getUsers: (filter?: UserFilter): Promise<PaginationResponse<User>> =>
    apiClient.get("/users/", { params: filter }),
  getUserById: (id: string): Promise<User> => apiClient.get(`/users/${id}/`),
  createUser: (data: CreateUserRequest): Promise<User> =>
    apiClient.post("/users/", data),
  updateUser: (id: string, data: UpdateUserRequest): Promise<User> =>
    apiClient.put(`/users/${id}/`, data),
  deleteUser: (id: string): Promise<void> => apiClient.delete(`/users/${id}/`),
};
