"use client";

import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";

const departments = ["", "IT", "HR", "Finance", "Marketing", "Sales"];

const AddUserForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        const errors = { username: "", email: "", department: "" };
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
        onClose()
        setSuccess("User added successfully!");
        setError("");
    };

    return (
        <div className="">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Add New User
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

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">
                        Employee Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.username ? "border-red-400" : "border-gray-300"
                            }`}
                    />
                    {fieldErrors.username && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.username}</p>
                    )}
                </div>

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
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.email ? "border-red-400" : "border-gray-300"
                            }`}
                    />
                    {fieldErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm mb-1">
                        Department <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.department ? "border-red-400" : "border-gray-300"
                            }`}
                    >
                        {departments.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep || "Select Department"}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.department && (
                        <p className="text-xs text-red-500 mt-1">
                            {fieldErrors.department}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-400 cursor-pointer hover:bg-white hover:text-blue-500 border border-blue-500 text-white text-sm font-medium py-2 rounded-md transition duration-200 mt-9"
                >
                    <IoMdPersonAdd className="w-5 h-5" />
                    Create Account
                </button>

            </form>
        </div>
    );
};

export default AddUserForm;
