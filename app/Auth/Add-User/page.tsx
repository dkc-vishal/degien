"use client";
import React, { useState } from "react";

const departments = ["", "IT", "HR", "Finance", "Marketing", "Sales"];

const page: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    department: "",
  });

  const validate = () => {
    const errors = {
      username: "",
      email: "",
      department: "",
    };

    if (!form.username) errors.username = "Username is required.";
    if (!form.email) errors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errors.email = "Invalid email address.";
    if (!form.department) errors.department = "Department is required.";

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
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
    setSuccess("User added successfully!");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Add New User
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium mb-3">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center font-medium mb-3">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="username">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                fieldErrors.username ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.username && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
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

          {/* Department */}
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="department">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                fieldErrors.department ? "border-red-400" : "border-gray-300"
              }`}
            >
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep || "Select Department"}
                </option>
              ))}
            </select>
            {fieldErrors.department && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.department}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/Auth/Login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
