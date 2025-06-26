"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
} from "react-icons/fa";

export default function Sidebar({ side }: any) {
  const Sidebar: any = side;
  const router = useRouter();

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/Dashboard" },
    { icon: <FaClipboardList />, label: "Tech Specs", path: "/tech-spec" },
    { icon: <FaTools />, label: "Inspections", path: "/mid-final" },
    { icon: <FaTools />, label: "QA-Initial", path: "/qa-initial-report" },
    { icon: <FaTools />, label: "Sampling Watch Point", path: "/SamplingWatchPoint" },
    { icon: <FaTools />, label: "Feeding Sampling", path: "/FeedingSampling" },
    { icon: <FaTools />, label: "Merchant Watch Point", path: "/MerchantWatchPoint" },
    { icon: <FaWrench />, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      style={{ width: Sidebar ? "0%" : "15%" }}
      className={`transition-all duration-300 fixed h-screen bg-gray-900 text-gray-100 flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!Sidebar && <h2 className="text-lg font-semibold">Admin</h2>}
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-2 space-y-1">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => router.push(item.path)}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left"
          >
            <span className="text-lg">{item.icon}</span>
            {!Sidebar && <span className="ml-3 text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
