"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";
import { toast } from "sonner";
import { useFirstTimeLogin } from "@/lib/api/hooks";

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    userEmail: "",
    systemPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    userEmail: "",
    systemPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const [showSystem, setShowSystem] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const FirstTimeLoginMutation = useFirstTimeLogin();

  const isLoading = FirstTimeLoginMutation.isPending;
  const isError = FirstTimeLoginMutation.isError;
  const error = FirstTimeLoginMutation.error;

  const validate = () => {
    const errors = {
      userEmail: "",
      systemPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    if (!form.userEmail) errors.userEmail = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.userEmail))
      errors.userEmail = "Invalid email address.";

    if (!form.systemPassword)
      errors.systemPassword = "System generated password is required.";
    if (!form.newPassword) errors.newPassword = "New password is required.";
    else if (form.newPassword.length < 4)
      errors.newPassword = "New password must be at least 4 characters.";
    if (!form.confirmNewPassword)
      errors.confirmNewPassword = "Please confirm your new password.";
    else if (form.confirmNewPassword !== form.newPassword)
      errors.confirmNewPassword = "Passwords do not match.";

    return errors;
  };

  const passwordsMatch =
    form.newPassword &&
    form.confirmNewPassword &&
    form.newPassword === form.confirmNewPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      toast.error("Please fix the errors.");
      return;
    }

    FirstTimeLoginMutation.mutate(
      {
        email: form.userEmail,
        system_password: form.systemPassword,
        new_password: form.newPassword,
        confirm_password: form.confirmNewPassword,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.push("/Auth/Login");
          }, 500);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Changing password...</p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-5">
          First Time Login
        </h2>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.message ||
                (error as any)?.message ||
                "An error occurred while changing password."}
            </p>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={form.userEmail}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.userEmail ? "border-red-400" : "border-gray-300"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            placeholder="Enter your email address"
          />
          {fieldErrors.userEmail && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.userEmail}</p>
          )}
        </div>

        {/* System Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="systemPassword"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
          >
            System Generated Password <span className="text-red-500">*</span>
            <div className="relative group">
              <FaInfoCircle className="text-yellow-500 cursor-pointer" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Ask this password from the admin
              </div>
            </div>
          </label>
          <input
            type={showSystem ? "text" : "password"}
            id="systemPassword"
            name="systemPassword"
            value={form.systemPassword}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="current-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.systemPassword ? "border-red-400" : "border-gray-300"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            placeholder="Enter system generated password"
          />
          <span
            className={`absolute right-3 top-8.5 text-gray-500 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !isLoading && setShowSystem(!showSystem)}
          >
            {showSystem ? (
              <AiFillEyeInvisible className="w-5 h-5" />
            ) : (
              <AiFillEye className="w-5 h-5" />
            )}
          </span>
          {fieldErrors.systemPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.systemPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showNew ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.newPassword ? "border-red-400" : "border-gray-300"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            placeholder="Enter new password"
          />
          <span
            className={`absolute right-3 top-8.5 text-gray-500 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !isLoading && setShowNew(!showNew)}
          >
            {showNew ? (
              <AiFillEyeInvisible className="w-5 h-5" />
            ) : (
              <AiFillEye className="w-5 h-5" />
            )}
          </span>
          {fieldErrors.newPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.confirmNewPassword
                ? "border-red-400"
                : "border-gray-300"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            placeholder="Re-enter your new password"
          />
          <span
            className={`absolute right-3 top-8.5 text-gray-500 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !isLoading && setShowConfirm(!showConfirm)}
          >
            {showConfirm ? (
              <AiFillEyeInvisible className="w-5 h-5" />
            ) : (
              <AiFillEye className="w-5 h-5" />
            )}
          </span>

          {fieldErrors.confirmNewPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.confirmNewPassword}
            </p>
          )}

          {form.confirmNewPassword && (
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

        {/* Submit */}
        <button
          type="submit"
          disabled={
            isLoading ||
            !form.userEmail ||
            !form.systemPassword ||
            !form.newPassword ||
            !form.confirmNewPassword ||
            !passwordsMatch ||
            Object.values(fieldErrors).some(Boolean) // ✅ Check for validation errors
          } // ✅ Enhanced disabled logic
          className={`w-full text-white text-sm font-medium py-2 rounded-md transition duration-200 flex items-center justify-center gap-2 ${
            isLoading ||
            !form.userEmail ||
            !form.systemPassword ||
            !form.newPassword ||
            !form.confirmNewPassword ||
            passwordsMatch ||
            Object.values(fieldErrors).some(Boolean)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-400 hover:bg-blue-500 cursor-pointer"
          }`}
        >
          <RiLockPasswordLine className="w-4 h-4" />
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Changing Password...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Login Redirect */}
        <div className="mt-6 text-left">
          <p className="text-sm text-gray-600">
            Already logged in?{" "}
            <button
              type="button"
              onClick={() => !isLoading && router.push("/Auth/Login")}
              disabled={isLoading}
              className={`text-blue-600 font-medium hover:underline ${
                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              Login from here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
