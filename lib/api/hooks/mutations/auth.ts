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

      if (user_data) {
        const transformedUserData = {
          ...user_data,
          department: user_data.department ?? null,
          designation: user_data.designation ?? null,
        };
        cacheUtils.auth.setUser(transformedUserData);
      }

      toast.success("welcome back!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "login failed";
      toast.error(message);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) =>
      authEndpoints.refreshToken(refreshToken),
    onSuccess: (data) => {
      // Store new tokens
      localStorage.setItem("auth_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      toast.success("Session refreshed successfully");
    },
    onError: (error: any) => {
      // Clear tokens and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");
      cacheUtils.global.clearAll();

      toast.error("Session expired. Please login again.");
      window.location.href = "/Auth/Login";
    },
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: authEndpoints.logout,
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");

      // Invalidate user data cache
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

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authEndpoints.resetPassword,
    onSuccess: () => {
      toast.success("Password reset email sent successfully");
    },
    onError: () => {
      toast.error("Failed to send password reset email");
    },
  });
};
