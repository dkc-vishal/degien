"use client";

import React, { useEffect, useState } from "react";
import ResetPasswordSuccessModal from "./ResetPasswordSuccessModal";
import { useResetPassword } from "@/lib/api/hooks";
interface ResetPasswordModalProps {
  user: {
    user_id: string;
    email: string;
  };
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  user,
  onClose,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const ResetPasswordMutation = useResetPassword();

  // function to handle password reset confirmation

  const handleConfirmReset = async (user_id: string) => {
    setSubmitting(true);

    ResetPasswordMutation.mutate(user_id, {
      onSuccess: (userData) => {
        console.log("User data", userData);
        setUserInfo(userData?.data);
      },
      onError: (error) => {
        console.error("Reset password failed:", error);
        setSubmitting(false);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  useEffect(() => {
    if (userInfo) {
      setShowSuccessModal(true);
    }
  }, [userInfo]);

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
              onClick={() => handleConfirmReset(user.user_id)}
              disabled={submitting}
              className={`font-medium py-2 px-4 rounded-md cursor-pointer transition ${
                submitting
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
};

export default ResetPasswordModal;
