"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { QueryProvider } from "../providers/QueryProvider";
import { useState, useRef, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const isAuthRoute = pathname === "/" || pathname.startsWith("/Auth");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <QueryProvider>
      {isAuthRoute ? (
        <div className="min-h-screen bg-gray-100">{children}</div>
      ) : (
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
      )}
    </QueryProvider>
  );
}
