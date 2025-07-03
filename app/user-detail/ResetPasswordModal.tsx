"use client";

import React from "react";
import { toast } from "sonner";
import { API_ENDPOINTS, BASE_URL } from "@/lib/api";

interface ResetPasswordModalProps {
    user: {
        id: number | string;
        email: string;
    };
    onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ user, onClose }) => {
    const handleConfirmReset = async () => {
        try {
            const res = await fetch(`${API_ENDPOINTS.resetPasswordAdmin.url}`, {
                method: API_ENDPOINTS.resetPasswordAdmin.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id
                })
            })

            if (!res.ok) {
                const errorData = await res.json();

                toast.error(errorData.message || "Failed to reset password.");
                return;
            }

            const data = await res.json();

            toast.success("Password reset link sent to your email! Please check your email.");

            setTimeout(() => {
                onClose() ; // Auto-close modal after 2 seconds
            }, 2000);

        } catch (error) {
            console.log("Reset password modal admin error: ", error);

            toast.error("Something went wrong while resetting password.");
        }
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                    Confirm Password Reset
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Send a password reset link to:
                    <br />
                    <span className="font-medium text-blue-600">{user.email}</span>
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleConfirmReset}
                        className="bg-green-600 hover:bg-white hover:text-green-600 border border-green-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-white hover:text-gray-700 border border-gray-400 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordModal ; 
