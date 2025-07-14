"use client";
import { on } from "events";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/lib/api";

interface Props {
  name: string;
  onUpdate: (newName: string) => void;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<Props> = ({ name, onUpdate, onClose }) => {
  const [username, setUsername] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const token = localStorage.getItem("access_token"); // ✅ Fix here

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.updateUsername.url, {
        method: API_ENDPOINTS.updateUsername.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Attach token here
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Update failed.");
        return;
      }

      toast.success("Profile updated!");
      onUpdate(name); // update parent state

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-5 text-red-400 hover:text-red-500 hover:scale-105 transition-transform duration-200 hover:bg-gray-200 rounded-md"
        >
          <RxCross2 className="w-6 h-6" />
        </button>

        {/* Title */}

        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Update Your Info
        </h3>

        {/* Input Field */}

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Employee Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdate()}
            className={`px-4 py-2 text-white rounded-md ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600 "
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
