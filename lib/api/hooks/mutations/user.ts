import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userEndPoints } from "../../endpoints/index";
import type { CreateUserRequest, UpdateUserRequest } from "../../types/index";
import { cacheUtils } from "../../utils";

//check this function is work correct or not
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUserRequest) => userEndPoints.createUser(data),
    //check this function is work correct or not
    // mutationFn: userEndPoints.createUser,
    onSuccess: (newUser) => {
      cacheUtils.users.addUserToList(newUser);
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create user";
      toast.error(message);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userEndPoints.updateUser(id, data),
    onSuccess: (updatedUser, variable) => {
      cacheUtils.users.updateUserInList(variable.id, updatedUser);
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => userEndPoints.deleteUser(id),
    // mutationFn: userEndPoints.deleteUser,
    onSuccess: (_, deletedUserId) => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      cacheUtils.users.removeUserFromList(deletedUserId);
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to delete user";
      toast.error(message);
    },
  });
};
