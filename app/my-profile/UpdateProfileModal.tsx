"use client";
import { on } from "events";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

interface Props {
  username: string;
  onUpdate: (newName: string) => void;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<Props> = ({ username, onUpdate, onClose }) => {

  const [name, setName] = useState(username);

  const handleUpdate = () => {
    if(!name.trim()){
      toast.error("Name cannot be empty");
      return ; 
    }
    onUpdate(name) ; 
    toast.success("Profile updated successfully");

    // close modal after 1.5-2 seconds 

    setTimeout(() => {
      onClose() ; 
    }, 1500);

  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-5 text-red-400 hover:text-red-500 hover:scale-125 transition-transform duration-200"
        >
          <RxCross2 className="w-6 h-6" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Update Your Info</h3>

        {/* Input Field */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Employee Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdate()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
