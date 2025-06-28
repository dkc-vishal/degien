"use client";
import React, { useState } from "react";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import AddUserForm from "../../components/core/AddUserForm";
import { RxCross2 } from "react-icons/rx";

interface User {
  id: number;
  username: string;
  email: string;
  department: string;
}

const initialUsers: User[] = [
  { id: 1, username: "john_doe", email: "john@example.com", department: "IT" },
  { id: 2, username: "jane_smith", email: "jane@example.com", department: "HR" },
  { id: 3, username: "alice_wong", email: "alice@example.com", department: "Finance" },
  { id: 4, username: "bob_brown", email: "bob@example.com", department: "IT" },
  { id: 5, username: "carol_jones", email: "carol@example.com", department: "Marketing" },
];

const UserDetailsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = (id: number) => {
    alert("Update user functionality can be implemented here.");
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmResetPassword = () => {
    if (selectedUser) {
      console.log(`Sending password reset email to ${selectedUser.email}`);
      alert(`Password reset link sent to ${selectedUser.email}`);
    }
    setShowModal(false);
  };

  return (
    <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mt-6 mb-4 gap-4 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
          <a
            className="inline-flex items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-blue-400 transition-colors duration-200 border border-transparent hover:border-blue-400 cursor-pointer"
            onClick={() => setShowAddUserModal(true)}
          >
            <UserPlus className="w-5 h-5 transition-colors duration-200" />
            <span>Add User</span>
          </a>

          {showAddUserModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4">
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="absolute top-5 right-7 text-red-400 hover:text-red-500 cursor-pointer text-xl font-bold transition-transform duration-300 transform hover:scale-120"
                  aria-label="Close"
                >
                  <RxCross2 className="w-6 h-6" />
                </button>

                <AddUserForm onClose={() => setShowAddUserModal(false)} />
              </div>
            </div>
          )}


        </div>

        {/* Table */}
        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No users found.</div>
        ) : (
          <div className="overflow-x-auto mt-14">
            <table className="min-w-full bg-white rounded-lg text-center text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="w-12 whitespace-nowrap text-center">S. No</th>
                  <th className="px-2 py-3">Employee Name</th>
                  <th className="px-2 py-3">Email</th>
                  <th className="px-2 py-3">Department</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition text-gray-700"
                  >
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.department}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="bg-blue-400 hover:bg-blue-500 text-white p-1 rounded cursor-pointer"
                          title="Update"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-400 hover:bg-red-500 cursor-pointer text-white p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="bg-teal-500 hover:bg-teal-600 cursor-pointer text-white px-2 py-1 rounded text-xs"
                        >
                          Reset Password
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            {/* Title */}
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Confirm Password Reset
            </h3>

            {/* Message */}
            <p className="text-sm text-gray-600 text-center mb-6">
              Send a password reset link to:
              <br />
              <span className="font-medium text-blue-600">
                {selectedUser.email}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmResetPassword}
                className="bg-green-600 hover:bg-white hover:text-green-600 border border-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-white hover:text-gray-700 border border-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </main>

  );
};

export default UserDetailsPage;
