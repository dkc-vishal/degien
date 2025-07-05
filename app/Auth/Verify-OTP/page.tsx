"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/lib/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdLockReset } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import PasswordResetSuccessModal from "./PasswordResetSuccessModal"

const VerifyOtpPage: React.FC = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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

    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

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

        try {
            setSubmitting(true);

            const res = await fetch(API_ENDPOINTS.resetPasswordSelfChange.url, {
                method: API_ENDPOINTS.resetPasswordSelfChange.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp,
                    token,
                    password: newPassword,
                    confirm_password: confirmPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to reset password");
                return;
            }

            toast.success("Password reset successful");

            localStorage.removeItem("reset_token");

            setShowSuccessModal(true);

            setTimeout(() => {
                router.push("/Auth/Login");
            }, 2000);

        } catch (error) {
            toast.error("Something went wrong. Try again.");
            console.error("OTP verification error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border"
            >
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-7">Verify OTP & Reset Password</h2>

                {/* OTP */}

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        OTP <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
                        placeholder="Enter the OTP sent to your email"
                    />
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
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
                        placeholder="Enter new password"
                    />
                    <span
                        className="absolute top-8 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
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
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
                        placeholder="Re-enter new password"
                    />
                    <span
                        className="absolute top-8 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>

                    {confirmPassword && (
                        <p className={`mt-5 text-xs font-medium ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
                            {passwordsMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
                        </p>
                    )}

                </div>

                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full text-white text-sm font-medium py-2 mt-4 rounded-md transition duration-200 flex items-center justify-center gap-2 ${submitting
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        }`}
                >
                    <MdLockReset className="w-5 h-5" />
                    {submitting ? "Submitting..." : "Reset Password"}
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
