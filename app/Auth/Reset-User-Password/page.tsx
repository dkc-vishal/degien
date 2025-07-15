"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetUserPasswordPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirm_password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(API_ENDPOINTS.resetPasswordSelfChange.url, {
        method: API_ENDPOINTS.resetPasswordSelfChange.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
          password: form.password,
          confirm_password: form.confirm_password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = typeof data.message === "string"
          ? data.message
          : Object.values(data.message || {}).join(", ");
        toast.error(msg || "Reset failed.");
        return;
      }

      toast.success("Password changed successfully. Please login.");
      setTimeout(() => router.push("/Auth/Login"), 500);

    } catch (err) {
      console.error("Reset error:", err);
      toast.error("Something went wrong.");
    }
  };

  const passwordsMatch = form.password && form.confirm_password && form.password === form.confirm_password;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Reset Password</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* OTP */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            className="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
            className="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
          </span>
        </div>

        {/* Password match indicator */}
        {form.confirm_password && (
          <p className="text-sm mb-4">
            {passwordsMatch ? (
              <span className="text-green-600">✅ Passwords match</span>
            ) : (
              <span className="text-red-500">❌ Passwords do not match</span>
            )}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-8 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <RiLockPasswordLine className="w-5 h-5" />
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetUserPasswordPage;
