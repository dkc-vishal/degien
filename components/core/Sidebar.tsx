"use client";
import React, { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
} from "react-icons/fa";
export default function Sidebar({side}: any) {
    const Sidebar:any  = side;
    console.log(Sidebar)
   const menuItems = [
     { icon: <FaTachometerAlt />, label: "Dashboard" },
     { icon: <FaClipboardList />, label: "Tech Specs" },
     { icon: <FaTools />, label: "Inspections" },
     { icon: <FaWrench />, label: "Settings" },
   ];
  return (
    <>

        <aside
          style={{ width: Sidebar ? "0%" : "15%" }}
          className={`transition-all duration-300 bg-gray-900 text-gray-100 flex flex-col`}
        >
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!Sidebar && <h2 className="text-lg font-semibold">Admin</h2>}
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
                {!Sidebar && (
                  <span className="ml-3 text-sm">{item.label}</span>
                )}
              </a>
            ))}
          </nav>
        </aside>


    </>
  );
}
