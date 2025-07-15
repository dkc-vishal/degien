"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useDepartments, useUpdateProfile } from "@/lib/api/hooks";

interface Props {
  name: string;
  department: string;
  onUpdate: (newName: string) => void;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<Props> = ({
  name,
  department,
  onUpdate,
  onClose,
}) => {
  const [username, setUsername] = useState(name);
  const [selectedDepartment, setSelectedDepartment] = useState(department);

  const UpdateUserProfileMutation = useUpdateProfile();

  const isLoading = UpdateUserProfileMutation.isPending;
  const isError = UpdateUserProfileMutation.isError;
  const error = UpdateUserProfileMutation.error;

  const { data: departments } = useDepartments();

  const handleUpdate = async () => {
    if (!username.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (username.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }

    if (!selectedDepartment) {
      toast.error("Please select a department");
      return;
    }

    const nameChanged = username.trim() !== name.trim();
    const departmentChanged = selectedDepartment !== department;

    if (!nameChanged && !departmentChanged) {
      toast.error("Please make at least one change to update");
      return;
    }

    const updatePayload: { name?: string; department?: string } = {};

    if (nameChanged) {
      updatePayload.name = username.trim();
    }

    if (departmentChanged) {
      updatePayload.department = selectedDepartment;
    }

    UpdateUserProfileMutation.mutate(updatePayload, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        onUpdate(username.trim());
        onClose();
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message || "Failed to update profile";
        toast.error(message);
      },
    });

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const getDepartmentName = (deptKey: string) => {
    if (!departments?.data) return deptKey;
    return (departments.data as unknown as Record<string, string>)[deptKey] || deptKey;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Updating profile...</p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className={`absolute top-4 right-5 text-red-400 hover:text-red-500 hover:scale-105 transition-transform duration-200 hover:bg-gray-200 rounded-md ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <RxCross2 className="w-6 h-6" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Update Your Profile
        </h3>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {(error as any)?.response?.data?.message ||
                (error as any)?.message ||
                "An error occurred while updating profile."}
            </p>
          </div>
        )}

        <div className="mb-4">
          {/* Name Input Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Employee Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize ${
                isLoading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Enter your full name"
              maxLength={50}
            />

            <div className="flex justify-between mt-1">
              <span
                className={`text-xs ${
                  username.trim().length < 2 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {username.trim().length < 2 && username.trim().length > 0
                  ? "Name too short"
                  : ""}
              </span>
              <span className="text-xs text-gray-400">
                {username.length}/50
              </span>
            </div>
          </div>

          {/* Department Select */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              disabled={isLoading}
              className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isLoading ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select Department</option>
              {departments?.data &&
                Object.entries(departments.data).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Name comparison indicator */}
        {((username.trim() !== name.trim() && username.trim()) ||
          (selectedDepartment !== department && selectedDepartment)) && (
          <div className="my-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 text-sm font-medium mb-2">
              Changes to be made:
            </p>

            {username.trim() !== name.trim() && username.trim() && (
              <div className="text-blue-600 text-sm mb-1">
                <span className="font-medium">Name:</span> {name} →{" "}
                {username.trim()}
              </div>
            )}

            {selectedDepartment !== department && selectedDepartment && (
              <div className="text-blue-600 text-sm">
                <span className="font-medium">Department:</span>{" "}
                {getDepartmentName(department || "None")} →{" "}
                {getDepartmentName(selectedDepartment)}
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 ${
              isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={
              isLoading ||
              !username.trim() ||
              username.trim().length < 2 ||
              username.trim() === name.trim()
            }
            className={`px-4 py-2 text-white rounded-md transition-all duration-200 ${
              isLoading ||
              !username.trim() ||
              username.trim().length < 2 ||
              username.trim() === name.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Your information will be updated across all systems.
        </p>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
