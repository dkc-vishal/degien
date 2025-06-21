"use client";
import React, { useState } from "react";
import {
    FaBars,
    FaTachometerAlt,
    FaClipboardList,
    FaWrench,
    FaTools,
} from "react-icons/fa";
export default function Header({side}: any) {
    const sidebar:any  = side;
    const menuItems = [
        { icon: <FaTachometerAlt />, label: "Dashboard" },
        { icon: <FaClipboardList />, label: "Tech Specs" },
        { icon: <FaTools />, label: "Inspections" },
        { icon: <FaWrench />, label: "Settings" },
    ];
    return (
        <>

            <header className="bg-white border-b shadow-sm px-6 py-4 text-gray-800">
                <div className="flex justify-between items-center">
                    {/* Left: Search Bar */}
                    <button onClick={sidebar} className="text-black text-lg">
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



        </>
    );
}


