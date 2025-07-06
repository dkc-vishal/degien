"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/lib/api";
import ResetPasswordSuccessModal from "./ResetPasswordSuccessModal";

interface ResetPasswordModalProps {
    user: {
        id: number | string;
        email: string;
    };
    onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ user, onClose }) => {

    const [submitting, setSubmitting] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    // function to handle password reset confirmation

    const handleConfirmReset = async () => {

        setSubmitting(true);

        try {
            const response = await fetch(API_ENDPOINTS.resetPasswordAdmin.url, {
                method: API_ENDPOINTS.resetPasswordAdmin.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id
                })
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to send reset email");
                return;
            }

            toast.success("Reset email sent successfully!");

            // store user info and show modal 

            setUserInfo(data.data);
            setShowSuccessModal(true);

            // onClose();

        } catch (error) {
            console.log("Password reset error: ", error);
            toast.error("Something went wrong. Please try again.")
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 px-4">
            {showSuccessModal && userInfo ? (
                <ResetPasswordSuccessModal
                    userInfo={userInfo}
                    onClose={() => {
                        setShowSuccessModal(false);
                        onClose(); // Now close the parent modal after success modal is closed
                    }}
                />
            ) : (
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                    <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                        Confirm Password Reset
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Send a system-generated password to:
                        <br />
                        <span className="font-medium text-blue-600">{user.email}</span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleConfirmReset}
                            disabled={submitting}
                            className={`font-medium py-2 px-4 rounded-md cursor-pointer transition ${submitting
                                    ? "bg-green-300 text-white cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-white hover:text-green-600 border border-green-600"
                                }`}
                        >
                            {submitting ? "Sending..." : "Confirm"}
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-white hover:text-gray-700 border border-gray-400 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default ResetPasswordModal; 
