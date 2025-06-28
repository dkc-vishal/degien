"use client";
import React from "react";

interface ConfirmInactiveModalProps {
  user: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmInactiveModal: React.FC<ConfirmInactiveModalProps> = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Mark User Inactive
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to mark <span className="font-bold text-blue-600">{user.username}</span> as inactive?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-white hover:text-gray-700 border border-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInactiveModal;