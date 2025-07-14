"use client";
import React, { useState } from "react";
import { useRole } from "@/hooks/useRole";
import { UserRole } from "@/lib/types/roles";
import { roleUtils } from "@/lib/utils/role-utils";

const RoleTestingPage = () => {
  const { userRole, isAuthenticated } = useRole();
  const [testRole, setTestRole] = useState<UserRole | "">("");

  const allRoles: UserRole[] = [
    "ADMIN",
    "SOP_MANAGER",
    "VENDOR",
    "MERCHANT",
    "TECH",
    "SAMPLING",
  ];

  const setTestUserRole = (role: UserRole) => {
    localStorage.setItem("user_role", role);
    setTestRole(role);
    window.location.reload();
  };

  const clearRole = () => {
    localStorage.removeItem("user_role");
    setTestRole("");
    window.location.reload();
  };

  const currentRole = userRole || "No Role";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Role Testing Dashboard</h1>

      {/* Current Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-medium text-blue-800">Authentication</h3>
            <p className="text-blue-600">
              {isAuthenticated ? "✅ Authenticated" : "❌ Not Authenticated"}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-medium text-green-800">Current Role</h3>
            <p className="text-green-600 font-mono">{currentRole}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <h3 className="font-medium text-purple-800">Token Status</h3>
            <p className="text-purple-600">
              {localStorage.getItem("auth_token") ? "✅ Present" : "❌ Missing"}
            </p>
          </div>
        </div>
      </div>

      {/* Role Testing Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🎛️ Test Different Roles</h2>
        <p className="text-gray-600 mb-4">
          Switch between roles to test protected routes and components:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {allRoles.map((role) => (
            <button
              key={role}
              onClick={() => setTestUserRole(role)}
              className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                currentRole === role
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <button
          onClick={clearRole}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
        >
          Clear Role
        </button>
      </div>

      {/* Route Access Testing */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🛡️ Route Access Testing</h2>
        <div className="space-y-3">
          {[
            { path: "/dashboard", name: "Dashboard" },
            { path: "/user-detail", name: "User Management" },
            { path: "/reports", name: "Reports" },
            { path: "/example-roles", name: "Example Roles" },
          ].map((route) => {
            const hasAccess = roleUtils.hasRouteAccess(route.path, userRole);
            const requiredRoles = roleUtils.getRequiredRoles(route.path);

            return (
              <div
                key={route.path}
                className="flex items-center justify-between p-3 border rounded"
              >
                <div>
                  <span className="font-medium">{route.name}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({route.path})
                  </span>
                  {requiredRoles && (
                    <div className="text-xs text-gray-500 mt-1">
                      Required: {requiredRoles.join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      hasAccess
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {hasAccess ? "✅ Allowed" : "❌ Denied"}
                  </span>
                  <a
                    href={route.path}
                    className="text-blue-500 hover:text-blue-700 text-sm underline"
                  >
                    Visit
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Debug Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🐛 Debug Information</h2>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(
            {
              userRole,
              isAuthenticated,
              hasToken: !!localStorage.getItem("auth_token"),
              tokenValid: localStorage.getItem("auth_token")
                ? roleUtils.isValidToken(localStorage.getItem("auth_token")!)
                : false,
              currentPath: window.location.pathname,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default RoleTestingPage;
