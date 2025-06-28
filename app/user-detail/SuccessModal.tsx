"use client";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { FiCopy } from "react-icons/fi"; // ✅ Added clipboard icon

interface SuccessModalProps {
  user: {
    name: string;
    email: string;
    department: string;
    generated_password: string;
  };
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4">
      <div className="w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 relative text-center bg-white">
        
        {/* ❌ Close Button with smooth hover & scale */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-red-500 hover:text-red-600 text-xl 
                   transition-all duration-200 hover:scale-110 hover:bg-gray-100 
                   rounded-full p-1 cursor-pointer"
        >
          <RxCross2 />
        </button>

        {/* ✅ Success Icon */}
        <div className="text-green-500 mb-4">
          <FaCheckCircle className="mx-auto w-16 h-16" />
        </div>

        {/* ✅ Modal Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Account Created Successfully!
        </h3>

        {/* ✅ Structured details using grid layout */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 text-left">
          <div className="font-semibold">Employee Name:</div>
          <div>{user.name}</div>

          <div className="font-semibold">Email:</div>
          <div>{user.email}</div>

          <div className="font-semibold">Department:</div>
          <div>{user.department || "—"}</div>

          <div className="font-semibold">System Password:</div>

          {/* ✅ Password and copy button side by side */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-gray-900">{user.generated_password}</span>
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(user.generated_password) // ✅ Only password is copied
                  .then(() => alert("Password copied!"))
                  .catch(() => alert("Failed to copy."));
              }}
              className="flex items-center font-bold gap-1 bg-blue-400 text-white hover:text-blue-400 
                         border hover:bg-white border-blue-300 rounded px-2 py-1 text-xs cursor-pointer 
                         transition"
            >
              <FiCopy className="w-4 h-4"/>
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
