"use client";
import ImageEditorModal from "@/components/image-editor/ImageEditorModal";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react"; // Make sure useRef is imported
import React, { useState } from "react";
import Table from "@/components/Table";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
} from "react-icons/fa";
export default function TechSpecSheet() {
      const [collapsed, setCollapsed] = useState(false);
    
  const toggleSidebar = () => setCollapsed(!collapsed);
   const menuItems = [
     { icon: <FaTachometerAlt />, label: "Dashboard" },
     { icon: <FaClipboardList />, label: "Tech Specs" },
     { icon: <FaTools />, label: "Inspections" },
     { icon: <FaWrench />, label: "Settings" },
   ];
  return (
    <>
       <div className="flex h-screen font-sans bg-gray-100">
        {/* Sidebar */}
        <aside
          style={{ width: collapsed ? "0%" : "15%" }}
          className={`transition-all duration-300 bg-gray-900 text-gray-100 flex flex-col`}
        >
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && <h2 className="text-lg font-semibold">Admin</h2>}
          </div>

          {/* Menu */}
          <nav className="flex flex-col p-2 space-y-1">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-800"
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 text-sm">{item.label}</span>
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div
          className="flex-1 flex flex-col"
          style={{ width: "calc(100vw - 15%)" }}
        >
          {/* Navbar */}
          <header className="bg-white border-b shadow-sm px-6 py-4 text-gray-800">
            <div className="flex justify-between items-center">
              {/* Left: Search Bar */}
              <button onClick={toggleSidebar} className="text-black text-lg">
                <FaBars />
              </button>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              {/* Right: Avatar + Name */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">Welcome, Vishal</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
    <Table/>

        </div>

      </div>
    </>
  );
}
