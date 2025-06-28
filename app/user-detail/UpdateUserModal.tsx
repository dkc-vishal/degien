"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import { User } from "@/app/user-detail/page"; // adjust path if needed

const departments = ["", "IT", "HR", "Finance", "Marketing", "Sales"];

interface Props {
  user: User;
  onCancel: () => void;
  onUpdate: (updatedUser: User) => void;
}

const UpdateUserModal: React.FC<Props> = ({ user, onCancel, onUpdate }) => {

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setDepartment(user.department);
  }, [user]);

  const validate = () => {
    const newErrors = { username: "", email: "", department: "" };

    if (!username.trim()) newErrors.username = "Name is required.";
    
    if (!email.trim()) newErrors.email = "Email is required.";
    
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Invalid email format.";
   
    if (!department) newErrors.department = "Please select a department.";

    if(!isVendor && !department){
      newErrors.department = "Please select a department"; 
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validation = validate();
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) return;

    onUpdate({
      ...user,
      username,
      email,
      department,
    });
  };

  const isVendor = user.department === "Vendor";

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative">
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 text-red-400 hover:text-red-500 text-xl cursor-pointer scale-125 transition-transform duration-300 ease-in-out"
        >
          <RxCross2 className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Update User Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {
            !isVendor && (
              <div>
                <label className="block text-sm mb-1">Department <span className="text-red-500">*</span></label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep || "Select Department"}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-xs text-red-500 mt-1">{errors.department}</p>
                )}
              </div>
            )
          }
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
