export type UserRole =
  | "VENDOR"
  | "MERCHANT"
  | "SOP_MANAGER"
  | "ADMIN"
  | "TECH"
  | "SAMPLING";

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  {
    path: "/user-detail",
    allowedRoles: ["ADMIN", "SOP_MANAGER"],
    redirectTo: "/dashboard",
  },
  {
    path: "/users",
    allowedRoles: ["ADMIN", "SOP_MANAGER"],
    redirectTo: "/dashboard",
  },
  // Add more restricted routes here as needed
];

// All other routes are accessible to all authenticated users
export const PUBLIC_ROUTES = [
  "/",
  "/Auth/Login",
  "/Auth/Change-Password",
  "/Auth/Forgot-Password",
  "/Auth/Reset-User-Password",
  "/Auth/Verify-OTP",
];
