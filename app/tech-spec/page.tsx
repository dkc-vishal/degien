"use client";
import React, { useState } from "react";
import Table from "@/components/core/Table";
import Link from "next/link";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
  FaPrint
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
          <SheetTitle
            title="Tech Specs Measurement Sheet"
            version="v1.4"
            printpage="/techspecprintpage"
          />
          <Link
            href="/printpage"
            className="flex items-center gap-1  font-medium px-4 py-1 rounded-xl shadow-md transition duration-200"
          >
            <FaPrint />
            
          </Link>

          <InputForm
            label={[
              ["Style Name", "Buyer PO Number", "Vendor PO Number"],
              ["Merchant Name", "Vendor Name", "Spec Valid Till"],
              ["Tech Name", "Base Size", "QA Name", "Order Quantity"],
            ]}
          />
        </div>

        {/* Page Content */}
        <Table
          col={16}
          row={20}
          tablename="Tech Specs"
          imagecol={6}
          columnheaders={[
            "Move",
            "Sno",
            "SHOULD GO TO QA INSPECTION ?",
            "HEADER",
            "MEASUREMENT TYPE",
            "LOCATION",
            "MEASUREMENT PICTURE URL",
            "MSR MEASUREMENT",
            "MSR GRADING RULE",
            "REAL TIME GRADING RULE",
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "HELPER COLUMN FOR MEASUREMENT",
          ]}
        />
      </div>
    </>
  );
}
