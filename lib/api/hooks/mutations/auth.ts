import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authEndpoints } from "../../endpoints/auth";
import { queryKeys } from "../../utils/query-keys";
import { use } from "react";

export const useLogin = () => {
  const queryClient = useQueryClient();

  // check and correct this function
  return useMutation({
    mutationFn: authEndpoints.login,
    
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("token", data.token);
      if (data.refreshToken) {
        localStorage.setItem("refresh_token", data.refreshToken);
      }
      // Cache user data
      queryClient.setQueryData(queryKeys.auth.profile(), data.user);

      toast.success("welcome back!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "login failed";
      toast.error(message);
    },
  });
};

export const useLogOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authEndpoints.logout,
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      // Invalidate user data cache
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });

      toast.success("Logged out successfully");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authEndpoints.changePassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });
};
