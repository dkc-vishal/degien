"use client";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { API_ENDPOINTS } from "@/lib/api";

const AddUserForm: React.FC<{
  onClose: () => void;
  onSuccess: (user: any) => void;
  existingUsers: any[];
}> = ({ onClose, onSuccess, existingUsers }) => {
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    department: "",
    userType: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    department: "",
    userType: "",
  });

  const validate = () => {
    const errors = { username: "", email: "", department: "", userType: "" };
    if (!form.username) errors.username = "Username is required.";
    if (!form.email) errors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errors.email = "Invalid email address.";
    }
    if (!form.userType) errors.userType = "Please select a user type.";
    if (form.userType === "DKC" && !form.department) {
      errors.department = "Please select department for DKC employee.";
    }
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "userType" && value === "Vendor" ? { department: "" } : {}),
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setError("Please fix the errors below.");
      return;
    }

    const duplicate = existingUsers.find((u) => u.email === form.email);
    if (duplicate) {
      toast.error("User with this email already exists.");
      return;
    }

    const payload = {
      email: form.email,
      name: form.username,
      department: form.userType === "DKC" ? form.department : "",
      type_of_user: form.userType === "DKC" ? "staff" : "vendor",
    };

    try {
      const res = await fetch(`${API_ENDPOINTS.createUser.url}`, {
        method: API_ENDPOINTS.createUser.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData?.message || "Failed to create user.");
        return;
      }

      const data = await res.json();
      onSuccess({
        id: data.data.user_id,
        username: form.username,
        email: form.email,
        department: data.data.department,
        generated_password: data.data.system_generated_password || "-",
        type_of_user: payload.type_of_user,
      });

      toast.success("User created successfully!");
      onClose();
    } catch (error) {
      console.error("Network error: ", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.departments.url}`);
        const data = await res.json();
        setDepartments(data.data);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-red-400 hover:text-red-500 cursor-pointer text-xl font-bold hover:scale-120 duration-300 ease-in-out transition-transform hover:bg-gray-200 rounded-md"
      >
        <RxCross2 className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Add New User
      </h2>

      {error && (
        <div className="text-red-600 text-sm text-center font-medium mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm mb-1">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <input
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
          <label className="block text-sm mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
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

        {/* User Type */}
        <div>
          <label className="block text-sm mb-2 font-medium">
            User Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="DKC"
                checked={form.userType === "DKC"}
                onChange={handleChange}
              />
              DKC Employee
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="Vendor"
                checked={form.userType === "Vendor"}
                onChange={handleChange}
              />
              Vendor
            </label>
          </div>
          {fieldErrors.userType && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.userType}</p>
          )}
        </div>

        {/* Department (conditional) */}
        {form.userType === "DKC" && (
          <div>
            <label className="block text-sm mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                fieldErrors.department ? "border-red-400" : "border-gray-300"
              }`}
            >
              <option value="">Select Department</option>
              {Object.entries(departments).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {fieldErrors.department && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.department}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-400 cursor-pointer hover:bg-white hover:text-blue-500 border border-blue-500 text-white text-sm font-medium py-2 rounded-md transition duration-200 mt-8"
        >
          <IoMdPersonAdd className="w-5 h-5" />
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
