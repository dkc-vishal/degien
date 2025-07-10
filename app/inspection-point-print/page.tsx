"use client";

import React from "react";
import { FaUser, FaClock } from "react-icons/fa";
import TooltipLabel from "@/components/core/TooltipLabel";

const FT_COLUMNS = Array.from({ length: 10 }, (_, i) => `FT No ${i + 1}`);

export default function InspectionPointPrint() {
  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Inspection Point Print</h1>
          <div className="text-right text-sm text-gray-600">
            <div className="font-semibold">Version v1.4</div>
            <div className="text-xs">July 9, 2025</div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 flex gap-4 mb-5">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-15">
        <Input
          label="Style Name"
          placeholder="Enter style name"
          tooltip="Provided by Merchant team. Identifies the garment under inspection."
        />
        <Input
          label="Tech Name"
          placeholder="Enter tech name"
          tooltip="Name of the technician responsible for preparing or reviewing the inspection."
        />
        <Input
          label="Merchant Name"
          placeholder="Enter merchant name"
          tooltip="The merchant in charge of the style. Contact for clarification."
        />
        <Input
          label="Vendor Name"
          placeholder="Enter vendor name"
          tooltip="Factory or supplier producing the inspected garment."
        />
        <Input
          label="QA Name"
          placeholder="Enter QA name"
          tooltip="Quality Auditor assigned to this inspection checkpoint."
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow border rounded-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Issue Name / Stage</th>
              <th className="px-4 py-2 border">Comments / Trigger / Watchpoints</th>
              <th className="px-4 py-2 border">Issue Picture</th>
              {FT_COLUMNS.map((ft) => (
                <th key={ft} className="px-4 py-2 border">{ft}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 14 }).map((_, j) => (
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

// Reusable Input with TooltipLabel
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
