"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import { API_ENDPOINTS } from "@/lib/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const page: React.FC = () => {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false) ; 

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

    console.log("Sending login request with: ", form);

    try {
      const res = await fetch(API_ENDPOINTS.login.url, {
        method: API_ENDPOINTS.login.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const response = await res.json();

      if (!response?.data?.access_token) {
        console.error("❌ No access_token in response!", response);
      }

      console.log("🟢 Login response received", res.status);
      console.log("📦 Parsed response:", response);

      const { access_token, refresh_token } = response.data;

      if (!res.ok) {
        setError(response?.detail || "Login failed. Please check credentials.");
        return;
      }

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      console.log('access_token from response: ', access_token);

      await fetchAndStoreUserProfile(access_token);

      setSuccess("Login successful!");
      setError("");
      setLoading(true);

      setTimeout(() => {
        router.push("/Dashboard");
      }, 2000);

    } catch (err) {
      console.error("🧨 Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Fetching logged-in user's profile using token 

  const fetchAndStoreUserProfile = async (accessToken: string) => {
    console.log("🔐 Using access token:", accessToken);

    if (!accessToken) {
      console.error("🚨 No access token provided!");
      return;
    }

    try {
      const profileRes = await fetch(API_ENDPOINTS.userProfile.url, {
        method: API_ENDPOINTS.userProfile.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("📨 user-detail fetch response:", profileRes.status);

      if (!profileRes.ok) {
        const errorText = await profileRes.text();
        console.error("❌ Failed to fetch user profile:", errorText);
        throw new Error("Failed to fetch user profile");
      }

      const userProfile = await profileRes.json();
      console.log("👤 User Profile:", userProfile);

      // Saving the logged-in user info in localStorage 

      localStorage.setItem("loggedInUser", JSON.stringify(userProfile.data));

      console.log("✅ User profile saved");
    } catch (error) {
      console.log("❌ fetchAndStoreUserProfile failed:", error);
    }
  };

  const buttonClick = () => {
    console.log("Button clicked");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          User Login
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium mb-3">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center font-medium mb-3">
            {success}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="e.g. john@example.com"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.email ? "border-red-400" : "border-gray-300"
              }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.password ? "border-red-400" : "border-gray-300"
              }`}
          />

        {/* Toggle icon */}

        <span
          className="absolute right-3 top-8.5 cursor-pointer text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {
            showPassword ? (
              <AiFillEyeInvisible className="w-5 h-5"/>
            ) : (
              <AiFillEye className="w-5 h-5"/>
            )
          }
        </span>

          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white text-sm font-medium py-2 mt-5 rounded-md transition duration-200 ${loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
          onClick={() => buttonClick()}
        >
          <span className="flex items-center justify-center gap-3">
            <FiLogIn className="w-4 h-4"/>
            {loading ? "Logging in..." : "Login"}
          </span>
        </button>

        {/* Showing loading spinner */}

        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
            <svg
              className="animate-spin h-4 w-4 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            🚀 Redirecting...
          </div>
        )}

        <div className="mt-3 text-left">
          <p className="text-sm text-gray-600">
            First time login? {" "}
            <span
              onClick={() => router.push("/Auth/Change-Password")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Change Password
            </span>
          </p>
        </div>


      </form>
    </div>
  );
};

export default page;
