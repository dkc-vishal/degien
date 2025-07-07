"use client";

import React, { useState } from "react";
import NotificationCard from "./NotificationCard";

const mockNotifications = [
  {
    id: "1",
    type: "sampling",
    styleId: "pixie-cardi",
    title: "New Sampling Style Created",
    message: "A new sampling style 'Pixie Cardi' has been added for review.",
    timestamp: "2025-07-04T10:20:00", // ISO format
    read: false,
  },
  {
    id: "2",
    type: "production",
    styleId: "raya-bandana",
    title: "Production Style Updated",
    message: "Updates have been made to the 'Raya Bandana' production style.",
    timestamp: "2025-07-04T09:10:00",
    read: false,
  },
  {
    id: "3",
    type: "production",
    styleId: "raya-bandana",
    title: "Production Style Created",
    message: "'Raya Bandana' has been created in production style.",
    timestamp: "2025-07-04T09:10:00",
    read: true,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState<"unread" | "read">("unread");

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="px-10 py-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>

      {/* Tabs */}

      <div className="flex items-center gap-6 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("unread")}
          className={`text-lg font-semibold cursor-pointer ${activeTab === "unread"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500"
            }`}
        >
          Unread{" "}
          <span className="ml-1 text-sm bg-red-500 text-white px-2 py-0.5 rounded-full">
            {unread.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("read")}
          className={`text-lg font-semibold cursor-pointer ${activeTab === "read"
            ? "text-blue-500 border-b-2 border-blue-500"
            : "text-gray-500"
            }`}
        >
          Read{" "}
          <span className="ml-1 text-sm bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
            {read.length}
          </span>
        </button>
      </div>

      {/* Notification List */}

      <div className="space-y-4">
        {(activeTab === "unread" ? unread : read).map((note) => (
          <NotificationCard
            key={note.id}
            title={note.title}
            message={note.message}
            timestamp={note.timestamp}
            read={note.read}
            type={note.type}
            styleId={note.styleId}
          />
        ))}
      </div>

      {activeTab === "unread" && unread.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">No unread notifications 🎉</p>
      )}

      {activeTab === "read" && read.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">No read notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
