import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userEndPoints } from "../../endpoints/index";
import { queryKeys } from "../../utils/query-keys";
import type { CreateUserRequest, UpdateUserRequest } from "../../types/index";

//check this function is work correct or not
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRequest) => userEndPoints.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create user";
      toast.error(message);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userEndPoints.updateUser(id, data),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      queryClient.setQueryData(queryKeys.users.detail(variable.id), data);
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userEndPoints.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete user";
      toast.error(message);
    },
  });
};
