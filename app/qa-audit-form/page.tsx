"use client";

import React, { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";
import { toast } from "sonner";
import TooltipLabel from "@/components/core/TooltipLabel";

const SIZE_TABS = ["XS", "S", "M", "L", "XL"];
const FT_COLUMNS = Array.from({ length: 10 }, (_, i) => `FT No ${i + 1}`);

export default function QAuditForm() {
  const [selectedSize, setSelectedSize] = useState("XS");
  const [status, setStatus] = useState("fail");

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    toast.success(`Switched to size: ${size}`);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      
      <div className="mb-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">QA Audit Form</h1>
            <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
              🔒 View Only
            </span>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="font-semibold">Version v1.4</div>
            <div className="text-xs">July 9, 2025</div>
          </div>
        </div>

        {/* Meta Badges */}

        <div className="mt-4 flex gap-4 mb-5">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            <FaUser className="w-3 h-3" />
            Last Edited by: <span className="font-medium">Sonu NM</span>
          </span>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            <FaClock className="w-3 h-3" />
            Last Edited at: <span className="font-medium">Jul 9, 10:00 AM</span>
          </span>
        </div>
      </div>

      {/* Input Fields */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        <Input label="Style Name" placeholder="Enter style name" tooltip="Filled by the Merchant team." />
        <Input label="QA Name" placeholder="Enter QA name" tooltip="Filled by the Merchant team." />
        <Input label="Merchant Name" placeholder="Enter merchant name" tooltip="Filled by Merchant." />
        <Input label="Vendor Name" placeholder="Enter vendor name" tooltip="Filled by Merchant." />
        <Input label="Color" placeholder="Enter color" tooltip="Filled by Merchant team." />

        {/* Specs For */}

        <div>
          <TooltipLabel label="Specs For" tooltip="Measurement"/>
          <select
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="Initial"
          >
            <option value="Initial">Initial</option>
            <option value="Mid/Final">Mid/Final</option>
          </select>
        </div>

        {/* Date */}
        
        <div>
          <TooltipLabel label="Date" tooltip="The date the QA audit is conducted." />
          <input
            type="date"
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TNA Date */}
        <div>
          <TooltipLabel label="TNA Date" tooltip="Target date from the TNA schedule." />
          <input
            type="date"
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Size (readonly) */}
        <div>
          <TooltipLabel label="Size" tooltip="This value is selected using the size tabs above." />
          <input
            type="text"
            value={selectedSize}
            readOnly
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Inspection Type (disabled) */}
        <div>
          <TooltipLabel label="Inspection Type" tooltip="Fetched from backend. Not editable." />
          <input
            type="text"
            value="From Backend"
            disabled
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Result */}
        <div>
          <TooltipLabel label="Result" tooltip="Select 'Pass' or 'Fail' based on QA inspection." />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              ${status === "pass"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
              }`}
          >
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
      </div>

      {/* Size Tabs */}

      <div className="flex gap-3 my-10">
        {SIZE_TABS.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`px-12 py-2 rounded-full text-sm font-medium transition-all duration-200 border shadow-sm cursor-pointer
              ${selectedSize === size
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600"
              }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Table */}

      <div className="bg-white shadow border rounded-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Header</th>
              <th className="px-4 py-2 border">Measurement Type</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Measurement Images</th>
              <th className="px-4 py-2 border">Grading Rule</th>
              <th className="px-4 py-2 border">
                Size ({selectedSize})
              </th>
              {FT_COLUMNS.map((ft) => (
                <th key={ft} className="px-4 py-2 border">{ft}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 17 }).map((_, j) => (
                  <td key={j} className="px-4 py-2 border h-10"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reusable Input Component using TooltipLabel

const Input = ({
  label,
  placeholder,
  tooltip,
}: {
  label: string;
  placeholder: string;
  tooltip?: string;
}) => (
  <div>
    <TooltipLabel label={label} tooltip={tooltip} />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
