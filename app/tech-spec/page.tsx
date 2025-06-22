"use client";
import React, { useState } from "react";
import Table from "@/components/core/Table";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
} from "react-icons/fa";
import SheetTitle from "@/components/core/SheetTitle";
import InputForm from "@/components/core/InputForm";
export default function TechSpecSheet() {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaClipboardList />, label: "Tech Specs" },
    { icon: <FaTools />, label: "Inspections" },
    { icon: <FaWrench />, label: "Settings" },
  ];
  return (
    <>
      <div className=" flex-1 flex flex-col p-6">
        {/* Form inputs */}
        <div className="">
          <SheetTitle title="Tech Specs Measurement Sheet" version="v1.4" />

          <InputForm
            label={[
              ["Style Name", "Buyer PO Number", "Vendor PO Number"],
              ["Merchant Name", "Vendor Name", "Spec Valid Till"],
              ["Tech Name", "Base Size", "QA Name", "Order Quantity"],
            ]}
          />
        </div>

        {/* Page Content */}
        <Table col={10} row={10} imagecol={5} colwidth={[25,25,25,25,45,25,25,25,25]}/>
      </div>
    </>
  );
}
