"use client";
import React, { useState } from "react";
import Table from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import {
    FaBars,
    FaTachometerAlt,
    FaClipboardList,
    FaWrench,
    FaTools,
} from "react-icons/fa";
import Header from "@/components/Header";
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
                <Sidebar />

                {/* Main Content */}
                <div
                    className="flex-1 flex flex-col"
                    style={{ width: "calc(100vw - 15%)" }}
                >
                    {/* Navbar */}
                        <Header/>

                    {/* Page Content */}
                    <Table />

                </div>

            </div>
        </>
    );
}
