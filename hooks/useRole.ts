import { useState, useEffect } from "react";
import { roleUtils } from "@/lib/utils/role-utils";
import { UserRole } from "@/lib/types/roles";

export const useRole = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const role = roleUtils.getCurrentUserRole();
      const authenticated = roleUtils.isAuthenticated();

      setUserRole(role);
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    }
  }, []);

  return {
    userRole,
    isLoading,
    isAuthenticated,
    isAdmin: userRole === "ADMIN",
    isSopManager: userRole === "SOP_MANAGER",
    isAdminOrSopManager: roleUtils.isAdminOrSopManager(userRole),
    hasRole: (roles: UserRole[]) => roleUtils.hasAnyRole(userRole, roles),
  };
};
