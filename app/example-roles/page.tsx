"use client";
import React from "react";
import { RoleGuard } from "@/components/Protected_Route";

const ExampleUsagePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Role-Based Access Example</h1>

      {/* Content visible to everyone */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Public Content</h2>
        <p>This content is visible to all authenticated users.</p>
      </div>

      {/* Content only for Admin and SOP Manager */}
      <RoleGuard allowedRoles={["ADMIN", "SOP_MANAGER"]}>
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Admin & SOP Manager Only
          </h2>
          <p className="text-blue-700">
            This content is only visible to Admin and SOP Manager roles.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Manage Users
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View Reports
            </button>
          </div>
        </div>
      </RoleGuard>

      {/* Content only for Admin */}
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-800">
            Admin Only
          </h2>
          <p className="text-red-700">
            This content is only visible to Admin role.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              System Settings
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Delete Users
            </button>
          </div>
        </div>
      </RoleGuard>

      {/* Content for specific roles with fallback */}
      <RoleGuard
        allowedRoles={["TECH", "SAMPLING"]}
        showFallback={true}
        fallback={
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-600">
              Access Restricted
            </h2>
            <p className="text-gray-500">
              This section is only available to Technical and Sampling staff.
            </p>
          </div>
        }
      >
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Technical Area
          </h2>
          <p className="text-green-700">
            This content is only visible to Tech and Sampling roles.
          </p>
        </div>
      </RoleGuard>
    </div>
  );
};

export default ExampleUsagePage;
