"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
  FaUserFriends,
  FaTshirt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";

export default function Sidebar({ side }: any) {
  const Sidebar: any = side;
  const router = useRouter();
  const pathname = usePathname(); // 👈 get current route

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaClipboardList />, label: "Tech Specs", path: "/tech-spec" },
    { icon: <FaTools />, label: "Inspections", path: "/mid-final" },
    { icon: <FaTools />, label: "QA-Initial", path: "/qa-initial-report" },
    {
      icon: <FaTools />,
      label: "Sampling Watch Point",
      path: "/SamplingWatchPoint",
    },
    { icon: <FaTools />, label: "Master 110", path: "/form-110" },
    {
      icon: <FaTools />,
      label: "Merchant Watch Point",
      path: "/MerchantWatchPoint",
    },
    { icon: <FaTools />, label: "Fit/PP/TOP/WEB", path: "/Fit-top-pp" },
    { icon: <FaWrench />, label: "Settings", path: "/settings" },
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUserFriends />, label: "User Management", path: "/user-detail" },
    {
      icon: <GiSewingMachine />,
      label: "Sampling Styles",
      path: "/sampling-styles",
    },
    {
      icon: <FaTshirt />,
      label: "Production Styles",
      path: "/production-styles",
    },
    {
      icon: <MdLocalShipping />,
      label: "Shipped Styles",
      path: "/shipped-styles",
    },
  ];

  return (
    <aside
      style={{ width: Sidebar ? "0%" : "15%" }}
      className={`transition-all duration-300 fixed h-screen bg-gray-900 text-gray-100 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!Sidebar && <h2 className="text-lg font-semibold">Admin</h2>}
      </div>

      <nav className="flex flex-col p-2 space-y-1">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-3 py-2 rounded text-left transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-gray-700 text-white font-semibold"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!Sidebar && <span className="ml-3 text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
