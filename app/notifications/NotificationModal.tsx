"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
type NotificationModalProps = {
  title: string;
  message: string;
  timestamp: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const NotificationModal = ({
  title,
  message,
  timestamp,
  loading = false,
  onConfirm,
  onCancel,
}: NotificationModalProps) => {
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
    ``;
    onConfirm();
    toast.success("Notification acknowledged");
  };

  return (
    <div className="fixed inset-0 z-50 flex  justify-center bg-black/10 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[25%] max-w-2xl relative animate-fadeIn h-[30%]">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="text-center mb-2 text-3xl ">📩</div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          {title}
        </h2>
        <p className="text-xs text-center text-gray-400 mb-2">
          {formatDateTime(timestamp)}
        </p>
        <p className="text-gray-700 text-sm text-center mb-1">{message}</p>

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
            disabled={loading}
            className={`px-4 py-2 rounded border ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Acknowledging...
              </span>
            ) : (
              "Acknowledge"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
