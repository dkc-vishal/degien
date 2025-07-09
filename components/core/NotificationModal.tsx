"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
type NotificationModalProps = {
  title: string;
  message: string;
  timestamp: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const NotificationModal = ({ title, message, timestamp, onConfirm, onCancel }: NotificationModalProps) => {

  const [confirmed, setConfirmed] = useState(false);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleConfirm = () => {
    ``
    onConfirm();
    toast.success("Notification acknowledged");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-2xl relative animate-fadeIn">
        <div className="text-center mb-2 text-3xl">📩</div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-5">{title}</h2>
        <p className="text-gray-700 text-sm text-center mb-1">{message}</p>
        <p className="text-xs text-center text-gray-400 mb-9">{formatDateTime(timestamp)}</p>

        <label className="flex items-start gap-2 text-sm text-gray-700 mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 cursor-pointer"
          />
          I have read and understood this notification.
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!confirmed}
            className={`px-4 py-2 rounded-md text-white transition ${confirmed
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
              }`}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;