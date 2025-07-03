// components/ChangePasswordModal.tsx
"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface ChangePasswordModalProps {
    onClose: () => void;
    onSubmit: (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose, onSubmit }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        onSubmit({ oldPassword, newPassword, confirmPassword });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 cursor-pointer right-5 text-red-400 hover:text-red-500 hover:scale-125 transition-transform duration-200"
                    aria-label="Close"
                >
                    <RxCross2 className="w-6 h-6" />
                </button>


                {/* Modal Title */}
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">Change Password</h3>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
