"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/lib/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdLockReset } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import PasswordResetSuccessModal from "./PasswordResetSuccessModal";
import { useVerifyOTP } from "@/lib/api/hooks";

const VerifyOtpPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const [submitting, setSubmitting] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");

    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error("Missing token in URL. Redirecting...");
      router.push("/Auth/Forgot-Password");
    }
  }, []);

  const VerifyOTPMutation = useVerifyOTP();

  const isLoading = VerifyOTPMutation.isPending;
  const isError = VerifyOTPMutation.isError;
  const error = VerifyOTPMutation.error;

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    VerifyOTPMutation.mutate(
      {
        otp,
        token,
        password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
          setTimeout(() => {
            router.push("/Auth/Login");
          }, 500);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to reset password. Please try again.";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Verifying OTP...</p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-7">
          Verify OTP & Reset Password
        </h2>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.message ||
                (error as any)?.message ||
                "An error occurred while verifying OTP."}
            </p>
          </div>
        )}

        {/* OTP */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OTP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isLoading}
            maxLength={6}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 ${
              isLoading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter the OTP sent to your email"
          />
          <p className="text-xs text-gray-500 mt-1">
            Check your email for the 6-digit verification code
          </p>
        </div>

        {/* New Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 pr-10 ${
              isLoading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Enter new password"
          />
          <span
            className={`absolute top-8 right-3 text-gray-500 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !isLoading && setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-9 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300 pr-10 ${
              isLoading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder="Re-enter new password"
          />
          <span
            className={`absolute top-8 right-3 text-gray-500 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() =>
              !isLoading && setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>

          {confirmPassword && (
            <div className="mt-2">
              {passwordsMatch ? (
                <p className="text-xs text-green-600 flex items-center">
                  <span className="mr-1">✅</span>
                  Passwords match perfectly
                </p>
              ) : (
                <p className="text-xs text-red-500 flex items-center">
                  <span className="mr-1">❌</span>
                  Passwords do not match
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            isLoading ||
            !otp ||
            !newPassword ||
            !confirmPassword ||
            !passwordsMatch ||
            otp.length < 6
          }
          className={`w-full text-white text-sm font-medium py-2 mt-4 rounded-md transition duration-200 flex items-center justify-center gap-2 ${
            isLoading ||
            !otp ||
            !newPassword ||
            !confirmPassword ||
            !passwordsMatch ||
            otp.length < 6
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
        >
          <MdLockReset className="w-5 h-5" />
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verifying...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Password reset success modal */}
        {showSuccessModal && (
          <PasswordResetSuccessModal message="Your password has been successfully reset." />
        )}
      </form>
    </div>
  );
};

export default VerifyOtpPage;
