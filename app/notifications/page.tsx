"use client";

import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import NotificationModal from "@/components/core/NotificationModal";
import { toast } from "sonner"

interface Notification {
  content_type: string | null;
  created_at: string; // ISO 8601 date string
  id: string;
  is_active: boolean;
  is_read: boolean;
  message: string;
  object_id: string;
  read_at: string | null;
  read_by: string | null;
  recipients: string[];
  sent_at: string;
  title: string;
  type: 'both' | 'email' | 'push' | string; // assuming 'both' is one of possible types
  updated_at: string;
}


const NotificationsPage = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const getData = async () => {
    const response = await fetch(
      `http://128.100.10.108:8000/api/v1.0/notification/list-notifications/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2Mzc4NDQxLCJpYXQiOjE3NTIwNTg0NDEsImp0aSI6IjRhNjU0ZjExMzk4MjRhMjc5ZWIxNGE5NDc3ZTM1NWUxIiwidXNlcl9pZCI6ImRlYjg2MjA5LWZhMTMtNDVlZC04YzMwLWYxODExMGMzOTVjNiJ9.YYLCICofVQr8dtdh2Ut--BwvsAkegqXcceizZ6XN4TU`, // 🔐 Token goes here
        },
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setNotifications(data.data.data);     
      console.log(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  
  const [activeTab, setActiveTab] = useState<"unread" | "read">("unread");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleOpenModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };

  const handleAcknowledge = () => {
    // Optional: Mark notification as read or send to backend
    setModalOpen(false);
    toast.success("Notification acknowledged!");
  };

  const unread = notifications.filter((n) => !n.is_read);
  const read = notifications.filter((n) => n.is_read);
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
            timestamp={note.created_at}
            type={note.type}
            styleId={note.object_id}
            onPreview={() => handleOpenModal(note)} // Pass the click handler
          />
        ))}
      </div>

      {activeTab === "unread" && unread.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">No unread notifications 🎉</p>
      )}

      {activeTab === "read" && read.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">No read notifications yet.</p>
      )}

      {modalOpen && selectedNotification && (
        <NotificationModal
          title={selectedNotification.title}
          message={selectedNotification.message}
          timestamp={selectedNotification.created_at}
          onConfirm={handleAcknowledge}
          onCancel={handleCloseModal}
        />
      )}

    </div>
  );
};

export default NotificationsPage;