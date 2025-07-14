"use client";
import React from "react";
import { roleUtils } from "@/lib/utils/role-utils";
import { UserRole } from "@/lib/types/roles";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback,
  showFallback = false,
}) => {
  const userRole = roleUtils.getCurrentUserRole();
  const hasAccess = roleUtils.hasAnyRole(userRole, allowedRoles);

  if (!hasAccess) {
    if (showFallback && fallback) {
      return <>{fallback}</>;
    }
    return null; // Don't render anything
  }

  return <>{children}</>;
};

export default RoleGuard;
