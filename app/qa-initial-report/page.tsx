"use client";

import Header from "@/components/core/Header";
import InputForm from "@/components/core/InputForm";
import SheetTitle from "@/components/core/SheetTitle";
import Sidebar from "@/components/core/Sidebar";
import Table from "@/components/core/Table";

export default function QaIntialReport() {
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
          <Header />

          {/* Form inputs */}
          <div className="p-6">
            <SheetTitle title="QA Intial Report" version="v1.4" />
          </div>

          {/* Page Content */}
          <Table />
        </div>
      </div>
    </>
  );
}
