"use client";
import React, { useEffect, useState } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { LuShieldOff } from "react-icons/lu";
import AddUserForm from "../../components/core/AddUserForm";
import { RxCross2 } from "react-icons/rx";
import SuccessModal from "./SuccessModal";
import ConfirmInactiveModal from "./ConfirmInactiveModal";
import UpdateUserModal from "./UpdateUserModal";

interface User {
  id: number;
  username: string;
  email: string;
  department: string;
}

const UserDetailsPage: React.FC = () => {

  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    }
    return [];
  });

  const [inactiveUsers, setInactiveUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const storedInactiveUsers = localStorage.getItem("inactiveUsers");
      return storedInactiveUsers ? JSON.parse(storedInactiveUsers) : [];
    }
    return [];
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [createdUser, setCreatedUser] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmInactiveModal, setShowConfirmInactiveModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "inactive">("all");

  const handleDelete = (id: number) => {
    const userToDeactivate = users.find((u) => u.id === id);
    if (userToDeactivate) {
      setInactiveUsers((prev) => [...prev, userToDeactivate]);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
    setShowConfirmInactiveModal(false);
  };

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmResetPassword = () => {
    if (selectedUser) {
      alert(`Password reset link sent to ${selectedUser.email}`);
    }
    setShowModal(false);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowUpdateModal(false);
  };

  // active users 

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // inactive users 

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("inactiveUsers", JSON.stringify(inactiveUsers));
    }
  }, [inactiveUsers]);

  const displayedUsers = activeTab === "all" ? users : inactiveUsers;

  return (
    <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between mt-6 mb-4 gap-4 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
          <a
            className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-white hover:text-blue-400 transition-colors duration-200 border border-transparent hover:border-blue-400 cursor-pointer"
            onClick={() => setShowAddUserModal(true)}
          >
            <UserPlus className="w-5 h-5 transition-colors duration-200" />
            <span>Add New User</span>
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-2 rounded-lg font-medium ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 cursor-pointer"}`}
          >
            All Users
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === "inactive" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer`}
          >
            Inactive Users
          </button>
        </div>

        {/* Table */}
        {displayedUsers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No users found.</div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg text-center text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="w-12 whitespace-nowrap text-center">S. No</th>
                  <th className="px-2 py-3">Employee Name</th>
                  <th className="px-2 py-3">Email</th>
                  <th className="px-2 py-3">Department</th>
                  {activeTab === "all" && <th className="px-4 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition text-gray-700 border-b border-gray-200">
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.department}</td>
                    {activeTab === "all" && (
                      <td className="px-4 py-4">
                        <div className="w-full flex justify-center">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleUpdate(user)}
                              className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                              title="Update"
                            >
                              {/* <Pencil className="w-4 h-4" /> */}
                              <span>Update</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowConfirmInactiveModal(true);
                              }}
                              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                              title="Mark Inactive"
                            >
                              {/* <LuShieldOff className="w-4 h-4" strokeWidth={3.1} /> */}
                              <span>Mark Inactive</span>
                            </button>

                            <button
                              onClick={() => handleResetPassword(user)}
                              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                            >
                              <span>Reset Password</span>
                            </button>
                          </div>
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

      {/* Modals */}

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-5 right-7 text-red-400 hover:text-red-500 cursor-pointer text-xl font-bold"
              aria-label="Close"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <AddUserForm
              onClose={() => setShowAddUserModal(false)}
              onSuccess={(user) => {
                setUsers((prev) => [...prev, user]); // ✅ Adds user to state
                setCreatedUser({
                  ...user, 
                  name: user.username
                });
                setShowSuccessModal(true);
                setShowAddUserModal(false);
              }}
            />
          </div>
        </div>
      )}

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Confirm Password Reset
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Send a password reset link to:
              <br />
              <span className="font-medium text-blue-600">{selectedUser.email}</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmResetPassword}
                className="bg-green-600 hover:bg-white hover:text-green-600 border border-green-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-white hover:text-gray-700 border border-gray-400 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && createdUser && (
        <SuccessModal user={createdUser} onClose={() => setShowSuccessModal(false)} />
      )}

      {showConfirmInactiveModal && selectedUser && (
        <ConfirmInactiveModal
          user={selectedUser}
          onConfirm={() => handleDelete(selectedUser.id)}
          onCancel={() => setShowConfirmInactiveModal(false)}
        />
      )}

      {showUpdateModal && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onCancel={() => setShowUpdateModal(false)}
          onUpdate={handleUserUpdate}
        />
      )}
    </main>
  );
};

export default UserDetailsPage;
