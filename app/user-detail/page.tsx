"use client";
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  designation: string;
}

const initialUsers: User[] = [
  { id: 1, username: "john_doe", email: "john@example.com", department: "IT", designation: "Developer" },
  { id: 2, username: "jane_smith", email: "jane@example.com", department: "HR", designation: "Manager" },
  { id: 3, username: "alice_wong", email: "alice@example.com", department: "Finance", designation: "Accountant" },
  { id: 4, username: "bob_brown", email: "bob@example.com", department: "IT", designation: "System Admin" },
  { id: 5, username: "carol_jones", email: "carol@example.com", department: "Marketing", designation: "Executive" },
  { id: 6, username: "david_lee", email: "david@example.com", department: "Sales", designation: "Salesperson" },
  { id: 7, username: "emma_clark", email: "emma@example.com", department: "HR", designation: "Recruiter" },
  { id: 8, username: "frank_moore", email: "frank@example.com", department: "Finance", designation: "Auditor" },
  { id: 9, username: "grace_kim", email: "grace@example.com", department: "IT", designation: "QA Engineer" },
  { id: 10, username: "henry_liu", email: "henry@example.com", department: "Marketing", designation: "Content Writer" },
];

const UserDetailsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <div className="w-full max-w-7xl mt-27 rounded-2xl shadow-xl p-8 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800">User Details</h2>
          <a
            href="/Auth/Register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Add User
          </a>
        </div>

        {users.length === 0 ? (
          <div className="text-center text-gray-600 py-10">No user details available.</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-purple-100 text-purple-800 text-left">
                <tr>
                  <th className="px-4 py-3 border-r">Username</th>
                  <th className="px-4 py-3 border-r">Email</th>
                  <th className="px-4 py-3 border-r">Department</th>
                  <th className="px-4 py-3 border-r">Designation</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-purple-50 border-t text-gray-700">
                    <td className="px-4 py-2 border-r">{user.username}</td>
                    <td className="px-4 py-2 border-r">{user.email}</td>
                    <td className="px-4 py-2 border-r">{user.department}</td>
                    <td className="px-4 py-2 border-r">{user.designation}</td>
                    <td className="px-4 py-2 text-center space-x-1 flex justify-center items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                        title="Update"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResetPassword(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reset Password Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Confirm Reset</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Send a password reset email to:
              <br />
              <span className="font-medium text-purple-700">{selectedUser.email}</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmResetPassword}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
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
