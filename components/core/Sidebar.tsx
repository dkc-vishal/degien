"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaUserFriends,
  FaTshirt
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

export default function Sidebar({ side }: any) {
  const Sidebar: any = side;
  const router = useRouter();
  const pathname = usePathname(); // 👈 get current route

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUserFriends />, label: "User Management", path: "/user-detail" },
    { icon: <GiSewingMachine />, label: "Sampling Styles", path: "/sampling-styles" },
    { icon: <FaTshirt />, label: "Production Styles", path: "/production-styles" },
    { icon: <MdLocalShipping />, label: "Shipped Styles", path: "/shipped-styles" },
    { icon: <CgProfile />, label: "My Profile", path: "/my-profile" },
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

          const isActive = pathname.startsWith(item.path);

          return (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-3 py-2 rounded text-left transition-all cursor-pointer
                ${isActive ? "bg-gray-700 text-white font-semibold" : "hover:bg-gray-700 text-gray-300"}`}
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
