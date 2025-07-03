"use client";
import React, { useState } from "react";

const ChangePasswordPage: React.FC = () => {
  const [form, setForm] = useState({
    systemPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    systemPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errors = {
      systemPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    if (!form.systemPassword)
      errors.systemPassword = "System generated password is required.";
    if (!form.newPassword)
      errors.newPassword = "New password is required.";
    else if (form.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters.";
    if (!form.confirmNewPassword)
      errors.confirmNewPassword = "Please confirm your new password.";
    else if (
      form.newPassword &&
      form.confirmNewPassword !== form.newPassword
    )
      errors.confirmNewPassword = "Passwords do not match.";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setError("Please fix the errors below.");
      setSuccess("");
      return;
    }
    setSuccess("Password changed successfully!");
    setError("");
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

        {error && (
          <div className="text-red-600 text-sm text-center mb-3">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center mb-3">
            {success}
          </div>
        )}

        {/* System Password */}
        <div className="mb-4">
          <label
            htmlFor="systemPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            System Generated Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="systemPassword"
            name="systemPassword"
            value={form.systemPassword}
            onChange={handleChange}
            autoComplete="current-password"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.systemPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.systemPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.systemPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.newPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.newPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fieldErrors.confirmNewPassword
                ? "border-red-400"
                : "border-gray-300"
            }`}
          />
          {fieldErrors.confirmNewPassword && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.confirmNewPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white cursor-pointer text-sm font-medium py-2 rounded-md transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
