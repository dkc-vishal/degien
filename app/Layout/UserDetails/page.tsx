"use client";
import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  designation: string;
}

const initialUsers: User[] = [
  { id: 1, username: 'john_doe', email: 'john@example.com', department: 'IT', designation: 'Developer' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', department: 'HR', designation: 'Manager' },
  { id: 3, username: 'alice_wong', email: 'alice@example.com', department: 'Finance', designation: 'Accountant' },
  { id: 4, username: 'bob_brown', email: 'bob@example.com', department: 'IT', designation: 'System Admin' },
  { id: 5, username: 'carol_jones', email: 'carol@example.com', department: 'Marketing', designation: 'Executive' },
  { id: 6, username: 'david_lee', email: 'david@example.com', department: 'Sales', designation: 'Salesperson' },
  { id: 7, username: 'emma_clark', email: 'emma@example.com', department: 'HR', designation: 'Recruiter' },
  { id: 8, username: 'frank_moore', email: 'frank@example.com', department: 'Finance', designation: 'Auditor' },
  { id: 9, username: 'grace_kim', email: 'grace@example.com', department: 'IT', designation: 'QA Engineer' },
  { id: 10, username: 'henry_liu', email: 'henry@example.com', department: 'Marketing', designation: 'Content Writer' },
];

const navLinks = [
  { name: 'Dashboard', href: '#' },
  { name: 'Users', href: '/Layout/UserDetails' },
  { name: 'Register', href: '/Layout/Resistation' },
  { name: 'Login', href: '/Layout/Login' },
  { name: 'Change Password', href: '/Layout/ChangePassword' },
];

const UserDetailsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleUpdate = (id: number) => {
    alert('Update user functionality can be implemented here.');
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmResetPassword = () => {
    if (selectedUser) {
      console.log(`Sending password reset email to ${selectedUser.email}`);
      // Simulate backend API call
      alert(`Password reset link sent to ${selectedUser.email}`);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen min-w-full flex bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col min-h-screen">
        <div className="p-4.5 border-b">
          <span className="text-xl font-bold text-purple-700">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
          <span className="text-lg font-semibold text-purple-700">User Management System</span>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img src="/public/globe.svg" alt="avatar" className="w-8 h-8 rounded-full bg-purple-200" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[85vw] max-w-[85vw] overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">USER DETAILS</h2>
              <a href="/Layout/Resistation" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md">
                Add User
              </a>
            </div>

            {users.length === 0 ? (
              <div className="text-gray-600 text-center">No user details to display.</div>
            ) : (
              <table className="w-full border border-gray-300 text-sm text-left">
                <thead className="bg-purple-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Username</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Department</th>
                    <th className="border border-gray-300 px-4 py-2">Designation</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.department}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.designation}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {/* Reset Password Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to send a reset password email to <br />
              <strong>{selectedUser.email}</strong>?
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
    </div>
  );
};

export default UserDetailsPage;
