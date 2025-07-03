"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaUserFriends, FaTshirt } from "react-icons/fa";
import { MdDashboard, MdLocalShipping } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { toast } from "sonner";

export default function Sidebar({ side }: any) {
  const Sidebar: any = side;
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: <MdDashboard size={22} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUserFriends size={22} />, label: "User Management", path: "/user-detail" },
    { icon: <GiSewingMachine size={22} />, label: "Sampling Styles", path: "/sampling-styles" },
    { icon: <FaTshirt size={22} />, label: "Production Styles", path: "/production-styles" },
    { icon: <MdLocalShipping size={22} />, label: "Shipped Styles", path: "/shipped-styles" },
  ];

  const profileItems = [
    { icon: <CgProfile size={22} />, label: "My Profile", path: "/my-profile" },
  ];

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      toast.error("No refresh token found.");
      return;
    }

    try {
      const res = await fetch("http://shivam-mac.local:8000/api/v1.0/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Logout failed:", err);
        toast.error("Logout failed.");
        return;
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      toast.success("Logged out successfully.");
      router.push("/Auth/Login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <aside
      style={{ width: Sidebar ? "0%" : "15%" }}
      className={`transition-all duration-300 fixed h-screen bg-gray-900 text-gray-100 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
        {!Sidebar && <h2 className="text-xl font-bold tracking-wide">Admin</h2>}
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col px-2 pt-4 space-y-2 flex-grow">
        {menuItems.map((item, idx) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full
              ${isActive ? "bg-gray-700 text-white font-semibold" : "hover:bg-gray-800 text-gray-300"}`}
            >
              <span className="text-[22px]">{item.icon}</span>
              {!Sidebar && <span className="ml-4 text-[15px] font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Profile + Logout */}
      <div className="px-2 pb-4 space-y-2">
        {profileItems.map((item, idx) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full
              ${isActive ? "bg-gray-700 text-white font-semibold" : "hover:bg-gray-800 text-gray-300"}`}
            >
              <span className="text-[22px]">{item.icon}</span>
              {!Sidebar && <span className="ml-4 text-[15px] font-medium">{item.label}</span>}
            </button>
          );
        })}

        {/* Logout Button */}

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full hover:bg-gray-800 text-gray-300 mb-14"
        >
          <TbLogout size={22} />
          {!Sidebar && <span className="ml-4 text-[15px] font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
