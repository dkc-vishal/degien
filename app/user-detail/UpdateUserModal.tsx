"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/lib/api";
import { User } from "./UserDetailsPage";
import { MdEditDocument } from "react-icons/md";

interface Props {
  user: User;
  onCancel: () => void;
  onUpdate: (updatedUser: User) => void;
}

const UpdateUserModal: React.FC<Props> = ({ user, onCancel, onUpdate }) => {
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState({
    username: user.username,
    department: user.department || "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    department: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.departments.url);
        const data = await res.json();
        setDepartments(data.data);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };
    fetchDepartments();
  }, []);

  const validate = () => {
    const errors = { username: "", department: "" };
    if (!form.username) errors.username = "Username is required.";
    if (!user.is_vendor && !form.department) errors.department = "Department is required.";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleUpdate = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    const payload = {
      user_id: user.id,
      name: form.username,
      department: user.is_vendor ? "" : form.department,
    };

    try {
      const res = await fetch(API_ENDPOINTS.updateUser.url, {
        method: API_ENDPOINTS.updateUser.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Update failed.");
        return;
      }

      toast.success("User updated successfully.");
      onUpdate({
        ...user,
        username: form.username,
        department: form.department,
      });
    } catch (err) {
      console.error("Update error", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative p-6 sm:p-8">
        <button
          onClick={onCancel}
          className="absolute top-5 right-6 text-red-400 hover:text-red-500 text-xl font-bold hover:scale-120 ease-in-out transition-transform cursor-pointer hover:bg-gray-200 rounded-md"
        >
          <RxCross2 />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Update User
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.username ? "border-red-400" : "border-gray-300"
                }`}
            />
            {fieldErrors.username && <p className="text-xs text-red-500 mt-1">{fieldErrors.username}</p>}
          </div>

          {!user.is_vendor && (
            <div>
              <label className="block text-sm font-medium mb-1">Department <span className="text-red-500">*</span></label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${fieldErrors.department ? "border-red-400" : "border-gray-300"
                  }`}
              >
                <option value="">Select Department</option>
                {Object.entries(departments).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              {fieldErrors.department && <p className="text-xs text-red-500 mt-1">{fieldErrors.department}</p>}
            </div>
          )}

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 rounded-md mt-4 cursor-pointer flex items-center justify-center gap-2"
          >
            <MdEditDocument className="w-5 h-5" />
            <span>Update</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
