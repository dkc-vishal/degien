"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";
import { toast } from "sonner";

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showSystem, setShowSystem] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (!form.newPassword)
      errors.newPassword = "New password is required.";
    else if (form.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters.";
    if (!form.confirmNewPassword)
      errors.confirmNewPassword = "Please confirm your new password.";
    else if (form.confirmNewPassword !== form.newPassword)
      errors.confirmNewPassword = "Passwords do not match.";

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      toast.error("Please fix the errors.")
      return;
    }

    try {
      // const token = localStorage.getItem("access_token");

      const res = await fetch(API_ENDPOINTS.changeSystemPassword.url, {
        method: API_ENDPOINTS.changeSystemPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.userEmail,
          system_password: form.systemPassword,
          new_password: form.newPassword,
          confirm_password: form.confirmNewPassword,
        }),
      });

      const data = await res.json();

      console.log('Test data: ', data);

      if (!res.ok) {
        if (Array.isArray(data.message)) {
          const extracted = data.message.map((m: any) => m.message).join(", ");
          toast.error(extracted);
        } else if (typeof data.message === "string") {
          toast.error(data.message);
        } else {
          toast.error("Failed to change password.");
        }
        return;
      }

      toast.success(data.message || "Password changed successfully!");
      setError("");

      setTimeout(() => {
        router.push("/Auth/Login");
      }, 1500);
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Change password error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-5">
          Change Password
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={form.userEmail}
            onChange={handleChange}
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.userEmail ? "border-red-400" : "border-gray-300"
              }`}
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
            autoComplete="current-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.systemPassword ? "border-red-400" : "border-gray-300"
              }`}
          />
          <span
            className="absolute right-3 top-8.5 text-gray-500 cursor-pointer"
            onClick={() => setShowSystem(!showSystem)}
          >
            {showSystem ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
          </span>
          {fieldErrors.systemPassword && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.systemPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showNew ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.newPassword ? "border-red-400" : "border-gray-300"
              }`}
          />
          <span
            className="absolute right-3 top-8.5 text-gray-500 cursor-pointer"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
          </span>
          {fieldErrors.newPassword && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 relative">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.confirmNewPassword ? "border-red-400" : "border-gray-300"
              }`}
          />
          <span
            className="absolute right-3 top-8.5 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
          </span>
          {fieldErrors.confirmNewPassword && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmNewPassword}</p>
          )}
          {form.confirmNewPassword && (
            <p className="text-sm mt-1">
              {form.newPassword === form.confirmNewPassword ? (
                <span className="text-green-600">✅ Passwords match</span>
              ) : (
                <span className="text-red-500">❌ Passwords do not match</span>
              )}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white cursor-pointer text-sm font-medium py-2 rounded-md transition duration-200 flex items-center justify-center gap-2"
        >
          <RiLockPasswordLine className="w-4 h-4" />
          Change Password
        </button>

        {/* Login Redirect */}
        <div className="mt-6 text-left">
          <p className="text-sm text-gray-600">
            Already logged in?{" "}
            <span
              onClick={() => router.push("/Auth/Login")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Login from here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
