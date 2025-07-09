import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authEndpoints } from "../../endpoints/auth";
import { cacheUtils } from "../../utils";

export const useLogin = () => {
  // check and correct this function
  return useMutation({
    mutationFn: authEndpoints.login,

    onSuccess: (response) => {
      const { access_token, refresh_token, role, user_data } =
        response.data || {};

      if (access_token) {
        localStorage.setItem("auth_token", access_token);
      }
      if (refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
      }

      if (role) {
        localStorage.setItem("user_role", role);
      }

      cacheUtils.auth.setUser(user_data);

      toast.success("welcome back!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "login failed";
      toast.error(message);
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: authEndpoints.logout,
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      // Invalidate user data cache
      // queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
      cacheUtils.global.clearAll();
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
