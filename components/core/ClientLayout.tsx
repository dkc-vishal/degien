"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { QueryProvider } from "../providers/QueryProvider";
import { useState,useRef,useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const socket = useRef<WebSocket | null>(null);
  const [notifications_mess, setNotifications_mess] = useState<Notification[]>(
    []
  );
  const handleCloseModal = () => {
    setNotifications_mess((prevItems) => prevItems.slice(1));
  };
  const patchData = async (notificationId: string) => {
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
  const isAuthRoute = pathname === "/" || pathname.startsWith("/Auth"); // lowercase!
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
