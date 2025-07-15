"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { QueryProvider } from "../providers/QueryProvider";
import { ProtectedRoute } from "../Protected_Route";
import { PUBLIC_ROUTES } from "@/lib/types/roles";
import { useState, useRef, useEffect } from "react";
import { tokenUtils } from "@/lib/api/utils";
import NotificationModal from "@/app/notifications/NotificationModal";

type Notification = {
  notification_id: string;
  object_id: string;
  title: string;
  message: string;
  timestamp: string; // assuming ISO format
  type: string; // assuming these are the only valid options
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Add loading states
  const [layoutLoading, setLayoutLoading] = useState(true);
  const [tokenRefreshLoading, setTokenRefreshLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const socket = useRef<WebSocket | null>(null);
  const [notifications_mess, setNotifications_mess] = useState<Notification[]>(
    []
  );

  // Proactive token refresh check
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (tokenUtils.isAuthenticated() && tokenUtils.isTokenExpiringSoon()) {
        setTokenRefreshLoading(true);

        try {
          await tokenUtils.refreshToken();
          console.log("Token refreshed proactively");
        } catch (error) {
          console.error("Proactive token refresh failed:", error);
        } finally {
          setTokenRefreshLoading(false);
        }
      }
    };

    const initializeLayout = async () => {
      setLayoutLoading(true);

      try {
        await checkTokenExpiry();
        // Simulate initialization time
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Layout initialization failed:", error);
      } finally {
        setLayoutLoading(false);
      }
    };

    initializeLayout();

    // Set up interval to check every 2 minutes
    const interval = setInterval(checkTokenExpiry, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    setNotifications_mess((prevItems) => prevItems.slice(1));
  };

  const patchData = async (notificationId: string) => {
    setNotificationLoading(true);

    try {
      const response = await fetch(
        `http://128.100.10.108:8000/api/v1.0/notification/read-notification/${notificationId}/`,

        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2Mzc4NDQxLCJpYXQiOjE3NTIwNTg0NDEsImp0aSI6IjRhNjU0ZjExMzk4MjRhMjc5ZWIxNGE5NDc3ZTM1NWUxIiwidXNlcl9pZCI6ImRlYjg2MjA5LWZhMTMtNDVlZC04YzMwLWYxODExMGMzOTVjNiJ9.YYLCICofVQr8dtdh2Ut--BwvsAkegqXcceizZ6XN4TU`, // 🔐 Token goes here
          },
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        setNotifications_mess((prevItems) => prevItems.slice(1));

        console.log(data);
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    } finally {
      setNotificationLoading(false);
    }
  };

  // const handleAcknowledge = async(notificationId: string) => {

  //   const res = await axios.patch(`http://128.100.10.108:8000/api/v1.0/notification/read-notification/${notificationId}/`)

  //   console.log(res)

  //   // setNotifications_mess((prevItems) => prevItems.filter(item => item.notification_id !== notificationId));

  //   toast.success("Notification acknowledged!");

  // };

  useEffect(() => {
    const ws = new WebSocket(
      "ws://128.100.10.108:8000/ws/v1.0/notification/?user_id=deb86209-fa13-45ed-8c30-f18110c395c6"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      setNotifications_mess((prev) => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e.code, e.reason);
    };

    socket.current = ws;

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, []);

  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (layoutLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading application...</p>
          {tokenRefreshLoading && (
            <p className="text-gray-500 text-sm mt-2">
              Refreshing authentication...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <QueryProvider>
      {tokenRefreshLoading && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 z-50">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm">Refreshing session...</span>
          </div>
        </div>
      )}

      {isPublicRoute ? (
        // Public routes don't need protection
        <div className="min-h-screen bg-gray-100">{children}</div>
      ) : (
        // Protected routes
        <ProtectedRoute>
          <div className="flex min-h-screen font-sans bg-gray-100">
            <div className="no-print">
              <Sidebar isSidebarOpen={isSidebarOpen} />
            </div>
            <div
              className={` flex-1 flex flex-col ${
                isSidebarOpen
                  ? "removesidebarspace w-[calc(100vw-30%)] ml-[15%]"
                  : "w-full"
              } transition-all duration-300`}
            >
              <div className="no-print">
                <Header toggleSidebar={toggleSidebar} />
              </div>

              <div className="transition-all duration-300">{children}</div>
            </div>

            {notifications_mess.length > 0 && (
              <div>
                <NotificationModal
                  key={notifications_mess[0].notification_id}
                  title={notifications_mess[0].title}
                  message={notifications_mess[0].message}
                  timestamp={new Date().toLocaleString()}
                  loading={notificationLoading}
                  onConfirm={() => {
                    patchData(notifications_mess[0].notification_id);
                  }}
                  onCancel={handleCloseModal}
                />
              </div>
            )}
          </div>
        </ProtectedRoute>
      )}
    </QueryProvider>
  );
}
