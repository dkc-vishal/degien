export type UserRole =
  | "vendor"
  | "merchant"
  | "sop_manager"
  | "admin"
  | "tech"
  | "sampling";

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  {
    path: "/user-detail",
    allowedRoles: ["admin", "sop_manager"],
    redirectTo: "/dashboard",
  },
  {
    path: "/users",
    allowedRoles: ["admin", "sop_manager"],
    redirectTo: "/dashboard",
  },
  // Add more restricted routes here as needed
];

// All other routes are accessible to all authenticated users
export const PUBLIC_ROUTES = [
  "/",
  "/Auth/Login",
  "/Auth/first_time_login",
  "/Auth/Forgot-Password",
  "/Auth/Reset-User-Password",
  "/Auth/Verify-OTP",
];
