"use client";

import React, { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";

export default function FitAuditSheet() {
  const [status, setStatus] = useState("fail");

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Title and Meta */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Fit Audit Sheet</h1>
          <div className="text-right text-sm text-gray-600">
            <div className="font-semibold">Version v1.4</div>
            <div className="text-xs">July 4, 2025</div>
          </div>
        </div>

        {/* Badges */}

        <div className="mt-3 flex gap-4 mb-5">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            <FaUser className="w-3 h-3" />
            Last Edited by: <span className="font-medium">Sonu NM</span>
          </span>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            <FaClock className="w-3 h-3" />
            Last Edited at: <span className="font-medium">Jul 4, 4:25 PM</span>
          </span>
        </div>
      </div>

      {/* Input Fields */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-end">
        <Input label="Style Name" placeholder="Enter style name" />
        <Input label="Merchant Name" placeholder="Enter merchant name" />
        <Input label="Style Number" placeholder="Enter style number" />
        <Input label="QA/Tech Name" placeholder="Enter QA or Tech name" />
        <Input label="Vendor Name" placeholder="Enter vendor name" />
        <Input label="Color" placeholder="Enter color" />

        {/* Inspection -> Read-Only */}

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Inspection Type
          </label>
          <input
            type="text"
            value="Inline"
            disabled 
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Size dropdown */}
        
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Size
          </label>
          <select
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="XS"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Status Dropdown aligned right */}
      <div className="mb-10 mt-5 flex justify-end mr-15">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${status === "pass"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
            }`}
          style={{ width: "100px" }}
        >
          <option value="fail">Fail</option>
          <option value="pass">Pass</option>
        </select>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white shadow border rounded-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Header</th>
              <th className="px-4 py-2 border">Measurement Type</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Picture</th>
              <th className="px-4 py-2 border">Grading Rule</th>
              <th className="px-4 py-2 border">XS</th>
              <th className="px-4 py-2 border">S</th>
              <th className="px-4 py-2 border">Factory QA</th>
              <th className="px-4 py-2 border">DKC Tech</th>
              <th className="px-4 py-2 border">Difference</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 11 }).map((_, j) => (
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

const Input = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-3 py-1.5 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
