// components/ChangePasswordModal.tsx
"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useChangePassword } from "@/lib/api/hooks";

interface ChangePasswordModalProps {
  onClose: () => void;
  onSubmit: (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ChangePasswordMutation = useChangePassword();

  const isLoading = ChangePasswordMutation.isPending;
  const isError = ChangePasswordMutation.isError;
  const error = ChangePasswordMutation.error;

  // password visibility toggles

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    // validate fields

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    ChangePasswordMutation.mutate(
      {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          onClose();
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to change password. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Updating password...</p>
            </div>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className={`absolute top-4 right-5 text-red-400 hover:text-red-500 hover:scale-110 transition-transform duration-200 hover:bg-gray-200 rounded-md ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          aria-label="Close"
        >
          <RxCross2 className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Change Password
        </h3>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.message ||
                (error as any)?.message ||
                "An error occurred while changing password."}
            </p>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Old password */}

          <div className="relative">
            <label className="text-sm text-gray-600 block mb-1">
              Old Password
            </label>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter your current password"
            />
            <span
              onClick={() => !isLoading && setShowOld(!showOld)}
              className={`absolute right-3 top-8.5 text-gray-500 ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {showOld ? (
                <AiFillEyeInvisible className="w-5 h-5" />
              ) : (
                <AiFillEye className="w-5 h-5" />
              )}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="text-sm text-gray-600 block mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter new password (min 8 characters)"
            />
            <span
              onClick={() => !isLoading && setShowNew(!showNew)}
              className={`absolute right-3 top-8.5 text-gray-500 ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {showNew ? (
                <AiFillEyeInvisible className="w-5 h-5" />
              ) : (
                <AiFillEye className="w-5 h-5" />
              )}
            </span>
          </div>

          {/* Password strength indicator */}
          {newPassword && (
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-full rounded ${
                    newPassword.length >= 5 ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  <div
                    className={`h-2 rounded transition-all duration-300 ${
                      newPassword.length >= 5
                        ? "bg-green-500 w-full"
                        : "bg-red-500 w-1/3"
                    }`}
                  ></div>
                </div>
              </div>
              <p
                className={`text-xs mt-1 ${
                  newPassword.length >= 5 ? "text-green-600" : "text-red-500"
                }`}
              >
                {newPassword.length >= 5
                  ? "✅ Strong password"
                  : "❌ Password too short (min 8 characters)"}
              </p>
            </div>
          )}

          {/* Confirm New Password */}
          <div className="relative">
            <label className="text-sm text-gray-600 block mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Confirm your new password"
            />
            <span
              onClick={() => !isLoading && setShowConfirm(!showConfirm)}
              className={`absolute right-3 top-8.5 text-gray-500 ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {showConfirm ? (
                <AiFillEyeInvisible className="w-5 h-5" />
              ) : (
                <AiFillEye className="w-5 h-5" />
              )}
            </span>
          </div>

          {/* ✅ Match indicator below confirm field */}
          {confirmPassword && (
            <div className="text-sm mt-1">
              {newPassword === confirmPassword ? (
                <p className="text-green-600 flex items-center">
                  <span className="mr-1">✅</span>
                  Passwords match
                </p>
              ) : (
                <p className="text-red-500 flex items-center">
                  <span className="mr-1">❌</span>
                  Passwords do not match
                </p>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ${
              isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !oldPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              newPassword.length < 5
            }
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-all duration-200 ${
              isLoading ||
              !oldPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              newPassword.length < 5
                ? "opacity-50 cursor-not-allowed bg-gray-400"
                : "hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
