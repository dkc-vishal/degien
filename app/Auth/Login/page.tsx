"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import { API_ENDPOINTS } from "@/lib/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLogin } from "@/lib/api/index";

const page: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  const validate = () => {
    const errors = { email: "", password: "" };
    if (!form.email) errors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errors.email = "Invalid email address.";
    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 4)
      errors.password = "Password must be at least 4 characters.";
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
      setError("Please fix the errors below.");
      return;
    }

    setSuccess("");

    loginMutation.mutate(form, {
      onSuccess: () => {
        setSuccess("Login successful!");
        setTimeout(() => {
          router.push("/Dashboard");
        }, 2000);
      },
    });
  };

  const buttonClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🔐 Login to Your Account
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center font-medium mb-4">
            {success}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.password ? "border-red-400" : "border-gray-300"
            }`}
          />

          {/* Toggle icon */}

          <span
            className="absolute right-3 top-8.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiFillEyeInvisible className="w-5 h-5" />
            ) : (
              <AiFillEye className="w-5 h-5" />
            )}
          </span>

          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.status === "pending"}
          className={`w-full text-white text-sm font-medium py-2 mt-5 rounded-md transition duration-200 ${
            loginMutation.status === "pending"
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
          onClick={() => buttonClick()}
        >
          <span className="flex items-center justify-center gap-3">
            <FiLogIn className="w-4 h-4" />
            {loginMutation.status === "pending" ? "Logging in..." : "Login"}
          </span>
        </button>

        {loginMutation.status === "pending" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Redirecting...
          </div>
        )}

        <div className="mt-3 text-left">
          <p className="text-sm text-gray-600">
            First time login?{" "}
            <span
              onClick={() => router.push("/Auth/Change-Password")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Update
            </span>
          </p>
          <p>
            Forgot your password?{" "}
            <span
              onClick={() => router.push("/Auth/Forgot-Password")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Reset Here
            </span>
          </p>
        </div>
      </form>
    </div>
  );

};

export default page;
