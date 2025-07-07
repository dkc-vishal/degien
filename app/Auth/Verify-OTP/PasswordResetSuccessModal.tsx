"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";

interface SuccessModalProps {
  message: string;
}

const PasswordResetSuccessModal: React.FC<SuccessModalProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg text-center">
        <MdCheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Success</h3>
        <p className="text-sm text-gray-600">{message}</p>
        <p className="text-xs text-gray-400 mt-3">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default PasswordResetSuccessModal;
