"use client";
import React, { useState } from "react";
import Table from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default function TechSpecSheet() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);
    
    return (
        <>
            <div className="flex w-full h-screen font-sans bg-gray-100">
                {/* Sidebar */}
                <Sidebar side={collapsed}/>

                {/* Main Content */}
                <div
                    className="flex-1 flex flex-col"
                    style={{ width: "calc(100vw - 15%)" }}
                >
                    {/* Navbar */}
                    <Header side={toggleSidebar}/>

                    {/* Page Content */}
                    <Table />

                </div>

            </div>
        </>
    );
}
