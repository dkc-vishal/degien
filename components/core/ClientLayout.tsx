"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { QueryProvider } from "../providers/QueryProvider";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
