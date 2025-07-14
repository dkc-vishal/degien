"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { roleUtils } from "@/lib/utils/role-utils";
import { UserRole } from "@/lib/types/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const userRole = roleUtils.getCurrentUserRole();

        console.log("🔍 Protected Route Check:", {
          pathname,
          token: token ? "✅ Present" : "❌ Missing",
          userRole: userRole || "❌ No role",
        });

        // Check if user is authenticated
        if (!token || !roleUtils.isValidToken(token)) {
          console.log("❌ Invalid or missing auth token, redirecting to login");
          // Clear invalid token
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_role");
          router.push("/Auth/Login");
          return;
        }

        // Check if user has access to current route
        const hasAccess = roleUtils.hasRouteAccess(pathname, userRole);

        console.log("🛡️ Access Check Result:", {
          hasAccess,
          userRole,
          pathname,
          requiredRoles: roleUtils.getRequiredRoles(pathname),
        });

        if (!hasAccess) {
          const redirectPath = roleUtils.getRedirectPath(pathname);
          console.log(
            `❌ Access denied for ${userRole} to ${pathname}, redirecting to ${redirectPath}`
          );
          router.push(redirectPath);
          return;
        }

        console.log("✅ Access granted");
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in access check:", error);
        router.push("/Auth/Login");
      }
    };

    checkAccess();
  }, [pathname, router]);

  // Loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">Checking permissions...</p>
          </div>
        </div>
      )
    );
  }

  // Not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Authorized - render children
  return <>{children}</>;
};

export default ProtectedRoute;
