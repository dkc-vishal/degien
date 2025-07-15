import { UserRole, ROUTE_PERMISSIONS, PUBLIC_ROUTES } from "@/lib/types/roles";

export const roleUtils = {
  /**
   * Get user role from localStorage
   */
  getCurrentUserRole(): UserRole | null {
    if (typeof window === "undefined") return null;
    const role = localStorage.getItem("user_role");
    return (role as UserRole) || null;
  },

  /**
   * Check if user has permission to access a route
   */
  hasRouteAccess(pathname: string, userRole: UserRole | null): boolean {
    // Public routes are always accessible
    if (PUBLIC_ROUTES.includes(pathname)) {
      return true;
    }

    // User must be authenticated
    if (!userRole) {
      return false;
    }

    // Check if route has specific restrictions
    const routePermission = ROUTE_PERMISSIONS.find((permission) =>
      pathname.startsWith(permission.path)
    );

    // If no specific restrictions, allow access to all authenticated users
    if (!routePermission) {
      return true;
    }

    // Check if user role is in allowed roles
    return routePermission.allowedRoles.includes(userRole);
  },

  /**
   * Get redirect path for unauthorized access
   */
  getRedirectPath(pathname: string): string {
    const routePermission = ROUTE_PERMISSIONS.find((permission) =>
      pathname.startsWith(permission.path)
    );

    return routePermission?.redirectTo || "/dashboard";
  },

  /**
   * Check if user is admin or SOP manager
   */
  isAdminOrSopManager(userRole: UserRole | null): boolean {
    return userRole === "admin" || userRole === "sop_manager";
  },

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(userRole: UserRole | null, allowedRoles: UserRole[]): boolean {
    return userRole ? allowedRoles.includes(userRole) : false;
  },

  /**
   * Get required roles for a specific route
   */
  getRequiredRoles(pathname: string): UserRole[] | null {
    const routePermission = ROUTE_PERMISSIONS.find((permission) =>
      pathname.startsWith(permission.path)
    );

    return routePermission?.allowedRoles || null;
  },

  /**
   * Validate token format and expiry
   */
  isValidToken(token: string): boolean {
    if (!token) return false;

    try {
      // Check if it's a JWT token
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      // Decode payload
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired
      if (payload.exp && payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("auth_token");
    return !!token && this.isValidToken(token);
  },

  /**
   * Filter menu items based on user permissions
   */
  filterMenuItemsByRole<T extends { requiredRoles?: UserRole[] }>(
    items: T[],
    userRole: UserRole | null,
    isAuthenticated: boolean
  ): T[] {
    return items.filter((item) => {
      // If no specific roles required, show to all authenticated users
      if (!item.requiredRoles) {
        return isAuthenticated;
      }

      // Check if user has required role for this menu item
      return (
        isAuthenticated &&
        userRole !== null &&
        item.requiredRoles.includes(userRole)
      );
    });
  },

  /**
   * Check if user can see a specific menu item
   */
  canSeeMenuItem(
    item: { requiredRoles?: UserRole[] },
    userRole: UserRole | null,
    isAuthenticated: boolean
  ): boolean {
    if (!item.requiredRoles) {
      return isAuthenticated;
    }

    return (
      isAuthenticated &&
      userRole !== null &&
      item.requiredRoles.includes(userRole)
    );
  },
};
