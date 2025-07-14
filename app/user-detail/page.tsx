"use client";
import React, { use, useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import SuccessModal from "./SuccessModal";
import ConfirmInactiveModal from "./ConfirmInactiveModal";
import UpdateUserModal from "./UpdateUserModal";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa6";
import ResetPasswordModal from "./ResetPasswordModal";
import { API_ENDPOINTS } from "@/lib/api";
import { useUpdateUser, useUsers } from "@/lib/api/hooks";
import { User } from "@/lib/api/types";

const UserDetailsPage: React.FC = () => {
  // const [activeUsers, setActiveUsers] = useState<User[]>([]);
  // const [inActiveUsers, setInActiveUsers] = useState<User[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [createdUser, setCreatedUser] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  const endpoint =
    activeTab === "active"
      ? API_ENDPOINTS.activeUsers.url
      : API_ENDPOINTS.inActiveUsers.url;

  const {
    data: users,
    isLoading,
    isError,
    error: apiError,
  } = useUsers(endpoint, undefined, activeTab);

  const UpdateUserMutation = useUpdateUser();

  useEffect(() => {
    if (!isError && apiError) {
      const errorMessage =
        (apiError as any)?.response?.data?.message ||
        (apiError as any)?.message ||
        "Failed to fetch users";
      toast.error(errorMessage);
    }
  }, [isError, apiError]);

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleInactive = (user: User) => {
    const payload = {
      id: user.user_id,
      data: {
        is_active: false,
      },
    };
    UpdateUserMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("User marked as inactive.");
      },
    });
  };

  // const displayedUsers = activeTab === "active" ? activeUsers : inActiveUsers;
  const displayedUsers = users?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mt-6 mb-4 gap-4 flex-wrap">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Management
            </h2>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white hover:text-blue-400 transition-colors duration-200 border border-transparent hover:border-blue-400 cursor-pointer"
              onClick={() => setShowAddUserModal(true)}
            >
              <FaUserPlus className="w-5 h-5" />
              <span>Add New User</span>
            </a>
          </div>

          <div className="flex gap-4 mb-9">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "inactive"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } cursor-pointer`}
            >
              Inactive Users
            </button>
          </div>

          {/* Loading Skeleton */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg text-center text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="w-12">S. No</th>
                  <th className="px-2 py-3">Employee Name</th>
                  <th className="px-2 py-3">Email</th>
                  <th className="px-2 py-3">Department</th>
                  {activeTab === "active" && (
                    <th className="px-4 py-3">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-2 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    {activeTab === "active" && (
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-3">
                          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (isError) {
    return (
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mt-6 mb-4 gap-4 flex-wrap">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Management
            </h2>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white hover:text-blue-400 transition-colors duration-200 border border-transparent hover:border-blue-400 cursor-pointer"
              onClick={() => setShowAddUserModal(true)}
            >
              <FaUserPlus className="w-5 h-5" />
              <span>Add New User</span>
            </a>
          </div>

          <div className="flex gap-4 mb-9">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-2 rounded-lg font-medium ${
                activeTab === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "inactive"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } cursor-pointer`}
            >
              Inactive Users
            </button>
          </div>

          {/* Error State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Failed to Load Users
            </h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              {(apiError as any)?.response?.data?.message ||
                (apiError as any)?.message ||
                "There was an error loading the user data. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mt-6 mb-4 gap-4 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-800">
            User Management
          </h2>
          <a
            className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white hover:text-blue-400 transition-colors duration-200 border border-transparent hover:border-blue-400 cursor-pointer"
            onClick={() => setShowAddUserModal(true)}
          >
            <FaUserPlus className="w-5 h-5" />
            <span>Add New User</span>
          </a>
        </div>

        <div className="flex gap-4 mb-9">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-3 py-2 rounded-lg font-medium ${
              activeTab === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 cursor-pointer"
            }`}
          >
            Active Users
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "inactive"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } cursor-pointer`}
          >
            Inactive Users
          </button>
        </div>

        {displayedUsers?.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No users found.</div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg text-center text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="w-12">S. No</th>
                  <th className="px-2 py-3">Employee Name</th>
                  <th className="px-2 py-3">Email</th>
                  <th className="px-2 py-3">Department</th>
                  {activeTab === "active" && (
                    <th className="px-4 py-3">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user: User, index: number) => (
                  <tr
                    key={user.user_id}
                    className="hover:bg-gray-50 transition border-b border-gray-200"
                  >
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.is_vendor ? "-" : user.department}
                    </td>
                    {activeTab === "active" && (
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleInactive(user)}
                            className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                          >
                            Mark Inactive
                          </button>
                          <button
                            onClick={() => handleResetPassword(user)}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded cursor-pointer"
                          >
                            Reset Password
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <AddUserForm
              onClose={() => setShowAddUserModal(false)}
              onSuccess={(user) => {
                // setActiveUsers((prev) => [
                //   ...prev,
                //   {
                //     ...user,
                //     is_vendor: user.type_of_user === "vendor",
                //   },
                // ]);
                setCreatedUser({
                  ...user,
                  is_vendor: user.type_of_user === "vendor",
                });
                setShowSuccessModal(true);
                setShowAddUserModal(false);
              }}
              existingUsers={users?.data || []}
            />
          </div>
        </div>
      )}

      {showModal && selectedUser && (
        <ResetPasswordModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {showSuccessModal && createdUser && (
        <SuccessModal
          user={createdUser}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {showUpdateModal && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onCancel={() => setShowUpdateModal(false)}
          onUpdate={() => setShowUpdateModal(false)}
        />
      )}
    </main>
  );
};

export default UserDetailsPage;
