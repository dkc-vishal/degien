"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { QueryProvider } from "../providers/QueryProvider";
import { ProtectedRoute } from "../Protected_Route";
import { PUBLIC_ROUTES } from "@/lib/types/roles";
import { useState, useRef, useEffect } from "react";
import { tokenUtils } from "@/lib/api/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proactive token refresh check
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (tokenUtils.isAuthenticated() && tokenUtils.isTokenExpiringSoon()) {
        try {
          await tokenUtils.refreshToken();
          console.log("Token refreshed proactively");
        } catch (error) {
          console.error("Proactive token refresh failed:", error);
        }
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Set up interval to check every 2 minutes
    const interval = setInterval(checkTokenExpiry, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const socket = useRef<WebSocket | null>(null);
  const [notifications_mess, setNotifications_mess] = useState<Notification[]>(
    []
  );

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <QueryProvider>
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
              {children}
            </div>
          </div>
        </ProtectedRoute>
      )}
    </QueryProvider>
  );
}
