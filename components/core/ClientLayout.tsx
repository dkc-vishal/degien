"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/" || pathname.startsWith("/Auth"); // lowercase!

  return isAuthRoute ? (
    <div className="min-h-screen bg-gray-100">{children}</div>
  ) : (
    <div className="flex h-screen font-sans bg-gray-100">
      <div className="no-print">
        <Sidebar />
      </div>
      <div className="removesidebarspace flex-1 flex flex-col ml-[15%]" style={{ width: "calc(100vw - 30%)" }}>
        <div className="no-print">
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
